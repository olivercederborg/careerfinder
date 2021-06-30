import { useRef } from 'react'
import { RiSearchLine } from 'react-icons/ri'

export default function SearchBar({ setSearchValue }) {
  const careerSearchbar = useRef(null)

  return (
    <div className="md:col-span-6 relative flex flex-col justify-center col-span-12">
      <RiSearchLine className="absolute ml-6 text-lg text-black" />
      <input
        type="jobSearch"
        placeholder="Search for a career"
        className="rounded-xl pl-14 w-full px-6 py-4 text-sm border border-[#dedede] placeholder-gray-main focus:outline-none focus:border-1 transition-colors duration-200 ease-in-out focus:border-black shadow-slight bg-white appearance-none"
        ref={careerSearchbar}
        onChange={() => setSearchValue(careerSearchbar.current.value)}
      />
    </div>
  )
}
