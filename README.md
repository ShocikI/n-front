# N-Front

A modern web application built with Next.js 15, React 19, and TypeScript, featuring a beautiful UI powered by Tailwind CSS and shadcn/ui components.

## 🚀 Features

- Next.js 15 with App Router
- React 19
- TypeScript
- Tailwind CSS for styling
- shadcn/ui components
- Google Maps integration
- Form handling with React Hook Form and Zod validation
- Date handling with date-fns and react-day-picker
- Font Awesome icons
- ESLint and Prettier for code quality

## 📦 Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/ShocikI/n-front
cd n-front
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your environment variables:

```env
# Add your environment variables here
```

## 🏃‍♂️ Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```

## 📝 Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── app/          # Next.js app router pages and layouts
├── components/   # Reusable React components
└── lib/         # Utility functions and configurations
```

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Form Handling:** React Hook Form + Zod
- **Date Handling:** date-fns, react-day-picker
- **Icons:** Font Awesome
- **Maps:** Google Maps API
- **Code Quality:** ESLint, Prettier

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
