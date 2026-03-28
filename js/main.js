const grid = document.getElementById("moviesGrid");
const toggleBtn = document.getElementById("themeToggle");


if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
  toggleBtn.textContent = "☀︎";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  const isLight = document.body.classList.contains("light-mode");

  localStorage.setItem("theme", isLight ? "light" : "dark");
  toggleBtn.textContent = isLight ? "☀︎" : "⏾";
});


function renderMovies() {
  grid.innerHTML = "";

  movies.forEach(m => {
    grid.innerHTML += `
      <div class="card">
        <img src="${m.image}">
        <h3>${m.title}</h3>
      </div>
    `;
  });
}

renderMovies();