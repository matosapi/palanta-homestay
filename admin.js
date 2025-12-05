import './style.css';
import { rooms } from './main.js';

// Mock Data
const bookings = [
    { id: '#BK001', guest: 'Budi Santoso', room: 'Deluxe Garden View', checkIn: '15 Nov', checkOut: '17 Nov', total: 2000000, status: 'Terkonfirmasi', nights: 2 },
    { id: '#BK002', guest: 'Siti Aminah', room: 'Premium Villa', checkIn: '20 Nov', checkOut: '23 Nov', total: 6000000, status: 'Pending', nights: 3 },
    { id: '#BK003', guest: 'John Doe', room: 'Standard Room', checkIn: '01 Des', checkOut: '05 Des', total: 1000000, status: 'Terkonfirmasi', nights: 4 },
    { id: '#BK004', guest: 'Rina Wijaya', room: 'Family Room', checkIn: '10 Des', checkOut: '12 Des', total: 1500000, status: 'Dibatalkan', nights: 2 },
    { id: '#BK005', guest: 'Andi Pratama', room: 'Suite', checkIn: '15 Des', checkOut: '18 Des', total: 3500000, status: 'Berlangsung', nights: 3 },
    { id: '#BK006', guest: 'Dewi Lestari', room: 'Deluxe Garden View', checkIn: '20 Des', checkOut: '22 Des', total: 2000000, status: 'Pending', nights: 2 }
];

const stats = {
    totalPemesanan: 6,
    pembayaranPending: 2,
    terkonfirmasi: 2,
    totalPendapatan: '12.5jt'
};

function renderOverview() {
    const content = document.getElementById('adminContent');
    content.innerHTML = `
      <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 40px;">
        <!-- ...existing stat cards... -->
        <div class="stat-card cyan">
          <div>
            <div class="stat-title">Total Pemesanan
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0891B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <div class="stat-value cyan">${stats.totalPemesanan}</div>
          </div>
          <div class="stat-desc">Bulan ini</div>
        </div>
        <div class="stat-card blue">
          <div>
            <div class="stat-title">Pembayaran Pending
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <div class="stat-value blue">${stats.pembayaranPending}</div>
          </div>
          <div class="stat-desc">Menunggu verifikasi</div>
        </div>
        <div class="stat-card green">
          <div>
            <div class="stat-title">Terkonfirmasi
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <div class="stat-value green">${stats.terkonfirmasi}</div>
          </div>
          <div class="stat-desc">Pemesanan aktif</div>
        </div>
        <div class="stat-card purple">
          <div>
            <div class="stat-title">Total Pendapatan
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9333EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <div class="stat-value purple">Rp ${stats.totalPendapatan}</div>
          </div>
          <div class="stat-desc">Bulan ini</div>
        </div>
      </div>

      <div style="margin-bottom:32px; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; justify-items: center; align-items: center; max-width: 1400px; margin-left: auto; margin-right: auto;">
        <div style="background: #fff; border-radius: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); padding: 28px 24px 36px 24px; min-width: 0; display: flex; flex-direction: column; align-items: center; height: 320px; width: 100%; grid-column: 1 / span 2;">
          <div style="font-weight:500; font-size:15px; color:#00b894; margin-bottom:18px; text-align:center;">Grafik Pemesanan & Pendapatan</div>
          <canvas id="grafikPemesanan" style="width:100%; max-width:900px; min-height:220px; display:block; margin:auto;" height="220"></canvas>
        </div>
        <div style="background: #fff; border-radius: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); padding: 28px 24px 36px 24px; min-width: 0; display: flex; flex-direction: column; align-items: center; height: 320px; width: 100%; grid-column: 1 / span 2;">
          <div style="font-weight:500; font-size:15px; color:#00b894; margin-bottom:18px; text-align:center;">Grafik Ulasan</div>
          <canvas id="grafikUlasan" style="width:100%; max-width:900px; min-height:220px; display:block; margin:auto;" height="220"></canvas>
        </div>
        <div style="background: #fff; border-radius: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); padding: 28px 24px 36px 24px; min-width: 0; display: flex; flex-direction: column; align-items: center; height: 320px; width: 100%;">
          <div style="font-weight:500; font-size:15px; color:#0284C7; margin-bottom:18px; text-align:center;">Grafik Pembayaran</div>
          <canvas id="grafikPembayaran" style="width:100%; max-width:420px; min-height:220px; display:block; margin:auto;" height="220"></canvas>
        </div>
        <div style="background: #fff; border-radius: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); padding: 28px 24px 36px 24px; min-width: 0; display: flex; flex-direction: column; align-items: center; height: 320px; width: 100%;">
          <div style="font-weight:500; font-size:15px; color:#38bdf8; margin-bottom:18px; text-align:center;">Grafik Kamar</div>
          <canvas id="grafikKamar" style="width:100%; max-width:420px; min-height:220px; display:block; margin:auto;" height="220"></canvas>
        </div>
      </div>

      <div class="section-title">Pemesanan Terbaru</div>
      <div class="recent-orders">
        ${bookings.slice(0, 2).map(b => `
          <div class="recent-order-card ${b.status === 'Pending' ? 'pending' : ''}">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <span style="font-weight: 600; color: var(--text-muted); font-size: 13px;">${b.id}</span>
                <span class="badge ${b.status === 'Terkonfirmasi' ? 'badge-success' : 'badge-warning'}">${b.status}</span>
              </div>
              <h4 style="font-weight: 700; color: var(--text-main); margin-bottom: 2px;">${b.guest}</h4>
              <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 4px;">${b.room}</p>
              <p style="color: var(--text-muted); font-size: 12px;">${b.checkIn} - ${b.checkOut}</p>
            </div>
            <div style="text-align: right;">
              <div style="font-weight: 700; color: var(--primary); font-size: 16px; margin-bottom: 4px;">Rp ${b.total.toLocaleString('id-ID')}</div>
              <div style="font-size: 12px; color: var(--text-muted);">${b.nights} malam</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Generate chart data from bookings
    const monthMap = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'Mei': 4, 'Jun': 5, 'Jul': 6, 'Agu': 7, 'Sep': 8, 'Okt': 9, 'Nov': 10, 'Des': 11
    };
    const pemesananPerBulan = Array(12).fill(0);
    const pendapatanPerBulan = Array(12).fill(0);
    bookings.forEach(b => {
      const bulan = b.checkIn.split(' ')[1];
      const idx = monthMap[bulan];
      if (typeof idx === 'number') {
        pemesananPerBulan[idx]++;
        if (b.status !== 'Dibatalkan') {
          pendapatanPerBulan[idx] += b.total;
        }
      }
    });

    // Pembayaran: jumlah per status
    const pembayaranStatus = {};
    pembayaranData.forEach(p => {
      pembayaranStatus[p.status] = (pembayaranStatus[p.status] || 0) + 1;
    });

    // Ulasan: rating rata-rata per bulan
    const ulasanPerBulan = Array(12).fill(0);
    const ulasanCountPerBulan = Array(12).fill(0);
    ulasanData.forEach(u => {
      const bulan = u.waktu.split('-')[1];
      const idx = parseInt(bulan, 10) - 1;
      if (idx >= 0 && idx < 12) {
        ulasanPerBulan[idx] += u.rating;
        ulasanCountPerBulan[idx]++;
      }
    });
    const ulasanAvgPerBulan = ulasanPerBulan.map((total, i) => ulasanCountPerBulan[i] ? (total / ulasanCountPerBulan[i]) : 0);

    // Kamar: jumlah kamar aktif per tipe
    const kamarTipeCount = {};
    rooms.forEach(r => {
      kamarTipeCount[r.tipe] = (kamarTipeCount[r.tipe] || 0) + 1;
    });

    import('./public/chart.js').then(mod => {
      mod.loadChartJs().then(() => {
        if (window.Chart) {
          // Grafik Pemesanan & Pendapatan
          const ctx1 = document.getElementById('grafikPemesanan').getContext('2d');
          new Chart(ctx1, {
            type: 'bar',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
              datasets: [
                {
                  label: 'Jumlah Pemesanan',
                  data: pemesananPerBulan,
                  backgroundColor: 'rgba(0,184,148,0.5)',
                  borderColor: '#00b894',
                  borderWidth: 2,
                  yAxisID: 'y',
                },
                {
                  label: 'Pendapatan (Rp)',
                  data: pendapatanPerBulan,
                  backgroundColor: 'rgba(56, 189, 248, 0.3)',
                  borderColor: '#38bdf8',
                  borderWidth: 2,
                  type: 'line',
                  yAxisID: 'y1',
                }
              ]
            },
            options: {
              responsive: true,
              interaction: { mode: 'index', intersect: false },
              plugins: { legend: { display: true } },
              scales: {
                y: {
                  beginAtZero: true,
                  title: { display: true, text: 'Jumlah Pemesanan' }
                },
                y1: {
                  beginAtZero: true,
                  position: 'right',
                  grid: { drawOnChartArea: false },
                  title: { display: true, text: 'Pendapatan (Rp)' },
                  ticks: {
                    callback: function(value) {
                      return 'Rp ' + value.toLocaleString('id-ID');
                    }
                  }
                }
              }
            }
          });

          // Grafik Pembayaran per Status
          const ctx2 = document.getElementById('grafikPembayaran').getContext('2d');
          new Chart(ctx2, {
            type: 'doughnut',
            data: {
              labels: Object.keys(pembayaranStatus),
              datasets: [{
                label: 'Jumlah Pembayaran',
                data: Object.values(pembayaranStatus),
                backgroundColor: ['#00b894', '#ffe29c', '#e74c3c', '#38bdf8'],
              }]
            },
            options: {
              plugins: { legend: { display: true } }
            }
          });

          // Grafik Ulasan (rating rata-rata per bulan)
          const ctx3 = document.getElementById('grafikUlasan').getContext('2d');
          new Chart(ctx3, {
            type: 'line',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
              datasets: [{
                label: 'Rating Rata-rata',
                data: ulasanAvgPerBulan,
                borderColor: '#00b894',
                backgroundColor: 'rgba(0,184,148,0.1)',
                fill: true,
                tension: 0.3
              }]
            },
            options: {
              plugins: { legend: { display: true } },
              scales: {
                y: {
                  min: 0,
                  max: 5,
                  title: { display: true, text: 'Rating' }
                }
              }
            }
          });

          // Grafik Kamar per Tipe
          const ctx4 = document.getElementById('grafikKamar').getContext('2d');
          new Chart(ctx4, {
            type: 'bar',
            data: {
              labels: Object.keys(kamarTipeCount),
              datasets: [{
                label: 'Jumlah Kamar Aktif',
                data: Object.values(kamarTipeCount),
                backgroundColor: '#38bdf8',
                borderColor: '#0891B2',
                borderWidth: 2
              }]
            },
            options: {
              plugins: { legend: { display: true } },
              scales: {
                y: {
                  beginAtZero: true,
                  title: { display: true, text: 'Jumlah Kamar' }
                }
              }
            }
          });
        }
      });
    });
}

function renderPemesanan() {
    const content = document.getElementById('adminContent');
    content.innerHTML = `
        <div class="section-title">Manajemen Pemesanan</div>
        
        <div style="background: white; border-radius: 12px; border: 1px solid #E5E7EB; padding: 20px; margin-bottom: 30px;">
            <input type="text" placeholder="Cari berdasarkan ID, nama tamu, atau nama kamar..." class="form-control" style="width: 100%; padding: 12px; border: 1px solid #E5E7EB; border-radius: 8px; background: #F9FAFB; outline: none;">
        </div>

        <div style="background: white; border-radius: 12px; border: 1px solid #E5E7EB; overflow: hidden;">
            <table class="admin-table">
                <thead>
                    <tr style="background: #F9FAFB; border-bottom: 1px solid #E5E7EB;">
                        <th>ID</th>
                        <th>Tamu</th>
                        <th>Kamar</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    ${bookings.map(b => `
                        <tr>
                            <td data-label="ID" style="color: var(--text-muted); font-weight: 500;">${b.id}</td>
                            <td data-label="Tamu">
                                <div class="flex items-center gap-3">
                                    <div style="width: 32px; height: 32px; background: #F3F4F6; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px;">👤</div>
                                    <span style="font-weight: 600; color: var(--text-main);">${b.guest}</span>
                                </div>
                            </td>
                            <td data-label="Kamar" style="color: var(--text-muted);"><span style="display: flex; align-items: center; gap: 6px;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22h20"></path><path d="M20 22V7l-8-5-8 5v15"></path><path d="M12 16.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path></svg> ${b.room}</span></td>
                            <td data-label="Check-in" style="color: var(--text-muted);">${b.checkIn}</td>
                            <td data-label="Check-out" style="color: var(--text-muted);">${b.checkOut}</td>
                            <td data-label="Total" style="color: var(--primary); font-weight: 700;">Rp ${b.total.toLocaleString('id-ID')}</td>
                            <td data-label="Status">
                                <span class="badge ${b.status === 'Terkonfirmasi' ? 'badge-success' : 'badge-warning'}">
                                    ${b.status}
                                </span>
                            </td>
                            <td data-label="Aksi">
                                <div class="flex gap-2">
                                    <button class="action-btn" title="Lihat Detail">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    </button>
                                    ${b.status === 'Pending' ? `
                                        <button class="action-btn approve" title="Setujui" onclick="window.approveBooking('${b.id}')">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </button>
                                        <button class="action-btn reject" title="Tolak">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </button>
                                    ` : ''}
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderKamar() {
    const content = document.getElementById('adminContent');
    content.innerHTML = `
        <div class="flex justify-between items-center mb-6">
            <div class="section-title" style="margin-bottom: 0;">Manajemen Kamar</div>
            <button class="btn btn-primary flex items-center gap-2" style="padding: 10px 20px; font-weight: 600;">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Tambah Kamar
            </button>
        </div>

        <div style="background: white; border-radius: 12px; border: 1px solid #E5E7EB; padding: 16px; margin-bottom: 30px;">
            <input type="text" placeholder="Cari berdasarkan nama kamar atau kapasitas..." class="form-control" style="width: 100%; padding: 12px; border: none; background: #F9FAFB; border-radius: 8px; outline: none;">
        </div>

        <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
            ${rooms.map(room => `
                <div class="room-admin-card">
                    <div class="room-admin-header">
                        <div>
                            <h3 style="font-size: 18px; font-weight: 600; color: var(--text-main); margin-bottom: 8px;">${room.name}</h3>
                            <span class="badge ${room.available > 0 ? 'badge-success' : 'badge-warning'}">
                                ${room.available > 0 ? 'Tersedia' : 'Terbatas'}
                            </span>
                        </div>
                        <button class="action-btn" title="Edit Kamar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                    </div>
                    
                    <div class="flex items-center gap-2 mb-3 text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00A8A8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        ${room.capacity}
                    </div>
                    <div class="flex items-center gap-2 mb-4 text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00A8A8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22h20"></path><path d="M20 22V7l-8-5-8 5v15"></path><path d="M12 16.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path></svg>
                        ${room.available} / 5 kamar tersedia
                    </div>
                    
                    <div style="font-weight: 600; color: var(--primary); font-size: 16px; margin-bottom: 20px;">
                        Rp ${room.price.toLocaleString('id-ID')} <span style="font-weight: normal; color: var(--text-muted); font-size: 13px;">/ malam</span>
                    </div>

                    <div class="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Tingkat Ketersediaan</span>
                        <span>${Math.round((room.available / 5) * 100)}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(room.available / 5) * 100}%;"></div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Data dummy pembayaran
const pembayaranData = [
  {
    id: '#PAY001', booking: '#BK002', tamu: 'Siti Aminah', jumlah: 6000000, metode: 'Transfer Bank', waktu: '2025-11-11 14:30', status: 'Pending' },
  { id: '#PAY002', booking: '#BK001', tamu: 'Budi Santoso', jumlah: 2000000, metode: 'Credit Card', waktu: '2025-11-15 10:00', status: 'Terkonfirmasi' },
  { id: '#PAY003', booking: '#BK003', tamu: 'John Doe', jumlah: 1000000, metode: 'E-Wallet', waktu: '2025-12-01 09:00', status: 'Terkonfirmasi' },
  { id: '#PAY004', booking: '#BK005', tamu: 'Andi Pratama', jumlah: 3500000, metode: 'Transfer Bank', waktu: '2025-12-15 13:00', status: 'Pending' }
];

function renderPembayaran() {
  const content = document.getElementById('adminContent');
  content.innerHTML = `
    <div style="background:#fff; border-radius:16px; padding:32px 24px; box-shadow:0 2px 12px rgba(0,0,0,0.06); margin-top:32px;">
      <h2 style="font-size:22px; font-weight:600; color:#00b894; margin-bottom:18px;">Manajemen Pembayaran</h2>
      <input id="searchPembayaran" type="text" placeholder="Cari berdasarkan ID pembayaran, booking ID, atau nama tamu..." style="width:100%; padding:10px 16px; border-radius:8px; border:1px solid #e0e0e0; margin-bottom:18px; font-size:15px;">
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse;">
          <thead>
            <tr style="background:#f7fcfc;">
              <th style="padding:12px 8px; font-weight:600; color:#212121;">ID Pembayaran</th>
              <th style="padding:12px 8px; font-weight:600; color:#212121;">ID Booking</th>
              <th style="padding:12px 8px; font-weight:600; color:#212121;">Tamu</th>
              <th style="padding:12px 8px; font-weight:600; color:#212121;">Jumlah</th>
              <th style="padding:12px 8px; font-weight:600; color:#212121;">Metode</th>
              <th style="padding:12px 8px; font-weight:600; color:#212121;">Waktu</th>
              <th style="padding:12px 8px; font-weight:600; color:#212121;">Status</th>
              <th style="padding:12px 8px; font-weight:600; color:#212121;">Aksi</th>
            </tr>
          </thead>
          <tbody id="pembayaranTableBody"></tbody>
        </table>
      </div>
    </div>
  `;
  renderPembayaranRows(pembayaranData);
  document.getElementById('searchPembayaran').oninput = function(e) {
    const val = e.target.value.toLowerCase();
    const filtered = pembayaranData.filter(p =>
      p.id.toLowerCase().includes(val) ||
      p.booking.toLowerCase().includes(val) ||
      p.tamu.toLowerCase().includes(val)
    );
    renderPembayaranRows(filtered);
  };
}

function renderPembayaranRows(data) {
  const tbody = document.getElementById('pembayaranTableBody');
  tbody.innerHTML = data.map(p => `
    <tr style="border-bottom:1px solid #e0e0e0;">
      <td style="padding:10px 8px;">${p.id}</td>
      <td style="padding:10px 8px;">${p.booking}</td>
      <td style="padding:10px 8px;">${p.tamu}</td>
      <td style="padding:10px 8px; color:#00b894; font-weight:600;">Rp ${p.jumlah.toLocaleString('id-ID')}</td>
      <td style="padding:10px 8px;">${p.metode}</td>
      <td style="padding:10px 8px;">${p.waktu}</td>
      <td style="padding:10px 8px;">
        <span style="background:#ffe29c; color:#b48a00; border-radius:8px; padding:4px 14px; font-weight:600; font-size:13px;">${p.status}</span>
      </td>
      <td style="padding:10px 8px;">
        <button title="Lihat" style="background:#f7fcfc; border:none; border-radius:6px; padding:6px 10px; margin-right:4px; cursor:pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#212121" viewBox="0 0 24 24"><path d="M12 5c-7.633 0-12 7-12 7s4.367 7 12 7 12-7 12-7-4.367-7-12-7zm0 12c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z"/></svg>
        </button>
        <button title="Konfirmasi" style="background:#00b894; border:none; color:#fff; border-radius:6px; padding:6px 10px; margin-right:4px; cursor:pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#fff" viewBox="0 0 24 24"><path d="M20.285 6.709l-11.285 11.285-5.285-5.285 1.414-1.414 3.871 3.871 9.871-9.871z"/></svg>
        </button>
        <button title="Tolak" style="background:#e74c3c; border:none; color:#fff; border-radius:6px; padding:6px 10px; cursor:pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#fff" viewBox="0 0 24 24"><path d="M6 19c0 1.104.896 2 2 2h8c1.104 0 2-.896 2-2v-14c0-1.104-.896-2-2-2h-8c-1.104 0-2 .896-2 2v14zm2-14h8v14h-8v-14zm-2 16c0 2.209 1.791 4 4 4h8c2.209 0 4-1.791 4-4v-14c0-2.209-1.791-4-4-4h-8c-2.209 0-4 1.791-4 4v14z"/></svg>
        </button>
      </td>
    </tr>
  `).join('');
}

// Data dummy ulasan (dengan beberapa foto)
const ulasanData = [
  {
    id: '#REV001', tamu: 'Siti Aminah', kamar: 'Deluxe', rating: 5, komentar: 'Sangat nyaman dan bersih!', waktu: '2025-11-12 10:15', status: 'Tampil', foto: ['public/images/ulasan1.jpg','public/images/ulasan1b.jpg','public/images/ulasan1c.jpg'] },
  { id: '#REV002', tamu: 'Budi Santoso', kamar: 'Standard', rating: 4, komentar: 'Pelayanan ramah, lokasi strategis.', waktu: '2025-11-10 09:00', status: 'Tampil', foto: ['public/images/ulasan2.jpg','public/images/ulasan2b.jpg'] },
  { id: '#REV003', tamu: 'Rina Wijaya', kamar: 'Family', rating: 5, komentar: 'Kamar luas, cocok untuk keluarga.', waktu: '2025-12-12 11:00', status: 'Tampil', foto: ['public/images/ulasan3.jpg'] },
  { id: '#REV004', tamu: 'Andi Pratama', kamar: 'Suite', rating: 3, komentar: 'Fasilitas oke, tapi AC kurang dingin.', waktu: '2025-12-16 15:00', status: 'Tampil', foto: ['public/images/ulasan4.jpg','public/images/ulasan4b.jpg'] }
];

function renderUlasan() {
  const content = document.getElementById('adminContent');
  content.innerHTML = `
    <div style="background:#fff; border-radius:16px; padding:32px 24px; box-shadow:0 2px 12px rgba(0,0,0,0.06); margin-top:32px;">
      <h2 style="font-size:22px; font-weight:600; color:#00b894; margin-bottom:18px;">Manajemen Ulasan</h2>
      <input id="searchUlasan" type="text" placeholder="Cari berdasarkan ID ulasan, nama tamu, atau kamar..." style="width:100%; padding:10px 16px; border-radius:8px; border:1px solid #e0e0e0; margin-bottom:18px; font-size:15px;">
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse;">
          <thead>
            <tr style="background:#f7fcfc;">
              <th style="padding:12px 8px; font-weight:600; color:#212121;">Foto</th>
              <th style="padding:12px 8px; font-weight:600; color:#212121;">ID Ulasan</th>
              <th style="padding:12px 8px; font-weight:600; color:#212121;">Tamu</th>
              <th style="padding:12px 8px; font-weight:600; color:#212121;">Kamar</th>
              <th style="padding:12px 8px; font-weight:600; color:#212121;">Rating</th>
              <th style="padding:12px 8px; font-weight:600; color:#212121;">Komentar</th>
              <th style="padding:12px 8px; font-weight:600; color:#212121;">Waktu</th>
              <th style="padding:12px 8px; font-weight:600; color:#212121;">Status</th>
              <th style="padding:12px 8px; font-weight:600; color:#212121;">Aksi</th>
            </tr>
          </thead>
          <tbody id="ulasanTableBody"></tbody>
        </table>
      </div>
    </div>
    <div id="fotoModal" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.25); z-index:9999; align-items:center; justify-content:center;">
      <div style="background:#fff; border-radius:16px; max-width:420px; width:95%; margin:auto; padding:32px 24px; box-shadow:0 8px 32px rgba(0,0,0,0.18); position:relative; display:flex; flex-direction:column; align-items:center;">
        <button onclick="document.getElementById('fotoModal').style.display='none'" style="position:absolute; top:12px; right:12px; background:none; border:none; font-size:22px; cursor:pointer;">&times;</button>
        <div id="fotoModalContent"></div>
      </div>
    </div>
  `;
  renderUlasanRows(ulasanData);
  document.getElementById('searchUlasan').oninput = function(e) {
    const val = e.target.value.toLowerCase();
    const filtered = ulasanData.filter(u =>
      u.id.toLowerCase().includes(val) ||
      u.tamu.toLowerCase().includes(val) ||
      u.kamar.toLowerCase().includes(val)
    );
    renderUlasanRows(filtered);
  };
}

function renderUlasanRows(data) {
  const tbody = document.getElementById('ulasanTableBody');
  tbody.innerHTML = data.map((u, idx) => `
    <tr style="border-bottom:1px solid #e0e0e0;">
      <td style="padding:10px 8px; text-align:center;">
        <button onclick="showFotoModal(${idx})" style="background:none; border:none; cursor:pointer;">
          <img src="${u.foto[0]}" alt="Foto Ulasan" style="width:48px; height:48px; object-fit:cover; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        </button>
      </td>
      <td style="padding:10px 8px;">${u.id}</td>
      <td style="padding:10px 8px;">${u.tamu}</td>
      <td style="padding:10px 8px;">${u.kamar}</td>
      <td style="padding:10px 8px; color:#00b894; font-weight:600;">${'★'.repeat(u.rating)}${'☆'.repeat(5-u.rating)}</td>
      <td style="padding:10px 8px;">${u.komentar}</td>
      <td style="padding:10px 8px;">${u.waktu}</td>
      <td style="padding:10px 8px;">
        <span style="background:#e0ffe0; color:#00b894; border-radius:8px; padding:4px 14px; font-weight:600; font-size:13px;">${u.status}</span>
      </td>
      <td style="padding:10px 8px;">
        <button title="Lihat" style="background:#f7fcfc; border:none; border-radius:6px; padding:6px 10px; margin-right:4px; cursor:pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#212121" viewBox="0 0 24 24"><path d="M12 5c-7.633 0-12 7-12 7s4.367 7 12 7 12-7 12-7-4.367-7-12-7zm0 12c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z"/></svg>
        </button>
        <button title="Sembunyikan" style="background:#e74c3c; border:none; color:#fff; border-radius:6px; padding:6px 10px; cursor:pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#fff" viewBox="0 0 24 24"><path d="M6 19c0 1.104.896 2 2 2h8c1.104 0 2-.896 2-2v-14c0-1.104-.896-2-2-2h-8c-1.104 0-2 .896-2 2v14zm2-14h8v14h-8v-14zm-2 16c0 2.209 1.791 4 4 4h8c2.209 0 4-1.791 4-4v-14c0-2.209-1.791-4-4-4h-8c-2.209 0-4 1.791-4 4v14z"/></svg>
        </button>
      </td>
    </tr>
  `).join('');
}

window.showFotoModal = function(idx) {
  const modal = document.getElementById('fotoModal');
  const ulasan = ulasanData[idx];
  const fotoHtml = ulasan.foto.map(src => `<img src='${src}' style='width:100%; max-width:320px; margin-bottom:12px; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.08);'>`).join('');
  document.getElementById('fotoModalContent').innerHTML = fotoHtml;
  modal.style.display = 'flex';
}

// Tab Switching
document.querySelectorAll('.admin-nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.admin-nav-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const tabName = tab.dataset.tab;
        if (tabName === 'overview') renderOverview();
        else if (tabName === 'pemesanan') renderPemesanan();
        else if (tabName === 'kamar') renderKamar();
        else if (tabName === 'pembayaran') renderPembayaran();
        else if (tabName === 'ulasan') renderUlasan();
        else document.getElementById('adminContent').innerHTML = '<div class="text-center p-10" style="color: var(--text-muted);">Fitur ini sedang dalam pengembangan</div>';
    });
});

// Initialize
window.approveBooking = (id) => {
    const booking = bookings.find(b => b.id === id);
    if (booking) {
        booking.status = 'Terkonfirmasi';
        // Re-render based on current view, simple hack: click active tab
        document.querySelector('.admin-nav-tab.active').click();
    }
};

// Default view
renderOverview();
