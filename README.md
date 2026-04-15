# Gift Recommender Frontend

Next.js frontend for the AI-powered gift recommendation wizard.

## Prerequisites

- Node.js 18+
- The backend API running (see `/backend`)

## Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Running

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How it works

1. The wizard fetches its 14 questions from `GET /api/questions`
2. User answers are submitted to `POST /api/recommend`
3. Results are stored in `sessionStorage` and displayed on `/results`
4. Clicking a product card opens `/results/[id]` with a detail view and a direct Trendyol link
