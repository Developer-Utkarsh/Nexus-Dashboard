import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
	return (
		<main className=' min-h-screen bg-[#000]'>
			<div className='flex justify-between items-center px-8 py-3 w-full bg-[#0A0A0A] border-b border-gray-700 '>
				<div>
					<Image
						src={"/nexus.png"}
						alt='logo'
						width={36}
						height={36}
					/>
				</div>
				<SignedIn>
					<UserButton afterSignOutUrl='/sign-in' />
				</SignedIn>
			</div>
		</main>
	);
}
