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
import Store from "../services/Store.js";
export class MovieDetailsPage extends HTMLElement {
    id = null    // Movie ID from URL parameters - like @PathVariable in Spring
    movie = null // Movie data object - like a DTO/Entity in Java
    async render() {
    try {
        this.movie = await API.getMovieById(this.id)
    } catch {
   
        return;
    }
    const template = document.getElementById("template-movie-details");
    const content = template.content.cloneNode(true); // Deep clone like Object.clone() in Java
    this.appendChild(content) // Add to DOM tree - like adding to container in Java UI
    this.querySelector("h2").textContent = this.movie.title;           // Set title
    this.querySelector("h3").textContent = this.movie.tagline;         // Set tagline
    this.querySelector("img").src = this.movie.poster_url;             // Set image source
    this.querySelector("#trailer").dataset.url = this.movie.trailer_url; // Set data attribute
    this.querySelector("#overview").textContent = this.movie.overview;  // Set description

    try {
        if (Store.loggedIn) {
            const [favorites, watchlist] = await Promise.all([
                API.getFavorites().catch(() => []),
                API.getWatchlist().catch(() => [])
            ]);

            const containsId = (arr, id) => Array.isArray(arr) && arr.some(item => (typeof item === "object" ? item.id : item) === id);

            const favBtn = this.querySelector("#actions #btnFavorites");
            const wlBtn  = this.querySelector("#actions #btnWatchlist");

            if (favBtn) {
                if (containsId(favorites, this.movie.id)) {
                    favBtn.textContent = "Remove from Favorites";
                    favBtn.classList.add("danger");
                    favBtn.onclick = () => app.removeFromCollection(this.movie.id, "favorite");
                } else {
                    favBtn.textContent = "Add to Favorites";
                    favBtn.onclick = () => app.saveToCollection(this.movie.id, "favorite");
                }
            }
            if (wlBtn) {
                if (containsId(watchlist, this.movie.id)) {
                    wlBtn.textContent = "Remove from Watchlist";
                    wlBtn.classList.add("danger");
                    wlBtn.onclick = () => app.removeFromCollection(this.movie.id, "watchlist");
                } else {
                    wlBtn.textContent = "Add to Watchlist";
                    wlBtn.onclick = () => app.saveToCollection(this.movie.id, "watchlist");
                }
            }
        }
    } catch (e) {
        console.warn("Could not load collection state", e);
    }
    this.querySelector("#metadata").innerHTML = `
        <dt>Release Year</dt>
        <dd>${this.movie.release_year}</dd>
        <dt>Score</dt>
        <dd>${this.movie.score} / 10</dd>
        <dt>Popularity</dt>
        <dd>${this.movie.popularity}</dd>
      `
    const ulGenres = this.querySelector("#genres");
    ulGenres.innerHTML = ""; // Clear existing content - like removeAll() in Java containers
    if (this.movie.genres && Array.isArray(this.movie.genres)) {
        this.movie.genres.forEach(genre => {
            const li = document.createElement("li");    // Create element - like new JLabel() in Java
            li.textContent = genre.name;                // Set text content
            ulGenres.appendChild(li);                   // Add to parent - like container.add() in Java
        });
    } else {
        const li = document.createElement("li");
        li.textContent = "No genres available";
        ulGenres.appendChild(li);
    }
    const favBtnInit = this.querySelector("#actions #btnFavorites");
    const wlBtnInit = this.querySelector("#actions #btnWatchlist");
    if (favBtnInit && !favBtnInit.onclick) {
        favBtnInit.addEventListener("click", () => app.saveToCollection(this.movie.id, "favorite"));
    }
    if (wlBtnInit && !wlBtnInit.onclick) {
        wlBtnInit.addEventListener("click", () => app.saveToCollection(this.movie.id, "watchlist"));
    }

    const ulCast = this.querySelector("#cast");
    ulCast.innerHTML = ""; // Clear existing cast list
    if (this.movie.casting && Array.isArray(this.movie.casting)) {
        this.movie.casting.forEach(actor => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${actor.image_url ?? '/images/generic_actor.jpg'}" alt="Picture of ${actor.last_name}">
            <p>${actor.first_name} ${actor.last_name}</p>
        `;
        ulCast.appendChild(li);
        });
    } else {
        const li = document.createElement("li");
        li.textContent = "No cast information available";
        ulCast.appendChild(li);
    }
    }
    connectedCallback() {
        this.id = this.params[0];  // Get movie ID from URL parameters
        this.render();             // Trigger the rendering process
    }
}
customElements.define("movie-details-page", MovieDetailsPage)
