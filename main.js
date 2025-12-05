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

// USER AUTH
let pendingBookingRoomId = null; // Store room ID while user logs in
function checkLoginStatus() {
    return sessionStorage.getItem('isLoggedIn') === 'true';
}
function setLoginStatus(isLoggedIn) {
    sessionStorage.setItem('isLoggedIn', isLoggedIn);
    updateNavUser();
}
function updateNavUser() {
    const userDisplay = document.getElementById('userStatus');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userDropdown = document.getElementById('userDropdown');
    if (checkLoginStatus()) {
        if (userDisplay) userDisplay.textContent = 'Selamat datang, User';
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (userDropdown) userDropdown.style.display = '';
    } else {
        if (userDisplay) userDisplay.textContent = 'Silakan login';
        if (loginBtn) loginBtn.style.display = '';
        if (registerBtn) registerBtn.style.display = '';
        if (userDropdown) userDropdown.style.display = 'none';
    }
}

// MODAL VISIBILITY
function showAnimatedModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        const card = modal.querySelector('.login-card, .modal-content');
        if (card) {
            card.classList.remove('animate-slide-up', 'animate-fade-in');
            void card.offsetWidth; // Force reflow for restart
            card.classList.add('animate-modal-in');
        }
    }
}
function openLoginModal() {
    showAnimatedModal('loginModal');
}
function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
}
function openRegisterModal() {
    closeLoginModal(); // Close login when opening register
    showAnimatedModal('registerModal');
}
function closeRegisterModal() {
    document.getElementById('registerModal').classList.remove('active');
}

window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal;
window.openRegisterModal = openRegisterModal;
window.closeRegisterModal = closeRegisterModal;

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
                    <div style="font-size: 24px; font-weight: 700; color: var(--primary); margin-bottom: 6px;">
                        Rp ${room.price.toLocaleString('id-ID')} <span style="font-size: 14px; color: var(--text-light); font-weight: 500;">/malam</span>
                    </div>

                    <div class="flex" style="gap: 15px; margin-top: 8px;">
                        <button class="btn btn-outline lihat-ulasan-btn" data-roomid="${room.id}" style="flex: 1; border-color: var(--primary); color: var(--primary); font-size: 14px;">Lihat Ulasan</button>
                        <button class="btn btn-primary" style="flex: 1; font-size: 14px;" onclick="window.openBooking(${room.id})" ${room.available === 0 ? 'disabled style="background: #ccc; cursor: not-allowed;"' : ''}>
                            ${room.available === 0 ? 'Tidak Tersedia' : 'Pesan Sekarang'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Notification Logic
function showNotification(message, type = 'success') {
    let notif = document.createElement('div');
    notif.className = `popup-notif ${type}`;
    notif.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(notif);
    setTimeout(() => {
        notif.classList.add('show');
    }, 10);
    setTimeout(() => {
        notif.classList.remove('show');
        setTimeout(() => notif.remove(), 400);
    }, 2200);
}
function showCenterNotification(message, type = 'success') {
    let notif = document.createElement('div');
    notif.className = `center-popup-notif ${type}`;
    notif.innerHTML = `
        <div class="login-card animate-modal-in" style="max-width: 350px; margin: auto;">
            <div class="logo-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            </div>
            <h2 style="font-size: 22px; margin-bottom: 8px; color: var(--primary);">Login Berhasil!</h2>
            <p style="color: var(--text-light); font-size: 14px; margin-bottom: 10px;">Selamat datang di Palanta House</p>
        </div>
    `;
    document.body.appendChild(notif);
    setTimeout(() => {
        notif.classList.add('show');
    }, 10);
    setTimeout(() => {
        notif.classList.remove('show');
        setTimeout(() => notif.remove(), 600);
    }, 1800);
}
function showCopyNotification(code) {
    let notif = document.createElement('div');
    notif.className = 'copy-popup-notif';
    notif.innerHTML = `
        <div class="copy-content">
            <div class="logo-icon">
                <svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12'></polyline></svg>
            </div>
            <div class="copy-text">Berhasil Disalin!</div>
            <div class="copy-code">Kode <span style='color:var(--primary); font-weight:700;'>${code}</span></div>
        </div>
    `;
    document.body.appendChild(notif);
    setTimeout(() => notif.classList.add('show'), 10);
    setTimeout(() => {
        notif.classList.remove('show');
        setTimeout(() => notif.remove(), 400);
    }, 1600);
}

// Login Logic (from popup)
const popupLoginForm = document.getElementById('popupLoginForm');
if (popupLoginForm) {
    popupLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        setLoginStatus(true);
        closeLoginModal();
        showCenterNotification('Login berhasil!');
        // Jangan langsung buka booking modal, user harus klik ulang
        pendingBookingRoomId = null;
        // If review modal was open, re-render it so form appears
        const bookingModal = document.getElementById('bookingModal');
        if (currentReviewRoomId && bookingModal && bookingModal.classList.contains('active')) {
            // Re-open the same review modal to show the form
            openReviewModal(currentReviewRoomId);
        }
    });
}

// Logout Logic
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        setLoginStatus(false);
        alert('Anda telah berhasil keluar.');
    });
}

// Default sample reviews (used when no saved reviews exist for a room)
const sampleReviews = [
    { name: 'Rizky Ananda', rating: 5, comment: 'Kamar bersih, pelayanan ramah. Lokasi strategis.', date: '2 hari lalu', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', photos: ['/images/room-deluxe.png'] },
    { name: 'Siti Marlina', rating: 4, comment: 'Sarapan enak, kamar nyaman. AC sedikit berisik.', date: '4 hari lalu', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', photos: ['/images/room-family.png','/images/room-standard.png'] },
    { name: 'Budi Santoso', rating: 5, comment: 'Villa mewah, kolam renang bersih dan privat.', date: '1 minggu lalu', avatar: 'https://randomuser.me/api/portraits/men/65.jpg', photos: ['/images/room-villa.png'] }
];

// Track which room's review modal is currently open
let currentReviewRoomId = null;

function getReviewsForRoom(roomId) {
    const key = `reviews_room_${roomId}`;
    try {
        const raw = localStorage.getItem(key);
        if (raw) return JSON.parse(raw);
    } catch (e) {
        console.error('Failed to parse reviews from localStorage', e);
    }
    // return a shallow copy of sampleReviews so mutations don't affect original
    return sampleReviews.slice();
}

function saveReviewForRoom(roomId, review) {
    const key = `reviews_room_${roomId}`;
    const list = getReviewsForRoom(roomId);
    list.unshift(review);
    try {
        localStorage.setItem(key, JSON.stringify(list));
    } catch (e) {
        console.error('Failed to save review to localStorage', e);
    }
}

// Compress an image File to a data URL using canvas, returns Promise<string>
function compressImageFileToDataURL(file, maxWidth = 1024, quality = 0.75) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();
        reader.onload = () => {
            img.onload = () => {
                const scale = Math.min(1, maxWidth / img.width);
                const canvas = document.createElement('canvas');
                canvas.width = Math.round(img.width * scale);
                canvas.height = Math.round(img.height * scale);
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                // Use JPEG for compression if original is not PNG
                const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
                const dataUrl = canvas.toDataURL(mime, quality);
                resolve(dataUrl);
            };
            img.onerror = reject;
            img.src = reader.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Open review modal for a room
function openReviewModal(roomId) {
    const modal = document.getElementById('bookingModal');
    const modalBody = document.getElementById('modalBody');
    const modalContent = modal.querySelector('.modal-content');
    // Activate modal with animation
    modal.classList.add('active');
    if (modalContent) {
        modalContent.classList.remove('animate-modal-in');
        void modalContent.offsetWidth;
        modalContent.classList.add('animate-modal-in');
        modalContent.style.maxWidth = '1000px';
        modalContent.style.width = '95%';
        modalContent.style.borderRadius = '20px';
    }
    // Clear previous content
    modalBody.innerHTML = '';

    const room = rooms.find(r => r.id === roomId) || { name: 'Kamar', description: '' };
    currentReviewRoomId = roomId;

    // Container: left = reviews (scrollable), right = form (if logged in)
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '28px';
    container.style.alignItems = 'flex-start';

    // Left column
    const left = document.createElement('div');
    left.style.flex = '2';
    left.style.minWidth = '0';

    const header = document.createElement('div');
    header.style.padding = '18px 14px';
    header.style.borderRadius = '12px';
    header.style.background = 'linear-gradient(90deg,#00A8A8,#F59E0B)';
    header.style.color = 'white';
    header.innerHTML = `<h3 style="margin:0 0 6px 0; font-size:20px;">Ulasan untuk ${room.name}</h3><div style='font-size:13px; opacity:0.95'>${room.description}</div>`;

    left.appendChild(header);

    const listWrap = document.createElement('div');
    listWrap.style.marginTop = '16px';
    listWrap.style.maxHeight = '420px';
    listWrap.style.overflowY = 'auto';
    listWrap.style.paddingRight = '6px';

    // Render reviews (from storage per room)
    const reviews = getReviewsForRoom(roomId);
    reviews.forEach(r => {
        const card = document.createElement('div');
        card.style.display = 'flex';
        card.style.gap = '14px';
        card.style.alignItems = 'flex-start';
        card.style.background = 'rgba(255,255,255,0.95)';
        card.style.padding = '12px 14px';
        card.style.borderRadius = '12px';
        card.style.boxShadow = '0 6px 20px rgba(0,0,0,0.04)';
        card.style.marginBottom = '12px';

        const avatarWrap = document.createElement('div');
        avatarWrap.style.width = '56px';
        avatarWrap.style.height = '56px';
        avatarWrap.style.flex = '0 0 56px';
        avatarWrap.style.borderRadius = '50%';
        avatarWrap.style.overflow = 'hidden';
        avatarWrap.innerHTML = `<img src="${r.avatar}" style="width:100%;height:100%;object-fit:cover;">`;

        const body = document.createElement('div');
        body.style.flex = '1';
        body.style.minWidth = '0';
        body.innerHTML = `<div style='display:flex;align-items:center;gap:8px;flex-wrap:wrap'><strong style='color:#006b68'>${r.name}</strong><span style='color:#f59e0b'>${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</span><small style='color:#6b7280;margin-left:auto'>${r.date}</small></div><p style='margin:8px 0 0 0;color:#111'>${r.comment}</p>`;

        // photos
        if (r.photos && r.photos.length) {
            const photos = document.createElement('div');
            photos.style.display = 'grid';
            photos.style.gridTemplateColumns = 'repeat(auto-fit, minmax(60px, 1fr))';
            photos.style.gap = '8px';
            photos.style.marginTop = '8px';
            r.photos.forEach(p => {
                const img = document.createElement('img');
                img.src = p;
                img.style.width = '100%';
                img.style.height = '44px';
                img.style.objectFit = 'cover';
                img.style.borderRadius = '8px';
                photos.appendChild(img);
            });
            body.appendChild(photos);
        }

        card.appendChild(avatarWrap);
        card.appendChild(body);
        listWrap.appendChild(card);
    });

    left.appendChild(listWrap);

    // Right column (form if logged in)
    const right = document.createElement('div');
    right.style.flex = '1';
    right.style.minWidth = '0';

    if (checkLoginStatus()) {
        const form = document.createElement('form');
        form.style.background = 'rgba(255,255,255,0.98)';
        form.style.padding = '16px';
        form.style.borderRadius = '12px';
        form.style.boxShadow = '0 6px 18px rgba(0,0,0,0.04)';

        form.innerHTML = `
            <h4 style='margin:0 0 10px 0;color:#006b68'>Tulis Ulasan Anda</h4>
            <input name='name' placeholder='Nama Anda' required style='width:100%;padding:10px;border-radius:8px;border:1px solid #e5e7eb;margin-bottom:10px'>
            <div style='display:flex;gap:6px;align-items:center;margin-bottom:10px' class='rating-stars'>
                ${[1,2,3,4,5].map(i => `<span class='star' data-value='${i}' style='font-size:20px;color:#e5e7eb;cursor:pointer'>★</span>`).join('')}
            </div>
            <textarea name='comment' placeholder='Komentar Anda' required style='width:100%;padding:10px;border-radius:8px;border:1px solid #e5e7eb;min-height:100px;margin-bottom:10px'></textarea>
            <label style='display:block;margin-bottom:8px;font-size:13px;color:#374151'>Lampirkan foto (opsional)</label>
            <input type='file' accept='image/jpeg,image/png' multiple class='review-photos-input' style='margin-bottom:10px'>
            <div class='photo-previews' style='display:grid;grid-template-columns:repeat(auto-fit,minmax(60px,1fr));gap:8px;margin-bottom:10px'></div>
            <button type='submit' class='btn btn-primary' style='width:100%'>Kirim Ulasan</button>
        `;

        let selectedRating = 0;
        const photoInput = form.querySelector('.review-photos-input');
        const previews = form.querySelector('.photo-previews');

        // Handle image previews with deletion and limits
        const MAX_FILES = 4;
        const MAX_BYTES = 2 * 1024 * 1024; // 2 MB per file
        let selectedFiles = [];

        function renderPreviews() {
            previews.innerHTML = '';
            selectedFiles.forEach((file, idx) => {
                const reader = new FileReader();
                const wrap = document.createElement('div');
                wrap.style.position = 'relative';
                wrap.style.borderRadius = '8px';
                wrap.style.overflow = 'hidden';

                const removeBtn = document.createElement('button');
                removeBtn.type = 'button';
                removeBtn.innerHTML = '✕';
                removeBtn.title = 'Hapus lampiran';
                removeBtn.style.position = 'absolute';
                removeBtn.style.top = '6px';
                removeBtn.style.right = '6px';
                removeBtn.style.background = 'rgba(0,0,0,0.5)';
                removeBtn.style.color = 'white';
                removeBtn.style.border = 'none';
                removeBtn.style.borderRadius = '50%';
                removeBtn.style.width = '22px';
                removeBtn.style.height = '22px';
                removeBtn.style.cursor = 'pointer';

                removeBtn.addEventListener('click', () => {
                    selectedFiles.splice(idx, 1);
                    renderPreviews();
                });

                reader.onload = () => {
                    const img = document.createElement('img');
                    img.src = reader.result;
                    img.style.width = '100%';
                    img.style.height = '54px';
                    img.style.objectFit = 'cover';
                    img.style.display = 'block';
                    wrap.appendChild(img);
                    wrap.appendChild(removeBtn);
                    previews.appendChild(wrap);
                };
                reader.readAsDataURL(file);
            });
        }

        photoInput.addEventListener('change', (ev) => {
            const files = Array.from(ev.target.files || []);
            const allowed = ['image/jpeg', 'image/png'];
            for (const file of files) {
                if (!allowed.includes(file.type)) {
                    showNotification(`Tipe file ${file.type} tidak didukung. Hanya JPEG/PNG.`, 'error');
                    continue;
                }
                if (selectedFiles.length >= MAX_FILES) {
                    showNotification(`Batas lampiran ${MAX_FILES} foto`, 'error');
                    break;
                }
                if (file.size > MAX_BYTES) {
                    showNotification(`File ${file.name} terlalu besar (max 2MB)`, 'error');
                    continue;
                }
                selectedFiles.push(file);
            }
            // clear the native input so selecting same file again works
            photoInput.value = '';
            renderPreviews();
        });

        form.addEventListener('mouseover', (e) => {
            if (e.target.classList && e.target.classList.contains('star')) {
                const v = Number(e.target.getAttribute('data-value'));
                form.querySelectorAll('.star').forEach((s, idx) => s.style.color = idx < v ? '#f59e0b' : '#e5e7eb');
            }
        });
        form.addEventListener('mouseout', () => {
            form.querySelectorAll('.star').forEach((s, idx) => s.style.color = idx < selectedRating ? '#f59e0b' : '#e5e7eb');
        });
        form.addEventListener('click', (e) => {
            if (e.target.classList && e.target.classList.contains('star')) {
                selectedRating = Number(e.target.getAttribute('data-value'));
                form.querySelectorAll('.star').forEach((s, idx) => s.style.color = idx < selectedRating ? '#f59e0b' : '#e5e7eb');
            }
        });
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const name = formData.get('name') || 'Tamu';
            const comment = formData.get('comment') || '';
            // Compress selectedFiles to data URLs before saving
            const filesToProcess = selectedFiles.slice(0, 4);
            const compressPromises = filesToProcess.map(f => compressImageFileToDataURL(f, 1024, 0.75));
            Promise.all(compressPromises).then(dataUrls => {
                const newReview = {
                    name,
                    rating: selectedRating || 5,
                    comment,
                    date: 'Baru saja',
                    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
                    photos: dataUrls
                };
                saveReviewForRoom(roomId, newReview);
                // Re-open modal to refresh list and show the new review on top
                openReviewModal(roomId);
                showNotification('Ulasan berhasil dikirim!');
            }).catch(err => {
                console.error(err);
                showNotification('Terjadi kesalahan saat memproses gambar', 'error');
            });
        });

        right.appendChild(form);
    } else {
        // Placeholder when not logged in
        const notice = document.createElement('div');
        notice.style.padding = '18px';
        notice.style.borderRadius = '12px';
        notice.style.background = 'rgba(255,255,255,0.95)';
        notice.style.boxShadow = '0 6px 18px rgba(0,0,0,0.04)';
        notice.innerHTML = `<p style='margin:0 0 8px 0;color:#111;font-weight:600'>Masuk untuk menulis ulasan</p><p style='margin:0;color:#6b7280'>Silakan <a href='#' onclick='openLoginModal(); return false;' style='color:#006b68'>masuk</a> agar dapat mengirim ulasan.</p>`;
        right.appendChild(notice);
    }

    container.appendChild(left);
    container.appendChild(right);
    modalBody.appendChild(container);

    // Close button behavior
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.onclick = () => { modal.classList.remove('active'); modalBody.innerHTML = ''; };
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateNavUser();
    renderRooms();

    // Bind Lihat Ulasan buttons (delegated) so modal opens with reviews
    const roomGridEl = document.getElementById('room-grid');
    if (roomGridEl) {
        roomGridEl.addEventListener('click', (e) => {
            const btn = e.target.closest && e.target.closest('.lihat-ulasan-btn');
            if (btn) {
                const id = parseInt(btn.getAttribute('data-roomid')) || null;
                if (id) openReviewModal(id);
            }
        });
    }

    // Ensure bookingModal close clears any dynamic content
    const bookingModalEl = document.getElementById('bookingModal');
    if (bookingModalEl) {
        const closeBtn = bookingModalEl.querySelector('.close-modal');
        if (closeBtn) closeBtn.addEventListener('click', () => {
            bookingModalEl.classList.remove('active');
            const mb = document.getElementById('modalBody');
            if (mb) mb.innerHTML = '';
        });
    }

    // Promo grid: use manual navigation (prev/next) instead of auto-duplication/animation
    const promoGrid = document.getElementById('promoGrid');
    if (promoGrid) {
        // Ensure horizontal scroll behavior will be handled by CSS; attach nav handlers
        const promoPrev = document.getElementById('promoPrev');
        const promoNext = document.getElementById('promoNext');

        // Reduce jump distance so navigation feels smoother and less jarring
        const scrollAmount = () => Math.max(160, Math.round(promoGrid.clientWidth * 0.45));

        if (promoPrev) {
            promoPrev.addEventListener('click', () => {
                promoGrid.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
            });
            promoPrev.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); promoPrev.click(); }
            });
        }

        if (promoNext) {
            promoNext.addEventListener('click', () => {
                promoGrid.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
            });
            promoNext.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); promoNext.click(); }
            });
        }
    }

    // Expose booking function globally
    window.openBooking = (roomId) => {
        if (!checkLoginStatus()) {
            pendingBookingRoomId = roomId;
            openLoginModal();
            return;
        }
        // Jika baru login, harus klik ulang tombol pesan sekarang
        if (pendingBookingRoomId === roomId) {
            // Sudah login, reset dan jangan buka modal
            pendingBookingRoomId = null;
            return;
        }
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

    // Registration Modal Logic
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;
            if (password !== confirmPassword) {
                document.getElementById('passwordError').style.display = 'block';
                return;
            }
            document.getElementById('passwordError').style.display = 'none';
            showNotification('Pendaftaran berhasil! Silakan login.');
            closeRegisterModal();
            openLoginModal();
            registerForm.reset();
        });
    }

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

    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            openLoginModal();
        });
    }
    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            openRegisterModal();
        });
    }

    // Pastikan semua modal pakai animasi profesional
    const style = document.createElement('style');
    style.innerHTML = `
    @keyframes modalIn {
        0% { opacity: 0; transform: translateY(40px) scale(0.96); }
        60% { opacity: 1; transform: translateY(-8px) scale(1.02); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    .animate-modal-in {
        animation: modalIn 0.6s cubic-bezier(.4,1.4,.6,1) both;
    }
    `;
    document.head.appendChild(style);

    window.copyPromoCode = function(code) {
        navigator.clipboard.writeText(code).then(() => {
            showCopyNotification(code);
        });
    };
});
