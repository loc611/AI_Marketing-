import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Store() {
  const containerRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Hero background parallax
      gsap.to('.store-hero-bg', {
        y: '-15%',
        scrollTrigger: {
          trigger: '.store-hero-bg',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Hero text cascade
      gsap.fromTo('.store-hero-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo('.store-hero-subtitle',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 }
      );

      // Product cards stagger
      gsap.fromTo('.product-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: '.product-grid', start: 'top 80%' }
        }
      );

      // Origin section
      gsap.fromTo('.store-origin-text',
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.store-origin', start: 'top 65%' }
        }
      );
      gsap.fromTo('.store-origin-img',
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.store-origin', start: 'top 65%' }
        }
      );

      // Brand section
      gsap.fromTo('.store-brand-img',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.store-brand', start: 'top 65%' }
        }
      );
      gsap.fromTo('.store-brand-text',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.store-brand', start: 'top 55%' }
        }
      );

      // Banner parallax
      gsap.to('.banner-image', {
        y: -30,
        scrollTrigger: { trigger: '.store-banner', start: 'top bottom', end: 'bottom top', scrub: 1 }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Product card tilt
  const handleTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateX: y * -10, rotateY: x * 10,
      transformPerspective: 800, scale: 1.03,
      duration: 0.3, ease: 'power1.out'
    });
  };
  const handleTiltLeave = (e) => {
    gsap.to(e.currentTarget, {
      rotateX: 0, rotateY: 0, scale: 1,
      duration: 0.5, ease: 'power3.out'
    });
  };

  return (
    <div ref={containerRef} className="bg-black pt-12">

      {/* ═══════════════════════════════════════
          HERO — Full-width Apple logo banner
      ═══════════════════════════════════════ */}
      <section className="relative flex h-[70vh] w-full items-center justify-center overflow-hidden md:h-[80vh]">
        {/* Background image with parallax */}
        <img
          src="/images/logo.png"
          alt="Apple Store"
          className="store-hero-bg absolute inset-0 h-[120%] w-full object-cover object-center"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black"></div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]"></div>
        
        {/* Text overlay */}
        <div className="relative z-10 text-center">
          <h1 className="store-hero-title text-5xl font-bold tracking-tight text-white opacity-0 drop-shadow-2xl md:text-7xl lg:text-8xl">
            Cửa hàng.
          </h1>
          <p className="store-hero-subtitle mt-5 text-lg font-medium text-white/80 opacity-0 drop-shadow-lg md:text-xl">
            Sản phẩm tốt nhất. Dịch vụ tuyệt vời nhất.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PRODUCT SHOWCASE GRID
          Featuring real product images
      ═══════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white md:text-4xl">
          Sản phẩm nổi bật
        </h2>
        <div className="product-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {/* Card 1 — iPhone */}
          <div
            className="product-card group relative cursor-pointer overflow-hidden rounded-3xl border border-white/5 bg-[#1c1c1e] p-6 opacity-0"
            style={{ transformStyle: 'preserve-3d' }}
            onMouseMove={handleTilt}
            onMouseLeave={handleTiltLeave}
          >
            <div className="mb-4 flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-black">
              <img src="/images/iphone17.jpg" alt="iPhone 17 Pro" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <h3 className="text-lg font-bold text-white">iPhone 17 Pro</h3>
            <p className="mt-1 text-sm text-apple-gray">Từ 28.999.000₫</p>
            <span className="mt-3 inline-block rounded-full bg-apple-accent px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-apple-accent-light">Mua ngay</span>
          </div>

          {/* Card 2 — Chip */}
          <div
            className="product-card group relative cursor-pointer overflow-hidden rounded-3xl border border-white/5 bg-[#1c1c1e] p-6 opacity-0"
            style={{ transformStyle: 'preserve-3d' }}
            onMouseMove={handleTilt}
            onMouseLeave={handleTiltLeave}
          >
            <div className="mb-4 flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-black">
              <img src="/images/chipa19pro.webp" alt="Chip A19 Pro" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <h3 className="text-lg font-bold text-white">Chip A19 Pro</h3>
            <p className="mt-1 text-sm text-apple-gray">Nhanh nhất thế giới</p>
            <span className="mt-3 inline-block rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10">Tìm hiểu</span>
          </div>

          {/* Card 3 — Camera */}
          <div
            className="product-card group relative cursor-pointer overflow-hidden rounded-3xl border border-white/5 bg-[#1c1c1e] p-6 opacity-0"
            style={{ transformStyle: 'preserve-3d' }}
            onMouseMove={handleTilt}
            onMouseLeave={handleTiltLeave}
          >
            <div className="mb-4 flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-black">
              <img src="/images/camera.jpg" alt="Camera System" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <h3 className="text-lg font-bold text-white">Camera 48MP</h3>
            <p className="mt-1 text-sm text-apple-gray">Hệ thống Camera Pro</p>
            <span className="mt-3 inline-block rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10">Tìm hiểu</span>
          </div>

          {/* Card 4 — Titanium */}
          <div
            className="product-card group relative cursor-pointer overflow-hidden rounded-3xl border border-white/5 bg-[#1c1c1e] p-6 opacity-0"
            style={{ transformStyle: 'preserve-3d' }}
            onMouseMove={handleTilt}
            onMouseLeave={handleTiltLeave}
          >
            <div className="mb-4 flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-black">
              <img src="/images/titanium.jpg" alt="Titanium Design" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <h3 className="text-lg font-bold text-white">Thiết kế Titanium</h3>
            <p className="mt-1 text-sm text-apple-gray">Bền bỉ. Sang trọng.</p>
            <span className="mt-3 inline-block rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10">Tìm hiểu</span>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          FULL-WIDTH BANNER
      ═══════════════════════════════════════ */}
      <section className="store-banner relative mx-auto my-16 max-w-6xl overflow-hidden rounded-3xl px-6">
        <div className="relative h-80 overflow-hidden rounded-3xl md:h-[420px]">
          <img
            src="/images/camera3d.jpg"
            alt="Camera 3D Exploded View"
            className="banner-image absolute inset-0 h-[120%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute bottom-10 left-10 z-10 max-w-md md:bottom-14 md:left-14">
            <h3 className="text-3xl font-bold text-white md:text-4xl">Khám phá Camera Pro</h3>
            <p className="mt-2 text-base text-white/70">Hệ thống ống kính tiên tiến nhất. Chụp ảnh trong mọi điều kiện ánh sáng.</p>
            <button className="mt-4 rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-all hover:bg-gray-200">
              Tìm hiểu thêm →
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ORIGIN — "Nơi mọi thứ bắt đầu"
      ═══════════════════════════════════════ */}
      <section className="store-origin mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">

          {/* Text */}
          <div className="store-origin-text opacity-0">
            <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              Nơi mọi thứ <br className="hidden md:block" />bắt đầu...
            </h2>
            <p className="text-lg leading-relaxed text-apple-gray md:text-xl">
              Năm 2007, một cuộc cách mạng đã diễn ra. Chiếc iPhone đầu tiên không chỉ là một chiếc điện thoại, nó là khởi nguồn của một kỷ nguyên tương tác mới. Steve Jobs đã thay đổi thế giới mãi mãi.
            </p>
          </div>

          {/* Image Card */}
          <div className="store-origin-img opacity-0">
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl shadow-black/60 transition-all duration-500 hover:border-white/20 hover:shadow-apple-accent/10">
              <img
                src="/images/OIP.jpg"
                alt="Steve Jobs"
                className="h-auto w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                onError={(e) => { e.target.src = '/images/OIP (3).webp'; }}
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]"></div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          BRAND — "Hành trình đổi mới"
      ═══════════════════════════════════════ */}
      <section className="store-brand mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="flex flex-col items-center text-center">

          {/* Logo */}
          <div className="store-brand-img mb-10 opacity-0">
            <img
              src="/images/OIP (3).webp"
              alt="Apple Logo"
              className="mx-auto w-40 mix-blend-screen transition-all duration-500 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] md:w-56"
              onError={(e) => { e.target.src = '/images/OIP (4).webp'; }}
            />
          </div>

          {/* Text */}
          <div className="store-brand-text max-w-2xl opacity-0">
            <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              Hành trình đổi mới
            </h2>
            <p className="text-lg leading-relaxed text-apple-gray md:text-xl">
              Từ những thiết kế mang tính biểu tượng đến sức mạnh phần cứng phi thường, cốt lõi của Apple luôn là sự khao khát vượt qua giới hạn của công nghệ. Mỗi sản phẩm là một tuyên ngôn.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Store;
