import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import { transcribe } from '@/lib/groq'
import auth from '@/utils/auth'

export const config = {
  api: { bodyParser: { sizeLimit: '10mb' } }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await auth(req, res)

    const { audio, mimeType } = JSON.parse(req.body) as {
      audio: string
      mimeType?: string
    }

    if (!audio) {
      throw new RequestError('Empty audio', 400)
    }

    const buffer = Buffer.from(audio, 'base64')
    const text = await transcribe(buffer, mimeType ?? 'audio/webm')

    return res.status(200).json({ text })
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code ?? 500).json({ message })
  }
}
