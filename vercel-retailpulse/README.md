# RetailPulse Vercel Edition

This is a Vercel-ready reinterpretation of the RetailPulse analytics dashboard.
It keeps the same product story: sales intelligence, customer health, forecasting,
inventory planning, alerts, and exports. The implementation is rewritten as a
Next.js interface so it can be deployed on Vercel without relying on a long-running
Streamlit server.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

```bash
npx vercel --prod
```

The original Streamlit project remains in the parent folder.
