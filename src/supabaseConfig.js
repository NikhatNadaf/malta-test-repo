
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bguvrsjsezwsgevaddvy.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
if (!supabaseKey) {
    console.error('Supabase API key is missing!');
  }
export const supabase = createClient(supabaseUrl, supabaseKey)