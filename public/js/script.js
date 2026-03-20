//cari koin and show it up function
function cariKoin() {
        const input = document.getElementById('idInput').value.toLowerCase();
        const koin = daftarKoin.find(k => k.id === input || k.symbol === input);

        const formatter = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumSignificantDigits: 15
        });
        if (koin) {
            // Update Visual & Teks Dasar
            document.getElementById('gambar-koin').src = koin.image;
            document.getElementById('nama-koin').innerText = koin.name;
            document.getElementById('simbol-koin').innerText = koin.symbol.toUpperCase();
            document.getElementById('rank-koin').innerText = "Rank #" + koin.market_cap_rank;

            // Update Harga & High/Low menggunakan formatter
            document.getElementById('val-price').innerText = formatter.format(koin.current_price);
            document.getElementById('val-high').innerText = formatter.format(koin.high_24h);
            document.getElementById('val-low').innerText = formatter.format(koin.low_24h);

            // Update Perubahan Harga & Warna (Hijau/Merah)
            const changeAbs = document.getElementById('val-change-abs');
            const changePct = document.getElementById('val-change-percent');

            // Gunakan formatter untuk harga absolut agar konsisten
            changeAbs.innerText = formatter.format(koin.price_change_24h);
            changePct.innerText = koin.price_change_percentage_24h.toFixed(2) + "%";

            const color = koin.price_change_24h >= 0 ? '#01a316' : '#ff4444';
            changeAbs.style.color = color;
            changePct.style.color = color;

            // Update Market Data
            document.getElementById('val-marketcap').innerText = formatter.format(koin.market_cap);
            document.getElementById('val-volume').innerText = formatter.format(koin.total_volume);
            document.getElementById('val-circulating').innerText = formatter.format(koin.circulating_supply);
            document.getElementById('val-total-supply').innerText = koin.total_supply ? formatter.format(koin.total_supply) : 'N/A';
            document.getElementById('val-max-supply').innerText = koin.max_supply ? formatter.format(koin.max_supply) : '∞';
            }
    }


setInterval(() => {
    const now = Date.now();
    const remaining = nextUpdate - now;
    if (remaining <= 0) {
      // Tampilkan pesan agar user tahu akan ada update
      document.getElementById('timer-text').innerText = "Memperbarui data...";
      
      // Tunggu 5 detik (5000ms) baru reload
      setTimeout(() => {
          location.reload();
      }, 5000);
      
      // Hentikan interval agar tidak memicu setTimeout berkali-kali
      return; 
      }
    
    const seconds = Math.floor((remaining / 1000) % 60);
    const minutes = Math.floor((remaining / (1000 * 60)) % 60);
    document.getElementById('timer-text').innerText = `Next Data Update: ${minutes}m ${seconds}s`;
}, 1000);


