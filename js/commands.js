const popup = document.getElementById("commands-popup");
const popupMask = document.getElementById("popup");
const btnExecute = document.querySelector(".btn-execute");
const imgUrl = 'url(../imgs/';
const help = document.querySelector(".como-jogar");

var slotToAdd;

// Abre popup ao clicar em slot
function openPopup(slot) {
    if(btnExecute.disabled) return;
    slotToAdd = slot;
    if (popup.style.visibility == "") {
        popup.style.visibility = "visible";
        popupMask.style.visibility = "visible";
    }
}

function closePopup(){
    popup.style.visibility = "";
    popupMask.style.visibility = "";
}
function Help(){
    help.style.visibility = "visible";

}
function closeHelp(){
    help.style.visibility = "hidden";
}
    
function addCommand(btn) {
    var cmd = btn.id;

    if (cmd != 'btn-delete') {
        slotToAdd.classList.contains('cmd-btn') ? '' : slotToAdd.classList.add('cmd-btn');
        slotToAdd.style.backgroundImage = imgUrl + cmd + '.svg)';
    } else {
        slotToAdd.classList.contains('cmd-btn') ? slotToAdd.classList.remove('cmd-btn') : '';
        slotToAdd.style = '';
    }

    popup.style.visibility = "";
    popupMask.style.visibility = "";
}

function addColor(btn) {

    var cmd = btn.id;

    if (slotToAdd.style.backgroundImage.length == 0) return;

    if (cmd == "btn-blue") {
        slotToAdd.style.backgroundColor = "#8C7FBA";
    }
    if (cmd == "btn-green") {
        slotToAdd.style.backgroundColor = "#95C949";
    }
    if (cmd == "btn-red") {
        slotToAdd.style.backgroundColor = "#EC268F";
    }
    if (cmd == "btn-nocolor") {
        slotToAdd.style.backgroundColor = "";
    }

    popup.style.visibility = "";
    popupMask.style.visibility = "";
}

function clearCommandsHTML() {
    const commandList = document.getElementsByClassName("place-command");
    for (var i = 0; i <= commandList.length-1; i++) {
        commandList[i].style.backgroundImage = ""; 
        commandList[i].style.backgroundColor = "";  
    }
}

function fullScreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
}