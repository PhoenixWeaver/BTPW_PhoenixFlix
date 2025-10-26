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
import { LDSItemComponent } from "./LDSItem.js";
import { EnhancedYouTubeEmbed } from "./EnhancedYouTubeEmbed.js";

export class LDSPage extends HTMLElement {  // <lds-page>

    renderLDSInList(ldsItems, container, label = '') {
        console.log(`🎬 Rendering LDS items for ${label}:`, ldsItems);
        
        if (!container) {
            console.error('Container element not found', label);
            return;
        }
        container.innerHTML = "";
        const normalizeList = (data) => {
            if (Array.isArray(data)) return data;
            if (data && Array.isArray(data.data)) return data.data;
            if (data && Array.isArray(data.results)) return data.results;
            return [];
        };

        const items = normalizeList(ldsItems);
        console.log(`🎬 Normalized items for ${label}:`, items);

        if (!items || items.length === 0) {
            console.warn('No LDS items to render for section', label, ldsItems);
            container.innerHTML = '<li class="no-content">No content available at this time.</li>';
            return;
        }

        try {
            items.forEach(lds => {
                const li = document.createElement("li");
                li.appendChild(new LDSItemComponent(lds));
                container.appendChild(li);
            });
        } catch (err) {
            console.error('Failed to render LDS items for', label, err);
            container.innerHTML = '<li class="no-content">Failed to load content.</li>';
        }
    }

    async render(query = null) {
        try {
            await new Promise(resolve => setTimeout(resolve, 100));
            console.log('🔍 Checking for container elements...');
            const ldsFeaturesContainer = this.querySelector("#lds-features");
            const bibleVideosContainer = this.querySelector("#lds-bible-videos");
            const christianSongsContainer = this.querySelector("#lds-christian-songs");
            
            console.log('📦 Container elements found:', {
                ldsFeatures: !!ldsFeaturesContainer,
                bibleVideos: !!bibleVideosContainer,
                christianSongs: !!christianSongsContainer
            });
            const toList = (d) => Array.isArray(d) ? d : (d && Array.isArray(d.data) ? d.data : (d && Array.isArray(d.results) ? d.results : []));

            if (query) {
                console.log('🔍 Search mode - searching for:', query);
                const urlParams = new URLSearchParams(location.search);
                const order = urlParams.get("order") ?? "";
                const genre = urlParams.get("lds") ?? "";
                const searchResults = await API.searchLDS(query, order, genre);
                console.log('🔍 Search results from API:', searchResults);
                const searchList = toList(searchResults);
                console.log('🔍 Search list after normalization:', searchList);
                this.renderLDSInList(searchList, ldsFeaturesContainer, 'search-results');
                this.renderLDSInList(searchList, bibleVideosContainer, 'search-results');
                this.renderLDSInList(searchList, christianSongsContainer, 'search-results');
                
            } else {
                console.log('🎺 Loading LDS Features...');
                const ldsFeatures = await API.getTopLDS();
                console.log('🎺 LDS Features data:', ldsFeatures);
                const featureList = toList(ldsFeatures);
                this.renderLDSInList(featureList, ldsFeaturesContainer, 'lds-features');
                console.log('📖 Loading Bible Videos...');
                const bibleVideos = await API.getBibleVideos();
                console.log('📖 Bible Videos data:', bibleVideos);
                this.renderLDSInList(toList(bibleVideos), bibleVideosContainer, 'bible-videos');
                console.log('🎤 Loading Christian Songs...');
                const christianSongs = await API.getChristianSongs();
                console.log('🎤 Christian Songs data:', christianSongs);
                this.renderLDSInList(toList(christianSongs), christianSongsContainer, 'christian-songs');

            }

        } catch (error) {
            console.error('Error loading LDS content:', error);
        }
    }

    async connectedCallback() {
        console.log("LDS Page connected");
        const template = document.getElementById("template-lds");
        if (!template) {
            console.error('❌ Template template-lds not found!');
            return;
        }
        
        const content = template.content.cloneNode(true);
        this.appendChild(content);
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');  // Get search query from URL
        
        if (query) {
            this.querySelector("h1").textContent = `'${query}' LDS Content`;
            await this.render(query);
        } else {
            await this.render();
        }
    }
}
customElements.define("lds-page", LDSPage);

