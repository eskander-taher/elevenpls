import { CometCardStack, type CardItem } from "@/components/ui/comet-card-stack";
import { FrameBackground, FrameAnimate } from "@/components/ui/frame-background";
import { HiOutlineLightBulb, HiMenuAlt3 } from "react-icons/hi";
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
		<main>
			<div className="h-[200vh]">
				<FrameBackground>
					{/* Hero Section - fades out before WHY 11+? */}
					<FrameAnimate
						startFrame={95}
						endFrame={120}
						startOpacity={1}
						endOpacity={0}
						startBlur={0}
						endBlur={5}
						className="fixed inset-0 z-50"
					>
						{/* Header / Navigation - slides down */}
						<FrameAnimate
							startFrame={10}
							endFrame={25}
							startY={-60}
							endY={0}
							startOpacity={0}
							endOpacity={1}
							className="fixed top-0 left-0 right-0 z-50"
						>
							<header className="px-6 py-5 flex items-center justify-between">
								{/* Logo */}
								<div className="flex items-center gap-1">
									<span className="text-2xl md:text-3xl font-bold text-white">
										11
									</span>
									<span className="text-2xl md:text-3xl font-bold text-pink-400">
										+
									</span>
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
							</header>
						</FrameAnimate>

						{/* Hero Content - Centered */}
						<div className="fixed inset-0 flex flex-col items-center justify-center pt-16">
							{/* Big Text - fades in and scales up */}
							<FrameAnimate
								startFrame={20}
								endFrame={45}
								startScale={0.8}
								endScale={1}
								startOpacity={0}
								endOpacity={1}
								startY={30}
								endY={0}
							>
								<h1
									className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-center leading-tight bg-clip-text text-transparent drop-shadow-[0_2px_30px_rgba(0,0,0,0.3)] py-2"
									style={{
										backgroundImage:
											"linear-gradient(to right, white 10%, #ff69b4 40%, #ff1493 100%)",
									}}
								>
									CLOSER SUCCESS
								</h1>
							</FrameAnimate>
						</div>
					</FrameAnimate>

					{/* Wrapper to fade out all WHY 11+? section */}
					<FrameAnimate
						startFrame={215}
						endFrame={235}
						startOpacity={1}
						endOpacity={0}
						startBlur={0}
						endBlur={5}
						className="fixed inset-0 z-40 pointer-events-none"
					>
						{/* Fixed text that scales from small to large */}
						<FrameAnimate
							startFrame={130}
							endFrame={150}
							startScale={0.3}
							endScale={1}
							startOpacity={0}
							endOpacity={1}
							className="fixed inset-0 flex items-center justify-center pointer-events-none"
						>
							<h1
								className="text-6xl md:text-8xl font-bold tracking-tight text-center bg-clip-text text-transparent"
								style={{
									backgroundImage:
										"linear-gradient(to right, white 10%, #ff69b4 40%, #ff1493 100%)",
								}}
							>
								WHY 11+?
							</h1>
						</FrameAnimate>

						{/* Text 1 - Upper Left area */}
						<FrameAnimate
							startFrame={150}
							endFrame={175}
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
							startFrame={160}
							endFrame={185}
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
							startFrame={170}
							endFrame={200}
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
							startFrame={180}
							endFrame={210}
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
				</FrameBackground>
			</div>
			<CometCardStack cards={cards} />
			<div className="h-screen w-full"></div>
		</main>
	);
}
