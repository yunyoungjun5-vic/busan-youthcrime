import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const CoastFlightLandingPage: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check localStorage for "do not show today"
    try {
      const hideUntil = localStorage.getItem('hide_main_popup_until');
      if (!hideUntil || Date.now() > parseInt(hideUntil, 10)) {
        setShowPopup(true);
      }
    } catch {
      setShowPopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleDoNotShowToday = () => {
    try {
      // Hide until end of today (23:59:59)
      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999);
      localStorage.setItem('hide_main_popup_until', endOfToday.getTime().toString());
    } catch {
      // fallback
    }
    setShowPopup(false);
  };

  const handleGoToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPopup(false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#contact';
    }
  };

  useEffect(() => {
    // 1. Load Font Stylesheet
    const fontLink1 = document.createElement('link');
    fontLink1.rel = 'stylesheet';
    fontLink1.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap';
    document.head.appendChild(fontLink1);

    const fontLink2 = document.createElement('link');
    fontLink2.rel = 'stylesheet';
    fontLink2.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.3/dist/fonts/geist-sans/style.css';
    document.head.appendChild(fontLink2);

    const fontLink3 = document.createElement('link');
    fontLink3.rel = 'stylesheet';
    fontLink3.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.3/dist/fonts/geist-mono/style.css';
    document.head.appendChild(fontLink3);

    // 2. Inject Custom Styles
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      html {
        scroll-behavior: smooth;
        scroll-padding-top: 5.5rem;
      }
      body {
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
        font-family: 'Geist', sans-serif;
      }
      h1, h2, h3, h4, h5, .font-display { font-family: 'Syne', sans-serif; }
      .font-mono { font-family: 'Geist Mono', monospace; }
      .noise-overlay::after {
        content: ""; position: fixed; inset: 0; z-index: 9999; pointer-events: none;
        background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
        opacity: 0.03; mix-blend-mode: multiply;
      }
      .reveal-up {
        opacity: 0;
        transform: translateY(2rem);
        filter: blur(4px);
        transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1), filter 1s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .reveal-up.is-visible { opacity: 1; transform: translateY(0); filter: blur(0); }
      .reveal-clip { clip-path: polygon(0 0, 100% 0, 100% 0, 0 0); transition: clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
      .reveal-clip.is-visible { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }

      @keyframes slideUp { to { transform: translateY(0); } }
      @keyframes progress { 0% { width: 0; } 100% { width: 100%; } }
      @keyframes slideDown { 0% { top: -50%; } 100% { top: 100%; } }
      @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      @keyframes zoomInOut { 0%, 100% { transform: scale(1.05); } 50% { transform: scale(1.15); } }
      .animate-zoomInOut { animation: zoomInOut 20s ease-in-out infinite; }

      ::-webkit-scrollbar { width: 0.25rem; height: 0.25rem; }
      ::-webkit-scrollbar-track { background: #f8fafc; }
      ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 1rem; }
      ::-webkit-scrollbar-thumb:hover { background: #E8573A !important; }

      .text-balance { text-wrap: balance; }
      #webgl-container canvas { outline: none; }
      .hud-container { perspective: 1000px; transform-style: preserve-3d; }
      .codepen-button { display: inline-block; cursor: pointer; color: #fff; position: relative; text-decoration: none; font-weight: 600; border-radius: 100px; overflow: hidden; padding: 2px; isolation: isolate; font-family: 'Inter', sans-serif; }
      .codepen-button::before { content: ""; position: absolute; inset: 0; width: 400%; height: 100%; background: linear-gradient(115deg, #d1d1d1, #02367b, #a7bfde); background-size: 25% 100%; animation: border-shift .75s linear infinite; }
      @keyframes border-shift { to { transform: translateX(-25%); } }
      .codepen-button span { position: relative; display: flex; align-items: center; justify-content: center; gap: 0.5rem; background: #02367b; border-radius: 100px; height: 100%; transition: background 0.3s ease; }
      .codepen-button:hover span { background: #1A5DAB; }

      .codepen-button::before { background: linear-gradient(115deg, #f5c4b8, #E8573A, #f9d4c8) !important; background-size: 25% 100% !important; }
      .codepen-button span { background: #E8573A !important; }
      .codepen-button:hover span { background: #F06B4E !important; }
      .text-\[\#1A5DAB\] { color: #E8573A !important; }
      .bg-\[\#1A5DAB\] { background-color: #E8573A !important; }
      .border-\[rgba\(26\,93\,171\,0\.25\)\] { border-color: rgba(232,87,58,0.25) !important; }
      .shadow-\[0_0_10px_rgba\(26\,93\,171\,0\.20\)\] { box-shadow: 0 0 10px rgba(232,87,58,0.20) !important; }
      .hover\:text-\[\#2B7CD4\]:hover { color: #F06B4E !important; }
      .hover\:bg-\[\#1A5DAB\]:hover { background-color: #E8573A !important; }
      .group:hover .group-hover\:text-\[\#2B7CD4\] { color: #F06B4E !important; }
      .group:hover .group-hover\:bg-\[\#2B7CD4\] { background-color: #F06B4E !important; }
      .group:hover .group-hover\:border-\[\#2B7CD4\] { border-color: #F06B4E !important; }
      .bg-\[radial-gradient\(circle_at_center\,rgba\(26\,93\,171\,0\.08\)_0\%\,transparent_60\%\)\] { background: radial-gradient(circle at center, rgba(232,87,58,0.10) 0%, transparent 60%) !important; }

      /* Metric Cards Mobile Touch & Interactive Hybrid Styling */
      .metric-card {
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
        transition: transform 0.22s cubic-bezier(0.2, 0.9, 0.3, 1), background-color 0.4s ease, box-shadow 0.4s ease;
      }
      .metric-card:active {
        transform: scale(0.97) !important;
      }
      .metric-card.is-active {
        box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.2) !important;
        z-index: 25 !important;
      }
      .metric-card.metric-theme-accent.is-active {
        background-color: #E8573A !important;
      }
      .metric-card.metric-theme-dark.is-active {
        background-color: #0f172a !important;
      }
      .metric-card.is-active .metric-bg-img {
        opacity: 0.12 !important;
      }
      .metric-card.is-active .metric-title {
        color: #ffffff !important;
      }
      .metric-card.is-active .metric-body {
        transform: translateY(-1rem) !important;
      }
      .metric-card.is-active .metric-num {
        color: #ffffff !important;
      }
      .metric-card.is-active .metric-desc {
        color: rgba(255, 255, 255, 0.9) !important;
      }
    `;
    document.head.appendChild(styleEl);

    // 3. UI Interactions Setup (Runs immediately without waiting for CDN scripts)
    const initUI = () => {
      // Mobile Menu Toggle
      const toggleMenu = (e?: Event) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        const panel = document.getElementById('mobile-menu-panel');
        const btn = document.getElementById('mobile-menu-toggle');
        const barsIcon = document.getElementById('menu-icon-bars');
        const closeIcon = document.getElementById('menu-icon-close');
        if (!panel) return;

        const isHidden = panel.classList.contains('hidden');
        if (isHidden) {
          panel.classList.remove('hidden');
          btn?.setAttribute('aria-expanded', 'true');
          barsIcon?.classList.add('hidden');
          closeIcon?.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
          btn?.setAttribute('aria-expanded', 'false');
          barsIcon?.classList.remove('hidden');
          closeIcon?.classList.add('hidden');
        }
      };

      (window as any).__toggleCoastMobileMenu = toggleMenu;

      const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
      if (mobileMenuBtn) {
        mobileMenuBtn.onclick = (e) => toggleMenu(e);
        mobileMenuBtn.ontouchstart = (e) => {
          // ensure responsive touch
          e.stopPropagation();
        };
      }

      const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');
      mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
          const panel = document.getElementById('mobile-menu-panel');
          const btn = document.getElementById('mobile-menu-toggle');
          const barsIcon = document.getElementById('menu-icon-bars');
          const closeIcon = document.getElementById('menu-icon-close');
          panel?.classList.add('hidden');
          btn?.setAttribute('aria-expanded', 'false');
          barsIcon?.classList.remove('hidden');
          closeIcon?.classList.add('hidden');
        });
      });

      // Close menu on clicking outside
      const handleOutsideClick = (e: MouseEvent) => {
        const nav = document.getElementById('navbar');
        const panel = document.getElementById('mobile-menu-panel');
        if (nav && panel && !panel.classList.contains('hidden')) {
          if (!nav.contains(e.target as Node)) {
            toggleMenu();
          }
        }
      };
      document.addEventListener('click', handleOutsideClick);

      // Scroll Reveals
      const revealElements = document.querySelectorAll('.reveal-up, .reveal-clip');
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      });
      revealElements.forEach(el => revealObserver.observe(el));

      // Metrics Count Up
      const countElements = document.querySelectorAll('.count-up');
      const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const targetVal = parseFloat(el.getAttribute('data-target') || '0');
            const suffix = el.getAttribute('data-suffix') || '';
            const isFloat = el.getAttribute('data-decimal') === '1';
            const duration = 1600;
            const frameDuration = 1000 / 60;
            const totalFrames = Math.round(duration / frameDuration);
            let frame = 0;

            const updateCount = () => {
              frame++;
              const progress = Math.min(frame / totalFrames, 1);
              // ease-out cubic
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              const currentVal = targetVal * easeProgress;

              if (isFloat) {
                el.innerText = `${currentVal.toFixed(1)}${suffix}`;
              } else if (targetVal >= 1000) {
                el.innerText = `${Math.round(currentVal).toLocaleString()}${suffix}`;
              } else {
                el.innerText = `${Math.round(currentVal)}${suffix}`;
              }

              if (frame < totalFrames) {
                requestAnimationFrame(updateCount);
              } else {
                if (isFloat) {
                  el.innerText = `${targetVal.toFixed(1)}${suffix}`;
                } else if (targetVal >= 1000) {
                  el.innerText = `${targetVal.toLocaleString()}${suffix}`;
                } else {
                  el.innerText = `${targetVal}${suffix}`;
                }
              }
            };

            requestAnimationFrame(updateCount);
            countObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });
      countElements.forEach(el => countObserver.observe(el));

      // Metric Cards Mobile Touch & Click Hybrid Interaction (Immediate tap feedback + toggle)
      const metricCards = document.querySelectorAll('.metric-card');
      metricCards.forEach(card => {
        card.addEventListener('click', (e) => {
          e.stopPropagation();
          const isAlreadyActive = card.classList.contains('is-active');
          metricCards.forEach(c => c.classList.remove('is-active'));
          if (!isAlreadyActive) {
            card.classList.add('is-active');
          }
        });
      });

      // Dismiss metric card active state when tapping anywhere else
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.metric-card')) {
          metricCards.forEach(c => c.classList.remove('is-active'));
        }
      });

      // System Items Toggle (Supports both Mouse Hover & Mobile Touch/Click)
      const systemItems = document.querySelectorAll('.system-item');
      const blueprintLayers = document.querySelectorAll('.blueprint-layer');
      const activateSystemItem = (item: Element) => {
        const targetId = item.getAttribute('data-target');
        systemItems.forEach(i => {
          const indicator = i.querySelector('.indicator');
          const title = i.querySelector('h4');
          if (indicator && title) {
            if (i === item) {
              indicator.classList.remove('bg-slate-300');
              indicator.classList.add('bg-[#1A5DAB]');
              title.classList.remove('text-slate-900');
              title.classList.add('text-[#1A5DAB]');
            } else {
              indicator.classList.add('bg-slate-300');
              indicator.classList.remove('bg-[#1A5DAB]');
              title.classList.add('text-slate-900');
              title.classList.remove('text-[#1A5DAB]');
            }
          }
        });

        blueprintLayers.forEach((layer, index) => {
          if (index.toString() === targetId) {
            layer.classList.remove('opacity-0', 'scale-95');
            layer.classList.add('opacity-100', 'scale-100', 'active');
          } else {
            layer.classList.add('opacity-0', 'scale-95');
            layer.classList.remove('opacity-100', 'scale-100', 'active');
          }
        });
      };

      systemItems.forEach(item => {
        item.addEventListener('mouseenter', () => activateSystemItem(item));
        item.addEventListener('click', () => activateSystemItem(item));
      });

      // Bento Card Mouse Hover Parallax
      const bentoCards = document.querySelectorAll('.bento-card');
      bentoCards.forEach(card => {
        card.addEventListener('mousemove', (e: Event) => {
          const mouseEvent = e as MouseEvent;
          const rect = (card as HTMLElement).getBoundingClientRect();
          const x = mouseEvent.clientX - rect.left;
          const y = mouseEvent.clientY - rect.top;
          (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
          (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
        });
      });

      // Countdown Timer
      const countdownEl = document.getElementById('launch-countdown');
      if (countdownEl) {
        let hours = 18;
        let minutes = 4;
        let seconds = 22;

        countdownInterval = setInterval(() => {
          seconds--;
          if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
              minutes = 59;
              hours--;
            }
          }
          const h = hours.toString().padStart(2, '0');
          const m = minutes.toString().padStart(2, '0');
          const s = seconds.toString().padStart(2, '0');
          countdownEl.innerText = `-${h}:${m}:${s}`;
        }, 1000);
      }
    };

    // Initialize UI right away
    initUI();

    // 4. Load External Scripts (Three.js and Iconify)
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => resolve(); // prevent blocking
        document.body.appendChild(script);
      });
    };

    let animationFrameId: number;
    let cleanupThreeResize: (() => void) | null = null;
    let countdownInterval: NodeJS.Timeout | null = null;

    Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js'),
      loadScript('https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js')
    ]).then(() => {
      // Preloader logic
      const preloader = document.getElementById('preloader');
      if (preloader) {
        setTimeout(() => {
          preloader.style.opacity = '0';
          setTimeout(() => preloader.remove(), 1000);
        }, 1400);
      }

      // Three.js Particle Background
      const container = document.getElementById('webgl-container');
      const THREE = (window as any).THREE;
      if (container && THREE) {
        container.innerHTML = '';
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 700;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
          posArray[i] = (Math.random() - 0.5) * 20;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.015,
          color: 0xE8573A,
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 4;

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        const handleMouseMove = (event: MouseEvent) => {
          mouseX = (event.clientX - windowHalfX);
          mouseY = (event.clientY - windowHalfY);
        };
        document.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
          animationFrameId = requestAnimationFrame(animate);
          targetX = mouseX * 0.001;
          targetY = mouseY * 0.001;

          particlesMesh.rotation.y += 0.0005;
          particlesMesh.rotation.x += 0.0002;

          particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
          particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

          renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        cleanupThreeResize = () => {
          window.removeEventListener('resize', handleResize);
          document.removeEventListener('mousemove', handleMouseMove);
          if (container && renderer.domElement) {
            container.removeChild(renderer.domElement);
          }
        };
      }
    });

    return () => {
      document.head.removeChild(fontLink1);
      document.head.removeChild(fontLink2);
      document.head.removeChild(fontLink3);
      document.head.removeChild(styleEl);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (cleanupThreeResize) cleanupThreeResize();
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, []);

  const htmlContent = `
    <!-- Global Layout Lines -->
    <div class="fixed inset-y-0 left-[clamp(1.5rem,5vw,5rem)] w-px bg-slate-900/[0.04] pointer-events-none z-0"></div>
    <div class="fixed inset-y-0 right-[clamp(1.5rem,5vw,5rem)] w-px bg-slate-900/[0.04] pointer-events-none z-0"></div>

    <!-- Background Grid -->
    <div class="fixed inset-0 z-[-1] pointer-events-none bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,white_20%,transparent_80%)]"></div>

    <!-- Floating Navigation Pill -->
    <nav id="navbar" class="fixed top-3 sm:top-4 md:top-8 inset-x-0 mx-auto z-50 w-[94%] max-w-[68rem] transition-all duration-700 reveal-up is-visible" style="transition-delay: 0.2s;">
      <div class="flex items-center justify-between relative px-3 py-2 sm:px-4 sm:py-2.5 bg-white/95 backdrop-blur-xl border border-slate-900/10 rounded-full shadow-[0_10px_35px_-10px_rgba(0,0,0,0.08)]">
        <!-- Logo & Center Name -->
        <div class="flex-1 min-w-0 flex items-center pr-2 z-10">
          <a href="#" class="flex items-center gap-2 sm:gap-2.5 group/logo min-w-0">
            <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/7779c4e9-cf43-4379-a162-96455d9c5618_320w.png" alt="부산 아청법·미성년자 성범죄 심리상담센터" class="h-6 sm:h-7 md:h-8 w-auto object-contain shrink-0 transition-transform duration-500 group-hover/logo:scale-105">
            <span class="font-bold text-slate-900 tracking-tight text-xs sm:text-sm md:text-base leading-tight break-keep">
              부산 아청법·미성년자 성범죄 심리상담센터
            </span>
          </a>
        </div>

        <!-- Desktop Links -->
        <div class="hidden lg:flex items-center gap-1 px-3 border-x border-slate-900/10 h-[60%] whitespace-nowrap">
          <a href="#intro" class="text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-900/5 px-2.5 py-1.5 rounded-full transition-all duration-300">
            센터소개
          </a>
          <a href="#services" class="text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-900/5 px-2.5 py-1.5 rounded-full transition-all duration-300">
            상담분야
          </a>
          <a href="#evidence" class="text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-900/5 px-2.5 py-1.5 rounded-full transition-all duration-300">
            양형자료
          </a>
          <a href="#education" class="text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-900/5 px-2.5 py-1.5 rounded-full transition-all duration-300">
            재범방지교육
          </a>
          <a href="#process" class="text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-900/5 px-2.5 py-1.5 rounded-full transition-all duration-300">
            상담절차
          </a>
          <a href="#location" class="text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-900/5 px-2.5 py-1.5 rounded-full transition-all duration-300">
            오시는 길
          </a>
        </div>

        <!-- CTA & Mobile Menu Toggle -->
        <div class="flex-none flex items-center gap-2 pl-1 z-10">
          <a href="https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%84%B1%EB%B2%94%EC%A3%84%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4/place/2050622926?searchType=place&lng=128.9705167&lat=35.1246838&placePath=/booking?bookingRedirectUrl=https://m.booking.naver.com/booking/13/bizes/1643592?theme=place&entry=pll&lang=ko&service-target=map-pc&pcmap=1&area=pll&c=15.00,0,0,0,dh" target="_blank" rel="noopener noreferrer" class="codepen-button hidden lg:inline-block">
            <span class="px-4 py-2 text-xs font-medium tracking-wide">
              비공개 상담 신청
              <iconify-icon icon="solar:arrow-right-up-linear" class="w-4 h-4"></iconify-icon>
            </span>
          </a>
          
          <button 
            id="mobile-menu-toggle" 
            type="button"
            onclick="window.__toggleCoastMobileMenu && window.__toggleCoastMobileMenu(event)"
            aria-label="모바일 메뉴 열기/닫기" 
            aria-expanded="false" 
            class="lg:hidden shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 transition-all cursor-pointer shadow-sm border border-slate-200/60"
          >
            <svg id="menu-icon-bars" class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg id="menu-icon-close" class="w-5 h-5 hidden transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu Panel -->
      <div id="mobile-menu-panel" class="hidden lg:hidden mt-2.5 p-4 bg-white/95 backdrop-blur-2xl border border-slate-900/10 rounded-2xl shadow-2xl space-y-3 transition-all z-50">
        <div class="grid grid-cols-2 gap-2 text-sm">
          <a href="#intro" class="mobile-nav-link flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 active:bg-blue-100 text-slate-800 hover:text-[#1A5DAB] font-medium transition-colors">
            <span class="w-1.5 h-1.5 rounded-full bg-[#1A5DAB]"></span>
            센터소개
          </a>
          <a href="#services" class="mobile-nav-link flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 active:bg-blue-100 text-slate-800 hover:text-[#1A5DAB] font-medium transition-colors">
            <span class="w-1.5 h-1.5 rounded-full bg-[#1A5DAB]"></span>
            상담분야
          </a>
          <a href="#evidence" class="mobile-nav-link flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 active:bg-blue-100 text-slate-800 hover:text-[#1A5DAB] font-medium transition-colors">
            <span class="w-1.5 h-1.5 rounded-full bg-[#1A5DAB]"></span>
            양형자료
          </a>
          <a href="#education" class="mobile-nav-link flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 active:bg-blue-100 text-slate-800 hover:text-[#1A5DAB] font-medium transition-colors">
            <span class="w-1.5 h-1.5 rounded-full bg-[#1A5DAB]"></span>
            재범방지교육
          </a>
          <a href="#process" class="mobile-nav-link flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 active:bg-blue-100 text-slate-800 hover:text-[#1A5DAB] font-medium transition-colors">
            <span class="w-1.5 h-1.5 rounded-full bg-[#1A5DAB]"></span>
            상담절차
          </a>
          <a href="#location" class="mobile-nav-link flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 active:bg-blue-100 text-slate-800 hover:text-[#1A5DAB] font-medium transition-colors">
            <span class="w-1.5 h-1.5 rounded-full bg-[#1A5DAB]"></span>
            오시는 길
          </a>
        </div>

        <div class="pt-2 border-t border-slate-100 flex flex-col gap-2">
          <a href="https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%84%B1%EB%B2%94%EC%A3%84%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4/place/2050622926?searchType=place&lng=128.9705167&lat=35.1246838&placePath=/booking?bookingRedirectUrl=https://m.booking.naver.com/booking/13/bizes/1643592?theme=place&entry=pll&lang=ko&service-target=map-pc&pcmap=1&area=pll&c=15.00,0,0,0,dh" target="_blank" rel="noopener noreferrer" class="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#1A5DAB] hover:bg-[#2B7CD4] active:scale-[0.99] text-white rounded-xl text-sm font-medium transition-all shadow-md shadow-blue-900/10">
            <span>비공개 상담 신청 (네이버 예약)</span>
            <iconify-icon icon="solar:arrow-right-up-linear" class="w-4 h-4"></iconify-icon>
          </a>
          <a href="tel:0507-1380-0028" class="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 active:scale-[0.99] text-slate-700 rounded-xl text-xs font-medium transition-all">
            <iconify-icon icon="solar:phone-calling-linear" class="w-4 h-4 text-[#1A5DAB]"></iconify-icon>
            <span>전화 상담 0507-1380-0028</span>
          </a>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative min-h-[100dvh] w-full flex items-center pt-[8rem] pb-[4rem] px-[clamp(1.5rem,5vw,5rem)] overflow-hidden">
      <!-- WebGL & Photographic Background -->
      <div class="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden bg-gradient-to-b from-[#AEC7E4] via-[#C0D6EC] to-white">
        <!-- Left Cloud -->
        <div class="absolute -left-[10%] top-[15%] w-[50vw] min-w-[400px] aspect-square bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center mix-blend-screen opacity-90" style="-webkit-mask-image: radial-gradient(circle at center, black 15%, transparent 60%); mask-image: radial-gradient(circle at center, black 15%, transparent 60%);"></div>

        <!-- Right Cloud -->
        <div class="absolute -right-[15%] top-[5%] w-[60vw] min-w-[500px] aspect-square bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center mix-blend-screen opacity-90" style="-webkit-mask-image: radial-gradient(circle at center, black 15%, transparent 60%); mask-image: radial-gradient(circle at center, black 15%, transparent 60%); transform: scaleX(-1) rotate(5deg);"></div>

        <div id="webgl-container" class="absolute inset-0 z-0 opacity-20 mix-blend-multiply"></div>
      </div>

      <div class="w-full max-w-[90rem] mx-auto relative z-10 grid grid-cols-1 gap-12 items-center">
        <div class="flex flex-col items-center text-center mt-12 md:mt-0">
          <div class="inline-flex items-center gap-3 border border-slate-900/10 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full mb-8 reveal-up shadow-sm is-visible" style="transition-delay: 1.1s;">
            <div class="w-2 h-2 bg-[#1A5DAB] rounded-full animate-pulse shadow-[0_0_10px_rgba(26,93,171,0.20)]"></div>
            <span class="text-xs font-medium text-slate-900 tracking-wider">
              부산 성범죄 전문 심리상담센터
            </span>
          </div>

          <h1 class="font-display font-normal text-[clamp(2.2rem,6.5vw,7.5rem)] leading-[1.05] tracking-tight text-slate-900 mb-8 reveal-up text-balance flex flex-col items-center w-full is-visible break-keep" style="transition-delay: 1.2s;">
            <span class="sr-only">부산 성범죄 전문 심리상담센터</span>
            <span>부산 아청법·미성년자</span>
            <span class="flex items-center justify-center gap-3 md:gap-4 flex-wrap w-full">
              성범죄
              <span class="hidden sm:inline-flex h-[clamp(2.5rem,5vw,5.5rem)] w-[clamp(6rem,12vw,14rem)] bg-white border rounded-full items-center justify-center overflow-hidden relative group backdrop-blur-sm shadow-sm border-white">
                <span class="bg-center group-hover:scale-110 transition-transform duration-1000 opacity-60 bg-[url(https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?w=320&q=80)] bg-cover absolute top-0 right-0 bottom-0 left-0"></span>
                <span class="z-[5] border-stone-50 absolute top-0 right-0 bottom-0 left-0"></span>
                <span class="text-xs text-neutral-50 tracking-wider font-medium z-10 relative">
                  전문상담
                </span>
              </span>
              심리상담센터
            </span>
          </h1>

          <p class="font-sans text-[clamp(1rem,1.4vw,1.35rem)] font-light text-slate-600 max-w-[58ch] leading-[1.7] mb-12 reveal-up text-balance break-keep" style="transition-delay: 1.3s;">
            18년 이상의 성범죄 전문 심리상담 경험을 바탕으로 아청법 및 미성년자 관련 성범죄 사건의 심리적 원인을 분석하고 재범방지 상담, 성인지교육, 사건 단계별 상담과 양형자료 준비를 지원합니다.
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto reveal-up is-visible" style="transition-delay: 1.4s;">
            <a href="https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%84%B1%EB%B2%94%EC%A3%84%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4/place/2050622926?searchType=place&lng=128.9705167&lat=35.1246838&placePath=/booking?bookingRedirectUrl=https://m.booking.naver.com/booking/13/bizes/1643592?theme=place&entry=pll&lang=ko&service-target=map-pc&pcmap=1&area=pll&c=15.00,0,0,0,dh" target="_blank" rel="noopener noreferrer" class="codepen-button w-full sm:w-auto">
              <span class="px-8 py-4 text-sm font-medium tracking-wide">
                비공개 상담 신청
                <iconify-icon icon="solar:paperplane-linear" class="w-5 h-5"></iconify-icon>
              </span>
            </a>
            <a href="#services" class="group flex items-center justify-center gap-3 h-14 px-6 text-xs text-slate-600 hover:text-slate-900 font-medium tracking-wider transition-colors w-full sm:w-auto">
              <div class="w-8 h-[1px] bg-slate-300 group-hover:w-12 group-hover:bg-slate-900 transition-all duration-300"></div>
              상담분야 안내
            </a>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute left-[clamp(1.5rem,5vw,5rem)] bottom-12 hidden lg:flex flex-col items-start gap-4 reveal-up is-visible" style="transition-delay: 1.5s;">
        <div class="text-xs font-medium text-slate-900 tracking-widest transform -rotate-90 origin-left translate-y-12">
          스크롤
        </div>
        <div class="w-[1px] h-16 bg-slate-900/30 relative overflow-hidden ml-2">
          <div class="absolute top-0 left-0 w-full h-1/2 bg-slate-900 animate-[slideDown_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </section>

    <!-- Marquee Partners -->
    <section class="border-y border-slate-200 overflow-hidden relative flex items-center h-20 md:h-28 bg-slate-50">
      <!-- Static Overlay for Marquee Fade/Cover -->
      <div class="absolute left-0 top-0 bottom-0 z-20 flex items-center pl-[clamp(1.5rem,5vw,5rem)] pr-6 md:pr-10 border-r border-slate-200 shadow-[20px_0_30px_-10px_rgba(255,255,255,1)] bg-slate-50">
        <div class="text-xs text-slate-600 tracking-wider font-medium uppercase whitespace-nowrap">
          전문 상담
          <br>
          주요 분야
        </div>
      </div>

      <!-- Right Fade -->
      <div class="absolute right-0 top-0 bottom-0 z-20 w-32 bg-gradient-to-l to-transparent pointer-events-none from-slate-50"></div>

      <!-- Marquee Track -->
      <div class="flex flex-nowrap w-max animate-[marquee_40s_linear_infinite] opacity-80 hover:opacity-100 transition-opacity duration-700 pl-[250px] md:pl-[350px]" style="animation: marquee 40s linear infinite;">
        <div class="flex items-center gap-12 md:gap-20 pr-12 md:pr-20 min-w-max">
          <span class="font-normal text-base md:text-xl tracking-tight text-slate-600 hover:text-slate-900 transition-all duration-300 cursor-default">
            18년+ 전문상담
          </span>
          <span class="font-normal text-base md:text-xl tracking-tight text-slate-600 hover:text-slate-900 transition-all duration-300 cursor-default">
            아청법 상담
          </span>
          <span class="font-normal text-base md:text-xl tracking-tight text-slate-600 hover:text-slate-900 transition-all duration-300 cursor-default">
            아청물 상담
          </span>
          <span class="font-normal text-base md:text-xl tracking-tight text-slate-600 hover:text-slate-900 transition-all duration-300 cursor-default">
            미성년자 성범죄 상담
          </span>
          <span class="font-normal text-base md:text-xl tracking-tight text-slate-600 hover:text-slate-900 transition-all duration-300 cursor-default">
            재범방지교육
          </span>
          <span class="font-normal text-base md:text-xl tracking-tight text-slate-600 hover:text-slate-900 transition-all duration-300 cursor-default">
            성인지교육
          </span>
          <span class="font-normal text-base md:text-xl tracking-tight text-slate-600 hover:text-slate-900 transition-all duration-300 cursor-default">
            양형자료
          </span>
          <span class="font-normal text-base md:text-xl tracking-tight text-slate-600 hover:text-slate-900 transition-all duration-300 cursor-default">
            수사·재판 상담
          </span>
        </div>
        <div class="flex items-center gap-12 md:gap-20 pr-12 md:pr-20 min-w-max" aria-hidden="true">
          <span class="font-normal text-base md:text-xl tracking-tight text-slate-600 hover:text-slate-900 transition-all duration-300 cursor-default">
            18년+ 전문상담
          </span>
          <span class="font-normal text-base md:text-xl tracking-tight text-slate-600 hover:text-slate-900 transition-all duration-300 cursor-default">
            아청법 상담
          </span>
          <span class="font-normal text-base md:text-xl tracking-tight text-slate-600 hover:text-slate-900 transition-all duration-300 cursor-default">
            아청물 상담
          </span>
          <span class="font-normal text-base md:text-xl tracking-tight text-slate-600 hover:text-slate-900 transition-all duration-300 cursor-default">
            미성년자 성범죄 상담
          </span>
          <span class="font-normal text-base md:text-xl tracking-tight text-slate-600 hover:text-slate-900 transition-all duration-300 cursor-default">
            재범방지교육
          </span>
          <span class="font-normal text-base md:text-xl tracking-tight text-slate-600 hover:text-slate-900 transition-all duration-300 cursor-default">
            성인지교육
          </span>
          <span class="font-normal text-base md:text-xl tracking-tight text-slate-600 hover:text-slate-900 transition-all duration-300 cursor-default">
            양형자료
          </span>
          <span class="font-normal text-base md:text-xl tracking-tight text-slate-600 hover:text-slate-900 transition-all duration-300 cursor-default">
            수사·재판 상담
          </span>
        </div>
      </div>
    </section>

    <!-- Architecture / Asymmetric Bento Grid (Section 1 - Duplicated) -->
    <section id="intro" class="py-[6rem] md:py-[10rem] px-[clamp(1.5rem,5vw,5rem)] relative z-10 bg-white border-t border-slate-100">
      <div class="max-w-[90rem] mx-auto">
        <div class="mb-12 md:mb-20 reveal-up is-visible">
          <span class="font-mono text-xs font-medium text-[#1A5DAB] tracking-[0.2em] uppercase flex items-center gap-3 mb-6">
            <span class="w-2 h-2 bg-[#1A5DAB]"></span>
            센터소개
          </span>
          <h2 class="font-display font-normal text-[clamp(2.5rem,5vw,4.5rem)] tracking-tight leading-none mb-6 text-slate-900 break-keep">
            사건을 이해하는
            <br>
            <span class="text-slate-400">전문 심리상담</span>
          </h2>
          <p class="text-[clamp(1.125rem,1.5vw,1.25rem)] font-light text-slate-500 max-w-[50ch] leading-[1.7] break-keep">
            오랜 기간 축적된 법률적 노하우와 성범죄 사건 상담 경험을 바탕으로 실제 양형에 도움이 되는 차별화된 양형자료를 통해 체계적인 양형 준비를 지원합니다.
          </p>
        </div>

        <!-- Asymmetric Grid -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          <!-- Left Box (Col 4) - Director Image -->
          <div class="md:col-span-4 bg-slate-50/80 border border-slate-200 relative overflow-hidden transition-all duration-700 group hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] flex items-center justify-center reveal-up bento-card hover:scale-[1.01] hover:z-20 rounded-xl p-4 sm:p-5 is-visible" style="--mouse-x: 157.203125px; --mouse-y: 626.203125px;">
            <div class="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
              <img src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1776971442/dec5ff46-df87-4bb0-8b0d-d90f1cd06d5d_cxd8uj.png" alt="윤영준 대표원장 심리상담" class="w-full h-auto max-h-[32rem] object-contain transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" referrerpolicy="no-referrer">
            </div>
          </div>

          <!-- Right Box (Col 8) - Center Introduction Text -->
          <div class="md:col-span-8 bg-slate-100 border border-slate-200 relative overflow-hidden transition-all duration-700 group hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] flex flex-col justify-center reveal-up bento-card hover:scale-[1.01] hover:z-20 rounded-xl p-6 sm:p-8 md:p-9 is-visible" style="transition-delay: 0.1s; --mouse-x: 552.40625px; --mouse-y: 766.203125px;">
            <div class="absolute inset-0 z-0 overflow-hidden rounded-xl">
              <img src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1774346107/photo-1497366216548-37526070297c_uttxrz.jpg" alt="사건을 이해하는 전문 심리상담" class="w-full h-full object-cover contrast-[1.05] saturate-[1.1] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" referrerpolicy="no-referrer">
              <div class="absolute inset-0 bg-white/80 backdrop-blur-[1px] z-10 pointer-events-none"></div>
            </div>
            <div class="z-10 relative w-full my-auto">
              <h3 class="font-display font-bold text-[clamp(1.5rem,2.2vw,2rem)] text-slate-900 mb-4 md:mb-5 leading-tight tracking-tight break-keep">
                사건을 이해하는 <span class="text-[#1A5DAB]">전문 심리상담</span>
              </h3>
              <div class="space-y-3 sm:space-y-3.5 text-[0.92rem] sm:text-[0.98rem] md:text-[1.02rem] font-normal text-slate-800 leading-[1.68] sm:leading-[1.72] break-keep">
                <p class="font-bold text-slate-950 text-base sm:text-lg">본 센터는 성범죄 사건과 관련된 심리상담을 전문적으로 진행하는 상담기관입니다.</p>
                <p>
                  성범죄 사건은 단순한 개인의 심리 문제만으로 설명하기 어려운 경우가 많습니다. 수사 절차와 법적 상황, 사회적 관계, 사건 이후 개인이 경험하는 심리 상태가 서로 복합적으로 영향을 미치기 때문입니다.
                </p>
                <p class="font-medium text-slate-900">
                  이러한 이유로 성범죄 사건 상담은 일반적인 심리상담과는 다른 전문적인 접근이 필요합니다.
                </p>
                <p>
                  저희 센터는 오랜 기간 축적된 법률적 노하우와 성범죄 사건 상담 경험을 바탕으로, 사건의 특성과 내담자의 심리 상태를 면밀하게 반영한 전문적인 심리상담과 체계적인 재범방지 교육을 제공합니다.
                </p>
                <p class="font-medium text-slate-900">
                  특히 본 센터는 단순한 상담확인서나 형식적인 교육자료 제공에 그치지 않고, 실제 양형 준비에 도움이 될 수 있는 차별화된 양형자료를 제공하는 데 중점을 두고 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Architecture / Asymmetric Bento Grid (Section 1) -->
    <section id="services" class="py-[6rem] md:py-[10rem] px-[clamp(1.5rem,5vw,5rem)] relative z-10 bg-white border-t border-slate-100">
      <div class="max-w-[90rem] mx-auto">
        <div class="mb-12 md:mb-20 reveal-up is-visible">
          <span class="font-mono text-xs font-medium text-[#1A5DAB] tracking-[0.2em] uppercase flex items-center gap-3 mb-6">
            <span class="w-2 h-2 bg-[#1A5DAB]"></span>
            전문 상담 분야
          </span>
          <h2 class="font-display font-normal text-[clamp(2.5rem,5vw,4.5rem)] tracking-tight leading-none mb-6 text-slate-900 break-keep">
            아청법·미성년자
            <br>
            <span class="text-slate-400">성범죄 심리상담</span>
          </h2>
          <p class="text-[clamp(1.125rem,1.5vw,1.25rem)] font-light text-slate-500 max-w-[50ch] leading-[1.7] break-keep">
            아청법(아동·청소년의 성보호에 관한 법률) 및 미성년자 대상 성범죄 사건에 특화된 1:1 비밀보장 전문 심리상담을 제공합니다.
          </p>
        </div>

        <!-- Asymmetric Grid -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto md:auto-rows-[24rem]">
          <!-- Main Featured Box (Col 8, Row 2) -->
          <div class="md:col-span-8 md:row-span-2 bg-white border border-slate-200 relative overflow-hidden transition-all duration-700 group hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] flex flex-col justify-between reveal-up min-h-[24rem] bento-card hover:scale-[1.01] hover:z-20 rounded-xl is-visible" style="--mouse-x: 552.40625px; --mouse-y: 766.203125px;">
            <div class="absolute inset-0 z-0 overflow-hidden rounded-xl">
              <div class="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-white/95 via-white/70 to-transparent z-10 pointer-events-none"></div>
              <img src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1788245089/ChatGPT_Image_2026%EB%85%84_9%EC%9B%94_1%EC%9D%BC_%EC%98%A4%ED%9B%84_03_43_55_ri2ouy.png" alt="아청물 소지·시청·유포" class="w-full h-full object-cover saturate-[1.1] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-[1.08] group-hover:contrast-[1.05]">
            </div>
            <div class="z-10 relative h-full flex flex-col justify-between p-8 md:p-12 pointer-events-none">
              <div class="flex justify-between items-start mb-12 md:mb-0">
                <div class="font-mono text-xs font-medium bg-slate-100/80 border border-slate-200 px-3 py-1 rounded-full text-slate-600 backdrop-blur-md">
                  분야 01
                </div>
                <iconify-icon icon="solar:paperplane-linear" class="w-8 h-8 text-slate-900 opacity-40 group-hover:opacity-100 group-hover:text-[#2B7CD4] transition-all duration-500 text-3xl"></iconify-icon>
              </div>
              <div class="max-w-[32rem] pointer-events-auto">
                <h3 class="font-display font-normal text-[clamp(1.75rem,2.8vw,2.5rem)] text-slate-900 mb-4 leading-tight tracking-tight drop-shadow-sm group-hover:drop-shadow-none break-keep">
                  아청물 소지·시청·유포
                </h3>
                <p class="text-base font-light text-slate-600 leading-[1.7] mb-8 group-hover:text-slate-800 transition-colors break-keep">
                  아동·청소년 성착취물 소지, 구입, 시청 및 유포 사건의 심리적 기저 요인을 분석하고 심층적인 재범방지 전문상담을 진행합니다.
                </p>
                <a href="#contact" class="inline-flex items-center gap-2 font-medium text-xs text-[#1A5DAB] hover:text-[#2B7CD4] transition-colors">
                  상세 상담 안내
                  <iconify-icon icon="solar:arrow-right-linear" class="w-4 h-4"></iconify-icon>
                </a>
              </div>
            </div>
          </div>

          <!-- Vertical Box (Col 4, Row 2) -->
          <div class="md:col-span-4 md:row-span-2 bg-white border border-slate-200 relative overflow-hidden transition-all duration-700 group hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] flex flex-col justify-between reveal-up min-h-[24rem] bento-card hover:scale-[1.01] hover:z-20 rounded-xl is-visible" style="transition-delay: 0.1s; --mouse-x: 157.203125px; --mouse-y: 626.203125px;">
            <div class="absolute inset-0 z-0 overflow-hidden rounded-xl">
              <div class="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-white/95 via-white/70 to-transparent z-10 pointer-events-none"></div>
              <img src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1788245526/ChatGPT_Image_2026%EB%85%84_9%EC%9B%94_1%EC%9D%BC_%EC%98%A4%ED%9B%84_03_51_51_omzp0l.png" alt="미성년자 성착취·강제추행" class="w-full h-full object-cover contrast-[1.08] saturate-[1.05] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-[1.08] group-hover:contrast-[1.05]">
            </div>
            <div class="z-10 relative h-full flex flex-col justify-between p-8 md:p-12 pointer-events-none">
              <div class="flex justify-between items-start mb-8 md:mb-12">
                <div class="font-mono text-xs font-medium bg-slate-100/80 border border-slate-200 px-3 py-1 rounded-full text-slate-600 backdrop-blur-md">
                  분야 02
                </div>
              </div>
              <div class="pointer-events-auto">
                <h3 class="font-display font-normal text-[clamp(1.35rem,2.2vw,1.75rem)] text-slate-900 mb-3 tracking-tight break-keep">
                  미성년자 성착취·강제추행
                </h3>
                <p class="text-base font-light text-slate-600 leading-relaxed mb-6 group-hover:text-slate-800 transition-colors break-keep">
                  온라인 그루밍, 미성년자 대상 성범죄 사건에 대한 심리 평가 및 전문 교정 상담.
                </p>
                <a href="#contact" class="inline-flex items-center gap-2 font-medium text-xs text-[#1A5DAB] hover:text-[#2B7CD4] transition-colors">
                  상세 상담 안내
                  <iconify-icon icon="solar:arrow-right-linear" class="w-4 h-4"></iconify-icon>
                </a>
              </div>
            </div>
          </div>

          <!-- Horizontal Wide Box (Col 12, Row 1) -->
          <div class="md:col-span-12 bg-white border border-slate-200 relative overflow-hidden transition-all duration-700 group hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] flex flex-col md:flex-row reveal-up bento-card hover:scale-[1.01] hover:z-20 rounded-xl is-visible" style="transition-delay: 0.2s; --mouse-x: 950.40625px; --mouse-y: 28.203125px;">
            <div class="absolute inset-0 z-0 overflow-hidden rounded-xl">
              <div class="absolute inset-0 bg-gradient-to-t from-white/95 via-white/70 to-transparent md:bg-gradient-to-r md:from-white/95 md:via-white/70 md:to-transparent z-10 pointer-events-none"></div>
              <img src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1788245664/ChatGPT_Image_2026%EB%85%84_9%EC%9B%94_1%EC%9D%BC_%EC%98%A4%ED%9B%84_03_54_08_hod96d.png" alt="통신매체이용음란·카메라촬영" class="contrast-[1.05] saturate-[1.05] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-[1.08] group-hover:contrast-[1.05] w-full h-full object-cover">
            </div>
            <div class="p-8 md:p-12 flex-1 flex flex-col justify-center z-10 relative w-full pointer-events-none">
              <div class="font-mono text-xs font-medium bg-slate-100/80 border border-slate-200 px-3 py-1 rounded-full text-slate-600 self-start mb-6 backdrop-blur-md">
                분야 03
              </div>
              <h3 class="font-display font-normal text-[clamp(1.5rem,2.2vw,2rem)] text-slate-900 mb-4 tracking-tight break-keep">
                통신매체이용음란·카메라촬영
              </h3>
              <p class="text-base font-light text-slate-600 leading-[1.7] max-w-[45ch] mb-6 group-hover:text-slate-800 transition-colors break-keep">
                통매음 및 불법촬영 등 디지털 성범죄에 대한 왜곡된 성인지 개선과 충동조절 집중 치료상담 프로그램을 운영합니다.
              </p>
              <a href="#contact" class="inline-flex items-center gap-2 font-medium text-xs text-[#1A5DAB] hover:text-[#2B7CD4] transition-colors pointer-events-auto">
                상세 상담 안내
                <iconify-icon icon="solar:arrow-right-linear" class="w-4 h-4"></iconify-icon>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Architecture / Asymmetric Bento Grid (Section 2) -->
    <section id="evidence" class="py-[6rem] md:py-[10rem] px-[clamp(1.5rem,5vw,5rem)] relative z-10 bg-white border-t border-slate-100">
      <div class="max-w-[90rem] mx-auto">
        <div class="mb-12 md:mb-20 reveal-up is-visible">
          <span class="font-mono text-xs font-medium text-[#1A5DAB] tracking-[0.2em] uppercase flex items-center gap-3 mb-6">
            <span class="w-2 h-2 bg-[#1A5DAB]"></span>
            체계적 양형 지원
          </span>
          <h2 class="font-display font-normal text-[clamp(2.5rem,5vw,4.5rem)] tracking-tight leading-none mb-6 text-slate-900 break-keep">
            수사·재판 단계별
            <br>
            <span class="text-slate-400">심리상담 및 양형자료</span>
          </h2>
          <p class="text-[clamp(1.125rem,1.5vw,1.25rem)] font-light text-slate-500 max-w-[50ch] leading-[1.7] break-keep">
            경찰·검찰 수사 단계부터 법원 재판까지, 진정성 있는 반성과 변화를 증명할 수 있는 객관적인 심리상담 의견서를 발급합니다.
          </p>
        </div>

        <!-- Asymmetric Grid -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto md:auto-rows-[24rem]">
          <!-- Main Featured Box (Col 8, Row 2) -->
          <div class="md:col-span-8 md:row-span-2 bg-white border border-slate-200 relative overflow-hidden transition-all duration-700 group hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] flex flex-col justify-between reveal-up min-h-[24rem] bento-card hover:scale-[1.01] hover:z-20 rounded-xl is-visible" style="--mouse-x: 552.40625px; --mouse-y: 766.203125px;">
            <div class="absolute inset-0 z-0 overflow-hidden rounded-xl">
              <div class="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-white/95 via-white/70 to-transparent z-10 pointer-events-none"></div>
              <img src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1788245772/ChatGPT_Image_2026%EB%85%84_9%EC%9B%94_1%EC%9D%BC_%EC%98%A4%ED%9B%84_03_55_59_zwh7hy.png" alt="법원 제출용 심리평가의견서" class="w-full h-full object-cover saturate-[1.1] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-[1.08] group-hover:contrast-[1.05]">
            </div>
            <div class="z-10 relative h-full flex flex-col justify-between p-8 md:p-12 pointer-events-none">
              <div class="flex justify-between items-start mb-12 md:mb-0">
                <div class="font-mono text-xs font-medium bg-slate-100/80 border border-slate-200 px-3 py-1 rounded-full text-slate-600 backdrop-blur-md">
                  과정 01
                </div>
                <iconify-icon icon="solar:paperplane-linear" class="w-8 h-8 text-slate-900 opacity-40 group-hover:opacity-100 group-hover:text-[#2B7CD4] transition-all duration-500 text-3xl"></iconify-icon>
              </div>
              <div class="max-w-[32rem] pointer-events-auto">
                <h3 class="font-display font-normal text-[clamp(1.75rem,2.8vw,2.5rem)] text-slate-900 mb-4 leading-tight tracking-tight drop-shadow-sm group-hover:drop-shadow-none break-keep">
                  법원 제출용 심리평가의견서
                </h3>
                <p class="text-base font-light text-slate-600 leading-[1.7] mb-8 group-hover:text-slate-800 transition-colors break-keep">
                  공인 임상심리전문가의 정밀 심리검사와 상담 결과를 바탕으로 재범 위험성 평가 및 재발방지 의지를 입증하는 전문 소견서를 작성합니다.
                </p>
                <a href="#contact" class="inline-flex items-center gap-2 font-medium text-xs text-[#1A5DAB] hover:text-[#2B7CD4] transition-colors">
                  발급 절차 확인
                  <iconify-icon icon="solar:arrow-right-linear" class="w-4 h-4"></iconify-icon>
                </a>
              </div>
            </div>
          </div>

          <!-- Vertical Box (Col 4, Row 2) -->
          <div id="education" class="md:col-span-4 md:row-span-2 bg-white border border-slate-200 relative overflow-hidden transition-all duration-700 group hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] flex flex-col justify-between reveal-up min-h-[24rem] bento-card hover:scale-[1.01] hover:z-20 rounded-xl is-visible" style="transition-delay: 0.1s; --mouse-x: 157.203125px; --mouse-y: 626.203125px;">
            <div class="absolute inset-0 z-0 overflow-hidden rounded-xl">
              <div class="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-white/95 via-white/70 to-transparent z-10 pointer-events-none"></div>
              <img src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1788246079/ChatGPT_Image_2026%EB%85%84_9%EC%9B%94_1%EC%9D%BC_%EC%98%A4%ED%9B%84_04_01_03_iyqhy2.png" alt="재범방지 맞춤 교육" class="w-full h-full object-cover contrast-[1.08] saturate-[1.05] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-[1.08] group-hover:contrast-[1.05]">
            </div>
            <div class="z-10 relative h-full flex flex-col justify-between p-8 md:p-12 pointer-events-none">
              <div class="flex justify-between items-start mb-8 md:mb-12">
                <div class="font-mono text-xs font-medium bg-slate-100/80 border border-slate-200 px-3 py-1 rounded-full text-slate-600 backdrop-blur-md">
                  과정 02
                </div>
              </div>
              <div class="pointer-events-auto">
                <h3 class="font-display font-normal text-[clamp(1.35rem,2.2vw,1.75rem)] text-slate-900 mb-3 tracking-tight break-keep">
                  재범방지 맞춤 교육
                </h3>
                <p class="text-base font-light text-slate-600 leading-relaxed mb-6 group-hover:text-slate-800 transition-colors break-keep">
                  사건 유형별 왜곡된 인식을 교정하고 스트레스 및 충동 조절 대처 전략을 수립합니다.
                </p>
                <a href="#contact" class="inline-flex items-center gap-2 font-medium text-xs text-[#1A5DAB] hover:text-[#2B7CD4] transition-colors">
                  발급 절차 확인
                  <iconify-icon icon="solar:arrow-right-linear" class="w-4 h-4"></iconify-icon>
                </a>
              </div>
            </div>
          </div>

          <!-- Horizontal Wide Box (Col 12, Row 1) -->
          <div class="md:col-span-12 bg-white border border-slate-200 relative overflow-hidden transition-all duration-700 group hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] flex flex-col md:flex-row reveal-up bento-card hover:scale-[1.01] hover:z-20 rounded-xl is-visible" style="transition-delay: 0.2s; --mouse-x: 950.40625px; --mouse-y: 28.203125px;">
            <div class="absolute inset-0 z-0 overflow-hidden rounded-xl">
              <div class="absolute inset-0 bg-gradient-to-t from-white/95 via-white/70 to-transparent md:bg-gradient-to-r md:from-white/95 md:via-white/70 md:to-transparent z-10 pointer-events-none"></div>
              <img src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1788246309/ChatGPT_Image_2026%EB%85%84_9%EC%9B%94_1%EC%9D%BC_%EC%98%A4%ED%9B%84_04_04_52_ydkqyh.png" alt="성인지 감수성 개선 프로그램" class="contrast-[1.05] saturate-[1.05] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-[1.08] group-hover:contrast-[1.05] w-full h-full object-cover">
            </div>
            <div class="p-8 md:p-12 flex-1 flex flex-col justify-center z-10 relative w-full pointer-events-none">
              <div class="font-mono text-xs font-medium bg-slate-100/80 border border-slate-200 px-3 py-1 rounded-full text-slate-600 self-start mb-6 backdrop-blur-md">
                과정 03
              </div>
              <h3 class="font-display font-normal text-[clamp(1.5rem,2.2vw,2rem)] text-slate-900 mb-4 tracking-tight break-keep">
                성인지 감수성 개선 프로그램
              </h3>
              <p class="text-base font-light text-slate-600 leading-[1.7] max-w-[45ch] mb-6 group-hover:text-slate-800 transition-colors break-keep">
                올바른 성가치관 확립과 피해자 관점 이해를 통해 실질적인 인식 전환과 지속 가능한 재발 방지를 달성합니다.
              </p>
              <a href="#contact" class="inline-flex items-center gap-2 font-medium text-xs text-[#1A5DAB] hover:text-[#2B7CD4] transition-colors pointer-events-auto">
                발급 절차 확인
                <iconify-icon icon="solar:arrow-right-linear" class="w-4 h-4"></iconify-icon>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Architecture / Asymmetric Bento Grid (Section 3) -->
    <section id="process" class="py-[6rem] md:py-[10rem] px-[clamp(1.5rem,5vw,5rem)] relative z-10 bg-white border-t border-slate-100">
      <div class="max-w-[90rem] mx-auto">
        <div class="mb-12 md:mb-20 reveal-up is-visible">
          <span class="font-mono text-xs font-medium text-[#1A5DAB] tracking-[0.2em] uppercase flex items-center gap-3 mb-6">
            <span class="w-2 h-2 bg-[#1A5DAB]"></span>
            18년 전문 경력
          </span>
          <h2 class="font-display font-normal text-[clamp(2.5rem,5vw,4.5rem)] tracking-tight leading-none mb-6 text-slate-900 break-keep">
            신뢰와 철저한 비밀보장
            <br>
            <span class="text-slate-400">오직 당신만을 위한 지원</span>
          </h2>
          <p class="text-[clamp(1.125rem,1.5vw,1.25rem)] font-light text-slate-500 max-w-[50ch] leading-[1.7] break-keep">
            모든 상담 내용은 100% 철저한 비공개로 진행되며, 풍부한 법원 및 수사기관 대응 상담 노하우를 바탕으로 위기를 함께 극복합니다.
          </p>
        </div>

        <!-- Asymmetric Grid -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto md:auto-rows-[24rem]">
          <!-- Main Featured Box (Col 8, Row 2) -->
          <div class="md:col-span-8 md:row-span-2 bg-white border border-slate-200 relative overflow-hidden transition-all duration-700 group hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] flex flex-col justify-between reveal-up min-h-[24rem] bento-card hover:scale-[1.01] hover:z-20 rounded-xl is-visible" style="--mouse-x: 552.40625px; --mouse-y: 766.203125px;">
            <div class="absolute inset-0 z-0 overflow-hidden rounded-xl">
              <div class="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-white/95 via-white/70 to-transparent z-10 pointer-events-none"></div>
              <img src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1788246438/ChatGPT_Image_2026%EB%85%84_9%EC%9B%94_1%EC%9D%BC_%EC%98%A4%ED%9B%84_04_07_02_n21oxv.png" alt="100% 철저한 비밀보장" class="w-full h-full object-cover saturate-[1.1] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-[1.08] group-hover:contrast-[1.05]">
            </div>
            <div class="z-10 relative h-full flex flex-col justify-between p-8 md:p-12 pointer-events-none">
              <div class="flex justify-between items-start mb-12 md:mb-0">
                <div class="font-mono text-xs font-medium bg-slate-100/80 border border-slate-200 px-3 py-1 rounded-full text-slate-600 backdrop-blur-md">
                  특징 01
                </div>
                <iconify-icon icon="solar:paperplane-linear" class="w-8 h-8 text-slate-900 opacity-40 group-hover:opacity-100 group-hover:text-[#2B7CD4] transition-all duration-500 text-3xl"></iconify-icon>
              </div>
              <div class="max-w-[32rem] pointer-events-auto">
                <h3 class="font-display font-normal text-[clamp(1.75rem,2.8vw,2.5rem)] text-slate-900 mb-4 leading-tight tracking-tight drop-shadow-sm group-hover:drop-shadow-none break-keep">
                  100% 철저한 비밀보장
                </h3>
                <p class="text-base font-light text-slate-600 leading-[1.7] mb-8 group-hover:text-slate-800 transition-colors break-keep">
                  익명 상담 및 별도 보안 관리를 통해 의뢰인의 개인정보와 상담 기록을 완벽하게 보호하며 안전하고 신뢰할 수 있는 환경을 제공합니다.
                </p>
                <a href="https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%84%B1%EB%B2%94%EC%A3%84%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4/place/2050622926?searchType=place&lng=128.9705167&lat=35.1246838&placePath=/booking?bookingRedirectUrl=https://m.booking.naver.com/booking/13/bizes/1643592?theme=place&entry=pll&lang=ko&service-target=map-pc&pcmap=1&area=pll&c=15.00,0,0,0,dh" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 font-medium text-xs text-[#1A5DAB] hover:text-[#2B7CD4] transition-colors">
                  비공개 상담 예약
                  <iconify-icon icon="solar:arrow-right-linear" class="w-4 h-4"></iconify-icon>
                </a>
              </div>
            </div>
          </div>

          <!-- Vertical Box (Col 4, Row 2) -->
          <div class="md:col-span-4 md:row-span-2 bg-white border border-slate-200 relative overflow-hidden transition-all duration-700 group hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] flex flex-col justify-between reveal-up min-h-[24rem] bento-card hover:scale-[1.01] hover:z-20 rounded-xl is-visible" style="transition-delay: 0.1s; --mouse-x: 157.203125px; --mouse-y: 626.203125px;">
            <div class="absolute inset-0 z-0 overflow-hidden rounded-xl">
              <div class="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-white/95 via-white/70 to-transparent z-10 pointer-events-none"></div>
              <img src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1788247321/ChatGPT_Image_2026%EB%85%84_9%EC%9B%94_1%EC%9D%BC_%EC%98%A4%ED%9B%84_04_21_52_a0qyvx.png" alt="1:1 맞춤 솔루션" class="w-full h-full object-cover contrast-[1.08] saturate-[1.05] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-[1.08] group-hover:contrast-[1.05]">
            </div>
            <div class="z-10 relative h-full flex flex-col justify-between p-8 md:p-12 pointer-events-none">
              <div class="flex justify-between items-start mb-8 md:mb-12">
                <div class="font-mono text-xs font-medium bg-slate-100/80 border border-slate-200 px-3 py-1 rounded-full text-slate-600 backdrop-blur-md">
                  특징 02
                </div>
              </div>
              <div class="pointer-events-auto">
                <h3 class="font-display font-normal text-[clamp(1.35rem,2.2vw,1.75rem)] text-slate-900 mb-3 tracking-tight break-keep">
                  1:1 맞춤 솔루션
                </h3>
                <p class="text-base font-light text-slate-600 leading-relaxed mb-6 group-hover:text-slate-800 transition-colors break-keep">
                  사건의 정황과 개인의 심리상태를 정밀 분석하여 최적의 심리 치료 및 양형 대응 전략을 수립합니다.
                </p>
                <a href="https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%84%B1%EB%B2%94%EC%A3%84%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4/place/2050622926?searchType=place&lng=128.9705167&lat=35.1246838&placePath=/booking?bookingRedirectUrl=https://m.booking.naver.com/booking/13/bizes/1643592?theme=place&entry=pll&lang=ko&service-target=map-pc&pcmap=1&area=pll&c=15.00,0,0,0,dh" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 font-medium text-xs text-[#1A5DAB] hover:text-[#2B7CD4] transition-colors">
                  비공개 상담 예약
                  <iconify-icon icon="solar:arrow-right-linear" class="w-4 h-4"></iconify-icon>
                </a>
              </div>
            </div>
          </div>

          <!-- Horizontal Wide Box (Col 12, Row 1) -->
          <div class="md:col-span-12 bg-white border border-slate-200 relative overflow-hidden transition-all duration-700 group hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] flex flex-col md:flex-row reveal-up bento-card hover:scale-[1.01] hover:z-20 rounded-xl is-visible" style="transition-delay: 0.2s; --mouse-x: 950.40625px; --mouse-y: 28.203125px;">
            <div class="absolute inset-0 z-0 overflow-hidden rounded-xl">
              <div class="absolute inset-0 bg-gradient-to-t from-white/95 via-white/70 to-transparent md:bg-gradient-to-r md:from-white/95 md:via-white/70 md:to-transparent z-10 pointer-events-none"></div>
              <img src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1788247525/ChatGPT_Image_2026%EB%85%84_9%EC%9B%94_1%EC%9D%BC_%EC%98%A4%ED%9B%84_04_25_06_cjzole.png" alt="부산 전 지역 접근성 및 비대면 상담" class="contrast-[1.05] saturate-[1.05] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-[1.08] group-hover:contrast-[1.05] w-full h-full object-cover">
            </div>
            <div class="p-8 md:p-12 flex-1 flex flex-col justify-center z-10 relative w-full pointer-events-none">
              <div class="font-mono text-xs font-medium bg-slate-100/80 border border-slate-200 px-3 py-1 rounded-full text-slate-600 self-start mb-6 backdrop-blur-md">
                특징 03
              </div>
              <h3 class="font-display font-normal text-[clamp(1.5rem,2.2vw,2rem)] text-slate-900 mb-4 tracking-tight break-keep">
                부산 전 지역 접근성 및 비대면 상담
              </h3>
              <p class="text-base font-light text-slate-600 leading-[1.7] max-w-[45ch] mb-6 group-hover:text-slate-800 transition-colors break-keep">
                부산 중심가 위치로 방문이 편리하며, 필요 시 비대면 온라인 화상·유선 심리상담도 신속하게 지원합니다.
              </p>
              <a href="https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%84%B1%EB%B2%94%EC%A3%84%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4/place/2050622926?searchType=place&lng=128.9705167&lat=35.1246838&placePath=/booking?bookingRedirectUrl=https://m.booking.naver.com/booking/13/bizes/1643592?theme=place&entry=pll&lang=ko&service-target=map-pc&pcmap=1&area=pll&c=15.00,0,0,0,dh" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 font-medium text-xs text-[#1A5DAB] hover:text-[#2B7CD4] transition-colors pointer-events-auto">
                비공개 상담 예약
                <iconify-icon icon="solar:arrow-right-linear" class="w-4 h-4"></iconify-icon>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Metrics -->
    <section class="border-y border-slate-200 bg-white relative z-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 w-full">
        <div class="metric-card metric-theme-accent p-10 lg:p-14 flex flex-col justify-between aspect-square group bg-slate-50 hover:bg-[#1A5DAB] transition-all duration-500 cursor-pointer select-none relative overflow-hidden active:scale-[0.97]">
          <div class="metric-bg-img absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-700 mix-blend-multiply grayscale"></div>
          <span class="metric-title group-hover:text-white transition-colors z-10 text-base sm:text-lg font-semibold text-slate-700 tracking-tight relative">
            누적 상담 건수
          </span>
          <div class="metric-body relative z-10 transform group-hover:-translate-y-4 transition-transform duration-500">
            <div class="metric-num text-[clamp(3.5rem,6vw,5.5rem)] leading-none group-hover:text-white transition-colors font-normal text-slate-900 tracking-tighter font-display mb-2">
              <span class="count-up" data-target="15400" data-suffix="+">15,400+</span>
            </div>
            <p class="metric-desc group-hover:text-white/90 transition-colors text-sm font-light text-slate-500">
              부산 및 전국 성범죄 사건 누적 심리상담 수행
            </p>
          </div>
        </div>

        <div class="metric-card metric-theme-accent p-10 lg:p-14 flex flex-col justify-between aspect-square group bg-slate-50 hover:bg-[#1A5DAB] transition-all duration-500 cursor-pointer select-none relative overflow-hidden active:scale-[0.97]">
          <div class="metric-bg-img bg-center group-hover:opacity-10 transition-opacity duration-700 opacity-0 mix-blend-multiply bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop')] bg-cover absolute top-0 right-0 bottom-0 left-0 grayscale"></div>
          <span class="metric-title group-hover:text-white transition-colors text-base sm:text-lg font-semibold text-slate-700 tracking-tight z-10 relative">
            의견서 채택률
          </span>
          <div class="metric-body relative z-10 transform group-hover:-translate-y-4 transition-transform duration-500">
            <div class="metric-num font-display font-normal text-[clamp(3.5rem,6vw,5.5rem)] text-slate-900 leading-none mb-2 group-hover:text-white transition-colors tracking-tighter">
              <span class="count-up" data-target="99.8" data-suffix="%" data-decimal="1">99.8%</span>
            </div>
            <p class="metric-desc group-hover:text-white/90 transition-colors text-sm font-light text-slate-500">
              법원 및 수사기관 양형자료 정상 접수 및 반영
            </p>
          </div>
        </div>

        <div class="metric-card metric-theme-dark p-10 lg:p-14 flex flex-col justify-between aspect-square group bg-slate-50 hover:bg-slate-900 transition-all duration-500 cursor-pointer select-none relative overflow-hidden active:scale-[0.97]">
          <div class="metric-bg-img absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-700 mix-blend-multiply grayscale"></div>
          <span class="metric-title group-hover:text-white transition-colors text-base sm:text-lg font-semibold text-slate-700 tracking-tight z-10 relative">
            임상 전문 경력
          </span>
          <div class="metric-body relative z-10 transform group-hover:-translate-y-4 transition-transform duration-500">
            <div class="metric-num font-display font-normal text-[clamp(3.5rem,6vw,5.5rem)] text-slate-900 leading-none mb-2 group-hover:text-white transition-colors tracking-tighter">
              <span class="count-up" data-target="18" data-suffix="년">18년</span>
            </div>
            <p class="metric-desc group-hover:text-white/80 transition-colors text-sm font-light text-slate-500">
              풍부한 법원 심리 감정 및 성범죄 전문 상담 이력
            </p>
          </div>
        </div>

        <div class="metric-card metric-theme-dark p-10 lg:p-14 flex flex-col justify-between aspect-square group bg-slate-50 hover:bg-slate-900 transition-all duration-500 cursor-pointer select-none relative overflow-hidden active:scale-[0.97]">
          <div class="metric-bg-img absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-700 mix-blend-multiply grayscale"></div>
          <span class="metric-title group-hover:text-white transition-colors text-base sm:text-lg font-semibold text-slate-700 tracking-tight z-10 relative">
            비밀보장 상담
          </span>
          <div class="metric-body relative z-10 transform group-hover:-translate-y-4 transition-transform duration-500">
            <div class="metric-num font-display font-normal text-[clamp(3.5rem,6vw,5.5rem)] text-slate-900 leading-none mb-2 group-hover:text-white transition-colors tracking-tighter">
              <span class="count-up" data-target="100" data-suffix="%">100%</span>
            </div>
            <p class="metric-desc group-hover:text-white/80 transition-colors text-sm font-light text-slate-500">
              익명 보장 및 철저한 개인정보 암호화 관리
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Location Section (오시는 길) -->
    <section id="location" class="py-[4rem] md:py-[7rem] bg-white border-t border-slate-200 relative z-20">
      <div class="max-w-[90rem] mx-auto px-[clamp(1.5rem,5vw,5rem)]">
        <div class="space-y-12">
          <div class="mb-4">
            <span class="font-mono text-xs font-medium text-[#1A5DAB] tracking-[0.2em] uppercase flex items-center gap-3 mb-3">
              <span class="w-2 h-2 bg-[#1A5DAB]"></span>
              LOCATION & DIRECTIONS
            </span>
            <h2 class="font-display font-normal text-[clamp(2.2rem,4vw,3.5rem)] tracking-tight leading-none text-slate-900 break-keep">
              오시는 길 안내
            </h2>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div class="space-y-8">
              <div>
                <h3 class="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-[#059669]"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                  센터 위치 안내
                </h3>
                <div class="p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-100">
                  <p class="text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">📍 센터 주소</p>
                  <p class="text-base sm:text-lg font-bold text-slate-900 leading-snug">부산광역시 중구 해관로 64, 4층 403-A02호 (중앙동4가, 원빌딩)</p>
                </div>
              </div>

              <div class="space-y-6">
                <h4 class="font-bold text-slate-900 flex items-center gap-2 text-lg">
                  <div class="w-1.5 h-5 bg-[#059669] rounded-full"></div>
                  교통편 및 오시는 길 안내
                </h4>
                <div class="grid grid-cols-1 gap-4">
                  <!-- 지하철 이용 -->
                  <div class="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm space-y-2">
                    <p class="font-bold text-slate-900 flex items-center gap-2 text-base">
                      <span>🚇</span> 지하철 이용
                    </p>
                    <div class="text-sm text-slate-600 leading-relaxed font-medium space-y-1 pl-6">
                      <p>• 부산도시철도 1호선 중앙역</p>
                      <p>• 13번 출구에서 도보 약 2~3분</p>
                      <p>• 출구에서 해관로 방향으로 직진하시면 원빌딩 4층 403-A02호에 위치해 있습니다.</p>
                    </div>
                  </div>

                  <!-- 버스 이용 -->
                  <div class="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm space-y-2">
                    <p class="font-bold text-slate-900 flex items-center gap-2 text-base">
                      <span>🚌</span> 버스 이용
                    </p>
                    <p class="text-sm text-slate-600 leading-relaxed font-medium pl-6">
                      중앙역, 중앙동, 부산세관 정류장에서 하차 후 도보 약 3분
                    </p>
                  </div>

                  <!-- 자가용 이용 -->
                  <div class="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm space-y-2">
                    <p class="font-bold text-slate-900 flex items-center gap-2 text-base">
                      <span>🚗</span> 자가용 이용
                    </p>
                    <div class="text-sm text-slate-600 leading-relaxed font-medium space-y-1.5 pl-6">
                      <p>• 내비게이션에 '부산광역시 중구 해관로 64' 또는 '원빌딩'을 검색해 주세요.</p>
                      <p>• 건물 인근 공영주차장 및 민영주차장을 이용하실 수 있습니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="h-[420px] lg:h-full min-h-[380px] rounded-[36px] overflow-hidden shadow-2xl border-8 border-white">
              <iframe 
                src="https://maps.google.com/maps?q=부산광역시%20중구%20해관로%2064&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style="border: 0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"
                title="Google Maps"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <div id="contact" class="bg-white relative z-20 px-[clamp(1.5rem,5vw,5rem)] py-[4rem] md:py-[8rem]">
      <section class="cta-section relative w-full max-w-[90rem] mx-auto min-h-[60vh] py-20 flex flex-col items-center justify-center overflow-hidden text-center bg-[#06080c] rounded-3xl shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)]">
        <!-- Background Photo with Parallax target -->
        <video autoplay muted loop playsinline class="cta-bg-photo absolute inset-0 z-0 w-full h-[130%] -top-[15%] object-cover" style="filter: brightness(0.8) contrast(1.1) saturate(1.15);">
          <source src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/user-files/ee77abb2-b67d-4ed9-bbf1-155a06f3baad/642c4e57-36d4-4a67-b403-0d13c769b912-1460279_Cockpit_View_1280x720-1-1-.mp4?v=1777486220669" type="video/mp4">
        </video>

        <!-- Gradient Overlay -->
        <div class="absolute inset-0 z-10 bg-[#06080c]/50"></div>
        <div class="absolute inset-0 z-10 bg-gradient-to-b from-[#06080c] via-transparent to-[#06080c] opacity-80"></div>

        <!-- Content -->
        <div class="relative z-30 w-full max-w-[50rem] mx-auto px-6 flex flex-col items-center">
          <!-- Title -->
          <h2 class="cta-title font-display font-normal text-[clamp(3rem,7vw,6.5rem)] tracking-tight text-white leading-[0.9] mb-6 flex flex-wrap justify-center gap-x-[1.5vw] break-keep">
            <span class="word block">지금</span>
            <span class="word block">상담이</span>
            <span class="word block">필요하신가요?</span>
          </h2>

          <!-- Subtitle -->
          <p class="cta-subtitle font-sans text-[clamp(1.125rem,1.25vw,1.25rem)] font-light text-white/90 max-w-[40ch] mx-auto mb-10 md:mb-12 leading-[1.6] break-keep">
            사건 초기 대응이 가장 중요합니다. 100% 철저한 비공개 상담으로 신속하게 솔루션을 제시해 드립니다.
          </p>

          <!-- Button & Secondary Link -->
          <div class="cta-button flex flex-col items-center gap-4">
            <a href="https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%84%B1%EB%B2%94%EC%A3%84%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4/place/2050622926?searchType=place&lng=128.9705167&lat=35.1246838&placePath=/booking?bookingRedirectUrl=https://m.booking.naver.com/booking/13/bizes/1643592?theme=place&entry=pll&lang=ko&service-target=map-pc&pcmap=1&area=pll&c=15.00,0,0,0,dh" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center justify-center px-[48px] py-[18px] bg-[#1A5DAB] text-white text-sm font-medium tracking-widest uppercase rounded-full transition-all duration-300 hover:-translate-y-[3px] hover:bg-[#2B7CD4] hover:shadow-[0_0_20px_rgba(43,124,212,0.4)]">
              비밀보장 상담 예약하기
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="ml-2 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
            <a href="tel:0507-1380-0028" class="text-white/70 hover:text-white text-sm font-light transition-colors">
              또는 전화 상담 0507-1380-0028
            </a>
          </div>
        </div>
      </section>
    </div>

    <!-- Footer -->
    <footer class="bg-[#f8fafc] border-t border-slate-200 relative pb-8 pt-16 md:pt-20 z-30">
      <div class="max-w-[90rem] mx-auto px-[clamp(1.5rem,5vw,5rem)] flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 border-b border-slate-200 pb-12 lg:pb-16">
        <div class="flex flex-col justify-between max-w-xs">
          <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/7779c4e9-cf43-4379-a162-96455d9c5618_320w.png" alt="Coast Flight Training Logo" class="md:w-40 w-32 h-auto object-contain mb-8 invert-0">
          <div class="font-mono text-xs font-light text-slate-500 leading-[1.8] tracking-widest break-keep">
            부산성범죄심리상담치료센터
            <br>
            부산광역시 중구 해관로 64, 4층 403-A02호 (중앙동4가, 원빌딩)
            <br>
            대표상담전화: 0507-1380-0028
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-24 w-full lg:w-auto">
          <div>
            <h5 class="font-mono text-xs font-normal text-slate-900 tracking-[0.2em] mb-6 uppercase">
              상담 분야
            </h5>
            <ul class="flex flex-col gap-4 font-mono text-sm font-light text-slate-500">
              <li>
                <a href="#services" class="hover:text-[#2B7CD4] transition-colors block">
                  아청법 위반
                </a>
              </li>
              <li>
                <a href="#services" class="hover:text-[#2B7CD4] transition-colors block">
                  미성년자 성범죄
                </a>
              </li>
              <li>
                <a href="#services" class="hover:text-[#2B7CD4] transition-colors block">
                  통매음·불법촬영
                </a>
              </li>
            </ul>
          </div>
          <div class="">
            <h5 class="font-mono text-xs font-normal text-slate-900 tracking-[0.2em] mb-6 uppercase">
              센터 소개
            </h5>
            <ul class="flex flex-col gap-4 font-mono text-sm font-light text-slate-500">
              <li>
                <a href="#intro" class="hover:text-[#2B7CD4] transition-colors block">
                  전문가 소개
                </a>
              </li>
              <li class="">
                <a href="https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%84%B1%EB%B2%94%EC%A3%84%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4/place/2050622926?searchType=place&lng=128.9705167&lat=35.1246838&placePath=/booking?bookingRedirectUrl=https://m.booking.naver.com/booking/13/bizes/1643592?theme=place&entry=pll&lang=ko&service-target=map-pc&pcmap=1&area=pll&c=15.00,0,0,0,dh" target="_blank" rel="noopener noreferrer" class="hover:text-[#2B7CD4] transition-colors flex items-center gap-2">
                  비밀상담
                  <span class="bg-[#1A5DAB] text-white px-1.5 py-0.5 text-[0.6rem] font-normal rounded-sm">
                    상시운영
                  </span>
                </a>
              </li>
              <li class="">
                <a href="#evidence" class="hover:text-[#2B7CD4] transition-colors block">
                  양형자료 안내
                </a>
              </li>
            </ul>
          </div>
          <div class="col-span-2 md:col-span-1">
            <h5 class="font-mono text-xs font-normal text-slate-900 tracking-[0.2em] mb-6 uppercase">
              오시는 길
            </h5>
            <ul class="flex flex-col gap-4 font-mono text-sm font-light text-slate-500">
              <li>
                <a href="https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%84%B1%EB%B2%94%EC%A3%84%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4/place/2050622926?searchType=place&lng=128.9705167&lat=35.1246838" target="_blank" rel="noopener noreferrer" class="hover:text-[#2B7CD4] transition-colors block">
                  부산 중앙동역 14번 출구 인근
                </a>
              </li>
              <li>
                <a href="https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%84%B1%EB%B2%94%EC%A3%84%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4/place/2050622926?searchType=place&lng=128.9705167&lat=35.1246838&placePath=/booking?bookingRedirectUrl=https://m.booking.naver.com/booking/13/bizes/1643592?theme=place&entry=pll&lang=ko&service-target=map-pc&pcmap=1&area=pll&c=15.00,0,0,0,dh" target="_blank" rel="noopener noreferrer" class="hover:text-[#2B7CD4] transition-colors block">
                  100% 예약제 운영
                </a>
              </li>
              <li>
                <a href="https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%84%B1%EB%B2%94%EC%A3%84%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4/place/2050622926?searchType=place&lng=128.9705167&lat=35.1246838&placePath=/booking?bookingRedirectUrl=https://m.booking.naver.com/booking/13/bizes/1643592?theme=place&entry=pll&lang=ko&service-target=map-pc&pcmap=1&area=pll&c=15.00,0,0,0,dh" target="_blank" rel="noopener noreferrer" class="hover:text-[#2B7CD4] transition-colors flex items-center gap-2">
                  상담 가능 상태
                  <div class="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse"></div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="w-full flex justify-center mt-6 md:mt-8">
        <span class="font-mono text-xs font-light text-slate-400 tracking-widest uppercase text-center px-4">
          © 2026 부산성범죄심리상담치료센터. ALL RIGHTS RESERVED.
        </span>
      </div>
    </footer>
  `;

  return (
    <>
      <div
        className="scroll-smooth bg-white text-slate-900 selection:bg-[#1A5DAB] selection:text-white noise-overlay min-h-screen relative"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* In-Page Layer Modal Popup (Immune to Browser Popup Blockers) */}
      {showPopup && (
        <div 
          className="fixed inset-0 z-[99999] bg-black/65 backdrop-blur-[2px] flex items-center justify-center p-3 sm:p-4 overflow-y-auto transition-opacity animate-fade-in"
          onClick={handleClosePopup}
        >
          <div 
            className="relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-[620px] max-h-[96vh] flex flex-col bg-white rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border border-slate-200 overflow-hidden my-auto transition-transform animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top-Right Floating Close Button */}
            <button
              onClick={handleClosePopup}
              aria-label="팝업 닫기"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all shadow-lg active:scale-95 cursor-pointer backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Popup Content */}
            <div className="overflow-y-auto overscroll-contain flex-1 p-3.5 sm:p-5 md:p-6 space-y-3 sm:space-y-4 bg-white">
              <img
                src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1788066880/ChatGPT_Image_2026%EB%85%84_8%EC%9B%94_30%EC%9D%BC_%EC%98%A4%ED%9B%84_02_14_30_wqb114.png"
                alt="통합 양형자료 안내 - 상담·교육·서류 준비 패키지"
                className="w-full h-auto rounded-xl sm:rounded-2xl object-contain border border-slate-100 shadow-sm block"
                referrerPolicy="no-referrer"
              />

              {/* Action Button */}
              <button
                onClick={handleGoToContact}
                className="w-full py-3.5 sm:py-4 px-6 bg-[#18365c] hover:bg-[#10243e] active:scale-[0.99] text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer tracking-tight"
              >
                <span>상담 신청하기</span>
                <span className="text-xl leading-none">→</span>
              </button>
            </div>

            {/* Bottom Controls Bar */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs sm:text-sm text-slate-600 font-sans select-none">
              <button
                onClick={handleDoNotShowToday}
                className="hover:text-slate-900 transition-colors py-1 cursor-pointer font-medium"
              >
                오늘 하루 보지 않기
              </button>
              <div className="flex items-center gap-2.5 text-slate-300">
                <span>|</span>
                <button
                  onClick={handleClosePopup}
                  className="text-slate-600 hover:text-slate-900 transition-colors py-1 cursor-pointer font-medium"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoastFlightLandingPage;
