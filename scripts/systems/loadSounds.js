MyGame.sounds = (function() {
    'use strict';

    function loadTheme() {
        let sound = new Audio();
        sound.isReady = false;
        sound.addEventListener('canplay', function() { sound.isReady = true; });
        sound.addEventListener('timeupdate', function(){ }, 
        sound.src = './sounds/Theme_Song.mp3');
        sound.volume = 0.2;
        return sound;
    }

    function loadTorpedo() {
        let sound = new Audio();
        sound.isReady = false;
        sound.addEventListener('canplay', function() { sound.isReady = true; });
        sound.addEventListener('timeupdate', function(){ }, 
        sound.src = './sounds/Firing_Sound.mp3');
        sound.volume = 0.2;
        return sound;
    }

    function loadDiving() {
        let sound = new Audio();
        sound.isReady = false;
        sound.addEventListener('canplay', function() { sound.isReady = true; });
        sound.addEventListener('timeupdate', function(){ }, 
        sound.src = './sounds/Flying_Enemy_Sound.mp3');
        sound.volume = 0.2;
        return sound;
    }

    function loadEnemyDeath() {
        let sound = new Audio();
        sound.isReady = false;
        sound.addEventListener('canplay', function() { sound.isReady = true; });
        sound.addEventListener('timeupdate', function(){ }, 
        sound.src = './sounds/Kill_Enemy_Sound.mp3');
        sound.volume = 0.2;
        return sound;
    }

    function loadBossHurt() {
        let sound = new Audio();
        sound.isReady = false;
        sound.addEventListener('canplay', function() { sound.isReady = true; });
        sound.addEventListener('timeupdate', function(){ }, 
        sound.src = './sounds/Boss_Hurt_Sound.mp3');
        sound.volume = 0.2;
        return sound;
    }

    function loadBossDeath() {
        let sound = new Audio();
        sound.isReady = false;
        sound.addEventListener('canplay', function() { sound.isReady = true; });
        sound.addEventListener('timeupdate', function(){ }, 
        sound.src = './sounds/Boss_Death_Sound.mp3');
        sound.volume = 0.2;
        return sound;
    }

    function loadPlayerDeath() {
        let sound = new Audio();
        sound.isReady = false;
        sound.addEventListener('canplay', function() { sound.isReady = true; });
        sound.addEventListener('timeupdate', function(){ }, 
        sound.src = './sounds/Player_Death.mp3');
        sound.volume = 0.2;
        return sound;
    }

    function loadLevel() {
        let sound = new Audio();
        sound.isReady = false;
        sound.addEventListener('canplay', function() { sound.isReady = true; });
        sound.addEventListener('timeupdate', function(){ }, 
        sound.src = './sounds/Level_Start.mp3');
        sound.volume = 0.2;
        return sound;
    }

    let api = {
        loadTheme: loadTheme,
        loadTorpedo: loadTorpedo,
        loadDiving: loadDiving,
        loadEnemyDeath: loadEnemyDeath,
        loadLevel: loadLevel,
        loadPlayerDeath: loadPlayerDeath,
        loadBossHurt: loadBossHurt,
        loadBossDeath: loadBossDeath,
    };

    return api;
}());
