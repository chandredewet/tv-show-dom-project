//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  //root is a new div in the html
  const rootElem = document.getElementById("root");

  //loop through all the episodes
  episodeList.forEach((episode) => {
    // First Display Episode Heading - format e.g Winter is Coming - S01E03
    let episodeCard = document.createElement("div");
    episodeCard.className = "sizeArea";
    rootElem.appendChild(episodeCard);

    let tvShowDetails = document.createElement("h2");
    tvShowDetails.className = "epCardDetails";
    tvShowDetails.innerText = `${
      episode.name
    } - S${episode.season
      .toString()
      .padStart(2, 0)}E${episode.number.toString().padStart(2, 0)}`;
    episodeCard.appendChild(tvShowDetails);

    //Add Episode Image to root div
    let tvShowImage = document.createElement("img");
    tvShowImage.className = "epCardImage";
    tvShowImage.src = episode.image.medium;
    episodeCard.appendChild(tvShowImage);

    //Add Episode Summary to root div
    let tvShowSummary = document.createElement("P");
    tvShowSummary.className = "epCardSummary";
    tvShowSummary.innerHTML = episode.summary;
    episodeCard.appendChild(tvShowSummary);
    //Loop ends here
  });

  //add a footer with details
  let siteFooter = document.createElement("footer");

  let footerParagraph = document.createElement("p");
  footerParagraph.innerText =
    "The data displayed on this page was originally taken from ";

  let link = document.createElement("A");
  link.innerText = "here";
  link.setAttribute("href", "https://www.tvmaze.com/");

  document.body.appendChild(siteFooter);
  siteFooter.appendChild(footerParagraph);
  footerParagraph.appendChild(link);
  /*
  let tvShowCredit = document.createElement("footer");
  tvShowCredit.innerText = "The Data from this Site is taken from:";
  document.body.appendChild(tvShowCredit);
  let tvShowCredSite = document.createElement("a");
  tvShowCredSite.src = "tvmaze.com/api#licensing";
  tvShowCredit.appendChild(tvShowCredSite);

  */
}

window.onload = setup;
