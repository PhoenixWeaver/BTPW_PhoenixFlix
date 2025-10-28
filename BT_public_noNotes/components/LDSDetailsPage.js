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


import { API } from '../services/API.js';
import { EnhancedYouTubeEmbed } from './EnhancedYouTubeEmbed.js';

export class LDSDetailsPage extends HTMLElement {
    constructor() {
        super();
        this.contentId = null;
        this.content = null;
    }

    async connectedCallback() {

        this.contentId = this.params ? this.params[0] : null;
        console.log(`LDS Detail Page connected for content ID: ${this.contentId}`);
        window.ldsDetailsPage = this;
        
        this.innerHTML = this.render();
        await this.loadContentDetail();
        this.setupEventListeners();
        console.log('🔄 About to call updateCollectionButtons() for LDS ID:', this.contentId);
        await this.updateCollectionButtons();
    }

    disconnectedCallback() {
       
        console.log("LDS Detail Page disconnected");
        this.removeEventListeners();
    }

    async updateCollectionButtons() {
        try {
            console.log(`🔄 updateCollectionButtons() called for LDS ID: ${this.contentId}`);
            const favBtn = document.getElementById('btnLDSFavorite');
            const wlBtn  = document.getElementById('btnLDSWatchlist');

            const setFav = (isIn) => {
                if (!favBtn) return;
                if (isIn) {
                    favBtn.textContent = 'Remove from Favorites';
                    favBtn.classList.add('danger');
                    favBtn.onclick = async () => {
                        await app.removeFromCollectionLDS(this.contentId, 'favorite');
                        await this.updateCollectionButtons();
                    };
                } else {
                    favBtn.textContent = 'Add to Favorites';
                    favBtn.classList.remove('danger');
                    favBtn.onclick = async () => {
                        await this.addToFavorites();
                        await this.updateCollectionButtons();
                    };
                }
            };
            const setWl = (isIn) => {
                if (!wlBtn) return;
                if (isIn) {
                    wlBtn.textContent = 'Remove from Watchlist';
                    wlBtn.classList.add('danger');
                    wlBtn.onclick = async () => {
                        await app.removeFromCollectionLDS(this.contentId, 'watchlist');
                        await this.updateCollectionButtons();
                    };
                } else {
                    wlBtn.textContent = 'Add to Watchlist';
                    wlBtn.classList.remove('danger');
                    wlBtn.onclick = async () => {
                        await this.addToWatchlist();
                        await this.updateCollectionButtons();
                    };
                }
            };
            console.log('📡 Calling API.getLDSFavorites() and API.getLDSWatchlist()...');
            console.log('🔐 JWT token check:', localStorage.getItem('jwt') ? 'Present' : 'Missing');
            const fetchWithRetry = async (apiCall, maxRetries = 3) => {
                for (let i = 0; i < maxRetries; i++) {
                    try {
                        const result = await apiCall();
                        return result;
                    } catch (error) {
                        console.warn(`⚠️ API call failed (attempt ${i + 1}/${maxRetries}):`, error);
                        if (i === maxRetries - 1) throw error;
                        await new Promise(resolve => setTimeout(resolve, 50 * (i + 1)));
                    }
                }
            };
            const favIdsRaw = await fetchWithRetry(() => API.getLDSFavorites()).catch((err) => {
                console.error('❌ API.getLDSFavorites() failed after retries:', err);
                return [];
            });
            
            const wlIdsRaw = await fetchWithRetry(() => API.getLDSWatchlist()).catch((err) => {
                console.error('❌ API.getLDSWatchlist() failed after retries:', err);
                return [];
            });

            console.log('📡 API responses received:');
            console.log('Favorites raw:', favIdsRaw);
            console.log('Watchlist raw:', wlIdsRaw);
            const safeFavIds = favIdsRaw || [];
            const safeWlIds = wlIdsRaw || [];
            const toIdStrings = (arr) => (Array.isArray(arr) ? arr : [])
                .map((item) => {
                    if (item && typeof item === 'object') {
                        return item.id != null ? String(item.id) : String(item.lds_id ?? '');
                    }
                    return String(item);
                })
                .filter((s) => s !== '');

            const favIds = new Set(toIdStrings(safeFavIds));
            const wlIds  = new Set(toIdStrings(safeWlIds));
            const currentIdStr = String(this.contentId);

            console.log('📡 Final state:');
            console.log('Current ID:', currentIdStr);
            console.log('Favorites Set:', Array.from(favIds));
            console.log('Watchlist Set:', Array.from(wlIds));
            console.log('Is in Favorites:', favIds.has(currentIdStr));
            console.log('Is in Watchlist:', wlIds.has(currentIdStr));

            setFav(favIds.has(currentIdStr));
            setWl(wlIds.has(currentIdStr));
        } catch (e) {
            console.warn('Could not reflect LDS collection state', e);
        }
    }

    async loadContentDetail() {

        try {
            console.log(`Loading LDS content detail for ID: ${this.contentId}`);
            this.content = await API.getLDSContentById(this.contentId);
            console.log("LDS content loaded:", this.content);
            console.log("YouTube ID:", this.content.youtube_id);
            console.log("YouTube URL:", this.content.youtube_url);
            
            this.renderContentDetail();
            
            console.log("LDS content detail loaded successfully");
        } catch (error) {
            console.error("Error loading LDS content detail:", error);
            this.showError("Failed to load content details. Please try again.");
        }
    }

    renderContentDetail() {

        if (!this.content) {
            console.warn("No content data to render");
            return;
        }
        this.updateElement('lds-title', this.content.title);
        this.updateElement('lds-speaker', this.content.speaker || 'Unknown Speaker');
        this.updateElement('lds-spiritual-rating', this.createStarRating(this.content.spiritual_rating || 5), true); // 5 is the max rating
        this.updateElement('lds-description-text', this.content.description || 'No description available');
        const randnviews = Math.floor(Math.random() * (Math.floor(1000)- Math.ceil(100)+ 1)) + Math.ceil(100);
        const randnlikes =  Math.floor(Math.random() * (Math.floor(100)- Math.ceil(10)+ 1)) + Math.ceil(10);
        const randnmin =  Math.floor(Math.random() * (Math.floor(10)- Math.ceil(1)+ 1)) + Math.ceil(1);
        this.updateElement('lds-views', this.content.views || randnviews);
        this.updateElement('lds-likes', this.content.likes || randnlikes);
        this.updateElement('lds-duration', `${this.content.duration_minutes || randnmin} ꧁♡︎꧂`);
        this.updateElement('lds-video-title', this.content.title);
        this.updateElement('lds-speaker-name', this.content.speaker || 'Unknown Speaker');
        this.updateElement('lds-conference-session', this.content.conference_session || '');
        this.handleCategories();
        this.handleScriptureReference();
        this.handleYouTubeEmbed();
        this.handleThumbnail();
        this.handleDisclaimer();
    }

    updateElement(id, content, isHtml = false) {
    
        const element = document.getElementById(id);
        if (element) {
            if (isHtml) {
                element.innerHTML = content;
            } else {
            element.textContent = content;
            }
        } else {
            console.warn(`Element with ID ${id} not found`);
        }
    }

    createStarRating(rating) {
        const maxRating = 5;
        const currentRating = Math.min(rating || 5, maxRating); // Default to 5 stars
        
        let starsHtml = '';
        for (let i = 1; i <= maxRating; i++) {
            const isFilled = i <= currentRating;
            const starClass = isFilled ? 'star-filled' : 'star-empty';
            const starSymbol = isFilled ? '★' : '☆';
            starsHtml += `<span class="rating-star ${starClass}" data-rating="${i}" onclick="window.ldsDetailsPage.rateVideo(${i})">${starSymbol}</span>`;
        }
        
        return starsHtml;
    }

    handleScriptureReference() {
        const scriptureSection = document.getElementById('lds-scripture-section');
        const scriptureReference = document.getElementById('lds-scripture-reference');
        const scriptureButton = document.getElementById('btnLDSScripture');
        
        if (this.content.scripture_reference) {
            if (scriptureSection) scriptureSection.style.display = 'block';
            if (scriptureReference) scriptureReference.textContent = this.content.scripture_reference;
            if (scriptureButton) scriptureButton.style.display = 'inline-block';
        } else {
            if (scriptureSection) scriptureSection.style.display = 'none';
            if (scriptureButton) scriptureButton.style.display = 'none';
        }
    }

    handleYouTubeEmbed() {
        const youtubeEmbed = document.getElementById('lds-youtube-embed');
        if (!youtubeEmbed) {
            console.warn("Enhanced YouTube embed component not found");
            return;
        }
        console.log("YouTube data:", {
            youtube_id: this.content.youtube_id,
            youtube_url: this.content.youtube_url
        });
        let hasVideo = false;
        let youtubeUrl = '';
        
        if (this.content.youtube_url) {
            youtubeUrl = this.content.youtube_url;
            hasVideo = true;
            console.log("Using YouTube URL:", youtubeUrl);
        } else if (this.content.youtube_id) {
            youtubeUrl = `https://www.youtube.com/watch?v=${this.content.youtube_id}`;
            hasVideo = true;
            console.log("Using YouTube ID to create URL:", youtubeUrl);
        } else {
            console.log("No YouTube video data found for this content");
        }
        if (hasVideo && youtubeUrl) {
            youtubeEmbed.setAttribute('data-url', youtubeUrl);
            console.log("Set YouTube URL on enhanced embed component:", youtubeUrl);
        } else {
            youtubeEmbed.setAttribute('data-url', '');
            console.log("No video URL, letting EnhancedYouTubeEmbed handle auto-search");
        }
        const videoSection = document.querySelector('.lds-video-section');
        if (videoSection) {
            if (!hasVideo) {
                console.log("Hiding video section - no video data");
                videoSection.style.display = 'none';
            } else {
                console.log("Showing video section");
                videoSection.style.display = 'block';
            }
        }
    }

    handleCategories() {
        const categoriesList = document.getElementById('lds-categories');
        if (!categoriesList) return;

        categoriesList.innerHTML = ''; // Clear existing content
        if (this.content.category) {
            const li = document.createElement('li');
            li.textContent = this.content.category;
            categoriesList.appendChild(li);
        }
        if (this.content.content_type) {
            const li = document.createElement('li');
            li.textContent = this.content.content_type;
            categoriesList.appendChild(li);
        }
        if (this.content.religion) {
            const li = document.createElement('li');
            li.textContent = this.content.religion;
            categoriesList.appendChild(li);
        }
    }

    handleThumbnail() {
        const thumbnail = document.getElementById('lds-thumbnail');
        if (!thumbnail) return;
        const isValidYouTubeId = this.content.youtube_id && 
            this.content.youtube_id !== 'dQw4w9WgXcQ' && 
            this.content.youtube_id !== '7rcGkeFV3Tw' &&
            this.content.youtube_id !== 'jNQXAC9IVRw' &&
            (this.content.youtube_id.length === 11 || this.content.youtube_id.startsWith('PL')); // YouTube videos (11 chars) or playlists (PL...)
        
        if (isValidYouTubeId) {
            thumbnail.innerHTML = `
                <img src="https://img.youtube.com/vi/${this.content.youtube_id}/hqdefault.jpg" 
                     alt="${this.content.title} thumbnail" 
                     style="width: 100%; height: auto; border-radius: 8px;"
                     onerror="this.onerror=null; this.src='${this.getFallbackThumbnail()}';">
            `;
        } else if (this.content.thumbnail_url) {
            thumbnail.innerHTML = `
                <img src="${this.content.thumbnail_url}" 
                     alt="${this.content.title} thumbnail"
                     style="width: 100%; height: auto; border-radius: 8px;"
                     onerror="this.onerror=null; this.src='${this.getFallbackThumbnail()}';">
            `;
        } else {
            thumbnail.innerHTML = `
                <img src="${this.getFallbackThumbnail()}" 
                     alt="${this.getFallbackAltText()}" 
                     style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px;">
            `;
        }
    }
    
    getFallbackThumbnail() {
        const religion = (this.content.religion || '').toLowerCase();
        const contentType = (this.content.content_type || '').toLowerCase();
        
        if (religion === 'lds') {
            return '/images/LDSlogo.jpg';
        } else if (religion === 'christian' && contentType === 'christian_music') {
            return this.createChristianMusicPlaceholder();
        } else if (religion === 'christian' && contentType === 'bible_video') {
            return this.createBibleVideoPlaceholder();
        } else {
            return '/images/LDSlogo.jpg'; // Default fallback
        }
    }
    
    createChristianMusicPlaceholder() {
        return 'data:image/svg+xml;base64,' + btoa(`
            <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="musicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#2E7D32;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="300" height="200" fill="url(#musicGrad)"/>
                <circle cx="100" cy="100" r="30" fill="white" opacity="0.9"/>
                <circle cx="200" cy="100" r="30" fill="white" opacity="0.9"/>
                <rect x="85" y="70" width="30" height="60" fill="white" opacity="0.9"/>
                <rect x="185" y="70" width="30" height="60" fill="white" opacity="0.9"/>
                <text x="150" y="160" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">Christian Music</text>
            </svg>
        `);
    }
    
    createBibleVideoPlaceholder() {
        return 'data:image/svg+xml;base64,' + btoa(`
            <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bibleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#2196F3;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#1565C0;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="300" height="200" fill="url(#bibleGrad)"/>
                <rect x="120" y="60" width="60" height="80" fill="white" opacity="0.9" rx="5"/>
                <rect x="130" y="70" width="40" height="60" fill="#2196F3" opacity="0.7"/>
                <line x1="140" y1="80" x2="160" y2="80" stroke="white" stroke-width="2"/>
                <line x1="140" y1="90" x2="160" y2="90" stroke="white" stroke-width="2"/>
                <line x1="140" y1="100" x2="160" y2="100" stroke="white" stroke-width="2"/>
                <line x1="140" y1="110" x2="160" y2="110" stroke="white" stroke-width="2"/>
                <text x="150" y="160" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">Bible Video</text>
            </svg>
        `);
    }
    
    getFallbackAltText() {
        const religion = (this.content.religion || '').toLowerCase();
        const contentType = (this.content.content_type || '').toLowerCase();
        
        if (religion === 'lds') {
            return 'LDS Logo';
        } else if (religion === 'christian' && contentType === 'christian_music') {
            return 'Christian Music';
        } else if (religion === 'christian' && contentType === 'bible_video') {
            return 'Bible Video';
        } else {
            return 'Content Thumbnail';
        }
    }

    handleDisclaimer() {
        const disclaimer = document.querySelector('.lds-content-disclaimer');
        if (!disclaimer) {
            console.warn('Disclaimer element not found in DOM');
            return;
        }
        console.log('🔍 Content data for disclaimer check:', {
            title: this.content.title,
            content_type: this.content.content_type,
            religion: this.content.religion,
            category: this.content.category,
            denomination: this.content.denomination
        });
        const religiousContentTypes = [
            'conference_talk',
            'scripture_video', 
            'bible_video',
            'book_of_mormon',
            'mormon_message',
            'family_content',
            'study_guide',
            'youth_content',
            'documentary'
        ];

        const religiousReligions = [
            'lds',
            'mormon',
            'latter-day saints',
            'church of jesus christ'
        ];

        const religiousCategories = [
            'general_conference',
            'bible_study',
            'youth',
            'music',
            'documentary',
            'conference_talk',
            'scripture_video',
            'family_content',
            'scripture_study',
            'feature_film'
        ];
        const title = (this.content.title || '').toLowerCase();
        const description = (this.content.description || '').toLowerCase();
        const contentType = (this.content.content_type || '').toLowerCase();
        const religion = (this.content.religion || '').toLowerCase();
        const category = (this.content.category || '').toLowerCase();
        const denomination = (this.content.denomination || '').toLowerCase();
        const speaker = (this.content.speaker || '').toLowerCase();
        const shouldShowDisclaimer = 
            (religiousContentTypes.includes(contentType) && religion === 'lds') ||
            title.includes('tabernacle choir') ||
            title.includes('temple square') ||
            title.includes('general conference') ||
            title.includes('president ') ||
            title.includes('elder ') ||
            title.includes('sister ') ||
            title.includes('bishop ') ||
            title.includes('apostle ') ||
            title.includes('come follow me') ||
            title.includes('book of mormon') ||
            title.includes('joseph smith') ||
            title.includes('church of jesus christ') ||
            title.includes('the church of jesus christ of latter-day saints') ||
            title.includes('hymns') ||
            title.includes('mormon tabernacle') ||
            title.includes('lds daily') ||
            title.includes('ephraim\'s rescue') ||
            title.includes('17 miracles') ||
            title.includes('saratov approach') ||
            title.includes('the work and the glory') ||
            title.includes('legacy') ||
            title.includes('testaments') ||
            title.includes('johnny lingo') ||
            title.includes('brigham city') ||
            title.includes('russell m. nelson') ||
            title.includes('jeffrey r. holland') ||
            title.includes('tabernacle choir') ||
            title.includes('church of jesus christ') ||
            title.includes('the first presidency') ||
            title.includes('quorum of the twelve') ||
            title.includes('elder') ||
            title.includes('sister') ||
            title.includes('bishop') ||
            title.includes('apostle') ||
            title.includes('prophet') ||
            title.includes('president') ||
         speaker.includes('russell m. nelson') ||
         speaker.includes('jeffrey r. holland') ||
         speaker.includes('tabernacle choir') ||
         speaker.includes('church of jesus christ') ||
         speaker.includes('the first presidency') ||
         speaker.includes('quorum of the twelve') ||
         speaker.includes('elder') ||
         speaker.includes('sister') ||
         speaker.includes('bishop') ||
         speaker.includes('apostle') ||
         speaker.includes('prophet') ||
         speaker.includes('president') ||
            (title.includes('conference') && religion === 'lds') ||
            (title.includes('scripture') && religion === 'lds') ||
            (title.includes('hymn') && title.includes('tabernacle'));

        if (shouldShowDisclaimer) {
            disclaimer.style.display = 'block';
            console.log('✅ Showing disclaimer for religious content:', this.content.title);
            console.log('🔍 Matched criteria:', {
                contentType: contentType,
                religion: religion,
                denomination: denomination,
                category: category,
                title: title,
                description: description.substring(0, 100) + '...'
            });
        } else {
            disclaimer.style.display = 'none';
            console.log('❌ Hiding disclaimer for non-religious content:', this.content.title);
            console.log('🔍 Content details:', {
                contentType: contentType,
                religion: religion,
                denomination: denomination,
                category: category,
                title: title,
                description: description.substring(0, 100) + '...'
            });
        }
    }

    extractYouTubeId(url) {
    
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    setupEventListeners() {
        console.log("Setting up LDS detail page event listeners");
        const scriptureBtn = document.getElementById('btnLDSScripture');
        if (scriptureBtn) {
            scriptureBtn.onclick = () => this.viewScripture();
        }
    }

    removeEventListeners() {

        console.log("Removing LDS detail page event listeners");
    }

    async addToFavorites() {
        try {
            console.log(`Adding LDS content ${this.contentId} to favorites`);
            const favoriteCollectionType = "favorite";
            console.log('Collection type:', favoriteCollectionType, 'Length:', favoriteCollectionType.length);
            console.log('Collection bytes:', Array.from(favoriteCollectionType).map(c => c.charCodeAt(0)));
            await app.saveToCollectionLDS(this.contentId, favoriteCollectionType);

            const btn = document.getElementById('btnLDSFavorite');
            if (btn) {
                btn.textContent = 'Remove from Favorites';
                btn.classList.add('danger');
                btn.onclick = () => app.removeFromCollectionLDS(this.contentId, 'favorite');
            }
            
        } catch (error) {
            console.error("Error adding to favorites:", error);
            alert("Failed to add to favorites. Please try again.");
        }
    }

    async addToWatchlist() {
        try {
            console.log(`Adding LDS content ${this.contentId} to watchlist`);
            const watchlistCollectionType = "watchlist";
            console.log('Collection type:', watchlistCollectionType, 'Length:', watchlistCollectionType.length);
            console.log('Collection bytes:', Array.from(watchlistCollectionType).map(c => c.charCodeAt(0)));
            await app.saveToCollectionLDS(this.contentId, watchlistCollectionType);
            
            const btn = document.getElementById('btnLDSWatchlist');
            if (btn) {
                btn.textContent = 'Remove from Watchlist';
                btn.classList.add('danger');
                btn.onclick = () => app.removeFromCollectionLDS(this.contentId, 'watchlist');
            }
        } catch (error) {
            console.error("Error adding to watchlist:", error);
            alert("Failed to add to watchlist. Please try again.");
        }
    }

    viewScripture() {
        if (this.content.scripture_reference) {
            const scriptureUrl = `https://www.churchofjesuschrist.org/study/scriptures?q=${encodeURIComponent(this.content.scripture_reference)}`;
            window.open(scriptureUrl, '_blank');
        }
    }

    async rateVideo(rating) {
        try {
            console.log(`Rating LDS content ${this.contentId} with ${rating} stars`);
            console.log('Current window.ldsDetailsPage:', window.ldsDetailsPage);
            this.updateElement('lds-spiritual-rating', this.createStarRating(rating), true);
            const ratingData = {
                contentId: this.contentId,
                rating: rating,
                userId: window.app?.Store?.user?.id || 'anonymous',
                timestamp: new Date().toISOString()
            };
            localStorage.setItem(`lds_rating_${this.contentId}`, JSON.stringify(ratingData));
            this.showRatingFeedback(rating);
            
        } catch (error) {
            console.error("Error rating video:", error);
            alert("Failed to save rating. Please try again.");
        }
    }

    showRatingFeedback(rating) {
        const feedbackElement = document.createElement('div');
        feedbackElement.className = 'rating-feedback';
        feedbackElement.innerHTML = `Thank you! You rated this ${rating} star${rating > 1 ? 's' : ''}!`;
        feedbackElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1000;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(feedbackElement);
        setTimeout(() => {
            if (feedbackElement.parentNode) {
                feedbackElement.parentNode.removeChild(feedbackElement);
            }
        }, 3000);
    }

    showError(message) {
        console.error(message);
        alert(message);
    }

    render() {
        return `
            <article id="lds-content" class="lds-detail-page">
                <!-- Row 1: Banner with Title and Speaker -->
                <section class="lds-banner-section">
                    <div class="lds-banner">
                        <h1 id="lds-title" class="lds-banner-title">
                            <animated-loading elements="1"></animated-loading>
                        </h1>
                        <div class="lds-banner-speaker">
                            <span id="lds-speaker" class="lds-speaker-name">
                                <animated-loading elements="1"></animated-loading>
                            </span>
                            <div class="lds-rating">
                                <span class="lds-rating-icon">(୨୧•͈ᴗ•͈)◞ᵗʱᵃᵑᵏઽ*💜</span>
                                <span id="lds-spiritual-rating" class="lds-rating-stars">★★★★★</span>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Row 2: Two Column Layout - Logo and Description -->
                <section class="lds-content-section">
                    <div class="lds-detail-content-card">
                        <!-- Left Column: Logo/Thumbnail -->
                        <div class="lds-logo-column">
                            <div id="lds-thumbnail" class="lds-logo-container">
                                <animated-loading elements="1" data-width="300px" data-height="200px">
                                </animated-loading>
                            </div>
                        </div>
                        
                        <!-- Right Column: Description and Actions -->
                        <div class="lds-description-column">
                            <div class="lds-description-header">
                                <h3 class="lds-description-title">Description</h3>
                            </div>
                            <p id="lds-description-text" class="lds-description-content">
                                <animated-loading elements="1"></animated-loading>
                            </p>
                            
                            <!-- Action Buttons -->
                            <div class="lds-action-buttons">
                                <button type="button" id="btnLDSFavorite" class="lds-action-btn">Add to Favorites</button>
                                <button type="button" id="btnLDSWatchlist" class="lds-action-btn">Add to Watchlist</button>
                            </div>
                            
                            <!-- Statistics -->
                            <div class="lds-stats-container">
                                <div class="lds-stat-item">
                                    <span class="lds-stat-label">Views</span>
                                    <span class="lds-stat-value" id="lds-views">0</span>
                                </div>
                                <div class="lds-stat-item">
                                    <span class="lds-stat-label">Likes</span>
                                    <span class="lds-stat-value" id="lds-likes">0</span>
                                </div>
                                <div class="lds-stat-item">
                                    <span class="lds-stat-label">Duration</span>
                                    <span class="lds-stat-value" id="lds-duration">0 min</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Row 3: YouTube Video Content -->
                <section class="lds-video-section">
                    <div class="lds-video-container">
                        <div class="lds-video-header">
                            <div class="lds-video-profile">
                                <div class="lds-video-avatar"></div>
                                <h2 id="lds-video-title" class="lds-video-title">
                                    <animated-loading elements="1"></animated-loading>
                                </h2>
                            </div>
                            <div class="lds-video-menu">⋯</div>
                        </div>
                        <div class="lds-video-player">
                            <enhanced-youtube-embed id="lds-youtube-embed" data-url="" data-retry-count="3">
                            </enhanced-youtube-embed>
                        </div>
                    </div>
                </section>
                
                <!-- Disclaimer Section (Hidden by default, shown for religious content) -->
                <div class="lds-content-disclaimer">
                    <div class="disclaimer-header">
                        <h3>📚 Educational Collection & Personal Study</h3>
                    </div>
                    <div class="disclaimer-content">
                        <p class="disclaimer-intro">
                            <strong>Welcome to <span class="phoenix-text">Phoenix</span><span class="flix-text">Flix</span> - Your Digital Library for Spiritual Learning and Personal Growth!</strong> 
                            This platform is designed for educational enrichment, personal study, and the joy of collecting meaningful content. 
                            We honor the sacred nature of these teachings and respect the intellectual property of all creators.
                        </p>
                        
                        <div class="disclaimer-sources">
                            <h4>🌐 Official Sources for Complete Teachings</h4>
                            <p>For authoritative teachings, official statements, and complete spiritual guidance, we encourage you to visit these trusted sources:</p>
                            <ul class="official-links">
                                <li>
                                    <a href="https://www.churchofjesuschrist.org/?lang=eng" target="_blank" rel="noopener">
                                        🏛️ The Church of Jesus Christ of Latter-day Saints
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com/tbn" target="_blank" rel="noopener">
                                        📺 Trinity Broadcasting Network (TBN)
                                    </a>
                                </li>
                                <li>
                                    <a href="https://cbn.com/" target="_blank" rel="noopener">
                                        📻 Christian Broadcasting Network (CBN)
                                    </a>
                                </li>
                            </ul>
                        </div>
                        
                        <div class="disclaimer-legal">
                            <h4>⚖️ Educational Purpose & Respect</h4>
                            <p>
                                <strong>Educational Mission:</strong> <span class="phoenix-text">Phoenix</span><span class="flix-text">Flix</span> serves as a curated digital collection for educational purposes, personal study, and hobby enthusiasts. 
                                All content remains the intellectual property of their respective creators and organizations. 
                                We do not claim ownership of any materials and encourage users to access official sources for complete teachings and authorized materials.
                            </p>
                            <p>
                                <em>This platform is designed to inspire learning, foster spiritual growth, and support personal study in a respectful and educational manner.</em>
                            </p>
                            <p>
                                <strong>Please Note:</strong> Due to copyright laws and respect for the LDS Church, <span class="phoenix-text">Phoenix</span><span class="flix-text">Flix</span> can be used as a collection of samples or introductions. 
                                All other movies and videos are from public databases available on the internet. This is for educational purposes and fan hobbies only.
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Additional Content (Hidden by default, shown when needed) -->
                <section class="lds-additional-content" style="display: none;">
                    <dl id="lds-metadata" class="lds-metadata">
                        <dt>Speaker</dt>
                        <dd id="lds-speaker-name"></dd>
                        <dt>Conference</dt>
                        <dd id="lds-conference-session"></dd>
                    </dl>
                    <ul id="lds-categories" class="lds-categories"></ul>
                    <div id="lds-scripture-section" class="lds-scripture-section" style="display: none;">
                        <h3>Scripture Reference</h3>
                        <p id="lds-scripture-reference"></p>
                        <button id="btnLDSScripture" class="lds-scripture-btn" style="display: none;">View Scripture</button>
                    </div>
                </section>
            </article>
        `;
    }
}
customElements.define("lds-details-page", LDSDetailsPage);
