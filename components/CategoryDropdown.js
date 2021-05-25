import { useEffect, useState, useRef } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { HiCheck } from 'react-icons/hi'

export default function CategoryDropdown({
  careers,
  careersFiltered,
  setCareersFiltered,
}) {
  const categoryRef = useRef(null)
  const checkBoxRef = useRef(null)
  const [categoryFilters, setCategoryFilters] = useState([])

  let careerCategories = careers.map((career) => career.category)
  let uniqueCategories = [...new Set(careerCategories)]

  const handleCategories = (e) => {
    if (e.target.checked) {
      setCategoryFilters([...categoryFilters, e.target.value.toLowerCase()])
    } else if (!e.target.checked) {
      setCategoryFilters(
        categoryFilters.filter((item) => item !== e.target.value.toLowerCase())
      )
    }
  }

  useEffect(() => {
    careers.forEach((career, i) => {
      if (
        categoryFilters.includes(career.category) &&
        !careersFiltered.includes(career)
      ) {
        setCareersFiltered([...careersFiltered, career])
      } else {
        setCareersFiltered(
          careers.filter((item) => categoryFilters.includes(item.category))
        )
      }
    })
  }, [categoryFilters])
  return (
    <div className="relative inline-block">
      <div>
        <button
          type="button"
          className="inline-flex px-4 py-3 text-sm text-white transition-all duration-200 ease-in-out bg-black rounded-[10px] focus:outline-none focus:ring-2 ring-gray-400 ring-offset-white ring-offset-1"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {categoryFilters.length && categoryFilters.length <= 1
            ? categoryFilters
            : categoryFilters.length > 1
            ? `${categoryFilters.slice(0, 1).join(', ')} +${
                categoryFilters.slice(1).length
              }`
            : 'Pick Category'}
          <svg
            className="w-5 h-5 ml-2 -mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            aria-hidden="true"
            fill="#fff"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {categoryFilters.length ? (
          <button
            className="ml-4"
            onClick={() => {
              setCategoryFilters([])
              careerCategories.map((item) => {
                document.getElementById(`${item}`).checked = false
              })
            }}
          >
            Clear
          </button>
        ) : null}
      </div>

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
            type="text"
            placeholder="Search for category"
            className="rounded-lg pl-9 px-2 py-2.5 text-sm border border-[#dedede] placeholder-gray-main focus:outline-none focus:border-1 transition-colors duration-200 ease-in-out focus:border-black bg-white appearance-none"
          />
        </div>
        <form
          name="categoryForm"
          id="categoryForm"
          ref={categoryRef}
          onChange={handleCategories}
          className="py-2 space-y-1"
        >
          {uniqueCategories.slice(0, 5).map((category, i) => (
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
                className="ring-1 checked:bg-black checked:ring-black bg-white ring-gray-400 relative block px-2 py-2 mr-2 rounded-[4px] appearance-none"
              />
              <HiCheck className="absolute text-white" />
              {category[0].toUpperCase() + category.slice(1).toLowerCase()}
            </label>
          ))}
        </form>
      </div>
    </div>
  )
}
