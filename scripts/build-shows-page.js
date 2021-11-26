/// --- GLOBAL VARIABLES --- ///
const BANDSITE_API_URL = "https://project-1-api.herokuapp.com";
const BANDSITE_API_KEY = "1d72f654-70d6-488d-8961-2583a70e24bc";
const showSectionContainer = document.createElement("div");

/// ---- FUNCTION DECLARATIONS --- ///
function getShows(){
  axios.get(`${BANDSITE_API_URL}/showdates?api_key=${BANDSITE_API_KEY}`)
  .then(resolve =>{

    createAndRenderShows(resolve);
    const shows = document.querySelectorAll(".show");
    shows.forEach(show => {
        show.addEventListener("click", addActiveStatus); 
    });
  })
  .catch(error =>{
    console.log(error)
  })
};

function createAndRenderShows(resolve){
    resolve.data.forEach(show => {
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
    const showsSection = document.querySelector(".shows");

    const showsHeader = document.createElement('h2');
    showsHeader.classList.add("shows__header");
    showsHeader.innerText = "Shows";
    showsSection.appendChild(showsHeader);

    showSectionContainer.classList.add("show__container");
    showsSection.appendChild(showSectionContainer);

    const titlesContainer = document.createElement("div");
    showsSection.appendChild(titlesContainer);
};

/*
const showSectionContainer = document.createElement("div");

function createShowSection(){
//select shows-section in html
const showsSection = document.querySelector(".shows");

//create shows section heading
const showsHeader = document.createElement('h2');
showsHeader.classList.add("shows__header");
showsHeader.innerText = "Shows";
showsSection.appendChild(showsHeader);

//create shows titles to show on tablet and desktop
const titlesContainer = document.createElement("div");
showsSection.appendChild(titlesContainer);

//TODO work in progress....
// const infoWrapper =document.createElement("show__title-wrapper");
// showSectionContainer.appendChild(infoWrapper);
// //creat titles for min width(=768)
// function createTitlesForBigScreen(title){
//   const infoTitle = document.createElement("h3")
//   infoTitle.classList.add("show__info-title");
//   infoTitle.innerText = title;
//   infoWrapper.appendChild(infoTitle);
// };
// createTitlesForBigScreen("DATE");
// createTitlesForBigScreen("VENUE");
// createTitlesForBigScreen("LOCATION");

//create showContainer for flexbox
// const showSectionContainer =document.createElement("div");
showSectionContainer.classList.add("show__container");
showsSection.appendChild(showSectionContainer);
*/

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
createShowSection();
getShows();
