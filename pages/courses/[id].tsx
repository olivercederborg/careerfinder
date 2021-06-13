import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
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
  const { filteredCourses, useFilter } = useFilters()
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
  const [difficulties, setDifficulties] = useState([])
  const [pricing, setPricing] = useState([])
  const [courseCategories, setCourseCategories] = useState([])
  const [filteredCourseCategories, setFilteredCourseCategories] = useState([])
  const [filteredCourseDifficulties, setFilteredCourseDifficulties] = useState(
    []
  )
  const [filteredCoursePricing, setFilteredCoursePricing] = useState([])

  useEffect(() => setMounted(true), [])

  useEffect(() => setCourses(category.courses), [category])

  useEffect(() => {
    useFilter(
      courses,
      filteredCourseCategories.length && filteredCourseCategories,
      filteredCourseDifficulties.length && filteredCourseDifficulties,
      filteredCoursePricing.length && filteredCoursePricing
    )
  }, [
    filteredCourseCategories,
    filteredCourseDifficulties,
    filteredCoursePricing,
  ])

  useEffect(() => {
    if (mounted) {
      if (
        filteredCourseCategories.length ||
        filteredCourseDifficulties.length ||
        filteredCoursePricing.length
      ) {
        const courseCategoryUrlParams = filteredCourseCategories
          .join(',')
          .toLowerCase()

        const difficultyUrlParams = filteredCourseDifficulties
          .join(',')
          .toLowerCase()

        const pricingUrlParams = filteredCoursePricing.join(',').toLowerCase()

        if (
          courseCategoryUrlParams.length &&
          !difficultyUrlParams.length &&
          !pricingUrlParams.length
        ) {
          router.push(`?categories=${courseCategoryUrlParams}`, undefined, {
            shallow: true,
          })
        } else if (
          !courseCategoryUrlParams.length &&
          difficultyUrlParams.length &&
          !pricingUrlParams.length
        ) {
          router.push(`?difficulties=${difficultyUrlParams}`, undefined, {
            shallow: true,
          })
        } else if (
          !courseCategoryUrlParams.length &&
          !difficultyUrlParams.length &&
          pricingUrlParams.length
        ) {
          router.push(`?pricing=${pricingUrlParams}`, undefined, {
            shallow: true,
          })
        } else if (
          courseCategoryUrlParams.length &&
          difficultyUrlParams.length &&
          pricingUrlParams.length
        ) {
          router.push(
            `?categories=${courseCategoryUrlParams}&difficulties=${difficultyUrlParams}&pricing=${pricingUrlParams}`,
            undefined,
            {
              shallow: true,
            }
          )
        } else if (
          !courseCategoryUrlParams.length &&
          difficultyUrlParams.length &&
          pricingUrlParams.length
        ) {
          router.push(
            `?difficulties=${difficultyUrlParams}&pricing=${pricingUrlParams}`,
            undefined,
            {
              shallow: true,
            }
          )
        } else if (
          courseCategoryUrlParams.length &&
          !difficultyUrlParams.length &&
          pricingUrlParams.length
        ) {
          router.push(
            `?categories=${courseCategoryUrlParams}&pricing=${pricingUrlParams}`,
            undefined,
            {
              shallow: true,
            }
          )
        } else if (
          courseCategoryUrlParams.length &&
          difficultyUrlParams.length &&
          !pricingUrlParams.length
        ) {
          router.push(
            `?categories=${courseCategoryUrlParams}&difficulties=${difficultyUrlParams}`,
            undefined,
            {
              shallow: true,
            }
          )
        }
      } else if (
        !filteredCourseCategories.length &&
        !filteredCourseDifficulties.length &&
        !filteredCoursePricing.length
      ) {
        router.push(query.id, undefined, { shallow: true })
      }
    }
  }, [
    filteredCourseCategories,
    filteredCourseDifficulties,
    filteredCoursePricing,
  ])

  useEffect(() => {
    if (mounted && !query?.categories) {
      setFilteredCourseCategories([])
      setFilteredCourseDifficulties([])
      setFilteredCoursePricing([])
    }
  }, [query?.id])

  useEffect(() => {
    if (mounted && query?.categories) {
      setFilteredCourseCategories(query?.categories?.split(','))
    }
  }, [query?.categories])

  useEffect(() => {
    if (mounted && query?.difficulties) {
      setFilteredCourseDifficulties(query?.difficulties?.split(','))
    }
  }, [query?.difficulties])

  useEffect(() => {
    if (mounted && query?.prices) {
      setFilteredCoursePricing(query?.prices?.split(','))
    }
  }, [query?.prices])

  useEffect(() => {
    let categoriesArray = []

    if (allCourses) {
      allCourses.forEach((courseCategory) => {
        categoriesArray.push(courseCategory?.category)
        setCategories(categoriesArray)
      })
    }
  }, [allCourses])

  useEffect(() => {
    let courseCategoriesArray = []
    let difficultiesArray = []
    let pricingArray = []

    if (category) {
      category?.courses.forEach((course) => {
        if (!difficultiesArray.includes(course.difficulty)) {
          difficultiesArray.push(course.difficulty)
        }

        if (course.cost > 0 && !pricingArray.includes('Paid')) {
          pricingArray.push('Paid')
        } else if (course.cost == 0 && !pricingArray.includes('Free')) {
          pricingArray.push('Free')
        }

        course.categories.forEach((item) => {
          if (!courseCategoriesArray.includes(item)) {
            courseCategoriesArray.push(item)
          }
        })

        setCourseCategories(courseCategoriesArray)
        setDifficulties(difficultiesArray)
        setPricing(pricingArray)
      })
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
        <section className="rounded-xl container my-12 overflow-x-auto shadow-lg">
          {filteredCourses.length ? (
            <CoursesTable
              inputCourses={filteredCourses}
              loadedCoursesAmount={loadedCoursesAmount}
            />
          ) : !filteredCourses.length &&
            (filteredCourseCategories.length ||
              filteredCourseDifficulties.length) ? (
            <h2 className="py-8 text-xl text-center">
              Sorry! We found no courses matching your filters.
            </h2>
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
