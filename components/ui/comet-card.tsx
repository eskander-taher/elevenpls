"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "motion/react";
import { cn } from "@/lib/utils";

export const CometCard = ({
	rotateDepth = 17.5,
	translateDepth = 20,
	initialRotateY = -15,
	initialRotateX = -10,
	initialRotateZ = 2,
	className,
	children,
}: {
	rotateDepth?: number;
	translateDepth?: number;
	initialRotateY?: number;
	initialRotateX?: number;
	initialRotateZ?: number;
	className?: string;
	children: React.ReactNode;
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [isHovered, setIsHovered] = useState(false);

	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const mouseXSpring = useSpring(x);
	const mouseYSpring = useSpring(y);

	const rotateX = useTransform(
		mouseYSpring,
		[-0.5, 0.5],
		[initialRotateX - rotateDepth, initialRotateX + rotateDepth]
	);
	const rotateY = useTransform(
		mouseXSpring,
		[-0.5, 0.5],
		[initialRotateY + rotateDepth, initialRotateY - rotateDepth]
	);

	const translateX = useTransform(
		mouseXSpring,
		[-0.5, 0.5],
		[`-${translateDepth}px`, `${translateDepth}px`]
	);
	const translateY = useTransform(
		mouseYSpring,
		[-0.5, 0.5],
		[`${translateDepth}px`, `-${translateDepth}px`]
	);

	const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
	const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

	const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.75) 20%, rgba(255, 255, 255, 0) 80%)`;

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!ref.current) return;

		const rect = ref.current.getBoundingClientRect();

		const width = rect.width;
		const height = rect.height;

		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;

		const xPct = mouseX / width - 0.5;
		const yPct = mouseY / height - 0.5;

		x.set(xPct);
		y.set(yPct);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
		setIsHovered(false);
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	return (
		<div className={cn("perspective-distant transform-3d", className)}>
			{/* Wrapper with transforms - moves the entire card + border together */}
			<motion.div
				ref={ref}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				onMouseEnter={handleMouseEnter}
				style={{
					rotateX,
					rotateY,
					rotateZ: initialRotateZ,
					translateX,
					translateY,
				}}
				initial={{ scale: 1, z: 0 }}
				whileHover={{
					scale: 1.05,
					z: 50,
					transition: { duration: 0.2 },
				}}
			>
				{/* Rotating glow border wrapper */}
				<div className="relative p-[2px] rounded-2xl overflow-hidden">
					{/* Rotating gradient background */}
					<div 
						className={cn(
							"absolute inset-[-50%] transition-opacity duration-300",
							isHovered ? "opacity-100 animate-border-spin" : "opacity-0"
						)}
						style={{
							background: "conic-gradient(from 0deg, transparent 0%, transparent 15%, white 17%, #ff69b4 20%, #ff1493 30%, white 33%, transparent 35%, transparent 65%, white 67%, #ff69b4 70%, #ff1493 80%, white 83%, transparent 85%, transparent 100%)",
						}}
					/>
					{/* Card content */}
					<div className="relative rounded-2xl">
						{children}
						<motion.div
							className="pointer-events-none absolute inset-0 z-50 h-full w-full rounded-[16px] mix-blend-overlay"
							style={{
								background: glareBackground,
								opacity: 0.6,
							}}
							transition={{ duration: 0.2 }}
						/>
					</div>
				</div>
			</motion.div>
		</div>
	);
};
