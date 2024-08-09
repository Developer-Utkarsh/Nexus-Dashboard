"use client";

import { useUser } from "@clerk/nextjs";
import Loader from "@/components/Loader";
import Dashboard from "@/components/Home";
import { useAdmin } from "../ClientLayout";

export default function Home() {
	const { user } = useUser();
	const isAdmin = useAdmin();
const theme = localStorage.getItem('theme') || "dark"

	if (isAdmin === null) {
		return (
			<div className={` ${theme==="light"? "bg-[#FAFAFA]" : "bg-[#18181B]"} h-screen w-full flex justify-center items-center`}>
		<Loader light={theme !== "dark"} large={true} />
			</div>
		);
	}


	// 	return (
	// 		<div className='z-30 bg-black flex w-full h-screen justify-center items-center text-5xl text-white'>
	// 			You are not authorized to view this page.
	// 		</div>
	// 	);
	// }

	if (isAdmin === true) {
		return (

				<Dashboard />
		);
	}
}
