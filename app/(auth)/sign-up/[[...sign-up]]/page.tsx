"use client";
import React, { useState, Suspense } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { InputOTP } from "@/components/ui/input-otp";
import Loader from "@/components/Loader";
import { ChevronRight } from "lucide-react";

const LoaderWrapper = () => (
	<div className='flex justify-center items-center h-full'>
		<Loader className='loader-lg' />
	</div>
);
const fadeUpVariants = {
	hidden: { opacity: 0, y: 30, scale: 0.95 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.8,
			ease: [0.6, -0.05, 0.01, 0.99],
			staggerChildren: 0.2,
		},
	},
};

// Dynamically import SignUp.Root with SSR disabled
const DynamicSignUpRoot = dynamic(
	() => import("@clerk/elements/sign-up").then((mod) => mod.Root),
	{
		ssr: false,
		loading: () => <LoaderWrapper />,
	},
);

export default function SignUP() {
	const router = useRouter();
	const [reset, setReset] = useState(false);

	return (
		<main className='w-full min-h-screen flex overflow-y-hidden bg-black'>
			{/* Left side content */}
			<div className='relative flex-1 hidden items-center justify-center min-h-screen lg:flex'>
				{/* ... (left side content remains unchanged) ... */}
				<motion.div
					className='relative z-10 w-full max-w-lg'
					initial='hidden'
					animate='visible'
					variants={fadeUpVariants}
				>
					<Image
						src='/nexus.png'
						alt='logo'
						width={110}
						height={110}
						className='rounded-full'
					/>
					<div className='mt-10 space-y-3'>
						<motion.h3
							className='text-white text-3xl md:text-4xl lg:text-5xl font-normal font-geist tracking-tighter'
							variants={fadeUpVariants}
						>
							Conduct Meetings with Nexus
						</motion.h3>
						<motion.div
							className='h-px bg-white/20 w-[120px] mr-auto'
							variants={fadeUpVariants}
						>
							<Separator />
						</motion.div>
						<motion.p
							className='text-gray-300 text-md md:text-xl font-geist tracking-tight'
							variants={fadeUpVariants}
						>
							Create an account and get access to all features.
						</motion.p>
					</div>
				</motion.div>
				<div className='absolute inset-0 my-auto h-full'>
					<div className='absolute inset-0 opacity-15 w-full bg-transparent bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]'></div>
					<img
						className='absolute inset-x-0 -top-20 opacity-25'
						src='https://pipe.com/_next/image?url=%2Fassets%2Fimg%2Fhero-left.png&w=384&q=75'
						width={1000}
						height={1000}
						alt='background'
					/>
				</div>
			</div>

			{/* Right side content */}
			<div className='flex-1 relative flex items-center justify-center min-h-full'>
				<img
					className='absolute inset-x-0 -z-1 -top-20 opacity-75'
					src='https://pipe.com/_next/image?url=%2Fassets%2Fimg%2Fhero-left.png&w=384&q=75'
					width={1000}
					height={1000}
					alt='background'
				/>
				<div className='w-full max-w-md md:max-w-lg space-y-8 px-4 text-gray-600 sm:px-0 z-20'>
					<Suspense fallback={<LoaderWrapper />}>
						<DynamicSignUpRoot>
							<SignUp.Root>
								<SignUp.Step name='start'>
									{/* ... (start step content remains unchanged) ... */}
									<motion.div
										className='relative'
										initial='hidden'
										animate='visible'
										variants={fadeUpVariants}
									>
										<Image
											src='/nexus.png'
											alt='logo'
											width={100}
											height={100}
											className='lg:hidden rounded-full'
										/>
										<div className='mt-5 space-y-2'>
											<motion.h3
												className='text-gray-200 text-3xl font-medium tracking-tighter sm:text-4xl'
												variants={fadeUpVariants}
											>
												Sign up - Start journey
											</motion.h3>
											<motion.p
												className='text-gray-400'
												variants={fadeUpVariants}
											>
												Already have an account?{" "}
												<button
													className='font-medium text-indigo-600 hover:text-indigo-500'
													onClick={() =>
														router.push("/sign-in")
													}
												>
													Log in
												</button>
											</motion.p>
										</div>
									</motion.div>
									<motion.div
										className='mt-8 grid grid-cols-2 gap-x-3'
										initial='hidden'
										animate='visible'
										variants={fadeUpVariants}
									>
										<Clerk.Loading>
											{(isLoading) => {
												return (
													<Clerk.Connection
														name='google'
														className={`selection:group flex transform-gpu [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-white/10 items-center justify-center py-5 border rounded-lg hover:bg-transparent/50 duration-150 active:bg-transparent/50 gap-4 text-zinc-100 ${
															isLoading &&
															"opacity-60 cursor-wait"
														}`}
													>
														<svg
															className={cn(
																"w-5 h-5 group-hover:scale-125 duration-300 transition-all",
																reset
																	? "translate-y-0"
																	: "tranistion-transform",
															)}
															viewBox='0 0 48 48'
															fill='none'
															xmlns='http://www.w3.org/2000/svg'
														>
															{/* Google SVG Path */}
															<g clipPath='url(#clip0_17_40)'>
																<path
																	d='M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z'
																	fill='#4285F4'
																/>
																<path
																	d='M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z'
																	fill='#34A853'
																/>
																<path
																	d='M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z'
																	fill='#FBBC04'
																/>
																<path
																	d='M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z'
																	fill='#EA4335'
																/>
															</g>
															<defs>
																<clipPath id='clip0_17_40'>
																	<rect
																		width='48'
																		height='48'
																		fill='white'
																	/>
																</clipPath>
															</defs>
														</svg>
														<p
															className={cn(
																"group-hover:scale-125 duration-300 transition-all",
																reset
																	? "translate-y-0"
																	: "transition-transform",
															)}
														>
															{isLoading ? (
																<div className='ml-4'>
																	<Loader />
																</div>
															) : (
																`Google`
															)}
														</p>
													</Clerk.Connection>
												);
											}}
										</Clerk.Loading>
										<Clerk.Loading>
											{(isLoading) => {
												return (
													<Clerk.Connection
														name='github'
														className='group flex transform-gpu [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-white/10 items-center justify-center py-5 border rounded-lg hover:bg-transparent/50 duration-150 active:bg-transparent/50 gap-4 text-zinc-100'
													>
														<svg
															className={cn(
																"w-5 h-5 group-hover:scale-125 duration-300 transition-all text-white",
																reset
																	? "translate-y-0"
																	: "transition-transform",
															)}
															viewBox='0 0 48 48'
															fill='currentColor'
															xmlns='http://www.w3.org/2000/svg'
														>
															{/* GitHub SVG path */}
															<g clipPath='url(#clip0_910_21)'>
																<path
																	fillRule='evenodd'
																	clipRule='evenodd'
																	d='M24.0005 1C18.303 1.00296 12.7923 3.02092 8.45374 6.69305C4.11521 10.3652 1.23181 15.452 0.319089 21.044C-0.593628 26.636 0.523853 32.3684 3.47174 37.2164C6.41963 42.0643 11.0057 45.7115 16.4099 47.5059C17.6021 47.7272 18.0512 46.9883 18.0512 46.36C18.0512 45.7317 18.0273 43.91 18.0194 41.9184C11.3428 43.3608 9.93197 39.101 9.93197 39.101C8.84305 36.3349 7.26927 35.6078 7.26927 35.6078C5.09143 34.1299 7.43223 34.1576 7.43223 34.1576C9.84455 34.3275 11.1123 36.6194 11.1123 36.6194C13.2504 40.2667 16.7278 39.2116 18.0949 38.5952C18.3095 37.0501 18.9335 35.999 19.621 35.4023C14.2877 34.8017 8.68408 32.7548 8.68408 23.6108C8.65102 21.2394 9.53605 18.9461 11.156 17.2054C10.9096 16.6047 10.087 14.1785 11.3905 10.8829C11.3905 10.8829 13.4054 10.2427 17.9916 13.3289C21.9253 12.2592 26.0757 12.2592 30.0095 13.3289C34.5917 10.2427 36.6026 10.8829 36.6026 10.8829C37.9101 14.1706 37.0875 16.5968 36.8411 17.2054C38.4662 18.9464 39.353 21.2437 39.317 23.6187C39.317 32.7824 33.7015 34.8017 28.3602 35.3905C29.2186 36.1334 29.9856 37.5836 29.9856 39.8122C29.9856 43.0051 29.9578 45.5736 29.9578 46.36C29.9578 46.9962 30.391 47.7391 31.6071 47.5059C37.0119 45.7113 41.5984 42.0634 44.5462 37.2147C47.4941 32.3659 48.611 26.6326 47.6972 21.0401C46.7835 15.4476 43.8986 10.3607 39.5587 6.68921C35.2187 3.01771 29.7067 1.00108 24.0085 1H24.0005Z'
																	fill='currentColor'
																/>
																<path
																	d='M9.08887 35.264C9.03721 35.3826 8.84645 35.4181 8.69146 35.3351C8.53646 35.2522 8.42122 35.098 8.47686 34.9755C8.5325 34.853 8.71928 34.8214 8.87428 34.9044C9.02927 34.9874 9.14848 35.1455 9.08887 35.264Z'
																	fill='currentColor'
																/>
																<path
																	d='M10.0626 36.3428C9.98028 36.384 9.88612 36.3955 9.79622 36.3753C9.70632 36.3551 9.62629 36.3045 9.56979 36.2321C9.41479 36.0662 9.38298 35.837 9.50221 35.7342C9.62143 35.6315 9.83606 35.6789 9.99105 35.8449C10.146 36.0108 10.1818 36.24 10.0626 36.3428Z'
																	fill='currentColor'
																/>
																<path
																	d='M11.0085 37.714C10.8614 37.8167 10.6111 37.714 10.472 37.5085C10.4335 37.4716 10.4029 37.4274 10.382 37.3785C10.3611 37.3297 10.3503 37.2771 10.3503 37.224C10.3503 37.1709 10.3611 37.1183 10.382 37.0694C10.4029 37.0205 10.4335 36.9763 10.472 36.9395C10.619 36.8407 10.8694 36.9395 11.0085 37.141C11.1476 37.3425 11.1516 37.6112 11.0085 37.714Z'
																	fill='currentColor'
																/>
																<path
																	d='M12.2921 39.0417C12.161 39.1879 11.8947 39.1484 11.6761 38.9508C11.4575 38.7532 11.4059 38.4845 11.537 38.3423C11.6682 38.2 11.9344 38.2395 12.161 38.4331C12.3875 38.6268 12.4312 38.8994 12.2921 39.0417Z'
																	fill='currentColor'
																/>
																<path
																	d='M14.0923 39.8162C14.0327 40.0019 13.7625 40.0849 13.4922 40.0059C13.222 39.9268 13.0432 39.7055 13.0948 39.5159C13.1465 39.3262 13.4207 39.2393 13.6949 39.3262C13.9691 39.4131 14.144 39.6226 14.0923 39.8162Z'
																	fill='currentColor'
																/>
																<path
																	d='M16.0557 39.9505C16.0557 40.1442 15.8331 40.3101 15.547 40.3141C15.2608 40.318 15.0264 40.16 15.0264 39.9663C15.0264 39.7727 15.2489 39.6067 15.535 39.6028C15.8212 39.5988 16.0557 39.753 16.0557 39.9505Z'
																	fill='currentColor'
																/>
																<path
																	d='M17.8838 39.6463C17.9196 39.8399 17.7208 40.0414 17.4347 40.0888C17.1486 40.1363 16.8982 40.0217 16.8624 39.832C16.8267 39.6423 17.0333 39.4368 17.3115 39.3855C17.5897 39.3341 17.848 39.4526 17.8838 39.6463Z'
																	fill='currentColor'
																/>
															</g>
															<defs>
																<clipPath id='clip0_910_21'>
																	<rect
																		width='48'
																		height='48'
																		fill='white'
																	/>
																</clipPath>
															</defs>
														</svg>
														<p
															className={cn(
																"group-hover:scale-125 duration-300 transition-all",
																reset
																	? "translate-y-0"
																	: "transition-transform",
															)}
														>
															{isLoading ? (
																<div className='ml-4'>
																	<Loader />
																</div>
															) : (
																`Github`
															)}
														</p>
													</Clerk.Connection>
												);
											}}
										</Clerk.Loading>
									</motion.div>
									<Separator className='h-px bg-white/20 my-8' />
									<motion.div
										initial='hidden'
										animate='visible'
										variants={fadeUpVariants}
									>
										<Clerk.Loading>
											{(isLoading) => {
												return (
													<div
														className={`${
															isLoading &&
															"opacity-60 cursor-wait"
														}`}
													>
														<div className='space-y-5'>
															<div className='grid grid-cols-2 gap-2'>
																<Clerk.Field name='firstName'>
																	<label className='font-medium text-gray-100/70 font-geist'>
																		First
																		Name
																	</label>
																	<Clerk.Input
																		type='text'
																		required
																		asChild
																	>
																		<Input
																			type='text'
																			required
																			className='w-full mt-2 px-3 py-5 text-gray-100 bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg'
																		/>
																	</Clerk.Input>

																	<Clerk.FieldError className='mt-2 block text-xs text-red-600' />
																</Clerk.Field>
																<Clerk.Field name='lastName'>
																	<label className='font-medium text-gray-100/70 font-geist'>
																		Last
																		Name
																	</label>
																	<Clerk.Input
																		type='text'
																		required
																		asChild
																	>
																		<Input
																			type='text'
																			required
																			className='w-full mt-2 px-3 py-5 text-gray-100 bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg'
																		/>
																	</Clerk.Input>
																	<Clerk.FieldError className='mt-2 block text-xs text-red-600' />
																</Clerk.Field>
															</div>
															<Clerk.Field name='emailAddress'>
																<label className='font-medium text-gray-100/70 font-geist'>
																	Email
																</label>
																<Clerk.Input
																	type='email'
																	required
																	asChild
																>
																	<Input
																		type='text'
																		required
																		className='w-full mt-2 px-3 py-5 text-gray-100 bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg'
																	/>
																</Clerk.Input>
																<Clerk.FieldError className='mt-2 block text-xs text-red-600' />
															</Clerk.Field>
															<Clerk.Field name='password'>
																<label className='font-medium text-gray-100/70 font-geist'>
																	Password
																</label>
																<Clerk.Input
																	type='text'
																	required
																	asChild
																>
																	<Input
																		type='password'
																		required
																		className='w-full mt-2 px-3 py-5 text-gray-100 bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg'
																	/>
																</Clerk.Input>
																<Clerk.FieldError className='mt-2 block text-xs text-red-600' />
															</Clerk.Field>
														</div>
													</div>
												);
											}}
										</Clerk.Loading>
									</motion.div>
									<motion.div
										initial='hidden'
										animate='visible'
										variants={fadeUpVariants}
									>
										<SignUp.Action
											submit
											className='w-full mt-8 font-geist tracking-tighter text-center rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70 flex items-center justify-center gap-0'
										>
											Create account
											<Clerk.Loading>
												{(isLoading) =>
													isLoading ? (
														<div className='ml-4'>
															<Loader />
														</div>
													) : (
														<ChevronRight className='inline-flex justify-center items-center w-4 h-4 ml-2 group-hover:translate-x-1 duration-300' />
													)
												}
											</Clerk.Loading>
										</SignUp.Action>
									</motion.div>
								</SignUp.Step>

								<SignUp.Step name='verifications'>
									<SignUp.Strategy name='email_code'>
										<motion.div
											className='text-center'
											initial='hidden'
											animate='visible'
											variants={fadeUpVariants}
										>
											<Image
												src='/nexus.png'
												alt='logo'
												width={110}
												height={110}
												className='mx-auto rounded-full'
											/>
											<h1 className='mt-4 text-2xl font-bold tracking-tight text-neutral-100'>
												Verify your email
											</h1>
											<p className='mt-2 text-sm text-gray-400'>
												We've sent a verification code
												to your email. Please enter it
												below.
											</p>
										</motion.div>
										<motion.div
											className='mt-8'
											initial='hidden'
											animate='visible'
											variants={fadeUpVariants}
										>
											<Clerk.Loading>
												{(isLoading) => {
													return (
														<div
															className={`${
																isLoading &&
																"opacity-60 cursor-wait"
															}`}
														>
															<Clerk.Field name='code'>
																<Clerk.Input
																	type='otp'
																	className='flex justify-center has-[:disabled]:opacity-50'
																	autoSubmit
																	render={({
																		value,
																		status,
																	}) => {
																		return (
																			<div
																				data-status={
																					status
																				}
																				className={cn(
																					"relative flex size-16 items-center justify-center border-y border-r border-input text-2xl transition-all first:rounded-l-md first:border-l last:rounded-r-md text-white",
																					{
																						"z-10 ring-2 ring-ring ring-offset-background":
																							status ===
																								"cursor" ||
																							status ===
																								"selected",
																					},
																				)}
																			>
																				{
																					value
																				}
																				{status ===
																					"cursor" && (
																					<div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
																						<div className='animate-typing h-8 w-px bg-slate-100 duration-1000' />
																					</div>
																				)}
																			</div>
																		);
																	}}
																/>
																<Clerk.FieldError className='mt-2 block text-xs text-red-600' />
															</Clerk.Field>
														</div>
													);
												}}
											</Clerk.Loading>
										</motion.div>
										<motion.div
											initial='hidden'
											animate='visible'
											variants={fadeUpVariants}
										>
											<SignUp.Action
												submit
												className='w-full mt-8 font-geist tracking-tighter text-center rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70 flex items-center justify-center gap-0'
											>
												Verify Email
												<Clerk.Loading>
													{(isLoading) =>
														isLoading ? (
															<div className='ml-4'>
																<Loader />
															</div>
														) : (
															<ChevronRight className='inline-flex justify-center items-center w-4 h-4 ml-2 group-hover:translate-x-1 duration-300' />
														)
													}
												</Clerk.Loading>
											</SignUp.Action>
										</motion.div>
									</SignUp.Strategy>
								</SignUp.Step>
								<SignUp.Step name='continue'>
									{/* ... (continue step content remains unchanged) ... */}
									<motion.div
										className='relative'
										initial='hidden'
										animate='visible'
										variants={fadeUpVariants}
									>
										<Image
											src='/nexus.png'
											alt='logo'
											width={100}
											height={100}
											className='lg:hidden rounded-full'
										/>
										<div className='mt-5 space-y-2'>
											<motion.h3
												className='text-gray-200 text-3xl font-semibold tracking-loose sm:text-4xl'
												variants={fadeUpVariants}
											>
												Sign up - Username
											</motion.h3>
											<motion.p
												className='text-gray-400'
												variants={fadeUpVariants}
											>
												Already have an account?{" "}
												<button
													className='font-medium text-indigo-600 hover:text-indigo-500'
													onClick={() =>
														router.push("/sign-in")
													}
												>
													Log in
												</button>
											</motion.p>
										</div>
									</motion.div>
									<Separator className='h-px bg-white/20 my-8' />
									<motion.div
										className='space-y-5'
										initial='hidden'
										animate='visible'
										variants={fadeUpVariants}
									>
										<Clerk.Loading>
											{(isLoading) => {
												return (
													<div
														className={`${
															isLoading &&
															"opacity-60 cursor-wait"
														}`}
													>
														<Clerk.Field name='username'>
															<label className='font-medium text-gray-100/70 font-geist'>
																Username
															</label>
															<Clerk.Input
																type='text'
																required
																asChild
															>
																<Input
																	type='text'
																	required
																	className='w-full mt-2 px-3 py-5 text-gray-100 bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg'
																/>
															</Clerk.Input>
															<Clerk.FieldError className='mt-2 block text-xs text-red-600' />
														</Clerk.Field>
													</div>
												);
											}}
										</Clerk.Loading>
									</motion.div>
									<motion.div
										initial='hidden'
										animate='visible'
										variants={fadeUpVariants}
									>
										<SignUp.Action
											submit
											className='w-full mt-8 font-geist tracking-tighter text-center rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70 flex items-center justify-center gap-0'
										>
											Continue
											<Clerk.Loading>
												{(isLoading) =>
													isLoading ? (
														<div className='ml-4'>
															<Loader />
														</div>
													) : (
														<ChevronRight className='inline-flex justify-center items-center w-4 h-4 ml-2 group-hover:translate-x-1 duration-300' />
													)
												}
											</Clerk.Loading>
										</SignUp.Action>
									</motion.div>
								</SignUp.Step>
							</SignUp.Root>
						</DynamicSignUpRoot>
					</Suspense>
				</div>
			</div>
		</main>
	);
}
