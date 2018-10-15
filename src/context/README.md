# 执行上下文与执行上下文栈

在JavaScript中可以执行的代码无非有三种，全局代码，函数里的代码，以及特殊的eval中的代码。
当我们要执行一段代码的时候就产生了所谓的**执行上下文**，JavaScript引擎通过执行上下文栈还来管理执行上下文。
为了方便理解，我们假设执行上下文栈是一个数组
```javascript
ECStack = [];
```
试想当 JavaScript 开始要解释执行代码的时候，最先遇到的就是全局代码，
所以初始化的时候首先就会向执行上下文栈压入一个全局执行上下文，我们用 globalContext 表示它，
并且只有当整个应用程序结束的时候，ECStack 才会被清空，所以程序结束之前， ECStack 最底部永远有个 globalContext：

先看一段代码
```javascript
function A(){
    console.log("a")
}

function B(){
    A()
}

function C(){
    B()
}

C()
```
那么上面的这一段代码我们就可以解析为

- 1.首先会有一个全局上下文
```javascript
    ECStack.push(globalContext)
```
- 2.函数C的执行上下文入栈
```javascript
    ECStack.push(<funC> functionContextC)
```
- 3.函数C又调用了函数B，所以函数B的执行上下文入栈
```javascript
    ECStack.push(<funB> functionContextB)
```
- 4.函数B又调用了函数A，所以函数A的执行上下文入栈
```javascript
    ECStack.push(<funA> functionContextA)
```
- 5.函数A执行完了，出栈，函数B执行完了，出栈，以此类推
```javascript
    ECStack.pop(<funA> functionContextA)
    ECStack.pop(<funB> functionContextB)
    ECStack.pop(<funC> functionContextC)
```
- 6.javascript接着执行下面的代码，但是ECStack底层永远有个globalContext

# 补充：
## 发现的有意思的一段代码(关于引用)

```javascript
    var a = { n: 1 };
    var b = a;
    a.x = a = { n: 2 };
    console.log(a);
    console.log(b);
```
来自一个大神的解答：

![](https://github.com/lsner/public-utils/blob/master/imgs/proto_5.jpg)

