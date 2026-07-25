import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import logoUrl from '@assets/loader-logo-optimized.webp';

interface LoaderOverlayProps {
  onComplete: () => void;
}

export default function LoaderOverlay({ onComplete }: LoaderOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef   = useRef<HTMLImageElement>(null);
  const sweepRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo   = logoRef.current;
    const sweep  = sweepRef.current;
    const overlay = overlayRef.current;
    if (!logo || !sweep || !overlay) return;

    // Start hidden
    gsap.set(logo,  { opacity: 0, rotateY: -6, rotateX: 3 });
    gsap.set(sweep, { x: '-115%' });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl
      // 1. Logo materialises — pivots forward like a luxury emblem being revealed
      .to(logo, {
        opacity: 1,
        rotateY: 0,
        rotateX: 0,
        duration: 0.55,
        ease: 'power2.out',
      })

      // 2. Single refined light sweep — one pass, no repeat
      .to(sweep, {
        x: '215%',
        duration: 0.38,
        ease: 'power2.inOut',
      }, '-=0.08')

      // 3. Hold — the emblem breathes
      .to({}, { duration: 0.22 })

      // 4. Elegant dissolve — overlay fades, homepage reveals beneath
      .to(overlay, {
        opacity: 0,
        duration: 0.42,
        ease: 'power2.inOut',
        onComplete,
      });
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: '#090909' }}
    >
      {/* ── Logo emblem ───────────────────────────────────────── */}
      <div
        className="relative"
        style={{ perspective: '900px', perspectiveOrigin: '50% 50%' }}
      >
        <img
          ref={logoRef}
          src={logoUrl}
          alt="PHARAONIX logo"
          width={288}
          height={288}
          className="block w-56 sm:w-64 md:w-72 h-auto object-contain select-none"
          draggable={false}
          style={{
            // Dissolve the grey background into the black canvas
            WebkitMaskImage:
              'radial-gradient(ellipse 74% 80% at 50% 43%, black 22%, rgba(0,0,0,0.75) 48%, rgba(0,0,0,0.15) 68%, transparent 82%)',
            maskImage:
              'radial-gradient(ellipse 74% 80% at 50% 43%, black 22%, rgba(0,0,0,0.75) 48%, rgba(0,0,0,0.15) 68%, transparent 82%)',
            // Metallic depth — bevel highlight (top-left) + depth shadow (bottom-right) + gold aura
            filter: [
              'brightness(1.12)',
              'contrast(1.06)',
              'saturate(1.18)',
              'drop-shadow(-2px -3px 10px rgba(255,248,180,0.28))',   // bevel highlight
              'drop-shadow(3px 6px 18px rgba(0,0,0,0.92))',           // depth shadow
              'drop-shadow(0 0 36px rgba(212,175,55,0.62))',           // gold outer aura
              'drop-shadow(0 0 12px rgba(212,175,55,0.38))',           // close gold glow
            ].join(' '),
            transformStyle: 'preserve-3d',
          }}
        />

        {/* ── Cinematic light sweep — clipped to logo bounds ── */}
        <div
          ref={sweepRef}
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-none"
          style={{
            // Thin, bright, angled sweep — inspired by luxury watch advertisements
            background:
              'linear-gradient(108deg, transparent 30%, rgba(255,252,220,0.08) 44%, rgba(255,250,200,0.28) 50%, rgba(255,252,220,0.08) 56%, transparent 70%)',
          }}
        />
      </div>
    </div>
  );
}
