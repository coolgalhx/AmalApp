import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hcbfvwzyizemwgqdtbjb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjYmZ2d3p5aXplbXdncWR0YmpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMDgyNDMsImV4cCI6MjA2ODU4NDI0M30.piYg0FUYO02Ffam5GfzkcgqK-Oe3Po6s02ZDGTiGcsI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)