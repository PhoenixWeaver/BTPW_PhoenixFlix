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


export class LanguageFilter extends HTMLElement {
    
    constructor() {
        super();
        this.selectedLanguage = 'all';
        this.availableLanguages = [
            { code: 'all', name: 'All Languages', flag: '🌍' },
            { code: 'en', name: 'English', flag: '🇺🇸' },
            { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
            { code: 'es', name: 'Spanish', flag: '🇪🇸' },
            { code: 'it', name: 'Italian', flag: '🇮🇹' }
        ];
    }

    connectedCallback() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.innerHTML = `
            <div class="language-filter">
                <h3>🌍 Filter by Language</h3>
                <div class="language-buttons">
                    ${this.availableLanguages.map(lang => `
                        <button class="language-btn ${this.selectedLanguage === lang.code ? 'active' : ''}" 
                                data-language="${lang.code}">
                            ${lang.flag} ${lang.name}
                        </button>
                    `).join('')}
                </div>
                <div class="language-info">
                    <p>Showing movies in: <span id="selected-lang-name">All Languages</span></p>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        this.querySelectorAll('.language-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const language = e.target.dataset.language;
                this.selectLanguage(language);
            });
        });
    }

    selectLanguage(language) {
        console.log('🌍 LanguageFilter: Language selected:', language);
        this.selectedLanguage = language;
        this.querySelectorAll('.language-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.querySelector(`[data-language="${language}"]`).classList.add('active');
        const langName = this.availableLanguages.find(l => l.code === language)?.name || 'All Languages';
        this.querySelector('#selected-lang-name').textContent = langName;
        console.log('🌍 LanguageFilter: Dispatching language-selected event with:', language);
        this.dispatchEvent(new CustomEvent('language-selected', {
            detail: language,
            bubbles: true
        }));
        console.log('🌍 LanguageFilter: Event dispatched successfully');
    }

    getSelectedLanguage() {
        return this.selectedLanguage;
    }
}

customElements.define('language-filter', LanguageFilter);
