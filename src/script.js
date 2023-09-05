const apiKey = "9e9b7d1c2042476586e5d3584b6e7cab";
const apiUrl = `https://newsapi.org/v2/top-headlines?country=ua&apiKey=${apiKey}`;

// Асинхронна функція для отримання та відображення новин
async function fetchNews() {
  const res = await fetch(apiUrl);
  const data = await res.json();

  const news = data.articles;
  const newsSection = document.getElementById("newsSection");
  newsSection.innerHTML = "";

  // Використовуємо HTML-розмітку без окремої функції
  news.forEach((article) => {
    newsSection.innerHTML += `
      <a href="${article.url}" target="_blank" class="block mx-2">
          <div class="newsCard">
            <div class="left">
              <img class="cardImg" src="${article.urlToImage}" alt="News Image">
            </div>

            <div class="right">
              <h2 class="cardTitle">
              ${article.title}
              </h2>
              <p class="cardParagraph">${article.description}</p>
              <p class="cardDate">${new Date(
                article.publishedAt
              ).toLocaleString()}</p>
            </div>
          </div>
      </a>
    `;
  });
}

// Викликаємо функцію для отримання і відображення новин
fetchNews();

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
