MyGame.screens['high-scores'] = (function(game) {
    'use strict';

    let currentHighlightedValue;
    
    function initialize() {
        document.getElementById('id-high-scores-back').addEventListener(
            'click',
            function() { game.showScreen('main-menu'); });
        
        LocalScores.persistence.report(); // Load the local high-scores
    }

    function selectMenuOption() {
        if (currentHighlightedValue === "id-reset-high-scores") {
            resetHighScores();
        } else if (currentHighlightedValue === "id-high-scores-back") {
            game.showScreen("main-menu");
        }
    }

    function menuDown() {
        if (currentHighlightedValue === 'id-high-scores-back') {
            currentHighlightedValue = "id-reset-high-scores";
            document.getElementById("id-high-scores-back").style.border = "0.1em solid rgb(0, 0, 0)";
            document.getElementById("id-reset-high-scores").style.border = "0.1em solid #CECEF6";
        } else {
            currentHighlightedValue = 'id-high-scores-back';
            document.getElementById("id-high-scores-back").style.border = "0.1em solid #CECEF6";
            document.getElementById("id-reset-high-scores").style.border = "0.1em solid rgb(0, 0, 0)";
        }
    }
    
    function run() {
        currentHighlightedValue = 'id-high-scores-back';
        document.getElementById("id-high-scores-back").style.border = "0.1em solid #CECEF6";
        document.getElementById("id-reset-high-scores").style.border = "0.1em solid rgb(0, 0, 0)";

        document.getElementById('body').onkeyup = function(e) {
            if (game.getActiveScreen() === "high-scores") {
                if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                    menuDown();
                } else if (e.key === "Enter") {
                    selectMenuOption();
                }  else if (e.key === "Escape") {
                    game.showScreen("main-menu");
                }
            }
        }
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game));
