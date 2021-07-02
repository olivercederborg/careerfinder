import Link from 'next/link'
import { BsFillLightningFill } from 'react-icons/bs'
import { Career } from 'types'

type Props = {
  career: Career
}

export default function CareerCard({ career }: Props) {
  return (
    <Link href={`/${career.slug.current}`}>
      <a className="overflow-hidden transition-all duration-200 ease-in-out bg-white shadow-lg rounded-xl group hover:bg-black">
        <img
          src={career.image}
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
              {JSON.stringify(career.discipline, null, 2)}
            </span>
          </div>

          <div className="grid grid-cols-2 mt-5">
            <div className="flex flex-col">
              <p className="text-base">Avg. Salary</p>
              <p className="mt-1 text-lg font-semibold">{career.salary}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-base">Time</p>
              <p className="mt-1 text-lg font-semibold">{career.time}</p>
            </div>
          </div>
        </section>
      </a>
    </Link>
  )
}
