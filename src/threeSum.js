/**
 * 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。
 * 注意：答案中不可以包含重复的三元组。
 * 例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
 * 满足要求的三元组集合为：
 * [
 *  [-1, 0, 1],
 *  [-1, -1, 2]
 * ]
 */

const origin = [-1, 0, 1, 2, -1, -4]

function getArray(origin) {
    let result = []
    for (let i = 0; i < origin.length - 2; i++) {
        let flagL = i
        let flagM = i + 1
        let flagR = i + 2

        while (flagM <= origin.length - 2) {
            // console.log("flagL:", flagL, "flagM:", flagM, "flagR:", flagR)
            if (origin[flagL] + origin[flagM] + origin[flagR] === 0) {
                const arr = eval('[' + origin[flagL] + ',' + origin[flagM] + ',' + origin[flagR] + ']').sort()
                if (result.toString().indexOf(arr.sort().toString()) === -1) {
                    result.push(arr)
                }
            }
            if (flagR === (origin.length - 1)) {
                flagM++
                flagR = flagM + 1
            } else {
                flagR++
            }
        }
    }
    return result
}

