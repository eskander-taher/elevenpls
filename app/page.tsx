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

const cards: CardItem[] = [
	{ id: "01", label: ["Understanding", "& Analysis"], icon: <HiOutlineLightBulb /> },
	{ id: "02", label: ["Strategy", "Development"], icon: <BsGraphUpArrow /> },
	{ id: "03", label: ["Creative", "Implementation"], icon: <IoColorPaletteOutline /> },
	{ id: "04", label: ["Interaction", "& Improvement"], icon: <FiRefreshCw /> },
	{ id: "05", label: ["Evaluation", "& Development"], icon: <TbChartAreaLine /> },
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
		title: "Web Development",
		description: "Creating modern, responsive websites that drive results",
		image: "/frames/Frame_0001.jpeg",
	},
	{
		id: "02",
		title: "Brand Design",
		description: "Building memorable brand identities that stand out",
		image: "/frames/Frame_0002.jpeg",
	},
	{
		id: "03",
		title: "Digital Marketing",
		description: "Growing your online presence with strategic campaigns",
		image: "/frames/Frame_0003.jpeg",
	},
	{
		id: "04",
		title: "UI/UX Design",
		description: "Designing intuitive user experiences that convert",
		image: "/frames/Frame_0004.jpeg",
	},
	{
		id: "05",
		title: "E-commerce",
		description: "Building powerful online stores that sell",
		image: "/frames/Frame_0005.jpeg",
	},
];

function Header() {
	return (
		<ScrollHeader>
			{/* Logo */}
			<div className="flex items-center gap-1">
				<span className="text-2xl md:text-3xl font-bold text-white">11</span>
				<span className="text-2xl md:text-3xl font-bold text-pink-400">+</span>
			</div>
			{/* Right side: CTA + Hamburger */}
			<div className="flex items-center gap-4">
				<button className="hidden sm:block px-5 py-2.5 bg-white text-black text-sm font-medium rounded-full hover:bg-pink-100 transition-colors">
					Start your success
				</button>
				<button className="p-2 text-pink-400 hover:text-pink-300 transition-colors">
					<HiMenuAlt3 className="w-7 h-7" />
				</button>
			</div>
		</ScrollHeader>
	);
}

function HeroContent() {
	return (
		<h1
			className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-center leading-tight bg-clip-text text-transparent drop-shadow-[0_2px_30px_rgba(0,0,0,0.3)] py-2"
			style={{
				backgroundImage: "linear-gradient(to right, white 10%, #ff69b4 40%, #ff1493 100%)",
			}}
		>
			CLOSER SUCCESS
		</h1>
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
	return (
		<main>
			<Header />
			<HeroScrollSection
				heroContent={<HeroContent />}
				questionText={<QuestionText />}
				answers={answers}
			/>
			<ServicesSection services={services} />
			<CometCardStack cards={cards} />
		</main>
	);
}
