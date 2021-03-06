/**
 * Created by zjs on 16/6/11.
 */
    //最多显示的障碍物区域,用于障碍物的生成与回收
    var maxAreaNum = 10;
    //由于blockArea的最小高度为1*80所以实际的minAreaHeight未用到
    var minBallAreaHeight = 40;
    var maxBlockR = 40;
    var minBlockR = 20;

//小球半径为20
    var ballR = 20;
//一次更新向上移动的y值
    var ontimeMove = 8;

    var blockballGenerator = require('./sprites/blockball');
var diplay = 0;
function circleIntersection(cX1, cY1, cR1, cX2, cY2, cR2) {
    return Math.pow(cX1-cX2, 2)+Math.pow(cY1-cY2, 2) < Math.pow(cR1+cR2, 2);
}

function ballBlockIntersection(ball, block, ymove) {
    return circleIntersection(ball.x, ball.y, ball.width/2, block.x, block.y-ymove, block.width/2);
}
function intersection(circle1, circle2) {
    var a, dx, dy, d, h, rx, ry;
    var x, y;
    if(diplay == 5) {
        console.log(circle1);
        console.log(circle1.width);
    }
    diplay++;
    dx = circle2.x - circle1.x
    dy = circle2.y - circle1.y
    d = Math.sqrt((dy*dy) + (dx*dx));
    if (d > (circle1.width/2 + circle2.width/2)) {
        return false;
    }
    if (d < Math.abs(circle1.width/2 - circle2.width/2)) {
        return false;
    }
    a = ((circle1.width/2 * circle2.width/2) - (circle1.width/2 * circle2.width/2) + (d*d)) / (2.0 * d) ;
    x = circle1.x + (dx * a/d);
    y = circle1.y + (dy * a/d);
    h = Math.sqrt((circle1.width/2 * circle1.width/2) - (a*a));
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
    //block的容器
    this.blockState = blockState;
    this.blockAreas = blockAreas;
    this.blueball = blueball;
    this.redball = redball;
    //红球和蓝球所处的blockArea的index的最小值与最大值,用于碰撞检测
    this.minIndex = 0;
    this.maxIndex = 0;
    this.maxDisplayIndex = 0;
    //当前小球的y值,y值不会改变
    this.currentBallY = blueball.y;
    this.score = 0;
    this.yMove = 0;
}

Controller.create = function(blockState, blockAreas, blueball, redball) {
    var controller = new Controller(blockState, blockAreas, blueball, redball);
    controller.indexInit();
    controller.firstBlockInit();
    return controller;
}

//最开始时初始化的障碍
Controller.prototype.firstBlockInit = function() {
    var blockAreas = this.blockAreas;
    var index = 0;
    //最开始没有障碍物的区域
    var blankArea = 800;
    for(var i = 0; i < blockAreas.length; i++) {
        if(blockAreas[i].before > blankArea) {
            index = i;
            break;
        }
    }
    for(var i = index; i < index+maxAreaNum; i++) {
        this.blockInit(i);
    }
    this.maxDisplayIndex = index+maxAreaNum-1;
}

//最开始时小球所处的blockIndex范围
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

//生成某个block的障碍
Controller.prototype.blockInit = function(index) {
    var blockArea = this.blockAreas[index];
    if(blockArea.leftIsRed == blockArea.rightIsRed) {
        return;
    } else {
        var r = parseInt(Math.random() * (maxBlockR-minBlockR) + minBlockR);
        var y = blockArea.before+blockArea.height/2;
        var block = blockballGenerator(y,r);
        blockArea.block = block;
        this.blockState.addChild(block);
    }
    this.maxDisplayIndex = index;
}

//清除block
Controller.prototype.clearBlock = function(index) {
    var blockArea = this.blockAreas[index];
    if(blockArea.block) {
        this.blockState.removeChild(blockArea.block);
    }
    blockArea = null;
}

//更新block,并不是所有block都会显示,
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

//碰撞检测
Controller.prototype.collisionCheck = function() {
    var minIndex = this.minIndex;
    var maxIndex = this.maxIndex;
    var blockAreas = this.blockAreas;
    var redball = this.redball;
    var blueball = this.blueball;
    var currentBallY = this.currentBallY;
    var yMove = this.yMove;
    for(var i = minIndex; i <= maxIndex; i++) {
        var blockArea = blockAreas[i];
        var curBlock = blockArea.block;
        //console.log("minIndex:", minIndex, "maxIndex:", maxIndex,"redball:", redball.x);
        if(blockArea.leftIsRed) {
            if(redball.x == 30){
                console.log(1);
                return true;
            }
        } else {
            if(blueball.x == 30) {
                console.log(2);
                return true;
            }
        }
        if(blockArea.rightIsRed) {
            if(redball.x == 610) {
                console.log(3);
                return true;
            }
        } else {
            if(blueball.x == 610) {
                console.log(4);
                return true;
            }
        }
        if(curBlock == null || curBlock.isScoll == true) {
            continue;
        }
        if(ballBlockIntersection(redball, curBlock, yMove) != false) {
            return true;
        }
        if(ballBlockIntersection(blueball, curBlock, yMove) != false) {
            return true;
        }
        if(curBlock.y+curBlock.width/2-this.moveY-currentBallY < 0) {
            curBlock.isScoll = true;
            this.score++;
        }
    }
    return false;
}

module.exports = Controller.create;
