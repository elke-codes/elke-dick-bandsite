
// // create comments array, with objects for each comment
// //comments must have:
// - a name - a timestamp - the comment text
//TODO add to possibility to add an image
// const avatar = document.querySelector(".avatar");
const comments = [
  {

    name: "Connor Walton",
    message: `This is art. This is inexplicable magic
    expressed in the purest way, everything
    that makes up this majestic work
    deserves reverence. Let us appreciate
    this for what it is and what it contains.`,
    dateTimestamp: (new Date("02/17/2021")).toLocaleDateString('en-US')
    ,
    img: "https://picsum.photos/36"
  },
  {
    name: "Emilie Beach",
    message: `I feel blessed to have seen them in
    person. What a show! They were just
    perfection. If there was one day of my
    life I could relive, this would be it. What
    an incredible day.`,
    dateTimestamp: (new Date("01/09/2021")).toLocaleDateString('en-US'),


  },
  {
    name: "Miles Acosta",
    message: `I can t stop listening. Every time I hear
    one of their songs the vocals it gives
    me goosebumps. Shivers straight down
    my spine. What a beautiful expression of
    creativity. Can t get enough.`,
    dateTimestamp: (new Date("12/20/2020")).toLocaleDateString('en-US')
    ,

    img: "https://i.pravatar.cc/36"
  }
]

// https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site


/// --   COMMENTS SECTION

//select comments container
const commentsContainer = document.querySelector(".comments__container");

// function to render comments 

function renderComments(comments) {
  for (let i = 0; i < comments.length; i++) {
    // get single comment
    const currentComment = comments[i];

    //add all comments in the comment array to the page
    let commentArticle = displayComment(currentComment);

    commentsContainer.appendChild(commentArticle);

  }
};

//render the comments when the page first loads
// and again when a new comment is added through the form
renderComments(comments);


//create comment 
function displayComment(currentComment) {

  //create article container for every comment
  const commentArticle = document.createElement("article");
  commentArticle.classList.add("comment");
  commentsContainer.appendChild(commentArticle);

  //create avatar for every comment
  const avatar = createAvatar(currentComment);
  commentArticle.appendChild(avatar);

  //create commentInfo for every comment
  const commentInfo = createComment(currentComment);
  commentArticle.appendChild(commentInfo);

  return commentArticle;
}


//create the commentInformation
function createComment(currentComment) {

  const commentInfo = document.createElement("div");
  commentInfo.classList.add("comment__info");

  const commentName = document.createElement("p");
  commentName.classList.add("comments__name");
  commentName.innerText = currentComment.name;
  commentInfo.appendChild(commentName);

  const commentsDate = document.createElement("p");
  commentsDate.classList.add("comments__date");
  commentsDate.innerText = currentComment.dateTimestamp;
  commentInfo.appendChild(commentsDate);


  const comment = document.createElement("p");
  comment.classList.add("comments__comment");
  comment.innerText = currentComment.message;
  commentInfo.appendChild(comment);

  return commentInfo;

}

//create the comment avatar
function createAvatar(currentComment) {

  const avatar = document.createElement("div");
  avatar.classList.add(".avatar");

  const avatarPlaceHolder = document.createElement("div");
  avatarPlaceHolder.classList.add("avatar__placeholder");
  avatar.appendChild(avatarPlaceHolder);

  //check if there is an image, if there is create the img tag
  if (currentComment.img !== undefined) {
    const avatarImage = document.createElement("img");
    avatarImage.classList.add("avatar__image");
    avatarImage.src = currentComment.img;
    avatarImage.alt = "profile picture";
    avatarPlaceHolder.appendChild(avatarImage);
    console.log(avatarImage.src);
  }

  return avatar;
}





// // insert newHeading before FirstHeading
// // parent.insertBefore(newHeading, firstHeading);




// --- FORM HANDLING --- //

//select the form 
const formEl = document.querySelector(".comments__form");

//start listening for submit event on the form
//when the form get submitted do the following:

formEl.addEventListener("submit", function (e) {

  //prevent the page from reloading (which is a default of submit) when submitting the form
  e.preventDefault();

  //create new comment object
  // let avatar = document.querySelector(".avatar__placeholder");
  const newComment = {
    name: e.target.name.value,
    message: e.target.comment.value,
    // https://stackoverflow.com/questions/2035699/how-to-convert-a-full-date-to-a-short-date-in-javascript

    //TODO figure out how to get the timestamp but display the localethingy
    dateTimestamp: (new Date()),
    // .toLocaleDateString('en-US'),


    //TODO: be able to upload an image and don t hardcode this image in...
    img: "./assets/images/Mohan-muruge.jpg"
  }

  //push new comment to the comments array
  comments.push(newComment);

  // clear all the comments from the comment container
  clearComments(commentsContainer);


  //sort commment so newest comes first.


  // https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/
  comments.sort((a, b) => {

    let da = new Date(a.dateTimestamp), //convert back to date format
      db = new Date(b.dateTimestamp);

    return db - da;


    // return new Date(b.dateTimestamp) - new Date(a.dateTimestamp);
  });

  console.log(comments);


  //re-render all the comments
  renderComments(comments);

  //reset (clear) the input fields when submitting 
  e.target.reset();

});


// clear all the comments from the comment container
function clearComments(commentsContainer) {
  //delete children
  //while the commentscontainer has a child, remove the child
  //  https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/

  while (commentsContainer.firstChild) {
    commentsContainer.removeChild(commentsContainer.firstChild);
  }
}


// //give active class to current formfield



// Download page content first, along with any CSS or JavaScript that may be required for its initial display, so that the user gets the quickest apparent response during the page loading. This content is typically text, and can, therefore, benefit from text compression in transit, thus providing an even quicker response to the user.
//Any dynamic features that require the page to complete loading before being used, should be initially disabled, and then only enabled after the page has loaded. This will cause the JavaScript to be loaded after the page contents, which will improve the overall appearance of the page load.


// ///-- DIVING DEEPER

// // Dynamic Timestamp
// // To add a more realistic feel to the site, try updating the timestamp in the comments section to reflect when it was posted in a more human-readable format. Using YouTube as an example, a recently posted comment might display the time posted as "10 minutes ago" or "3 days ago". Apply this type of timestamp to your data without hardcoding the actual message.

// // Form Validation
// // In order to increase the effectiveness of the comments form, implement validation to check for empty form fields.

// // Upon validation, if there are any errors:

// // Prevent the form from submitting.
// // Adjust the state of the form fields to show the error state that is specified in the Style Guide.
// // If there are no errors:

// // Clear any error states from the form fields.
// // Submit the form.




// https://articlearn.id/article/d1a6b5cc-how-to-format-time-since-or-time-ago-in-j/



// // function displayComment (comment){
//    // Constructs a new comment object
//   // a name comment date img
// const commentsOld = document.querySelector(".comments__old");

// forEach()



// let today = Date.now();
// console.log(today);

// let today = newDate();
// today.toLocaleDateString('en-US');



// let today = (new Date()).toLocaleDateString('en-US');

// console.log(today);


//   employees.sort((a, b) => {
//     let da = new Date(a.joinedDate),
//         db = new Date(b.joinedDate);
//     return da - db;
// });

// comments.sort(a, b){
//   let da = a.dateTimestamp;
//   let db = b.dateTimestamp;

//   return da - db;
// }

// employees.forEach((e) => {
//   console.log(`${e.firstName} ${e.lastName} ${e.joinedDate}`);
// });

// comments.forEach((e) => {
//   comments.sort(a, b) => {
//     let da = a.dateTimestamp;
//     let db = b.dateTimestamp;

//     return da - db;
//   }
// })


// const items = [
//   { name: 'Edward', value: 21 },
//   { name: 'Sharpe', value: 37 },
//   { name: 'And', value: 45 },
//   { name: 'The', value: -12 },
//   { name: 'Magnetic', value: 13 },
//   { name: 'Zeros', value: 37 }
// ];

// console.log(items);
// // sort by value
// items.sort(function (a, b) {
//   return b.value - a.value;
// });

// console.log(items);


