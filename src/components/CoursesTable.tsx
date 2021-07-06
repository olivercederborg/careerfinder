import { imageBuilder } from 'lib/sanity'
import Link from 'next/link'
import Image from 'next/image'

interface Course {
  name: string
  publisher: string
  publisherLogo: string
  categories: string[]
  difficulty: string
  cost: number
  isNew: boolean
  isHot: boolean
}

interface CourseCategory {
  id: string
  category: string
  courses: Course[]
}

interface Props {
  inputCourses: CourseCategory[]
  loadedCoursesAmount: number
}

const CoursesTable = ({ inputCourses, loadedCoursesAmount }: Props) => {
  return (
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
        {inputCourses?.slice(0, loadedCoursesAmount).map((course: any, i) => (
          <Link key={i} href={course.link} passHref>
            <tr key={i} className="border-t border-b cursor-pointer">
              <td className="relative px-10 py-6 font-semibold">
                <div className="flex items-center">
                  {course.isHot || course.isNew ? (
                    <div
                      className={`w-0 h-0 border-b-[40px] text-white flex items-start justify-center text-xs absolute left-0 top-0 transform -rotate-45 translate-x-[-26px] -translate-y-1.5 rounded-lg ${
                        course.isHot ? 'border-[#FFB931]' : 'border-black'
                      }`}
                      style={{
                        borderRight: '40px solid transparent',
                        borderLeft: '40px solid transparent',
                      }}
                    >
                      <span className="font-medium transform translate-y-[18px]">
                        {course.isHot ? 'HOT' : 'NEW'}
                      </span>
                    </div>
                  ) : null}
                  <Image
                    src={imageBuilder(course.publisherLogo)
                      .size(44, 44)
                      .auto('format')
                      .url()}
                    width={44}
                    height={44}
                    alt={course.publisher}
                    className="mr-4 shadow-lg h-11 w-11 rounded-xl"
                  />
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
                  {course?.categories?.slice(0, 2).join(', ')}
                </p>
                {course?.categories?.length > 2 ? (
                  <span className="inline-block px-2 py-1 text-sm text-gray-600 bg-gray-200 rounded-lg">
                    +{course?.categories?.length - 2} more
                  </span>
                ) : null}
              </td>
              <td className="px-10 py-6">{course.difficulty}</td>
              <td className="px-10 py-6">
                <span className="w-[64px] inline-flex justify-center items-center py-1 text-sm font-medium text-white bg-black rounded-lg">
                  {course.cost ? `$${Math.round(course.cost)}` : 'FREE'}
                </span>
              </td>
            </tr>
          </Link>
        ))}
      </tbody>
    </table>
  )
}

export default CoursesTable
