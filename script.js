//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

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

  let headingEl = document.createElement("div");
  headingEl.innerText = "tv show project";
  headingEl.className = "headingEl";
  rootElem.appendChild(headingEl);

  let count = 0;

  const showsEl = document.createElement("section");
  showsEl.className = "showsEl";
  rootElem.appendChild(showsEl);

  episodeList.forEach((episode) => {
    let articleEl = document.createElement("article");
    articleEl.style.backgroundColor = cardColours[count];
    let titleEl = document.createElement("h2");

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

  let creditEl = document.createElement("p");
  creditEl.innerHTML =
    'The data in this website originally comes from <a href="https://www.tvmaze.com/">TVMaze.com</a>';
  creditEl.className = "credit";
  rootElem.appendChild(creditEl);
}

window.onload = setup;
