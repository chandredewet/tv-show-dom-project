//You can edit ALL of the code here

//create certain elements globally to not need to keep passing elements
let results = 0;

const rootElem = document.getElementById("root");
let testSelect = document.createElement("select");
rootElem.appendChild(testSelect);
let testOptEl = document.createElement("option");
testOptEl.text = `Option 0`;
testOptEl.value = 0;
testSelect.add(testOptEl);
let headingEl = createDiv("headingEl", "tv show project"); //level 100
rootElem.appendChild(headingEl);
let searchBarEl = createDiv("searchBar"); //level 200 search bar creation
rootElem.appendChild(searchBarEl);
let inputContainerEl = createDiv("inputContainer");
searchBarEl.appendChild(inputContainerEl);
let searchInputEl = createInput("searchInput", " Search for Episode");
inputContainerEl.appendChild(searchInputEl);
let searchDescEl = createSearchDiv("searchDescEl");
inputContainerEl.appendChild(searchDescEl);
//level 300 400
let showsSelectEl = createSelect(`Click for All Shows`);
searchBarEl.appendChild(showsSelectEl);
showsSelectEl.setAttribute("id", "showNameSelect");
let searchSelectEl = createSelect(`Click for All Episodes`);
searchBarEl.appendChild(searchSelectEl);
//level 100 display of episode cards creation
const showsEl = document.createElement("section");
showsEl.className = "showsEl";
rootElem.appendChild(showsEl);

let testOptEl1 = document.createElement("option");
testOptEl1.text = `Option TWOOOO`;
testOptEl1.value = 0;
testSelect.add(testOptEl1);

showsSelectEl.addEventListener("change", function () {
  if (this.value === "Click for All Shows") {
    showEpisodes(episodeList);
  } else {
    let SHOW_ID = getAllShows()[this.value].id;
    let apiUrl = `https://api.tvmaze.com/shows/${SHOW_ID}/episodes`;
    //https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionsCollection
    searchSelectEl.options.length = 1;
    getDataFromAPI(apiUrl);
  }
});

function setup() {
  let apiUrl = `https://api.tvmaze.com/shows/527/episodes`;
  getDataFromAPI(apiUrl);
}

window.onload = setup;

function getDataFromAPI(myAPI) {
  fetch(myAPI)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        console.log("success", response);
        return response.json();
      } else {
        throw new Error(
          `Encountered something unexpected: ${response.status} ${response.statusText}`
        );
      }
    })
    .then((jsonResponse) => {
      // do whatever you want with the JSON response
      let allEpisodes = jsonResponse;
      makePageForEpisodes(allEpisodes);
    })
    .catch((error) => {
      // Handle the error
      console.log(error);
    });
}

function makePageForEpisodes(episodeList) {
  let results = episodeList.length;
  document.querySelector(
    ".searchDescEl"
  ).innerHTML = `   Displaying  <span id="myResults">${results}</span> of ${results} Results`;

  //level 200
  // Add a "live" search input:
  // Only episodes whose summary OR name contains the search term should be displayed
  searchInputEl.addEventListener("input", () => {
    let filterList = episodeList.filter((el) => {
      let inputChar = searchInputEl.value;
      return (
        //case insensitive
        el.name.toUpperCase().includes(inputChar.toUpperCase()) ||
        el.summary.toUpperCase().includes(inputChar.toUpperCase())
      );
    });
    if (filterList.length) {
      showEpisodes(filterList);
    } else {
      while (showsEl.firstChild) {
        showsEl.removeChild(showsEl.firstChild);
      }
      document.getElementById("myResults");
      myResults.textContent = "0";
    }
  });

  //initial showing of episodes - refactored in level 200 to make easier for reusability
  showEpisodes(episodeList);

  //event listener for select element
  searchSelectEl.addEventListener("change", function () {
    if (this.value === "Click for All Episodes") {
      showEpisodes(episodeList);
    } else {
      let singleArr = [];
      singleArr.push(episodeList[this.value]);
      showEpisodes(singleArr);
    }
  });
}

function showEpisodes(showsList) {
  //clear display Cards
  while (showsEl.firstChild) {
    showsEl.removeChild(showsEl.firstChild);
  }

  //update result amount
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
  //show episodes
  showsList.forEach((episode, inx) => {
    let articleEl = document.createElement("article");
    articleEl.style.backgroundColor = cardColours[count];
    articleEl.className = "movieCard";
    let titleEl = document.createElement("h2");
    //repeated looping through colours
    count < cardColours.length - 1 ? count++ : (count = 0);

    //the episode's name, the season number, the episode number
    let episodeCode =
      episode.season.toString().padStart(2, "0") +
      episode.number.toString().padStart(2, "0");

    //level 400
    let showsSelectOptEl = document.createElement("option");
    showsSelectOptEl.text = getAllShows()[inx].name;
    showsSelectOptEl.value = inx;
    showsSelectEl.add(showsSelectOptEl);

    titleEl.textContent += `${episode.name} - S${episodeCode}`;
    articleEl.append(titleEl);

    //level 300
    let searchSelectOptEl = document.createElement("option");
    searchSelectOptEl.text = `S${episodeCode} - ${episode.name}`;
    searchSelectOptEl.value = inx;
    searchSelectEl.add(searchSelectOptEl);

    // the episode's medium-sized image
    let imgEl = document.createElement("img");
    imgEl.src = episode.image.medium;
    imgEl.alt = `Image of S${episode.season} E${episode.number}`;
    articleEl.append(imgEl);

    // the episode's summary text
    let summEl = document.createElement("p");
    summEl.innerHTML = episode.summary;
    articleEl.append(summEl);
    showsEl.appendChild(articleEl);
  });
}

function createDiv(elName, elText) {
  let newEl = document.createElement("div");
  newEl.className = elName;
  if (elText) {
    newEl.innerText = elText;
  }
  return newEl;
}

function createInput(elName, elText) {
  let newInput = document.createElement("input");
  newInput.className = elName;
  newInput.placeholder = elText;
  newInput.name = elName;
  return newInput;
}

function createSearchDiv(elName) {
  let newEl = document.createElement("div");
  newEl.className = elName;
  return newEl;
}

function createSelect(topOption) {
  let newSelect = document.createElement("select");
  newSelect.className = "searchSelect";
  let searchSelectOptEl = document.createElement("option");
  searchSelectOptEl.text = topOption;
  newSelect.add(searchSelectOptEl);
  return newSelect;
}
