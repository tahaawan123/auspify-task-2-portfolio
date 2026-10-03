# Muhammad Taha | Personal Portfolio Website

A responsive personal portfolio website to showcase my skills, projects, and contact details. Built with pure HTML, CSS, and JavaScript, with no frameworks or libraries.

## Features

- Four sections: Home, About, Projects, and Contact
- Fully responsive layout for mobile, tablet, and desktop
- Sticky navigation bar with smooth scrolling and a mobile hamburger menu
- Dark and light theme toggle (saved in the browser)
- Typing animation and animated stat counters in the hero section
- 12 project cards with thumbnails, tech tags, and live project links
- Project category filter (All, Web, Python & AI)
- Skills and services sections
- Contact form with real-time validation and success/error messages
- Copy-to-clipboard buttons for email and phone
- Scroll reveal animations and a back-to-top button
- Accessible and SEO-friendly markup

## Tech Stack

- HTML5
- CSS3 (Flexbox, Grid, CSS Variables)
- JavaScript (ES6)

## Folder Structure

```
task2-portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── Taha-Resume.pdf
│   └── img/
│       ├── profile.jpg
│       └── projects/
└── README.md
```

## Run Locally

1. Clone the repository:
```bash
   git clone https://github.com/tahaawan123/auspify-task-2-portfolio.git
```
2. Open the project folder.
3. Open `index.html` in your browser.

## Contact Form Setup

The contact form uses [Formspree](https://formspree.io) to deliver messages.

1. Create a free account and a new form on Formspree.
2. Copy your form endpoint (for example, `https://formspree.io/f/xyzabcde`).
3. Open `js/script.js` and update this line:
```javascript
   const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
```

If the endpoint is not set, the form opens the visitor's email app with the message pre-filled.

## Author

**Muhammad Taha**
Full Stack & AI Developer

- GitHub: [tahaawan123](https://github.com/tahaawan123)
- LinkedIn: [Muhammad Taha](https://www.linkedin.com/in/muhammad-taha-4735912b6/)
- Email: tahaawan598@gmail.com

---

Built as Task 2 of the Auspify Technologies Web Development Internship.