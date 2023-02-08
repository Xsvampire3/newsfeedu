const newsContainer = document.querySelector("#newsContainer");
const saveButton = document.querySelector("#saveButton");
const loadSavedButton = document.querySelector("#loadSavedButton");
const loadNewsButton = document.querySelector("#loadNewsButton");
const categorySelect = document.querySelector("#categorySelect");

const getNews = (category = "science") => {
  newsContainer.innerHTML = "";
  fetch(`https://inshorts.deta.dev/news?category=${category}`)
    .then((response) => response.json())
    .then((data) => {
      data.news.forEach((newsItem) => {
        const div = document.createElement("div");
        div.classList.add("newsItem");
        div.innerHTML = `
          <h2>${newsItem.title}</h2>
          <p>${newsItem.content}</p>
          <button class="likeButton">Like</button>
        `;
        newsContainer.appendChild(div);
      });
    });
};

const saveNews = () => {
  const news = Array.from(document.querySelectorAll(".newsItem")).map(
    (newsItem) => {
      return {
        title: newsItem.querySelector("h2").textContent,
        content: newsItem.querySelector("p").textContent,
      };
    }
  );
  localStorage.setItem("savedNews", JSON.stringify(news));
};

const loadSavedNews = () => {
  const savedNews = JSON.parse(localStorage.getItem("savedNews"));
  if (!savedNews) {
    return;
  }
  savedNews.forEach((newsItem) => {
    const div = document.createElement("div");
    div.classList.add("newsItem");
    div.innerHTML = `
      <h2>${newsItem.title}</h2>
      <p>${newsItem.content}</p>
      <button class="likeButton">Like</button>
    `;
    newsContainer.appendChild(div);
  });
};

saveButton.addEventListener("click", saveNews);
loadSavedButton.addEventListener("click", loadSavedNews);
loadNewsButton.addEventListener("click", () => {
  getNews(categorySelect.value);
});

getNews();
