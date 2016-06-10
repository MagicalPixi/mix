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
var mainController = function(blockState, blockAreas, blueball, redball) {
    var controller = {};
    controller.blockState = blockState;
    controller.blockAreas = blockAreas;
}

function Controller(blockState, blockAreas, blueball, redball) {
    this.blockState = blockState;
    this.blockAreas = blockAreas;
    this.blueball = blueball;
    this.redball = redball;
    this.smallIndex;
    this.maxIndex;
    this.maxDisplayIndex;
    this.currentBallY;
    this.yMove = 0;
}

Controller.create = function(blockState, blockAreas, blueball, redball) {
    var controller = new Controller(blockState, blockAreas, blueball, redball);
    controller.firstBlockInit();
    return controller;
}

Controller.prototype.firstBlockInit = function() {
    for(var i = 0; i < maxAreaNum; i++) {
        this.blockInit(i);
    }
    this.maxDisplayIndex = maxAreaNum-1;
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

Controller.prototype.updateOneTime = function() {
    var blockAreas = this.blockAreas;
    var maxDisplayIndex = this.maxDisplayIndex;
    var yMove = this.yMove;
    yMove += ontimeMove;
    if(yMove > blockAreas[maxDisplayIndex-maxAreaNum+2].before && maxDisplayIndex < blockAreas.length-1) {
        this.updateDisplayBlock();
    }
    this.yMove = yMove;
}

module.exports = Controller.create;