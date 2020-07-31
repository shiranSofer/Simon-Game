
var buttonColor = ["red", "green", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var gameOn = false;
var level = 0;

$(document).on("keypress click", startGame);

$(".button").click(clickHandler);


function startGame() {
  if(!gameOn) {
    $("h2").css("visibility", "hidden");
    updateTitle("Level " + level);
    nextSequence();
    gameOn = true;

  }
}

function nextSequence() {
  level++;
  updateTitle("Level " + level);

  var randomNUmber = Math.floor(Math.random() * 4);
  gamePattern.push(buttonColor[randomNUmber]);

  $("#" + buttonColor[randomNUmber]).fadeIn(200).fadeOut(200).fadeIn(200);;
  playSound(buttonColor[randomNUmber]);
}

function clickHandler() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  clickAnimation(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
}

function checkAnswer(currentLevel) {
  var i;
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if(gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    startOver();
  }
}

function startOver() {
  updateTitle("Game Over");
  playSound("wrong");
  $("h2").css("visibility", "visible");
  gamePattern = [];
  userClickedPattern = [];
  gameOn = false;
  level = 0;
}

function clickAnimation(id) {
  playSound(id);
  $("#" + id).addClass("pressed");

  setTimeout(function() {
    $("#" + id).removeClass("pressed");
  }, 100);

}

function playSound(id) {
  var audio = new Audio("sounds/" + id + ".mp3");
  audio.play();
}

function updateTitle(text) {
  $("h1").text(text);
}
