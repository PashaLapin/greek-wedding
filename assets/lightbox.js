document.addEventListener('DOMContentLoaded', () => {
  // Создаём оверлей
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <img id="lightbox-img" src="" alt="">
    <button class="lightbox-close" aria-label="Закрыть">✕</button>
    <div class="lightbox-caption" id="lightbox-caption"></div>
  `;
  document.body.appendChild(overlay);

  const lightboxImg  = overlay.querySelector('#lightbox-img');
  const lightboxCaption = overlay.querySelector('#lightbox-caption');

  // Находим все кликабельные фото
  const selectors = [
    '.couple-photo-frame img',
    '.photo-placeholder img',
    '.carousel-slide figure img',
  ];

  document.querySelectorAll(selectors.join(', ')).forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      open(img);
    });
  });

  function open(img) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;

    // Ищем подпись: figcaption рядом или alt
    const fig = img.closest('figure');
    const caption = fig ? fig.querySelector('figcaption')?.textContent?.trim() : '';
    lightboxCaption.textContent = caption || img.alt || '';

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Закрытие
  overlay.addEventListener('click', close);
  overlay.querySelector('.lightbox-close').addEventListener('click', close);
  lightboxImg.addEventListener('click', e => e.stopPropagation());
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
});
