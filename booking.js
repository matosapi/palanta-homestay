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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '-';
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const renderStep1 = () => {
        const nights = calculateNights();
        const total = room.price * nights;

        // Validation
        const isValidDate = (d) => !isNaN(new Date(d).getTime());
        const isDateValid = isValidDate(checkIn) && isValidDate(checkOut) && new Date(checkOut) > new Date(checkIn);

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
                <button class="btn" style="flex: 1; background: white; border: 1px solid #E5E7EB; color: var(--text-main); padding: 14px; font-weight: 600;" id="bookingCancelBtn">Batal</button>
                <button class="btn" style="flex: 1; background: var(--primary); color: white; border: none; padding: 14px; font-weight: 600; opacity: ${isDateValid ? '1' : '0.5'}; cursor: ${isDateValid ? 'pointer' : 'not-allowed'};" id="bookingNextBtn" ${!isDateValid ? 'disabled' : ''}>Lanjut ke Pembayaran</button>
            </div>
        `;

        document.getElementById('checkInInput').onchange = (e) => { checkIn = e.target.value; render(); };
        document.getElementById('checkOutInput').onchange = (e) => { checkOut = e.target.value; render(); };
        document.getElementById('bookingCancelBtn').onclick = closeModal;
        document.getElementById('bookingNextBtn').onclick = () => {
            if (isDateValid) {
                step = 2;
                render();
            }
        };
    };

    const renderStep2 = () => {
        const nights = calculateNights();
        const total = room.price * nights;

        modalBody.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="color: var(--primary); font-size: 20px; font-weight: bold;">Pembayaran</h2>
            </div>
            
            <div style="background: #F0FDFA; padding: 16px; border-radius: 12px; margin-bottom: 24px; border: 1px solid #CCFBF1;">
                <h3 style="font-size: 16px; color: var(--secondary); margin-bottom: 12px; font-weight: 700;">${room.name}</h3>
                <div class="flex justify-between text-sm text-gray-500 mb-3">
                    <div>
                        <span style="display: block; font-size: 12px; color: #6B7280; margin-bottom: 2px;">Check-in</span>
                        <span style="color: var(--secondary); font-weight: 600; font-size: 14px;">${formatDate(checkIn)}</span>
                    </div>
                    <div style="text-align: right;">
                        <span style="display: block; font-size: 12px; color: #6B7280; margin-bottom: 2px;">Check-out</span>
                        <span style="color: var(--secondary); font-weight: 600; font-size: 14px;">${formatDate(checkOut)}</span>
                    </div>
                </div>
                <div style="height: 1px; background: #CCFBF1; margin-bottom: 12px;"></div>
                <div class="flex justify-between items-center">
                    <span style="font-weight: 600; color: var(--secondary); font-size: 14px;">Total Pembayaran</span>
                    <span style="color: var(--primary); font-weight: 800; font-size: 18px;">Rp ${total.toLocaleString('id-ID')}</span>
                </div>
            </div>

            <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 700; color: var(--secondary);">Metode Pembayaran</h4>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;">
                <!-- Bank Transfer -->
                <div class="payment-option ${paymentMethod === 'bank' ? 'active' : ''}" onclick="window.setPayment('bank')">
                    <div class="payment-radio"></div>
                    <div class="flex items-center gap-3 flex-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="payment-icon"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                        <span style="font-weight: 600; font-size: 14px; color: var(--secondary);">Transfer Bank</span>
                    </div>
                </div>

                <!-- E-Wallet -->
                <div class="payment-option ${paymentMethod === 'ewallet' ? 'active' : ''}" onclick="window.setPayment('ewallet')">
                    <div class="payment-radio"></div>
                    <div class="flex items-center gap-3 flex-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="payment-icon"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                        <span style="font-weight: 600; font-size: 14px; color: var(--secondary);">E-Wallet</span>
                    </div>
                </div>

                <!-- Credit Card -->
                <div class="payment-option ${paymentMethod === 'cc' ? 'active' : ''}" onclick="window.setPayment('cc')">
                    <div class="payment-radio"></div>
                    <div class="flex items-center gap-3 flex-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="payment-icon"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                        <span style="font-weight: 600; font-size: 14px; color: var(--secondary);">Kartu Kredit/Debit</span>
                    </div>
                </div>
            </div>

            <!-- Dynamic Content Based on Payment Method -->
            ${paymentMethod === 'bank' ? `
                <div class="payment-details-box" style="border: 1px solid #CCFBF1; padding: 16px;">
                    <p style="margin-bottom: 6px; font-size: 13px; color: var(--text-light);">Silakan transfer ke rekening berikut:</p>
                    <p style="font-weight: 700; font-size: 16px; margin-bottom: 2px; color: var(--secondary);">Bank BCA: 1234567890</p>
                    <p style="margin-bottom: 12px; font-size: 13px; color: var(--text-light);">a.n. Palanta House</p>
                    <p style="color: var(--primary); font-weight: 800; font-size: 20px;">Rp ${total.toLocaleString('id-ID')}</p>
                </div>
                
                <h4 style="margin-bottom: 10px; font-size: 13px; font-weight: 600; color: var(--secondary);">Upload Bukti Pembayaran</h4>
                <div class="upload-area" style="padding: 20px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 8px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <p style="font-size: 13px; color: #9CA3AF;">photomode_06112025_164853.png</p>
                </div>
            ` : paymentMethod === 'ewallet' ? `
                <div style="text-align: center; margin-bottom: 20px; background: #F0FDFA; padding: 24px; border-radius: 16px; border: 1px solid #CCFBF1;">
                    <p style="margin-bottom: 16px; font-weight: 600; color: var(--secondary); font-size: 14px;">Scan QR Code berikut:</p>
                    <div style="width: 180px; height: 180px; background: white; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; border: 3px solid var(--primary); border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
                        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="7" y="7" width="3" height="3"></rect><rect x="14" y="7" width="3" height="3"></rect><rect x="7" y="14" width="3" height="3"></rect><rect x="14" y="14" width="3" height="3"></rect></svg>
                    </div>
                    <p style="color: var(--primary); font-weight: 800; font-size: 20px; margin-bottom: 2px;">Rp ${total.toLocaleString('id-ID')}</p>
                    <p style="font-size: 13px; color: var(--text-light);">Palanta House</p>
                </div>
            ` : `
                <div style="text-align: center; padding: 30px 0; color: var(--text-light);">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 12px;"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                    <p style="font-size: 14px;">Fitur pembayaran Kartu Kredit sedang dalam pengembangan.</p>
                </div>
            `}

            <div class="flex gap-3" style="margin-top: 30px;">
                <button class="btn btn-outline" style="flex: 1; border-color: #E5E7EB; color: var(--text-main); font-weight: 600; padding: 12px; font-size: 14px;" id="backBtn">Kembali</button>
                <button class="btn btn-primary" style="flex: 1; font-weight: 600; padding: 12px; font-size: 14px; box-shadow: 0 4px 12px rgba(0, 168, 168, 0.2);" id="confirmBtn">Konfirmasi Pemesanan</button>
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
            <div style="text-align: center; padding-bottom: 10px;">
                <div class="success-checkmark" style="width: 80px; height: 80px; margin-bottom: 20px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                
                <h2 style="font-family: var(--font-serif); font-size: 24px; color: var(--secondary); margin-bottom: 6px; font-weight: 700;">Terima Kasih!</h2>
                <p style="color: var(--text-light); margin-bottom: 24px; font-size: 14px;">Pemesanan Anda telah berhasil dikonfirmasi</p>
                
                <div class="order-details" style="text-align: left; margin-bottom: 24px; padding: 24px; background: #F0FDFA; border-radius: 16px; border: 1px solid #CCFBF1;">
                    <h4 style="color: var(--primary); margin-bottom: 16px; text-align: center; font-size: 16px; font-weight: 700;">Detail Pemesanan</h4>
                    
                    <div class="flex justify-between mb-3 text-sm">
                        <span style="color: var(--text-light); font-size: 13px;">Kamar</span>
                        <span style="font-weight: 600; color: var(--secondary); font-size: 13px;">${room.name}</span>
                    </div>
                    <div class="flex justify-between mb-3 text-sm">
                        <span style="color: var(--text-light); font-size: 13px;">Check-in</span>
                        <span style="font-weight: 600; color: var(--secondary); font-size: 13px;">${formatDate(checkIn)}</span>
                    </div>
                    <div class="flex justify-between mb-3 text-sm">
                        <span style="color: var(--text-light); font-size: 13px;">Check-out</span>
                        <span style="font-weight: 600; color: var(--secondary); font-size: 13px;">${formatDate(checkOut)}</span>
                    </div>
                    <div class="flex justify-between mb-3 text-sm">
                        <span style="color: var(--text-light); font-size: 13px;">Durasi</span>
                        <span style="font-weight: 600; color: var(--secondary); font-size: 13px;">${nights} malam</span>
                    </div>
                    <div style="height: 1px; background: #CCFBF1; margin: 16px 0;"></div>
                    <div class="flex justify-between items-center">
                        <span style="color: var(--secondary); font-weight: 700; font-size: 14px;">Total Pembayaran</span>
                        <span style="color: var(--primary); font-weight: 800; font-size: 18px;">Rp ${(room.price * nights).toLocaleString('id-ID')}</span>
                    </div>
                </div>

                <div style="background: #F8FAFC; padding: 16px; border-radius: 12px; margin-bottom: 24px; font-size: 12px; color: var(--text-light); line-height: 1.6; border: 1px solid #E5E7EB;">
                    Tim kami akan segera memverifikasi pembayaran Anda dan mengirimkan konfirmasi melalui email dalam waktu 1x24 jam.
                </div>

                <p style="color: var(--primary); font-style: italic; font-size: 13px; margin-bottom: 6px; font-weight: 500;">Sampai jumpa di Palanta House!</p>
                <p style="color: var(--text-light); font-size: 11px; margin-bottom: 24px;">~ Tim Palanta House ~</p>

                <button class="btn btn-primary" style="width: 100%; font-weight: 600; padding: 14px; font-size: 14px; box-shadow: 0 4px 12px rgba(0, 168, 168, 0.2);" id="finishBtn">Selesai</button>
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
