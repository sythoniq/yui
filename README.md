# Yui

A full-stack real-time-style messaging app — users can sign up, 
send direct messages, and manage their profile.

## Features
- User authentication (JWT-based signup/login)
- One-to-one messaging
- Profile editing with image upload
- [anything else that's actually working]

## Tech Stack
**Frontend:** React, CSS Modules, React Router
**Backend:** Node.js, Express
**Database:** PostgreSQL (via Prisma)
**Storage:** Supabase (for profile images)

## Screenshots
![Alt Text](./assets/ss-1.png?raw=true "Screenshot of app")
![Alt Text](./assets/ss-2.png?raw=true "Screenshot of app")
![Alt Text](./assets/ss-3.png?raw=true "Screenshot of app")

## Running Locally
1. Clone the repo
2. `cd backend && npm install`
3. Copy `.env.example` to `.env` and fill in your own values
4. `npx prisma migrate dev`
5. `npm run dev`
6. `cd ../frontend && npm install && npm run dev`

## Known Limitations
- No real-time updates yet (WebSockets planned)
- Form validation still in progress
- Forced to rerender entire page upon sending a message
