"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface PartnerLogo {
	id: string;
	name: string;
	logo?: string; // Optional: path to logo image
}

interface PartnersSectionProps {
	partners?: PartnerLogo[];
	topPartners?: PartnerLogo[];
	bottomPartners?: PartnerLogo[];
}

// Default placeholder partners if none provided
const defaultTopPartners: PartnerLogo[] = [
	{ id: "p1-1", name: "Partner 1", logo: "/partners/1/Asset%201.svg" },
	{ id: "p1-2", name: "Partner 2", logo: "/partners/1/Asset%202.svg" },
	{ id: "p1-3", name: "Partner 3", logo: "/partners/1/Asset%203.svg" },
	{ id: "p1-4", name: "Partner 4", logo: "/partners/1/Asset%204.svg" },
	{ id: "p1-5", name: "Partner 5", logo: "/partners/1/Asset%205.svg" },
	{ id: "p1-6", name: "Partner 6", logo: "/partners/1/Asset%206.svg" },
	{ id: "p1-7", name: "Partner 7", logo: "/partners/1/Asset%207.svg" },
	{ id: "p1-8", name: "Partner 8", logo: "/partners/1/Asset%208.svg" },
	{ id: "p1-9", name: "Partner 9", logo: "/partners/1/Asset%209.svg" },
	{ id: "p1-10", name: "Partner 10", logo: "/partners/1/Asset%2010.svg" },
	{ id: "p1-11", name: "Partner 11", logo: "/partners/1/Asset%2011.svg" },
	{ id: "p1-12", name: "Partner 12", logo: "/partners/1/Asset%2012.svg" },
];

const defaultBottomPartners: PartnerLogo[] = [
	{ id: "p2-13", name: "Partner 13", logo: "/partners/2/Asset%2013.svg" },
	{ id: "p2-14", name: "Partner 14", logo: "/partners/2/Asset%2014.svg" },
	{ id: "p2-15", name: "Partner 15", logo: "/partners/2/Asset%2015.svg" },
	{ id: "p2-16", name: "Partner 16", logo: "/partners/2/Asset%2016.svg" },
	{ id: "p2-17", name: "Partner 17", logo: "/partners/2/Asset%2017.svg" },
	{ id: "p2-18", name: "Partner 18", logo: "/partners/2/Asset%2018.svg" },
	{ id: "p2-19", name: "Partner 19", logo: "/partners/2/Asset%2019.svg" },
	{ id: "p2-20", name: "Partner 20", logo: "/partners/2/Asset%2020.svg" },
	{ id: "p2-21", name: "Partner 21", logo: "/partners/2/Asset%2021.svg" },
	{ id: "p2-22", name: "Partner 22", logo: "/partners/2/Asset%2022.svg" },
	{ id: "p2-23", name: "Partner 23", logo: "/partners/2/Asset%2023.svg" },
	{ id: "p2-24", name: "Partner 24", logo: "/partners/2/Asset%2024.svg" },
];

export function PartnersSection({
	partners,
	topPartners,
	bottomPartners,
}: PartnersSectionProps) {
	const resolvedTopPartners = topPartners ?? partners ?? defaultTopPartners;
	const resolvedBottomPartners = bottomPartners ?? partners ?? defaultBottomPartners;

	// Duplicate arrays to ensure seamless scrolling (need at least 2 copies)
	const duplicatedPartners = [...resolvedTopPartners, ...resolvedTopPartners];
	// Reverse for second row to create opposite scrolling direction
	const reversedPartners = [...resolvedBottomPartners].reverse();
	const duplicatedReversedPartners = [...reversedPartners, ...reversedPartners];

	const row1Ref = useRef<HTMLDivElement>(null);
	const row2Ref = useRef<HTMLDivElement>(null);
	const animationFrameRef = useRef<number>(null);
	const position1Ref = useRef(0);
	const position2Ref = useRef(0);
	const row2WidthRef = useRef(0);
	const isRow1PausedRef = useRef(false);
	const isRow2PausedRef = useRef(false);

	useEffect(() => {
		const speed1 = 0.5; // pixels per frame for row 1 (left scroll)
		const speed2 = 0.5; // pixels per frame for row 2 (right scroll)
		let timeoutId: NodeJS.Timeout | null = null;

		const animate = () => {
			if (row1Ref.current && row2Ref.current) {
				// Get the width of one set of partners (half of total width since we duplicated)
				const row1TotalWidth = row1Ref.current.scrollWidth;
				const row2TotalWidth = row2Ref.current.scrollWidth;
				const row1Width = row1TotalWidth / 2;
				const row2Width = row2TotalWidth / 2;

				// Only proceed if widths are valid
				if (row1Width > 0 && row2Width > 0) {
					// Update positions independently based on pause state
					// Row 1: RTL (right-to-left) - starts at 0, moves negative
					if (!isRow1PausedRef.current) {
						position1Ref.current -= speed1;
					}
					// Row 2: LTR (left-to-right) - starts at -row2Width, moves towards 0
					if (!isRow2PausedRef.current) {
						position2Ref.current += speed2;
					}

					// Reset position seamlessly when we've scrolled exactly one set width
					// At this point, the duplicate content is in the exact same position,
					// making the reset invisible to the user
					// For row 1 (RTL): when position reaches -row1Width, reset to 0
					if (position1Ref.current <= -row1Width) {
						position1Ref.current = position1Ref.current + row1Width;
					}
					// For row 2 (LTR): when position reaches 0, reset to -row2Width
					if (position2Ref.current >= 0) {
						position2Ref.current = position2Ref.current - row2Width;
					}

					// Apply transforms
					row1Ref.current.style.transform = `translateX(${position1Ref.current}px)`;
					row2Ref.current.style.transform = `translateX(${position2Ref.current}px)`;
				}
			}

			animationFrameRef.current = requestAnimationFrame(animate);
		};

		// Wait for DOM to be ready and ensure widths are calculated
		const startAnimation = () => {
			if (row1Ref.current && row2Ref.current) {
				const row1Width = row1Ref.current.scrollWidth / 2;
				const row2Width = row2Ref.current.scrollWidth / 2;
				if (row1Width > 0 && row2Width > 0) {
					// Row 1: RTL - starts at 0
					position1Ref.current = 0;
					// Row 2: LTR - starts at -row2Width (content off-screen left, moves right)
					row2WidthRef.current = row2Width;
					position2Ref.current = -row2Width;
					// Apply initial transform for row 2
					if (row2Ref.current) {
						row2Ref.current.style.transform = `translateX(${position2Ref.current}px)`;
					}
					animationFrameRef.current = requestAnimationFrame(animate);
				} else {
					// Retry after a short delay if dimensions aren't ready
					timeoutId = setTimeout(startAnimation, 50);
				}
			} else {
				timeoutId = setTimeout(startAnimation, 50);
			}
		};

		// Start animation after a brief delay to ensure layout is complete
		timeoutId = setTimeout(startAnimation, 100);

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, []);

	return (
		<section className="w-full py-16 md:py-24 px-4 md:px-8 lg:px-12 overflow-hidden">
			<div className="max-w-7xl mx-auto">
				{/* Carousel Container with Gradient Masks */}
				<div className="relative">
					{/* Gradient Masks - fade edges */}
					<div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 z-10 bg-gradient-to-r from-[#06081d] via-[#06081d]/80 to-transparent pointer-events-none" />
					<div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 z-10 bg-gradient-to-l from-[#06081d] via-[#06081d]/80 to-transparent pointer-events-none" />

					{/* First Row - RTL (Right to Left) */}
					<div className="mb-8 md:mb-12 overflow-hidden">
						<div
							ref={row1Ref}
							className="flex will-change-transform"
							style={{ width: "fit-content" }}
						>
							{duplicatedPartners.map((partner, index) => (
								<LogoItem
									key={`row1-${partner.id}-${index}`}
									partner={partner}
									isLast={index === duplicatedPartners.length - 1}
									onMouseEnter={() => (isRow1PausedRef.current = true)}
									onMouseLeave={() => (isRow1PausedRef.current = false)}
								/>
							))}
						</div>
					</div>

					{/* Second Row - LTR (Left to Right) */}
					<div className="overflow-hidden">
						<div
							ref={row2Ref}
							className="flex will-change-transform"
							style={{ width: "fit-content" }}
						>
							{duplicatedReversedPartners.map((partner, index) => (
								<LogoItem
									key={`row2-${partner.id}-${index}`}
									partner={partner}
									isLast={index === duplicatedReversedPartners.length - 1}
									onMouseEnter={() => (isRow2PausedRef.current = true)}
									onMouseLeave={() => (isRow2PausedRef.current = false)}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function LogoItem({
	partner,
	isLast,
	onMouseEnter,
	onMouseLeave,
}: {
	partner: PartnerLogo;
	isLast?: boolean;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
}) {
	return (
		<div className="relative flex-shrink-0 px-4 md:px-6 lg:px-8 flex items-center justify-center">
			<div
				className="w-32 h-20 md:w-40 md:h-24 lg:w-48 lg:h-28 flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer"
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				{partner.logo ? (
					<div className="relative w-[80%] h-[70%] flex items-center justify-center">
						<Image
							src={partner.logo}
							alt={partner.name}
							fill
							className="object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
							sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
						/>
					</div>
				) : (
					<span className="text-white/40 text-xs md:text-sm font-medium">
						{partner.name}
					</span>
				)}
			</div>
			{!isLast && (
				<div
					aria-hidden="true"
					className="absolute right-0 top-1/2 -translate-y-1/2 h-10 md:h-12 lg:h-14 w-px bg-white/15"
				/>
			)}
		</div>
	);
}
