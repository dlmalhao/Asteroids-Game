const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let background = new Image();
background.src = "img/fundo.png";


/* Canvas height e width */
let width = canvas.width;
let height = canvas.height;

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



let begin = document.getElementById("initialButton")
begin.addEventListener('click', function  () {
  window.location="../Asteroids - intro/introAsteroides.html"
  window.focus()
})