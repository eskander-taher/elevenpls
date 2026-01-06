"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export interface ServiceItem {
	id: string;
	title: string;
	description?: string;
	image: string;
}

interface ServicesSectionProps {
	services: ServiceItem[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [isPaused, setIsPaused] = useState<boolean>(false);
	const [progress, setProgress] = useState<number>(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const progressRef = useRef<NodeJS.Timeout | null>(null);
	const startTimeRef = useRef<number>(Date.now());
	const elapsedTimeRef = useRef<number>(0);
	const lastActiveIndexRef = useRef<number>(-1);

	// Progress bar animation - always runs when column is open
	useEffect(() => {
		// Reset progress when column changes
		if (activeIndex !== lastActiveIndexRef.current) {
			setProgress(0);
			elapsedTimeRef.current = 0;
			startTimeRef.current = Date.now();
			lastActiveIndexRef.current = activeIndex;
		}

		// Always run progress bar when a column is active (regardless of isPaused)
		// Update progress every 16ms (60fps)
		progressRef.current = setInterval(() => {
			const elapsed = Date.now() - startTimeRef.current;
			const newProgress = Math.min((elapsed / 10000) * 100, 100);
			setProgress(newProgress);
		}, 16);

		return () => {
			if (progressRef.current) {
				clearInterval(progressRef.current);
			}
		};
	}, [activeIndex]);

	// Auto-expand columns one by one
	useEffect(() => {
		if (isPaused) {
			// Clear interval when paused
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
			return;
		}

		// Auto-expand columns one by one
		intervalRef.current = setInterval(() => {
			setActiveIndex((prevIndex) => {
				const nextIndex = (prevIndex + 1) % services.length;
				return nextIndex;
			});
		}, 10000); // 10 seconds per column

		// Cleanup on unmount
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [isPaused, services.length]);

	const handleClick = (index: number) => {
		// Don't do anything if it's the same column
		if (activeIndex === index) {
			return;
		}

		// Pause auto-expand and switch to clicked column
		setIsPaused(true);
		setActiveIndex(index);
		// Reset progress when manually switching
		setProgress(0);
		elapsedTimeRef.current = 0;
		startTimeRef.current = Date.now();
		lastActiveIndexRef.current = index;

		// Resume auto-expand after 10 seconds
		setTimeout(() => {
			setIsPaused(false);
		}, 10000);
	};

	return (
		<section className="h-screen w-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 py-8">
			{/* Section Title */}
			<div className="w-full max-w-7xl mb-8 md:mb-12 text-left">
				<h2 className="text-sm md:text-base font-normal text-white/80 mb-2">our</h2>
				<h2
					className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent"
					style={{
						backgroundImage:
							"linear-gradient(to right, white 5%, #ff69b4 15%, #ff1493 100%)",
					}}
				>
					Creative Services
				</h2>
			</div>

			<div className="h-[70vh] w-full max-w-7xl">
				<div className="h-full w-full flex gap-3 md:gap-4">
					{services.map((service, index) => {
						const isActive = activeIndex === index;
						const flexClass = isActive ? "flex-[6]" : "flex-[0.7]";

						return (
							<div
								key={service.id}
								className={`${flexClass} h-full relative transition-all duration-500 ease-in-out cursor-pointer group overflow-hidden rounded-xl md:rounded-2xl`}
								onClick={() => handleClick(index)}
							>
								{/* Background Image */}
								<div className="absolute inset-0 w-full h-full">
									<Image
										src={service.image}
										alt={service.title}
										fill
										className={`object-cover transition-all duration-500 group-hover:scale-110 ${
											isActive ? "opacity-100 blur-0" : "opacity-30 blur-md"
										}`}
										priority={index < 2}
									/>
									{/* Overlay gradient - dark blue to match theme */}
									<div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-900/40 to-transparent" />
								</div>

								{/* Progress Bar */}
								{isActive && (
									<div className="absolute top-0 left-0 right-0 h-1 bg-blue-950/30 z-20">
										<div
											className="h-full bg-gradient-to-r from-white to-pink-400 transition-all duration-75 ease-linear"
											style={{ width: `${progress}%` }}
										/>
									</div>
								)}

								{/* Content */}
								<div
									className={`absolute inset-0 flex text-white z-10 transition-all duration-500 ${
										isActive
											? "flex-col justify-end p-8"
											: "items-center justify-center"
									}`}
								>
									{/* Title - rotates when inactive */}
									<div
										className={`transition-all duration-500 ${
											isActive
												? "relative w-full"
												: "absolute inset-0 flex items-center justify-center"
										}`}
									>
										<h3
											className={`font-bold transition-all duration-500 whitespace-nowrap will-change-transform bg-clip-text text-transparent ${
												isActive
													? "text-3xl md:text-4xl mb-2 rotate-0"
													: "text-3xl md:text-4xl -rotate-90 origin-center"
											}`}
											style={{
												backgroundImage:
													"linear-gradient(to right, white 5%, #ff69b4 15%, #ff1493 100%)",
											}}
										>
											{service.title}
										</h3>
									</div>

									{/* Description - fade in/out with delays */}
									{service.description && (
										<div
											className={`transition-all ${
												isActive
													? "duration-500 opacity-100 translate-y-0 delay-300"
													: "duration-200 opacity-0 translate-y-4 delay-0"
											}`}
										>
											<p className="text-lg opacity-90 max-w-md">
												{service.description}
											</p>
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
