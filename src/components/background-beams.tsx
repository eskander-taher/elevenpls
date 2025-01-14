"use client";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import Image from "next/image";

export default function BackgroundBeamsDemo() {
	return (
		<div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
			<div className="max-w-2xl mx-auto p-4 flex flex-col justify-center items-end">
                <Image src="/logo_with_bg.png" width={100} height={100} alt="logo"/>
				<h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 pb-6 to-neutral-600  text-center font-sans font-bold">
					إنضم لقائمة الإنتظار
				</h1>
				<p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
					الموقع تحت الصيانة في الوقت الحالي, يمكنكم ترك ايميلكم في الاسفل وسيتم التواصل معكم
				</p>
				<input
					type="text"
					placeholder="info@elevenpls.com"
					className=" text-center rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
				/>
			</div>
			<BackgroundBeams />
		</div>
	);
}
