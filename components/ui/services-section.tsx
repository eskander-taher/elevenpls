"use client";

import { useState } from "react";
import Image from "next/image";

export interface ServiceItem {
	id: string;
	title: string;
	description?: string;
	image: string;
}

interface ServicesSectionProps {
	services: ServiceItem[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
	const [activeIndex, setActiveIndex] = useState<number>(0);

	return (
		<section className="h-screen w-full flex overflow-hidden">
			{services.map((service, index) => {
				const isActive = activeIndex === index;
				const width = isActive ? "w-[50%]" : "w-[10%]";

				return (
					<div
						key={service.id}
						className={`${width} h-full relative transition-all duration-500 ease-in-out cursor-pointer group overflow-hidden`}
						onMouseEnter={() => setActiveIndex(index)}
					>
						{/* Background Image */}
						<div className="absolute inset-0 w-full h-full">
							<Image
								src={service.image}
								alt={service.title}
								fill
								className="object-cover transition-transform duration-500 group-hover:scale-110"
								priority={index < 2}
							/>
							{/* Overlay gradient */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
						</div>

						{/* Content */}
						<div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-10">
							<div
								className={`transition-all duration-500 ${
									isActive
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-4"
								}`}
							>
								<h3 className="text-3xl md:text-4xl font-bold mb-2">
									{service.title}
								</h3>
								{service.description && (
									<p className="text-lg opacity-90 max-w-md">
										{service.description}
									</p>
								)}
							</div>
						</div>

						{/* Label for collapsed state */}
						{!isActive && (
							<div className="absolute inset-0 flex items-center justify-center z-10">
								<div className="transform -rotate-90 whitespace-nowrap">
									<span className="text-white text-sm font-medium">
										{service.title}
									</span>
								</div>
							</div>
						)}
					</div>
				);
			})}
		</section>
	);
}

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
	{
		id: "06",
		title: "Consulting",
		description: "Strategic guidance to accelerate your growth",
		image: "/frames/Frame_0006.jpeg",
	},
];