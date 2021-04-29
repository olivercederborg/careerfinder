import Head from "next/head";
import { RiSearchLine, RiShuffleFill } from "react-icons/ri";
import { BsFillLightningFill, BsCaretDownFill } from "react-icons/bs";

import { careers } from "../careers";
import Navbar from "../components/Navbar";
import CareerChart from "../components/CareerChart";
import { useEffect, useRef, useState } from "react";
import CourseCard from "../components/CourseCard";

const reactCourses = [
	{
		name: "React Introduction",
		publisher: "Codecademy",
		cost: "free"
	},
	{
		name: "React Crash Course",
		publisher: "Codecademy",
		cost: "$100"
	},
	{
		name: "Ultimate React Course",
		publisher: "Codecademy",
		cost: "$200"
	}
];

const Career = () => {
	const career = careers[0];
	const sectionNav = useRef(null);
	const [sectionNavIsTop, setSectionNavIsTop] = useState(false);

	if (typeof window !== "undefined") {
		window.addEventListener("scroll", () => {
			let sectionNavOffset = sectionNav.current.getBoundingClientRect().top;
			if (sectionNavOffset == 0) {
				setSectionNavIsTop(true);
			} else {
				setSectionNavIsTop(false);
			}
		});
	}

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

			<main className='xl:container md:gap-x-4 xl:mx-auto md:grid-cols-12 grid justify-between grid-cols-1'>
				<img
					src={career.image}
					alt={career.name}
					className='max-h-[600px] object-cover md:col-span-12 w-full'
				/>

				<article className='mt-7 md:mt-12 md:col-span-6 px-6'>
					<h2 className='inline-flex items-center text-3xl font-semibold'>
						{career.name}
						{career.hot && (
							<BsFillLightningFill className='filter drop-shadow-lightning ml-3 text-2xl text-yellow-400' />
						)}
					</h2>
					<p className='mt-7 font-semibold'>Life of a {career.name}</p>
					<p className='mt-3'>{career.description}</p>
				</article>

				<nav
					ref={sectionNav}
					aria-label='Section Navigation'
					className={`justify-evenly rounded-xl md:hidden sticky top-0 z-10 flex mx-6 mt-10 bg-white shadow-lg transition-all duration-200 ease-in-out ${
						sectionNavIsTop && "mx-0 rounded-none"
					}`}
				>
					<a href='#' className='text-gray-main py-6 font-medium'>
						Courses
					</a>
					<a href='#' className='text-gray-main py-6 font-medium'>
						Potential
					</a>
					<a href='#' className='text-gray-main py-6 font-medium'>
						Jobs
					</a>
				</nav>

				<section className='md:col-span-6 px-6 my-12 font-semibold'>
					<h3 className='mb-8 text-3xl'>Courses</h3>

					<CourseCard
						name='React.js'
						free={4}
						paid={5}
						courses={reactCourses}
					/>
				</section>

				<section className='md:col-span-6 px-6 my-12 font-semibold'>
					<h3 className='mb-8 text-3xl'>Earning Potential</h3>

					<div className='rounded-2xl flex justify-between p-2 mb-8 bg-white shadow-lg'>
						<button className='px-4 py-[6px] rounded-[10px] hover:bg-black hover:bg-opacity-40 hover:text-white transition-all duration-200 ease-in-out'>
							1 year
						</button>
						<button className='px-4 py-[6px] bg-black text-white rounded-[10px] hover:bg-black hover:bg-opacity-40 hover:text-white transition-all duration-200 ease-in-out'>
							2 years
						</button>
						<button className='px-4 py-[6px] rounded-[10px] hover:bg-black hover:bg-opacity-40 hover:text-white transition-all duration-200 ease-in-out'>
							All time
						</button>
					</div>

					<CareerChart />
				</section>

				<section className='md:col-span-6 px-6 my-12 font-semibold'>
					<h3 className='mb-8 text-3xl'>Jobs Available</h3>

					<div className='relative flex flex-col justify-center'>
						<RiSearchLine className='absolute ml-6 text-lg text-black' />
						<input
							type='search'
							placeholder='Search for a country'
							className='rounded-xl pl-14 w-full px-6 py-4 text-sm border border-[#dedede] placeholder-gray-main focus:outline-none focus:border-1 transition-colors duration-200 ease-in-out focus:border-black shadow-slight'
						/>
					</div>

					<div className='mt-8 space-y-4'>
						<section className='rounded-xl flex items-center justify-between p-6 bg-white shadow-lg'>
							<div className='flex flex-col w-8/12'>
								<p className='text-gray-main text-sm font-normal'>
									Jobs available in
								</p>
								<p className='mt-1 text-xl font-semibold truncate'>
									North America
								</p>
							</div>
							<p className='text-2xl'>13.342</p>
						</section>

						<section className='rounded-xl flex items-center justify-between p-6 bg-white shadow-lg'>
							<div className='flex flex-col w-8/12'>
								<p className='text-gray-main text-sm font-normal'>
									Jobs available in
								</p>
								<p className='mt-1 text-xl font-semibold truncate'>
									Europe
								</p>
							</div>
							<p className='text-2xl'>27.281</p>
						</section>

						<section className='rounded-xl flex items-center justify-between p-6 bg-white shadow-lg'>
							<div className='flex flex-col w-8/12'>
								<p className='text-gray-main text-sm font-normal'>
									Jobs available in
								</p>
								<p className='mt-1 text-xl font-semibold truncate'>
									China
								</p>
							</div>
							<p className='text-2xl'>7.274</p>
						</section>
					</div>
				</section>
			</main>
		</>
	);
};

export default Career;
