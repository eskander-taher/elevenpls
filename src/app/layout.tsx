import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";


const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
	weight: ["100", "200", "300", "400", "500", "600", "700"],
	subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
	title: "elevenplus",
	description: "Your best marketing agency in Saudi Arabia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="en">
			<body className={`${ibmPlexSansArabic.className} antialiased`}>
				{children}
				<Analytics />
			</body>
		</html>
  );
}
