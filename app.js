(() => {
  const TOTAL_FRAMES = 121;
  const LERP_FACTOR = 0.18; // Smoothness factor for scroll scrubbing

  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const loaderBar = document.getElementById('loader-bar');

  const images = new Array(TOTAL_FRAMES);
  const loadedFlags = new Array(TOTAL_FRAMES).fill(false);

  let loadedCount = 0;
  let currentFrameIndex = 0;
  let targetFrameIndex = 0;
  let lastRenderedFrameIndex = -1;
  let animationFrameId = null;

  // Format frame filename: frame_001.jpg, frame_002.jpg, ...
  function getFramePath(index) {
    const padded = String(index + 1).padStart(3, '0');
    return `public/frames/frame_${padded}.jpg`;
  }

  // Preload frames progressively
  function preloadImages() {
    // 1. Load initial frame first for immediate visual display
    const firstImg = new Image();
    firstImg.src = getFramePath(0);
    firstImg.onload = () => {
      images[0] = firstImg;
      loadedFlags[0] = true;
      loadedCount++;
      updateLoader();
      renderFrame(0); // Instant first frame draw
    };

    // 2. Load all remaining frames
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        images[i] = img;
        loadedFlags[i] = true;
        loadedCount++;
        updateLoader();
      };
      img.onerror = () => {
        // Fallback flag to prevent stalling
        loadedCount++;
        updateLoader();
      };
    }
  }

  function updateLoader() {
    const percentage = Math.min(100, Math.floor((loadedCount / TOTAL_FRAMES) * 100));
    if (loaderBar) {
      loaderBar.style.width = `${percentage}%`;
      if (loadedCount >= TOTAL_FRAMES) {
        loaderBar.classList.add('completed');
      }
    }
  }

  // Calculate canvas size and sharp DPI scale
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssWidth = window.innerWidth;
    const cssHeight = window.innerHeight;

    canvas.width = Math.floor(cssWidth * dpr);
    canvas.height = Math.floor(cssHeight * dpr);
    
    // Reset transform before scaling
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    // Force redraw on resize
    lastRenderedFrameIndex = -1;
  }

  // Cover aspect ratio algorithm (fills entire viewport without distortion)
  function drawCoverImage(img) {
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cssWidth = window.innerWidth;
    const cssHeight = window.innerHeight;

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = cssWidth / cssHeight;

    let renderWidth, renderHeight, offsetX, offsetY;

    if (canvasAspect > imgAspect) {
      renderWidth = cssWidth;
      renderHeight = cssWidth / imgAspect;
      offsetX = 0;
      offsetY = (cssHeight - renderHeight) / 2;
    } else {
      renderWidth = cssHeight * imgAspect;
      renderHeight = cssHeight;
      offsetX = (cssWidth - renderWidth) / 2;
      offsetY = 0;
    }

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, cssWidth, cssHeight);
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  }

  // Helper to find the nearest loaded frame if current target frame is still downloading
  function getNearestLoadedFrame(targetIdx) {
    if (loadedFlags[targetIdx] && images[targetIdx]) {
      return images[targetIdx];
    }
    // Search outward for nearest loaded frame
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = targetIdx - offset;
      if (prev >= 0 && loadedFlags[prev] && images[prev]) return images[prev];
      const next = targetIdx + offset;
      if (next < TOTAL_FRAMES && loadedFlags[next] && images[next]) return images[next];
    }
    return images[0] || null;
  }

  function renderFrame(idx) {
    const imgToDraw = getNearestLoadedFrame(idx);
    if (imgToDraw) {
      drawCoverImage(imgToDraw);
      lastRenderedFrameIndex = idx;
    }
  }

  // Calculate scroll target frame
  function calculateTargetFrame() {
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || (document.body ? document.body.scrollTop : 0) || 0;
    const totalHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body ? document.body.scrollHeight : 0,
      document.documentElement.offsetHeight
    );
    const maxScroll = Math.max(1, totalHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
    targetFrameIndex = progress * (TOTAL_FRAMES - 1);
  }

  // Continuous animation loop for buttery smooth lerp scrubbing
  function loop() {
    calculateTargetFrame();

    // Lerp towards target index
    const diff = targetFrameIndex - currentFrameIndex;
    if (Math.abs(diff) > 0.001) {
      currentFrameIndex += diff * LERP_FACTOR;
    } else {
      currentFrameIndex = targetFrameIndex;
    }

    const roundedFrame = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrameIndex)));

    if (roundedFrame !== lastRenderedFrameIndex) {
      renderFrame(roundedFrame);
    }

    animationFrameId = requestAnimationFrame(loop);
  }

  // Event Listeners
  window.addEventListener('resize', () => {
    resizeCanvas();
    renderFrame(Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrameIndex))));
  });

  window.addEventListener('scroll', calculateTargetFrame, { passive: true });


  // Initialization
  function init() {
    resizeCanvas();
    preloadImages();
    loop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
