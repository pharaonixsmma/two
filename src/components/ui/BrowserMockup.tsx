import { type ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface BrowserMockupProps {
  children: ReactNode;
  className?: string;
}

/**
 * Premium browser-window chrome wrapping a live mini website preview.
 * Adds a subtle 3D tilt toward the cursor on hover, a soft gold glow,
 * and a glass highlight -- the "hero element" of each portfolio project.
 */
export default function BrowserMockup({ children, className = '' }: BrowserMockupProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { damping: 24, stiffness: 220, mass: 0.6 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div className={`group/browser [perspective:1400px] ${className}`}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ y: -8, scale: 1.012 }}
        transition={{ type: 'spring', damping: 20, stiffness: 160, mass: 0.5 }}
        className="
          relative rounded-[16px] overflow-hidden
          border border-[#D4AF37]/20
          bg-[#0a0a0c]/80 backdrop-blur-xl
          shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7),0_0_0_1px_rgba(212,175,55,0.04),0_0_40px_rgba(212,175,55,0.04)]
          group-hover/browser:border-[#D4AF37]/45
          group-hover/browser:shadow-[0_32px_90px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(212,175,55,0.1),0_0_70px_rgba(212,175,55,0.14)]
          transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]
        "
      >
        {/* Glass top highlight */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none z-20" />

        {/* Browser chrome bar */}
        <div className="relative z-10 flex items-center gap-3 px-4 py-3 bg-gradient-to-b from-[#111113] to-[#0c0c0e] border-b border-white/[0.06]">
          <div className="flex items-center gap-[6px] shrink-0">
            <span className="w-[9px] h-[9px] rounded-full bg-[#5a4a2a]" />
            <span className="w-[9px] h-[9px] rounded-full bg-[#5a4a2a]" />
            <span className="w-[9px] h-[9px] rounded-full bg-[#D4AF37]/70" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-2 px-3 py-[5px] rounded-full bg-black/40 border border-white/[0.06] max-w-[220px] w-full">
              <span className="w-[5px] h-[5px] rounded-full bg-[#D4AF37]/60 shrink-0" />
              <span className="h-[3px] flex-1 rounded-full bg-white/10" />
            </div>
          </div>
          <div className="w-4 shrink-0" />
        </div>

        {/* Live preview fills nearly the entire window */}
        <div className="relative aspect-[16/10.5] w-full">
          {children}
        </div>

        {/* Bottom glass reflection */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-20" />
      </motion.div>
    </div>
  );
}
