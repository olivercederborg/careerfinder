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
  name: string
  slug: string
  banner: SanityImageSource
  time: string
  salary: number
  hot: boolean
  discipline: string
}

export type Category = {
  name: string
  slug: string
}

export type SingleCareer = {
  name: string
  slug: string
  hot: boolean
  description: BlockContent
  banner: SanityImageSource
  courseCategories: {
    name: string
    slug: string
    courses: {
      name: string
      slug: string
      link: string
      publisher: string
      publisherImage: SanityImageSource
      price: string
    }[]
  }[]
}
