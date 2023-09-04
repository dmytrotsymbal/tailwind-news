const apiUrl = "https://jsonplaceholder.typicode.com/posts";

// Создаем функцию для выполнения запроса к API
async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  // Получаем массив постов из ответа
  const posts = data;

  // Находим наш секшн с постами
  const section = document.getElementById("newsSection");

  // Создаем цикл для перебора постов и создания HTML-разметки
  posts.slice(0, 6).forEach((post) => {
    // Создаем элементы HTML для каждого поста
    const link = document.createElement("a");
    link.classList.add("block", "mx-2");
    link.href = "#";

    const flexDiv = document.createElement("div");
    flexDiv.classList.add("flex");

    const contentDiv = document.createElement("div");

    const title = document.createElement("h2");
    title.classList.add(
      "dark:text-slate-200",
      "text-3xl",
      "mt-3",
      "mb-1",
      "text-gray-700",
      "font-bold",
      "capitalize"
    );
    title.textContent = post.title;

    const description = document.createElement("p");
    description.classList.add("dark:text-slate-400", "text-gray-700");
    description.textContent = post.body;

    // Собираем элементы вместе
    contentDiv.appendChild(title);
    contentDiv.appendChild(description);

    flexDiv.appendChild(contentDiv);

    link.appendChild(flexDiv);

    section.appendChild(link);
  });
}

// Вызываем функцию для получения и вывода постов
fetchPosts();

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
