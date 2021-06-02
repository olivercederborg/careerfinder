import Head from 'next/head'
import { BsCaretDownFill } from 'react-icons/bs'
import CheckboxFilter from '../components/CheckboxFilter'
import CourseFiltersShell from '../components/CourseFiltersShell'
import Navbar from '../components/Navbar'

export default function CoursesPage() {
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

      <main>
        <section className="flex flex-col items-center justify-center px-6 my-16 space-y-4 text-center">
          <h2 className="text-4xl font-semibold">
            Browse the best courses for your career path.
          </h2>
          <h3 className="text-gray-main text-2xl font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h3>
        </section>

        <CourseFiltersShell>
          <div className="flex flex-col items-start">
            Category
            <CheckboxFilter>All Categories</CheckboxFilter>
          </div>
        </CourseFiltersShell>
      </main>
    </>
  )
}
