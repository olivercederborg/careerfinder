import { sanity } from 'lib/sanity'
import { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'

const careersQuery = groq`*[_type == 'job']{
  name,
  "slug": slug.current,
  "time": role->time,
  "salary": role->salary,
  "currency": role->currency,
  "discipline": discipline->name,
}`

type Career = {
  name: string
  slug: string
  time: string
  salary: number
  discipline: string
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET': {
      const careers = await sanity().fetch<Career[]>(careersQuery)

      return res.status(200).json(careers)
    }

    default: {
      return res.status(405).json({})
    }
  }
}

export default handler
