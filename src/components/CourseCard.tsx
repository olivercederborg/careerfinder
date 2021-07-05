import { imageBuilder } from 'lib/sanity'
import Image from 'next/image'
import { useState } from 'react'
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs'
import { SingleCareer } from 'types'

type Props = {
  name: string
  free: unknown
  paid: unknown
  courses: SingleCareer['courseCategories'][0]['courses']
}

export default function CourseCard({ name, free, paid, courses }: Props) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="w-full mt-4 shadow-lg rounded-xl">
      <div className="flex items-center p-6 pb-5 space-x-4 ">
        <div
          className={`place-items-center grid text-white bg-black shadow-md ${
            isExpanded
              ? 'w-8 h-8 text-base rounded-[8px]'
              : 'w-11 h-11 text-xl rounded-[10px]'
          }`}
        >
          {courses.length}
        </div>

        <div>
          <h4 className="text-base font-semibold">{name}</h4>
          <p
            className={`text-gray-main text-sm font-normal ${
              isExpanded ? 'hidden' : 'inline-block'
            }`}
          >
            {courses.map((course) => parseInt(course.price) === 0).length} Free
            &bull;{' '}
            {courses.map((course) => parseInt(course.price) !== 0).length} Paid
          </p>
        </div>
      </div>

      <div
        className={`flex-col overflow-hidden border-t divide-y ${
          isExpanded ? 'flex' : 'hidden'
        }`}
      >
        {courses.map((course, i) => (
          <a
            key={course.slug}
            href={course.link}
            target={'_blank'}
            rel="noopener noreferrer"
            className="flex items-center justify-between p-6 bg-white hover:bg-gray-50"
          >
            <div className="flex justify-start space-x-4">
              <Image
                src={imageBuilder(course.publisherImage).size(44, 44).url()}
                layout="fixed"
                width={44}
                height={44}
                alt={`${course.name} by ${course.publisher}`}
                className={`rounded-[10px] object-cover w-11 h-11 text-xl text-white bg-black shadow-md`}
              />

              <div>
                <h4 className="text-base font-semibold">{course.name}</h4>
                <p className="text-sm font-normal text-gray-main">
                  By {course.publisher}
                </p>
              </div>
            </div>

            <p className="py-1 uppercase min-w-[60px] bg-black rounded-lg text-[13px] text-white text-center font-semibold">
              {parseInt(course.price) === 0 ? 'FREE' : course.price}
            </p>
          </a>
        ))}
      </div>
      <div
        className="flex items-center justify-center py-3 text-sm font-medium text-black transition-colors duration-200 ease-in-out border-t cursor-pointer hover:text-opacity-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded
          ? ['Hide Courses', <BsCaretUpFill key={name} className="ml-2" />]
          : ['Show Courses', <BsCaretDownFill key={name} className="ml-2" />]}
      </div>
    </section>
  )
}
