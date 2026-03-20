import express from 'express'
import fs from 'node:fs'
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


//cypto data basic api taking
const marketDataUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&price_change_percentage=1h'

const INTERVAL_MS = 5 * 60 * 1000; // 5 Menit

async function autoFetchTask() {
    try {
        console.log("--- Memulai Background Fetch (Setiap 5 Menit) ---");
        const response = await axios.get(marketDataUrl, { 
            timeout: 10000 
        });
        
        const payload = {
            data: response.data,
            timestamp: Date.now(),
            nextUpdate: Date.now() + INTERVAL_MS
        };

        fs.writeFileSync('./data/raw_price.json', JSON.stringify(payload));
        console.log("Data basic cypto berhasil disimpan ke file lokal.");
    } catch (error) {
        console.error("Gagal mengambil data:", error.message);
    }
}

setInterval(autoFetchTask, INTERVAL_MS);
autoFetchTask();

//trending crypto basic api taking
const marketDataUrl_trd = 'https://api.coingecko.com/api/v3/search/trending'

const INTERVAL_MS_trd = 5 * 60 * 1000; // 5 Menit

async function autoFetchTask_trd() {
    try {
        console.log("--- Memulai Background Fetch (Setiap 5 Menit) ---");
        const response = await axios.get(marketDataUrl_trd, { 
            timeout: 10000 // Jika 10 detik tidak ada respon, anggap gagal
        });
        
        const payload = {
            data: response.data,
            timestamp: Date.now(),
            nextUpdate: Date.now() + INTERVAL_MS_trd
        };

        fs.writeFileSync('./data/trending.json', JSON.stringify(payload));
        console.log("Data trending berhasil disimpan ke file lokal.");
    } catch (error) {
        console.error("Gagal mengambil data:", error.message);
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

        res.render('index', { 
            crypto: marketData, 
            nextUpdate: marketData.nextUpdate,
            coins: marketData.data,
            
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
            crypto_trd: [], 
            nft: [], 
            category: [] 
        });
    }
});


















app.listen(port, () => {
    console.log(`Server jalan di http://localhost:${port}`);
});