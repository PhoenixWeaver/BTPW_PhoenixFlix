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

export const Passkeys = {
    
    register: async (username) => {
        console.log('🚀🚀🚀 UPDATED PASSKEY.JS LOADED - DEVELOPMENT VERSION 🚀🚀🚀');
        console.log('🔐 PASSKEY REGISTER CALLED - Updated version loaded!', username);
        console.log('🔑 JWT Token:', app.Store.jwt ? 'Present' : 'Missing');
        console.log('🔑 JWT Token Value:', app.Store.jwt);
        try {
            
            console.log('🔐 Using LOCAL development URL: /api/passkey/registration-begin');
            const response = await fetch('/api/passkey/registration-begin', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": app.Store.jwt ? `Bearer ${app.Store.jwt}` : ''
                },                
                body: JSON.stringify({username: username})
            });
    
           
            if (!response.ok) {
                const err = await response.json();
                app.showError('Failed to get registration options from server: ' + err.error)
                return;
            }
    
            const options = await response.json();
    
            const attestationResponse = await SimpleWebAuthnBrowser.startRegistration({optionsJSON: options.publicKey});
    
           
            const verificationResponse = await fetch('/api/passkey/registration-end', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": app.Store.jwt ? `Bearer ${app.Store.jwt}` : null
                },
                body: JSON.stringify(attestationResponse)
            });

            const msg = await verificationResponse.json();
            if (verificationResponse.ok) {
                app.showSuccessMessage("Your passkey was saved. You can use it next time to login")
            } else {
                app.showError(msg, false);
            }
        } catch (e) {
            app.showError('Error: ' + e.message, false);
        }        
    },
    
    authenticate: async (email) => {
        try {
            console.log('🔐 Starting passkey authentication for:', email);
            
            const response = await fetch('/api/passkey/authentication-begin', {
                method: 'POST', headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email})
            });
            const options = await response.json();
    
            const assertionResponse = await SimpleWebAuthnBrowser.startAuthentication({optionsJSON: options.publicKey});
    
            const verificationResponse = await fetch('/api/passkey/authentication-end', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(assertionResponse)
            });
            
            const serverResponse = await verificationResponse.json();
            if (serverResponse.success) {
                app.Store.jwt = serverResponse.jwt;
                app.Router.go("/account/")
            } else {
                app.showError(serverResponse.error || "Authentication failed", false);
            }
        } catch (e) {
            console.log(e)
            app.showError('We couldn\'t authenticate you using a Passkey', false);
        }        
    }
}
