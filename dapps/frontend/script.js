// --- KONFIGURASI MAHASISWA (WAJIB GANTI) ---
const MY_NAME = "Adi Pramadianto Putra"; 
const MY_NIM = "231011401040"; 

const connectBtn = document.getElementById("connectBtn");
const statusEl = document.getElementById("status");
const addressEl = document.getElementById("address");
const networkEl = document.getElementById("network");
const balanceEl = document.getElementById("balance");
const studentNameEl = document.getElementById("studentName");
const studentNimEl = document.getElementById("studentNim");

// Avalanche Fuji Testnet chainId (hex)
const AVALANCHE_FUJI_CHAIN_ID = "0xa869";

// Set Nama & NIM saat halaman dimuat
// Kita tambahkan pengecekan null jaga-jaga kalau elemen belum termuat
if (studentNameEl) studentNameEl.textContent = MY_NAME;
if (studentNimEl) studentNimEl.textContent = MY_NIM;

function formatAvaxBalance(balanceWei) {
  const balance = parseInt(balanceWei, 16);
  return (balance / 1e18).toFixed(4);
}

async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    alert("Core Wallet tidak terdeteksi. Silakan install Core Wallet.");
    return;
  }

  try {
    statusEl.textContent = "Connecting...";
    connectBtn.disabled = true; // Disable tombol pas loading
    connectBtn.innerHTML = "Connecting...";

    // Request wallet accounts
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const address = accounts[0];
    addressEl.textContent = address;

    // Get chainId
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    if (chainId === AVALANCHE_FUJI_CHAIN_ID) {
      networkEl.textContent = "Avalanche Fuji Testnet";
      statusEl.textContent = "Connected ✅";
      
      // Warna hijau diatur via CSS class di index.html, 
      // tapi kita paksa warnanya disini biar sesuai logika lama
      statusEl.style.color = "#4cd137"; 

      // Get AVAX balance
      const balanceWei = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });

      balanceEl.textContent = formatAvaxBalance(balanceWei);
      
      // Ubah tombol jadi 'Connected'
      connectBtn.innerHTML = "Wallet Connected";

    } else {
      networkEl.textContent = "Wrong Network ❌";
      statusEl.textContent = "Switch to Fuji Testnet";
      statusEl.style.color = "#fbc531"; // Kuning warning
      balanceEl.textContent = "-";
      connectBtn.disabled = false;
      connectBtn.innerHTML = "Connect Wallet";
    }
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Connection Failed";
    statusEl.style.color = "#e84142"; // Merah error
    connectBtn.disabled = false;
    connectBtn.innerHTML = "Connect Wallet";
  }
}

connectBtn.addEventListener("click", connectWallet);