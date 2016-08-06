/**
 * Created by zjs on 16/6/10.
 * 生成blockArea的块,一个blockArea的左右两边的颜色是固定的
 */
var blockAreaCul = function(leftData, rightData) {
    var blockAreas = [];
    var before = 0, i = 0, j = 0, leftStart = 0, rightStart = 0;
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
          remainLeft > remainRight ? leftStart -= currentHeight : rightStart -= currentHeight
          remainLeft > remainRight ? j++ : i++
        }
        var curArea = {
            before : before*80,
            height : currentHeight*80,
            vaild : curLeft.isRed != curRight.isRed,
            leftIsRed : curLeft.isRed,
            rightIsRed : curRight.isRed
        };
        blockAreas.push(curArea);
        before += currentHeight;
    }
    return blockAreas;
}
module.exports = blockAreaCul;
