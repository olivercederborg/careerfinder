import { imageBuilder } from 'lib/sanity'
import Link from 'next/link'
import { BsFillLightningFill } from 'react-icons/bs'
import { FrontpageCareer } from 'types'

type Props = {
  career: FrontpageCareer
}

function CareerCard({ career }: Props) {
  return (
    <Link href={`/${career.slug}`}>
      <a className="overflow-hidden transition-all duration-200 ease-in-out bg-white shadow-lg rounded-xl group hover:bg-black">
        <img
          src={imageBuilder(career.banner).size(290, 200).auto('format').url()}
          alt={career.name}
          className="h-[200px] object-cover w-full transition-all duration-200 ease-in-out"
        />

        <section className="px-6 pt-6 transition-all duration-200 ease-in-out pb-7 group-hover:text-white">
          <h3 className="inline-flex items-center text-2xl font-semibold">
            {career.name}
            {career.hot && (
              <BsFillLightningFill className="ml-2 text-2xl text-yellow-400 filter drop-shadow-lightning" />
            )}
          </h3>

          <div className="flex mt-4 space-x-2">
            <span className="px-3 py-[6px] text-sm font-medium bg-black text-white rounded-lg group-hover:bg-white group-hover:text-black transition-all duration-200 ease-in-out">
              {career.discipline}
            </span>
          </div>

          <div className="grid grid-cols-2 mt-5">
            <div className="flex flex-col space-y-1">
              <p className="text-base">Avg. Salary</p>
              <p className="text-lg font-semibold">
                ${Math.floor(career.salary / 1000)}k
              </p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="text-base">Time</p>
              <p className="text-lg font-semibold">{career.time}</p>
            </div>
          </div>
        </section>
      </a>
    </Link>
  )
}

export default CareerCard
