# 📝 Code Notes & Documentation Guide

## Purpose
This guide explains the structured commenting system used in PhoenixFlix for organizing and documenting code with chapters, sections, and steps.

---

## Table of Contents
1. [Tag Reference](#tag-reference)
2. [Hierarchical Structure](#hierarchical-structure)
3. [Usage Examples](#usage-examples)
4. [Best Practices](#best-practices)
5. [VS Code Integration](#vs-code-integration)

---

## Tag Reference

### 🎯 Structural Tags

#### `SECTION` - Major Code Sections
**Purpose**: Mark the beginning of a major logical section  
**Color**: 🔵 Cyan (Bright)  
**Usage**: Top-level organization

```go
//SECTION - 1: Database Initialization
// Description of what this section does
```

#### `!SECTION` - Section End Marker
**Purpose**: Mark the end of a major section  
**Color**: 🔴 Red (Alert)  
**Usage**: Optional but helpful for long sections

```go
//!SECTION - Database Initialization Complete
```

#### `STEP` - Sequential Steps
**Purpose**: Mark individual steps within a section  
**Color**: 🟢 Green (Progress)  
**Usage**: Numbered actions or procedures

```go
// STEP 1: Initialize the logger
// STEP 2: Load environment variables
// STEP 3: Connect to database
```

---

### 📌 Annotation Tags

#### `IMPORTANT` - Critical Information
**Purpose**: Highlight critical information or requirements  
**Color**: 🔴 Red  
**Usage**: Things that must not be overlooked

```go
// IMPORTANT: This function must be called before any database operations
// IMPORTANT: Connection pool size affects performance significantly
```

#### `NOTE` - General Notes
**Purpose**: Additional context or explanations  
**Color**: 🟠 Orange  
**Usage**: Helpful information for future developers

```go
// NOTE: This approach was chosen for better performance
// NOTE: Alternative implementation in branch feature/optimize
```

#### `TODO` - Tasks to Complete
**Purpose**: Mark incomplete work or future tasks  
**Color**: 🔴 Orange-Red  
**Usage**: Action items

```go
// TODO: Add input validation
// TODO: Implement retry logic for production
```

#### `FIXME` - Known Issues
**Purpose**: Mark code with known bugs or issues  
**Color**: 🟠 Orange (Bold)  
**Usage**: Problems that need fixing

```go
// FIXME: Memory leak when connection pool exhausted
// FIXME: Race condition on concurrent requests
```

#### `HACK` - Temporary Solutions
**Purpose**: Mark workarounds or non-ideal solutions  
**Color**: 🟤 Dark Red  
**Usage**: Code that should be improved

```go
// HACK: Workaround for third-party library bug
// HACK: Using sleep instead of proper synchronization
```

#### `REVIEW` - Needs Review
**Purpose**: Code that needs review or discussion  
**Color**: 🟣 Purple  
**Usage**: Uncertain implementations

```go
// REVIEW: Is this the most efficient approach?
// REVIEW: Should we cache these results?
```

#### `RELATED` - Cross References
**Purpose**: Reference related code in other files  
**Color**: 🟣 Indigo  
**Usage**: Navigation help

```go
// RELATED: See data/movie_repository.go for implementation
// RELATED: Used by handlers/account_handler.go:123
```

#### `STUB` - Placeholder Code
**Purpose**: Mark incomplete implementations  
**Color**: 🟡 Yellow  
**Usage**: Code to be completed later

```go
// STUB: Implement pagination logic
func GetMovies() []Movie {
    // STUB: Return mock data for now
    return []Movie{}
}
```

---

## Hierarchical Structure

### Level 1: Chapters (File Level)
Use file header comments for major chapters

```go
/*
===============================================================================
Chapter 1: Application Bootstrap & Initialization
===============================================================================
This chapter covers the entire application startup sequence including:
- Logger setup
- Environment configuration  
- Database connections
- Handler initialization
===============================================================================
*/
```

### Level 2: Sections
Use `SECTION` tags for major functional areas

```go
//SECTION - 1: Logger Initialization
// This section sets up the application-wide logging system
// All subsequent operations use this logger instance
```

### Level 3: Subsections
Use `STEP` tags for sequential operations

```go
// STEP 1: Create logger instance
// STEP 2: Configure log file rotation
// STEP 3: Set log level from environment
```

### Level 4: Implementation Details
Use annotation tags for specific details

```go
// IMPORTANT: Logger must be initialized first
// NOTE: Log file is created in ./logs directory
// TODO: Add log aggregation for production
```

---

## Usage Examples

### Example 1: Complete Section Structure

```go
//SECTION - 3: Database Connection & Repository Setup
// This section establishes the PostgreSQL connection and initializes
// all data repositories that depend on it.
// IMPORTANT: DATABASE_URL environment variable must be set
// RELATED: See .env.example for configuration template

// STEP 1: Load database connection string from environment
// NOTE: Falls back to localhost:5432 if not set
dbConnStr := os.Getenv("DATABASE_URL")
if dbConnStr == "" {
    // TODO: Add default connection string for development
    log.Fatalf("DATABASE_URL not set in environment")
}

// STEP 2: Establish database connection
// IMPORTANT: Uses PostgreSQL driver (lib/pq)
// RELATED: go.mod for driver dependency
db, err := sql.Open("postgres", dbConnStr)
if err != nil {
    // FIXME: Add retry logic with exponential backoff
    log.Fatalf("Failed to connect to database: %v", err)
}

// STEP 3: Configure connection pool
// NOTE: These values are optimized for typical web workload
// REVIEW: Should these be configurable via environment?
db.SetMaxOpenConns(25)
db.SetMaxIdleConns(5)
db.SetConnMaxLifetime(5 * time.Minute)

// STEP 4: Verify connection is alive
// IMPORTANT: This ensures database is accessible before continuing
if err := db.Ping(); err != nil {
    log.Fatalf("Database ping failed: %v", err)
}

// STEP 5: Initialize Movie Repository
// RELATED: data/movie_repository.go
movieRepo, err := data.NewMovieRepository(db, logInstance)
if err != nil {
    log.Fatalf("Failed to initialize movie repository: %v", err)
}

// STEP 6: Initialize Account Repository  
// RELATED: data/account_repository.go
accountRepo, err := data.NewAccountRepository(db, logInstance)
if err != nil {
    log.Fatalf("Failed to initialize account repository: %v", err)
}

//!SECTION - Database setup complete, repositories ready
```

### Example 2: Handler with Documentation

```go
//SECTION - Movie Search Handler
// This handler provides movie search functionality with multiple filters

// GetMoviesByLanguage retrieves movies filtered by language code
// STEP 1: Extract language parameter from URL
// STEP 2: Validate language code format
// STEP 3: Query repository with language filter
// STEP 4: Return JSON response
//
// IMPORTANT: Language codes must be ISO 639-1 format (en, es, fr, etc.)
// RELATED: See models/movie.go for Movie struct definition
//
// Example Usage:
//   GET /api/movies/language/en    → English movies
//   GET /api/movies/language/es    → Spanish movies
//
// TODO: Add pagination support
// TODO: Add sorting options (newest, rating, etc.)
func (h *MovieHandler) GetMoviesByLanguage(w http.ResponseWriter, r *http.Request) {
    // STEP 1: Extract language from URL path
    // NOTE: Path format is /api/movies/language/{lang}
    parts := strings.Split(r.URL.Path, "/")
    if len(parts) < 5 {
        // IMPORTANT: Return 400 for malformed requests
        http.Error(w, "Language code required", http.StatusBadRequest)
        return
    }
    
    language := parts[4]
    
    // STEP 2: Validate language code
    // NOTE: Using simple length check for now
    // TODO: Implement proper ISO 639-1 validation
    if len(language) != 2 {
        http.Error(w, "Invalid language code", http.StatusBadRequest)
        return
    }
    
    // STEP 3: Query database via repository
    // RELATED: data/movie_repository.go:GetByLanguage()
    movies, err := h.Storage.GetByLanguage(language)
    if err != nil {
        // FIXME: Don't expose internal errors to client
        h.Logger.Error("Failed to fetch movies by language", err)
        http.Error(w, "Internal server error", http.StatusInternalServerError)
        return
    }
    
    // STEP 4: Return JSON response
    // NOTE: Setting proper content type header
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(movies)
    
    // Log successful response
    h.Logger.Info(fmt.Sprintf("Returned %d movies for language: %s", len(movies), language))
}

//!SECTION - Movie search handler complete
```

### Example 3: Repository with Business Logic

```go
//SECTION - Account Repository: User Management
// This repository handles all database operations related to user accounts

// CreateAccount creates a new user account
// IMPORTANT: Password must be hashed before calling this function
// RELATED: handlers/account_handler.go for password hashing
//
// STEP 1: Validate email uniqueness
// STEP 2: Insert user record
// STEP 3: Return created user with ID
func (r *AccountRepository) CreateAccount(email, passwordHash, fullName string) (*Account, error) {
    // STEP 1: Check if email already exists
    // IMPORTANT: Prevents duplicate accounts
    // NOTE: Email is unique constraint in database schema
    var exists bool
    checkQuery := "SELECT EXISTS(SELECT 1 FROM accounts WHERE email = $1)"
    err := r.db.QueryRow(checkQuery, email).Scan(&exists)
    if err != nil {
        r.logger.Error("Failed to check email existence", err)
        return nil, err
    }
    
    if exists {
        // NOTE: Return specific error for duplicate email
        return nil, errors.New("email already registered")
    }
    
    // STEP 2: Insert new account
    // NOTE: Using RETURNING clause to get generated ID
    insertQuery := `
        INSERT INTO accounts (email, password_hash, full_name, created_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING id, created_at
    `
    
    account := &Account{
        Email:        email,
        PasswordHash: passwordHash,
        FullName:     fullName,
    }
    
    // IMPORTANT: Use QueryRow for single row insert with RETURNING
    err = r.db.QueryRow(insertQuery, email, passwordHash, fullName).
        Scan(&account.ID, &account.CreatedAt)
    
    if err != nil {
        // FIXME: Distinguish between different error types
        r.logger.Error("Failed to create account", err)
        return nil, err
    }
    
    // STEP 3: Log successful creation
    r.logger.Info(fmt.Sprintf("Created new account: %s (ID: %d)", email, account.ID))
    
    return account, nil
}

//!SECTION - Account repository complete
```

---

## Best Practices

### DO ✅

1. **Use hierarchical structure**
   ```go
   //SECTION - Major Area
   // STEP 1: First thing
   // STEP 2: Second thing
   //!SECTION
   ```

2. **Add context to tags**
   ```go
   // IMPORTANT: This must run before X because Y
   // TODO: Add feature X after release 2.0
   ```

3. **Reference related code**
   ```go
   // RELATED: data/repository.go:125
   // RELATED: See handlers/auth.go for usage example
   ```

4. **Document assumptions**
   ```go
   // NOTE: Assumes database connection is already established
   // NOTE: User must be authenticated before calling
   ```

5. **Explain non-obvious code**
   ```go
   // NOTE: Using buffered channel to prevent goroutine leak
   // IMPORTANT: Array size must match database column count
   ```

### DON'T ❌

1. **Don't over-comment obvious code**
   ```go
   // BAD: Don't do this
   i++ // Increment i by 1
   ```

2. **Don't leave outdated comments**
   ```go
   // BAD: Comment doesn't match code
   // TODO: Implement this function
   func CompletelyImplementedFunction() { ... }
   ```

3. **Don't use vague descriptions**
   ```go
   // BAD: Too vague
   // NOTE: Fix this later
   
   // GOOD: Specific
   // TODO: Add email validation using regex after v2.0 release
   ```

4. **Don't mix tag purposes**
   ```go
   // BAD: Wrong tag usage
   // FIXME: Add new feature
   
   // GOOD: Correct tags
   // TODO: Add new feature
   ```

---

## VS Code Integration

### Setup (Already Configured!)

Your project now includes `.vscode/settings.json` with Better Comments configuration.

### Keyboard Shortcuts

Add these to your `keybindings.json`:

```json
[
  {
    "key": "ctrl+alt+s",
    "command": "editor.action.insertSnippet",
    "args": {
      "snippet": "//SECTION - ${1:name}\n// ${2:description}\n$0\n//!SECTION"
    }
  },
  {
    "key": "ctrl+alt+t",
    "command": "editor.action.insertSnippet",
    "args": {
      "snippet": "// STEP ${1:number}: ${2:description}"
    }
  }
]
```

### Code Snippets

Create `.vscode/go.code-snippets`:

```json
{
  "Section Block": {
    "prefix": "sec",
    "body": [
      "//SECTION - ${1:number}: ${2:name}",
      "// ${3:description}",
      "$0",
      "//!SECTION - ${2:name}"
    ],
    "description": "Create a section block"
  },
  "Step Comment": {
    "prefix": "step",
    "body": ["// STEP ${1:number}: ${2:description}"],
    "description": "Add a step comment"
  },
  "Important Note": {
    "prefix": "imp",
    "body": ["// IMPORTANT: ${1:message}"],
    "description": "Add important comment"
  },
  "TODO Item": {
    "prefix": "todo",
    "body": ["// TODO: ${1:task}"],
    "description": "Add TODO item"
  },
  "Related Reference": {
    "prefix": "rel",
    "body": ["// RELATED: ${1:file_path}"],
    "description": "Add related file reference"
  }
}
```

### Usage:
1. Type `sec` + Tab → Creates full section block
2. Type `step` + Tab → Creates step comment
3. Type `imp` + Tab → Creates important note
4. Type `todo` + Tab → Creates TODO item
5. Type `rel` + Tab → Creates related reference

---

## Documentation Workflow

### 1. Planning Phase
```go
// TODO: Implement user authentication
// TODO: Add password reset functionality
// TODO: Integrate WebAuthn passkeys
```

### 2. Implementation Phase
```go
//SECTION - Authentication Implementation
// STEP 1: Create JWT token generator
// IMPORTANT: Use secure secret key from environment
```

### 3. Review Phase
```go
// REVIEW: Is this error handling adequate?
// NOTE: Consider adding retry logic here
```

### 4. Completion Phase
```go
// Remove or update TODOs
// Add final RELATED references
// Complete !SECTION markers
```

---

## Example: Complete File Documentation

See `main.go` for a real-world example of this system in action!

Key features demonstrated:
- ✅ Clear section hierarchy
- ✅ Numbered steps
- ✅ Important callouts
- ✅ Cross-file references
- ✅ TODOs and FIXMEs
- ✅ Section boundaries

---

## Additional Resources

- **Better Comments Extension**: https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments
- **Go Doc Comments**: https://go.dev/doc/comment
- **Code Documentation Guide**: https://google.github.io/styleguide/go/

---

**Happy Documenting! 📚✨**

