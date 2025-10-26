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

export class MovieItemComponent extends HTMLElement {

    constructor(movie) {

        super();
        this.movie = movie;
    }

    connectedCallback() {
 
        const url = "/movies/" + this.movie.id;
        
      
        this.innerHTML = `
            <a class="navlink" href="#" 
                onclick="event.preventDefault();app.Router.go('${url}')">
                <article class="media-card">
                    <img src="${this.movie.poster_url}" 
                        alt="${this.movie.title} Poster">
                </article>
                <p><span class="media-type movie">🎥</span><span class="media-title movie">${this.movie.title}</span> (${this.movie.release_year})</p>
            </a>
        `;
    }
}

customElements.define("movie-item", MovieItemComponent)
