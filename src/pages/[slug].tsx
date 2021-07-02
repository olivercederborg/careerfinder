import Head from 'next/head'
import { RiSearchLine } from 'react-icons/ri'
import { BsFillLightningFill } from 'react-icons/bs'
import BlockContent from '@sanity/block-content-to-react'

import Navbar from '../components/Navbar'
import CareerChart from '../components/CareerChart'
import { useRef, useState } from 'react'
import CourseCard from '../components/CourseCard'
import { useEffect } from 'react'
import { sanity } from 'lib/sanity'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import type { Career } from 'types'

const courses = [
  {
    title: 'HTML/CSS',
    courses: [
      {
        name: 'The Basics of Web Development',
        publisher: 'Codecademy',
        publisherLogo:
          'https://pbs.twimg.com/profile_images/1314000477466636290/fwTNDGoi_400x400.jpg',
        cost: 'free',
      },
      {
        name: 'HTML/CSS In-depth Course',
        publisher: 'Udemy',
        publisherLogo:
          'https://i0.wp.com/sourceofapk.com/wp-content/uploads/2020/11/udemy-tv-apk-latest.jpg?fit=600%2C600&ssl=1',
        cost: '$50',
      },
    ],
  },
  {
    title: 'JavaScript',
    courses: [
      {
        name: 'The Basics of Web Development',
        publisher: 'Codecademy',
        publisherLogo:
          'https://pbs.twimg.com/profile_images/1314000477466636290/fwTNDGoi_400x400.jpg',
        cost: 'free',
      },
      {
        name: 'HTML/CSS In-depth Course',
        publisher: 'Udemy',
        publisherLogo:
          'https://pbs.twimg.com/profile_images/1314000477466636290/fwTNDGoi_400x400.jpg',
        cost: '$50',
      },
    ],
  },
  {
    title: 'React.js',
    courses: [
      {
        name: 'React.js Introduction',
        publisher: 'Codecademy',
        publisherLogo:
          'https://pbs.twimg.com/profile_images/1314000477466636290/fwTNDGoi_400x400.jpg',
        cost: 'free',
      },
      {
        name: 'React.js Crash Course',
        publisher: 'Codecademy',
        publisherLogo:
          'https://pbs.twimg.com/profile_images/1314000477466636290/fwTNDGoi_400x400.jpg',
        cost: '$50',
      },
      {
        name: 'React.js & Firebase Course',
        publisher: 'Udemy',
        publisherLogo:
          'https://i0.wp.com/sourceofapk.com/wp-content/uploads/2020/11/udemy-tv-apk-latest.jpg?fit=600%2C600&ssl=1',
        cost: '$100',
      },
    ],
  },
]

type StaticProps = {
  career: Career
}

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params,
}) => {
  const { slug } = params
  console.log(slug)

  let [career] = await sanity.getAll('job', `slug.current == "${slug}"`)

  console.log(career)

  let resolvedCareer: Career = {
    ...career,
    hot: Math.random() > 0.9,
    discipline: {
      ...(await sanity.expand(career.discipline)),
      ...career.discipline,
    },
    area: {
      ...(await sanity.expand(career.area)),
      ...career.area,
    },
    role: {
      ...(await sanity.expand(career.role)),
      ...career.role,
    },
  }

  return {
    props: {
      career: resolvedCareer,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async ({}) => {
  const careers = await sanity.getAll('job')

  return {
    paths: careers.map((career) => ({
      params: {
        slug: career.slug.current,
      },
    })),
    fallback: false,
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const CareerPage = ({ career }: Props) => {
  const sectionNav = useRef(null)
  const [sectionNavIsTop, setSectionNavIsTop] = useState(false)

  const stickySectionNav = () => {
    let sectionNavOffset = sectionNav?.current?.getBoundingClientRect().top
    if (sectionNavOffset == 0) {
      setSectionNavIsTop(true)
    } else {
      setSectionNavIsTop(false)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', stickySectionNav)
    }
    return () => {
      window.removeEventListener('scroll', stickySectionNav)
    }
  }, [])

  return (
    <>
      <Head>
        <title>{career.name} - CareerFinder</title>
      </Head>

      <Navbar />

      <main className="grid grid-cols-1 xl:container md:gap-x-4 xl:mx-auto md:grid-cols-12">
        <img
          src={'career.image'}
          alt={career.name}
          className="max-h-[450px] object-cover md:col-span-12 w-full xl:rounded-xl"
        />

        <article className="px-6 mt-7 md:mt-12 md:col-span-6 3xl:col-span-4">
          <h2 className="inline-flex items-center text-3xl font-semibold">
            {career.name}
            {career.hot && (
              <BsFillLightningFill className="ml-3 text-2xl text-yellow-400 filter drop-shadow-lightning" />
            )}
          </h2>
          <p className="font-semibold mt-7">Life of a {career.name}</p>
          <BlockContent
            blocks={career.description}
            className="mt-3 space-y-2"
          ></BlockContent>
          <img
            src={'career.imageTwo'}
            alt=""
            className="mt-8 rounded-xl h-[300px] object-cover w-full hidden md:block"
          />
        </article>

        <nav
          ref={sectionNav}
          aria-label="Section Navigation"
          className={`justify-evenly rounded-xl md:hidden sticky top-0 z-10 flex mx-6 mt-10 bg-white shadow-lg transition-all duration-200 ease-in-out ${
            sectionNavIsTop && 'mx-0 rounded-none'
          }`}
        >
          <a href="#courses" className="py-6 font-medium text-gray-main">
            Courses
          </a>
          <a href="#potential" className="py-6 font-medium text-gray-main">
            Potential
          </a>
          <a href="#jobs" className="py-6 font-medium text-gray-main">
            Jobs
          </a>
        </nav>

        <section
          id="courses"
          className="flex flex-col items-start px-6 my-12 font-semibold md:col-span-6 3xl:col-span-4"
          style={{ scrollMargin: '100px 0 0 0' }}
        >
          <h3 className="mb-8 text-3xl">Courses</h3>

          {career.courses.map((course, i) => {
            return (
              <CourseCard
                key={i}
                name={course.title}
                free={true}
                paid={true}
                courses={course.courses}
              />
            )
          })}

          <button className="rounded-xl md:max-w-[300px] hover:-translate-y-1 hover:shadow-lg self-center w-full px-12 py-4 mt-10 font-medium text-white transition-all duration-200 ease-in-out transform bg-black">
            View all 5 courses
          </button>
        </section>

        <section
          id="potential"
          className="flex flex-col px-6 my-12 font-semibold md:col-span-6 3xl:col-span-4"
          style={{ scrollMargin: '100px 0 0 0' }}
        >
          <h3 className="mb-8 text-3xl">Earning Potential</h3>

          <div className="flex justify-between p-2 mb-8 space-x-2 bg-white shadow-lg rounded-2xl md:inline-flex md:self-start">
            <button className="px-4 py-[6px] rounded-[10px] hover:bg-black hover:bg-opacity-40 hover:text-white transition-all duration-200 ease-in-out text-sm">
              1 year
            </button>
            <button className="px-4 py-[6px] bg-black text-white rounded-[10px] hover:bg-black hover:bg-opacity-40 text-sm hover:text-white transition-all duration-200 ease-in-out">
              2 years
            </button>
            <button className="px-4 py-[6px] rounded-[10px] hover:bg-black hover:bg-opacity-40 hover:text-white transition-all text-sm duration-200 ease-in-out">
              All time
            </button>
          </div>

          <CareerChart />
        </section>

        <section
          id="jobs"
          className="px-6 my-12 font-semibold md:col-span-6 3xl:col-span-4"
          style={{ scrollMargin: '100px 0 0 0' }}
        >
          <h3 className="mb-8 text-3xl">Jobs Available</h3>

          <div className="relative flex flex-col justify-center">
            <RiSearchLine className="absolute ml-6 text-lg text-black" />
            <input
              type="search"
              placeholder="Search for a country"
              className="rounded-xl pl-14 w-full px-6 py-4 text-sm border border-[#dedede] placeholder-gray-main focus:outline-none focus:border-1 transition-colors duration-200 ease-in-out focus:border-black shadow-slight bg-white appearance-none"
            />
          </div>

          <div className="mt-8 space-y-4">
            <section className="flex items-center justify-between p-6 bg-white shadow-lg rounded-xl">
              <div className="flex flex-col w-8/12">
                <p className="text-sm font-normal text-gray-main">
                  Jobs available in
                </p>
                <p className="mt-1 text-xl font-semibold truncate">
                  North America
                </p>
              </div>
              <p className="text-2xl">13.342</p>
            </section>

            <section className="flex items-center justify-between p-6 bg-white shadow-lg rounded-xl">
              <div className="flex flex-col w-8/12">
                <p className="text-sm font-normal text-gray-main">
                  Jobs available in
                </p>
                <p className="mt-1 text-xl font-semibold truncate">Europe</p>
              </div>
              <p className="text-2xl">27.281</p>
            </section>

            <section className="flex items-center justify-between p-6 bg-white shadow-lg rounded-xl">
              <div className="flex flex-col w-8/12">
                <p className="text-sm font-normal text-gray-main">
                  Jobs available in
                </p>
                <p className="mt-1 text-xl font-semibold truncate">China</p>
              </div>
              <p className="text-2xl">7.274</p>
            </section>
          </div>
        </section>
      </main>
    </>
  )
}

export default CareerPage
