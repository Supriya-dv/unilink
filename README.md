<<<<<<< HEAD
UniLink is a modern web-based networking platform designed specifically for college students and alumni to connect, collaborate, and share knowledge. The platform helps users discover meaningful connections based on shared interests, departments, and career goals.

The application provides an intuitive user experience with a Tinder-style swipe discovery system, allowing users to easily explore profiles and connect with like-minded people within their academic community.

UniLink aims to bridge the gap between students and alumni, enabling mentorship, collaboration, and career guidance.

🎯 Project Objectives

The main objectives of UniLink are:

To help students connect with peers who share similar interests.

To create a platform where students can interact with alumni.

To provide mentorship opportunities through alumni connections.

To build a collaborative environment for academic and professional growth.

To enable meaningful networking within the college ecosystem.

🚀 Features
1️⃣ User Authentication

Users can securely create accounts and log in to the platform.

Functionalities include:

User Signup

User Login

Role selection (Student / Alumni)

2️⃣ Profile Creation

After signing up, users can create their personal profile including:

Full Name

Age

Course / Department

Interests

Short Bio

Profile Photo

Role (Student or Alumni)

This information helps the system generate better matches.

3️⃣ Start Matching System

Once the user profile is created, the platform analyzes the user's interests and profile details to begin the matching process.

The system then prepares personalized recommendations for potential connections.

4️⃣ Swipe-Based Discovery

UniLink uses a Tinder-style swipe interface where users can explore profiles in an interactive way.

Users can:

Swipe right to show interest

Swipe left to skip profiles

Discover people based on interests and department

5️⃣ Connection Management

Users can build a network by connecting with other students or alumni.

Features include:

View connection requests

Accept or decline connections

Maintain a list of connections

6️⃣ Messaging System

Once users connect, they can communicate through the messaging feature.

This allows students to:

Discuss academic topics

Seek mentorship from alumni

Collaborate on projects

7️⃣ Career Journeys

Alumni can share their career paths and experiences, helping students learn from real-world journeys.

Students can explore:

Career growth stories

Industry insights

Professional advice

🛠️ Technology Stack
Frontend

The user interface is built using modern web technologies:

React – Component-based UI development

Vite – Fast build tool and development environment

TypeScript – Type-safe JavaScript

Tailwind CSS – Utility-first styling framework

Framer Motion – Smooth animations and UI transitions

UI Components

The UI design uses modern component libraries:

shadcn/ui – Accessible UI components

Lucide Icons – Clean and modern icon set

Backend (Planned / Future Integration)

The backend will support authentication, data storage, and messaging.

Planned technologies:

Node.js

Express.js

MongoDB
=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
>>>>>>> c21cabc017617e84c329bc9fb9fc25106bf8cd3a
