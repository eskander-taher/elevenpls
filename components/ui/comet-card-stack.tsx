"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { CometCard } from "./comet-card";

export interface CardItem {
	id: string;
	label: [string, string];
	icon: ReactNode;
}

interface CometCardStackProps {
	cards: CardItem[];
	className?: string;
	staggerDelay?: number;
}

export function CometCardStack({
	cards,
	className = "",
	staggerDelay = 0.12,
}: CometCardStackProps) {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [isInView, setIsInView] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		// Section is in view when scroll progress is between thresholds
		// 0 = section top is at viewport bottom
		// 1 = section bottom is at viewport top
		// Cards collapse when ~40% of section is still visible
		const inViewRange = latest > 0.35 && latest < 0.65;
		setIsInView(inViewRange);
	});

	// Initial check on mount
	useEffect(() => {
		const checkInitialVisibility = () => {
			if (sectionRef.current) {
				const rect = sectionRef.current.getBoundingClientRect();
				const windowHeight = window.innerHeight;
				// Match the scroll thresholds (~40% visible on each side)
				const inView = rect.top < windowHeight * 0.5 && rect.bottom > windowHeight * 0.5;
				setIsInView(inView);
			}
		};
		checkInitialVisibility();
	}, []);

	const totalCards = cards.length;

	// Responsive spacing values
	const cardSpacing = {
		mobile: 80,
		tablet: 150,
		desktop: 220,
	};

	const verticalOffset = {
		mobile: 15,
		tablet: 20,
		desktop: 30,
	};

	// Calculate center position for stacked state
	const getCenterOffset = (spacing: number, vertical: number) => ({
		centerX: ((totalCards - 1) * spacing) / 2,
		centerY: ((totalCards - 1) * vertical) / 2,
	});

	return (
		<section ref={sectionRef} className={`w-full overflow-x-auto h-screen ${className}`}>
			<div className="mx-auto px-4">
				{/* Mobile: Vertical stack */}
				<div className="flex flex-col items-center gap-6 md:hidden">
					{cards.map((card, index) => (
						<motion.div
							key={card.id}
							initial={{ opacity: 0, y: 50, scale: 0.8 }}
							animate={
								isInView
									? { opacity: 1, y: 0, scale: 1 }
									: { opacity: 0, y: 50, scale: 0.8 }
							}
							transition={{
								duration: 0.6,
								delay: isInView
									? index * staggerDelay
									: (totalCards - 1 - index) * 0.05,
								ease: [0.22, 1, 0.36, 1],
							}}
							style={{
								filter:
									hoveredIndex === null || hoveredIndex === index
										? "none"
										: "blur(2px)",
							}}
							onMouseEnter={() => setHoveredIndex(index)}
							onMouseLeave={() => setHoveredIndex(null)}
						>
							<motion.div
								animate={{
									opacity:
										hoveredIndex === null
											? 1
											: hoveredIndex === index
											? 1
											: 0.3,
								}}
								transition={{ duration: 0.3 }}
							>
								<CometCard
									initialRotateY={-15}
									initialRotateX={-10}
									initialRotateZ={2}
								>
									<CardContent
										index={index}
										label={card.label}
										icon={card.icon}
										isHovered={hoveredIndex === index}
									/>
								</CometCard>
							</motion.div>
						</motion.div>
					))}
				</div>

				{/* Tablet: Staggered horizontal layout */}
				<div
					className="relative mx-auto hidden md:block lg:hidden"
					style={{
						height: `${400 + totalCards * verticalOffset.tablet}px`,
						width: `${(totalCards - 1) * cardSpacing.tablet + 256}px`,
					}}
				>
					{(() => {
						const { centerX, centerY } = getCenterOffset(
							cardSpacing.tablet,
							verticalOffset.tablet
						);
						return cards.map((card, index) => (
							<motion.div
								key={card.id}
								className="absolute"
								initial={{
									left: centerX,
									bottom: centerY,
									opacity: 0,
									scale: 0.9,
								}}
								animate={
									isInView
										? {
												left: index * cardSpacing.tablet,
												bottom: index * verticalOffset.tablet,
												opacity: 1,
												scale: 1,
										  }
										: {
												left: centerX,
												bottom: centerY,
												opacity: 0.8,
												scale: 0.95,
										  }
								}
								transition={{
									duration: 0.7,
									delay: isInView
										? index * staggerDelay
										: (totalCards - 1 - index) * 0.05,
									ease: [0.22, 1, 0.36, 1],
								}}
								style={{
									zIndex: hoveredIndex === index ? 100 : totalCards - index,
									filter:
										hoveredIndex === null || hoveredIndex === index
											? "none"
											: "blur(2px)",
								}}
								onMouseEnter={() => setHoveredIndex(index)}
								onMouseLeave={() => setHoveredIndex(null)}
							>
								<motion.div
									animate={{
										opacity:
											hoveredIndex === null
												? 1
												: hoveredIndex === index
												? 1
												: 0.3,
									}}
									transition={{ duration: 0.3 }}
								>
									<CometCard
										initialRotateY={-25}
										initialRotateX={-15}
										initialRotateZ={3}
									>
										<CardContent
											index={index}
											label={card.label}
											icon={card.icon}
											size="tablet"
											isHovered={hoveredIndex === index}
										/>
									</CometCard>
								</motion.div>
							</motion.div>
						));
					})()}
				</div>

				{/* Desktop: Full staggered layout */}
				<div
					className="relative mx-auto hidden lg:block"
					style={{
						height: `${500 + totalCards * verticalOffset.desktop}px`,
						width: `${(totalCards - 1) * cardSpacing.desktop + 288}px`,
					}}
				>
					{(() => {
						const { centerX, centerY } = getCenterOffset(
							cardSpacing.desktop,
							verticalOffset.desktop
						);
						return cards.map((card, index) => (
							<motion.div
								key={card.id}
								className="absolute"
								initial={{
									left: centerX,
									bottom: centerY,
									opacity: 0,
									scale: 0.9,
								}}
								animate={
									isInView
										? {
												left: index * cardSpacing.desktop,
												bottom: index * verticalOffset.desktop,
												opacity: 1,
												scale: 1,
										  }
										: {
												left: centerX,
												bottom: centerY,
												opacity: 0.8,
												scale: 0.95,
										  }
								}
								transition={{
									duration: 0.7,
									delay: isInView
										? index * staggerDelay
										: (totalCards - 1 - index) * 0.05,
									ease: [0.22, 1, 0.36, 1],
								}}
								style={{
									zIndex: hoveredIndex === index ? 100 : totalCards - index,
									filter:
										hoveredIndex === null || hoveredIndex === index
											? "none"
											: "blur(2px)",
								}}
								onMouseEnter={() => setHoveredIndex(index)}
								onMouseLeave={() => setHoveredIndex(null)}
							>
								<motion.div
									animate={{
										opacity:
											hoveredIndex === null
												? 1
												: hoveredIndex === index
												? 1
												: 0.3,
									}}
									transition={{ duration: 0.3 }}
								>
									<CometCard
										initialRotateY={-20}
										initialRotateX={-12}
										initialRotateZ={2}
									>
										<CardContent
											index={index}
											label={card.label}
											icon={card.icon}
											size="desktop"
											isHovered={hoveredIndex === index}
										/>
									</CometCard>
								</motion.div>
							</motion.div>
						));
					})()}
				</div>
			</div>
		</section>
	);
}

interface CardContentProps {
	index: number;
	label: [string, string];
	icon: ReactNode;
	size?: "mobile" | "tablet" | "desktop";
	isHovered?: boolean;
}

function CardContent({ index, label, icon, size = "mobile", isHovered = false }: CardContentProps) {
	const sizeClasses = {
		mobile: "w-64 h-64",
		tablet: "w-64 h-64",
		desktop: "w-72 h-72",
	};

	return (
		<div
			className={`relative flex ${sizeClasses[size]} cursor-pointer flex-col items-stretch rounded-2xl border-0 bg-[#1a1f3d] p-3 md:p-4 overflow-hidden`}
			style={{ transformStyle: "preserve-3d" }}
		>
			{/* Card number */}
			<p className="absolute left-4 top-4 z-10 font-mono text-lg font-bold text-pink-400">
				{String(index + 1).padStart(2, "0")}
			</p>

			{/* Icon */}
			<div className="absolute inset-0 flex items-center justify-center pb-12">
				<div
					className="transition-all duration-500"
					style={{
						fontSize: size === "desktop" ? "150px" : "120px",
						opacity: isHovered ? 0.4 : 0.15,
						filter: isHovered
							? "drop-shadow(0 0 20px rgba(255, 105, 180, 0.8)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.5))"
							: "none",
						transform: isHovered ? "scale(1.1)" : "scale(1)",
						color: isHovered ? "#ff69b4" : "white",
					}}
				>
					{icon}
				</div>
			</div>

			{/* Label */}
			<div className="relative z-10 mt-auto flex shrink-0 items-end justify-end p-4 font-mono text-white">
				<div className="text-left text-sm leading-tight md:text-base">
					<div>{label[0]}</div>
					<div>{label[1]}</div>
				</div>
			</div>
		</div>
	);
}
