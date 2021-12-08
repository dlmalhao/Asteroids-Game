                                                                 //Definiçao de todas as variaveis que serão necessárias

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
let aliens = []
let sizes = [200, 150, 100]
let urls = ["./img/asteroid.png", "./img/asteroid2.png"]
let bullets = []
let isGameOver = false
let isStartingAgain = false
let rndX, rndY, rndSize, rndImg
let canShoot = true
let shooted = false
let scoreAlien = 1
let shipSrc = "./img/naveSemFogo.png"
let shipMovingSrc = "./img/nave.png"
let backgroundSrc = "./img/fundo.jpg"
let ovniSrc = "./img/alien.png"
var allBtnsText = document.getElementsByTagName("h4")


/* Os sons usados e o começo da musica */
let initialMusic = document.getElementById("initialMusic")
let shootingSound = document.getElementById("gunshotSound")
let explosionSound = document.getElementById("explosionSound")
initialMusic.play()


/* Desenho direito do fundo */
background.src = backgroundSrc;
background.onload = function () {
    ctx.drawImage(background, 0, 0)
}

canvas.width = window.innerWidth
canvas.height = window.innerHeight

function renderBackground() {
    background.src = backgroundSrc;
    background.onload = function () {
        ctx.drawImage(background, 0, 0)
    }
}

//Fazer o resize
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

/* O que acontece no clique do start */
startButton.onclick = function () {
    renderBackground()
    fadeOut(startMenu)
}

                                                                          //Funções utilizadas

//Mudar o tema do jogo - pixel
function changeShipPixel() {
    shipSrc = "./img/naveSemFogo.png"
    shipMovingSrc = "./img/nave.png"
    backgroundSrc = "./img/fundo.jpg"
    urls = ["./img/asteroid.png", "./img/asteroid2.png"]
    ovniSrc = "./img/alien.png"

    for (let element of allBtnsText) {
        element.closest("div").style.backgroundColor = "#500243"
        element.closest("div").style.border = "rgb(237, 192, 255)"

        // $(element).closest("div").hover(
        //     function() {
        //         $(this).addClass("selected")
        //     }, function() {
        //         $(this).removeClass("selected")
        //     }
        // );        
    }
}

//Mudar o tema do jogo - tema original
function changeShipClassico() {
    shipSrc = "./img/Tema 2/nave.png"
    shipMovingSrc = "./img/Tema 2/nave com fogo.png"
    backgroundSrc = "./img/Tema 2/Fundo.png"
    urls = ["./img/Tema 2/Asteroid.png"]
    ovniSrc = "./img/Tema 2/Ovni.png"


    for (let element of allBtnsText) {
        element.closest("div").style.backgroundColor = "black"
        element.closest("div").style.border = "white"

        $(element).closest("div").hover(
            function () {
                $(this).addClass("selected")
            },
            function () {
                $(this).removeClass("selected")
            }
        );
    }
}

//Mudar o tema do jogo - realista
function changeShipRealista() {
    shipSrc = "./img/Tema 3/Nave.png"
    shipMovingSrc = "./img/Tema 3/Nave com fogo.png"
    backgroundSrc = "./img/Tema 3/Fundo.png"
    urls = ["./img/Tema 3/asteroid.png", "./img/Tema 3/asteroid2.png"]
    ovniSrc = "./img/Tema 3/ovni.png"

    // Vai buscar todos os textos dos botões
    for (let element of allBtnsText) {

        //Para cada texto, modificamos o style do parente
        element.closest("div").style.backgroundColor = "black"
        element.closest("div").style.border = "white"

        //Não sabiamos se JQuery era permitido, mas só o usamos para estilizar o "Hover" de cada botão pois não encontramos outra solução
        //Estiliza os botões ao passar o rato por cima
        $(element).closest("div").hover(
            function () {
                $(this).addClass("selected")
            },
            function () {
                $(this).removeClass("selected")
            }
        );
    }
}

//return do valor do highScore
function getHighScore() {
    return localStorage.getItem("HighScore")
}

//Fade Out usado nos botões e no menu com o intuito de ter uma transição mais suave
function fadeOut(element) {
    var op = 1; // opacidade inicial
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
            //Exclui os asteroids que vão nascer num raio menor do que 300 px da nave
            if (distanceBetweenTwoPoints(rndX, rndY, ship.coordinates.x, ship.coordinates.y) > 300) {
                asteroids.push({
                    img: new Image(),
                    src: rndImg,
                    size: rndSize,
                    velocity: 2,
                    direction: {
                        x: randomNumberBetween(-1, 1),
                        y: randomNumberBetween(-1, 1)
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

    //Visto que esta função está dentro do render, vai estar constantemente a verificar se algum asteroid é destruido (removido do array)
    //Se isso acontecer, vai ser criado um novo
    if (asteroids.length < num) {
        rndX = getRandomX()
        rndY = getRandomY()
        rndSize = sizes[Math.floor(Math.random() * sizes.length)]
        rndImg = urls[Math.floor(Math.random() * urls.length)]
        if (distanceBetweenTwoPoints(rndX, rndY, ship.coordinates.x, ship.coordinates.y) > 300) {
            asteroids.push({
                img: new Image(),
                src: rndImg,
                size: rndSize,
                velocity: 2,
                direction: {
                    x: randomNumberBetween(-1, 1),
                    y: randomNumberBetween(-1, 1)
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

//Desenho dos asteroids no canvas
function drawAsteroid() {
    for (const asteroid of asteroids) {
        ctx.save()
        ctx.translate(asteroid.coordinates.x, asteroid.coordinates.y)
        ctx.rotate(asteroid.angle * Math.PI / 500)
        asteroid.img.src = asteroid.src
        ctx.drawImage(asteroid.img, -(asteroid.size / 2), -(asteroid.size / 2), asteroid.size, asteroid.size)
        ctx.restore()

        asteroid.angle++
        asteroid.coordinates.x += asteroid.direction.x * (asteroid.velocity / 2)
        asteroid.coordinates.y += asteroid.direction.y * (asteroid.velocity / 2)

        //Esta é a nossa forma de dificultar um bocado o jogo.
        //A velocidade dos asteroids vai aumentando aos poucos
        asteroid.velocity += 0.003

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
function createAlien() {
    rndX = getRandomX()
    rndY = getRandomY()

    if (aliens.length == 0) {
        aliens.push({
            img: new Image(),
            src: ovniSrc,
            size: 100,
            velocity: 5,
            direction: {
                x: randomNumberBetween(-1, 1),
                y: randomNumberBetween(-1, 1)
            },
            coordinates: {
                x: rndX,
                y: rndY
            },
            angle: 0,
            isAlive: false,

        })
    }
}

//Desenho dos Aliens no canvas
function drawAlien() {
    if (aliens[0].isAlive) {
        ctx.save()
        ctx.translate(aliens[0].coordinates.x, aliens[0].coordinates.y)
        ctx.rotate(aliens[0].angle * Math.PI / 500)
        aliens[0].img.src = aliens[0].src
        ctx.drawImage(aliens[0].img, -(aliens[0].size / 2), -(aliens[0].size / 2), aliens[0].size, aliens[0].size)
        ctx.restore()
    }
    if (score >= scoreAlien * 2000) {
        scoreAlien++
        aliens[0].isAlive = true
    }

    aliens[0].angle++
    aliens[0].coordinates.x += aliens[0].direction.x * (aliens[0].velocity / 2)
    aliens[0].coordinates.y += aliens[0].direction.y * (aliens[0].velocity / 2)

    //Alien com 2% de probabilidade de mudar de direção
    if (randomNumberBetween(1, 100) > 98) {
        aliens[0].direction.x = randomNumberBetween(-1, 1)
        aliens[0].direction.y = randomNumberBetween(-1, 1)
        aliens[0].coordinates.x += aliens[0].direction.x * (aliens[0].velocity / 2)
        aliens[0].coordinates.y += aliens[0].direction.y * (aliens[0].velocity / 2)
    }

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

//Desenhar a nave no canvas
function drawShip() {
    ctx.save();
    ctx.translate(ship.coordinates.x, ship.coordinates.y)
    ctx.rotate(ship.angle)
    ctx.drawImage(ship.img, -ship.size / 2, -ship.size / 2, ship.size, ship.size)
    ctx.restore();

    if (ship.isMoving) {
        ship.img.src = shipMovingSrc

        //Aceleração da nave
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
        ship.img.src = shipSrc
        if (ship.velocity == 0) {
            ship.velocity = 0
        }
        if (ship.velocity > 0) {
            ship.velocity -= 0.05
            ship.coordinates.y += ship.velocity * Math.sin(ship.angle - Math.PI / 2)
            ship.coordinates.x += ship.velocity * Math.cos(ship.angle - Math.PI / 2)
        }
    }
   
    //Mudança do angulo da nave ao virar
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

//Criação da explosão
let explosion = {
    img: new Image(),
    size: 150,
    angle: 0,
    coordinates: {
        x: 0,
        y: 0,
    },
    isExploding: false
}
explosion.img.src = "./img/explosion.png"

//Desenhar a explosão no canvas
function drawExplosion() {
    if (explosion.isExploding == true) {
        ctx.save()
        ctx.translate(explosion.coordinates.x, explosion.coordinates.y)
        ctx.rotate(explosion.angle)
        ctx.drawImage(explosion.img, -explosion.size / 2, -explosion.size / 2, explosion.size, explosion.size)
        ctx.restore()

        //Sistema de animação. Optamos por usar uma imagem como explosão e rodar a mesma 180 graus a cada 50ms
        setTimeout(() => {
            explosion.angle = 180
        }, 50)
        setTimeout(() => {
            explosion.angle = 0
        }, 100)
        setTimeout(() => {
            explosion.isExploding = false
        }, 150);
        explosionSound.play()
    }
}


//Explosão da nave
function explodeShip() {
    for (let i = 0; i < asteroids.length; i++) {
        
        //Colisão entre a nave e os asteroids
        if (distanceBetweenTwoPoints(ship.coordinates.x, ship.coordinates.y, asteroids[i].coordinates.x, asteroids[i].coordinates.y) < ship.size / 4 + asteroids[i].size / 2) {
            explosion.isExploding = true
            explosionSound.play()
            explosion.coordinates.x = ship.coordinates.x
            explosion.coordinates.y = ship.coordinates.y

            //Ao bater contra um asteroid, se houver algum que esteja dentro de um raio de 300px do centro, este vai ser removido.(Vai ser criado outro automaticamente)
            for (let j = 0; j < asteroids.length; j++) {
                if (distanceBetweenTwoPoints(asteroids[j].coordinates.x, asteroids[j].coordinates.y, canvas.width / 2, canvas.height / 2) < 300) {
                    asteroids.splice(j, 1)
                }
            }

            if (lives == 1) {
                lives = 0
                isGameOver = true
            }
            if (lives > 0) {
                lives -= 1
                ship.velocity = 0
                ship.coordinates.x = canvas.width / 2
                ship.coordinates.y = canvas.height / 2
                drawShip()
            }
        }
    }

    //Colisão entre a nave e o alien
    if (aliens[0].isAlive) {
        if (distanceBetweenTwoPoints(ship.coordinates.x, ship.coordinates.y, aliens[0].coordinates.x, aliens[0].coordinates.y) < ship.size / 4 + aliens[0].size / 2) {
            if (lives == 1) {
                isGameOver = true
            }

            //Ao bater contra um alien, se houver algum que esteja dentro de um raio de 300px do centro, este vai ser removido.(Vai ser criado outro automaticamente)
            if (distanceBetweenTwoPoints(aliens[0].coordinates.x, aliens[0].coordinates.y, canvas.width / 2, canvas.height / 2) < 300) {
                aliens[0].isAlive = false;
            }

            //Ao bater contra um alien, se houver algum asteroid que esteja dentro de um raio de 300px do centro, este vai ser removido.(Vai ser criado outro automaticamente)
            for (let j = 0; j < asteroids.length; j++) {
                if (distanceBetweenTwoPoints(asteroids[j].coordinates.x, asteroids[j].coordinates.y, canvas.width / 2, canvas.height / 2) < 300) {
                    asteroids.splice(j, 1)
                }
            }

            explosion.isExploding = true
            explosion.coordinates.x = aliens[0].coordinates.x
            explosion.coordinates.y = aliens[0].coordinates.y
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

//Jogo terminado
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

//Fechar Pagina 
function quit() {
    window.close()
}

//Voltar a jogar 
//Reset ao jogo inteiro
function startAgain() {
    isGameOver = false
    scoreAlien = 1
    aliens[0].isAlive = false
    asteroids = []
    bullets = []
    lives = 3
    score = 0
    ship.velocity = 0
    ship.angle = 0
    ship.coordinates.x = canvas.width / 2
    ship.coordinates.y = canvas.height / 2
    isStartingAgain = true
    document.querySelector(".gameOver").style.visibility = "hidden"
    render()
}

//Voltar ao Menu (Reload á pagina)
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
            date: new Date()
        })
        drawBullets()
    }
    ship.isShooting = false
}

//Desenhar as balas no canvas
function drawBullets() {
    for (let i = 0; i < bullets.length; i++) {
        if (bullets[i]) {
            if (bullets[i].coordinates.x >= canvas.width + (bullets[i].size / 2)) {
                bullets[i].coordinates.x = (bullets[i].size / 2)

            }
            if (bullets[i].coordinates.y >= canvas.height + (bullets[i].size / 2)) {
                bullets[i].coordinates.y = (bullets[i].size / 2)

            }
            if (bullets[i].coordinates.x <= (-(bullets[i].size / 2))) {
                bullets[i].coordinates.x = canvas.width + (bullets[i].size / 2)
            }
            if (bullets[i].coordinates.y <= (-(bullets[i].size / 2))) {
                bullets[i].coordinates.y = canvas.height + (bullets[i].size / 2)
            }

            ctx.beginPath();
            ctx.arc(bullets[i].coordinates.x, bullets[i].coordinates.y, bullets[i].size / 2, 0, 2 * Math.PI);
            ctx.fillStyle = "orange"
            ctx.fill()
            bullets[i].coordinates.y += bullets[i].velocity * Math.sin(bullets[i].angle - Math.PI / 2)
            bullets[i].coordinates.x += bullets[i].velocity * Math.cos(bullets[i].angle - Math.PI / 2)
            ctx.closePath()

            //Index da bala que vai ser removida
            let idxFound = null

            //Colisão entre as balas e os asteroids
            for (let j = 0; j < asteroids.length; j++) {
                //Se a bala bater no asteroid, este vai ser removido do array
                if (distanceBetweenTwoPoints(bullets[i].coordinates.x, bullets[i].coordinates.y, asteroids[j].coordinates.x, asteroids[j].coordinates.y) < bullets[i].size / 4 + asteroids[j].size / 2) {
                    explosion.coordinates.x = asteroids[j].coordinates.x
                    explosion.coordinates.y = asteroids[j].coordinates.y
                    explosion.isExploding = true
                    asteroids.splice(j, 1)
                    idxFound = i
                    score += 200
                    shooted = false
                    break
                }
            }
            //Colisão entre as balas e o alien
            if (aliens[0].isAlive) {
                if (distanceBetweenTwoPoints(bullets[i].coordinates.x, bullets[i].coordinates.y, aliens[0].coordinates.x, aliens[0].coordinates.y) < bullets[i].size / 4 + aliens[0].size / 2) {
                    explosion.isExploding = true
                    explosion.coordinates.x = aliens[0].coordinates.x
                    explosion.coordinates.y = aliens[0].coordinates.y
                    bullets.splice(i, 1)
                    idxFound = i
                    aliens[0].isAlive = false
                    shooted = false
                    score += 500
                    break
                }
            }
            
            //Fazer as balas desaparecerem passados 2s
            if (new Date().getTime() - bullets[i].date.getTime() > 2000) {
                idxFound = i
            }

            //Vai buscar o index e remove a bala correspondente
            if (idxFound != null) {
                bullets.splice(idxFound, 1)
            }
        }
    }
}

//Key Press
function KeyPressed(e) {
    if (e.keyCode == 32 && canShoot == true) {
        ship.isShooting = true
        canShoot = false
        shoot()
        setTimeout(function () {
            canShoot = true
        }, 250)
        shootingSound.play()
    }

    if (e.key == "w" || e.key == "W") {
        ship.isMoving = true;
    }
    if (e.key == "a" || e.key == "A") {
        ship.isTurningLeft = true;
    }
    if (e.key == "d" || e.key == "D") {
        ship.isTurningRigth = true;
    }
}

//Key Release
function KeyReleased(e) {
    if (e.key == "w" || e.key == "W") {
        ship.img.src = shipSrc
        ship.isMoving = false;
    }
    if (e.key == "a" || e.key == "A") {
        ship.isTurningLeft = false;
    }
    if (e.key == "d" || e.key == "D") {
        ship.isTurningRigth = false;
    }
    if (e.keyCode == 32) {
        ship.isShooting = false
    }
}
window.addEventListener('keydown', KeyPressed);
window.addEventListener('keyup', KeyReleased)

//Retorna um numero aleatório 
function randomNumberBetween(min, max) {
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



//                                              Funções responsaveis pelo menu

let slideIndex = 1;
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
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

//Função que abre o menu Options
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

// Função para alterar o volume da musica 
function changeMusicVolume(volume) {
    initialMusic.volume = volume * 0.01
}

// Função para alterar o volume dos efeitos sonoros
function changeSoundVolume(volume) {
    explosionSound.volume= volume * 0.01
    shootingSound.volume= volume * 0.01
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

    //Desenhar os aliens no canvas
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

    //Desenhar a animação da explosão no canvas
    drawExplosion()

    //Se o utilizador perder, o render para
    if (!isGameOver) {
        requestAnimationFrame(render)
    }

    if (isStartingAgain) {
        isStartingAgain = false
        createAsteroid(8)
    }
}