# new方法的模拟实现

已知new的作用
1.实例可以访问到构造函数的属性和方法
2.实例可以访问到构造函数原型中的属性和方法

```javascript
//demo:

function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.sayName = function () {
  console.log("this.name:",this.name)
}

const man = new Person("张三",18)
console.log("demo man:", man) //Person { name: '张三', age: 18 }
man.sayName() //this.name: 张三

```

### 初步实现

```javascript

function myNew() {
    const result = new Object() //最终返回的是个对象，所以先new一个出来

    const obj = Array.prototype.shift.call(arguments) //使用shift，截取第一个参数，即我们需要的构造函数

    //这一步其实可以不用，因为shift直接改变原数组，在后面的apply的时候直接传arguments即可
    const argArray = Array.prototype.slice.call(arguments)//将构造函数obj的this指向result对象，这样result就可以访问到obj中的属性或方法

    result.__proto__ = obj.prototype // 第二条,继承原型上的属性或方法

    obj.apply(result, argArray) //第一条,将构造函数obj的this指向result对象，这样result就可以访问到obj中的属性或方法

    return result
}

const b = myNew(Person, "张三",19)
console.log("test:", b) //test: { name: '张三', age: 19 }

```
完美实现，(*^▽^*) 哈哈哈。。。。

### 第二步 优化

如果构造函数有返回且返回的是个指定对象呢，比如

```javascript
function Person(name, age) {
  this.name = name
  this.age = age
  this.like = "休息"
  return {
    like:this.like
  }
}
const man = new Person("张三", 18)
console.log("demo man:", man) //demo man: { like: '休息' }
console.log(man.name, man.age) //undefined undefined

```

代码实现
```javascript
function myNew() {

  、、、、
  、、、、

  const  hasReturn = obj.apply(result,argArray)  //第一条,将构造函数obj的this指向result对象，这样result就可以访问到obj中的属性或方法
                                                 //同时看obj构造函数有无返回，且，返回是否为对象，否则，直接返回
  return typeof hasReturn === 'object' ? hasReturn : result
}


const b = myNew(Person, "张三", 19)
console.log("test:", b) // test: { like: '休息' }
console.log(b.name, b.age) // undefined undefined

```
完成，(＾－＾)V

tips:如果构造函数没有返回或者返回的不是一个指定对象，比如只是 return "哈哈哈" 这种，那返回不返回其实没啥区别

### 补充：_proto_ 与 prototype

每个对象都有一个_proto_（即原型对象）

