import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'

import CategoryFilter from '@components/CategoryFilter'
import CheckboxFilter from '@components/CheckboxFilter'
import CourseFiltersShell from '@components/CourseFiltersShell'
import Navbar from '@components/Navbar'

export async function getStaticProps() {
  const res = await axios(`http://localhost:8000/courses`)
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

export default function CoursesPage({ data }) {
  const router = useRouter()
  const { query } = useRouter()

  const [loadedCoursesAmount, setLoadedCoursesAmount] = useState(10)
  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [categoriesFiltered, setCategoriesFiltered] = useState([])
  const [courseCategories, setCourseCategories] = useState([])

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
            <CategoryFilter
              input={categories}
              inputFiltered={categoriesFiltered}
              setInputFiltered={setCategoriesFiltered}
            >
              All Categories
            </CategoryFilter>
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
          <section className="rounded-xl container my-12 overflow-x-auto shadow-lg">
            <table className="md:table-auto w-full overflow-hidden text-left border-collapse divide-y table-fixed">
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
                      <Link key={i} href="https://google.com">
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
                              <img
                                src={course.publisherLogo}
                                alt=""
                                className="h-11 w-11 rounded-xl mr-4 shadow-lg"
                              />
                              <div className="flex flex-col">
                                <p>{course.name}</p>
                                <p className="text-gray-main text-sm font-medium">
                                  By {course.publisher}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-10 py-6">
                            <p className="inline-block mr-3">
                              {course?.categories?.slice(0, 2).join(', ')}
                            </p>
                            {course?.categories?.length > 2 ? (
                              <span className="inline-block px-2 py-1 text-sm text-gray-600 bg-gray-200 rounded-lg">
                                +{course?.categories?.length - 2} more
                              </span>
                            ) : (
                              ''
                            )}
                          </td>
                          <td className="px-10 py-6">{course.difficulty}</td>
                          <td className="px-10 py-6">
                            <span className="w-[64px] inline-flex justify-center items-center py-1 text-sm font-medium text-white bg-black rounded-lg">
                              {course.cost
                                ? `$${Math.round(course.cost)}`
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
            className="rounded-xl flex px-6 py-4 mx-auto my-4 text-center text-white bg-black"
          >
            Load 2 more
          </button>
        )}
      </main>
    </>
  )
}
