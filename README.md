# Ascend Trade Commercial Website

Animated, single-page corporate website for Ascend Trade Commercial Pvt Ltd. The frontend is built with React, TypeScript, Vite, GSAP, Motion, and the client-supplied brand kit.

## Requirements

- Node.js 24 or another version supported by the installed Vite release
- npm

## Start the frontend

```powershell
Set-Location frontend
npm.cmd install
npm.cmd run dev
```

Open http://localhost:5173/.

## Verify the frontend

```powershell
Set-Location frontend
npm.cmd run lint
npm.cmd run build
npm.cmd run test:e2e
```

The contact form currently performs browser-side validation only. Email delivery is intentionally reserved for a later phase.

## Optional backend scaffold

The existing FastAPI health-check scaffold remains in `backend/`, but the website does not currently call it.
