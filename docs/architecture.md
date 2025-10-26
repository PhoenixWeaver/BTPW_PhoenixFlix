# 🏗️ PhoenixFlix Architecture Documentation

## System Overview

PhoenixFlix is a multi-purpose streaming platform with dual database architecture, WebAuthn authentication, and family-friendly content management.

---

## High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser]
        B[Mobile App]
    end
    
    subgraph "Frontend - SPA"
        C[HTML/CSS/JS]
        D[Router]
        E[API Service]
        F[Store/State]
    end
    
    subgraph "Backend - Go Server"
        G[HTTP Server :8080]
        H[Movie Handler]
        I[Account Handler]
        J[WebAuthn Handler]
        K[Auth Middleware]
    end
    
    subgraph "Data Layer"
        L[Movie Repository]
        M[Account Repository]
        N[Passkey Repository]
    end
    
    subgraph "Storage"
        O[(PostgreSQL<br/>Movies DB)]
        P[(PostgreSQL<br/>Users DB)]
    end
    
    A --> C
    B --> C
    C --> D
    D --> E
    E --> F
    E --> G
    G --> H
    G --> I
    G --> J
    I --> K
    H --> L
    I --> M
    J --> N
    L --> O
    M --> P
    N --> P
    
    style G fill:#4ECDC4
    style O fill:#95E1D3
    style P fill:#95E1D3
```

---

## Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API Server
    participant M as Auth Middleware
    participant R as Account Repo
    participant D as PostgreSQL
    participant J as JWT Service
    
    rect rgb(200, 220, 240)
        Note over U,D: User Registration Flow
        U->>F: Fill Registration Form
        F->>A: POST /api/account/register
        A->>R: CreateAccount(user)
        R->>D: INSERT INTO accounts
        D-->>R: User ID
        R-->>A: Created User
        A->>J: GenerateToken(userID)
        J-->>A: JWT Token
        A-->>F: {token, user}
        F-->>U: Registration Success
    end
    
    rect rgb(200, 240, 220)
        Note over U,D: Login Flow
        U->>F: Enter Credentials
        F->>A: POST /api/account/authenticate
        A->>R: VerifyCredentials(email, password)
        R->>D: SELECT * FROM accounts WHERE email=?
        D-->>R: User Record
        R->>R: bcrypt.CompareHashAndPassword()
        R-->>A: Authenticated User
        A->>J: GenerateToken(userID)
        J-->>A: JWT Token
        A-->>F: {token, user}
        F->>F: Store token in localStorage
        F-->>U: Login Success
    end
    
    rect rgb(240, 220, 200)
        Note over U,D: Protected Request Flow
        U->>F: Access Favorites
        F->>A: GET /api/account/favorites/<br/>Authorization: Bearer {token}
        A->>M: Verify JWT Token
        M->>J: ParseToken(token)
        J-->>M: Claims (userID, email)
        M->>A: Request with UserID
        A->>R: GetFavorites(userID)
        R->>D: SELECT * FROM favorites WHERE user_id=?
        D-->>R: Favorites List
        R-->>A: Favorites
        A-->>F: JSON Response
        F-->>U: Display Favorites
    end
```

---

## Data Flow Architecture

```mermaid
flowchart LR
    subgraph Input
        A[HTTP Request]
    end
    
    subgraph "Handler Layer"
        B[Parse Request]
        C{Validate}
        D[Business Logic]
    end
    
    subgraph "Repository Layer"
        E[Data Validation]
        F[SQL Query]
        G[Error Handling]
    end
    
    subgraph "Database"
        H[(PostgreSQL)]
    end
    
    subgraph Output
        I[HTTP Response]
    end
    
    A --> B
    B --> C
    C -->|Valid| D
    C -->|Invalid| I
    D --> E
    E --> F
    F --> H
    H --> G
    G --> D
    D --> I
    
    style C fill:#FFA502
    style D fill:#4ECDC4
    style H fill:#95E1D3
```

---

## Component Relationships

```mermaid
classDiagram
    class MovieHandler {
        -storage MovieStorage
        -logger Logger
        +GetTopMovies()
        +GetRandomMovies()
        +SearchMovies()
        +GetMovie()
        +GetGenres()
    }
    
    class AccountHandler {
        -storage AccountStorage
        -logger Logger
        +Register()
        +Authenticate()
        +GetFavorites()
        +GetWatchlist()
        +AuthMiddleware()
    }
    
    class MovieRepository {
        -db Database
        -logger Logger
        +GetAll()
        +GetByID()
        +GetTopRated()
        +Search()
    }
    
    class AccountRepository {
        -db Database
        -logger Logger
        +Create()
        +GetByEmail()
        +GetByID()
        +UpdateFavorites()
    }
    
    class Logger {
        -file File
        +Info()
        +Error()
        +Warn()
    }
    
    class Database {
        +Query()
        +Exec()
        +Close()
    }
    
    MovieHandler --> MovieRepository : uses
    AccountHandler --> AccountRepository : uses
    MovieRepository --> Database : queries
    AccountRepository --> Database : queries
    MovieHandler --> Logger : logs
    AccountHandler --> Logger : logs
    MovieRepository --> Logger : logs
    AccountRepository --> Logger : logs
```

---

## Database Schema (ERD)

```mermaid
erDiagram
    MOVIES ||--o{ MOVIE_GENRES : has
    MOVIES {
        int id PK
        string title
        int year
        string language
        string poster_url
        string trailer_url
        text description
        float rating
        timestamp created_at
    }
    
    GENRES ||--o{ MOVIE_GENRES : includes
    GENRES {
        int id PK
        string name
        string slug
    }
    
    MOVIE_GENRES {
        int movie_id FK
        int genre_id FK
    }
    
    ACCOUNTS ||--o{ FAVORITES : has
    ACCOUNTS ||--o{ WATCHLIST : has
    ACCOUNTS ||--o{ PASSKEYS : owns
    ACCOUNTS {
        int id PK
        string email UK
        string password_hash
        string full_name
        timestamp created_at
        timestamp updated_at
    }
    
    MOVIES ||--o{ FAVORITES : in
    FAVORITES {
        int id PK
        int user_id FK
        int movie_id FK
        timestamp added_at
    }
    
    MOVIES ||--o{ WATCHLIST : in
    WATCHLIST {
        int id PK
        int user_id FK
        int movie_id FK
        boolean watched
        timestamp added_at
    }
    
    PASSKEYS {
        int id PK
        int user_id FK
        binary credential_id
        binary public_key
        int sign_count
        timestamp created_at
    }
```

---

## API Endpoint Structure

```mermaid
mindmap
  root((PhoenixFlix API))
    Movies
      GET /api/movies/top
      GET /api/movies/random
      GET /api/movies/language/:lang
      GET /api/movies/search/?q=
      GET /api/movies/:id
      GET /api/genres
    Account
      Public
        POST /api/account/register
        POST /api/account/authenticate
      Protected
        GET /api/account/favorites/
        GET /api/account/watchlist/
        POST /api/account/save-to-collection/
    WebAuthn
      Protected
        POST /api/passkey/registration-begin
        POST /api/passkey/registration-end
      Public
        POST /api/passkey/authentication-begin
        POST /api/passkey/authentication-end
    Frontend Routes
      / → index.html
      /movies → SPA
      /account → SPA
```

---

## Deployment Architecture

```mermaid
graph TB
    subgraph "Production Environment"
        A[Load Balancer]
        
        subgraph "Application Servers"
            B[Go Server 1<br/>:8080]
            C[Go Server 2<br/>:8080]
            D[Go Server 3<br/>:8080]
        end
        
        subgraph "Database Layer"
            E[(Primary PostgreSQL)]
            F[(Replica PostgreSQL)]
        end
        
        subgraph "Static Assets"
            G[CDN]
            H[S3/Storage]
        end
    end
    
    I[Users] --> A
    A --> B
    A --> C
    A --> D
    B --> E
    C --> E
    D --> E
    E --> F
    B --> G
    C --> G
    D --> G
    G --> H
    
    style E fill:#95E1D3
    style G fill:#4ECDC4
```

---

## Security Flow

```mermaid
stateDiagram-v2
    [*] --> Unauthenticated
    
    Unauthenticated --> Registering : Register
    Unauthenticated --> Authenticating : Login
    
    Registering --> Authenticated : Success
    Registering --> Unauthenticated : Failure
    
    Authenticating --> Authenticated : Valid Credentials
    Authenticating --> Unauthenticated : Invalid Credentials
    
    Authenticated --> AccessingResource : Make Request
    
    AccessingResource --> ValidatingToken : Check JWT
    
    ValidatingToken --> Authorized : Valid Token
    ValidatingToken --> Unauthenticated : Invalid/Expired Token
    
    Authorized --> AccessingResource : Continue
    Authorized --> [*] : Logout
    
    note right of ValidatingToken
        JWT Validation:
        1. Check signature
        2. Verify expiry
        3. Extract user claims
    end note
```

---

## Technology Stack

```mermaid
graph LR
    subgraph Frontend
        A[HTML5]
        B[CSS3]
        C[Vanilla JavaScript]
        D[Service Worker]
    end
    
    subgraph Backend
        E[Go 1.21+]
        F[net/http]
        G[database/sql]
    end
    
    subgraph Libraries
        H[JWT v5]
        I[WebAuthn]
        J[godotenv]
        K[lib/pq PostgreSQL]
    end
    
    subgraph Database
        L[PostgreSQL]
    end
    
    subgraph Tools
        M[Mermaid]
        N[SchemaSpy]
        O[pkgsite/godoc]
    end
    
    A --> E
    B --> E
    C --> E
    D --> E
    E --> F
    E --> G
    E --> H
    E --> I
    E --> J
    G --> K
    K --> L
    
    style E fill:#4ECDC4
    style L fill:#95E1D3
```

---

## Request/Response Cycle

```mermaid
sequenceDiagram
    autonumber
    participant Browser
    participant Router
    participant Handler
    participant Middleware
    participant Repository
    participant Database
    
    Browser->>Router: HTTP Request
    Router->>Middleware: Route to Handler
    
    alt Protected Route
        Middleware->>Middleware: Validate JWT
        alt Invalid Token
            Middleware-->>Browser: 401 Unauthorized
        else Valid Token
            Middleware->>Handler: Forward Request + UserID
        end
    else Public Route
        Middleware->>Handler: Forward Request
    end
    
    Handler->>Handler: Parse & Validate Input
    
    alt Invalid Input
        Handler-->>Browser: 400 Bad Request
    else Valid Input
        Handler->>Repository: Call Data Method
        Repository->>Database: Execute SQL Query
        Database-->>Repository: Query Results
        Repository->>Repository: Map to Struct
        Repository-->>Handler: Return Data/Error
        
        alt Database Error
            Handler-->>Browser: 500 Internal Error
        else Success
            Handler->>Handler: Format Response
            Handler-->>Browser: 200 OK + JSON
        end
    end
```

---

## File Structure

```
BTPW_PhoenixFlix/
├── main.go                     # Application entry point
├── go.mod                      # Go module definition
├── go.sum                      # Dependency checksums
├── .env                        # Environment variables
│
├── data/                       # Repository Layer
│   ├── movie_repository.go
│   ├── account_repository.go
│   └── passkey_repository.go
│
├── handlers/                   # HTTP Handlers
│   ├── movie_handler.go
│   ├── account_handler.go
│   └── webauthn_handler.go
│
├── models/                     # Data Models
│   ├── movie.go
│   ├── account.go
│   └── passkey.go
│
├── logger/                     # Logging System
│   └── logger.go
│
├── token/                      # JWT Token Management
│   └── jwt.go
│
├── public/                     # Frontend Assets
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   ├── components/             # UI Components
│   ├── services/               # API Services
│   └── images/
│
├── docs/                       # Documentation
│   ├── architecture.md         # This file!
│   ├── api-reference.md
│   ├── database/               # SchemaSpy output
│   └── diagrams/
│
└── tools/                      # Development Tools
    ├── schemaspy.jar
    └── postgresql-jdbc.jar
```

---

**Generated with ❤️ for PhoenixFlix**

