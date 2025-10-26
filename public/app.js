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

import { HomePage } from "./components/HomePage.js";
import { API } from "./services/API.js";
import './components/AnimatedLoading.js'
import './components/YouTubeEmbed.js'
import './components/EnhancedYouTubeEmbed.js'
import { MovieDetailsPage } from "./components/MovieDetailsPage.js";
import { Router } from "./services/Router.js";
import Store from "./services/Store.js";
import { Passkeys } from "./services/Passkey.js";

import { LDSPage } from "./components/LDSPage.js";
import { LDSDetailsPage } from "./components/LDSDetailsPage.js";
import { GuestbookPage } from "./components/GuestbookPage.js";
import { GuestbookAdminPage } from "./components/GuestbookAdminPage.js";

window.addEventListener("DOMContentLoaded", event => {
    
    app.Router.init();
    
    app.updateSearchPlaceholder();
    
    app.updateActiveNavLink();
    
    app.hideAdminLinkIfNotAdmin();
    
    app.initLoadingWarning();
    
    app.initPWAInstall();
});

window.app = {
    Router,
    Store,
    API,

 showError: (message="There was an error.",goToHome=false) => {
        document.getElementById("alert-modal").showModal();
        document.querySelector("#alert-modal h3").textContent = "Error";
        document.querySelector("#alert-modal p").textContent = message;
        if (goToHome) app.Router.go("/");
    },
    showSuccess: (message="Success!",goToHome=false) => {
        document.getElementById("alert-modal").showModal();
        document.querySelector("#alert-modal h3").textContent = "Success";
        document.querySelector("#alert-modal p").textContent = message;
        if (goToHome) app.Router.go("/");
    },
    closeError: () => {
        document.getElementById("alert-modal").close()
    },
    
    updateSearchPlaceholder: () => {
        const searchInput = document.getElementById("search-input");
        if (!searchInput) return;
        
        const currentPath = location.pathname;
        if (currentPath.startsWith('/lds')) {
            searchInput.placeholder = "Search LDS";
        } else {
            searchInput.placeholder = "Search movies";
        }
    },
    
    updateActiveNavLink: () => {
        const currentPath = location.pathname;
        
        document.querySelectorAll("nav a.navlink").forEach(link => {
            link.classList.remove('active-nav');
        });
        
        document.querySelectorAll("nav a.navlink").forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) {
                link.classList.add('active-nav');
            }
        });
    },
    
    hideAdminLinkIfNotAdmin: () => {
        const adminLink = document.querySelector('.admin-link');
        if (!adminLink) return;
        
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            adminLink.style.display = 'none';
            return;
        }
        
        adminLink.style.display = 'block';
    },
    
    initLoadingWarning: () => {
        const warning = document.getElementById('loading-warning');
        const dismissBtn = document.getElementById('dismiss-warning');
        
        if (!warning || !dismissBtn) return;
        
        const warningDismissed = localStorage.getItem('loading-warning-dismissed');
        if (warningDismissed) {
            warning.classList.add('hidden');
            return;
        }
        
        dismissBtn.addEventListener('click', () => {
            warning.classList.add('hidden');
            localStorage.setItem('loading-warning-dismissed', 'true');
        });
        
        setTimeout(() => {
            if (!warning.classList.contains('hidden')) {
                warning.classList.add('hidden');
            }
        }, 10000);
    },
    
    search: (event) => {
        event.preventDefault();
        console.log('🔍 Search function called');
        
        const searchInput = document.querySelector("input[type=search]") || 
                           document.getElementById("search-input") || 
                           document.querySelector("input[name=search]");
        
        if (!searchInput) {
            console.error('❌ Search input not found');
            return;
        }
        
        const q = searchInput.value.trim();
        console.log('🔍 Search query:', q);
        
        if (!q) {
            console.warn('⚠️ Empty search query');
            return;
        }
        
        const order = "score";
        const genre = "";

        const currentPath = location.pathname;
        console.log('📍 Current path:', currentPath);
        
        if (currentPath.startsWith('/lds')) {
            console.log('🎯 Routing to LDS search');
            app.Router.go(`/lds?q=${q}&order=${order}&lds=${genre}`);
        } else {
            console.log('🎯 Routing to Movies search');
            app.Router.go(`/movies?q=${q}&order=${order}&genre=${genre}`);
        }
    },

    searchOrderChange: (order) => {
        const urlParams = new URLSearchParams(window.location.search);
        const q = urlParams.get("q");
        const genre = urlParams.get("genre") ?? "";
        
        const currentPath = location.pathname;
        if (currentPath.startsWith('/lds')) {
            app.Router.go(`/lds?q=${q}&order=${order}&lds=${genre}`);
        } else {
            app.Router.go(`/movies?q=${q}&order=${order}&genre=${genre}`);
        }
    },

    searchFilterChange: (genre) => {
        const urlParams = new URLSearchParams(window.location.search);
        const q = urlParams.get("q");
        const order = urlParams.get("order") ?? "";

        const currentPath = location.pathname;
        if (currentPath.startsWith('/lds')) {
            app.Router.go(`/lds?q=${q}&order=${order}&lds=${genre}`);
        } else {
            app.Router.go(`/movies?q=${q}&order=${order}&genre=${genre}`);
        }
    },

    register: async (event) => {
        event.preventDefault();
        const name = document.getElementById("register-name").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const passwordConfirmation = document.getElementById("register-password-confirmation").value;

        
        const errors = [];
        if (name.length < 4) errors.push("Enter your complete name");
        if (password.length < 7) errors.push("Enter a password with at least 7 characters");
        if (email.length < 4) errors.push("Enter your complete email");
        if (password!=passwordConfirmation) errors.push("Passwords don't match");

        if (errors.length==0) {
            const response = await API.register(name, email, password);
            if (response.success) {
                app.Store.jwt = response.jwt;
                app.Router.go("/account/");
            } else {
                app.showError(response.message);
            }
        } else {
            app.showError(errors.join(". "))
        }
    },
    
    login: async (event) => {
        event.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        const errors = [];
        if (password.length < 7) errors.push("Enter a password with at least 7 characters");
        if (email.length < 4) errors.push("Enter your complete email");

        if (errors.length==0) {
            const response = await API.login(email, password);
            if (response.success) {
                app.Store.jwt = response.jwt;
                if (response.email_verified === false) {
                    app.showEmailVerificationWarning();
                }
                app.Router.go("/account/");
            } else {
                app.showError(response.message);
            }
        } else {
            app.showError(errors.join(". "))
        }
    },
    
    logout: () => {
        Store.jwt = null;
        app.Router.go("/");
    },

    showEmailVerificationWarning: () => {
        const statusDiv = document.getElementById("email-verification-status");
        if (statusDiv) {
            statusDiv.style.display = "block";
        }
    },

    resendVerification: async () => {
        try {
            const response = await API.resendVerification();
            if (response.success) {
                app.showSuccess("Verification email sent! Please check your inbox.");
            } else {
                app.showError(response.message);
            }
        } catch (error) {
            app.showError("Failed to send verification email. Please try again.");
        }
    },

    showForgotPassword: () => {
        app.Router.go("/account/forgot-password");
    },

    forgotPassword: async (event) => {
        event.preventDefault();
        const email = document.getElementById("forgot-email").value;

        const errors = [];
        if (email.length < 4) errors.push("Enter your complete email");

        if (errors.length == 0) {
            const response = await API.forgotPassword(email);
            if (response.success) {
                app.showSuccess("If the email exists, a password reset link has been sent. Please check your inbox.");
                app.Router.go("/account/login");
            } else {
                app.showError(response.message);
            }
        } else {
            app.showError(errors.join(". "));
        }
    },

    resetPassword: async (event) => {
        event.preventDefault();
        const newPassword = document.getElementById("reset-password").value;
        const confirmPassword = document.getElementById("reset-password-confirm").value;
        
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        const errors = [];
        if (newPassword.length < 7) errors.push("Password must be at least 7 characters");
        if (newPassword !== confirmPassword) errors.push("Passwords don't match");
        if (!token) errors.push("Invalid reset token");

        if (errors.length == 0) {
            const response = await API.resetPassword(token, newPassword);
            if (response.success) {
                app.showSuccess("Password reset successfully! Please log in with your new password.");
                app.Router.go("/account/login");
            } else {
                app.showError(response.message);
            }
        } else {
            app.showError(errors.join(". "));
        }
    },

    saveToCollection: async (movie_id, collection) => {
        if (app.Store.loggedIn) {
            try {
                const response = await API.saveToCollection(movie_id, collection);
                if (response.success) {
                    switch(collection) {
                        case "favorite":
                            app.Router.go("/account/favorites")
                        break;
                        case "watchlist":
                            app.Router.go("/account/watchlist")
                    }
                } else {
                    app.showError("We couldn't save the movie.")
                }
            } catch (e) {
                console.log(e)
            }
        } else {
            app.Router.go("/account/");
        }
    },

    removeFromCollection: async (movie_id, collection) => {
        if (app.Store.loggedIn) {
            try {
                const response = await API.removeFromCollection(movie_id, collection);
                if (response.success) {
                    switch(collection) {
                        case "favorite":
                            app.Router.go("/account/favorites")
                        break;
                        case "watchlist":
                            app.Router.go("/account/watchlist")
                    }
                } else {
                    app.showError("We couldn't remove the movie.")
                }
            } catch (e) {
                console.log(e)
            }
        } else {
            app.Router.go("/account/");
        }
    },

    saveToCollectionLDS: async (lds_id, collection) => {
        console.log('🔐 Checking login status:', app.Store.loggedIn);
        console.log('🔑 JWT token:', app.Store.jwt ? 'Present' : 'Missing');
        
        if (app.Store.loggedIn) {
            try {
                console.log('📤 Sending LDS save request:', { lds_id, collection });
                const response = await API.saveToCollectionLDS(lds_id, collection);
                console.log('📥 Server response:', response);
                
                if (response && response.success) {
                    console.log('✅ Successfully saved LDS content');
                    switch(collection) {
                        case "favorite":
                            setTimeout(() => app.Router.go("/account/favorites"), 30)
                        break;
                        case "watchlist":
                            setTimeout(() => app.Router.go("/account/watchlist"), 30)
                    }
                } else {
                    console.error('❌ Server returned error:', response);
                    app.showError("We couldn't save the LDS content.")
                }
            } catch (e) {
                console.error('💥 Exception occurred:', e);
                app.showError("Network error occurred. Please try again.");
            }
        } else {
            console.log('🚫 User not logged in, redirecting to login');
            app.Router.go("/account/");
        }
    },

    removeFromCollectionLDS: async (lds_id, collection) => {
        if (app.Store.loggedIn) {
            try {
                const response = await API.removeFromCollectionLDS(lds_id, collection);
                if (response.success) {
                    switch(collection) {
                        case "favorite":
                            setTimeout(() => app.Router.go("/account/favorites"), 30)
                        break;
                        case "watchlist":
                            setTimeout(() => app.Router.go("/account/watchlist"), 30)
                    }
                } else {
                    app.showError("We couldn't remove the LDS content.")
                }
            } catch (e) {
                console.error(e)
                app.showError("Network error occurred. Please try again.")
            }
        } else {
            app.Router.go("/account/");
        }
    },

     addNewPasskey: async () => {
        const username = "testuser";
        await Passkeys.register(username);
    },
    
    loginWithPasskey: async () => {
        const username = document.getElementById("login-email").value;
        if (username.length < 4) {
            app.showError("To use a passkey, enter your email address first")
        } else {
            await Passkeys.authenticate(username);
        }
    },

    deferredPrompt: null,
    
    initPWAInstall: () => {
        console.log('Initializing PWA install functionality...');
        
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('PWA install prompt available');
            e.preventDefault();
            app.deferredPrompt = e;
            
            app.showInstallBanner();
            
            app.makeLogoClickable();
        });
        
        window.addEventListener('appinstalled', (e) => {
            console.log('PWA was installed');
            app.hideInstallBanner();
            app.hideInstallHint();
            app.showSuccessMessage('<span class="phoenix-text">Phoenix</span><span class="flix-text">Flix</span> app installed successfully! 🎉');
        });
        
        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('App is already installed');
            app.hideInstallBanner();
            app.hideInstallHint();
        } else {
            console.log('App not installed, checking for install capability...');
            setTimeout(() => {
                app.showInstallHint();
            }, 2000);
            
            setTimeout(() => {
                if (!app.deferredPrompt) {
                    console.log('No install prompt detected, showing test banner');
                    app.showInstallBanner();
                    app.makeLogoClickable();
                }
            }, 3000);
        }
    },
    
    showInstallBanner: () => {
        console.log('Showing install banner...');
        let banner = document.getElementById('install-banner');
        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'install-banner';
            banner.innerHTML = `
                <div class="install-banner-content">
                    <div class="install-banner-icon">📱</div>
                    <div class="install-banner-text">
                        <strong>Install <span class="phoenix-text">Phoenix</span><span class="flix-text">Flix</span> App!</strong>
                        <p>Get quick access and a better experience</p>
                    </div>
                    <button class="install-banner-btn" onclick="app.installApp()">Install</button>
                    <button class="install-banner-close" onclick="app.hideInstallBanner()">×</button>
                </div>
            `;
            document.body.appendChild(banner);
            console.log('Install banner created and added to DOM');
        }
        banner.style.display = 'block';
        console.log('Install banner displayed');
    },
    
    hideInstallBanner: () => {
        const banner = document.getElementById('install-banner');
        if (banner) {
            banner.style.display = 'none';
        }
    },

    showInstallHint: () => {
        const hint = document.getElementById('install-hint');
        if (hint) {
            hint.style.display = 'block';
            hint.addEventListener('click', app.installApp);
            console.log('Install hint shown and made clickable');
        }
    },

    hideInstallHint: () => {
        const hint = document.getElementById('install-hint');
        if (hint) {
            hint.style.display = 'none';
            console.log('Install hint hidden');
        }
    },

    makeLogoClickable: () => {
        const logo = document.querySelector('header h1 img');
        if (logo) {
            logo.style.cursor = 'pointer';
            logo.title = 'Click to install <span class="phoenix-text">Phoenix</span><span class="flix-text">Flix</span> app';
            logo.addEventListener('click', app.installApp);
        }
    },
    
    installApp: async () => {
        console.log('Install app clicked, deferredPrompt:', app.deferredPrompt);
        if (app.deferredPrompt) {
            app.deferredPrompt.prompt();
            
            const { outcome } = await app.deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            
            app.deferredPrompt = null;
            
            if (outcome === 'accepted') {
                app.hideInstallBanner();
            }
        } else {
            console.log('No deferred prompt available, showing manual install instructions');
            app.showManualInstallInstructions();
        }
    },
    
    showManualInstallInstructions: () => {
        const instructionsDiv = document.createElement('div');
        instructionsDiv.className = 'manual-install-instructions';
        instructionsDiv.innerHTML = `
            <div class="install-instructions-content">
                <h3>📱 Install <span class="phoenix-text">Phoenix</span><span class="flix-text">Flix</span> App</h3>
                <p><strong>On Mobile:</strong></p>
                <ul>
                    <li>Tap the <strong>Share</strong> button in your browser</li>
                    <li>Select <strong>"Add to Home Screen"</strong></li>
                </ul>
                <p><strong>On Desktop:</strong></p>
                <ul>
                    <li>Click the <strong>Install</strong> icon in your browser's address bar</li>
                    <li>Or go to <strong>Menu → Install App</strong></li>
                </ul>
                <button onclick="this.parentElement.parentElement.remove()">Got it!</button>
            </div>
        `;
        instructionsDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            color: #333;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10001;
            max-width: 400px;
            width: 90%;
        `;
        document.body.appendChild(instructionsDiv);
    },

    showSuccessMessage: (message) => {
        document.getElementById("alert-modal").showModal();
        document.querySelector("#alert-modal h3").textContent = "Success";
        document.querySelector("#alert-modal p").textContent = message;
    },        
}
