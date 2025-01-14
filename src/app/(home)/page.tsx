// import CreativeServicesSection from "./components/creative-services-section";
// import ScopeManSection from "./components/scope-man-section";

// import Branding from "./components/Branding";
// import ContentDevelopment from "./components/ContentDevelopment";
// import DigitalMarketing from "./components/DigitalMarketing";
// import DigitalDesign from "./components/DigitalDesign";
// import UiuxDesign from "./components/UiuxDesign";
// import MotionGraphics from "./components/MotionGraphics";

import BackgroundBeams from "@/components/background-beams";
import WaterDropGrid from "@/components/water-drop";

export default function Home() {
	return (
		<>
			{/* <ScopeManSection />
			<Branding />
			<DigitalDesign />
			<DigitalMarketing />
			<UiuxDesign />
			<MotionGraphics />
			<ContentDevelopment /> */}
			<div className=" block sm:hidden">
				<WaterDropGrid />
			</div>

			<div className=" hidden sm:block">
				<BackgroundBeams />
			</div>
			{/* <CreativeServicesSection /> */}
		</>
	);
}
