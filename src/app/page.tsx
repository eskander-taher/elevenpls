import Image from "next/image";

export default function Home() {
  return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<Image
				className="dark:invert"
				src="/elevenpls.svg"
				alt="Elevenpls logo"
				width={180}
				height={38}
				priority
			/>
			<h1>Soon</h1>
		</div>
  );
}
