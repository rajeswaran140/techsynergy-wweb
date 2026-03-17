# TechSynergy - Software Development & Web Solutions

Full-stack business website and CMS for TechSynergy, built with Next.js 15, DynamoDB, and deployed on AWS Amplify.

## Live URLs

| Environment | URL |
|-------------|-----|
| Production (Frontend) | https://techsynergy.ca |
| Production (www) | https://www.techsynergy.ca |
| Backend API | https://wweb.api.techsynergy.ca |
| Amplify Default | https://main.d3i5z3t11ekgps.amplifyapp.com |
| Admin CMS | https://techsynergy.ca/admin |

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS 4, Framer Motion
- **Backend**: Next.js API Routes (Route Handlers)
- **Database**: AWS DynamoDB (single-table design)
- **Auth**: NextAuth.js v5 (credentials-based)
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
| IAM Role | `AmplifyTechSynergyRole` |
| Route 53 Zone | `Z02887593A9CGVSQWKPTI` |
| ACM Cert (API) | `5b5e8571-3930-4873-8814-a4b680ef4747` |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact inquiry |
| GET/POST | `/api/admin/services` | List/create services |
| GET/PUT/DELETE | `/api/admin/services/[id]` | Read/update/delete service |
| GET/POST | `/api/admin/portfolio` | List/create portfolio items |
| GET/PUT/DELETE | `/api/admin/portfolio/[id]` | Read/update/delete portfolio item |
| GET/POST | `/api/admin/blog` | List/create blog posts |
| GET/PUT/DELETE | `/api/admin/blog/[id]` | Read/update/delete blog post |
| GET/PATCH | `/api/admin/inquiries` | List/update inquiry status |

## Deployment

Pushing to `main` branch automatically triggers an Amplify CI/CD build and deploy.

```bash
git push origin main
```
