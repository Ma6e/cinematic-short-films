const movies = [
  {
    title: "Glass Harbor",
    genre: "Drama",
    year: 2025,
    duration: "18 min",
    score: 4.9,
    budget: "$2.8M",
    director: "Malia Grey",
    summary:
      "A grieving daughter returns to the fishing town where her mother vanished, uncovering a hidden ledger that rewrites the town’s history.",
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80",
    trailer: "https://www.youtube.com/embed/ScMzIvxBSi4?si=H1Z1q2Y3c3DqUIGt",
    tag: "Festival pick",
  },
  {
    title: "The Last Ember",
    genre: "Sci-Fi",
    year: 2024,
    duration: "14 min",
    score: 4.8,
    budget: "$1.9M",
    director: "Nora Velez",
    summary:
      "In a future where heat is rationed, a young engineer must decide whether to save her city or keep the last spark alive for her family.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    trailer: "https://www.youtube.com/embed/ysz5S6PUM-U?si=2-3dQXg2AkN7W7iE",
    tag: "Critics' pick",
  },
  {
    title: "Rust & Bloom",
    genre: "Romance",
    year: 2025,
    duration: "22 min",
    score: 4.7,
    budget: "$2.2M",
    director: "Ari Sol",
    summary:
      "During the final week of a shuttered orchard, two estranged siblings discover the last trees are blooming with impossible color.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    trailer: "https://www.youtube.com/embed/aqz-KE-bpKQ?si=lrTgDRXfJmkJg0l7",
    tag: "Award winner",
  },
  {
    title: "Night Signal",
    genre: "Thriller",
    year: 2024,
    duration: "19 min",
    score: 4.9,
    budget: "$3.1M",
    director: "Ethan Vale",
    summary:
      "A stranded radio host receives a call from a voice that sounds exactly like the one lost in the sea a decade earlier.",
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80",
    trailer: "https://www.youtube.com/embed/9bZkp7q19f0?si=sHEGttYg6f8N0G6w",
    tag: "Top thriller",
  },
  {
    title: "Paper Moon Motel",
    genre: "Mystery",
    year: 2025,
    duration: "16 min",
    score: 4.6,
    budget: "$1.6M",
    director: "Jules Ibarra",
    summary:
      "A night clerk finds a hidden room in the motel basement and a collection of letters that trace the lives of impossible guests.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=2klw71f8mQ6J7yaw",
    tag: "New release",
  },
  {
    title: "Avenue of Echoes",
    genre: "Documentary",
    year: 2023,
    duration: "27 min",
    score: 4.8,
    budget: "$2.4M",
    director: "Leah Moreno",
    summary:
      "A portrait of a neighborhood at the edge of urban renewal, told through voices and architecture that shaped the community.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
    trailer: "https://www.youtube.com/embed/jNQXAC9IVRw?si=ef2m2O9n8gB7yM0X",
    tag: "Documentary award",
  },
];

const filters = ["All", "Drama", "Sci-Fi", "Romance", "Thriller", "Mystery", "Documentary"];

const movieGrid = document.getElementById("movieGrid");
const filterGroup = document.getElementById("filters");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("trailerModal");
const trailerFrame = document.getElementById("trailerFrame");

let activeFilter = "All";
let currentQuery = "";

function renderFilters() {
  filterGroup.innerHTML = filters
    .map(
      (filter) =>
        `<button class="filter-chip ${filter === activeFilter ? "active" : ""}" data-filter="${filter}">${filter}</button>`
    )
    .join("");

  filterGroup.querySelectorAll(".filter-chip").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      renderFilters();
      renderMovies();
    });
  });
}

function getVisibleMovies() {
  const normalizedQuery = currentQuery.trim().toLowerCase();

  return movies.filter((movie) => {
    const matchesFilter = activeFilter === "All" || movie.genre === activeFilter;
    const matchesSearch =
      !normalizedQuery ||
      movie.title.toLowerCase().includes(normalizedQuery) ||
      movie.genre.toLowerCase().includes(normalizedQuery) ||
      movie.director.toLowerCase().includes(normalizedQuery);

    return matchesFilter && matchesSearch;
  });
}

function renderMovies() {
  const visibleMovies = getVisibleMovies();

  if (!visibleMovies.length) {
    movieGrid.innerHTML = `
      <div class="movie-card" style="grid-column: 1 / -1; padding: 28px 22px;">
        <h4 style="margin:0; letter-spacing:-0.05em;">No films match your search.</h4>
        <p style="margin:10px 0 0; color: var(--muted);">Try another genre or search term.</p>
      </div>
    `;
    return;
  }

  movieGrid.innerHTML = visibleMovies
    .map(
      (movie) => `
        <article class="movie-card">
          <div class="movie-poster" style="background-image: url('${movie.image}')"></div>
          <div class="movie-card-body">
            <div class="movie-toprow">
              <h4>${movie.title}</h4>
              <span class="score-pill">${movie.score.toFixed(1)} ★</span>
            </div>

            <div class="movie-meta">
              <span>${movie.genre}</span>
              <span>${movie.year}</span>
              <span>${movie.duration}</span>
            </div>

            <p>${movie.summary}</p>

            <div class="movie-footer">
              <span class="badge-tag">${movie.tag}</span>
              <button class="movie-button" data-trailer="${movie.trailer}">Watch trailer</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  movieGrid.querySelectorAll(".movie-button").forEach((button) => {
    button.addEventListener("click", () => {
      trailerFrame.src = button.dataset.trailer;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    });
  });
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  trailerFrame.src = "";
}

searchInput.addEventListener("input", (event) => {
  currentQuery = event.target.value;
  renderMovies();
});

const heroFeaturedButton = document.querySelector("#featuredBtn");
if (heroFeaturedButton) {
  heroFeaturedButton.addEventListener("click", () => {
    document.getElementById("discover").scrollIntoView({ behavior: "smooth" });
  });
}

const heroCatalogButton = document.querySelector("#catalogBtn");
if (heroCatalogButton) {
  heroCatalogButton.addEventListener("click", () => {
    document.getElementById("festival").scrollIntoView({ behavior: "smooth" });
  });
}

const trailerButton = document.querySelector("[data-trailer]");
if (trailerButton) {
  trailerButton.addEventListener("click", () => {
    trailerFrame.src = trailerButton.dataset.trailer;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
}

document.querySelector(".close-btn").addEventListener("click", closeModal);
document.querySelector("[data-close='true']").addEventListener("click", closeModal);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});

renderFilters();
renderMovies();
