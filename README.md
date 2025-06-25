# Personal Website

A modern personal website built with [Next.js](https://nextjs.org), featuring a chess game component and a clean, responsive design.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, React 19, and TypeScript
- **Chess Game**: Interactive chess game using chess.js and react-chessboard
- **Responsive Design**: Optimized for all devices using Tailwind CSS
- **Fast Performance**: Leverages Next.js App Router and Turbopack for optimal performance
- **Type Safety**: Full TypeScript support for better development experience

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Chess**: [chess.js](https://github.com/jhlywa/chess.js) + [react-chessboard](https://github.com/Clariity/react-chessboard)
- **Linting**: ESLint with Next.js configuration

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd personal-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see your website.

## 🎮 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## 📁 Project Structure

```
personal-website/
├── src/                 # Source code
│   ├── app/            # Next.js App Router pages
│   └── components/     # React components
├── public/             # Static assets
├── package.json        # Dependencies and scripts
├── next.config.ts      # Next.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## 🎨 Customization

- **Styling**: Modify `tailwind.config.js` for custom design tokens
- **Components**: Add new components in the `src/components/` directory
- **Pages**: Create new pages using the App Router in `src/app/`
- **Chess Game**: Customize the chess component in your pages

## 🚀 Deployment

This project is currently hosted on [Vercel](https://vercel.com) and automatically deploys from the main branch.

### Deploy on Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

#### First Time Setup:
1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project

3. **Configure Deployment**
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your site automatically

#### Automatic Deployments:
- **Every push to main branch** triggers a new deployment
- **Preview deployments** are created for pull requests
- **Custom domains** can be added in the Vercel dashboard

#### Environment Variables:
If your project uses environment variables:
1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add any required variables (e.g., API keys)

#### Performance Optimization:
- **Edge Functions**: Automatically optimized by Vercel
- **Image Optimization**: Next.js Image component works out of the box
- **Caching**: Automatic CDN caching for static assets

### 🖥️ Development Workflow

When making changes to your personal website, follow this workflow:

#### 1. **Local Development**
```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev

# Make your changes and test locally at http://localhost:3000
```

#### 2. **Commit and Push Changes**
```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "Add new feature: [describe your changes]"

# Push to GitHub (this triggers Vercel deployment)
git push origin main
```

#### 3. **Vercel Deployment Commands** (Optional)
If you have Vercel CLI installed, you can also deploy manually:
```bash
# Install Vercel CLI globally (one-time setup)
npm install -g vercel

# Login to Vercel (one-time setup)
vercel login

# Deploy to production
vercel --prod

# Deploy to preview (creates a preview URL)
vercel
```

#### 4. **Check Deployment Status**
- **Automatic**: Every push to `main` branch triggers deployment
- **Monitor**: Check deployment status at [vercel.com/dashboard](https://vercel.com/dashboard)
- **Preview**: Pull requests get preview deployments automatically

#### 5. **Useful Commands for Development**
```bash
# Build locally to test production build
npm run build

# Start production server locally
npm run start

# Run linting to check code quality
npm run lint

# Check for TypeScript errors
npx tsc --noEmit
```

### Other Deployment Options

- **Netlify**: Use the Next.js build command
- **Railway**: Connect your GitHub repository
- **Self-hosted**: Build with `npm run build` and serve with `npm run start`

## 🤝 Contributing

This is a personal project, but if you find any bugs or have suggestions, feel free to open an issue or submit a pull request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Chess.js Documentation](https://github.com/jhlywa/chess.js)

---

Built with ❤️ using Next.js
