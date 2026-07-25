import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      const textElements = textRef.current?.querySelectorAll('.reveal-up');
      if (textElements) {
        gsap.fromTo(textElements,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
            }
          }
        );
      }

      const stats = numbersRef.current?.querySelectorAll('.stat-num');
      if (stats) {
        gsap.from(stats, {
          textContent: 0,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          stagger: 0.2,
          scrollTrigger: {
            trigger: numbersRef.current,
            start: "top 85%",
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 md:py-48 bg-transparent overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-24">

          {/* Left col — section number + label */}
          <div className="md:col-span-4 flex flex-col justify-between">
            {/* Decorative number — clamped so it never overflows on small screens */}
            <div
              className="font-serif leading-none text-primary/20 font-light overflow-hidden"
              style={{ fontSize: 'clamp(4.5rem, 18vw, 12rem)' }}
            >
              03
            </div>
            <div className="mt-4 md:mt-0">
              <h3 className="font-serif italic text-3xl md:text-4xl text-white mb-2">The Agency</h3>
              <p className="font-mono text-xs md:text-sm text-primary uppercase tracking-widest">Built for Indian Business</p>
            </div>
          </div>

          {/* Right col — body copy + stats */}
          <div ref={textRef} className="md:col-span-8 flex flex-col justify-center">
            <div className="space-y-6 md:space-y-8 font-sans font-light text-base md:text-xl lg:text-2xl text-white/90 leading-relaxed">
              <p className="reveal-up text-white">
                Built around your business, not around our credentials. We understand the Indian market — the ambitions, the constraints, and what it actually takes to compete and win.
              </p>
              <p className="reveal-up text-white/80">
                We know that small and medium businesses need solutions that drive actual revenue, not just vanity metrics. Every system we build is designed to bring you more enquiries, better brand recognition, and measurable growth.
              </p>
              <p className="reveal-up text-xs md:text-sm text-primary font-mono uppercase tracking-wider font-semibold">
                Serving businesses across India — fully remote, always personal.
              </p>
            </div>

            <div ref={dividerRef} className="w-full h-px bg-white/15 my-8 md:my-12 origin-left" />

            <div ref={numbersRef} className="grid grid-cols-3 gap-4 md:gap-8">
              <div>
                <div className="font-serif text-3xl md:text-5xl text-primary font-bold mb-1 md:mb-2">
                  <span className="stat-num">6</span>+
                </div>
                <div className="font-mono text-[10px] md:text-xs text-white/90 uppercase tracking-wider leading-tight font-medium">Core Services</div>
              </div>
              <div>
                <div className="font-serif text-3xl md:text-5xl text-primary font-bold mb-1 md:mb-2">
                  <span className="stat-num">100</span>%
                </div>
                <div className="font-mono text-[10px] md:text-xs text-white/90 uppercase tracking-wider leading-tight font-medium">Revenue-Focused</div>
              </div>
              <div>
                <div className="font-serif text-3xl md:text-5xl text-primary font-bold mb-1 md:mb-2">
                  <span className="stat-num">24</span>/7
                </div>
                <div className="font-mono text-[10px] md:text-xs text-white/90 uppercase tracking-wider leading-tight font-medium">AI Systems Active</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
