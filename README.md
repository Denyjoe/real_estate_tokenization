# StellarEstate

Real Estate Tokenization platform – tokenize real estate on Stellar. React frontend with Stripe Lite–style UI, Tailwind CSS, and mock data.

## Tech stack

- React (functional components)
- Tailwind CSS (PostCSS)
- React Router
- Vite
- Mock data only (no backend)

## Run locally

If you see **"running scripts is disabled on this system"** in PowerShell, use the batch scripts instead (they don’t use PowerShell scripts):

```powershell
.\install.cmd
.\run-dev.cmd
```

Or double-click `install.cmd` then `run-dev.cmd` in File Explorer.

Otherwise:

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
stellar-estate-react/
├── public/
├── src/
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   ├── pages/
│   │   ├── LandingPage.js
│   │   └── Dashboard.js
│   ├── components/
│   │   ├── Sidebar.js
│   │   ├── Navbar.js
│   │   ├── PropertyCard.js
│   │   ├── WalletCard.js
│   │   ├── ActionCard.js
│   │   └── TransactionsTable.js
│   └── data/
│       └── mockData.js
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Features

- **Landing page:** Headline, CTA buttons (Create Wallet, Open Dashboard).
- **Dashboard:** Sidebar (Dashboard, Properties, Wallet, Transactions), navbar with Stellar Testnet badge and wallet status, property cards, wallet card, quick actions (Buy / Transfer / View Transactions), transactions table.
- **Responsive:** Mobile-friendly with hamburger menu and slide-out sidebar.
- **Interactions:** React Router navigation; Buy/Transfer tokens show alerts (placeholder for future backend).
