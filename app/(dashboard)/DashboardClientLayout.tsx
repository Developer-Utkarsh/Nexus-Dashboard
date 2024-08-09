"use client";

import { ClerkProvider, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import NotAllowed from "@/components/NotAllowed";
import { dark } from "@clerk/themes";
import { GeistSans } from "geist/font/sans";
import "../globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

import { createContext, useContext } from "react";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

// Create a context for the admin status
const AdminContext = createContext<boolean | null>(null);

export function useAdmin() {
	return useContext(AdminContext);
}

export default function DashboardClientLayout({
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

			
				<body className={GeistSans.className}>
					<AdminCheck>{children}</AdminCheck>
				</body>
		</html>
	);
}

function AdminCheck({ children }: { children: React.ReactNode }) {
	const { user } = useUser();
	const [loading, setLoading] = useState(true);
	const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

	useEffect(() => {
		const checkAdminStatus = async () => {
			if (user?.emailAddresses[0]?.emailAddress) {
				try {
					const response = await axios.post("/api/", {
						email: user.emailAddresses[0].emailAddress,
					});
					setIsAdmin(response.data.exists);
				} catch (error) {
					console.error("Error checking admin status:", error);
				} finally {
					setLoading(false);
				}
			} else {
				setLoading(false);
			}
		};

		checkAdminStatus();
	}, [user]);

	if (loading) {
		return (
			<div className='bg-[#18181b] h-screen w-full flex justify-center items-center'>
								<Loader light={false} large={true} />

			</div>
		);
	}

	if (isAdmin === false) {
		return <NotAllowed />;
	}

	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
		<AdminContext.Provider value={isAdmin}>
		<AdminPanelLayout>
			{children}
			</AdminPanelLayout>
			</AdminContext.Provider>
		</ThemeProvider>
	);
}
