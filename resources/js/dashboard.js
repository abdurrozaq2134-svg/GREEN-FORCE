/*
 * Dashboard "Sistem Komando" — Interaksi UI
 * Dimuat via Vite: resources/js/dashboard.js
 */
(function () {
    'use strict';

    /* ============================================================
       1. Jam real-time di sidebar (TERMINAL STATUS)
       ============================================================ */
    const clock = document.getElementById('live-clock');
    if (clock) {
        const tick = () => {
            const now = new Date();
            const pad = (n) => String(n).padStart(2, '0');
            clock.textContent =
                pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
        };
        tick();
        setInterval(tick, 1000);
    }

    /* ============================================================
       2. Log diagnostik — data ASLI dari /api/activity-log
          (fallback ke contoh statis kalau API gagal/kosong)
       ============================================================ */
    const logList = document.getElementById('log-list');
    const FALLBACK_LOGS = [
        { time: '10:42', text: 'Sistem sinkronisasi selesai.', status: 'SUKSES' },
        { time: '10:15', text: 'Backup harian berhasil dibuat.', status: 'NORMAL' },
        { time: '09:58', text: 'Anomali trafik kecil terdeteksi.', status: 'PERHATIAN' },
    ];

    function renderLog(log, index) {
        const li = document.createElement('li');
        li.className = 'log-item';
        li.style.animationDelay = (index * 80) + 'ms';
        li.innerHTML =
            '<span class="log-item__time">[' + log.time + ']</span>' +
            '<span class="log-item__message"></span>' +
            '<span class="log-item__status" data-status="' + log.status + '">' + log.status + '</span>';
        // textContent untuk pesan → aman dari XSS
        li.querySelector('.log-item__message').textContent = log.text;
        return li;
    }

    function renderLogs(logs) {
        if (!logList) return;
        logList.innerHTML = '';
        logs.forEach((log, i) => logList.appendChild(renderLog(log, i)));
    }

    async function fetchActivityLog() {
        if (!logList) return;

        try {
            const res = await fetch('/api/activity-log', {
                headers: { 'Accept': 'application/json' },
                credentials: 'same-origin',
            });
            if (!res.ok) throw new Error('HTTP ' + res.status);

            const data = await res.json();
            const logs = (data.logs || []).slice(0, 15);
            renderLogs(logs.length ? logs : FALLBACK_LOGS);
        } catch {
            // API belum ada / gagal → tampilkan contoh agar panel tidak kosong
            if (!logList.children.length) renderLogs(FALLBACK_LOGS);
        }
    }

    if (logList) {
        fetchActivityLog();
        setInterval(fetchActivityLog, 30000); // refresh tiap 30 detik
    }

    /* ============================================================
       3. Tab Pengaturan (client-side switch via .is-active)
       ============================================================ */
    const settingsNav = document.querySelectorAll('[data-settings-tab]');
    if (settingsNav.length) {
        const panels = document.querySelectorAll('[data-settings-panel]');

        const activate = (name) => {
            settingsNav.forEach((btn) => {
                btn.classList.toggle('is-active', btn.dataset.settingsTab === name);
            });
            panels.forEach((panel) => {
                panel.classList.toggle('is-active', panel.dataset.settingsPanel === name);
            });
        };

        settingsNav.forEach((btn) => {
            btn.addEventListener('click', () => activate(btn.dataset.settingsTab));
        });

        // Deep-link: /pengaturan?tab=keamanan
        const initial = new URLSearchParams(location.search).get('tab');
        if (initial) activate(initial);
    }

    /* ============================================================
       4. Filter & pencarian tabel Event Saya (client-side)
       ============================================================ */
    const searchInput = document.getElementById('event-search');
    const statusSelect = document.getElementById('event-status-filter');
    const eventRows = document.querySelectorAll('[data-event-row]');
    const emptyFiltered = document.getElementById('event-filter-empty');

    function applyEventFilters() {
        if (!eventRows.length) return;
        const q = (searchInput && searchInput.value || '').toLowerCase().trim();
        const status = (statusSelect && statusSelect.value) || 'all';
        let visibleCount = 0;

        eventRows.forEach((row) => {
            const name = (row.dataset.eventName || '').toLowerCase();
            const rowStatus = row.dataset.eventStatus || 'draft';
            const matchSearch = !q || name.includes(q);
            const matchStatus = status === 'all' || rowStatus === status;
            const show = matchSearch && matchStatus;
            row.style.display = show ? '' : 'none';
            if (show) visibleCount++;
        });

        if (emptyFiltered) {
            emptyFiltered.hidden = visibleCount !== 0;
        }

        // Baris yang disembunyikan filter ikut dilepas centangnya supaya user
        // tidak pernah menghapus event yang tidak kelihatan di layar.
        eventRows.forEach((row) => {
            if (row.style.display === 'none') {
                const cb = row.querySelector('[data-event-checkbox]');
                if (cb) cb.checked = false;
            }
        });
        syncBulkBar();
    }

    if (searchInput) searchInput.addEventListener('input', applyEventFilters);
    if (statusSelect) statusSelect.addEventListener('change', applyEventFilters);

    /* ============================================================
       4b. Pilih semua + hapus massal event
       ============================================================ */
    const selectAll = document.getElementById('select-all-events');
    const bulkBar = document.getElementById('bulk-bar');
    const bulkCount = document.getElementById('bulk-count');
    const bulkClear = document.getElementById('bulk-clear');
    const bulkForm = document.getElementById('bulk-delete-form');

    function visibleCheckboxes() {
        return Array.from(eventRows)
            .filter((row) => row.style.display !== 'none')
            .map((row) => row.querySelector('[data-event-checkbox]'))
            .filter(Boolean);
    }

    function syncBulkBar() {
        if (!bulkBar) return;

        const boxes = visibleCheckboxes();
        const checked = boxes.filter((cb) => cb.checked);

        bulkBar.hidden = checked.length === 0;
        if (bulkCount) bulkCount.textContent = String(checked.length);

        if (selectAll) {
            selectAll.checked = boxes.length > 0 && checked.length === boxes.length;
            selectAll.indeterminate = checked.length > 0 && checked.length < boxes.length;
        }
    }

    if (selectAll) {
        selectAll.addEventListener('change', () => {
            visibleCheckboxes().forEach((cb) => {
                cb.checked = selectAll.checked;
            });
            syncBulkBar();
        });
    }

    eventRows.forEach((row) => {
        const cb = row.querySelector('[data-event-checkbox]');
        if (cb) cb.addEventListener('change', syncBulkBar);
    });

    if (bulkClear) {
        bulkClear.addEventListener('click', () => {
            eventRows.forEach((row) => {
                const cb = row.querySelector('[data-event-checkbox]');
                if (cb) cb.checked = false;
            });
            syncBulkBar();
        });
    }

    if (bulkForm) {
        bulkForm.addEventListener('submit', (e) => {
            const total = visibleCheckboxes().filter((cb) => cb.checked).length;
            if (total === 0) {
                e.preventDefault();
                return;
            }
            const msg = 'Hapus ' + total + ' event terpilih? Tindakan ini tidak bisa dibatalkan.';
            if (!window.confirm(msg)) {
                e.preventDefault();
            }
        });
    }

    syncBulkBar();

    /* ============================================================
       5. Konfirmasi hapus event (delegasi)
       ============================================================ */
    document.querySelectorAll('[data-confirm]').forEach((el) => {
        el.addEventListener('click', (e) => {
            const msg = el.dataset.confirm || 'Yakin?';
            if (!window.confirm(msg)) {
                e.preventDefault();
            }
        });
    });

    /* ============================================================
       6. Foto profil upload (Preview + Sync ke Sidebar + Upload)
       ============================================================ */
    const photoInput = document.getElementById('photo-input');
    const btnChangePhoto = document.getElementById('btn-change-photo');
    const profileAvatar = document.getElementById('profile-avatar');
    const photoError = document.getElementById('photo-error');
    const profileForm = document.getElementById('profile-form');
    const btnSaveProfile = document.getElementById('btn-save-profile');

    let selectedPhotoBlob = null;
    let selectedPhotoUrl = null;
    let userInitial = '';

    // Get sidebar avatar for sync
    const sidebarAvatar = document.querySelector('.sidebar__avatar');

    if (profileAvatar) {
        const initialEl = profileAvatar.textContent.trim();
        if (initialEl) userInitial = initialEl.charAt(0).toUpperCase();
    }

    function setAvatar(avatarEl, src, initial) {
        if (!avatarEl) return;
        if (src) {
            // If it's an img element already, just update src
            const existingImg = avatarEl.querySelector('img');
            if (existingImg) {
                existingImg.src = src;
            } else {
                avatarEl.innerHTML = '<img src="' + src + '" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">';
            }
        } else {
            avatarEl.innerHTML = initial || userInitial || '?';
        }
    }

    function showError(msg) {
        if (photoError) {
            photoError.textContent = msg;
            photoError.style.display = 'block';
        }
    }

    function clearError() {
        if (photoError) {
            photoError.textContent = '';
            photoError.style.display = 'none';
        }
    }

    function validateFile(file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            return 'Format tidak didukung. Gunakan JPG, PNG, atau WebP.';
        }
        if (file.size > 2 * 1024 * 1024) {
            return 'Ukuran file maksimal 2 MB.';
        }
        return null;
    }

    if (btnChangePhoto && photoInput) {
        btnChangePhoto.addEventListener('click', () => {
            clearError();
            photoInput.click();
        });

        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const err = validateFile(file);
            if (err) {
                showError(err);
                photoInput.value = '';
                return;
            }

            clearError();
            selectedPhotoBlob = file;
            selectedPhotoUrl = URL.createObjectURL(file);

            // Preview di profil card
            setAvatar(profileAvatar, selectedPhotoUrl, null);
            // Sync ke sidebar
            setAvatar(sidebarAvatar, selectedPhotoUrl, null);
        });
    }

    async function uploadPhoto(blob) {
        const formData = new FormData();
        formData.append('profile_photo', blob);

        const res = await fetch('/api/profile/photo', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
            },
            body: formData,
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Upload gagal');

        return data.photo_url || null;
    }

    if (profileForm) {
        profileForm.addEventListener('submit', async (e) => {
            if (!selectedPhotoBlob) return; // No photo selected, let form submit normally

            e.preventDefault();

            const originalText = btnSaveProfile?.textContent;
            if (btnSaveProfile) {
                btnSaveProfile.disabled = true;
                btnSaveProfile.textContent = 'Mengupload...';
            }

            try {
                const photoUrl = await uploadPhoto(selectedPhotoBlob);

                // Update avatars with the permanent URL from server
                if (photoUrl) {
                    setAvatar(profileAvatar, photoUrl, null);
                    setAvatar(sidebarAvatar, photoUrl, null);
                    // Store in sessionStorage for persistence across page loads
                    sessionStorage.setItem('user_photo_url', photoUrl);
                }

                showToast('Foto profil diperbarui', 'success');

                selectedPhotoBlob = null;
                selectedPhotoUrl = null;
            } catch (err) {
                showToast(err.message, 'error');
            } finally {
                if (btnSaveProfile) {
                    btnSaveProfile.disabled = false;
                    btnSaveProfile.textContent = originalText || 'Simpan perubahan';
                }
            }

            // Submit the actual form for other fields
            profileForm.submit();
        });
    }

    // Restore photo from sessionStorage on page load
    const storedPhotoUrl = sessionStorage.getItem('user_photo_url');
    if (storedPhotoUrl && profileAvatar && sidebarAvatar) {
        setAvatar(profileAvatar, storedPhotoUrl, null);
        setAvatar(sidebarAvatar, storedPhotoUrl, null);
    }

    /* ============================================================
       7. Toast notification system
       ============================================================ */
    function showToast(message, type = 'info') {
        const stack = document.getElementById('toast-stack');
        if (!stack) return;

        const toast = document.createElement('div');
        toast.className = 'toast toast--' + type;
        toast.innerHTML =
            '<span class="toast__dot"></span>' +
            '<span>' + message + '</span>';
        stack.appendChild(toast);

        // Auto remove after 4 seconds
        setTimeout(() => {
            toast.classList.add('is-leaving');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // Expose for global use
    window.showToast = showToast;

})();