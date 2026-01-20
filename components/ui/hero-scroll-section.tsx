"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { LuCornerDownLeft, LuCornerUpRight } from "react-icons/lu";


const TOTAL_FRAMES = 40;

function getFramePath(frame: number): string {
	return `/frames/Frame_${frame.toString().padStart(4, "0")}.jpeg`;
}

function lerp(start: number, end: number, progress: number): number {
	return start + (end - start) * Math.max(0, Math.min(1, progress));
}

function mapRange(value: number, inMin: number, inMax: number): number {
	return Math.max(0, Math.min(1, (value - inMin) / (inMax - inMin)));
}

interface AnimateProps {
	children: React.ReactNode;
	progress: number;
	start: number;
	end: number;
	from?: { opacity?: number; y?: number; x?: number; scale?: number; blur?: number };
	to?: { opacity?: number; y?: number; x?: number; scale?: number; blur?: number };
	className?: string;
}

function Animate({
	children,
	progress,
	start,
	end,
	from = {},
	to = {},
	className = "",
}: AnimateProps) {
	const segmentProgress = mapRange(progress, start, end);

	const opacity = lerp(from.opacity ?? 1, to.opacity ?? 1, segmentProgress);
	const y = lerp(from.y ?? 0, to.y ?? 0, segmentProgress);
	const x = lerp(from.x ?? 0, to.x ?? 0, segmentProgress);
	const scale = lerp(from.scale ?? 1, to.scale ?? 1, segmentProgress);
	const blur = lerp(from.blur ?? 0, to.blur ?? 0, segmentProgress);

	return (
		<div
			className={className}
			style={{
				transform: `translate(${x}px, ${y}px) scale(${scale})`,
				opacity,
				filter: blur > 0 ? `blur(${blur}px)` : "none",
				pointerEvents: opacity > 0.1 ? "auto" : "none",
			}}
		>
			{children}
		</div>
	);
}

// Answer item that moves from bottom to top
interface AnswerItemProps {
	children: React.ReactNode;
	progress: number;
	startProgress: number; // When this answer starts animating
	isLeft: boolean; // Left or right side
}

function AnswerItem({ children, progress, startProgress, isLeft }: AnswerItemProps) {
	// Each answer takes 0.15 progress to fully animate through
	const duration = 0.15;
	const endProgress = startProgress + duration;

	// Calculate local progress for this answer (0 = start, 1 = end)
	const localProgress = mapRange(progress, startProgress, endProgress);

	// Y position: starts at bottom (+400), ends at top (-400)
	// Center point (y=0) is at localProgress 0.5
	const y = lerp(400, -400, localProgress);

	// Opacity: 0 at start, 1 at center, 0 at end
	let opacity = 0;
	if (localProgress < 0.4) {
		opacity = lerp(0, 1, localProgress / 0.4);
	} else if (localProgress > 0.6) {
		opacity = lerp(1, 0, (localProgress - 0.6) / 0.4);
	} else {
		opacity = 1;
	}

	// Blur: 8 at edges, 0 at center
	let blur = 0;
	if (localProgress < 0.3) {
		blur = lerp(8, 0, localProgress / 0.3);
	} else if (localProgress > 0.7) {
		blur = lerp(0, 8, (localProgress - 0.7) / 0.3);
	}

	return (
		<div
			className={`absolute max-w-[140px] sm:max-w-[180px] md:max-w-[220px] text-center ${
				isLeft
					? "right-[55%] sm:right-[58%] md:right-[60%]"
					: "left-[55%] sm:left-[58%] md:left-[60%]"
			}`}
			style={{
				transform: `translateY(${y}px)`,
				opacity,
				filter: blur > 0 ? `blur(${blur}px)` : "none",
			}}
		>
			<div className="relative inline-block px-10 py-6">
			{/* Top-left corner mark */}
			<LuCornerUpRight
				className="absolute left-2 top-2 text-pink-400/40"
				size={22}
			/>

			{/* Bottom-right corner mark */}
			<LuCornerDownLeft
				className="absolute right-2 bottom-2 text-pink-400/40"
				size={22}
			/>

			<div className="text-sm md:text-lg text-white/90 text-center font-mono leading-relaxed">
				{children}
			</div>
		</div>
		</div>
	);
}

interface HeroScrollSectionProps {
	heroContent?: React.ReactNode;
	questionText: React.ReactNode;
	answers: string[];
}

export function HeroScrollSection({ heroContent, questionText, answers }: HeroScrollSectionProps) {
	const [progress, setProgress] = useState(0);
	const [videoEnded, setVideoEnded] = useState(false);
	const [videoReady, setVideoReady] = useState(false);
	const [imagesLoaded, setImagesLoaded] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const imagesRef = useRef<HTMLImageElement[]>([]);
	const prevFrameRef = useRef<number>(1);
	const frameChangeTimeRef = useRef<number>(Date.now());
	const [motionBlur, setMotionBlur] = useState(0);

	// Preload frames
	useEffect(() => {
		Promise.all(
			Array.from({ length: TOTAL_FRAMES }, (_, i) => {
				return new Promise<HTMLImageElement>((resolve, reject) => {
					const img = new Image();
					img.onload = () => resolve(img);
					img.onerror = reject;
					img.src = getFramePath(i + 1);
				});
			})
		)
			.then((images) => {
				imagesRef.current = images;
				setImagesLoaded(true);
			})
			.catch(console.error);
	}, []);

	// Draw frame on canvas with motion blur
	const drawFrame = useCallback((frameNum: number) => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		const frame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(frameNum)));
		const img = imagesRef.current[frame - 1];

		if (!canvas || !ctx || !img) return;

		// Calculate frame change rate for motion blur
		const now = Date.now();
		const timeDelta = now - frameChangeTimeRef.current;
		const frameDelta = Math.abs(frame - prevFrameRef.current);

		// Calculate blur amount based on frame change rate
		// Faster frame changes = more blur
		const frameChangeRate = frameDelta / Math.max(timeDelta, 16); // frames per ms
		const blurAmount = Math.min(frameChangeRate * 2, 4); // Cap at 4px blur

		setMotionBlur(blurAmount);

		prevFrameRef.current = frame;
		frameChangeTimeRef.current = now;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		// Enable image smoothing for smoother transitions
		ctx.imageSmoothingEnabled = true;
		ctx.imageSmoothingQuality = "high";

		const imgRatio = img.width / img.height;
		const canvasRatio = canvas.width / canvas.height;
		let w, h, x, y;

		if (canvasRatio > imgRatio) {
			w = canvas.width;
			h = w / imgRatio;
			x = 0;
			y = (canvas.height - h) / 2;
		} else {
			h = canvas.height;
			w = h * imgRatio;
			x = (canvas.width - w) / 2;
			y = 0;
		}

		ctx.drawImage(img, x, y, w, h);
	}, []);

	// Handle video
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const onReady = () => {
			if (!videoReady) {
				setVideoReady(true);
				video.play().catch(() => setVideoEnded(true));
			}
		};

		const onEnd = () => setVideoEnded(true);

		if (video.readyState >= 3) onReady();

		video.addEventListener("canplay", onReady);
		video.addEventListener("ended", onEnd);

		const timeout = setTimeout(() => {
			if (!videoReady) {
				setVideoReady(true);
				setVideoEnded(true);
			}
		}, 8000);

		return () => {
			video.removeEventListener("canplay", onReady);
			video.removeEventListener("ended", onEnd);
			clearTimeout(timeout);
		};
	}, [videoReady]);

	// Pre-draw first frame before video ends
	useEffect(() => {
		const video = videoRef.current;
		if (!video || !imagesLoaded) return;

		const onTimeUpdate = () => {
			if (video.duration - video.currentTime < 0.3) {
				drawFrame(1);
			}
		};

		video.addEventListener("timeupdate", onTimeUpdate);
		return () => video.removeEventListener("timeupdate", onTimeUpdate);
	}, [imagesLoaded, drawFrame]);

	// Lock scroll until video ends
	useEffect(() => {
		document.body.style.overflow = videoEnded && imagesLoaded ? "" : "hidden";
		window.scrollTo(0, 0);
		return () => {
			document.body.style.overflow = "";
		};
	}, [videoEnded, imagesLoaded]);

	// Scroll-based progress
	useEffect(() => {
		if (!videoEnded || !imagesLoaded) return;

		let lastScrollTime = Date.now();
		let blurDecayInterval: NodeJS.Timeout | null = null;

		const handleScroll = () => {
			const container = containerRef.current;
			if (!container) return;

			const rect = container.getBoundingClientRect();
			const scrollableHeight = container.offsetHeight - window.innerHeight;

			const scrolled = -rect.top;
			const p = Math.max(0, Math.min(1, scrolled / scrollableHeight));

			setProgress(p);

			// Map first 25% of progress to frames 1-40
			// After that, stay on frame 40
			const frameProgress = Math.min(p / 0.25, 1);
			const frame = 1 + frameProgress * (TOTAL_FRAMES - 1);
			drawFrame(frame);

			lastScrollTime = Date.now();
		};

		// Blur decay when scrolling stops
		const startBlurDecay = () => {
			if (blurDecayInterval) clearInterval(blurDecayInterval);

			blurDecayInterval = setInterval(() => {
				const timeSinceLastScroll = Date.now() - lastScrollTime;
				if (timeSinceLastScroll > 100) {
					// Gradually reduce blur when not scrolling
					setMotionBlur((prev) => Math.max(0, prev * 0.9));
				}
			}, 16);
		};

		handleScroll();
		startBlurDecay();
		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
			if (blurDecayInterval) clearInterval(blurDecayInterval);
		};
	}, [videoEnded, imagesLoaded, drawFrame]);

	const isLoading = !videoReady || !imagesLoaded;

	/*
	 * Progress timeline (500vh container):
	 * 0.00 - 0.20: Hero visible
	 * 0.20 - 0.25: Hero fades out (frame animation completes at 0.25)
	 * 0.25 - 0.35: "WHY 11+?" fades in with zoom
	 * 0.35 - 0.95: "WHY 11+?" stationary, answers animate through
	 *   - Answer 1: 0.40 - 0.55 (left side)
	 *   - Answer 2: 0.50 - 0.65 (right side)
	 *   - Answer 3: 0.60 - 0.75 (left side)
	 *   - Answer 4: 0.70 - 0.85 (right side)
	 * 0.90 - 1.00: "WHY 11+?" fades out
	 */

	return (
		<div ref={containerRef} className="relative h-[500vh]">
			{/* Background layers */}
			<div className="fixed inset-0 -z-10">
				<canvas
					ref={canvasRef}
					className="absolute inset-0 w-full h-full bg-black transition-all duration-75"
					style={{
						opacity: imagesLoaded ? 1 : 0,
						filter: motionBlur > 0 ? `blur(${motionBlur}px)` : "none",
					}}
				/>

				<video
					ref={videoRef}
					className="absolute inset-0 w-full h-full object-cover"
					style={{
						opacity: videoReady && !videoEnded ? 1 : 0,
						transition: "opacity 0.15s",
					}}
					src="/hero_video.mp4"
					muted
					playsInline
					preload="auto"
				/>
			</div>

			{/* Loading */}
			{isLoading && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
					<div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
				</div>
			)}

			{/* Hero Content */}
			<div className="sticky top-0 h-screen flex items-center justify-center">
				<Animate
					progress={progress}
					start={0.18}
					end={0.25}
					from={{ opacity: 1, blur: 0 }}
					to={{ opacity: 0, blur: 5 }}
					className="w-full"
				>
					{heroContent}
				</Animate>
			</div>

			{/* Second Section - WHY 11+? with animated answers */}
			<div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
				{/* WHY 11+? - fades in, stays, then fades out */}
				<Animate
					progress={progress}
					start={0.25}
					end={0.35}
					from={{ opacity: 0, scale: 0.5, blur: 10 }}
					to={{ opacity: 1, scale: 1, blur: 0 }}
				>
					<Animate
						progress={progress}
						start={0.9}
						end={1}
						from={{ opacity: 1, blur: 0 }}
						to={{ opacity: 0, blur: 5 }}
						className="relative flex items-center justify-center w-screen"
					>
						{/* Main question text */}
						{questionText}

						{/* Animated answers */}
						{answers.length > 0 && (
							<AnswerItem progress={progress} startProgress={0.4} isLeft={true}>
								<p className="text-sm md:text-lg text-white/90">{answers[0]}</p>
							</AnswerItem>
						)}
						{answers.length > 1 && (
							<AnswerItem progress={progress} startProgress={0.5} isLeft={false}>
								<p className="text-sm md:text-lg text-white/90">{answers[1]}</p>
							</AnswerItem>
						)}
						{answers.length > 2 && (
							<AnswerItem progress={progress} startProgress={0.6} isLeft={true}>
								<p className="text-sm md:text-lg text-white/90">{answers[2]}</p>
							</AnswerItem>
						)}
						{answers.length > 3 && (
							<AnswerItem progress={progress} startProgress={0.7} isLeft={false}>
								<p className="text-sm md:text-lg text-white/90">{answers[3]}</p>
							</AnswerItem>
						)}
					</Animate>
				</Animate>
			</div>
		</div>
	);
}
