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
  const previewCanvas = $('card-canvas');
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
  let renderRevision = 0;
  let lastInput;

  $('company').defaultValue = config.companyName;
  $('domain').defaultValue = config.emailDomain;

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
        isExample ? '示例名片' : '名片预览', ...details, matrix ? '联系人二维码' : '二维码占位'
      ].join('，'));
      previewCard.setAttribute('aria-description', previewCanvas.getAttribute('aria-label'));
      const context = previewCanvas.getContext('2d');
      context.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
      context.fillStyle = '#F3F3F3';
      context.fillRect(0, 0, 1800, 1100);
      context.fillStyle = '#4F2C5B';
      context.fillRect(0, 1100, 1800, 1100);
      context.drawImage(frontOutput, 0, 0);
      context.drawImage(backOutput, 0, 1100);
      $('preview-example').hidden = !isExample;
      previewCard.hidden = false;
      downloadCard.disabled = !matrix;
    }).catch(() => {
      if (revision !== renderRevision) return;
      previewCard.hidden = true;
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
    const filename = card.filename(data.name, 'png').replace('_QRCode.png', '_BusinessCard.png');
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
