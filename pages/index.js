import Head from "next/head";
import { useState } from "react";
import { RiMenu5Fill, RiSearchLine } from "react-icons/ri";

export default function Home() {
	const [menuIsActive, setMenuIsActive] = useState(false);
	return (
		<>
			<Head>
				<title>Home - CareerFinder</title>
			</Head>
			<header className='relative px-6 py-6'>
				<div className='container flex items-center justify-between mx-auto'>
					<a href='' className='inline-block'>
						<h1 className='text-2xl font-extrabold tracking-normal text-gray-900 uppercase'>
							CareerFinder
						</h1>
					</a>
					<button className='w-14 h-14 hover:scale-110 hover:shadow-xl place-items-center grid text-3xl text-white transition-all transform bg-black rounded-full shadow-lg'>
						<RiMenu5Fill />
					</button>
				</div>

				{menuIsActive && (
					<nav className='place-items-center absolute top-0 bottom-0 left-0 right-0 grid h-screen bg-black'>
						<button
							type='button'
							className='top-5 right-10 absolute text-5xl text-white'
						>
							X
						</button>
						<ul className='space-y-10'>
							<li>
								<a
									href='#'
									className='hover:text-gray-300 hover:border-b-4 text-5xl font-semibold text-white border-gray-300'
								>
									Home
								</a>
							</li>
							<li>
								<a
									href='#'
									className='hover:text-gray-300 hover:border-b-4 text-5xl font-semibold text-white border-gray-300'
								>
									About
								</a>
							</li>
						</ul>
					</nav>
				)}
			</header>

			<main className='container px-6 pb-10'>
				<article className='my-14'>
					<h2 className='text-4xl font-bold'>Excepteur sint occaecat.</h2>
					<p className='mt-5'>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit.
						Maxime numquam accusamus doloremque eum hic impedit odit quae
						dignissimos illum iste!
					</p>
				</article>

				<section className='py-7 rounded-xl flex flex-col px-6 bg-white shadow-lg'>
					<article className='space-y-3'>
						<p className='text-sm font-bold uppercase'>Featured story</p>
						<h3 className='text-2xl font-bold'>
							John Doe - Freelance Web Developer
						</h3>
						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit.
						</p>
					</article>
					<a
						href='#'
						className='py-4 mt-5 font-medium text-center text-white bg-black rounded-lg'
					>
						Learn More
					</a>
				</section>

				<h2 className='mt-20 text-4xl font-bold'>Career finder.</h2>
				<div className='flex items-center justify-between mt-5'>
					<p className='font-bold uppercase'>Category</p>
					<button
						type='button'
						className='place-items-center grid w-10 h-10 text-xl text-white bg-black rounded-full shadow-md'
					>
						<RiSearchLine />
					</button>
				</div>
			</main>
		</>
	);
}
