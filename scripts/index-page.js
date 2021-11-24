// TODO



// Users must be able to add new comments that are stored on the back-end using the API.
// New comments that are added must be displayed with the existing comments, the newest comments being at the top.
// The Bio Page must not reload when comments are added.
// New comments are not required to have a provided avatar image, but can use a placeholder.



//TODO add to possibility to add an image
// const avatar = document.querySelector(".avatar");
// https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site



 // {

  //   name: "Connor Walton",
  //   message: `This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.`,
  //   dateTimestamp: new Date("02/17/2021")
  //   ,
  //   img: "https://picsum.photos/36"
  // },

// empty comments array
  const comments = [];
  // get API key at https://project-1-api.herokuapp.com/register 
  // or "message": "api_key query parameter required. You may use any string (including you name) as your api_key."
  const BANSITE_API_URL = "https://project-1-api.herokuapp.com";
  const BANDSITE_API_KEY = "1d72f654-70d6-488d-8961-2583a70e24bc";
 
 // The Bio Page must retrieve comment data from the provided API and display it on the page.
 
 function getComments(){
 axios.get(`${BANSITE_API_URL}/comments?&api_key=${BANDSITE_API_KEY}`)
 .then((resolve) =>{

   const storedComments = resolve.data

   storedComments.forEach(comment =>{
     comments.push(comment);

   })
   //wait untill you get the comments back from the API, THEN, if that worked out, run the rest of the code
  displayComment(comments);
   
 })
 .catch(error => console.log("there was a problem with this get request" + error));
 }
 
 
 getComments();


/// --   COMMENTS SECTION

//select comments container
const commentsContainer = document.querySelector(".comment__container");

function displayComment(comment) {
  for (let i = 0; i < comments.length; i++) {
    // get single comment
    const currentComment = comment[i];

    //add all comments in the comment array to the page
    let commentArticle = renderComments(currentComment);

    commentsContainer.appendChild(commentArticle);

  }
};

// //render the comments when the page first loads
// // and again when a new comment is added through the form


//create comment 
function renderComments(currentComment) {
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

  //added for flexbox
  const commentInfoContainer = document.createElement("div");
  commentInfoContainer.classList.add("comment__info-container");
  commentInfo.appendChild(commentInfoContainer);

  const commentName = document.createElement("p");
  commentName.classList.add("comment__name");
  commentName.innerText = currentComment.name;
  commentInfoContainer.appendChild(commentName);

  // convert timestamp into workable format
  const timestamp = new Date(currentComment.timestamp)

  const commentsDate = document.createElement("p");
  commentsDate.classList.add("comment__date");
  commentsDate.innerText = timestamp.toLocaleDateString('en-US');

  commentInfoContainer.appendChild(commentsDate);


  const comment = document.createElement("p");
  comment.classList.add("comment__comment");
  comment.innerText = currentComment.comment;
  commentInfo.appendChild(comment);

  return commentInfo;

}

//create the comment avatar
function createAvatar(currentComment) {

  const avatar = document.createElement("div");
  avatar.classList.add("avatar");

  //placeholder for when there is no image
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
    // console.log(avatarImage.src);
  }

  return avatar;
}


// --- FORM HANDLING --- //

//select the form 
const formEl = document.querySelector(".comments__form");

//start listening for submit event on the form
formEl.addEventListener("submit", function (e) {
  console.log("e: ", e);
  //when the form gets submitted do the following:
  //prevent the page from reloading (which is a default of submit)
  e.preventDefault();

  // console.log(e);

  //create new comment object
  const newComment = {
    name: e.target.name.value,
    comment: e.target.comment.value,
    // //make sure all dateTimestamps are of the same type!
    // timestamp: new Date(Date.now()),
    //TODO: be able to upload an image and don t hardcode this image in...
    // img: "./assets/images/Mohan-muruge.jpg"
  }


 // Users must be able to add new comments that are stored on the back-end using the API.
// New comments that are added must be displayed with the existing comments, the newest comments being at the top.
// The Bio Page must not reload when comments are added.
// New comments are not required to have a provided avatar image, but can use a placeholder.

function postComment(newComment){

  axios.post(`${BANSITE_API_URL}/comments?&api_key=${BANDSITE_API_KEY}`, newComment)
  .then(resolve => {
    console.log("resolve1", resolve.data);

  //push new comment to the comments array
  comments.push(newComment);
  // clear all the comments from the comment container
  clearComments(commentsContainer);
  //sort commment so newest comes first.
    // https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/

    console.log("timestamp:", e.timeStamp);
  comments.sort((a, b) => {
    return b.e.timeStamp - a.e.timeStamp;
  });
  //re-render all the comments
  displayComment(comments);
  //reset (clear) the input fields when submitting 
  e.target.reset();
  //remove active class from input fields after submitting form
  function removeFormFieldActiveClass(){
  const activeFormField = document.querySelector(".comments__form-field--active");
  //check if there is an element with the --active class, if that s true remove it
 if(activeFormField){
  activeFormField.classList.remove("comments__form-field--active");
  }
}
removeFormFieldActiveClass();

  })
  .catch(error => console.log("there was a problem with this post request" + error));


}

  postComment(newComment);

});

// clear all the comments from the comment container function
function clearComments(commentsContainer) {
  //delete children
  //while the commentscontainer has a child, remove the child
  //  https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/

  while (commentsContainer.firstChild) {
    commentsContainer.removeChild(commentsContainer.firstChild);
  }
}


//give active class to current infut formfield
  //https://stackoverflow.com/questions/45112279/add-a-class-to-target-and-remove-class-from-other-elements-with-the-same-class-n
function addFormFieldActiveClass(){
  //find all formfields
  // TODO uncomment this lol
const formFields = document.getElementsByClassName("comments__form-field");
//go through all the formfield elements and add an on click event listener to them
for (let i= 0; i<formFields.length; i++){
  formFields[i].addEventListener("click", changeActiveStatus);
}
// formFields.forEach((field) =>{
//   field.addEventListener("click", changeActiveStatus);
// })

//function to add the active class when formfield is clicked
function changeActiveStatus(e) {
  //find all formfields with active class
   //use querySelectorAll to get a nodelist (not getElementByClassName = object)! 
  const oldActive = document.querySelectorAll(".comments__form-field--active");
  // console.log(typeof oldActive); 
 
  // remove the active class from all elements that might have it 
  oldActive.forEach((field)=>{
field.classList.remove("comments__form-field--active");
  })

  //add the active classlist to the current form input field
  e.currentTarget.classList.add("comments__form-field--active");
}
}
addFormFieldActiveClass();








// Download page content first, along with any CSS or JavaScript that may be required for its initial display, so that the user gets the quickest apparent response during the page loading. This content is typically text, and can, therefore, benefit from text compression in transit, thus providing an even quicker response to the user.
//Any dynamic features that require the page to complete loading before being used, should be initially disabled, and then only enabled after the page has loaded. This will cause the JavaScript to be loaded after the page contents, which will improve the overall appearance of the page load.

// TODO
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

