document.addEventListener('DOMContentLoaded', () => {

  // スクロールアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.15
  });

  document.querySelectorAll(
    '.fade-in-up, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-up'
  ).forEach(el => observer.observe(el));

  // モバイルメニュー
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }

  // サービスモーダル
  document.querySelectorAll('.service-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('aria-controls');
      const modal = document.getElementById(modalId);

      if (modal) {
        modal.classList.add('active');
      }
    });
  });

  // モーダルを閉じる
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.service-modal-overlay')
        .classList.remove('active');
    });
  });

  // 背景クリックで閉じる
  document.querySelectorAll('.service-modal-overlay').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });

  // 統計カウントアップ
  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      entry.target.querySelectorAll('.stat-number').forEach(el => {

        const target = parseFloat(el.dataset.target);
        const decimal = parseInt(el.dataset.decimal || 0);

        let current = 0;
        const step = target / 60;

        const timer = setInterval(() => {

          current += step;

          if (current >= target) {
            current = target;
            clearInterval(timer);
          }

          el.textContent = current.toFixed(decimal);

        }, 20);
      });

      statObserver.unobserve(entry.target);
    });
  });

  document.querySelectorAll('.stats-grid').forEach(grid => {
    statObserver.observe(grid);
  });

  // フォーム
  const form = document.getElementById('clinic-contact-form');
  const success = document.getElementById('form-success-message');

  if (form) {

    form.addEventListener('submit', e => {

      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      form.style.display = 'none';

      if (success) {
        success.style.display = 'block';
      }
    });
  }

  // 送信完了後リセット
  const resetBtn = document.getElementById('success-reset-btn');

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {

      success.style.display = 'none';
      form.style.display = 'block';

      form.reset();
    });
  }
    // 現在表示中のセクションに応じてヘッダーの色を変更
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120; // ヘッダーの高さ分調整
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');

      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
