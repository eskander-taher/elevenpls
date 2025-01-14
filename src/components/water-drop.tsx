"use client";
import Image from "next/image";
import anime from "animejs";
import { useEffect } from "react";

const WaterDropGrid = () => {
	return (
		<div className="relative h-screen grid place-content-center black px-8 py-12 overflow-hidden">
			<div className="max-w-2xl mx-auto p-4 flex flex-col justify-center items-center">
				<div className="flex gap-5 justify-center">
					<Image src="/logo_with_bg.png" width={100} height={100} alt="logo" className="z-10" />
					<h1 className="relative z-10 text-7xl text-white pb-6 text-center font-bold">eleven+</h1>
				</div>
				<p className="text-white max-w-lg mx-auto my-2 text-sm text-center relative z-10">
					The website is currently under maintenance. You can contact us via the email provided below.
				</p>
				<p dir="rtl" className="text-white max-w-lg mx-auto my-2 text-sm text-center relative z-10">
					الموقع تحت الصيانة في الوقت الحالي, يمكنكم التواصل عبر الايميل في الاسفل.
				</p>
				<p className="text-center rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 px-10 relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700">
					info@elevenpls.com
				</p>
			</div>
			<div className=" absolute opacity-30">
				<DotGrid />
			</div>
		</div>
	);
};

const GRID_WIDTH = 30;
const GRID_HEIGHT = 40;

const DotGrid = () => {
	const handleDotClick = (index) => {
		anime({
			targets: ".dot-point",
			scale: [
				{ value: 1.35, easing: "easeOutSine", duration: 250 },
				{ value: 1, easing: "easeInOutQuad", duration: 500 },
			],
			translateY: [
				{ value: -15, easing: "easeOutSine", duration: 250 },
				{ value: 0, easing: "easeInOutQuad", duration: 500 },
			],
			opacity: [
				{ value: 1, easing: "easeOutSine", duration: 250 },
				{ value: 0.5, easing: "easeInOutQuad", duration: 500 },
			],
			delay: anime.stagger(100, {
				grid: [GRID_WIDTH, GRID_HEIGHT],
				from: index,
			}),
		});
	};

	useEffect(() => {
		setTimeout(() => {
			const randomIndex = Math.floor(Math.random() * (GRID_WIDTH * GRID_HEIGHT));
			handleDotClick(randomIndex);
		}, 5000);
	}, []);

	const dots = [];
	let index = 0;

	for (let i = 0; i < GRID_WIDTH; i++) {
		for (let j = 0; j < GRID_HEIGHT; j++) {
			dots.push(
				<div
					className="group cursor-crosshair rounded-full p-2 transition-colors hover:bg-slate-600"
					data-index={index}
					key={`${i}-${j}`}
				>
					<div
						className="dot-point h-2 w-2 rounded-full bg-gradient-to-b from-slate-700 to-slate-400 opacity-50 group-hover:from-indigo-600 group-hover:to-white"
						data-index={index}
					/>
				</div>
			);
			index++;
		}
	}

	return (
		<div style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }} className="grid w-fit">
			{dots}
		</div>
	);
};

export default WaterDropGrid;
