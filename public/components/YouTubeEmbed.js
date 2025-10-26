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

export class YouTubeEmbed extends HTMLElement {

    static get observedAttributes() {
        return ['data-url'];
    }

    attributeChangedCallback(prop, value) {
        
        if (prop === "data-url") {
            
            const url = this.dataset.url;
            
            if (!url || url === 'null' || url === '' || url === 'undefined') {
                this.innerHTML = `
                    <div class="no-trailer" style="
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                        height: 300px; 
                        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); 
                        color: #fff; 
                        border-radius: 8px;
                        text-align: center;
                        flex-direction: column;
                        border: 2px dashed #444;
                    ">
                        <div style="font-size: 48px; margin-bottom: 16px;">🎬</div>
                        <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">No Trailer Available</div>
                        <div style="font-size: 14px; color: #888; max-width: 300px; line-height: 1.4;">
                            This movie doesn't have a trailer yet.<br>
                            <small style="color: #666;">Check back later or explore other movies!</small>
                        </div>
                    </div>
                `;
                return;
            }
            
            let videoId;

            if (url.includes('youtu.be/')) {
            
                videoId = url.split('youtu.be/')[1].split('?')[0];
            } else if (url.includes('watch?v=')) {
              
                const urlParams = new URLSearchParams(url.split('?')[1]);
                videoId = urlParams.get('v');
            } else {
               
                const match = url.match(/[a-zA-Z0-9_-]{11}/);
                videoId = match ? match[0] : '';
            }

            if (!videoId || videoId.length !== 11) {
                this.innerHTML = `
                    <div class="invalid-trailer" style="
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                        height: 300px; 
                        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); 
                        color: #fff; 
                        border-radius: 8px;
                        text-align: center;
                        flex-direction: column;
                        border: 2px dashed #444;
                    ">
                        <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
                        <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">Invalid Trailer URL</div>
                        <div style="font-size: 14px; color: #888; max-width: 300px; line-height: 1.4;">
                            The trailer link for this movie is not working.<br>
                            <small style="color: #666;">We're working on fixing this!</small>
                        </div>
                    </div>
                `;
                return;
            }

            this.innerHTML = `
                <iframe width="100%" height="100%" 
                src="https://www.youtube.com/embed/${videoId}" 
                title="YouTube video player" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            `;
        }
    }

}

customElements.define("youtube-embed", YouTubeEmbed);
