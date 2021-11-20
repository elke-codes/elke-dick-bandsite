
// // create comments array, with objects for each comment
// //comments must have:

// // - a name - a timestamp - the comment text
//i've also added an image
const comments = [
  {

    name: "Connor Walton",
    message: `This is art. This is inexplicable magic
    expressed in the purest way, everything
    that makes up this majestic work
    deserves reverence. Let us appreciate
    this for what it is and what it contains.`,
    dateTimestamp: "02/17/2021",
    // as the right format, for new comment add current date in the right format
    img: ""
    // url("../assets/images/band.jpg")
  },
  {
    name: "Emilie Beach",
    message: `I feel blessed to have seen them in
    person. What a show! They were just
    perfection. If there was one day of my
    life I could relive, this would be it. What
    an incredible day.`,
    dateTimestamp: "01/09/2021",
    //as the right format, for new comment add current date in the right format
    img: ""
  },
  {
    name: "Miles Acosta",
    message: `I can t stop listening. Every time I hear
    one of their songs the vocals it gives
    me goosebumps. Shivers straight down
    my spine. What a beautiful expression of
    creativity. Can t get enough.`,
    dateTimestamp: "12/20/2020",
    // as the right format, for new comment add current date in the right format
    img: ""
  }
]

// /// --   COMMENTS SECTION

// // There must be a button that allows a user to add a new comment.
// // The user must be able to add their name and a comment.
// // The comments must be added such that the newest comments are at the top.
// // 3 Default comments must be displayed when the page first loads.



// // No template literals should be used. All dynamic HTML should be added to DOM via DOM Methods for individual elements. Avoid bulk assigning stringified HTML using innerHTML









// // You must have a function called displayComment() that takes in one comment object as a parameter and displays it on the page using JavaScript DOM manipulation.

//select comments__old 
const commentsContainer = document.querySelector(".comments__container");
// function display comment 

function renderComments(comments) {
  for (let i = 0; i < comments.length; i++) {
    // get single comment
    const currentComment = comments[i];

    let commentArticle = displayComment(currentComment);

    commentsContainer.appendChild(commentArticle);

  }
};

renderComments(comments);

// clear all the comments from the comment container
function clearComments(commentsContainer) {
  //delete children
  //while the commentscontainer has a child, remove the child
  //  https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/

  while (commentsContainer.firstChild) {
    commentsContainer.removeChild(commentsContainer.firstChild);
  }
}


//create comment 
function displayComment(currentComment) {

  const commentArticle = document.createElement("article");
  commentArticle.classList.add("comment");
  commentsContainer.appendChild(commentArticle);

  const avatar = createAvatar(currentComment);
  commentArticle.appendChild(avatar);

  const commentInfo = createComment(currentComment);
  commentArticle.appendChild(commentInfo);


  return commentArticle;

}

// // function displayComment (comment){
//    // Constructs a new comment object
//   // a name comment date img
// const commentsOld = document.querySelector(".comments__old");

// forEach()

function createComment(currentComment) {

  // const article = document.createElement("article");
  // article.classList.add("comment");
  // commentArticle.appendChild(article)
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


function createAvatar(currentComment) {


  const avatar = document.createElement("div");
  avatar.classList.add(".avatar");

  const avatarPlaceHolder = document.createElement("div");
  avatarPlaceHolder.classList.add(".avatar__placeholder");
  avatar.appendChild(avatarPlaceHolder);

  const avatarImage = document.createElement("img");
  avatarImage.classList.add(".avatar__image");
  // avatarImage.src = currentComment.img;
  // avatarImage.alt = "profile picture";
  avatar.appendChild(avatarImage);

  return avatar;
}


// // You must use an HTML Form with the following functionality:




// // insert newHeading before FirstHeading
// // parent.insertBefore(newHeading, firstHeading);




// --- FORM HANDLING --- //

const formEl = document.querySelector(".comments__form");

formEl.addEventListener("submit", function (e) {
  //prevent the page from reloading (which is a default action of submit) when submitting the form
  e.preventDefault();

  //create new comment object
  const newComment = {
    name: e.target.name.value,
    message: e.target.comment.value,
    dateTimestamp: "2021/09/09",
    img: ""
  }
  //push new comment to the comments array
  comments.push(newComment);

  // clear all the comments from the comment container
  clearComments(commentsContainer);
  //TODO sort commment so newest comes first.


  //re-render all the comments
  renderComments(comments);

  //reset (clear) the input fields when submitting 
  e.target.reset();



  // TODO
  // // Pushes a new comment object to an array of comments
  // // Clears all comments from the page
  // // Re-renders to the page all comments from the comment array


});
// console.log("currentcomment:" + currentComment);



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