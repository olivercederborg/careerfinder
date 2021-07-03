import { Area, Discipline, Job, Role } from 'codegen'
import { SanityReference } from 'sanity-codegen'

export type CopyFunctionSignatureType<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => ReturnType<T>

export type Maybe<T> = T | null

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

export type Career = {
  _type: 'job'
} & Job & {
    hot: boolean
    discipline: SanityReference<Discipline>
    area: SanityReference<Area>
    role: SanityReference<Role>
  }