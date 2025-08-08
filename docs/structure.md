# Project Structure & Organization

## Root Structure
```
dealerado/
├── frontend/          # Next.js application
├── backend/           # Django application
├── .kiro/            # Kiro AI assistant configuration
├── .git/             # Git repository
├── README.md         # Project documentation
└── LICENSE           # License file
```

## Frontend Structure (Next.js App Router)
```
frontend/
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
│   ├── ui/          # Base UI components (Button, Input, Label)
│   └── login/       # Feature-specific components
├── lib/             # Utility functions and configurations
├── public/          # Static assets
│   └── images/      # Image assets organized by feature
├── styles/          # Global styles and Tailwind config
├── package.json     # Dependencies and scripts
└── next.config.mjs  # Next.js configuration
```

## Backend Structure (Django)
```
backend/
├── dealerado/       # Main Django project directory
├── accounts/        # User management app
├── wallet/          # Wallet and credit system app
├── manage.py        # Django management script
└── requirements.txt # Python dependencies
```

## Code Organization Patterns

### Frontend Components
- Use functional components with hooks
- Component files use `.jsx` extension
- Import UI components from `@/components/ui/`
- Use absolute imports with `@/` prefix
- Organize components by feature in subdirectories

### Styling Conventions
- Tailwind CSS for all styling
- Use Tailwind utility classes directly in JSX
- Custom colors: `#c53030` (primary red), `#2d3748` (dark gray)
- Responsive design with mobile-first approach

### Backend Apps
- Django apps organized by business domain
- `accounts/` - User authentication and management
- `wallet/` - Credit system and transactions
- `dealerado/` - Main project settings and configuration

### File Naming
- Frontend: camelCase for components, kebab-case for directories
- Backend: snake_case following Django conventions
- Static assets organized by feature/page in subdirectories