import { CometCardStack, type CardItem } from "@/components/ui/comet-card-stack";
import { FrameBackground, FrameAnimate } from "@/components/ui/frame-background";
import { HiOutlineLightBulb } from "react-icons/hi";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoColorPaletteOutline } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";
import { TbChartAreaLine } from "react-icons/tb";

const cards: CardItem[] = [
	{ id: "01", label: ["Understanding", "& Analysis"], icon: <HiOutlineLightBulb /> },
	{ id: "02", label: ["Strategy", "Development"], icon: <BsGraphUpArrow /> },
	{ id: "03", label: ["Creative", "Implementation"], icon: <IoColorPaletteOutline /> },
	{ id: "04", label: ["Interaction", "& Improvement"], icon: <FiRefreshCw /> },
	{ id: "05", label: ["Evaluation", "& Development"], icon: <TbChartAreaLine /> },
];

export default function Home() {
	return (
		<FrameBackground>
			{/* Wrapper to fade out all WHY 11+? section from frame 320 */}
			<FrameAnimate
				startFrame={320}
				endFrame={350}
				startOpacity={1}
				endOpacity={0}
				startBlur={0}
				endBlur={5}
				className="fixed inset-0 z-40 pointer-events-none"
			>
				{/* Fixed text that scales from small to large */}
				<FrameAnimate
					startFrame={215}
					endFrame={235}
					startScale={0.3}
					endScale={1}
					startOpacity={0}
					endOpacity={1}
					className="fixed inset-0 flex items-center justify-center pointer-events-none"
				>
					<h1 
						className="text-6xl md:text-8xl font-bold tracking-tight text-center bg-clip-text text-transparent"
						style={{
							backgroundImage: "linear-gradient(to right, white 10%, #ff69b4 40%, #ff1493 100%)"
						}}
					>
						WHY 11+?
					</h1>
				</FrameAnimate>

			{/* Text 1 - Upper Left area */}
			<FrameAnimate
				startFrame={235}
				endFrame={260}
				startY={400}
				endY={0}
				startScale={0.7}
				endScale={1}
				startBlur={8}
				endBlur={0}
				startOpacity={0}
				endOpacity={1}
				className="fixed top-[12%] left-4 md:top-[25%] md:left-[30%] pointer-events-none"
			>
				<p className="text-sm md:text-xl text-white/90 max-w-[160px] md:max-w-[280px] leading-relaxed">
					We craft digital experiences that connect brands with their audience
				</p>
			</FrameAnimate>

			{/* Text 2 - Upper Right area (slightly lower) */}
			<FrameAnimate
				startFrame={245}
				endFrame={280}
				startY={400}
				endY={0}
				startScale={0.7}
				endScale={1}
				startBlur={8}
				endBlur={0}
				startOpacity={0}
				endOpacity={1}
				className="fixed top-[12%] right-4 md:top-[30%] md:right-[30%] pointer-events-none text-right"
			>
				<p className="text-sm md:text-xl text-white/90 max-w-[160px] md:max-w-[280px] leading-relaxed">
					Strategy-driven design that elevates your brand presence
				</p>
			</FrameAnimate>

			{/* Text 3 - Lower Left area */}
			<FrameAnimate
				startFrame={255}
				endFrame={300}
				startY={400}
				endY={0}
				startScale={0.7}
				endScale={1}
				startBlur={8}
				endBlur={0}
				startOpacity={0}
				endOpacity={1}
				className="fixed bottom-[12%] left-4 md:bottom-[30%] md:left-[30%] pointer-events-none"
			>
				<p className="text-sm md:text-xl text-white/90 max-w-[160px] md:max-w-[280px] leading-relaxed">
					Innovation meets creativity in every project we deliver
				</p>
			</FrameAnimate>

			{/* Text 4 - Lower Right area (slightly higher) */}
			<FrameAnimate
				startFrame={265}
				endFrame={300}
				startY={400}
				endY={0}
				startScale={0.7}
				endScale={1}
				startBlur={8}
				endBlur={0}
				startOpacity={0}
				endOpacity={1}
				className="fixed bottom-[12%] right-4 md:bottom-[25%] md:right-[30%] pointer-events-none text-right"
			>
				<p className="text-sm md:text-xl text-white/90 max-w-[160px] md:max-w-[280px] leading-relaxed">
					Results that speak through measurable growth and impact
				</p>
			</FrameAnimate>
			</FrameAnimate>

			<main>
				<div className="w-full h-screen"></div>
				<div className="w-full h-screen"></div>
				<CometCardStack cards={cards} />
			</main>
		</FrameBackground>
	);
}
