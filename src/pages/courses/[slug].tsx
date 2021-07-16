import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import axios from 'axios'
import { useQuery } from 'react-query'

import Navbar from 'components/Navbar'
import CourseFiltersShell from 'components/CourseFiltersShell'
import CoursesTable from 'components/CoursesTable'
import CategoryFilter from 'components/CategoryFilter'
import CheckboxFilter from 'components/CheckboxFilter'
import LoadMoreButton from 'components/LoadMoreButton'
import SearchBar from 'components/SearchBar'
import useFilters from 'hooks/useCourseFilter'
import { setCoursesUrlParams } from 'helpers/setUrlParams'
import { groq } from 'next-sanity'
import { sanity } from 'lib/sanity'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'

type StaticProps = {
  course: unknown
  category: any
}

export const getStaticPaths: GetStaticPaths = async () => {
  const courses = await sanity().fetch<{ slug: string }[]>(
    groq`*[_type == 'course' && defined(slug.current)]{
      "slug": slug.current
    }`
  )

  return {
    paths: courses.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params,
}) => {
  const { slug } = params

  const course = await sanity().fetch<{}>(
    groq`*[_type == 'course' && defined(slug.current) && slug.current == '${slug}'][0]{
      name,
      "slug": slug.current,
    }`
  )

  return {
    props: {
      course,
      category: {
        courses: [],
      },
    },
  }
}

export default function CoursesPage({
  course,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const fetched = {
    data: [],
  }

  const router = useRouter()
  const { query }: any = useRouter()
  const { filteredCourses, useFilter, useSearchFilter } = useFilters()

  const [mounted, setMounted] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState('')
  const [courses, setCourses] = useState(category?.courses || [])
  const [coursesBySearch, setCoursesBySearch] = useState(
    useSearchFilter(category?.courses, searchValue)
  )
  const [loadedCoursesAmount, setLoadedCoursesAmount] = useState<number>(10)
  const [categories, setCategories] = useState([])
  const [difficulties, setDifficulties] = useState([])
  const [pricing, setPricing] = useState([])
  const [courseCategories, setCourseCategories] = useState([])
  const [filteredCourseCategories, setFilteredCourseCategories] = useState([])
  const [filteredCourseDifficulties, setFilteredCourseDifficulties] = useState(
    []
  )
  const [filteredCoursePricing, setFilteredCoursePricing] = useState([])

  const allCourses = fetched?.data

  useEffect(() => setMounted(true), [])

  useEffect(() => setCourses(category.courses), [category])

  // Filter courses by inputs.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFilter(
      courses,
      filteredCourseCategories || null,
      filteredCourseDifficulties || null,
      filteredCoursePricing || null
    )
  }, [
    courses,
    filteredCourseCategories,
    filteredCourseDifficulties,
    filteredCoursePricing,
    useFilter,
  ])

  // Set filtering URL params when filters change.
  useEffect(() => {
    if (mounted) {
      setCoursesUrlParams(
        router,
        query,
        filteredCourseCategories || null,
        filteredCourseDifficulties || null,
        filteredCoursePricing || null
      )
    }
  }, [
    filteredCourseCategories,
    filteredCourseDifficulties,
    filteredCoursePricing,
    mounted,
    query,
    router,
  ])

  // Reset filters when changing overall category.
  useEffect(() => {
    if (
      mounted &&
      !query?.categories &&
      !query?.difficulties &&
      !query?.pricing
    ) {
      setFilteredCourseCategories([])
      setFilteredCourseDifficulties([])
      setFilteredCoursePricing([])
    }
  }, [
    mounted,
    query?.categories,
    query?.difficulties,
    query.id,
    query?.pricing,
  ])

  useEffect(() => {
    if (mounted && query?.categories) {
      setFilteredCourseCategories(query?.categories?.split(','))
    }
  }, [mounted, query?.categories])

  useEffect(() => {
    if (mounted && query?.difficulties) {
      setFilteredCourseDifficulties(query?.difficulties?.split(','))
    }
  }, [mounted, query?.difficulties])

  useEffect(() => {
    if (mounted && query?.prices) {
      setFilteredCoursePricing(query?.prices?.split(','))
    }
  }, [mounted, query?.prices])

  useEffect(() => {
    if (allCourses) {
      setCategories(() =>
        allCourses.map((courseCategory) => courseCategory.category)
      )
    }
  }, [allCourses])

  useEffect(() => {
    let courseCategoriesArray = []
    let difficultiesArray = []
    let pricingArray = []

    if (category) {
      category?.courses.forEach((course) => {
        course.categories.forEach((item) => {
          if (!courseCategoriesArray.includes(item)) {
            courseCategoriesArray.push(item)
          }
        })

        if (!difficultiesArray.includes(course.difficulty)) {
          difficultiesArray.push(course.difficulty)
        }

        if (course.cost > 0 && !pricingArray.includes('Paid')) {
          pricingArray.push('Paid')
        } else if (course.cost == 0 && !pricingArray.includes('Free')) {
          pricingArray.push('Free')
        }
      })

      setCourseCategories(courseCategoriesArray)
      setDifficulties(difficultiesArray)
      setPricing(pricingArray)
    }
  }, [category])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFilter(
      courses,
      filteredCourseCategories.length && filteredCourseCategories,
      filteredCourseDifficulties.length && filteredCourseDifficulties,
      filteredCoursePricing.length && filteredCoursePricing
    )
  }, [
    courses,
    filteredCourseCategories,
    filteredCourseDifficulties,
    filteredCoursePricing,
    useFilter,
  ])

  useEffect(() => {
    setCoursesBySearch(() =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useSearchFilter(filteredCourses || courses, searchValue)
    )
  }, [searchValue, filteredCourses, useSearchFilter, courses])

  useEffect(() => {
    if (mounted) {
      setCoursesUrlParams(
        router,
        query,
        filteredCourseCategories || null,
        filteredCourseDifficulties || null,
        filteredCoursePricing || null
      )
    }
  }, [
    filteredCourseCategories,
    filteredCourseDifficulties,
    filteredCoursePricing,
    mounted,
    query,
    router,
  ])

  useEffect(() => {
    if (mounted && query?.categories)
      setFilteredCourseCategories(query?.categories?.split(','))
  }, [mounted, query?.categories])

  useEffect(() => {
    if (mounted && query?.difficulties)
      setFilteredCourseDifficulties(query?.difficulties?.split(','))
  }, [mounted, query?.difficulties])

  useEffect(() => {
    if (mounted && query?.pricing)
      setFilteredCoursePricing(query?.pricing?.split(','))
  }, [mounted, query?.pricing])

  return (
    <>
      <Head>
        <title>Courses - CareerFinder</title>
      </Head>

      <Navbar />

      <main className="pb-12">
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
            <CategoryFilter input={categories}>
              {category?.category || 'All Categories'}
            </CategoryFilter>
          </div>

          <div className="md:flex-auto flex flex-col items-start w-full font-medium md:max-w-[45%] lg:max-w-[232px]">
            Course Categories
            <CheckboxFilter
              input={courseCategories}
              filteredInput={filteredCourseCategories}
              setFilteredInput={(input) => setFilteredCourseCategories(input)}
            >
              All Categories
            </CheckboxFilter>
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
          <label htmlFor="search-bar" className="md:w-72 inline-block w-full">
            Search
            <SearchBar
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              placeholderText="Search courses"
              eleId="search-bar"
            />
          </label>
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
            (filteredCourseCategories.length ||
              filteredCourseDifficulties.length ||
              filteredCoursePricing)) ? (
            <h2 className="py-8 text-xl text-center">
              Sorry! We found no courses matching your filters.
            </h2>
          ) : null}

          {!searchValue && filteredCourses.length ? (
            <CoursesTable
              inputCourses={filteredCourses}
              loadedCoursesAmount={loadedCoursesAmount}
            />
          ) : (!searchValue && !filteredCourseCategories) ||
            (!searchValue && !filteredCourseDifficulties) ||
            (!searchValue && !filteredCoursePricing) ? (
            <CoursesTable
              inputCourses={courses}
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
        ) : !filteredCourses.length && courses?.length > loadedCoursesAmount ? (
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
