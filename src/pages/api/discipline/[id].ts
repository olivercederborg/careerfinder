import { jsonHeader } from 'lib/jsonHeader'
import { prisma } from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id)

  if (Number.isNaN(id)) {
    res.status(204).end()
  }

  const discipline = await prisma.discipline.findUnique({
    where: { id: Number(id) },
  })

  return res.status(200).json(discipline)
}

async function patchHandler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.body.id)
  const { name } = req.body

  const discipline = await prisma.discipline.update({
    data: { name },
    where: { id },
  })

  return res.status(200).json(discipline)
}

async function deleteHandler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.body.id)

  const discipline = await prisma.discipline.delete({
    where: {
      id,
    },
  })

  return res.status(204).json(discipline)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  jsonHeader(res)

  try {
    switch (method) {
      case 'GET': {
        return getHandler(req, res)
      }
      case 'PATCH': {
        return patchHandler(req, res)
      }
      case 'DELETE': {
        return deleteHandler(req, res)
      }
      default: {
        return res.status(405).end()
      }
    }
  } finally {
    await prisma.$disconnect()
  }
}
