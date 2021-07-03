import { NextApiResponse } from 'next'

export function jsonHeader(res: NextApiResponse) {
  res.setHeader('Content-type', 'application/json')
}
