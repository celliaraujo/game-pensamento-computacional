import { Puzzle } from "../js/puzzle.js";
import { Player } from "../js/player.js";
import { Status } from "../js/game-status.js";

const BLUE = "rgb(140, 127, 186)";
const RED = "rgb(236, 38, 143)";
const GREEN = "rgb(149, 201, 73)";
const som_POINT = new Audio('sounds/point.mp3');
const som_ERROR = new Audio('sounds/wrong.mp3');
const som_WIN = new Audio('sounds/win.mp3');
const btnExecute = document.querySelector(".btn-execute");
const btnClear = document.querySelector(".btn-clear");
const btnStop = document.querySelector(".btn-stop");
const winPopup = document.querySelector(".tela-msg");

var novoPuzzle;
var player;
var level = 0;
var star = 0;
var stopCommands = false;
var gameStatus;
var score = 0;

novoPuzzle = new Puzzle(level);
gameStatus = new Status();

loadGame();

function loadGame() {
    gameStatus.updateLevel(level + 1);
    star = 0;
    novoPuzzle.clearPuzzle();
    novoPuzzle = new Puzzle(level);
    novoPuzzle.loadBoard();
    player = new Player(novoPuzzle.start[0], novoPuzzle.start[1]);
    player.loadPlayer();
}

function resetGame() {
    star = 0;
    novoPuzzle.resetStar();
    player.resetPosition();
}

function endGame(){
    location.href = "./index.html";
}

btnExecute.addEventListener('click', async () => {
    btnExecute.disabled = true;
    btnClear.disabled = true;
    stopCommands = false;
    execute()
        .catch(
            (error) => {
                console.log(error)
                som_ERROR.play();
                resetGame();
            }
        ).finally(async () => {
            btnExecute.disabled = false;
            btnClear.disabled = false;
        })
});

async function execute() { //Executa a primeira lista de comandos
    const p1 = document.querySelectorAll('#p1 .cmd-btn');
    await runCommandList(p1);

    if (Win()) {
        await delay(1);
        updateScore();
        showWinScreen();
        level++;
        loadGame();
    }
    else {
        if (!stopCommands) som_ERROR.play();
        resetGame();
    }
}

async function runCommandList(list) { //Executa cada lista de comando recebida
    for (let cmd = 0; cmd < list.length; cmd++) {
        const style = list[cmd].style
        const color = getColor(style.backgroundColor);
        const move = style.backgroundImage;
        console.log(`color = ${color}`);

        if (move.length == 0 || !canMove(player.getPosition(), color)) continue;
        if (stopCommands) return;

        await executeMove(move);
        if(await invalidBox(player.getPosition())){
            return;
        }
        if (Win()) break;
    }
}

async function executeMove(move) { // executa movimento ou chama outra lista
    if (move.includes('up')) {
        player.forward();
        await delay(0.3);
        checkStar(player.getPosition());
        await delay(0.4);
    }
    else if (move.includes('left')) {
        player.rotateLeft();
        await delay(0.4);
    }
    else if (move.includes('right')) {
        player.rotateRight();
        await delay(0.4);
    }
    else if (move.includes('p1')) {
        const p1 = document.querySelectorAll('#p1 .cmd-btn');
        await runCommandList(p1);
    }
    else if (move.includes('p2')) {
        const p2 = document.querySelectorAll('#p2 .cmd-btn');
        await runCommandList(p2);
    }
    else if (move.includes('p3')) {
        const p3 = document.querySelectorAll('#p3 .cmd-btn');
        await runCommandList(p3);
    }
    else if (move.includes('p4')) {
        const p4 = document.querySelectorAll('#p4 .cmd-btn');
        await runCommandList(p4);
    }
}

function getColor(color) {
    switch (color) {
        case BLUE: return 'blue';
        case GREEN: return 'green';
        case RED: return 'red';
        default: return 'nocolor';
    }
}

function canMove(id, color) {
    var box = document.getElementById(id);
    if (box.classList.contains('box-' + color) || color == 'nocolor') {
        return true;
    }
}

async function invalidBox(id) {
    var box = document.getElementById(id);
    let invalidBox = box.className == "box";
    return invalidBox;
}

function checkStar(boxId) {
    var box = document.getElementById(boxId);
    if (box.childElementCount > 0 &&
        !box.childNodes[0].classList.contains("star-effect")) {
        box.childNodes[0].classList.toggle("star-effect");
        star++;
        som_POINT.load();
        som_POINT.play();
    }
}

function updateScore() {
    const commandCount = document.getElementsByClassName('cmd-btn').length;
    if (commandCount == novoPuzzle.commands) {
        score += 1000;
    } else if (commandCount > novoPuzzle.commands) {
        score += 1000 - ((commandCount - novoPuzzle.commands) * 50);
    } else {
        score += 1000 + 500;
    }
    gameStatus.updateScore(score);
}

function Win() {
    return star == novoPuzzle.stars.length;
}

async function showWinScreen() {
    som_WIN.play();
    winPopup.style.visibility = "visible";
    await delay(4);
    winPopup.style.visibility = "hidden";
    if(level == 4){
        endGame();
    }
}

btnStop.addEventListener('click', function () {
    stopCommands = true;
});

//Utilities

window.onresize = resize;

async function resize() {
    var playerOnBoard = document.getElementById("player");

    if (playerOnBoard.classList.contains('transition-on')) {
        playerOnBoard.classList.remove('transition-on');
    }
    player.realign();
    await delay(1)
    if (!playerOnBoard.classList.contains('transition-on')) {
        playerOnBoard.classList.add('transition-on');
    }
}

function delay(sec) {
    return new Promise(resolve => setTimeout(resolve, (sec * 1000)));
}

function log(functionName, ...args) {
    var timestamp = new Date();
    console.log(timestamp.toLocaleTimeString() + ' ' + timestamp.getMilliseconds() + ' f= ' + functionName + ' param= ' + args);
}