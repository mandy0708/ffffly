/* Browser-local compositor for the business card preview and PNG export. */
window.CardRenderer = (() => {
  const width = 1800;
  const height = 1100;
  const inset = 100;
  const qrSize = 440;
  const qrX = width - inset - qrSize;
  const qrY = height - inset - qrSize;

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
    load('businesscard-assets/logo-white.svg'),
    load('businesscard-assets/logo-corner.svg')
  ]);

  function setFont(ctx, size, weight = 400) {
    ctx.font = `${weight} ${size}px -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif`;
  }

  function drawText(ctx, value, size, weight, x, y, color, maxWidth) {
    setFont(ctx, size, weight);
    while (ctx.measureText(value).width > maxWidth && size > 1) {
      size -= 1;
      setFont(ctx, size, weight);
    }
    ctx.fillStyle = color;
    ctx.fillText(value, x, y);
  }

  async function render(canvas, data, matrix, theme) {
    const [logo, whiteLogo, mark] = await assets;
    const dark = theme === 'purple';
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw Error('浏览器无法生成名片图片');

    ctx.beginPath();
    ctx.roundRect(0, 0, width, height, 60);
    ctx.clip();
    ctx.fillStyle = dark ? '#4F2C5B' : '#F2F1F4';
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = dark ? 0.13 : 0.42;
    ctx.drawImage(mark, 545, 157.5, 710, 785);
    ctx.globalAlpha = 1;

    const brand = dark ? whiteLogo : logo;
    ctx.drawImage(brand, inset, inset, 385, 385 * brand.naturalHeight / brand.naturalWidth);
    const primary = dark ? '#fff' : '#4F2C5B';
    const secondary = dark ? '#e2d5e8' : '#4F2C5B';
    const maxTextWidth = qrX - inset - 65;
    const website = (data.website || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';

    drawText(ctx, data.name || '你的姓名', 104, 600, inset, 365, primary, maxTextWidth);
    const details = [
      data.english,
      data.title || '职位',
      data.mobile ? data.dial + ' ' + data.mobile : '手机号码',
      data.prefix ? data.email : '邮箱'
    ].filter(Boolean);
    details.forEach((value, index) => {
      drawText(ctx, value, 51, 400, inset, 491 + index * 67, secondary, maxTextWidth);
    });

    setFont(ctx, 49);
    const websiteTop = height - inset - ctx.measureText(website).actualBoundingBoxDescent;
    drawText(ctx, data.company || '公司名称', 51, 400, inset, website ? websiteTop - 70 : height - inset - 55, primary, maxTextWidth);
    if (website) drawText(ctx, website, 49, 400, inset, websiteTop, secondary, maxTextWidth);

    ctx.textAlign = 'center';
    drawText(ctx, '扫一扫添加至通讯录', 36, 400, qrX + qrSize / 2, 495, secondary, qrSize);
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.roundRect(qrX, qrY, qrSize, qrSize, 18);
    ctx.fill();

    if (!matrix) {
      ctx.fillStyle = '#615f68';
      ctx.textBaseline = 'middle';
      setFont(ctx, 39);
      ctx.fillText('二维码预留', qrX + qrSize / 2, qrY + qrSize / 2);
      return canvas;
    }
    const unit = Math.floor(qrSize / (matrix.size + 8));
    const offset = Math.floor((qrSize - matrix.size * unit) / 2);
    ctx.fillStyle = dark ? '#4F2C5B' : '#6B4C9A';
    for (let row = 0; row < matrix.size; row++) {
      for (let column = 0; column < matrix.size; column++) {
        if (matrix.getModule(column, row)) {
          ctx.fillRect(qrX + offset + column * unit, qrY + offset + row * unit, unit, unit);
        }
      }
    }
    return canvas;
  }

  return { render };
})();
