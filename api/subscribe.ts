import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''

let supabase: ReturnType<typeof createClient> | null = null

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log('=== API Request Started ===')
  console.log('Environment variables check:')
  console.log('- SUPABASE_URL:', process.env.SUPABASE_URL ? 'Set' : 'NOT SET')
  console.log('- VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL ? 'Set' : 'NOT SET')
  console.log('- SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'Set' : 'NOT SET')
  console.log('- VITE_SUPABASE_ANON_KEY:', process.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'NOT SET')
  console.log('- RECAPTCHA_SECRET_KEY:', process.env.RECAPTCHA_SECRET_KEY ? 'Set' : 'NOT SET')
  console.log('- RESEND_API:', process.env.RESEND_API ? 'Set' : 'NOT SET')

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, recaptchaToken } = req.body

  // Validate inputs
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' })
  }

  // Validate reCAPTCHA token
  if (!recaptchaToken) {
    return res.status(400).json({ error: 'reCAPTCHA verification required' })
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  try {
    // Verify reCAPTCHA token with Google
    const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY

    if (!RECAPTCHA_SECRET_KEY) {
      console.error('RECAPTCHA_SECRET_KEY not found in environment variables')
      return res.status(500).json({ error: 'Server configuration error' })
    }

    const recaptchaResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      }
    )

    const recaptchaData = await recaptchaResponse.json() as {
      success: boolean
      challenge_ts?: string
      hostname?: string
      'error-codes'?: string[]
    }

    if (!recaptchaData.success) {
      console.error('reCAPTCHA verification failed:', recaptchaData['error-codes'])
      return res.status(400).json({ error: 'reCAPTCHA verification failed. Please try again.' })
    }

    // Insert signup into Supabase
    console.log('Attempting to insert into Supabase:', { name, email, project_id: 1 })

    if (!supabase) {
      console.error('Supabase client not initialized - missing environment variables')
      return res.status(500).json({ error: 'Server configuration error - Supabase not initialized' })
    }

    const { data: signupData, error: signupError } = await supabase
      .from('signups')
      .insert({
        name,
        email,
        is_subscribed: true,
        project_id: 1,
      })
      .select()
      .single()

    if (signupError) {
      console.error('=== SUPABASE ERROR ===')
      console.error('Error code:', signupError.code)
      console.error('Error message:', signupError.message)
      console.error('Error details:', signupError.details)
      console.error('Error hint:', signupError.hint)
      console.error('Full error object:', JSON.stringify(signupError, null, 2))
      console.error('=====================')
      return res.status(500).json({
        error: 'Failed to save signup. Please try again.',
        details: process.env.NODE_ENV === 'development' ? signupError.message : undefined
      })
    }

    console.log('Successfully inserted into Supabase:', signupData)

    const RESEND_API_KEY = process.env.RESEND_API

    if (!RESEND_API_KEY) {
      console.error('RESEND_API key not found in environment variables')
      return res.status(500).json({ error: 'Server configuration error' })
    }

    // Send email via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'BibleFit <noreply@kwathu.ai>',
        to: ['jeremiahchienda@gmail.com'],
        subject: `New BibleFit Early Access Request from ${name}`,
        html: `
          <h2>New Early Access Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        `,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Resend API error:', error)
      return res.status(500).json({ error: 'Failed to send email' })
    }

    const data = await response.json()

    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed!',
      emailId: data.id,
      signupId: signupData.id
    })
  } catch (error) {
    console.error('=== UNEXPECTED ERROR ===')
    console.error('Error type:', typeof error)
    console.error('Error:', error)
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    console.error('========================')
    return res.status(500).json({
      error: 'Failed to process request',
      details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
    })
  }
}
