# bind方法的模拟实现

>在写该方法之前我们想到bind有几个特点
>1.bind可以改变this指向
>2.并且可以返回一个函数
>3.可以传入参数

### 第一版改变this指向

```javascript
const person = {
  name:"小明"
}
function a() {
  console.log(this.name)
}

Function.prototype.myBind = function (obj) {
  console.log(this) //[Function: a]
  this.myCall(obj) //将当前的this 也就是[Function: a]的this 指向为person
}
a.myBind(person) // result：小明

```

### 第二版返回函数

>简单的一批，直接上代码

```javascript

Function.prototype.myBind = function (obj) {
  this.myCall(obj)
  return this
}
const re = a.myBind(person)
console.log("result",re) // result function a() {
                             console.log(this.name);
                           }

```
> 但是这么直接改this会不会有什么问题呢？？不知道，暂时没发现

### 第三版传参

```javascript
Function.prototype.myBind = function (obj) {

  delete arguments[0]
  let args = []
  for (let key in arguments) {
    args.push(arguments[key])
  }

  return this.apply(obj,args) //这一步很重要实际上就是改变this指向 并且把处理成数组格式的参数传进去
}
const re = a.myBind(person, "100岁")

```
>就这么简单的写完啦，感觉代码很烂。。

###未完待续。。。