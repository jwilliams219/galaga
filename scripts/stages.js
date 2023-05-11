'use strict';

function getStage1() {
    let stage1 = [
        { time: 5000, enemy: [
            { type: "butterfly", center: {x: 500, y: -100}, path: getSpawnPath("topLeft").concat([[550, 300]])},
            { type: "butterfly", center: {x: 500, y: -200}, path: getSpawnPath("topLeft").concat([[650, 300]])},
            { type: "butterfly", center: {x: 500, y: -300}, path: getSpawnPath("topLeft").concat([[550, 400]])},
            { type: "butterfly", center: {x: 500, y: -400}, path: getSpawnPath("topLeft").concat([[650, 400]])},
            { type: "bee", center: {x: 700, y: -100}, path: getSpawnPath("topRight").concat([[550, 500]])},
            { type: "bee", center: {x: 700, y: -200}, path: getSpawnPath("topRight").concat([[650, 500]])},
            { type: "bee", center: {x: 700, y: -300}, path: getSpawnPath("topRight").concat([[550, 600]])},
            { type: "bee", center: {x: 700, y: -400}, path: getSpawnPath("topRight").concat([[650, 600]])},
        ]},
        { time: 8000, enemy: [
            { type: "boss", center: {x: -100, y: 1200}, path: getSpawnPath("sideLeft").concat([[450, 200]])},
            { type: "butterfly", center: {x: -200, y: 1200}, path: getSpawnPath("sideLeft").concat([[450, 300]])},
            { type: "boss", center: {x: -300, y: 1200}, path: getSpawnPath("sideLeft").concat([[550, 200]])},
            { type: "butterfly", center: {x: -400, y: 1200}, path: getSpawnPath("sideLeft").concat([[450, 400]])},
            { type: "boss", center: {x: -500, y: 1200}, path: getSpawnPath("sideLeft").concat([[650, 200]])},
            { type: "butterfly", center: {x: -600, y: 1200}, path: getSpawnPath("sideLeft").concat([[750, 300]])},
            { type: "boss", center: {x: -700, y: 1200}, path: getSpawnPath("sideLeft").concat([[750, 200]])},
            { type: "butterfly", center: {x: -800, y: 1200}, path: getSpawnPath("sideLeft").concat([[750, 400]])},
        ]},
        { time: 11000, enemy: [
            { type: "butterfly", center: {x: 1300, y: 1200}, path: getSpawnPath("sideRight").concat([[250, 300]])},
            { type: "butterfly", center: {x: 1400, y: 1200}, path: getSpawnPath("sideRight").concat([[350, 300]])},
            { type: "butterfly", center: {x: 1500, y: 1200}, path: getSpawnPath("sideRight").concat([[850, 300]])},
            { type: "butterfly", center: {x: 1600, y: 1200}, path: getSpawnPath("sideRight").concat([[950, 300]])},
            { type: "butterfly", center: {x: 1700, y: 1200}, path: getSpawnPath("sideRight").concat([[250, 400]])},
            { type: "butterfly", center: {x: 1800, y: 1200}, path: getSpawnPath("sideRight").concat([[350, 400]])},
            { type: "butterfly", center: {x: 1900, y: 1200}, path: getSpawnPath("sideRight").concat([[850, 400]])},
            { type: "butterfly", center: {x: 2000, y: 1200}, path: getSpawnPath("sideRight").concat([[950, 400]])},
        ]},
        { time: 14000, enemy: [
            { type: "bee", center: {x: 700, y: -100}, path: getSpawnPath("topRight").concat([[350, 500]])},
            { type: "bee", center: {x: 700, y: -200}, path: getSpawnPath("topRight").concat([[450, 500]])},
            { type: "bee", center: {x: 700, y: -300}, path: getSpawnPath("topRight").concat([[750, 500]])},
            { type: "bee", center: {x: 700, y: -400}, path: getSpawnPath("topRight").concat([[850, 500]])},
            { type: "bee", center: {x: 700, y: -500}, path: getSpawnPath("topRight").concat([[350, 600]])},
            { type: "bee", center: {x: 700, y: -600}, path: getSpawnPath("topRight").concat([[450, 600]])},
            { type: "bee", center: {x: 700, y: -700}, path: getSpawnPath("topRight").concat([[750, 600]])},
            { type: "bee", center: {x: 700, y: -800}, path: getSpawnPath("topRight").concat([[850, 600]])},
        ]},
        { time: 17000, enemy: [
            { type: "bee", center: {x: 500, y: -100}, path: getSpawnPath("topLeft").concat([[150, 500]])},
            { type: "bee", center: {x: 500, y: -200}, path: getSpawnPath("topLeft").concat([[250, 500]])},
            { type: "bee", center: {x: 500, y: -300}, path: getSpawnPath("topLeft").concat([[950, 500]])},
            { type: "bee", center: {x: 500, y: -400}, path: getSpawnPath("topLeft").concat([[1050, 500]])},
            { type: "bee", center: {x: 500, y: -500}, path: getSpawnPath("topLeft").concat([[150, 600]])},
            { type: "bee", center: {x: 500, y: -600}, path: getSpawnPath("topLeft").concat([[250, 600]])},
            { type: "bee", center: {x: 500, y: -700}, path: getSpawnPath("topLeft").concat([[950, 600]])},
            { type: "bee", center: {x: 500, y: -800}, path: getSpawnPath("topLeft").concat([[1050, 600]])},
        ]},
    ];
    for (let i = 0; i < stage1.length; i++) {
        for (let j = 0; j < stage1[i].enemy.length; j++) {
            let enemy = stage1[i].enemy[j];
            if (enemy.type === "boss") { // Boss features
                enemy.life = 2;
            }

            // Enemy Identical features
            enemy.diving = false;
            enemy.fireTimer = 0;
            enemy.formationLocation = enemy.path[enemy.path.length-1];
            enemy.currentSprite = 0;
            enemy.spriteCount = Math.random() * 500;
        }
    }
    return stage1;
}

function getStage2() {
    let stage = [
        { time: 3000, enemy: [
            { type: "butterfly", center: {x: 700, y: -100}, path: getSpawnPath("topRight").concat([[550, 300]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 700, y: -200}, path: getSpawnPath("topRight").concat([[650, 300]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 700, y: -300}, path: getSpawnPath("topRight").concat([[550, 400]]), fireTimer: 0},
            { type: "butterfly", center: {x: 700, y: -400}, path: getSpawnPath("topRight").concat([[650, 400]]), fireTimer: 0},
            { type: "bee", center: {x: 500, y: -100}, path: getSpawnPath("topLeft").concat([[550, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 500, y: -200}, path: getSpawnPath("topLeft").concat([[650, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 500, y: -300}, path: getSpawnPath("topLeft").concat([[550, 600]]), fireTimer: 0},
            { type: "bee", center: {x: 500, y: -400}, path: getSpawnPath("topLeft").concat([[650, 600]]), fireTimer: 0},
        ]},
        { time: 5750, enemy: [
            { type: "boss", center: {x: -100, y: 1150}, path: getSpawnPath("sideLeft1").concat([[450, 200]]), fireTimer: 1000},
            { type: "butterfly", center: {x: -100, y: 1250}, path: getSpawnPath("sideLeft2").concat([[450, 300]]), fireTimer: 1000},
            { type: "boss", center: {x: -200, y: 1150}, path: getSpawnPath("sideLeft1").concat([[550, 200]]), fireTimer: 1000},
            { type: "butterfly", center: {x: -200, y: 1250}, path: getSpawnPath("sideLeft2").concat([[450, 400]]), fireTimer: 1000},
            { type: "boss", center: {x: -300, y: 1150}, path: getSpawnPath("sideLeft1").concat([[650, 200]]), fireTimer: 0},
            { type: "butterfly", center: {x: -300, y: 1250}, path: getSpawnPath("sideLeft2").concat([[750, 300]]), fireTimer: 0},
            { type: "boss", center: {x: -400, y: 1150}, path: getSpawnPath("sideLeft1").concat([[750, 200]]), fireTimer: 0},
            { type: "butterfly", center: {x: -400, y: 1250}, path: getSpawnPath("sideLeft2").concat([[750, 400]]), fireTimer: 0},
        ]},
        { time: 8500, enemy: [
            { type: "butterfly", center: {x: 1300, y: 1250}, path: getSpawnPath("sideRight1").concat([[250, 300]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 1300, y: 1150}, path: getSpawnPath("sideRight2").concat([[350, 300]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 1400, y: 1250}, path: getSpawnPath("sideRight1").concat([[850, 300]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 1400, y: 1150}, path: getSpawnPath("sideRight2").concat([[950, 300]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 1500, y: 1250}, path: getSpawnPath("sideRight1").concat([[250, 400]]), fireTimer: 0},
            { type: "butterfly", center: {x: 1500, y: 1150}, path: getSpawnPath("sideRight2").concat([[350, 400]]), fireTimer: 0},
            { type: "butterfly", center: {x: 1600, y: 1250}, path: getSpawnPath("sideRight1").concat([[850, 400]]), fireTimer: 0},
            { type: "butterfly", center: {x: 1600, y: 1150}, path: getSpawnPath("sideRight2").concat([[950, 400]]), fireTimer: 0},
        ]},
        { time: 11250, enemy: [ 
            { type: "bee", center: {x: 750, y: -100}, path: getSpawnPath("topRight1").concat([[350, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 650, y: -100}, path: getSpawnPath("topRight2").concat([[450, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 750, y: -200}, path: getSpawnPath("topRight1").concat([[750, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 650, y: -200}, path: getSpawnPath("topRight2").concat([[850, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 750, y: -300}, path: getSpawnPath("topRight1").concat([[350, 600]]), fireTimer: 0},
            { type: "bee", center: {x: 650, y: -300}, path: getSpawnPath("topRight2").concat([[450, 600]]), fireTimer: 0},
            { type: "bee", center: {x: 750, y: -400}, path: getSpawnPath("topRight1").concat([[750, 600]]), fireTimer: 0},
            { type: "bee", center: {x: 650, y: -400}, path: getSpawnPath("topRight2").concat([[850, 600]]), fireTimer: 0},
        ]},
        { time: 14000, enemy: [
            { type: "bee", center: {x: 550, y: -100}, path: getSpawnPath("topLeft1").concat([[150, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 450, y: -100}, path: getSpawnPath("topLeft2").concat([[250, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 550, y: -200}, path: getSpawnPath("topLeft1").concat([[950, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 450, y: -200}, path: getSpawnPath("topLeft2").concat([[1050, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 550, y: -300}, path: getSpawnPath("topLeft1").concat([[150, 600]]), fireTimer: 0},
            { type: "bee", center: {x: 450, y: -300}, path: getSpawnPath("topLeft2").concat([[250, 600]]), fireTimer: 0},
            { type: "bee", center: {x: 550, y: -400}, path: getSpawnPath("topLeft1").concat([[950, 600]]), fireTimer: 0},
            { type: "bee", center: {x: 450, y: -400}, path: getSpawnPath("topLeft2").concat([[1050, 600]]), fireTimer: 0},
        ]},
    ];
    for (let i = 0; i < stage.length; i++) {
        for (let j = 0; j < stage[i].enemy.length; j++) {
            let enemy = stage[i].enemy[j];
            if (enemy.type === "boss") { // Boss features
                enemy.life = 2;
            }

            // Enemy Identical features
            enemy.diving = false;
            enemy.formationLocation = enemy.path[enemy.path.length-1];
            enemy.currentSprite = 0;
            enemy.spriteCount = Math.random() * 500;
        }
    }
    return stage;
}

function getStage3() {
    let stage = [
        { time: 3000, enemy: [
            { type: "bee", center: {x: 750, y: -100}, path: getSpawnPath("topRightChallenge")},
            { type: "bee", center: {x: 750, y: -200}, path: getSpawnPath("topRightChallenge")},
            { type: "bee", center: {x: 750, y: -300}, path: getSpawnPath("topRightChallenge")},
            { type: "bee", center: {x: 750, y: -400}, path: getSpawnPath("topRightChallenge")},
            { type: "bee", center: {x: 450, y: -100}, path: getSpawnPath("topLeftChallenge")},
            { type: "bee", center: {x: 450, y: -200}, path: getSpawnPath("topLeftChallenge")},
            { type: "bee", center: {x: 450, y: -300}, path: getSpawnPath("topLeftChallenge")},
            { type: "bee", center: {x: 450, y: -400}, path: getSpawnPath("topLeftChallenge")},
        ]},
        { time: 5750, enemy: [
            { type: "boss", center: {x: -100, y: 1200}, path: getSpawnPath("sideLeftChallenge")},
            { type: "bee", center: {x: -200, y: 1200}, path: getSpawnPath("sideLeftChallenge")},
            { type: "boss", center: {x: -300, y: 1200}, path: getSpawnPath("sideLeftChallenge")},
            { type: "bee", center: {x: -400, y: 1200}, path: getSpawnPath("sideLeftChallenge")},
            { type: "boss", center: {x: -500, y: 1200}, path: getSpawnPath("sideLeftChallenge")},
            { type: "bee", center: {x: -600, y: 1200}, path: getSpawnPath("sideLeftChallenge")},
            { type: "boss", center: {x: -700, y: 1200}, path: getSpawnPath("sideLeftChallenge")},
            { type: "bee", center: {x: -800, y: 1200}, path: getSpawnPath("sideLeftChallenge")},
        ]},
        { time: 8500, enemy: [
            { type: "bee", center: {x: 1300, y: 1200}, path: getSpawnPath("sideRightChallenge")},
            { type: "bee", center: {x: 1400, y: 1200}, path: getSpawnPath("sideRightChallenge")},
            { type: "bee", center: {x: 1500, y: 1200}, path: getSpawnPath("sideRightChallenge")},
            { type: "bee", center: {x: 1600, y: 1200}, path: getSpawnPath("sideRightChallenge")},
            { type: "bee", center: {x: 1700, y: 1200}, path: getSpawnPath("sideRightChallenge")},
            { type: "bee", center: {x: 1800, y: 1200}, path: getSpawnPath("sideRightChallenge")},
            { type: "bee", center: {x: 1900, y: 1200}, path: getSpawnPath("sideRightChallenge")},
            { type: "bee", center: {x: 2000, y: 1200}, path: getSpawnPath("sideRightChallenge")},
        ]},          
        { time: 11250, enemy: [
            { type: "bee", center: {x: 750, y: -100}, path: getSpawnPath("topRightChallenge")},
            { type: "bee", center: {x: 750, y: -200}, path: getSpawnPath("topRightChallenge")},
            { type: "bee", center: {x: 750, y: -300}, path: getSpawnPath("topRightChallenge")},
            { type: "bee", center: {x: 750, y: -400}, path: getSpawnPath("topRightChallenge")},
            { type: "bee", center: {x: 750, y: -500}, path: getSpawnPath("topRightChallenge")},
            { type: "bee", center: {x: 750, y: -600}, path: getSpawnPath("topRightChallenge")},
            { type: "bee", center: {x: 750, y: -700}, path: getSpawnPath("topRightChallenge")},
            { type: "bee", center: {x: 750, y: -800}, path: getSpawnPath("topRightChallenge")},
        ]},
        { time: 14000, enemy: [
            { type: "bee", center: {x: 450, y: -100}, path: getSpawnPath("topLeftChallenge")},
            { type: "bee", center: {x: 450, y: -200}, path: getSpawnPath("topLeftChallenge")},
            { type: "bee", center: {x: 450, y: -300}, path: getSpawnPath("topLeftChallenge")},
            { type: "bee", center: {x: 450, y: -400}, path: getSpawnPath("topLeftChallenge")},
            { type: "bee", center: {x: 450, y: -500}, path: getSpawnPath("topLeftChallenge")},
            { type: "bee", center: {x: 450, y: -600}, path: getSpawnPath("topLeftChallenge")},
            { type: "bee", center: {x: 450, y: -700}, path: getSpawnPath("topLeftChallenge")},
            { type: "bee", center: {x: 450, y: -800}, path: getSpawnPath("topLeftChallenge")},
        ]},
    ];
    for (let i = 0; i < stage.length; i++) {
        for (let j = 0; j < stage[i].enemy.length; j++) {
            let enemy = stage[i].enemy[j];
            if (enemy.type === "boss") { // Boss features
                enemy.life = 2;
            }

            // Enemy Identical features
            enemy.diving = false;
            enemy.fireTimer = 0;
            enemy.formationLocation = enemy.path[enemy.path.length-1];
            enemy.currentSprite = 0;
            enemy.spriteCount = Math.random() * 500;
        }
    }
    return stage;
}

function getStage4() {
    let stage = [
        { time: 3000, enemy: [
            { type: "butterfly", center: {x: 500, y: -100}, path: getSpawnPath("topLeft").concat([[550, 300]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 500, y: -200}, path: getSpawnPath("topLeft").concat([[650, 300]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 500, y: -300}, path: getSpawnPath("topLeft").concat([[550, 400]]), fireTimer: 0},
            { type: "butterfly", center: {x: 500, y: -400}, path: getSpawnPath("topLeft").concat([[650, 400]]), fireTimer: 0},
            { type: "bee", center: {x: 700, y: -100}, path: getSpawnPath("topRight").concat([[550, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 700, y: -200}, path: getSpawnPath("topRight").concat([[650, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 700, y: -300}, path: getSpawnPath("topRight").concat([[550, 600]]), fireTimer: 0},
            { type: "bee", center: {x: 700, y: -400}, path: getSpawnPath("topRight").concat([[650, 600]]), fireTimer: 0},
        ]},
        { time: 5500, enemy: [
            { type: "boss", center: {x: -100, y: 1200}, path: getSpawnPath("sideLeft").concat([[450, 200]]), fireTimer: 1000},
            { type: "boss", center: {x: -200, y: 1200}, path: getSpawnPath("sideLeft").concat([[550, 200]]), fireTimer: 1000},
            { type: "boss", center: {x: -300, y: 1200}, path: getSpawnPath("sideLeft").concat([[650, 200]]), fireTimer: 0},
            { type: "boss", center: {x: -400, y: 1200}, path: getSpawnPath("sideLeft").concat([[750, 200]]), fireTimer: 0},
            { type: "butterfly", center: {x: 1300, y: 1200}, path: getSpawnPath("sideRight").concat([[450, 300]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 1400, y: 1200}, path: getSpawnPath("sideRight").concat([[450, 400]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 1500, y: 1200}, path: getSpawnPath("sideRight").concat([[750, 300]]), fireTimer: 0},
            { type: "butterfly", center: {x: 1600, y: 1200}, path: getSpawnPath("sideRight").concat([[750, 400]]), fireTimer: 0},
        ]},
        { time: 8000, enemy: [
            { type: "butterfly", center: {x: -100, y: 1200}, path: getSpawnPath("sideLeft").concat([[250, 300]]), fireTimer: 1000},
            { type: "butterfly", center: {x: -200, y: 1200}, path: getSpawnPath("sideLeft").concat([[350, 300]]), fireTimer: 1000},
            { type: "butterfly", center: {x: -300, y: 1200}, path: getSpawnPath("sideLeft").concat([[850, 300]]), fireTimer: 0},
            { type: "butterfly", center: {x: -400, y: 1200}, path: getSpawnPath("sideLeft").concat([[950, 300]]), fireTimer: 0},
            { type: "butterfly", center: {x: 1300, y: 1200}, path: getSpawnPath("sideRight").concat([[250, 400]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 1400, y: 1200}, path: getSpawnPath("sideRight").concat([[350, 400]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 1500, y: 1200}, path: getSpawnPath("sideRight").concat([[850, 400]]), fireTimer: 0},
            { type: "butterfly", center: {x: 1600, y: 1200}, path: getSpawnPath("sideRight").concat([[950, 400]]), fireTimer: 0},
        ]},
        { time: 10500, enemy: [
            { type: "bee", center: {x: 500, y: -100}, path: getSpawnPath("topLeft").concat([[350, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 500, y: -200}, path: getSpawnPath("topLeft").concat([[450, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 500, y: -300}, path: getSpawnPath("topLeft").concat([[750, 500]]), fireTimer: 0},
            { type: "bee", center: {x: 500, y: -400}, path: getSpawnPath("topLeft").concat([[850, 500]]), fireTimer: 0},
            { type: "bee", center: {x: 700, y: -100}, path: getSpawnPath("topRight").concat([[350, 600]]), fireTimer: 1000},
            { type: "bee", center: {x: 700, y: -200}, path: getSpawnPath("topRight").concat([[450, 600]]), fireTimer: 1000},
            { type: "bee", center: {x: 700, y: -300}, path: getSpawnPath("topRight").concat([[750, 600]]), fireTimer: 0},
            { type: "bee", center: {x: 700, y: -400}, path: getSpawnPath("topRight").concat([[850, 600]]), fireTimer: 0},
        ]},
        { time: 13000, enemy: [
            { type: "bee", center: {x: 500, y: -100}, path: getSpawnPath("topLeft").concat([[150, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 500, y: -200}, path: getSpawnPath("topLeft").concat([[250, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 500, y: -300}, path: getSpawnPath("topLeft").concat([[950, 500]]), fireTimer: 0},
            { type: "bee", center: {x: 500, y: -400}, path: getSpawnPath("topLeft").concat([[1050, 500]]), fireTimer: 0},
            { type: "bee", center: {x: 700, y: -100}, path: getSpawnPath("topRight").concat([[150, 600]]), fireTimer: 1000},
            { type: "bee", center: {x: 700, y: -200}, path: getSpawnPath("topRight").concat([[250, 600]]), fireTimer: 1000},
            { type: "bee", center: {x: 700, y: -300}, path: getSpawnPath("topRight").concat([[950, 600]]), fireTimer: 0},
            { type: "bee", center: {x: 700, y: -400}, path: getSpawnPath("topRight").concat([[1050, 600]]), fireTimer: 0},
        ]},
    ];
    for (let i = 0; i < stage.length; i++) {
        for (let j = 0; j < stage[i].enemy.length; j++) {
            let enemy = stage[i].enemy[j];
            if (enemy.type === "boss") { // Boss features
                enemy.life = 2;
            }

            // Enemy Identical features
            enemy.diving = false;
            enemy.formationLocation = enemy.path[enemy.path.length-1];
            enemy.currentSprite = 0;
            enemy.spriteCount = Math.random() * 500;
        }
    }
    return stage;
}

function getStage5() {
    let stage = [
        { time: 3000, enemy: [
            { type: "butterfly", center: {x: 700, y: -100}, path: getSpawnPath("topRight").concat([[550, 300]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 700, y: -200}, path: getSpawnPath("topRight").concat([[650, 300]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 700, y: -300}, path: getSpawnPath("topRight").concat([[550, 400]]), fireTimer: 0},
            { type: "butterfly", center: {x: 700, y: -400}, path: getSpawnPath("topRight").concat([[650, 400]]), fireTimer: 0},
            { type: "bee", center: {x: 500, y: -100}, path: getSpawnPath("topLeft").concat([[550, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 500, y: -200}, path: getSpawnPath("topLeft").concat([[650, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 500, y: -300}, path: getSpawnPath("topLeft").concat([[550, 600]]), fireTimer: 0},
            { type: "bee", center: {x: 500, y: -400}, path: getSpawnPath("topLeft").concat([[650, 600]]), fireTimer: 0},
        ]},
        { time: 5500, enemy: [
            { type: "boss", center: {x: -100, y: 1150}, path: getSpawnPath("sideLeft1").concat([[450, 200]]), fireTimer: 1000},
            { type: "butterfly", center: {x: -100, y: 1250}, path: getSpawnPath("sideLeft2").concat([[450, 300]]), fireTimer: 1000},
            { type: "boss", center: {x: -200, y: 1150}, path: getSpawnPath("sideLeft1").concat([[550, 200]]), fireTimer: 1000},
            { type: "butterfly", center: {x: -200, y: 1250}, path: getSpawnPath("sideLeft2").concat([[450, 400]]), fireTimer: 1000},
            { type: "boss", center: {x: -300, y: 1150}, path: getSpawnPath("sideLeft1").concat([[650, 200]]), fireTimer: 0},
            { type: "butterfly", center: {x: -300, y: 1250}, path: getSpawnPath("sideLeft2").concat([[750, 300]]), fireTimer: 0},
            { type: "boss", center: {x: -400, y: 1150}, path: getSpawnPath("sideLeft1").concat([[750, 200]]), fireTimer: 0},
            { type: "butterfly", center: {x: -400, y: 1250}, path: getSpawnPath("sideLeft2").concat([[750, 400]]), fireTimer: 0},
        ]},
        { time: 8000, enemy: [
            { type: "butterfly", center: {x: 1300, y: 1250}, path: getSpawnPath("sideRight1").concat([[250, 300]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 1300, y: 1150}, path: getSpawnPath("sideRight2").concat([[350, 300]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 1400, y: 1250}, path: getSpawnPath("sideRight1").concat([[850, 300]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 1400, y: 1150}, path: getSpawnPath("sideRight2").concat([[950, 300]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 1500, y: 1250}, path: getSpawnPath("sideRight1").concat([[250, 400]]), fireTimer: 0},
            { type: "butterfly", center: {x: 1500, y: 1150}, path: getSpawnPath("sideRight2").concat([[350, 400]]), fireTimer: 0},
            { type: "butterfly", center: {x: 1600, y: 1250}, path: getSpawnPath("sideRight1").concat([[850, 400]]), fireTimer: 0},
            { type: "butterfly", center: {x: 1600, y: 1150}, path: getSpawnPath("sideRight2").concat([[950, 400]]), fireTimer: 0},
        ]},
        { time: 10500, enemy: [
            { type: "bee", center: {x: 750, y: -100}, path: getSpawnPath("topRight1").concat([[350, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 650, y: -100}, path: getSpawnPath("topRight2").concat([[450, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 750, y: -200}, path: getSpawnPath("topRight1").concat([[750, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 650, y: -200}, path: getSpawnPath("topRight2").concat([[850, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 750, y: -300}, path: getSpawnPath("topRight1").concat([[350, 600]]), fireTimer: 0},
            { type: "bee", center: {x: 650, y: -300}, path: getSpawnPath("topRight2").concat([[450, 600]]), fireTimer: 0},
            { type: "bee", center: {x: 750, y: -400}, path: getSpawnPath("topRight1").concat([[750, 600]]), fireTimer: 0},
            { type: "bee", center: {x: 650, y: -400}, path: getSpawnPath("topRight2").concat([[850, 600]]), fireTimer: 0},
        ]},
        { time: 13000, enemy: [
            { type: "bee", center: {x: 550, y: -100}, path: getSpawnPath("topLeft1").concat([[150, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 450, y: -100}, path: getSpawnPath("topLeft2").concat([[250, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 550, y: -200}, path: getSpawnPath("topLeft1").concat([[950, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 450, y: -200}, path: getSpawnPath("topLeft2").concat([[1050, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 550, y: -300}, path: getSpawnPath("topLeft1").concat([[150, 600]]), fireTimer: 0},
            { type: "bee", center: {x: 450, y: -300}, path: getSpawnPath("topLeft2").concat([[250, 600]]), fireTimer: 0},
            { type: "bee", center: {x: 550, y: -400}, path: getSpawnPath("topLeft1").concat([[950, 600]]), fireTimer: 0},
            { type: "bee", center: {x: 450, y: -400}, path: getSpawnPath("topLeft2").concat([[1050, 600]]), fireTimer: 0},
        ]},
    ];
    for (let i = 0; i < stage.length; i++) {
        for (let j = 0; j < stage[i].enemy.length; j++) {
            let enemy = stage[i].enemy[j];
            if (enemy.type === "boss") { // Boss features
                enemy.life = 2;
            }

            // Enemy Identical features
            enemy.diving = false;
            enemy.formationLocation = enemy.path[enemy.path.length-1];
            enemy.currentSprite = 0;
            enemy.spriteCount = Math.random() * 500;
        }
    }
    return stage;
}

function getStage6() {
    let stage = [
        { time: 3000, enemy: [
            { type: "butterfly", center: {x: 500, y: -100}, path: getSpawnPath("topLeft").concat([[550, 300]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 500, y: -200}, path: getSpawnPath("topLeft").concat([[650, 300]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 500, y: -300}, path: getSpawnPath("topLeft").concat([[550, 400]]), fireTimer: 0},
            { type: "butterfly", center: {x: 500, y: -400}, path: getSpawnPath("topLeft").concat([[650, 400]]), fireTimer: 0},
            { type: "bee", center: {x: 700, y: -100}, path: getSpawnPath("topRight").concat([[550, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 700, y: -200}, path: getSpawnPath("topRight").concat([[650, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 700, y: -300}, path: getSpawnPath("topRight").concat([[550, 600]]), fireTimer: 0},
            { type: "bee", center: {x: 700, y: -400}, path: getSpawnPath("topRight").concat([[650, 600]]), fireTimer: 0},
        ]},
        { time: 5500, enemy: [
            { type: "boss", center: {x: -100, y: 1200}, path: getSpawnPath("sideLeft").concat([[450, 200]]), fireTimer: 1000},
            { type: "butterfly", center: {x: -200, y: 1200}, path: getSpawnPath("sideLeft").concat([[450, 300]]), fireTimer: 1000},
            { type: "boss", center: {x: -300, y: 1200}, path: getSpawnPath("sideLeft").concat([[550, 200]]), fireTimer: 0},
            { type: "butterfly", center: {x: -400, y: 1200}, path: getSpawnPath("sideLeft").concat([[450, 400]]), fireTimer: 0},
            { type: "boss", center: {x: -500, y: 1200}, path: getSpawnPath("sideLeft").concat([[650, 200]]), fireTimer: 1000},
            { type: "butterfly", center: {x: -600, y: 1200}, path: getSpawnPath("sideLeft").concat([[750, 300]]), fireTimer: 1000},
            { type: "boss", center: {x: -700, y: 1200}, path: getSpawnPath("sideLeft").concat([[750, 200]]), fireTimer: 0},
            { type: "butterfly", center: {x: -800, y: 1200}, path: getSpawnPath("sideLeft").concat([[750, 400]]), fireTimer: 0},
        ]},
        { time: 8000, enemy: [
            { type: "butterfly", center: {x: 1300, y: 1200}, path: getSpawnPath("sideRight").concat([[250, 300]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 1400, y: 1200}, path: getSpawnPath("sideRight").concat([[350, 300]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 1500, y: 1200}, path: getSpawnPath("sideRight").concat([[850, 300]]), fireTimer: 0},
            { type: "butterfly", center: {x: 1600, y: 1200}, path: getSpawnPath("sideRight").concat([[950, 300]]), fireTimer: 0},
            { type: "butterfly", center: {x: 1700, y: 1200}, path: getSpawnPath("sideRight").concat([[250, 400]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 1800, y: 1200}, path: getSpawnPath("sideRight").concat([[350, 400]]), fireTimer: 1000},
            { type: "butterfly", center: {x: 1900, y: 1200}, path: getSpawnPath("sideRight").concat([[850, 400]]), fireTimer: 0},
            { type: "butterfly", center: {x: 2000, y: 1200}, path: getSpawnPath("sideRight").concat([[950, 400]]), fireTimer: 0},
        ]},
        { time: 10500, enemy: [
            { type: "bee", center: {x: 700, y: -100}, path: getSpawnPath("topRight").concat([[350, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 700, y: -200}, path: getSpawnPath("topRight").concat([[450, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 700, y: -300}, path: getSpawnPath("topRight").concat([[750, 500]]), fireTimer: 0},
            { type: "bee", center: {x: 700, y: -400}, path: getSpawnPath("topRight").concat([[850, 500]]), fireTimer: 0},
            { type: "bee", center: {x: 700, y: -500}, path: getSpawnPath("topRight").concat([[350, 600]]), fireTimer: 1000},
            { type: "bee", center: {x: 700, y: -600}, path: getSpawnPath("topRight").concat([[450, 600]]), fireTimer: 1000},
            { type: "bee", center: {x: 700, y: -700}, path: getSpawnPath("topRight").concat([[750, 600]]), fireTimer: 0},
            { type: "bee", center: {x: 700, y: -800}, path: getSpawnPath("topRight").concat([[850, 600]]), fireTimer: 0},
        ]},
        { time: 13000, enemy: [
            { type: "bee", center: {x: 500, y: -100}, path: getSpawnPath("topLeft").concat([[150, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 500, y: -200}, path: getSpawnPath("topLeft").concat([[250, 500]]), fireTimer: 1000},
            { type: "bee", center: {x: 500, y: -300}, path: getSpawnPath("topLeft").concat([[950, 500]]), fireTimer: 0},
            { type: "bee", center: {x: 500, y: -400}, path: getSpawnPath("topLeft").concat([[1050, 500]]), fireTimer: 0},
            { type: "bee", center: {x: 500, y: -500}, path: getSpawnPath("topLeft").concat([[150, 600]]), fireTimer: 1000},
            { type: "bee", center: {x: 500, y: -600}, path: getSpawnPath("topLeft").concat([[250, 600]]), fireTimer: 1000},
            { type: "bee", center: {x: 500, y: -700}, path: getSpawnPath("topLeft").concat([[950, 600]]), fireTimer: 0},
            { type: "bee", center: {x: 500, y: -800}, path: getSpawnPath("topLeft").concat([[1050, 600]]), fireTimer: 0},
        ]},
    ];
    for (let i = 0; i < stage.length; i++) {
        for (let j = 0; j < stage[i].enemy.length; j++) {
            let enemy = stage[i].enemy[j];
            if (enemy.type === "boss") { // Boss features
                enemy.life = 2;
            }

            // Enemy Identical features
            enemy.diving = false;
            enemy.formationLocation = enemy.path[enemy.path.length-1];
            enemy.currentSprite = 0;
            enemy.spriteCount = Math.random() * 500;
        }
    }
    return stage;
}

function getStage7() {
    let stage = getStage3();

    for (let i = 0; i < stage.length; i++) {
        for (let j = 0; j < stage[i].enemy.length; j++) {
            let enemy = stage[i].enemy[j];
            if (enemy.type === "boss") { // Boss features
                enemy.life = 2;
            }

            // Enemy Identical features
            enemy.diving = false;
            enemy.fireTimer = false;
            enemy.formationLocation = enemy.path[enemy.path.length-1];
            enemy.currentSprite = 0;
            enemy.spriteCount = Math.random() * 500;
        }
    }
    return stage;
}

function getStage(stage) {
    let stageEnemies;
    if (stage === 1) {
        return getStage1();
    } else if (stage === 2) {
        return getStage2();
    } else if (stage === 3) {
        return getStage3();
    } else if (stage === 4) {
        return getStage4();
    } else if (stage === 5) {
        return getStage5();
    } else if (stage === 6) {
        return getStage6();
    } else if ((stage-3) % 4 === 0) {
        stageEnemies = getStage3();
    } else if ((stage-3) % 4 === 1) {
        stageEnemies = getStage4();
    } else if ((stage-3) % 4 === 2) {
        stageEnemies = getStage5();
    } else if ((stage-3) % 4 === 3) {
        stageEnemies = getStage6();
    } 
    for (let i = 0; i < stageEnemies.length; i++) {
        stageEnemies[i].time -= 500;
    }
    return stageEnemies;
}
