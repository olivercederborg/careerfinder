import { PrismaClient } from '@prisma/client'

interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') global.prisma = prisma
