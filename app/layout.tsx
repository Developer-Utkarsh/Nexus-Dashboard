import { ClerkProvider } from "@clerk/nextjs";

import type { Metadata } from "next";
// import { Michroma } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";

import { dark } from "@clerk/themes";
// const inter = Michroma({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
	title: "Dashboard | Nexus",
	description:
		"This is the Dashboard of Nexus this is only mangaed and accessible by admins only.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<head>
				<link
					rel='stylesheet'
					href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css'
					integrity='sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=='
					crossOrigin='anonymous'
					referrerPolicy='no-referrer'
				/>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' />
				<link
					href='https://fonts.googleapis.com/css2?family=Michroma&display=swap'
					rel='stylesheet'
				/>
			</head>

			<ClerkProvider
				appearance={{
					layout: {
						logoImageUrl: "/nexus.png",
					},
					variables: {
						colorText: "#fff",
						colorPrimary: "#0156BD",
						colorBackground: "#0A0A0A",
					},
					baseTheme: dark,
				}}
			>
				<body className={GeistSans.className}>{children}</body>
			</ClerkProvider>
		</html>
	);
}
