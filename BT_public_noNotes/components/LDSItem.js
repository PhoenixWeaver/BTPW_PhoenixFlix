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

export class LDSItemComponent extends HTMLElement {
    constructor(lds) {
        super();
        this.lds = lds;
    }

    connectedCallback() {
        const url = "/lds/" + this.lds.id; // Fix: was "/ldss/" should be "/lds/"
        const fallbackLogo = '/images/LDSlogo.jpg';
        let youtubePoster = '';
        const isValidYouTubeId = this.lds.youtube_id && 
            this.lds.youtube_id !== '7rcGkeFV3Tw' &&
            this.lds.youtube_id !== 'jNQXAC9IVRw' &&
            this.lds.youtube_id.length === 11; // YouTube IDs are always 11 characters
            
        if (isValidYouTubeId) {
            youtubePoster = `https://img.youtube.com/vi/${this.lds.youtube_id}/hqdefault.jpg`;
        }
        
        const thumb = this.lds.thumbnail_url || youtubePoster || fallbackLogo;

        this.innerHTML = `
            <a class="navlink" href="#" 
                onclick="event.preventDefault();app.Router.go('${url}')">
                <article class="media-card">
                    <img src="${thumb}"
                         alt="${this.lds.title} Thumbnail"
                         loading="lazy"
                         onerror="this.onerror=null;this.src='${fallbackLogo}';">
                </article>
                <p><span class="media-type lds">⛪</span><span class="media-title lds">${this.lds.title}</span> (${this.lds.content_date ? new Date(this.lds.content_date).getFullYear() : 'N/A'})</p>
            </a>
        `;
    }
}

customElements.define("lds-item", LDSItemComponent)