// TechSynergy Contact Form Lambda Handler
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const ses = new SESClient({ region: process.env.AWS_REGION || 'us-east-1' });

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
};

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').trim();
}

exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  try {
    const body = JSON.parse(event.body || '{}');

    const name = sanitize(body.name).slice(0, 100);
    const email = sanitize(body.email).slice(0, 254);
    const phone = sanitize(body.phone || '').slice(0, 30);
    const company = sanitize(body.company || '').slice(0, 100);
    const service = sanitize(body.service || '').slice(0, 100);
    const message = sanitize(body.message).slice(0, 2000);

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          error: 'Missing required fields: name, email, message',
        }),
      };
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Invalid email address' }),
      };
    }

    // Send email via SES
    const params = {
      Source: process.env.FROM_EMAIL,
      Destination: {
        ToAddresses: [process.env.RECIPIENT_EMAIL],
      },
      Message: {
        Subject: {
          Data: `New Contact Form Submission - ${service || 'General Inquiry'}`,
        },
        Body: {
          Text: {
            Data: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Company: ${company || 'Not provided'}
Service: ${service || 'General Inquiry'}

Message:
${message}

---
Sent from TechSynergy Contact Form
            `.trim(),
          },
        },
      },
    };

    await ses.send(new SendEmailCommand(params));

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        message: 'Contact form submitted successfully',
        success: true,
      }),
    };
  } catch (error) {
    console.error('Error processing contact form:', error);

    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: 'Failed to process contact form submission',
      }),
    };
  }
};
