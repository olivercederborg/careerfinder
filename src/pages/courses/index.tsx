import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import CategoryFilter from 'components/CategoryFilter'
import CourseFiltersShell from 'components/CourseFiltersShell'
import Navbar from 'components/Navbar'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { imageBuilder, sanity } from 'lib/sanity'
import { groq } from 'next-sanity'
import Image from 'next/image'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

type StaticProps = {
  courses: {
    name: string
    slug: string
    hot: boolean
    isNew: boolean
    publisher: string
    publisherImage: SanityImageSource
    price: string
    courseCategories: {
      name: string
      slug: string
    }[]
    difficulty: string
  }[]
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const courses = await sanity().fetch(groq`*[_type == 'course']{
    name,
    "slug": slug.current,
    publisher,
    publisherImage,
    price,
    courseCategories[]->{
      name,
      "slug": slug.current,
    },
    difficulty
  }`)

  return {
    props: {
      courses,
    },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

function CoursesPage({ courses: staticCourses }: Props) {
  const [loadedCoursesAmount, setLoadedCoursesAmount] = useState(10)
  const [courses, setCourses] = useState(staticCourses)
  const [categories, setCategories] = useState([])

  const data = useMemo(() => [], [])

  useEffect(() => {
    let coursesArray = []
    let categoriesArray = []

    data.forEach((category) => {
      category.courses.forEach((item) => coursesArray.push(item))
      categoriesArray.push(category.category)

      setCourses(coursesArray)
      setCategories(categoriesArray)
    })
  }, [data])

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
          <h3 className="text-2xl font-medium text-gray-main">
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
            {/* <CheckboxFilter>All Difficulties</CheckboxFilter> */}
          </div>
          <div className="md:flex-auto flex flex-col items-start w-full font-medium md:max-w-[45%] lg:max-w-[232px]">
            Price
            {/* <CheckboxFilter>All Prices</CheckboxFilter> */}
          </div>
        </CourseFiltersShell>

        {data ? (
          <section className="container my-12 overflow-x-auto shadow-lg rounded-xl">
            <table className="w-full overflow-hidden text-left border-collapse divide-y table-fixed md:table-auto">
              <thead>
                <tr>
                  <th className="text-gray-main px-10 py-5 text-[15px] font-medium w-2/5 md:w-auto border-b">
                    Name
                  </th>
                  <th className="text-gray-main px-10 py-5 text-[15px] font-medium w-1/5 md:w-auto border-b">
                    Categories
                  </th>
                  <th className="text-gray-main px-10 py-5 text-[15px] font-medium w-1/5 md:w-auto border-b">
                    Difficulty
                  </th>
                  <th className="text-gray-main px-10 py-5 text-[15px] font-medium w-1/5 md:w-auto border-b">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="font-medium">
                {courses?.length
                  ? courses?.slice(0, loadedCoursesAmount).map((course, i) => (
                      <Link
                        key={course.slug}
                        href="https://google.com"
                        passHref
                      >
                        <tr
                          key={i}
                          className="border-t border-b cursor-pointer"
                        >
                          <td className="relative px-10 py-6 font-semibold">
                            <div className="flex items-center">
                              {course.hot || course.isNew ? (
                                <div
                                  className={`w-0 h-0 border-b-[40px] text-white flex items-start justify-center text-xs absolute left-0 top-0 transform -rotate-45 translate-x-[-26px] -translate-y-1.5 rounded-lg ${
                                    course.hot
                                      ? 'border-[#FFB931]'
                                      : 'border-black'
                                  }`}
                                  style={{
                                    borderRight: '40px solid transparent',
                                    borderLeft: '40px solid transparent',
                                  }}
                                >
                                  <span className="font-medium transform translate-y-[18px]">
                                    {course.hot ? 'HOT' : 'NEW'}
                                  </span>
                                </div>
                              ) : null}
                              <div className="flex items-center mr-4">
                                <Image
                                  src={imageBuilder(course.publisherImage)
                                    .size(44, 44)
                                    .auto('format')
                                    .url()}
                                  width={44}
                                  height={44}
                                  alt={course.publisher}
                                  className="shadow-lg h-11 w-11 rounded-xl"
                                />
                              </div>
                              <div className="flex flex-col">
                                <p>{course.name}</p>
                                <p className="text-sm font-medium text-gray-main">
                                  By {course.publisher}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-10 py-6">
                            <p className="inline-block mr-3">
                              {course.courseCategories
                                ?.slice(0, 2)
                                .map((category) => category.name)
                                .join(', ')}
                            </p>
                            {course.courseCategories?.length > 2 ? (
                              <span className="inline-block px-2 py-1 text-sm text-gray-600 bg-gray-200 rounded-lg">
                                +{course.courseCategories?.length - 2} more
                              </span>
                            ) : (
                              ''
                            )}
                          </td>
                          <td className="px-10 py-6">{course.difficulty}</td>
                          <td className="px-10 py-6">
                            <span className="w-[64px] inline-flex justify-center items-center py-1 text-sm font-medium text-white bg-black rounded-lg">
                              {parseInt(course.price, 10)
                                ? `$${Math.round(parseInt(course.price, 10))}`
                                : 'FREE'}
                            </span>
                          </td>
                        </tr>
                      </Link>
                    ))
                  : null}
              </tbody>
            </table>
          </section>
        ) : (
          <h1>No Data</h1>
        )}
        {courses?.length > loadedCoursesAmount && (
          <button
            onClick={() => setLoadedCoursesAmount(loadedCoursesAmount + 10)}
            className="flex px-6 py-4 mx-auto my-4 text-center text-white bg-black rounded-xl"
          >
            Load 2 more
          </button>
        )}
      </main>
    </>
  )
}

export default CoursesPage
