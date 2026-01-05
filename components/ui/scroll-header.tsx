"use client";

import { useState, useEffect, useRef } from "react";

interface ScrollHeaderProps {
	children: React.ReactNode;
}

export function ScrollHeader({ children }: ScrollHeaderProps) {
	const [visible, setVisible] = useState(true);
	const lastScrollY = useRef(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			
			// Scrolling up = show, scrolling down = hide
			if (currentScrollY < lastScrollY.current) {
				setVisible(true);
			} else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
				setVisible(false);
			}
			
			lastScrollY.current = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between transition-all duration-300"
			style={{
				opacity: visible ? 1 : 0,
				transform: visible ? "translateY(0)" : "translateY(-100%)",
				pointerEvents: visible ? "auto" : "none",
			}}
		>
			{children}
		</header>
	);
}

