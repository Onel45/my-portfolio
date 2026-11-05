# Oleyo Nelson portfolio (React + Vite)

## Run it
    npm install
    npm run dev          # local dev server
    npm run build        # production build in dist/
    npm run build:single # one self contained dist-single/index.html (double click to open)

## Your photos
Put `martin.jpg`, `me.jpg` and `nice1.jpg` in the `public/` folder. Without them the page still works,
the image spots are just empty.

## Where things live
- `src/App.jsx` page order and the preloader
- `src/components/` one file per section, plus Cursor, Badge, Marquee, Reveal, Preloader
- `src/data.js` skills, languages, projects, contact links and the gallery captions (edit text here)
- `src/assets/gallery/` the basketball photos (basketball-1.jpg to basketball-6.jpg)
- `src/styles.css` all styling
- `src/assets/fonts/` Manrope and DM Mono, saved locally (nothing is loaded from Google)
- LinkedIn and GitHub links in `src/data.js` still point to the home pages: replace them with your profiles.
