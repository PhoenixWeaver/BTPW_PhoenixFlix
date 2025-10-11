
🐦 ::: PhoenixFlix - Multi-Purpose Movies & Christian Streaming Platform :::  🔥

# 🎬 PhoenixFlix - Movies & LDS Content Platform

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
- ✅ **Admin Role System**: Complete admin middleware with database-level permissions
- ✅ **SQL Injection Prevention**: Parameterized queries throughout
- ✅ **Input Validation**: Comprehensive data validation and sanitization

#### **📊 Database Engineering**
- ✅ **Dual PostgreSQL Setup**: Movies database + Christian content database (Bible videos, Christian songs, LDS content)
- ✅ **Cross-Database Relationships**: Bridge tables for unified user collections
- ✅ **Data Import Systems**: Automated TMDB and YouTube content integration
- ✅ **User Management**: Complete CRUD operations with soft deletes
- ✅ **Guestbook System**: Full moderation and approval workflow

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

### **📈 Project Statistics**
- **📁 Files**: 50+ Go files, 20+ JavaScript components
- **🗄️ Databases**: 2 PostgreSQL instances with 15+ tables
- **🔗 API Endpoints**: 25+ RESTful endpoints
- **🔐 Security Features**: JWT + WebAuthn + Admin middleware
- **📊 Content**: 70,000+ movies + Christian content (Bible videos, Christian songs, LDS content)
- **👥 User Features**: Registration, authentication, favorites, guestbook

### **🎖️ Technical Innovation**
This project showcases several **innovative approaches**:
1. **Dual Database Architecture**: Unique separation of secular movies and Christian content
2. **Cross-Database User Collections**: Users can favorite content from both databases
3. **Modern Authentication**: WebAuthn implementation for passwordless login
4. **Hybrid Rendering**: SSR for SEO + SPA for modern UX
5. **Admin Moderation System**: Complete content management workflow

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
- **Cross-Database Collections**: Users can favorite both movies and Christian content
- **Admin System**: Full admin panel with moderation capabilities
- **Guestbook**: Community interaction features

## 🏗️ Technical Architecture

### **Backend**
- **Language**: Go 1.25+
- **Architecture**: Clean Architecture with Repository Pattern
- **Database**: Neon PostgreSQL + Dual PostgreSQL (AIVEN) - Movies + Christian Content
- **Middleware**: Authentication, admin, and logging
- **Handler Pattern**: Clean HTTP request processing
- **Cloud Application**: Render + Neon + Vercel
     
### **Frontend**
- **Technology**: Vanilla JavaScript SPA
- **Authentication**: JWT + WebAuthn/Passkeys
- **APIs**: TMDB, YouTube

### **Frontend**
- **Technology**: Vanilla JavaScript SPA
- **Features**: Server-Side Rendering (SSR) capabilities
- **Responsive**: Mobile-first design
- **PWA**: Progressive Web App features

### **Database Architecture**
- **Movies Database**: Users, movies, favorites, watchlist, guestbook
- **Christian Content Database**: Bible videos, Christian songs, LDS content, spiritual ratings
- **Cross-Database**: Bridge tables for unified user experience

## 🚀 Quick Start

### Prerequisites
- Go 1.25+
- PostgreSQL (or PostgreSQL)
- TMDB API Key
- YouTube API Key (for Christian content)

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
- `POST /api/passkey/authentication-begin` - Passkey login start
- `POST /api/passkey/authentication-end` - Passkey login complete

### Admin (Protected)
- `GET /api/admin/guestbook` - All guestbook entries
- `DELETE /api/admin/guestbook/delete/{id}` - Delete entry
- `PUT /api/admin/guestbook/approve/{id}` - Approve entry

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **WebAuthn/Passkeys**: Modern passwordless authentication
- **Admin Middleware**: Role-based access control
- **SQL Injection Prevention**: Parameterized queries
- **CORS Protection**: Cross-origin request security
- **Input Validation**: Comprehensive data validation

## 🚀 Deployment

### PhoenixFlix domain (Recommended)
1. Push code to GitHub
2. Connect repository to PhoenixFlix app
3. Add environment variables
4. Deploy automatically

### PhoenixFlix Alias (Optional)
1. Connect GitHub repository
2. Configure build settings
3. Add environment variables
4. Deploy Go application

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
- **AIVEN**: Reliable PostgreSQL hosting for both movie and Christian content databases
- **Go Community**: For excellent libraries and frameworks that made this possible

### **💡 Special Recognition**
- **WebAuthn Consortium**: For pioneering passwordless authentication standards
- **PostgreSQL Community**: For robust database technology
- **Open Source Contributors**: Whose work enables modern web development
- **Faith-Based Communities**: For inspiring the need for wholesome entertainment platforms

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact: [thephoenixflix@gmail.com](mailto:thephoenixflix@gmail.com)

---

## 🌟 **Final Thoughts**

**PhoenixFlix** represents more than just a technical achievement - it's a **vision realized**. In a digital age where content often compromises values, this platform stands as a testament to what's possible when technology serves faith, family, and community.

**Built with ❤️, faith, and cutting-edge technology**  
*Go • PostgreSQL • WebAuthn • Clean Architecture • Family Values*

---

### **🚀 Ready to Launch**
This project is **production-ready** and demonstrates enterprise-level software development skills. From dual-database architecture to modern authentication systems, PhoenixFlix showcases the full spectrum of full-stack development mastery.

**The future of family-friendly streaming starts here.** 🎬✨
