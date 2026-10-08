# Octofit Tracker presentation tier

The React 19 application is built with Vite, React Router, and Bootstrap. Its
views read activity, leaderboard, team, user, and workout collections from the
Octofit API.

## API configuration

When running the frontend in a GitHub Codespace, define
`VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` using the
Codespace name:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite exposes this variable to the client at build/dev-server startup, so restart
Vite after changing `.env.local`. In a local non-Codespaces environment, the
frontend safely falls back to `http://localhost:8000` when the variable is
unset. The backend must be running and allow requests from the frontend origin.

## Run locally

```bash
npm run dev --prefix octofit-tracker/frontend
```

Open the Vite development server on port `5173`.
