/*
* 插入排序：
*
*将未排序序列第一个元素看做一个有序序列 剩余未排序序列看做一个无序序列
* 依次遍历第二个序列 将扫描到的元素插入到左侧的有序序列的适当位置
* 如果插入元素与有序序列的某个元素相等 则插入到对应元素的后面
* */

function insertion(arr) {
    for (var i = 1; i < arr.length; i++) {
        var flag = i
        var temp = arr[i]
        while (arr[flag - 1] > temp) {
            arr[flag] = arr[flag - 1]
            flag--
        }

        if(i !== flag){  //本身就比左侧最大的大 也就是本身与本身 没必要再置换了
            arr[flag] = temp
        }

    }
    console.log(arr)
}

insertion([7, 4, 5, 9, 3])
