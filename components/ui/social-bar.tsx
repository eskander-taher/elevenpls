"use client";

import { useState, useEffect, useCallback, useId } from "react";
import {
	FaInstagram,
	FaTwitter,
	FaLinkedin,
	FaYoutube,
	FaFacebook,
	FaStore,
	FaWhatsapp,
	FaArrowUp,
	FaHome,
} from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";

interface SocialLink {
	id: string;
	icon: React.ReactNode;
	href: string;
	label: string;
}

interface SocialBarProps {
	socialLinks?: SocialLink[];
}

// Default social media links - can be customized via props
const defaultSocialLinks: SocialLink[] = [
	{
		id: "instagram",
		icon: <FaInstagram />,
		href: "https://instagram.com",
		label: "Instagram",
	},
	{
		id: "twitter",
		icon: <FaTwitter />,
		href: "https://twitter.com",
		label: "Twitter",
	},
	{
		id: "linkedin",
		icon: <FaLinkedin />,
		href: "https://linkedin.com",
		label: "LinkedIn",
	},
	{
		id: "youtube",
		icon: <FaYoutube />,
		href: "https://youtube.com",
		label: "YouTube",
	},
	{
		id: "facebook",
		icon: <FaFacebook />,
		href: "https://facebook.com",
		label: "Facebook",
	},
];

export function SocialBar({ socialLinks = defaultSocialLinks }: SocialBarProps) {
	const [scrollProgress, setScrollProgress] = useState(0);
	const gradientId = useId();

	// Throttled scroll handler for performance
	const handleScroll = useCallback(() => {
		const currentScrollY = window.scrollY;
		const windowHeight = window.innerHeight;
		const documentHeight = document.documentElement.scrollHeight;
		const maxScroll = documentHeight - windowHeight;

		// Calculate scroll progress (0 to 100)
		const progress = maxScroll > 0 ? (currentScrollY / maxScroll) * 100 : 0;
		setScrollProgress(Math.min(100, Math.max(0, progress)));
	}, []);

	useEffect(() => {
		// Throttle scroll events for performance
		let ticking = false;
		const onScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					handleScroll();
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [handleScroll]);

	const scrollToTop = useCallback(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	return (
		<AnimatePresence>
			<motion.div
				initial={{ x: 100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: 100, opacity: 0 }}
				transition={{
					type: "spring",
					stiffness: 300,
					damping: 30,
				}}
				className="fixed right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-0"
			>
				{/* Social Media Icons */}
				<div className="flex flex-col gap-0">
					<a
						href="/store"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Store"
						className="relative inline-flex items-center text-white/80 hover:text-white transition-colors duration-300 group"
					>
						<span className="w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
							<span className="text-lg">
								<FaStore />
							</span>
						</span>
						<span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap px-3 py-1 text-sm font-medium text-white/90 opacity-0 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
							Store
						</span>
					</a>
					{socialLinks.map((link) => (
						<a
							key={link.id}
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={link.label}
							className="w-12 h-12 -mt-2 flex items-center justify-center rounded-full text-white/70 hover:text-white transition-all duration-300 hover:scale-110"
						>
							<span className="text-lg">{link.icon}</span>
						</a>
					))}
					<a
						href="https://wa.me/966502276773"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="WhatsApp"
						className="w-14 h-14 -mt-2 flex items-center justify-center rounded-full text-green-500 hover:text-green-400 transition-all duration-300 hover:scale-110"
					>
						<span className="text-3xl leading-none">
							<FaWhatsapp />
						</span>
					</a>
				</div>

				<div
					className="mt-2 mb-10 text-sm font-bold tracking-[0.25em] text-white/70 select-none"
					style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
				>
					Contact us
				</div>

				{/* Scroll Progress Indicator */}
				<div className="flex flex-col items-center group">
					<div className="mb-2 text-white/70 group-hover:text-white transition-colors duration-300">
						<FaHome className="text-lg" aria-hidden="true" />
					</div>
					<button
						onClick={scrollToTop}
						aria-label="Scroll to top"
						className="relative w-12 h-12 flex items-center justify-center rounded-full text-white/70 hover:text-white transition-all duration-300 hover:scale-110 group cursor-pointer"
					>
						{/* Circular Progress SVG */}
						<svg
							className="absolute inset-0 w-full h-full -rotate-90"
							viewBox="0 0 48 48"
							aria-hidden="true"
						>
							{/* Background circle */}
							<circle
								cx="24"
								cy="24"
								r="20"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeOpacity="0.1"
							/>
							{/* Progress circle */}
							<circle
								cx="24"
								cy="24"
								r="20"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeDasharray={`${2 * Math.PI * 20}`}
								strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`}
								strokeLinecap="round"
								className="transition-all duration-150 ease-out"
								style={{
									stroke: `url(#${gradientId})`,
								}}
							/>
							{/* Gradient definition */}
							<defs>
								<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" stopColor="#ffffff" />
									<stop offset="50%" stopColor="#ff69b4" />
									<stop offset="100%" stopColor="#ff1493" />
								</linearGradient>
							</defs>
						</svg>
						{/* Up Arrow Icon */}
						<FaArrowUp className="relative z-10 text-sm group-hover:translate-y-[-2px] transition-transform duration-300" />
					</button>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
