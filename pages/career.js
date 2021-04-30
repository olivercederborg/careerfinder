import Head from "next/head";
import { RiSearchLine, RiShuffleFill } from "react-icons/ri";
import { BsFillLightningFill, BsCaretDownFill } from "react-icons/bs";

import { careers } from "../careers";
import Navbar from "../components/Navbar";
import CareerChart from "../components/CareerChart";
import { useRef, useState } from "react";
import CourseCard from "../components/CourseCard";

const courses = [
	{
		title: "HTML/CSS",
		courses: [
			{
				name: "The Basics of Web Development",
				publisher: "Codecademy",
				publisherLogo:
					"https://pbs.twimg.com/profile_images/1314000477466636290/fwTNDGoi_400x400.jpg",
				cost: "free"
			},
			{
				name: "HTML/CSS In-depth Course",
				publisher: "Udemy",
				publisherLogo:
					"https://i0.wp.com/sourceofapk.com/wp-content/uploads/2020/11/udemy-tv-apk-latest.jpg?fit=600%2C600&ssl=1",
				cost: "$50"
			}
		]
	},
	{
		title: "JavaScript",
		courses: [
			{
				name: "The Basics of Web Development",
				publisher: "Codecademy",
				publisherLogo:
					"https://pbs.twimg.com/profile_images/1314000477466636290/fwTNDGoi_400x400.jpg",
				cost: "free"
			},
			{
				name: "HTML/CSS In-depth Course",
				publisher: "Udemy",
				publisherLogo:
					"https://pbs.twimg.com/profile_images/1314000477466636290/fwTNDGoi_400x400.jpg",
				cost: "$50"
			}
		]
	},
	{
		title: "React.js",
		courses: [
			{
				name: "React.js Introduction",
				publisher: "Codecademy",
				publisherLogo:
					"https://pbs.twimg.com/profile_images/1314000477466636290/fwTNDGoi_400x400.jpg",
				cost: "free"
			},
			{
				name: "React.js Crash Course",
				publisher: "Codecademy",
				publisherLogo:
					"https://pbs.twimg.com/profile_images/1314000477466636290/fwTNDGoi_400x400.jpg",
				cost: "$50"
			},
			{
				name: "React.js & Firebase Course",
				publisher: "Udemy",
				publisherLogo:
					"https://i0.wp.com/sourceofapk.com/wp-content/uploads/2020/11/udemy-tv-apk-latest.jpg?fit=600%2C600&ssl=1",
				cost: "$100"
			}
		]
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
				<title>{career.name} - CareerFinder</title>
			</Head>

			<Navbar />

			<main className='xl:container md:gap-x-4 xl:mx-auto md:grid-cols-12 grid grid-cols-1'>
				<img
					src={career.image}
					alt={career.name}
					className='max-h-[450px] object-cover md:col-span-12 w-full xl:rounded-xl'
				/>

				<article className='mt-7 md:mt-12 md:col-span-6 3xl:col-span-4 px-6'>
					<h2 className='inline-flex items-center text-3xl font-semibold'>
						{career.name}
						{career.hot && (
							<BsFillLightningFill className='filter drop-shadow-lightning ml-3 text-2xl text-yellow-400' />
						)}
					</h2>
					<p className='mt-7 font-semibold'>Life of a {career.name}</p>
					<p className='mt-3'>{career.description}</p>
					<img
						src={career.imageTwo}
						alt=''
						className='mt-8 rounded-xl h-[300px] object-cover w-full hidden md:block'
					/>
				</article>

				<nav
					ref={sectionNav}
					aria-label='Section Navigation'
					className={`justify-evenly rounded-xl md:hidden sticky top-0 z-10 flex mx-6 mt-10 bg-white shadow-lg transition-all duration-200 ease-in-out ${
						sectionNavIsTop && "mx-0 rounded-none"
					}`}
				>
					<a href='#courses' className='text-gray-main py-6 font-medium'>
						Courses
					</a>
					<a href='#potential' className='text-gray-main py-6 font-medium'>
						Potential
					</a>
					<a href='#jobs' className='text-gray-main py-6 font-medium'>
						Jobs
					</a>
				</nav>

				<section
					id='courses'
					className='md:col-span-6 3xl:col-span-4 flex flex-col items-start px-6 my-12 font-semibold'
					style={{ scrollMargin: "100px 0 0 0" }}
				>
					<h3 className='mb-8 text-3xl'>Courses</h3>

					{courses.map((course, i) => {
						let freeCourses = course.courses.filter(
							(item) => item.cost === "free"
						);

						let paidCourses = course.courses.filter(
							(item) => item.cost !== "free"
						);
						return (
							<CourseCard
								key={i}
								name={course.title}
								free={freeCourses.length}
								paid={paidCourses.length}
								courses={course.courses}
							/>
						);
					})}

					<button className='rounded-xl md:max-w-[300px] hover:-translate-y-1 hover:shadow-lg self-center w-full px-12 py-4 mt-10 font-medium text-white transition-all duration-200 ease-in-out transform bg-black'>
						View all 5 courses
					</button>
				</section>

				<section
					id='potential'
					className='md:col-span-6 3xl:col-span-4 flex flex-col px-6 my-12 font-semibold'
					style={{ scrollMargin: "100px 0 0 0" }}
				>
					<h3 className='mb-8 text-3xl'>Earning Potential</h3>

					<div className='rounded-2xl md:inline-flex md:self-start flex justify-between p-2 mb-8 space-x-2 bg-white shadow-lg'>
						<button className='px-4 py-[6px] rounded-[10px] hover:bg-black hover:bg-opacity-40 hover:text-white transition-all duration-200 ease-in-out text-sm'>
							1 year
						</button>
						<button className='px-4 py-[6px] bg-black text-white rounded-[10px] hover:bg-black hover:bg-opacity-40 text-sm hover:text-white transition-all duration-200 ease-in-out'>
							2 years
						</button>
						<button className='px-4 py-[6px] rounded-[10px] hover:bg-black hover:bg-opacity-40 hover:text-white transition-all text-sm duration-200 ease-in-out'>
							All time
						</button>
					</div>

					<CareerChart />
				</section>

				<section
					id='jobs'
					className='md:col-span-6 3xl:col-span-4 px-6 my-12 font-semibold'
					style={{ scrollMargin: "100px 0 0 0" }}
				>
					<h3 className='mb-8 text-3xl'>Jobs Available</h3>

					<div className='relative flex flex-col justify-center'>
						<RiSearchLine className='absolute ml-6 text-lg text-black' />
						<input
							type='search'
							placeholder='Search for a country'
							className='rounded-xl pl-14 w-full px-6 py-4 text-sm border border-[#dedede] placeholder-gray-main focus:outline-none focus:border-1 transition-colors duration-200 ease-in-out focus:border-black shadow-slight bg-white appearance-none'
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
