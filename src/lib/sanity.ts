import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { ClientConfig, createClient } from 'next-sanity'

const config: ClientConfig = {
  projectId: '98ibb1it',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  // token: process.env.SANITY_TOKEN,
  apiVersion: 'v2021-07-05',
  useCdn: false,
}

const sanityClient = createClient(config)
const previewClient = createClient({
  ...config,
  useCdn: false,
})

export const sanity = (usePreview?: boolean) => {
  return usePreview ? previewClient : sanityClient
}

export const builder = imageUrlBuilder(sanity())

export const imageBuilder = (source: SanityImageSource) => {
  return builder.image(source)
}
