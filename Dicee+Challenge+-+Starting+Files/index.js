// connecting dom element
const img1 = document.querySelector(".img1");
const img2 = document.querySelector(".img2");
const title = document.querySelector("h1");

// add event listener
img1.addEventListener("click", rollDice);
img2.addEventListener("click", rollDice);

// global varibale for both dice
const playerObj = {
    img1: 6,
    img2: 6
}

// roll dice for addEventListener
function rollDice() {
    const randomNumber1 = getRandBetween(1, 6);
    // this.src = `./images/dice${randomNumber1}.png`;
    this.setAttribute("src", "./images/dice" + randomNumber1 + ".png");

    //get class of dice
    const dice = this.className;

    // set value to object
    playerObj[dice] = randomNumber1;

    // update Title
    updateTitle();
}

function updateTitle() {
    // check for draw 
    if (playerObj.img1 > playerObj.img2){
        title.innerHTML = "🚩 Left Win";
    } else if (playerObj.img1 < playerObj.img2){
        title.innerHTML = "Right Win 🚩";
    } else if (playerObj.img1 === playerObj.img2){
        title.innerHTML = "Draw";
    }
}

// getRandBetween function min and max including both
function getRandBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}