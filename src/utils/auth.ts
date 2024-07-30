import { NextApiRequest } from 'next'
import { getToken } from 'next-auth/jwt'

import RequestError from '@/error/requestError'

export default async function auth(req: NextApiRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET ?? ''
  })

  if (!token) {
    throw new RequestError('Unauthorized', 401)
  }
}
