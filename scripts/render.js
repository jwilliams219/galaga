MyGame.graphics = (function() {
    'use strict';

    let canvas = document.getElementById('id-canvas');
    let ctx = canvas.getContext('2d');

    function clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawTexture(image, center, rotation, size) {
        ctx.save();
        ctx.translate(center.x, center.y);
        ctx.rotate(rotation);
        ctx.translate(-center.x, -center.y);
        ctx.drawImage(
            image,
            center.x - size.width / 2,
            center.y - size.height / 2,
            size.width, size.height);
        ctx.restore();
    }

    function drawText(spec) {
        ctx.save();
        ctx.font = spec.font;
        ctx.fillStyle = spec.fillStyle;
        ctx.strokeStyle = spec.strokeStyle;
        ctx.textBaseline = 'top';
        ctx.translate(spec.position.x, spec.position.y);
        ctx.rotate(spec.rotation);
        ctx.translate(-spec.position.x, -spec.position.y);
        ctx.fillText(spec.text, spec.position.x, spec.position.y);
        ctx.strokeText(spec.text, spec.position.x, spec.position.y);
        ctx.restore();
    }

    function drawBackgroundStars(backgroundStars) {
        if (backgroundStars !== {}) {
            for (let i = 0; i < backgroundStars.stars.length; i++) {
                let star = backgroundStars.stars[i];
                if (star.sparkle) {
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.r, 0, 2*Math.PI, false);
                    ctx.fillStyle = "white";
                    ctx.fill();
                    ctx.stroke();
                }
            }
        }
    }

    function drawScore(stats) {
        drawText({ font: "32px Arial", fillStyle: "white", strokeStyle: "white", position: { x: 50, y: 50}, rotation: 0, text: "Score: "+stats.score});
        drawText({ font: "56px Arial", fillStyle: "hsl(0, 70%, 50%)", strokeStyle: "black", position: { x: canvas.width/2-140, y: 2}, rotation: 0, text: "High Score"});
        ctx.font = '42px Arial';
        const width = ctx.measureText(stats.highScore+"").width;
        drawText({ font: "42px Arial", fillStyle: "white", strokeStyle: "white", position: { x: canvas.width/2-(width/2), y: 65}, rotation: 0, text: stats.highScore});
    }

    function showCurrentStageBeginning(stage) {
        if (stage.showStageTimer > 0) {  
            if (stage.currentStage % 4 === 3) {
                drawText({ font: "52px Arial", fillStyle: "#0fe3d3", strokeStyle: "black", position: {x: canvas.width/2-180, y: canvas.height/2-50}, rotation: 0, text: "Challenging Stage"});
            } else {
                drawText({ font: "52px Arial", fillStyle: "#0fe3d3", strokeStyle: "black", position: {x: canvas.width/2-100, y: canvas.height/2-50}, rotation: 0, text: "Stage " + stage.currentStage});
            }
        }
    }

    function showStats(stats) {
        if (stats.showPlayerStats && !attractMode) {
            drawText({ font: "52px Arial", fillStyle: "#0fe3d3", strokeStyle: "black", position: {x: canvas.width/2-160, y: canvas.height/2-50}, rotation: 0, text: "Number of hits: " + stats.stage.hits});
        } else if (stats.showPlayerResults && !attractMode) {
            drawText({ font: "58px Arial", fillStyle: "hsl(0, 70%, 50%)", strokeStyle: "black", position: {x: canvas.width/2-100, y: canvas.height/2-150}, rotation: 0, text: "Results"});
            drawText({ font: "52px Arial", fillStyle: "#0fe3d3", strokeStyle: "black", position: {x: canvas.width/2-200, y: canvas.height/2-50}, rotation: 0, text: "Shots Fired: " + stats.totalTorpedosFired});
            drawText({ font: "52px Arial", fillStyle: "#0fe3d3", strokeStyle: "black", position: {x: canvas.width/2-200, y: canvas.height/2+50}, rotation: 0, text: "Number of hits: " + stats.totalHits});
            drawText({ font: "52px Arial", fillStyle: "white", strokeStyle: "black", position: {x: canvas.width/2-200, y: canvas.height/2+150}, rotation: 0, text: "Hit-Miss Ratio: " + (stats.totalHits/stats.totalTorpedosFired*100).toFixed(2) + "%"});
        }
    }

    function drawStage(stage) {
        showCurrentStageBeginning(stage);
        if (stage.currentStage < 5) {
            for (let i = 0; i < stage.currentStage; i++) {
                drawTexture(stage.badge1, { x: canvas.width - (i*32) - 16, y: canvas.height - 32}, 0, {width: 28, height: 60});
            } 
        } else if (stage.currentStage < 10) {
            for (let i = 0; i < stage.currentStage-4; i++) {
                if (i === stage.currentStage-5) { 
                    drawTexture(stage.badge5, { x: canvas.width - (i*32) - 16, y: canvas.height - 30}, 0, {width: 28, height: 56});
                } else {
                    drawTexture(stage.badge1, { x: canvas.width - (i*32) - 16, y: canvas.height - 26}, 0, {width: 28, height: 48});
                }
            } 
        } else if (stage.currentStage < 20) {
            drawTexture(stage.badge10, { x: canvas.width - 30, y: canvas.height - 30}, 0, {width: 52, height: 56});
        } else {
            drawTexture(stage.badge20, { x: canvas.width - 34, y: canvas.height - 34}, 0, {width: 60, height: 64});
        }
    }

    function drawLives(fighter) {
        if (fighter.lives === 3) {
            drawTexture(fighter.img, { x: fighter.size.width/2 + 10, y: canvas.height - fighter.size.height/2 - 5}, 0, fighter.size);
            drawTexture(fighter.img, { x: fighter.size.width*1.5 + 15, y: canvas.height - fighter.size.height/2 - 5}, 0, fighter.size);
        } else if (fighter.lives === 2) {
            drawTexture(fighter.img, { x: fighter.size.width/2 + 10, y: canvas.height - fighter.size.height/2 - 5}, 0, fighter.size);
        }
    }

    function drawEnemy(enemies, enemy) {
        let type = enemy.type;
        if (enemies[type].images[0].isReady) {
            let rotation = 0;
            let sprite = enemy.currentSprite;
            if (enemy.path.length === 0 && !enemy.diving) {
                sprite = enemies.formationSprite;
            }
            let size = enemies[type].size;
            if (sprite === 1) {
                size = enemies[type].size2;
            }
            if (type === "boss" && enemy.life === 1) { // Needs to be after the size adjustment statement
                sprite += 2;
            }
            if (enemy.path.length > 0 && enemy.path[0].length === 3) {
                rotation = enemy.path[0][2]*Math.PI/180;
            } else if (enemy.path.length === 0 && enemy.diving) {
                rotation = 180*Math.PI/180;
            }
            drawTexture(enemies[type].images[sprite], enemy.center, rotation, size);
        } 
    }

    function drawEnemies(enemies) {
        for (let i = 0; i < enemies.enemy.length; i++) {
            drawEnemy(enemies, enemies.enemy[i]);
        }
    }

    function drawFighter(fighter) {
        if (fighter.img.isReady && !fighter.dead) {
            drawTexture(fighter.img, fighter.center, 0, fighter.size);
        }
    }

    function drawTorpedos(torpedos) {
        if (torpedos.img1.isReady) {
            for (let i = 0; i < torpedos.friendly.length; i++) {
                let t = torpedos.friendly[i];
                drawTexture(torpedos.img1, t.center, 0, torpedos.size);
            }
        }
        if (torpedos.img2.isReady) {
            for (let i = 0; i < torpedos.enemy.length; i++) {
                let t = torpedos.enemy[i];
                let size = {width: torpedos.size.width*1.2, height: torpedos.size.height*1.2}
                drawTexture(torpedos.img2, t.center, 180*Math.PI/180, size);
            }
        }
    }

    function drawParticles(particles) {
        for (let i in particles.particle) {
            let p = particles.particle[i];
            let image = null;
            if (p.image === 'fire1') {
                image = particles.imgFire1;
            } else if (p.image === 'fire2') {
                image = particles.imgFire2;
            } else if (p.image === 'smoke') {
                image = particles.imgSmoke;
            } else if (p.image === "fireBlue") {
                image = particles.imgFireBlue;
            } else if (p.image === "fireGreen") {
                image = particles.imgFireGreen;
            } 
            if (image !== null && image.isReady) {
                drawTexture(image, p.center, p.rotation, p.size);
            }
        }
    }

    let api = {
        get canvas() { return canvas; },
        clear: clear,
        drawTexture: drawTexture,
        drawText: drawText,
        drawBackgroundStars: drawBackgroundStars,
        drawScore: drawScore,
        drawStage: drawStage,
        drawLives: drawLives,
        drawEnemies: drawEnemies,
        drawFighter: drawFighter,
        drawTorpedos: drawTorpedos,
        drawParticles: drawParticles,
        showStats: showStats,
    };

    return api;
}());
