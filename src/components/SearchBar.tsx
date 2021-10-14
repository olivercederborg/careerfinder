import { useRef } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import cn from 'classnames'

interface Props {
  searchValue: string
  setSearchValue: (string) => void
  placeholderText?: string
  eleId?: string
  className?: string
}

export default function SearchBar({
  searchValue,
  setSearchValue,
  placeholderText,
  eleId,
  className,
}: Props) {
  const searchBarRef = useRef(null)

  const handleChange = () => {
    setSearchValue(() => searchBarRef.current.value)
  }

  return (
    <div className={cn(`relative flex flex-col justify-center`, className)}>
      <RiSearchLine className="absolute ml-4 text-lg text-black" />
      <input
        ref={searchBarRef}
        type="text"
        id={eleId}
        placeholder={placeholderText || 'Search'}
        className="rounded-xl pl-12 w-full pr-6 py-4 text-sm border border-[#dedede] placeholder-gray-main focus:outline-none focus:border-1 transition-colors duration-200 ease-in-out focus:border-black shadow-slight bg-white appearance-none"
        onChange={handleChange}
        value={searchValue}
      />
    </div>
  )
}
