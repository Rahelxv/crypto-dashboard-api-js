# 📈 CoinSurgeon - Full-Stack Crypto & Web3 Dashboard

![Live Demo](https://img.shields.io/badge/Live_Demo-Online-success?style=for-the-badge&logo=render)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**CoinSurgeon** is a full-stack web dashboard application that provides real-time data on cryptocurrencies, NFTs, and investment narratives. Built with a strong focus on performance efficiency and optimal API call management.

🌐 **Live Demo:** [https://crypto-dashboard-api-js.onrender.com/](https://crypto-dashboard-api-js.onrender.com/)
> ⚠️ **Important Note (Render Cold Start):** This application is hosted on Render's free tier. If the site is accessed for the first time after a period of inactivity, the server may take **1 to 5 minutes** to spin up (wake from sleep mode).

---

## 🚀 Key Features

* **Real-Time Market Data:** Displays the Top 250 Cryptocurrencies by market cap, including live price, volume, circulating supply, ATH/ATL, and 24-hour percentage changes.
* **Trending Ecosystem:** Tracks the latest market trends, including trending coins, top NFT collections, and broader investment narratives (e.g., Web3, Layer 1, DeFi).
* **Smart Search Engine:** Instant, client-side search functionality to find specific coins by name or symbol without reloading the page.
* **Data Sorting & Filtering:** Sort data by Rank (Ascending/Descending) or Alphabetically (A-Z/Z-A).
* **Auto-Refresh & Countdown Timer:** Features an interactive countdown timer synchronized with the server to automatically fetch and display the latest data every 5 minutes.

## 🛠️ Tech Stack (Full-Stack Implementation)

**Backend:**
* **Node.js & Express.js:** Handles server routing and core backend logic.
* **Axios:** Performs HTTP requests to external APIs.
* **Node File System (`node:fs`):** Utilized to build a robust local caching system, storing API responses in JSON format.
* **EJS (Embedded JavaScript):** The templating engine used to dynamically render backend data (SSR - Server-Side Rendering) into the HTML view.

**Frontend:**
* **HTML5 & CSS3:** Structure and styling for a fully responsive user interface.
* **Vanilla JavaScript:** Manages DOM interactivity, search logic (array filtering), number formatting (`Intl.NumberFormat`), and the countdown timer mechanics.

**API & Hosting:**
* **CoinGecko API v3:** The primary source for cryptocurrency market data.
* **Render:** Cloud platform used for live deployment.

---

## 🧠 Architecture & System Logic (Technical Highlights)

This project goes beyond standard API fetching by implementing an efficient **Background Fetching & Local Caching Mechanism**:

1.  **Preventing Rate Limits:** Instead of making a request to the CoinGecko API every time a user visits the site, the Node.js server automatically performs background requests using `setInterval` every 5 minutes.
2.  **Local JSON Caching:** The fetched API data is formatted into a payload (appended with a timestamp) and saved locally into `raw_price.json` and `trending.json` using `fs.writeFileSync`.
3.  **Fast Server-Side Rendering (SSR):** When a user accesses the main route (`/`), the server simply reads the existing local JSON files (`fs.readFileSync`) and passes that data directly to the EJS template. This drastically reduces server response time and minimizes API bandwidth usage.

---

## 💻 Local Installation & Setup

If you want to run this project on your local machine:

1. **Clone this repository:**
   ```bash
   git clone [https://github.com/Rahelxv/crypto-dashboard-api-js.git](https://github.com/Rahelxv/crypto-dashboard-api-js.git)
   cd crypto-dashboard-api-js

2. **Install dependencies:**
   ```bash
   npm install
3. **Setup Environment Variables:**
    ```bash
    PORT=3000
    COINGECKO_API_KEY=your_api_key_here
4. **Prepare the Cache Directory**
    ```bash
    mkdir data
5. Run the application
    ```bash
   npm start
6. Access the app
     ```bash
    http://localhost:3000
