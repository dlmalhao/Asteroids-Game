const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let background = new Image();
background.src = "img/fundo.png";

let width = canvas.width
let height = canvas.height
let startMenu = document.querySelector("#startMenu")
let startButton = document.querySelector("#startButton")



/* Sounds */

let music = document.getElementById("initialMusic");
const bullet = document.getElementById("gunshotSound")
const explosion = document.getElementById("explosionSound")
const asteroidHover = document.getElementById("asteroidSound")
const ufoSound = document.getElementById("ufoSound")

window.focus()


/* Adjust background */

canvas.width = window.innerWidth
canvas.height = window.innerHeight

background.onload = function () {
    ctx.drawImage(background, 0, 0)
}


window.addEventListener("resize", function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ctx.drawImage(background, 0, 0)
    // drawBackground()
})


/* Sound player */

setTimeout(function () {
    asteroidHover.play();
    setTimeout(function () {
        ufoSound.play();
        setTimeout(function () {
            bullet.play();
            setTimeout(function () {
                explosionSound.play();
            }, 300);
        }, 2000)
    }, 5000);
}, 0)



/* Load the new page transition */
setTimeout(function () {
    location.href = '../Asteroids-Game-main/index.html';
}, 7700);


