# Copilot Instructions for Portfolio V3.0

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a Next.js 15 portfolio project with the following specifications:

## Tech Stack
- **Framework**: Next.js with App Router (app/ directory)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX/Markdown with gray-matter frontmatter
- **Theme**: Dark/Light mode with next-themes
- **Search**: Fuse.js for global content search
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **SEO**: next-seo

## Project Structure
- `/src/app/` - Next.js App Router pages
- `/src/components/` - Reusable React components
- `/src/lib/` - Utility functions and configurations
- `/content/` - Markdown content (thoughts, blog, projects, talks, now)
- `/public/` - Static assets

## Key Features to Implement
1. **Global Search**: Search across all content types (thoughts, blog, projects, talks)
2. **Theme Toggle**: Persistent dark/light mode
3. **Content Management**: Markdown-based CMS with admin interface
4. **Responsive Design**: Mobile-first approach
5. **SEO Optimization**: Meta tags, structured data
6. **Accessibility**: WCAG compliant

## Content Types
- **Thoughts**: Short-form posts with tags
- **Blog**: Long-form articles with categories
- **Projects**: Portfolio pieces with tech stacks
- **Talks**: Speaking engagements and presentations
- **Now**: Current focus and activities

## Coding Guidelines
- Use TypeScript with strict mode
- Follow Next.js App Router conventions
- Implement responsive design with Tailwind CSS
- Ensure accessibility best practices
- Use semantic HTML and proper heading hierarchy
- Optimize for performance and SEO
