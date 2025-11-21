export function openBookingModal(room) {
    const modal = document.getElementById('bookingModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.close-modal');

    if (!modal || !modalBody) return;

    let step = 1;
    let checkIn = '2025-11-06';
    let checkOut = '2025-11-07'; // Default 1 night
    let paymentMethod = 'bank';

    const calculateNights = () => {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 1;
    };

    const renderStep1 = () => {
        const nights = calculateNights();
        const total = room.price * nights;

        modalBody.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <h2 style="color: var(--primary); font-size: 24px; font-weight: bold;">Pemesanan Kamar</h2>
            </div>
            
            <div style="background: #F0FDFA; padding: 24px; border-radius: 12px; margin-bottom: 30px;">
                <h3 style="font-size: 18px; color: var(--secondary); margin-bottom: 8px; font-weight: 600;">${room.name}</h3>
                <p style="color: var(--primary); font-size: 16px;">Rp ${room.price.toLocaleString('id-ID')} <span style="color: #9CA3AF;">/ malam</span></p>
            </div>

            <div class="flex gap-6 mb-8">
                <div class="form-group" style="flex: 1;">
                    <label style="display: flex; align-items: center; gap: 8px; font-weight: 600; margin-bottom: 12px; color: var(--secondary);">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        Tanggal Check-in
                    </label>
                    <div style="position: relative;">
                        <input type="date" class="form-control" value="${checkIn}" id="checkInInput" style="width: 100%; padding: 14px; border: 1px solid #A5F3FC; border-radius: 8px; background: #F0FDFA; color: var(--text-main); outline: none;">
                    </div>
                </div>
                <div class="form-group" style="flex: 1;">
                    <label style="display: flex; align-items: center; gap: 8px; font-weight: 600; margin-bottom: 12px; color: var(--secondary);">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        Tanggal Check-out
                    </label>
                    <div style="position: relative;">
                        <input type="date" class="form-control" value="${checkOut}" id="checkOutInput" style="width: 100%; padding: 14px; border: 1px solid #A5F3FC; border-radius: 8px; background: #F0FDFA; color: var(--text-main); outline: none;">
                    </div>
                </div>
            </div>

            <div style="background: #F9FAFB; padding: 24px; border-radius: 12px; margin-bottom: 30px;">
                <div class="flex justify-between mb-4">
                    <span style="color: var(--text-light); font-weight: 500;">Jumlah Malam</span>
                    <span style="font-weight: 600;">${nights} malam</span>
                </div>
                <div class="flex justify-between mb-5">
                    <span style="color: var(--text-light); font-weight: 500;">Harga per Malam</span>
                    <span style="font-weight: 600;">Rp ${room.price.toLocaleString('id-ID')}</span>
                </div>
                <div style="height: 1px; background: #E5E7EB; margin-bottom: 20px;"></div>
                <div class="flex justify-between items-center">
                    <span style="font-weight: 600; font-size: 16px; color: var(--secondary);">Total Harga</span>
                    <span style="color: var(--primary); font-weight: bold; font-size: 20px;">Rp ${total.toLocaleString('id-ID')}</span>
                </div>
            </div>

            <div class="flex gap-5">
                <button class="btn" style="flex: 1; background: white; border: 1px solid #E5E7EB; color: var(--text-main); padding: 14px; font-weight: 600;" id="cancelBtn">Batal</button>
                <button class="btn" style="flex: 1; background: var(--primary); color: white; border: none; padding: 14px; font-weight: 600;" id="nextBtn">Lanjut ke Pembayaran</button>
            </div>
        `;

        document.getElementById('checkInInput').onchange = (e) => { checkIn = e.target.value; render(); };
        document.getElementById('checkOutInput').onchange = (e) => { checkOut = e.target.value; render(); };
        document.getElementById('cancelBtn').onclick = closeModal;
        document.getElementById('nextBtn').onclick = () => { step = 2; render(); };
    };

    const renderStep2 = () => {
        const nights = calculateNights();
        const total = room.price * nights;

        modalBody.innerHTML = `
            <h2 style="color: var(--primary); margin-bottom: 20px;">Pembayaran</h2>
            
            <div style="background: #f0fdfa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <div class="flex justify-between mb-2">
                    <span style="font-weight: bold;">${room.name}</span>
                    <span style="color: var(--primary); font-weight: bold;">Rp ${total.toLocaleString('id-ID')}</span>
                </div>
                <div class="flex justify-between text-sm text-gray-500">
                    <span>Check-in: ${checkIn}</span>
                    <span>Check-out: ${checkOut}</span>
                </div>
            </div>

            <h4 style="margin-bottom: 10px; font-size: 14px;">Metode Pembayaran</h4>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
                <div class="payment-option ${paymentMethod === 'bank' ? 'active' : ''}" onclick="window.setPayment('bank')" style="border: 1px solid ${paymentMethod === 'bank' ? 'var(--primary)' : '#e5e7eb'}; padding: 12px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 10px;">
                    <div style="width: 16px; height: 16px; border-radius: 50%; border: 4px solid ${paymentMethod === 'bank' ? 'var(--primary)' : '#e5e7eb'};"></div>
                    <span>Transfer Bank</span>
                </div>
                <div class="payment-option ${paymentMethod === 'ewallet' ? 'active' : ''}" onclick="window.setPayment('ewallet')" style="border: 1px solid ${paymentMethod === 'ewallet' ? 'var(--primary)' : '#e5e7eb'}; padding: 12px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 10px;">
                    <div style="width: 16px; height: 16px; border-radius: 50%; border: 1px solid #e5e7eb; ${paymentMethod === 'ewallet' ? 'border: 4px solid var(--primary);' : ''}"></div>
                    <span>E-Wallet (QRIS)</span>
                </div>
            </div>

            ${paymentMethod === 'bank' ? `
                <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <p style="margin-bottom: 5px;">Silakan transfer ke rekening berikut:</p>
                    <p style="font-weight: bold;">Bank BCA: 1234567890</p>
                    <p style="margin-bottom: 10px;">a.n. Palanta House</p>
                    <p style="color: var(--primary); font-weight: bold; font-size: 18px;">Rp ${total.toLocaleString('id-ID')}</p>
                </div>
                <div style="border: 2px dashed var(--primary); padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px; cursor: pointer; color: var(--text-light);">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <p style="margin-top: 5px; font-size: 12px;">Upload Bukti Pembayaran</p>
                </div>
            ` : `
                <div style="text-align: center; margin-bottom: 20px;">
                    <p style="margin-bottom: 10px;">Scan QR Code berikut:</p>
                    <div style="width: 200px; height: 200px; background: #eee; margin: 0 auto; display: flex; align-items: center; justify-content: center; border: 4px solid var(--primary); border-radius: 12px;">
                        <span style="font-weight: bold; font-size: 24px;">QR CODE</span>
                    </div>
                    <p style="margin-top: 10px; color: var(--primary); font-weight: bold;">Rp ${total.toLocaleString('id-ID')}</p>
                </div>
            `}

            <div class="flex gap-3">
                <button class="btn btn-outline" style="flex: 1; border-color: #e5e7eb; color: var(--text-main);" id="backBtn">Kembali</button>
                <button class="btn btn-primary" style="flex: 1;" id="confirmBtn">Konfirmasi Pemesanan</button>
            </div>
        `;

        document.getElementById('backBtn').onclick = () => { step = 1; render(); };
        document.getElementById('confirmBtn').onclick = () => { step = 3; render(); };

        // Helper for payment toggle
        window.setPayment = (method) => {
            paymentMethod = method;
            render();
        };
    };

    const renderStep3 = () => {
        const nights = calculateNights();
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 20px 0;">
                <div style="width: 80px; height: 80px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: white;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h2 style="color: var(--secondary); margin-bottom: 10px;">Terima Kasih!</h2>
                <p style="color: var(--text-light); margin-bottom: 30px;">Pemesanan Anda telah berhasil dikonfirmasi</p>
                
                <div style="background: #f0fdfa; padding: 20px; border-radius: 12px; text-align: left; margin-bottom: 30px; border: 1px solid #ccfbf1;">
                    <h4 style="color: var(--primary); margin-bottom: 15px; text-align: center;">Detail Pemesanan</h4>
                    <div class="flex justify-between mb-2 text-sm">
                        <span class="text-gray-500">Kamar:</span>
                        <span class="font-semibold">${room.name}</span>
                    </div>
                    <div class="flex justify-between mb-2 text-sm">
                        <span class="text-gray-500">Check-in:</span>
                        <span>${checkIn}</span>
                    </div>
                    <div class="flex justify-between mb-2 text-sm">
                        <span class="text-gray-500">Check-out:</span>
                        <span>${checkOut}</span>
                    </div>
                    <div class="flex justify-between mb-4 text-sm">
                        <span class="text-gray-500">Total:</span>
                        <span class="font-bold text-primary">Rp ${(room.price * nights).toLocaleString('id-ID')}</span>
                    </div>
                </div>

                <button class="btn btn-primary" style="width: 100%;" id="finishBtn">Selesai</button>
            </div>
        `;
        document.getElementById('finishBtn').onclick = closeModal;
    };

    const render = () => {
        if (step === 1) renderStep1();
        else if (step === 2) renderStep2();
        else if (step === 3) renderStep3();
    };

    const closeModal = () => {
        modal.classList.remove('active');
    };

    closeBtn.onclick = closeModal;
    modal.classList.add('active');
    render();
}
