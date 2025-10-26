import { createClient } from '@supabase/supabase-js'

// Support both VITE_ (frontend) and non-VITE (backend) environment variables
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''

console.log('=== Supabase Client Initialization ===')
console.log('URL:', supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'MISSING')
console.log('Anon Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'MISSING')

if (!supabaseUrl || !supabaseAnonKey) {
  const error = new Error('Missing Supabase environment variables: ' +
    (!supabaseUrl ? 'SUPABASE_URL/VITE_SUPABASE_URL ' : '') +
    (!supabaseAnonKey ? 'SUPABASE_ANON_KEY/VITE_SUPABASE_ANON_KEY' : ''))
  console.error('ERROR:', error.message)
  throw error
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
console.log('Supabase client created successfully')
console.log('=======================================')

export type Signup = {
  id?: number
  created_at?: string
  name: string
  email: string
  is_subscribed?: boolean
  project_id: number
}
