"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { CardSpotlight } from "@/components/ui/card-spotlight";

const services = [
	{
		title: "Creation & Design",
		items: ["Concept creation", "Naming", "Art direction", "Logo design", "Logo animation", "3D Product design"],
	},
	{
		title: "Brand Strategy",
		items: [
			"Brand positioning",
			"User profile",
			"Look and Feel",
			"Brand personality",
			"Tone of voice",
			"Brand story & message",
		],
	},
	{
		title: "Brand Analysis",
		items: ["Brand background", "Target markets", "Target audience", "Competitor analysis", "SWOT analysis"],
	},
	{
		title: "Implementation",
		items: ["Stationery", "Packaging", "Uniform", "Digital template"],
	},
	{
		title: "Marketing",
		items: [
			"Social media management",
			"Ads management SMM",
			"Video marketing production",
			"Influencer Engagements",
			"SEO + SEM",
			"Ads poster (Indoor, Outdoor)",
			"Marketing event stands",
			"Social media posters",
		],
	},
	{
		title: "Video & Editing",
		items: ["Video production", "Video animation", "Motion graphic"],
	},
	{
		title: "Grid & Layout",
		items: ["Book design", "Magazine design", "Company profile", "Brochure", "Typography poster", "Catalogue"],
	},
	{
		title: "UI/UX and web",
		items: ["Wireframing", "Application Design", "Website Design", "Scoring"],
	},
	{
		title: "Photography",
		items: ["Portraits", "Corporate Photography", "Food Photography", "Product Photography"],
	},
];

const CreativeServices: React.FC = () => {
	let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	return (
		<div>
			<div className="text-white p-8">
				<h1 className=" flex flex-col text-right text-4xl mb-8 ">
					<span className="mr-2 text-pink-500 font-bold">خدماتنا الإبداعية</span>
					<span className="font-thin">our Creative services</span>
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
					{services.map((service, index) => (
						<Link
							href="#"
							key={index}
							className="relative group  block p-2 h-full w-full"
							onMouseEnter={() => setHoveredIndex(index)}
							onMouseLeave={() => setHoveredIndex(null)}
						>
							<AnimatePresence>
								{hoveredIndex === index && (
									<motion.span
										className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
										layoutId="hoverBackground"
										initial={{ opacity: 0 }}
										animate={{
											opacity: 1,
											transition: { duration: 0.15 },
										}}
										exit={{
											opacity: 0,
											transition: { duration: 0.15, delay: 0.2 },
										}}
									/>
								)}
							</AnimatePresence>
							<CardSpotlight className="h-full w-96 pl-10">
								<p className="text-xl font-bold relative z-20 text-white">{service.title}</p>
								<div className="text-neutral-200 mt-4 relative z-20">
									<ul>
										{service.items.map((item, idx) => (
											<li key={idx} className="flex gap-2 items-start text-white">
												<CheckIcon /> {item}
											</li>
										))}
									</ul>
								</div>
							</CardSpotlight>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

const CheckIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="currentColor"
			className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path
				d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
				fill="currentColor"
				strokeWidth="0"
			/>
		</svg>
	);
};


export default CreativeServices;
