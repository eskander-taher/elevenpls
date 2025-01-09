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
												{item}
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


export default CreativeServices;
