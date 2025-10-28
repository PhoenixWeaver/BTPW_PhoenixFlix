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

export class GuestbookPage extends HTMLElement {

    async render() {
        this.innerHTML = `
            <div class="guestbook-container">
                <!-- Phoenix Flame Header -->
                <div class="phoenix-header">
                    <div class="phoenix-flame-icon">
                        <img src="/images/PhoenixFlix.jpeg" alt="PhoenixFlix Logo" class="phoenix-logo">
                    </div>
                    <h1 class="phoenix-title"><span class="phoenix-text">Phoenix</span><span class="flix-text">Flix</span> Guestbook</h1>
                    <p class="phoenix-subtitle">Share your thoughts and be part of our community</p>
                </div>

                <!-- Phoenix AIvengers Letter Section -->
                <div class="guestbook-phoenix-letter-section">
                    <div class="guestbook-phoenix-letter-container">
                        <div class="mail-letter">
                            <!-- Letter Header -->
                            <div class="letter-header">
                                <div class="letter-date">
                                    <span class="date-text">October 2025</span>
                                </div>
                                <div class="letter-stamp">
                                    <div class="stamp-design">
                                        <img src="/images/PhoenixFlix.jpeg" alt="PhoenixFlix Logo" class="stamp-logo">
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Letter Content -->
                            <div class="letter-content">
                                <div class="letter-greeting">
                                    <h3>Welcome to the <span class="phoenix-text">Phoenix</span><span class="flix-text">Flix</span> aka Netflix yet not chill.</h3>
                                </div>
                                
                                <div class="letter-body">
                                    <p>
                                        Throughout history, the world has been flooded with content. We all may think that instead of randomly browsing the internet, we would want a unique space: a curated collection of movies, videos, hymns, and more, all filtered by specific styles and tastes.
                                    </p>
                                    
                                    <p>
                                        We, the Phoenix AIvengers, set out to collect, filter, censor, and sort this content. You wouldn't believe the effort it took—for example, figuring out that a film like "Young Cousin" was shady while "Chitty Chitty Bang Bang" was perfectly fine! We had intense debates about horror and "flirty" movies, but for this initial launch, we decided to stick to an introduction with trailers to give everyone the freedom of personal choice.
                                    </p>
                                    
                                    <p>
                                        We are mindful that religious content often involves copyright, so while it may be great for personal bookmarks, notebooks, or collections, we must ensure we are compliant.
                                    </p>
                                    
                                    <p>
                                        Currently, our database holds thousands of collections, thanks to my diligent "AIvengers" who've been working non-stop! I believe this database can be useful for movie collections, reviews, cast and crew details, analysis, and fan discussions. Furthermore, I hope it can serve as a helpful tool for learning and understanding diverse languages and cultures more openly, perhaps including hymns and songs (and maybe even some sports and clubs in the future!).
                                    </p>
                                    
                                    <p>
                                        We can easily fetch and add more videos to the database later, so please let us know if there are any particular topics, sections, or videos you'd like to see!
                                    </p>
                                </div>
                                
                                <div class="letter-signature">
                                    <div class="signature-content">
                                        <p class="signature-text">oxoxoxo,</p>
                                        <p class="signature-name">the Phoenix AIvengers</p>
                                    </div>
                                </div>
                                
                                <div class="letter-postscript">
                                    <p class="ps-text">
                                        <strong>P.s:</strong> Who are the Phoenix AIvengers? The Phoenix - Sir. GPT - Miss. Sonnet - Mr. Gemini.<br>
                                        Which planets belong to? Not earth ...
                                    </p>
                                </div>
                            </div>
                            
                            <!-- Letter Footer -->
                            <div class="letter-footer">
                                <div class="letter-seal">
                                    <div class="seal-design">
                                        <img src="/images/PhoenixFlix.jpeg" alt="PhoenixFlix Logo" class="seal-logo">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Guestbook Form -->
                <div class="guestbook-form-section">
                    <div class="form-container">
                        <h2 class="form-title">Leave Your Message</h2>
                        <form id="guestbook-form" class="phoenix-form">
                            <div class="form-group">
                                <label for="guest-name" class="phoenix-label">Name</label>
                                <input type="text" id="guest-name" name="name" class="phoenix-input" required 
                                       placeholder="Enter your name (visible)">
                            </div>
                            
                            <div class="form-group">
                                <label for="guest-email" class="phoenix-label">Email</label>
                                <input type="email" id="guest-email" name="email" class="phoenix-input" required 
                                       placeholder="Enter your email (invisible)">
                            </div>
                            
                            <!-- Message Type Selection -->
                            <div class="form-group">
                                <label class="phoenix-label">🔥 Message Type:</label>
                                <div class="message-type-container">
                                    <div class="message-type-option" data-type="public">
                                        <div class="option-icon">🌐</div>
                                        <div class="option-content">
                                            <div class="option-title">Public Comment</div>
                                            <div class="option-subtitle">Visible to everyone after approval</div>
                                        </div>
                                    </div>
                                    <div class="message-type-option" data-type="private">
                                        <div class="option-icon">🔒</div>
                                        <div class="option-content">
                                            <div class="option-title">Private Message</div>
                                            <div class="option-subtitle">Private love hate letters to me only ✉️</div>
                                        </div>
                                    </div>
                                </div>
                                <input type="hidden" id="message-type" name="message_type" value="public">
                            </div>
                            
                            <div class="form-group">
                                <label for="guest-comment" class="phoenix-label">Your Message</label>
                                <textarea id="guest-comment" name="comment" class="phoenix-textarea" required 
                                          placeholder="Share your thoughts, feedback, or just say hello!"></textarea>
                            </div>
                            
                            <button type="submit" class="phoenix-submit-btn">
                                <span class="btn-text">Send Message</span>
                                <span class="btn-flame">🔥</span>
                            </button>
                        </form>
                    </div>
                </div>

                <!-- Guestbook Entries -->
                <div class="guestbook-entries-section">
                    <h2 class="entries-title">Community Messages</h2>
                    <div id="guestbook-entries" class="entries-container">
                        <div class="loading-flame">🔥</div>
                        <p class="loading-text">Loading messages...</p>
                    </div>
                </div>
            </div>
        `;
        this.setupEventListeners();
        await this.loadGuestbookEntries();
    }

    setupEventListeners() {
        const form = this.querySelector('#guestbook-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
        this.setupMessageTypeSelection();
        const inputs = this.querySelectorAll('.phoenix-input, .phoenix-textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => this.addInputFocus(input));
            input.addEventListener('blur', () => this.removeInputFocus(input));
        });
    }

    setupMessageTypeSelection() {
        const messageTypeOptions = this.querySelectorAll('.message-type-option');
        const hiddenInput = this.querySelector('#message-type');
        this.selectMessageType('public');
        
        messageTypeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const type = option.dataset.type;
                this.selectMessageType(type);
            });
            option.addEventListener('mouseenter', () => {
                if (!option.classList.contains('selected')) {
                    option.classList.add('hover');
                }
            });
            
            option.addEventListener('mouseleave', () => {
                option.classList.remove('hover');
            });
        });
    }
    selectMessageType(type) {
        const messageTypeOptions = this.querySelectorAll('.message-type-option');
        const hiddenInput = this.querySelector('#message-type');
        messageTypeOptions.forEach(option => {
            option.classList.remove('selected', 'hover');
        });
        const selectedOption = this.querySelector(`[data-type="${type}"]`);
        selectedOption.classList.add('selected');
        hiddenInput.value = type;
        
        console.log(`🔥 Message type selected: ${type}`);
    }

    async handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const entryData = {
            name: formData.get('name').trim(),
            email: formData.get('email').trim(),
            comment: formData.get('comment').trim(),
            message_type: formData.get('message_type') || 'public'
        };
        const submitBtn = form.querySelector('.phoenix-submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="btn-text">Sending...</span><span class="btn-flame">🔥</span>';
        submitBtn.disabled = true;

        try { //NOTE - added try catch
            const response = await fetch('/api/guestbook/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entryData)
            });
            if (response.ok) {
                this.showSuccessMessage();
                form.reset();
                await this.loadGuestbookEntries();
            } else {
                const errorData = await response.json();
                this.showErrorMessage(errorData.message || 'Failed to submit message');
            }
        } catch (error) {
            console.error('Error submitting guestbook entry:', error);
            this.showErrorMessage('Network error. Please try again.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    async loadGuestbookEntries() {
        const entriesContainer = this.querySelector('#guestbook-entries');
        
        try {
            const entries = await API.getGuestbookEntries();
            this.renderEntries(entries);
        } catch (error) {
            console.error('Error loading guestbook entries:', error);
            entriesContainer.innerHTML = `
                <div class="error-message">
                    <div class="error-flame">🔥</div>
                    <p>Failed to load messages. Please try again later.</p>
                </div>
            `;
        }
    }

    renderEntries(entries) {
        const entriesContainer = this.querySelector('#guestbook-entries');
        
        if (entries.length === 0) {
            entriesContainer.innerHTML = `
                <div class="no-entries">
                    <div class="no-entries-flame">🔥</div>
                    <p>No messages yet. Be the first to share your thoughts!</p>
                </div>
            `;
            return;
        }

        entriesContainer.innerHTML = entries.map(entry => `
            <div class="guestbook-entry phoenix-entry">
                <div class="entry-header">
                    <div class="entry-author">
                        <div class="author-avatar">${this.getInitials(entry.name)}</div>
                        <div class="author-info">
                            <h3 class="author-name">${this.escapeHtml(entry.name)}</h3>
                            <p class="entry-date">${this.formatDate(entry.created_at)}</p>
                        </div>
                    </div>
                    <div class="entry-flame">🔥</div>
                </div>
                <div class="entry-content">
                    <p class="entry-message">${this.escapeHtml(entry.comment)}</p>
                </div>
            </div>
        `).join('');
    }

    addInputFocus(input) {
        input.classList.add('phoenix-focused');
    }

    removeInputFocus(input) {
        input.classList.remove('phoenix-focused');
    }

    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message phoenix-message';
        message.innerHTML = `
            <div class="message-flame">🔥</div>
            <p>Message sent successfully! Thank you for sharing.</p>
        `;
        
        this.querySelector('.guestbook-form-section').appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    showErrorMessage(errorText) {
        const message = document.createElement('div');
        message.className = 'error-message phoenix-message';
        message.innerHTML = `
            <div class="message-flame">🔥</div>
            <p>${this.escapeHtml(errorText)}</p>
        `;
        
        this.querySelector('.guestbook-form-section').appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 5000);
    }

    getInitials(name) {
        return name.split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('')
            .substring(0, 2);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    connectedCallback() {
        this.render();
    }
}
customElements.define('guestbook-page', GuestbookPage);

