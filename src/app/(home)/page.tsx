import CreativeServices from "./components/creative-services-section";
import Image from "next/image";

export default function Home() {
	return (
		<div className="flex justify-center heroBackgroundImage">
			<div className="flex items-end overflow-hidden">
				<Image className="relative hand-float hidden xl:block -bottom-20" src="/06.png" width={300} height={0} alt="hand" />
				<CreativeServices />
			</div>
		</div>
	);
}
