/* 
选择排序：
首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置
再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
重复第二步，直到所有元素均排序完毕。
*/
function selection(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        var min = i
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j
            }
        }
        if (i < min) {
            var temp = arr[i]
            arr[i] = arr[min]
            arr[min] = temp
        }
    }
    console.log(arr)
}

selection([7, 4, 5, 9, 3])