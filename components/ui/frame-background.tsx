"use client";

import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";

// Context to share frame state with child components
interface FrameContextType {
  currentFrame: number;
  totalFrames: number;
  isLoading: boolean;
  isScrollLocked: boolean;
}

const FrameContext = createContext<FrameContextType>({
  currentFrame: 1,
  totalFrames: 400, // Virtual total for animations
  isLoading: true,
  isScrollLocked: true,
});

// Hook to access current frame in child components
export function useFrame() {
  return useContext(FrameContext);
}

// Component to show content based on frame number
export function FrameReveal({
  children,
  showAfterFrame,
  hideAfterFrame,
  className = "",
}: {
  children: React.ReactNode;
  showAfterFrame?: number;
  hideAfterFrame?: number;
  className?: string;
}) {
  const { currentFrame } = useFrame();
  
  const shouldShow =
    (showAfterFrame === undefined || currentFrame >= showAfterFrame) &&
    (hideAfterFrame === undefined || currentFrame <= hideAfterFrame);

  return (
    <div
      className={className}
      style={{
        opacity: shouldShow ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
        pointerEvents: shouldShow ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );
}

// Component to animate properties based on frame range
export function FrameAnimate({
  children,
  startFrame,
  endFrame,
  startScale = 1,
  endScale = 1,
  startOpacity = 1,
  endOpacity = 1,
  startX = 0,
  endX = 0,
  startY = 0,
  endY = 0,
  startBlur = 0,
  endBlur = 0,
  startRotate = 0,
  endRotate = 0,
  className = "",
}: {
  children: React.ReactNode;
  startFrame: number;
  endFrame: number;
  startScale?: number;
  endScale?: number;
  startOpacity?: number;
  endOpacity?: number;
  startX?: number;
  endX?: number;
  startY?: number;
  endY?: number;
  startBlur?: number;
  endBlur?: number;
  startRotate?: number;
  endRotate?: number;
  className?: string;
}) {
  const { currentFrame } = useFrame();

  // Calculate progress (0 to 1) based on current frame position
  let progress = 0;
  if (currentFrame <= startFrame) {
    progress = 0;
  } else if (currentFrame >= endFrame) {
    progress = 1;
  } else {
    progress = (currentFrame - startFrame) / (endFrame - startFrame);
  }

  // Interpolate values
  const scale = startScale + (endScale - startScale) * progress;
  const opacity = startOpacity + (endOpacity - startOpacity) * progress;
  const x = startX + (endX - startX) * progress;
  const y = startY + (endY - startY) * progress;
  const blur = startBlur + (endBlur - startBlur) * progress;
  const rotate = startRotate + (endRotate - startRotate) * progress;

  // Check if pointer-events-none is explicitly set in className
  const hasPointerEventsNone = className.includes("pointer-events-none");

  return (
    <div
      className={className}
      style={{
        transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`,
        opacity,
        filter: blur > 0 ? `blur(${blur}px)` : "none",
        // Only auto-manage pointer events if not explicitly set to none
        pointerEvents: hasPointerEventsNone ? "none" : (opacity > 0.1 ? "auto" : "none"),
      }}
    >
      {children}
    </div>
  );
}

const TOTAL_IMAGE_FRAMES = 231; // Actual image frames available
const VIRTUAL_TOTAL_FRAMES = 400; // Virtual frames for animations (can be any number)
const AUTO_PLAY_FRAMES = 171;
const FPS = 30;
const SCROLL_LOCK_DURATION = 6000; // 6 seconds
const INITIAL_FRAMES_TO_LOAD = 30; // Load first 30 frames before starting

function getFramePath(frameNumber: number): string {
  const paddedNumber = frameNumber.toString().padStart(4, "0");
  return `/frames/frame_${paddedNumber}.jpg`;
}

// Helper to load a single image
function loadImage(frameNumber: number): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = getFramePath(frameNumber);
  });
}

export function FrameBackground({ children }: { children: React.ReactNode }) {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isScrollLocked, setIsScrollLocked] = useState(true);
  const [initialLoaded, setInitialLoaded] = useState(false); // First 30 frames loaded
  const [allLoaded, setAllLoaded] = useState(false); // All frames loaded
  const [loadProgress, setLoadProgress] = useState(0); // 0-100
  const [autoPlayComplete, setAutoPlayComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_IMAGE_FRAMES).fill(null));
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(1);

  // Force scroll to top on page load/refresh
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  // Progressive image loading
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    const updateProgress = () => {
      if (!isCancelled) {
        setLoadProgress(Math.round((loadedCount / TOTAL_IMAGE_FRAMES) * 100));
      }
    };

    const loadImages = async () => {
      // Phase 1: Load first 30 frames (for initial auto-play)
      const initialPromises = [];
      for (let i = 1; i <= INITIAL_FRAMES_TO_LOAD; i++) {
        initialPromises.push(
          loadImage(i).then((img) => {
            imagesRef.current[i - 1] = img;
            loadedCount++;
            updateProgress();
            return img;
          })
        );
      }

      try {
        await Promise.all(initialPromises);
        if (!isCancelled) {
          setInitialLoaded(true);
        }

        // Phase 2: Load remaining frames in background
        for (let i = INITIAL_FRAMES_TO_LOAD + 1; i <= TOTAL_IMAGE_FRAMES; i++) {
          if (isCancelled) break;
          
          try {
            const img = await loadImage(i);
            imagesRef.current[i - 1] = img;
            loadedCount++;
            updateProgress();
          } catch (error) {
            console.error(`Failed to load frame ${i}:`, error);
          }
        }

        if (!isCancelled) {
          setAllLoaded(true);
        }
      } catch (error) {
        console.error("Failed to load initial images:", error);
      }
    };

    loadImages();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Draw current frame on canvas (caps at last available image)
  const drawFrame = useCallback((frameNumber: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    // Cap at last available image frame
    const actualFrame = Math.min(frameNumber, TOTAL_IMAGE_FRAMES);
    const image = imagesRef.current[actualFrame - 1];

    // If image not loaded yet, try to draw the closest loaded frame
    if (!canvas || !ctx) return;
    if (!image) {
      // Find the closest loaded frame
      for (let i = actualFrame - 1; i >= 0; i--) {
        if (imagesRef.current[i]) {
          ctx.drawImage(imagesRef.current[i]!, 0, 0, canvas.width, canvas.height);
          return;
        }
      }
      return;
    }

    // Set canvas size to match window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Calculate dimensions to cover the canvas (like background-size: cover)
    const imgRatio = image.width / image.height;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Auto-play first 171 frames at 30fps (starts after initial 30 frames loaded)
  useEffect(() => {
    if (!initialLoaded) return;

    const frameInterval = 1000 / FPS;
    let frame = 1;

    const animate = (timestamp: number) => {
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = timestamp;
      }

      const elapsed = timestamp - lastFrameTimeRef.current;

      if (elapsed >= frameInterval) {
        lastFrameTimeRef.current = timestamp - (elapsed % frameInterval);
        frame++;

        if (frame <= AUTO_PLAY_FRAMES) {
          currentFrameRef.current = frame;
          setCurrentFrame(frame);
          drawFrame(frame);
        } else {
          setAutoPlayComplete(true);
          return;
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start with frame 1
    drawFrame(1);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [initialLoaded, drawFrame]);

  // Lock scroll for 6 seconds
  useEffect(() => {
    if (!initialLoaded) return;

    // Disable scrolling initially
    document.body.style.overflow = "hidden";

    const timeout = setTimeout(() => {
      setIsScrollLocked(false);
      document.body.style.overflow = "";
    }, SCROLL_LOCK_DURATION);

    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = "";
    };
  }, [initialLoaded]);

  // Handle scroll-based animation for frames 172+ (virtual frames beyond 231)
  useEffect(() => {
    if (isScrollLocked || !autoPlayComplete) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight <= 0) {
        if (currentFrameRef.current !== AUTO_PLAY_FRAMES) {
          currentFrameRef.current = AUTO_PLAY_FRAMES;
          setCurrentFrame(AUTO_PLAY_FRAMES);
          drawFrame(AUTO_PLAY_FRAMES);
        }
        return;
      }

      const scrollProgress = Math.min(scrollTop / scrollHeight, 1);
      // Use virtual total for animations (can exceed actual image count)
      const scrollFrameCount = VIRTUAL_TOTAL_FRAMES - AUTO_PLAY_FRAMES;
      
      // Calculate virtual frame (can go beyond actual image frames)
      const frameInScrollRange = Math.floor(scrollProgress * scrollFrameCount);
      const virtualFrame = AUTO_PLAY_FRAMES + frameInScrollRange;

      // Ensure we show at least frame 171 when at top
      const finalFrame = scrollTop === 0 ? AUTO_PLAY_FRAMES : Math.max(virtualFrame, AUTO_PLAY_FRAMES);

      if (finalFrame !== currentFrameRef.current) {
        currentFrameRef.current = finalFrame;
        setCurrentFrame(finalFrame);
        // drawFrame will cap at TOTAL_IMAGE_FRAMES automatically
        drawFrame(finalFrame);
      }
    };

    // Initial draw at frame 171 (only once when effect first runs)
    currentFrameRef.current = AUTO_PLAY_FRAMES;
    setCurrentFrame(AUTO_PLAY_FRAMES);
    drawFrame(AUTO_PLAY_FRAMES);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrollLocked, autoPlayComplete, drawFrame]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  return (
    <FrameContext.Provider
      value={{
        currentFrame,
        totalFrames: VIRTUAL_TOTAL_FRAMES,
        isLoading: !initialLoaded,
        isScrollLocked,
      }}
    >
      <div ref={containerRef} className="relative">
        {/* Fixed background canvas */}
        <canvas
          ref={canvasRef}
          className="fixed inset-0 w-full h-full -z-10"
          style={{ 
            backgroundColor: "#000",
            opacity: initialLoaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out"
          }}
        />
        
        {/* Loading overlay with progress */}
        {!initialLoaded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="flex flex-col items-center gap-6">
              {/* Progress ring */}
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                  {/* Background circle */}
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="4"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 36}`}
                    strokeDashoffset={`${2 * Math.PI * 36 * (1 - loadProgress / 100)}`}
                    style={{ transition: "stroke-dashoffset 0.2s ease-out" }}
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ff69b4" />
                      <stop offset="100%" stopColor="#ff1493" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Percentage text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{loadProgress}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Debug: Frame counter */}
        {/* <div className="fixed top-4 right-4 z-[9999] bg-black/80 text-white px-4 py-2 rounded-lg font-mono text-sm">
          <div>Frame: <span className="text-green-400 font-bold">{currentFrame}</span></div>
          <div className="text-white/50 text-xs">Images: {TOTAL_IMAGE_FRAMES} | Virtual: {VIRTUAL_TOTAL_FRAMES}</div>
        </div> */}
        
        {/* Content */}
        <div className="relative z-0">
          {children}
        </div>
      </div>
    </FrameContext.Provider>
  );
}

