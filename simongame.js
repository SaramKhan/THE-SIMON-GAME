//array of button colors;
var buttonColor = ["red", "blue", "green", "yellow"];
//to store the random pattern we get;
var gamePattern = [];
//to store the pattern selected by the user;
var userClickedPattern = [];
//to check if the game started or not;
var checkStart = false;
//to keep track of level and to update them;
var level = 0;
//function to detect key press and to call nextSequence after that and changing h1 and checkStart state;
$(document).keypress(function() {
  if (!checkStart) {
    $("h1").text("LeveL " + level);
    nextSequence();
    checkStart = true;
  }
});
//to detect the click on the button, update the userClickedPattern array, play sound, animate the button and call function checkAnswer;
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});
//to call nextSequence, increasing level each time, modifying h1 title and userClickedPattern array, generate random color and storing it at the last of gamePattern array;
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
//fade affect and play sound
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}
//function to check answer and calling nextSequence if true and wrongAnswer if wrong;
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    if (userClickedPattern.length != 0 && gamePattern.length === 0) {
      $("h1").text("To start game PRESS any key!!!");
      startOver();
    } else {
      wrongAnswer();
    }
  }
}
//function to play sound;
function playSound(name) {
  var buttonsound = new Audio("sounds/" + name + ".mp3");
  buttonsound.play();
}
//function to animate the button pressed by user for 100 milliseconds;
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}
//function to tell what to do if the answer is wrong;
function wrongAnswer() {
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over, Press any key to restart");
  startOver();
}
//function to restart the game;
function startOver() {
  level = 0;
  gamePattern = [];
  checkStart = false;
}
