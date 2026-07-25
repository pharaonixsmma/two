import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const steps = [
  { num: '01', title: 'Discover', desc: 'We learn about your business, your goals, and your customers.' },
  { num: '02', title: 'Design', desc: 'We craft visuals that reflect your brand and appeal to your audience.' },
  { num: '03', title: 'Build', desc: 'We build it — fast, clean, and ready to perform.' },
  { num: '04', title: 'Launch', desc: 'We go live with thorough testing and a smooth handover.' },
  { num: '05', title: 'Grow', desc: 'We track performance and help you grow beyond the launch.' }
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.8,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );

      stepRefs.current.forEach((step, i) => {
        if (step) {
          gsap.fromTo(step,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: i * 0.15,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-32 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="font-mono text-primary text-sm tracking-widest uppercase mb-4">04 / Process</h2>
        <p className="font-serif italic text-3xl md:text-5xl text-white mb-20">A Clear Path From Day One</p>

        <div className="relative">
          <div className="hidden md:block absolute top-[3rem] left-0 w-full h-[1px] bg-white/10">
            <div ref={lineRef} className="w-full h-full bg-primary/50 origin-left" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-4 relative z-10">
            {steps.map((step, index) => (
              <div
                key={step.num}
                ref={el => { stepRefs.current[index] = el; }}
                className="group flex flex-col cursor-hover"
                data-testid={`process-step-${step.num}`}
              >
                <div className="hidden md:flex mb-6 w-3 h-3 rounded-full bg-black border-2 border-primary group-hover:scale-150 group-hover:bg-primary transition-all duration-300 relative top-[-6px]" />

                <div className="font-serif text-5xl text-white/50 group-hover:text-primary transition-colors duration-500 mb-4 font-bold">
                  {step.num}
                </div>
                <h3 className="font-sans font-bold text-xl text-white mb-2">{step.title}</h3>
                <p className="font-mono text-xs text-white/85 leading-relaxed font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
