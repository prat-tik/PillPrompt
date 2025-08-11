# PillPrompt

Full‑stack application for personal medication schedule, reminders, and adherence tracking.

## Team
Pratik Khatiwada
Preeti Rijal
Sampada Ghimire

## Overview
Enables users to register medications, set dosage schedules, receive reminders, record intake, and view adherence analytics. Secure role/auth layer prepared for future caregiver / admin roles.

## Demo Test User (Optional)
- email: test@example.com  
- password: testpassword  

## Tech Stack
**Frontend:** React, React Router, Tailwind CSS, Axios, React Toastify  
**Backend:** Node.js, Express, PostgreSQL, JWT, bcrypt  
**Scheduling / Jobs:** node-cron (or equivalent)  
**Auth:** JWT (access) + bcrypt hashing

## Key Features
### Medication Management
- Add / edit / archive medications
- Dosage, form, strength, instructions

### Scheduling & Reminders
- Custom frequency (daily, interval, specific weekdays, times)
- Upcoming dose list
- (Pluggable) notification channels (email / push placeholder)

### Intake Logging
- Mark taken / skipped / delayed
- Notes per dose

### Adherence Insights
- Daily / weekly adherence %
- Missed dose trends

### Security
- JWT protected API
- Password hashing with bcrypt
- Input validation / sanitization

## Prerequisites
- Node.js (LTS) + npm
- PostgreSQL
- (Optional) SMTP credentials for email reminders
- Modern browser

## Installation

### Clone
```
git clone https://github.com/yourusername/PillPrompt.git
cd PillPrompt
```

### Backend
```
cd backend
npm install
```
Create `.env`:
```
CONNECTION_STRING=postgresql://user:pass@host:5432/dbname
JWT_SECRET=your_jwt_secret
PORT=3000
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_user
EMAIL_PASS=your_pass
```
Run:
```
npm run dev
```
API: http://localhost:3000

### Frontend
```
cd ../frontend
npm install
```
Create `.env`:
```
VITE_API_BASE_URL=http://localhost:3000/api
```
Run:
```
npm run dev
```
App: http://localhost:5173

### SQL Schema (sqlschema)
Suggested:
- `schema.sql` (tables: users, medications, schedules, doses, intake_logs, notifications)
- `seed.sql` (sample meds + user)
Apply:
```
psql -d your_db -f schema.sql
psql -d your_db -f seed.sql
```

## Usage
1. Open http://localhost:5173  
2. Register / Login  
3. Add medication & define schedule  
4. View upcoming doses  
5. Mark doses taken or skipped  
6. Check adherence dashboard  

## Directory Structure
```
PillPrompt
├── backend
│   ├── controller
│   ├── database
│   ├── middleware
│   ├── model
│   ├── routes
│   ├── jobs
│   ├── utils
│   ├── index.js
│   └── package.json
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   ├── routes
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public
│   ├── index.html
│   └── package.json
├── sqlschema
│   ├── schema.sql
│   └── seed.sql
└── README.md
```

## API Docs
Swagger (if enabled): http://localhost:3000/api-docs

## Common Challenges
- Recurrence rule normalization
- Timezone handling for dose times
- Idempotent reminder dispatch
- Efficient adherence analytics queries

## Future Enhancements
- Push notifications (service worker / mobile)
- Caregiver shared access
- Refill tracking & inventory
- Offline first (IndexedDB sync)
- Accessibility & dark mode

## Contributing
1. Fork  
2. Branch (feat/...)  
3. Commit (conventional)  
4. PR  

## License
MIT License.

## Acknowledgments
Developed for health management learning project.

---
Developed for PillPrompt Project
