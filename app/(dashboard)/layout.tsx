import type { Metadata } from "next";
import DashboardClientLayout from "./DashboardClientLayout";

export const metadata: Metadata = {
	title: "Dashboard | Nexus",
	description:
		"This is the Dashboard of Nexus this is only managed and accessible by admins only.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <DashboardClientLayout>{children}</DashboardClientLayout>;
}
