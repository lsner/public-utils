"use strict";

function Person(name, age) {
  this.name = name;
  this.age = age;
}

var man = new Person("张三");
console.log("demo man:", man);

function myNew(obj) {
  console.log(arguments);
  console.log(obj);
  var argArray = Array.prototype.slice.call(arguments, 1);
  this.apply(obj, argArray);
}

var b = myNew(Person, "张三");
console.log("test:", b);