console.log("%c HI", "color: firebrick");

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

document.addEventListener("DOMContentLoaded", async () => {
  fetch(imgUrl)
    .then((response) => response.json())
    .then((jsonData) => {
      jsonData.message.forEach((src) => {
        const image = document.createElement("img");
        image.src = src;
        document.getElementById("dog-image-container").append(image);
      });
    });
  let dogBreeds;

  await fetch(breedUrl)
    .then((response) => response.json())
    .then((jsonData) => {
      dogBreeds = Object.keys(jsonData.message);
      addToList(dogBreeds);
    });

  const alternatives = document.querySelector("#breed-dropdown").children;

  for (let i = 0; i < alternatives.length; i += 1) {
    alternatives[i].addEventListener("click", () => {
      addToList(searchUsingTheFirstAphabet(dogBreeds, alternatives[i].value));
    });
  }
});

function searchUsingTheFirstAphabet(array, alphabet) {
  return array.filter((element) => element[0] == alphabet);
}

function addToList(array) {
  const ul = document.getElementById("dog-breeds");
  ul.innerHTML = "";

  array.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = element;
    li.addEventListener("click", () => {
      li.style.color = "blue";
    });

    ul.append(li);
  });
}
