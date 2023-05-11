MyGame.screens['about'] = (function(game) {
    'use strict';
    
    function initialize() {
        document.getElementById('id-about-back').addEventListener(
            'click',
            function() { game.showScreen('main-menu'); });
    }
    
    function run() {
        document.getElementById("id-about-back").style.border = "0.1em solid #CECEF6";
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game));
