import type { Area, Discipline, Job, Prisma, Role } from '.prisma/client'

export type CopyFunctionSignatureType<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => ReturnType<T>

export type Maybe<T> = T | null

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

export type JobValues = Prisma.JobCreateArgs['data'] & {
  id: number
  area?: Prisma.AreaCreateArgs['data']
  discipline?: Prisma.DisciplineCreateArgs['data']
  role?: Prisma.RoleCreateArgs['data']
}
