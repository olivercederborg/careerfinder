import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { BsCaretDownFill } from 'react-icons/bs'
import { RiSearchLine } from 'react-icons/ri'
import { GrFormClose } from 'react-icons/gr'

interface Props {
  children: any
  input: {
    name: string
    slug: string
  }[]
}

export default function CategoryFilter({ children, input }: Props) {
  const router = useRouter()
  const { query } = useRouter()

  const containerRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef(null)

  const [searchValue, setSearchValue] = useState<string>('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState<boolean>()

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false)
      setSearchValue('')
    }
  }

  useEffect(() => {
    if (searchValue) {
      let resultsArray = input.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      setSearchResults(resultsArray)
    } else {
      setSearchResults([])
    }
  }, [searchValue])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      document.addEventListener('keydown', (event) => {
        event.key === 'Escape' && setIsOpen(false)
      })
    }
  }, [isOpen])
  return (
    <div className="relative inline-block w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen)
          setSearchResults([])
          setSearchValue('')
        }}
        className="inline-flex items-center w-full justify-between px-6 py-4 text-sm text-white transition-all duration-200 ease-in-out bg-black rounded-[10px] focus:outline-none focus:ring-2 ring-gray-400 ring-offset-white ring-offset-1 mt-2"
        id="menu-button"
      >
        {children}

        <BsCaretDownFill className="ml-3" />
      </button>

      {isOpen && (
        <div
          className="ring-1 ring-black ring-opacity-5 focus:outline-none absolute left-0 w-full md:w-[272px] mt-2 origin-top-right bg-white rounded-[10px] shadow-lg z-20"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="relative flex flex-col justify-center mx-2.5 mt-2">
            <RiSearchLine className="text-md absolute ml-3 text-black" />

            {searchValue.length ? (
              <button
                className="absolute right-0 block p-3"
                onClick={() => {
                  setSearchValue('')
                  searchBarRef.current.value = ''
                }}
              >
                <GrFormClose className="text-2xl text-black" />
              </button>
            ) : null}

            <input
              ref={searchBarRef}
              type="text"
              onChange={() => setSearchValue(searchBarRef.current.value)}
              placeholder="Search for category"
              className="rounded-lg pl-9 px-2 py-2.5 text-sm border border-[#dedede] placeholder-gray-main outline-none focus:border transition-colors duration-200 ease-in-out focus:border-black bg-white appearance-none"
            />
          </div>
          <ul className="py-2 space-y-1">
            {!searchValue ? (
              <li
                onClick={() => router.push('/courses')}
                className={` hover:bg-gray-100 flex items-center px-3 py-2 font-normal ${
                  !query?.id
                    ? 'pointer-events-none text-gray-400'
                    : 'cursor-pointer'
                }`}
              >
                All Categories
              </li>
            ) : null}
            {searchResults.length
              ? searchResults.map((item, i) => (
                  <li
                    key={i}
                    onClick={() => router.push(`/courses/${item.slug}`)}
                    className={` hover:bg-gray-100 flex items-center px-3 py-2 font-normal ${
                      query?.id == item.slug
                        ? 'pointer-events-none text-gray-400'
                        : 'cursor-pointer'
                    }`}
                  >
                    {item.name}
                  </li>
                ))
              : input.map((item, i) => (
                  <li
                    key={i}
                    onClick={() => router.push(`/courses/${item.slug}`)}
                    className={` hover:bg-gray-100 flex items-center px-3 py-2 font-normal ${
                      query?.id == item.slug
                        ? 'pointer-events-none text-gray-400'
                        : 'cursor-pointer'
                    }`}
                  >
                    {item.name}
                  </li>
                ))}
          </ul>
        </div>
      )}
    </div>
  )
}
