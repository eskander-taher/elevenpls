	"use client";

import Image from "next/image";

export function FooterSection() {
	return (
		<footer className="w-full bg-[#0b0f23] px-4 md:px-8 lg:px-12 py-16 md:py-24 overflow-hidden">
			<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
				<div className="p-6 md:p-10 relative">
					<div className="w-[200%] h-[200%] bg-[#161628] absolute right-0 -top-22 rounded-4xl rotate-5 z-0 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"></div>
					<div className="relative z-10 mb-6">
						<div className="inline-block">
							<h3 className="text-2xl md:text-3xl font-semibold text-white">Start your success</h3>
							<div
								className="mt-3 h-px w-full"
								style={{
									backgroundImage:
										"linear-gradient(to right, white 25%, #ff69b4 50%, #ff1493 100%)",
								}}
							/>
						</div>
						<p className="mt-5 text-sm md:text-base text-white/70 leading-relaxed">
							We begin by understanding the client's vision and analyzing the market to create an effective strategy that is executed creatively and professionally, and we continue to develop performance to achieve sustainable growth for the brand
						</p>
					</div>
					<form className="space-y-4 relative z-10">
						<div>
							<label className="block text-sm text-white/80 mb-2">Name</label>
							<input
								type="text"
								name="name"
								className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-white placeholder-white/40 outline-none focus:border-pink-500/70"
								placeholder="Your name"
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm text-white/80 mb-2">Phone</label>
								<input
									type="tel"
									name="phone"
									className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-white placeholder-white/40 outline-none focus:border-pink-500/70"
									placeholder="Phone number"
								/>
							</div>
							<div>
								<label className="block text-sm text-white/80 mb-2">Email</label>
								<input
									type="email"
									name="email"
									className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-white placeholder-white/40 outline-none focus:border-pink-500/70"
									placeholder="Email address"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm text-white/80 mb-2">Message</label>
							<textarea
								name="message"
								rows={5}
								className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-white placeholder-white/40 outline-none focus:border-pink-500/70 resize-none"
								placeholder="How can we help?"
							/>
						</div>

						<div className="text-xs text-white/60 leading-relaxed">
							This site is protected by reCAPTCHA and the Google Privacy Policy Terms of Service
						</div>

						<label className="flex items-start gap-3 text-sm text-white/75">
							<input
								type="checkbox"
								name="consent"
								className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent accent-pink-500"
							/>
							<span>
								I agree that my personal information will be processed and stored by Geniusee
							</span>
						</label>

						<button
							type="submit"
							className="w-full rounded-xl bg-pink-500 text-white font-medium py-3 hover:bg-pink-400 transition-colors"
						>
							Send
						</button>
					</form>
				</div>

				<div className="p-6 md:p-10 flex flex-col">
					<h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
						<span className="block">WE PAVE THE</span>
						<span className="block">WAY FOR YOU WITH</span>
						<span className="block text-pink-400">SOLID EXPERIENCE</span>
						<span className="block">IN THE MARKET</span>
					</h3>

					<div className="mt-8 flex items-center justify-start gap-6">
						<div className="relative w-[120px] h-[40px]">
							<Image src="/logo.svg" alt="11+" fill className="object-contain" sizes="120px" />
						</div>
						<div className="relative w-[120px] h-[40px]">
							<Image src="/tech_logo.svg" alt="Tech Logo" fill className="object-contain" sizes="120px" />
						</div>
					</div>

					<p className="mt-8 text-sm md:text-base text-white/70 leading-relaxed">
						Specializing in providing the best marketing solutions, we make a difference with an innovative strategic vision that combines creativity and true partnership.
					</p>

					<div className="mt-6 text-sm md:text-base text-white/80">
						<span className="font-medium">+966 50 227 6773</span>
						<span className="mx-3 text-white/30">|</span>
						<span className="font-medium">Sales@elevenpls.com</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
