
//Variables

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
var background = new Image();
background.src = "img/fundo.jpg";

let width = canvas.width
let height = canvas.height
let startMenu = document.querySelector("#startMenu")
let startButton = document.querySelector("#startButton")


canvas.width = window.innerWidth
canvas.height = window.innerHeight
drawBackground()

// window.addEventListener("resize", function() {
//     canvas.width = window.innerWidth
//     canvas.height = window.innerHeight
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     drawBackground()
// })




startButton.onclick = function() {
    fadeOut(startMenu)
}




//Functions


function drawBackground () {

    background.onload = function() {
        ctx.drawImage(background,0,0)
    }

}


function fadeOut(element) {

    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
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
    ctx.arc(100, 100, 10, 0, Math.PI*2, true)
    ctx.fillStyle = "white"
    ctx.fill()
    

    
    

    
}

function quit() {
    window.close()
}


class nave {
    constructor (source, velocity, coordinateX, coordinateY, rotateAngle) {
        this.source = source,
        this.velocity = velocity,
        this.coordinates = (coordinateX, coordinateY),
        this.rotateAngle = rotateAngle
    }
}

