import Head from 'next/head'
import { RiSearchLine, RiShuffleFill } from 'react-icons/ri'
import { FiChevronDown } from 'react-icons/fi'
import { HiCheck } from 'react-icons/hi'

import { careers } from '../../careers'
import Navbar from '../components/Navbar'
import { useEffect, useRef, useState } from 'react'
import CareerCard from '../components/CareerCard'
import SearchBar from '../components/SearchBar'
import CategoryDropdown from '../components/CategoryDropdown'

export default function Home() {
  const [searchValue, setSearchValue] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [careersFiltered, setCareersFiltered] = useState([])

  useEffect(() => {
    if (searchValue) {
      setSearchResults(
        careers.filter((career) =>
          career.name.toLowerCase().includes(searchValue?.toLowerCase())
        )
      )
    } else {
      setSearchResults([])
    }
  }, [searchValue])

  return (
    <>
      <Head>
        <title>Home - CareerFinder</title>

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Navbar />

      <header className="bg-hero-image py-80 relative text-center bg-black bg-center bg-no-repeat bg-cover">
        <article className="bg-opacity-70 absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center bg-black">
          <div className="xl:container xl:px-0 xl:mx-auto md:mt-0 px-6 -mt-32">
            <h2 className="md:text-5xl text-4xl font-semibold text-white">
              Start a New Career in Six Months.
            </h2>
            <p className="mt-5 text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              <br />
              Optio est, molestias iure repellendus inventore repudiandae
              delectus aliquid ea voluptate deleniti.
            </p>
            <button className="rounded-xl hover:-translate-y-1 hover:shadow-lg md:w-auto self-center w-full px-12 py-4 mt-12 font-medium text-black transition-all duration-200 ease-in-out transform bg-white border-2 border-white">
              Generate Random Career
            </button>
          </div>
          <button className="rounded-xl group md:w-auto bottom-5 absolute left-0 right-0 flex flex-col items-center justify-center w-full px-12 py-4 mx-auto font-medium text-white transition-all duration-200 ease-in-out">
            Or Browse Careers
            <FiChevronDown className="mt-2 text-5xl transform" />
          </button>
        </article>
      </header>

      <main className="xl:container pb-32 mx-auto mt-16">
        <div className="bottom-8 fixed z-10 hidden w-screen px-6">
          <button className="rounded-xl shadow-yellow inline-flex items-center justify-center w-full py-4 font-semibold text-center text-white bg-yellow-500">
            Draw Random Career
            <RiShuffleFill className="ml-3 text-xl" />
          </button>
        </div>

        <div className="gap-y-8 md:gap-y-0 md:gap-x-10 xl:mx-0 grid grid-cols-12 pb-8 mx-6 border-b">
          <div className="md:col-span-6 relative flex flex-col justify-center col-span-12">
            <SearchBar
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              placeholderText="Search for careers"
            />
          </div>

          <div className="md:justify-start md:col-span-6 flex items-center justify-between col-span-12">
            <p className="text-base font-semibold uppercase">Category</p>

            <div className="flex items-center ml-6">
              <CategoryDropdown
                careers={careers}
                careersFiltered={careersFiltered}
                setCareersFiltered={setCareersFiltered}
              />
            </div>
          </div>
        </div>

        <section className="md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 4xl:grid-cols-7 xl:px-0 grid grid-cols-1 gap-10 px-6 mt-8">
          {searchResults &&
            searchResults.map((career, i) => (
              <CareerCard career={career} key={i} />
            ))}

          {careersFiltered.length && !searchValue && !searchResults.length
            ? careersFiltered.map((career, i) => (
                <CareerCard career={career} key={i} />
              ))
            : null}

          {!searchResults.length &&
            !searchValue &&
            !careersFiltered.length &&
            careers.map((career, i) => <CareerCard career={career} key={i} />)}

          {!searchResults.length && searchValue && !careersFiltered.length && (
            <div className="col-span-full min-h-[300px] flex flex-col justify-center">
              <p className="text-2xl leading-relaxed text-center">
                We have no careers matching this search… <br />
                Feel like trying your luck?
              </p>

              <button className="rounded-xl hover:-translate-y-1 hover:shadow-lg self-center px-12 py-4 mt-8 font-medium text-white transition-all duration-200 ease-in-out transform bg-black">
                Generate Random Career
              </button>

              <button
                className="hover:underline px-12 py-4 mt-4 font-medium transition-all duration-200 ease-in-out transform"
                onClick={() => {
                  setSearchValue(null)
                  careerSearchbar.current.value = null
                  careerSearchbar.current.focus()
                }}
              >
                Try searching again
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  )
}
