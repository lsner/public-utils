Function.prototype.myBind = function () {

}
const person = {
  name:"小明"
}
function a() {
  console.log(this.name)
}

const b = a.bind(person)
console.log(b())