"use client";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import Image from "next/image";

export default function BackgroundBeamsDemo() {
	return (
		<div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
			<div className="max-w-2xl mx-auto p-4 flex flex-col justify-center items-center">
				<div className="flex gap-5 justify-center">
					<Image src="/logo_with_bg.png" width={100} height={100} alt="logo" className=" z-50"/>
					<h1 className="relative z-10 text-7xl text-white pb-6 text-center font-bold">
						eleven+
					</h1>
				</div>
				<p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
					The website is currently under maintenance. You can contact us via the email.
				</p>
				<p dir="rtl" className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
					الموقع تحت الصيانة في الوقت الحالي, يمكنكم التواصل عبر الايميل.
				</p>
				<p className="text-center rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700">
					info@elevenpls.com
				</p>
			</div>
			<BackgroundBeams />
		</div>
	);
}
