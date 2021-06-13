import { useEffect, useState, useRef } from 'react'

import { BsCaretDownFill } from 'react-icons/bs'
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
      setFilteredInput(() => [...filteredInput, e.target.value.toLowerCase()])
    } else if (!e.target.checked) {
      setFilteredInput(() =>
        filteredInput.filter(
          (item) => item.toLowerCase() !== e.target.value.toLowerCase()
        )
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
        {filteredInput.length && filteredInput.length <= 1
          ? filteredInput
          : filteredInput.length > 1
          ? `${filteredInput.slice(0, 1).join(', ')} +${
              filteredInput.slice(1).length
            }`
          : `${children}`}
        <BsCaretDownFill className="ml-3" />
      </button>

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
              onChange={() => setSearchValue(searchBarRef.current.value)}
              placeholder="Search"
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
                    checked={
                      filteredInput.includes(filter.toLowerCase())
                        ? true
                        : false
                    }
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
                    checked={
                      filteredInput.includes(filter.toLowerCase())
                        ? true
                        : false
                    }
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
