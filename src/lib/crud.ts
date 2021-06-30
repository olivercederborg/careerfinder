import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from './prisma'

type Resource = 'discipline' | 'area' | 'role' | 'job'

async function getHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  resource: Resource
) {
  const id = Number(req.query.id ?? 0)

  const resourceData = await prisma[resource as any].findUnique({
    where: {
      id,
    },
  })

  return res.status(200).json(resourceData)
}
