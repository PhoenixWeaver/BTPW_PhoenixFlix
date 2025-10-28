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


import { MovieItemComponent } from "./MovieItem.js";
import { LDSItemComponent } from "./LDSItem.js";
import { API } from "../services/API.js";

export class CombinedWatchlistPage extends HTMLElement {

    constructor() {
        super();
    }

    getUsernameFromJWT() {

        try {
            const jwt = localStorage.getItem('jwt');
            if (!jwt) return 'Guest';
            
            const payload = jwt.split('.')[1];
            const decoded = JSON.parse(atob(payload));
            
            return decoded.name || decoded.username || decoded.email || 'User';
        } catch (e) {
            console.error('Error decoding JWT:', e);
            return 'User';
        }
    }

    async render() {
        try {

            const username = this.getUsernameFromJWT();
            const pageTitle = document.createElement('h2');
            pageTitle.className = 'collection-page-title';
            pageTitle.innerHTML = `🎬 ${username}'s Watchlist`;

            const section = this.querySelector('section');
            if (section) {
                section.insertBefore(pageTitle, section.firstChild);
            }
            
            console.log('🎬 Loading movie watchlist...');
            const movieWatchlist = await API.getWatchlist();
            console.log('🎬 Movie watchlist:', movieWatchlist);

            console.log('📖 Loading LDS watchlist...');
            const ldsWatchlist = await API.getLDSWatchlist();
            console.log('📖 LDS watchlist:', ldsWatchlist);

            const ulContainer = this.querySelector("ul");
            if (!ulContainer) {
                console.error('No ul container found');
                return;
            }

            ulContainer.innerHTML = "";

            let hasContent = false;
            if (movieWatchlist && movieWatchlist.length > 0) {

                console.log(`🎬 Rendering ${movieWatchlist.length} movie watchlist items`);
                
                movieWatchlist.forEach(movie => {
                    const li = document.createElement("li");
                    li.appendChild(new MovieItemComponent(movie));
                    ulContainer.appendChild(li);
                    hasContent = true;
                });
            }
            if (ldsWatchlist && ldsWatchlist.length > 0) {
    
                console.log(`📖 Rendering ${ldsWatchlist.length} LDS watchlist items`);
   
                for (const ldsId of ldsWatchlist) {
                    try {
                
                        console.log(`📖 Fetching LDS content for ID: ${ldsId}`);
                        const ldsContent = await API.getLDSById(ldsId);
                        
                        if (ldsContent) {
                            const li = document.createElement("li");
                            li.appendChild(new LDSItemComponent(ldsContent));
                            ulContainer.appendChild(li);
                            hasContent = true;
                        }
                    } catch (error) {
                        console.error(`Failed to fetch LDS content for ID ${ldsId}:`, error);
                    }
                }
            }
                if (!hasContent) {
           
                ulContainer.innerHTML = "<h3>No watchlist items yet. Add some movies or LDS content to your watchlist!</h3>";
            }

        } catch (error) {
     
            console.error('Error loading watchlist:', error);
            
            const ulContainer = this.querySelector("ul");
            if (ulContainer) {
                ulContainer.innerHTML = "<h3>Error loading watchlist. Please try again.</h3>";
            }
        }
    }

    async connectedCallback() {
        const template = document.getElementById("template-collection");
        const content = template.content.cloneNode(true);
        this.appendChild(content);  
        await this.render();
    }
}

customElements.define("combined-watchlist-page", CombinedWatchlistPage);

