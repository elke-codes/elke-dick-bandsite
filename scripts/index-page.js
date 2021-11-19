
// // create comments array, with objects for each comment
// //comments must have:

// // const { format } = require("path/posix");

// // - a name - a timestamp - the comment text
// const comments = [
//   {

//     name: "Connor Walton",
//     message: `This is art. This is inexplicable magic
//     expressed in the purest way, everything
//     that makes up this majestic work
//     deserves reverence. Let us appreciate
//     this for what it is and what it contains.`,
//     // date timestamp: 02/17/2021 as the right format, for new comment add current date in the right format
//     // img : url();
//   },
//   {
//     name: "Emilie Beach",
//     message: `I feel blessed to have seen them in
//     person. What a show! They were just
//     perfection. If there was one day of my
//     life I could relive, this would be it. What
//     an incredible day.`,
//      // date/timestamp: 01/09/2021 as the right format, for new comment add current date in the right format
//      // img : url();
//   },
//   {
//     name: "Miles Acosta",
//     message: `I can t stop listening. Every time I hear
//     one of their songs the vocals it gives
//     me goosebumps. Shivers straight down
//     my spine. What a beautiful expression of
//     creativity. Can t get enough.`,
//     // date/timestamp: 12/20/2020 as the right format, for new comment add current date in the right format
//     // img : url();
//   }
// ]

// /// --   COMMENTS SECTION

// // There must be a button that allows a user to add a new comment.
// // The user must be able to add their name and a comment.
// // The comments must be added such that the newest comments are at the top.
// // 3 Default comments must be displayed when the page first loads.



// // No template literals should be used. All dynamic HTML should be added to DOM via DOM Methods for individual elements. Avoid bulk assigning stringified HTML using innerHTML









// // You must have a function called displayComment() that takes in one comment object as a parameter and displays it on the page using JavaScript DOM manipulation.

// // function displayComment (comment){
//    // Constructs a new comment object
//   // a name comment date img
// const commentsOld = document.querySelector(".comments__old");

// forEach()

// function createComment (comments){

// const article = document.createElement("article");
// article.classList.add("comment");

// //function createAvatar

// const commentsName = document.createElement("p");
// commentsName.classList.add("comments__name");
// commentsName.innterText = comments.name; /*comments[i].name;*/

// const commentsDate = document.createElement("p");
// commentsDate.classList.add("comments__date");
// commentsDate.innerText = comments.date; /*comments[i].name;*/

// const comment = document.createElement("p");
// comment.classList.add("comments__comment");
// comment.innerText = comments.comment /*comments[i].name;*/

// // const commentsNew = document.querySelector(".comments_new");

// commentsNew.appendChild(article);
// article.appendChild(avatar);
// avatar.appendChild(avatarPlaceHolder);
// avatar.appendChild(avatarImage);
// article.appendChild(commentsName);
// article.appendChild(commentsDate);
// article.appendChild(comment);



// }

// createComment();

// function createAvatar (comments){
//   console.log(comments);
//   const avatar = document.createElement("div");
// avatar.classList.add("avatar");
// const avatarPlaceHolder = document.createElement("div");
// avatarPlaceHolder.classList.add("avatar__placeholder");
// const avatarImage = document.createElement("img");
// avatarImage.classList.add("avatar__image");
// avatarImage.src = "#";
// avatarImage.alt = "profile picture";
// }


// // You must use an HTML Form with the following functionality:



// // Pushes a new comment object to an array of comments
// // Clears all comments from the page
// // Re-renders to the page all comments from the comment array


// // insert newHeading before FirstHeading
// // parent.insertBefore(newHeading, firstHeading);


// const commentsForm = document.querySelector("comments__form");

// // That submits using the addEventListener
// commentsForm.addEventlistener("submit", handleFormSubmission);


// function handleFormSubmission(e){
//   // Prevents the page from reloading when submitting a new comment
//   e.preventDefault();


//   // Clears the input fields after submitting a new comment
//   e.target.reset();
// }






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