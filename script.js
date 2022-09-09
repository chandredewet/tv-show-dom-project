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

  let inputContainerEl = document.createElement("div");
  inputContainerEl.className = "inputContainer";
  searchBarEl.appendChild(inputContainerEl);

  let searchInputEl = document.createElement("input");
  inputContainerEl.appendChild(searchInputEl);
  searchInputEl.className = "searchInput";
  searchInputEl.placeholder = " Search for Episode";
  searchInputEl.name = "searchInput";

  let searchDescEl = document.createElement("div");
  let results = episodeList.length;
  searchDescEl.innerHTML = `   Displaying  <span id="myResults">${results}</span> of ${results} Results`;
  inputContainerEl.appendChild(searchDescEl);
  searchDescEl.className = "searchDescEl";

  //level 300
let selectContainerEl = document.createElement("div");
selectContainerEl.className = "selectContainer";
searchBarEl.appendChild(selectContainerEl);

  let searchSelectEl = document.createElement("select");
  selectContainerEl.appendChild(searchSelectEl);
  searchSelectEl.className = "searchSelect";
  // searchInputEl.placeholder = " Search for Episode";
  // searchInputEl.name = "searchInput";

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
      let inputChar = searchInputEl.value;
      return (
        el.name.includes(inputChar) || el.summary.includes(searchInputEl.value)
      );
    });

    while (showsEl.firstChild) {
      showsEl.removeChild(showsEl.firstChild);
    }

    if (filterList.length) {
      showEpisodes(filterList, showsEl);
    } else {
      let noEpisodeP = document.createElement("p");
      noEpisodeP.textContent = "There are No Such Episodes, Try again";
      showsEl.appendChild(noEpisodeP);
    }
  });
}

function showEpisodes(showsList, showsEl) {
  console.log(showsList.length);
  document.getElementById("myResults");
  myResults.textContent = showsList.length;
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

//outstanding The search should be case-insensitive
