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

export const API = {
    
    baseURL: "https://phoenixflix.onrender.com/api/",

    getTopMovies: async () => {
        return await API.fetch("movies/top");
    },
    getRandomMovies: async () => {
        return await API.fetch("movies/random");
    },
    getGenres: async () => {
        return await API.fetch("genres");
    },
    getMovieById: async (id) => {
        return await API.fetch(`movies/${id}`);
    },
    searchMovies: async (q, order, genre) => {
        return await API.fetch(`movies/search`, {q, order, genre});
    },
    getMoviesByLanguage: async (language) => {
        return await API.fetch(`movies/language/${language}`);
    },

    register: async (name, email, password) => {
        return await API.send("account/register", {name, email, password})
    },
    login: async (email, password) => {
        return await API.send("account/authenticate", {email, password})
    },

    confirmEmail: async (token) => {
        return await API.fetch(`account/confirm?token=${encodeURIComponent(token)}`);
    },
    resendVerification: async () => {
        return await API.send("account/resend-verification", {});
    },
    forgotPassword: async (email) => {
        return await API.send("account/forgot-password", {email});
    },
    resetPassword: async (token, newPassword) => {
        return await API.send("account/reset-password", {token, new_password: newPassword});
    },
    getFavorites: async () => {
        return await API.fetch("account/favorites")
    },
    getWatchlist: async () => {
        return await API.fetch("account/watchlist")
    },
    saveToCollection: async (movie_id, collection) => {
        return await API.send("account/save-movie-to-collection", {
            movie_id, collection
        })
    }, 
    removeFromCollection: async (movie_id, collection) => {
        return await API.send("account/remove-movie-from-collection", {
            movie_id, collection
        })
    },
    
    getGuestbookEntries: async () => {
        return await API.fetch("guestbook");
    },
    createGuestbookEntry: async (name, email, comment, messageType = 'public') => {
        return await API.send("guestbook/create", {name, email, comment, message_type: messageType});
    },

    getGuestbookEntriesAdmin: async () => {
        return await API.fetch("admin/guestbook");
    },
    deleteGuestbookEntry: async (id) => {
        return await API.delete(`admin/guestbook/delete/${id}`);
    },
    approveGuestbookEntry: async (id, approved) => {
        return await API.put(`admin/guestbook/approve/${id}`, {approved});
    },

    send: async (serviceName, data) => {
        try {
            const headers = {
                "Content-Type": "application/json"
            };
            
            if (app.Store.jwt) {
                headers["Authorization"] = `Bearer ${app.Store.jwt}`;
            }
            
            console.log('🌐 API.send request:', {
                url: API.baseURL + serviceName,
                method: 'POST',
                headers: headers,
                data: data
            });
            
            const response = await fetch(API.baseURL + serviceName, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            });
            
            console.log('🌐 API.send response status:', response.status);
            const result = await response.json();
            console.log('🌐 API.send response data:', result);
            return result;    
        } catch (e) {
            console.error('🌐 API.send error:', e);
            throw e;
        }
    },
    
    fetch: async (serviceName, args) => {
        try {
            const queryString = args ? new URLSearchParams(args).toString() : "";
            const response = await fetch(API.baseURL + serviceName + "?" + queryString, {
                cache: 'no-store',
                headers: {
                    "Authorization": app.Store.jwt ? `Bearer ${app.Store.jwt}` : null,
                    "Cache-Control": "no-store"
                }
            });
            
            if (!response.ok) {
                console.error(`API fetch error: HTTP ${response.status}: ${response.statusText}`);
                return [];
            }
            
            const result = await response.json();
            return result;    
        } catch (e) {
            console.error("API fetch error:", e);
            return [];
        }
    },
    
    delete: async (serviceName) => {
        try {
            const headers = {
                "Content-Type": "application/json"
            };
            
            if (app.Store.jwt) {
                headers["Authorization"] = `Bearer ${app.Store.jwt}`;
            }
            
            console.log('🌐 API.delete request:', {
                url: API.baseURL + serviceName,
                method: 'DELETE',
                headers: headers
            });
            
            const response = await fetch(API.baseURL + serviceName, {
                method: "DELETE",
                headers: headers
            });
            
            console.log('🌐 API.delete response status:', response.status);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
            }
            
            const result = await response.json();
            console.log('🌐 API.delete response data:', result);
            return result;    
        } catch (e) {
            console.error('🌐 API.delete error:', e);
            throw e;
        }
    },
    
    put: async (serviceName, data) => {
        try {
            const headers = {
                "Content-Type": "application/json"
            };
            
            if (app.Store.jwt) {
                headers["Authorization"] = `Bearer ${app.Store.jwt}`;
            }
            
            console.log('🌐 API.put request:', {
                url: API.baseURL + serviceName,
                method: 'PUT',
                headers: headers,
                data: data
            });
            
            const response = await fetch(API.baseURL + serviceName, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(data)
            });
            
            console.log('🌐 API.put response status:', response.status);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
            }
            
            const result = await response.json();
            console.log('🌐 API.put response data:', result);
            return result;    
        } catch (e) {
            console.error('🌐 API.put error:', e);
            throw e;
        }
    },

    getTopLDS: async () => {
        return await API.fetch("LDS/top");
    },
    getRandomLDS: async () => {
        return await API.fetch("LDS/random");
    },
    getGenresLDS: async () => {
        return await API.fetch("LDS/genres");
    },
    getLDSById: async (id) => {
        return await API.fetch(`LDS/${id}`);
    },
    getLDSContentById: async (id) => {
        return await API.fetch(`LDS/${id}`);
    },
    searchLDS: async (q, order, genre) => {
        return await API.fetch(`LDS/search`, {q, order, genre});
    },

    getLDSMusic: async () => {
        return await API.fetch("LDS/music");
    },
    getLDSScripture: async () => {
        return await API.fetch("LDS/scripture");
    },
    getLDSFamily: async () => {
        return await API.fetch("LDS/family");
    },
    getBibleVideos: async () => {
        return await API.fetch("LDS/bible-videos");
    },
    getChristianSongs: async () => {
        return await API.fetch("LDS/christian-songs");
    },

    saveToCollectionLDS: async (lds_id, collection) => {
        return await API.send("account/save-lds-to-collection", {
            lds_id: parseInt(lds_id),
            collection: collection
        })
    },
    
    getLDSFavorites: async () => {
        return await API.fetch("LDS/favorites")
    },
    getLDSWatchlist: async () => {
        return await API.fetch("LDS/watchlist")
    },
    removeFromCollectionLDS: async (lds_id, collection) => {
        return await API.send("LDS/remove-from-collection", {
            lds_id: parseInt(lds_id),
            collection
        })
    },
    getLDSCollectionStatus: async (lds_id) => {
        return await API.fetch(`LDS/collection-status?lds_id=${parseInt(lds_id)}`)
    }
}
