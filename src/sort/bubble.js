/*
冒泡排序： 
看个人习惯（从右向左）
相邻的两个 两两比较 小的移动到左侧 以此类推
*/
function bubble(arr) {
    var temp;
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = arr.length - 1; j >= i ; j--) {
            if (arr[j + 1] < arr[j]) {
                temp = arr[j + 1]
                arr[j + 1] = arr[j]
                arr[j] = temp
            }
        }
    }
    return arr
}

bubble([7, 4, 5, 9, 3])


