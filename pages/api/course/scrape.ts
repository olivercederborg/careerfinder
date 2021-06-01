import { NextApiRequest, NextApiResponse } from 'next'
import isUrl from 'is-url'
import { unfurl } from 'unfurl.js'

import { jsonHeader } from 'lib/jsonHeader'

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.body

  if (isUrl(url)) {
    try {
      const { title, description, ...metadata } = await unfurl(url)

      return res.status(200).json({
        title,
        description,
        url: metadata.open_graph.url,
        imageUrl: metadata.open_graph.images.shift().url,
        locale: metadata.open_graph.locale,
        author: (metadata.open_graph as any).site_name,
        ...metadata,
      })
    } catch (e) {
      return res.status(400).json({ status: e.name })
    }
  }

  return res.status(204).json({})
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  jsonHeader(res)

  switch (method) {
    case 'POST': {
      return postHandler(req, res)
    }
    default: {
      return res.status(405).end()
    }
  }
}
