
// create comments array, with objects for each comment
//comments must have:
// - a name - a timestamp - the comment text
const comments = [
  {

    name: "Connor Walton",
    message: `This is art. This is inexplicable magic
    expressed in the purest way, everything
    that makes up this majestic work
    deserves reverence. Let us appreciate
    this for what it is and what it contains.`,
    // date timestamp: 02/17/2021 as the right format, for new comment add current date in the right format
    // img : url();
  },
  {
    name: "Emilie Beach",
    message: `I feel blessed to have seen them in
    person. What a show! They were just
    perfection. If there was one day of my
    life I could relive, this would be it. What
    an incredible day.`,
     // date/timestamp: 01/09/2021 as the right format, for new comment add current date in the right format
     // img : url();
  },
  {
    name: "Miles Acosta",
    message: `I can t stop listening. Every time I hear
    one of their songs the vocals it gives
    me goosebumps. Shivers straight down
    my spine. What a beautiful expression of
    creativity. Can t get enough.`,
    // date/timestamp: 12/20/2020 as the right format, for new comment add current date in the right format
    // img : url();
  }
]

// You must have a function called displayComment() that takes in one comment object as a parameter and displays it on the page using JavaScript DOM manipulation.

// No template literals should be used. All dynamic HTML should be added to DOM via DOM Methods for individual elements. Avoid bulk assigning stringified HTML using innerHTML

// You must use an HTML Form with the following functionality:
// That submits using the addEventListener
// Prevents the page from reloading when submitting a new comment
// Constructs a new comment object
// Pushes a new comment object to an array of comments
// Clears all comments from the page
// Re-renders to the page all comments from the comment array
// Clears the input fields after submitting a new comment