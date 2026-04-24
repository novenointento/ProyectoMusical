# Development Guide

## Backend

```bash
cd backend
npm install
npm run dev
```

## Frontend

```bash
cd frontend
npm install
npm start
```

## Prisma

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

## Recommended workflow

1. Create or update an OpenSpec change.
2. Break implementation into tasks.
3. Replace template examples with real product behavior.
4. Run tests before closing the change.
