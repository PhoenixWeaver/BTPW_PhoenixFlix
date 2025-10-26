
🐦 ::: PhoenixFlix - Multi-Purpose Movies & Christian Streaming Platform :::  🔥

# 🎬 PhoenixFlix - Movies & LDS Content Platform

> **🚀 Ready to Deploy V2?** Start here: **[START_HERE.md](START_HERE.md)** - Quick deployment guide
> 
> **📚 Deployment Guides:** All guides in **[BT_Builder/Deployment_V2/](BT_Builder/Deployment_V2/)** folder
> 
> **⭐ Recommended:** Fresh Repository deployment (Option A) for clean V2

## 🌟 **Vision & Inspiration**

**PhoenixFlix** represents a groundbreaking fusion of entertainment and spirituality - a platform where families can enjoy both secular entertainment and uplifting Christian content under one roof. Born from the vision of creating a **Netflix of the Phoenix**, this platform bridges the gap between modern streaming technology and timeless spiritual values.

### **🎯 Core Mission**
To provide a **family-friendly streaming experience** that combines:
- **Entertainment**: Access to quality movies and content
- **Spirituality**: Uplifting Christian content including Bible videos, Christian songs, and LDS content
- **Community**: A platform where faith and entertainment coexist harmoniously

### **💡 The Inspiration**
In a world where streaming platforms often compromise family values, PhoenixFlix was created to offer an alternative - a place where parents can confidently let their children explore content, knowing that both entertainment and spiritual nourishment are available in equal measure.

## 🏆 **Scope & Work Accomplished**

### **🎯 Project Scope**
This is a **full-stack, production-ready application** that demonstrates mastery of:
- **Modern Web Architecture**: Clean Architecture with Repository Pattern
- **Dual Database Design**: Innovative approach to separate movies and Christian content
- **Advanced Authentication**: WebAuthn/Passkeys + JWT security
- **Cross-Platform Integration**: TMDB + YouTube APIs
- **Enterprise-Level Security**: Admin systems, middleware, validation

### **💪 Technical Achievements**

#### **🏗️ Architecture Excellence**
- ✅ **Clean Architecture Implementation**: Repository Pattern with dependency injection
- ✅ **Dual Database System**: Separate PostgreSQL instances for movies and Christian content
- ✅ **Cross-Database User Management**: Unified user experience across content types
- ✅ **Middleware Pattern**: Authentication, admin, and logging middleware
- ✅ **Handler Pattern**: Clean HTTP request processing

#### **🔐 Security & Authentication**
- ✅ **Modern Passwordless Auth**: WebAuthn/Passkeys implementation
- ✅ **JWT Token System**: Secure session management with 72-hour expiration
- ✅ **Email Verification**: Token-based email confirmation system with 24-hour expiry
- ✅ **Password Reset**: Secure password reset via email tokens with 1-hour expiry
- ✅ **SMTP Integration**: Production-grade email delivery via Vercel CDN
- ✅ **Admin Role System**: Complete admin middleware with database-level permissions
- ✅ **SQL Injection Prevention**: Parameterized queries throughout
- ✅ **Input Validation**: Comprehensive data validation and sanitization
- ✅ **Rate Limiting**: Email bombing and brute force protection
- ✅ **Race Condition Prevention**: Optimistic locking with version control

#### **📊 Database Engineering**
- ✅ **Dual PostgreSQL Setup**: Movies database (Neon) + Christian content database (Aiven)
- ✅ **Optimistic Locking**: Version-based concurrency control for race condition prevention
- ✅ **Cross-Database Relationships**: Bridge tables for unified user collections
- ✅ **Data Import Systems**: Automated TMDB and YouTube content integration
- ✅ **User Management**: Complete CRUD operations with soft deletes
- ✅ **Guestbook System**: Full moderation and approval workflow
- ✅ **Transaction Safety**: ACID-compliant operations with rollback support

#### **🎨 Frontend Development**
- ✅ **Vanilla JavaScript SPA**: Modern single-page application
- ✅ **Server-Side Rendering**: SEO-friendly movie detail pages
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Progressive Web App**: PWA capabilities with service workers
- ✅ **Component Architecture**: Modular JavaScript components

#### **🔌 API Integration**
- ✅ **TMDB Integration**: Complete movie database with 70,000+ entries
- ✅ **YouTube API**: Christian content including Bible videos, Christian songs, and LDS content
- ✅ **RESTful API Design**: Clean, consistent endpoint structure
- ✅ **Error Handling**: Comprehensive error responses and logging

#### **🛠️ DevOps & Deployment**
- ✅ **Go Module Management**: Clean dependency management
- ✅ **Environment Configuration**: Secure environment variable handling
- ✅ **Logging System**: Custom structured logging for movies and LDS
- ✅ **Build System**: Single binary deployment ready
- ✅ **Git Integration**: Version control with comprehensive .gitignore
- ✅ **Cloud Deployment**: Render (Backend) + Vercel (Frontend/CDN)
- ✅ **Database Hosting**: Neon + Aiven PostgreSQL with auto-scaling
- ✅ **CI/CD Pipeline**: Automatic deployment on git push

### **📈 Project Statistics**
- **📁 Files**: 50+ Go files, 20+ JavaScript components
- **🗄️ Databases**: 2 PostgreSQL instances with 15+ tables
- **🔗 API Endpoints**: 25+ RESTful endpoints
- **🔐 Security Features**: JWT + WebAuthn + Admin middleware
- **📊 Content**: 70,000+ movies + Christian content (Bible videos, Christian songs, LDS content)
- **👥 User Features**: Registration, authentication, favorites, guestbook

### **🎖️ Technical Innovation**
This project showcases several **innovative approaches**:
1. **Dual Database Architecture**: Unique separation of secular movies and Christian content (Neon + Aiven)
2. **Cross-Database User Collections**: Users can favorite content from both databases
3. **Modern Authentication**: WebAuthn implementation for passwordless login
4. **Hybrid Rendering**: SSR for SEO + SPA for modern UX
5. **Admin Moderation System**: Complete content management workflow
6. **Optimistic Locking**: Race condition prevention with version-based concurrency control
7. **Advanced Account Management**: Comprehensive email verification and password reset system
8. **Distributed Infrastructure**: Render (Backend) + Vercel (Frontend/Email CDN) architecture
9. **Go Routines**: Efficient concurrent request handling with safe database operations

## ✨ Features

### 🎬 Movies Section
- **Movie Database**: Integration with TMDB (The Movie Database)
- **Search & Filtering**: Advanced movie search with genre filtering
- **Language Support**: Multi-language content (Japanese, English, etc.)
- **User Collections**: Favorites and watchlist functionality
- **Server-Side Rendering**: SEO-friendly movie detail pages

### ⛪ Christian Content Section
- **Bible Videos**: Scripture-based video content and teachings
- **Christian Songs**: Uplifting Christian music and hymns
- **LDS Content**: Conference talks and LDS-specific content
- **YouTube Integration**: Seamless video playback for all Christian content
- **Spiritual Rating**: 1-5 scale rating system
- **Family-Friendly**: Content filtering and age-appropriate content
- **Featured Content**: Daily highlights and recommendations

### 👤 User Management
- **Modern Authentication**: WebAuthn/Passkey (passwordless)
- **JWT Tokens**: Secure session management
- **Email Verification**: Token-based email confirmation with 24-hour expiry
- **Password Reset**: Secure password reset via email tokens with 1-hour expiry
- **Cross-Database Collections**: Users can favorite both movies and Christian content
- **Admin System**: Full admin panel with moderation capabilities
- **Guestbook**: Community interaction features

## 🏗️ Technical Architecture

### **Backend**
- **Language**: Go 1.25+
- **Architecture**: Clean Architecture with Repository Pattern
- **Database**: Dual PostgreSQL (NEON + AIVEN) - Movies + Christian Content
- **Hosting**: Render (Backend API)
- **Authentication**: JWT + WebAuthn/Passkeys
- **APIs**: TMDB, YouTube
- **Concurrency**: Go Routines with Optimistic Locking for race condition prevention

### **Frontend**
- **Technology**: Vanilla JavaScript SPA
- **Hosting**: Vercel (Frontend & Email CDN)
- **Features**: Server-Side Rendering (SSR) capabilities
- **Responsive**: Mobile-first design
- **PWA**: Progressive Web App features

### **Database Architecture**
- **Movies Database**: Users, movies, favorites, watchlist, guestbook
- **Christian Content Database**: Bible videos, Christian songs, LDS content, spiritual ratings
- **Cross-Database**: Bridge tables for unified user experience

### **🔒 Race Condition Prevention with Optimistic Locking**

PhoenixFlix implements **optimistic locking** to handle concurrent database operations safely, preventing race conditions in multi-user scenarios.

#### **Key Features**
- **Version-Based Concurrency Control**: Each user record includes a `version` field that increments on updates
- **Atomic Operations**: Database updates verify version matches before committing
- **Conflict Detection**: Automatically detects and handles concurrent modification attempts
- **Retry Logic**: Smart retry mechanism for failed operations due to version conflicts

#### **Implementation Highlights**
- **Go Routines**: Efficient concurrent request handling
- **Database Transactions**: ACID-compliant operations with version checking
- **Error Handling**: Graceful degradation when conflicts occur
- **Performance**: Minimal overhead while ensuring data integrity

#### **Use Cases**
- User profile updates by multiple devices
- Simultaneous favorite/watchlist modifications
- Concurrent guestbook submissions
- Admin moderation actions

![Optimistic Locking Sequence Diagram](BT_OutputSamples/Optimistic_Locking_Sequence_Diagram.png)
*Figure 1: Optimistic locking sequence for concurrent user updates*

![Optimistic Locking Flowchart](BT_OutputSamples/Optimistic_Locking_Flowchart.png)
*Figure 2: Flowchart showing version-based conflict resolution*

For detailed implementation, see: `BT_Builder/GoRoutines_Builder/`

## 🚀 Quick Start

> **📘 For Production Deployment:** See [BT_Builder/Deployment_V2/FULL_V2_MIGRATION_GUIDE.md](BT_Builder/Deployment_V2/FULL_V2_MIGRATION_GUIDE.md) for complete deployment (Option A recommended)

> **⚡ Quick Environment Switch:** Use `.\switch-environment.ps1 local` or `.\switch-environment.ps1 production` to toggle configurations

> **📝 All Deployment Guides:** Located in [BT_Builder/Deployment_V2/](BT_Builder/Deployment_V2/) folder

### Prerequisites
- Go 1.25+
- PostgreSQL (Neon + Aiven recommended)
- TMDB API Key
- YouTube API Key (for Christian content)
- Air (for local development with live reload)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/phoenixflix.git
cd phoenixflix
```

2. **Install dependencies**
```bash
go mod download
```

3. **Setup environment variables**
Create a `.env` file:
```env
DATABASE_URL=postgres://username:password@host:port/database?sslmode=require
DATABASE_URL_CHRISTIAN=postgres://username:password@host:port/database?sslmode=require
TMDB_API_KEY=your_tmdb_api_key
YOUTUBE_API_KEY=your_youtube_api_key
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ENVIRONMENT=production

# SMTP / Email (for verification and password reset)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=apikey_or_username
SMTP_PASS=your_smtp_password
SMTP_FROM=PhoenixFlix <no-reply@phoenixflix.app>
SMTP_TLS=true
```

4. **Run the application**
```bash
go run .
```

5. **Access the application**
Open your browser to `http://localhost:8080`

## 📁 Project Structure

```
PhoenixFlix/
├── BTPF.go                 # Main application entry point
├── data/                   # Repository layer (data access)
│   ├── interfaces.go       # Repository contracts
│   ├── movie_repository.go
│   ├── account_repository.go
│   ├── lds_repository.go
│   └── passkey_repository.go
├── handlers/               # HTTP handlers (business logic)
│   ├── movie_handlers.go
│   ├── account_handlers.go
│   ├── lds_handlers.go
│   └── passkey_handlers.go
├── models/                 # Data structures
│   ├── movie.go
│   ├── lds.go
│   ├── user.go
│   └── passkeyuser.go
├── public/                 # Frontend SPA
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   └── components/
├── logger/                  # Custom logging system
├── token/                   # JWT authentication
└── import/                  # Database import utilities
```

## 🔧 API Endpoints

### Movies
- `GET /api/movies/top` - Top movies
- `GET /api/movies/random` - Random movies
- `GET /api/movies/search/?q=query` - Search movies
- `GET /api/movies/language/{lang}` - Movies by language
- `GET /api/movies/{id}` - Movie details

### Christian Content
- `GET /api/LDS/top` - LDS content
- `GET /api/LDS/random` - Christian content
- `GET /api/LDS/search` - Christian database search
- `GET /api/LDS/{id}` - Christian content details
- `GET /api/LDS/bible-videos` - Bible video content
- `GET /api/LDS/christian-songs` - Christian music content

### Authentication
- `POST /api/account/register` - User registration
- `POST /api/account/authenticate` - User login
- `GET /api/account/confirm?token=...` - Email verification
- `POST /api/account/forgot-password` - Request password reset
- `POST /api/account/reset-password` - Reset password with token
- `POST /api/account/resend-verification` - Resend verification email (auth required)
- `POST /api/passkey/authentication-begin` - Passkey login start
- `POST /api/passkey/authentication-end` - Passkey login complete

### Admin (Protected)
- `GET /api/admin/guestbook` - All guestbook entries
- `DELETE /api/admin/guestbook/delete/{id}` - Delete entry
- `PUT /api/admin/guestbook/approve/{id}` - Approve entry

## 📧 Advanced Account Management

PhoenixFlix implements a comprehensive account management system with enterprise-level security features.

![Account Management Architecture](BT_OutputSamples/Architecture_AccountManagement.png)
*Figure 3: Complete account management architecture*

### **Email Verification Flow**
1. **User Registration**: User registers with email and password
2. **Verification Token**: System creates a secure token (24-hour expiry)
3. **Email Sent**: Verification email sent via Vercel CDN with confirmation link
4. **Email Confirmation**: User clicks link to verify email address
5. **Account Activated**: User account is fully activated

### **Password Reset Flow**
1. **Reset Request**: User requests password reset via email
2. **Reset Token**: System creates a secure token (1-hour expiry)
3. **Reset Email**: Password reset email sent with secure link via Vercel CDN
4. **Password Update**: User sets new password via token
5. **Account Secured**: Password is updated and token invalidated

![Authentication Flow](BT_OutputSamples/Authentication_Flow.png)
*Figure 4: Complete authentication flow including email verification and password reset*

### **Email Infrastructure**
- **SMTP Integration**: Production-grade email delivery system
- **Content Delivery**: Vercel CDN for email template delivery
- **Template System**: Professional HTML email templates
- **Delivery Tracking**: Email verification status monitoring
- **Error Handling**: Comprehensive SMTP error management

### **Security Features**
- **Token Expiry**: Verification tokens expire in 24 hours, reset tokens in 1 hour
- **Single Use**: Tokens are invalidated after use
- **Email Enumeration Protection**: Always returns success to prevent email discovery
- **Secure Generation**: Cryptographically secure random tokens (32+ bytes)
- **Database Storage**: Tokens stored securely with user association
- **Rate Limiting**: Protection against email bombing attacks
- **HTTPS Only**: All email links use secure HTTPS protocol

### **Additional Account Features**
- **Email Re-verification**: Users can request new verification emails
- **Account Recovery**: Multi-step password recovery process
- **Session Management**: JWT-based session with 72-hour validity
- **Device Tracking**: Last login timestamp for security monitoring
- **Soft Deletes**: Account data preserved for recovery

For detailed implementation, see: `BT_Builder/AccManagement_BUIDER/`

## 🚀 Deployment

### **Production Infrastructure**

PhoenixFlix uses a modern, distributed deployment architecture:

#### **Backend Deployment (Render)**
- **Platform**: Render.com
- **Service Type**: Web Service
- **Runtime**: Go 1.25+
- **Database**: PostgreSQL (Neon + Aiven)
- **Auto-Deploy**: Automatic deployment from main branch

**Deployment Steps:**
1. Push code to GitHub repository
2. Connect repository to Render
3. Configure environment variables (see `.env` template)
4. Set build command: `go build -o main .`
5. Set start command: `./main`
6. Deploy automatically

#### **Frontend Deployment (Vercel)**
- **Platform**: Vercel.com
- **Framework**: Vanilla JavaScript SPA
- **CDN**: Global edge network
- **Email Templates**: Served via Vercel CDN
- **SSL**: Automatic HTTPS

**Deployment Steps:**
1. Push frontend code to GitHub
2. Import project to Vercel
3. Configure build settings
4. Add environment variables
5. Deploy to production

#### **Database Providers**
- **Neon PostgreSQL**: Modern serverless PostgreSQL
  - Auto-scaling
  - Branch-based development
  - Built-in connection pooling
  
- **Aiven PostgreSQL**: Enterprise-grade database hosting
  - High availability
  - Automatic backups
  - Cross-region replication

### Docker
```dockerfile
FROM golang:1.25-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o main .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/main .
CMD ["./main"]
```

## 📊 Database Schema

### Users Table
- `id` (Primary Key)
- `name`, `email`, `password_hashed`
- `is_admin` (Boolean)
- `time_created`, `last_login`, `time_deleted`

### Movies Table
- `id`, `tmdb_id`, `title`, `release_year`
- `genres`, `overview`, `score`, `popularity`
- `poster_url`, `trailer_url`

### Christian Content Table
- `id`, `title`, `description`, `content_type`
- `youtube_id`, `speaker`, `conference_session`
- `spiritual_rating`, `family_friendly`
- **Content Types**: Bible videos, Christian songs, LDS content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

### **🌟 Inspiration & Vision**
This project was born from a desire to create a **family-friendly alternative** to mainstream streaming platforms, where entertainment and spiritual growth can coexist. The vision of **"Netflix for the faithful"** drives every technical decision and feature implementation.

### **🤝 Technical Partners**
- **TMDB (The Movie Database)**: Providing comprehensive movie metadata and API access
- **YouTube API**: Enabling seamless integration of Christian content including Bible videos, Christian songs, and LDS content
- **YouTube Content Creators**: For providing uplifting Christian content, Bible teachings, and inspirational music
- **Christian Community**: For inspiring content that strengthens faith and family values
- **Neon**: Modern serverless PostgreSQL with auto-scaling and branch-based development
- **Aiven**: Enterprise-grade PostgreSQL hosting with high availability and automatic backups
- **Render**: Reliable backend hosting platform with automatic deployment
- **Vercel**: Frontend and Email CDN hosting with global edge network
- **Go Community**: For excellent libraries and frameworks that made this possible

### **💡 Special Recognition**
- **WebAuthn Consortium**: For pioneering passwordless authentication standards
- **PostgreSQL Community**: For robust database technology
- **Open Source Contributors**: Whose work enables modern web development
- **Faith-Based Communities**: For inspiring the need for wholesome entertainment platforms

## 📸 Screenshots & Documentation

PhoenixFlix includes comprehensive visual documentation of all major features and architectures.

### **📚 Deployment & Development Guides**

All deployment guides are organized in **[BT_Builder/Deployment_V2/](BT_Builder/Deployment_V2/)** folder:

- **[FULL_V2_MIGRATION_GUIDE.md](BT_Builder/Deployment_V2/FULL_V2_MIGRATION_GUIDE.md)** ⭐: Complete V2 deployment guide
  - **Option A (Recommended)**: Fresh repository for clean V2
  - **Option B**: Update existing repository
  - Database migration procedures
  - Testing checklist and troubleshooting

- **[DEPLOYMENT_GUIDE_V2.md](BT_Builder/Deployment_V2/DEPLOYMENT_GUIDE_V2.md)**: Configuration reference
  - Render and Vercel setup
  - Environment variables
  - Quick deployment steps

- **[PRODUCTION_CHANGES_CHECKLIST.md](BT_Builder/Deployment_V2/PRODUCTION_CHANGES_CHECKLIST.md)**: Quick reference
  - 3 files that need modification
  - Find/replace patterns
  - Verification checklist

- **[V2_UPDATE_SUMMARY.md](BT_Builder/Deployment_V2/V2_UPDATE_SUMMARY.md)**: What's new in V2
  - All changes and improvements
  - V1 vs V2 comparison

**Automation Tools** (in root directory):
- **[switch-environment.ps1](switch-environment.ps1)**: Automated environment switcher
  - Usage: `.\switch-environment.ps1 production` or `.\switch-environment.ps1 local`
  - Automatically updates all necessary files
  - No manual editing required!

- **[check-changes.ps1](check-changes.ps1)**: See all your changes
  - Shows modified files by category
  - Checks current configuration
  - Provides recommendations

### **Architecture Diagrams**
Located in `BT_OutputSamples/`:
- **Optimistic_Locking_Sequence_Diagram.png**: Detailed sequence diagram for concurrent operations
- **Optimistic_Locking_Flowchart.png**: Visual flowchart of race condition prevention
- **Architecture_AccountManagement.png**: Complete account management architecture
- **Authentication_Flow.png**: Full authentication flow including email verification

### **Application Screenshots**
Located in `BT_OutputSamples/PhoenixFlix_OutputSamples/`:

#### **Desktop (PC)**
- Homepage and navigation
- Movie browsing and search
- LDS content section
- Authentication flows (login, registration, passkeys)
- Admin moderation panel
- Guestbook features
- Favorites and watchlist

#### **Mobile (iOS & Android)**
- Responsive design on mobile devices
- Touch-optimized interface
- Biometric authentication (Face ID, Touch ID)
- Progressive Web App installation
- Cross-platform consistency

### **Email Features**
- Password reset email templates
- Email verification confirmations
- Professional SMTP integration

All diagrams and screenshots demonstrate production-ready features with enterprise-level polish.

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact: [thephoenixflix@gmail.com](mailto:thephoenixflix@gmail.com)

---

## 🌟 **Final Thoughts**

**PhoenixFlix** represents more than just a technical achievement - it's a **vision realized**. In a digital age where content often compromises values, this platform stands as a testament to what's possible when technology serves faith, family, and community.

**Built with ❤️, faith, and cutting-edge technology**  
*Go • PostgreSQL (Neon + Aiven) • Render • Vercel • WebAuthn • Clean Architecture • Family Values*

---

### **🚀 Ready to Launch**
This project is **production-ready** and demonstrates enterprise-level software development skills. From dual-database architecture to modern authentication systems, PhoenixFlix showcases the full spectrum of full-stack development mastery.

**The future of family-friendly streaming starts here.** 🎬✨
