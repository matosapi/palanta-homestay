import './style.css';
import { rooms } from './main.js';

// Mock Data
const bookings = [
    { id: '#BK001', guest: 'Budi Santoso', room: 'Deluxe Garden View', checkIn: '15 Nov', checkOut: '17 Nov', total: 2000000, status: 'Terkonfirmasi', nights: 2 },
    { id: '#BK002', guest: 'Siti Aminah', room: 'Premium Villa', checkIn: '20 Nov', checkOut: '23 Nov', total: 6000000, status: 'Pending', nights: 3 },
    { id: '#BK003', guest: 'John Doe', room: 'Standard Room', checkIn: '01 Des', checkOut: '05 Des', total: 1000000, status: 'Terkonfirmasi', nights: 4 },
];

const stats = {
    totalPemesanan: 2,
    pembayaranPending: 1,
    terkonfirmasi: 1,
    totalPendapatan: '2.0jt'
};

function renderOverview() {
    const content = document.getElementById('adminContent');
    content.innerHTML = `
        <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 40px;">
            <!-- Total Pemesanan -->
            <div class="stat-card cyan">
                <div>
                    <div class="stat-title">
                        Total Pemesanan
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0891B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </div>
                    <div class="stat-value cyan">${stats.totalPemesanan}</div>
                </div>
                <div class="stat-desc">Bulan ini</div>
            </div>

            <!-- Pembayaran Pending -->
            <div class="stat-card blue">
                <div>
                    <div class="stat-title">
                        Pembayaran Pending
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <div class="stat-value blue">${stats.pembayaranPending}</div>
                </div>
                <div class="stat-desc">Menunggu verifikasi</div>
            </div>

            <!-- Terkonfirmasi -->
            <div class="stat-card green">
                <div>
                    <div class="stat-title">
                        Terkonfirmasi
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <div class="stat-value green">${stats.terkonfirmasi}</div>
                </div>
                <div class="stat-desc">Pemesanan aktif</div>
            </div>

            <!-- Total Pendapatan -->
            <div class="stat-card purple">
                <div>
                    <div class="stat-title">
                        Total Pendapatan
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9333EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    </div>
                    <div class="stat-value purple">Rp ${stats.totalPendapatan}</div>
                </div>
                <div class="stat-desc">Bulan ini</div>
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

// Tab Switching
document.querySelectorAll('.admin-nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.admin-nav-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const tabName = tab.dataset.tab;
        if (tabName === 'overview') renderOverview();
        else if (tabName === 'pemesanan') renderPemesanan();
        else if (tabName === 'kamar') renderKamar();
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
