// apiKeys for fetching  1) const apiKey = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
//                       2) const apiKey = "9e9b7d1c2042476586e5d3584b6e7cab";

const apiKey = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
const pageSize = 5;
let pageNumber = 1;
let topic = "general";
let apiUrl = `https://newsapi.org/v2/top-headlines?country=ua&page=${pageNumber}&category=${topic}&pageSize=${pageSize}&apiKey=${apiKey}`;

const paginationNext = document.getElementById("paginationNext");
const paginationPrev = document.getElementById("paginationPrev");
let paginationElements = document.querySelectorAll(".pagination-element");
let categoryTopic = document.querySelectorAll(".categoryTopic");

// topics buttons
categoryTopic.forEach((element) => {
  element.addEventListener("click", (e) => {
    topic = e.target.dataset.category;
    updateApiUrl();
    fetchNews();
  });
});

// update pagination buttons
function updatePaginationButtons() {
  // Знімаємо клас "active" з усіх елементів
  paginationElements.forEach((el) => {
    el.classList.remove("active");
  });

  // Задаємо активну кнопку на основі поточної сторінки
  const activePaginationButton = paginationElements[pageNumber - 1];
  activePaginationButton.classList.add("active");
}

// Один обробник події для всіх кнопок пагінації
paginationElements.forEach((element) => {
  element.addEventListener("click", (e) => {
    pageNumber = e.target.dataset.page;
    updateApiUrl();
    fetchNews();
    updatePaginationButtons(); // Оновлюємо кнопки пагінації
  });
});

// update api url after changing ui
function updateApiUrl() {
  apiUrl = `https://newsapi.org/v2/top-headlines?country=ua&page=${pageNumber}&category=${topic}&pageSize=${pageSize}&apiKey=${apiKey}`;
}

// main fetching
async function fetchNews() {
  const res = await fetch(apiUrl);
  const data = await res.json();
  const news = data.articles;
  const newsSection = document.getElementById("newsSection");
  newsSection.innerHTML = "";

  news.forEach((article) => {
    newsSection.innerHTML += `
      <a href="${article.url}" target="_blank" class="block mx-2">
        <div class="newsCard">
          <div class="left">
            <img class="cardImg" src="${article.urlToImage}" alt="News Image">
          </div>
          <div class="right">
            <h2 class="cardTitle dark:text-gray-200">${article.title}</h2>
            <p class="dark:text-gray-400 cardParagraph">${
              article.description
            }</p>
            <p class="dark:text-gray-400 cardDate">${new Date(
              article.publishedAt
            ).toLocaleString()}</p>
          </div>
        </div>
      </a>
    `;
  });
}

fetchNews();

//--------------------------------------------------------------------------

paginationNext.addEventListener("click", () => {
  pageNumber++;
  updateApiUrl();
  fetchNews();
  updatePaginationButtons();
});

paginationPrev.addEventListener("click", () => {
  pageNumber--;
  updateApiUrl();
  fetchNews();
  updatePaginationButtons();
});

//--------------------------------------------------------------------------

let htmlTag = document.getElementsByTagName("html")[0];
let darkModeBtn = document.getElementById("darkModeBtn");
let darkModeBtnMobile = document.getElementById("darkModeBtnMobile");

darkModeBtn.addEventListener("click", () => {
  if (htmlTag.classList.contains("dark")) {
    htmlTag.classList.remove("dark");
    darkModeBtn.innerHTML = "☀️";
  } else {
    htmlTag.classList.add("dark");
    darkModeBtn.innerHTML = "🌙";
  }
});

darkModeBtnMobile.addEventListener("click", () => {
  if (htmlTag.classList.contains("dark")) {
    htmlTag.classList.remove("dark");
    darkModeBtnMobile.innerHTML = "☀️";
  } else {
    htmlTag.classList.add("dark");
    darkModeBtnMobile.innerHTML = "🌙";
  }
});

//----------------------------------------------------------------------------

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenuBtn = document.getElementById("closeMenuBtn");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

closeMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

//----------------------------------------------------------------------------

let loginBtn = document.getElementById("loginBtn");
let loginBtnMobile = document.getElementById("loginBtnMobile");
let loginModal = document.getElementById("loginModal");

loginBtn.addEventListener("click", () => {
  loginModal.classList.toggle("hidden");
});

loginBtnMobile.addEventListener("click", () => {
  loginModal.classList.toggle("hidden");
});

loginModal.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.classList.toggle("hidden");
  }
});

//----------------------------------------------------------------------------

let subscribeInput = document.getElementById("subscribeInput");
let subscribeButton = document.getElementById("subscribeButton");
let subscribePopup = document.getElementById("subscribePopup");

subscribeButton.addEventListener("click", () => {
  const email = subscribeInput.value;

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => response.json())
    .then((data) => {
      //ответ от бекенда
      console.log(data);

      // изменение классов кнопки после получения ответа
      subscribeButton.classList.remove("bg-indigo-600", "hover:bg-indigo-800");
      subscribeButton.classList.add("disabled-button");
      subscribeButton.textContent = "Thank you for subscribing! 🎉";
      subscribeButton.disabled = true;
      subscribePopup.classList.remove("hidden");

      setTimeout(() => {
        subscribePopup.classList.add("hidden");
      }, 2000);
    })
    .catch((error) => {
      //ошибка от бекенда
      console.error(error);
    });
});
