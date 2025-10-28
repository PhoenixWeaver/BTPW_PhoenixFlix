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


export class LanguageTrailer extends HTMLElement {
    
    constructor() {
        super();
        this.movie = null;                    // Current movie data object
        this.preferredLanguage = 'en';        // User's preferred language (default English)
        this.trailerUrls = {};                // Cache of trailer URLs by language
    }

    static get observedAttributes() {
        return ['data-movie', 'data-language'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(prop, oldValue, newValue) {
        if (prop === 'data-movie' && newValue) {
            this.movie = JSON.parse(newValue);
            this.loadTrailerOptions();
        }
        if (prop === 'data-language' && newValue) {
            this.preferredLanguage = newValue;
            this.updateTrailer();
        }
    }

    render() {
        this.innerHTML = `
            <div class="language-trailer">
                <div class="trailer-header">
                    <h4>🎬 Trailer</h4>
                    <div class="language-controls">
                        <label for="trailer-language">Language:</label>
                        <select id="trailer-language">
                            <option value="original">Original (${this.movie?.language || 'Unknown'})</option>
                            <option value="en">English 🇺🇸</option>
                            <option value="es">Spanish 🇪🇸</option>
                            <option value="fr">French 🇫🇷</option>
                            <option value="de">German 🇩🇪</option>
                            <!-- <option value="ko">Korean 🇰🇷</option> --> <!-- Commented out - no Korean movies yet -->
                            <option value="ja">Japanese 🇯🇵</option>
                        </select>
                    </div>
                </div>
                <div class="trailer-container">
                    <youtube-embed id="main-trailer"></youtube-embed>
                </div>
                <div class="trailer-info">
                    <p id="trailer-language-info">Loading trailer options...</p>
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    attachEventListeners() {
        const languageSelect = this.querySelector('#trailer-language');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.changeTrailerLanguage(e.target.value);
            });
        }
    }

    async loadTrailerOptions() {
        if (!this.movie) return;
        this.trailerUrls = {
            original: this.movie.trailer_url || '',
            en: await this.findTrailerInLanguage('en'),
            es: await this.findTrailerInLanguage('es'),
            fr: await this.findTrailerInLanguage('fr'),
            de: await this.findTrailerInLanguage('de'),
            ko: await this.findTrailerInLanguage('ko'),
            ja: await this.findTrailerInLanguage('ja')
        };

        this.updateTrailer();
    }

    async findTrailerInLanguage(language) {
        return this.movie.trailer_url || '';
    }

    changeTrailerLanguage(language) {
        this.preferredLanguage = language;
        this.updateTrailer();
    }

    updateTrailer() {
        const trailerUrl = this.trailerUrls[this.preferredLanguage] || this.trailerUrls.original;
        const trailerEmbed = this.querySelector('#main-trailer');
        const infoText = this.querySelector('#trailer-language-info');

        if (trailerEmbed && trailerUrl) {
            trailerEmbed.dataset.url = trailerUrl;
        }

        if (infoText) {
            const languageNames = {
                original: 'Original Language',
                en: 'English',
                es: 'Spanish', 
                fr: 'French',
                de: 'German',
                ko: 'Korean',
                ja: 'Japanese'
            };
            
            const langName = languageNames[this.preferredLanguage] || 'Unknown';
            infoText.textContent = `Playing trailer in ${langName}`;
        }
    }
}
customElements.define('language-trailer', LanguageTrailer);

