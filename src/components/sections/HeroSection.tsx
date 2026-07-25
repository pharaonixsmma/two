import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';

// The Three.js particle canvas is the single heaviest dependency in the
// bundle (three + @react-three/fiber + drei). It's purely a decorative
// backdrop behind the hero copy, so it's split into its own chunk and
// mounted async -- the headline, description, and CTAs (the actual LCP/
// interactive content) render immediately without waiting on it, while the
// canvas fades in over the same black background it always rendered on.
interface HeroSectionProps {
  mousePosition?: { x: number; y: number };
  touchInteracting?: boolean;
}

export default function HeroSection(_props: HeroSectionProps = {}) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = textRef.current?.querySelectorAll('.reveal-text');
      const cta   = textRef.current?.querySelector('.hero-cta');
      if (!lines) return;

      const tl = gsap.timeline({ delay: 0.1 });

      // Headline lines slide up from clip
      tl.fromTo(
        lines,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 1.0, ease: 'power4.out' }
      );

      // CTA buttons fade in with a subtle scale-up
      if (cta) {
        tl.fromTo(
          cta,
          { opacity: 0, scale: 0.94, y: 10 },
          { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'power3.out' },
          '-=0.4'
        );
      }

      // Scroll indicator appears last, once everything else has settled
      const scrollIndicator = document.querySelector('.hero-scroll-indicator');
      if (scrollIndicator) {
        tl.fromTo(
          scrollIndicator,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.1'
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-transparent">

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center pointer-events-none">
        <div ref={textRef} className="max-w-4xl pt-20">
          <div className="overflow-hidden mb-6">
            <p className="reveal-text font-mono text-primary text-sm tracking-[0.2em] uppercase">
              Premium Digital Marketing Agency
            </p>
          </div>

          <h1 className="font-serif font-light text-[clamp(3.5rem,9vw,8rem)] leading-[0.92] text-white tracking-tight">
            <div className="overflow-hidden">
              <span className="reveal-text block">FROM VISION</span>
            </div>
            <div className="overflow-hidden">
              <span className="reveal-text block italic text-primary/90">TO VICTORY.</span>
            </div>
          </h1>

          <div className="overflow-hidden mt-8 mb-10 max-w-xl">
            <p className="reveal-text font-sans font-light text-white/90 text-lg md:text-xl leading-relaxed">
              Helping Indian businesses grow through premium websites, social media management, advertising, graphic design, scripting &amp; shooting, and content creation.
            </p>
          </div>

          <div className="overflow-hidden">
            <div className="reveal-text hero-cta pointer-events-auto flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo('#contact')}
                data-testid="hero-cta-consultation"
                className="group relative px-8 py-4 rounded-full bg-primary text-black font-mono text-sm tracking-widest uppercase overflow-hidden transition-colors hover:text-black flex items-center justify-center gap-3"
              >
                <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                <span className="relative z-10 font-bold">Start a Project</span>
                <ArrowUpRight className="relative z-10" size={16} />
              </button>
              <button
                onClick={() => scrollTo('#services')}
                data-testid="hero-cta-work"
                className="group relative px-8 py-4 rounded-full border border-white/30 text-white font-mono text-sm tracking-widest uppercase overflow-hidden transition-colors hover:border-primary"
              >
                <div className="absolute inset-0 bg-primary/10 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                <span className="relative z-10">View Work</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 pointer-events-none opacity-0">
        <span className="font-mono text-[9px] text-white/40 tracking-[0.4em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-primary/80 origin-top animate-[scroll-down_2.4s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
