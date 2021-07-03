import { useState } from "react";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

export default function CourseCard({ name, free, paid, courses }) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<section className='rounded-xl w-full mt-4 shadow-lg'>
			<div className=' flex items-center p-6 pb-5 space-x-4'>
				<div
					className={`place-items-center grid text-white bg-black shadow-md ${
						isExpanded
							? "w-8 h-8 text-base rounded-[8px]"
							: "w-11 h-11 text-xl rounded-[10px]"
					}`}
				>
					{free + paid}
				</div>

				<div>
					<h4 className='text-base font-semibold'>{name}</h4>
					<p
						className={`text-gray-main text-sm font-normal ${
							isExpanded ? "hidden" : "inline-block"
						}`}
					>
						{free} Free &bull; {paid} Paid
					</p>
				</div>
			</div>

			<div
				className={`flex-col overflow-hidden border-t divide-y ${
					isExpanded ? "flex" : "hidden"
				}`}
			>
				{courses.map((course, i) => (
					<a
						href='#'
						key={i}
						className='hover:bg-gray-50 flex items-center justify-between p-6 bg-white'
					>
						<div className='flex justify-start space-x-4'>
							<img
								src={course.publisherLogo}
								alt={`${course.name} by ${course.publisher}`}
								className={`rounded-[10px] object-cover w-11 h-11 text-xl text-white bg-black shadow-md`}
							/>

							<div>
								<h4 className='text-base font-semibold'>
									{course.name}
								</h4>
								<p className='text-gray-main text-sm font-normal'>
									By {course.publisher}
								</p>
							</div>
						</div>

						<p className='py-1 uppercase w-[60px] bg-black rounded-lg text-[13px] text-white text-center font-semibold'>
							{course.cost}
						</p>
					</a>
				))}
			</div>
			<div
				className='flex items-center justify-center py-[14px] text-sm font-medium border-t cursor-pointer text-black hover:text-opacity-50 transition-colors duration-200 ease-in-out'
				onClick={() => setIsExpanded(!isExpanded)}
			>
				{isExpanded
					? ["Hide Courses", <BsCaretUpFill key={name} className='ml-2' />]
					: [
							"Show Courses",
							<BsCaretDownFill key={name} className='ml-2' />
					  ]}
			</div>
		</section>
	);
}