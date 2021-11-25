/// --- GLOBAL VARIABLES --- ///
  const comments = [];
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
		.catch(error => console.log("there was a problem with this get request" + error));
		}


function createAndRenderComments(comments) {
  comments.forEach(comment => {
      //add all comments in the comments array to the page
      let commentArticle = createComment(comment);
      commentsContainer.appendChild(commentArticle);
  })
};

function createComment(comment) {
  const commentArticle = document.createElement("article");
  commentArticle.classList.add("comment");
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
  commentsDate.innerText = new Date(comment.timestamp).toLocaleDateString('en-US');
  commentInfoContainer.appendChild(commentsDate);

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


function addFormEventHandler(){
  const formEl = document.querySelector(".comments__form");
  formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    const newComment = {
      name: e.target.name.value,
      comment: e.target.comment.value,
      // img: "./assets/images/Mohan-muruge.jpg"
    }
    postComment(e, newComment);
  });
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
    removeFormFieldActiveClass();
  });
  // .catch(error => console.log("there was a problem with this post request" + error));
}

function clearComments(commentsContainer) {
  //  https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
  while (commentsContainer.firstChild) {
    commentsContainer.removeChild(commentsContainer.firstChild);
  }
}

function addFormFieldEventListener(){
    //https://stackoverflow.com/questions/45112279/add-a-class-to-target-and-remove-class-from-other-elements-with-the-same-class-n
    const formFields = document.querySelectorAll(".comments__form-field");
    formFields.forEach(formField => {
          formField.addEventListener("click", changeActiveStatus);
    });
}

function changeActiveStatus(e) {
    const oldActive = document.querySelectorAll(".comments__form-field--active");
    oldActive.forEach(field => {
        field.classList.remove("comments__form-field--active");
    })
    e.currentTarget.classList.add("comments__form-field--active");
}

function removeFormFieldActiveClass() {
    const activeFormField = document.querySelector(".comments__form-field--active");
      if(activeFormField){
      activeFormField.classList.remove("comments__form-field--active");
      }
}

  
/// --- CONTROL FLOW ---///
getComments();
addFormEventHandler();
addFormFieldEventListener();





