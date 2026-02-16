# NexChain — Web3 Wallet Dashboard

> A cyber-industrial, brutalist-lite dashboard for Ethereum portfolio tracking.

[![Deployment Status](https://img.shields.io/badge/Deployment-Live-success?style=for-the-badge&logo=vercel)](https://nex-chain-weld.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Stack-Next.js%2016%20%7C%20Ethers.js%20%7C%20Tailwind-blue?style=for-the-badge)](https://nextjs.org)

**🔗 Live Demo:** [https://nex-chain-weld.vercel.app](https://nex-chain-weld.vercel.app)

---

## 📑 Table of Contents
- [Overview](#-overview)
- [Features & Capabilities](#-features--capabilities)
- [Design System](#-design-system)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Technical Challenges & Solutions](#-technical-challenges--solutions)
- [License](#-license)

---

## 🔭 Overview

NexChain is a frontend coding challenge submission designed to demonstrate proficiency with modern Web3 tooling. Unlike standard wallet adapters, NexChain focuses on **engineering rigor**, **state persistence**, and a **distinct visual identity** inspired by high-performance computing consoles (e.g., Oxide Computer).

The application connects to the Ethereum Mainnet to fetch real-time data without relying on heavy third-party APIs, reading directly from the blockchain via RPC.

---

## ✨ Features & Capabilities

### 🔐 Core Wallet Integration
- **MetaMask Connection:** Secure integration via `window.ethereum` API.
- **Smart Detection Logic:**
  - Detects if MetaMask is installed.
  - If missing, dynamically changes UI to provide an **"Install MetaMask"** direct link.
  - Handles "User Rejected" and "Pending" states gracefully.
- **State Persistence:** Uses `localStorage` to remember session state, automatically reconnecting the user upon page reload.

### 📊 Data Visualization
- **Real-Time ETH Balance:** Fetches native Ethereum balance.
- **ERC-20 Token Tracking:** Interacts with the **USDT Smart Contract** (`0xdac...1ec7`) to fetch balances.
- **ENS Resolution:** Automatically reverse-resolves addresses (e.g., `0xd8...9f`) to ENS names (e.g., `vitalik.eth`) for better UX.

### 🛡️ Network & Security
- **Chain Validation:** Detects current network chain ID.
- **Mainnet Enforcement:** Visually warns users if they are connected to Testnets or L2s (Arbitrum/Optimism) when viewing Mainnet-only assets (USDT).
- **Address Privacy:** Automatically truncates long addresses (`0x1234...5678`).

### ⚡ UX Enhancements
- **Toast Notifications:** Custom-styled alerts for connection success, errors, and clipboard actions (using `react-hot-toast`).
- **Clipboard Management:** One-click copy for wallet addresses.
- **Loading States:** Custom CSS spinners and skeleton loaders for data fetching.
- **Responsive Layout:** Grid-based layout that adapts from mobile to desktop.

---

## 🎨 Design System

The UI rejects standard "Glassmorphism" in favor of a **Cyber-Industrial** aesthetic.

| Element | Specification |
| :--- | :--- |
| **Typeface** | **JetBrains Mono** (Data/Code) + **Inter** (UI) |
| **Primary Color** | `#48d597` (Signal Green) |
| **Background** | `#080f11` (Deep Void Black) |
| **Error Color** | `#fb6e88` (Alert Pink) |
| **Animations** | CSS Keyframes: `slide-up`, `fade-in`, `pulse-dot` |
| **Borders** | 1px Solid `#ffffff0f` (Structural) |

---

## 🛠 Tech Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **Styling:** Tailwind CSS v3.4 + PostCSS
- **Blockchain Library:** Ethers.js v6.13
- **Icons:** Custom SVG + Emoji integration
- **Deployment:** Vercel (CI/CD)

---

## 📂 Project Structure

```bash
nexchain-wallet/
├── public/
│   └── logo.svg              # Brand asset
├── src/
│   ├── app/
│   │   ├── globals.css       # Tailwind directives & Custom Keyframes
│   │   ├── layout.js         # Root layout + Font Optimization (Inter/JetBrains)
│   │   └── page.js           # Main Dashboard & View Controller
│   ├── components/
│   │   ├── BalanceCard.jsx   # Displays Asset + Amount (with skeleton load)
│   │   ├── CopyButton.jsx    # Interactive clipboard tool
│   │   ├── NetworkBadge.jsx  # Status indicator (Mainnet vs Testnet)
│   │   ├── Spinner.jsx       # CSS-based loading animation
│   │   └── WalletButton.jsx  # Multifunctional Connect/Disconnect button
│   └── hooks/
│       └── useWallet.js      # CUSTOM HOOK: Encapsulates all Web3 logic
├── next.config.mjs           # Custom Webpack config
├── tailwind.config.js        # Design tokens & color palette
└── package.json              # Dependency manifest


## ⚙️ Installation & Setup

To run this project locally, follow these commands in your terminal.

**1. Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/nexchain-wallet.git
cd nexchain-wallet
```

**2. Install Dependencies**
```bash
npm install
```

**3. Fix Tailwind Version**
*Note: We explicitly use Tailwind v3.4 to prevent Next.js 16 from defaulting to the v4 alpha build.*
```bash
npm install -D tailwindcss@3.4.17 postcss autoprefixer
```

**4. Run Development Server**
*Note: We use the `--webpack` flag to ensure Ethers.js compatibility with the build system.*
```bash
npm run dev
```

Visit `http://localhost:3000` to view the app.

---

## 🐛 Technical Challenges & Solutions

### 1. The "Next.js 16 vs Ethers.js" Build Conflict
**Issue:** Next.js 16 uses Turbopack by default. Ethers.js relies on several Node.js modules (`encoding`, `pino-pretty`) that cause build failures in Turbopack.
**Solution:**
- Modified `next.config.mjs` to add these modules to `webpack.externals`.
- Updated `package.json` build scripts to force Webpack usage: `"build": "next build --webpack"`.

### 2. Client-Side Hydration Mismatch
**Issue:** Accessing `window.ethereum` directly in component bodies causes Server-Side Rendering (SSR) crashes because `window` is undefined on the server.
**Solution:**
- Implemented a strictly typed `useEffect` check within the `useWallet` hook.
- All Web3 logic is guarded by `if (typeof window !== 'undefined')`.

### 3. PostCSS Config Loading
**Issue:** Using ES Modules (`.mjs`) alongside CommonJS Tailwind configs caused the CSS engine to hang during compilation.
**Solution:**
- Renamed `postcss.config.js` to `postcss.config.cjs` to explicitly define the module system for the CSS processor.

---

## 📄 License

This project is submitted as a technical assignment.
Open source under the [MIT License](LICENSE).

---

<p align="center">
  <span style="font-family: monospace; color: #666;">
    ENGINEERED WITH PRECISION
  </span>
</p>
