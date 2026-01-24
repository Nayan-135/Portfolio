# 🖥️ Portfolio Desktop OS

A stunning, interactive desktop-style portfolio website that looks like a modern operating system. Showcase your skills, projects, and experience in a unique and engaging way.

![Portfolio Desktop OS](public/placeholder.jpg)

## ✨ Features

### 🎨 Desktop Environment
- **Monitor Frame UI** - Realistic desktop monitor appearance
- **Boot Animation** - Smooth startup sequence with loading bar
- **Animated Background** - Gradient orbs with subtle grid pattern
- **Smooth Animations** - Professional transitions and effects

### 🪟 Window Management
- **Draggable Windows** - Click and drag windows around the screen
- **Z-Index Stacking** - Windows properly layer on interaction
- **Active Window Highlight** - Blue glow effect for active window
- **Responsive Sizing** - Windows adapt to content

### 🎯 Application Windows (8 Total)
1. **About** - Profile picture and introduction
2. **Skills** - Technical competencies
3. **Resume** - CV and professional summary
4. **Experience** - Detailed work history
5. **Certificates** - Credentials and certifications
6. **Projects** - Portfolio showcase
7. **GitHub Stats** - Live GitHub metrics
8. **Terminal** - Command-line interface
9. **System Info** - System information (bonus)

### 🔧 System Features
- **Status Bar** - Time, active window, and controls
- **Notification System** - Toast notifications with auto-dismiss
- **Context Menu** - Right-click menu with all applications
- **Sound Effects** - Toggle audio feedback
- **Keyboard Shortcuts** - Quick navigation
- **Dark Theme** - Professional dark mode styling

### 🌐 GitHub Integration
- **Live Statistics** - Real-time GitHub data
- **Repository Display** - Top 5 repositories with stars
- **Commit Counting** - Total commits across projects
- **Profile Link** - Direct link to GitHub profile

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation
\`\`\`bash
# Clone the repository
git clone https://github.com/your-username/portfolio-desktop-os.git
cd portfolio-desktop-os

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Configuration
1. Copy `.env.example` to `.env.local`
2. Update `NEXT_PUBLIC_GITHUB_USERNAME` with your GitHub username
3. Restart dev server
4. See [CUSTOMIZATION_CHECKLIST.md](CUSTOMIZATION_CHECKLIST.md) for complete setup

## 📝 Customization

### Update Your Information

#### Profile Picture
Replace `/public/placeholder-user.jpg` with your profile image.

#### About Section
Edit `components/windows/about-window.tsx`:
\`\`\`tsx
<h1 className="text-3xl font-bold text-primary mb-2">Your Name</h1>
<p className="text-lg text-foreground/70 mb-4">Your Job Title</p>
\`\`\`

#### Skills
Edit `components/windows/skills-window.tsx` to add your technical skills.

#### Experience
Edit `components/windows/experience-window.tsx` to add your work history.

#### Projects
Edit `components/windows/projects-window.tsx` to showcase your work.

#### Resume
Edit `components/windows/resume-window.tsx` to add your CV.

#### Certificates
Edit `components/windows/certificates-window.tsx` to list your credentials.

### Theme Colors
Edit `app/globals.css` to change the primary color:
\`\`\`css
--primary: oklch(0.5 0.15 240); /* Change this value */
\`\`\`

## 🎮 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Esc` | Close active window |
| `Ctrl+W` | Close active window |
| `Ctrl+Shift+C` | Close all windows |
| `Ctrl+Alt+T` | Open terminal |
| Right-click | Open context menu |

## 🎵 Sound Effects

All sound effects can be toggled on/off using the sound icon in the status bar. Sound effects include:
- Window open/close
- Drag feedback
- Notifications
- Terminal typing
- Error alerts

## 📦 Technology Stack

- **Framework:** [Next.js 16](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Audio:** Web Audio API (native)
- **API:** GitHub API (free tier)

## 📂 Project Structure

\`\`\`
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main entry point
│   └── globals.css         # Theme and animations
├── components/
│   ├── desktop-environment.tsx    # State management
│   ├── desktop.tsx                # Main desktop
│   ├── desktop-icons.tsx          # Taskbar
│   ├── draggable-window.tsx       # Window component
│   └── windows/                   # Window content
│       ├── about-window.tsx
│       ├── skills-window.tsx
│       ├── resume-window.tsx
│       ├── experience-window.tsx
│       ├── certificates-window.tsx
│       ├── projects-window.tsx
│       ├── github-stats-window.tsx
│       ├── system-info-window.tsx
│       └── terminal-window.tsx
├── lib/
│   ├── utils.ts          # Utility functions
│   ├── sound-effects.ts  # Audio generation
│   ├── github.ts         # GitHub API
│   └── constants.ts      # App constants
└── public/
    └── placeholder-user.jpg  # Profile image
\`\`\`

## 🌐 Deployment

### Deploy to Vercel (Recommended)
\`\`\`bash
npm run build
vercel deploy
\`\`\`

Then set environment variables in Vercel:
- `NEXT_PUBLIC_GITHUB_USERNAME` = your-github-username

### Other Platforms
Works with any Node.js hosting platform (Netlify, Render, Railway, etc.)

## 🧪 Testing

### Local Testing
\`\`\`bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
\`\`\`

### Linting
\`\`\`bash
npm run lint         # ESLint
\`\`\`

## 📖 Documentation

- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed setup instructions
- [FILE_ARCHITECTURE.md](FILE_ARCHITECTURE.md) - Complete file structure
- [PROJECT_FILES_SUMMARY.md](PROJECT_FILES_SUMMARY.md) - All files explained
- [CUSTOMIZATION_CHECKLIST.md](CUSTOMIZATION_CHECKLIST.md) - Step-by-step customization

## 🐛 Troubleshooting

### GitHub Stats Not Loading
1. Check `NEXT_PUBLIC_GITHUB_USERNAME` is set correctly in `.env.local`
2. Verify the username exists on GitHub
3. Check browser console for API errors
4. GitHub API has rate limits (60 requests/hour for unauthenticated)

### Images Not Showing
1. Ensure image files exist in `/public`
2. Use absolute paths: `/image-name.jpg`
3. Check file extensions are correct

### Windows Not Opening
1. Clear browser cache
2. Check browser console for errors
3. Restart dev server

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Icons from [Lucide React](https://lucide.dev/)
- Components from [shadcn/ui](https://ui.shadcn.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For help and questions:
1. Check the [documentation](./SETUP_GUIDE.md)
2. Review the [troubleshooting guide](./SETUP_GUIDE.md#troubleshooting)
3. Open an issue on GitHub
4. Check [discussions](https://github.com/your-username/portfolio-desktop-os/discussions)

## 🎯 Roadmap

- [ ] Mobile responsive improvements
- [ ] More theme options
- [ ] Blog window
- [ ] Contact form window
- [ ] Dark/Light theme toggle
- [ ] Customizable taskbar
- [ ] Window resize functionality
- [ ] More sound effect options

## ⭐ Show Your Support

If you find this project helpful, please give it a star! ⭐


