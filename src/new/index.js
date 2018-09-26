function Person(name, age) {
  this.name = name
  this.age = age
  this.like = "休息"
  return {
    like: this.like
  }
}

// Person.prototype.sayName = function () {
//   console.log("this.name:", this.name)
// }

const man = new Person("张三", 18)
console.log("demo man:", man)
console.log(man.name, man.age)


function myNew() {
  const result = new Object() //最终返回的是个对象，所以先new一个出来

  const obj = Array.prototype.shift.call(arguments) //使用shift，截取第一个参数，即我们需要的构造函数

  //这一步其实可以不用，因为shift直接改变原数组，在后面的apply的时候直接传arguments即可
  const argArray = Array.prototype.slice.call(arguments)//将构造函数obj的this指向result对象，这样result就可以访问到obj中的属性或方法

  result.__proto__ = obj.prototype // 第二条,继承原型上的属性或方法

  const  hasReturn = obj.apply(result,argArray)  //第一条,将构造函数obj的this指向result对象，这样result就可以访问到obj中的属性或方法
                                                 //同时看obj构造函数有无返回

  return hasReturn ? hasReturn : result
}

const b = myNew(Person, "张三", 19)
console.log("test:", b)
console.log(b.name, b.age)


export default myNew