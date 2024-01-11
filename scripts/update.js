"use strict";


function updateTime(elapsedTime, stats, fighter) {
    stats.currentTime += elapsedTime;
    stats.stage.stageTime += elapsedTime;
    stats.stage.showStageTimer -= elapsedTime;

    if (fighter.invulnerableTimer > 0) {
        fighter.invulnerableTimer -= elapsedTime;
    } else if (fighter.dead) {
        fighter.deadTimer -= elapsedTime;
        if (fighter.deadTimer < 0 && fighter.lives > 0) {
            fighter.invulnerableTimer = 1000;
            fighter.dead = false;
        }
    }
    if (stats.showPlayerResults === true) {
        stats.endGameTimer -= elapsedTime;
    }
}

function updateBackgroundStars(elapsedTime, backgroundStars) {
    if (Object.keys(backgroundStars).length !== 0) {
        let canvas = document.getElementById('id-canvas');
        // Update current stars.
        let remove = [];
        for (let i = 0; i < backgroundStars.stars.length; i++) {
            let star = backgroundStars.stars[i];
            star.y += canvas.height * (elapsedTime / 4000);
            if (Math.random() < 0.01) {
                star.sparkle = !star.sparkle;
            }
            if (star.y > canvas.height) {
                remove.push(i);
            }
        }
        for (let i = remove.length-1; i > -1; i--) {
            backgroundStars.stars.splice(remove[i], 1);
        }
        
        // Sometimes create new star.
        let createNewStar = Math.random() < elapsedTime / 50; // Aiming for about 20 new stars per second.
        if (createNewStar) {
            backgroundStars.stars.push( { x: getRandomInt(5, canvas.width-5), y: 0, r: getRandomInt(1, 7)/2, sparkle: true })
        }
    }
}

function spawnEnemies(stats, enemies) {
    let stageEnemies = stats.stage.stageEnemies;
    if (stageEnemies.length > 0) {
        let remove = [];
        for (let i = 0; i < stageEnemies.length; i++) {
            if (stageEnemies[i].time < stats.stage.stageTime) {
                for (let j = 0; j < stageEnemies[i].enemy.length; j++) {
                    enemies.enemy.push(stageEnemies[i].enemy[j]);
                }
                remove.push(i);
            }
        }
        for (let i = remove.length-1; i > -1; i--) {
            stageEnemies.splice(remove[i], 1);
        }
    }
}

function updateEnemy(elapsedTime, enemy, stats, enemies, torpedos, fighter) {

    // Update current sprite
    if (enemy.path.length !== 0 && (enemy.type === "bee" || enemy.type === "butterfly" || enemy.type === "boss")) {
        enemy.spriteCount -= elapsedTime;
        if (enemy.spriteCount < 0) {
            if (enemy.currentSprite === 0) {
                enemy.currentSprite = 1;
            } else if (enemy.currentSprite === 1) {
                enemy.currentSprite = 0;
            }
            enemy.spriteCount = 400;
        }
    } else if (enemy.path.length === 0 && !enemy.diving) {
        enemy.currentSprite = enemies.formationSprite;
    }

    // Fire torpedo
    if (enemy.fireTimer > 0) {
        enemy.fireTimer -= elapsedTime;
        if (enemy.fireTimer <= 0) {
            fireEnemyTorpedo(enemy, torpedos, fighter, elapsedTime);
        } 
    }

    // Update path
    if (enemy.path.length !== 0) {
        let speed = elapsedTime * (1+(stats.stage.currentStage/30));
        if (enemy.diving) {
            speed /= 2;
        }
        while (enemy.path.length !== 0 && speed !== 0) {
            let d = distance(enemy.center.x, enemy.center.y, enemy.path[0][0], enemy.path[0][1]);
            if (speed < d) {
                enemy.center = pointAtDistance(enemy.center.x, enemy.center.y, enemy.path[0][0], enemy.path[0][1], speed);
                speed = 0;
            } else {
                enemy.center = { x: enemy.path[0][0], y: enemy.path[0][1]}
                enemy.path.splice(0, 1);
                speed -= d;
            }
        }
        if (enemy.path.length === 1 && !enemy.diving) {
            enemy.path.push([enemy.formationLocation[0] + enemies.formationOffsetX, enemy.formationLocation[1]])
        }
    } else if (enemy.path.length === 0 && enemy.diving) {
        enemy.path = getDivePath(enemy);
    }

    // Update formation location
    else if (enemies.formationLeftRight > 0) {
        enemy.center.x = enemy.formationLocation[0] + enemies.formationOffsetX;
    } else if (enemies.formationLeftRight === 0) {
        let diffX = enemy.formationLocation[0] - 600;
        enemy.center.x = diffX*enemies.formationOffsetBreath + 600;
        let diffY = enemy.formationLocation[1] - 200;
        enemy.center.y = diffY*enemies.formationOffsetBreath + 200;
    }
}

function updateEnemyFormation(elapsedTime, enemies) {
    // Update the sprite for the whole formation.
    enemies.formationSpriteCount -= elapsedTime;
    if (enemies.formationSpriteCount < 0) {
        if (enemies.formationSprite === 0) {
            enemies.formationSprite = 1;
        } else if (enemies.formationSprite === 1) {
            enemies.formationSprite = 0;
        }
        enemies.formationSpriteCount = 500;
    }
    // Update the formation locations
    let speed = elapsedTime / 30;
    if (enemies.formationLeftRight > 0) {
        if (enemies.formationLeftRight % 2 === 0) {
            enemies.formationOffsetX += speed;
        } else {
            enemies.formationOffsetX -= speed;
        }
        if (enemies.formationOffsetX > 100) {
            enemies.formationOffsetX = 100;
            enemies.formationLeftRight -= 1;
        } else if (enemies.formationOffsetX < -100) {
            enemies.formationOffsetX = -100;
            enemies.formationLeftRight -= 1;
        } else if (enemies.formationLeftRight === 1 && enemies.formationOffsetX < 0) {
            enemies.formationOffsetX = 0;
            enemies.formationLeftRight = 0;
        }
    } else if (enemies.formationLeftRight === 0) {
        if (enemies.formationBreathOut) {
            enemies.formationOffsetBreath += speed/250;
            if (enemies.formationOffsetBreath > 1.2) {
                enemies.formationBreathOut = false;
            }
        } else {
            enemies.formationOffsetBreath -= speed/250;
            if (enemies.formationOffsetBreath < 1) {
                enemies.formationBreathOut = true;
            }
        }
    }
}

function updateEnemies(elapsedTime, enemies, stats, torpedos, fighter, sound) {
    updateEnemyFormation(elapsedTime, enemies)
    spawnEnemies(stats, enemies);
    for (let i = 0; i < enemies.enemy.length; i++ ) {
        updateEnemy(elapsedTime, enemies.enemy[i], stats, enemies, torpedos, fighter);
    }
    enemyDiving(elapsedTime, enemies, stats, sound);
}

function enemyDiving(elapsedTime, enemies, stats, sound) {
    if (stats.stage.currentStage % 4 !== 3) { // Don't dive during the challenging stages
        enemies.divingTimer -= elapsedTime;
    }
    if (enemies.divingTimer < 0) {
        let availableEnemies = [];
        for (let i = 0; i < enemies.enemy.length; i++) {
            let enemy = enemies.enemy[i];
            if (!enemy.diving && enemy.path.length === 0) {
                availableEnemies.push(enemy);
            }
        }
        if (availableEnemies.length > 1) {
            let a = getRandomInt(0, availableEnemies.length);
            let b = getRandomInt(0, availableEnemies.length);
            availableEnemies[a].path = getDivePath(availableEnemies[a]);
            availableEnemies[b].path = getDivePath(availableEnemies[b]);
            availableEnemies[a].fireTimer = 1000;
            availableEnemies[b].fireTimer = 1000;
            if (sound.diving.isReady && !attractMode) {
                sound.diving.play();
            }
        } else if (availableEnemies.length === 1) {
            availableEnemies[0].path = getDivePath(availableEnemies[0]);
            availableEnemies[0].fireTimer = 1000;
            if (sound.diving.isReady && !attractMode) {
                sound.diving.play();
            }
        }
        enemies.divingTimer = 3000;
    }
}

function updateTorpedos(elapsedTime, torpedos) {
    let canvas = document.getElementById('id-canvas');
    let speed = elapsedTime / 800 * canvas.height;

    let removeFriendly = [];
    for (let i = 0; i < torpedos.friendly.length; i++) {
        let t = torpedos.friendly[i];
        t.center.y -= speed;
        if (t.center.y < 0) {
            removeFriendly.push(i);
        }
    }
    for (let i = removeFriendly.length-1; i > -1; i--) {
        torpedos.friendly.splice(removeFriendly[i], 1);
    }

    let removeEnemy = [];
    for (let i = 0; i < torpedos.enemy.length; i++) {
        let t = torpedos.enemy[i];
        t.center.y += speed*2/5;
        t.center.x += t.xVel;
        if (t.center.y > canvas.height) {
            removeEnemy.push(i);
        }
    }
    for (let i = removeEnemy.length-1; i > -1; i--) {
        torpedos.enemy.splice(removeEnemy[i], 1);
    }
}

function fireEnemyTorpedo(enemy, torpedos, fighter, elapsedTime) {
    let canvas = document.getElementById("id-canvas");
    let xVel = 0;
    if (fighter.center.x < enemy.center.x) {
        xVel = -1 * elapsedTime / 800 / 15 * canvas.height;
    } else {
        xVel = elapsedTime / 800 / 15 * canvas.height;
    }
    torpedos.enemy.push({ center: {x: enemy.center.x, y: enemy.center.y}, xVel: xVel});
}

function fireTorpedo(fighter, torpedos, stats, sound) {
    if (!fighter.dead  && (torpedos.noLimit  || torpedos.friendly.length < 2)) {
        torpedos.friendly.push({ center: {x: fighter.center.x, y: fighter.center.y} });
        stats.stage.torpedosFired++;
        if (sound.fireTorpedo[sound.fireTorpedoQueue].isReady && !attractMode) {
            sound.fireTorpedo[sound.fireTorpedoQueue].play();
            sound.fireTorpedoQueue++;
            if (sound.fireTorpedoQueue > 9) {
                sound.fireTorpedoQueue = 0;
            }
        }
    }
}

function moveFighterLeft(fighter, value) {
    fighter.center.x -= 8 * value;
    if (fighter.center.x < fighter.size.width/2) {
        fighter.center.x = fighter.size.width/2;
    }
}

function moveFighterRight(fighter, value) {
    let canvas = document.getElementById('id-canvas');
    fighter.center.x += 8 * value;
    if (fighter.center.x + fighter.size.width/2 > canvas.width) {
        fighter.center.x = canvas.width - fighter.size.width/2;
    }
}

function checkCollisions(torpedos, fighter, enemies, stats, particles, sound) {
    if (fighter.invulnerableTimer <= 0 && !fighter.dead) {
        checkFighterCollision(torpedos, fighter, enemies, particles, sound);
    }
    checkEnemyCollision(torpedos, enemies, stats, particles, sound);
}

function checkFighterCollision(torpedos, fighter, enemies, particles, sound) {
    let enemyTorpedos = torpedos.enemy;
    let removeTorpedo = [];
    for (let i = 0; i < enemyTorpedos.length; i++) {
        let t = enemyTorpedos[i];
        let f = fighter;
        if (t.center.x < f.center.x+f.size.width/2 && t.center.x > f.center.x-f.size.width/2 && 
            t.center.y+torpedos.size.height/2 < f.center.y+f.size.height/2 && t.center.y+torpedos.size.height/2 > f.center.y-f.size.height/2+20) {
            if (!removeTorpedo.includes(i)) {
                removeTorpedo.push(i);
            }
            createPlayerDeathParticles(fighter, particles);
            loseLife(fighter);
            if (sound.playerDeath.isReady && !attractMode) {
                sound.playerDeath.play();
            }
        }
    }
    for (let i = removeTorpedo.length-1; i > -1; i--) {
        enemyTorpedos.splice(removeTorpedo[i], 1);
    }

    // Check for collision with an enemy.
    let removeEnemy = [];
    for (let i = 0; i < enemies.enemy.length; i++) {
        let e = enemies.enemy[i];
        if (e.center.x < fighter.center.x+fighter.size.width/2+20 && e.center.x > fighter.center.x-fighter.size.width/2-20 &&
            e.center.y < fighter.center.y+fighter.size.height/2+30 && e.center.y > fighter.center.y-fighter.size.height/2) {
            createPlayerDeathParticles(fighter, particles);
            loseLife(fighter);
            createEnemyDeathParticles(particles, enemies, e);
            if (sound.playerDeath.isReady && !attractMode) {
                sound.playerDeath.play();
            }
            removeEnemy.push(i);
        }
    }
    for (let i = removeEnemy.length-1; i > -1; i--) {
        enemies.enemy.splice(removeEnemy[i], 1);
    }
}

function checkEnemyCollision(torpedos, enemies, stats, particles, sound) {
    let friendlyTorpedos = torpedos.friendly;
    let removeTorpedo = [];
    let removeEnemy = [];
    for (let i = 0; i < friendlyTorpedos.length; i++) {
        let t = friendlyTorpedos[i];
        for (let j = 0; j < enemies.enemy.length; j++) {
            let e = enemies.enemy[j];
            if (t.center.x < e.center.x+enemies[e.type].size.width/2+6 && t.center.x > e.center.x-enemies[e.type].size.width/2-6 && 
                t.center.y-torpedos.size.height/2 < e.center.y+enemies[e.type].size.height/2 && t.center.y-torpedos.size.height/2 > e.center.y-enemies[e.type].size.height/2) {
                // Resolve a hit.
                if (!removeTorpedo.includes(i)) {
                    removeTorpedo.push(i);
                }
                if (!removeEnemy.includes(j)) {
                    if (e.type === "boss" && e.life === 2) {
                        e.life--;
                        if (sound.bossHurt.isReady && !attractMode) {
                            sound.bossHurt.play();
                        }
                    } else {
                        removeEnemy.push(j);
                        addScore(stats, e);
                        createEnemyDeathParticles(particles, enemies, e);
                        if (e.type === "boss" && sound.bossDeath.isReady && !attractMode) {
                            sound.bossDeath.play();
                        } else if (sound.enemyDeath.isReady && !attractMode) {
                            sound.enemyDeath.play();
                        }
                    }
                }
                stats.stage.hits++;
            }
        }
    }
    for (let i = removeTorpedo.length-1; i > -1; i--) {
        friendlyTorpedos.splice(removeTorpedo[i], 1);
    }
    for (let i = removeEnemy.length-1; i > -1; i--) {
        enemies.enemy.splice(removeEnemy[i], 1);
    }
}

function loseLife(fighter) {
    fighter.lives--;
    fighter.dead = true;
    fighter.deadTimer = 2000;
}

function addScore(stats, enemy) {
    if (enemy.type === "bee" && !enemy.diving) {
        stats.score += 50;
    } else if (enemy.type === "bee" && enemy.diving) {
        stats.score += 100;
    } else if (enemy.type === "butterfly" && !enemy.diving) {
        stats.score += 80;
    } else if (enemy.type === "butterfly" && enemy.diving) {
        stats.score += 160;
    } else if (enemy.type === "bonus1" || enemy.type === "bonus2" || enemy.type === "bonus3") {
        stats.score += 100;
    } else if (enemy.type === "boss" && !enemy.diving) {
        stats.score += 150;
    } else if (enemy.type === "boss" && enemy.diving) {
        stats.score += 400; // Diving along 400, diving with 1 escort 800, diving with 2 escorts 1600
    }
    // 1 group of enemies in 1st and 2nd Challenging Stages 	1000 
    // 1 group of enemies in 3rd and 4th Challenging Stages 	1500
    // 1 group of enemies in 5th and 6th Challenging Stages 	2000
    // 1 group of enemies in 7th and subsequent Challenging Stages 	3000
}

function checkEndStage(enemies, stats, fighter, elapsedTime, sound) {
    if (fighter.lives === 0 && fighter.deadTimer <= 0 && !stats.showPlayerResults) {
        stats.totalTorpedosFired += stats.stage.torpedosFired;
        stats.totalHits += stats.stage.hits;
        stats.showPlayerResults = true;
    }

    // Load the next stage.
    else if (stats.stage.stageEnemies.length === 0 && enemies.enemy.length === 0 && fighter.lives > 0) {
        if (!stats.stage.endStage) {
            if (stats.stage.currentStage % 4 === 3) {
                stats.stage.endStageTimer = 2000;
                stats.showPlayerStats = true;
            } else {
                stats.stage.endStageTimer = 500;
            }
            stats.totalTorpedosFired += stats.stage.torpedosFired;
            stats.totalHits += stats.stage.hits;
            stats.stage.endStage = true;
        } else {
            stats.stage.endStageTimer -= elapsedTime;
            if (stats.stage.endStageTimer < 0) { // Load new stage and reset the stage variables.
                stats.showPlayerStats = false;
                stats.stage.endStage = false;
                stats.stage.currentStage += 1;
                stats.stage.showStageTimer = 2000;
                stats.stage.torpedosFired = 0;
                stats.stage.hits = 0;
                stats.stage.stageTime = 0;
                stats.stage.stageEnemies = getStage(stats.stage.currentStage);
                enemies.divingTimer = 15000;
                enemies.formationSpriteCount = 500;
                enemies.formationLeftRight = 4;
                enemies.formationOffsetX = 0;
                enemies.formationOffsetBreath = 1;
                enemies.formationBreathOut = true;
                if (sound.levelStart.isReady && !attractMode) {
                    sound.levelStart.play();
                }
            }
        }
    } else if (stats.stage.currentStage % 4 === 3 && stats.stage.stageTime > 17000) {
        enemies.enemy = [];
    }
}

function updateAI(elapsedTime, ai, fighter, enemies, torpedos, stats, sound) {
    let moveSpeed = elapsedTime / 2;

    ai.fireTimer -= elapsedTime;
    if (ai.fireTimer < 0 && enemies.enemy.length !== 0) {
        ai.fireTimer = 200;
        fireTorpedo(fighter, torpedos, stats, sound);
    }

    if (enemies.enemy.length !== 0) {
        let e = enemies.enemy[0];
        if (e.center.x < fighter.center.x) {
            fighter.center.x -= moveSpeed;
        } else if (e.center.x > fighter.center.x) {
            fighter.center.x += moveSpeed;
        }
    }
}

function mobileSupport(fighter, torpedos, stats, sound) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.getElementById("game").style.height = "130vw";
        document.getElementById("game").style.width = "98vw";
        document.getElementById("game").style.margin = "4vh 0 4vh 0";
        let mobileControls = document.getElementById("mobile-controls");
        mobileControls.style.visibility = "visible";
        var slider = document.getElementById("mobile-movement");
        var start;
        slider.addEventListener("touchstart", function(event) {
            start = event.touches[0].clientX;
        });

        slider.addEventListener("touchmove", function(event) {
            var current = event.touches[0].clientX;
            var delta = current - start;
            var value = parseInt(slider.value) + delta;
            if (value < slider.min) {
                value = slider.min;
            } else if (value > slider.max) {
                value = slider.max;
            }
            slider.value = value;
            start = current;
        });

        slider.addEventListener("input", function() {
            fighter.mobileMoveVal = slider.value;
        });

        slider.addEventListener("touchend", function(event) {
            slider.value = 50;
            fighter.mobileMoveVal = 50;
        });

        let fireButton = document.getElementById("mobile-fire");
        fireButton.addEventListener("touchstart", function(event) {
            if (stats.currentTime > 0) {
                fireTorpedo(fighter, torpedos, stats, sound);
            }
        });
    } 
}

function updateFighterMobile(elapsedTime, fighter) {
    if (fighter.mobileMoveVal < 50) {
        moveFighterLeft(fighter, (1-(fighter.mobileMoveVal/50))*elapsedTime/6);
    } else if (fighter.mobileMoveVal > 50) {
        moveFighterRight(fighter, ((fighter.mobileMoveVal-50)/50)*elapsedTime/6)
    }
}
