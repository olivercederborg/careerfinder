import { jsonHeader } from 'lib/jsonHeader'
import { prisma } from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

async function get(req: NextApiRequest, res: NextApiResponse) {
  const areas = await prisma.area.findMany()

  return res.status(200).json(areas)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  jsonHeader(res)

  try {
    switch (method) {
      case 'GET': {
        return get(req, res)
      }
      default: {
        return res.status(405).end()
      }
    }
  } finally {
    await prisma.$disconnect()
  }
}
