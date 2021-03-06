import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { BlockContent } from 'codegen'

export type CopyFunctionSignatureType<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => ReturnType<T>

export type Maybe<T> = T | null

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

export type FrontpageCareer = {
  createdAt?: string
  name: string
  slug: string
  banner: SanityImageSource
  time: string
  salary: number
  currency: string
  isHot: boolean
  discipline: string
}

export type Category = {
  name: string
  slug: string
}

export type SingleCareer = {
  createdAt?: string
  name: string
  slug: string
  banner: SanityImageSource
  salary: number
  currency: string
  time: string
  isHot: boolean
  discipline?: string
  description?: BlockContent
  courseCategories?: {
    name: string
    slug: string
    courses: Course[]
  }[]
  seoTitle?: string
  seoDescription?: string
}

export type Discipline = {
  name: string
  slug: string
  heroTitle?: string
  heroSubtitle?: string
  seoTitle?: string
  seoDescription?: string
}

export type GeneratedCareer = {
  createdAt?: string
  name: string
  slug: string
  banner: SanityImageSource
  time: string
  salary: number
  currency: string
  discipline: string
}

export type Course = {
  createdAt?: string
  name: string
  slug: string
  isHot?: boolean
  isNew?: boolean
  discipline: Discipline
  description?: BlockContent
  link: string
  publisher: string
  publisherImage: SanityImageSource
  price: number
  currency: string
  isFree: boolean
  difficulty: string
  courseCategories?: {
    name: string
    slug: string
  }[]
}
