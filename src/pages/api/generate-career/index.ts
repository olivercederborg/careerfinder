import { sanity } from 'lib/sanity'
import { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'
import sample from 'lodash/sample'

const careersQuery = groq`*[_type == 'job']{
  name,
  "slug": slug.current,
  "time": role->time,
  "salary": role->salary,
  "discipline": discipline->name,
}`

type Career = {
  slug: string
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET': {
      const careers = await sanity().fetch<Career[]>(careersQuery)

      const career = sample(careers)

      return res.status(200).json(career)
    }

    default: {
      return res.status(405).json({})
    }
  }
}

export default handler
