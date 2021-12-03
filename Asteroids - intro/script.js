const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let background = new Image();
background.src = "img/fundo.png";

let width = canvas.width
let height = canvas.height
let startMenu = document.querySelector("#startMenu")
let startButton = document.querySelector("#startButton")


canvas.width = window.innerWidth
canvas.height = window.innerHeight


// window.addEventListener("resize", function() {
//     canvas.width = window.innerWidth
//     canvas.height = window.innerHeight
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     drawBackground()
// })


/* setTimeout(function () {
    location.href = '../Asteroids-Game-main/index.html';
}, 7700);
 */

background.onload = function () {
    ctx.drawImage(background, 0, 0)
}

startButton.onclick = function () {
    fadeOut(startMenu)
}


window.addEventListener("resize", function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ctx.drawImage(background, 0, 0)
    // drawBackground()
})







//Functions






function fadeOut(element) {

    var op = 1; // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
            start()
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50)


}


function start() {

    //Variables
    ctx.beginPath()
    ctx.arc(100, 100, 10, 0, Math.PI * 2, true)
    ctx.fillStyle = "white"
    ctx.fill()
}


/* Mudança de página depois de x temporário */

/* Funções dos sons */


    document.getElementById("asteroidSound").play();

    setTimeout(function () {
        document.getElementById("gunshotSound").play();
    }, 8000)

    setTimeout(function () {
        document.getElementById("ufoSound").play();
    }, 8000)

    setTimeout(function () {
        document.getElementById("explosionSound").play();
    }, 8000)