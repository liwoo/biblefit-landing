import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
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
        from: 'BibleFit <onboarding@resend.dev>', // Update this with your verified domain
        to: ['your-email@example.com'], // Update this with your email
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
      id: data.id
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return res.status(500).json({ error: 'Failed to process request' })
  }
}
