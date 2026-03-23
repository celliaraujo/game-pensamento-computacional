const BOT = 'bot';
const TOP = 'top';
const RIGHT = 'right';
const LEFT = 'left';
const board = document.getElementById("board");


// Inserindo Player na fase

class Player{
    constructor(l,c){
        this.l = l;
        this.c = c;
        this.r = 0;
        this.rot = TOP;
        this.init = {
            l : l,
            c : c,
            r : 0,
            rot : TOP
        }
    }

    getPosition(){
        return this.l+''+this.c;
    }

    loadPlayer(){
        insertPlayer(this.l,this.c);
    };

    movePlayer(l,c){
        move(l, c);
        
    };

    realign(){
        realign(this.l, this.c);
    }

    forward(){
        if(this.rot == BOT){
            this.l++;
        }else
        if(this.rot == TOP){
            this.l--;
        }else
        if(this.rot == RIGHT){
            this.c++;
        }else
        if(this.rot == LEFT){
            this.c--;
        }
        move(this.l, this.c);
    };

    rotateLeft(){
        if(this.rot == BOT){
            this.rot = RIGHT; 
        }else
        if(this.rot == TOP){
            this.rot = LEFT;
        }else
        if(this.rot == RIGHT){
            this.rot = TOP;
        }else
        if(this.rot == LEFT){
            this.rot = BOT;
        }
        this.r--;
        rotate(this.r);
    };

    rotateRight(){
        if(this.rot == BOT){
            this.rot = LEFT; 
        }else
        if(this.rot == TOP){
            this.rot = RIGHT;
        }else
        if(this.rot == RIGHT){
            this.rot = BOT;
        }else
        if(this.rot == LEFT){
            this.rot = TOP;
        }
        this.r++;
        rotate(this.r);
    }

    resetPosition(){
        this.l = this.init.l;
        this.c = this.init.c;
        this.r = this.init.r;
        this.rot = this.init.rot;
        move(this.l, this.c);
        rotate(this.r);
    }
}

function insertPlayer(l,c) {    
    const startDiv = document.getElementById(`${l}${c}`);
    var player = document.createElement("div");
    player.classList.add("player");
    player.classList.add("transition-on");
    player.id = "player";
    player.style.width = getComputedStyle(startDiv).width;
    player.style.height = getComputedStyle(startDiv).height;
    player.style.left = getXBox(l,c);
    player.style.top = getYBox(l,c);
    board.appendChild(player);
}

function realign(l, c){
    const player = document.getElementById("player");
    const div = document.getElementById(`${l}${c}`);
    player.style.width = getComputedStyle(div).width;
    player.style.height = getComputedStyle(div).height;
    move(l, c);
}

function rotate(r){
    var player = document.getElementById("player");
    player.style.rotate = getDeg(r);
}

function move(l,c){
    const player = document.getElementById("player");
    player.style.left = getXBox(l,c);
    player.style.top = getYBox(l,c);
}

function getXBox(l,c){
    const box = document.getElementById(`${l}${c}`);
    return box.offsetLeft + "px";    
}

function getYBox(l,c){
    const box = document.getElementById(`${l}${c}`);
    return box.parentElement.offsetTop + "px";
}

function getDeg(r){
    return (r * 90 )+ 'deg';
}




export {Player};