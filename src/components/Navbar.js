import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RiMenu5Fill } from 'react-icons/ri'
import { IoClose } from 'react-icons/io5'

export default function Navbar() {
  const router = useRouter()
  const [menuIsActive, setMenuIsActive] = useState(false)

  return (
    <header className="xl:container xl:px-0 relative px-6 py-6 mx-auto">
      <div className="flex items-center justify-between mx-auto">
        <Link href="/">
          <a className="inline-block">
            <h1 className="text-xl font-bold tracking-normal text-gray-900 uppercase">
              CareerFinder
            </h1>
          </a>
        </Link>

        <button
          onClick={() => setMenuIsActive(!menuIsActive)}
          className="md:hidden w-14 h-14 hover:scale-110 hover:shadow-xl place-items-center grid text-3xl text-white transition-all transform bg-black rounded-full shadow-lg"
        >
          <RiMenu5Fill />
        </button>

        <nav className="rounded-xl md:flex hidden p-2 space-x-2 bg-white">
          <Link href="/">
            <a
              className={`px-6 py-3 rounded-[10px] font-medium ${
                router.pathname === '/'
                  ? 'bg-black text-white'
                  : 'hover:bg-black hover:bg-opacity-5 text-black'
              }`}
            >
              Home
            </a>
          </Link>
          <Link href="/courses">
            <a
              className={`px-6 py-3 rounded-[10px] font-medium ${
                router.pathname.includes('/courses')
                  ? 'bg-black text-white'
                  : 'hover:bg-black hover:bg-opacity-5 text-black'
              }`}
            >
              Courses
            </a>
          </Link>
        </nav>
      </div>

      {menuIsActive && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-20 p-6 bg-black">
          <div className="flex items-center justify-between mx-auto">
            <Link href="/">
              <a className="inline-block">
                <h1 className="text-xl font-bold tracking-normal text-white uppercase">
                  CareerFinder
                </h1>
              </a>
            </Link>
            <button
              onClick={() => setMenuIsActive(!menuIsActive)}
              className="w-14 h-14 hover:scale-110 hover:shadow-xl place-items-center grid text-3xl text-black transition-all transform bg-white rounded-full shadow-lg"
            >
              <IoClose />
            </button>
          </div>

          <nav className="place-items-center z-20 grid h-full -mt-24 text-center">
            <ul className="space-y-10">
              <li>
                <Link href="/">
                  <a className="hover:text-gray-300 hover:border-b-4 text-4xl font-semibold text-white border-gray-300">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/courses">
                  <a className="hover:text-gray-300 hover:border-b-4 text-4xl font-semibold text-white border-gray-300">
                    Courses
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
