import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Iphone() {
  const containerRef = useRef();
  const heroImageRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // Animate Hero Section (Scroll Parallax)
      gsap.to('.hero-image', {
        y: '20%',
        scrollTrigger: {
          trigger: '.section-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });
      
      gsap.to('.hero-text-container', {
        y: '-30%',
        opacity: 0,
        scrollTrigger: {
          trigger: '.section-hero',
          start: 'top top',
          end: 'center top',
          scrub: 1,
        }
      });

      // Animate New Intro Section
      gsap.fromTo('.intro-text-block', 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          scrollTrigger: {
            trigger: '.section-intro',
            start: 'top 60%',
            end: 'top 30%',
            scrub: 1,
          }
        }
      );

      // Animate Tech Specs Section (Staggered fade in)
      gsap.fromTo('.bento-item', 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.section-specs',
            start: 'top 75%',
          }
        }
      );
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  // 3D Tilt Effect on Mouse Move for Bento Cards
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top; 
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (-8 to 8 degrees)
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.02,
      transformPerspective: 1000,
      duration: 0.2,
      ease: 'power1.out'
    });
    
    // Parallax the background images slightly inside the card
    const bgs = card.querySelectorAll('.bento-bg');
    bgs.forEach(bg => {
      gsap.to(bg, {
        x: rotateY * -2,
        y: rotateX * 2,
        scale: 1.1,
        duration: 0.2,
        ease: 'power1.out'
      });
    });

    // Handle 3-image scrubbing based on mouse X if it's a scrubbable card
    if (card.classList.contains('scrubbable-card')) {
      const progress = Math.max(0, Math.min(1, x / rect.width));
      const primary = card.querySelector('.bento-bg-primary');
      const secondary = card.querySelector('.bento-bg-secondary');
      const tertiary = card.querySelector('.bento-bg-tertiary');
      
      const op1 = Math.max(0, 1 - (progress / 0.4));
      const op2 = progress > 0.2 && progress < 0.8 ? Math.sin((progress - 0.2) * (Math.PI / 0.6)) : 0;
      const op3 = Math.max(0, (progress - 0.6) / 0.4);

      if (primary) gsap.to(primary, { opacity: op1, duration: 0.2 });
      if (secondary) gsap.to(secondary, { opacity: op2, duration: 0.2 });
      if (tertiary) gsap.to(tertiary, { opacity: op3, duration: 0.2 });
    }
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power3.out'
    });
    const bgs = card.querySelectorAll('.bento-bg');
    bgs.forEach(bg => {
      gsap.to(bg, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out'
      });
    });

    if (card.classList.contains('scrubbable-card')) {
      const primary = card.querySelector('.bento-bg-primary');
      const secondary = card.querySelector('.bento-bg-secondary');
      const tertiary = card.querySelector('.bento-bg-tertiary');
      if (primary) gsap.to(primary, { opacity: 1, duration: 0.5 });
      if (secondary) gsap.to(secondary, { opacity: 0, duration: 0.5 });
      if (tertiary) gsap.to(tertiary, { opacity: 0, duration: 0.5 });
    }
  };

  // Mouse Move Parallax for the Hero Image
  const handleHeroMouseMove = (e) => {
    if (!heroImageRef.current) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 30;
    const y = (e.clientY / innerHeight - 0.5) * 30;
    
    gsap.to(heroImageRef.current, {
      x: x,
      y: y,
      duration: 1,
      ease: "power2.out"
    });
  };

  return (
    <div ref={containerRef} className="page-container" onMouseMove={handleHeroMouseMove}>

      {/* Section 1: The Future / Intro */}
      <section className="scroll-section section-hero">
        <div className="hero-text-container">
           <h2 className="hero-title-small">iPhone 17</h2>
           <h1 className="hero-title-large">PRO</h1>
        </div>
        <img ref={heroImageRef} src="/images/iphone17.jpg" alt="iPhone 17 PRO" className="hero-image" onError={(e) => e.target.style.display='none'} />
      </section>

      {/* NEW SECTION: iPhone 17 Pro Intro */}
      <section className="scroll-section section-intro" style={{ padding: '15vh 5vw', backgroundColor: '#000' }}>
        <div className="intro-content" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div className="intro-text-block">
            <h2 style={{ fontSize: '4rem', fontWeight: 700, marginBottom: '2rem', letterSpacing: '-0.04em' }}>
              Thiết kế bứt phá. <br />
              <span style={{ color: '#d15a20' }}>Đẹp không tì vết.</span>
            </h2>
            <p style={{ fontSize: '1.5rem', color: '#a1a1a6', lineHeight: 1.6, maxWidth: '800px', margin: '0 auto' }}>
              Trải nghiệm viền màn hình mỏng nhất từng có trên thiết bị Apple. Khung viền Titanium chuẩn hàng không vũ trụ nay được đánh bóng mang lại vẻ ngoài lộng lẫy và độ bền vô song.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Tech Specs (Bento Grid) */}
      <section className="scroll-section section-specs">
        <div className="specs-container">
          <h2 className="section-title">Sức mạnh vượt trội.</h2>
          <div className="bento-grid">
            
            <div 
              className="bento-item bento-large scrubbable-card"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <img src="/images/chipa19pro.webp" alt="A19 Pro Layer 1" className="bento-bg bento-bg-primary" onError={(e) => e.target.style.display='none'} />
              <img src="/images/chip12pro.jpg" alt="A19 Pro Layer 2" className="bento-bg bento-bg-secondary" onError={(e) => e.target.style.display='none'} />
              <img src="/images/xhip.webp" alt="A19 Pro Layer 3" className="bento-bg bento-bg-tertiary" onError={(e) => e.target.style.display='none'} />
              
              <div className="bento-overlay"></div>
              <div className="bento-content">
                <h3 className="bento-title">A19 Pro</h3>
                <p className="bento-desc">Chipset điện thoại thông minh nhanh nhất thế giới. Đồ họa đẳng cấp console.</p>
              </div>
            </div>

            <div 
              className="bento-item bento-camera scrubbable-card"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <img src="/images/camera.jpg" alt="Pro Camera Exterior" className="bento-bg bento-bg-primary" onError={(e) => e.target.style.display='none'} />
              <img src="/images/cameraiphone.webp" alt="Pro Camera Closeup" className="bento-bg bento-bg-secondary" onError={(e) => e.target.style.display='none'} />
              <img src="/images/camera3d.jpg" alt="Exploded Lenses" className="bento-bg bento-bg-tertiary" onError={(e) => e.target.style.display='none'} />
              
              <div className="bento-overlay"></div>
              <div className="bento-content">
                <h3 className="bento-title">Hệ thống Camera Pro</h3>
                <p className="bento-desc">Camera Chính 48MP. Chi tiết ngoài sức tưởng tượng.</p>
              </div>
            </div>

            <div 
              className="bento-item bento-small bento-titanium"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <img src="/images/titanium.jpg" alt="Titanium Design" className="bento-bg" onError={(e) => e.target.style.display='none'} />
              <div className="bento-overlay"></div>
              <div className="bento-content">
                <h3 className="bento-title">Titanium</h3>
                <p className="bento-desc">Bền bỉ. Nhẹ nhàng.</p>
              </div>
            </div>

            <div 
              className="bento-item bento-small bento-battery"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <img src="/images/pin17.jpg" alt="All Day Battery" className="bento-bg" onError={(e) => e.target.style.display='none'} />
              <div className="bento-overlay"></div>
              <div className="bento-content">
                <h3 className="bento-title">Pin cả ngày</h3>
                <p className="bento-desc">Sạc nhanh hơn bao giờ hết.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default Iphone;
