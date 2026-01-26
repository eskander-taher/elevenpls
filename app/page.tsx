"use client";

import { useEffect } from "react";
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

function Header() {
	return (
		<ScrollHeader>
			{/* Logo */}
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
			{/* Right side: CTA + Hamburger */}
			<div className="flex items-center gap-4">
				<div className="cta-button hidden sm:flex" role="button" tabIndex={0}>
					<span>Start your success</span>
				</div>
				<button className="p-2 text-pink-400 hover:text-pink-300 transition-colors">
					<HiMenuAlt3 className="w-7 h-7" />
				</button>
			</div>
		</ScrollHeader>
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

	return (
		<main>
			<Header />
			<SocialBar />
			<HeroScrollSection questionText={<QuestionText />} answers={answers} />
			<ServicesSection services={services} />
			<CometCardStack cards={cards} />
			<PartnersSection />
			<FooterSection />
		</main>
	);
}
