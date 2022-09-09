//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

window.onload = setup;

function makePageForEpisodes(episodeList) {
  //display area of the website
  const rootElem = document.getElementById("root");

  //level 100 additional heading
  let headingEl = document.createElement("div");
  headingEl.innerText = "tv show project";
  headingEl.className = "headingEl";
  rootElem.appendChild(headingEl);

  //level 200 search bar creation
  let searchBarEl = document.createElement("div");
  searchBarEl.className = "searchBar";
  rootElem.appendChild(searchBarEl);
  let searchDescEl = document.createElement("p");
  searchDescEl.textContent = "Displaying 10 of 73 Results";
  searchBarEl.appendChild(searchDescEl);
  searchDescEl.className = "searchDescEl";
  let searchInputEl = document.createElement("input");
  searchBarEl.appendChild(searchInputEl);
  searchInputEl.className = "searchInput";
  searchInputEl.placeholder = " Search for Episode";
  searchInputEl.name = "searchInput";

  //level 100 display of episode cards creation
  const showsEl = document.createElement("section");
  showsEl.className = "showsEl";
  rootElem.appendChild(showsEl);

  //initial showing of episodes - refactored in level 200 to make easier for reusability
  showEpisodes(episodeList, showsEl);

  //level 200
  // Add a "live" search input:
  // Only episodes whose summary OR name contains the search term should be displayed
  searchInputEl.addEventListener("input", () => {
    let filterList = episodeList.filter((el) => {
      return (
        el.name.includes(searchInputEl.value) ||
        el.summary.includes(searchInputEl.value)
      );
    });
    //research better way
    while (showsEl.firstChild) {
      showsEl.removeChild(showsEl.firstChild);
    }
    showEpisodes(filterList, showsEl);
    // searchDescEl.textContent = filterList.length;
  });
}

function showEpisodes(showsList, showsEl) {
  //level 100 counter for colours
  let cardColours = [
    "#e2e2df",
    "#d2d2cf",
    "#e2cfc4",
    "#f7d9c4",
    "#faedcb",
    "#c9e4de",
    "#c6def1",
    "#dbcdf0",
    "#f2c6de",
    "#f9c6c9",
  ];
  let count = 0;

  showsList.forEach((episode) => {
    let articleEl = document.createElement("article");
    articleEl.style.backgroundColor = cardColours[count];
    let titleEl = document.createElement("h2");

    //repeated looping through colours
    if (count < cardColours.length - 1) {
      count++;
    } else {
      count = 0;
    }
    articleEl.className = "movieCard";

    //the episode's name, the season number, the episode number
    let episodeCode =
      episode.season.toString().padStart(2, "0") +
      episode.number.toString().padStart(2, "0");

    titleEl.textContent += `${episode.name} - S${episodeCode}`;
    articleEl.append(titleEl);

    // the episode's medium-sized image
    let imgEl = document.createElement("img");
    imgEl.src = episode.image.medium;
    imgEl.alt = `Image of Game of Thrones Episode: S${episode.season} E${episode.number}`;
    articleEl.append(imgEl);

    // the episode's summary text
    let summEl = document.createElement("p");
    summEl.innerHTML = episode.summary;
    articleEl.append(summEl);

    showsEl.appendChild(articleEl);
  });
}

// let updateTitleBtn = document.querySelector("#updateTitleBtn");

// updateTitleBtn.addEventListener("click", function () {
//   let inputBox = document.querySelector("#titleInput");
//   let title = inputBox.value;

//   let titleElement = document.querySelector("#lessonTitle");
//   titleElement.innerText = title;
//   inputBox.value = title;
// });

// The search should be case-insensitive
// The display should update immediately after each keystroke changes the input.
// Display how many episodes match the current search
// If the search box is cleared, all episodes should be shown.
