/*
===============================================================================
🐦 ::: PhoenixFlix - Multi-Purpose Movies & Christian Streaming Platform :::
🔥 with dual database architecture, WebAuthn authentication, and family-friendly streaming experience.
===============================================================================
Author: Ben Tran (https://github.com/PhoenixWeaver)
Email: thephoenixflix@gmail.com
Website: https://bit.ly/thephoenixflix
===============================================================================
*/


import { API } from "../services/API.js";

export class GuestbookAdminPage extends HTMLElement {
    constructor() {
        super();
        this.entries = [];
    }

    async isUserAdmin() {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            return false;
        }
        try {
            const response = await fetch('/api/admin/guestbook', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    showAccessDenied() {
        this.innerHTML = `
            <div class="access-denied-container">
                <div class="access-denied-card">
                    <div class="access-denied-icon">👋</div>
                    <h1 class="access-denied-title">Hi there!</h1>
                    <p class="access-denied-message">
                        Thank you for visiting the admins' page. This is for admins and moderators.
                    </p>
                    <p class="access-denied-submessage">
                        Would you consider about being an admin?<br><br>
                        Send us a private message in the Guestbook or email <strong>thephoenixflix@gmail.com</strong>.
                    </p>
                    <p class="access-denied-footer">
                        Cheers! 🔥
                    </p>
                    <div class="access-denied-actions">
                        <button class="phoenix-btn phoenix-btn-primary" onclick="window.location.href='/guestbook'">
                            <span class="btn-icon">📝</span>
                            Send Private Message
                        </button>
                        <button class="phoenix-btn phoenix-btn-secondary" onclick="window.location.href='/'">
                            <span class="btn-icon">🏠</span>
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    async connectedCallback() {
        const isAdmin = await this.isUserAdmin();
        if (!isAdmin) {
            this.showAccessDenied();
            return;
        }
        
        await this.render();
        await this.loadEntries();
        this.setupEventListeners();
    }

    async render() {
        this.innerHTML = `
            <div class="admin-container">
                <!-- Phoenix Admin Header -->
                <div class="phoenix-admin-header">
                    <span class="phoenix-flame-icon">🔥</span>
                    <h1 class="phoenix-admin-title">Phoenix Guestbook Admin</h1>
                    <p class="phoenix-admin-subtitle">Moderate and manage guestbook entries</p>
                </div>

                <!-- Admin Stats -->
                <div class="admin-stats">
                    <div class="stat-card">
                        <div class="stat-number" id="total-entries">0</div>
                        <div class="stat-label">Total Entries</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" id="approved-entries">0</div>
                        <div class="stat-label">Approved</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" id="pending-entries">0</div>
                        <div class="stat-label">Pending</div>
                    </div>
                </div>

                <!-- Admin Controls -->
                <div class="admin-controls">
                    <button class="phoenix-btn phoenix-btn-primary" id="refresh-btn">
                        <span class="btn-icon">🔄</span>
                        Refresh Entries
                    </button>
                    <button class="phoenix-btn phoenix-btn-secondary" id="export-btn">
                        <span class="btn-icon">📥</span>
                        Export Data
                    </button>
                </div>

                <!-- Entries List -->
                <div class="admin-entries-section">
                    <h2 class="entries-title">All Guestbook Entries</h2>
                    <div class="entries-container" id="admin-entries">
                        <!-- Admin entries will be loaded here -->
                    </div>
                </div>

                <!-- Loading Indicator -->
                <div class="loading-indicator" id="loading" style="display: none;">
                    <div class="phoenix-spinner"></div>
                    <p>Loading entries...</p>
                </div>

                <!-- Success/Error Messages -->
                <div class="message-container" id="message-container"></div>
            </div>
        `;
    }

    async loadEntries() {
        try {
            this.showLoading(true);
            const response = await API.getGuestbookEntriesAdmin();
            if (response.success) {
                this.entries = response.entries;
                this.renderEntries();
                this.updateStats();
                this.showMessage("Entries loaded successfully!", "success");
            } else {
                this.showMessage("Failed to load entries", "error");
            }
        } catch (error) {
            console.error("Error loading entries:", error);
            this.showMessage("Error loading entries: " + error.message, "error");
        } finally {
            this.showLoading(false);
        }
    }

    renderEntries() {
        const container = this.querySelector("#admin-entries");
        
        if (this.entries.length === 0) {
            container.innerHTML = `
                <div class="no-entries">
                    <div class="no-entries-icon">📝</div>
                    <h3>No entries found</h3>
                    <p>No guestbook entries have been submitted yet.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.entries.map(entry => `
            <div class="admin-entry-card ${entry.is_approved ? 'approved' : 'pending'}" data-id="${entry.id}">
                <div class="entry-header">
                    <div class="entry-info">
                        <h3 class="entry-name">${this.escapeHtml(entry.name)}</h3>
                        <p class="entry-email">${this.escapeHtml(entry.email)}</p>
                        <p class="entry-date">${new Date(entry.created_at).toLocaleString()}</p>
                    </div>
                    <div class="entry-status">
                        <span class="status-badge ${entry.is_approved ? 'approved' : 'pending'}">
                            ${entry.is_approved ? '✅ Approved' : '⏳ Pending'}
                        </span>
                        <span class="message-type-badge ${entry.message_type === 'private' ? 'private' : 'public'}">
                            ${entry.message_type === 'private' ? '🔒 Private' : '🌐 Public'}
                        </span>
                    </div>
                </div>
                
                <div class="entry-content">
                    <p class="entry-comment">${this.escapeHtml(entry.comment)}</p>
                </div>
                
                <div class="entry-actions">
                    ${!entry.is_approved ? `
                        <button class="action-btn approve-btn" data-id="${entry.id}">
                            <span class="btn-icon">✅</span>
                            Approve
                        </button>
                    ` : `
                        <button class="action-btn reject-btn" data-id="${entry.id}">
                            <span class="btn-icon">❌</span>
                            Reject
                        </button>
                    `}
                    <button class="action-btn delete-btn" data-id="${entry.id}">
                        <span class="btn-icon">🗑️</span>
                        Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    updateStats() {
        const total = this.entries.length;
        const approved = this.entries.filter(entry => entry.is_approved).length;
        const pending = total - approved;
        const publicMessages = this.entries.filter(entry => entry.message_type === 'public').length;
        const privateMessages = this.entries.filter(entry => entry.message_type === 'private').length;

        this.querySelector("#total-entries").textContent = total;
        this.querySelector("#approved-entries").textContent = approved;
        this.querySelector("#pending-entries").textContent = pending;
        this.querySelector("#total-entries").parentElement.querySelector(".stat-label").textContent = 
            `Total Entries (${publicMessages}🌐 ${privateMessages}🔒)`;
    }

    setupEventListeners() {
        this.querySelector("#refresh-btn").addEventListener("click", () => {
            this.loadEntries();
        });
        this.querySelector("#export-btn").addEventListener("click", () => {
            this.exportData();
        });
        this.addEventListener("click", (e) => {
            if (e.target.closest(".approve-btn")) {
                const id = parseInt(e.target.closest(".approve-btn").dataset.id);
                this.approveEntry(id, true);
            } else if (e.target.closest(".reject-btn")) {
                const id = parseInt(e.target.closest(".reject-btn").dataset.id);
                this.approveEntry(id, false);
            } else if (e.target.closest(".delete-btn")) {
                const id = parseInt(e.target.closest(".delete-btn").dataset.id);
                this.deleteEntry(id);
            }
        });
    }

    async approveEntry(id, approved) {
        try {
            const response = await API.approveGuestbookEntry(id, approved);
            if (response.success) {
                const entry = this.entries.find(e => e.id === id);
                if (entry) {
                    entry.is_approved = approved;
                }
                this.renderEntries();
                this.updateStats();
                const status = approved ? "approved" : "rejected";
                this.showMessage(`Entry ${status} successfully!`, "success");
            } else {
                this.showMessage("Failed to update entry", "error");
            }
        } catch (error) {
            console.error("Error updating entry:", error);
            this.showMessage("Error updating entry: " + error.message, "error");
        }
    }

    async deleteEntry(id) {
        if (!confirm("Are you sure you want to delete this entry? This action cannot be undone.")) {
            return;
        }

        try {
            this.showLoading(true);
            const response = await API.deleteGuestbookEntry(id);
            
            if (response.success) {
                this.entries = this.entries.filter(e => e.id !== id);
                
                this.renderEntries();
                this.updateStats();
                this.showMessage("Entry deleted successfully!", "success");
            } else {
                this.showMessage("Failed to delete entry", "error");
            }
        } catch (error) {
            console.error("Error deleting entry:", error);
            this.showMessage("Error deleting entry: " + error.message, "error");
        } finally {
            this.showLoading(false);
        }
    }

    exportData() {
        const dataStr = JSON.stringify(this.entries, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `guestbook_export_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.showMessage("Data exported successfully!", "success");
    }

    showLoading(show) {
        const loading = this.querySelector("#loading");
        loading.style.display = show ? "block" : "none";
    }

    showMessage(message, type) {
        const container = this.querySelector("#message-container");
        const messageEl = document.createElement("div");
        messageEl.className = `message message-${type}`;
        messageEl.textContent = message;
        
        container.appendChild(messageEl);
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 5000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
customElements.define('guestbook-admin-page', GuestbookAdminPage);
