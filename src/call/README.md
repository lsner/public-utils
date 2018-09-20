# call方法的模拟实现

### 初步思考

```javascript
 const person = {
   name:"小明"
 }
 function sayName() {
   console.log(this.name)
 }

 sayName.call(person)

 //result: 小明
```
>上面的代码有两个步骤
1. call 改变了this 的指向，指向变为 person
2. sayName 函数执行了

```javascript
 //猜测
 const person = {
   name:"小明",
   sayName() {
      console.log(this.name)
   }
 }
 //此时的this绝壁指向person，但是要实现call 我们不好给每个对象都加属性，but 加了在删除好像也没啥

```
### 第一步尝试版
>1. 给person 对象添加fn方法
2. sayName函数执行
3. 删除person中的fn方法

```javascript
 Function.prototype.myCall = function (obj) {
   console.log(obj) // { name: '小明' }
   console.log(this) //[Function: sayName]
 }
 //看到上面的打印结果是不是心中已经有了答案

```

>按照三个步骤实现
```javascript
Function.prototype.myCall = function (obj) {
  obj.fn = this
  obj.fn()
  delete obj.fn
}
sayName.myCall(person) //result: 小明
```

### 第二步加入参数版

>我们知道call函数的参数除了可以改变this指向的对象，还可以传入指定的其他参数
比如下面：

```javascript
const person = {
  name: "小明"
}

function sayName(age, phone) {
  console.log(age)
  console.log(phone)
  console.log(this.name)
}

sayName.call(person, 12, 12345) // 12 12345 小明

```
>但是参数的数量不可控
于是我们可以这么写
tips：1.arguments 是一个类数组对象 不是一个真的数组  2.eval 是个很特殊的方法 网上褒贬不一

```javascript
Function.prototype.myCall = function (obj) {
  obj.fn = this

  let _arguments = deepCopy(arguments)
  delete _arguments[0]
  let args = []
  for (let key in _arguments) {
    args.push(_arguments[key])
  }
  let  args_str= args.join()
  // obj.fn(args_str) 这种做法显然不行 相当于只传进了一个字符串

  eval('obj.fn(' + args_str +')'); //通过eval处理

  delete obj.fn
}

sayName.myCall(person, 12, 12345) //12 12345 小明

```
写到这里是不是很开心(*^▽^*)，我们已经完成90%啦

### 第三步终极进化优化版

>1.call(obj) 万一obj为null怎么办?

```javascript
let name = "上帝"

function sayName() {
  console.log(this.name)
}

console.log(sayName.call(null)) //上帝

```
>2.call 最终应该有返回

```javascript

function getU(age, phone) {
  return{
    age,
    phone
  }
}
console.log(getU.call(person)) //{ age: undefined, phone: undefined }

```

解决起来很简单，代码如下

```javascript
Function.prototype.myCall = function (obj) {
  obj = obj || window

   ...
   ...
   ...

  const result = eval('obj.fn(' + args_str +')');

  ...

  return result
}

console.log("result",getU.myCall(person, 12, 12345)) //result { age: 12, phone: 12345 }

```

到此为止我们的call 就写完啦，(*^▽^*)





