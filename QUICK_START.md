# 🚀 PhoenixFlix - Quick Start Guide

## ⚡ Fast Setup (5 Minutes)

### Step 1: Install Tools (One-Time Setup)

```powershell
# Install all documentation tools at once
npm install
npm run install:all
```

This installs:
- ✅ Mermaid CLI (for diagrams)
- ✅ Go documentation tools (godoc/pkgsite)
- ✅ SchemaSpy (for database docs)

### Step 2: Configure Database Credentials

Edit `tools/schemaspy.properties`:
```properties
schemaspy.db=your_database_name
schemaspy.u=your_username
schemaspy.p=your_password
```

### Step 3: You're Ready! 🎉

---

## 📝 Using Code Notes

### VS Code Snippets (Already Configured!)

Type these shortcuts and press **Tab**:

| Shortcut | Creates | Example |
|----------|---------|---------|
| `sec` + Tab | Full section block | Section with start/end |
| `step` + Tab | Numbered step | STEP 1: Description |
| `imp` + Tab | Important note | IMPORTANT: Must do this |
| `todo` + Tab | TODO item | TODO: Implement feature |
| `note` + Tab | General note | NOTE: Consider this |
| `rel` + Tab | Related reference | RELATED: other/file.go |
| `review` + Tab | Review comment | REVIEW: Is this correct? |
| `fixme` + Tab | Known issue | FIXME: Bug here |

### Color-Coded Comments (Better Comments Extension)

Your comments are now automatically color-coded:
- 🔴 **Red**: IMPORTANT, !SECTION, TODO
- 🔵 **Cyan**: SECTION
- 🟢 **Green**: STEP
- 🟠 **Orange**: NOTE, FIXME
- 🟣 **Purple**: REVIEW, RELATED
- 🟡 **Yellow**: STUB

---

## 📚 Documentation Commands

### Generate Documentation

```powershell
# Generate all documentation
npm run docs:generate

# Generate database documentation
npm run docs:database

# Generate API documentation
npm run docs:api

# View Go documentation server
npm run docs:serve
```

### View Documentation

```powershell
# Open database docs
start docs/database/index.html

# Open architecture diagrams
start docs/architecture.md  # In VS Code with Mermaid preview
```

---

## 💻 Development Commands

```powershell
# Run the application
npm run dev

# Build executable
npm run build

# Format code
npm run fmt

# Run tests
npm run test

# Clean dependencies
npm run tidy
```

---

## 📖 Documentation Structure

```
PhoenixFlix/
├── INSTALLATION_GUIDE.md          ← Full installation guide
├── QUICK_START.md                 ← This file!
├── docs/
│   ├── architecture.md            ← System architecture (with Mermaid)
│   ├── CODE_NOTES_GUIDE.md        ← How to use code notes
│   ├── api-reference.txt          ← API documentation
│   └── database/                  ← Database schema docs
│       └── index.html
├── .vscode/
│   ├── settings.json              ← Better Comments config
│   ├── extensions.json            ← Recommended extensions
│   └── go.code-snippets           ← Code snippets
└── tools/
    ├── schemaspy.properties       ← Database config
    ├── setup-schemaspy.ps1        ← Setup script
    └── generate-docs.ps1          ← Documentation generator
```

---

## 🎨 VS Code Extensions (Auto-Install)

When you open the project in VS Code, install these recommended extensions:

1. **Better Comments** ⭐ - Colorful code annotations
2. **Go** - Official Go support
3. **Markdown Mermaid** - Diagram preview
4. **Markdown Preview Enhanced** - Advanced markdown
5. **SQLTools** - Database management

---

## 📝 Code Documentation Example

```go
//SECTION - 1: User Authentication
// This section handles user login and JWT token generation

// STEP 1: Load JWT secret from environment
// IMPORTANT: Never hardcode secrets in code
jwtSecret := os.Getenv("JWT_SECRET")

// STEP 2: Validate user credentials
// RELATED: data/account_repository.go
user, err := repo.GetByEmail(email)
if err != nil {
    // TODO: Add rate limiting for failed attempts
    return nil, err
}

// STEP 3: Generate JWT token
// NOTE: Token expires after 24 hours
token, err := jwt.GenerateToken(user.ID, user.Email, jwtSecret)

//!SECTION - Authentication complete
```

---

## 🔑 JWT Usage (Already Installed!)

Your project already has JWT configured. Here's how to use it:

### Generate Token

```go
import "github.com/golang-jwt/jwt/v5"

claims := jwt.MapClaims{
    "user_id": userID,
    "email":   email,
    "exp":     time.Now().Add(time.Hour * 24).Unix(),
}

token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
tokenString, _ := token.SignedString([]byte(secret))
```

### Verify Token

```go
token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
    return []byte(secret), nil
})

if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
    userID := claims["user_id"]
    email := claims["email"]
}
```

---

## 🗄️ Database Documentation

### Generate Schema Documentation

```powershell
# First time setup
npm run setup:schemaspy

# Generate documentation
npm run docs:database

# View in browser
start docs/database/index.html
```

This creates:
- 📊 Entity Relationship Diagrams
- 📋 Table schemas with columns
- 🔗 Foreign key relationships
- 📈 Database statistics
- 🔍 Searchable interface

---

## 🎯 Common Tasks

### Add a New Feature

1. **Plan with TODOs**
   ```go
   // TODO: Implement user profile page
   // TODO: Add profile image upload
   // TODO: Create profile update endpoint
   ```

2. **Create Section Structure**
   ```go
   //SECTION - User Profile Feature
   // STEP 1: Create database table
   // STEP 2: Implement repository
   // STEP 3: Create handler
   // STEP 4: Add frontend component
   //!SECTION
   ```

3. **Document as You Go**
   ```go
   // IMPORTANT: Profile images must be < 5MB
   // RELATED: handlers/upload_handler.go
   // NOTE: Using AWS S3 for storage
   ```

### Review Code

Use the **REVIEW** tag:
```go
// REVIEW: Is this the most efficient approach?
// REVIEW: Should we cache these results?
// REVIEW: Consider using a connection pool here
```

### Mark Issues

```go
// FIXME: Memory leak when uploading large files
// FIXME: Race condition on concurrent updates
// HACK: Temporary workaround for library bug
```

---

## 🎓 Learning Resources

- **Full Installation Guide**: `INSTALLATION_GUIDE.md`
- **Code Notes Guide**: `docs/CODE_NOTES_GUIDE.md`
- **Architecture Docs**: `docs/architecture.md`
- **Go Documentation**: Run `npm run docs:serve` and open http://localhost:8080

---

## 🆘 Troubleshooting

### Mermaid Not Working?
```powershell
npm install -g @mermaid-js/mermaid-cli
mmdc --version  # Should show version number
```

### SchemaSpy Failing?
1. Check Java is installed: `java -version`
2. Verify database credentials in `tools/schemaspy.properties`
3. Ensure PostgreSQL is running

### Better Comments Not Showing Colors?
1. Install the "Better Comments" extension
2. Reload VS Code (Ctrl+Shift+P → "Reload Window")

### Go Commands Not Working?
1. Ensure Go is in your PATH
2. Run: `go version` (should show 1.21+)
3. Run: `go mod tidy` to sync dependencies

---

## 💡 Pro Tips

1. **Use Snippets**: Type `sec` + Tab for instant section blocks
2. **Document Early**: Add comments as you write code
3. **Update TODOs**: Mark completed TODOs as done or remove them
4. **Generate Docs Regularly**: Run `npm run docs:generate` before commits
5. **Review Diagrams**: Keep `docs/architecture.md` up to date

---

## 📞 Support

- 📧 Email: thephoenixflix@gmail.com
- 🌐 Website: https://bit.ly/thephoenixflix
- 💻 GitHub: https://github.com/PhoenixWeaver

---

## ✅ Quick Checklist

After setup, you should have:

- [x] ✅ JWT installed (`github.com/golang-jwt/jwt/v5`)
- [x] ✅ VS Code extensions configured
- [x] ✅ Better Comments color-coding
- [x] ✅ Code snippets ready
- [ ] 📦 Mermaid CLI installed (`npm run install:mermaid`)
- [ ] 📚 Go docs tool installed (`npm run install:godoc`)
- [ ] ☕ Java installed (for SchemaSpy)
- [ ] 📊 SchemaSpy configured (`npm run setup:schemaspy`)
- [ ] 🔑 Database credentials in `tools/schemaspy.properties`

---

**You're all set! Happy coding! 🚀🔥**

