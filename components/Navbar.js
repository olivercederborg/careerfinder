import { useState } from "react";
import { RiMenu5Fill } from "react-icons/ri";

export default function Navbar() {
	const [menuIsActive, setMenuIsActive] = useState(false);
	return (
		<header className='relative px-6 py-6'>
			<div className='flex items-center justify-between mx-auto'>
				<a href='' className='inline-block'>
					<h1 className='text-xl font-bold tracking-normal text-gray-900 uppercase'>
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
	);
}
