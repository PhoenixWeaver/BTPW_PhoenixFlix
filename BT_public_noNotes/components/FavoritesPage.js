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


import { CombinedFavoritesPage } from "./CombinedFavoritesPage.js";

export class FavoritesPage extends CombinedFavoritesPage {

    constructor() {
        super();
    }
}
customElements.define("favorite-page", FavoritesPage)
