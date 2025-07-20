# DealerADO

**DealerADO** is a full-stack B2B API service platform built for verified car dealers. It allows access to premium automotive APIs through a secure credit-based wallet system. The platform includes an admin dashboard for user management, service configuration, and transaction tracking.

---

## 🔧 Tech Stack

- **Frontend:** Next.js 15 (App Router) + Tailwind CSS
- **Backend:** Django + Django REST Framework (Token Authentication)
- **Database:** PostgreSQL
- **Deployment:** Cloud-ready (Docker/AWS recommended)
- **Security:** HTTPS (SSL), RBAC, API Rate Limiting

---

## 🚀 Features

### User Panel
- Secure login (admin-created only)
- API Services dashboard (with dynamic form input per service)
- Wallet system with credit deduction per API hit
- API result display + PDF download
- Recharge wallet via WhatsApp workflow
- Profile view and transaction history

### Admin Panel (Django Admin)
- Create/edit/delete users
- Wallet recharge and deduction logs
- API/service configuration (dynamic field mapping)
- Banner manager for frontend
- API usage history with filters and exports (CSV/Excel)
- Role-based admin access (Super Admin / Sub Admin)

---

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/dealerado.git
cd dealerado
```
### 2. Setup the backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
### 3. Setup the frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

You will need to set environment variables for both frontend and backend
