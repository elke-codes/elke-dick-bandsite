/// --- GLOBAL VARIABLES --- ///
  let comments = [];
  // get API key at https://project-1-api.herokuapp.com/register 
  const BANSITE_API_URL = "https://project-1-api.herokuapp.com";
  const BANDSITE_API_KEY = "1d72f654-70d6-488d-8961-2583a70e24bc";
  const commentsContainer = document.querySelector(".comment__container");


/// ---- FUNCTION DECLARATIONS --- ///


// -- COMMENTS -- //
 function getComments(){
      axios.get(`${BANSITE_API_URL}/comments?&api_key=${BANDSITE_API_KEY}`)     
      .then((resolve) =>{
  
          // get the comments from the api 
            const storedComments = resolve.data
          //push the comments to the empty comments array
            storedComments.forEach(comment =>{
              comments.push(comment);
            });
            comments.sort((a, b) => {
              return b.timestamp - a.timestamp;
            });

			createAndRenderComments(comments);

 	})
		.catch(error => console.log(error));
		}

function createAndRenderComments(comments) {
  comments.forEach(comment => {

      //add all comments in the comments array to the page
      let commentArticle = createComment(comment);
      commentsContainer.appendChild(commentArticle);
      //have to be added after the page loads when the elements are created

      addDeleteButtonEventListener();
      addLikeButtonEventListener();
  })
};

function createComment(comment) {
  const commentArticle = document.createElement("article");
  commentArticle.classList.add("comment");
  commentArticle.id = comment.id;
  commentsContainer.appendChild(commentArticle);

  const avatar = createAvatar(comment);
  commentArticle.appendChild(avatar);

  const commentInfo = createCommentInfo(comment);
  commentArticle.appendChild(commentInfo);
  
  
  return commentArticle;
};


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

  const commentsDate = document.createElement("p");
  commentsDate.classList.add("comment__date");
  commentsDate.innerText = timeAgo(comment.timestamp);
  commentInfoContainer.appendChild(commentsDate);
  
  const likeButton =  document.createElement('button');
  likeButton.classList.add("like-button");
  likeButton.id = comment.id;
  commentLikes = comment.likes;
  likeButton.innerText = " ❤️ "+commentLikes;
  commentName.appendChild(likeButton);

  const deleteButton =  document.createElement('button');
  deleteButton.classList.add("delete-button");
  deleteButton.id = comment.id;
  deleteButton.innerText ="Delete 🗑️";
  commentsDate.appendChild(deleteButton);

  const commentText = document.createElement("p");
  commentText.classList.add("comment__comment");
  commentText.innerText = comment.comment;
  commentInfo.appendChild(commentText);

  return commentInfo;
}

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
  }

  return avatar;
}

function postComment(e, comment){
  axios.post(`
    ${BANSITE_API_URL}/comments?&api_key=${BANDSITE_API_KEY}`, comment
  ).then(
    resolve => {
    //push new comment to the comments array
    comments.push(resolve.data);
    clearComments(commentsContainer);
      // https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/
      comments.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
    createAndRenderComments(comments);
    e.target.reset();	

  })
  .catch(error => console.log(error));
}

function clearComments(commentsContainer) {
  //  https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
  while (commentsContainer.firstChild) {
    commentsContainer.removeChild(commentsContainer.firstChild);
  }
}



// -- CONVERT TIME -- // 
function timeAgo(dateString) {    
  // https://articlearn.id/article/d1a6b5cc-how-to-format-time-since-or-time-ago-in-j/
  const date = new Date(dateString);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const seconds = Math.round((today - date) / 1000);

  if (seconds < 20) {
      return 'just now';
  }
  else if (seconds < 60) {
      return 'about a minute ago';
  }

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
      return `${minutes} minutes ago`;
  }

  const isToday = today.toDateString() === date.toDateString();
  if (isToday) {
      return 'Today'
  }

  const yesterday = new Date(today - DAY_IN_MS);
  const isYesterday = yesterday.toDateString() === date.toDateString();
  if (isYesterday) {
      return 'Yesterday'
  }

  const daysDiff = Math.round((today - date) / (1000 * 60 * 60 * 24));
  if (daysDiff < 30) {
      return `${daysDiff} days ago`;
  }

  const monthsDiff = today.getMonth() - date.getMonth() + (12 * (today.getFullYear() - date.getFullYear()));
  if (monthsDiff < 12) {
      return `${monthsDiff} months ago`;
  }

  const yearsDiff = today.getYear() - date.getYear();

  return `${yearsDiff} years ago`;
}

// -- EVENT HANDLING -- //

function addFormEventListener(){
  const formEl = document.querySelector(".comments__form");
  formEl.addEventListener("submit",formEventHandler);
}

function formEventHandler(e){
  e.preventDefault();
  
  const newComment = {
    name: e.target.name.value,
    comment: e.target.comment.value,
    // img: "./assets/images/Mohan-muruge.jpg"
  }

  removeFormFieldModClass();
  formValidation(e, newComment);     
}


function removeFormFieldModClass() {
  const activeFormField = document.querySelector(".comments__form-field--active");
  const errorFormfield = document.querySelector(".comments__form-field--error");
   
  if(activeFormField){
    activeFormField.classList.remove("comments__form-field--active");
    }

  if(errorFormfield){
      errorFormfield.classList.remove("comments__form-field--error");
    }
}
  
function formValidation(e, newComment){

    const nameInputValue = e.target.name.value;
    const commentInputValue = e.target.comment.value;
    const nameInput = e.target.name;
    const commentInput = e.target.comment;

    // prevent the errormessages from stacking up by removing them when trying to submit the form again
    const errorMessages = document.querySelectorAll(".comments__form-field--error-message")
    errorMessages.forEach(errorMessage=>{
        errorMessage.remove();
    })

    if (!nameInputValue) {
      nameInput.classList.add("comments__form-field--error");
      const formName = document.querySelector(".comments__form-name")
      const nameErrorMessage = document.createElement("p");

      nameErrorMessage.classList.add("comments__form-field--error-message");
      nameErrorMessage.innerText = "Please enter a name.";
      formName.appendChild(nameErrorMessage);
    } 

    if (!commentInputValue) {
      commentInput.classList.add('comments__form-field--error');
      const formComment = document.querySelector(".comments__form-comment")
      const commentErrorMessage = document.createElement("p");

       
      commentErrorMessage.classList.add("comments__form-field--error-message");
      commentErrorMessage.innerText = "Please let us know what you think.";
      formComment.appendChild(commentErrorMessage);
    }
    
    if (nameInputValue && commentInputValue){
        postComment(e, newComment);
    }

}
      

function addFormFieldEventListener(){
  //https://stackoverflow.com/questions/45112279/add-a-class-to-target-and-remove-class-from-other-elements-with-the-same-class-n
  const formFields = document.querySelectorAll(".comments__form-field");
  formFields.forEach(formField => {
        formField.addEventListener("click", changeStatus);
  });
}

function changeStatus(e) {
  const error = document.querySelectorAll(".comments__form-field--error");
  error.forEach(error => {
    error.classList.remove("comments__form-field--error");
  })

  const oldActive = document.querySelectorAll(".comments__form-field--active");
  oldActive.forEach(field => {
      field.classList.remove("comments__form-field--active");
  })

  e.currentTarget.classList.add("comments__form-field--active");

}


function addDeleteButtonEventListener(){
  const deleteButton = document.querySelector(".delete-button")
  deleteButton.addEventListener("click", handleDeleteButton);
}

function handleDeleteButton(e){

    const id = e.currentTarget.id;
	axios.delete(`${BANSITE_API_URL}/comments/${id}?&api_key=${BANDSITE_API_KEY}`,e)
	.then(resolve =>{


//return all the comments but the deleted commment and render them back to the page
    comments = comments.filter((comment) =>{
       return comment.id !== resolve.data.id;
      }
    );
		
    clearComments(commentsContainer);
		createAndRenderComments(comments);
	
	})
	
}

function addLikeButtonEventListener(){
	const likeButtons = document.querySelectorAll(".like-button");
	likeButtons.forEach(likeButton => {
		likeButton.addEventListener("click", handleLikeButton)

		});
  }

function handleLikeButton(e){

  const id= e.currentTarget.id;
  axios.put(`${BANSITE_API_URL}/comments/${id}/like?&api_key=${BANDSITE_API_KEY}`,e)
  .then(resolve =>{
//check for the current comment and replace the data so the likes get updated, otherwise return the unchaged comments
    comments = comments.map(comment => {
      if(comment.id === resolve.data.id) {
        return resolve.data;
      } else {
        return comment;
      }
    });

    clearComments(commentsContainer);
    createAndRenderComments(comments);

  });
 
}


// -- PET PEEVE -- // 
const footerCopyright = document.querySelector(".footer__copyright")
footerCopyright.innerText= new Date().getFullYear();

  
/// --- CONTROL FLOW ---///
getComments();
addFormEventListener();
addFormFieldEventListener();
