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
				<div className='flex items-center justify-between mx-auto'>
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

			<main className='pb-10'>
				<div className='px-6'>
					<img
						src='https://images.unsplash.com/photo-1523287562758-66c7fc58967f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
						alt='Career path'
						className='rounded-lg shadow-xl'
					/>
					<div className='md:flex-row md:my-32 md:items-start flex flex-col gap-6'>
						<article className='mb-14 md:my-0 md:w-1/2 mt-8'>
							<h2 className='text-4xl font-bold'>
								Excepteur sint occaecat.
							</h2>
							<p className='mt-5'>
								Lorem, ipsum dolor sit amet consectetur adipisicing
								elit. Maxime numquam accusamus doloremque eum hic
								impedit odit quae dignissimos illum iste!
							</p>
						</article>

						<section className='py-7 rounded-xl md:w-1/2 flex flex-col px-6 bg-white shadow-lg'>
							<article className='space-y-3'>
								<p className='text-sm font-bold uppercase'>
									Featured story
								</p>
								<h3 className='text-2xl font-bold'>
									John Doe - Freelance Web Developer
								</h3>
								<p>
									Lorem ipsum dolor, sit amet consectetur adipisicing
									elit.
								</p>
							</article>
							<a
								href='#'
								className='py-4 mt-5 font-medium text-center text-white bg-black rounded-lg'
							>
								Learn More
							</a>
						</section>
					</div>

					<h2 className='mt-16 text-4xl font-bold'>Career Finder.</h2>
					<div className='flex items-center justify-between mt-5'>
						<p className='font-bold uppercase'>Category</p>
						<button
							type='button'
							className='place-items-center grid w-10 h-10 text-xl text-white bg-black rounded-full shadow-md'
						>
							<RiSearchLine />
						</button>
					</div>
				</div>
				<form
					action=''
					className='no-scrollbar flex px-6 mt-4 overflow-x-scroll'
				>
					<input
						id='design'
						name='design'
						type='checkbox'
						className='Filter-item__input hidden'
						value='design'
					/>
					<label
						for='design'
						className='Filter-item px-5 py-2 mr-3 font-medium bg-white border-2 border-gray-300 rounded-full'
					>
						design
					</label>
					<input
						id='marketing'
						name='marketing'
						type='checkbox'
						className='Filter-item__input hidden'
						value='marketing'
					/>
					<label
						for='marketing'
						className='Filter-item px-5 py-2 mr-3 font-medium bg-white border-2 border-gray-300 rounded-full'
					>
						marketing
					</label>
					<input
						id='programming'
						name='programming'
						type='checkbox'
						className='Filter-item__input hidden'
						value='programming'
					/>
					<label
						for='programming'
						className='Filter-item px-5 py-2 mr-3 font-medium bg-white border-2 border-gray-300 rounded-full'
					>
						programming
					</label>
					<input
						id='something'
						name='something'
						type='checkbox'
						className='Filter-item__input hidden'
						value='something'
					/>
					<label
						for='something'
						className='Filter-item px-5 py-2 mr-3 font-medium bg-white border-2 border-gray-300 rounded-full'
					>
						something
					</label>
					<input
						id='design'
						name='design'
						type='checkbox'
						className='Filter-item__input hidden'
						value='design'
					/>
					<label
						for='design'
						className='Filter-item px-5 py-2 mr-3 font-medium bg-white border-2 border-gray-300 rounded-full'
					>
						design
					</label>
					<input
						id='design'
						name='design'
						type='checkbox'
						className='Filter-item__input hidden'
						value='design'
					/>
					<label
						for='design'
						className='Filter-item px-5 py-2 mr-3 font-medium bg-white border-2 border-gray-300 rounded-full'
					>
						design
					</label>
				</form>

				<section className='md:grid-cols-2 grid grid-cols-1 px-6 mt-8'>
					<a href='#' className='py-7 rounded-xl px-6 bg-white shadow-lg'>
						<h3 className='text-2xl font-bold'>Web Developer</h3>
						<div className='flex mt-4 space-x-2'>
							<span className='px-3 py-1 text-sm font-medium bg-gray-200 rounded-full'>
								design
							</span>
							<span className='px-3 py-1 text-sm font-medium bg-gray-200 rounded-full'>
								programming
							</span>
						</div>
					</a>
				</section>
			</main>
		</>
	);
}
