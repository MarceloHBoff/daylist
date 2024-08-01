import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import RequestError from '@/error/requestError'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const data = await getServerSession(req, res, authOptions)

  if (!data) {
    throw new RequestError('Unauthorized', 401)
  }

  return data.user.id
}
