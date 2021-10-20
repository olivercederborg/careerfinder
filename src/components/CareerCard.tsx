import { formatCurrency } from 'helpers/formatCurrency'
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
      <a className="rounded-xl group hover:bg-black overflow-hidden transition-all duration-200 ease-in-out bg-white shadow-lg">
        <img
          src={imageBuilder(career.banner).size(385, 200).auto('format').url()}
          width={385}
          height={200}
          alt={career.name}
          className="h-[200px] object-cover w-full transition-all duration-200 ease-in-out"
        />

        <section className="pb-7 group-hover:text-white px-6 pt-6 transition-all duration-200 ease-in-out">
          <h3 className="inline-flex items-center text-2xl font-semibold">
            {career.name}
            {career.hot && (
              <BsFillLightningFill className="filter drop-shadow-lightning ml-2 text-2xl text-yellow-400" />
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
                {formatCurrency(career.salary, career.currency)}
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
