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
    date: new Date(2021 / 09 / 2021).toDateString(),
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: 2021 / 10 / 15,
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: 2021 / 11 / 06,
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: 2021 / 11 / 26,
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: 2020 / 12 / 15,
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
const showsTitle = document.createElement('h2');
showsTitle.classList.add(".shows__title");
showsTitle.innerText = "Shows";
showsSection.appendChild(showsTitle);


///in a function? or available globally? or
/// definitely re write to for each ()
for (let i = 0; i < showsList.length; i++) {
  let currentShow = showsList[i];

  let showArticle = createShows(currentShow);

  showsSection.appendChild(showArticle);
}

//createShows function
function createShows(currentShow) {

  //create show article wrapper
  const showArticle = document.createElement("article");
  showArticle.classList.add(".show");
  showsSection.appendChild(showArticle);

  // // create date 
  const dateContainer = createShowInfo("DATE", currentShow.date);
  showArticle.appendChild(dateContainer);
  // //create venue 
  const venueContainer = createShowInfo("VENUE", currentShow.venue);
  showArticle.appendChild(venueContainer);
  // //create location
  const locationContainer = createShowInfo("LOCATION", currentShow.location);
  showArticle.appendChild(locationContainer);

  return showArticle;
}

// function createShowInfo
function createShowInfo(title, value) {

  const dateContainer = document.createElement("div");

  const dateTitle = document.createElement("h4")
  dateTitle.classList.add(".show__info-title");
  dateTitle.innerText = title;
  dateContainer.appendChild(dateTitle);

  const showDate = document.createElement("p");
  showDate.classList.add(".show__info-value");
  showDate.innerText = value;
  dateContainer.appendChild(showDate);

  return dateContainer;
};


