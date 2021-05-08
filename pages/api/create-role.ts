import { prisma } from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
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

    res.json(role)
  } catch (e) {
    console.log(e.message)

    res.end()
  }
}
