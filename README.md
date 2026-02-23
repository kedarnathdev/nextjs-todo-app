# Next.js Todo App

A production-ready Todo application built with Next.js 15 App Router, Vercel Postgres, and custom JWT authentication.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Vercel Postgres (Neon)
- **Auth**: Custom JWT via `jose` + bcrypt password hashing
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Features

- User registration and login
- HTTP-only cookie sessions (XSS-safe)
- Per-user todo isolation (IDOR-safe)
- Full CRUD: create, toggle, edit, delete todos
- Server Actions for mutations
- Protected routes via middleware

## Getting Started

```bash
npm install
vercel env pull .env.local
npm run migrate
npm run dev
```

## Deployment

```bash
vercel --prod
```
