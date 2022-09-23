//You can edit ALL of the code here

function setup() {
  // let allEpisodes;
  getDataFromAPI("https://api.tvmaze.com/shows/527/episodes");
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
  //display area of the website

  const rootElem = document.getElementById("root");

  let headingEl = createDiv("headingEl", "tv show project"); //level 100 additional heading
  rootElem.appendChild(headingEl);

  let searchBarEl = createDiv("searchBar"); //level 200 search bar creation
  rootElem.appendChild(searchBarEl);

  let inputContainerEl = createDiv("inputContainer");
  searchBarEl.appendChild(inputContainerEl);

  let searchInputEl = createInput("searchInput", " Search for Episode");
  inputContainerEl.appendChild(searchInputEl);

  let results = episodeList.length;
  let searchDescEl = createSearchDiv(
    "searchDescEl",
    `   Displaying  <span id="myResults">${results}</span> of ${results} Results`
  );

  inputContainerEl.appendChild(searchDescEl);

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
      showEpisodes(filterList, showsEl, searchSelectEl);
    } else {
      while (showsEl.firstChild) {
        showsEl.removeChild(showsEl.firstChild);
      }
      document.getElementById("myResults");
      myResults.textContent = "0";
    }
  });

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

  //initial showing of episodes - refactored in level 200 to make easier for reusability
  showEpisodes(episodeList, showsEl, searchSelectEl, showsSelectEl);

  //event listener for select element
  searchSelectEl.addEventListener("change", function () {
    if (this.value === "Click for All Episodes") {
      showEpisodes(episodeList, showsEl, searchSelectEl, showsSelectEl);
    } else {
      let singleArr = [];
      singleArr.push(episodeList[this.value]);
      showEpisodes(singleArr, showsEl, searchSelectEl, showsSelectEl);
    }
  });

  showsSelectEl.addEventListener("change", function () {
    if (this.value === "Click for All Shows") {
      showEpisodes(episodeList, showsEl, searchSelectEl, showsSelectEl);
      console.log("click all shows");
    } else {
      let singleArr = [];
      singleArr.push(getAllShows()[this.value]);
      console.log("singleshow", singleArr);
      showEpisodes(singleArr, showsEl, searchSelectEl, showsSelectEl);
    }
  });
}

function showEpisodes(showsList, showsEl, searchSelectEl, showsSelectEl) {
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
    //console.log(episode, inx);
    //repeated looping through colours
    count < cardColours.length - 1 ? count++ : (count = 0);

    //the episode's name, the season number, the episode number
    let episodeCode =
      episode.season.toString().padStart(2, "0") +
      episode.number.toString().padStart(2, "0");

    //level 300
    let searchSelectOptEl = document.createElement("option");
    searchSelectOptEl.text = `S${episodeCode} - ${episode.name}`;
    searchSelectOptEl.value = inx;
    searchSelectEl.add(searchSelectOptEl);

    //level 400
    let showsSelectOptEl = document.createElement("option");
    showsSelectOptEl.text = getAllShows()[inx].name;
    showsSelectOptEl.value = inx;
    showsSelectEl.add(showsSelectOptEl);

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

function createSearchDiv(elName, elText) {
  let newEl = document.createElement("div");
  newEl.className = elName;
  if (elText) {
    newEl.innerHTML = elText;
  }
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
