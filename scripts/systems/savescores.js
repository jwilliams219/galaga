'use strict';

let LocalScores = {
    persistence : (function () {
        let highScores = { "0": 20000, "1": 0, "2": 0, "3": 0, "4": 0 };
        let previousScores = localStorage.getItem('LocalSave.highScores');

        if (previousScores !== null) {
            highScores = JSON.parse(previousScores);
        } else {
            localStorage['LocalSave.highScores'] = JSON.stringify(highScores);
        }

        function add(value) {
            let key = 0;
            while (highScores[key + ''] !== undefined) {
                key +=1;
            }
            
            highScores[key] = value;
            
            if (Object.keys(highScores).length > 5) {
                let smallestScoreKey = -1;
                let smallestScore = Infinity;
                for (key in highScores) {
                    if (highScores[key] < smallestScore) {
                        smallestScore = highScores[key];
                        smallestScoreKey = key;
                    }
                }
                this.remove(smallestScoreKey);
            }
            
            localStorage['LocalSave.highScores'] = JSON.stringify(highScores);
        }

        function remove(key) {
            delete highScores[key];
            localStorage['LocalSave.highScores'] = JSON.stringify(highScores);
        }

        function reset() {
            highScores = { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0 };
            localStorage['LocalSave.highScores'] = JSON.stringify(highScores);
        }

        function report() {
            let htmlNode = document.getElementById('high-score-list');
            let scores = [];
            htmlNode.innerHTML = '';
            for (let key in highScores) {
                scores.push(highScores[key]);
            }
            scores = scores.sort(function (a, b) {  return b - a;  });
            for (let score in scores) {
                htmlNode.innerHTML += (scores[score] + '<br/>');
            }
            htmlNode.scrollTop = htmlNode.scrollHeight;
        }

        function getHighScore() {
            let highScore = 0;
            for (let i in highScores) {
                if (highScores[i] > highScore) {
                    highScore = highScores[i];
                }
            }
            return highScore;
        }

        return {
            add : add,
            remove : remove,
            report : report,
            reset : reset,
            getHighScore: getHighScore,
        };
    }())
};

function saveScoreValue(value) {
    LocalScores.persistence.add(value);
    LocalScores.persistence.report();
}

function resetHighScores() {
    LocalScores.persistence.reset();
    LocalScores.persistence.report();
}