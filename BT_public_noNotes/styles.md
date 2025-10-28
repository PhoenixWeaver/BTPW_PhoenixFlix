/* ===============================================================================
   📚 STYLES.CSS - COMPREHENSIVE STYLE ORGANIZATION
   ================================================================================
   
   This CSS file is organized by JavaScript components and functionality:
   
   SECTION : app.js - Loading Warning Modal
   SECTION : index.html - Header Navigation  
   SECTION : index.html - Main Content Area
   SECTION : HomePage.js - Movie Lists Display
   SECTION : LDSPage.js - LDS Content Lists
   SECTION : LanguageFilter.js - Language Selection
   SECTION : YouTubeEmbed.js - Video Embedding
   SECTION : index.html - Footer
   SECTION : app.js - Modal Dialogs
   SECTION : MovieDetailsPage.js - Movie Details
   SECTION : Global - Responsive Design
   SECTION : LDSPage.js - LDS Content Cards
   SECTION : LDSDetailsPage.js - LDS Detail Page Layout
   SECTION : ManifestoPage.js - Manifesto Title Logo
   SECTION : HomePage.js - Teaser Section Logo
   SECTION : GuestbookAdminPage.js - Message Type Badges
   SECTION : AccountPage.js - Access Denied Page
   SECTION : Global - PhoenixFlix Brand Styling
   SECTION : HomePage.js - Welcome Header Box
   SECTION : HomePage.js - Phoenix Manifesto Teaser
   SECTION : ManifestoPage.js - Phoenix Letter Standalone
   SECTION : ManifestoPage.js - Phoenix Manifesto Page
   SECTION : LDSDetailsPage.js - LDS Content Disclaimer
   SECTION : HomePage.js - TV and Bulletin Container
   SECTION : HomePage.js - TV Frame Styles
   SECTION : HomePage.js - Status Board Styles
   SECTION : Global - Responsive Layout
   SECTION : Global - PhoenixFlix Logo Image Styling
   SECTION : app.js - Install Hint Styles
   SECTION : app.js - PWA Install Banner Styles
   SECTION : GuestbookPage.js - Guestbook Entries Section
   SECTION : GuestbookPage.js - Main Guestbook Container
   SECTION : GuestbookPage.js - Message Type Selection Styles
   SECTION : GuestbookPage.js - Phoenix Form Styles
   SECTION : GuestbookAdminPage.js - Guestbook Admin Panel Styles
   
   Each section includes:
   - STUB: Specific functionality within the section
   - RELATION: Connected JavaScript files and components
   - KEYPOINT: Main purpose of the styling
   - IMPORTANT: Critical information about the styles
   
   ================================================================================ */

/* ========================================== */
/* ⏳ LOADING WARNING STYLES */
/* ========================================== */
/* ===============================================================================
   SECTION : app.js - Loading Warning Modal
   ================================================================================ */
/* STUB : Warning overlay and dismissal */
/* RELATION: → app.js (dismissWarning function), → index.html (loading-warning) */
/* KEYPOINT: Fixed overlay for database loading delays */
/* IMPORTANT: User experience enhancement for slow initial loads */
.loading-warning {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    backdrop-filter: blur(5px);
}

.warning-content {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    border: 2px solid #ff6b35;
    border-radius: 15px;
    padding: 2rem;
    max-width: 500px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
    animation: warningPulse 2s ease-in-out infinite;
}

.warning-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    animation: spin 2s linear infinite;
}

.warning-text h3 {
    color: #ff6b35;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-family: 'Comic Neue', cursive;
    font-weight: 700;
}

.warning-text p {
    color: #ffffff;
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-family: 'Comic Neue', cursive;
}

.dismiss-btn {
    background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Comic Neue', cursive;
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
}

.dismiss-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 53, 0.6);
    background: linear-gradient(135deg, #f7931e 0%, #ff6b35 100%);
}

.dismiss-btn:active {
    transform: translateY(0);
}

@keyframes warningPulse {
    0%, 100% {
        transform: scale(1);
        box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
    }
    50% {
        transform: scale(1.02);
        box-shadow: 0 15px 40px rgba(255, 107, 53, 0.5);
    }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Hide warning when dismissed */
.loading-warning.hidden {
    display: none;
}

/* Mobile responsive */
@media (max-width: 768px) {
    .warning-content {
        margin: 1rem;
        padding: 1.5rem;
        max-width: 90%;
    }
    
    .warning-icon {
        font-size: 2.5rem;
    }
    
    .warning-text h3 {
        font-size: 1.3rem;
    }
    
    .warning-text p {
        font-size: 1rem;
    }
    
    .dismiss-btn {
        padding: 0.7rem 1.5rem;
        font-size: 0.9rem;
    }
}

:root {
    --background-surface: #171D1A;
    --primaryColor: #232926;
    --secondaryColor: #838981;
    --textColor: #E1E1E1;
    --highlightColor: #56bce8;
    --color5: #DDB892;
    --color6: #0AC189;
    --highlight2: #FBF2C6;
}

@view-transition {
    navigation: auto;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
}

body {
    background-color: var(--background-surface);
    color: #fff;
}

a {
    text-decoration: none;
    color: var(--textColor);
}

/* ===============================================================================
   SECTION : index.html - Header Navigation
   ================================================================================ */
/* STUB : Main header layout and navigation */
/* RELATION: → index.html (header), → Router.js (navigation), → app.js (search) */
/* KEYPOINT: Main navigation header with logo, menu, and search */
/* IMPORTANT: Primary user interface for navigation and content discovery */
/* Header */
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: var(--primaryColor);
}

header p {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--highlightColor);
}

nav ul {
    display: flex;
    list-style: none;
    gap: 1.5rem;
    align-items: center;
    flex-wrap: nowrap;
}

nav a {
    color: var(--secondaryColor);
    text-decoration: none;
    font-size: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    gap: 0.3rem;
    white-space: nowrap;
}

nav a:hover {
    color: var(--highlightColor);
}

/* Active nav link highlighting */
nav a.active-nav {
    color: var(--highlightColor);
    font-weight: bold;
    text-shadow: 0 0 10px var(--highlightColor);
    border-bottom: 2px solid var(--highlightColor);
    padding-bottom: 2px;
}

/* Collection page title (Favorites/Watchlist) */
.collection-page-title {
    text-align: center;
    color: var(--highlightColor);
    font-size: 2rem;
    margin: 2rem 0;
    text-shadow: 0 0 15px var(--highlightColor);
    font-family: 'Permanent Marker', cursive;
}

header div {
    display: flex;
    gap: 1rem;
}

input[type=search] {
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    background-color: white;
    color: var(--primaryColor);
}

input[type=search]::placeholder {
    color: var(--secondaryColor)
}

/* ===============================================================================
   SECTION : index.html - Main Content Area
   ================================================================================ */
/* STUB : Main content container and basic typography */
/* RELATION: → index.html (main), → All page templates */
/* KEYPOINT: Dynamic content container where all page templates are rendered */
/* IMPORTANT: Main application area that changes based on current route */
/* Main Content */
main {
    padding: 2rem;
}

section {
    margin-bottom: 2rem;
}

h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--secondaryColor);
}

h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--secondaryColor);
}

ul {
    list-style: none;
    padding: 0;
}

/* ===============================================================================
   SECTION : HomePage.js - Movie Lists Display
   ================================================================================ */
/* STUB : Vertical scrolling movie lists */
/* RELATION: → HomePage.js (movie sections), → MovieItem.js (movie cards) */
/* KEYPOINT: Horizontal scrolling movie lists with custom scrollbars */
/* IMPORTANT: Core movie display functionality for homepage */
/* Movie Lists */
.vertical-scroll ul {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding-bottom: 1rem;
    list-style: none;
    scrollbar-width: thin; /* Firefox */
    scrollbar-color: rgba(100, 100, 100, 0.5) var(--primaryColor); /* Firefox: thumb color, track color */
}

/* ===============================================================================
   SECTION : LDSPage.js - LDS Content Lists
   ================================================================================ */
/* STUB : Horizontal scrolling LDS content */
/* RELATION: → LDSPage.js (LDS sections), → LDSItem.js (LDS cards) */
/* KEYPOINT: Horizontal scrolling LDS content with custom scrollbars */
/* IMPORTANT: LDS content display functionality */
/* LDS Content Lists - Horizontal Scrolling */
.horizontal-scroll-container {
    width: 100%;
    overflow: hidden;
}

.horizontal-scroll-list {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding-bottom: 1rem;
    list-style: none;
    scrollbar-width: thin; /* Firefox */
    scrollbar-color: rgba(100, 100, 100, 0.5) var(--primaryColor); /* Firefox: thumb color, track color */
}

/* WebKit browsers (Chrome, Safari) for LDS lists */
.horizontal-scroll-list::-webkit-scrollbar {
    height: 8px; /* Use height for horizontal scrollbar */
}

.horizontal-scroll-list::-webkit-scrollbar-track {
    background: var(--primaryColor); /* Match your theme */
    border-radius: 4px;
}

.horizontal-scroll-list::-webkit-scrollbar-thumb {
    background-color: rgba(100, 100, 100, 0.5); /* Semi-transparent gray */
    border-radius: 4px;
}

.horizontal-scroll-list::-webkit-scrollbar-thumb:hover {
    background-color: rgba(150, 150, 150, 0.7); /* Lighter on hover */
}

.horizontal-scroll-list li {
    flex: 0 0 auto;
    width: 200px !important;
    text-align: center;
    min-width: 200px;
    max-width: 200px;
}

lds-item {
    width: 200px;
    display: block;
}

lds-item img {
    width: 200px !important;
    height: 300px !important;
    object-fit: cover;
    border-radius: 8px;
    transition: transform 0.3s ease;
    display: block;
}

lds-item img:hover {
    transform: scale(1.05);
}

/* LDS Section Styling for Horizontal Scroll */
.lds-section {
    margin-bottom: 2rem;
}

.lds-section h2 {
    color: var(--highlightColor);
    font-size: 1.5rem;
    margin-bottom: 1rem;
    padding-bottom: 0.3rem;
    border-bottom: 2px solid var(--highlightColor);
}

/* Ensure LDS items have proper spacing and hover effects */
lds-item article {
    background: var(--primaryColor);
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 200px !important;
    height: auto;
}

lds-item article:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

lds-item p {
    padding: 0.5rem;
    margin: 0;
    font-size: 0.9rem;
    color: var(--textColor);
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Interactive Rating Stars */
.rating-star {
    cursor: pointer;
    font-size: 1.5rem;
    margin: 0 3px;
    transition: transform 0.2s ease, color 0.2s ease;
    display: inline-block;
    user-select: none;
}

.rating-star:hover {
    transform: scale(1.3);
}

.star-filled {
    color: #ffd700 !important; /* Gold color for filled stars */
}

.star-empty {
    color: #666 !important; /* Gray color for empty stars */
}

.rating-star:hover {
    color: #ffd700 !important; /* Gold on hover */
}

/* WebKit browsers (Chrome, Safari) */
.vertical-scroll ul::-webkit-scrollbar {
    height: 8px; /* Use height for horizontal scrollbar */
}

.vertical-scroll ul::-webkit-scrollbar-track {
    background: var(--primaryColor); /* Match your theme */
    border-radius: 4px;
}

.vertical-scroll ul::-webkit-scrollbar-thumb {
    background-color: rgba(100, 100, 100, 0.5); /* Semi-transparent gray */
    border-radius: 4px;
}

.vertical-scroll ul::-webkit-scrollbar-thumb:hover {
    background-color: rgba(150, 150, 150, 0.7); /* Lighter on hover */
}

.vertical-scroll li {
    flex: 0 0 auto;
    width: 150px;
    text-align: center;
}

movie-item {
    width: 150px;
    display: block;
}

movie-item img {
    width: 100%;
    height: 220px;
    background: linear-gradient(
        90deg,
        #555 0%,
        #666 50%,
        #555 100%
    );
    background-size: 200% 100%;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    animation: loading-wave 1.5s infinite ease-in-out;
}

movie-item {
    text-align: center;
}

#movies-result {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

/* Waving Effect Animation */
.loading-wave {
    background: linear-gradient(
        90deg,
        #555 0%,
        #999 50%,
        #555 100%
    );
    background-size: 200% 100%;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    animation: loading-wave 1.5s infinite ease-in-out;
}


@keyframes loading-wave {
    0% {
        background-position: 0% 50%;
    }
    100% {
        background-position: 200% 50%;
    }
}

.vertical-scroll  p {
    font-size: 0.9rem;
    color: var(--textColor);
}

.vertical-scroll img:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
}

#search-header {
    display: flex;
    justify-content: space-between;
    align-items: center;    
}

#filters {
    justify-content: flex-end; 
    gap: 1rem;
    align-items: center;     
}

select {
    padding: 5px;
    border: 1px solid var(--color6);
    border-radius: 10px;
    background-color: var(--textColor);
    margin-right: 10px;
}

dl {
    margin: 10%;
    padding: 0;
    width: 80%;
}

dt {
    font-size: 0.5em;
    margin-top: 10px;
    color: var(--secondaryColor);
}

dd {
    font-size: 1em;
    color: var(--textColor);    
}

/* ===============================================================================
   SECTION : index.html - Footer
   ================================================================================ */
/* STUB : Site footer with branding and links */
/* RELATION: → index.html (footer), → GitHub repository */
/* KEYPOINT: Application footer with PhoenixFlix branding */
/* IMPORTANT: Site footer with external links and copyright */
/* Footer */
footer {
    padding: 1rem;
    background-color: var(--primaryColor);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
}

footer p {
    font-size: 0.9rem;
    color: var(--highlightColor);
    align-self: flex-end;
}

/* Footer */
footer {
    background-color: var(--primaryColor);
    border-top: 2px solid #666666;
    padding: 1rem 2rem 1rem;
    position: relative;
    overflow: hidden;
}

footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #ff6b35, #ffd700, #ff6b35, transparent);
    animation: footer-glow 3s ease-in-out infinite alternate;
}

.footer-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
}

.footer-brand {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.footer-logo-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #ff6b35;
    box-shadow: 0 0 15px rgba(255, 107, 53, 0.4);
    transition: all 0.3s ease;
}

.footer-logo-img:hover {
    transform: scale(1.05) rotate(3deg);
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.6);
}

.footer-brand-text {
    flex: 1;
}

.footer-title {
    font-size: 1.8rem;
    margin: 0 0 0.3rem 0;
    font-family: 'Permanent Marker', cursive;
    text-shadow: 0 0 10px rgba(255, 107, 53, 0.4);
}

/* Ensure footer title PhoenixFlix branding matches teaser */
.footer-title .phoenix-text {
    color: #ff0000 !important;
    font-weight: bold !important;
    text-shadow: 0 0 10px rgba(255, 0, 0, 0.4) !important;
}

.footer-title .flix-text {
    color: #1e3a8a !important;
    font-weight: bold !important;
    font-style: italic !important;
    text-shadow: 0 0 10px rgba(30, 58, 138, 0.4) !important;
}

.footer-tagline {
    font-size: 0.9rem;
    color: #ffd700;
    font-style: italic;
    margin: 0;
    text-shadow: 0 0 8px rgba(255, 215, 0, 0.3);
}

.footer-links {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
}

.footer-section {
    display: flex;
    align-items: center;
}

.footer-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #ffffff;
    text-decoration: none;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    transition: all 0.3s ease;
    border: 1px solid transparent;
    background: rgba(255, 107, 53, 0.1);
}

.footer-link:hover {
    background: rgba(255, 107, 53, 0.2);
    border-color: #ff6b35;
    transform: translateX(3px);
    box-shadow: 0 0 12px rgba(255, 107, 53, 0.3);
}

.link-icon {
    font-size: 1.1rem;
    animation: bounce 2s infinite;
}

.copyright-text {
    color: #cccccc;
    font-size: 0.85rem;
    margin: 0.2rem 0;
    line-height: 1.3;
}

.copyright-text .phoenix-text {
    color: #ff0000 !important;
    font-weight: bold !important;
    text-shadow: 0 0 8px rgba(255, 0, 0, 0.4) !important;
}

.copyright-text .flix-text {
    color: #1e3a8a !important;
    font-weight: bold !important;
    font-style: italic !important;
    text-shadow: 0 0 8px rgba(30, 58, 138, 0.4) !important;
}

/* Footer Disclaimer */
.footer-disclaimer {
    margin-top: 1rem;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(255, 107, 53, 0.2);
    text-align: center;
    width: 100%;
    position: relative;
    z-index: 2;
}

.handwritten-text {
    font-family: 'Caveat', cursive;
    font-size: 1rem;
    color: #ffd700;
    margin: 0.3rem 0;
    text-shadow: 0 0 8px rgba(255, 215, 0, 0.3);
    animation: handwritten-float 4s ease-in-out infinite alternate;
}

/* Animated Flames */
.footer-flames {
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.8rem;
    z-index: 1;
}

.flame {
    font-size: 1.2rem;
    animation: flame-flicker 2s ease-in-out infinite alternate;
    opacity: 0.6;
}

.flame-1 {
    animation-delay: 0s;
}

.flame-2 {
    animation-delay: 0.5s;
}

.flame-3 {
    animation-delay: 1s;
}

/* Animations */
@keyframes footer-glow {
    0% {
        opacity: 0.5;
        transform: scaleX(0.8);
    }
    100% {
        opacity: 1;
        transform: scaleX(1);
    }
}

@keyframes handwritten-float {
    0% {
        transform: translateY(0px);
    }
    100% {
        transform: translateY(-3px);
    }
}

@keyframes flame-flicker {
    0% {
        transform: scale(1) rotate(-2deg);
        opacity: 0.7;
    }
    100% {
        transform: scale(1.1) rotate(2deg);
        opacity: 1;
    }
}

.handwritten-text {
    font-family: 'Caveat', 'Kalam', cursive;
    font-size: 1.1rem;
    font-weight: 400;
    color: #ccc;
    margin: 0.3rem 0;
    line-height: 1.4;
    letter-spacing: 0.3px;
    transform: rotate(-0.3deg);
    opacity: 0.8;
    transition: opacity 0.3s ease;
}

.handwritten-text:hover {
    opacity: 1;
    transform: rotate(-0.2deg);
}

.handwritten-text:nth-child(2) {
    transform: rotate(0.2deg);
    margin-left: 1rem;
}

.handwritten-text:nth-child(2):hover {
    transform: rotate(0.3deg);
}

/* ===============================================================================
   SECTION : app.js - Modal Dialogs
   ================================================================================ */
/* STUB : Error modal and dialog styling */
/* RELATION: → app.js (closeError function), → index.html (alert-modal) */
/* KEYPOINT: Modal dialogs for error handling and user feedback */
/* IMPORTANT: User-friendly error display and recovery */
/* Modal Styles */
dialog {
    background-color: var(--background-surface);
    color: var(--textColor);
    border: var(--highlightColor) solid 1px;
    border-radius: 10px;
    padding: 1.5rem;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

dialog::backdrop {
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
}

dialog h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

dialog p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
}

dialog button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 2px; /* Round the corners of the buttons */
    cursor: pointer;
    font-size: 1rem;
}

dialog .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    color: var(--highlight2);
    font-size: 1.2rem;
}

dialog .action-btn {
    background-color: var(--color6);
    color: var(--primaryColor);
    margin-right: 1rem;
}

dialog .cancel-btn {
    background-color: #555;
    color: #fff;
}

dialog button:hover {
    opacity: 0.9;
}


/* Buttons to trigger modals */
button {
    padding: 0.5rem 1rem;
    background-color: var(--color6);
    color: var(--primaryColor);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 0.5rem;
}

button:hover {
    opacity: 0.9;
}


/* ===============================================================================
   SECTION : MovieDetailsPage.js - Movie Details
   ================================================================================ */
/* STUB : Movie detail page styling */
/* RELATION: → MovieDetailsPage.js (detail layout), → YouTubeEmbed.js (trailer) */
/* KEYPOINT: Comprehensive movie detail page styling */
/* IMPORTANT: Detailed movie view with metadata and actions */
/* Movie Details */
#movie h3 {
    font-weight: normal;
    margin-top: -10px;
    font-size: 1.1em;
}

#movie header {
    border-radius: 10px;
}

#movie header img {
    height: 300px;
}

#movie #genres {
    display: flex;
    margin-top: 10px;
}

#movie header {
    display: flex;
    gap: 10px;
}

#movie header #actions {
    display: flex;
    flex-direction: column;
    align-items: center; 
}
#movie header #actions button {
    width: 170px;
}

#movie #trailer {
    flex: 3;
    margin-top: 4px;
    min-height: 300px;
    border-radius: 8px;
    overflow: hidden;
}

/* ===============================================================================
   SECTION : YouTubeEmbed.js - Video Embedding
   ================================================================================ */
/* STUB : YouTube iframe styling */
/* RELATION: → YouTubeEmbed.js (iframe generation), → MovieDetailsPage.js (trailer) */
/* KEYPOINT: Responsive YouTube video embedding */
/* IMPORTANT: Video player styling for movie trailers */
/* Enhanced YouTube Embed specific styling */
enhanced-youtube-embed {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 300px;
}

/* Basic YouTube Embed styling */
youtube-embed {
    display: block;
    width: 100%;
    min-height: 300px;
}

/* Mobile responsive for YouTube embeds */
@media (max-width: 768px) {
    youtube-embed,
    enhanced-youtube-embed {
        min-height: 200px;
    }
    
    youtube-embed iframe,
    enhanced-youtube-embed iframe {
        height: 200px !important;
    }
}

#movie #genres li {
    background-color: var(--primaryColor);
    padding: 10px;
    margin: 10px 10px 10px 0;
    font-size: 0.7em;
    border-radius: 10px;
    color: var(--textColor);
}

#movie #overview {
    background-color: var(--primaryColor);
    padding: 10px;
    margin: 10px 0;
    border-radius: 10px;
    color: var(--textColor)
}

#movie #cast {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    margin: 20px;
}

#movie #cast li {
    width: 300px;
    background-color: var(--primaryColor);
    margin: 10px 0;
    border-radius: 10px;
    display: flex;
    gap: 10px;
    align-items: center; 
}

#movie #cast p {
    color: var(--textColor)    
}

#movie #cast img {
    height: 100px;
    width: 66px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

label {
    display: block;
    color:var(--textColor);
}

form {
    background-color: var(--primaryColor);
    padding: 20px;
    border-radius: 20px;
    margin: auto;
}

form p {
    color: var(--secondaryColor);
    margin-top: 20px;
}

#account dl {
    margin: 20px 0;

}

#account dt {
    font-size: 1em;;
}

input[type=text],input[type=password],input[type=email] {
    display: block;
    margin: 5px 0 20px 0;
    padding: 10px;
    min-width: 250px;
}

/* ===============================================================================
   SECTION : Global - Responsive Design
   ================================================================================ */
/* STUB : Mobile and tablet responsive styles */
/* RELATION: → All components, → Mobile devices */
/* KEYPOINT: Responsive design for mobile and tablet devices */
/* IMPORTANT: Mobile-first responsive design patterns */
/* Responsive Design */
@media (max-width: 768px) {
    header {
        flex-direction: column;
        gap: 1rem;
    }

    nav ul {
        gap: 0.8rem;
        flex-wrap: wrap;
        justify-content: center;
    }
    
    nav a {
        font-size: 0.9rem;
        padding: 0.2rem;
    }

    header div {
        width: 100%;
        justify-content: space-between;
    }

    header input {
        width: 70%;
    }

    footer {
        padding: 0.8rem 1rem 0.8rem;
        flex-direction: column;
        align-items: center;
    }
    
    .footer-content {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        text-align: center;
    }
    
    .footer-brand {
        justify-content: center;
        flex-direction: column;
        text-align: center;
    }
    
    .footer-links {
        flex-direction: row;
        justify-content: space-around;
        gap: 1rem;
    }
    
    .footer-title {
        font-size: 1.5rem;
    }
    
    .footer-flames {
        position: relative;
        bottom: auto;
        left: auto;
        transform: none;
        margin-top: 0.8rem;
    }
    
    .footer-disclaimer {
        margin-top: 1rem;
        padding-top: 0.8rem;
    }
    
    .handwritten-text {
        font-size: 1rem;
        margin: 0.2rem 0;
    }
    
    .handwritten-text:nth-child(2) {
        margin-left: 0.5rem;
    }

    input[type=search] {
        margin: auto;
    }

    
}

/* ========================================== */
/* 🌍 LANGUAGE FEATURES STYLES */
/* ========================================== */
/* ===============================================================================
   SECTION : LanguageFilter.js - Language Selection
   ================================================================================ */
/* STUB : Language filter component */
/* RELATION: → LanguageFilter.js, → MoviesPage.js (addLanguageFilter) */
/* KEYPOINT: Language selection and filtering functionality */
/* IMPORTANT: Multi-language support for movies and content */

/* Language Filter Component - Compact */
.language-filter {
    background: linear-gradient(135deg, #4c4c4d 0%, #121213 100%);
    border-radius: 6px;
    padding: 12px 16px;
    margin: 15px 0;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.language-filter h3 {
    color: white;
    margin: 0 0 10px 0;
    font-size: 1em;
    text-align: center;
}

.language-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin-bottom: 10px;
}

.language-btn {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 6px 12px;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.8em;
    backdrop-filter: blur(10px);
}

.language-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.language-btn.active {
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    border-color: white;
    font-weight: bold;
}

/* Language Info - Compact */
.language-info {
    text-align: center;
    margin-top: 8px;
}

.language-info p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.85em;
    margin: 0;
}

/* Language Badge */
.language-badge {
    display: inline-block;
    background: linear-gradient(45deg, #007bff, #0056b3);
    color: white;
    padding: 3px 8px;
    border-radius: 15px;
    font-size: 0.8em;
    margin-left: 5px;
    font-weight: 500;
}

/* Language Trailer Component */
.language-trailer {
    margin: 15px 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.language-trailer h4 {
    background: linear-gradient(135deg, #4866ec 0%, #4ba2a2 100%);
    color: white;
    padding: 10px 15px;
    margin: 0;
    font-size: 1.1em;
}

/* Language Selection in Movie Details */
.language-selection {
    background: var(--primaryColor);
    border-radius: 8px;
    padding: 15px;
    margin: 15px 0;
    border: 1px solid var(--secondaryColor);
}

.language-selection h4 {
    color: var(--textColor);
    margin: 0 0 10px 0;
    font-size: 1.1em;
}

.language-options {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.language-option {
    background: var(--background-surface);
    border: 1px solid var(--secondaryColor);
    color: var(--textColor);
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9em;
}

.language-option:hover {
    background: var(--highlightColor);
    color: var(--background-surface);
}

.language-option.selected {
    background: var(--highlightColor);
    color: var(--background-surface);
    border-color: var(--highlightColor);
}

/* Responsive Language Features */
@media (max-width: 768px) {
    .language-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .language-btn {
        width: 100%;
        max-width: 200px;
        text-align: center;
    }
    
    .language-options {
        flex-direction: column;
    }
    
    .language-option {
        width: 100%;
        text-align: center;
    }
}
/* ===============================================================================
   SECTION : LDSPage.js - LDS Content Cards
   ================================================================================ */
/* STUB : LDS content grid layout */
/* RELATION: → LDSPage.js (content grid), → LDSItem.js (content cards) */
/* KEYPOINT: Grid layout for LDS content display */
/* IMPORTANT: Compact LDS content cards for main listing page */
/* ================================================================================
   LDS CONTENT CARDS - MAIN LDS PAGE LISTING
   ================================================================================ */

/* ================================================================================
   CONTENT GRID LAYOUT - COMPACT LDS PAGE GRID STYLES
   ================================================================================ */

/* Content Grid Container - Smaller */
.content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    list-style: none;
    padding: 0;
    margin: 0;
}

/* LDS Page Sections */
.lds-page {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem;
}

.lds-header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 2rem 1rem;
    background: linear-gradient(135deg, var(--highlightColor), var(--primaryColor));
    border-radius: 10px;
    color: white;
}

.lds-header h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.lds-header p {
    font-size: 1rem;
    opacity: 0.9;
}

/* LDS Header with Logo */
.lds-header-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
}

.lds-header-logo {
    height: 80px;
    width: auto;
    object-fit: contain;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.lds-header-text {
    text-align: left;
}

.lds-header-text h1 {
    margin-bottom: 0.5rem;
}

.lds-header-text p {
    margin: 0;
}

.lds-section {
    margin-bottom: 2rem;
}

.lds-section h2 {
    color: var(--highlightColor);
    font-size: 1.5rem;
    margin-bottom: 1rem;
    padding-bottom: 0.3rem;
    border-bottom: 2px solid var(--highlightColor);
}

/* Smaller LDS Content Cards */
.lds-content-card {
    background: var(--primaryColor);
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    height: 150px; /* Reduced height */
}

.lds-content-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 3px 15px rgba(86, 188, 232, 0.3);
}

/* Smaller LDS Content Thumbnail */
.lds-content-thumbnail {
    width: 120px; /* Reduced width */
    height: 100%;
    object-fit: cover;
    background: var(--secondaryColor);
    flex-shrink: 0;
}

/* Smaller LDS Logo Placeholder */
.lds-logo-placeholder {
    object-fit: contain !important;
    padding: 0.8rem; /* Reduced padding */
    width: 100%;
    height: 100%;
}

/* Smaller LDS Content Info Section */
.lds-content-info {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
}

.lds-content-title {
    font-size: 1rem; /* Reduced font size */
    font-weight: bold;
    color: var(--textColor);
    margin-bottom: 0.3rem;
    line-height: 1.2;
}

.lds-content-speaker {
    color: var(--highlightColor);
    font-size: 0.9rem; /* Reduced font size */
    margin-bottom: 0.3rem;
}

.lds-content-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem; /* Reduced font size */
    color: var(--secondaryColor);
}

.lds-spiritual-rating {
    color: var(--highlight2);
    font-size: 0.9rem; /* Reduced font size */
}

/* Responsive Grid - More compact */
@media (max-width: 768px) {
    .content-grid {
        grid-template-columns: 1fr;
        gap: 0.8rem;
    }
    
    .lds-page {
        padding: 0.5rem;
    }
    
    .lds-header {
        padding: 1.5rem 1rem;
    }
    
    .lds-header-content {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    
    .lds-header-logo {
        height: 60px;
    }
    
    .lds-header-text {
        text-align: center;
    }
    
    .lds-header h1 {
        font-size: 1.5rem;
    }
    
    .lds-content-card {
        height: 120px; /* Even smaller on mobile */
    }
    
    .lds-content-thumbnail {
        width: 100px; /* Smaller on mobile */
    }
}

@media (min-width: 1200px) {
    .content-grid {
        grid-template-columns: repeat(2, 1fr); /* More columns */
    }
}

@media (min-width: 1600px) {
    .content-grid {
        grid-template-columns: repeat(4, 1fr); /* Even more columns */
    }
}



/* ================================================================================
   NEW LDS DETAIL PAGE LAYOUT - 3-ROW DESIGN
   ================================================================================ */

/* Main Container */
.lds-detail-page {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    background-color: var(--background-surface);
}

/* Row 1: Banner Section */
.lds-banner-section {
    margin-bottom: 2rem;
}

.lds-banner {
    background: linear-gradient(135deg, var(--highlightColor), var(--primaryColor));
    border-radius: 10px;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 4px 20px rgba(86, 188, 232, 0.3);
}

.lds-banner-title {
    color: white;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.lds-banner-speaker {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.lds-speaker-name {
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
}

.lds-rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.lds-rating-icon {
    color: var(--highlight2);
    font-size: 1.2rem;
}

.lds-rating-stars {
    color: var(--highlight2);
    font-size: 1.1rem;
}

/* Row 2: Content Section - Two Columns */
.lds-content-section {
    margin-bottom: 2rem;
}

.lds-detail-content-card {
    background: var(--primaryColor);
    border-radius: 15px;
    padding: 2rem;
    display: flex;
    gap: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    min-height: 250px; /* Ensure minimum height */
}

/* Left Column: Logo/Thumbnail - Smaller to give more space */
.lds-logo-column {
    flex: 0 0 250px; /* Reduced from 300px */
}

.lds-logo-container {
    width: 250px; /* Reduced from 300px */
    height: 300px; /* Increased from 180px to make it taller */
    background: var(--secondaryColor);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.lds-logo-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Right Column: Description and Actions - FIXED */
.lds-description-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    min-width: 0; /* Allow flex item to shrink below content size */
}

.lds-description-header {
    margin-bottom: 0.5rem;
}

.lds-description-title {
    color: var(--highlightColor);
    font-size: 1.5rem; /* Reduced from 2rem */
    font-weight: 600;
    margin: 0;
}

.lds-description-content {
    color: var(--textColor);
    font-size: 1.1rem; /* Reduced from 1.5rem */
    line-height: 1.6;
    margin: 0;
    flex: 1;
    word-wrap: break-word; /* Allow long words to break */
    overflow-wrap: break-word; /* Modern browsers */
    hyphens: auto; /* Add hyphens for better text flow */
    max-width: 100%; /* Ensure it doesn't exceed container */
}

/* Action Buttons */
.lds-action-buttons {
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
}

.lds-action-btn {
    background: var(--highlightColor);
    color: white;
    border: none;
    padding: 1rem 1.5rem;
    border-radius: 6px;
    font-weight: 100;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.lds-action-btn:hover {
    background: var(--color6);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(86, 188, 232, 0.3);
}

/* Statistics Container */
.lds-stats-container {
    display: flex;
    gap: 1rem;
    margin-top: auto;
}

.lds-stat-item {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1px;
    padding: 0.2rem;
    text-align: center;
    flex: 1;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
}

.lds-stat-label {
    display: block;
    color: var(--secondaryColor);
    font-size: 0.75rem;
    margin-bottom: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.lds-stat-value {
    display: block;
    color: var(--textColor);
    font-size: 0.75rem;
    font-weight: bold;
}

/* Row 3: Video Section */
.lds-video-section {
    margin-top: 2rem;
}

.lds-video-container {
    background: var(--primaryColor);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.lds-video-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem 1rem;
    background: linear-gradient(135deg, var(--highlightColor), var(--color6));
}

.lds-video-profile {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
}

.lds-video-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--secondaryColor);
    border: 2px solid white;
}

/* FIXME: font size for LDS video title */
.lds-video-title {
    color: white;
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
}

.lds-video-menu {
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.1rem;
    border-radius: 50%;
    transition: background 0.3s ease;
}

.lds-video-menu:hover {
    background: rgba(255, 255, 255, 0.1);
}

.lds-video-player {
    width: 100%;
    max-width: 1000px; /* Increased width for bigger YouTube screen */
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio (9/16 = 0.5625) */
    position: relative;
    background: #000;
    border-radius: 8px;
    overflow: hidden;
    margin: 0 auto; /* Center the video player */
}

/*FIXME: aspect ratio for LDS video player */
/* Force 16:9 aspect ratio for LDS video player */
.lds-video-section .lds-video-player {
    padding-bottom: 56.25% !important; /* Proper 16:9 aspect ratio (9/16 = 0.5625) */
    max-width: 800px !important;
    height: 0 !important;
}

/* Ensure video fills the container properly */
.lds-video-section .lds-video-player iframe,
.lds-video-section .lds-video-player enhanced-youtube-embed {
    width: 100% !important;
    height: 100% !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
}

.lds-video-player iframe,
.lds-video-player enhanced-youtube-embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
}

/* Disclaimer Section */
/* Removed old conflicting disclaimer styles */

/* Removed conflicting disclaimer styles - using unified styles below */

/* Additional Content (Hidden by default) */
.lds-additional-content {
    margin-top: 2rem;
    padding: 2rem;
    background: var(--primaryColor);
    border-radius: 15px;
}

.lds-speaker-name {
    color: var(--highlightColor);
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

.lds-metadata {
    margin-bottom: 1.5rem;
}

.lds-metadata dt {
    color: var(--highlightColor);
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.lds-metadata dd {
    color: var(--textColor);
    margin-bottom: 1rem;
}

.lds-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.lds-categories li {
    background: var(--secondaryColor);
    color: var(--textColor);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
}

.lds-scripture-section {
    background: rgba(86, 188, 232, 0.1);
    padding: 1.5rem;
    border-radius: 10px;
    border-left: 4px solid var(--highlightColor);
}

.lds-scripture-section h3 {
    color: var(--highlightColor);
    margin-bottom: 1rem;
}

.lds-scripture-section p {
    color: var(--textColor);
    margin-bottom: 1rem;
}

.lds-scripture-btn {
    background: var(--color6);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}

.lds-scripture-btn:hover {
    background: var(--highlightColor);
    transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
    .lds-detail-page {
        padding: 1rem;
    }
    
    .lds-banner-title {
        font-size: 2rem;
    }
    
    .lds-banner-speaker {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .lds-detail-content-card {
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .lds-logo-column {
        flex: none;
        align-self: center;
    }
    
    .lds-logo-container {
        width: 100%;
        max-width: 300px;
    }
    
    .lds-stats-container {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .lds-action-buttons {
        flex-direction: column;
    }
    
    .lds-video-profile {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
    
    .lds-video-title {
        font-size: 0.5rem;
    }
    
    .lds-video-player {
        max-width: 100%;
        padding-bottom: 56.25% !important; /* Maintain proper 16:9 aspect ratio on mobile */
        height: 0 !important;
    }
}

/* ===============================================================================
   SECTION : LDSDetailsPage.js - LDS Content Disclaimer
   ================================================================================ */
/* STUB : LDS content disclaimer styling */
/* RELATION: → LDSDetailsPage.js (disclaimer section), → LDS content */
/* KEYPOINT: Legal disclaimer for LDS content */
/* IMPORTANT: Required legal information for LDS materials */

/* ========================================== */
/* 📜 LDS CONTENT DISCLAIMER STYLES */
/* ========================================== */
.lds-content-disclaimer {
    margin-top: 2rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    border: 1px solid #3498db;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    font-family: 'Comic Neue', 'Comic Sans MS', 'Marker Felt', 'Bradley Hand', cursive, sans-serif !important;
    display: none; /* Hidden by default, shown only for religious content */
    color: #ecf0f1;
    max-width: 100%;
    overflow: visible;
}

.lds-content-disclaimer * {
    font-family: inherit !important;
}

.disclaimer-header h3 {
    color: #3498db;
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #3498db;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.disclaimer-content {
    line-height: 1.6;
    color: #ecf0f1;
    font-family: 'Comic Neue', 'Comic Sans MS', 'Marker Felt', 'Bradley Hand', cursive, sans-serif;
}

.disclaimer-intro {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: rgba(52, 152, 219, 0.2);
    border-left: 4px solid #3498db;
    border-radius: 0 8px 8px 0;
    color: #ecf0f1;
    font-family: 'Comic Neue', 'Comic Sans MS', 'Marker Felt', 'Bradley Hand', cursive, sans-serif;
}

.disclaimer-sources {
    margin-bottom: 1.5rem;
}

.disclaimer-sources h4 {
    color: #3498db;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 0.75rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.disclaimer-sources p {
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
    color: #bdc3c7;
}

.official-links {
    list-style: none;
    padding: 0;
    margin: 0;
}

.official-links li {
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    background: rgba(52, 152, 219, 0.1);
    border-radius: 6px;
    transition: all 0.3s ease;
}

.official-links li:hover {
    background: rgba(52, 152, 219, 0.2);
    transform: translateX(4px);
}

.official-links a {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.3s ease;
}

.official-links a:hover {
    color: #5dade2;
    text-decoration: underline;
}

.disclaimer-legal {
    padding: 1rem;
    background: rgba(231, 76, 60, 0.1);
    border: 1px solid rgba(231, 76, 60, 0.3);
    border-radius: 8px;
}

.disclaimer-legal h4 {
    color: #e74c3c;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 0.75rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.disclaimer-legal p {
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
    line-height: 1.5;
    color: #ecf0f1;
}

.disclaimer-legal p:last-child {
    margin-bottom: 0;
    font-style: italic;
    color: #bdc3c7;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .lds-content-disclaimer {
        margin-top: 1.5rem;
        padding: 1rem;
    }
    
    .disclaimer-header h3 {
        font-size: 1.1rem;
    }
    
    .disclaimer-intro {
        padding: 0.75rem;
        font-size: 0.95rem;
    }
    
    .official-links li {
        padding: 0.4rem;
    }
    
    .official-links a {
        font-size: 0.9rem;
    }
}

/* ===============================================================================
   SECTION : ManifestoPage.js - Manifesto Title Logo
   ================================================================================ */
/* STUB : Manifesto page logo styling */
/* RELATION: → ManifestoPage.js, → index.html (manifesto template) */
/* KEYPOINT: Logo styling for manifesto page branding */
/* IMPORTANT: Visual branding element for manifesto section */

/* ===============================================================================
MANIFESTO TITLE LOGO STYLING
=============================================================================== */

.manifesto-title-logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 15px rgba(255, 107, 53, 0.6);
    margin-right: 0.5rem;
    vertical-align: middle;
    display: inline-block;
    z-index: 10;
    position: relative;
}

@media (max-width: 768px) {
    .manifesto-title-logo {
        width: 30px;
        height: 30px;
        margin-right: 0.3rem;
    }
}

/* ===============================================================================
   SECTION : HomePage.js - Teaser Section Logo
   ================================================================================ */
/* STUB : Teaser section logo styling */
/* RELATION: → HomePage.js (teaser section), → index.html (home template) */
/* KEYPOINT: Logo styling for homepage teaser section */
/* IMPORTANT: Visual branding element for teaser content */

/* ===============================================================================
TEASER SECTION LOGO STYLING
=============================================================================== */

.teaser-title-logo {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 12px rgba(255, 107, 53, 0.6);
    margin-right: 0.5rem;
    vertical-align: middle;
    display: inline-block;
    z-index: 10;
    position: relative;
}

.teaser-btn-logo {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 8px rgba(255, 107, 53, 0.6);
    margin-left: 0.5rem;
    vertical-align: middle;
    display: inline-block;
}

@media (max-width: 768px) {
    .teaser-title-logo {
        width: 28px;
        height: 28px;
        margin-right: 0.3rem;
    }
    
    .teaser-btn-logo {
        width: 18px;
        height: 18px;
        margin-left: 0.3rem;
    }
}

/* ===============================================================================
   SECTION : GuestbookAdminPage.js - Message Type Badges
   ================================================================================ */
/* STUB : Message type badges for admin page */
/* RELATION: → GuestbookAdminPage.js, → Guestbook admin template */
/* KEYPOINT: Badge styling for message type indicators */
/* IMPORTANT: Visual indicators for public/private message classification */

/* ===============================================================================
MESSAGE TYPE BADGES FOR ADMIN PAGE
=============================================================================== */

.message-type-badge {
    display: inline-block;
    padding: 0.3rem 0.8rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
    margin-left: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.message-type-badge.public {
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: white;
    border: 1px solid #4CAF50;
    box-shadow: 0 2px 4px rgba(76, 175, 80, 0.3);
}

.message-type-badge.private {
    background: linear-gradient(135deg, #FF9800, #F57C00);
    color: white;
    border: 1px solid #FF9800;
    box-shadow: 0 2px 4px rgba(255, 152, 0, 0.3);
}

/* Update entry-status to accommodate both badges */
.entry-status {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
}

@media (max-width: 768px) {
    .entry-status {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-top: 0.5rem;
    }
    
    .message-type-badge {
        margin-left: 0;
        font-size: 0.7rem;
        padding: 0.2rem 0.6rem;
    }
}

/* ===============================================================================
   SECTION : AccountPage.js - Access Denied Page
   ================================================================================ */
/* STUB : Access denied page styling */
/* RELATION: → AccountPage.js (access control), → Admin middleware */
/* KEYPOINT: Error page styling for unauthorized access */
/* IMPORTANT: User-friendly access denial messaging */

/* ===============================================================================
ACCESS DENIED PAGE STYLING
=============================================================================== */

.access-denied-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
    padding: 2rem;
}

.access-denied-card {
    background: linear-gradient(135deg, #2c2c2c 0%, #404040 100%);
    border: 2px solid #ff6b35;
    border-radius: 20px;
    padding: 3rem;
    text-align: center;
    max-width: 500px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.access-denied-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
}

.access-denied-title {
    color: #ff6b35;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.access-denied-message {
    color: #ffffff;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    line-height: 1.5;
}

.access-denied-submessage {
    color: #cccccc;
    font-size: 1rem;
    margin-bottom: 2rem;
    line-height: 1.4;
}

.access-denied-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.access-denied-actions .phoenix-btn {
    min-width: 150px;
}

@media (max-width: 768px) {
    .access-denied-container {
        padding: 1rem;
    }
    
    .access-denied-card {
        padding: 2rem;
    }
    
    .access-denied-title {
        font-size: 2rem;
    }
    
    .access-denied-message {
        font-size: 1.1rem;
    }
    
    .access-denied-actions {
        flex-direction: column;
        align-items: center;
    }
    
    .access-denied-actions .phoenix-btn {
        width: 100%;
        max-width: 200px;
    }
}

/* ===============================================================================
   SECTION : Global - PhoenixFlix Brand Styling
   ================================================================================ */
/* STUB : PhoenixFlix brand text styling */
/* RELATION: → All pages with PhoenixFlix branding, → index.html */
/* KEYPOINT: Global brand text styling for PhoenixFlix logo */
/* IMPORTANT: Consistent branding across the application */

/* ========================================== */
/* 🔥 PHOENIXFLIX BRAND - Text Styling */
/* ========================================== */
.phoenixflix-brand {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.4rem;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: 1;
}

.phoenixflix-brand .phoenix-text {
    color: #ff0000;
    font-weight: bold;
}

.phoenixflix-brand .flix-text {
    color: #0f1f4c;
    font-weight: bold;
    font-style: italic;
}

/* PhoenixFlix brand in navigation - match nav font size */
nav a.phoenixflix-brand {
    font-size: 1rem !important;
}

/* Welcome to PhoenixFlix specific styling */
.welcome-phoenixflix {
    font-family: 'Comic Sans MS', cursive, sans-serif;
}

.welcome-phoenixflix .phoenix-text {
    font-weight: bold;
    color: #ff0000;
    font-style: normal;
}

.welcome-phoenixflix .flix-text {
    font-weight: bold;
    color: #1e3a8a;
    font-style: italic;
}


/* ===============================================================================
   SECTION : HomePage.js - Welcome Header Box
   ================================================================================ */
/* STUB : Welcome header box with LDS theme */
/* RELATION: → HomePage.js (welcome section), → index.html (home template) */
/* KEYPOINT: Welcome section styling with animated background */
/* IMPORTANT: First impression section for homepage visitors */

/* ========================================== */
/* 📺 WELCOME HEADER BOX - LDS THEME */
/* ========================================== */
.welcome-header-box {
    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e40af 100%);
    border: 1px solid #60a5fa;
    border-radius: 4px;
    padding: 0.5rem 1.2rem;
    margin: 0.2rem auto;
    max-width: 500px;
    text-align: center;
    box-shadow: 
        0 2px 6px rgba(96, 165, 250, 0.2),
        0 0 8px rgba(59, 130, 246, 0.1),
        inset 0 0 5px rgba(255, 255, 255, 0.05);
    position: relative;
    overflow: hidden;
    min-height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.welcome-header-box::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, transparent 70%);
    animation: blue-flash 3s ease-in-out infinite;
}

@keyframes blue-flash {
    0%, 100% { 
        opacity: 0.3; 
        transform: scale(1) rotate(0deg); 
    }
    25% { 
        opacity: 0.6; 
        transform: scale(1.1) rotate(90deg); 
    }
    50% { 
        opacity: 0.8; 
        transform: scale(1.05) rotate(180deg); 
    }
    75% { 
        opacity: 0.4; 
        transform: scale(1.08) rotate(270deg); 
    }
}

.welcome-header-box h1 {
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    margin-bottom: 0.1rem;
    color: #ffffff;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
    font-weight: bold;
    position: relative;
    z-index: 1;
}

.welcome-header-box .subtitle {
    font-size: clamp(0.7rem, 2vw, 1rem);
    color: #e0f2fe;
    font-weight: 400;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    position: relative;
    z-index: 1;
    letter-spacing: 0.1px;
}

/* ===============================================================================
   SECTION : ManifestoPage.js - Phoenix Letter Standalone
   ================================================================================ */
/* STUB : Phoenix letter standalone section styling */
/* RELATION: → ManifestoPage.js (letter section), → index.html (manifesto template) */
/* KEYPOINT: Standalone letter section with Phoenix branding */
/* IMPORTANT: Prominent letter display for manifesto page */

/* ========================================== */
/* 🔥 PHOENIX LETTER STANDALONE SECTION */
/* ========================================== */
.phoenix-letter-standalone {
    padding: 3rem 2rem;
    background: linear-gradient(135deg, rgba(245, 70, 7, 0.08) 0%, rgba(255, 140, 0, 0.05) 100%);
    margin: 2rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.phoenix-letter-container-standalone {
    max-width: 800px;
    width: 100%;
    background: linear-gradient(135deg, #1a0a0a 0%, #2d1b1b 25%, #4a2c2c 50%, #2d1b1b 75%, #1a0a0a 100%);
    border: 3px solid #f21414;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 
        0 15px 35px rgba(242, 20, 20, 0.3),
        0 0 50px rgba(255, 140, 0, 0.2),
        inset 0 0 30px rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;
}

.phoenix-letter-container-standalone::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(246, 12, 12, 0.1) 0%, transparent 70%);
    animation: phoenix-glow 3s ease-in-out infinite alternate;
}

.phoenix-letter-image-standalone {
    width: 100%;
    height: auto;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    border: 2px solid #f21414;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
}

.phoenix-letter-image-standalone:hover {
    transform: scale(1.02);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
}

/* Responsive Design for Standalone Phoenix Letter */
@media (max-width: 768px) {
    .phoenix-letter-standalone {
        padding: 2rem 1rem;
    }
    
    .phoenix-letter-container-standalone {
        padding: 1.5rem;
    }
}

/* ===============================================================================
   SECTION : HomePage.js - Phoenix Manifesto Teaser
   ================================================================================ */
/* STUB : Manifesto teaser section on homepage */
/* RELATION: → HomePage.js (teaser section), → ManifestoPage.js link */
/* KEYPOINT: Promotional teaser for manifesto page */
/* IMPORTANT: Engagement element to drive users to manifesto */

/* ========================================== */
/* 🔥 PHOENIX MANIFESTO TEASER */
/* ========================================== */
.phoenix-teaser-section {
    padding: 1.5rem;
    background: linear-gradient(135deg, rgba(245, 70, 7, 0.05) 0%, rgba(255, 140, 0, 0.03) 100%);
    margin: 1rem 0;
}

.phoenix-teaser-container {
    max-width: 800px;
    margin: 0 auto;
    background: linear-gradient(135deg, #1a0a0a 0%, #2d1b1b 25%, #4a2c2c 50%, #2d1b1b 75%, #1a0a0a 100%);
    border: 2px solid #ee2222;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 
        0 8px 20px rgba(238, 34, 34, 0.2),
        0 0 25px rgba(255, 140, 0, 0.1),
        inset 0 0 15px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;
}

.phoenix-teaser-container::before {
    content: '';
    position: absolute;
    top: -30%;
    left: -30%;
    width: 160%;
    height: 160%;
    background: radial-gradient(circle, rgba(255, 107, 107, 0.08) 0%, transparent 70%);
    animation: phoenix-glow 4s ease-in-out infinite alternate;
}

.phoenix-teaser-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.5rem;
    align-items: center;
    position: relative;
    z-index: 1;
}

.phoenix-teaser-text h2 {
    font-size: 1.6rem;
    margin-bottom: 0.6rem;
    background: linear-gradient(45deg, #dc0808, #04978d, #f4c508);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 15px rgba(151, 3, 3, 0.3);
    font-weight: bold;
}

/* Override gradient for PhoenixFlix branding in teaser */
.phoenix-teaser-text h2 .phoenix-text {
    background: none !important;
    -webkit-background-clip: unset !important;
    -webkit-text-fill-color: #ff0000 !important;
    background-clip: unset !important;
    color: #ff0000 !important;
    font-weight: bold !important;
}

.phoenix-teaser-text h2 .flix-text {
    background: none !important;
    -webkit-background-clip: unset !important;
    -webkit-text-fill-color: #1e3a8a !important;
    background-clip: unset !important;
    color: #1e3a8a !important;
    font-weight: bold !important;
    font-style: italic !important;
}

.phoenix-teaser-text p {
    font-size: 0.95rem;
    color: #ffffff;
    margin-bottom: 1rem;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
    line-height: 1.4;
}

/* Phoenix Teaser Highlights */
.phoenix-teaser-highlights {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-bottom: 1rem;
}

.teaser-highlight {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 107, 107, 0.3);
    border-radius: 15px;
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
    color: #ffd93d;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
}

.teaser-highlight:hover {
    background: rgba(255, 107, 107, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 3px 10px rgba(255, 107, 107, 0.3);
}

/* Read Full Manifesto Button */
.phoenix-teaser-btn {
    background: linear-gradient(45deg, #a30404, #f12222);
    border: 2px solid #f72020;
    border-radius: 25px;
    padding: 0.8rem 1.5rem;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
    margin: 1rem auto;
    width: fit-content;
}

.phoenix-teaser-btn:hover {
    background: linear-gradient(45deg, #fa2a2a, #e60a0a);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
}

.btn-icon {
    font-size: 1.2rem;
    animation: flame-flicker 2s ease-in-out infinite alternate;
}

.teaser-preview {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
    border: 2px solid #f21414;
    transition: all 0.3s ease;
}

.teaser-preview:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.5);
}

/* Responsive Design for Teaser */
@media (max-width: 768px) {
    .phoenix-teaser-content {
        grid-template-columns: 1fr;
        gap: 1rem;
        text-align: center;
    }
    
    .phoenix-teaser-text h2 {
        font-size: 1.4rem;
    }
    
    .phoenix-teaser-text p {
        font-size: 0.85rem;
    }
    
    .phoenix-teaser-highlights {
        justify-content: center;
        gap: 0.4rem;
    }
    
    .teaser-highlight {
        padding: 0.3rem 0.6rem;
        font-size: 0.75rem;
    }
    
    .phoenix-teaser-section {
        padding: 1rem;
        margin: 0.5rem 0;
    }
    
    .phoenix-teaser-container {
        padding: 1rem;
        max-width: 95%;
    }
}

/* ===============================================================================
   SECTION : ManifestoPage.js - Phoenix Manifesto Page
   ================================================================================ */
/* STUB : Full manifesto page styling with Phoenix theme */
/* RELATION: → ManifestoPage.js (full page), → index.html (manifesto template) */
/* KEYPOINT: Complete manifesto page with animated Phoenix elements */
/* IMPORTANT: Immersive Phoenix-themed manifesto experience */

/* ========================================== */
/* 🔥 PHOENIX MANIFESTO PAGE */
/* ========================================== */
.phoenix-manifesto-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #1a0a0a 0%, #2d1b1b 25%, #4a2c2c 50%, #2d1b1b 75%, #1a0a0a 100%);
    position: relative;
    overflow: hidden;
    padding: 2rem;
}

/* Phoenix Background Elements */
.phoenix-bg-elements {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.phoenix-flame {
    position: absolute;
    width: 200px;
    height: 300px;
    background: radial-gradient(ellipse at center, 
        rgba(245, 70, 7, 0.8) 0%, 
        rgba(255, 140, 0, 0.6) 30%, 
        rgba(255, 215, 0, 0.4) 60%, 
        transparent 100%);
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    animation: phoenix-flame-dance 6s ease-in-out infinite;
    filter: blur(2px);
}

.phoenix-flame-1 {
    top: 10%;
    left: 5%;
    animation-delay: 0s;
    transform: rotate(-15deg);
}

.phoenix-flame-2 {
    top: 20%;
    right: 10%;
    animation-delay: 2s;
    transform: rotate(15deg);
}

.phoenix-flame-3 {
    bottom: 15%;
    left: 15%;
    animation-delay: 4s;
    transform: rotate(-10deg);
}

.phoenix-ember {
    position: absolute;
    width: 8px;
    height: 8px;
    background: radial-gradient(circle, #f65014 0%, #ea8509 50%, transparent 100%);
    border-radius: 50%;
    animation: phoenix-ember-float 8s linear infinite;
}

.phoenix-ember-1 {
    top: 30%;
    left: 20%;
    animation-delay: 1s;
}

.phoenix-ember-2 {
    top: 60%;
    right: 25%;
    animation-delay: 3s;
}

.phoenix-ember-3 {
    bottom: 30%;
    left: 30%;
    animation-delay: 5s;
}

@keyframes phoenix-flame-dance {
    0%, 100% { 
        transform: scale(1) rotate(var(--rotation, 0deg)); 
        opacity: 0.6; 
    }
    25% { 
        transform: scale(1.1) rotate(calc(var(--rotation, 0deg) + 5deg)); 
        opacity: 0.8; 
    }
    50% { 
        transform: scale(0.9) rotate(calc(var(--rotation, 0deg) - 3deg)); 
        opacity: 0.7; 
    }
    75% { 
        transform: scale(1.05) rotate(calc(var(--rotation, 0deg) + 2deg)); 
        opacity: 0.9; 
    }
}

@keyframes phoenix-ember-float {
    0% { 
        transform: translateY(0) scale(1); 
        opacity: 0.8; 
    }
    50% { 
        transform: translateY(-20px) scale(1.2); 
        opacity: 1; 
    }
    100% { 
        transform: translateY(-40px) scale(0.8); 
        opacity: 0; 
    }
}

/* Manifesto Page Header */
.manifesto-page-header {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
    z-index: 2;
}

.manifesto-page-header h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    font-weight: bold;
    color: #ffd700; /* Gold theme color for base text */
}

/* Ensure PhoenixFlix brand colors override any other styles */
.manifesto-page-header h1 .phoenix-text {
    color: #ff0000 !important; /* Bold red for Phoenix */
    font-weight: bold !important;
}

.manifesto-page-header h1 .flix-text {
    color: #1e3a8a !important; /* Bold italic dark navy blue for Flix */
    font-weight: bold !important;
    font-style: italic !important;
}

/* Theme colors for "The" and "Manifesto" */
.manifesto-page-header h1 .manifesto-theme-text {
    color: #ffd700; /* Gold theme color */
    font-weight: bold;
}

/* Ensure manifesto title logo is visible and not overridden */
.manifesto-page-header h1 .manifesto-title-logo {
    display: inline-block !important;
    visibility: visible !important;
    opacity: 1 !important;
    z-index: 100 !important;
    position: relative !important;
}

@keyframes phoenix-title-glow {
    0% { filter: brightness(1) drop-shadow(0 0 20px rgba(255, 107, 107, 0.3)); }
    100% { filter: brightness(1.2) drop-shadow(0 0 30px rgba(255, 107, 107, 0.6)); }
}

.manifesto-subtitle {
    font-size: 1.4rem;
    color: #ffd700;
    font-weight: 400;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
    letter-spacing: 0.5px;
    margin-bottom: 2rem;
}

.manifesto-nav {
    margin-top: 1.5rem;
}

.back-home-btn {
    background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
    border: 2px solid #f11d1d;
    border-radius: 25px;
    padding: 0.8rem 1.5rem;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.back-home-btn:hover {
    background: linear-gradient(45deg, #f62626, #ee2828);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
}

/* Main Manifesto Content */
.manifesto-page-content {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
}

.manifesto-letter-container {
    background: linear-gradient(135deg, #1a0a0a 0%, #2d1b1b 25%, #4a2c2c 50%, #2d1b1b 75%, #1a0a0a 100%);
    border: 3px solid #f21414;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 
        0 15px 35px rgba(242, 20, 20, 0.3),
        0 0 50px rgba(255, 140, 0, 0.2),
        inset 0 0 30px rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;
}

.manifesto-letter-container::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(246, 12, 12, 0.1) 0%, transparent 70%);
    animation: phoenix-glow 3s ease-in-out infinite alternate;
}

.manifesto-letter-image {
    width: 100%;
    height: auto;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    border: 2px solid #f21414;
    position: relative;
    z-index: 1;
}

.manifesto-text-content {
    color: #ffffff;
    line-height: 1.7;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 2rem;
}

.manifesto-intro-section h2 {
    font-size: 2.2rem;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #ffd93d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 20px rgba(255, 107, 107, 0.3);
}

/* Override gradient for PhoenixFlix branding in manifesto intro */
.manifesto-intro-section h2 .phoenix-text {
    background: none !important;
    -webkit-background-clip: unset !important;
    -webkit-text-fill-color: #ff0000 !important;
    background-clip: unset !important;
    color: #ff0000 !important;
    font-weight: bold !important;
}

.manifesto-intro-section h2 .flix-text {
    background: none !important;
    -webkit-background-clip: unset !important;
    -webkit-text-fill-color: #1e3a8a !important;
    background-clip: unset !important;
    color: #1e3a8a !important;
    font-weight: bold !important;
    font-style: italic !important;
}

.manifesto-intro-section h2 .manifesto-theme-text {
    background: none !important;
    -webkit-background-clip: unset !important;
    -webkit-text-fill-color: #ffd700 !important;
    background-clip: unset !important;
    color: #ffd700 !important;
    font-weight: bold !important;
}

.manifesto-intro-text {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
    color: #ffd93d;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    font-weight: bold;
}

.manifesto-text-content p {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    text-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
}

.manifesto-features h3,
.manifesto-mission h3 {
    font-size: 1.8rem;
    margin: 2rem 0 1.5rem 0;
    color: #ffd93d;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
}

.feature-card {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 107, 107, 0.3);
    border-radius: 15px;
    padding: 0.6rem;
    text-align: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.feature-card:hover {
    background: rgba(255, 107, 107, 0.2);
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(255, 107, 107, 0.3);
}

.feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.feature-card h4 {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
    color: #ffd93d;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.feature-card p {
    font-size: 0.95rem;
    color: #ffffff;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    margin: 0;
}

/* Phoenix AIvengers Mail Letter Section */
.manifesto-phoenix-letter-section {
    padding: 3rem 2rem;
    background: linear-gradient(135deg, rgba(245, 70, 7, 0.08) 0%, rgba(255, 140, 0, 0.05) 100%);
    margin: 3rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;
}

.manifesto-phoenix-letter-container {
    max-width: 800px;
    width: 100%;
    position: relative;
    z-index: 2;
}

.manifesto-phoenix-letter-image {
    width: 100%;
    height: auto;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    border: 2px solid #f21414;
    display: block;
    transition: all 0.3s ease;
}

.manifesto-phoenix-letter-image:hover {
    transform: scale(1.02);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
}

/* Guestbook Phoenix Letter Section */
.guestbook-phoenix-letter-section {
    padding: 1.5rem 0.5rem;
    background: linear-gradient(135deg, rgba(245, 70, 7, 0.08) 0%, rgba(255, 140, 0, 0.05) 100%);
    margin: 2rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;
}

.guestbook-phoenix-letter-container {
    max-width: 1000px;
    width: 100%;
    position: relative;
    z-index: 2;
}

/* Mail Letter Styling */
.mail-letter {
    background: linear-gradient(135deg, #fefefe 0%, #f8f8f8 50%, #f0f0f0 100%);
    border: 2px solid #d4af37;
    border-radius: 15px;
    padding: 0;
    box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.3),
        0 0 20px rgba(212, 175, 55, 0.2),
        inset 0 0 20px rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
    font-family: 'Caveat', cursive;
    transform: perspective(1000px) rotateX(2deg);
    transition: all 0.3s ease;
}

.mail-letter:hover {
    transform: perspective(1000px) rotateX(0deg) scale(1.02);
    box-shadow: 
        0 25px 50px rgba(0, 0, 0, 0.4),
        0 0 30px rgba(212, 175, 55, 0.3),
        inset 0 0 25px rgba(255, 255, 255, 0.15);
}

/* Letter Header */
.letter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem 1rem 2rem;
    background: linear-gradient(90deg, #f8f8f8 0%, #ffffff 50%, #f8f8f8 100%);
    border-bottom: 2px solid #d4af37;
    position: relative;
}

.letter-date {
    font-size: 1.1rem;
    color: #666;
    font-weight: 600;
}

.date-text {
    background: linear-gradient(45deg, #d4af37, #b8860b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.letter-stamp {
    position: relative;
}

.stamp-design {
    width: 80px;
    height: 80px;
    border: 3px solid #d4af37;
    border-radius: 50%;
    background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 
        0 4px 8px rgba(0, 0, 0, 0.2),
        inset 0 0 10px rgba(212, 175, 55, 0.1);
    position: relative;
    overflow: hidden;
}

.stamp-design::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px dashed #d4af37;
    border-radius: 50%;
    opacity: 0.7;
}

/* PhoenixFlix Logo in Stamp */
.stamp-logo {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
    position: relative;
    z-index: 1;
}

/* Letter Content */
.letter-content {
    padding: 1.0rem 2.0rem;
    background: #ffffff;
    position: relative;
    z-index: 1;
}

.letter-greeting h3 {
    font-size: 1.8rem;
    color: #d4af37;
    margin-bottom: 1.5rem;
    text-align: center;
    font-weight: 700;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    border-bottom: 2px solid #d4af37;
    padding-bottom: 0.5rem;
}

/* Ensure PhoenixFlix brand colors in letter greeting */
.letter-greeting h3 .phoenix-text {
    color: #ff0000 !important; /* Bold red for Phoenix */
    font-weight: bold !important;
}

.letter-greeting h3 .flix-text {
    color: #1e3a8a !important; /* Bold italic dark navy blue for Flix */
    font-weight: bold !important;
    font-style: italic !important;
}

.letter-body {
    margin-bottom: 2rem;
}

.letter-body p:first-child {
    text-indent: 0;
    font-weight: 600;
    color: #dd1b1b;
}

.letter-body p {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #1209b4;
    margin-bottom: 1rem;
    text-align: justify;
    text-indent: 1.5rem;
    font-weight: 400;
    font-family: 'Comic Sans MS', italic, sans-serif;
}



/* Letter Signature */
.letter-signature {
    margin: 2rem 0;
    text-align: right;
}

.signature-content {
    display: inline-block;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #f8f8f8 0%, #ffffff 100%);
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.signature-text {
    font-size: 1.2rem;
    color: #d4af37;
    margin-bottom: 0.5rem;
    font-style: italic;
}

.signature-name {
    font-size: 1.4rem;
    color: #d4af37;
    font-weight: 700;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    font-family: 'Caveat', cursive;
    font-style: italic;
    transform: rotate(-2deg);
    letter-spacing: 1px;
    text-decoration: underline;
    text-decoration-color: #d4af37;
    text-decoration-thickness: 2px;
    text-decoration-style: wavy;
    position: relative;
}

.signature-name::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, #d4af37 20%, #d4af37 80%, transparent 100%);
    opacity: 0.6;
}

/* Letter Postscript */
.letter-postscript {
    margin-top: 1.5rem;
    padding: 1rem;
    background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%);
    border-left: 4px solid #d4af37;
    border-radius: 0 8px 8px 0;
    font-style: italic;
}

.ps-text {
    font-size: 1.1rem;
    color: #555;
    line-height: 1.6;
    margin: 0;
    font-family: 'Caveat', italic, sans-serif;
}

/* Letter Footer */
.letter-footer {
    padding: 1rem 2rem;
    background: linear-gradient(90deg, #f8f8f8 0%, #ffffff 50%, #f8f8f8 100%);
    border-top: 2px solid #d4af37;
    text-align: center;
}

.letter-seal {
    display: inline-block;
}

.seal-design {
    width: 60px;
    height: 60px;
    border: 2px solid #d4af37;
    border-radius: 50%;
    background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 
        0 3px 6px rgba(0, 0, 0, 0.2),
        inset 0 0 8px rgba(212, 175, 55, 0.1);
    overflow: hidden;
}

/* PhoenixFlix Logo in Seal */
.seal-logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}

/* Mail Letter Decorative Elements */
.mail-letter::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #d4af37 0%, #b8860b 50%, #d4af37 100%);
    z-index: 2;
}

.mail-letter::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
        radial-gradient(circle at 20% 20%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(212, 175, 55, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
}

/* Responsive Design for Mail Letter */
@media (max-width: 768px) {
    .manifesto-phoenix-letter-section {
        padding: 2rem 1rem;
        margin: 2rem 0;
    }
    
    .manifesto-phoenix-letter-container {
        max-width: 95%;
    }
    
    .guestbook-phoenix-letter-section {
        padding: 1rem 0.25rem;
        margin: 1.5rem 0;
    }
    
    .guestbook-phoenix-letter-container {
        max-width: 98%;
    }
    
    .mail-letter {
        transform: perspective(1000px) rotateX(0deg);
        margin: 0;
    }
    
    .letter-header {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
    }
    
    .letter-content {
        padding: 1rem 1.5rem;
    }
    
    .letter-greeting h3 {
        font-size: 1.5rem;
    }
    
    .letter-body p {
        font-size: 1rem;
        text-indent: 1rem;
    }
    
    .stamp-design {
        width: 60px;
        height: 60px;
    }
    
    .stamp-logo {
        width: 50px;
        height: 50px;
    }
    
    .signature-content {
        padding: 0.8rem 1.5rem;
    }
    
    .signature-text {
        font-size: 1.1rem;
    }
    
    .signature-name {
        font-size: 1.2rem;
        transform: rotate(-1deg);
        letter-spacing: 0.5px;
    }
    
    .seal-design {
        width: 50px;
        height: 50px;
    }
    
    .seal-logo {
        width: 40px;
        height: 40px;
    }
}

/* Responsive Design for Manifesto Page */
@media (max-width: 1024px) {
    .manifesto-text-content {
        padding: 0 1rem;
    }
    
    .features-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 0.8rem;
    }
    
    .feature-card {
        padding: 0.5rem;
    }
}

@media (max-width: 768px) {
    .phoenix-manifesto-page {
        padding: 0.5rem;
    }
    
    .manifesto-page-header {
        text-align: center;
        padding: 0 0.5rem;
    }
    
    .manifesto-page-header h1 {
        font-size: 2rem;
    }
    
    .manifesto-page-content {
        max-width: 100%;
        padding: 0 0.5rem;
    }
    
    .manifesto-text-content {
        padding: 0 0.5rem;
        text-align: left;
    }
    
    .manifesto-subtitle {
        font-size: 1rem;
    }
    
    .manifesto-phoenix-letter-container {
        padding: 1rem;
        max-width: 100%;
        margin: 0 auto;
    }
    
    .manifesto-intro-section h2 {
        font-size: 1.8rem;
    }
    
    .manifesto-features h3,
    .manifesto-mission h3 {
        font-size: 1.5rem;
    }
    
    .features-grid {
        grid-template-columns: 1fr;
        gap: 0.8rem;
    }
    
    .feature-card {
        padding: 0.5rem;
    }
}

/* ===============================================================================
   SECTION : HomePage.js - TV and Bulletin Container
   ================================================================================ */
/* STUB : TV frame and bulletin board styling */
/* RELATION: → HomePage.js (TV section), → index.html (home template) */
/* KEYPOINT: TV frame styling for homepage content */
/* IMPORTANT: Visual TV frame for content display */

/* ========================================== */
/* 📺 TV AND BULLETIN CONTAINER */
/* ========================================== */
.tv-bulletin-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.8rem;
    padding: 0.8rem;
    background: linear-gradient(135deg, rgba(30, 58, 138, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
    border-radius: 6px;
    margin: 0.3rem auto;
    max-width: 800px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(96, 165, 250, 0.2);
}

/* ===============================================================================
   SECTION : HomePage.js - TV Frame Styles
   ================================================================================ */
/* STUB : TV frame visual styling */
/* RELATION: → HomePage.js (TV frame), → index.html (home template) */
/* KEYPOINT: Realistic TV frame appearance */
/* IMPORTANT: Visual TV frame design for content */

/* ========================================== */
/* 📺 TV FRAME STYLES */
/* ========================================== */
.tv-frame-section {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.8rem;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    border-radius: 6px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* FIXME: aspect ratio for TV frame */
.tv-frame {
    position: relative;
    width: 100%;
    height: 80%;
    min-height: 300px;
    background: #333;
    border-radius: 6px;
    padding: 1px;
    box-shadow: 
        inset 0 0 8px rgba(0, 0, 0, 0.6),
        0 0 10px rgba(0, 0, 0, 0.4);
    border: 3px solid #444;
}

.tv-screen {
    width: 100%;
    height: 100%;
    background: #000;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.9);
}

/* .tv-screen enhanced-youtube-embed {
    width: 100%;
    height: 100%;
    display: block;
} */

.tv-screen youtube-embed {
    width: 100%;
    height: 100%;
    display: block;
}

.tv-screen youtube-embed iframe {
    width: 100%;
    height: 100%;
    border-radius: 4px;
}

.tv-controls {
    position: absolute;
    bottom: -15px;
    right: 20px;
    display: flex;
    gap: 8px;
}

.tv-knob {
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, #666 0%, #333 70%);
    border-radius: 50%;
    border: 2px solid #555;
    box-shadow: 
        inset 0 2px 4px rgba(255, 255, 255, 0.1),
        0 2px 4px rgba(0, 0, 0, 0.5);
}

.tv-stand {
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 15px;
    background: linear-gradient(to bottom, #555, #333);
    border-radius: 0 0 10px 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}

.tv-frame-text {
    text-align: center;
    color: #fff;
    max-width: 300px;
}

.tv-frame-text h2 {
    font-size: 1rem;
    margin-bottom: 0.3rem;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 10px rgba(255, 107, 107, 0.2);
}

.tv-frame-text p {
    font-size: 0.7rem;
    color: #ccc;
    line-height: 1.3;
}


/* ===============================================================================
   SECTION : HomePage.js - Status Board Styles
   ================================================================================ */
/* STUB : Status board styling */
/* RELATION: → HomePage.js (status board), → index.html (home template) */
/* KEYPOINT: Status board visual design */
/* IMPORTANT: Information display board styling */

/* ========================================== */
/* 📋 STATUS BOARD STYLES */
/* ========================================== */

.status-board-section {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 0.8rem;
}

.status-board {
    background: linear-gradient(135deg, #2c2c2c 0%, #404040 25%, #525252 50%, #404040 75%, #2c2c2c 100%);
    border: 2px solid #c0c0c0;
    border-radius: 8px;
    padding: 0.6rem;
    width: 100%;
    max-width: 100%;
    height: auto;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    box-shadow: 
        0 6px 20px rgba(0, 0, 0, 0.4),
        0 0 30px rgba(192, 192, 192, 0.3),
        inset 0 0 15px rgba(255, 255, 255, 0.1),
        inset 0 0 30px rgba(192, 192, 192, 0.2);
    position: relative;
    background-image: 
        linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%),
        linear-gradient(135deg, #2c2c2c 0%, #404040 25%, #525252 50%, #404040 75%, #2c2c2c 100%);
    background-size: 20px 20px, 100% 100%;
    box-sizing: border-box;
}

.status-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.8rem;
    border-bottom: 3px solid #60a5fa;
    position: relative;
}

.status-header h3 {
    color: #e0f2fe;
    font-size: 0.9rem;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    margin: 0;
    font-family: 'Permanent Marker', cursive;
}

.status-pins {
    display: flex;
    gap: 0.5rem;
}

.pin {
    width: 12px;
    height: 12px;
    background: radial-gradient(circle, #FFD700 0%, #B8860B 70%);
    border-radius: 50%;
    box-shadow: 
        0 2px 4px rgba(0, 0, 0, 0.5),
        inset 0 1px 2px rgba(255, 255, 255, 0.3);
    position: relative;
}

.pin::after {
    content: '';
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 6px;
    background: #654321;
    border-radius: 1px;
}

.status-content {
    background: rgba(224, 242, 254, 0.9);
    border: 2px solid #60a5fa;
    border-radius: 10px;
    padding: 1rem;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
    font-family: 'Caveat', cursive;
    flex: 1;
}

.status-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.3rem;
}

.status-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 3px;
    border: 1px solid #60a5fa;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.status-label {
    font-weight: 600;
    color: #1e3a8a;
    font-size: 0.7rem;
}

.status-value {
    font-size: 0.8rem;
    font-weight: bold;
    width: 15px;
    text-align: center;
}

.status-value.verified {
    color: #228B22;
    text-shadow: 0 0 5px rgba(34, 139, 34, 0.5);
}

.status-value.blocked {
    color: #DC143C;
    text-shadow: 0 0 5px rgba(220, 20, 60, 0.5);
}


/* ===============================================================================
   SECTION : Global - Responsive Layout
   ================================================================================ */
/* STUB : Responsive layout for TV and status board */
/* RELATION: → All components, → Mobile devices */
/* KEYPOINT: Mobile-responsive design for TV and board sections */
/* IMPORTANT: Adaptive layout for different screen sizes */

/* ========================================== */
/* 📱 RESPONSIVE LAYOUT */
/* ========================================== */

/* Main homepage layout container */
.homepage-layout {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.homepage-row {
    display: flex;
    gap: 1rem;
    align-items: stretch;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
    .tv-bulletin-container {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .welcome-header-box h1 {
        font-size: 2.5rem;
    }
    
    .welcome-header-box .subtitle {
        font-size: 1.2rem;
    }
    
    .homepage-row {
        flex-direction: column;
    }
    
    .tv-frame-section,
    .status-board-section {
        flex: none;
    }
}

@media (max-width: 768px) {
    .welcome-header-box {
        padding: 0.8rem 1.5rem;
        margin: 0.3rem;
        min-height: 70px;
        max-width: 90%;
    }
    
    .welcome-header-box h1 {
        font-size: clamp(1rem, 4vw, 1.3rem);
    }
    
    .welcome-header-box .subtitle {
        font-size: clamp(0.7rem, 3vw, 0.75rem);
    }
    
    .tv-bulletin-container {
        padding: 0.8rem;
        gap: 0.8rem;
        max-width: 85%;
        grid-template-columns: 1fr;
    }
    
    .tv-frame {
        width: 100%;
        height: 80%;
        min-height: 250px;
        padding: 1px;
        margin: 0 auto;
    }
    
    .status-board,
    .disclaimer-board {
        padding: 0.6rem;
        margin: 0.2rem;
        min-height: 200px;
        height: auto;
        max-width: 90%;
    }
    
    .status-header h3,
    .disclaimer-header h3 {
        font-size: 1.1rem;
    }
    
    .status-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 0.4rem;
    }
    
    .status-item {
        padding: 0.3rem;
    }
    
    .status-label {
        font-size: 0.8rem;
    }
    
    .disclaimer-columns {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .disclaimer-column p {
        font-size: 1.1rem;
    }
    
    .disclaimer-column strong {
        font-size: 1.2rem;
    }
}

/* ===============================================================================
   SECTION : GuestbookPage.js - Main Guestbook Container
   ================================================================================ */
/* STUB : Main guestbook page container and header */
/* RELATION: → GuestbookPage.js (main container), → index.html (guestbook template) */
/* KEYPOINT: Main guestbook page layout and Phoenix header */
/* IMPORTANT: Primary guestbook page structure and branding */

/* Main Guestbook Container */
.guestbook-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    background: linear-gradient(135deg, var(--background-surface) 0%, #1a1a1a 100%);
    min-height: 100vh;
}

/* Phoenix Header - Smaller Banner */
.phoenix-header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff6b35 100%);
    border-radius: 15px;
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
    position: relative;
    overflow: hidden;
}

.phoenix-header::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: phoenix-glow 3s ease-in-out infinite alternate;
}

@keyframes phoenix-glow {
    0% { transform: rotate(0deg) scale(1); }
    100% { transform: rotate(180deg) scale(1.1); }
}

.phoenix-flame-icon {
    margin-bottom: 0.8rem;
    animation: flame-flicker 2s ease-in-out infinite alternate;
    filter: drop-shadow(0 0 20px rgba(255, 107, 53, 0.8));
    display: flex;
    justify-content: center;
    align-items: center;
}

/* ===============================================================================
   SECTION : Global - PhoenixFlix Logo Image Styling
   ================================================================================ */
/* STUB : PhoenixFlix logo image styling */
/* RELATION: → All pages with PhoenixFlix logo, → index.html */
/* KEYPOINT: Logo image styling and effects */
/* IMPORTANT: Consistent logo appearance across the application */

/* ========================================== */
/* 🔥 PHOENIXFLIX LOGO - Image Styling */
/* ========================================== */
.phoenix-logo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 30px rgba(255, 107, 53, 0.6);
}

@keyframes flame-flicker {
    0% { transform: scale(1) rotate(-2deg); }
    100% { transform: scale(1.1) rotate(2deg); }
}

.phoenix-title {
    color: white;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.4rem;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: 1;
}

/* 🔥 PhoenixFlix Styles */
.phoenix-title .phoenix-text {
    color: #ff0000;
    font-weight: bold;
}

.phoenix-title .flix-text {
    color: #0f1f4c;
    font-weight: bold;
    font-style: italic;
}

.phoenix-subtitle {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.2rem;
    margin: 0;
    position: relative;
    z-index: 1;
}

/* Guestbook Form Section */
.guestbook-form-section {
    margin-bottom: 3rem;
}

.form-container {
    background: var(--primaryColor);
}

/* ===============================================================================
   SECTION : GuestbookPage.js - Message Type Selection Styles
   ================================================================================ */
/* STUB : Message type selection interface */
/* RELATION: → GuestbookPage.js (message type selection), → GuestbookRepository.js */
/* KEYPOINT: Public/private message type selection */
/* IMPORTANT: User choice for message visibility */

/* Message Type Selection Styles */
.message-type-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 0.5rem;
}

.message-type-option {
    display: flex;
    align-items: center;
    padding: 1rem;
    background: #2a2a2a;
    border: 2px solid transparent;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.message-type-option:hover {
    background: #3a3a3a;
    border-color: #ff6b35;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.2);
}

.message-type-option.selected {
    background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
    border-color: #ff6b35;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
}

.message-type-option.selected .option-title,
.message-type-option.selected .option-subtitle {
    color: white;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.option-icon {
    font-size: 2rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transition: all 0.3s ease;
}

.message-type-option.selected .option-icon {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
}

.option-content {
    flex: 1;
}

.option-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0.25rem;
    transition: all 0.3s ease;
}

.option-subtitle {
    font-size: 0.9rem;
    color: #ccc;
    line-height: 1.4;
    transition: all 0.3s ease;
}

.message-type-option:hover .option-title {
    color: #ff6b35;
}

.message-type-option:hover .option-subtitle {
    color: #ddd;
}

/* Add a subtle glow effect for selected state */
.message-type-option.selected::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    animation: shimmer 2s infinite;
    pointer-events: none;
}

@keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

.form-title {
    color: var(--highlightColor);
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.form-title::before {
    content: '🔥';
    font-size: 1.5rem;
}

/* ===============================================================================
   SECTION : GuestbookPage.js - Phoenix Form Styles
   ================================================================================ */
/* STUB : Guestbook form styling with Phoenix theme */
/* RELATION: → GuestbookPage.js (form), → GuestbookRepository.js (form submission) */
/* KEYPOINT: Phoenix-themed form styling for guestbook entries */
/* IMPORTANT: User input form with Phoenix branding and validation */

/* Phoenix Form Styles */
.phoenix-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.phoenix-label {
    color: var(--textColor);
    font-weight: 600;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.phoenix-label::before {
    content: '🔥';
    font-size: 0.8rem;
}

.phoenix-input {
    padding: 1rem;
    border: 2px solid rgba(255, 107, 53, 0.3);
    border-radius: 10px;
    background: var(--background-surface);
    color: var(--textColor);
    font-size: 1rem;
    transition: all 0.3s ease;
    outline: none;
}

.phoenix-textarea {
    padding: 1rem;
    border: 2px solid rgba(255, 107, 53, 0.3);
    border-radius: 10px;
    background: var(--background-surface);
    color: var(--textColor);
    font-family: 'Caveat', 'Kalam', cursive;
    font-size: 1.1rem;
    font-weight: 400;
    letter-spacing: 0.3px;
    line-height: 1.6;
    transition: all 0.3s ease;
    outline: none;
}

.phoenix-input:focus,
.phoenix-textarea:focus,
.phoenix-input.phoenix-focused,
.phoenix-textarea.phoenix-focused {
    border-color: #ff6b35;
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
    background: rgba(255, 107, 53, 0.05);
}

.phoenix-textarea {
    min-height: 120px;
    resize: vertical;
}

.phoenix-submit-btn {
    background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
    position: relative;
    overflow: hidden;
}

.phoenix-submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
}

.phoenix-submit-btn:active {
    transform: translateY(0);
}

.phoenix-submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
}

.btn-flame {
    animation: flame-flicker 1.5s ease-in-out infinite alternate;
}

/* ===============================================================================
   SECTION : GuestbookPage.js - Guestbook Entries Section
   ================================================================================ */
/* STUB : Guestbook entries display and styling */
/* RELATION: → GuestbookPage.js (entries display), → GuestbookRepository.js */
/* KEYPOINT: Individual guestbook entry styling and layout */
/* IMPORTANT: User-generated content display with Phoenix theme */

/* Guestbook Entries Section */
.guestbook-entries-section {
    margin-top: 2rem;
}

.entries-title {
    color: var(--highlightColor);
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.entries-title::before {
    content: '🔥';
    font-size: 1.5rem;
}

.entries-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

/* Individual Guestbook Entry */
.phoenix-entry {
    background: var(--primaryColor);
    border-radius: 15px;
    padding: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    border-left: 4px solid #ff6b35;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.phoenix-entry:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.2);
}

.phoenix-entry::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #ff6b35, #f7931e, #ff6b35);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.phoenix-entry:hover::before {
    opacity: 1;
}

.entry-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.entry-author {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.author-avatar {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #ff6b35, #f7931e);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    box-shadow: 0 4px 10px rgba(255, 107, 53, 0.3);
}

.author-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}

.author-name {
    color: var(--textColor);
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
}

.entry-date {
    color: var(--secondaryColor);
    font-size: 0.9rem;
    margin: 0;
}

.entry-flame {
    font-size: 1.5rem;
    animation: flame-flicker 2s ease-in-out infinite alternate;
    filter: drop-shadow(0 0 10px rgba(255, 107, 53, 0.6));
}

.entry-content {
    margin-top: 1rem;
}

/* Handwritten Text Animation */
@keyframes handwritten-sway {
    0%, 100% { transform: rotate(-0.5deg) translateY(0px); }
    25% { transform: rotate(-0.3deg) translateY(-1px); }
    50% { transform: rotate(-0.7deg) translateY(0px); }
    75% { transform: rotate(-0.4deg) translateY(1px); }
}

.entry-message {
    color: var(--textColor);
    font-family: 'Caveat', 'Kalam', cursive;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.8;
    margin: 0;
    padding: 1rem;
    background: rgba(255, 107, 53, 0.05);
    border-radius: 10px;
    border-left: 3px solid rgba(255, 107, 53, 0.3);
    letter-spacing: 0.5px;
    transform: rotate(-0.5deg);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    animation: handwritten-sway 8s ease-in-out infinite;
}

/* Loading States */
.loading-flame {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 1rem;
    animation: flame-flicker 1s ease-in-out infinite alternate;
}

.loading-text {
    text-align: center;
    color: var(--secondaryColor);
    font-size: 1.1rem;
}

/* Empty State */
.no-entries {
    text-align: center;
    padding: 3rem;
    color: var(--secondaryColor);
}

.no-entries-flame {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: flame-flicker 2s ease-in-out infinite alternate;
}

/* Success/Error Messages */
.phoenix-message {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--primaryColor);
    border-radius: 10px;
    padding: 1rem 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    border-left: 4px solid #ff6b35;
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.success-message {
    border-left-color: #0AC189;
}

.error-message {
    border-left-color: #e74c3c;
}

.message-flame {
    font-size: 1.2rem;
    animation: flame-flicker 1.5s ease-in-out infinite alternate;
}

.phoenix-message p {
    margin: 0;
    color: var(--textColor);
    font-weight: 500;
}

/* Error State */
.error-message {
    text-align: center;
    padding: 2rem;
    color: var(--secondaryColor);
}

.error-flame {
    font-size: 3rem;
    margin-bottom: 1rem;
    animation: flame-flicker 1s ease-in-out infinite alternate;
}

/* Responsive Design */
@media (max-width: 768px) {
    .guestbook-container {
        padding: 1rem;
    }
    
    .phoenix-header {
        padding: 1.5rem;
        margin-bottom: 2rem;
    }
    
    .phoenix-title {
        font-size: 2rem;
    }
    
    .phoenix-subtitle {
        font-size: 1rem;
    }
    
    .form-container {
        padding: 1.5rem;
    }
    
    .entry-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
    
    .entry-author {
        width: 100%;
    }
    
    .entry-flame {
        align-self: flex-end;
    }
    
    .phoenix-message {
        position: fixed;
        top: 10px;
        left: 10px;
        right: 10px;
        margin: 0;
    }
}

@media (max-width: 480px) {
    .phoenix-title {
        font-size: 1.5rem;
    }
    
    .phoenix-flame-icon {
        margin-bottom: 0.6rem;
    }
    
    .phoenix-logo {
        width: 60px;
        height: 60px;
    }
    
    .form-container {
        padding: 1rem;
    }
    
    .phoenix-input,
    .phoenix-textarea {
        padding: 0.8rem;
    }
    
    .phoenix-submit-btn {
        padding: 0.8rem 1.5rem;
    }
}

/* ===============================================================================
   SECTION : GuestbookAdminPage.js - Guestbook Admin Panel Styles
   ================================================================================ */
/* STUB : Admin panel styling for guestbook management */
/* RELATION: → GuestbookAdminPage.js (admin panel), → GuestbookRepository.js (admin functions) */
/* KEYPOINT: Admin interface for managing guestbook entries */
/* IMPORTANT: Administrative controls for guestbook moderation */

/* ==============================================================================
   GUESTBOOK ADMIN PANEL STYLES
   ============================================================================== */

.admin-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    min-height: 100vh;
}

.phoenix-admin-header {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem;
    background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff6b35 100%);
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
    position: relative;
    overflow: hidden;
}

.phoenix-admin-header::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: phoenix-glow 3s ease-in-out infinite alternate;
}

.phoenix-admin-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #fff;
    margin: 0.5rem 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.phoenix-admin-subtitle {
    font-size: 1.2rem;
    color: #fff;
    margin: 0;
    opacity: 0.9;
}

/* Admin Stats */
.admin-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.stat-card {
    background: linear-gradient(135deg, #2d2d2d 0%, #3d3d3d 100%);
    padding: 1.5rem;
    border-radius: 15px;
    text-align: center;
    border: 2px solid #444;
    transition: all 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-5px);
    border-color: #ff6b35;
    box-shadow: 0 10px 25px rgba(255, 107, 53, 0.2);
}

.stat-number {
    font-size: 2.5rem;
    font-weight: bold;
    color: #ff6b35;
    margin-bottom: 0.5rem;
}

.stat-label {
    font-size: 1rem;
    color: #ccc;
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* Admin Controls */
.admin-controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    justify-content: center;
}

.phoenix-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.phoenix-btn-primary {
    background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
    color: white;
}

.phoenix-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 107, 53, 0.4);
}

.phoenix-btn-secondary {
    background: linear-gradient(135deg, #4a4a4a 0%, #6a6a6a 100%);
    color: white;
}

.phoenix-btn-secondary:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(106, 106, 106, 0.4);
}

.btn-icon {
    font-size: 1.2rem;
}

/* Admin Entries */
.admin-entries-section {
    margin-top: 2rem;
}

.admin-entry-card {
    background: linear-gradient(135deg, #2d2d2d 0%, #3d3d3d 100%);
    border-radius: 15px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 2px solid #444;
    transition: all 0.3s ease;
}

.admin-entry-card.approved {
    border-color: #4CAF50;
    background: linear-gradient(135deg, #2d3d2d 0%, #3d4d3d 100%);
}

.admin-entry-card.pending {
    border-color: #ff9800;
    background: linear-gradient(135deg, #3d2d2d 0%, #4d3d3d 100%);
}

.admin-entry-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.entry-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.entry-info h3 {
    color: #fff;
    margin: 0 0 0.5rem 0;
    font-size: 1.3rem;
}

.entry-email {
    color: #ff6b35;
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
}

.entry-date {
    color: #999;
    margin: 0;
    font-size: 0.8rem;
}

.status-badge {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.status-badge.approved {
    background: #4CAF50;
    color: white;
}

.status-badge.pending {
    background: #ff9800;
    color: white;
}

.entry-content {
    margin-bottom: 1.5rem;
}

.entry-comment {
    color: #ddd;
    line-height: 1.6;
    margin: 0;
    font-size: 1rem;
}

.entry-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
}

.action-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.approve-btn {
    background: #4CAF50;
    color: white;
}

.approve-btn:hover {
    background: #45a049;
    transform: translateY(-2px);
}

.reject-btn {
    background: #ff9800;
    color: white;
}

.reject-btn:hover {
    background: #e68900;
    transform: translateY(-2px);
}

.delete-btn {
    background: #f44336;
    color: white;
}

.delete-btn:hover {
    background: #da190b;
    transform: translateY(-2px);
}

/* Loading Indicator */
.loading-indicator {
    text-align: center;
    padding: 2rem;
    color: #fff;
}

.phoenix-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #333;
    border-top: 4px solid #ff6b35;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Message Container */
.message-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
}

.message {
    padding: 1rem 1.5rem;
    border-radius: 10px;
    margin-bottom: 0.5rem;
    font-weight: 600;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.3s ease;
}

.message-success {
    background: #4CAF50;
    color: white;
}

.message-error {
    background: #f44336;
    color: white;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* No Entries */
.no-entries {
    text-align: center;
    padding: 3rem;
    color: #999;
}

.no-entries-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
}

.no-entries h3 {
    color: #fff;
    margin-bottom: 0.5rem;
}

/* Responsive Design for Admin */
@media (max-width: 768px) {
    .admin-container {
        padding: 1rem;
    }
    
    .phoenix-admin-title {
        font-size: 2rem;
    }
    
    .admin-stats {
        grid-template-columns: 1fr;
    }
    
    .admin-controls {
        flex-direction: column;
        align-items: center;
    }
    
    .entry-header {
        flex-direction: column;
        gap: 1rem;
    }
    
    .entry-actions {
        justify-content: center;
    }
}

/* ===============================================================================
   SECTION : app.js - Install Hint Styles
   ================================================================================ */
/* STUB : PWA install hint styling */
/* RELATION: → app.js (install hint), → PWA functionality */
/* KEYPOINT: Install hint for PWA installation */
/* IMPORTANT: User guidance for app installation */

/* ========================================== */
/* 📱 INSTALL HINT STYLES */
/* ========================================== */
.install-hint {
    position: absolute;
    top: 75px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
    color: white;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    opacity: 0;
    animation: fadeInSlide 0.5s ease-out 1s forwards;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid rgba(255, 255, 255, 0.2);
}

.install-hint:hover {
    background: linear-gradient(135deg, #ee5a24 0%, #ff6b6b 100%);
    transform: translateX(-50%) translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.4);
}

.install-hint:active {
    transform: translateX(-50%) translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

@keyframes fadeInSlide {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}

/* Hide install hint on mobile to avoid clutter */
@media (max-width: 768px) {
    .install-hint {
        font-size: 0.7rem;
        padding: 4px 12px;
        top: 70px;
    }
}

/* Hide install hint when app is already installed */
.install-hint.hidden {
    display: none;
}

/* ===============================================================================
   SECTION : app.js - PWA Install Banner Styles
   ================================================================================ */
/* STUB : PWA install banner styling */
/* RELATION: → app.js (install banner), → PWA functionality */
/* KEYPOINT: Install banner for PWA installation */
/* IMPORTANT: Prominent PWA installation prompt */

/* ========================================== */
/* 📱 PWA INSTALL BANNER STYLES */
/* ========================================== */
#install-banner {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
    color: white;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    max-width: 90%;
    width: 400px;
    animation: slideUp 0.5s ease-out;
}

.install-banner-content {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    gap: 15px;
}

.install-banner-icon {
    font-size: 2rem;
    animation: bounce 2s infinite;
}

.install-banner-text {
    flex: 1;
}

.install-banner-text strong {
    display: block;
    font-size: 1.1rem;
    margin-bottom: 4px;
}

/* PhoenixFlix branding in install banner */
.install-banner-text .phoenix-text {
    color: #ff0000 !important;
    font-weight: bold !important;
}

.install-banner-text .flix-text {
    color: #1e3a8a !important;
    font-weight: bold !important;
    font-style: italic !important;
}

/* Manual install instructions styling */
.manual-install-instructions {
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 500px;
    z-index: 10001;
}

.manual-install-instructions h3 .phoenix-text {
    color: #ff0000 !important;
    font-weight: bold !important;
}

.manual-install-instructions h3 .flix-text {
    color: #1e3a8a !important;
    font-weight: bold !important;
    font-style: italic !important;
}

.install-banner-text p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.9;
}

.install-banner-btn {
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
}

.install-banner-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
}

.install-banner-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease;
}

.install-banner-close:hover {
    background: rgba(255, 255, 255, 0.2);
}

@keyframes slideUp {
    from {
        transform: translateX(-50%) translateY(100px);
        opacity: 0;
    }
    to {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

/* Mobile styles for install banner */
@media (max-width: 768px) {
    #install-banner {
        bottom: 10px;
        left: 10px;
        right: 10px;
        transform: none;
        width: auto;
        max-width: none;
    }
    
    .install-banner-content {
        padding: 12px 15px;
        gap: 10px;
    }
    
    .install-banner-icon {
        font-size: 1.5rem;
    }
    
    .install-banner-text strong {
        font-size: 1rem;
    }
    
    .install-banner-text p {
        font-size: 0.8rem;
    }
    
    .install-banner-btn {
        padding: 6px 12px;
        font-size: 0.9rem;
    }
    
    /* Mobile Footer Styles */
    footer {
        padding: 1rem 0.5rem;
    }
    
    .footer-content {
        grid-template-columns: 1fr;
        gap: 1.2rem;
        text-align: center;
    }
    
    .footer-brand {
        flex-direction: column;
        gap: 0.8rem;
        margin-bottom: 1.2rem;
    }
    
    .footer-logo-img {
        width: 45px;
        height: 45px;
    }
    
    .footer-title {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }
    
    .footer-links {
        gap: 1rem;
        align-items: center;
    }
    
    .footer-section {
        width: 100%;
        justify-content: center;
    }
    
    .footer-link {
        justify-content: center;
        padding: 0.4rem 0.8rem;
        font-size: 0.8rem;
        word-break: break-all;
        max-width: 100%;
    }
    
    .copyright-text {
        font-size: 0.8rem;
        text-align: center;
        line-height: 1.4;
        word-break: break-word;
    }
    
    .footer-disclaimer {
        margin-top: 1rem;
        padding-top: 0.8rem;
        border-top: 1px solid rgba(255, 107, 53, 0.3);
    }
    
    .handwritten-text {
        font-size: 0.85rem;
        margin: 0.3rem 0;
        line-height: 1.3;
        text-align: center;
    }
    
    .handwritten-text:nth-child(2) {
        margin-left: 0;
        transform: rotate(0.1deg);
    }
}

   /* Mobile LDS Video Player Improvements */
    .lds-video-section .lds-video-player {
        padding-bottom: 60% !important; /* Slightly taller on mobile for better viewing */
        max-width: 100% !important; /* Full width on mobile */
        margin: 0.5rem auto !important; /* Better spacing */
    }
    
    .lds-video-container {
        margin: 0.5rem;
        border-radius: 8px;
    }
    
    .lds-video-header {
        padding: 0.5rem 0.8rem;
    }
    
    .lds-video-title {
        font-size: 0.9rem;
        line-height: 1.3;
    }
    
    .lds-video-avatar {
        width: 35px;
        height: 35px;
    }
}