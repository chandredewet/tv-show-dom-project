//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  episodeList.forEach((episode) => {
    let articleEl = document.createElement("article");
    articleEl.className = "movieCard";

    //the episode's name, the season number, the episode number

    let titleEl = document.createElement("h2");
    titleEl.textContent += `${episode.name} S${episode.season} ${episode.number}`;
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

    rootElem.appendChild(articleEl);
  });
}

window.onload = setup;
