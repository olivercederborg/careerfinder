import { jsonHeader } from 'lib/jsonHeader'
import { prisma } from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const { referer, origin } = req.headers

  const name = referer.replace(origin, '')

  const view = await prisma.pageView.upsert({
    create: { name, count: '0' },
    update: {},
    where: { name },
  })

  const updatedView = await prisma.pageView.update({
    data: { count: `${parseInt(view.count, 10) + 1}` },
    where: { id: view.id },
  })

  res.json(updatedView)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  jsonHeader(res)

  try {
    switch (method) {
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
