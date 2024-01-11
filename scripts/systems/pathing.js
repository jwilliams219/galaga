"use strict";


function parallelPathPoints(distance, point) {
    var theta = -1*(point[2] - 90) * Math.PI / 180;
    var dx = distance * Math.cos(theta);
    var dy = distance * Math.sin(theta);
    var point1 = [point[0] - dy, point[1] - dx, point[2]];
    var point2 = [point[0] + dy, point[1] + dx, point[2]];
    return [point1, point2];
}

function getSpawnPath(path) {
    // Path points [x, y, rotation(degree)]
    let paths = {
        "topRight": [[700, -100, 180], [700, 100, 180], [100, 700, 225], 
            [100, 750, 180], [110, 812, 170], [138, 868, 160], [182, 912, 140], [238, 940, 117], [300, 950, 100], [361, 940, 80], [418, 912, 60], [461, 867, 40], [490, 812, 20], [500, 750, 0], 
            [500, 650, 0]], // topRight
        "topLeft": [[500, -100, 180], [500, 100, 180], [1100, 700, 135], 
            [1100, 750, 180], [1090, 812, 190], [1062, 868, 200], [1018, 912, 220], [962, 940, 240], [900, 950, 260], [838, 940, 280], [782, 912, 300], [738, 867, 320], [710, 812, 340], [700, 750, 0], 
            [700, 650, 0]], // topLeft
        "sideLeft": [[-100, 1200, 90], [175, 1200, 80], [235, 1170, 70], [285, 1130, 60], [335, 1080, 50], [395, 1020, 40], [450, 940, 25], [500, 850, 10], 
            [500, 750, 0], [490, 688, 340], [462, 632, 320], [418, 588, 300], [362, 560, 280], [300, 550, 260], [238, 560, 240], [182, 588, 220], [138, 632, 200], [110, 688, 180], 
            [100, 750, 180], [110, 812, 170], [138, 868, 160], [182, 912, 140], [238, 940, 120], [300, 950, 100], [361, 940, 80], [418, 912, 60], [461, 867, 40], [490, 812, 20], [500, 750, 0], 
            [500, 550, 0]], // sideLeft
        "sideRight": [[1300, 1200, 270], [1025, 1200, 280], [965, 1170, 290], [915, 1130, 300], [865, 1080, 310], [805, 1020, 320], [750, 940, 335], [700, 850, 350], 
            [700, 750, 0], [710, 688, 20], [738, 632, 40], [782, 588, 60], [838, 560, 80], [900, 550, 100], [962, 560, 120], [1018, 588, 140], [1062, 632, 160], [1090, 688, 180], 
            [1100, 750, 180], [1090, 812, 190], [1062, 868, 200], [1018, 912, 220], [962, 940, 240], [900, 950, 260], [838, 940, 280], [782, 912, 300], [738, 867, 320], [710, 812, 340], [700, 750, 0], 
            [700, 550, 0]], // sideRight

        "topRightChallenge": [[750, -100, 180], [750, 300, 180], 
            [461, 1067, 202], [418, 1112, 224], [361, 1140, 244], [300, 1150, 260], [238, 1140, 279], [182, 1112, 297], [138, 1068, 315], [110, 1012, 333], [100, 950, 352],
            [110, 888, 9], [138, 832, 27], [182, 788, 45], [1400, 400, 72]],
        "topLeftChallenge": [[450, -100, 180], [450, 300, 180], 
            [739, 1067, 158], [782, 1112, 136], [839, 1140, 116], [900, 1150, 100], [962, 1140, 81], [1018, 1112, 63], [1062, 1068, 45], [1090, 1012, 27], [1100, 950, 8],
            [1090, 888, -9], [1062, 832, -27], [1018, 788, -45], [-200, 400, -72]],
        "sideLeftChallenge": [[-100, 1200, 90], [200, 1200, 90], [300, 1185, 81], [400, 1158, 75], [450, 1140, 65], [500, 1096, 58], [600, 1010, 49], 
            [700, 900, 42], [725, 866, 35], [750, 800, 27], [760, 760, 20], [775, 700, 14], [770, 690, 5], [765, 680, -7], [760, 670, -12], [755, 660, -19], 
            [750, 650, -27], [735, 625, -30], [725, 615, -45], [715, 602, -37], [708, 601, -60], [700, 600, -86], [690, 601, -94], [680, 604, -107], [665, 624, -121], 
            [650, 650, -136], [625, 700, -153], [610, 750, -160], [600, 800, 191], [601, 820, 178], [604, 840, 171], [610, 860, 163], [650, 960, 158], [670, 980, 140], [690, 990, 126],
            [700, 1000, 116], [710, 998, 90], [725, 990, 80], [750, 970, 70], [775, 940, 60], [800, 900, 50], [1400, 300, 45]],
        "sideRightChallenge": [[1300, 1200, -90], [1000, 1200, -90], [900, 1185, -81], [800, 1158, -75], [750, 1140, -65], [700, 1096, -58], [600, 1010, -49], 
            [500, 900, -42], [475, 866, -35], [450, 800, -27], [440, 760, -20], [425, 700, -14], [430, 690, -5], [435, 680, 7], [440, 670, 12], [445, 660, 19], 
            [450, 650, 27], [465, 625, 30], [475, 615, 45], [485, 602, 37], [492, 601, 60], [500, 600, 86], [510, 601, 94], [520, 604, 107], [535, 624, 121], 
            [550, 650, 136], [575, 700, 153], [590, 750, 160], [600, 800, -191], [599, 820, -178], [596, 840, -171], [590, 860, -163], [550, 960, -158], [530, 980, -140], [510, 990, -126],
            [500, 1000, -116], [490, 998, -90], [475, 990, -80], [450, 970, -70], [425, 940, -60], [400, 900, -50], [-200, 300, -45]],
    }
    let parallelDistance = 50;

    if (path === "topRight") {
        return paths.topRight;
    } else if (path === "topLeft") {
        return paths.topLeft;
    } else if (path === "sideLeft") {
        return paths.sideLeft;
    } else if (path === "sideRight") {
        return paths.sideRight;
    } else if (path === "topRightChallenge") {
        return paths.topRightChallenge;
    } else if (path === "topLeftChallenge") {
        return paths.topLeftChallenge;
    } else if (path === "sideRightChallenge") {
        return paths.sideRightChallenge;
    } else if (path === "sideLeftChallenge") {
        return paths.sideLeftChallenge;
    } else if (path === "topRight1") {
        let path = [];
        for (let i = 0; i < paths.topRight.length; i++) {
            path.push(parallelPathPoints(parallelDistance, paths.topRight[i])[0]);
        }
        return path;
    } else if (path === "topRight2") {
        let path = [];
        for (let i = 0; i < paths.topRight.length; i++) {
            path.push(parallelPathPoints(parallelDistance, paths.topRight[i])[1]);
        }
        return path;
    } else if (path === "topLeft1") {
        let path = [];
        for (let i = 0; i < paths.topLeft.length; i++) {
            path.push(parallelPathPoints(parallelDistance, paths.topLeft[i])[0]);
        }
        return path;
    } else if (path === "topLeft2") {
        let path = [];
        for (let i = 0; i < paths.topLeft.length; i++) {
            path.push(parallelPathPoints(parallelDistance, paths.topLeft[i])[1]);
        }
        return path;
    } else if (path === "sideLeft1") {
        let path = [];
        for (let i = 0; i < paths.sideLeft.length; i++) {
            path.push(parallelPathPoints(parallelDistance, paths.sideLeft[i])[0]);
        }
        return path;
    } else if (path === "sideLeft2") {
        let path = [];
        for (let i = 0; i < paths.sideLeft.length; i++) {
            path.push(parallelPathPoints(parallelDistance, paths.sideLeft[i])[1]);
        }
        return path;
    } else if (path === "sideRight1") {
        let path = [];
        for (let i = 0; i < paths.sideRight.length; i++) {
            path.push(parallelPathPoints(parallelDistance, paths.sideRight[i])[0]);
        }
        return path;
    } else if (path === "sideRight2") {
        let path = [];
        for (let i = 0; i < paths.sideRight.length; i++) {
            path.push(parallelPathPoints(parallelDistance, paths.sideRight[i])[1]);
        }
        return path;
    }
}

function getDivePath(enemy) {
    let x = enemy.center.x;
    let y = enemy.center.y;
    let path = [];

    let basicBeginDive = [[0, 0], [20, -40], [40, -62], [60, -80], [80, -92], [100, -100], [120, -100], [140, -94], [160, -82], [176, -60], [188, -40], [192, -20], 
        [194, 0], [190, 20], [180, 40], [-550, 300], [-590, 320], [-610, 340], [-626, 360], [-634, 380], [-640, 400], [-640, 500]];

    let squiggle = [[0, 0, 180], [5, 42], [19, 84], [41, 134], [69, 216], [75, 244], [80, 266], [75, 300], [69, 320], [41, 357], [20, 404], [10, 465], [8, 505], [5, 560], [0, 600]];

    let circle = [[0, 0, 180], [10, 62], [38, 118], [82, 162], [138, 190], [200, 200], [262, 190], [318, 162], [362, 118], [390, 62], [400, 0], 
        [390, -62], [362, -118], [318, -162], [262, -190], [200, -200], [138, -190], [82, -162], [38, -118], [10, -62], [0, 0], [0, 100]];

    // Initial turn
    if (!enemy.diving) {
        enemy.diving = true;
        path.push([x+basicBeginDive[0][0], y+basicBeginDive[0][1], basicBeginDive[0][2]]);
        if (x < 600) {
            for (let i = 0; i < basicBeginDive.length-1; i++) {
                let angle = angleBetweenPoints(-basicBeginDive[i][0], basicBeginDive[i][1], -basicBeginDive[i+1][0], basicBeginDive[i+1][1])
                path.push([x-basicBeginDive[i+1][0], y+basicBeginDive[i+1][1], angle]);
            }
        } else {
            for (let i = 0; i < basicBeginDive.length-1; i++) {
                let angle = angleBetweenPoints(basicBeginDive[i][0], basicBeginDive[i][1], basicBeginDive[i+1][0], basicBeginDive[i+1][1])
                path.push([x+basicBeginDive[i+1][0], y+basicBeginDive[i+1][1], angle]);
            }
        }
    } else if (y > 1650) { // Reset
        enemy.center.y = -200;
        y = -200;
        let angle = angleBetweenPoints(x, y, enemy.formationLocation[0], enemy.formationLocation[1])
        path = [[enemy.formationLocation[0], enemy.formationLocation[1], angle]];
        enemy.diving = false;
    } else if (y > 1550) { // Prevent last second circle or something.
        path.push([x, y+100, 180]);
    } else if (Math.random() < 0.8) {
        path.push([x, y+100, 180]);
    } else if (Math.random() < 0.5) { // Slant
        if (x < 600) {
            path.push([x, y+10, 170], [x+5, y+20, 160], [x+10, y+30, 150], [x+20, y+40, 140], [x+30, y+50, 130], [x+530, y+350, 120], [x+540, y+360, 130], [x+550, y+370, 140], [x+555, y+380, 150], [x+560, y+390, 160], [x+565, y+400, 170], [x+565, y+450, 180]);
        } else {
            path.push([x, y+10, 190], [x-5, y+20, 200], [x-10, y+30, 210], [x-20, y+40, 220], [x-30, y+50, 230], [x-530, y+350, 240], [x-540, y+360, 230], [x-550, y+370, 220], [x-555, y+380, 210], [x-560, y+390, 200], [x-565, y+400, 190], [x-565, y+450, 180]);
        }
    } else {
        if (Math.random() < 0.7) {
            path.push([x+squiggle[0][0], y+squiggle[0][1], squiggle[0][2]]);
            if (x < 600) {
                for (let i = 0; i < squiggle.length-1; i++) {
                    let angle = angleBetweenPoints(squiggle[i][0], squiggle[i][1], squiggle[i+1][0], squiggle[i+1][1])
                    path.push([x+squiggle[i+1][0], y+squiggle[i+1][1], angle]);
                }
            } else {
                for (let i = 0; i < squiggle.length-1; i++) {
                    let angle = angleBetweenPoints(-squiggle[i][0], squiggle[i][1], -squiggle[i+1][0], squiggle[i+1][1])
                    path.push([x-squiggle[i+1][0], y+squiggle[i+1][1], angle]);
                }
            }
        } else {
            path.push([x+circle[0][0], y+circle[0][1], circle[0][2]])
            if (x < 600) {
                for (let i = 0; i < circle.length-1; i++) {
                    let angle = angleBetweenPoints(circle[i][0], circle[i][1], circle[i+1][0], circle[i+1][1])
                    path.push([x+circle[i+1][0], y+circle[i+1][1], angle]);
                }
            } else {
                for (let i = 0; i < circle.length-1; i++) {
                    let angle = angleBetweenPoints(-circle[i][0], circle[i][1], -circle[i+1][0], circle[i+1][1])
                    path.push([x-circle[i+1][0], y+circle[i+1][1], angle]);
                }
            }
        }
    }
    return path;
}
