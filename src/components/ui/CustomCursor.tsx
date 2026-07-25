import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, .cursor-hover';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Premium, physical glide -- soft spring with a touch of mass so the
  // dot trails just enough to feel weighted, never snapping to the pointer.
  const springConfig = { damping: 30, stiffness: 260, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Respect touch devices: no custom cursor, keep native pointer hidden
    // only on devices that actually support fine pointer control.
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) {
      setIsTouch(true);
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
        setIsHovered(!!el?.closest(HOVER_SELECTOR));
      });
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      setIsClicking(true);
    };
    const handlePointerUp = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      setIsClicking(false);
    };
    const handleLeave = () => setIsVisible(false);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.addEventListener('mouseleave', handleLeave);

    document.documentElement.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseleave', handleLeave);
      document.documentElement.classList.remove('custom-cursor-active');
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isTouch) return null;

  const baseSize = 7;
  const hoverSize = 13;
  const size = isHovered ? hoverSize : baseSize;
  const scale = isClicking ? 0.8 : 1;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[100]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        backgroundColor: '#D4AF37',
        boxShadow: isHovered
          ? '0 0 10px 2px rgba(212, 175, 55, 0.55)'
          : '0 0 4px 1px rgba(212, 175, 55, 0.35)',
        opacity: isVisible ? 1 : 0,
      }}
      animate={{ width: size, height: size, scale }}
      transition={{
        width: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
        height: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
        scale: { duration: 0.18, ease: [0.25, 0.1, 0.25, 1] },
        opacity: { duration: 0.15 },
      }}
    />
  );
}
