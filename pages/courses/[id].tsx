import { useEffect, useState } from 'react'
import { NextRouter, useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'
import { useQuery } from 'react-query'

import Navbar from '@components/Navbar'
import CourseFiltersShell from '@components/CourseFiltersShell'
import CoursesTable from '@components/CoursesTable'
import CategoryFilter from '@components/CategoryFilter'
import CheckboxFilter from '@components/CheckboxFilter'
import LoadMoreButton from '@components/LoadMoreButton'
import useFilters from '../../hooks/useCourseFilter'

export async function getStaticPaths() {
  const res = await axios(`http://localhost:8000/courses/`)
  const data = res.data

  const paths = data.map((item) => {
    return {
      params: { id: item.id.toString() },
    }
  })

  return {
    paths,
    fallback: false,
  }
}
export async function getStaticProps(ctx) {
  const id = ctx.params.id
  const res = await axios(`http://localhost:8000/courses/${id}`)
  const data = res.data

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { data },
  }
}

export default function CoursesPage({ data: category }) {
  const { filteredCourses, useFilterByCategory } = useFilters()
  const { query }: any = useRouter()
  const router = useRouter()

  const {
    isLoading: isLoadingCourses,
    error: coursesError,
    data: fetched,
  } = useQuery('fetchCourses', () => axios('http://localhost:8000/courses/'))

  const allCourses = fetched?.data

  const [mounted, setMounted] = useState<boolean>(false)
  const [loadedCoursesAmount, setLoadedCoursesAmount] = useState<number>(10)
  const [courses, setCourses] = useState(category?.courses || [])
  const [categories, setCategories] = useState([])
  const [courseCategories, setCourseCategories] = useState([])
  const [filteredCourseCategories, setFilteredCourseCategories] = useState([])
  const [urlCourseCategories, setUrlCourseCategories] = useState(
    query?.categories ?? []
  )

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    useFilterByCategory(courses, filteredCourseCategories)
    console.log(filteredCourses)
  }, [filteredCourseCategories])

  useEffect(() => {
    if (mounted) {
      if (filteredCourseCategories.length) {
        let urlParams = filteredCourseCategories.join(',')
        router.push(`?categories=${urlParams}`, undefined, { shallow: true })
      } else if (!filteredCourseCategories.length) {
        router.push(query.id, undefined, { shallow: true })
      }
    }
  }, [filteredCourseCategories])

  useEffect(() => {
    if (mounted && !query?.categories) {
      setFilteredCourseCategories([])
    }
  }, [query?.id])

  useEffect(() => {
    if (query.categories) setUrlCourseCategories(query?.categories?.split(','))
    else setUrlCourseCategories([])

    if (mounted && query?.categories) {
      setFilteredCourseCategories(query?.categories?.split(','))
    }
  }, [query?.categories])

  useEffect(() => setCourses(category.courses), [category])

  useEffect(() => {
    let categoriesArray = []

    if (allCourses) {
      allCourses.forEach((category) => {
        categoriesArray.push(category?.category)

        setCategories(categoriesArray)
      })
    }
  }, [allCourses])

  useEffect(() => {
    let courseCategoriesArray = []

    if (category) {
      category?.courses.forEach((course) => {
        course.categories.forEach((item) => {
          if (!courseCategoriesArray.includes(item))
            courseCategoriesArray.push(item)
        })

        setCourseCategories(courseCategoriesArray)
      })
      console.log(courseCategoriesArray)
    }
  }, [category])

  return (
    <>
      <Head>
        <title>Courses - CareerFinder</title>

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
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
            {/* <CheckboxFilter>All Difficulties</CheckboxFilter> */}
          </div>
          <div className="md:flex-auto flex flex-col items-start w-full font-medium md:max-w-[45%] lg:max-w-[232px]">
            Price
            {/* <CheckboxFilter>All Prices</CheckboxFilter> */}
          </div>
        </CourseFiltersShell>

        <section className="rounded-xl container my-12 overflow-x-auto shadow-lg">
          {filteredCourses.length ? (
            <CoursesTable
              inputCourses={filteredCourses}
              loadedCoursesAmount={loadedCoursesAmount}
            />
          ) : (
            <CoursesTable
              inputCourses={courses}
              loadedCoursesAmount={loadedCoursesAmount}
            />
          )}
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
