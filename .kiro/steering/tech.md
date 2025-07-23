# Technology Stack & Build System

## Frontend Stack
- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI primitives (@radix-ui/react-*)
- **Icons:** Lucide React
- **Utilities:** clsx, tailwind-merge, class-variance-authority
- **Runtime:** React 19.1.0

## Backend Stack
- **Framework:** Django 5.2.4
- **API:** Django REST Framework 3.16.0
- **Authentication:** Token-based authentication
- **Database:** PostgreSQL (production), SQLite (development)

## Development Tools
- **Linting:** ESLint with Next.js config
- **Build Tool:** Turbopack (Next.js)
- **Package Manager:** npm

## Common Commands

### Frontend Development
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start development server (with Turbopack)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd backend
python3 -m venv venv           # Create virtual environment
source venv/bin/activate       # Activate virtual environment (Linux/Mac)
venv\Scripts\activate          # Activate virtual environment (Windows)
pip install -r requirements.txt # Install dependencies
python manage.py migrate       # Run database migrations
python manage.py runserver     # Start development server
python manage.py createsuperuser # Create admin user
```

## Deployment
- **Target:** Cloud-ready (Docker/AWS recommended)
- **Security:** HTTPS/SSL required, API rate limiting
- **Environment:** Separate environment variables for frontend and backend