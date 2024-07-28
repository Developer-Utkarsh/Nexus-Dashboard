"use client";

import React, { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import Loader from "@/components/Loader";
import Image from "next/image";
import { motion } from "framer-motion";

const LoaderWrapper = () => (
	<div className='flex justify-center items-center h-full'>
		<Loader className='loader-lg' />
	</div>
);

const fadeUp = {
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

// Dynamically import SignIn.Root with SSR disabled
const DynamicSignInRoot = dynamic(
	() => import("@clerk/elements/sign-in").then((mod) => mod.Root),
	{
		ssr: false,
		loading: () => <LoaderWrapper />,
	},
);

export default function CombinedSignIn() {
	const router = useRouter();
	const [reset, setReset] = useState(false);

	return (
		<div className='bg-black'>
			<main
				style={{
					background:
						"linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
				}}
				className='w-full min-h-screen flex flex-col items-center justify-center sm:px-4 relative bg-black'
			>
				<div className='max-w-sm w-full text-gray-600 space-y-8'>
					<Suspense fallback={<LoaderWrapper />}>
						<DynamicSignInRoot>
							<SignIn.Root>
								<Clerk.Loading>
									{(isGlobalLoading) => (
										<>
											<SignIn.Step name='start'>
												<div className='text-left'>
													<motion.div
														initial='hidden'
														animate='visible'
														variants={fadeUp}
													>
														<Image
															src='/nexus.png'
															width={84}
															height={84}
															alt='Nexus Logo'
															className='mr-auto rounded-full'
														/>
														<div className='mt-5 space-y-2 mr-auto'>
															<motion.h3
																className='text-gray-200 text-2xl font-normal sm:text-3xl tracking-tighter font-geist'
																variants={fadeUp}
															>
																Log in to your account
															</motion.h3>
															<motion.p
																className='text-gray-400'
																variants={fadeUp}
															>
																Don't have an account?{" "}
																<button
																	className='font-medium text-pink-600 hover:text-pink-500'
																	onClick={() => router.push("/sign-up")}
																>
																	Sign up
																</button>
															</motion.p>
														</div>
													</motion.div>
												</div>
												<div className='space-y-4 mt-4'>
													<Clerk.Loading>
														{(isLoading) => {
															return (
																<motion.div
																	initial='hidden'
																	animate='visible'
																	variants={fadeUp}
																>
																	<div
																		className={`${
																			isLoading && "opacity-60 cursor-wait"
																		}`}
																	>
																		<Clerk.Field name='identifier'>
																			<label
																				className={`font-medium text-gray-200 `}
																			>
																				Email
																			</label>

																			<Clerk.Input asChild>
																				<Input
																					type='email'
																					required
																					className={`w-full mt-2 px-3 py-4 text-gray-200 bg-transparent outline-none focus:border-pink-600/50 shadow-sm rounded-lg border-white/20 border-[1px] 
                                        `}
																				/>
																			</Clerk.Input>
																			<Clerk.FieldError className='text-red-500 text-sm mt-1' />
																		</Clerk.Field>
																	</div>
																</motion.div>
															);
														}}
													</Clerk.Loading>
													<SignIn.Action submit className='w-full' asChild>
														<motion.button
															initial='hidden'
															animate='visible'
															variants={fadeUp}
															className='w-full group px-4 py-4 font-geist tracking-tighter text-xl text-white font-medium bg-purple-200/10 transform-gpu [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] hover:bg-transparent/10 active:bg-purple-600 rounded-lg duration-150 flex justify-center items-center'
															disabled={isGlobalLoading}
														>
															Sign in
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
														</motion.button>
													</SignIn.Action>
												</div>
												<motion.div
													className='relative mt-4'
													initial='hidden'
													animate='visible'
													variants={fadeUp}
												>
													<p className='inline-block w-fit text-sm bg-transparent text-gray-400 px-2 absolute -top-2 inset-x-0 mx-auto'>
														Or continue with
													</p>
												</motion.div>
												<div className='space-y-4 mt-10 text-sm text-gray-200 font-medium'>
													<Clerk.Loading>
														{(isLoading) => {
															return (
																<motion.div
																	initial='hidden'
																	animate='visible'
																	variants={fadeUp}
																>
																	<Clerk.Connection
																		name='google'
																		onMouseEnter={() => setReset(false)}
																		onMouseLeave={() => setReset(true)}
																		className={`group w-full space-x-1 py-3 flex transform-gpu [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-white/10 items-center justify-center border rounded-lg hover:bg-transparent/20 duration-150 active:bg-transparent/50 ${
																			isLoading && "opacity-60 cursor-wait"
																		}`}
																	>
																		<svg
																			className='w-5 h-5 mr-2'
																			viewBox='0 0 48 48'
																			fill='none'
																			xmlns='http://www.w3.org/2000/svg'
																		>
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
																		{isLoading ? (
																			<div className='ml-4'>
																				<Loader />
																			</div>
																		) : (
																			`Continue with Google`
																		)}
																	</Clerk.Connection>
																</motion.div>
															);
														}}
													</Clerk.Loading>
													<Clerk.Loading>
														{(isLoading) => {
															return (
																<motion.div
																	initial='hidden'
																	animate='visible'
																	variants={fadeUp}
																>
																	<Clerk.Connection
																		name='github'
																		onMouseEnter={() => setReset(false)}
																		onMouseLeave={() => setReset(true)}
																		className={`group w-full space-x-1 py-3 flex transform-gpu [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-white/10 items-center justify-center border rounded-lg hover:bg-transparent/20 duration-150 active:bg-transparent/50 ${
																			isLoading && "opacity-60 cursor-wait"
																		}`}
																	>
																		<svg
																			className='w-5 h-5 mr-2'
																			viewBox='0 0 48 48'
																			fill='currentColor'
																			xmlns='http://www.w3.org/2000/svg'
																		>
																			<g clipPath='url(#clip0_910_21)'>
																				<path
																					fillRule='evenodd'
																					clipRule='evenodd'
																					d='M24.0005 1C18.303 1.00296 12.7923 3.02092 8.45374 6.69305C4.11521 10.3652 1.23181 15.452 0.319089 21.044C-0.593628 26.636 0.523853 32.3684 3.47174 37.2164C6.41963 42.0643 11.0057 45.7115 16.4099 47.5059C17.6021 47.7272 18.0512 46.9883 18.0512 46.36C18.0512 45.7317 18.0273 43.91 18.0194 41.9184C11.3428 43.3608 9.93197 39.101 9.93197 39.101C8.84305 36.3349 7.26927 35.6078 7.26927 35.6078C5.09143 34.1299 7.43223 34.1576 7.43223 34.1576C9.84455 34.3275 11.1123 36.6194 11.1123 36.6194C13.2504 40.2667 16.7278 39.2116 18.0949 38.5952C18.3095 37.0501 18.9335 35.999 19.621 35.4023C14.2877 34.8017 8.68408 32.7548 8.68408 23.6108C8.65102 21.2394 9.53605 18.9461 11.156 17.2054C10.9096 16.6047 10.087 14.1785 11.3905 10.8829C11.3905 10.8829 13.4054 10.2427 17.9916 13.3289C21.9253 12.2592 26.0757 12.2592 30.0095 13.3289C34.5917 10.2427 36.6026 10.8829 36.6026 10.8829C37.9101 14.1706 37.0875 16.5968 36.8411 17.2054C38.4662 18.9464 39.353 21.2437 39.317 23.6187C39.317 32.7824 33.7015 34.8017 28.3602 35.3905C29.2186 36.1334 29.9856 37.5836 29.9856 39.8122C29.9856 43.0051 29.9578 45.5736 29.9578 46.36C29.9578 46.9962 30.391 47.7391 31.6071 47.5059C37.0119 45.7113 41.5984 42.0634 44.5462 37.2147C47.4941 32.3659 48.611 26.6326 47.6972 21.0401C46.7835 15.4476 43.8986 10.3607 39.5587 6.68921C35.2187 3.01771 29.7067 1.00108 24.0085 1H24.0005Z'
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
																		{isLoading ? (
																			<div className='ml-4'>
																				<Loader />
																			</div>
																		) : (
																			`Continue with Github`
																		)}
																	</Clerk.Connection>
																</motion.div>
															);
														}}
													</Clerk.Loading>
												</div>
											</SignIn.Step>

											<SignIn.Step name='verifications'>
												<SignIn.Strategy name='password'>
													<div className='text-left'>
														<motion.div
															initial='hidden'
															animate='visible'
															variants={fadeUp}
														>
															<Image
																src='/nexus.png'
																width={84}
																height={84}
																alt='Nexus Logo'
																className='mr-auto rounded-full'
															/>
															<div className='mt-5 space-y-2 mr-auto'>
																<motion.h3
																	className='text-gray-200 text-2xl font-normal sm:text-3xl tracking-tighter font-geist'
																	variants={fadeUp}
																>
																	Log in to your account
																</motion.h3>
																<motion.p
																	className='text-gray-400'
																	variants={fadeUp}
																>
																	Don't have an account?{" "}
																	<button
																		className='font-medium text-pink-600 hover:text-pink-500'
																		onClick={() => router.push("/sign-up")}
																	>
																		Sign up
																	</button>
																</motion.p>
															</div>
														</motion.div>
													</div>
													<div className='space-y-4 mt-4'>
														<motion.div
															initial='hidden'
															animate='visible'
															variants={fadeUp}
														>
															<Clerk.Field name='password'>
																<label className='font-medium text-gray-200'>
																	Password
																</label>
																<Clerk.Input asChild>
																	<Input
																		type='password'
																		required
																		className='w-full mt-2 px-3 py-4 text-gray-500 bg-transparent outline-none focus:border-pink-600/50 shadow-sm rounded-lg border-white/20 border-[1px]'
																	/>
																</Clerk.Input>
																<Clerk.FieldError className='text-red-500 text-sm mt-1' />
															</Clerk.Field>
														</motion.div>
														<SignIn.Action submit className='w-full' asChild>
															<motion.button
																initial='hidden'
																animate='visible'
																variants={fadeUp}
																className='w-full group px-4 py-4 font-geist tracking-tighter text-xl text-white font-medium bg-purple-200/10 transform-gpu [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] hover:bg-transparent/10 active:bg-purple-600 rounded-lg duration-150 flex justify-center items-center'
															>
																Sign in
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
															</motion.button>
														</SignIn.Action>
													</div>
												</SignIn.Strategy>
											</SignIn.Step>
										</>
									)}
								</Clerk.Loading>
							</SignIn.Root>
						</DynamicSignInRoot>
					</Suspense>
				</div>
			</main>
		</div>
	);
}
