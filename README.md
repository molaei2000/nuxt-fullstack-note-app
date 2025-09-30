# Nuxt Fullstack Note App

A modern, fullstack note-taking application built with Nuxt 4, Vue 3, and TypeScript. Features rich text editing with TipTap, user authentication with JWT, and a MySQL database powered by Prisma.

## ✨ Features

-   📝 Rich text editor with TipTap 3
-   🔐 User authentication and authorization
-   💾 Persistent note storage with MySQL
-   🎨 Modern UI with Nuxt UI 4
-   📱 Responsive design
-   🔒 Secure JWT-based sessions
-   ⚡ Server-side rendering with Nuxt 4
-   🛠️ Full TypeScript support

## 🛠️ Tech Stack

### Frontend

-   **Nuxt 4** - Full-stack Vue framework
-   **Vue 3.5+** - Progressive JavaScript framework with Composition API
-   **TypeScript 5.9+** - Type-safe JavaScript
-   **Nuxt UI 4** - Beautiful UI components
-   **TipTap 3** - Rich text editor
-   **VueUse 13.9** - Collection of Vue Composition utilities

### Backend

-   **Nuxt Server API** - Server-side API routes
-   **Prisma 6** - Type-safe database ORM
-   **MySQL** - Relational database
-   **JWT** - JSON Web Tokens for authentication
-   **bcryptjs** - Password hashing
-   **Zod 4** - Schema validation

### Development Tools

-   **ESLint** - Code linting
-   **Prisma Studio** - Database management GUI
-   **TypeScript** - Static type checking

## 📁 Project Structure

```
├── app/
│   ├── components/          # Vue components
│   │   ├── note/           # Note-related components
│   │   └── app/            # App-wide components
│   ├── composables/        # Vue composables
│   ├── layouts/            # Nuxt layouts
│   ├── middleware/         # Route middleware
│   ├── pages/              # Application pages
│   └── plugins/            # Nuxt plugins
├── server/
│   └── api/                # Server API routes
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
├── shared/
│   └── types/              # Shared TypeScript types
└── lib/                    # Utility libraries
```

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   MySQL database
-   Package manager (npm, pnpm, yarn, or bun)

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="mysql://username:password@localhost:3306/nuxt_notes"
JWT_SECRET="your-super-secret-jwt-key"
```

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd nuxt-fullstack-note-app
```

2. Install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

3. Set up the database:

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

4. Start the development server:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

The application will be available at `http://localhost:3000`.

## 📊 Database Schema

### User Model

-   `id` - Unique identifier
-   `email` - User email (unique)
-   `password` - Hashed password
-   `createdAt` - Account creation timestamp
-   `updatedAt` - Last update timestamp
-   `notes` - Related notes

### Note Model

-   `id` - Unique identifier
-   `title` - Note title
-   `text` - Rich text content
-   `createdAt` - Note creation timestamp
-   `updatedAt` - Last update timestamp
-   `userId` - Foreign key to User
-   `user` - Related user

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm run generate     # Generate static site
npm run preview      # Preview production build

# Database
npx prisma studio    # Open Prisma Studio
npx prisma migrate   # Run migrations
npx prisma generate  # Generate Prisma client

# Code Quality
npm run lint         # Run ESLint
```

## 🚢 Deployment

Build the application for production:

```bash
npm run build
```

The application can be deployed to any Node.js hosting platform. Check out the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for platform-specific guides.

## 📝 API Routes

-   `POST /api/user` - User registration
-   `POST /api/login` - User authentication
-   `GET /api/notes` - Get user notes
-   `POST /api/notes` - Create new note
-   `PATCH /api/notes/[id]` - Update note
-   `DELETE /api/notes/[id]` - Delete note

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and not licensed for public use.
