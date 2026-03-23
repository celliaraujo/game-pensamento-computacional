const levelTxt = document.querySelector(".level-text");
const scoreTxt = document.querySelector(".score-text");

class Status{
    constructor(){
        this.level = 1;
        this.score = 0;
    }

    updateLevel(level){
        levelTxt.innerHTML = level;
        this.level = level;
    }

    updateScore(score){
        scoreTxt.innerHTML = score;
        this.score = score;
    }
}

export{Status};
