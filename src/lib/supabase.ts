import RequestError from '@/error/requestError'
import { createClient, PostgrestError } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } }
)

export function unwrap<T>({
  data,
  error
}: {
  data: T | null
  error: PostgrestError | null
}): T {
  if (error) {
    throw new RequestError(error.message, error.code === 'PGRST116' ? 404 : 500)
  }
  return data as T
}
