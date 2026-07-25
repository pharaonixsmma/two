import { lazy, Suspense, useEffect, useRef, useState } from "react";
import CustomCursor from "@/components/ui/CustomCursor";
import FloatingNav from "@/components/ui/FloatingNav";
import HeroSection from "@/components/sections/HeroSection";
import BackgroundCanvas from "@/components/ui/BackgroundCanvas";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Below-the-fold sections are code-split so their component code (and the
// heavy libs they pull in, e.g. GSAP ScrollTrigger usage, portfolio preview
// mockups) is fetched in parallel with -- not blocking -- the initial paint
// of the Hero. They're still requested immediately (no intersection gating)
// so scrolling never has to wait on a network round trip; only the JS
// parse/execute cost is deferred out of the critical bundle.
const WorkSection = lazy(() => import("@/components/sections/WorkSection"));
const PortfolioSection = lazy(() => import("@/components/sections/PortfolioSection"));
const AboutSection = lazy(() => import("@/components/sections/AboutSection"));
const ProcessSection = lazy(() => import("@/components/sections/ProcessSection"));
const ContactSection = lazy(() => import("@/components/sections/ContactSection"));

gsap.registerPlugin(ScrollTrigger);

export default function StudioHome() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // True while any touch pointer is actively moving -- drives the subtle
  // finger-proximity reaction in the particle field. Stays false for mouse
  // input, so desktop behavior is completely unaffected. Tracked per pointer
  // id (not a single global flag) so multiple simultaneous fingers don't
  // cause one lifting/pausing to prematurely cancel another's interaction.
  const [touchInteracting, setTouchInteracting] = useState(false);
  const activeTouches = useRef<Map<number, number>>(new Map());

  useEffect(() => {
    const touches = activeTouches.current;
    const syncTouchState = () => setTouchInteracting(touches.size > 0);

    const clearTouch = (pointerId: number) => {
      const timeoutId = touches.get(pointerId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      touches.delete(pointerId);
    };

    // Pointer Events unify mouse and touch input: the particle field follows
    // both, while never calling preventDefault so page scrolling is untouched.
    const handlePointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });

      if (e.pointerType === "touch") {
        const existing = touches.get(e.pointerId);
        if (existing !== undefined) window.clearTimeout(existing);
        // A finger held still without new move events reads as "stopped" --
        // drop it from the active set shortly after motion pauses so
        // particles start easing back to rest almost immediately.
        const timeoutId = window.setTimeout(() => {
          touches.delete(e.pointerId);
          syncTouchState();
        }, 60);
        touches.set(e.pointerId, timeoutId);
        syncTouchState();
      }
    };

    const handleTouchEnd = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      clearTouch(e.pointerId);
      syncTouchState();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handleTouchEnd, { passive: true });
    window.addEventListener("pointercancel", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handleTouchEnd);
      window.removeEventListener("pointercancel", handleTouchEnd);
      touches.forEach((timeoutId) => window.clearTimeout(timeoutId));
      touches.clear();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent text-foreground overflow-hidden">
      <BackgroundCanvas />
      <CustomCursor />
      <FloatingNav />

      <main>
        <HeroSection mousePosition={mousePosition} touchInteracting={touchInteracting} />
        {/*
          Each section keeps its own Suspense boundary with a same-id
          placeholder fallback. Nav links and CTAs do
          `document.querySelector('#services')?.scrollIntoView(...)`
          immediately on click, so the anchor element must exist in the DOM
          from first render -- even before that section's chunk has loaded --
          or an early click would silently no-op.
        */}
        <Suspense fallback={<div id="services" />}>
          <WorkSection />
        </Suspense>
        <Suspense fallback={<div id="portfolio" />}>
          <PortfolioSection />
        </Suspense>
        <Suspense fallback={<div id="about" />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<div id="process" />}>
          <ProcessSection />
        </Suspense>
        <Suspense fallback={<div id="contact" />}>
          <ContactSection />
        </Suspense>
      </main>
    </div>
  );
}
