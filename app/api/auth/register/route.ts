import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ user: data.user })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}