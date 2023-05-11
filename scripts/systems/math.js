"use strict";


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max - min) + min);
}

function nextDouble() {
    return Math.random();
}

function nextRange(min, max) {
    let range = max - min;
    return Math.floor((Math.random() * range) + min);
}

function nextCircleVector() {
    let angle = Math.random() * 2 * Math.PI;
    return {
        x: Math.cos(angle),
        y: Math.sin(angle)
    };
}

function nextCircleVectorPositive() {
    let angle = getRandomInt(25, 75)/100 * Math.PI;
    return {
        x: Math.cos(angle),
        y: Math.sin(angle)
    };
}

function nextGaussian(mean, stdDev) {
    let x1 = 0;
    let x2 = 0;
    let y1 = 0;
    let z = 0;

    do {
        x1 = 2 * Math.random() - 1;
        x2 = 2 * Math.random() - 1;
        z = (x1 * x1) + (x2 * x2);
    } while (z >= 1);
    
    z = Math.sqrt((-2 * Math.log(z)) / z);
    y1 = x1 * z;
    
    return mean + y1 * stdDev;
}

function distance(x1, y1, x2, y2) {
    const xDistance = x2 - x1;
    const yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function pointAtDistance(x1, y1, x2, y2, distance) {
    const totalDistance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const ratio = distance / totalDistance;
    const newX = x1 + (x2 - x1) * ratio;
    const newY = y1 + (y2 - y1) * ratio;
    return { x: newX, y: newY };
}

function angleBetweenPoints(x1, y1, x2, y2) {
    const xDiff = x2 - x1;
    const yDiff = y2 - y1;
    return Math.atan2(yDiff, xDiff) * 180 / Math.PI + 90; // For canvas case
}
