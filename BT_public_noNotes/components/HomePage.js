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


import { API } from "../services/API.js";           // 🌐 Backend communication service - Vanilla JS wants .js
import { MovieItemComponent } from "./MovieItem.js"; // 🎬 Individual movie component
import { LanguageFilter } from "./LanguageFilter.js"; // 🌍 Language filter component

export class HomePage extends HTMLElement {  // <home-page>

    async render() {
        this.addLanguageFilter();
        this.showJapaneseSection();
        await this.loadJapaneseMovies();
        const topMovies = await API.getTopMovies();
        renderMoviesInList(topMovies, document.querySelector("#top-10 ul"));
        const randomMovies = await API.getRandomMovies();
        renderMoviesInList(randomMovies, document.querySelector("#random ul"));
        
        function renderMoviesInList(movies, ul) {
            ul.innerHTML = "";
            movies.forEach(movie => {
                const li = document.createElement("li");
                li.appendChild(new MovieItemComponent(movie));
                ul.appendChild(li);
            });
        }
    }

    showJapaneseSection() {
        const japaneseSection = this.querySelector("#Japanese");
        const languageSection = this.querySelector("#language");
        
        console.log('🇯🇵 Section elements found:', { japaneseSection, languageSection });
        if (japaneseSection) {
            japaneseSection.style.display = "block";
            console.log('🇯🇵 Shown Japanese section');
        }
        if (languageSection) {
            languageSection.style.display = "none";
            console.log('🌍 Hidden language section');
        }
        console.log('🇯🇵 Showing Japanese section (default)');
    }

    showLanguageSection() {
        const japaneseSection = this.querySelector("#Japanese");
        const languageSection = this.querySelector("#language");
        
        console.log('🌍 Section elements found:', { japaneseSection, languageSection });
        if (japaneseSection) {
            japaneseSection.style.display = "none";
            console.log('🇯🇵 Hidden Japanese section');
        }
        if (languageSection) {
            languageSection.style.display = "block";
            console.log('🌍 Shown language section');
        }
        console.log('🌍 Showing language section (after selection)');
    }
    async loadJapaneseMovies() {
        try {
            console.log('🇯🇵 Loading Japanese movies for language learning...');

            const japaneseMovies = await API.getMoviesByLanguage('ja');
            console.log(`🇯🇵 Found ${japaneseMovies.length} Japanese movies`);

            const japaneseList = this.querySelector("#Japanese ul");
            if (japaneseList) {
                japaneseList.innerHTML = "";
                japaneseMovies.forEach(movie => {
                    const li = document.createElement("li");
                    li.appendChild(new MovieItemComponent(movie));
                    japaneseList.appendChild(li);
                });
                console.log(`🇯🇵 Loaded ${japaneseMovies.length} Japanese movies into language section`);
            }
        } catch (error) {
            console.error('❌ Error loading Japanese movies:', error);
        }
    }
    updateLanguageSectionTitle(selectedLanguage) {
        const languageSection = this.querySelector("#language");
        
        if (languageSection) {
            const title = languageSection.querySelector("h2");
            
            if (title) {
                const languageNames = {
                    'en': 'English',
                    'es': 'Spanish', 
                    'it': 'Italian',
                    'ja': 'Japanese'
                };
                const languageName = languageNames[selectedLanguage] || selectedLanguage.toUpperCase();
                title.textContent = `Learn ${languageName}`;
                console.log(`🌍 Updated section title to: Learn ${languageName}`);
            }
        }
    }

    resetLanguageSectionTitle() {
        const languageSection = this.querySelector("#Japanese");
        
        if (languageSection) {
            const title = languageSection.querySelector("h2");
            
            if (title) {
                title.textContent = "Learn a new language";
                console.log(`🌍 Reset section title to: Learn a new language`);
            }
        }
    }
    addLanguageFilter() {
        const languageFilter = new LanguageFilter();
        const topSection = this.querySelector("#top-10");
        if (topSection) {
            topSection.parentNode.insertBefore(languageFilter, topSection);
        }
        languageFilter.addEventListener('language-selected', (event) => {
            console.log('🏠 HomePage: Received language-selected event:', event.detail);
            this.filterMoviesByLanguage(event.detail);
        });
    }

    async filterMoviesByLanguage(selectedLanguage) {
        console.log('🌍 Filtering movies by language:', selectedLanguage);
        
        if (selectedLanguage === 'all') {
       
            const topMovies = await API.getTopMovies();
            const randomMovies = await API.getRandomMovies();
            this.showJapaneseSection();
            const japaneseList = this.querySelector("#Japanese ul");
            const topList = this.querySelector("#top-10 ul");
            const randomList = this.querySelector("#random ul");
            await this.loadJapaneseMovies();
            topList.innerHTML = "";
            topMovies.forEach(movie => {
                const li = document.createElement("li");
                li.appendChild(new MovieItemComponent(movie));
                topList.appendChild(li);
            });
            
            randomList.innerHTML = "";
            randomMovies.forEach(movie => {
                const li = document.createElement("li");
                li.appendChild(new MovieItemComponent(movie));
                randomList.appendChild(li);
            });
            
            console.log('✅ Showing all movies with Japanese section');
            return;
        }

        try {
            const languageMovies = await API.getMoviesByLanguage(selectedLanguage);
            console.log(`🎬 Found ${languageMovies.length} movies in ${selectedLanguage}`);
            console.log('🎬 Language movies:', languageMovies);
            this.showLanguageSection();
            const languageList = this.querySelector("#language ul");
            const topList = this.querySelector("#top-10 ul");
            const randomList = this.querySelector("#random ul");
            
            console.log('🎬 Found elements:', { languageList, topList, randomList });
            languageList.innerHTML = "";
            topList.innerHTML = "";
            randomList.innerHTML = "";
            const third = Math.ceil(languageMovies.length / 3);
            const languageMovies1 = languageMovies.slice(0, third);
            const topMovies = languageMovies.slice(third, third * 2);
            const randomMovies = languageMovies.slice(third * 2);
            this.updateLanguageSectionTitle(selectedLanguage);
            console.log(`🎬 Adding ${languageMovies1.length} movies to language learning section (${selectedLanguage})`);
            languageMovies1.forEach(movie => {
                const li = document.createElement("li");
                li.appendChild(new MovieItemComponent(movie));
                languageList.appendChild(li);
            });
            console.log(`🎬 Adding ${topMovies.length} movies to top section`);
            topMovies.forEach(movie => {
                const li = document.createElement("li");
                li.appendChild(new MovieItemComponent(movie));
                topList.appendChild(li);
            });
            console.log(`🎬 Adding ${randomMovies.length} movies to random section`);
            randomMovies.forEach(movie => {
                const li = document.createElement("li");
                li.appendChild(new MovieItemComponent(movie));
                randomList.appendChild(li);
            });
            
            console.log(`✅ Language filter applied: ${languageMovies.length} movies in ${selectedLanguage}`);
            
        } catch (error) {
            console.error('❌ Error fetching movies by language:', error);
        }
    }
    
    connectedCallback() {
        
        const template = document.getElementById("template-home");
          
        const content = template.content.cloneNode(true);
        
        this.appendChild(content);

        this.render();
    }
}

customElements.define("home-page", HomePage);
