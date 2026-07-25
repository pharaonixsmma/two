import { useEffect } from 'react';

const TOTAL_FRAMES = 120;
const LERP_FACTOR = 0.15; // Smooth scrubbing factor

export default function BackgroundCanvas() {
  useEffect(() => {
    const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    const loadedFlags: boolean[] = new Array(TOTAL_FRAMES).fill(false);

    let currentFrameIndex = 0;
    let targetFrameIndex = 0;
    let lastRenderedFrameIndex = -1;
    let animFrameId: number;

    // Helper to format frame path: /frames/frame_001.jpg ... /frames/frame_120.jpg
    function getFramePath(idx: number): string {
      const padded = String(idx + 1).padStart(3, '0');
      return `/frames/frame_${padded}.jpg`;
    }

    // Preload images
    function preloadImages() {
      // 1. Load initial frame immediately
      const firstImg = new Image();
      firstImg.src = getFramePath(0);
      firstImg.onload = () => {
        images[0] = firstImg;
        loadedFlags[0] = true;
        renderFrame(0);
      };

      // 2. Load all remaining frames asynchronously
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFramePath(i);
        img.onload = () => {
          images[i] = img;
          loadedFlags[i] = true;
        };
        img.onerror = () => {
          loadedFlags[i] = false;
        };
      }
    }

    function resizeCanvas() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      lastRenderedFrameIndex = -1;
    }

    // Draw image with Cover aspect ratio fitting
    function drawCoverImage(img: HTMLImageElement) {
      if (!ctx || !img || !img.complete || img.naturalWidth === 0) return;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = w / h;

      let renderW: number, renderH: number, offsetRight: number, offsetTop: number;

      if (canvasAspect > imgAspect) {
        renderW = w;
        renderH = w / imgAspect;
        offsetRight = 0;
        offsetTop = (h - renderH) / 2;
      } else {
        renderW = h * imgAspect;
        renderH = h;
        offsetRight = (w - renderW) / 2;
        offsetTop = 0;
      }

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, offsetRight, offsetTop, renderW, renderH);
    }

    function getNearestLoadedFrame(idx: number): HTMLImageElement | null {
      if (loadedFlags[idx] && images[idx]) {
        return images[idx];
      }
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = idx - offset;
        if (prev >= 0 && loadedFlags[prev] && images[prev]) return images[prev];
        const next = idx + offset;
        if (next < TOTAL_FRAMES && loadedFlags[next] && images[next]) return images[next];
      }
      return images[0] || null;
    }

    function renderFrame(idx: number) {
      const imgToDraw = getNearestLoadedFrame(idx);
      if (imgToDraw) {
        drawCoverImage(imgToDraw);
        lastRenderedFrameIndex = idx;
      }
    }

    function calculateTargetFrame() {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      targetFrameIndex = progress * (TOTAL_FRAMES - 1);
    }

    function loop() {
      calculateTargetFrame();

      const diff = targetFrameIndex - currentFrameIndex;
      if (Math.abs(diff) > 0.001) {
        currentFrameIndex += diff * LERP_FACTOR;
      } else {
        currentFrameIndex = targetFrameIndex;
      }

      const rounded = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrameIndex)));
      if (rounded !== lastRenderedFrameIndex) {
        renderFrame(rounded);
      }

      animFrameId = requestAnimationFrame(loop);
    }

    function handleResize() {
      resizeCanvas();
      const rounded = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrameIndex)));
      renderFrame(rounded);
    }

    resizeCanvas();
    preloadImages();
    loop();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', calculateTargetFrame, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', calculateTargetFrame);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return null;
}
