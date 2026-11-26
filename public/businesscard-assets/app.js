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
  const previewZoomHint = $('preview-zoom-hint');
  const previewCanvas = $('card-canvas');
  const previewDialog = $('card-preview-dialog');
  const largeCanvas = $('large-card-canvas');
  const fields = ['name', 'english', 'title', 'dial', 'mobile', 'email', 'company', 'domain'];
  const requiredFields = ['company', 'name', 'title', 'mobile', 'email', 'domain'];
  const themeOptions = [...document.querySelectorAll('[name=card-theme]')];
  const touched = new Set();
  const domain = $('domain');
  const editDomain = $('edit-domain');
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
  let theme = 'purple';
  let feedbackTimer;
  let renderRevision = 0;
  let lastInput;

  $('company').defaultValue = config.companyName;
  $('domain').defaultValue = config.emailDomain;

  function syncLargePreview() {
    const context = largeCanvas.getContext('2d');
    context.clearRect(0, 0, largeCanvas.width, largeCanvas.height);
    context.drawImage(previewCanvas, 0, 0);
    largeCanvas.setAttribute('aria-label', previewCanvas.getAttribute('aria-label'));
  }

  function openPreviewDialog() {
    syncLargePreview();
    previewDialog.showModal();
  }
  previewCard.addEventListener('click', openPreviewDialog);
  previewZoomHint.addEventListener('click', openPreviewDialog);
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

  function startDomainEdit() {
    if (!domain.readOnly) return;
    domain.readOnly = false;
    editDomain.textContent = '恢复默认';
    editDomain.setAttribute('aria-label', '恢复默认邮箱后缀');
    domain.focus();
    domain.select();
  }

  function restoreDefaultDomain() {
    domain.value = config.emailDomain;
    domain.readOnly = true;
    editDomain.textContent = '修改后缀';
    editDomain.removeAttribute('aria-label');
    touched.delete('domain');
  }

  editDomain.addEventListener('click', () => {
    if (domain.readOnly) {
      startDomainEdit();
    } else {
      restoreDefaultDomain();
      update();
    }
  });
  domain.addEventListener('dblclick', startDomainEdit);

  function update() {
    const raw = Object.fromEntries(fields.map(id => [id, $(id).value.trim()]));
    const currentConfig = {
      ...config,
      companyName: raw.company,
      emailDomain: raw.domain.replace(/^@/, '').toLowerCase()
    };
    data = card.normalize(raw, currentConfig);
    const errors = card.validate(data);
    const configErrors = card.configErrors(currentConfig);
    if (!data.company) errors.company = '请填写公司名称';
    if (configErrors.includes('企业邮箱后缀尚未配置')) {
      errors.domain = '请输入有效的邮箱域名，例如 meta-circle.com';
    }

    for (const key of requiredFields) {
      const error = touched.has(key) ? errors[key] : '';
      $(key + '-error').textContent = error || '';
      $(key).setAttribute('aria-invalid', String(Boolean(error)));
    }

    const input = JSON.stringify([raw, theme]);
    if (input === lastInput) return;
    lastInput = input;
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
        matrix = card.qr(card.vcard(data));
        download.disabled = false;
      } catch {
        showPreviewError('二维码生成失败。请缩短填写的内容后重试。');
      }
    }

    const isExample = !raw.name && !raw.english && !raw.title && !raw.mobile && !raw.email
      && raw.company === config.companyName && raw.domain === config.emailDomain && raw.dial === '+86';
    const contact = isExample ? example : data;
    const output = document.createElement('canvas');
    CardRenderer.render(output, contact, matrix, theme).then(() => {
      if (revision !== renderRevision) return;
      const details = [
        contact.name, contact.english, contact.title,
        contact.mobile ? contact.dial + ' ' + contact.mobile : '', contact.prefix ? contact.email : '',
        contact.company, contact.website
      ].filter(Boolean);
      previewCanvas.setAttribute('aria-label', [
        isExample ? '示例名片' : '名片预览', ...details,
        matrix ? '联系人二维码，扫一扫添加至通讯录' : '二维码占位'
      ].join('，'));
      previewCard.setAttribute('aria-description', previewCanvas.getAttribute('aria-label'));
      const context = previewCanvas.getContext('2d');
      context.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
      context.drawImage(output, 0, 0);
      if (previewDialog.open) syncLargePreview();
      $('preview-example').hidden = !isExample;
      previewCard.hidden = false;
      previewZoomHint.hidden = false;
      downloadCard.disabled = !matrix;
    }).catch(() => {
      if (revision !== renderRevision) return;
      if (previewDialog.open) previewDialog.close();
      previewCard.hidden = true;
      previewZoomHint.hidden = true;
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
  $('dial').addEventListener('change', update);
  for (const option of themeOptions) {
    option.addEventListener('change', () => {
      if (!option.checked) return;
      theme = option.value;
      update();
    });
  }

  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('reset', () => {
    touched.clear();
    setTimeout(() => {
      restoreDefaultDomain();
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
    const variant = theme === 'purple' ? 'Jiuli' : 'Yuanhuan';
    const filename = card.filename(data.name, 'png').replace('_QRCode.png', '_BusinessCard_' + variant + '.png');
    savePNG(previewCanvas, filename, '名片下载失败，请重试。');
  });

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
