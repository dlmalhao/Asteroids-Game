/* Elementos necessários para que o fundo seja responsivo */
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let background = new Image();
background.src = "img/fundo.png";


/* Canvas height e width */
let width = canvas.width;
let height = canvas.height;


/* Sons e a música */
let music = document.getElementById("initialMusic");
const bullet = document.getElementById("gunshotSound");
const explosion = document.getElementById("explosionSound");
const asteroidHover = document.getElementById("asteroidSound");
const ufoSound = document.getElementById("ufoSound");

/* window.focus(); */

/* Ajustar e desenhar o fundo  no canvas*/
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
background.onload = function () {
    ctx.drawImage(background, 0, 0);
};

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.drawImage(background, 0, 0);
    // drawBackground()
});

/* Tocador de som de acordo com as animações*/
setTimeout(function () {
    asteroidHover.play();
    setTimeout(function () {
        ufoSound.play();
        setTimeout(function () {
            bullet.play();
            setTimeout(function () {
                explosionSound.play();
            }, 300);
        }, 2000);
    }, 5000);
}, 0);

/* Tiro dispara, nave sobre e vai para a próxima página assim que acaba a animação */
setTimeout(function () {
    location.href = "../Asteroids-Game-main/index.html";
}, 7700);