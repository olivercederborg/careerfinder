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
import { setCoursesUrlParams } from 'helpers/setUrlParams'
import { groq } from 'next-sanity'
import { sanity } from 'lib/sanity'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { capitalizeWords } from 'helpers/capitalizeWords'
import Fuse from 'fuse.js'
import { Course, Discipline, SingleCareer } from 'types'

type StaticProps = {
  category: Discipline
  categories: any
  initialCourses: Course[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const courses = await sanity().fetch<{ discipline: string }[]>(
    groq`*[_type == 'course' && defined(discipline)]{
      "discipline": discipline->slug.current
    }`
  )

  return {
    paths: courses.map(({ discipline }) => ({
      params: {
        discipline,
      },
    })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { discipline } = params

  const category = await sanity().fetch<{}>(
    groq`*[_type == 'discipline' && defined(slug.current) && slug.current == '${discipline}'][0]{
      name,
      "slug": slug.current,
      heroTitle,
      heroSubtitle,
      seoTitle,
      seoDescription
    }`
  )

  const categories = await sanity().fetch<{}>(
    groq`*[_type == 'discipline']{
      name,
      "slug": slug.current,
    }`
  )

  const initialCourses = await sanity().fetch<{}>(
    groq`*[_type == 'course' && defined(discipline) && discipline->slug.current == '${discipline}']{
    name,
    "slug": slug.current,
    publisher,
    publisherImage,
    discipline->{
      name,
      "slug": slug.current,
    },
    isNew,
    isHot,
    isFree,
    price,
    currency,
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
      category,
      categories,
      initialCourses,
    },
    revalidate: 600,
  }
}

export default function CoursesPage({
  category,
  categories,
  initialCourses,
}: StaticProps) {
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

  const fuse = new Fuse(filteredCourses || initialCourses, {
    keys: ['name', 'publisher'],
  })

  useEffect(() => setMounted(true), [])

  // Filter courses by inputs.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFilter(
      initialCourses,
      (filteredCourseCategories.length && filteredCourseCategories) || null,
      (filteredCourseDifficulties.length && filteredCourseDifficulties) || null,
      (filteredCoursePricing.length && filteredCoursePricing) || null
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    initialCourses,
    filteredCourseCategories,
    filteredCourseDifficulties,
    filteredCoursePricing,
  ])

  useEffect(() => {
    const results = fuse.search(searchValue)
    setCoursesBySearch(results.map((result) => result.item))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, filteredCourses, initialCourses])

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filteredCourseCategories,
    filteredCourseDifficulties,
    filteredCoursePricing,
    mounted,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, query?.discipline])

  useEffect(() => {
    if (mounted && query?.categories) {
      let queryCategories = capitalizeWords(
        query?.categories?.replace('%20', ' ')
      )

      setFilteredCourseCategories(queryCategories.split(','))
    }
  }, [mounted, query?.categories])

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
    let courseCategoriesArray = []
    let difficultiesArray = []
    let pricingArray = []

    if (mounted) {
      initialCourses.forEach((course) => {
        course.courseCategories.forEach((category) => {
          if (!courseCategoriesArray.includes(category.name)) {
            courseCategoriesArray.push(category.name)
          }
        })

        if (!difficultiesArray.includes(course.difficulty)) {
          difficultiesArray.push(course.difficulty)
        }

        if (course.isFree && !pricingArray.includes('Free'))
          pricingArray.push('Free')
        if (!course.isFree && !pricingArray.includes('Paid'))
          pricingArray.push('Paid')
      })
    }

    setCourseCategories(courseCategoriesArray)
    setDifficulties(difficultiesArray)
    setPricing(pricingArray)
  }, [mounted, initialCourses])

  return (
    <>
      <Head>
        <title>
          {category.seoTitle ?? `${category.name} Courses`} - Workish
        </title>
        <meta name="description" content={category.seoDescription} />

        {/* Facebook */}
        <meta
          property="og:url"
          content={`https://workish.io/${category.slug}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${
            category?.seoTitle ?? `${category.name} Courses`
          } - Workish`}
        />
        <meta property="og:description" content={category?.seoDescription} />
        {/* <meta property="og:image" content={`${bannerImageProps?.src}`} /> */}

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="workish.io" />
        <meta
          property="twitter:url"
          content={`https://workish.io/${category.slug}`}
        />
        <meta
          name="twitter:title"
          content={`${
            category?.seoTitle ?? `${category.name} Courses`
          } - Workish`}
        />
        <meta name="twitter:description" content={category?.seoDescription} />
        {/* <meta name="twitter:image" content={`${bannerImageProps.src}`} /> */}
      </Head>

      <Navbar />

      <main className="px-4 pb-12">
        <section className="flex flex-col items-center justify-center px-6 my-32 space-y-4 text-center">
          <h2 className="text-4xl font-semibold">
            {category.heroTitle ??
              'Browse the best courses for your career path.'}
          </h2>
          <h3 className="text-gray-main text-2xl font-medium">
            {category.heroSubtitle ??
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
          </h3>
        </section>

        <CourseFiltersShell>
          <div className="md:flex-auto flex flex-col items-start w-full font-medium md:max-w-[45%] lg:max-w-[232px]">
            Category
            <CategoryFilter input={categories}>{category.name}</CategoryFilter>
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
              All Pricings
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
