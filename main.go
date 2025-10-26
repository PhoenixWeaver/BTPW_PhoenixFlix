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

package main

import (
	// "database/sql"
	"database/sql"
	"log"
	"net/http"
	"os"

	// 	"strings"

	"GoVanilla/data"
	"GoVanilla/handlers"
	"GoVanilla/logger"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

// ======================================================================================================

// =========================================================================================================================
// !SECTION - Initialize logging system
// initializeLogger creates a custom logger instance for the application
// IMPORTANT: This logger is used throughout the application for structured logging
// RELATED: logger/logger.go - Custom logger implementation
func initializeLogger() *logger.Logger {
	logInstance, err := logger.NewLogger("movie.log")

	if err != nil {
		log.Fatalf("Failed to initialice logger %v", err)
	}

	// REVIEW -
	/*you're calling logInstance.Error() BEFORE checking if there was an error creating the logger. This is wrong because:
	If logger.NewLogger() fails, logInstance might be nil
	Calling methods on nil will cause a panic
	The error check comes too late
	*/
	logInstance.Error("Hello from the Error system", nil)
	return logInstance
}

// !SECTION - main.go
func main() {

	// SECTION - 1: Initialize logging system
	// STEP 1: Initialize logging system
	// IMPORTANT: Logger is injected into all components for consistent logging
	logInstance := initializeLogger()
	logInstance.Info("Application started") // Add this line
	// defer logInstance.Close() // Optional: Close the logger file after use

	//SECTION - 2: Load environment variables from .env file
	// STEP 4: Load environment variables from .env file after
	// finishing interface and initalizing PostgreSQL connection
	// IMPORTANT: Environment variables are crucial for configuration
	// NOTE: Consider using a config struct for better organization
	if err := godotenv.Load(); err != nil {
		log.Printf("No .env file found or failed to load: %v", err)
	}

	//SECTION - 3: Connection to PostgreSQL database for the envelope
	// STEP 5: Establish database connection
	// IMPORTANT: PostgreSQL connection is the foundation of the application
	// RELATED: All repository implementations depend on this connection
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
	// IMPORTANT: Repository pattern provides data access abstraction
	// RELATED: data/movie_repository.go, data/account_repository.go
	movieRepo, err := data.NewMovieRepository(db, logInstance)
	if err != nil {
		log.Fatalf("Failed to initialize movierepository")
	}

	// STEP 11: Initialize Account Repository for Users
	// Initialize Account Repository for Users
	// IMPORTANT: Handles user authentication and account management
	// RELATED: data/account_repository.go - AccountRepository implementation
	accountRepo, err := data.NewAccountRepository(db, logInstance)
	if err != nil {
		log.Fatal("Failed to initialize account repository")
	}

	//STUB STEP 6A- we need to pass the movieRepo to the handler >>> to make the handler work
	// ========== This will be replaced by the following code Section 5 using NewMovieHandler
	// movieHandler := handlers.MovieHandler{
	// 	//Initializing the MovieHandler object with the movieRepo and logInstance
	// 	// >>> creating a new MovieHandler object
	// 	// storage: movieRepo,
	// 	// logger:  logInstance,
	// }
	// //This is like a new MovieHandler(movieRepo, logInstance) >>> it's a new MovieHandler object
	// //Alternative:
	// movieHandler.Storage = movieRepo  /// in movie_handler.go >>> this is the way to pass the movieRepo to the handler if Capital letter
	// movieHandler.Logger = logInstance // >>> to pass the movieRepo to the handler if Capital letter
	// /*REVIEW - 3 Options to pass the movieRepo to the handler
	// Option 1: Struct Literal (What you're trying to do)
	// 	movieHandler := handlers.MovieHandler{
	//     Storage: movieRepo,
	//     Logger:  logInstance,}
	// Option 2: Field Assignment (What you're currently doing)
	// 	movieHandler := handlers.MovieHandler{}
	// 	movieHandler.Storage = movieRepo
	// 	movieHandler.Logger = logInstance
	// Both will work IF you make the fields exported (capitalized) in the struct definition.
	// However, there's a better approach - use a constructor function:
	// Option 3: Constructor Function (Recommended)
	// // In handlers/movie_handlers.go - uncomment this:
	// 	func NewMovieHandler(storage data.MovieStorage, log *logger.Logger) *MovieHandler {
	//   	  return &MovieHandler{
	//         	Storage: storage,
	//       		 Logger:  log,    }
	// }
	// // In GV2.go - use this:
	// 	movieHandler := handlers.NewMovieHandler(movieRepo, logInstance)
	///////////////////////////////////////////////////////////////////////!SECTION

	//SECTION 5 - NewMovieHandler >>> this is the new way to create a MovieHandler object
	// STEP 7: Initialize HTTP Handlers >> into a single line factory function in movie_handlers.go
	// IMPORTANT: Handlers contain business logic and HTTP request processing
	// RELATED: handlers/movie_handler.go, handlers/account_handler.go
	//NOTE: if we want to use the NEW something >>> Have to create an OBJECT of that something
	// we have many types if MovieHandler which one >> use type MovieHandler wirh Logger
	movieHandler := handlers.NewMovieHandler(movieRepo, logInstance)
	//STEP 11B: Initialize Account Handler
	accountHandler := handlers.NewAccountHandler(accountRepo, logInstance)

	//SECTION 6 - Register Public API Routes (No Authentication Required) with NewMovieHandler
	// STEP 8: Register Public API Routes (No Authentication Required)
	// IMPORTANT: These endpoints are accessible without authentication
	// TODO: Consider adding rate limiting for public endpoints
	//NOTE - Order is important > genres first then search then movie by ID >> GENERAL > SPECIFIC
	http.HandleFunc("/api/movies/top", movieHandler.GetTopMovies)
	http.HandleFunc("/api/movies/random", movieHandler.GetRandomMovies)
	http.HandleFunc("/api/movies/language/", movieHandler.GetMoviesByLanguage) // 🌍 Get movies by language
	http.HandleFunc("/api/movies/search/", movieHandler.SearchMovies)
	//example: api/movies/search/?q=Mad Max&order=asc&genre=1
	// >>> Search by name Mad Max, order by score, genre by 1
	http.HandleFunc("/api/movies/", movieHandler.GetMovie) // Only 1 movies by ID example: api/movies/77
	http.HandleFunc("/api/genres", movieHandler.GetGenres)

	// STEP 11C: Register URL - Public API Routes (No Authentication Required) with NewAccountHandler
	http.HandleFunc("/api/account/register", accountHandler.Register)
	http.HandleFunc("/api/account/authenticate", accountHandler.Authenticate)

	// If we use this http.HandleFunc("/api/movies/top/", handlers.GetTopMovies) with the top/
	// it would use the handler from the handlers package instead of OUR OBJECT movieHandler

	//SECTION 7 -
	// STEP 12: Register Protected API Routes (Authentication Required)
	// IMPORTANT: AuthMiddleware protects these endpoints from unauthorized access
	// RELATED: AuthMiddleware implementation in account_handler.go
	http.Handle("/api/account/favorites/",
		accountHandler.AuthMiddleware(http.HandlerFunc(accountHandler.GetFavorites)))

	http.Handle("/api/account/watchlist/",
		accountHandler.AuthMiddleware(http.HandlerFunc(accountHandler.GetWatchlist)))

	http.Handle("/api/account/save-to-collection/",
		accountHandler.AuthMiddleware(http.HandlerFunc(accountHandler.SaveToCollection)))

	//SECTION 8 -
	// // STEP 8: WebAuthn (Passkey) Configuration
	// // IMPORTANT: Modern passwordless authentication using WebAuthn standard
	// // TODO: Update RPOrigins for production deployment
	// wconfig := &webauthn.Config{
	// 	RPDisplayName: "ReelingIt",
	// 	RPID:          "localhost",
	// 	RPOrigins:     []string{"http://localhost:8080"},
	// }

	// var webAuthnManager *webauthn.WebAuthn

	// if webAuthnManager, err = webauthn.New(wconfig); err != nil {
	// 	logInstance.Error("Error creating WebAuthn", err)
	// }

	// if err != nil {
	// 	logInstance.Error("Error initialing Passkey engine", err)
	// }

	//SECTION 9 -
	// // STEP 9: Initialize Passkey Repository and Handler
	// // IMPORTANT: Passkey support for modern authentication
	// // RELATED: data/passkey_repository.go, handlers/webauthn_handler.go
	// passkeyRepo := data.NewPasskeyRepository(db, *logInstance)
	// webAuthnHandler := handlers.NewWebAuthnHandler(passkeyRepo, logInstance, webAuthnManager)

	//SECTION 10 -
	// // STEP 10: Register WebAuthn Routes
	// // IMPORTANT: Registration requires user authentication, authentication doesn't
	// // RELATED: WebAuthnHandler implementation in handlers/webauthn_handler.go
	// http.Handle("/api/passkey/registration-begin",
	// 	accountHandler.AuthMiddleware(http.HandlerFunc(webAuthnHandler.WebAuthnRegistrationBeginHandler)))
	// http.Handle("/api/passkey/registration-end",
	// 	accountHandler.AuthMiddleware(http.HandlerFunc(webAuthnHandler.WebAuthnRegistrationEndHandler)))
	// // No need for User Authentication before
	// http.HandleFunc("/api/passkey/authentication-begin", webAuthnHandler.WebAuthnAuthenticationBeginHandler)
	// http.HandleFunc("/api/passkey/authentication-end", webAuthnHandler.WebAuthnAuthenticationEndHandler)

	//SECTION 11 -
	// STEP 9: Frontend Routing Setup
	// IMPORTANT: SPA (Single Page Application) routing with catch-all handler
	// TODO: Consider using a proper router library for better route management
	catchAllClientRoutesHandler := func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./public/index.html")
	}

	//SECTION 12 -
	// // STEP 11: Server-Side Rendering (SSR) for Movie Details
	// // IMPORTANT: SEO-friendly rendering for movie detail pages
	// // RELATED: SSRMovieDetailsHandler in handlers package
	// http.HandleFunc("/movies/", func(w http.ResponseWriter, r *http.Request) {
	// 	if strings.Count(r.URL.Path, "/") == 2 && strings.HasPrefix(r.URL.Path, "/movies/") {
	// 		handlers.SSRMovieDetailsHandler(movieRepo, logInstance)(w, r)
	// 	} else {
	// 		catchAllClientRoutesHandler(w, r)
	// 	}
	// })

	//SECTION - 13: Client-Side Routes (SPA Fallback)
	// STEP 10: Client-Side Routes (SPA Fallback)
	// IMPORTANT: These routes serve the SPA for client-side routing
	http.HandleFunc("/movies", catchAllClientRoutesHandler)
	http.HandleFunc("/movies/", catchAllClientRoutesHandler)
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
	http.Handle("/", http.FileServer(http.Dir("public"))) // FilesServer for static files mo handling routes
	// fmt.Println("Serving the files")

	//SECTION 15 -
	// STEP 2 : Start HTTP Server
	// IMPORTANT: Server listens on port 8080 for all HTTP requests
	// TODO: Add graceful shutdown handling
	const addr = ":8080"
	// openWebBrowser(addr + "/api/movies/top/") // Before starting server
	err = http.ListenAndServe(addr, nil) // ListenAndServe for HTTP server
	if err != nil {
		log.Fatalf("Server failed: %v", err)
		logInstance.Error("Server failed", err)
	}
}



