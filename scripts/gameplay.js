MyGame.screens['game-play'] = (function(game, input, graphics, images, sounds) {
    'use strict';

    let canvas = document.getElementById('id-canvas');
    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;
    let quit = false;
    let myKeyboard = input.Keyboard();
    let backgroundStars = {};
    let fighter = {};
    let enemies = {};
    let torpedos = {};
    let stats = {};
    let particles = {};
    let sound = {};
    let ai = {};

    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    function update(elapsedTime) {
        updateTime(elapsedTime, stats, fighter);
        if (fighter.lives !== 0) {
            updateBackgroundStars(elapsedTime, backgroundStars);
            updateEnemies(elapsedTime, enemies, stats, torpedos, fighter, sound);
            updateTorpedos(elapsedTime, torpedos);
            updateFighterMobile(elapsedTime, fighter);
        }
        if (attractMode) {
            updateAI(elapsedTime, ai, fighter, enemies, torpedos, stats, sound);
            if (stats.stage.currentStage === 3) {
                endGame();
            }
        }
        checkCollisions(torpedos, fighter, enemies, stats, particles, sound);
        updateParticles(particles.particle, elapsedTime);
        checkEndStage(enemies, stats, fighter, elapsedTime, sound);
        if (fighter.lives === 0 && stats.endGameTimer <= 0) {
            endGame();
        }
    }

    function render() {
        graphics.clear();
        graphics.drawBackgroundStars(backgroundStars);
        graphics.drawScore(stats);
        graphics.drawLives(fighter);
        graphics.drawStage(stats.stage)
        graphics.drawEnemies(enemies);
        graphics.drawFighter(fighter);
        graphics.drawTorpedos(torpedos);
        graphics.drawParticles(particles);
        graphics.showStats(stats);
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;
        //console.log(elapsedTime);

        processInput(elapsedTime);
        update(elapsedTime);
        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    function initialize() {
        backgroundStars = { stars: [] };

        fighter = { lives: 3, img: images.loadFighter(), center: { x: 600, y: 1470 }, size: { width: 80, height: 80 }, dead: false, deadTimer: 0, 
            invulnerableTimer: 1000, mobileMoveVal: 50};

        torpedos = { friendly: [], enemy: [], img1: images.loadTorpedo1(), img2: images.loadTorpedo2(), size: {width: 15, height: 40}, noLimit: true};

        stats = { score: 0, totalTorpedosFired: 0, totalHits: 0, currentTime: 0, showPlayerStats: false, showPlayerResults: false, endGameTimer: 5000, 
            highScore: LocalScores.persistence.getHighScore()};
        stats.stage = {currentStage: 1, stageTime: 0, showStageTimer: 5000, torpedosFired: 0, hits: 0, endingStage: false, endingStageTimer: 500, 
            stageEnemies: getStage(1), badge1: images.loadBadge1(), badge5: images.loadBadge5(), badge10: images.loadBadge10(), badge20: images.loadBadge20(), 
            badge30: images.loadBadge30(), badge50: images.loadBadge50()}
        
        enemies = { enemy: [], divingTimer: 17000, 
            formationSprite: 0, formationSpriteCount: 500, formationLeftRight: 4, formationOffsetX: 0, formationOffsetBreath: 1, formationBreathOut: true,
            "bee": {size: {width: 54, height: 60}, size2: {width: 78, height: 60}, images: [images.loadBee1(), images.loadBee2()]},
            "butterfly": { size: {width: 54, height: 60}, size2: {width: 78, height: 60}, images: [images.loadButterfly1(), images.loadButterfly2()]},
            "boss": { size: {width: 90, height: 90}, size2: {width: 90, height: 96}, images: [images.loadFullBoss1(), images.loadFullBoss2(), images.loadHalfBoss1(), 
                images.loadHalfBoss2()]},
            "bonus1": { size: {width: 96, height: 78}, size2: {width: 78, height: 60}, images: [images.loadBonus1()]},
            "bonus2": { size: {width: 108, height: 90}, size2: {width: 78, height: 60}, images: [images.loadBonus2()]},
            "bonus3": { size: {width: 84, height: 96}, size2: {width: 78, height: 60}, images: [images.loadBonus3()]}};

        particles = { particle: [], imgSmoke: images.loadSmoke(), imgFire1: images.loadFire1(), imgFire2: images.loadFire2(), imgFireBlue: images.loadFireBlue(), 
            imgFireGreen: images.loadFireBlue() };
        
        sound = { theme: sounds.loadTheme(), diving: sounds.loadDiving(), enemyDeath: sounds.loadEnemyDeath(), levelStart: sounds.loadLevel(), 
            playerDeath: sounds.loadPlayerDeath(), bossHurt: sounds.loadBossHurt(), bossDeath: sounds.loadBossDeath(), fireTorpedo: [], fireTorpedoQueue: 0};
        for (let i = 0; i < 10; i++) {
            sound.fireTorpedo.push(sounds.loadTorpedo());
        }

        ai = { fireTimer: 5000 };

        myKeyboard.register('Escape', function() {
            quit = true;
            endGame();
        });
        canvas.addEventListener('click', function() { fireTorpedo(fighter, torpedos, stats, sound); });

        mobileSupport(fighter, torpedos, stats, sound);
    }

    function resetGame() {
        backgroundStars = { stars: [] };
        
        fighter.lives = 3;
        fighter.center = { x: 600, y: 1470 };
        fighter.dead = false;
        fighter.deadTime = 0;
        fighter.invulnerableTimer = 1000;
        torpedos.friendly = [];
        torpedos.enemy = [];

        stats.score = 0;
        stats.totalTorpedosFired = 0;
        stats.totalHits = 0;
        stats.currentTime = 0;
        stats.showPlayerStats = false;
        stats.showPlayerResults = false;
        stats.endGameTimer = 5000;
        stats.highScore = LocalScores.persistence.getHighScore();
        stats.stage.currentStage = 1;
        stats.stage.stageTime = 0;
        stats.stage.showStageTimer = 5000;
        stats.stage.torpedosFired = 0;
        stats.stage.hits = 0;
        stats.stage.endingStage = false;
        stats.stage.endingStageTimer = 500;
        stats.stage.stageEnemies = getStage(1);

        enemies.enemy = [];
        enemies.divingTimer = 17000;
        enemies.formationSprite = 0;
        enemies.formationSpriteCount = 500; 
        enemies.formationLeftRight = 4;
        enemies.formationOffsetX = 0;
        enemies.formationOffsetBreath = 1;
        enemies.formationBreathOut = true;
        particles.particle = [];
        ai = { fireTimer: 5000 };
    }

    function run() {
        if (!attractMode) {
            let options = LocalOptions.persistence.getOptions();
            stats.highScore = LocalScores.persistence.getHighScore();
            for (let i = 0; i < options.length; i++) {
                let option = options[i];
                if (option.action === "left") {
                    myKeyboard.register(option.key, function() { moveFighterLeft(fighter, 1); });
                } else if (option.action === "right") {
                    myKeyboard.register(option.key, function() { moveFighterRight(fighter, 1); });
                } else if (option.action === "fire") {
                    myKeyboard.register(option.key, function() { fireTorpedo(fighter, torpedos, stats, sound); });
                    myKeyboard.setFireKey(option.key);
                }
            }
            torpedos.noLimit = !LocalOptions.persistence.getTorpedoLimit();
            if (stats.stage.currentStage === 1) {
                let theme = sound.theme;
                if (theme.isReady) {
                    theme.play();
                }
            }
        } else {
            torpedos.noLimit = false;
            canvas.addEventListener('mousedown', endGame);            
            canvas.addEventListener('keydown', endGame);
            canvas.addEventListener('mousemove', endGame);
        }
        
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        quit = false;
        requestAnimationFrame(gameLoop);
    }

    function endGame() {
        cancelNextRequest = true;
        if (attractMode) {
            canvas.removeEventListener('mousedown', endGame);
            canvas.removeEventListener('keydown', endGame);
            canvas.removeEventListener('mousemove', endGame);
            attractMode = false;
            game.showScreen('main-menu');
        } else if (quit) {
            game.showScreen('main-menu');
        } else {
            saveScoreValue(stats.score);
            game.showScreen('high-scores');
        }
        resetGame();
    }

    return {
        initialize : initialize,
        run : run
    };

}(MyGame.game, MyGame.input, MyGame.graphics, MyGame.images, MyGame.sounds));
