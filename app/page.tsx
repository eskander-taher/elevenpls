"use client";

import { useEffect, useMemo, useState } from "react";
import { CometCardStack, type CardItem } from "@/components/ui/comet-card-stack";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoColorPaletteOutline } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";
import { TbChartAreaLine } from "react-icons/tb";
import { HiOutlineLightBulb } from "react-icons/hi";
import { HiMenuAlt3 } from "react-icons/hi";
import { HeroScrollSection } from "@/components/ui/hero-scroll-section";
import { ScrollHeader } from "@/components/ui/scroll-header";
import { ServicesSection } from "@/components/ui/services-section";
import { PartnersSection } from "@/components/ui/partners-section";
import { SocialBar } from "@/components/ui/social-bar";
import { FooterSection } from "@/components/ui/footer-section";
import Image from "next/image";

const cards: CardItem[] = [
	{
		id: "01",
		label: ["Understanding", "& Analysis"],
		description:
			"We begin by deeply understanding your brand, goals, and challenges. Through market research, data analysis, and audience insights, we identify opportunities, risks, and the real problems that need to be solved before any creative or technical work begins.",
		icon: <HiOutlineLightBulb />,
	},
	{
		id: "02",
		label: ["Strategy", "Development"],
		description:
			"Based on insights and data, we design a clear and actionable strategy. This stage defines positioning, priorities, and success metrics, ensuring every decision is aligned with your business objectives and long-term growth.",
		icon: <BsGraphUpArrow />,
	},
	{
		id: "03",
		label: ["Creative", "Implementation"],
		description:
			"Strategy is transformed into reality through design, content, and technology. We create visuals, experiences, and solutions that communicate your message clearly while maintaining consistency, quality, and impact across all platforms.",
		icon: <IoColorPaletteOutline />,
	},
	{
		id: "04",
		label: ["Interaction", "& Improvement"],
		description:
			"We observe how users interact with the product or campaign and continuously refine the experience. Through feedback, testing, and performance monitoring, we improve usability, engagement, and overall effectiveness.",
		icon: <FiRefreshCw />,
	},
	{
		id: "05",
		label: ["Evaluation", "& Development"],
		description:
			"We measure results against defined goals, analyze performance data, and extract meaningful insights. These findings guide future improvements, helping your brand evolve, scale, and remain competitive over time.",
		icon: <TbChartAreaLine />,
	},
];


const answers = [
	"We craft digital experiences",
	"Strategy-driven design",
	"Innovation meets creativity",
	"Results that speak numbers",
];

const services = [
	{
		id: "01",
		title: "Branding",
		description: "Brand strategy & analysis, brand story & goals, targeted audience and market, logo concept & design, brand identity, administrative and official documents, digital templates and promotional prints, brand business profile",
		image: "/frames/Frame_0001.jpeg",
	},
	{
		id: "02",
		title: "Marketing Consultations",
		description: "We provide a comprehensive analysis of the market, competitors, and customers, grounded in accurate data and realistic understandings of your brand, position and dynamics within the market.",
		image: "/frames/Frame_0002.jpeg",
	},
	{
		id: "03",
		title: "Digital Marketing",
		description: "Marketing strategies and plans, social media management, graphic design & Reels, motion graphic 2D & 3D, infographics, ads management SMM, SEO & SEM, marketing campaigns & media buying, periodic reporting",
		image: "/frames/Frame_0003.jpeg",
	},
	{
		id: "04",
		title: "Content Creation",
		description: "Writing creative content, visual content, audio content, interactive content, trending content, static visual content",
		image: "/frames/Frame_0004.jpeg",
	},
	{
		id: "05",
		title: "Technology Solutions",
		description: "Website development, application development, front-end, back-end, UI/UX, automation",
		image: "/frames/Frame_0005.jpeg",
	},
	{
		id: "06",
		title: "Photography",
		description: "Portrait photography, corporate photography, food photography, product photography, architectural photography, events coverage",
		image: "/frames/Frame_0006.jpeg",
	},
	{
		id: "07",
		title: "Video Production",
		description: "Commercial & TV video production, film production, documentaries, events media coverage, video editing, sound record & sound design, motion graphic 2D & 3D, animation",
		image: "/frames/Frame_0007.jpeg",
	},
];

function Header({
	onMenuOpen,
	menuOpen,
}: {
	onMenuOpen: () => void;
	menuOpen: boolean;
}) {
	return (
		<ScrollHeader>
			<div className="flex items-center">
				<Image
					src="/logo.svg"
					alt="11+ Logo"
					width={80}
					height={40}
					className="h-8 w-auto md:h-10"
					priority
				/>
			</div>
			<div className="flex items-center gap-4">
				<div id="b" className="cta-button hidden sm:flex" role="button" tabIndex={0}>
					<span className="cta-primary">Start your success</span>
					<span className="cta-secondary" aria-hidden="true">
						<span>Talk with Ali, Sales of 11+</span>
					</span>
				</div>
				<button
					className="p-2 text-pink-400 hover:text-pink-300 transition-colors"
					type="button"
					aria-label="Open menu"
					aria-controls="site-menu"
					aria-expanded={menuOpen}
					onClick={onMenuOpen}
				>
					<HiMenuAlt3 className="w-7 h-7" />
				</button>
			</div>
		</ScrollHeader>
	);
}

function NavOverlay({
	isOpen,
	onClose,
	onNavigate,
	items,
}: {
	isOpen: boolean;
	onClose: () => void;
	onNavigate: (id: string) => void;
	items: Array<{ id: string; label: string }>;
}) {
	const [shouldRender, setShouldRender] = useState(isOpen);
	const [isActive, setIsActive] = useState(isOpen);

	useEffect(() => {
		if (isOpen) {
			setShouldRender(true);
			const raf = requestAnimationFrame(() => setIsActive(true));
			return () => cancelAnimationFrame(raf);
		}

		setIsActive(false);
		const t = window.setTimeout(() => setShouldRender(false), 250);
		return () => window.clearTimeout(t);
	}, [isOpen]);

	if (!shouldRender) return null;

	return (
		<div className={`fixed inset-0 z-[60] ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}>
			<button
				type="button"
				aria-label="Close menu"
				className={`absolute inset-0 bg-black/60 transition-opacity duration-250 ${
					isActive ? "opacity-100" : "opacity-0"
				}`}
				onClick={onClose}
			/>
			<div
				id="site-menu"
				className={`absolute right-0 top-0 h-full w-full max-w-sm bg-[#06081d] p-6 flex flex-col transition-all duration-250 ease-out ${
					isActive ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
				}`}
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Image src="/logo.svg" alt="11+" width={64} height={28} className="h-7 w-auto" />
					</div>
					<button
						type="button"
						className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/80 hover:text-white hover:border-white/25 transition-colors"
						onClick={onClose}
					>
						Close
					</button>
				</div>
				<nav className="mt-10 flex-1">
					<ul className="space-y-3">
						{items.map((item) => (
							<li key={item.id}>
								<button
									type="button"
									className="inline-flex text-left rounded-xl px-4 py-3 text-xl md:text-2xl font-medium text-white/90 hover:bg-white/10 transition-colors"
									onClick={() => onNavigate(item.id)}
								>
									{item.label}
								</button>
							</li>
						))}
					</ul>
					<div className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-white/70">
						Specializing in providing the best marketing solutions, we make a difference with an innovative strategic vision that combines creativity and true partnership. We chart the path to our clients' success in a unique and innovative way, using our young and creative Saudi cadres to achieve 11+/10 high quality that exceeds our clients' expectations
					</div>
				</nav>
				<div className="pt-6 border-t border-white/10 text-sm text-white/70">
					<div>+966 50 227 6773</div>
					<div>Sales@elevenpls.com</div>
				</div>
			</div>
		</div>
	);
}

function QuestionText() {
	return (
		<h1
			className="text-6xl md:text-8xl font-bold tracking-tight bg-clip-text text-transparent py-2 text-center"
			style={{
				backgroundImage: "linear-gradient(to right, white 10%, #ff69b4 40%, #ff1493 100%)",
			}}
		>
			WHY 11+?
		</h1>
	);
}

export default function Home() {
	const [menuOpen, setMenuOpen] = useState(false);

	const navItems = useMemo(
		() => [
			{ id: "top", label: "Home" },
			{ id: "services", label: "Services" },
			{ id: "process", label: "Process" },
			{ id: "partners", label: "Partners" },
			{ id: "contact", label: "Contact" },
		],
		[]
	);

	// Scroll to top on page load/refresh
	useEffect(() => {
		window.scrollTo(0, 0);
		// Also handle browser back/forward navigation
		const handlePopState = () => {
			window.scrollTo(0, 0);
		};
		window.addEventListener("popstate", handlePopState);
		return () => window.removeEventListener("popstate", handlePopState);
	}, []);

	useEffect(() => {
		if (!menuOpen) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setMenuOpen(false);
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [menuOpen]);

	const navigateTo = (id: string) => {
		setMenuOpen(false);
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<main id="top">
			<Header menuOpen={menuOpen} onMenuOpen={() => setMenuOpen(true)} />
			<NavOverlay
				isOpen={menuOpen}
				onClose={() => setMenuOpen(false)}
				onNavigate={navigateTo}
				items={navItems}
			/>
			<SocialBar />
			<section id="hero">
				<HeroScrollSection questionText={<QuestionText />} answers={answers} />
			</section>
			<section id="services">
				<ServicesSection services={services} />
			</section>
			<section id="process">
				<CometCardStack cards={cards} />
			</section>
			<section id="partners">
				<PartnersSection />
			</section>
			<section id="contact">
				<FooterSection />
			</section>
		</main>
	);
}
