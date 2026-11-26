/* Pure vCard and QR export helpers; no network or storage. */
window.BusinessCard = (() => {
  const clean = value => String(value ?? '').trim();
  const escape = value => clean(value).replace(/\\/g, '\\\\').replace(/\r\n|\r|\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  function fold(line) {
    const encoder = new TextEncoder(); let length = 0, result = '';
    for (const char of line) {
      const bytes = encoder.encode(char).length;
      if (length + bytes > 75) { result += '\r\n '; length = 1; }
      result += char; length += bytes;
    }
    return result;
  }
  function configErrors(c) {
    const errors = [];
    if (!clean(c.companyName) || /[\r\n]/.test(c.companyName)) errors.push('公司名称未正确配置');
    if (!/^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i.test(c.emailDomain)) errors.push('企业邮箱后缀尚未配置');
    try { const url = new URL(c.website); if(url.protocol !== 'https:' || url.username || url.password || /[\s]/.test(c.website)) throw Error(); }
    catch { errors.push('公司官网尚未配置'); }
    return errors;
  }
  function normalize(raw, c) {
    return {name:clean(raw.name), english:clean(raw.english), title:clean(raw.title), dial:raw.dial, mobile:clean(raw.mobile).replace(/[ ()-]/g,''), prefix:clean(raw.email), company:clean(c.companyName), website:clean(c.website), email:clean(raw.email)+'@'+c.emailDomain};
  }
  function validate(d) {
    const errors = {};
    if (!d.name) errors.name='请填写中文姓名';
    if (!d.title) errors.title='请填写职位';
    if (!/^\d+$/.test(d.mobile) || !/^\+[1-9]\d{0,3}$/.test(d.dial) || !/^[1-9]\d{6,14}$/.test(d.dial.slice(1)+d.mobile) || (d.dial === '+86' && !/^1[3-9]\d{9}$/.test(d.mobile))) errors.mobile='请输入有效的手机号码，不含国际区号';
    if (!/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/i.test(d.prefix) || d.prefix.length>64) errors.email='请输入有效的邮箱前缀，不含 @ 和域名';
    return errors;
  }
  function vcard(d) {
    const display = d.name + (d.english ? ' ('+d.english+')' : '');
    // A single unsplit name is kept in the family-name component; do not guess surnames.
    return ['BEGIN:VCARD','VERSION:3.0','FN:'+escape(display),'N:'+escape(d.name)+';;;;','ORG:'+escape(d.company),'TITLE:'+escape(d.title),'TEL;TYPE=CELL:'+d.dial+d.mobile,'EMAIL;TYPE=INTERNET,WORK:'+d.email,'URL:'+d.website,'END:VCARD'].map(fold).join('\r\n')+'\r\n';
  }
  function contactQrText(d) {
    const display = d.name + (d.english ? ' (' + d.english + ')' : '');
    return [
      'BEGIN:VCARD',
      'FN:' + escape(display),
      'ORG:' + escape(d.company),
      'TITLE:' + escape(d.title),
      'TEL;CELL:' + escape(d.dial + d.mobile),
      'EMAIL:' + escape(d.email),
      'END:VCARD'
    ].join('\n');
  }
  function qr(text) {
    const {QrCode,QrSegment}=qrcodegen;
    return QrCode.encodeSegments([QrSegment.makeBytes(Array.from(new TextEncoder().encode(text)))],QrCode.Ecc.MEDIUM,1,40,-1,false);
  }
  function svg(matrix,color) {
    if (!['#000000','#4F2C5B','#6B4C9A'].includes(color)) throw Error('不支持的二维码颜色');
    let path='';
    for(let y=0;y<matrix.size;y++)for(let x=0;x<matrix.size;x++)if(matrix.getModule(x,y))path+=`M${x+4},${y+4}h1v1h-1z`;
    const size=matrix.size+8;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="2048" height="2048" shape-rendering="crispEdges"><path fill="${color}" d="${path}"/></svg>`;
  }
  function paint(canvas,matrix,color,white) {
    canvas.width=canvas.height=2048;
    const ctx=canvas.getContext('2d'); if(!ctx)throw Error('浏览器无法导出 PNG');
    ctx.imageSmoothingEnabled=false;
    if(white){ctx.fillStyle='#ffffff';ctx.fillRect(0,0,2048,2048);}
    // Integer module widths and centered surplus padding prevent blurred edges.
    const scale=Math.floor(2048/(matrix.size+8)); const offset=Math.floor((2048-matrix.size*scale)/2);
    ctx.fillStyle=color;
    for(let y=0;y<matrix.size;y++)for(let x=0;x<matrix.size;x++)if(matrix.getModule(x,y))ctx.fillRect(offset+x*scale,offset+y*scale,scale,scale);
  }
  const filename=(name,extension)=>'Metacircle_'+clean(name).replace(/[<>:"/\\|?*\x00-\x1F\x7F]/g,'_').replace(/[. ]+$/g,'')+(extension==='vcf'?'_Contact.vcf':'_QRCode.'+extension);
  return {normalize,validate,configErrors,vcard,contactQrText,qr,svg,paint,filename};
})();
