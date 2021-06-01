import { jsonHeader } from 'lib/jsonHeader'
import { prisma } from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.body

  const discipline = await prisma.discipline.create({
    data: { name },
  })

  return res.status(200).json(discipline)
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const disciplines = await prisma.discipline.findMany()

  return res.status(200).json(disciplines)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  jsonHeader(res)

  try {
    switch (method) {
      case 'POST': {
        return postHandler(req, res)
      }
      case 'GET': {
        return getHandler(req, res)
      }
      default: {
        return res.status(405).end()
      }
    }
  } finally {
    await prisma.$disconnect()
  }
}
