# Owen Hamlin One Page Website

A modern, responsive one-page website for Owen Hamlin, built with [HTML5 Boilerplate](https://html5boilerplate.com/). This project leverages best practices in HTML5, CSS3, and JavaScript, and is designed for fast, robust, and accessible web experiences.

---

## Table of Contents

- [Technologies Used](#technologies-used)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Customization](#customization)
- [License](#license)

---

## Technologies Used

- **HTML5 Boilerplate** – Front-end template for fast, robust web apps
- **HTML5/CSS3/JavaScript** – Core web technologies
- **jQuery** – DOM manipulation and utilities
- **Modernizr** – Feature detection
- **Normalize.css** – CSS normalization
- **Amazon S3** – Static website hosting and access logging
- **Amazon Athena** – Querying S3 access logs
- **Google Sheets** (optional) – Data visualization and analysis

---

## Directory Structure

```
/
├── audio/              # Audio files 
├── css/                # Stylesheets (main.css, normalize.css, responsive.css, etc.)
├── doc/                # Project documentation (usage, FAQ, etc.)
├── img/                # Images and icons (gallery, discography, etc.)
├── js/                 # JavaScript files (plugins, player, vendor libraries)
├── node_modules/       # Node.js dependencies (if applicable)
├── .editorconfig       # Editor configuration
├── .gitignore          # Git ignore rules
├── 404.html            # Custom 404 page
├── favicon.ico         # Favicon
├── humans.txt          # Team/contributors info
├── index.html          # Main HTML file
├── README.md           # Project overview
```

> **Note:**  
> - S3 and Athena are used for hosting and analytics, but are not part of the local directory.
> - Color picker functionality has been removed; the site uses a fixed orange theme.

---

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/owen-hamlin-one-page.git
   cd owen-hamlin-one-page
   ```

2. **Install dependencies (if using Node.js):**
   ```sh
   npm install
   ```

3. **Open `index.html` in your browser to view the site locally.**

---

## Development

- **HTML**: Main structure in [`index.html`](index.html)
- **CSS**: Styles in [`css/`](css/)
- **JavaScript**: Scripts in [`js/`](js/)
  - jQuery and plugins are loaded from the `js/` directory.
  - Audio player and gallery scripts are included.
- **Images**: Place images in [`img/`](img/)

### Customization

- Update content in `index.html` for biography, gallery, discography, etc.
- Add or replace images in the `img/` directory.
- Modify styles in `css/main.css` or add new stylesheets as needed.
- Add or update JavaScript in `js/`.

---

## Deployment

This site is designed for static hosting (e.g., Amazon S3, Netlify, GitHub Pages).

1. **Build/Optimize (optional):**
   - Minify CSS/JS for production.
   - Optimize images.

2. **Upload all files to your static hosting provider.**

3. **Configure DNS and SSL as needed.**

---

## Analytics

- **Amazon S3** is used for static hosting and access logging.
- **Amazon Athena** can be used to query S3 access logs for analytics.
- **Google Sheets** (optional) for further data visualization.

---

## License

This project is licensed under the [MIT License](LICENSE.md).

---

## Credits

- Built with [HTML5 Boilerplate](https://html5boilerplate.com/)
- See [`humans.txt`](humans.txt) for team and contributor information.

---