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

import { AccountPage } from "../components/AccountPage.js"
import { FavoritesPage } from "../components/FavoritesPage.js"
import { HomePage } from "../components/HomePage.js"
import { LoginPage } from "../components/LoginPage.js"
import { MovieDetailsPage } from "../components/MovieDetailsPage.js"
import { MoviesPage } from "../components/MoviesPage.js"
import { RegisterPage } from "../components/RegisterPage.js"
import { WatchlistPage } from "../components/WatchlistPage.js"
import { LDSPage } from "../components/LDSPage.js"
import { LDSDetailsPage } from "../components/LDSDetailsPage.js"
import { GuestbookPage } from "../components/GuestbookPage.js"
import { GuestbookAdminPage } from "../components/GuestbookAdminPage.js"
import { ManifestoPage } from "../components/ManifestoPage.js"
import { ForgotPasswordPage } from "../components/ForgotPasswordPage.js"
import { ResetPasswordPage } from "../components/ResetPasswordPage.js"

export const routes = [
    
    {
        path: "/",
        component: HomePage
    },
    {
        path: "/movies",
        component: MoviesPage
    },
    {
        path: "/lds",
        component: LDSPage
    },
    {
        path: "/guestbook",
        component: GuestbookPage
    },
    {
        path: "/manifesto",
        component: ManifestoPage
    },

    {
        path: /\/movies\/(\d+)/,
        component: MovieDetailsPage
    },
    {
        path: /\/lds\/(\d+)/,
        component: LDSDetailsPage
    },

    {
        path: "/account/register",
        component: RegisterPage
    },
    {
        path: "/account/login",
        component: LoginPage
    },
    {
        path: "/account/forgot-password",
        component: ForgotPasswordPage
    },
    {
        path: "/account/reset-password",
        component: ResetPasswordPage
    },

    {
        path: "/account/",
        component: AccountPage,
        loggedIn: true
    },
    {
        path: "/account/favorites",
        component: FavoritesPage,
        loggedIn: true
    },
    {
        path: "/account/watchlist",
        component: WatchlistPage,
        loggedIn: true
    },

    {
        path: "/admin/guestbook",
        component: GuestbookAdminPage
    }
]
