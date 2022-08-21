

// board
var blockSize = 25
var rows = 20
var cols = 20
var board
var context

// snake head
var snakeX = blockSize * 5
var snakeY = blockSize * 5

var velocityX = 0
var velocityY = 0

var snakeBody = []

// food

var foodX
var foodY

var gameOver = false

window.onload = function () {
    board = document.getElementById('board')
    board.height = rows * blockSize
    board.width = cols * blockSize
    context = board.getContext('2d')

    placeFood()
    document.addEventListener('keyup', changeDirection)
    // update()
    setInterval(update, 1000 / 10) // 100 ms
}

function update() {

    if (gameOver){
        return
    }



    context.fillStyle = 'black'
    // define a cor do "pincel" 
    context.fillRect(0, 0, board.width, board.height)
    // preenche um retangulo do ponto 00 até o ponto máximo de height e width

    context.fillStyle = 'red'
    context.fillRect(foodX, foodY, blockSize, blockSize)

    // no compreendo
    if (snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY])
        placeFood()
    }

    // no compreendo
    for (let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1]
    }

    // no compreendo
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY]
    }

    context.fillStyle = 'lime'
    snakeX += velocityX * blockSize
    snakeY += velocityY * blockSize
    context.fillRect(snakeX, snakeY, blockSize, blockSize)
    // preenche o ponto em que a cobra se encontra sendo a width e height do preenchimento igual
    // o tamanho do bloco em si 

    //  não entendi esse for mesmo
    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    //game over condition
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize){
        gameOver = true
        alert("Game Over")
    }
    for(let i = 0; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true
            alert("Game Over")
        }
    }

}

function changeDirection(e) {
    // o event listener passa o this com o code
    // velocityY = 1 significa que está indo para baixo, logo é fisicamente impossivel ir para cima
    // a ! significa que pare ser true e executar é necessário que não velocityX não seja 1
    if (e.code == "ArrowUp" && velocityY != 1) { 
        velocityX = 0
        velocityY = -1
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0
        velocityY = 1
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1
        velocityY = 0
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1
        velocityY = 0
    }
}

function placeFood() {
    // (0 - 1) * cols -> (0 - 19.9999) -> (0 - 19) * 25 
    foodX = Math.floor(Math.random() * cols) * blockSize
    // random retorna número entre 0 e 1 vezes o número de colunas e arredonda para baixo 
    // suponto que retorne 15(0.75*20), ele faz vez o tamanho do bloco para saber onde fica 15
    foodY = Math.floor(Math.random() * rows) * blockSize
}

