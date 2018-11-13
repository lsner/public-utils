/* 
给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]

sort:[-1,-1,0,1,2,4]
*/


/* 

b = -(c + a) 
//[[-1,-1,2],[0,-1,1],[-1,0,1]]

*/
function doThing(nums) {
  nums.sort()
  let result = []
  for (var i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) {
      break
    }
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }
    let flagBegin = i
    let flagEnd = nums.length - 1
    while (flagBegin < flagEnd) {
      if (nums[i] === -(nums[flagBegin] + nums[flagEnd])) {
        let list = [nums[i], nums[flagBegin], nums[flagEnd]]
        result.push(list)
        flagBegin++
        flagEnd--
      } else if (nums[i] < -(nums[flagBegin] + nums[flagEnd])) {
        flagBegin++
      } else {
        flagEnd--
      }
    }

  }
  return result
}

// console.log(doThing([0, 0, 0, 0]))



function Person(name) {
  this.names = ["zhang","li"]
}

function Child() {
  
}

Child.prototype = new Person()
var a = new Person()
console.log(a)
a.names.push("wang")
console.log(a)

var b = new Person()
console.log(b)




