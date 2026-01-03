import { CometCardStack, type CardItem } from "@/components/ui/comet-card-stack";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoColorPaletteOutline } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";
import { TbChartAreaLine } from "react-icons/tb";
import { HiOutlineLightBulb } from "react-icons/hi";
import { HiMenuAlt3 } from "react-icons/hi";
import { FrameBackground, FrameAnimate } from "@/components/ui/frame-background";


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
			<div className="h-[150vh]">
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
						endFrame={240}
						startOpacity={1}
						endOpacity={0}
						startBlur={0}
						endBlur={5}
						className="fixed inset-0 z-40 pointer-events-none"
					>
						{/* Container for WHY 11+? and surrounding texts - all positioned relative to this */}
						<FrameAnimate
							startFrame={133}
							endFrame={150}
							startScale={0.3}
							endScale={1}
							startOpacity={0}
							endOpacity={1}
							className="fixed inset-0 flex items-center justify-center pointer-events-none"
						>
							<div className="relative">
								{/* Main WHY 11+? text */}
								<h1
									className="text-6xl md:text-8xl font-bold tracking-tight text-center bg-clip-text text-transparent py-2"
									style={{
										backgroundImage:
											"linear-gradient(to right, white 10%, #ff69b4 40%, #ff1493 100%)",
									}}
								>
									WHY 11+?
								</h1>

								{/* Text 1 - Upper Left */}
								<FrameAnimate
									startFrame={150}
									endFrame={175}
									startY={400}
									endY={0}
									startBlur={4}
									endBlur={0}
									startOpacity={0}
									endOpacity={1}
									className="absolute -top-35	 -left-30 pointer-events-none"
								>
									<p className="text-xs md:text-base text-white/90 max-w-[120px] md:max-w-[200px] leading-relaxed">
										We craft digital experiences
									</p>
								</FrameAnimate>

								{/* Text 2 - Upper Right */}
								<FrameAnimate
									startFrame={165}
									endFrame={190}
									startY={400}
									endY={0}
									startBlur={4}
									endBlur={0}
									startOpacity={0}
									endOpacity={1}
									className="absolute -top-20 -right-30  pointer-events-none text-right"
								>
									<p className="text-xs md:text-base text-white/90 max-w-[120px] md:max-w-[200px] leading-relaxed">
										Strategy-driven design
									</p>
								</FrameAnimate>

								{/* Text 3 - Lower Left */}
								<FrameAnimate
									startFrame={180}
									endFrame={205}
									startY={200}
									endY={0}
									startBlur={4}
									endBlur={0}
									startOpacity={0}
									endOpacity={1}
									className="absolute -bottom-20 -left-30 pointer-events-none"
								>
									<p className="text-xs md:text-base text-white/90 max-w-[120px] md:max-w-[200px] leading-relaxed">
										Innovation meets creativity
									</p>
								</FrameAnimate>

								{/* Text 4 - Lower Right */}
								<FrameAnimate
									startFrame={195}
									endFrame={215}
									startY={200}
									endY={0}
									startBlur={4}
									endBlur={0}
									startOpacity={0}
									endOpacity={1}
									className="absolute -bottom-20  -right-30  pointer-events-none text-right"
								>
									<p className="text-xs md:text-base text-white/90 max-w-[120px] md:max-w-[200px] leading-relaxed">
										Results that speak numbers
									</p>
								</FrameAnimate>
							</div>
						</FrameAnimate>
					</FrameAnimate>
				</FrameBackground>
			</div>
			<CometCardStack cards={cards} />
			<div className="h-screen w-full"></div>
		</main>
	);
}
