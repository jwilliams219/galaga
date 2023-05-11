let attractMode = false;


MyGame.screens['main-menu'] = (function(game) {
    'use strict';

    let currentHighlightedValue;
    
    function initialize() {
        //
        // Setup each of menu events for the screens
        document.getElementById('id-new-game').addEventListener(
            'click',
            function() {
                game.showScreen('game-play'); 
                attractMode = false;
            });
        
        document.getElementById('id-high-scores').addEventListener(
            'click',
            function() { game.showScreen('high-scores'); });
        
        document.getElementById('id-help').addEventListener(
            'click',
            function() { game.showScreen('help'); });
        
        document.getElementById('id-about').addEventListener(
            'click',
            function() { game.showScreen('about'); });
    }

    function selectMenuOption() {
        if (currentHighlightedValue === "id-new-game") {
            game.showScreen('game-play');
            attractMode = false;
        } else if (currentHighlightedValue === "id-high-scores") {
            game.showScreen('high-scores');
        } else if (currentHighlightedValue === "id-help") {
            game.showScreen('help');
        } else if (currentHighlightedValue === "id-about") {
            game.showScreen('about');
        }
    }

    function menuDown() {
        if (currentHighlightedValue === "id-new-game") {
            document.getElementById("id-new-game").style.border = "0.1em solid rgb(0, 0, 0)";
            document.getElementById("id-high-scores").style.border = "0.1em solid #CECEF6";
            currentHighlightedValue = "id-high-scores";
        } else if (currentHighlightedValue === "id-high-scores") {
            document.getElementById("id-high-scores").style.border = "0.1em solid rgb(0, 0, 0)";
            document.getElementById("id-help").style.border = "0.1em solid #CECEF6";
            currentHighlightedValue = "id-help";
        } else if (currentHighlightedValue === "id-help") {
            document.getElementById("id-help").style.border = "0.1em solid rgb(0, 0, 0)";
            document.getElementById("id-about").style.border = "0.1em solid #CECEF6";
            currentHighlightedValue = "id-about";
        } else if (currentHighlightedValue === "id-about") {
            document.getElementById("id-about").style.border = "0.1em solid rgb(0, 0, 0)";
            document.getElementById("id-new-game").style.border = "0.1em solid #CECEF6";
            currentHighlightedValue = "id-new-game";
        }
    }

    function menuUp() {
        if (currentHighlightedValue === "id-new-game") {
            document.getElementById("id-new-game").style.border = "0.1em solid rgb(0, 0, 0)";
            document.getElementById("id-about").style.border = "0.1em solid #CECEF6";
            currentHighlightedValue = "id-about";
        } else if (currentHighlightedValue === "id-high-scores") {
            document.getElementById("id-high-scores").style.border = "0.1em solid rgb(0, 0, 0)";
            document.getElementById("id-new-game").style.border = "0.1em solid #CECEF6";
            currentHighlightedValue = "id-new-game";
        } else if (currentHighlightedValue === "id-help") {
            document.getElementById("id-help").style.border = "0.1em solid rgb(0, 0, 0)";
            document.getElementById("id-high-scores").style.border = "0.1em solid #CECEF6";
            currentHighlightedValue = "id-high-scores";
        } else if (currentHighlightedValue === "id-about") {
            document.getElementById("id-about").style.border = "0.1em solid rgb(0, 0, 0)";
            document.getElementById("id-help").style.border = "0.1em solid #CECEF6";
            currentHighlightedValue = "id-help";
        }
    }
    
    function run() {
        currentHighlightedValue = 'id-new-game';
        document.getElementById("id-new-game").style.border = "0.1em solid #CECEF6";
        document.getElementById("id-high-scores").style.border = "0.1em solid rgb(0, 0, 0)";
        document.getElementById("id-help").style.border = "0.1em solid rgb(0, 0, 0)";
        document.getElementById("id-about").style.border = "0.1em solid rgb(0, 0, 0)";

        document.getElementById('body').onkeyup = function(e) {
            if (game.getActiveScreen() !== "high-scores" && game.getActiveScreen() !== "game-play" && game.getActiveScreen() !== "help") {
                if (e.key === "ArrowDown") {
                    menuDown();
                } else if (e.key === "ArrowUp") {
                    menuUp();
                } else if (e.key === "Enter" && game.getActiveScreen() === "main-menu") {
                    selectMenuOption();
                } else if (e.key === "Enter") {
                    game.showScreen("main-menu");
                } else if (e.key === "Escape" && game.getActiveScreen() !== "main-menu") {
                    game.showScreen("main-menu");
                }
            }
        }

        let timer = setTimeout(function() {
            attractMode = true;
            game.showScreen("game-play");
            document.removeEventListener('mousedown', resetTimeout);
            document.removeEventListener('keydown', resetTimeout);
            document.removeEventListener('mousemove', resetTimeout);
        }, 90000);

        function resetTimeout() {
            clearTimeout(timer);
            timer = setTimeout(function() {
                if (game.getActiveScreen() === "main-menu") {
                    attractMode = true;
                    game.showScreen("game-play");
                }
                document.removeEventListener('mousedown', resetTimeout);
                document.removeEventListener('keydown', resetTimeout);
                document.removeEventListener('mousemove', resetTimeout);
            }, 90000);
        }
        
        document.addEventListener('mousedown', resetTimeout);
        document.addEventListener('keydown', resetTimeout);
        document.addEventListener('mousemove', resetTimeout);
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game));
