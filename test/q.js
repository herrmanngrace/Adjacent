/* LIST OF VARIABLES */

var questionState = 0; //Keeps track of users place in quiz
var quizActive = true; //True until last question is answered

var userStats = [
  0, //Red Merle Corgi
  0, //Blue Merle Corgi
  0 //Black Welsh Corgi
  // 0, 	//nerdy
  // 0, 	//silly
  // 0 	//cool
];

var tempStats = userStats; //Holds stat increases relating to user selection

/* QUIZ BUILDING VARIABLES */

//The following array contains all question text elements

var questionText = [
  "What do you do on the weekend?", //q1
  "What time do you wake up on the weekend?", //q2
  "What is your favorite snack?", //q3
  "Pick a word to describe yourself?", //q4
  "What is your favorite vine referance?" //q5
  // "What was your go to computer program at school?" 			//q6
];

//The following array contains all answer text elements for each question

var answerText = [
  //question 1 answers
  ["Partying with friends", "Reading a book", "Watching a comedy"],
  // "Playing Quake or Doom",
  // "I didn't have the internet",
  // "Watching flash videos"],

  //question 2 answers
  ["7:00am", "9:00am", "12:00pm"],
  // "Fruit",
  // "Sunnyboys",
  // "Fruit rollups"],

  //question 3 answers
  ["Sugar Cubes", "A nice cold apple", "Cheese!"],
  // "Are You Afraid of the Dark?",
  // "Rocko's Modern Life",
  // "Art Attack"],

  //question 4 answers
  ["Energetic", "Shy", "Funny as hell"],
  // "Hot Wheels",
  // "Mighty Max/Polly Pocket",
  // "Tamagotchi"],

  //question 5 answers
  [
    "Hi my name's Trey, I have a basketball game tomorrow. Wel,l I'm a point guard, I got shoe game...",
    "Wait, what is vine?",
    "What the FUCK is up KYLE no what did you say WHAT THE FUCK DUDE STEP THE FUCK UP KYLE"
  ]
  // "Backstreet Boys",
  // "The sweet sound of dial up",
  // "So Fresh CDs"],

  // 	//question 6 answers
  // [	"Kid Pix",
  // 	"Minesweeper",
  // 	"Lemmings",
  // 	"Zoombinis",
  // 	"Microsoft Paint",
  // 	"Pinball"]
];

//The following array contains all personality stat increments for each answer of every question
// answerValues[0][0][0][0]
var answerValues = [
  //question 1 answer values
  [[3, 0, 0], [0, 3, 0], [0, 0, 3]],

  //question 2 answer values
  [[3, 0, 0], [0, 3, 0], [0, 0, 3]],

  //question 3 answer values
  [[3, 0, 0], [0, 3, 0], [0, 0, 3]],

  //question 4 answer values
  [[3, 0, 0], [0, 3, 0], [0, 0, 3]],

  //question 5 answer values
  [[3, 0, 0], [0, 3, 0], [0, 0, 3]]
];

/* SHORTCUT VARIABLES */
//so I don't have to keep typing

var results = document.getElementById("results");
var quiz = document.getElementById("quiz");
var body = document.body.style;
var printResult = document.getElementById("topScore");
var buttonElement = document.getElementById("button");

/* QUIZ FUNCTIONALITY */

buttonElement.addEventListener("click", changeState); //Add click event listener to main button

/* This function progresses the user through the quiz */

function changeState() {
  updatePersonality(); //Adds the values of the tempStats to the userStats

  if (quizActive) {
    /*True while the user has not reached the end of the quiz */

    initText(questionState); //sets up next question based on user's progress through quiz
    questionState++; //advances progress through quiz

    buttonElement.disabled = true; //disables button until user chooses next answer
    buttonElement.innerHTML = "Please select an answer";
    buttonElement.style.opacity = 0.7;
  } else {
    /*All questions answered*/

    setCustomPage(); //runs set up for result page
  }
}

/* This function determines the question and answer content based on user progress through the quiz */

function initText(question) {
  var answerSelection = ""; //text varialbe containting HTML code for the radio buttons' content

  /* Creates radio buttons based on user progress through the quiz - current 'id' generation is not w3c compliant*/

  for (i = 0; i < answerText[question].length; i++) {
    answerSelection +=
      "<li><input type='radio' name='question" +
      (question + 1) +
      "' onClick='setAnswer(" +
      i +
      ")' id='" +
      answerText[question][i] +
      "'><label for='" +
      answerText[question][i] +
      "'>" +
      answerText[question][i] +
      "</label></li>";
  }

  document.getElementById("questions").innerHTML = questionText[question]; //set question text
  document.getElementById("answers").innerHTML = answerSelection; //set answer text
}

/* This function is called when a user selects an answer, NOT when answer is submitted */

function setAnswer(input) {
  clearTempStats(); //clear tempStats in case user reselects their answer

  tempStats = answerValues[questionState - 1][input]; //selects personality values based on user selection

  if (questionState < questionText.length) {
    /*True while the user has not reached the end of the quiz */

    buttonElement.innerHTML = "Continue";
    buttonElement.disabled = false;
    buttonElement.style.opacity = 1;
  } else {
    /*All questions answered - QUESTION TIME IS OVER!*/

    quizActive = false;
    buttonElement.innerHTML = "Display your custom website";
    buttonElement.disabled = false;
    buttonElement.style.opacity = 1;
  }
}

/* This function sets tempStats to 0 */

function clearTempStats() {
  tempStats = [0, 0, 0];
}

/*This function adds the values of the tempStats to the userStats based on user selection */

function updatePersonality() {
  for (i = 0; i < userStats.length; i++) {
    userStats[i] += tempStats[i];
  }
}

/* This function determines the highest personality value */

function setCustomPage() {
  var highestStatPosition = 0; //highest stat defaults as 'cute'

  /* This statement loops through all personality stats and updates highestStatPosition based on a highest stat */

  for (i = 1; i < userStats.length; i++) {
    if (userStats[i] > userStats[highestStatPosition]) {
      highestStatPosition = i;
    }
  }

  displayCustomPage(highestStatPosition); //passes the index value of the highest stat discovered

  /* Hides the quiz content, shows results content */
  quiz.style.display = "none";
}

/* BUILDS WEB PAGE AS PER RESULTS OF THE QUIZ */

/* The following code manipulates the CSS based on the personality results */

function displayCustomPage(personality) {
  switch (personality) {
    case 0: //cute code
      results.style.display = "inline-block";
      results.classList.add("Red Merle Corgi");
      body.background = "none";
      body.backgroundImage =
        "url('https://www.warrenphotographic.co.uk/photography/bigs/04330-Corgi-white-background.jpg')";
      body.backgroundSize = "cover";
      printResult.innerText = "Red Merle Corgi";
      break;

    case 1: //spooky
      results.style.display = "inline-block";
      results.classList.add("Blue Merle Corgi");
      body.background = "none";
      body.backgroundImage =
        "url('https://web.archive.org/web/20090805212330/http://www.geocities.com/alecbay/evilbackground.gif')";
      body.backgroundRepeat = "repeat";
      printResult.innerText = "Blue Merle Corgi";
      break;

    case 2: //lame
      results.style.display = "inline-block";
      results.classList.add("Black Welsh Corgi");
      body.background = "none";
      body.backgroundColor = "#008080";
      printResult.innerText = "Black Welsh Corgi";
      break;

    default:
      document.getElementById("error").style.display = "inline-block";
  }
}
