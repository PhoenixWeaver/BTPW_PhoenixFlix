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

export class ForgotPasswordPage extends HTMLElement {

    connectedCallback() {

        const template = document.getElementById("template-forgot-password");
        

        const content = template.content.cloneNode(true);
        
      
        this.appendChild(content);  
    }
}

customElements.define("forgot-password-page", ForgotPasswordPage)
