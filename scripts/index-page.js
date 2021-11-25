
// empty comments array
  const comments = [];


  // get API key at https://project-1-api.herokuapp.com/register 
  const BANSITE_API_URL = "https://project-1-api.herokuapp.com";
  const BANDSITE_API_KEY = "1d72f654-70d6-488d-8961-2583a70e24bc";
 
 // The Bio Page must retrieve comment data from the provided API and display it on the page.
 function getComments(){
      axios.get(`${BANSITE_API_URL}/comments?&api_key=${BANDSITE_API_KEY}`)
      .then((resolve) =>{
          // get the comments from the api 
            const storedComments = resolve.data
          //push the comments to the empty comments array
            storedComments.forEach(comment =>{
              comments.push(comment);
            })


   //wait untill you get the comments back from the API, THEN, if that worked out, run the rest of the code

   //sort the comments from earliest to newest?

  //  let timestamp = resolve.data.timestamp
            comments.sort((a, b) => {
              return b.timestamp - a.timestamp;
            });
			//display the comments on the page
			createAndRenderComments(comments);
   
 	})
		// .catch(error => console.log("there was a problem with this get request" + error));
		}
 
 //invoke the getcomments function to get the comments from the api

 getComments();


/// --   COMMENTS SECTION

//select comments container
const commentsContainer = document.querySelector(".comment__container");

function createAndRenderComments(comments) {

  comments.forEach(comment => {
      //add all comments in the comments array to the page
      let commentArticle = createComment(comment);
      commentsContainer.appendChild(commentArticle);

  })

};

// //render the comments when the page first loads
// // and again when a new comment is added through the form


//create comment 
function createComment(comment) {
  const commentArticle = document.createElement("article");
  commentArticle.classList.add("comment");
  commentsContainer.appendChild(commentArticle);

  //create avatar for every comment
  const avatar = createAvatar(comment);
  commentArticle.appendChild(avatar);

  //create commentInfo for every comment
  const commentInfo = createCommentInfo(comment);
  commentArticle.appendChild(commentInfo);

  return commentArticle;
}


//create the commentInformation
function createCommentInfo(comment) {

  const commentInfo = document.createElement("div");
  commentInfo.classList.add("comment__info");

  //added for flexbox
  const commentInfoContainer = document.createElement("div");
  commentInfoContainer.classList.add("comment__info-container");
  commentInfo.appendChild(commentInfoContainer);

  const commentName = document.createElement("p");
  commentName.classList.add("comment__name");
  commentName.innerText = comment.name;
  commentInfoContainer.appendChild(commentName);

  // convert timestamp into workable format
  // let timestamp = new Date((currentComment.timestamp)*1).toLocaleDateString();
  
  const timestamp = new Date(comment.timestamp)
  const commentsDate = document.createElement("p");
  commentsDate.classList.add("comment__date");
  commentsDate.innerText = timestamp;

  commentInfoContainer.appendChild(commentsDate);


  const commentText = document.createElement("p");
  commentText.classList.add("comment__comment");
  commentText.innerText = comment.comment;
  commentInfo.appendChild(commentText);

  return commentInfo;

}

//create the comment avatar
function createAvatar(comment) {

  const avatar = document.createElement("div");
  avatar.classList.add("avatar");

  //placeholder for when there is no image
  const avatarPlaceHolder = document.createElement("div");
  avatarPlaceHolder.classList.add("avatar__placeholder");
  avatar.appendChild(avatarPlaceHolder);

  //check if there is an image, if there is create the img tag
  if (comment.img !== undefined) {
    const avatarImage = document.createElement("img");
    avatarImage.classList.add("avatar__image");
    avatarImage.src = comment.img;
    avatarImage.alt = "profile picture";
    avatarPlaceHolder.appendChild(avatarImage);
    // console.log(avatarImage.src);
  }

  return avatar;
}


// --- FORM HANDLING --- //


function postComment(e, comment){
  axios.post(`
    ${BANSITE_API_URL}/comments?&api_key=${BANDSITE_API_KEY}`, comment
  ).then(
    resolve => {

    //push new comment to the comments array
    comments.push(resolve.data);

    // clear all the comments from the comment container
    clearComments(commentsContainer);

    //sort commment so newest comes first.
      // https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/

    let timestamp = (resolve.data.timestamp)*1;
    timestamp = new Date(timestamp).toLocaleDateString();

    comments.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });


    //re-render all the comments
    createAndRenderComments(comments);
    //reset (clear) the input fields when submitting 
    e.target.reset();	

    //remove active class from input fields after submitting form
    function removeFormFieldActiveClass() {
      const activeFormField = document.querySelector(".comments__form-field--active");
        //check if there is an element with the --active class, if that s true remove it
        if(activeFormField){
        activeFormField.classList.remove("comments__form-field--active");
        }
      }

    removeFormFieldActiveClass();
  });
  // .catch(error => console.log("there was a problem with this post request" + error));
}

//select the form 
const formEl = document.querySelector(".comments__form");

//start listening for submit event on the form
formEl.addEventListener("submit", function (e) {

  //prevent the page from reloading (which is a default of submit)
  e.preventDefault();

	//create new comment object
	const newComment = {
		name: e.target.name.value,
		comment: e.target.comment.value,
		// //make sure all dateTimestamps are of the same type!
		//timestamp: e.target.timestamp.value,
		
		// img: "./assets/images/Mohan-muruge.jpg"
	}
  postComment(e, newComment);
});

function clearComments(commentsContainer) {
  //  https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/

  while (commentsContainer.firstChild) {
    commentsContainer.removeChild(commentsContainer.firstChild);
  }
}


  //https://stackoverflow.com/questions/45112279/add-a-class-to-target-and-remove-class-from-other-elements-with-the-same-class-n
function addFormFieldActiveClass(){
  const formFields = document.getElementsByClassName("comments__form-field");

  for (let i= 0; i<formFields.length; i++){
    formFields[i].addEventListener("click", changeActiveStatus);
  }
}

//function to add the active class when formfield is clicked
function changeActiveStatus(e) {
  //find all formfields with active class
 
  const oldActive = document.querySelectorAll(".comments__form-field--active");
  // console.log(typeof oldActive); 
 
  // remove the active class from all elements that might have it 
  oldActive.forEach((field)=>{
field.classList.remove("comments__form-field--active");
  })

  //add the active classlist to the current form input field
  e.currentTarget.classList.add("comments__form-field--active");
}
addFormFieldActiveClass();




