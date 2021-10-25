import Head from 'next/head'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useEffect, useState } from 'react'
import { RiShuffleFill } from 'react-icons/ri'
import { FiChevronDown } from 'react-icons/fi'
import sample from 'lodash/sample'
import Fuse from 'fuse.js'

import Navbar from 'components/Navbar'
import SearchBar from 'components/SearchBar'
import CategoryDropdown from 'components/CategoryDropdown'
import CareerCard from 'components/CareerCard'
import { sanity } from 'lib/sanity'
import { groq } from 'next-sanity'
import { FrontpageCareer, Category, GeneratedCareer } from 'types'
import Modal from 'components/Modal'
import { useQuery } from 'react-query'
import Link from 'next/link'
import { formatCurrency } from 'helpers/formatCurrency'

type StaticProps = {
  careers: FrontpageCareer[]
  categories: Category[]
}

const careersQuery = groq`*[_type == 'job']{
  "createdAt": _createdAt,
  name,
  "slug": slug.current,
  banner,
  time,
  salary,
  currency,
  "discipline": discipline->name,
}`

const categoriesQuery = groq`*[_type == 'discipline']{
  name,
  "slug": slug.current,
}`

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const careers = await sanity().fetch<StaticProps['careers']>(careersQuery)

  const categories = await sanity().fetch<StaticProps['categories']>(
    categoriesQuery
  )

  return {
    props: {
      careers,
      categories,
    },
    revalidate: 600,
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({
  careers,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [searchValue, setSearchValue] = useState<any>('')
  const [searchResults, setSearchResults] = useState([])
  const [careersFiltered, setCareersFiltered] = useState([])
  const [generatedCareer, setGeneratedCareer] =
    useState<GeneratedCareer | null>(null)

  const { data: generatedCareers }: { data: GeneratedCareer[] } = useQuery(
    '/api/generate-career'
  )

  const generateCareer = () => {
    setGeneratedCareer(sample(generatedCareers))
  }

  console.log(careers)

  const fuse = new Fuse(careers, {
    keys: ['name', 'discipline'],
    threshold: 0.4,
  })
  useEffect(() => {
    if (searchValue) {
      const results = fuse.search(searchValue)
      console.log(results)
      setSearchResults(results.map((result) => result.item))
    } else {
      setSearchResults([])
    }
  }, [careers, searchValue])

  return (
    <>
      <Head>
        <title>Home - Workish</title>
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

            <Modal buttonText="Generate Random Career" action={generateCareer}>
              <div className="text-center">
                <h3 className="text-lg font-semibold">
                  Randomly Generated Career
                </h3>
                <p className="mt-8 text-2xl font-semibold">
                  {generatedCareer?.name}
                </p>
                <p className="mt-2 px-3 py-[6px] text-sm font-medium bg-black text-white rounded-lg group-hover:bg-white group-hover:text-black transition-all duration-200 ease-in-out inline-block">
                  {generatedCareer?.discipline}
                </p>
                <p className="mt-6">
                  Start earning{' '}
                  <span className="font-semibold">
                    {!!generatedCareer &&
                      formatCurrency(
                        generatedCareer?.salary,
                        generatedCareer?.currency
                      )}
                  </span>{' '}
                  in{' '}
                  <span className="font-semibold">{generatedCareer?.time}</span>
                </p>

                <Link href={'/' + generatedCareer?.slug}>
                  <a className="rounded-xl inline-block md:max-w-[300px] hover:-translate-y-1 hover:shadow-lg self-center w-full px-12 py-4 mt-10 font-medium text-white transition-all duration-200 ease-in-out transform bg-black">
                    Go to career
                  </a>
                </Link>
              </div>
            </Modal>
          </div>
          <a
            href="#browse-careers"
            className="rounded-xl group md:w-auto bottom-5 absolute left-0 right-0 flex flex-col items-center justify-center w-full px-12 py-4 mx-auto font-medium text-white transition-all duration-200 ease-in-out"
          >
            Or Browse Careers
            <FiChevronDown className="mt-2 text-5xl transform" />
          </a>
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
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            placeholderText="Search for careers"
            className="md:col-span-6 relative flex flex-col justify-center col-span-12"
          />

          <div className="md:justify-start md:col-span-6 flex items-center justify-between col-span-12">
            <p className="text-base font-semibold uppercase">Category</p>

            <div className="flex items-center ml-6">
              <CategoryDropdown
                careers={careers}
                categories={categories}
                careersFiltered={careersFiltered}
                setCareersFiltered={setCareersFiltered}
              />
            </div>
          </div>
        </div>

        <section
          id="browse-careers"
          className="md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 4xl:grid-cols-7 xl:px-0 grid grid-cols-1 gap-10 px-6 mt-8"
        >
          {searchResults?.map((career, i) => (
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
                  setSearchValue('')
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
