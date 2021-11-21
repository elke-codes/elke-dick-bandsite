// You must create the list of concerts using JavaScript DOM manipulation / flexbox layout.

// No template literals should be used. All dynamic HTML should be added to DOM via DOM Methods for individual elements. Avoid bulk assigning stringified HTML using innerHTML

// Utilize your knowledge of JavaScript DOM Manipulation and built in functions to create all the content between the hero image and the footer, as well as create your own functions as necessary. There should be no need to have any shows content housed within your html file for this section.

// The individual rows of the Shows table will have different styling applied depending on the state of the table row. Utilize your knowledge of both JavaScript and Sass to accomplish this.
// The individual rows of the Shows table need to have a hover state applied to them when a cursor is hovering over the table row, as per style guide. This can be done by utilizing a pseudo class within your Sass.
// Additionally, clicking on an individual row should make that row "selected" or "active", applying a modifier CSS class via JavaScript. Utilize your knowledge of both JavaScript and Sass to accomplish this.
// Your styling will still be applied through your Sass files. Do not use the built in JavaScript DOM style method.

// You must have an array in JavaScript with all of concerts data and render the concerts HTML dynamically using the array data. It’s up to your discretion to decide on properties you create to represent all of the individual concert data.
// https://www.freecodecamp.org/news/how-to-format-dates-in-javascript/
// https://css-tricks.com/working-with-javascript-media-queries/
const showsList = [
  {
    date: new Date("Mon Sept 06 2021").toDateString(),
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },

  {
    date: new Date("Tue Sept 21 2021").toDateString(),
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: new Date("Fri Oct 15 2021").toDateString(),
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: new Date("Sat Nov 06 2021").toDateString(),
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: new Date("Fri Nov 26 2021").toDateString(),
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: new Date("Wed Dec 15 2021").toDateString(),
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];

// !!! DATE VENUE LOCATION repeated for each show in mobile and only in columns for tablet and desktop
//if min width is 768 don't include then for each, but render them on top of the page



//select shows-section in html
const showsSection = document.querySelector(".shows");

// for each show in the array run the createshows function and append the showArticle of the current show to the showsSection

//create shows section heading
const showsHeader = document.createElement('h2');
showsHeader.classList.add("shows__header");
showsHeader.innerText = "Shows";
showsSection.appendChild(showsHeader);


///in a function? or available globally? or
/// definitely re write to for each ()
// for (let i = 0; i < showsList.length; i++) {
//   let currentShow = showsList[i];

//   let showArticle = createShows(currentShow);

//   showsSection.appendChild(showArticle);
// }

showsList.forEach(currentShow => {

  let showArticle = createShows(currentShow);

  showsSection.appendChild(showArticle);
});

//createShows function
function createShows(currentShow) {

  //create show article wrapper
  const showArticle = document.createElement("article");
  showArticle.classList.add("show");
  showsSection.appendChild(showArticle);

  // // create date 
  const dateContainer = createDate("DATE", currentShow.date);
  showArticle.appendChild(dateContainer);

  // //create venue 
  const venueContainer = createShowInfo("VENUE", currentShow.venue);
  showArticle.appendChild(venueContainer);
  // //create location
  const locationContainer = createShowInfo("LOCATION", currentShow.location);
  showArticle.appendChild(locationContainer);

  //create button
  const button = document.createElement("button");
  button.classList.add("button");
  button.innerText = "BUY TICKETS";
  showArticle.appendChild(button);

  return showArticle;
}

// function createShowInfo
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

function createBuyButton(){

}


//give active class to clicked show

//https://stackoverflow.com/questions/45112279/add-a-class-to-target-and-remove-class-from-other-elements-with-the-same-class-n
  const clickedShow = document.getElementsByClassName("show");
  // console.log(typeof clickedShow);

  //TODO when brain is back: rewrite in hof, but it s an object...
  for (let i = 0; i < clickedShow.length; i++) {
    clickedShow[i].addEventListener("click", changeActiveStatus);
  }

  function changeActiveStatus(e) {
    const oldActive = document.getElementsByClassName("active");
    console.log(typeof oldActive);

      //TODO when brain is back: rewrite in hof, but it s an object...
    for (let i = 0; i < oldActive.length; i++) {
      oldActive[i].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
  }


