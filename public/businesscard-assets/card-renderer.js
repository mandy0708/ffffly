/* Local canvas compositor shared by preview and exported business-card PNG. */
window.CardRenderer = (() => {
  const width = 1100;
  const height = 1800;
  const pixelRatio = 1.5;
  const cardRadius = 60;
  const textInset = 100;
  const qrSize = 405;
  const qrPadding = 4;
  const qrBackingSize = qrSize + 2 * qrPadding;
  const minimumQrGap = 96;
  const captionGap = 40;
  const qrGroupHeight = qrBackingSize + captionGap + 44;
  const preferredQrTop = height - textInset - 24 - qrGroupHeight;

  function load(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(Error('名片素材加载失败'));
      image.src = src;
    });
  }

  const assets = Promise.all([
    load('businesscard-assets/card-pattern.svg'),
    load('businesscard-assets/card-logo.svg'),
    load('businesscard-assets/logo-white.svg'),
    load('businesscard-assets/logo-corner.svg')
  ]);

  function wrap(ctx, text, maxWidth) {
    const rows = [];
    let row = '';
    for (const char of text) {
      if (row && ctx.measureText(row + char).width > maxWidth) {
        rows.push(row);
        row = char;
      } else {
        row += char;
      }
    }
    if (row) rows.push(row);
    return rows;
  }

  function setFont(ctx, size, weight = 400) {
    ctx.font = `${weight} ${size}px -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif`;
  }

  function layoutGroup(ctx, entries, scale) {
    let y = 0;
    const blocks = entries.map(({ text, size, maxLines, gap = 0, color, weight }) => {
      size = Math.max(1, Math.floor(size * scale));
      let rows;
      for (;;) {
        setFont(ctx, size, weight);
        rows = wrap(ctx, text, width - textInset * 2);
        if (rows.length <= maxLines || size === 1) break;
        size -= 1;
      }
      y += gap;
      const lineHeight = size * 1.25;
      const block = { rows, size, color, weight, lineHeight, y };
      y += rows.length * lineHeight;
      return block;
    });
    return { blocks, height: y };
  }

  function drawGroup(ctx, group, top) {
    let inkBottom = top;
    for (const block of group.blocks) {
      setFont(ctx, block.size, block.weight);
      ctx.fillStyle = block.color;
      block.rows.forEach((row, index) => {
        const y = top + block.y + index * block.lineHeight;
        const { actualBoundingBoxDescent } = ctx.measureText(row);
        ctx.fillText(row, textInset, y);
        inkBottom = Math.max(inkBottom, y + actualBoundingBoxDescent);
      });
    }
    return inkBottom;
  }

  function drawContact(ctx, data, primary, secondary, nameColor) {
    const website = (data.website || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
    const detailSize = 47;
    const detailGap = 12;
    const personalEntries = [
      { text: data.name || '你的姓名', size: 88, weight: 600, maxLines: 2, color: nameColor },
      ...(data.english ? [{ text: data.english, size: detailSize, maxLines: 2, gap: detailGap, color: secondary }] : []),
      { text: data.title || '职位', size: detailSize, maxLines: 3, gap: detailGap, color: secondary },
      { text: data.mobile ? data.dial + ' ' + data.mobile : '手机号码', size: detailSize, maxLines: 1, gap: detailGap, color: secondary },
      { text: data.prefix ? data.email : '邮箱', size: detailSize, maxLines: 2, gap: detailGap, color: secondary }
    ];
    const companyEntries = [
      { text: data.company || '公司名称', size: 45, maxLines: 2, color: primary },
      ...(website ? [{ text: website, size: 44, maxLines: 2, gap: 10, color: secondary }] : [])
    ];
    const personalTop = 340;
    const companyPreferredTop = 875;
    const groupGap = 56;
    const contentBottom = preferredQrTop - minimumQrGap;
    let scale = 1;
    let personal;
    let company;
    do {
      personal = layoutGroup(ctx, personalEntries, scale);
      company = layoutGroup(ctx, companyEntries, scale);
      scale *= 0.94;
    } while (personalTop + personal.height + groupGap + company.height > contentBottom);

    const companyTop = Math.min(
      Math.max(companyPreferredTop, personalTop + personal.height + groupGap),
      contentBottom - company.height
    );
    ctx.textBaseline = 'top';
    drawGroup(ctx, personal, personalTop);
    return drawGroup(ctx, company, companyTop);
  }

  function drawQR(ctx, matrix, qrColor, textBottom, captionColor) {
    const backingTop = Math.max(textBottom + minimumQrGap, preferredQrTop);
    const qrTop = backingTop + qrPadding;
    const left = width - textInset - qrSize - qrPadding;
    const center = left + qrSize / 2;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.roundRect(left - qrPadding, backingTop, qrBackingSize, qrBackingSize, 19.8);
    ctx.fill();

    ctx.fillStyle = captionColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    setFont(ctx, 36);
    ctx.fillText('扫一扫添加至通讯录', center, backingTop + qrBackingSize + captionGap);

    if (!matrix) {
      ctx.fillStyle = '#615f68';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      setFont(ctx, 49);
      ctx.fillText('二维码预留', center, qrTop + qrSize / 2);
      return;
    }

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const pixelSize = qrSize * pixelRatio;
    const unit = Math.floor(pixelSize / (matrix.size + 8));
    const offset = (pixelSize - matrix.size * unit) / 2;
    const x = Math.round(left * pixelRatio + offset);
    const y = Math.round(qrTop * pixelRatio + offset);
    ctx.fillStyle = qrColor;
    for (let row = 0; row < matrix.size; row++) {
      for (let column = 0; column < matrix.size; column++) {
        if (matrix.getModule(column, row)) ctx.fillRect(x + column * unit, y + row * unit, unit, unit);
      }
    }
    ctx.restore();
  }

  async function render(canvas, data, matrix, theme) {
    const [pattern, logo, whiteLogo, cornerLogo] = await assets;
    const dark = theme === 'purple';
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw Error('浏览器无法生成名片图片');

    ctx.scale(pixelRatio, pixelRatio);
    ctx.beginPath();
    ctx.roundRect(0, 0, width, height, cardRadius);
    ctx.clip();

    ctx.fillStyle = dark ? '#4F2C5B' : '#F2F1F4';
    ctx.fillRect(0, 0, width, height);
    if (dark) {
      ctx.globalAlpha = 0.255;
      ctx.drawImage(pattern, -925, 0, 2950, height);
    } else {
      ctx.globalAlpha = 0.42;
      ctx.drawImage(cornerLogo, 490, 935, 825, 910.8);
    }
    ctx.globalAlpha = 1;

    const brand = dark ? whiteLogo : logo;
    ctx.drawImage(brand, textInset, 100, 323, 323 * brand.naturalHeight / brand.naturalWidth);
    const secondary = dark ? '#e2d5e8' : '#71657b';
    const qrColor = dark ? '#4F2C5B' : '#6B4C9A';
    const primary = dark ? '#fff' : '#4F2C5B';
    const textBottom = drawContact(ctx, data, primary, secondary, dark ? primary : qrColor);
    drawQR(ctx, matrix, qrColor, textBottom, secondary);
    return canvas;
  }

  return { render };
})();
