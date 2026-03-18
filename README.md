# TechSynergy - Software Development & Web Solutions

Full-stack business website and CMS for TechSynergy, built with Next.js 16, DynamoDB, AWS Lambda, and deployed on AWS Amplify.

## Live URLs

| Environment | URL |
|-------------|-----|
| Production (Frontend) | https://techsynergy.ca |
| Production (www) | https://www.techsynergy.ca |
| Backend API | https://wweb.api.techsynergy.ca |
| Amplify Default | https://main.d3i5z3t11ekgps.amplifyapp.com |
| Admin CMS | https://techsynergy.ca/admin |

## Tech Stack

- **Frontend**: Next.js 16.1.6 (App Router), React 19, Tailwind CSS 4, Framer Motion
- **Backend**: Next.js API Routes (Route Handlers) + AWS Lambda
- **Database**: AWS DynamoDB (single-table design)
- **Email**: AWS SES (Simple Email Service) via Lambda
- **Auth**: NextAuth.js v5 (credentials-based, bcrypt hashing)
- **Security**: CSP, CORS, input validation (Zod), honeypot anti-spam
- **Deployment**: AWS Amplify (CI/CD from GitHub)
- **DNS**: AWS Route 53

## Project Structure

```
src/
  app/
    (public pages)
      page.tsx              # Home
      about/page.tsx        # About Us
      services/page.tsx     # Services listing
      services/[slug]/      # Service detail
      portfolio/page.tsx    # Portfolio showcase
      blog/page.tsx         # Blog listing
      blog/[slug]/          # Blog article
      pricing/page.tsx      # Pricing plans
      contact/page.tsx      # Contact form
    admin/
      page.tsx              # Dashboard
      login/page.tsx        # Admin login
      services/page.tsx     # Manage services
      portfolio/page.tsx    # Manage portfolio
      blog/page.tsx         # Manage blog posts
      inquiries/page.tsx    # View inquiries
    api/
      contact/route.ts      # POST contact form
      auth/[...nextauth]/   # NextAuth endpoints
      admin/
        services/           # CRUD services
        portfolio/          # CRUD portfolio
        blog/               # CRUD blog posts
        inquiries/          # View/update inquiries
  components/
    ui/                     # Navbar, Footer
    sections/               # Hero, ServicesPreview, Stats, Testimonials, CTA
    admin/                  # CrudTable, FormModal
  lib/
    auth.ts                 # NextAuth config
    dynamodb.ts             # DynamoDB client
    models/                 # Data access layer (services, portfolio, blog, inquiries)
  types/
    index.ts                # TypeScript interfaces
```

## Getting Started

### Prerequisites

- Node.js 20+
- AWS account with DynamoDB access

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/rajeswaran140/techsynergy-wweb.git
   cd techsynergy-wweb
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Update `.env.local` with your AWS credentials and admin password.

4. Run the dev server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000

### Admin Login

- **Email**: `admin@techsynergy.com`
- **Password**: Set in `ADMIN_PASSWORD` env variable

## AWS Infrastructure

| Resource | Details |
|----------|---------|
| Amplify App | `d3i5z3t11ekgps` |
| DynamoDB Table | `TechSynergy` (us-east-1, PAY_PER_REQUEST) |
| Lambda Function | `techsynergy-contact-form` (Node.js 20.x) |
| API Gateway | `vs2t2s2ew3.execute-api.us-east-1.amazonaws.com` |
| IAM Role | `AmplifyTechSynergyRole` |
| SES | Verified domain: techsynergy.ca |
| Route 53 Zone | `Z02887593A9CGVSQWKPTI` |
| ACM Cert (API) | `5b5e8571-3930-4873-8814-a4b680ef4747` |

## API Endpoints

### Next.js API Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/admin/services` | List/create services |
| GET/PUT/DELETE | `/api/admin/services/[id]` | Read/update/delete service |
| GET/POST | `/api/admin/portfolio` | List/create portfolio items |
| GET/PUT/DELETE | `/api/admin/portfolio/[id]` | Read/update/delete portfolio item |
| GET/POST | `/api/admin/blog` | List/create blog posts |
| GET/PUT/DELETE | `/api/admin/blog/[id]` | Read/update/delete blog post |
| GET/PATCH | `/api/admin/inquiries` | List/update inquiry status |

### AWS Lambda Functions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `https://vs2t2s2ew3.execute-api.us-east-1.amazonaws.com/` | Contact form submission (sends email via SES) |

## Contact Form Implementation

The contact form uses a standalone AWS Lambda function with SES for email delivery, bypassing Amplify's credential restrictions.

### Architecture
```
Browser → Lambda (API Gateway) → AWS SES → Email Inbox
```

### Features
- **Email Service**: AWS SES (noreply@techsynergy.ca)
- **Recipient**: rajeswaran.t@techsynergy.ca
- **Validation**: Zod schema (name, email, service, message)
- **Anti-Spam**: Honeypot field (off-screen positioning)
- **CORS**: Supports both techsynergy.ca and www.techsynergy.ca
- **Error Handling**: Graceful failures with user feedback

### Lambda Function
- **Runtime**: Node.js 20.x
- **Handler**: `index.handler`
- **Timeout**: 30 seconds
- **Memory**: 512 MB
- **Location**: `lambda-contact-form/index.js`

### Deployment
```bash
# Package and deploy Lambda
cd lambda-contact-form
zip -r function.zip index.js package.json
aws lambda update-function-code \
  --function-name techsynergy-contact-form \
  --zip-file fileb://function.zip \
  --region us-east-1
```

## Security Features

### Authentication
- **Password Hashing**: bcrypt (10 rounds)
- **Session Management**: NextAuth.js JWT strategy
- **Admin Routes**: Server-side protection via proxy middleware

### Content Security Policy
- `default-src 'self'`
- `script-src 'self' 'unsafe-inline' 'unsafe-eval'` (Next.js requirements)
- `connect-src 'self' https://www.google-analytics.com https://vs2t2s2ew3.execute-api.us-east-1.amazonaws.com`
- `frame-ancestors 'none'` (prevents clickjacking)

### Additional Headers
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`

### Input Validation
- **Zod schemas** for all API routes
- **Field length limits** (name: 100, email: 254, message: 2000)
- **Email regex validation**
- **Required field enforcement**

## Deployment

Pushing to `main` branch automatically triggers an Amplify CI/CD build and deploy.

```bash
git push origin main
```
