# public-utils
我的常用方法集

### 目录结构
- src     // 源代码目录 比如coffee,typescript,es6+等代码的目录
- lib     // 转义生成的代码目录，比如babel转义后的es5代码的目录
- docs    // 代码相关的设计和使用文档
- tests   // 相关的测试目录


### 添加package.json的配置
> 下面两处的配置为了让package可以被全局安装
```javaScript
 "bin": {
   "public-utils": "./lib/cli.js"
 }
```
```javaScript
  /lib/cli.js
```


想要实现一些原生方法，plan进行中
### js重写
- [x] 深拷贝deepCopy
- [x] call重写   [文档](https://github.com/lsner/public-utils/blob/master/src/call/README.md)
- [x] apply重写  [文档](https://github.com/lsner/public-utils/blob/master/src/apply/README.md)
- [ ] bind重写(还剩一些结余)
- [x] new重写   [文档](https://github.com/lsner/public-utils/blob/master/src/new/README.md)
- [ ] ajax重写
- [ ] Promise
- [ ] 观察者模式实现
- [ ] 虚拟dom diff算法

### js深入知识点
- [x] context  [文档](https://github.com/lsner/public-utils/blob/master/src/context/README.md)
- [ ] 闭包
- [ ] 原型链
- [ ] this


### 个人博客
<https://my.oschina.net/u/3607067>

