let isGameStarted = false;
let level = 0;
let gamePattern = [];
let userClickPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
function nextSequence() {
    userClickPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.trunc(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").on("click", function () {
    const userChosenColor = this.id;
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickPattern.length - 1);
});

$(document).on("keypress", function () {
    if (!isGameStarted) {
        $("#level-title").text("Level " + level);
        isGameStarted = true;
        nextSequence();
    }
});

function checkAnswer(currentLevel) {
    console.log({ userClickPattern, gamePattern });
    if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("succes");

        if (userClickPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function playSound(fileName) {
    let audio = new Audio("./sounds/" + fileName + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    isGameStarted = false;
}