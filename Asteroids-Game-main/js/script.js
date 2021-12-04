//Variables

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
var background = new Image();
let width = canvas.width
let height = canvas.height
let startMenu = document.querySelector("#startMenu")
let startButton = document.querySelector("#startButton")
let highScore = getHighScore()
let lives = 3
let score = 0
let asteroids = []
let aliens=[]
let sizes = [200, 150, 100]
let urls = ["./img/asteroid.png", "./img/asteroid2.png"]
let bullets = []
let isGameOver = false
let isStartingAgain = false
let rndX, rndY, rndSize, rndImg, rndVelocity
let canShoot = true
let scoreAlien=1








canvas.width = window.innerWidth
canvas.height = window.innerHeight


background.src = "img/fundo.jpg";
background.onload = function () {
    ctx.drawImage(background, 0, 0)
}

startButton.onclick = function () {
    fadeOut(startMenu)
}




//Resize
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})


//Functions



//return do valor do highScore
function getHighScore() {
    return localStorage.getItem("HighScore")
}

//Fade Out
function fadeOut(element) {
    var op = 1; // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
            document.querySelector(".initialAnimation").style.visibility = "hidden"

            render()
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50)
}


//Criação dos asteroids
function createAsteroid(num) {
    if (asteroids.length == 0) {
        for (let i = 0; i < num; i++) {
            rndX = getRandomX()
            rndY = getRandomY()
            rndSize = sizes[Math.floor(Math.random() * sizes.length)]
            rndImg = urls[Math.floor(Math.random() * urls.length)]
            rndVelocity = sizes.findIndex(size => size == rndSize) + 2
            if (distanceBetweenTwoPoints(rndX, rndY, ship.coordinates.x, ship.coordinates.y) > 300) {
                asteroids.push({
                    img: new Image(),
                    src: rndImg,
                    size: rndSize,
                    velocity: rndVelocity,
                    direction: {
                        x: randomDirection(-1, 1),
                        y: randomDirection(-1, 1)
                    },
                    coordinates: {
                        x: rndX,
                        y: rndY
                    },
                    angle: 0
                })
            }
        }
    } else {
        rndX = getRandomX()
        rndY = getRandomY()
    }

    //Caso o nº de asteroides seja inferior ao num vai adicionar com os dados random e a uma distância de pelo menos 300px da nave

    if (asteroids.length < num) {

        rndX = getRandomX()
        rndY = getRandomY()
        rndSize = sizes[Math.floor(Math.random() * sizes.length)]
        rndImg = urls[Math.floor(Math.random() * urls.length)]
        rndVelocity = sizes.findIndex(size => size == rndSize) + 2

        if (distanceBetweenTwoPoints(rndX, rndY, ship.coordinates.x, ship.coordinates.y) > 300) {
            asteroids.push({
                img: new Image(),
                src: rndImg,
                size: rndSize,
                velocity: rndVelocity,
                direction: {
                    x: randomDirection(-1, 1),
                    y: randomDirection(-1, 1)
                },
                coordinates: {
                    x: rndX,
                    y: rndY
                },
                angle: 0
            })
        }
    }
}

//Desenho dos asteroids
function drawAsteroid() {
    for (const asteroid of asteroids) {
        if (distanceBetweenTwoPoints(asteroid.coordinates.x, asteroid.coordinates.y, ship.coordinates.x, ship.coordinates.y) < 300) {

        }
        ctx.save()
        ctx.translate(asteroid.coordinates.x, asteroid.coordinates.y)
        ctx.rotate(asteroid.angle * Math.PI / 500)
        asteroid.img.src = asteroid.src
        ctx.drawImage(asteroid.img, -(asteroid.size / 2), -(asteroid.size / 2), asteroid.size, asteroid.size)
        ctx.restore()

        asteroid.angle++

        asteroid.coordinates.x += asteroid.direction.x * (asteroid.velocity / 2)
        asteroid.coordinates.y += asteroid.direction.y * (asteroid.velocity / 2)






        //Verificação das bordas
        if (asteroid.coordinates.x >= canvas.width + (asteroid.size / 2)) {
            asteroid.coordinates.x = -(asteroid.size / 2)
        }
        if (asteroid.coordinates.y >= canvas.height + (asteroid.size / 2)) {
            asteroid.coordinates.y = -(asteroid.size / 2)
        }
        if (asteroid.coordinates.x < -(asteroid.size / 2)) {
            asteroid.coordinates.x = canvas.width + (asteroid.size / 2)
        }
        if (asteroid.coordinates.y < -(asteroid.size / 2)) {
            asteroid.coordinates.y = canvas.height + (asteroid.size / 2)
        }
    }
}

//Criação dos aliens
function createAlien(){
        rndX = getRandomX()
        rndY = getRandomY()

        if(aliens.length == 0){
            aliens.push({
                img: new Image(),
                src: "./img/alien.png",
                size:100,
                velocity:5,
                direction:{
                    x: randomDirection(-1, 1),
                    y: randomDirection(-1, 1)
                },
                coordinates: {
                    x: rndX,
                    y: rndY
                },
                angle: 0,
                isAlive: false,

            })
        }

        // if (distanceBetweenTwoPoints(rndX, rndY, ship.coordinates.x, ship.coordinates.y) > 300) {
           
        // }
        
}



//Desenho dos Aliens
function drawAlien(){
    if(aliens[0].isAlive ){
        
        ctx.save()
        ctx.translate(aliens[0].coordinates.x, aliens[0].coordinates.y)
        ctx.rotate(aliens[0].angle * Math.PI / 500)
        aliens[0].img.src = aliens[0].src
        ctx.drawImage(aliens[0].img, -(aliens[0].size / 2), -(aliens[0].size / 2), aliens[0].size, aliens[0].size)
        ctx.restore()
        
        
        
        
        
    }
    if(score >= scoreAlien*2000 ){
        scoreAlien++
        aliens[0].isAlive = true
    }
        aliens[0].angle++

        aliens[0].coordinates.x += aliens[0].direction.x * (aliens[0].velocity / 2)
        aliens[0].coordinates.y += aliens[0].direction.y * (aliens[0].velocity / 2)


        //Verificação das bordas
        if (aliens[0].coordinates.x >= canvas.width + (aliens[0].size / 2)) {
            aliens[0].coordinates.x = -(aliens[0].size / 2)
        }
        if (aliens[0].coordinates.y >= canvas.height + (aliens[0].size / 2)) {
            aliens[0].coordinates.y = -(aliens[0].size / 2)
        }
        if (aliens[0].coordinates.x < -(aliens[0].size / 2)) {
            aliens[0].coordinates.x = canvas.width + (aliens[0].size / 2)
        }
        if (aliens[0].coordinates.y < -(aliens[0].size / 2)) {
            aliens[0].coordinates.y = canvas.height + (aliens[0].size / 2)
        }

    
    
}



//Criar a nave

let ship = {
    img: new Image(),
    size: 100,
    velocity: 0,
    maxVelocity: 6,
    angle: 0,
    isMoving: false,
    isTurningLeft: false,
    isTurningRigth: false,
    coordinates: {
        x: canvas.width / 2,
        y: canvas.height / 2,
    },
    isShooting: false
}
ship.img.src = "./img/naveSemFogo.png"



//Desenhar a nave

function drawShip() {

    ctx.save();
    ctx.translate(ship.coordinates.x, ship.coordinates.y)
    ctx.rotate(ship.angle)
    ctx.drawImage(ship.img, -ship.size / 2, -ship.size / 2, ship.size, ship.size)
    ctx.restore();

    if (ship.isMoving) {
        ship.img.src = "./img/nave.png"
        if (ship.velocity < ship.maxVelocity) {
            ship.velocity += 0.1
            ship.coordinates.y += ship.velocity * Math.sin(ship.angle - Math.PI / 2)
            ship.coordinates.x += ship.velocity * Math.cos(ship.angle - Math.PI / 2)
        } else {
            ship.velocity = ship.maxVelocity
            ship.coordinates.y += ship.velocity * Math.sin(ship.angle - Math.PI / 2)
            ship.coordinates.x += ship.velocity * Math.cos(ship.angle - Math.PI / 2)
        }
    } else {
        if (ship.velocity == 0) {
            ship.velocity = 0
        }

        if (ship.velocity > 0) {
            ship.velocity -= 0.05
            ship.coordinates.y += ship.velocity * Math.sin(ship.angle - Math.PI / 2)
            ship.coordinates.x += ship.velocity * Math.cos(ship.angle - Math.PI / 2)
        }



    }

    if (ship.isTurningLeft) {
        ship.angle -= 0.1
    }

    if (ship.isTurningRigth) {
        ship.angle += 0.1
    }

    //Verificação das bordas
    if (ship.coordinates.x >= canvas.width + (ship.size / 2)) {
        ship.coordinates.x = -(ship.size / 2)
    }
    if (ship.coordinates.y >= canvas.height + (ship.size / 2)) {
        ship.coordinates.y = -(ship.size / 2)
    }
    if (ship.coordinates.x < -(ship.size / 2)) {
        ship.coordinates.x = canvas.width + (ship.size / 2)
    }
    if (ship.coordinates.y < -(ship.size / 2)) {
        ship.coordinates.y = canvas.height + (ship.size / 2)
    }
}


//Explosão da nave
function explodeShip() {
    for (let i = 0; i < asteroids.length; i++) {
        if (distanceBetweenTwoPoints(ship.coordinates.x, ship.coordinates.y, asteroids[i].coordinates.x, asteroids[i].coordinates.y) < ship.size / 4 + asteroids[i].size / 2) {
            if (lives == 1) {
                isGameOver = true
            }

            //Ao bater contra um asteroid, se houver algum que esteja dentro de um raio de 300px do centro, este vai ser removido.(Vai ser criado outro automaticamente)
            if (distanceBetweenTwoPoints(asteroids[i].coordinates.x, asteroids[i].coordinates.y, canvas.width / 2, canvas.height / 2) < 300) {
                asteroids.splice(i, 1)
            }
            ship.velocity = 0
            ship.coordinates.x = canvas.width / 2
            ship.coordinates.y = canvas.height / 2
            drawShip()
            if (lives > 0) {
                lives -= 1
            }
        }
    }
}


//Game over
function gameOver() {

    if (isGameOver) {
        if (score > localStorage.getItem("HighScore")) {
            localStorage.setItem("HighScore", score)
        }
        document.querySelector(".gameOver").style.visibility = "visible"
        highScore = getHighScore()
        document.querySelector("#highScoreValue").innerHTML = "High Score: " + highScore
    }
}

//Voltar a jogar
function startAgain() {
    isGameOver = false
    asteroids = []
    bullets = []
    lives = 3
    score = 0
    ship.velocity = 0
    isStartingAgain = true
    document.querySelector(".gameOver").style.visibility = "hidden"
    render()
}

//Back to Menu (Reload)
function reload() {
    window.location.reload()
}



//Calcular a distância entre dois pontos
function distanceBetweenTwoPoints(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}


//Criação do objeto das balas ao clicar para disparar
function shoot() {
    if (ship.isShooting) {
        bullets.push({
            velocity: 8,
            size: 10,
            coordinates: {
                x: ship.coordinates.x,
                y: ship.coordinates.y
            },
            angle: ship.angle,
        })

        drawBullets()
    }
    ship.isShooting = false

}



//Desenhar as balas no canvas
function drawBullets() {
    for (let i = 0; i < bullets.length; i++) {

        //////////////////////// TEMPORARIO /////////////////////////
        if (bullets[i].coordinates.x >= canvas.width + (bullets[i].size / 2)) {
            bullets.splice(i, 1)
            return
        }
        if (bullets[i].coordinates.y >= canvas.height + (bullets[i].size / 2)) {
            bullets.splice(i, 1)
            return
        }
        if (bullets[i].coordinates.x <= (-(bullets[i].size / 2))) {
            bullets.splice(i, 1)
            return
        }
        if (bullets[i].coordinates.y <= (-(bullets[i].size / 2))) {
            bullets.splice(i, 1)
            return
        }



        ctx.beginPath();
        ctx.arc(bullets[i].coordinates.x, bullets[i].coordinates.y, bullets[i].size / 2, 0, 2 * Math.PI);
        ctx.fillStyle = "orange"
        ctx.fill()
        // ctx.translate(, )
        // ctx.rotate(bullets[i].angle)
        // ctx.drawImage(bullets[i].img, -bullets[i].size / 2, -ship.size / 2, bullets[i].size, bullets[i].size)
        bullets[i].coordinates.y += bullets[i].velocity * Math.sin(bullets[i].angle - Math.PI / 2)
        bullets[i].coordinates.x += bullets[i].velocity * Math.cos(bullets[i].angle - Math.PI / 2)
        // ctx.restore()
        ctx.closePath()


        let idxFound = null

        for (let j = 0; j < asteroids.length; j++) {
            if (distanceBetweenTwoPoints(bullets[i].coordinates.x, bullets[i].coordinates.y, asteroids[j].coordinates.x, asteroids[j].coordinates.y) < bullets[i].size / 4 + asteroids[j].size / 2) {
                asteroids.splice(j, 1)
                idxFound= i 
                score += 200
                break
            }
            
            
        }
        if(aliens[0].isAlive){
            if (distanceBetweenTwoPoints(bullets[i].coordinates.x, bullets[i].coordinates.y, aliens[0].coordinates.x, aliens[0].coordinates.y) < bullets[i].size / 4 + aliens[0].size / 2) {
                // aliens.splice(0, 1)
                idxFound= i 
                aliens[0].isAlive = false
                score += 500
                break
        }
        }
        
        if(idxFound != null) {
            bullets.splice(idxFound, 1)
        }
        

        
       
        

    }
}





function KeyPressed(e) {
    if (e.keyCode == 32 && canShoot == true) {
        ship.isShooting = true
        canShoot = false
        shoot()
        setTimeout(function () {
            canShoot = true
        }, 250)
    }

    if (e.key == "w") {

        ship.isMoving = true;
    }

    if (e.key == "a") {
        ship.isTurningLeft = true;

    }
    if (e.key == "d") {
        ship.isTurningRigth = true;
    }


}

function KeyReleased(e) {
    if (e.key == "w") {
        ship.img.src = "./img/naveSemFogo.png"
        ship.isMoving = false;
    }

    if (e.key == "a") {
        ship.isTurningLeft = false;
    }

    if (e.key == "d") {
        ship.isTurningRigth = false;
    }

    if (e.keyCode == 32) {
        ship.isShooting = false
    }
}

window.addEventListener('keydown', KeyPressed);
window.addEventListener('keyup', KeyReleased)

//Script direção aleatória para os asteroids
function randomDirection(min, max) {
    return Math.random() * (max - min) + min;
}

//Coordenadas aleatorias dentro do canvas
function getRandomX() {
    return Math.random() * (canvas.width - rndSize)
}

function getRandomY() {
    return Math.random() * (canvas.height - rndSize)
}


//HighScore
function setHighScore() {
    if (!localStorage.getItem("HighScore")) {
        localStorage.setItem("HighScore", 0)
    }
    document.querySelector("#highScoreValue").innerHTML = "High Score: " + highScore
}


//render
function render() {

    //Colocar o highscore
    setHighScore()

    //Colocar as vidas
    document.querySelector("#livesValue").innerHTML = "Lives: " + lives

    //Colocar o score
    document.querySelector("#scoreValue").innerHTML = "Score: " + score

    //Limpar o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    //Desenhar o background
    ctx.drawImage(background, 0, 0)

    //Criar os Asteroids
    createAsteroid(8)

    //Criar Aliens
    createAlien()

    drawAlien()

    //Desenhar asteroids
    drawAsteroid()

    //Desenhar nave
    drawShip()

    //Desenhar
    drawBullets()

    //Explosão da nave
    explodeShip()

    //Game Over
    gameOver()

    if (!isGameOver) {
        requestAnimationFrame(render)
    }

    if (isStartingAgain) {
        isStartingAgain = false
        createAsteroid(6)
    }


}




var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";

}

//Fechar Pagina 
function quit() {
    window.close()
}

/* 
Função abrir o menu options */

function functionModal() {

    document.getElementById('optionsButton').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#menuOptions').showModal();
    })

    document.getElementById('closeModalButton').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#menuOptions').close();
    })
}

function changeMusicVolume(musicVolume) {
    console.log(musicVolume)

}