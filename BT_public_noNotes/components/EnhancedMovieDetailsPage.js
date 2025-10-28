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

export class EnhancedMovieDetailsPage extends HTMLElement {
    id = null;
    movie = null;
    userLanguagePreference = 'en'; // Default to English

    async render() {

        try {
            this.movie = await API.getMovieById(this.id);
        } catch {
            this.showError();
            return;
        }
        
        const template = document.getElementById("template-movie-details");
        const content = template.content.cloneNode(true);
        this.appendChild(content);
        
        this.populateMovieData();
        this.addLanguageFeatures();
        this.attachEventListeners();
    }
    populateMovieData() {
       
        this.querySelector("h2").textContent = this.movie.title;
        this.querySelector("h3").textContent = this.movie.tagline || "";
        this.querySelector("img").src = this.movie.poster_url || "/images/no-poster.jpg";
        this.querySelector("#trailer").dataset.url = this.movie.trailer_url || "";

        const metadata = this.querySelector("#metadata");
        metadata.innerHTML = `
            <dt>Release Date</dt>
            <dd>${this.movie.release_year}</dd>
            <dt>Score</dt>
            <dd>${this.movie.score?.toFixed(1) || 'N/A'} / 10</dd>
            <dt>Original Language</dt>
            <dd>${this.getLanguageDisplayName(this.movie.language)} ${this.getLanguageFlag(this.movie.language)}</dd>
            <dt>Popularity</dt>
            <dd>${this.movie.popularity?.toFixed(1) || 'N/A'}</dd>
        `;

        this.querySelector("#overview").textContent = this.movie.overview || "No overview available.";
        const genresList = this.querySelector("#genres");
        genresList.innerHTML = this.movie.genres?.map(genre => 
            `<li>${genre.name}</li>`
        ).join('') || '<li>No genres listed</li>';

        const castList = this.querySelector("#cast");
        castList.innerHTML = this.movie.casting?.map(actor => 
            `<li>
                <img src="${actor.image_url || '/images/generic_actor.jpg'}" alt="Picture of ${actor.last_name}">
                <span>${actor.first_name} ${actor.last_name}</span>
            </li>`
        ).join('') || '<li>No cast information available</li>';
    }

    addLanguageFeatures() {
   
        const trailerSection = this.querySelector("#trailer").parentElement;
        const languageTrailer = document.createElement('language-trailer');
        languageTrailer.setAttribute('data-movie', JSON.stringify(this.movie));
        languageTrailer.setAttribute('data-language', this.userLanguagePreference);
        trailerSection.appendChild(languageTrailer);

        const actionsSection = this.querySelector("#actions");
        const languageSelector = document.createElement('div');
        languageSelector.className = 'language-preference';
        languageSelector.innerHTML = `
            <label for="user-language">Preferred Language:</label>
            <select id="user-language">
                <option value="en">English 🇺🇸</option>
                <option value="es">Spanish 🇪🇸</option>
                <option value="fr">French 🇫🇷</option>
                <option value="de">German 🇩🇪</option>
                <!-- <option value="ko">Korean 🇰🇷</option> --> <!-- Commented out - no Korean movies yet -->
                <option value="ja">Japanese 🇯🇵</option>
                <option value="zh">Chinese 🇨🇳</option>
                <option value="hi">Hindi 🇮🇳</option>
                <option value="it">Italian 🇮🇹</option>
                <option value="pt">Portuguese 🇵🇹</option>
                <option value="ru">Russian 🇷🇺</option>
            </select>
        `;
        actionsSection.appendChild(languageSelector);

        const mediaOptions = document.createElement('div');
        mediaOptions.className = 'media-options';
        mediaOptions.innerHTML = `
            <h4>🎵 Audio & Subtitles</h4>
            <div class="audio-options">
                <label>
                    <input type="radio" name="audio" value="original" checked>
                    Original Audio (${this.getLanguageDisplayName(this.movie.language)})
                </label>
                <label>
                    <input type="radio" name="audio" value="dubbed">
                    Dubbed Audio (${this.getLanguageDisplayName(this.userLanguagePreference)})
                </label>
            </div>
            <div class="subtitle-options">
                <label>
                    <input type="checkbox" name="subtitles" value="en">
                    English Subtitles
                </label>
                <label>
                    <input type="checkbox" name="subtitles" value="es">
                    Spanish Subtitles
                </label>
                <label>
                    <input type="checkbox" name="subtitles" value="fr">
                    French Subtitles
                </label>
            </div>
        `;
        actionsSection.appendChild(mediaOptions);
    }

    attachEventListeners() {

        const languageSelect = this.querySelector("#user-language");
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.userLanguagePreference = e.target.value;
                this.updateLanguageFeatures();
            });
        }

        this.querySelectorAll('input[name="audio"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.handleAudioPreference(e.target.value);
            });
        });

        this.querySelectorAll('input[name="subtitles"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.handleSubtitlePreference(e.target.name, e.target.checked);
            });
        });
    }

    updateLanguageFeatures() {
     
        const languageTrailer = this.querySelector('language-trailer');
        if (languageTrailer) {
            languageTrailer.setAttribute('data-language', this.userLanguagePreference);
        }
        
        this.dispatchEvent(new CustomEvent('languagePreferenceChanged', {
            detail: { language: this.userLanguagePreference },
            bubbles: true
        }));
    }

    handleAudioPreference(audioType) {
        
        console.log(`Audio preference changed to: ${audioType}`);
       
    }

    handleSubtitlePreference(language, enabled) {
       
        console.log(`Subtitle ${language} ${enabled ? 'enabled' : 'disabled'}`);
     
    }

    getLanguageDisplayName(languageCode) {
    
        const languageNames = {
            'en': 'English',
            'es': 'Spanish',
            'fr': 'French',
            'de': 'German',
            'ja': 'Japanese',
            'zh': 'Chinese',
            'hi': 'Hindi',
            'it': 'Italian',
            'pt': 'Portuguese',
            'ru': 'Russian',
            'cn': 'Chinese (Simplified)',
            'da': 'Danish',
            'sv': 'Swedish',
            'nl': 'Dutch',
            'fa': 'Persian',
            'pl': 'Polish',
            'cs': 'Czech',
            'he': 'Hebrew',
            'th': 'Thai',
            'id': 'Indonesian',
            'ro': 'Romanian',
            'ta': 'Tamil',
            'tl': 'Filipino',
            'ar': 'Arabic',
            'tr': 'Turkish',
            'te': 'Telugu',
            'ms': 'Malay',
            'sl': 'Slovenian',
            'ky': 'Kyrgyz',
            'no': 'Norwegian',
            'is': 'Icelandic',
            'hu': 'Hungarian',
            'el': 'Greek',
            'nb': 'Norwegian Bokmål',
            'vi': 'Vietnamese',
            'af': 'Afrikaans'
        };
       
        return languageNames[languageCode] || languageCode?.toUpperCase() || 'Unknown';
    }

    getLanguageFlag(languageCode) {
      
        const languageFlags = {
            'en': '🇺🇸',
            'es': '🇪🇸',
            'fr': '🇫🇷',
            'de': '🇩🇪',
            'ko': '🇰🇷',
            'ja': '🇯🇵',
            'zh': '🇨🇳',
            'hi': '🇮🇳',
            'it': '🇮🇹',
            'pt': '🇵🇹',
            'ru': '🇷🇺',
            'cn': '🇨🇳',
            'da': '🇩🇰',
            'sv': '🇸🇪',
            'nl': '🇳🇱',
            'fa': '🇮🇷',
            'pl': '🇵🇱',
            'cs': '🇨🇿',
            'he': '🇮🇱',
            'th': '🇹🇭',
            'id': '🇮🇩',
            'ro': '🇷🇴',
            'ta': '🇮🇳',
            'tl': '🇵🇭',
            'ar': '🇸🇦',
            'tr': '🇹🇷',
            'te': '🇮🇳',
            'ms': '🇲🇾',
            'sl': '🇸🇮',
            'ky': '🇰🇬',
            'no': '🇳🇴',
            'is': '🇮🇸',
            'hu': '🇭🇺',
            'el': '🇬🇷',
            'nb': '🇳🇴',
            'vi': '🇻🇳',
            'af': '🇿🇦'
        };
       
        return languageFlags[languageCode] || '🌍';
    }

    showError() {
 
        this.innerHTML = `
            <div class="error-message">
                <h2>❌ Error Loading Movie</h2>
                <p>Sorry, we couldn't load the movie details. Please try again.</p>
            </div>
        `;
    }
}

customElements.define('enhanced-movie-details-page', EnhancedMovieDetailsPage);

