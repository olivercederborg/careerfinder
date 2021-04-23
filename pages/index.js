import Head from "next/head";
import { useState } from "react";
import { RiMenu5Fill, RiSearchLine, RiShuffleFill } from "react-icons/ri";
import { BsFillLightningFill, BsArrowRightShort } from "react-icons/bs";

import { careers } from "../careers";

export default function Home() {
	const [menuIsActive, setMenuIsActive] = useState(false);
	console.log(careers);
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
					<h2 className='mt-16 text-4xl font-bold'>Career Finder.</h2>
					<button className='rounded-xl shadow-yellow inline-flex items-center justify-center w-full py-4 mt-5 mb-2 font-semibold text-white bg-yellow-500'>
						Random Career
						<RiShuffleFill className='ml-2 text-xl' />
					</button>
					<div className='flex items-center justify-between mt-5'>
						<p className='font-bold uppercase'>Category</p>
						<button
							type='button'
							className='place-items-center rounded-xl grid w-10 h-10 text-xl text-white bg-black shadow-md'
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
						htmlFor='design'
						className='Filter-item rounded-xl px-5 py-2 mr-3 font-medium bg-white border-2 border-gray-300'
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
						htmlFor='marketing'
						className='Filter-item rounded-xl px-5 py-2 mr-3 font-medium bg-white border-2 border-gray-300'
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
						htmlFor='programming'
						className='Filter-item rounded-xl px-5 py-2 mr-3 font-medium bg-white border-2 border-gray-300'
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
						htmlFor='something'
						className='Filter-item rounded-xl px-5 py-2 mr-3 font-medium bg-white border-2 border-gray-300'
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
						htmlFor='design'
						className='Filter-item rounded-xl px-5 py-2 mr-3 font-medium bg-white border-2 border-gray-300'
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
						htmlFor='design'
						className='Filter-item rounded-xl px-5 py-2 mr-3 font-medium bg-white border-2 border-gray-300'
					>
						design
					</label>
				</form>

				<section className='md:grid-cols-2 lg:grid-cols-3 grid grid-cols-1 gap-10 px-6 mt-8'>
					{careers.map((career, i) => (
						<a
							href='#'
							className='rounded-xl group hover:bg-black overflow-hidden transition-all duration-200 ease-in-out bg-white shadow-lg'
							key={i}
						>
							<img
								src={career.image}
								alt=''
								className='h-[200px] object-cover w-full group-hover:h-[146px] transition-all duration-200 ease-in-out'
							/>

							<section className='pb-7 group-hover:text-white px-6 pt-6 transition-all duration-200 ease-in-out'>
								<h3 className='inline-flex items-center text-2xl font-bold'>
									{career.name}
									{career.hot && (
										<BsFillLightningFill className='ml-2 text-2xl text-yellow-400' />
									)}
								</h3>

								<div className='flex mt-4 space-x-2'>
									<span className='px-3 py-[6px] text-sm font-medium bg-black text-white rounded-lg group-hover:bg-white group-hover:text-black transition-all duration-200 ease-in-out'>
										{career.category}
									</span>
								</div>

								<div className='grid grid-cols-2 mt-5'>
									<div className='flex flex-col'>
										<p className='text-base'>Avg. Salary</p>
										<p className='mt-1 text-lg font-bold'>
											{career.salary}
										</p>
									</div>
									<div className='flex flex-col'>
										<p className='text-base'>Time</p>
										<p className='mt-1 text-lg font-bold'>
											{career.time}
										</p>
									</div>
								</div>
							</section>

							<p className='place-items-center transform h-0 group-hover:h-14 border-opacity-[0.15] flex justify-center items-center border-t-2 border-white font-semibold text-white transition-all duration-200 ease-in-out'>
								View Career
								<BsArrowRightShort className='ml-1 text-[28px]' />
							</p>
						</a>
					))}
				</section>
			</main>
		</>
	);
}
