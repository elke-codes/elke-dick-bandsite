/// --- GLOBAL VARIABLES --- ///
const shows = [];
const BANDSITE_API_URL = "https://project-1-api.herokuapp.com";
const BANDSITE_API_KEY = "1d72f654-70d6-488d-8961-2583a70e24bc";
const showSectionContainer = document.createElement("div");

/// ---- FUNCTION DECLARATIONS --- ///
function getShows(){
  axios.get(`${BANDSITE_API_URL}/showdates?api_key=${BANDSITE_API_KEY}`)
  .then(resolve =>{

    const storedShows = resolve.data;
    storedShows.forEach(show =>{
      shows.push(show);
    });

    createAndRenderShows(shows);

    const showsOnPage = document.querySelectorAll(".show");
    showsOnPage.forEach(showOnPage => {
      showOnPage.addEventListener("click", addActiveStatus); 
    });
  })
  .catch(error =>{
    console.log(error)
  })
};

function createAndRenderShows(shows){
    shows.forEach(show => {
        let showArticle = createShow(show);
        showSectionContainer.appendChild(showArticle);
  });
};

function addActiveStatus(e) {
    const activeShows = document.querySelectorAll(".show--active");
    activeShows.forEach(activeShow => {
        activeShow.classList.remove("show--active");
    });
    e.currentTarget.classList.add("show--active");
};

function createShowSection(){
    showSectionContainer.classList.add("show__container");

    const showsSection = document.querySelector(".shows");
    showsSection.appendChild(showSectionContainer);

    const showsHeader = document.createElement('h2');
    showsHeader.classList.add("shows__header");
    showsHeader.innerText = "Shows";
    showsSection.appendChild(showsHeader);

    const titlesContainer = document.createElement("div");
    showsSection.appendChild(titlesContainer);
};

function createShow(show) {
  const showArticle = document.createElement("article");
  showArticle.classList.add("show");
  showSectionContainer.appendChild(showArticle);

  const currentShowDate = (show.date)*1;
  const dateContainer = createDate("DATE", new Date(currentShowDate).toDateString());
  showArticle.appendChild(dateContainer);

  const venueContainer = createShowInfo("VENUE", show.place);
  showArticle.appendChild(venueContainer);

  const locationContainer = createShowInfo("LOCATION", show.location);
  showArticle.appendChild(locationContainer);

  const button = document.createElement("button");
  button.classList.add("button");
  button.innerText = "BUY TICKETS";
  showArticle.appendChild(button);

  return showArticle;
};

function createShowInfo(title, value) {

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("show__info-container");

  const infoTitle = document.createElement("h3")
  infoTitle.classList.add("show__info-title");
  infoTitle.innerText = title;
  infoContainer.appendChild(infoTitle);

  const infoValue = document.createElement("p");
  infoValue.classList.add("show__info-value");
  infoValue.innerText = value;
  infoContainer.appendChild(infoValue);

  return infoContainer;
};

function createDate(title, value){
  const infoDateContainer = document.createElement("div");
  infoDateContainer.classList.add("show__info-container");

  const infoDateTitle = document.createElement("h3")
  infoDateTitle.classList.add("show__info-title");
  infoDateTitle.innerText = title;
  infoDateContainer.appendChild(infoDateTitle);

  const infoDateValue = document.createElement("p");
  infoDateValue.classList.add("show__info-value", "show__info-value--date");
  infoDateValue.innerText = value;
  infoDateContainer.appendChild(infoDateValue);

  return infoDateContainer;
}

/// --- CONTROL FLOW --- ///
getShows();
createShowSection();