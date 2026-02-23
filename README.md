# Summer of Bitcoin Organizations

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](CONTRIBUTING.md)
[![Made with Love](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red.svg)](https://github.com/Jaydeep869)

A site for exploring and analyzing the organizations participating in [Summer of Bitcoin](https://www.summerofbitcoin.org/) — filter them by year, technology, topics, and more.

<p align="center">
  <img src="sob_logo.png" alt="Summer of Bitcoin" width="120" />
</p>

## ✨ Features

- **Browse** all Summer of Bitcoin organizations across all years (2021–2025)
- **Filter** by year, technology stack, and topics
- **View** detailed org pages with project history graphs and student project info
- **Find** first-time organizations with a dedicated toggle
- **Search** organizations by name
- **Responsive** design — works great on desktop and mobile

## 🛠️ Tech Stack

- [React](https://react.dev/) — UI framework
- [Vite](https://vite.dev/) — Build tool with HMR
- [Material UI (MUI)](https://mui.com/) — Component library
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [Recharts](https://recharts.org/) — Charts and graphs
- [React Router](https://reactrouter.com/) — Client-side routing

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Jaydeep869/SOB_Organizations.git
cd SOB_Organizations

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173/`.

### Build for Production

```bash
npm run build
npm run preview
```

## 📂 Project Structure

```
├── src/
│   ├── assets/           # Images and static assets
│   ├── components/       # Reusable UI components
│   │   ├── FilterBlock.jsx
│   │   ├── OrgCard.jsx
│   │   └── Sidebar.jsx
│   ├── pages/            # Route pages
│   │   ├── Home.jsx
│   │   └── OrgDetail.jsx
│   ├── utils/            # Utility functions
│   │   └── slugify.js
│   ├── data.js           # Organization data
│   ├── theme.js          # MUI theme configuration
│   └── main.jsx          # App entry point
├── public/               # Public static files
├── index.html
├── vite.config.js
└── package.json
```

## 🤝 Contributing

Contributions are most welcome! Whether it's reporting a bug, suggesting a feature, or sending a pull request — every contribution helps.

Please read the [Contributing Guide](CONTRIBUTING.md) to get started.

## 📊 Data

The organization data is sourced from the [Summer of Bitcoin](https://www.summerofbitcoin.org/) website, including:

- Organization names and GitHub links
- Participation years and project counts
- Student names and project descriptions (where available)
- Technologies and topics

If you notice any incorrect or missing data, please open an issue or submit a PR to update `src/data.js`.

## 🙏 Credits & Acknowledgements

- **[Summer of Bitcoin](https://www.summerofbitcoin.org/)** — For running this incredible program and making all the data publicly available.
- **[GSoC Organizations](https://github.com/nishantwrp/gsoc-organizations)** by [@nishantwrp](https://github.com/nishantwrp) — This project was heavily inspired by this amazing GSoC organizations explorer. Huge thanks for the idea and the open-source spirit!

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  If you find this useful, please ⭐ star the repo — it helps!
</p>
