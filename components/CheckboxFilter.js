import { useEffect, useState, useRef } from 'react'
import { BsCaretDownFill } from 'react-icons/bs'
import { RiSearchLine } from 'react-icons/ri'

export default function CheckboxFilter({
  children,
  input,
  inputFiltered,
  setInputFiltered,
  ...props
}) {
  const container = useRef(null)
  const searchBarRef = useRef(null)
  const categoryRef = useRef(null)
  const checkBoxRef = useRef(null)

  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isOpen, setIsOpen] = useState()
  const [inputFilters, setInputFilters] = useState([])

  const handleCheckboxes = (e) => {
    if (e.target.checked) {
      setInputFilters([...categoryFilters, e.target.value.toLowerCase()])
    } else if (!e.target.checked) {
      setInputFilters(
        categoryFilters.filter((item) => item !== e.target.value.toLowerCase())
      )
    }
  }

  const handleClickOutside = (event) => {
    if (container.current && !container.current.contains(event.target)) {
      setIsOpen(false)
      setSearchValue('')
    }
  }

  useEffect(() => {
    input?.forEach((item, i) => {
      if (
        inputFilters.includes(item.category) &&
        !inputFiltered.includes(item)
      ) {
        setInputFiltered([...inputFiltered, item])
      } else {
        setInputFiltered(
          input?.filter((item) => inputFilters.includes(item.category))
        )
      }
    })
  }, [inputFilters])

  useEffect(() => {
    if (searchValue) {
      let resultsArray = input.filter((item) => item.includes(searchValue))
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
    <div className="relative inline-block w-full" ref={container}>
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
        {inputFilters.length && inputFilters.length <= 1
          ? inputFilters
          : inputFilters.length > 1
          ? `${inputFilters.slice(0, 1).join(', ')} +${
              inputFilters.slice(1).length
            }`
          : `${children}`}
        <BsCaretDownFill className="ml-3" />
      </button>

      {inputFilters.length ? (
        <button
          className="ml-4"
          onClick={() => {
            setInputFilters([])
          }}
        >
          Clear
        </button>
      ) : null}

      {isOpen && (
        <div
          className="ring-1 ring-black ring-opacity-5 focus:outline-none absolute right-0 w-72 mt-2 origin-top-right bg-white rounded-[10px] shadow-lg"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="relative flex flex-col justify-center mx-2.5 mt-2">
            <RiSearchLine className="text-md absolute ml-3 text-black" />
            <input
              ref={searchBarRef}
              type="text"
              onChange={() => setSearchValue(searchBarRef.current.value)}
              placeholder="Search for category"
              className="rounded-lg pl-9 px-2 py-2.5 text-sm border border-[#dedede] placeholder-gray-main outline-none focus:border transition-colors duration-200 ease-in-out focus:border-black bg-white appearance-none"
            />
          </div>
          <form
            name="categoryForm"
            id="categoryForm"
            ref={categoryRef}
            onChange={handleCheckboxes}
            className="py-2 space-y-1"
          >
            {searchValue && searchResults.length ? (
              searchResults.map((category, i) => (
                <label
                  key={i}
                  htmlFor={category}
                  className="hover:bg-gray-100 checked:bg-black group flex items-center px-3 py-2 cursor-pointer"
                >
                  <input
                    ref={checkBoxRef}
                    id={category}
                    type="checkbox"
                    value={category}
                    checked={categoryFilters.includes(category) ? true : false}
                    readOnly={true}
                    className="checked:bg-black checked:ring-black bg-transparent ring-gray-400 relative block px-2 py-2 mr-2 rounded-[4px] appearance-none outline-none border-2"
                  />
                  {category[0].toUpperCase() + category.slice(1).toLowerCase()}
                </label>
              ))
            ) : !searchValue && !searchResults.length ? (
              input.slice(0, 5).map((category, i) => (
                <label
                  key={i}
                  htmlFor={category}
                  className="hover:bg-gray-100 checked:bg-black group flex items-center px-3 py-2 cursor-pointer"
                >
                  <input
                    ref={checkBoxRef}
                    id={category}
                    type="checkbox"
                    value={category}
                    checked={categoryFilters.includes(category) ? true : false}
                    readOnly={true}
                    className="checked:bg-black checked:ring-black bg-transparent ring-gray-400 relative block px-2 py-2 mr-2 rounded-[4px] appearance-none outline-none border-2"
                  />
                  {category[0].toUpperCase() + category.slice(1).toLowerCase()}
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
