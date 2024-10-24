import Image from "next/image";
import { BackgroundGradientAnimation } from "@/components/ui/background";

export default function Home() {
	return (
		<div>
			<BackgroundGradientAnimation className="flex flex-row min-h-96 justify-center items-center">
				<Image src="/elevenpls.svg" alt="Elevenpls logo" width={360} height={38} priority />
			</BackgroundGradientAnimation>
		</div>
	);
}
