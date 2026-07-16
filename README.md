# Personal Portfolio Website

A clean and responsive personal portfolio built with HTML, CSS, and JavaScript. Designed to showcase projects, skills, and provide an easy way for others to reach out.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Live Demo

[View Website](https://nkoch33.github.io/nolan-koch-portfolio/)  


## Features

- Fully responsive design
- Smooth transitions and clean layout
- Dynamic project loading from JavaScript
- Contact form with validation
- Organized skills section with icons
- Minimal dependencies (Font Awesome + Google Fonts)

## File Structure
portfolio/
├── index.html - Main HTML structure
├── styles.css - Site styling
├── script.js - Handles interactivity and project loading
└── README.md - This file


## Getting Started

1. Clone or download this repository  
2. Open `index.html` in your browser  
3. Update your content (see customization tips below)  
4. Deploy using GitHub Pages, Netlify, or Vercel

## Customization

### Hero & About Sections (`index.html`)

Update the intro with your name and info:

```html
<h1 class="hero-title">Hi, I'm <span class="highlight">Your Name</span></h1>
<h2 class="hero-subtitle">Web Developer</h2>
<p>your.email@example.com</p>

Projects

const projects = [
  {
    title: "Project Title",
    description: "Short project summary...",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://project-demo.com",
    githubUrl: "https://github.com/yourusername/project"
  },
  // Add more
];

Skills

<div class="skill-item">
  <i class="fab fa-js"></i>
  <span>JavaScript</span>
</div>

Styling

:root {
  --primary-color: #2563eb;
  --secondary-color: #fbbf24;
  --text-color: #333;
  --background-color: #ffffff;
}

Acknowledgments
Font Awesome for icons

Google Fonts for typography




