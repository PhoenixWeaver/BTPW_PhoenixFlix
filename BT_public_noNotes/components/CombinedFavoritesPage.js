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

export class CombinedFavoritesPage extends HTMLElement {

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
            pageTitle.innerHTML = `💜 ${username}'s Favorites`;

            const section = this.querySelector('section');
            if (section) {
                section.insertBefore(pageTitle, section.firstChild);
            }
          
            console.log('🎬 Loading movie favorites...');
            const movieFavorites = await API.getFavorites();
            console.log('🎬 Movie favorites:', movieFavorites);

            console.log('📖 Loading LDS favorites...');
            let ldsFavorites = await API.getLDSFavorites();
            console.log('📖 LDS favorites (attempt 1):', ldsFavorites);
            if (!Array.isArray(ldsFavorites) || ldsFavorites.length === 0) {
                await new Promise(r => setTimeout(r, 100));
                ldsFavorites = await API.getLDSFavorites();
                console.log('📖 LDS favorites (attempt 2):', ldsFavorites);
            }

            const ulContainer = this.querySelector("ul");
            if (!ulContainer) {
                console.error('No ul container found');
                return;
            }

            ulContainer.innerHTML = "";

            let hasContent = false;
            if (movieFavorites && movieFavorites.length > 0) {
               
                console.log(`🎬 Rendering ${movieFavorites.length} movie favorites`);

                movieFavorites.forEach(movie => {
                    const li = document.createElement("li");
                    li.appendChild(new MovieItemComponent(movie));
                    ulContainer.appendChild(li);
                    hasContent = true;
                });
            }

            if (ldsFavorites && ldsFavorites.length > 0) {
      
                console.log(`📖 Rendering ${ldsFavorites.length} LDS favorites`);
                 for (const ldsId of ldsFavorites) {
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
                ulContainer.innerHTML = "<h3>No favorites yet. Add some movies or LDS content to your favorites!</h3>";
            }

        } catch (error) {
            console.error('Error loading favorites:', error);
            
            const ulContainer = this.querySelector("ul");
            if (ulContainer) {
                ulContainer.innerHTML = "<h3>Error loading favorites. Please try again.</h3>";
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

customElements.define("combined-favorites-page", CombinedFavoritesPage);

