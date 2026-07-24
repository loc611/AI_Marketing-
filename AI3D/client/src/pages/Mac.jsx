import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Mac() {
  const containerRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      // ── Hero animations ──
      gsap.fromTo('.mac-hero-badge',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      );
      gsap.fromTo('.mac-hero-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo('.mac-hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.45 }
      );
      gsap.fromTo('.mac-hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 }
      );
      gsap.fromTo('.mac-hero-img',
        { opacity: 0, y: 100, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 1.6, ease: 'power3.out', delay: 0.3 }
      );

      // ── Headline text ──
      gsap.fromTo('.mac-headline',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.mac-headline-section', start: 'top 70%' }
        }
      );

      // ── Side profile parallax ──
      gsap.fromTo('.mac-profile-text',
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.mac-profile-section', start: 'top 65%' }
        }
      );
      gsap.fromTo('.mac-profile-img',
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.mac-profile-section', start: 'top 65%' }
        }
      );

      // ── Specs cards stagger ──
      gsap.fromTo('.mac-spec-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.mac-specs-grid', start: 'top 75%' }
        }
      );

      // ── Display section ──
      gsap.fromTo('.mac-display-text',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.mac-display-section', start: 'top 65%' }
        }
      );
      gsap.to('.mac-display-img', {
        y: -50,
        scrollTrigger: { trigger: '.mac-display-section', start: 'top bottom', end: 'bottom top', scrub: 1 }
      });

      // ── Keyboard section ──
      gsap.fromTo('.mac-keyboard-text',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.mac-keyboard-section', start: 'top 65%' }
        }
      );
      gsap.fromTo('.mac-keyboard-img',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.mac-keyboard-section', start: 'top 65%' }
        }
      );

      // ── Lifestyle banner parallax ──
      gsap.to('.mac-lifestyle-img', {
        y: '-10%',
        scrollTrigger: { trigger: '.mac-lifestyle-section', start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
      gsap.fromTo('.mac-lifestyle-text',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.mac-lifestyle-section', start: 'top 60%' }
        }
      );

      // ── CTA section ──
      gsap.fromTo('.mac-cta',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.mac-cta-section', start: 'top 75%' }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 3D Tilt for spec cards
  const handleTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateX: y * -10, rotateY: x * 10,
      transformPerspective: 800, scale: 1.03,
      duration: 0.25, ease: 'power1.out'
    });
    // Inner image parallax
    const img = card.querySelector('img');
    if (img) {
      gsap.to(img, {
        x: x * -15, y: y * -15, scale: 1.08,
        duration: 0.25, ease: 'power1.out'
      });
    }
    // Glow cursor follower
    const glow = card.querySelector('.card-glow');
    if (glow) {
      const px = (e.clientX - rect.left);
      const py = (e.clientY - rect.top);
      gsap.to(glow, {
        x: px - 150, y: py - 150,
        opacity: 1, duration: 0.3
      });
    }
  };
  const handleTiltLeave = (e) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0, rotateY: 0, scale: 1,
      duration: 0.6, ease: 'power3.out'
    });
    const img = card.querySelector('img');
    if (img) {
      gsap.to(img, { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' });
    }
    const glow = card.querySelector('.card-glow');
    if (glow) {
      gsap.to(glow, { opacity: 0, duration: 0.4 });
    }
  };

  // Hero image mouse parallax
  const heroImgRef = useRef();
  const handleHeroMouse = (e) => {
    if (!heroImgRef.current) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 25;
    const y = (e.clientY / innerHeight - 0.5) * 25;
    gsap.to(heroImgRef.current, { x, y, duration: 0.8, ease: 'power2.out' });
  };

  // Magnetic button effect
  const handleMagnet = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
  };
  const handleMagnetLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
  };

  return (
    <div ref={containerRef} className="bg-black pt-12" onMouseMove={handleHeroMouse}>

      {/* ═══════════════════════════════════════════════════════
          SECTION 1: HERO — MacBook Pro
      ═══════════════════════════════════════════════════════ */}
      <section className="relative flex flex-col items-center overflow-hidden px-6 pb-8 pt-20 text-center md:pb-16 md:pt-28">
        {/* Radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(100,120,255,0.07)_0%,transparent_55%)]"></div>

        <p className="mac-hero-badge text-sm font-medium uppercase tracking-[0.25em] text-blue-400 opacity-0">Mới</p>
        <h1 className="mac-hero-title mt-4 bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-6xl font-bold tracking-tight text-transparent opacity-0 md:text-8xl lg:text-9xl">
          MacBook Pro
        </h1>
        <p className="mac-hero-subtitle mt-5 max-w-xl text-lg text-[#86868b] opacity-0 md:text-xl">
          Siêu phàm với chip M4 Pro và M4 Max.<br />Hiệu năng khủng khiếp. Pin xài cả ngày.
        </p>

        {/* CTA Buttons with magnetic effect */}
        <div className="mac-hero-cta mt-8 flex items-center gap-5 opacity-0">
          <a href="#" className="rounded-full bg-blue-500 px-7 py-3 text-sm font-medium text-white transition-all hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/20"
            onMouseMove={handleMagnet} onMouseLeave={handleMagnetLeave}>
            Tìm hiểu thêm
          </a>
          <a href="#" className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
            onMouseMove={handleMagnet} onMouseLeave={handleMagnetLeave}>
            Mua ngay →
          </a>
        </div>

        {/* Hero product image — follows mouse */}
        <div ref={heroImgRef} className="mac-hero-img relative z-10 mt-14 w-full max-w-5xl opacity-0">
          <img
            src="/images/macbook_hero.jpg"
            alt="MacBook Pro"
            className="h-auto w-full drop-shadow-[0_30px_80px_rgba(80,80,255,0.12)] transition-[filter] duration-500 hover:drop-shadow-[0_30px_100px_rgba(80,80,255,0.25)]"
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: HEADLINE — "Trí tuệ đỉnh cao"
          Apple thường dùng 1 dòng headline lớn giữa trang
      ═══════════════════════════════════════════════════════ */}
      <section className="mac-headline-section border-t border-white/5 px-6 py-28 text-center md:py-36">
        <h2 className="mac-headline mx-auto max-w-5xl text-3xl font-bold leading-tight tracking-tight text-white opacity-0 md:text-5xl lg:text-[3.5rem]">
          Trí tuệ đỉnh cao cho <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            chuyên gia đỉnh cao.
          </span>
        </h2>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: THIẾT KẾ — Side Profile (2 cột)
          Giống Apple: ảnh sản phẩm góc nghiêng + text mô tả
      ═══════════════════════════════════════════════════════ */}
      <section className="mac-profile-section mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="mac-profile-text opacity-0">
            <p className="text-sm font-medium uppercase tracking-widest text-blue-400">Thiết kế</p>
            <h3 className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">
              Mỏng đến kinh ngạc. <br />Mạnh đến bất ngờ.
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-[#86868b]">
              MacBook Pro mới mỏng hơn bao giờ hết nhưng vẫn trang bị đầy đủ cổng kết nối chuyên nghiệp: Thunderbolt 5, HDMI, khe thẻ SDXC và MagSafe. Không cần adapter. Không cần thỏa hiệp.
            </p>
          </div>
          <div className="mac-profile-img overflow-hidden rounded-3xl opacity-0">
            <img
              src="/images/macbook_side.jpg"
              alt="MacBook Pro Side Profile"
              className="h-auto w-full transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: SPECS GRID — Bento Cards
          Giống Apple: các khối thông số dạng lưới
      ═══════════════════════════════════════════════════════ */}
      <section className="border-t border-white/5 bg-[#0a0a0a] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-14 text-center text-4xl font-bold tracking-tight text-white md:text-5xl">
            Hiệu năng vượt trội.
          </h2>

          <div className="mac-specs-grid grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

            {/* Card 1 — Chip (Large) */}
            <div
              className="mac-spec-card group relative overflow-hidden rounded-3xl border border-white/5 bg-[#1c1c1e] opacity-0 lg:col-span-2 lg:row-span-2"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseMove={handleTilt} onMouseLeave={handleTiltLeave}
            >
              <div className="relative h-56 overflow-hidden lg:h-72">
                <img src="/images/m4_chip.jpg" alt="M4 Pro Chip" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e] via-[#1c1c1e]/40 to-transparent"></div>
              </div>
              <div className="p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">Chip Apple</p>
                <h3 className="mt-2 text-3xl font-bold text-white lg:text-4xl">M4 Pro <span className="text-[#86868b]">&</span> M4 Max</h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-[#86868b]">
                  CPU lên đến 16 lõi. GPU lên đến 40 lõi. Neural Engine 16 lõi cho Apple Intelligence. Nhanh hơn bất kỳ laptop nào.
                </p>
              </div>
            </div>

            {/* Card 2 — Battery */}
            <div
              className="mac-spec-card group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-[#1c1c1e] p-8 opacity-0"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseMove={handleTilt} onMouseLeave={handleTiltLeave}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-400">Pin</p>
                <p className="mt-4 text-6xl font-black text-white">24<span className="text-2xl font-bold text-[#86868b]"> giờ</span></p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#86868b]">
                Thời lượng pin dài nhất từng có trên máy Mac. Cả ngày dài không lo hết pin.
              </p>
            </div>

            {/* Card 3 — Memory */}
            <div
              className="mac-spec-card group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-[#1c1c1e] p-8 opacity-0"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseMove={handleTilt} onMouseLeave={handleTiltLeave}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">Bộ nhớ</p>
                <p className="mt-4 text-6xl font-black text-white">128<span className="text-2xl font-bold text-[#86868b]">GB</span></p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#86868b]">
                Bộ nhớ hợp nhất băng thông cao. Chạy các mô hình AI lớn ngay trên máy.
              </p>
            </div>

            {/* Card 4 — Thunderbolt (Wide) */}
            <div
              className="mac-spec-card group overflow-hidden rounded-3xl border border-white/5 bg-[#1c1c1e] p-8 opacity-0 lg:col-span-3"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseMove={handleTilt} onMouseLeave={handleTiltLeave}
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">Kết nối</p>
                  <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">Thunderbolt 5. HDMI. MagSafe.</h3>
                  <p className="mt-2 max-w-lg text-base text-[#86868b]">
                    Hỗ trợ lên đến 3 màn hình ngoài. Cổng kết nối đầy đủ nhất trên laptop chuyên nghiệp.
                  </p>
                </div>
                <p className="text-7xl font-black text-white/[0.04]">TB5</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5: DISPLAY — Full-width image
          Giống Apple: ảnh rộng toàn trang + text overlay
      ═══════════════════════════════════════════════════════ */}
      <section className="mac-display-section overflow-hidden py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mac-display-text mb-14 text-center opacity-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Màn hình</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Liquid Retina XDR
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#86868b]">
              Màn hình pro tốt nhất thế giới trên laptop. Độ sáng lên đến 1.600 nit HDR. Tỷ lệ tương phản 1.000.000:1. Dải màu rộng P3. Công nghệ ProMotion 120Hz.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/5">
            <img
              src="/images/retina_display.jpg"
              alt="Liquid Retina XDR Display"
              className="mac-display-img h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6: KEYBOARD & TRACKPAD
          Giống Apple: 2 cột nghịch đảo
      ═══════════════════════════════════════════════════════ */}
      <section className="mac-keyboard-section mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="order-2 overflow-hidden rounded-3xl md:order-1">
            <img
              src="/images/macbook_keyboard.jpg"
              alt="MacBook Pro Keyboard"
              className="mac-keyboard-img h-auto w-full opacity-0 transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="mac-keyboard-text order-1 opacity-0 md:order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-400">Bàn phím & Trackpad</p>
            <h3 className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">
              Magic Keyboard.<br />Trackpad Force Touch.
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-[#86868b]">
              Bàn phím Magic Keyboard toàn kích thước với hàng phím chức năng đầy đủ và Touch ID. Trackpad Force Touch lớn nhất từng có cho phản hồi chính xác và điều khiển trực quan.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7: LIFESTYLE BANNER — Full-width parallax
          Giống Apple: ảnh lifestyle rộng
      ═══════════════════════════════════════════════════════ */}
      <section className="mac-lifestyle-section relative h-[50vh] overflow-hidden md:h-[60vh]">
        <img
          src="/images/macbook_lifestyle.jpg"
          alt="MacBook Pro Lifestyle"
          className="mac-lifestyle-img absolute inset-0 h-[120%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 p-10 md:p-16">
          <div className="mac-lifestyle-text mx-auto max-w-3xl opacity-0">
            <h3 className="text-3xl font-bold text-white md:text-4xl">Được tạo ra cho chuyên gia.</h3>
            <p className="mt-3 max-w-xl text-lg text-white/70">
              Từ dựng phim 8K, render 3D, biên dịch code đến huấn luyện mô hình AI — MacBook Pro xử lý mọi thứ một cách dễ dàng.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 8: CTA — Pricing & Buy
          Giống Apple: giá + 2 nút CTA
      ═══════════════════════════════════════════════════════ */}
      <section className="mac-cta-section border-t border-white/5 px-6 py-28 text-center md:py-36">
        <div className="mac-cta opacity-0">
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            MacBook Pro
          </h2>
          <p className="mt-3 text-2xl text-[#86868b]">Từ 39.999.000₫</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="#" className="rounded-full bg-blue-500 px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/25">
              Mua ngay
            </a>
            <a href="#" className="rounded-full border border-blue-500/50 px-8 py-3.5 text-base font-medium text-blue-400 transition-all hover:border-blue-400 hover:bg-blue-500/10">
              So sánh các mẫu →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Mac;
