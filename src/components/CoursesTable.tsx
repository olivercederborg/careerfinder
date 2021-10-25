import { formatCurrency } from 'helpers/formatCurrency'
import { imageBuilder } from 'lib/sanity'
import { Course } from 'types'

type StaticProps = {
  inputCourses: Course[]
  loadedCoursesAmount: number
}

const CoursesTable = ({ inputCourses, loadedCoursesAmount }: StaticProps) => {
  return (
    <table className="md:table-auto w-full overflow-x-auto text-left border-collapse divide-y table-fixed">
      <thead>
        <tr>
          <th className="text-gray-main px-10 py-5 text-[15px] font-medium w-96 md:w-auto border-b">
            Name
          </th>
          <th className="text-gray-main px-10 py-5 text-[15px] font-medium w-56 md:w-auto border-b">
            Categories
          </th>
          <th className="text-gray-main px-10 py-5 text-[15px] font-medium w-40 md:w-auto border-b">
            Difficulty
          </th>
          <th className="text-gray-main px-10 py-5 text-[15px] font-medium w-36 md:w-auto border-b">
            Price
          </th>
        </tr>
      </thead>

      <tbody className="font-medium">
        {inputCourses?.slice(0, loadedCoursesAmount).map((course: Course) => (
          <tr key={course.slug} className="border-t border-b">
            <td className="relative px-10 py-6 font-semibold">
              <a
                key={course.link}
                href={course.link}
                target="_blank"
                className="absolute top-0 bottom-0 left-0 right-0 z-50"
                rel="noreferrer"
              />
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
              <div className="flex items-center">
                <img
                  src={imageBuilder(course.publisherImage)
                    .size(44, 44)
                    .auto('format')
                    .url()}
                  width={44}
                  height={44}
                  alt={course.publisher}
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
                {course.courseCategories
                  ?.slice(0, 2)
                  .map((category) => category.name)
                  .join(', ')}
              </p>
              {course?.courseCategories?.length > 2 ? (
                <span className="inline-block px-2 py-1 text-sm text-gray-600 bg-gray-200 rounded-lg">
                  +{course?.courseCategories?.length - 2} more
                </span>
              ) : null}
            </td>
            <td className="px-10 py-6">{course.difficulty}</td>
            <td className="px-10 py-6">
              <span className="w-[64px] inline-flex justify-center items-center py-1 text-sm font-medium text-white bg-black rounded-lg">
                {course.isFree
                  ? 'FREE'
                  : formatCurrency(course.price, course.currency)}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CoursesTable
