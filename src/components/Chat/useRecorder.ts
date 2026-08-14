'use client'

import { useRef, useState } from 'react'

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      resolve(result.split(',')[1] ?? '')
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

type Recording = { audio: string; mimeType: string }

export function useRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const resolveRef = useRef<((value: Recording | null) => void) | null>(null)

  async function start() {
    if (isRecording) return
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const recorder = new MediaRecorder(stream)
    chunksRef.current = []

    recorder.ondataavailable = e => {
      if (e.data.size > 0) chunksRef.current.push(e.data)
    }

    recorder.onstop = async () => {
      stream.getTracks().forEach(track => track.stop())
      const mimeType = recorder.mimeType || 'audio/webm'
      const blob = new Blob(chunksRef.current, { type: mimeType })
      const audio = await blobToBase64(blob)
      resolveRef.current?.(audio ? { audio, mimeType } : null)
      resolveRef.current = null
    }

    mediaRecorderRef.current = recorder
    recorder.start()
    setIsRecording(true)
  }

  function stop(): Promise<Recording | null> {
    return new Promise(resolve => {
      const recorder = mediaRecorderRef.current
      if (!recorder || recorder.state === 'inactive') {
        resolve(null)
        return
      }
      resolveRef.current = resolve
      recorder.stop()
      setIsRecording(false)
    })
  }

  return { isRecording, start, stop }
}
