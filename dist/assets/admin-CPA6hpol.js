import{r as s}from"./main-DGgntltV.js";const i=[{id:"#BK001",guest:"Budi Santoso",room:"Deluxe Garden View",checkIn:"15 Nov",checkOut:"17 Nov",total:2e6,status:"Terkonfirmasi"},{id:"#BK002",guest:"Siti Aminah",room:"Premium Villa",checkIn:"20 Nov",checkOut:"23 Nov",total:6e6,status:"Pending"},{id:"#BK003",guest:"John Doe",room:"Standard Room",checkIn:"01 Des",checkOut:"05 Des",total:1e6,status:"Terkonfirmasi"}];function n(){const e=document.getElementById("adminContent");e.innerHTML=`
        <div class="flex justify-between items-center mb-6">
            <h2 style="font-size: 24px;">Manajemen Pemesanan</h2>
        </div>
        
        <div class="dashboard-card">
            <input type="text" placeholder="Cari berdasarkan ID, nama tamu, atau nama kamar..." class="form-control" style="margin-bottom: 20px; background: #f9fafb;">
            
            <table>
                <thead>
                    <tr>
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
                    ${i.map(t=>`
                        <tr>
                            <td style="color: var(--text-light);">${t.id}</td>
                            <td class="flex items-center gap-2">
                                <div style="width: 24px; height: 24px; background: #f3f4f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px;">👤</div>
                                ${t.guest}
                            </td>
                            <td>${t.room}</td>
                            <td>${t.checkIn}</td>
                            <td>${t.checkOut}</td>
                            <td style="color: var(--primary); font-weight: bold;">Rp ${t.total.toLocaleString("id-ID")}</td>
                            <td>
                                <span class="status-badge ${t.status==="Terkonfirmasi"?"status-success":"status-warning"}">
                                    ${t.status}
                                </span>
                            </td>
                            <td>
                                <div class="flex gap-2">
                                    <button class="btn btn-outline" style="padding: 4px 8px; border-color: #e5e7eb; color: var(--text-light);">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    </button>
                                    ${t.status==="Pending"?`
                                        <button class="btn btn-primary" style="padding: 4px 8px; background: #10b981;" onclick="window.approveBooking('${t.id}')">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </button>
                                        <button class="btn btn-primary" style="padding: 4px 8px; background: #ef4444;">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </button>
                                    `:""}
                                </div>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `}function o(){const e=document.getElementById("adminContent");e.innerHTML=`
        <div class="flex justify-between items-center mb-6">
            <h2 style="font-size: 24px;">Manajemen Kamar</h2>
            <button class="btn btn-primary flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Tambah Kamar
            </button>
        </div>

        <div class="dashboard-card" style="margin-bottom: 30px;">
            <input type="text" placeholder="Cari berdasarkan nama kamar atau kapasitas..." class="form-control" style="background: #f9fafb;">
        </div>

        <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
            ${s.map(t=>`
                <div class="dashboard-card" style="padding: 20px;">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 style="font-size: 18px; margin-bottom: 5px;">${t.name}</h3>
                            <span class="status-badge ${t.available>0?"status-success":"status-danger"}">
                                ${t.available>0?"Tersedia":"Penuh"}
                            </span>
                        </div>
                        <button class="btn btn-outline" style="padding: 8px; border-color: #e5e7eb; color: var(--text-light);">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                    </div>
                    
                    <div class="flex items-center gap-2 mb-2 text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        ${t.capacity}
                    </div>
                    <div class="flex items-center gap-2 mb-4 text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22h20"></path><path d="M20 22V7l-8-5-8 5v15"></path><path d="M12 16.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path></svg>
                        ${t.available} / 5 kamar tersedia
                    </div>
                    
                    <div style="font-weight: bold; color: var(--primary); margin-bottom: 15px;">
                        Rp ${t.price.toLocaleString("id-ID")} <span style="font-weight: normal; color: var(--text-light); font-size: 12px;">/ malam</span>
                    </div>

                    <div style="width: 100%; background: #f3f4f6; height: 6px; border-radius: 3px; overflow: hidden;">
                        <div style="width: ${t.available/5*100}%; background: var(--primary); height: 100%;"></div>
                    </div>
                    <div class="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Tingkat Ketersediaan</span>
                        <span>${t.available/5*100}%</span>
                    </div>
                </div>
            `).join("")}
        </div>
    `}document.querySelectorAll(".nav-tab").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".nav-tab").forEach(a=>a.classList.remove("active")),e.classList.add("active");const t=e.dataset.tab;t==="pemesanan"?n():t==="kamar"?o():document.getElementById("adminContent").innerHTML='<div class="text-center p-10">Fitur belum tersedia</div>'})});window.approveBooking=e=>{const t=i.find(a=>a.id===e);t&&(t.status="Terkonfirmasi",n())};n();
