/**
 * Created by zjs on 16/6/10.
 */
var blockAreaCul = function(leftData, rightData) {
    var blockAreas = [];
    var before, i, j, leftStart, rightStart = 0;
    while(i < leftData.length && j < rightData.length) {
        var curLeft = leftData[i];
        var curRight = rightData[j];
        var remainLeft = curLeft.count - leftStart;
        var remainRight = curRight.count - rightStart;
        var currentHeight;
        if (remainLeft == remainRight) {
          currentHeight = remainLeft
          leftStart = rightStart = 0
          i++
          j++
        } else {
          currentHeight = remainLeft > remainRight ? remainRight : remainLeft
          remainLeft > remainRight ? leftStart += currentHeight : rightStart += currentHeight
          remainLeft > remainRight ? j++ : i++
        }
        var curArea = {
            before : before,
            height : currentHeight,
            vaild : curLeft.isRed != curRight.isRed
        };
        blockAreas.push(curArea);
        before += currentHeight;
    }
    return blockAreas;
}
module.exports = blockAreaCul;
