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

每个对象都有一个_proto_（即原型对象），并且通过原型对象继承属性和方法
### 对象__proto__属性的值就是它所对应的原型对象：
代码来源于网络
```javascript
var one = {x: 1};
var two = new Object();
one.__proto__ === Object.prototype // true
two.__proto__ === Object.prototype // true
one.toString === one.__proto__.toString // true
```
看完之后还是不怎么明白__proto__到底是个啥，黑人问号❓

prototype是function特有的属性,当你创建函数时，js会为这个函数自动创建prototype属性，且它的值是一个拥有constructor属性的对象。

如下图：

![](https://github.com/lsner/public-utils/blob/master/imgs/proto_1.jpg)

如果创建的函数被当成构造函数来使用的话，那么它的实例会继承构造函数的属性和方法（实例通过设置自己的__proto__指向承构造函数的prototype来实现这种继承）。

#### 总结
1.实际上js就是通过__proto__与prototype实现了原型链以及继承，

2.构造函数通过prototype来存储需要共享的属性和方法,也可以通过设置prototype的指向来继承某个对象的属性

3.对象的__proto__指向自己的构造函数的prototype，obj.__proto__.__proto__...的原型链由此产生（即原型对象的原型的原型对象...）,

包括我们的操作符instanceof正是通过探测obj.__proto__.__proto__... === Constructor.prototype来验证obj是否是Constructor的实例。

回到开头的代码，two = new Object()中Object是构造函数，所以two.__proto__就是Object.prototype。

至于one，ES规范定义对象字面量的原型就是 Object.prototype。

你可能会疑惑Object是个啥？？？其实它也是一个构造函数

如下图：

![](https://github.com/lsner/public-utils/blob/master/imgs/proto_2.jpg)

还有就是原型链的尽头(也就是Object.prototype的原型对象)是null , 因为Object.prototype.__proto__  //null

如下图：
![](https://github.com/lsner/public-utils/blob/master/imgs/proto_3.jpg)

### 更深一步的探讨
我们知道JS是单继承的，Object.prototype是原型链的顶端(但不是尽头)，所有对象从它继承了包括toString等等方法和属性。

Object本身是构造函数，继承了Function.prototype; Function也是对象，继承了Object.prototype。这里就有一个_鸡和蛋_的问题：

```javascript
Object instanceof Function // true
Function instanceof Object // true
```

下图是一个很好的总结

图片来自网络：

![](https://github.com/lsner/public-utils/blob/master/imgs/proto_4.jpg)