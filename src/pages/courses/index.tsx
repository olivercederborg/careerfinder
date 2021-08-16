import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import Navbar from 'components/Navbar'
import CourseFiltersShell from 'components/CourseFiltersShell'
import CoursesTable from 'components/CoursesTable'
import CategoryFilter from 'components/CategoryFilter'
import CheckboxFilter from 'components/CheckboxFilter'
import LoadMoreButton from 'components/LoadMoreButton'
import SearchBar from 'components/SearchBar'
import useFilters from 'hooks/useCourseFilter'
import { setSimpleCoursesUrlParams } from 'helpers/setUrlParams'
import { groq } from 'next-sanity'
import { sanity } from 'lib/sanity'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { capitalizeWords } from 'helpers/capitalizeWords'

type StaticProps = {
  categories: any
  initialCourses: any
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const categories = await sanity().fetch<{}>(
    groq`*[_type == 'discipline']{
      name,
      "slug": slug.current,
    }`
  )

  const initialCourses = await sanity().fetch<{}>(
    groq`*[_type == 'course']{
    name,
    "slug": slug.current,
    publisher,
    publisherImage,
    discipline->{
      name,
      "slug": slug.current,
    },
    price,
    link,
    courseCategories[]->{
      name,
      "slug": slug.current,
    },
    difficulty
    }`
  )

  return {
    props: {
      initialCourses,
      categories,
    },
    revalidate: 600,
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

function CoursesPage({ initialCourses, categories }: Props) {
  const router = useRouter()
  const { query }: any = useRouter()
  const { filteredCourses, useFilter, useSearchFilter } = useFilters()

  const [mounted, setMounted] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState('')
  const [loadedCoursesAmount, setLoadedCoursesAmount] = useState<number>(10)
  const [coursesBySearch, setCoursesBySearch] = useState(
    useSearchFilter(initialCourses, searchValue)
  )
  const [courseCategories, setCourseCategories] = useState<string[]>([])
  const [difficulties, setDifficulties] = useState([])
  const [pricing, setPricing] = useState([])
  const [filteredCourseCategories, setFilteredCourseCategories] = useState([])
  const [filteredCourseDifficulties, setFilteredCourseDifficulties] = useState(
    []
  )
  const [filteredCoursePricing, setFilteredCoursePricing] = useState([])

  useEffect(() => setMounted(true), [])

  // Filter courses by inputs.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFilter(
      initialCourses,
      null,
      (filteredCourseDifficulties.length && filteredCourseDifficulties) || null,
      (filteredCoursePricing.length && filteredCoursePricing) || null
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCourses, filteredCourseDifficulties, filteredCoursePricing])

  useEffect(() => {
    setCoursesBySearch(() =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useSearchFilter(filteredCourses || initialCourses, searchValue)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, filteredCourses, initialCourses])

  // Set filtering URL params when filters change.
  useEffect(() => {
    if (mounted) {
      setSimpleCoursesUrlParams(
        router,
        filteredCourseDifficulties || null,
        filteredCoursePricing || null
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredCourseDifficulties, filteredCoursePricing, mounted])

  // Reset filters when changing overall category.
  useEffect(() => {
    if (mounted && !query?.difficulties && !query?.pricing) {
      setFilteredCourseDifficulties([])
      setFilteredCoursePricing([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, query?.discipline])

  useEffect(() => {
    if (mounted && query?.difficulties) {
      let queryDifficulties = capitalizeWords(
        query?.difficulties?.replace('%20', ' ')
      )
      setFilteredCourseDifficulties(queryDifficulties.split(','))
    }
  }, [mounted, query?.difficulties])

  useEffect(() => {
    if (mounted && query?.pricing) {
      let queryPricing = capitalizeWords(query?.pricing)
      setFilteredCoursePricing(queryPricing.split(','))
    }
  }, [mounted, query?.pricing])

  useEffect(() => {
    let difficultiesArray = []
    let pricingArray = []

    if (mounted) {
      initialCourses.forEach((course) => {
        if (!difficultiesArray.includes(course.difficulty)) {
          difficultiesArray.push(course.difficulty)
        }

        if (
          !pricingArray.includes(
            course.price[0].toUpperCase() + course.price.slice(1).toLowerCase()
          )
        ) {
          if (course.price.toUpperCase() == 'FREE') pricingArray.push('Free')
          if (course.price && course.price.toUpperCase() != 'FREE')
            pricingArray.push('Paid')
        }
      })
    }

    setDifficulties(difficultiesArray)
    setPricing(pricingArray)
  }, [mounted, initialCourses])

  return (
    <>
      <Head>
        <title>Courses - Workish</title>
      </Head>

      <Navbar />

      <main className="px-4 pb-12">
        <section className="flex flex-col items-center justify-center px-6 my-32 space-y-4 text-center">
          <h2 className="text-4xl font-semibold">
            Browse the best courses for your career path.
          </h2>
          <h3 className="text-gray-main text-2xl font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h3>
        </section>

        <CourseFiltersShell>
          <div className="md:flex-auto flex flex-col items-start w-full font-medium md:max-w-[45%] lg:max-w-[232px]">
            Category
            <CategoryFilter input={categories}>All Categories</CategoryFilter>
          </div>

          <div className="md:flex-auto flex flex-col items-start w-full font-medium md:max-w-[45%] lg:max-w-[232px]">
            Difficulty
            <CheckboxFilter
              input={difficulties}
              filteredInput={filteredCourseDifficulties}
              setFilteredInput={(input) => setFilteredCourseDifficulties(input)}
            >
              All Difficulties
            </CheckboxFilter>
          </div>

          <div className="md:flex-auto flex flex-col items-start w-full font-medium md:max-w-[45%] lg:max-w-[232px]">
            Pricing
            <CheckboxFilter
              input={pricing}
              filteredInput={filteredCoursePricing}
              setFilteredInput={(input) => setFilteredCoursePricing(input)}
            >
              Free &amp; Paid
            </CheckboxFilter>
          </div>
        </CourseFiltersShell>

        <section className="container mt-8">
          <div className="md:w-72">
            <label htmlFor="search-bar" className="block mb-2">
              Search
            </label>
            <SearchBar
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              placeholderText="Search courses"
              eleId="search-bar"
            />
          </div>
        </section>

        <section className="rounded-xl container my-12 overflow-x-auto shadow-lg">
          {searchValue && coursesBySearch.length ? (
            <CoursesTable
              inputCourses={coursesBySearch}
              loadedCoursesAmount={loadedCoursesAmount}
            />
          ) : null}

          {(searchValue && !coursesBySearch.length) ||
          (!searchValue &&
            !filteredCourses.length &&
            (filteredCourseDifficulties.length || filteredCoursePricing)) ? (
            <h2 className="py-8 text-xl text-center">
              Sorry! We found no courses matching your filters.
            </h2>
          ) : null}

          {!searchValue && filteredCourses.length ? (
            <CoursesTable
              inputCourses={filteredCourses}
              loadedCoursesAmount={loadedCoursesAmount}
            />
          ) : (!searchValue && !filteredCourseDifficulties) ||
            (!searchValue && !filteredCoursePricing) ? (
            <CoursesTable
              inputCourses={initialCourses}
              loadedCoursesAmount={loadedCoursesAmount}
            />
          ) : null}
        </section>

        {filteredCourses.length > loadedCoursesAmount ? (
          <LoadMoreButton
            increaseBy={10}
            loadedAmount={loadedCoursesAmount}
            setLoadedAmount={setLoadedCoursesAmount}
          />
        ) : !filteredCourses.length &&
          initialCourses?.length > loadedCoursesAmount ? (
          <LoadMoreButton
            increaseBy={10}
            loadedAmount={loadedCoursesAmount}
            setLoadedAmount={setLoadedCoursesAmount}
          />
        ) : null}
      </main>
    </>
  )
}

export default CoursesPage
