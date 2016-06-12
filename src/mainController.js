/**
 * Created by zjs on 16/6/11.
 */

    var maxAreaNum = 10;
    //由于blockArea的最小高度为1*80所以实际的minAreaHeight未用到
    var minBallAreaHeight = 40;
    var maxBlockR = 40;
    var minBlockR = 20;

    var ballR = 20;
    var ontimeMove = 8;

    var blockballGenerator = require('./sprites/blockball');

function intersection(circle1, circle2) {
    var a, dx, dy, d, h, rx, ry;
    var x, y;
    dx = circle2.x - circle1.x
    dy = circle2.y - circle1.y
    d = Math.sqrt((dy*dy) + (dx*dx));
    if (d > (circle1.width + circle2.width)) {
        return false;
    }
    if (d < Math.abs(circle1.width - circle2.width)) {
        return false;
    }
    a = ((circle1.width * circle2.width) - (circle1.width * circle2.width) + (d*d)) / (2.0 * d) ;
    x = circle1.x + (dx * a/d);
    y = circle1.y + (dy * a/d);
    h = Math.sqrt((circle1.width * circle1.width) - (a*a));
    rx = -dy * (h/d);
    ry = dx * (h/d);
    var first = {
        x: x + rx,
        y: y + ry
    }
    var second = {
        x: x - rx,
        y: y - ry
    }
    return [first, second];
}




function Controller(blockState, blockAreas, blueball, redball) {
    this.blockState = blockState;
    this.blockAreas = blockAreas;
    this.blueball = blueball;
    this.redball = redball;
    this.minIndex = 0;
    this.maxIndex = 0;
    this.maxDisplayIndex = 0;
    this.currentBallY = blueball.y;
    this.score = 0;
    this.yMove = 0;
}

Controller.create = function(blockState, blockAreas, blueball, redball) {
    var controller = new Controller(blockState, blockAreas, blueball, redball);
    controller.firstBlockInit();
    controller.indexInit();
    return controller;
}

Controller.prototype.firstBlockInit = function() {
    for(var i = 0; i < maxAreaNum; i++) {
        this.blockInit(i);
    }
    this.maxDisplayIndex = maxAreaNum-1;
}

Controller.prototype.indexInit = function() {
    var blockAreas = this.blockAreas;
    var currentBallY = this.currentBallY;
    var minY = currentBallY-ballR;
    var maxY = currentBallY+ballR;
    for(var i = 0; i < blockAreas.length-1; i++) {
        var blockArea = blockAreas[i];
        var nextBlockArea = blockAreas[i+1];
        if(blockArea.before <= minY && nextBlockArea.before > minY) {
            this.minIndex = i;
        }
        if(blockArea.before <= maxY && nextBlockArea.before > maxY) {
            this.maxIndex = i;
            break;
        }
    }
}

Controller.prototype.blockInit = function(index) {
    var blockArea = this.blockAreas[index];
    var r = parseInt(Math.random() * (maxBlockR-minBlockR) + minBlockR);
    var y = blockArea.before+blockArea.height/2;
    var block = blockballGenerator(y,r);
    blockArea.block = block;
    this.blockState.addChild(block);
    this.maxDisplayIndex = index;
}

Controller.prototype.clearBlock = function(index) {
    var blockArea = this.blockAreas[index];
    this.blockState.removeChild(blockArea.block);
    blockArea = null;
}

Controller.prototype.updateDisplayBlock = function() {
    var maxDisplayIndex = this.maxDisplayIndex;
    maxDisplayIndex++;
    this.blockInit(maxDisplayIndex);
    this.clearBlock(maxDisplayIndex-maxAreaNum);
    this.maxDisplayIndex = maxDisplayIndex;
}

Controller.prototype.updateIndex = function () {
    var blockAreas = this.blockAreas;
    var minIndex = this.minIndex;
    var maxIndex = this.maxIndex;
    var ymove = this.yMove;
    var currentBallY = this.currentBallY;
    if(maxIndex < blockAreas.length-1) {
        if(blockAreas[minIndex+1].before-ballR+currentBallY < ymove) {
            minIndex++;
            this.minIndex = minIndex;
        }
        if(blockAreas[maxIndex+1].before-ballR-currentBallY < ymove) {
            maxIndex++;
            this.maxIndex = maxIndex;
        }
    }
}

Controller.prototype.updateOneTime = function() {
    var blockAreas = this.blockAreas;
    var maxDisplayIndex = this.maxDisplayIndex;
    var yMove = this.yMove;
    yMove += ontimeMove;
    if(yMove > blockAreas[maxDisplayIndex-maxAreaNum+2].before && maxDisplayIndex < blockAreas.length-1) {
        this.updateDisplayBlock();
    }
    this.yMove = yMove;
    this.updateIndex();
}

Controller.prototype.collisionCheck = function() {

}

module.exports = Controller.create;