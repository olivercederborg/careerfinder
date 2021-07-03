import { prisma } from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const courses = await prisma.course.findMany()

  return res.status(200).json(courses)
}

async function postHandler(req: NextApiRequest, res: NextApiResponse) {}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  try {
    switch (method) {
      case 'GET': {
        return getHandler(req, res)
      }
      case 'POST': {
        return postHandler(req, res)
      }
      default: {
        return res.status(405).end()
      }
    }
  } finally {
    await prisma.$disconnect()
  }
}
