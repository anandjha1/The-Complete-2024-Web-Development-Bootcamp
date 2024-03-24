//select elements
const drums = document.querySelectorAll(".drum");
const getAudio = {
    "w": new Audio("./sounds/tom-1.mp3"),
    "a": new Audio("./sounds/tom-2.mp3"),
    "s": new Audio("./sounds/tom-3.mp3"),
    "d": new Audio("./sounds/tom-4.mp3"),
    "j": new Audio("./sounds/crash.mp3"),
    "k": new Audio("./sounds/kick-bass.mp3"),
    "l": new Audio("./sounds/snare.mp3")
};

drums.forEach((drum) => {
    drum.addEventListener("click", function () {
        getAudio[this.innerHTML].play();
        buttonAnimation(this.innerHTML);
    });
});

document.addEventListener("keydown", keySoundPlay);

function keySoundPlay(e) {
    const keyPressed = e.key;

    if (keyPressed in getAudio) {
        buttonAnimation(keyPressed);
        getAudio[keyPressed].play();
    }
}

function buttonAnimation(key) {
    const keyEl = document.querySelector("." + key);

    keyEl.classList.add("pressed");

    setTimeout(function () {
        keyEl.classList.remove("pressed");
    }, 100);
}