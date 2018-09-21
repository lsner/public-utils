import {myCall} from '../index';

const person = {
  name: "小明"
}

function a(age) {
  console.log("age", age)
  console.log("name", this.name)
}

// const b = a.bind(person)
// console.log(b)


Function.prototype.myBind = function (obj) {

  delete arguments[0]
  let args = []
  for (let key in arguments) {
    args.push(arguments[key])
  }

  return this.apply(obj,args) //这一步很重要实际上就是改变this指向 并且把处理成数组格式的参数传进去
}
const re = a.myBind(person, "100岁")
console.log("result", re)


// export default Function.prototype.myBind