import Head from "next/head";
import { RiSearchLine, RiShuffleFill } from "react-icons/ri";
import { FiChevronDown } from "react-icons/fi";
import { BsFillLightningFill, BsArrowRightShort } from "react-icons/bs";

import { careers } from "../careers";
import Navbar from "../components/Navbar";

export default function Home() {
	return (
		<>
			<Head>
				<title>Home - CareerFinder</title>

				<link rel='preconnect' href='https://fonts.gstatic.com' />
				<link
					href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
					rel='stylesheet'
				/>
			</Head>

			<Navbar />

			<header className='bg-hero-image py-80 relative text-center bg-black bg-center bg-no-repeat bg-cover'>
				<article className='bg-opacity-70 absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center bg-black'>
					<div className='xl:container xl:px-0 xl:mx-auto md:mt-0 px-6 -mt-32'>
						<h2 className='md:text-5xl text-4xl font-semibold text-white'>
							Start a New Career in Six Months.
						</h2>
						<p className='mt-5 text-white'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							<br />
							Optio est, molestias iure repellendus inventore repudiandae
							delectus aliquid ea voluptate deleniti.
						</p>
						<button className='rounded-xl hover:-translate-y-1 hover:shadow-lg md:w-auto self-center w-full px-12 py-4 mt-12 font-medium text-black transition-all duration-200 ease-in-out transform bg-white border-2 border-white'>
							Generate Random Career
						</button>
					</div>
					<button className='rounded-xl group md:w-auto bottom-5 absolute left-0 right-0 flex flex-col items-center justify-center w-full px-12 py-4 mx-auto font-medium text-white transition-all duration-200 ease-in-out'>
						Or Browse Careers
						<FiChevronDown className='mt-2 text-5xl transform' />
					</button>
				</article>
			</header>

			<main className='xl:container pb-32 mx-auto mt-16'>
				<div className='bottom-8 fixed z-10 hidden w-screen px-6'>
					<button className='rounded-xl shadow-yellow inline-flex items-center justify-center w-full py-4 font-semibold text-center text-white bg-yellow-500'>
						Draw Random Career
						<RiShuffleFill className='ml-3 text-xl' />
					</button>
				</div>
				<div className='xl:px-0 relative px-6'>
					<div className='md:justify-start flex items-center justify-between mt-10 space-x-5'>
						<p className='text-lg font-bold uppercase'>Category</p>
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
					className='no-scrollbar xl:px-0 flex px-6 mt-4 overflow-x-scroll'
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
						className='Filter-item rounded-xl px-5 py-2 mr-3 font-medium bg-white border-2 border-gray-300 cursor-pointer'
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
						className='Filter-item rounded-xl px-5 py-2 mr-3 font-medium bg-white border-2 border-gray-300 cursor-pointer'
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
						className='Filter-item rounded-xl px-5 py-2 mr-3 font-medium bg-white border-2 border-gray-300 cursor-pointer'
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
						className='Filter-item rounded-xl px-5 py-2 mr-3 font-medium bg-white border-2 border-gray-300 cursor-pointer'
					>
						something
					</label>
				</form>

				<div className='md:justify-start xl:px-0 flex flex-col justify-between px-6 mt-12'>
					<p className='text-lg font-bold uppercase'>Sort by</p>

					<div className='border-b-[1px] flex items-center pb-6 mt-3 space-x-3'>
						<div className='sorting-dropdown'>
							<select
								id='sort-by'
								name='sort-by'
								className='place-items-center rounded-xl grid px-4 py-[10px] text-white bg-black shadow-md font-medium cursor-pointer pr-5 text-base'
							>
								<option value='salary'>Salary</option>
								<option value='test'>Popularity</option>
							</select>
						</div>

						<div className='sorting-dropdown'>
							<select
								id='sort-mode'
								name='sort-mode'
								className='place-items-center rounded-xl grid px-4 py-[10px] text-white bg-black shadow-md font-medium cursor-pointer pr-5 text-base'
							>
								<option value='test'>High to Low</option>
								<option value='salary'>Low to High</option>
							</select>
						</div>
					</div>
				</div>

				<section className='md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 4xl:grid-cols-7 xl:px-0 grid grid-cols-1 gap-10 px-6 mt-8'>
					{careers.map((career, i) => (
						<a
							href='#'
							className='rounded-xl group hover:bg-black overflow-hidden transition-all duration-200 ease-in-out bg-white shadow-lg'
							key={i}
						>
							<img
								src={career.image}
								alt={career.name}
								className='h-[200px] object-cover w-full transition-all duration-200 ease-in-out'
							/>

							<section className='pb-7 group-hover:text-white px-6 pt-6 transition-all duration-200 ease-in-out'>
								<h3 className='inline-flex items-center text-2xl font-bold'>
									{career.name}
									{career.hot && (
										<BsFillLightningFill className='filter drop-shadow-lightning ml-2 text-2xl text-yellow-400' />
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
						</a>
					))}
				</section>
			</main>
		</>
	);
}
