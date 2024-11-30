// access the sort box and sort button
let box = document.getElementById("sort-box");
let sortButton = document.getElementById("sort-button");
// sort button functonality
document.addEventListener("click", (e) => {
  // if sort button is clicked
  if (e.target == sortButton) {
    if (box.classList.contains("hidden")) {
      box.classList.remove("hidden");
      box.classList.add("flex");
      box.classList.add("flex-col");
    } else {
      box.classList.add("hidden");
    }
  }
  // else if click somewhere else
  else {
    if (box.classList.contains("hidden")) {
      return;
    } else {
      box.classList.add("hidden");
    }
  }
});

// to know number of columns
let columnNumber;

let main = document.querySelector("main");
// to create grid container
let container = document.createElement("div");
container.classList.add("w-full", "grid", "gap-3");
// track for screen size to adjust grid-cols
if (window.innerWidth < 450) {
  container.classList.add("grid-cols-2");
  columnNumber = 2;
} else if (window.innerWidth >= 450 && window.innerWidth < 600) {
  container.classList.add("grid-cols-3");
  columnNumber = 3;
} else if (window.innerWidth >= 600 && window.innerWidth < 800) {
  container.classList.add("grid-cols-4");
  columnNumber = 4;
} else if (window.innerWidth >= 800) {
  container.classList.add("grid-cols-5");
  columnNumber = 5;
}

// append grid container
main.appendChild(container);

// to create column and add in grid container
for (let i = 0; i < columnNumber; i++) {
  let column = document.createElement("div");
  column.classList.add("flex", "flex-col", "gap-3");
  container.appendChild(column);
}

// function Create Cards

// this variables for initialization.
let columnTrack = 0;
let i;
let id = 1;
function createCard(data) {
  let nameTrack = 0;
  for (i = id; i <= id + 19; i++) {
    let card = document.createElement("div");
    card.classList.add(
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
      "p-3",
      "text-yellow",
      "rounded-xl",
      "text-xl",
      "sm:text-2xl",
      "md:text-3xl",
      "bg-black",
      "cursor-pointer",
      "hover:shadow-md",
      "hover:shadow-black",
      "bg-gradient-to-b",
      "from-lightPink",
      "via-yellow",
      "to-sunsetColor"
    );
    // to have name of pokemon
    let pokemonName = document.createElement("h1");
    let pokemonId = document.createElement("h1");
    // to access the name from data
    pokemonName.innerText = data.results[nameTrack].name;
    pokemonId.innerText = i;
    nameTrack++;
    let image = document.createElement("img");
    // below is another link to have high resolution svgs of Pokemon
    image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/3523482c5365843799c8acf5fcad7cccd57fea9d/sprites/pokemon/other/dream-world/${i}.svg`;
    image.alt = "image";
    card.appendChild(image);
    card.appendChild(pokemonId);
    card.appendChild(pokemonName);

    if (columnTrack == container.children.length) {
      columnTrack = 0;
    }
    container.children[columnTrack].appendChild(card);
    columnTrack++;
  }

  id = i;
}

// fetch function
let currentUrl = "https://pokeapi.co/api/v2/pokemon/";
async function fetchData() {
  let response = await fetch(currentUrl);
  let data = await response.json();
  currentUrl = data.next;
  createCard(data);
}
// first call...
fetchData();
// add event listener to continue button
document.getElementById("continue-button").addEventListener("click", () => {
  fetchData();
});

container.addEventListener("click", (e) => {
  // return if grid container was clicked.
  if (e.target == container) {
    return;
  }

  // return if columns was clicked
  for (let i of container.children) {
    if (i == e.target) {
      return;
    }
  }

  // if clicked of img or h1 elements
  if (e.target.tagName == "IMG" || e.target.tagName == "H1") {
    let parent = e.target.parentElement;
    let pokeNumber = parent.children[1].innerText;

    window.location.href = `details.html?id=${pokeNumber}`;
  }
});
