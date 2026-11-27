window.CardRenderer = (() => {
  const width = 1800;
  const height = 1100;
  const inset = 100;

  function load(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(Error('名片素材加载失败'));
      image.src = src;
    });
  }

  const assets = Promise.all([
    load('businesscard-assets/card-logo.svg'),
    load('businesscard-assets/en-white.svg')
  ]);

  function font(ctx, size, weight = 400) {
    ctx.font = `${weight} ${size}px MiSansCard, -apple-system, "PingFang SC", sans-serif`;
  }

  function text(ctx, value, x, y, size, weight, color, maxWidth) {
    font(ctx, size, weight);
    while (ctx.measureText(value).width > maxWidth && size > 1) {
      size -= 1;
      font(ctx, size, weight);
    }
    ctx.fillStyle = color;
    ctx.fillText(value, x, y);
  }

  async function render(canvas, data, matrix, side) {
    const [chineseLogo, englishLogo] = await assets;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw Error('浏览器无法生成名片图片');
    ctx.fillStyle = side === 'front' ? '#F3F3F3' : '#4F2C5B';
    ctx.fillRect(0, 0, width, height);
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';

    if (side === 'front') {
      ctx.drawImage(chineseLogo, inset, inset, 580, 580 * chineseLogo.naturalHeight / chineseLogo.naturalWidth);
      const name = data.name || '你的姓名';
      const scale = width / 255.12;
      const textX = 13.3279 * scale;
      const baseY = 99.082 * scale;
      const line = 13.6 * scale;
      const detailSize = 8 * scale;
      ctx.textBaseline = 'alphabetic';
      font(ctx, 12 * scale, 600);
      ctx.fillStyle = '#6B4C9A';
      ctx.fillText(name, textX, baseY);
      if (data.english) {
        const englishX = textX + ctx.measureText(name).width + 20;
        font(ctx, detailSize);
        ctx.fillText(data.english, englishX, baseY);
      }
      font(ctx, detailSize);
      ctx.fillStyle = '#6B4C9A';
      ctx.fillText(data.title || '职位', textX, baseY + line);
      ctx.fillStyle = '#141414';
      const mobile = data.mobile ? data.dial + ' ' + data.mobile : '手机号码';
      const email = data.prefix ? data.email : '邮箱';
      ctx.fillText(mobile + '  |  ' + email, textX, baseY + line * 2);
      ctx.fillText('北京市海淀区清华科技园A座803', textX, baseY + line * 3);
      const website = (data.website || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
      ctx.textAlign = 'right';
      ctx.fillText(website, width - textX, baseY + line * 3);
      return canvas;
    }

    ctx.drawImage(englishLogo, inset, inset, 790, 790 * englishLogo.naturalHeight / englishLogo.naturalWidth);
    const box = 350;
    const x = width - inset - box;
    const y = height - inset - box;
    ctx.textAlign = 'center';
    text(ctx, '扫一扫添加至通讯录', x + box / 2, y - 57, 32, 400, '#BACF65', box);
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, box, box);
    if (!matrix) {
      ctx.fillStyle = '#615f68';
      ctx.textBaseline = 'middle';
      font(ctx, 34);
      ctx.fillText('二维码预留', x + box / 2, y + box / 2);
      return canvas;
    }
    const unit = Math.floor(box / (matrix.size + 8));
    const offset = Math.floor((box - matrix.size * unit) / 2);
    ctx.fillStyle = '#4F2C5B';
    for (let row = 0; row < matrix.size; row++) {
      for (let column = 0; column < matrix.size; column++) {
        if (matrix.getModule(column, row)) {
          ctx.fillRect(x + offset + column * unit, y + offset + row * unit, unit, unit);
        }
      }
    }
    return canvas;
  }

  return { render };
})();
