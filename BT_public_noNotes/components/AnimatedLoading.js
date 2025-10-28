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

class AnimatedLoading extends HTMLElement {
    
    constructor() {
        super();
    }
    
    connectedCallback() {
       
        const elements = this.dataset.elements;
        const width = this.dataset.width;
        const height = this.dataset.height;

        for (let i=0; i<elements; i++) {
            const wrapper = document.createElement("div");
            
            wrapper.classList.add("loading-wave");
            
            wrapper.style.width = width;
            wrapper.style.height = height;
            wrapper.style.margin = "10px";
            wrapper.style.display = "inline-block";
            
            this.appendChild(wrapper);
        }
    }
}

customElements.define("animated-loading", AnimatedLoading);
