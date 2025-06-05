# Composio Dashboard

This is a Next.js-based dashboard for managing Composio apps, integrations, and connections.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env.local` file in the `composio-dashboard` directory with the following content:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Security Note

This frontend application does not handle the Composio API key directly. The API key is stored and used only in the backend service. This approach ensures that sensitive credentials are not exposed to client-side code or stored in the browser.

## Features

- **Apps Management**: Browse and view available apps
- **Integrations Management**: Create and manage integrations
- **Connections Management**: Initiate connections for integrations
- **OAuth Support**: Handle OAuth flows for third-party services

## Directory Structure

```
composio-dashboard/
├── components/       # React components
├── lib/              # Utility functions and API client
├── pages/            # Next.js pages
├── public/           # Static assets
├── styles/           # CSS styles
├── .env.local        # Environment variables (create this file)
└── next.config.js    # Next.js configuration
```

## API Integration

The dashboard communicates with the backend API using the API client defined in `lib/api-client.ts`. All API requests are made directly from the server to the backend, without exposing the API key to the client.

## Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
