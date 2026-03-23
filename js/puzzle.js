const puzzles = await fetch('../js/puzzles.json').then((response) => response.json());

const boardDiv = document.getElementById("board");
const comandosDiv = document.getElementById("commands");
var boardStatus = false;

console.log(puzzles);

//--- Criação de Board ---

class Puzzle{
    constructor(level){
        this.level = puzzles[level]['level'];
        this.size = puzzles[level]['size'];
        this.blue = puzzles[level]['xy']['blue'];
        this.green = puzzles[level]['xy']['green'];
        this.red = puzzles[level]['xy']['red'];
        this.stars = puzzles[level]['xy']['star'];
        this.start = puzzles[level]['xy']['start'];
        this.bars = puzzles[level]['functions'];
        this.commands = puzzles[level]['commands'];
    }  
    loadBoard(){
        createBoard(this.size, this.blue, this.green, this.red, this.stars, this.start);
        insertCommandBars(this.bars);
    };
    resetStar(){
        resetStars();
    }
    clearPuzzle(){
        clearAllPuzzle() ;
    }  
}

export{Puzzle};

function resetStars(){
    const starsPuzzle = document.querySelectorAll(".star");
    starsPuzzle.forEach(star => {
        if(star.classList.contains("star-effect")){
            star.classList.remove("star-effect");
        }
    });
}

function clearAllPuzzle(){
    boardDiv.innerHTML = "";
    comandosDiv.innerHTML = "";
}

function createBoard(puzzleSize, blue, green, red, stars, start) {
    insertArray(puzzleSize);
    blueSquares(blue);
    greenSquares(green);
    redSquares(red);
    if(boardStatus) {
        insertStars(stars);
    }
     

}

function insertArray(puzzleSize){
    for (var l = 0; l < puzzleSize; l++) {
        var line = document.createElement("div");
        for (var c = 0; c < puzzleSize; c++) {
            var square = document.createElement("div");
            square.classList.add("box");
            square.id = `${l + 1}${c + 1}`;
            line.appendChild(square);
        }
        line.classList.add("line");
        boardDiv.appendChild(line);
    }
    boardStatus = true;
}

function blueSquares(blue){
    // Transformação dos boxes azuis
    if (blue != null) {
        for (var x = 0; x < blue.length; x++) {
            var box = document.getElementById(blue[x]);
            box.classList.add("box-blue");
        }
    }
}

function greenSquares(green){
    // Transformação dos boxes verdes 
    if (green != null) {
        for (var x = 0; x < green.length; x++) {
            var box = document.getElementById(green[x]);
            box.classList.add("box-green");
        }
    }
}

function redSquares(red){
    // Transformação dos boxes vermelhos 
    if (red != null) {
        for (var x = 0; x < red.length; x++) {
            var box = document.getElementById(red[x]);
            box.classList.add("box-red");
        }
    }
}

function insertStars(stars){
    // Inserção de estrelas
    if(stars != null){
        for (var x = 0; x < stars.length; x++) {
              var box = document.getElementById(stars[x]);
            var starDiv = document.createElement("div");
            starDiv.classList.add('star');
            box.appendChild(starDiv);
        }
    }
}

// Criando barras de programações
function insertCommandBars(bars){
    for (var x = 0; x < bars; x++) {
        var novaBarra = document.createElement("div");
        novaBarra.classList.add("command-bar");
        novaBarra.id = `p${x + 1}`;
        var texto = document.createElement("h1");
        texto.textContent = `P${x + 1}`;
        novaBarra.appendChild(texto);
        for (var i = 0; i < 6; i++) {
            var slotDiv = document.createElement("div");
            slotDiv.classList.add("place-command");
            slotDiv.setAttribute('onclick', 'openPopup(this)');
            novaBarra.appendChild(slotDiv);
        }
        comandosDiv.appendChild(novaBarra);
    
    }
}

