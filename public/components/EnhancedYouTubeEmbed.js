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

export class EnhancedYouTubeEmbed extends HTMLElement {
    
    static get observedAttributes() {
        return ['data-url', 'data-fallback', 'data-retry-count'];
    }

    connectedCallback() {
        if (typeof window !== 'undefined') {
            window.enhancedYouTubeEmbed = this;
        }
    }

    retryCount = 0;
    maxRetries = 3;
    fallbackContent = null;
    isRetrying = false;
    
    attributeChangedCallback(prop, oldValue, newValue) {
        if (prop === "data-url") {
            this.handleVideoUrl(newValue);
        } else if (prop === "data-fallback") {
            this.fallbackContent = newValue;
        } else if (prop === "data-retry-count") {
            this.maxRetries = parseInt(newValue) || 3;
        }
    }

    async handleVideoUrl(url) {
        if (typeof window !== 'undefined') {
            window.enhancedYouTubeEmbed = this;
        }
        
        this.retryCount = 0;
        this.isRetrying = false;
        
        this.showLoadingState();
        
        if (!url || url === 'null' || url === '' || url === 'undefined') {
            await this.autoFindVideos();
            return;
        }
        
        if (!this.isValidUrl(url)) {
            await this.searchForVideos(url);
            return;
        }
        
        const videoId = this.extractVideoId(url);
        if (!videoId) {
            await this.searchForVideos(url);
            return;
        }
        
        if (!this.isValidVideoId(videoId)) {
            await this.searchForVideos(videoId);
            return;
        }
        
        const videoExists = await this.checkVideoExists(videoId);
        if (!videoExists) {
            await this.searchForVideos(this.getMovieTitle());
            return;
        }
        
        this.createEmbed(videoId);
    }

    isValidUrl(url) {
        if (!url || url === 'null' || url === '' || url === 'undefined') {
            return false;
        }
        
        const youtubePatterns = [
            /youtube\.com\/watch\?v=/,
            /youtu\.be\//,
            /youtube\.com\/embed\//,
            /youtube\.com\/v\//,
            /youtube\.com\/playlist\?list=/
        ];
        
        return youtubePatterns.some(pattern => pattern.test(url));
    }

    extractVideoId(url) {
        let videoId = '';
        
        try {
            if (url.includes('youtu.be/')) {
                videoId = url.split('youtu.be/')[1].split('?')[0];
            } else if (url.includes('watch?v=')) {
                const urlParams = new URLSearchParams(url.split('?')[1]);
                videoId = urlParams.get('v');
            } else if (url.includes('embed/')) {
                videoId = url.split('embed/')[1].split('?')[0];
            } else if (url.includes('/v/')) {
                videoId = url.split('/v/')[1].split('?')[0];
            } else if (url.includes('playlist?list=')) {
                const urlParams = new URLSearchParams(url.split('?')[1]);
                videoId = urlParams.get('list');
            } else {
                const match = url.match(/[a-zA-Z0-9_-]{11,}/);
                videoId = match ? match[0] : '';
            }
        } catch (error) {
            console.warn('Error extracting video ID:', error);
            videoId = '';
        }
        
        return videoId;
    }

    isValidVideoId(videoId) {
        return videoId && (
            (videoId.length === 11 && /^[a-zA-Z0-9_-]+$/.test(videoId)) ||
            (videoId.startsWith('PL') && videoId.length > 11)
        );
    }

    async checkVideoExists(videoId) {
        try {
            const response = await fetch(`https://www.youtube.com/oembed?url=https://youtube.com/watch?v=${videoId}&format=json`);
            return response.ok;
        } catch (error) {
            console.warn('Error checking video existence:', error);
            return true;
        }
    }

    createEmbed(videoId) {
        if (typeof window !== 'undefined') {
            window.enhancedYouTubeEmbed = this;
        }
        
        const isPlaylist = videoId.startsWith('PL');
        const embedUrl = isPlaylist 
            ? `https://www.youtube.com/embed/videoseries?list=${videoId}&enablejsapi=1&origin=${window.location.origin}&rel=0&modestbranding=1&fs=1`
            : `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}&rel=0&modestbranding=1&fs=1`;
        
        this.innerHTML = `
            <div class="youtube-container" style="position: relative; width: 100%; height: 100%;">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="${embedUrl}"
                    title="YouTube ${isPlaylist ? 'playlist' : 'video'} player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen
                    onload="this.style.opacity='1'"
                    onerror="this.parentElement.innerHTML='<div class=\\"error-message\\">Failed to load ${isPlaylist ? 'playlist' : 'video'}</div>'"
                    style="opacity: 0; transition: opacity 0.3s ease;"
                ></iframe>
            </div>
        `;
        
        this.setupErrorHandling(videoId);
    }

    setupErrorHandling(videoId) {
        const iframe = this.querySelector('iframe');
        if (!iframe) return;
        
        iframe.addEventListener('load', () => {
            console.log(`YouTube video ${videoId} loaded successfully`);
        });
        
        iframe.addEventListener('error', () => {
            this.handleEmbedError(videoId);
        });
        
        setTimeout(() => {
            if (iframe && iframe.offsetHeight === 0) {
                this.handleEmbedError(videoId);
            }
        }, 10000);
    }

    handleEmbedError(videoId) {
        if (this.isRetrying) return;
        
        this.isRetrying = true;
        this.retryCount++;
        
        if (this.retryCount <= this.maxRetries) {
            console.log(`Retrying YouTube embed for ${videoId} (attempt ${this.retryCount})`);
            setTimeout(() => {
                this.createEmbed(videoId);
                this.isRetrying = false;
            }, 2000 * this.retryCount);
        } else {
            const isPlaylist = videoId.startsWith('PL');
            const errorMessage = isPlaylist 
                ? `Playlist may have embedding restrictions or be private. Try opening the original playlist on YouTube.`
                : "Video failed to load after multiple attempts";
            
            this.showNoTrailerMessage(errorMessage);
            console.warn(`Failed to embed ${isPlaylist ? 'playlist' : 'video'} ${videoId} after ${this.maxRetries} attempts`);
        }
    }

    showLoadingState() {
        this.innerHTML = `
            <div class="loading-container" style="
                display: flex; 
                align-items: center; 
                justify-content: center; 
                height: 100%; 
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); 
                color: #fff; 
                border-radius: 8px;
                text-align: center;
                flex-direction: column;
            ">
                <div class="loading-spinner" style="
                    width: 40px; 
                    height: 40px; 
                    border: 4px solid #333; 
                    border-top: 4px solid #ff6b6b; 
                    border-radius: 50%; 
                    animation: spin 1s linear infinite;
                    margin-bottom: 16px;
                "></div>
                <div style="font-size: 16px; font-weight: bold;">Loading trailer...</div>
                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
            </div>
        `;
    }

    async autoFindVideos() {
        const movieTitle = this.getMovieTitle();
        if (movieTitle) {
            await this.searchForVideos(movieTitle);
        } else {
            this.showNoTrailerMessage("No movie title found to search for videos");
        }
    }

    async searchForVideos(searchTerm) {
        try {
            this.showSearchingState(searchTerm);
            
            const searchResults = await this.searchYouTube(searchTerm);
            
            if (searchResults && searchResults.length > 0) {
                if (searchResults.length === 1) {
                    console.log('🎬 Auto-playing single result:', searchResults[0].title);
                    this.showAutoPlayingState(searchResults[0].title);
                    setTimeout(() => {
                        this.createEmbed(searchResults[0].id);
                    }, 500);
                } else {
                    this.showVideoSelection(searchResults, searchTerm);
                }
            } else {
                this.showNoTrailerMessage(`No videos found for "${searchTerm}"`);
            }
        } catch (error) {
            console.warn('Error searching for videos:', error);
            this.showNoTrailerMessage(`Failed to search for videos: ${searchTerm}`);
        }
    }

    async searchYouTube(query) {
        try {
            const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
            
            return await this.fetchYouTubeSearchResults(query);
        } catch (error) {
            console.warn('YouTube search failed:', error);
            return null;
        }
    }
    
    async fetchYouTubeSearchResults(query) {
        try {
            const searchResults = await this.performYouTubeSearch(query);
            return searchResults;
        } catch (error) {
            console.warn('YouTube search failed, using fallback:', error);
            return this.getFallbackVideos(query);
        }
    }
    
    async performYouTubeSearch(query) {
        try {
            const dbResults = await this.searchDatabaseForVideos(query);
            if (dbResults && dbResults.length > 0) {
                return dbResults;
            }
        } catch (error) {
            console.warn('Database search failed:', error);
        }
        
        return [];
    }

    async searchDatabaseForVideos(query) {
        try {
            const response = await fetch(`/api/LDS/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Database search failed');
            }
            
            const data = await response.json();
            const videos = Array.isArray(data) ? data : (data.data || data.results || []);
            
            return videos.slice(0, 3).map(video => ({
                id: video.youtube_id || video.YouTubeID,
                title: video.title,
                thumbnail: `https://img.youtube.com/vi/${video.youtube_id || video.YouTubeID}/hqdefault.jpg`,
                duration: video.duration_minutes ? `${video.duration_minutes}:00` : 'Unknown',
                views: video.view_count ? this.formatViewCount(video.view_count) : 'Unknown',
                published: video.content_date ? this.formatDate(video.content_date) : 'Unknown'
            })).filter(video => video.id);
            
        } catch (error) {
            console.warn('Error searching database:', error);
            return [];
        }
    }

    formatViewCount(count) {
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(1)}M`;
        } else if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}K`;
        }
        return count.toString();
    }

    formatDate(dateString) {
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffTime = Math.abs(now - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) return '1 day ago';
            if (diffDays < 7) return `${diffDays} days ago`;
            if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
            if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
            return `${Math.ceil(diffDays / 365)} years ago`;
        } catch (error) {
            return 'Unknown';
        }
    }

    getFallbackVideos(query) {
        return [];
    }

    getMovieTitle() {
        const titleElement = document.querySelector('h2');
        return titleElement ? titleElement.textContent.trim() : null;
    }

    showSearchingState(searchTerm) {
        this.innerHTML = `
            <div class="searching-container" style="
                display: flex; 
                align-items: center; 
                justify-content: center; 
                height: 100%; 
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); 
                color: #fff; 
                border-radius: 8px;
                text-align: center;
                flex-direction: column;
            ">
                <div class="searching-spinner" style="
                    width: 40px; 
                    height: 40px; 
                    border: 4px solid #333; 
                    border-top: 4px solid #4CAF50; 
                    border-radius: 50%; 
                    animation: spin 1s linear infinite;
                    margin-bottom: 16px;
                "></div>
                <div style="font-size: 16px; font-weight: bold;">Searching for "${searchTerm}"...</div>
                <div style="font-size: 14px; color: #888; margin-top: 8px;">Finding the best videos for you</div>
                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
            </div>
        `;
    }

    showAutoPlayingState(videoTitle) {
        this.innerHTML = `
            <div class="auto-playing-container" style="
                display: flex; 
                align-items: center; 
                justify-content: center; 
                height: 100%; 
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); 
                color: #fff; 
                border-radius: 8px;
                text-align: center;
                flex-direction: column;
            ">
                <div class="play-icon" style="
                    width: 40px; 
                    height: 40px; 
                    background: #4CAF50; 
                    border-radius: 50%; 
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 16px;
                    animation: pulse 1s ease-in-out infinite;
                ">
                    <div style="
                        width: 0; 
                        height: 0; 
                        border-left: 12px solid #fff; 
                        border-top: 8px solid transparent; 
                        border-bottom: 8px solid transparent;
                        margin-left: 3px;
                    "></div>
                </div>
                <div style="font-size: 16px; font-weight: bold;">🎬 Auto-playing...</div>
                <div style="font-size: 14px; color: #888; margin-top: 8px;">"${videoTitle}"</div>
                <style>
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.1); }
                        100% { transform: scale(1); }
                    }
                </style>
            </div>
        `;
    }

    showVideoSelection(videos, searchTerm) {
        this.innerHTML = `
            <div class="video-selection" style="
                height: 100%; 
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); 
                color: #fff; 
                border-radius: 8px;
                padding: 20px;
                overflow-y: auto;
            ">
                <div style="font-size: 18px; font-weight: bold; margin-bottom: 16px; text-align: center;">
                    🎬 Found Videos for "${searchTerm}"
                </div>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${videos.map((video, index) => `
                        <div class="video-option" style="
                            display: flex; 
                            align-items: center; 
                            padding: 12px; 
                            background: #333; 
                            border-radius: 8px; 
                            cursor: pointer;
                            transition: background 0.2s;
                            border: 2px solid transparent;
                        " 
                        onmouseover="this.style.background='#444'; this.style.borderColor='#4CAF50'"
                        onmouseout="this.style.background='#333'; this.style.borderColor='transparent'"
                        onclick="window.enhancedYouTubeEmbed.createEmbed('${video.id}')">
                            <img src="${video.thumbnail}" style="width: 80px; height: 60px; object-fit: cover; border-radius: 4px; margin-right: 12px;">
                            <div style="flex: 1;">
                                <div style="font-weight: bold; margin-bottom: 4px;">${video.title}</div>
                                <div style="font-size: 12px; color: #888;">
                                    Duration: ${video.duration} • Views: ${video.views} • ${video.published}
                                </div>
                            </div>
                            <div style="color: #4CAF50; font-size: 24px;">▶️</div>
                        </div>
                    `).join('')}
                </div>
                <div style="text-align: center; margin-top: 16px; font-size: 12px; color: #888;">
                    Click on any video to play it
                </div>
            </div>
        `;
    }

    showNoTrailerMessage(reason = "No trailer available") {
        const messages = {
            "Invalid trailer URL": {
                icon: "⚠️",
                title: "Invalid Trailer URL",
                description: "The trailer link for this movie is not working properly."
            },
            "Could not extract video ID": {
                icon: "🔍",
                title: "Invalid Video Link",
                description: "We couldn't find a valid video ID in the provided URL."
            },
            "Invalid video ID format": {
                icon: "📝",
                title: "Malformed Video ID",
                description: "The video ID doesn't match YouTube's format requirements."
            },
            "Video not found on YouTube": {
                icon: "🚫",
                title: "Video Not Found",
                description: "This video doesn't exist on YouTube or has been removed."
            },
            "Video failed to load after multiple attempts": {
                icon: "🔄",
                title: "Loading Failed",
                description: "We tried multiple times but couldn't load the video."
            },
            "Playlist may have embedding restrictions or be private. Try opening the original playlist on YouTube.": {
                icon: "🔒",
                title: "Playlist Embedding Restricted",
                description: "This playlist may have embedding restrictions or be private."
            },
            "No trailer available": {
                icon: "🎬",
                title: "No Trailer Available",
                description: "This movie doesn't have a trailer yet."
            }
        };
        
        const message = messages[reason] || messages["No trailer available"];
        
        this.innerHTML = `
            <div class="no-trailer" style="
                display: flex; 
                align-items: center; 
                justify-content: center; 
                height: 100%; 
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); 
                color: #fff; 
                border-radius: 8px;
                text-align: center;
                flex-direction: column;
                border: 2px dashed #444;
            ">
                <div style="font-size: 48px; margin-bottom: 16px;">${message.icon}</div>
                <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">${message.title}</div>
                <div style="font-size: 14px; color: #888; max-width: 300px; line-height: 1.4;">
                    ${message.description}<br>
                    <small style="color: #666;">Check back later or explore other movies!</small>
                </div>
                ${this.getYouTubeLink()}
            </div>
        `;
    }

    getYouTubeLink() {
        const videoId = this.getAttribute('data-url') || this.currentVideoId;
        if (!videoId) return '';
        
        const isPlaylist = videoId.startsWith('PL');
        const youtubeUrl = isPlaylist ? 
            `https://www.youtube.com/playlist?list=${videoId}` : 
            `https://www.youtube.com/watch?v=${videoId}`;
        
        return `
            <a href="${youtubeUrl}" target="_blank" rel="noopener" style="
                display: inline-block;
                background: #ff0000;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                text-decoration: none;
                font-weight: bold;
                margin-top: 15px;
                transition: background 0.3s ease;
            " onmouseover="this.style.background='#cc0000'" onmouseout="this.style.background='#ff0000'">
                Watch on YouTube
            </a>
        `;
    }
}

customElements.define("enhanced-youtube-embed", EnhancedYouTubeEmbed);
