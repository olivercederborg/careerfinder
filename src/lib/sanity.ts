import { createClient } from 'sanity-codegen'
import { Documents } from 'codegen'

export const sanity = createClient<Documents>({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  fetch: window.fetch,
  previewMode: true,
  token: process.env.SANITY_TOKEN,
  // disabledCache: true,
})
