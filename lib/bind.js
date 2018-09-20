"use strict";

Function.prototype.myBind = function () {};
var person = {
  name: "小明"
};
function a() {
  console.log(this.name);
}

var b = a.bind(person);
console.log(b());