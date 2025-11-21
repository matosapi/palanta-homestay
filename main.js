import './style.css';
import { openBookingModal } from './booking.js';

// Room Data
export const rooms = [
    {
        id: 1,
        name: 'Deluxe Garden View',
        price: 500000,
        image: '/images/room-deluxe.png',
        rating: 4.8,
        capacity: 2,
        available: 5,
        description: 'Kamar luas dengan pemandangan taman yang asri. Dilengkapi dengan fasilitas modern untuk kenyamanan Anda.',
        features: ['AC & Kipas Angin', 'TV LED', 'Wi-Fi Gratis', 'Kamar Mandi Dalam', 'Sarapan Gratis']
    },
    {
        id: 2,
        name: 'Family Suite',
        price: 850000,
        image: '/images/room-family.png',
        rating: 4.9,
        capacity: 4,
        available: 3,
        description: 'Pilihan tepat untuk liburan keluarga. Ruang tamu terpisah dan area bermain anak.',
        features: ['2 King Beds', 'Ruang Tamu', 'Kitchenette', 'Balkon Pribadi', 'Netflix']
    },
    {
        id: 3,
        name: 'Standard Room',
        price: 350000,
        image: '/images/room-standard.png',
        rating: 4.5,
        capacity: 2,
        available: 0,
        description: 'Kenyamanan ekonomis tanpa mengorbankan kualitas. Cocok untuk traveler solo atau pasangan.',
        features: ['Queen Bed', 'AC', 'Shower Air Panas', 'Meja Kerja']
    },
    {
        id: 4,
        name: 'Premium Villa',
        price: 1500000,
        image: '/images/room-villa.png',
        rating: 5.0,
        capacity: 6,
        available: 2,
        description: 'Pengalaman menginap mewah dengan kolam renang pribadi dan layanan butler 24 jam.',
        features: ['Private Pool', '3 Kamar Tidur', 'Full Kitchen', 'BBQ Area', 'Butler Service']
    },
    {
        id: 5,
        name: 'Junior Suite',
        price: 650000,
        image: '/images/room-deluxe.png',
        rating: 4.7,
        capacity: 2,
        available: 4,
        description: 'Suite modern dengan area kerja luas dan balkon dengan pemandangan kota.',
        features: ['King Bed', 'Work Desk', 'City View', 'Mini Bar', 'Bathtub']
    },
    {
        id: 6,
        name: 'Twin Saver',
        price: 300000,
        image: '/images/room-standard.png',
        rating: 4.4,
        capacity: 2,
        available: 2,
        description: 'Pilihan hemat untuk teman perjalanan. Dua tempat tidur single yang nyaman.',
        features: ['2 Single Beds', 'AC', 'Free WiFi', 'Shared Lounge']
    },
    {
        id: 7,
        name: 'Executive Room',
        price: 950000,
        image: '/images/room-family.png',
        rating: 4.9,
        capacity: 2,
        available: 5,
        description: 'Kamar eksklusif untuk pebisnis dengan akses ke Executive Lounge.',
        features: ['King Bed', 'Executive Lounge', 'Meeting Room Access', 'High Speed WiFi']
    },
    {
        id: 8,
        name: 'Family Loft',
        price: 1200000,
        image: '/images/room-villa.png',
        rating: 4.8,
        capacity: 5,
        available: 1,
        description: 'Loft 2 lantai yang luas, sempurna untuk keluarga besar atau grup.',
        features: ['2 Floors', '2 Queen Beds', 'Sofa Bed', 'Kitchenette', '2 Bathrooms']
    },
    {
        id: 9,
        name: 'Single Pod',
        price: 150000,
        image: '/images/room-standard.png',
        rating: 4.3,
        capacity: 1,
        available: 5,
        description: 'Pod kapsul modern untuk solo traveler yang mencari privasi dan kenyamanan.',
        features: ['Single Pod', 'Locker', 'Shared Bathroom', 'Reading Light', 'USB Port']
    }
];

// Render Rooms
function renderRooms() {
    const grid = document.getElementById('room-grid');
    if (!grid) return;

    grid.innerHTML = rooms.map(room => `
        <div class="dashboard-card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column;">
            <div style="position: relative; height: 200px;">
                <img src="${room.image}" alt="${room.name}" style="width: 100%; height: 100%; object-fit: cover;">
                <div style="position: absolute; top: 10px; left: 10px; background: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; display: flex; align-items: center; gap: 4px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="orange" stroke="orange" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    ${room.rating}
                </div>
                <div style="position: absolute; top: 10px; right: 10px; background: var(--primary); color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                    ${room.capacity}
                </div>
                ${room.available === 0 ? '<div style="position: absolute; bottom: 10px; right: 10px; background: #ef4444; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Tidak Tersedia</div>' :
            room.available < 3 ? `<div style="position: absolute; bottom: 10px; right: 10px; background: var(--accent); color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Terbatas (${room.available} kamar)</div>` :
                `<div style="position: absolute; bottom: 10px; right: 10px; background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Tersedia (${room.available} kamar)</div>`
        }
            </div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column;">
                <h3 style="font-size: 20px; margin-bottom: 10px;">${room.name}</h3>
                <p style="font-size: 14px; color: var(--text-light); margin-bottom: 15px; flex: 1;">${room.description}</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 20px;">
                    ${room.features.slice(0, 4).map(f => `
                        <div style="font-size: 12px; color: var(--text-light); display: flex; align-items: center; gap: 6px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            ${f}
                        </div>
                    `).join('')}
                </div>

                <div style="margin-top: auto; border-top: 1px solid #f3f4f6; padding-top: 15px;">
                    <div style="font-size: 24px; font-weight: bold; color: var(--primary); margin-bottom: 5px;">
                        Rp ${room.price.toLocaleString('id-ID')} <span style="font-size: 14px; color: var(--text-light); font-weight: normal;">/malam</span>
                    </div>
                    <p style="font-size: 10px; color: var(--text-light); margin-bottom: 15px;">Termasuk pajak dan layanan</p>
                    
                    <div class="flex" style="gap: 15px;">
                        <button class="btn btn-outline" style="flex: 1; border-color: var(--primary); color: var(--primary); font-size: 14px;">Lihat Ulasan</button>
                        <button class="btn btn-primary" style="flex: 1; font-size: 14px;" onclick="window.openBooking(${room.id})" ${room.available === 0 ? 'disabled style="background: #ccc; cursor: not-allowed;"' : ''}>
                            ${room.available === 0 ? 'Tidak Tersedia' : 'Pesan Sekarang'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Login Logic
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = '/home.html';
    });
}

// Logout Logic
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        window.location.href = '/index.html';
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderRooms();

    // Expose booking function globally
    window.openBooking = (roomId) => {
        const room = rooms.find(r => r.id === roomId);
        if (room) openBookingModal(room);
    };

    // Slider Logic
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (prevBtn && nextBtn && slides.length > 0) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    }

    // Promo Code Logic
    window.copyPromoCode = (code) => {
        navigator.clipboard.writeText(code).then(() => {
            alert(`Kode Voucher ${code} berhasil disalin!`);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            // Fallback
            const textArea = document.createElement("textarea");
            textArea.value = code;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("Copy");
            textArea.remove();
            alert(`Kode Voucher ${code} berhasil disalin!`);
        });
    };

    // Back to Top Button Logic
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
