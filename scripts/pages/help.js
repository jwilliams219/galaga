MyGame.screens['help'] = (function(game) {
    'use strict';

    let currentHighlightedValue;
    
    function initialize() {
        document.getElementById('id-help-back').addEventListener(
            'click',
            function() { game.showScreen('main-menu'); });
    }
    
    function run() {
        // Load the current options
        let options = LocalOptions.persistence.getOptions();
        let leftTextContent = '';
        let rightTextContent = '';
        let fireTextContent = '';
        for (let i = 0; i < options.length; i++) {
            if (options[i].action === "left") {
                leftTextContent += options[i].key;
            } else if (options[i].action === "right") {
                rightTextContent += options[i].key;
            } else if (options[i].action === "fire") {
                fireTextContent += options[i].key;
            }
        }
        if (leftTextContent === "ArrowLefta") {
            leftTextContent = "Left Arrow or A";
        } 
        if (rightTextContent === "ArrowRightd") {
            rightTextContent = "Right Arrow or D"
        } 
        if (fireTextContent === " ") {
            fireTextContent = "Spacebar"
        }
        moveLeftBtn = document.getElementById("move-left-btn");
        moveRightBtn = document.getElementById("move-right-btn");
        fireTorpedoBtn = document.getElementById("fire-torpedo-btn");

        if (moveLeftBtn !== null && moveRightBtn !== null && fireTorpedoBtn !== null) {
            moveLeftBtn.textContent = leftTextContent;
            moveRightBtn.textContent = rightTextContent;
            fireTorpedoBtn.textContent = fireTextContent;
        }

        // Menu Keyboard arrows
        currentHighlightedValue = 'id-help-back';
        document.getElementById("id-help-back").style.border = "0.1em solid #CECEF6";
        document.getElementById("resetOptions").style.border = "0.1em solid rgb(0, 0, 0)";

        document.getElementById('body').onkeyup = function(e) {
            if (game.getActiveScreen() === "help") {
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

    function selectMenuOption() {
        if (currentHighlightedValue === "resetOptions") {
            resetOptions();
        } else if (currentHighlightedValue === "id-help-back") {
            game.showScreen("main-menu");
        }
    }

    function menuDown() {
        if (currentHighlightedValue === 'id-help-back') {
            currentHighlightedValue = "resetOptions";
            document.getElementById("id-help-back").style.border = "0.1em solid rgb(0, 0, 0)";
            document.getElementById("resetOptions").style.border = "0.1em solid #CECEF6";
        } else {
            currentHighlightedValue = 'id-help-back';
            document.getElementById("id-help-back").style.border = "0.1em solid #CECEF6";
            document.getElementById("resetOptions").style.border = "0.1em solid rgb(0, 0, 0)";
        }
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game));


// Edit the options.
let moveLeftBtn = document.getElementById("move-left-btn");
let moveRightBtn = document.getElementById("move-right-btn");
let fireTorpedoBtn = document.getElementById("fire-torpedo-btn");
let torpedoLimitToggle = document.getElementById("torpedo-limit-toggle");

moveLeftBtn.addEventListener("click", makeEditable);
moveRightBtn.addEventListener("click", makeEditable);
fireTorpedoBtn.addEventListener("click", makeEditable);
torpedoLimitToggle.addEventListener("click", toggleTorpedoLimit);

function makeEditable(event) {
    const button = event.target;
    const currentId = button.id;
    const input = document.createElement("input");
    input.value = "";
    button.parentNode.replaceChild(input, button);
    input.select();
    input.addEventListener("keydown", (e) => {
        e.stopPropagation();
        if (e.key.length === 1 || e.key === "Escape") {
            makeNonEditable(e, currentId);
        }
    });
}

function makeNonEditable(e, id) {
    const input = e.target;
    const button = document.createElement("a");
    button.href = "#";
    button.innerText = e.key;
    if (input.parentNode.contains(input)) {
        input.parentNode.replaceChild(button, input);
    }
    button.addEventListener("click", makeEditable);
    button.id = id;

    if (id === "move-left-btn") {
        saveOption(e.key, "left");
    } else if (id === "move-right-btn") {
        saveOption(e.key, "right");
    } else if (id === "fire-torpedo-btn") {
        saveOption(e.key, "fire");
    }
}

function toggleTorpedoLimit(e) {
    LocalOptions.persistence.toggleTorpedoLimit();
}