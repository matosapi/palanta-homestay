(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();function w(i){const e=document.getElementById("bookingModal"),r=document.getElementById("modalBody"),l=document.querySelector(".close-modal");if(!e||!r)return;let t=1,a="2025-11-06",s="2025-11-07",n="bank";const o=()=>{const c=new Date(a),m=new Date(s),u=Math.abs(m-c),y=Math.ceil(u/(1e3*60*60*24));return y>0?y:1},p=()=>{const c=o(),m=i.price*c;r.innerHTML=`
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <h2 style="color: var(--primary); font-size: 24px; font-weight: bold;">Pemesanan Kamar</h2>
            </div>
            
            <div style="background: #F0FDFA; padding: 24px; border-radius: 12px; margin-bottom: 30px;">
                <h3 style="font-size: 18px; color: var(--secondary); margin-bottom: 8px; font-weight: 600;">${i.name}</h3>
                <p style="color: var(--primary); font-size: 16px;">Rp ${i.price.toLocaleString("id-ID")} <span style="color: #9CA3AF;">/ malam</span></p>
            </div>

            <div class="flex gap-6 mb-8">
                <div class="form-group" style="flex: 1;">
                    <label style="display: flex; align-items: center; gap: 8px; font-weight: 600; margin-bottom: 12px; color: var(--secondary);">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        Tanggal Check-in
                    </label>
                    <div style="position: relative;">
                        <input type="date" class="form-control" value="${a}" id="checkInInput" style="width: 100%; padding: 14px; border: 1px solid #A5F3FC; border-radius: 8px; background: #F0FDFA; color: var(--text-main); outline: none;">
                    </div>
                </div>
                <div class="form-group" style="flex: 1;">
                    <label style="display: flex; align-items: center; gap: 8px; font-weight: 600; margin-bottom: 12px; color: var(--secondary);">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        Tanggal Check-out
                    </label>
                    <div style="position: relative;">
                        <input type="date" class="form-control" value="${s}" id="checkOutInput" style="width: 100%; padding: 14px; border: 1px solid #A5F3FC; border-radius: 8px; background: #F0FDFA; color: var(--text-main); outline: none;">
                    </div>
                </div>
            </div>

            <div style="background: #F9FAFB; padding: 24px; border-radius: 12px; margin-bottom: 30px;">
                <div class="flex justify-between mb-4">
                    <span style="color: var(--text-light); font-weight: 500;">Jumlah Malam</span>
                    <span style="font-weight: 600;">${c} malam</span>
                </div>
                <div class="flex justify-between mb-5">
                    <span style="color: var(--text-light); font-weight: 500;">Harga per Malam</span>
                    <span style="font-weight: 600;">Rp ${i.price.toLocaleString("id-ID")}</span>
                </div>
                <div style="height: 1px; background: #E5E7EB; margin-bottom: 20px;"></div>
                <div class="flex justify-between items-center">
                    <span style="font-weight: 600; font-size: 16px; color: var(--secondary);">Total Harga</span>
                    <span style="color: var(--primary); font-weight: bold; font-size: 20px;">Rp ${m.toLocaleString("id-ID")}</span>
                </div>
            </div>

            <div class="flex gap-5">
                <button class="btn" style="flex: 1; background: white; border: 1px solid #E5E7EB; color: var(--text-main); padding: 14px; font-weight: 600;" id="cancelBtn">Batal</button>
                <button class="btn" style="flex: 1; background: var(--primary); color: white; border: none; padding: 14px; font-weight: 600;" id="nextBtn">Lanjut ke Pembayaran</button>
            </div>
        `,document.getElementById("checkInInput").onchange=u=>{a=u.target.value,g()},document.getElementById("checkOutInput").onchange=u=>{s=u.target.value,g()},document.getElementById("cancelBtn").onclick=x,document.getElementById("nextBtn").onclick=()=>{t=2,g()}},d=()=>{const c=o(),m=i.price*c;r.innerHTML=`
            <h2 style="color: var(--primary); margin-bottom: 20px;">Pembayaran</h2>
            
            <div style="background: #f0fdfa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <div class="flex justify-between mb-2">
                    <span style="font-weight: bold;">${i.name}</span>
                    <span style="color: var(--primary); font-weight: bold;">Rp ${m.toLocaleString("id-ID")}</span>
                </div>
                <div class="flex justify-between text-sm text-gray-500">
                    <span>Check-in: ${a}</span>
                    <span>Check-out: ${s}</span>
                </div>
            </div>

            <h4 style="margin-bottom: 10px; font-size: 14px;">Metode Pembayaran</h4>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
                <div class="payment-option ${n==="bank"?"active":""}" onclick="window.setPayment('bank')" style="border: 1px solid ${n==="bank"?"var(--primary)":"#e5e7eb"}; padding: 12px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 10px;">
                    <div style="width: 16px; height: 16px; border-radius: 50%; border: 4px solid ${n==="bank"?"var(--primary)":"#e5e7eb"};"></div>
                    <span>Transfer Bank</span>
                </div>
                <div class="payment-option ${n==="ewallet"?"active":""}" onclick="window.setPayment('ewallet')" style="border: 1px solid ${n==="ewallet"?"var(--primary)":"#e5e7eb"}; padding: 12px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 10px;">
                    <div style="width: 16px; height: 16px; border-radius: 50%; border: 1px solid #e5e7eb; ${n==="ewallet"?"border: 4px solid var(--primary);":""}"></div>
                    <span>E-Wallet (QRIS)</span>
                </div>
            </div>

            ${n==="bank"?`
                <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <p style="margin-bottom: 5px;">Silakan transfer ke rekening berikut:</p>
                    <p style="font-weight: bold;">Bank BCA: 1234567890</p>
                    <p style="margin-bottom: 10px;">a.n. Palanta House</p>
                    <p style="color: var(--primary); font-weight: bold; font-size: 18px;">Rp ${m.toLocaleString("id-ID")}</p>
                </div>
                <div style="border: 2px dashed var(--primary); padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px; cursor: pointer; color: var(--text-light);">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <p style="margin-top: 5px; font-size: 12px;">Upload Bukti Pembayaran</p>
                </div>
            `:`
                <div style="text-align: center; margin-bottom: 20px;">
                    <p style="margin-bottom: 10px;">Scan QR Code berikut:</p>
                    <div style="width: 200px; height: 200px; background: #eee; margin: 0 auto; display: flex; align-items: center; justify-content: center; border: 4px solid var(--primary); border-radius: 12px;">
                        <span style="font-weight: bold; font-size: 24px;">QR CODE</span>
                    </div>
                    <p style="margin-top: 10px; color: var(--primary); font-weight: bold;">Rp ${m.toLocaleString("id-ID")}</p>
                </div>
            `}

            <div class="flex gap-3">
                <button class="btn btn-outline" style="flex: 1; border-color: #e5e7eb; color: var(--text-main);" id="backBtn">Kembali</button>
                <button class="btn btn-primary" style="flex: 1;" id="confirmBtn">Konfirmasi Pemesanan</button>
            </div>
        `,document.getElementById("backBtn").onclick=()=>{t=1,g()},document.getElementById("confirmBtn").onclick=()=>{t=3,g()},window.setPayment=u=>{n=u,g()}},h=()=>{const c=o();r.innerHTML=`
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
                        <span class="font-semibold">${i.name}</span>
                    </div>
                    <div class="flex justify-between mb-2 text-sm">
                        <span class="text-gray-500">Check-in:</span>
                        <span>${a}</span>
                    </div>
                    <div class="flex justify-between mb-2 text-sm">
                        <span class="text-gray-500">Check-out:</span>
                        <span>${s}</span>
                    </div>
                    <div class="flex justify-between mb-4 text-sm">
                        <span class="text-gray-500">Total:</span>
                        <span class="font-bold text-primary">Rp ${(i.price*c).toLocaleString("id-ID")}</span>
                    </div>
                </div>

                <button class="btn btn-primary" style="width: 100%;" id="finishBtn">Selesai</button>
            </div>
        `,document.getElementById("finishBtn").onclick=x},g=()=>{t===1?p():t===2?d():t===3&&h()},x=()=>{e.classList.remove("active")};l.onclick=x,e.classList.add("active"),g()}const f=[{id:1,name:"Deluxe Garden View",price:5e5,image:"/images/room-deluxe.png",rating:4.8,capacity:2,available:5,description:"Kamar luas dengan pemandangan taman yang asri. Dilengkapi dengan fasilitas modern untuk kenyamanan Anda.",features:["AC & Kipas Angin","TV LED","Wi-Fi Gratis","Kamar Mandi Dalam","Sarapan Gratis"]},{id:2,name:"Family Suite",price:85e4,image:"/images/room-family.png",rating:4.9,capacity:4,available:3,description:"Pilihan tepat untuk liburan keluarga. Ruang tamu terpisah dan area bermain anak.",features:["2 King Beds","Ruang Tamu","Kitchenette","Balkon Pribadi","Netflix"]},{id:3,name:"Standard Room",price:35e4,image:"/images/room-standard.png",rating:4.5,capacity:2,available:0,description:"Kenyamanan ekonomis tanpa mengorbankan kualitas. Cocok untuk traveler solo atau pasangan.",features:["Queen Bed","AC","Shower Air Panas","Meja Kerja"]},{id:4,name:"Premium Villa",price:15e5,image:"/images/room-villa.png",rating:5,capacity:6,available:2,description:"Pengalaman menginap mewah dengan kolam renang pribadi dan layanan butler 24 jam.",features:["Private Pool","3 Kamar Tidur","Full Kitchen","BBQ Area","Butler Service"]},{id:5,name:"Junior Suite",price:65e4,image:"/images/room-deluxe.png",rating:4.7,capacity:2,available:4,description:"Suite modern dengan area kerja luas dan balkon dengan pemandangan kota.",features:["King Bed","Work Desk","City View","Mini Bar","Bathtub"]},{id:6,name:"Twin Saver",price:3e5,image:"/images/room-standard.png",rating:4.4,capacity:2,available:2,description:"Pilihan hemat untuk teman perjalanan. Dua tempat tidur single yang nyaman.",features:["2 Single Beds","AC","Free WiFi","Shared Lounge"]},{id:7,name:"Executive Room",price:95e4,image:"/images/room-family.png",rating:4.9,capacity:2,available:5,description:"Kamar eksklusif untuk pebisnis dengan akses ke Executive Lounge.",features:["King Bed","Executive Lounge","Meeting Room Access","High Speed WiFi"]},{id:8,name:"Family Loft",price:12e5,image:"/images/room-villa.png",rating:4.8,capacity:5,available:1,description:"Loft 2 lantai yang luas, sempurna untuk keluarga besar atau grup.",features:["2 Floors","2 Queen Beds","Sofa Bed","Kitchenette","2 Bathrooms"]},{id:9,name:"Single Pod",price:15e4,image:"/images/room-standard.png",rating:4.3,capacity:1,available:5,description:"Pod kapsul modern untuk solo traveler yang mencari privasi dan kenyamanan.",features:["Single Pod","Locker","Shared Bathroom","Reading Light","USB Port"]}];function k(){const i=document.getElementById("room-grid");i&&(i.innerHTML=f.map(e=>`
        <div class="dashboard-card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column;">
            <div style="position: relative; height: 200px;">
                <img src="${e.image}" alt="${e.name}" style="width: 100%; height: 100%; object-fit: cover;">
                <div style="position: absolute; top: 10px; left: 10px; background: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; display: flex; align-items: center; gap: 4px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="orange" stroke="orange" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    ${e.rating}
                </div>
                <div style="position: absolute; top: 10px; right: 10px; background: var(--primary); color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                    ${e.capacity}
                </div>
                ${e.available===0?'<div style="position: absolute; bottom: 10px; right: 10px; background: #ef4444; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Tidak Tersedia</div>':e.available<3?`<div style="position: absolute; bottom: 10px; right: 10px; background: var(--accent); color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Terbatas (${e.available} kamar)</div>`:`<div style="position: absolute; bottom: 10px; right: 10px; background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Tersedia (${e.available} kamar)</div>`}
            </div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column;">
                <h3 style="font-size: 20px; margin-bottom: 10px;">${e.name}</h3>
                <p style="font-size: 14px; color: var(--text-light); margin-bottom: 15px; flex: 1;">${e.description}</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 20px;">
                    ${e.features.slice(0,4).map(r=>`
                        <div style="font-size: 12px; color: var(--text-light); display: flex; align-items: center; gap: 6px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            ${r}
                        </div>
                    `).join("")}
                </div>

                <div style="margin-top: auto; border-top: 1px solid #f3f4f6; padding-top: 15px;">
                    <div style="font-size: 24px; font-weight: bold; color: var(--primary); margin-bottom: 5px;">
                        Rp ${e.price.toLocaleString("id-ID")} <span style="font-size: 14px; color: var(--text-light); font-weight: normal;">/malam</span>
                    </div>
                    <p style="font-size: 10px; color: var(--text-light); margin-bottom: 15px;">Termasuk pajak dan layanan</p>
                    
                    <div class="flex" style="gap: 15px;">
                        <button class="btn btn-outline" style="flex: 1; border-color: var(--primary); color: var(--primary); font-size: 14px;">Lihat Ulasan</button>
                        <button class="btn btn-primary" style="flex: 1; font-size: 14px;" onclick="window.openBooking(${e.id})" ${e.available===0?'disabled style="background: #ccc; cursor: not-allowed;"':""}>
                            ${e.available===0?"Tidak Tersedia":"Pesan Sekarang"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join(""))}const v=document.getElementById("loginForm");v&&v.addEventListener("submit",i=>{i.preventDefault(),window.location.href="/home.html"});const b=document.getElementById("logoutBtn");b&&b.addEventListener("click",()=>{window.location.href="/index.html"});document.addEventListener("DOMContentLoaded",()=>{k(),window.openBooking=o=>{const p=f.find(d=>d.id===o);p&&w(p)};const i=document.querySelectorAll(".slide"),e=document.getElementById("prevBtn"),r=document.getElementById("nextBtn");let l=0;function t(o){i.forEach((p,d)=>{p.style.opacity=d===o?"1":"0"})}function a(){l=(l+1)%i.length,t(l)}function s(){l=(l-1+i.length)%i.length,t(l)}e&&r&&i.length>0&&(e.addEventListener("click",s),r.addEventListener("click",a),setInterval(a,5e3)),window.copyPromoCode=o=>{navigator.clipboard.writeText(o).then(()=>{alert(`Kode Voucher ${o} berhasil disalin!`)}).catch(p=>{console.error("Failed to copy: ",p);const d=document.createElement("textarea");d.value=o,document.body.appendChild(d),d.select(),document.execCommand("Copy"),d.remove(),alert(`Kode Voucher ${o} berhasil disalin!`)})};const n=document.getElementById("backToTop");n&&(window.addEventListener("scroll",()=>{window.scrollY>300?n.classList.add("visible"):n.classList.remove("visible")}),n.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}))});export{f as r};
