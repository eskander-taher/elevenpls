import Image from "next/image";

export default function ScopeManSection() {
	return (
		<div className="relative flex min-h-screen justify-center bg-black overflow-hidden">
			<Image  src="/02.png" layout="fill" objectPosition="bottom" objectFit="contain" alt="man" />
		</div>
	);
}
