"use client";
import { BackgroundGradientAnimation } from "@/components/ui/background";
import { LampContainer } from "@/components/ui/lamp";
import { MacbookScrollDemo } from "@/components/ui/macbook-scroll-demo";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
	return (
		<div>
			<BackgroundGradientAnimation>
				<LampContainer>
					<motion.h1
						initial={{ opacity: 0.5, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{
							delay: 0.3,
							duration: 0.8,
							ease: "easeInOut",
						}}
					>
						<Image
							src="/elevenpls.svg"
							alt="Elevenpls logo"
							width={360}
							height={38}
							priority
						/>
					</motion.h1>
				</LampContainer>
			</BackgroundGradientAnimation>
			<MacbookScrollDemo />
		</div>
	);
}
