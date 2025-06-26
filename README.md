# TRADING-TABBU

## Overview

This full-stack application leverages Node.js on the backend and React on the frontend to interact with Upstox APIs and display real-time market data.

- **WebServer** : This has whole of the node js code where main server calls happen
- **WebClient** : This has the react application running on vite that consumes the api data and fetches to the user.

### Backend

- **Node.js and Express**: The backend is built using Node.js and Express to create a RESTful API server.
- **Upstox API Integration**: The server connects to Upstox APIs to fetch real-time market data, such as stock quotes, user profiles, and authentication tokens.
- **Endpoints**: Provides various endpoints for user authentication, and session management.
- **Dependencies**: Utilizes packages like `axios` for HTTP requests, `express` for server handling, and `jsonwebtoken` for token management.

### Frontend

- **React**: The frontend uses React to create a dynamic, single-page application.
- **API Consumption**: React components make use of `axios` to call backend endpoints and fetch data.
- **Routing**: Utilizes `react-router` for navigation and handling different views such as home, explore, and callback pages.
- **Styling**: Incorporates `tailwindcss` for styling components with utility-first classes.

### Key Features

- Secure user authentication and session management.
- Real-time market data fetching and display.
