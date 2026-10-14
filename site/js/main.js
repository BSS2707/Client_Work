(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const REELS_DATA = [
    {
      title: 'Cinematic Mood & Story',
      category: 'Travel / Aesthetic',
      url: 'https://www.instagram.com/reel/DUfsxX2jYSa/?exln=MW1idnl6MjY4ZjQ0Yg==',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80',
    },
    {
      title: 'Fast Rhythm & Transitions',
      category: 'Dynamic Cut',
      url: 'https://www.instagram.com/reel/DWNkGD1iUF6/?exln=bmkyajVybTNiNzlx',
      image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=700&q=80',
    },
    {
      title: 'Visual Flow & Beat Drop',
      category: 'Sound Sync',
      url: 'https://www.instagram.com/reel/DcHAMc8CuXb/?vrfl=MXRzNWw1bGVpNmcybA==',
      image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=700&q=80',
    },
    {
      title: 'Lifestyle & Creator Tone',
      category: 'Social Reel',
      url: 'https://www.instagram.com/reel/DaxbsJyis3q/?rpxt=ZzQ1dmttYXliYXo2',
      image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80',
    },
    {
      title: 'Hook Pacing & Polish',
      category: 'Short-Form',
      url: 'https://www.instagram.com/reel/DdeA2bYzhbG/?obrf=MXZ4MWpmbXVvMnN4ZQ==',
      image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=700&q=80',
    }
  ];

  // 1. Loading Screen
  const loader = $('#loader');
  const dismissLoader = () => {
    if (loader && !loader.classList.contains('fade-out')) {
      loader.classList.add('fade-out');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  };

  if (document.readyState === 'complete') {
    setTimeout(dismissLoader, 350);
  } else {
    window.addEventListener('load', () => setTimeout(dismissLoader, 450));
  }
  setTimeout(dismissLoader, 1400);

  // 2. Theme Toggle (Dark [Default] / Light)
  const themeToggle = $('#themeToggle');
  const themeMeta = $('meta[name="theme-color"]');

  const getSavedTheme = () => {
    return localStorage.getItem('prathmesh_theme') || 'dark';
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('prathmesh_theme', theme);
    if (themeMeta) {
      themeMeta.setAttribute('content', theme === 'light' ? '#FAF7F2' : '#080B09');
    }
  };

  // Initialize theme
  applyTheme(getSavedTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  // 3. Year, Nav, Menu
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const nav = $('#nav'), burger = $('#burger'), menu = $('#menu');
  const onScroll = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const setMenu = (open) => {
    if (!menu || !burger) return;
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  if (burger) {
    burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  }
  if (menu) {
    menu.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));
  }
  window.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));

  // 4. Reveal Animations
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  // 5. Headings: Word-by-Word Split Reveal Animation
  document.querySelectorAll('.split-words').forEach((h) => {
    const words = h.textContent.trim().split(/\s+/);
    h.innerHTML = words.map((w, i) => `<span class="w"><span style="--d:${i * 70}ms">${w}</span></span>`).join(' ');
    h.classList.add('reveal-h');
  });

  if ('IntersectionObserver' in window) {
    const ioHeadings = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          ioHeadings.unobserve(e.target);
        }
      });
    }, { threshold: 0.25 });
    document.querySelectorAll('.reveal-h').forEach((el) => ioHeadings.observe(el));
  } else {
    document.querySelectorAll('.reveal-h').forEach((el) => el.classList.add('in'));
  }

  // Stagger siblings in services, tools, steps, contact reach
  document.querySelectorAll('.svcs, .tools, .steps, .reach').forEach((parent) => {
    Array.from(parent.children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 90}ms`;
    });
  });

  // Trigger ready state for hero entrance animations
  requestAnimationFrame(() => {
    document.body.classList.add('ready');
    setTimeout(() => {
      document.body.classList.add('anim-done');
    }, 1300);
  });

  // 6. Instagram Reel Portfolio
  const grid = $('#reels');

  if (grid) {
    grid.innerHTML = '';
    REELS_DATA.forEach((item, i) => {
      const c = document.createElement('article');
      c.className = 'reel reveal in';
      c.dataset.index = i;

      c.innerHTML = `
        <div class="reel-top-bar">
          <span class="reel-live-tag"><i class="dot"></i> INSTAGRAM REEL</span>
        </div>
        <img class="reel-image" src="${item.image}" alt="${item.category} video still" loading="lazy">
        <div class="reel-scrim" aria-hidden="true"></div>
        <span class="play" aria-hidden="true"></span>
        <span class="n">Reel ${String(i + 1).padStart(2, '0')}</span>
        <h3 class="reel-topic">${item.title}</h3>
        <div class="links">
          <button type="button" class="btn-open-embed" aria-label="Show Reel ${i + 1} here">Show Reel Here</button>
          <a href="${item.url}" target="_blank" rel="noopener" aria-label="Open Reel ${i + 1} on Instagram">Open Instagram</a>
        </div>
      `;

      const embedBtn = c.querySelector('.btn-open-embed');
      if (embedBtn) {
        embedBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          embedInstagram(item.url);
        });
      }

      grid.appendChild(c);
    });
  }

  // Instagram Embed on Demand
  let igLoaded = false;
  function embedInstagram(url) {
    const existing = document.querySelector('.instagram-modal');
    if (existing) existing.remove();
    const box = document.createElement('div');
    box.className = 'instagram-modal';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Instagram Reel');
    box.innerHTML = `
      <div class="instagram-modal-panel">
        <div class="instagram-modal-head">
          <span>Instagram Reel</span>
          <button type="button" class="close-emb" aria-label="Close Instagram Reel">&times;</button>
        </div>
        <p class="instagram-status" aria-live="polite">Loading reel from Instagram...</p>
        <blockquote class="instagram-media" data-instgrm-permalink="${url}" data-instgrm-version="14"></blockquote>
        <a class="instagram-fallback" href="${url}" target="_blank" rel="noopener">Open this reel on Instagram</a>
      </div>
    `;
    document.body.appendChild(box);

    const closeBtn = box.querySelector('.close-emb');
    const close = () => {
      box.remove();
      document.removeEventListener('keydown', onKeydown);
    };
    const onKeydown = (event) => event.key === 'Escape' && close();
    closeBtn.addEventListener('click', close);
    box.addEventListener('click', (event) => event.target === box && close());
    document.addEventListener('keydown', onKeydown);
    closeBtn.focus();

    const process = () => {
      if (!box.isConnected || !window.instgrm?.Embeds) return;
      window.instgrm.Embeds.process();
      box.querySelector('.instagram-status').textContent = 'If the reel does not load, open it directly on Instagram.';
    };

    if (window.instgrm) {
      process();
    } else if (!igLoaded) {
      igLoaded = true;
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.instagram.com/embed.js';
      s.onload = process;
      s.onerror = () => {
        box.querySelector('.instagram-status').textContent = 'Instagram could not be reached. Use the link below to open the reel.';
      };
      document.body.appendChild(s);
    }
    setTimeout(() => {
      if (box.isConnected && !box.querySelector('iframe')) {
        box.querySelector('.instagram-status').textContent = 'Instagram preview is unavailable here. Use the link below to open the reel.';
      }
    }, 7000);
  }

  // 9. Scroll Progress Bar & Parallax Motion
  const progressBar = $('#progress');
  const heroImg = $('.hero-visual img');
  const quoteSection = $('.quote');

  const onScrollMotion = () => {
    const doc = document.documentElement;
    const total = doc.scrollHeight - window.innerHeight;
    if (progressBar && total > 0) {
      progressBar.style.transform = `scaleX(${window.scrollY / total})`;
    }

    if (!calm) {
      if (heroImg) {
        heroImg.style.transform = `translateY(${Math.min(window.scrollY, 700) * 0.07}px) scale(1.05)`;
      }
      if (quoteSection) {
        const rect = quoteSection.getBoundingClientRect();
        quoteSection.style.backgroundPositionY = `calc(35% + ${rect.top * -0.08}px)`;
      }
    }
  };
  window.addEventListener('scroll', onScrollMotion, { passive: true });
  onScrollMotion();

  // 10. Interactive Magnetic Buttons & 3D Tilt for Reels
  if (!calm && matchMedia('(hover: hover)').matches) {
    // Magnetic pull on buttons
    document.querySelectorAll('.btn.mag, .theme-toggle, .btn-ctrl.mag').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width / 2) * 0.18;
        const dy = (e.clientY - rect.top - rect.height / 2) * 0.25;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });

    // 3D Perspective Tilt on Reel cards
    document.querySelectorAll('.reel').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(750px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-2px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // 11. Active Navigation Link on Scroll
  const menuLinks = document.querySelectorAll('.menu a:not(.btn)');
  const targetSections = Array.from(menuLinks)
    .map((a) => $(a.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && targetSections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            menuLinks.forEach((a) => {
              a.classList.toggle('on', a.getAttribute('href') === `#${e.target.id}`);
            });
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    targetSections.forEach((s) => sectionObserver.observe(s));
  }

})();
