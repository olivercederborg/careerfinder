import { createClient, SanityDocument } from 'sanity-codegen'
import { Documents } from 'codegen'
import fetch from 'isomorphic-fetch'

export const sanity = createClient<Documents>({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  fetch,
  previewMode: true,
  token: process.env.SANITY_TOKEN,
  // disabledCache: true,
})
