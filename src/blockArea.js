/**
 * Created by zjs on 16/6/10.
 */
var blockAreaCul = function(leftData, rightData) {
    var blockAreas = [];
    var before = 0;
    var i = 0;
    var j = 0;
    var leftStart = 0;
    var rightStart = 0;
    while(i < leftData.length && j < rightData.length) {
        var curLeft = leftData[i];
        var curRight = rightData[j];
        var remainLeft = curLeft.count-leftStart;
        var remainRight = curRight.count-rightStart;
        var currentHeight;
        if(remainLeft > remainRight) {
            currentHeight = remainRight;
            leftStart = leftStart+remainRight;
            rightStart = 0;
            j++;
        } else if(remainLeft == remainRight) {
            currentHeight = remainLeft;
            leftStart = 0;
            rightStart = 0;
            i++;
            j++;
        } else {
            currentHeight = remainLeft;
            leftStart = 0;
            rightStart = rightStart+remainLeft;
            i++;
        }
        var curArea = {
            before : before*80,
            height : currentHeight*80,
            isEffect : curLeft.isRed != curRight.isRed
        };
        blockAreas.push(curArea);
        before += currentHeight;
    }
    return blockAreas;
}

module.exports = blockAreaCul;