import CreativeServices from "./components/creative-services-section";
import Image from "next/image";

export default function Home() {
	return (
		<div className="flex justify-center heroBackgroundImage">
			<div className="flex items-end">
				<Image className="hidden xl:block bottom-0 left-10" src="/06.png" width={300} height={0} alt="hand" />
				<CreativeServices />
			</div>
		</div>
	);
}
