// Local candidate. Publication requires review for the actual Instatic page/revision.
(() => {
  const prefix = 'vlp-mata3174569-8d95b2';
  const checkoutUrls = new Set(["https://urbanqueen-school.com/pl/lite/widget/widget?id=1454762","https://urbanqueen-school.com/pl/lite/widget/widget?id=1454776"]);
  const videoUrls = new Set(["https://www.youtube.com/embed/TUo0C3PoUZc?rel=0","https://www.youtube.com/embed/xwq0IA_25RQ?rel=0","https://www.youtube.com/embed/VudfcExJHJc?rel=0","https://www.youtube.com/embed/mB_cVHt4X-A?rel=0"]);

  function boot() {
    const root = document.querySelector(`.${prefix}-root`);
    if (!root || root.hasAttribute(`data-${prefix}-ready`)) return;
    root.setAttribute(`data-${prefix}-ready`, 'true');

    root.addEventListener('click', event => {
      if (!(event.target instanceof Element)) return;
      const launch = event.target.closest(`[data-${prefix}-dialog]`);
      if (launch) {
        const id = launch.getAttribute(`data-${prefix}-dialog`);
        const dialog = [...root.querySelectorAll('dialog')].find(item => item.id === id);
        if (!(dialog instanceof HTMLDialogElement)) return;
        const frame = dialog.querySelector('iframe');
        const url = frame?.getAttribute(`data-${prefix}-src`);
        if (!frame || !checkoutUrls.has(url)) return;
        if (!frame.hasAttribute('src')) frame.src = url;
        dialog.showModal();
        return;
      }

      const close = event.target.closest(`[data-${prefix}-close]`);
      if (close) {
        close.closest('dialog')?.close();
        return;
      }

      const step = event.target.closest(`[data-${prefix}-review-step]`);
      if (step) {
        const track = root.querySelector(`.${prefix}-reviews`);
        const direction = Number(step.getAttribute(`data-${prefix}-review-step`));
        if (!track || ![-1, 1].includes(direction)) return;
        track.scrollBy({
          left: direction * (track.clientWidth - 70),
          behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        });
        return;
      }

      const video = event.target.closest(`[data-${prefix}-video]`);
      if (!video) return;
      const url = video.getAttribute(`data-${prefix}-video`);
      if (!videoUrls.has(url)) return;
      const frame = document.createElement('iframe');
      frame.className = `${prefix}-video`;
      frame.src = `${url}&autoplay=1&playsinline=1`;
      frame.title = 'Видеоотзыв о курсе Мата';
      frame.allow = 'autoplay; fullscreen; picture-in-picture';
      frame.allowFullscreen = true;
      video.replaceWith(frame);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
