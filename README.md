# Portfolio V3.0

A modern, responsive portfolio website built with Next.js 15, TypeScript, and MDX. Features dark mode, global search, and markdown-based content management.

## 🚀 Features

### 🎨 Modern Design
- Clean, minimalist interface with careful attention to typography and spacing
- Responsive design that works beautifully on all devices
- Dark/light mode toggle with system preference detection
- Smooth animations and transitions

### 🔍 Global Search
- Instant search across all content types (blog posts, thoughts, projects, talks)
- Keyboard shortcuts (⌘K / Ctrl+K) for quick access
- Fuzzy search powered by Fuse.js
- Search result highlighting and categorization

### 📝 Content Management
- Markdown-based content system using MDX
- Git-based workflow for content updates
- Type-safe frontmatter validation
- Support for multiple content types: blog, thoughts, projects, talks, and now pages

### ⚡ Performance
- Static site generation for optimal loading speeds
- Image optimization and lazy loading
- Minimal JavaScript bundle size
- SEO optimized

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX with gray-matter
- **Search**: Fuse.js
- **Theme**: next-themes
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog posts
│   ├── thoughts/          # Short-form thoughts
│   ├── projects/          # Project showcase
│   ├── talks/             # Speaking engagements
│   ├── now/               # Current activities
│   ├── admin/             # Content management
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
│   ├── navigation.tsx     # Main navigation
│   ├── theme-toggle.tsx   # Dark mode toggle
│   ├── global-search.tsx  # Search functionality
│   └── theme-provider.tsx # Theme context
└── lib/                   # Utility functions
    ├── content.ts         # Content management
    └── search.ts          # Search utilities

content/                   # Markdown content
├── blog/                 # Long-form articles
├── thoughts/             # Short-form posts
├── projects/             # Project descriptions
├── talks/                # Speaking engagements
└── now/                  # Current activities
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/abhiramnj/portfolio-v3.git
cd portfolio-v3
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📝 Content Management

### Creating Content

Create new markdown files in the appropriate `/content/` directory:

- `/content/thoughts/` - Short-form posts
- `/content/blog/` - Long-form articles  
- `/content/projects/` - Project showcases
- `/content/talks/` - Speaking engagements
- `/content/now/` - Current activities

### Frontmatter Schema

Each content type supports specific frontmatter fields:

```yaml
---
title: "Your Content Title"
description: "Brief description for SEO and previews"
date: "2025-01-05"
tags: ["tag1", "tag2", "tag3"]
published: true

# Blog-specific
category: "tutorial"
readingTime: "10 min read"

# Project-specific
techStack: ["Next.js", "TypeScript", "Tailwind CSS"]
liveUrl: "https://example.com"
githubUrl: "https://github.com/user/repo"

# Talk-specific
event: "Conference Name"
location: "City, Country"
slidesUrl: "https://slides.com/presentation"
videoUrl: "https://youtube.com/watch?v=xxx"
---

Your markdown content goes here...
```

### Admin Interface

Access the admin panel at `/admin` for content management overview and quick actions.

## 🎨 Customization

### Styling
- Modify `src/app/globals.css` for global styles
- Update Tailwind config in `tailwind.config.js`
- Customize components in `src/components/`

### Content Types
- Add new content types in `src/lib/content.ts`
- Create corresponding pages in `src/app/`
- Update search indexing in `src/lib/search.ts`

### Theme Colors
- Light/dark mode colors in `src/app/globals.css`
- Component-specific styling with Tailwind classes

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fabhiramnj%2Fportfolio-v3)

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/abhiramnj/portfolio-v3)

## 📊 Performance

- **Lighthouse Score**: 100/100/100/100
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons
- [nownownow.com](https://nownownow.com/) for the "now" page inspiration

---

Built with ❤️ by [Abhiram N J](https://abhiramnj.com)
