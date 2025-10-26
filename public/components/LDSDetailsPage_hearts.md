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

// ===============================================================================
// 🎬 LDS DETAIL PAGE COMPONENT - INDIVIDUAL LDS CONTENT DISPLAY
// ===============================================================================
// AUTHOR: LDSDetailPage.js - LDS content detail page component
// PURPOSE: Displays detailed information about individual LDS content
// ARCHITECTURE: Component Pattern + YouTube Integration + API Integration
// RELATIONS: → API.js, → Router.js, → Store.js, → YouTubeEmbed.js
// ===============================================================================

import { API } from '../services/API.js';
// import { YouTubeEmbed } from './YouTubeEmbed.js';
import { EnhancedYouTubeEmbed } from './EnhancedYouTubeEmbed.js';

export class LDSDetailsPage extends HTMLElement {
    constructor() {
        super();
        this.contentId = null;
        this.content = null;
    }

    // SECTION 1: COMPONENT LIFECYCLE
    // ===============================
    // KEYPOINT: Component lifecycle methods for initialization and cleanup
    // IMPORTANT: Proper lifecycle management ensures good performance
    // RELATION: → Called by Router.js when navigating to LDS detail page
    // ADVICE: Always clean up event listeners and timers

    async connectedCallback() {
        // KEYPOINT: Component initialization with content ID
        // IMPORTANT: Called when component is added to DOM
        // RELATION: → Called by Router.js during navigation
        // ADVICE: Load content data before rendering
        this.contentId = this.params ? this.params[0] : null;
        console.log(`LDS Detail Page connected for content ID: ${this.contentId}`);
        
        // Make this component globally accessible for rating
        window.ldsDetailsPage = this;
        
        this.innerHTML = this.render();
        await this.loadContentDetail();
        this.setupEventListeners();
    }

    disconnectedCallback() {
        // KEYPOINT: Component cleanup
        // IMPORTANT: Called when component is removed from DOM
        // RELATION: → Called by Router.js during navigation
        // ADVICE: Always clean up to prevent memory leaks
        console.log("LDS Detail Page disconnected");
        this.removeEventListeners();
    }

    // SECTION 2: CONTENT LOADING
    // ==========================
    // KEYPOINT: Load detailed LDS content from API
    // IMPORTANT: Fetches complete content information
    // RELATION: → Uses API.js for HTTP requests
    // ADVICE: Handle loading states and errors gracefully

    async loadContentDetail() {
        // KEYPOINT: Load detailed content information
        // IMPORTANT: Fetches complete content data including YouTube info
        // RELATION: → Calls API.js for data fetching
        // ADVICE: Show loading state while fetching data
        try {
            console.log(`Loading LDS content detail for ID: ${this.contentId}`);
            
            // Use the new API method similar to MovieDetailsPage
            this.content = await API.getLDSContentById(this.contentId);
            
            // Debug: Log the content to see what we're getting
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

    // SECTION 3: CONTENT RENDERING
    // =============================
    // KEYPOINT: Render detailed LDS content in HTML
    // IMPORTANT: Creates comprehensive content display
    // RELATION: → Updates DOM with detailed content
    // ADVICE: Use consistent styling and layout

    renderContentDetail() {
        // KEYPOINT: Render detailed content information
        // IMPORTANT: Creates comprehensive content display
        // RELATION: → Updates DOM elements with content data
        // ADVICE: Handle missing data gracefully
        if (!this.content) {
            console.warn("No content data to render");
            return;
        }

        // Update banner title and speaker (Row 1)
        this.updateElement('lds-title', this.content.title);
        this.updateElement('lds-speaker', this.content.speaker || 'Unknown Speaker');
        this.updateElement('lds-spiritual-rating', this.createStarRating(this.content.spiritual_rating || 5), true);
        
        // Update description in the content section (Row 2)
        this.updateElement('lds-description-text', this.content.description || 'No description available');
        
        // Update stats (views, likes, duration)
        const randnviews = Math.floor(Math.random() * (Math.floor(1000)- Math.ceil(100)+ 1)) + Math.ceil(100);
        const randnlikes =  Math.floor(Math.random() * (Math.floor(100)- Math.ceil(10)+ 1)) + Math.ceil(10);
        const randnmin =  Math.floor(Math.random() * (Math.floor(10)- Math.ceil(1)+ 1)) + Math.ceil(1);
        this.updateElement('lds-views', this.content.views || randnviews);
        this.updateElement('lds-likes', this.content.likes || randnlikes);
        this.updateElement('lds-duration', `${this.content.duration_minutes || randnmin} ꧁♡︎꧂`);
        
        // Update video title (Row 3)
        this.updateElement('lds-video-title', this.content.title);
        
        // Update metadata in the additional content section
        this.updateElement('lds-speaker-name', this.content.speaker || 'Unknown Speaker');
        this.updateElement('lds-conference-session', this.content.conference_session || '');
        
        // Handle categories (similar to genres in movies)
        this.handleCategories();
        
        // Handle scripture reference
        this.handleScriptureReference();
        
        // Handle YouTube embed
        this.handleYouTubeEmbed();
        
        // Handle thumbnail
        this.handleThumbnail();
    }

    updateElement(id, content, isHtml = false) {
        // KEYPOINT: Update DOM element with content
        // IMPORTANT: Safely updates element content
        // RELATION: → Used by renderContentDetail method
        // ADVICE: Handle missing elements gracefully
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
        // KEYPOINT: Create interactive star rating display
        // IMPORTANT: Shows spiritual value rating visually with click functionality
        // RELATION: → Used by renderContentDetail method
        // ADVICE: Use consistent star symbols with click handlers
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
        // KEYPOINT: Handle scripture reference display
        // IMPORTANT: Shows scripture references when available
        // RELATION: → Used by renderContentDetail method
        // ADVICE: Only show scripture section when reference exists
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
        // KEYPOINT: Handle YouTube video embedding using EnhancedYouTubeEmbed component
        // IMPORTANT: Uses EnhancedYouTubeEmbed component for better error handling
        // RELATION: → Used by renderContentDetail method
        // ADVICE: Use the EnhancedYouTubeEmbed component for better reliability
        const youtubeEmbed = document.getElementById('lds-youtube-embed');
        if (!youtubeEmbed) {
            console.warn("Enhanced YouTube embed component not found");
            return;
        }

        // Debug: Log what we have for YouTube
        console.log("YouTube data:", {
            youtube_id: this.content.youtube_id,
            youtube_url: this.content.youtube_url
        });

        // Check if we have a valid YouTube video
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

        // Set the data-url attribute on the EnhancedYouTubeEmbed component
        if (hasVideo && youtubeUrl) {
            youtubeEmbed.setAttribute('data-url', youtubeUrl);
            console.log("Set YouTube URL on enhanced embed component:", youtubeUrl);
        } else {
            // Set empty URL to trigger auto-search functionality
            youtubeEmbed.setAttribute('data-url', '');
            console.log("No video URL, letting EnhancedYouTubeEmbed handle auto-search");
        }

        // Show/hide the video section based on video availability
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
        // KEYPOINT: Handle categories display (similar to genres in movies)
        // IMPORTANT: Shows content categories/tags
        // RELATION: → Used by renderContentDetail method
        // ADVICE: Display categories in a user-friendly format
        const categoriesList = document.getElementById('lds-categories');
        if (!categoriesList) return;

        categoriesList.innerHTML = ''; // Clear existing content

        // Add category if available
        if (this.content.category) {
            const li = document.createElement('li');
            li.textContent = this.content.category;
            categoriesList.appendChild(li);
        }

        // Add content type if available
        if (this.content.content_type) {
            const li = document.createElement('li');
            li.textContent = this.content.content_type;
            categoriesList.appendChild(li);
        }

        // Add religion if available
        if (this.content.religion) {
            const li = document.createElement('li');
            li.textContent = this.content.religion;
            categoriesList.appendChild(li);
        }
    }

    handleThumbnail() {
        // KEYPOINT: Handle thumbnail display
        // IMPORTANT: Shows content thumbnail when available
        // RELATION: → Used by renderContentDetail method
        // ADVICE: Use fallback image when thumbnail not available
        const thumbnail = document.getElementById('lds-thumbnail');
        if (!thumbnail) return;

        if (this.content.thumbnail_url) {
            thumbnail.innerHTML = `<img src="${this.content.thumbnail_url}" alt="${this.content.title}">`;
        } else {
            thumbnail.innerHTML = '<img src="/images/TheLDSlogo.png" alt="LDS Logo" class="lds-logo-placeholder">';
        }
    }

    extractYouTubeId(url) {
        // KEYPOINT: Extract YouTube video ID from URL
        // IMPORTANT: Converts YouTube URLs to embeddable IDs
        // RELATION: → Used by handleYouTubeEmbed method
        // ADVICE: Handle various YouTube URL formats
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    // SECTION 4: EVENT HANDLING
    // ==========================
    // KEYPOINT: Handle user interactions
    // IMPORTANT: Responds to user clicks and actions
    // RELATION: → Updates component state
    // ADVICE: Use event delegation for better performance

    setupEventListeners() {
        // KEYPOINT: Set up event listeners
        // IMPORTANT: Handles user interactions
        // RELATION: → Called during component initialization
        // ADVICE: Use event delegation for dynamic content
        console.log("Setting up LDS detail page event listeners");
        
        // Add to favorites button
        const favoriteBtn = document.getElementById('btnLDSFavorite');
        if (favoriteBtn) {
            favoriteBtn.onclick = () => this.addToFavorites();
        }
        
        // Add to watchlist button
        const watchlistBtn = document.getElementById('btnLDSWatchlist');
        if (watchlistBtn) {
            watchlistBtn.onclick = () => this.addToWatchlist();
        }
        
        // View scripture button
        const scriptureBtn = document.getElementById('btnLDSScripture');
        if (scriptureBtn) {
            scriptureBtn.onclick = () => this.viewScripture();
        }
    }

    removeEventListeners() {
        // KEYPOINT: Remove event listeners
        // IMPORTANT: Prevents memory leaks
        // RELATION: → Called during component cleanup
        // ADVICE: Always clean up event listeners
        console.log("Removing LDS detail page event listeners");
    }

    // SECTION 5: USER ACTIONS
    // =========================
    // KEYPOINT: Handle user actions on content
    // IMPORTANT: Provides user interaction functionality
    // RELATION: → Uses Store.js for state management
    // ADVICE: Provide feedback for user actions

    async addToFavorites() {
        // KEYPOINT: Add content to user favorites
        // IMPORTANT: Saves content to user's favorites list
        // RELATION: → Uses Store.js for user state
        // ADVICE: Provide user feedback for actions
        try {
            console.log(`Adding LDS content ${this.contentId} to favorites`);
            // TODO: Implement favorites functionality
            alert("Added to favorites!");
        } catch (error) {
            console.error("Error adding to favorites:", error);
            alert("Failed to add to favorites. Please try again.");
        }
    }

    async addToWatchlist() {
        // KEYPOINT: Add content to user watchlist
        // IMPORTANT: Saves content to user's watchlist
        // RELATION: → Uses Store.js for user state
        // ADVICE: Provide user feedback for actions
        try {
            console.log(`Adding LDS content ${this.contentId} to watchlist`);
            // TODO: Implement watchlist functionality
            alert("Added to watchlist!");
        } catch (error) {
            console.error("Error adding to watchlist:", error);
            alert("Failed to add to watchlist. Please try again.");
        }
    }

    viewScripture() {
        // KEYPOINT: View scripture reference
        // IMPORTANT: Opens scripture reference in new tab
        // RELATION: → Uses external scripture service
        // ADVICE: Open scripture in new tab for better UX
        if (this.content.scripture_reference) {
            const scriptureUrl = `https://www.churchofjesuschrist.org/study/scriptures?q=${encodeURIComponent(this.content.scripture_reference)}`;
            window.open(scriptureUrl, '_blank');
        }
    }

    async rateVideo(rating) {
        // KEYPOINT: Rate the LDS video content
        // IMPORTANT: Allows users to rate spiritual content
        // RELATION: → Uses API.js for rating submission
        // ADVICE: Provide feedback for rating actions
        try {
            console.log(`Rating LDS content ${this.contentId} with ${rating} stars`);
            console.log('Current window.ldsDetailsPage:', window.ldsDetailsPage);
            
            // Update the visual rating immediately
            this.updateElement('lds-spiritual-rating', this.createStarRating(rating), true);
            
            // TODO: Send rating to API
            // For now, we'll store it locally
            const ratingData = {
                contentId: this.contentId,
                rating: rating,
                userId: window.app?.Store?.user?.id || 'anonymous',
                timestamp: new Date().toISOString()
            };
            
            // Store rating locally (you can replace this with API call)
            localStorage.setItem(`lds_rating_${this.contentId}`, JSON.stringify(ratingData));
            
            // Show success message
            this.showRatingFeedback(rating);
            
        } catch (error) {
            console.error("Error rating video:", error);
            alert("Failed to save rating. Please try again.");
        }
    }

    showRatingFeedback(rating) {
        // KEYPOINT: Show feedback for rating action
        // IMPORTANT: Provides user feedback for rating
        // RELATION: → Updates DOM with feedback message
        // ADVICE: Use temporary feedback that disappears
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
        
        // Remove feedback after 3 seconds
        setTimeout(() => {
            if (feedbackElement.parentNode) {
                feedbackElement.parentNode.removeChild(feedbackElement);
            }
        }, 3000);
    }

    // SECTION 6: UTILITY FUNCTIONS
    // =============================
    // KEYPOINT: Helper functions for common operations
    // IMPORTANT: Provides reusable functionality
    // RELATION: → Used by various component methods
    // ADVICE: Keep utility functions simple and focused

    showError(message) {
        // KEYPOINT: Show error message to user
        // IMPORTANT: Provides user feedback for errors
        // RELATION: → Updates DOM with error message
        // ADVICE: Use consistent error styling
        console.error(message);
        // TODO: Implement proper error display
        alert(message);
    }

    // SECTION 7: COMPONENT RENDERING
    // ===============================
    // KEYPOINT: Render component HTML
    // IMPORTANT: Creates component DOM structure
    // RELATION: → Called by Router.js
    // ADVICE: Keep HTML structure simple and semantic

    render() {
        // KEYPOINT: Render component HTML
        // IMPORTANT: Creates the component's DOM structure with 3-row layout
        // RELATION: → Called by Router.js for page display
        // ADVICE: Use semantic HTML for better accessibility
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
                                <span class="lds-rating-icon">♡</span>
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
                                <button id="btnLDSFavorite" class="lds-action-btn">Add to Favorites</button>
                                <button id="btnLDSWatchlist" class="lds-action-btn">Add to Watchlist</button>
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

// Register the custom element
customElements.define("lds-details-page", LDSDetailsPage);
