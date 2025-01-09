import CreativeServicesSection from "./components/creative-services-section";
import ScopeManSection from "./components/scope-man-section";

import Branding from "./components/Branding";
import ContentDevelopment from "./components/ContentDevelopment";
import DigitalMarketing from "./components/DigitalMarketing";
import DigitalDesign from "./components/DigitalDesign";
import UiuxDesign from "./components/UiuxDesign";
import MotionGraphics from "./components/MotionGraphics";

export default function Home() {
	return (
		<>
			<CreativeServicesSection />
			<ScopeManSection />
			<Branding />
			<DigitalDesign />
			<DigitalMarketing />
			<UiuxDesign />
			<MotionGraphics />
			<ContentDevelopment />
		</>
	);
}
