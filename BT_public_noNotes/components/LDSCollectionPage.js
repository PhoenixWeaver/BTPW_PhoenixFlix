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

import { LDSItemComponent } from "./LDSItem.js";

export class LDSCollectionPage extends HTMLElement {

    constructor(endpoint, title) {
        super();
        this.endpoint = endpoint;
        this.title = title;   
    }

    async render() {
        const ldsContent = await this.endpoint()
        const ulLDS = this.querySelector("ul");
        ulLDS.innerHTML = "";
        if (ldsContent && ldsContent.length > 0) {
            ldsContent.forEach(lds => {
                const li = document.createElement("li");
                li.appendChild(new LDSItemComponent(lds));
                ulLDS.appendChild(li);
            });    
        } else {
            ulLDS.innerHTML = "<h3>There are no LDS content items</h3>";
        }        
    }

    connectedCallback() {
        const template = document.getElementById("template-collection");
        const content = template.content.cloneNode(true);
        this.appendChild(content);  

        this.render();
    }
}

customElements.define("lds-collection-page", LDSCollectionPage);