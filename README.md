## Introduction

Nitchi is a full-stack social media app and a note sharing platform. You can see it as a mix between Twitter and Notion. It's built with Next.js 15. 

Here's the features and technologies that i will use inside it:

- Next.js 15
- Server actions and server components
- TanStack React Query
- Optimistic updates
- Infinite scrolling feeds
- File uploads with drag & drop and copy-paste support (UploadThing)
- Like system
- Follow system
- Comment system
- Notification system
- DM system 
- Bookmarks
- Lucia authentication (username/password & Google OAuth2)
- Postgres DB with Prisma ORM
- Hashtags & mentions
- Full-text search
- Advanced caching & revalidation
- Mobile-responsive layout with Tailwind CSS & Shadcn UI components
-  theme, light theme, and system theme
- Real-time form validation with React Hook Form & Zod
- TipTap editor
- Federation with ActivityPub

Nitchi is a rewriting of a beatiful project proposed here by [Coding in Flow on Youtube](https://www.youtube.com/watch?v=TyV12oBDsYI&t=9311s)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). 

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
