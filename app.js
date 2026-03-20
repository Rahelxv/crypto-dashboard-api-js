import express from 'express'
import fs from 'node:fs'
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// --- SISTEM API KEY OTOMATIS DARI RENDER ---
const API_KEY = process.env.COINGECKO_API_KEY || ''; 
const keyParam1 = API_KEY ? `&x_cg_demo_api_key=${API_KEY}` : '';
const keyParam2 = API_KEY ? `?x_cg_demo_api_key=${API_KEY}` : '';

//cypto data basic api taking
const marketDataUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&price_change_percentage=1h${keyParam1}`;

const INTERVAL_MS = 5 * 60 * 1000; // 5 Menit

async function autoFetchTask() {
    try {
        console.log("--- Memulai Background Fetch Basic ---");
        const response = await axios.get(marketDataUrl, { timeout: 10000 });
        
        const payload = {
            data: response.data,
            timestamp: Date.now(),
            nextUpdate: Date.now() + INTERVAL_MS
        };

        fs.writeFileSync('./data/raw_price.json', JSON.stringify(payload));
        console.log("Data basic crypto berhasil disimpan.");
    } catch (error) {
        console.error("Gagal mengambil data basic:", error.message);
    }
}

setInterval(autoFetchTask, INTERVAL_MS);
autoFetchTask();

//trending crypto basic api taking
const marketDataUrl_trd = `https://api.coingecko.com/api/v3/search/trending${keyParam2}`;

const INTERVAL_MS_trd = 5 * 60 * 1000; // 5 Menit

async function autoFetchTask_trd() {
    try {
        console.log("--- Memulai Background Fetch Trending ---");
        const response = await axios.get(marketDataUrl_trd, { timeout: 10000 });
        
        const payload = {
            data: response.data,
            timestamp: Date.now(),
            nextUpdate: Date.now() + INTERVAL_MS_trd
        };

        fs.writeFileSync('./data/trending.json', JSON.stringify(payload));
        console.log("Data trending berhasil disimpan.");
    } catch (error) {
        console.error("Gagal mengambil data trending:", error.message);
    }
}

setInterval(autoFetchTask_trd, INTERVAL_MS_trd);
autoFetchTask_trd();


app.get('/', (req, res) => {
    try {
        const marketFile = fs.readFileSync('./data/raw_price.json', 'utf8');
        const marketData = JSON.parse(marketFile);

        const trendingFile = fs.readFileSync('./data/trending.json', 'utf8');
        const trendingData = JSON.parse(trendingFile);

        // --- HITUNG DETIK TERSISA UNTUK DIKIRIM KE BROWSER ---
        const sisaWaktuDetik = Math.max(0, Math.floor((marketData.nextUpdate - Date.now()) / 1000));

        res.render('index', { 
            crypto: marketData, 
            nextUpdate: marketData.nextUpdate,
            coins: marketData.data,
            sisaWaktu: sisaWaktuDetik, // Kirim ke EJS
            
            crypto_trd: trendingData.data.coins,
            nft: trendingData.data.nfts, 
            category: trendingData.data.categories
        }); 

    } catch (e) {
        console.error("Error reading files:", e.message);
        res.render('index', { 
            crypto: [], 
            nextUpdate: null, 
            coins: [],
            sisaWaktu: 0, // Nilai default jika error
            crypto_trd: [], 
            nft: [], 
            category: [] 
        });
    }
});

app.listen(port, () => {
    console.log(`Server jalan di http://localhost:${port}`);
});