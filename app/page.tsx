"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Loader from "@/components/Loader";
import NotAllowed from "@/components/NotAllowed";
import Dashboard from "@/components/Home";
import { devNull } from "os";

export default function Home() {
	const { user } = useUser();
	// const [loading, setLoading] = useState(true);
	// const [isAdmin, setIsAdmin] = useState(null);

	// useEffect(() => {
	// 	const checkAdminStatus = async () => {
	// 		if (user?.emailAddresses[0]?.emailAddress) {
	// 			try {
	// 				const response = await axios.post("/api/", {
	// 					email: user.emailAddresses[0].emailAddress,
	// 				});
	// 				setIsAdmin(response.data.exists);
	// 			} catch (error) {
	// 				console.error("Error checking admin status:", error);
	// 			} finally {
	// 				setLoading(false);
	// 			}
	// 		} else {
	// 			setLoading(false);
	// 		}
	// 	};

	// 	checkAdminStatus();
	// }, [user]);

	// console.log(isAdmin);

	// if (loading) {
	// 	return (
	// 		<div className='bg-black h-screen w-full flex justify-center items-center'>
	// 			<Loader className='loader-lg' />
	// 		</div>
	// 	);
	// }

	return (
		<div className='z-30 bg-black flex w-full h-screen justify-center items-center text-5xl text-white'>
			<Dashboard />
		</div>
	);
}
