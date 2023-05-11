'use strict';

let LocalOptions = {
    persistence: (function () {
        
        let torpedoLimit = false;
        let options = [];
        let previousOptions = localStorage.getItem('LocalSave.options');

        if (previousOptions !== null) {
            options = JSON.parse(previousOptions);
        } else {
            options = [
                { key: 'ArrowLeft', action: "left" },
                { key: 'a', action: "left" },
                { key: 'ArrowRight', action: "right" },
                { key: 'd', action: "right" },
                { key: ' ', action: "fire" }
            ];
            localStorage['LocalSave.options'] = JSON.stringify(options);
        }

        function addOption(key, action) {
            options.push({ key: key, action: action });
            localStorage['LocalSave.options'] = JSON.stringify(options);
        }

        function removeOption(action) {
            let remove = [];
            for (let i = 0; i < options.length; i++) {
                if (options[i].action === action) {
                    remove.push(i);
                }
            }
            for (let i = remove.length-1; i > -1; i--) {
                options.splice(remove[i], 1);
            }
            localStorage['LocalSave.options'] = JSON.stringify(options);
        }

        function getOptions() {
            return options;
        }

        function reset() {
            options = [
                { key: 'ArrowLeft', action: "left" },
                { key: 'a', action: "left" },
                { key: 'ArrowRight', action: "right" },
                { key: 'd', action: "right" },
                { key: ' ', action: "fire" }
            ];
            localStorage['LocalSave.options'] = JSON.stringify(options);
        }

        function getTorpedoLimit() {
            return torpedoLimit;
        }

        function toggleTorpedoLimit() {
            torpedoLimit = !torpedoLimit;
        }

        return {
            addOption: addOption,
            removeOption: removeOption,
            getOptions: getOptions,
            reset: reset,
            getTorpedoLimit: getTorpedoLimit,
            toggleTorpedoLimit: toggleTorpedoLimit,
        };
    }())
};

function saveOption(value, action) {
    LocalOptions.persistence.removeOption(action);
    LocalOptions.persistence.addOption(value, action);
}

function resetOptions() {
    LocalOptions.persistence.reset();
    MyGame.game.showScreen('main-menu');
}