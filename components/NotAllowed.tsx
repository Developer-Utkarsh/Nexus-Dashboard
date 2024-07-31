/**
 * v0 by Vercel.
 * @see https://v0.dev/t/JaCpFymNiTu
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function NotAllowed() {
	return (
		<div className='flex min-h-[100dvh] flex-col items-center justify-center bg-[#1e1e1e] px-4 py-12 text-white sm:px-6 lg:px-8 w-full'>
			<div className='mx-auto max-w-md text-center'>
				<LockIcon className='mx-auto h-12 w-12 text-[#ff6b6b]' />
				<h1 className='mt-4 text-3xl font-bold tracking-tight'>
					Oops, you don't have access
				</h1>
				<p className='mt-4 text-muted-foreground text-lg text-zinc-400'>
					You don't have permission to view the dashboard. Please contact your
					administrator for access.
				</p>
				<div className='mt-6'>
					<UserButton afterSignOutUrl='/sign-in' />
				</div>
			</div>
		</div>
	);
}

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<rect width='18' height='11' x='3' y='11' rx='2' ry='2' />
			<path d='M7 11V7a5 5 0 0 1 10 0v4' />
		</svg>
	);
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='M18 6 6 18' />
			<path d='m6 6 12 12' />
		</svg>
	);
}
