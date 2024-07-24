import { ClerkProvider } from "@clerk/nextjs";

import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "./globals.css";

import { dark } from "@clerk/themes";
const inter = Cabin({ subsets: ["latin"] });

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
				<body className={inter.className}>{children}</body>
			</ClerkProvider>
		</html>
	);
}
