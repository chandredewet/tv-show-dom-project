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

  //level 300
  let searchSelectEl = document.createElement("select");
  searchBarEl.appendChild(searchSelectEl);
  searchSelectEl.className = "searchSelect";
  let searchSelectOptEl = document.createElement("option");
  searchSelectOptEl.text = `Click for All Episodes`;
  searchSelectEl.add(searchSelectOptEl);

  //level 100 display of episode cards creation
  const showsEl = document.createElement("section");
  showsEl.className = "showsEl";
  rootElem.appendChild(showsEl);

  //initial showing of episodes - refactored in level 200 to make easier for reusability
  showEpisodes(episodeList, showsEl, searchSelectEl);

  //event listener for select element
  searchSelectEl.addEventListener("change", function () {
    if (this.value === "Click for All Episodes") {
      showEpisodes(episodeList, showsEl, searchSelectEl);
    } else {
      let singleArr = [];
      singleArr.push(episodeList[this.value]);
      showEpisodes(singleArr, showsEl, searchSelectEl);
    }
  });
}

function showEpisodes(showsList, showsEl, searchSelectEl) {
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
  let selectCount = 0;

  //show episodes
  showsList.forEach((episode) => {
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

    //level 300
    let searchSelectOptEl = document.createElement("option");
    searchSelectOptEl.text = `S${episodeCode} - ${episode.name}`;
    searchSelectOptEl.value = selectCount;
    selectCount++;
    searchSelectEl.add(searchSelectOptEl);

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
