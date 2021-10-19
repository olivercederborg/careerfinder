import Head from 'next/head'
import { RiSearchLine } from 'react-icons/ri'
import { BsFillLightningFill } from 'react-icons/bs'
import BlockContent from '@sanity/block-content-to-react'
import Image from 'next/image'

import { useRef, useState, useEffect } from 'react'

import { sanity } from 'lib/sanity'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import { groq } from 'next-sanity'
import { Category, SingleCareer } from 'types'
import CourseCard from '../components/CourseCard'
import Navbar from '../components/Navbar'
import { useNextSanityImage } from 'next-sanity-image'

type StaticProps = {
  career: SingleCareer
  categories: Category[]
}

const careerQuery = (
  slug: string
) => groq`*[_type == 'job' && defined(slug.current) && slug.current == '${slug}'][0]{
  name,
  "slug": slug.current,
  banner,
  description,
  courseCategories[]->{
    name,
    "slug": slug.current,
    "courses": *[_type == 'course' && references(^._id)]{
      name,
      "slug": slug.current,
      link,
      publisher,
      publisherImage,
      price,
    },
  },
  role->{
    salary,
    currency,
    time,
  }
}`

const categoriesQuery = groq`*[_type == 'discipline']{
  name,
  "slug": slug.current,
}`

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params,
}) => {
  const { slug } = params

  const career = await sanity().fetch<StaticProps['career']>(
    careerQuery(slug.toString())
  )

  const categories = await sanity().fetch<StaticProps['categories']>(
    categoriesQuery
  )

  return {
    props: {
      career,
      categories,
    },
    revalidate: 600,
  }
}

export const getStaticPaths: GetStaticPaths = async ({}) => {
  const careers = await sanity().fetch<{ slug: string }[]>(
    groq`*[_type == 'job' && defined(slug.current)]{
      "slug": slug.current
    }`
  )

  return {
    paths: careers.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: 'blocking',
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const CareerPage = ({ career, categories }: Props) => {
  const sectionNav = useRef(null)
  const [sectionNavIsTop, setSectionNavIsTop] = useState(false)
  const [loadedCoursesAmount, setLoadedCoursesAmount] = useState(1)

  const stickySectionNav = () => {
    const sectionNavOffset = sectionNav?.current?.getBoundingClientRect().top
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

  const bannerImageProps = useNextSanityImage(sanity(), career.banner)

  return (
    <>
      <Head>
        <title>{career.name} - Workish</title>
      </Head>

      <Navbar />

      <main className="xl:container md:gap-x-4 xl:mx-auto md:grid-cols-12 grid grid-cols-1">
        <div className="relative md:col-span-12 h-[450px] flex justify-center">
          <Image
            {...bannerImageProps}
            alt={career.name}
            className="xl:rounded-xl object-cover w-full"
          />
        </div>

        <article className="mt-7 md:mt-12 md:col-span-6 3xl:col-span-4 px-6">
          <h2 className="inline-flex items-center text-3xl font-semibold">
            {career.name}
            {career.hot && (
              <BsFillLightningFill className="filter drop-shadow-lightning ml-3 text-2xl text-yellow-400" />
            )}
          </h2>
          <p className="mt-7 font-semibold">Life of a {career.name}</p>
          <BlockContent
            blocks={career.description}
            className="mt-3 space-y-2"
          />
        </article>

        <nav
          ref={sectionNav}
          aria-label="Section Navigation"
          className={`justify-evenly rounded-xl md:hidden sticky top-0 z-10 flex mx-6 mt-10 bg-white shadow-lg transition-all duration-200 ease-in-out ${
            sectionNavIsTop && 'mx-0 rounded-none'
          }`}
        >
          <a href="#courses" className="text-gray-main py-6 font-medium">
            Courses
          </a>
          <a href="#potential" className="text-gray-main py-6 font-medium">
            Potential
          </a>
          <a href="#jobs" className="text-gray-main py-6 font-medium">
            Jobs
          </a>
        </nav>

        <section
          id="courses"
          className="md:col-span-6 3xl:col-span-4 flex flex-col items-start px-6 my-12 font-semibold"
          style={{ scrollMargin: '100px 0 0 0' }}
        >
          <h3 className="mb-8 text-3xl">Courses</h3>

          {career.courseCategories ? (
            career.courseCategories
              .slice(0, loadedCoursesAmount)
              .map((courseCategory) => (
                <CourseCard
                  key={courseCategory.slug}
                  name={courseCategory.name}
                  courses={courseCategory.courses}
                />
              ))
          ) : (
            <h3>No Courses to show</h3>
          )}

          {career.courseCategories &&
          career.courseCategories.length > loadedCoursesAmount ? (
            <button
              className="rounded-xl md:max-w-[300px] hover:-translate-y-1 hover:shadow-lg self-center w-full px-12 py-4 mt-10 font-medium text-white transition-all duration-200 ease-in-out transform bg-black"
              onClick={() =>
                setLoadedCoursesAmount(career.courseCategories.length)
              }
            >
              View all {career.courseCategories.length} courses
            </button>
          ) : null}
        </section>

        <section
          id="potential"
          className="md:col-span-6 3xl:col-span-4 flex flex-col px-6 my-12 font-semibold"
          style={{ scrollMargin: '100px 0 0 0' }}
        >
          <h3 className="mb-8 text-3xl">Earning Potential</h3>
          <section className="rounded-xl flex items-center justify-between p-6 bg-white shadow-lg">
            <div className="flex flex-col w-8/12">
              <p className="text-gray-main text-sm font-normal">Time</p>
              <p className="mt-1 text-xl font-semibold truncate">
                {career.role.time}
              </p>
            </div>
            <p className="text-2xl">
              {career.role.salary.toLocaleString('en-US', {
                style: 'currency',
                currency: career.role.currency,
                compactDisplay: 'short',
                maximumFractionDigits: 0,
              })}
            </p>
          </section>
        </section>

        <section
          id="jobs"
          className="md:col-span-6 3xl:col-span-4 px-6 my-12 font-semibold"
          style={{ scrollMargin: '100px 0 0 0' }}
        >
          <h3 className="mb-8 text-3xl">Jobs Available</h3>

          <div className="relative flex flex-col justify-center">
            <RiSearchLine className="absolute ml-6 text-lg text-black" />
            <input
              type="text"
              placeholder="Search for a country"
              className="rounded-xl pl-14 w-full px-6 py-4 text-sm border border-[#dedede] placeholder-gray-main focus:outline-none focus:border-1 transition-colors duration-200 ease-in-out focus:border-black shadow-slight bg-white appearance-none"
            />
          </div>

          <div className="mt-8 space-y-4">
            <section className="rounded-xl flex items-center justify-between p-6 bg-white shadow-lg">
              <div className="flex flex-col w-8/12">
                <p className="text-gray-main text-sm font-normal">
                  Jobs available in
                </p>
                <p className="mt-1 text-xl font-semibold truncate">
                  North America
                </p>
              </div>
              <p className="text-2xl">13.342</p>
            </section>

            <section className="rounded-xl flex items-center justify-between p-6 bg-white shadow-lg">
              <div className="flex flex-col w-8/12">
                <p className="text-gray-main text-sm font-normal">
                  Jobs available in
                </p>
                <p className="mt-1 text-xl font-semibold truncate">Europe</p>
              </div>
              <p className="text-2xl">27.281</p>
            </section>

            <section className="rounded-xl flex items-center justify-between p-6 bg-white shadow-lg">
              <div className="flex flex-col w-8/12">
                <p className="text-gray-main text-sm font-normal">
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
