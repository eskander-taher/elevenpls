"use client";

import { useState, useEffect, useCallback, useId } from "react";
import {
	FaInstagram,
	FaTwitter,
	FaLinkedin,
	FaYoutube,
	FaFacebook,
	FaArrowUp,
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
	const [isVisible, setIsVisible] = useState(true);
	const [scrollProgress, setScrollProgress] = useState(0);
	const [lastScrollY, setLastScrollY] = useState(0);
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

		// Determine scroll direction
		const scrollingUp = currentScrollY < lastScrollY;
		const scrollDifference = Math.abs(currentScrollY - lastScrollY);

		// Show/hide bar based on scroll direction and position
		// Always show at the top
		if (currentScrollY < 100) {
			setIsVisible(true);
		} else if (scrollDifference > 5) {
			// Only toggle visibility if scroll difference is significant (reduces jitter)
			setIsVisible(scrollingUp);
		}

		setLastScrollY(currentScrollY);
	}, [lastScrollY]);

	useEffect(() => {
		// Initial scroll position
		setLastScrollY(window.scrollY);

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
			{isVisible && (
				<motion.div
					initial={{ x: -100, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: -100, opacity: 0 }}
					transition={{
						type: "spring",
						stiffness: 300,
						damping: 30,
					}}
					className="fixed left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-4"
				>
					{/* Social Media Icons */}
					<div className="flex flex-col gap-3">
						{socialLinks.map((link) => (
							<a
								key={link.id}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={link.label}
								className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
							>
								<span className="text-lg">{link.icon}</span>
							</a>
						))}
					</div>

					{/* Divider */}
					<div className="w-px h-8 bg-white/10" />

					{/* Scroll Progress Indicator */}
					<button
						onClick={scrollToTop}
						aria-label="Scroll to top"
						className="relative w-12 h-12 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110 group"
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
				</motion.div>
			)}
		</AnimatePresence>
	);
}
