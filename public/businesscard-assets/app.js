(() => {
  'use strict';

  const $ = id => document.getElementById(id);
  const card = window.BusinessCard;
  const config = window.METACIRCLE_CONFIG;
  const form = $('card-form');
  const menu = $('download-menu');
  const download = $('download');
  const downloadCard = $('download-card');
  const previewCard = $('preview-card');
  const previewBack = $('preview-back');
  const backCanvas = $('back-canvas');
  let enlargedCanvas;
  const previewCanvas = $('card-canvas');
  const previewDialog = $('card-preview-dialog');
  const largeCanvas = $('large-card-canvas');
  const fields = ['name', 'english', 'title', 'dial', 'mobile', 'email', 'company', 'domain'];
  const requiredFields = ['company', 'name', 'title', 'mobile', 'email', 'domain'];
  const touched = new Set();
  const domain = $('domain');
  const example = Object.freeze({
    name: '陈晓',
    english: 'Alex Chen',
    title: '产品设计师',
    dial: '+86',
    mobile: '138 XXXX XXXX',
    prefix: 'name',
    email: 'name@' + config.emailDomain,
    company: config.companyName,
    website: config.website
  });
  let matrix = null;
  let data = null;
  let feedbackTimer;
  let cardDownloads = null;
  let renderRevision = 0;
  let lastInput;

  $('company').defaultValue = config.companyName;
  $('domain').defaultValue = config.emailDomain;

  function syncLargePreview() {
    const context = largeCanvas.getContext('2d');
    context.clearRect(0, 0, largeCanvas.width, largeCanvas.height);
    context.drawImage(enlargedCanvas, 0, 0);
    largeCanvas.setAttribute('aria-label', enlargedCanvas.getAttribute('aria-label'));
  }

  function openPreviewDialog(canvas) {
    enlargedCanvas = canvas;
    syncLargePreview();
    previewDialog.showModal();
  }
  previewCard.addEventListener('click', () => openPreviewDialog(previewCanvas));
  previewBack.addEventListener('click', () => openPreviewDialog(backCanvas));
  $('close-card-preview').addEventListener('click', () => previewDialog.close());

  function isPreviewBackdrop(event) {
    if (event.target !== previewDialog) return false;
    const { left, top, right, bottom } = previewDialog.getBoundingClientRect();
    return event.clientX < left || event.clientX >= right ||
      event.clientY < top || event.clientY >= bottom;
  }

  let pressedPreviewBackdrop = false;
  previewDialog.addEventListener('pointerdown', event => {
    pressedPreviewBackdrop = isPreviewBackdrop(event);
  });
  previewDialog.addEventListener('click', event => {
    if (pressedPreviewBackdrop && isPreviewBackdrop(event)) previewDialog.close();
    pressedPreviewBackdrop = false;
  });
  previewDialog.addEventListener('close', () => {
    pressedPreviewBackdrop = false;
  });

  function closeMenu(restoreFocus = false) {
    menu.hidden = true;
    download.setAttribute('aria-expanded', 'false');
    if (restoreFocus) download.focus();
  }

  function showPreviewError(message = '') {
    const hint = $('preview-error');
    hint.textContent = message;
    hint.hidden = !message;
  }

  function update() {
    const raw = Object.fromEntries(fields.map(id => [id, $(id).value.trim()]));
    const currentConfig = {
      ...config,
      companyName: raw.company,
      emailDomain: config.emailDomain
    };
    data = card.normalize(raw, currentConfig);
    const errors = card.validate(data);
    const configErrors = card.configErrors(currentConfig);
    if (!data.company) errors.company = '请填写公司名称';
    if (configErrors.includes('企业邮箱后缀尚未配置')) {
      errors.domain = '邮箱后缀配置无效，请联系管理员';
    }

    for (const key of requiredFields) {
      const error = touched.has(key) ? errors[key] : '';
      $(key + '-error').textContent = error || '';
      $(key).setAttribute('aria-invalid', String(Boolean(error)));
    }

    const input = JSON.stringify(raw);
    if (input === lastInput) return;
    lastInput = input;
    cardDownloads = null;
    $('card-download-fallback').hidden = true;
    const revision = ++renderRevision;
    matrix = null;
    closeMenu();
    download.disabled = true;
    downloadCard.disabled = true;

    showPreviewError();
    if (configErrors.includes('公司官网尚未配置')) {
      showPreviewError('公司官网未配置，暂时无法生成名片。');
    }

    if (!Object.keys(errors).length && !configErrors.length) {
      try {
        matrix = card.qr(card.contactQrText(data));
        download.disabled = false;
      } catch {
        showPreviewError('二维码生成失败。请缩短填写的内容后重试。');
      }
    }

    const isExample = !raw.name && !raw.english && !raw.title && !raw.mobile && !raw.email
      && raw.company === config.companyName && raw.domain === config.emailDomain && raw.dial === '+86';
    const contact = isExample ? example : data;
    const frontOutput = document.createElement('canvas');
    const backOutput = document.createElement('canvas');
    Promise.all([
      CardRenderer.render(frontOutput, contact, matrix, 'front'),
      CardRenderer.render(backOutput, contact, matrix, 'back')
    ]).then(() => {
      if (revision !== renderRevision) return;
      const details = [
        contact.name, contact.english, contact.title,
        contact.mobile ? contact.dial + ' ' + contact.mobile : '', contact.prefix ? contact.email : '',
        contact.company, contact.website
      ].filter(Boolean);
      previewCanvas.setAttribute('aria-label', [
        isExample ? '示例名片正面' : '名片正面', ...details
      ].join('，'));
      previewCard.setAttribute('aria-description', previewCanvas.getAttribute('aria-label'));
      const context = previewCanvas.getContext('2d');
      context.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
      context.drawImage(frontOutput, 0, 0);
      const backContext = backCanvas.getContext('2d');
      backContext.clearRect(0, 0, backCanvas.width, backCanvas.height);
      backContext.drawImage(backOutput, 0, 0);
      backCanvas.setAttribute('aria-label', matrix ? '名片背面，联系人二维码' : '名片背面，二维码占位');
      if (previewDialog.open) syncLargePreview();
      $('preview-example').hidden = !isExample;
      previewCard.hidden = false;
      previewBack.hidden = false;
      downloadCard.disabled = !matrix;
    }).catch(() => {
      if (revision !== renderRevision) return;
      if (previewDialog.open) previewDialog.close();
      previewCard.hidden = true;
      previewBack.hidden = true;
      $('preview-example').hidden = true;
      showPreviewError('名片预览加载失败，请刷新页面重试。');
    });
  }

  for (const id of fields) {
    $(id).addEventListener('input', () => {
      touched.add(id);
      update();
    });
    $(id).addEventListener('blur', () => {
      $(id).value = $(id).value.trim();
      touched.add(id);
      update();
    });
  }
  $('dial').addEventListener('change', () => {
    $('dial-display').textContent = $('dial').value;
    update();
  });

  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('reset', () => {
    touched.clear();
    setTimeout(() => {
      domain.value = config.emailDomain;
      $('dial-display').textContent = $('dial').value;
      $('name').focus();
      update();
    }, 0);
  });

  download.addEventListener('click', () => {
    if (!menu.hidden) {
      closeMenu();
      return;
    }
    menu.hidden = false;
    download.setAttribute('aria-expanded', 'true');
    menu.querySelector('button').focus();
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.download-wrap')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) closeMenu(true);
  });
  menu.addEventListener('keydown', event => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const buttons = [...menu.querySelectorAll('button')];
    const index = buttons.indexOf(document.activeElement);
    const step = event.key === 'ArrowDown' ? 1 : -1;
    buttons[(index + step + buttons.length) % buttons.length].focus();
  });

  function feedback(message) {
    $('toast').textContent = message;
    clearTimeout(feedbackTimer);
    feedbackTimer = setTimeout(() => { $('toast').textContent = ''; }, 4000);
  }

  function save(blob, name) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    feedback('已发起下载：' + name);
  }

  function savePNG(canvas, filename, failureMessage) {
    canvas.toBlob(blob => {
      if (blob) save(blob, filename);
      else feedback(failureMessage);
    }, 'image/png');
  }

  downloadCard.addEventListener('click', () => {
    if (!matrix || downloadCard.disabled) return;
    const front = document.createElement('canvas');
    const back = document.createElement('canvas');
    const snapshot = { ...data };
    const qr = matrix;
    Promise.all([
      CardRenderer.render(front, snapshot, qr, 'front'),
      CardRenderer.render(back, snapshot, qr, 'back')
    ]).then(() => Promise.all([
      new Promise(resolve => front.toBlob(resolve, 'image/png')),
      new Promise(resolve => back.toBlob(resolve, 'image/png'))
    ])).then(([frontBlob, backBlob]) => {
      if (!frontBlob || !backBlob) throw Error('无法生成图片');
      const base = card.filename(snapshot.name, 'png').replace('_QRCode.png', '');
      cardDownloads = {
        front: { blob: frontBlob, name: base + '_BusinessCard_Front.png' },
        back: { blob: backBlob, name: base + '_BusinessCard_Back.png' }
      };
      $('card-download-fallback').hidden = false;
      save(cardDownloads.front.blob, cardDownloads.front.name);
      save(cardDownloads.back.blob, cardDownloads.back.name);
      feedback('已发起正反面图片下载');
    }).catch(() => feedback('名片下载失败，请重试。'));
  });

  for (const side of ['front', 'back']) {
    $('save-' + side).addEventListener('click', () => {
      if (cardDownloads) save(cardDownloads[side].blob, cardDownloads[side].name);
    });
  }

  menu.addEventListener('click', event => {
    const button = event.target.closest('[data-format]');
    if (!button || !matrix || download.disabled) return;
    closeMenu(true);
    try {
      if (button.dataset.format === 'svg') {
        const blob = new Blob([card.svg(matrix, '#000000')], { type: 'image/svg+xml;charset=utf-8' });
        save(blob, card.filename(data.name, 'svg'));
      } else {
        const canvas = document.createElement('canvas');
        card.paint(canvas, matrix, '#000000', true);
        savePNG(canvas, card.filename(data.name, 'png'), '二维码下载失败，请重试。');
      }
    } catch {
      feedback('二维码下载失败，请重试。');
    }
  });

  update();
})();
