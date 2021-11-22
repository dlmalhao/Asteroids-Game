
//Variables

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
var background = new Image();
let width = canvas.width
let height = canvas.height
let startMenu = document.querySelector("#startMenu")
let startButton = document.querySelector("#startButton")
let highScore = 0
let lives = 3
let score = 0
let asteroids = []
let sizes = [200,150,100]
let urls = ["./img/asteroid.png","./img/asteroid2.png"]

canvas.width = window.innerWidth
canvas.height = window.innerHeight


background.src = "img/fundo.jpg";
background.onload = function() {
    ctx.drawImage(background,0,0)
}

startButton.onclick = function() {
    fadeOut(startMenu)
}




//Resize
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    
    render()
})





//Functions


//Fade Out
function fadeOut(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
            createAsteroid(6)
            render()
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50)
}


//Create Asteroid
function createAsteroid (num) {
    for(let i = 0; i < num; i++) {
        const rndSize = sizes[Math.floor(Math.random() * sizes.length)] 
        const rndImg = urls[Math.floor(Math.random()* urls.length)]
        const rndVelocity = sizes.findIndex(size => size == rndSize) + 1
        console.log(rndImg);
        asteroids.push({
            img: new Image(),
            src: rndImg,
            size: rndSize,
            velocity: rndVelocity,
            direction: {
                x: randomDirection(-1,1),
                y: randomDirection(-1,1)
            },
            coordinates: {
                x: Math.random() * (canvas.width - rndSize),
                y: Math.random() * (canvas.height - rndSize)
            },
            angle: 0
        })
    }
}


//Draw Asteroid
function drawAsteroid () {
    for (const asteroid of asteroids) {
        ctx.save()
        ctx.translate(asteroid.coordinates.x, asteroid.coordinates.y)
        ctx.rotate(asteroid.angle * Math.PI / 500)
        asteroid.img.src = asteroid.src
        ctx.drawImage(asteroid.img, -(asteroid.size/2), -(asteroid.size/2), asteroid.size, asteroid.size)
        ctx.restore()

        asteroid.angle ++
        if(asteroid.velocity == 1) {
            asteroid.coordinates.x += asteroid.direction.x 
            asteroid.coordinates.y += asteroid.direction.y 
        }
        if(asteroid.velocity == 2) {
            asteroid.coordinates.x += asteroid.direction.x * 1.5
            asteroid.coordinates.y += asteroid.direction.y * 1.5
        }
        if(asteroid.velocity == 3) {
            asteroid.coordinates.x += asteroid.direction.x * 2
            asteroid.coordinates.y += asteroid.direction.y * 2
        }
        
        
        

        //Verificação das bordas
        if(asteroid.coordinates.x >= canvas.width + (asteroid.size / 2)) {
            asteroid.coordinates.x = -(asteroid.size/2)
        }
        if(asteroid.coordinates.y >= canvas.height + (asteroid.size / 2)) {
            asteroid.coordinates.y = -(asteroid.size/2)
        }
        if(asteroid.coordinates.x < -(asteroid.size/2)) {
            asteroid.coordinates.x = canvas.width + (asteroid.size / 2)
        }
        if(asteroid.coordinates.y < -(asteroid.size/2)) {
            asteroid.coordinates.y = canvas.height + (asteroid.size / 2)
        }
    }
}

//Create Ship 

let ship = {
    img: new Image(),
    src: "./img/naveSemFogo.png",
    size:100,
    velocity: 2,
    angle: 0,
    isMoving:false,
    isTurningLeft:false,
    isTurningRigth:false,
    coordinates: {
        x: canvas.width/2,
        y: canvas.height/2,
    },
}


//Draw Ship

function drawShip(){
    
    ctx.save();
    ctx.translate(ship.coordinates.x ,ship.coordinates.y)
    ctx.rotate(ship.angle)
    ship.img.src= ship.src
    ctx.drawImage(ship.img, -ship.size/2, -ship.size/2, ship.size, ship.size)
    ctx.restore();

    if(ship.isMoving){
        ship.coordinates.y+= ship.velocity * Math.sin(ship.angle)
        ship.coordinates.x+= ship.velocity * Math.cos(ship.angle)
    }
    if(ship.isTurningLeft){
        ship.angle -=0.1
        console.log(ship.angle);
    }
    if(ship.isTurningRigth){
        ship.angle +=0.1
    }
}

function KeyPressed(e){
    if(e.key == "w"){
        
        ship.isMoving = true;
    }

    if(e.key == "a"){
        ship.isTurningLeft = true;
        
    }
    if(e.key == "d"){
        ship.isTurningRigth = true;
    }
}

function KeyReleased(e){
    if(e.key == "w"){
        ship.isMoving =false;
    }

    if(e.key == "a"){
        ship.isTurningLeft = false;
    }
    if(e.key == "d"){
        ship.isTurningRigth = false;
    }
}

window.addEventListener('keydown', KeyPressed);
window.addEventListener('keyup', KeyReleased)

//Script direção aleatória para os asteroids
function randomDirection(min,max) {
    return Math.random() * (max - min) + min;
}

//HighScore
function setHighScore () {
    if(!localStorage.getItem("HighScore")) {
        localStorage.setItem("HighScore", highScore)
    }
    document.querySelector("#highScoreValue").innerHTML = "High Score: " + highScore
}


//render
function render() {
    //Limpar o canvas
    ctx.clearRect(0,0, canvas.width, canvas.height)
    
    //Desenhar o background
    ctx.drawImage(background,0,0)

    //Desenhar asteroids
    drawAsteroid()

    //Desenhar nave
    drawShip()

    //Colocar o high score
    setHighScore()

    //Colocar as vidas
    document.querySelector("#livesValue").innerHTML = "Lives: " + lives

    //Colocar o score
    document.querySelector("#scoreValue").innerHTML = "Score: " + score
        
    requestAnimationFrame(render)

}

//Fechar Pagina 
function quit() {
    window.close()
}







//Classes


// class ship {
//     constructor (source, velocity, coordinates, rotateAngle) {
//         this.source = source,
//         this.velocity = velocity,
//         this.coordinates = coordinates,
//         this.rotateAngle = rotateAngle
//     }
// } 




