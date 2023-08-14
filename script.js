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
  posts.slice(2, 5).forEach((post) => {
    // Создаем элементы HTML для каждого поста
    const link = document.createElement("a");
    link.classList.add("block", "mx-3");
    link.href = "#";

    const flexDiv = document.createElement("div");
    flexDiv.classList.add("flex");

    const contentDiv = document.createElement("div");

    const title = document.createElement("h3");
    title.classList.add(
      "text-3xl",
      "mt-3",
      "mb-1",
      "text-gray-700",
      "font-bold",
      "capitalize"
    );
    title.textContent = post.title;

    const description = document.createElement("p");
    description.classList.add("text-gray-700");
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
