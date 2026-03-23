function executeMoveLeftTest() {
    //given
    player.r = 0;
    player.rot = 'bottom';

    //when
    executeMove('url(../imgs/btn-turn-right.svg)');

    //then
    if (player.r == -1 && player.rot == 'left') {
        return 'passed';
    }
    else {
        console.log('executeMoveLeftTest')
        console.log('player.r: expected: -1, actual: ' + player.r);
        console.log('player.rot: expected: left, actual: ' + player.rot);
        return 'failed';
    }
}

console.log(executeMoveLeftTest());