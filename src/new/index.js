function Person(name, age) {
  this.name = name
  this.age = age
  this.like = "休息"
}

Person.prototype.hair = "black"
Person.prototype.sayName = function () {
  console.log("this.name:", this.name)
}

const man = new Person("张三", 18)
console.log("demo man:", man)
console.log(man.name, man.age,man.hair)


/* 模拟实现 var person = myNew(Person, ……)  其中Person是构造函数 所以我们要实现的是 myNew函数*/

function myNew() {
  const result = new Object() //因为new最终返回的是个对象，所以先new一个对象出来

  const obj = Array.prototype.shift.call(arguments) //使用shift，截取第一个参数，即我们需要的构造函数

  //这一步其实可以不用，因为shift直接改变原数组，在后面的apply的时候直接传arguments即可
  const argArray = Array.prototype.slice.call(arguments)//将构造函数obj的this指向result对象，这样result就可以访问到obj中的属性或方法

  result.__proto__ = obj.prototype // 第二条,继承obj原型上的属性或方法

  const  hasReturn = obj.apply(result,argArray)  //第一条,将构造函数obj的this指向result对象，这样result就可以访问到构造函数obj内部的属性或方法
                                                 //同时看obj构造函数有无返回

  return hasReturn ? hasReturn : result
}


export default myNew