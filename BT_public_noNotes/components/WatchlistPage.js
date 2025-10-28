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


import { CombinedWatchlistPage } from "./CombinedWatchlistPage.js";

export class WatchlistPage extends CombinedWatchlistPage {
    constructor() {
        super();
    }
}

customElements.define("watchlist-page", WatchlistPage)