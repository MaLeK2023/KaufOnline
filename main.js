// KaufOnline Haupt-JavaScript
// Hier können alle globalen Skripte für die Seite eingebunden werden

// Globale Variablen für Warenkorb und Cart-Elemente
let cart = [];
const cartDropdown = document.getElementById('cart-dropdown');
const cartItemsDiv = document.getElementById('cart-items');
const cartEmptyDiv = document.getElementById('cart-empty');

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
    e.preventDefault();
    const username = document.getElementById('login-username');
    const password = document.getElementById('login-password');
    let valid = true;
    clearError(username);
    clearError(password);
    if (!username.value.trim()) {
      showError(username, 'Benutzername erforderlich');
      valid = false;
    }
    if (!password.value.trim()) {
      showError(password, 'Passwort erforderlich');
      valid = false;
    }
    if (valid) {
      alert('Login erfolgreich (Demo)!');
      document.getElementById('login-modal').style.display = 'none';
    }
  });
}
// Registrierung-Formular Validierung
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('register-username');
    const email = document.getElementById('register-email');
    const password = document.getElementById('register-password');
    let valid = true;
    clearError(username);
    clearError(email);
    clearError(password);
    if (!username.value.trim()) {
      showError(username, 'Benutzername erforderlich');
      valid = false;
    }
    if (!email.value.trim() || !email.value.includes('@')) {
      showError(email, 'Gültige E-Mail erforderlich');
      valid = false;
    }
    if (!password.value.trim() || password.value.length < 6) {
      showError(password, 'Mindestens 6 Zeichen für das Passwort');
      valid = false;
    }
    if (valid) {
      alert('Registrierung erfolgreich (Demo)!');
      document.getElementById('register-modal').style.display = 'none';
    }
  });
}

// Favoriten: Herz-Icon zum Markieren und Favoritenliste speichern
function saveFavorites(favs) {
  localStorage.setItem('favoriten', JSON.stringify(favs));
}
function loadFavorites() {
  const saved = localStorage.getItem('favoriten');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch(e) {
      return [];
    }
  }
  return [];
}
let favorites = loadFavorites();
function toggleFavorite(name) {
  if (favorites.includes(name)) {
    favorites = favorites.filter(f => f !== name);
  } else {
    favorites.push(name);
  }
  saveFavorites(favorites);
  renderFavorites();
}
function renderFavorites() {
  document.querySelectorAll('.produkt-card').forEach(card => {
    const name = card.querySelector('h3')?.textContent;
    let favBtn = card.querySelector('.fav-btn');
    if (!favBtn) {
      favBtn = document.createElement('button');
      favBtn.className = 'fav-btn';
      favBtn.style.background = 'none';
      favBtn.style.border = 'none';
      favBtn.style.fontSize = '1.4rem';
      favBtn.style.cursor = 'pointer';
      favBtn.style.position = 'absolute';
      favBtn.style.top = '8px';
      favBtn.style.right = '8px';
      favBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
      card.style.position = 'relative';
      card.appendChild(favBtn);
      favBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleFavorite(name);
      });
    }
    if (favorites.includes(name)) {
      favBtn.innerHTML = '<i class="fa-solid fa-heart" style="color:#d70022;"></i>';
    } else {
      favBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    }
  });
}
document.addEventListener('DOMContentLoaded', renderFavorites);

// Produkt-Detail-Modal
function showProductModal(product) {
  let modal = document.getElementById('product-detail-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'product-detail-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.3)';
    modal.style.zIndex = '4000';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.innerHTML = `
      <div style="background:#fff; padding:2rem 2.5rem; border-radius:12px; box-shadow:0 2px 16px rgba(0,0,0,0.15); min-width:320px; max-width:90vw; position:relative;">
        <button id="close-product-modal" style="position:absolute; top:12px; right:12px; background:none; border:none; font-size:1.3rem; color:#888; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
        <img src="${product.bild}" alt="${product.name}" style="width:220px; height:220px; object-fit:cover; border-radius:12px; margin-bottom:1rem;">
        <h2 style="margin-top:0; color:#0078d7;">${product.name}</h2>
        <p>${product.beschreibung || ''}</p>
        <span style="font-weight:bold; color:#0078d7; font-size:1.2rem;">${product.preis}</span>
        <button id="modal-add-cart" style="display:block; margin-top:1.5rem; background:#0078d7; color:#fff; border:none; border-radius:4px; padding:0.7rem 1.2rem; font-size:1rem; cursor:pointer;">In den Warenkorb</button>
      </div>
    `;
    document.body.appendChild(modal);
  } else {
    modal.style.display = 'flex';
    modal.querySelector('img').src = product.bild;
    modal.querySelector('img').alt = product.name;
    modal.querySelector('h2').textContent = product.name;
    modal.querySelector('p').textContent = product.beschreibung || '';
    modal.querySelector('span').textContent = product.preis;
  }
  modal.querySelector('#close-product-modal').onclick = function() {
    modal.style.display = 'none';
  };
  modal.onclick = function(e) {
    if (e.target === modal) modal.style.display = 'none';
  };
  modal.querySelector('#modal-add-cart').onclick = function() {
    addToCart(product.name, product.preis, product.bild);
    modal.style.display = 'none';
  };
}
// Produktkarten-Click-Handler
if (produktGrid) {
  produktGrid.querySelectorAll('.produkt-card').forEach(card => {
    card.onclick = function(e) {
      const name = card.querySelector('h3')?.textContent || '';
      const preis = card.querySelector('.preis')?.textContent || '';
      const bild = card.querySelector('img')?.src || '';
      const beschreibung = card.querySelector('p')?.textContent || '';
      showProductModal({name, preis, bild, beschreibung});
    };
  });
}
