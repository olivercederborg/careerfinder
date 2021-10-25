import { useEffect, useState, useRef } from 'react'

import { BsCaretDownFill } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { RiSearchLine } from 'react-icons/ri'

interface Props {
  children: any
  input: any[]
  filteredInput: any[]
  setFilteredInput: (value: React.SetStateAction<any[]>) => void
}

export default function CheckboxFilter({
  children,
  input,
  filteredInput,
  setFilteredInput,
}: Props) {
  const containerRef = useRef(null)
  const searchBarRef = useRef(null)

  const [searchValue, setSearchValue] = useState<string>('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState<boolean>()

  const handleCheckboxes = (e) => {
    if (e.target.checked) {
      setFilteredInput(() => [...filteredInput, e.target.value])
    } else if (!e.target.checked) {
      setFilteredInput(() =>
        filteredInput.filter((item) => item !== e.target.value)
      )
    }
  }

  const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setIsOpen(false)
      setSearchValue('')
    }
  }

  useEffect(() => {
    if (searchValue) {
      let resultsArray = input.filter((item) =>
        item.toLowerCase().includes(searchValue.toLowerCase())
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
      <div className="flex items-center justify-center mt-2">
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen)
            setSearchResults([])
            setSearchValue('')
          }}
          className="flex items-center w-full justify-between px-6 py-4 h-14 text-sm text-white transition-all duration-200 ease-in-out bg-black rounded-[10px] focus:outline-none focus:ring-2 ring-gray-400 ring-offset-white ring-offset-1 truncate relative"
          id="menu-button"
        >
          <div className="flex items-center">
            {!!filteredInput.length && (
              <div className="place-items-center grid p-1 mr-2 bg-white rounded-full shadow-md cursor-pointer">
                <IoClose
                  className="text-lg text-black"
                  onClick={() => setFilteredInput([])}
                />
              </div>
            )}
            <p>
              {filteredInput.length && filteredInput.length <= 1
                ? `${filteredInput[0]
                    .slice(0, 1)
                    .toUpperCase()}${filteredInput[0].slice(1)}`
                : filteredInput.length > 1
                ? `${
                    filteredInput[0].slice(0, 1).toUpperCase() +
                    filteredInput[0].slice(1)
                  } +${filteredInput.slice(1).length}`
                : `${children}`}
            </p>
          </div>
          <div className="absolute right-0 bg-black">
            {' '}
            <BsCaretDownFill className="mx-3" />
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          className="ring-1 ring-black ring-opacity-5 focus:outline-none absolute left-0 w-full md:w-[272px] mt-2 z-20 origin-top-right bg-white rounded-[10px] shadow-lg"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="relative flex flex-col justify-center mx-2.5 mt-2">
            <RiSearchLine className="text-md absolute ml-3 text-black" />
            <input
              ref={searchBarRef}
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search"
              value={searchValue}
              className="rounded-lg pl-9 px-2 py-2.5 text-sm border border-[#dedede] placeholder-gray-main outline-none focus:border transition-colors duration-200 ease-in-out focus:border-black bg-white appearance-none"
            />
          </div>
          <form
            name="categoryForm"
            id="categoryForm"
            onChange={handleCheckboxes}
            className="py-2 space-y-1"
          >
            {searchValue && searchResults.length ? (
              searchResults.map((filter, i) => (
                <label
                  key={i}
                  htmlFor={filter}
                  className="hover:bg-gray-100 checked:bg-black group flex items-center px-3 py-2 cursor-pointer"
                >
                  <input
                    id={filter}
                    type="checkbox"
                    value={filter}
                    checked={filteredInput.includes(filter)}
                    readOnly={true}
                    className="checked:bg-black checked:ring-black bg-transparent ring-gray-400 relative block px-2 py-2 mr-2 rounded-[4px] appearance-none outline-none border-2"
                  />
                  {filter}
                </label>
              ))
            ) : !searchValue && !searchResults.length ? (
              input.map((filter, i) => (
                <label
                  key={i}
                  htmlFor={filter}
                  className="hover:bg-gray-100 checked:bg-black group flex items-center px-3 py-2 cursor-pointer"
                >
                  <input
                    id={filter}
                    type="checkbox"
                    value={filter}
                    checked={filteredInput.includes(filter)}
                    readOnly={true}
                    className="checked:bg-black checked:ring-black bg-transparent ring-gray-400 relative block px-2 py-2 mr-2 rounded-[4px] appearance-none outline-none border-2"
                  />
                  {filter}
                </label>
              ))
            ) : (
              <p className="px-3 py-2">No matching results.</p>
            )}
          </form>
        </div>
      )}
    </div>
  )
}
