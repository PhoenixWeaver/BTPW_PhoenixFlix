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


import { API } from "../services/API.js";              // Service layer - like @Service in Spring
import { MovieItemComponent } from "./MovieItem.js";   // Child component - like composition in Java
import { LanguageFilter } from "./LanguageFilter.js"; // 🌍 Language filter component

export class MoviesPage extends HTMLElement {

    async render(query) {
        this.addLanguageFilter();
        const urlParams = new URLSearchParams(location.search);  // Parse ?order=desc&genre=action
        const order = urlParams.get("order") ?? "";             // Get 'order' param or empty string
        const genre = urlParams.get("genre") ?? "";             // Get 'genre' param or empty string
        const movies = await API.searchMovies(query, order, genre);
        const ulMovies = this.querySelector("ul");
        ulMovies.innerHTML = ""; // Clear previous results - like list.clear() in Java
        if (movies && movies.length>0) {
            movies.forEach(movie => {
                const li = document.createElement("li");                    // Create list item - like new JPanel()
                li.appendChild(new MovieItemComponent(movie));              // Add child component with data
                ulMovies.appendChild(li);                                   // Add to parent - like container.add()
            });    
        } else {
           
            ulMovies.innerHTML = "<h3>There are no movies with your search</h3>";
        }        
        if (order) this.querySelector("#order").value = order;   // Set dropdown selection
        if (genre) this.querySelector("#filter").value = genre;  // Set filter selection

    }
    async loadGenres() {

        const genres = await API.getGenres();
        
        const select = this.querySelector("select#filter");
        select.innerHTML = `
            <option>Filter by Genre</option>
        `
        genres.forEach(genre => {
            var option = document.createElement("option");  // Create option - like new ComboBoxItem()
            option.value = genre.id;                        // Set value (what gets submitted)
            option.textContent = genre.name;                // Set display text (what user sees)
            select.appendChild(option)                       // Add to dropdown
        })
    }
    addLanguageFilter() {
        const languageFilter = new LanguageFilter();
        const moviesList = this.querySelector("ul");
        if (moviesList) {
            moviesList.parentNode.insertBefore(languageFilter, moviesList);
        }
        languageFilter.addEventListener('language-selected', (event) => {
            this.filterMoviesByLanguage(event.detail);
        });
    }

    async filterMoviesByLanguage(selectedLanguage) {
        console.log('🌍 Filtering movies by language:', selectedLanguage);
        
        if (selectedLanguage === 'all') {
            const urlParams = new URLSearchParams(location.search);
            const query = urlParams.get('q') || '';
            const order = urlParams.get('order') || '';
            const genre = urlParams.get('genre') || '';
            
            const movies = await API.searchMovies(query, order, genre);
            this.renderMoviesList(movies);
            console.log('✅ Showing all search results');
            return;
        }
        try {
            const languageMovies = await API.getMoviesByLanguage(selectedLanguage);
            console.log(`🎬 Found ${languageMovies.length} movies in ${selectedLanguage}`);
            this.renderMoviesList(languageMovies);
            
            console.log(`✅ Language filter applied: ${languageMovies.length} movies in ${selectedLanguage}`);
            
        } catch (error) {
            console.error('❌ Error fetching movies by language:', error);
        }
    }

    renderMoviesList(movies) {
        const ulMovies = this.querySelector("ul");
        ulMovies.innerHTML = "";
        
        if (movies && movies.length > 0) {
            movies.forEach(movie => {
                const li = document.createElement("li");
                li.appendChild(new MovieItemComponent(movie));
                ulMovies.appendChild(li);
            });
        } else {
            ulMovies.innerHTML = "<h3>No movies found</h3>";
        }
    }
    connectedCallback() {
        const template = document.getElementById("template-movies");
        const content = template.content.cloneNode(true);   // Deep clone template
        this.appendChild(content);                           // Add template to component

        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');  // Get search query from URL
        if (query) {
         
            this.querySelector("h2").textContent = `'${query}' movies`;
            this.render(query);  // Trigger the main render method with search query
        } else {
           
            app.showError();  // Global error handling - like throwing exception in Java
        }

        this.loadGenres();  // Populate the genre filter dropdown
    }
}

customElements.define("movies-page", MoviesPage);
