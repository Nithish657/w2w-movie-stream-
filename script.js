const searchInput = document.getElementById("searchInput");
const movies = document.querySelectorAll(".movie");

searchInput.addEventListener("input", () => {
  const searchText = searchInput.value
    .toLowerCase()
    .replace(/\s/g, ""); // remove all spaces

  movies.forEach(movie => {
    const title = movie.dataset.title
      .toLowerCase()
      .replace(/\s/g, ""); // normalize title

    if (title === searchText) {
      movie.style.display = "block"; // exact match only
    } else {
      movie.style.display = "none";
    }
  });
});

function checkLogin() {
  const phone = localStorage.getItem('myflix_user_phone');
  if (!phone) {
    // If phone not found, redirect to login page
    window.location.href = 'login.html';
  } else {
    const userDisplay = document.getElementById('usernameDisplay');
    if (userDisplay) {
      userDisplay.innerText = `👤 Welcome, +91-${phone}`;
    }
  }
}


function logout() {
  localStorage.removeItem('myflix_user');
  window.location.href = 'login.html';
}

function toggleUserMenu() {
  const menu = document.getElementById('userMenu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function openSettings() {
  alert('Settings page coming soon!');
}

function filterMovies() {
  const query = document.getElementById('movieSearch').value.toLowerCase();
  const cards = document.querySelectorAll('.movie-card');
  let found = false;

  cards.forEach(card => {
    const title = card.querySelector('.movie-title').innerText.toLowerCase();
    if (title.includes(query)) {
      card.style.display = 'inline-block';
      found = true;
    } else {
      card.style.display = 'none';
    }
  });

  const noResults = document.getElementById('noResults');
  if (noResults) noResults.style.display = found ? 'none' : 'block';
}

function scrollRow(button) {
  const row = button.parentElement.querySelector('.movie-row');
  if (!row) return;
  const scrollAmount = 300;
  row.scrollLeft += button.classList.contains('right') ? scrollAmount : -scrollAmount;
}

// Hero Slider
let currentIndex = 0;
const slider = document.getElementById('slider');
const videos = slider ? slider.getElementsByClassName('hero-video') : [];
const dotsContainer = document.getElementById('dots');

function showSlide(index) {
  for (let i = 0; i < videos.length; i++) {
    videos[i].style.display = 'none';
  }
  if (videos[index]) videos[index].style.display = 'block';
  updateDots(index);
}

function updateDots(index) {
  const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function createDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = '';
  for (let i = 0; i < videos.length; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = i;
      showSlide(currentIndex);
    });
    dotsContainer.appendChild(dot);
  }
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % videos.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + videos.length) % videos.length;
  showSlide(currentIndex);
}

if (document.getElementById('next')) {
  document.getElementById('next').addEventListener('click', nextSlide);
}
if (document.getElementById('prev')) {
  document.getElementById('prev').addEventListener('click', prevSlide);
}

document.addEventListener('DOMContentLoaded', () => {
  createDots();
  showSlide(currentIndex);

  // Modal logic for watch buttons
  document.querySelectorAll('.watch-now-btn').forEach(button => {
    button.addEventListener('click', () => {
      const video = button.closest('.movie-card').dataset.video;
      const modal = document.getElementById('videoModal');
      const videoPlayer = document.getElementById('modalVideo');
      if (video && modal && videoPlayer) {
        videoPlayer.src = video;
        modal.style.display = 'flex';
      }
    });
  });
});

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const videoPlayer = document.getElementById('modalVideo');
  modal.style.display = 'none';
  videoPlayer.pause();
  videoPlayer.src = '';
}
function handleSearch(event) {
  event.preventDefault();
  const input = document.getElementById('searchInput');
  const query = input.value.trim();
  if (query.length > 0) {
    window.location.href = `search.html?query=${encodeURIComponent(query)}`;
  }
  return false;
}

