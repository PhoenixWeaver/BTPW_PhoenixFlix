/*
===============================================================================
Go Vanilla - WEB DEVELOPMENT FUNDAMENTALS
===============================================================================

Author: Ben Tran
Date: 02/09/2025
Description:

*/

package main

import (
	// "database/sql"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	// 	"strings"

	"PhoenixFlix/data"
	"PhoenixFlix/handlers"
	"PhoenixFlix/logger"

	"github.com/go-webauthn/webauthn/webauthn"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

// ======================================================================================================

// =========================================================================================================================
// !SECTION - Initialize logging system
// initializeLogger creates a custom logger instance for the application
// IMPORTANT: This logger is used throughout the application for structured logging
// RELATED: logger/logger.go - Custom logger implementation
func initializeLogger() (*logger.Logger, *logger.LoggerLDS) {
	movieLogger, err := logger.NewLogger("movie.log")
	if err != nil {
		log.Fatalf("Failed to initialize movie logger: %v", err)
	}

	ldsLogger, err := logger.NewLoggerLDS("LDS.log")
	if err != nil {
		log.Fatalf("Failed to initialize LDS logger: %v", err)
	}

	movieLogger.Error("Hello from the Error system", nil)
	ldsLogger.Error("Hello from the Error LDS system", nil)
	return movieLogger, ldsLogger
}

// !SECTION - main.go
func main() {

	//SECTION - 1: Initialize logging system
	// STEP 1: Initialize logging system
	// IMPORTANT: Logger is injected into all components for consistent logging
	movieLogger, ldsLogger := initializeLogger()
	movieLogger.Info("Application started") // Add this line
	// defer movieLogger.Close() // Optional: Close the logger file after use

	//SECTION - 2: Load environment variables from .env file
	// STEP 4: Load environment variables from .env file after
	if err := godotenv.Load(); err != nil {
		log.Printf("No .env file found or failed to load: %v", err)
	}

	//SECTION - 3: Connection to PostgreSQL database for the envelope
	// STEP 5: Establish database connection
	dbConnStr := os.Getenv("DATABASE_URL") // from operating system environment
	if dbConnStr == "" {
		log.Fatalf("DATABASE_URL not set in environment")
	}
	db, err := sql.Open("postgres", dbConnStr) // Open a new connection to the database >> Open but need a driver
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close() // Close the connection when the application shuts down

	//TODO - change to Option 3: Constructor Function (Recommended)
	//SECTION - 4: Initialize Data Repositories
	// STEP 6: Initialize Data Repositories >> Movie Repository
	movieRepo, err := data.NewMovieRepository(db, movieLogger)
	if err != nil {
		log.Fatalf("Failed to initialize movierepository")
	}

	// AccountRepository will be initialized after LDS database connection

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//SECTION 5 - NewMovieHandler >>> this is the new way to create a MovieHandler object
	// STEP 7: Initialize HTTP Handlers >> into a single line factory function in movie_handlers.go
	movieHandler := handlers.NewMovieHandler(movieRepo, movieLogger)
	// AccountHandler will be initialized after AccountRepository is created

	//SECTION 6 - Register Public API Routes (No Authentication Required) with NewMovieHandler
	// STEP 5: Register Public API Routes (No Authentication Required)
	// TODO: Consider adding rate limiting for public endpoints
	//NOTE - Order is important > genres first then search then movie by ID >> GENERAL > SPECIFIC
	http.HandleFunc("/api/movies/top", movieHandler.GetTopMovies)
	http.HandleFunc("/api/movies/random", movieHandler.GetRandomMovies)
	// These NEED trailing slashes because they have parameters:
	http.HandleFunc("/api/movies/language/", movieHandler.GetMoviesByLanguage) // ✅ Needs slash for /language/ja
	http.HandleFunc("/api/movies/search/", movieHandler.SearchMovies)          // ✅ Needs slash for /search/?q=...
	http.HandleFunc("/api/movies/", movieHandler.GetMovie)                     // ✅ Needs slash for /movies/123
	http.HandleFunc("/api/genres", movieHandler.GetGenres)

	// Account routes will be registered after AccountHandler is created
	// http.HandleFunc("/api/account/register", accountHandler.Register)
	// http.HandleFunc("/api/account/authenticate", accountHandler.Authenticate)

	// If we use this http.HandleFunc("/api/movies/top/", handlers.GetTopMovies) with the top/
	// it would use the handler from the handlers package instead of OUR OBJECT movieHandler

	//SECTION 7 - Account routes will be registered after AccountHandler is created
	// STEP 7: Register Protected API Routes (Authentication Required)
	// http.Handle("/api/account/favorites",
	//	accountHandler.AuthMiddleware(http.HandlerFunc(accountHandler.GetFavorites)))

	// http.Handle("/api/account/watchlist",
	//	accountHandler.AuthMiddleware(http.HandlerFunc(accountHandler.GetWatchlist)))

	// Separate routes for different content types
	// http.Handle("/api/account/save-movie-to-collection",
	//	accountHandler.AuthMiddleware(http.HandlerFunc(accountHandler.SaveToCollection)))

	// http.Handle("/api/account/save-lds-to-collection",
	//	accountHandler.AuthMiddleware(http.HandlerFunc(accountHandler.SaveLDSToCollection)))

	//SECTION 8 -
	// STEP 8: WebAuthn (Passkey) Configuration
	// IMPORTANT: Modern passwordless authentication using WebAuthn standard
	// TODO: Update RPOrigins for production deployment
	wconfig := &webauthn.Config{
		RPDisplayName: "ReelingIt",
		RPID:          "localhost",
		RPOrigins:     []string{"http://localhost:8080"},
	}

	var webAuthnManager *webauthn.WebAuthn

	if webAuthnManager, err = webauthn.New(wconfig); err != nil {
		movieLogger.Error("Error creating WebAuthn", err)
	}

	if err != nil {
		movieLogger.Error("Error initialing Passkey engine", err)
	}

	//SECTION 9 -
	// STEP 9: Initialize Passkey Repository and Handler
	passkeyRepo := data.NewPasskeyRepository(db, *movieLogger)
	webAuthnHandler := handlers.NewWebAuthnHandler(passkeyRepo, movieLogger, webAuthnManager)

	//SECTION 10 -
	// STEP 10: WebAuthn Routes will be registered later after all API routes

	//SECTION 11 -
	// STEP 11: Frontend Routing Setup
	// IMPORTANT: SPA (Single Page Application) routing with catch-all handler
	// TODO: Consider using a proper router library for better route management
	catchAllClientRoutesHandler := func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./public/index.html")
	}

	//SECTION 12 -
	// STEP 12: Server-Side Rendering (SSR) for Movie Details
	http.HandleFunc("/movies/", func(w http.ResponseWriter, r *http.Request) {
		if strings.Count(r.URL.Path, "/") == 2 && strings.HasPrefix(r.URL.Path, "/movies/") {
			handlers.SSRMovieDetailsHandler(movieRepo, movieLogger)(w, r)
		} else {
			catchAllClientRoutesHandler(w, r)
		}
	})

	//SECTION - 13: Client-Side Routes (SPA Fallback)
	// STEP 13: Client-Side Routes (SPA Fallback)
	// IMPORTANT: These routes serve the SPA for client-side routing
	http.HandleFunc("/movies", catchAllClientRoutesHandler)
	http.HandleFunc("/account/", catchAllClientRoutesHandler)

	// REVIEW - API routes first (more specific than "/") >> BEFORE Static file serving
	//STEP 3A - API routes second (more specific than "/")
	// movieHandler = handlers.MovieHandler{} >>> This is the empty handler
	// >> it will make new empty handler and overwrite the one with Storage and Logger
	// so we need to comment it out
	// movieHandler = handlers.MovieHandler{}
	// http.HandleFunc("/api/movies/top", movieHandler.GetTopMovies)
	// http.HandleFunc("/api/movies/random", movieHandler.GetRandomMovies)

	// SECTION 14-
	// STEP 3: Static File Serving
	// IMPORTANT: Serves CSS, JS, images, and other static assets
	// TODO: Consider adding caching headers for static assets
	// http.Handle("/", http.FileServer(http.Dir("public"))) // FilesServer for static files mo handling routes
	// fmt.Println("Serving the files")

	//////////////////////////////////////////////////////////////!SECTION - LDS///////////////////////////////////////////////////

	//TODO - LDS - 1: Initialize logging system -Step 1
	ldsLogger.Info("LDS Application started")

	//TODO - LDS - 2: Connection to PostgreSQL database for the envelope -Step 5
	dbConnStrLDS := os.Getenv("DATABASE_URL_LDS") // from operating system environment
	if dbConnStrLDS == "" {
		log.Fatalf("DATABASE_URL_LDS not set in environment")
	}
	dbLDS, err := sql.Open("postgres", dbConnStrLDS) // Open a new connection to the database >> Open but need a driver
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer dbLDS.Close() // Close the connection when the application shuts down

	//TODO - LDS - 3: Initialize Data Repositories -Step 6
	infoRepoLDS, err := data.NewLDSRepository(dbLDS, ldsLogger)
	if err != nil {
		log.Fatalf("Failed to initialize infoRepositoryLDS")
	}

	// Initialize AccountRepository with both database connections
	accountRepo, err := data.NewAccountRepository(db, dbLDS, movieLogger)
	if err != nil {
		log.Fatal("Failed to initialize account repository")
	}

	// Initialize AccountHandler
	accountHandler := handlers.NewAccountHandler(accountRepo, movieLogger)

	//SECTION - Register Account Routes (Authentication Required)
	// STEP: Register Account API Routes (Authentication Required)
	// IMPORTANT: These routes require JWT authentication
	// SECURITY: Uses AuthMiddleware to validate JWT tokens
	http.HandleFunc("/api/account/register", accountHandler.Register)
	http.HandleFunc("/api/account/authenticate", accountHandler.Authenticate)

	//SECTION - Register Protected API Routes (Authentication Required)
	// STEP: Register Protected API Routes (Authentication Required)
	// IMPORTANT: These routes require JWT authentication
	// SECURITY: Uses AuthMiddleware to validate JWT tokens
	http.Handle("/api/account/favorites",
		accountHandler.AuthMiddleware(http.HandlerFunc(accountHandler.GetFavorites)))

	http.Handle("/api/account/watchlist",
		accountHandler.AuthMiddleware(http.HandlerFunc(accountHandler.GetWatchlist)))

	// Separate routes for different content types
	http.Handle("/api/account/save-movie-to-collection",
		accountHandler.AuthMiddleware(http.HandlerFunc(accountHandler.SaveToCollection)))

	http.Handle("/api/account/save-lds-to-collection",
		accountHandler.AuthMiddleware(http.HandlerFunc(accountHandler.SaveLDSToCollection)))

	//SECTION - Register WebAuthn Routes (Registration requires accountHandler)
	// STEP: Register WebAuthn Routes
	http.Handle("/api/passkey/registration-begin",
		accountHandler.AuthMiddleware(http.HandlerFunc(webAuthnHandler.WebAuthnRegistrationBeginHandler)))
	http.Handle("/api/passkey/registration-end",
		accountHandler.AuthMiddleware(http.HandlerFunc(webAuthnHandler.WebAuthnRegistrationEndHandler)))

	//TODO - LDS - 4: Initialize HTTP Handlers -Step 7
	ldsHandlerLDS := handlers.NewLDSHandler(infoRepoLDS, ldsLogger) // same as movieHandler

	//SECTION - Initialize Guestbook Repository and Handler
	// STEP: Initialize Guestbook components for guestbook functionality
	guestbookRepo, err := data.NewGuestbookRepository(db, movieLogger)
	if err != nil {
		log.Fatalf("Failed to initialize guestbook repository: %v", err)
	}
	guestbookHandler := handlers.NewGuestbookHandler(guestbookRepo, movieLogger)

	//TODO - LDS - 5: Register Public API Routes -Step 8
	// (No Authentication Required) with NewMLDShandler
	// http.HandleFunc("/api/LDS/top", ldsHandlerLDS.GetTopLDS)

	//NOTE: Security for all these steps:
	// step9 acc, step10 passkey, step11 init passkey, step 12 webauthn, step13 spa, step14 srr, step2 static file serving,
	// LDS: step15 Client-Side Routes, step1 server

	//TODO - LDS - 6: API routes step3 and/or Register Protected API Routes - step15
	// (Authentication Required) with NewMLDShandler
	http.HandleFunc("/api/LDS/top", ldsHandlerLDS.GetTopLDS)
	http.HandleFunc("/api/LDS/random", ldsHandlerLDS.GetRandomLDS)
	http.HandleFunc("/api/LDS/search", ldsHandlerLDS.SearchLDS)
	// Details and auxiliary LDS endpoints
	http.HandleFunc("/api/LDS/", ldsHandlerLDS.GetLDS) // e.g., /api/LDS/14
	http.HandleFunc("/api/LDS/genres", ldsHandlerLDS.GetGenres)
	http.HandleFunc("/api/LDS/music", ldsHandlerLDS.GetLDSMusic)
	http.HandleFunc("/api/LDS/scripture", ldsHandlerLDS.GetLDSScripture)
	http.HandleFunc("/api/LDS/bible-videos", ldsHandlerLDS.GetBibleVideos)
	http.HandleFunc("/api/LDS/christian-songs", ldsHandlerLDS.GetChristianSongs)

	//SECTION - Register Guestbook API Routes (Public Access)
	// STEP: Register Guestbook API Routes (No Authentication Required)
	// IMPORTANT: These routes allow public access to guestbook functionality
	http.HandleFunc("/api/guestbook", guestbookHandler.GetAllEntries)
	http.HandleFunc("/api/guestbook/", guestbookHandler.GetEntryByID)
	http.HandleFunc("/api/guestbook/create", guestbookHandler.CreateEntry)

	//SECTION - Register Guestbook Admin Routes (Protected Access)
	// STEP: Register Guestbook Admin Routes (Authentication Required)
	// IMPORTANT: These routes provide admin functionality for moderation
	// TODO: Consider adding rate limiting for admin endpoints
	// SECURITY: Uses AuthMiddleware + AdminMiddleware to validate JWT tokens and admin status
	http.Handle("/api/admin/guestbook",
		accountHandler.AuthMiddleware(accountHandler.AdminMiddleware(http.HandlerFunc(guestbookHandler.GetAllEntriesAdmin))))
	http.Handle("/api/admin/guestbook/delete/",
		accountHandler.AuthMiddleware(accountHandler.AdminMiddleware(http.HandlerFunc(guestbookHandler.DeleteEntry))))
	http.Handle("/api/admin/guestbook/approve/",
		accountHandler.AuthMiddleware(accountHandler.AdminMiddleware(http.HandlerFunc(guestbookHandler.UpdateEntryApproval))))

	// http.Handle("/api/LDS/top/",
	// accountHandler.AuthMiddleware(http.HandlerFunc(infoHandlerLDS.GetTopLDS)))

	//SECTION - 13: Client-Side Routes (SPA Fallback)
	// STEP 13: Client-Side Routes (SPA Fallback)
	// IMPORTANT: These routes serve the SPA for client-side routing
	http.HandleFunc("/lds", catchAllClientRoutesHandler)
	http.HandleFunc("/guestbook", catchAllClientRoutesHandler)
	http.HandleFunc("/admin/guestbook", catchAllClientRoutesHandler)

	/*
		✅ PUBLIC ACCESS - Anyone can see top movies - public top movies
			http.HandleFunc("/api/movies/top", movieHandler.GetTopMovies)
		❌ PROTECTED ACCESS - Only logged-in users can see top movies
			http.Handle("/api/LDS/top/", accountHandler.AuthMiddleware(http.HandlerFunc(infoHandlerLDS.GetTopLDS)))

		💡 HYBRID - Show basic movie information - protect Favorites, Watchlist, Save to Collection
			http.HandleFunc("/api/movies/top", movieHandler.GetTopMovies)           // Top movies
			🔒 PROTECTED - User-specific features
			http.Handle("/api/LDS/favorites/", accountHandler.AuthMiddleware(http.HandlerFunc(ldsHandlerLDS.GetFavorites)))
			http.Handle("/api/LDS/watchlist/", accountHandler.AuthMiddleware(http.HandlerFunc(ldsHandlerLDS.GetWatchlist)))
			http.Handle("/api/LDS/save-to-collection/", accountHandler.AuthMiddleware(http.HandlerFunc(ldsHandlerLDS.SaveToCollection)))
	*/

	// Option 2 is better because your AccountHandler already has the SaveLDSToCollection method and can handle both movie and
	// LDS collections through the same interface.

	http.Handle("/api/LDS/favorites", accountHandler.AuthMiddleware(http.HandlerFunc(accountHandler.GetLDSFavorites)))
	http.Handle("/api/LDS/watchlist", accountHandler.AuthMiddleware(http.HandlerFunc(accountHandler.GetLDSWatchlist)))
	http.Handle("/api/LDS/save-to-collection", accountHandler.AuthMiddleware(http.HandlerFunc(accountHandler.SaveLDSToCollection)))
	// Add this BEFORE the server starts (around line 400, before the LDS server start)

	//SECTION - Register WebAuthn Routes (MUST BE BEFORE catch-all handler)
	// STEP: Register WebAuthn Routes after all other API routes
	fmt.Println("🔐 Registering passkey routes...")
	http.HandleFunc("/api/passkey/authentication-begin", webAuthnHandler.WebAuthnAuthenticationBeginHandler)
	http.HandleFunc("/api/passkey/authentication-end", webAuthnHandler.WebAuthnAuthenticationEndHandler)
	fmt.Println("✅ Passkey routes registered successfully")

	// SECTION - Root Route and Static File Serving (MUST BE LAST)
	// STEP: Handle root route and static files - MUST be registered AFTER all API routes
	fmt.Println("🌐 Registering catch-all handler...")
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Debug logging for passkey requests
		if strings.Contains(r.URL.Path, "passkey") {
			fmt.Printf("🚨 Catch-all handler intercepting passkey request: %s\n", r.URL.Path)
		}

		// If it's the root path, serve index.html
		if r.URL.Path == "/" {
			http.ServeFile(w, r, "./public/index.html")
			return
		}
		// For other paths, try to serve static files first
		filePath := "./public" + r.URL.Path
		if _, err := os.Stat(filePath); err == nil {
			http.ServeFile(w, r, filePath)
			return
		}
		// If file doesn't exist, serve index.html for SPA routing
		http.ServeFile(w, r, "./public/index.html")
	})
	fmt.Println("✅ Catch-all handler registered")

	//TODO - LDS - 7: Start HTTP Server
	const addrLDS = ":8080"
	fmt.Println("Server starting on http://localhost:8080")
	err = http.ListenAndServe(addrLDS, nil) // ListenAndServe for HTTP server
	if err != nil {
		log.Fatalf("Server failed: %v", err)
		ldsLogger.Error("Server failed", err)
		movieLogger.Error("Server failed", err)
	}
}
