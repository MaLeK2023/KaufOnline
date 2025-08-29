// KaufOnline Haupt-JavaScript
// Hier können alle globalen Skripte für die Seite eingebunden werden

// Bildwechsel Galerie
const bilder = [
    'img/applewatch.jpg',
    'img/airpods-pro-2-hero-select-202409_FMT_WHH.png',
    'img/AIRTAG.jpg'
];
let index = 0;
const galerieBild = document.getElementById('galerie-bild');
if (galerieBild) {
    function zeigeBild(i) {
        galerieBild.src = bilder[i];
    }
    galerieBild.addEventListener('click', () => {
        index = (index + 1) % bilder.length;
        zeigeBild(index);
    });
    setInterval(() => {
        index = (index + 1) % bilder.length;
        zeigeBild(index);
    }, 5000);
}

// Suche anzeigen
const searchBtn = document.getElementById('search-btn');
const searchContainer = document.getElementById('search-container');
if (searchBtn && searchContainer) {
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchContainer.style.display = searchContainer.style.display === 'none' ? 'block' : 'none';
    });
}
