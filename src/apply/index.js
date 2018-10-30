

Function.prototype.myApply = function (obj) {
  obj = obj || window
  obj.fn = this

  let args = Array.prototype.slice.call(arguments,1)
  let _args = args.join()
  const result = eval('obj.fn('+  _args + ')')

  delete obj.fn

  return result
}

export default Function.prototype.myApply
