
//Variables

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
var background = new Image();
var asteroidImport = new Image();
let width = canvas.width
let height = canvas.height
let startMenu = document.querySelector("#startMenu")
let startButton = document.querySelector("#startButton")

canvas.width = window.innerWidth
canvas.height = window.innerHeight



let asteroid = {
    src: "./img/asteroid.png",
    coordinates: {
        x: 0,
        y: 0
    },
    angle: 0,
    isAlive: false,
    acc: 5,
    accOn: false,
    vel: 10,
}


// window.addEventListener("resize", function() {
//     canvas.width = window.innerWidth
//     canvas.height = window.innerHeight
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     drawBackground()
// })

background.src = "img/fundo.jpg";
background.onload = function() {
    ctx.drawImage(background,0,0)
}

startButton.onclick = function() {
    fadeOut(startMenu)
}


window.addEventListener("resize", function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ctx.drawImage(background,0,0)
    render()
})





//Functions




function fadeOut(element) {

    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
            render()
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50)
}




function render() {

    //Draw Asteroid
    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.drawImage(background,0,0)
    asteroidImport.src = asteroid.src
    ctx.beginPath();
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2 )
    ctx.rotate(asteroid.angle*Math.PI/500);
    ctx.drawImage(asteroidImport,-75,-75,150,150)
    ctx.restore()
    asteroid.angle ++

    requestAnimationFrame(render)

}



function quit() {
    window.close()
}







//Classes


class ship {
    constructor (source, velocity, coordinates, rotateAngle) {
        this.source = source,
        this.velocity = velocity,
        this.coordinates = coordinates,
        this.rotateAngle = rotateAngle
    }
} 




