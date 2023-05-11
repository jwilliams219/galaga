'use strict';


function createEnemyDeathParticles(particles, enemies, enemy) {
    let particle = { 
        size: { mean: 7, stdev: 3 },
        speed: { mean: 200, stdev: 50 },
        lifetime: { mean: 350, stdev: 100 }}

    for (let i = 0; i < 20; i++) {
        let x = getRandomInt(enemy.center.x - enemies[enemy.type].size.width/2, enemy.center.x + enemies[enemy.type].size.width/2);
        let y = getRandomInt(enemy.center.y - enemies[enemy.type].size.height/2, enemy.center.y + enemies[enemy.type].size.height/2);
        let size = nextGaussian(particle.size.mean, particle.size.stdev);
        particles.particle.push( { 
            center: { x: x, y: y },
            size: { width: size, height: size },
            direction: nextCircleVector(),
            speed: nextGaussian(particle.speed.mean, particle.speed.stdev),
            rotation: 0,
            lifetime: nextGaussian(particle.lifetime.mean, particle.lifetime.stdev),
            alive: 0,
            image: "fire1"
        })
    }
    for (let i = 0; i < 20; i++) {
        let x = getRandomInt(enemy.center.x - enemies[enemy.type].size.width/2, enemy.center.x + enemies[enemy.type].size.width/2);
        let y = getRandomInt(enemy.center.y - enemies[enemy.type].size.height/2, enemy.center.y + enemies[enemy.type].size.height/2);
        let size = nextGaussian(particle.size.mean, particle.size.stdev);
        particles.particle.push( { 
            center: { x: x, y: y },
            size: { width: size, height: size },
            direction: nextCircleVector(),
            speed: nextGaussian(particle.speed.mean, particle.speed.stdev),
            rotation: 0,
            lifetime: nextGaussian(particle.lifetime.mean, particle.lifetime.stdev),
            alive: 0,
            image: "fire2"
        })
    }
    for (let i = 0; i < 20; i++) {
        let x = getRandomInt(enemy.center.x - enemies[enemy.type].size.width/2, enemy.center.x + enemies[enemy.type].size.width/2);
        let y = getRandomInt(enemy.center.y - enemies[enemy.type].size.height/2, enemy.center.y + enemies[enemy.type].size.height/2);
        let size = nextGaussian(particle.size.mean, particle.size.stdev);
        particles.particle.push( { 
            center: { x: x, y: y },
            size: { width: size, height: size },
            direction: nextCircleVector(),
            speed: nextGaussian(particle.speed.mean, particle.speed.stdev),
            rotation: 0,
            lifetime: nextGaussian(particle.lifetime.mean, particle.lifetime.stdev),
            alive: 0,
            image: "smoke"
        })
    }
}

function createPlayerDeathParticles(fighter, particles) {
    let particle = { 
        size: { mean: 8, stdev: 5 },
        speed: { mean: 150, stdev: 50 },
        lifetime: { mean: 1000, stdev: 200 }
    };
    for (let i = 0; i < 60; i++) {
        let x = getRandomInt(fighter.center.x - fighter.size.width/2-15, fighter.center.x + fighter.size.width/2+15);
        let y = getRandomInt(fighter.center.y - fighter.size.height/2+5, fighter.center.y + fighter.size.height/2+15);
        particles.particle.push( { 
            center: { x: x, y: y },
            size: { width: nextGaussian(particle.size.mean, particle.size.stdev), height: nextGaussian(particle.size.mean, particle.size.stdev) },
            direction: nextCircleVectorPositive(),
            speed: nextGaussian(particle.speed.mean, particle.speed.stdev),
            rotation: 0,
            lifetime: nextGaussian(particle.lifetime.mean, particle.lifetime.stdev),
            alive: 0,
            image: "fireBlue"
        })
    }
    for (let i = 0; i < 30; i++) {
        let x = getRandomInt(fighter.center.x - fighter.size.width/2-15, fighter.center.x + fighter.size.width/2+15);
        let y = getRandomInt(fighter.center.y - fighter.size.height/2+5, fighter.center.y + fighter.size.height/2+15);
        particles.particle.push( { 
            center: { x: x, y: y },
            size: { width: nextGaussian(particle.size.mean, particle.size.stdev), height: nextGaussian(particle.size.mean, particle.size.stdev) },
            direction: nextCircleVectorPositive(),
            speed: nextGaussian(particle.speed.mean, particle.speed.stdev),
            rotation: 0,
            lifetime: nextGaussian(particle.lifetime.mean, particle.lifetime.stdev),
            alive: 0,
            image: "fireGreen"
        })
    }
    for (let i = 0; i < 30; i++) {
        let x = getRandomInt(fighter.center.x - fighter.size.width/2-15, fighter.center.x + fighter.size.width/2+15);
        let y = getRandomInt(fighter.center.y - fighter.size.height/2+5, fighter.center.y + fighter.size.height/2+15);
        particles.particle.push( { 
            center: { x: x, y: y },
            size: { width: nextGaussian(particle.size.mean, particle.size.stdev), height: nextGaussian(particle.size.mean, particle.size.stdev) },
            direction: nextCircleVectorPositive(),
            speed: nextGaussian(particle.speed.mean, particle.speed.stdev),
            rotation: 0,
            lifetime: nextGaussian(particle.lifetime.mean, particle.lifetime.stdev),
            alive: 0,
            image: "fire2"
        })
    }
    for (let i = 0; i < 50; i++) {
        let x = getRandomInt(fighter.center.x - fighter.size.width/2-15, fighter.center.x + fighter.size.width/2+15);
        let y = getRandomInt(fighter.center.y - fighter.size.height/2+5, fighter.center.y + fighter.size.height/2+15);
        particles.particle.push( { 
            center: { x: x, y: y },
            size: { width: nextGaussian(particle.size.mean, particle.size.stdev), height: nextGaussian(particle.size.mean, particle.size.stdev) },
            direction: nextCircleVectorPositive(),
            speed: nextGaussian(particle.speed.mean, particle.speed.stdev),
            rotation: 0,
            lifetime: nextGaussian(particle.lifetime.mean, particle.lifetime.stdev),
            alive: 0,
            image: "smoke"
        })
    }
}

function updateParticles(particles, elapsedTime) {
    let remove  = [];
    
    for (let i = 0; i < particles.length; i++) {
        let particle = particles[i];
        particle.alive += elapsedTime;
        particle.center.x += (elapsedTime/1000 * particle.speed * particle.direction.x);
        particle.center.y += (elapsedTime/1000 * particle.speed * particle.direction.y);
        particle.rotation += particle.speed / 500;

        if (particle.alive > particle.lifetime) {
            remove.push(i);
        }
    }
    for (let i = remove.length-1; i > -1; i--) {
        particles.splice(remove[i], 1);
    }
    remove.length = 0;
}