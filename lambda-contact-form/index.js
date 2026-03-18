const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

const ses = new SESClient({ region: 'us-east-1' });

exports.handler = async (event) => {
  // Support both techsynergy.ca and www.techsynergy.ca
  const allowedOrigins = ['https://techsynergy.ca', 'https://www.techsynergy.ca'];
  const origin = event.headers?.origin || event.headers?.Origin;
  const corsOrigin = allowedOrigins.includes(origin) ? origin : 'https://techsynergy.ca';

  const headers = {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Content-Type': 'application/json',
  };

  // Detect HTTP method from both API Gateway v1 and v2 formats
  const httpMethod = event.httpMethod || event.requestContext?.http?.method || event.requestContext?.httpMethod;

  // Handle preflight OPTIONS request
  if (httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Handle both API Gateway and direct invocation
    let body;
    if (typeof event.body === 'string') {
      body = JSON.parse(event.body);
    } else if (event.body) {
      body = event.body;
    } else {
      body = event;
    }
    const { name, email, phone, company, service, message } = body;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    if (message.length < 10) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message must be at least 10 characters' }),
      };
    }

    // Email content
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px">
        <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
        ${phone ? `<tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${phone}</td></tr>` : ''}
        ${company ? `<tr><td style="padding:8px;font-weight:bold">Company</td><td style="padding:8px">${company}</td></tr>` : ''}
        <tr><td style="padding:8px;font-weight:bold">Service</td><td style="padding:8px">${service}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;vertical-align:top">Message</td><td style="padding:8px;white-space:pre-wrap">${message}</td></tr>
      </table>
    `;

    const textContent = `New inquiry from ${name} (${email})\nService: ${service}\nPhone: ${phone || 'N/A'}\nCompany: ${company || 'N/A'}\n\nMessage:\n${message}`;

    // Send email via SES
    await ses.send(new SendEmailCommand({
      Source: 'TechSynergy <noreply@techsynergy.ca>',
      Destination: {
        ToAddresses: [process.env.NOTIFY_EMAIL || 'rajeswaran.t@techsynergy.ca'],
      },
      Message: {
        Subject: {
          Data: `New Inquiry: ${service} — ${name}`,
        },
        Body: {
          Html: { Data: htmlContent },
          Text: { Data: textContent },
        },
      },
      ReplyToAddresses: [email],
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Inquiry submitted successfully!',
        timestamp: new Date().toISOString(),
      }),
    };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to submit inquiry. Please try again.' }),
    };
  }
};
