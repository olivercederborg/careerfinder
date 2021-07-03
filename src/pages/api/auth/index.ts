import { session } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  session(req, res)

  res.json(req.session)
}
