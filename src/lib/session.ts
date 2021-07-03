import cookieSession from 'micro-cookie-session'
import { NextApiRequest, NextApiResponse } from 'next'

export function session(req: NextApiRequest, res: NextApiResponse) {
  cookieSession({
    name: 'session',
    keys: [process.env.SESSION_KEY],
    maxAge: 24 * 60 * 60 * 1000,
  })(req, res)
}
