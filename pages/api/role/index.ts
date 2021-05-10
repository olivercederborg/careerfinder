import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'

async function get(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [areas, disciplines] = await Promise.all([
      prisma.area.findMany(),
      prisma.discipline.findMany(),
    ])

    res.json({ areas, disciplines })
  } catch (e) {
    res.status(500).end()
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const {
    title,
    areaName,
    disciplineName,
  }: {
    title: string | null
    areaName: string | null
    disciplineName: string | null
  } = JSON.parse(req.body)

  const area = await prisma.area.upsert({
    create: {
      name: areaName,
    },
    update: {},
    where: {
      name: areaName,
    },
  })

  const discipline = await prisma.area.upsert({
    create: {
      name: disciplineName,
    },
    update: {},
    where: {
      name: disciplineName,
    },
  })

  try {
    const role = await prisma.role.create({
      data: {
        title,
        area: {
          connectOrCreate: {
            create: {
              name: area.name,
            },
            where: {
              name: area.name,
            },
          },
        },
        discipline: {
          connectOrCreate: {
            create: {
              name: discipline.name,
            },
            where: {
              name: discipline.name,
            },
          },
        },
      },
    })

    res.status(201).json(role)
  } catch (e) {
    console.log(e.message)

    res.status(500).end()
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET': {
      await get(req, res)
    }
    case 'POST': {
      await post(req, res)
    }
    default: {
      return res.status(405).end()
    }
  }
}
