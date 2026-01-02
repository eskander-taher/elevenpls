import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pingAR = localFont({
  src: [
    {
      path: "./ui/fonts/PingAR+LT-Hairline.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./ui/fonts/PingAR+LT-Thin.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./ui/fonts/PingAR+LT-ExtraLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./ui/fonts/PingAR+LT-Light.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./ui/fonts/PingAR+LT-Regular.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./ui/fonts/PingAR+LT-Medium.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./ui/fonts/PingAR+LT-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./ui/fonts/PingAR+LT-Heavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./ui/fonts/PingAR+LT-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-ping-ar",
});

export const metadata: Metadata = {
	title: "Eleven Plus",
	description: "Your best marketing agency in Saudi Arabia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pingAR.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
