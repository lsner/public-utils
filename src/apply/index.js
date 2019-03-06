

Function.prototype.myApply = function (obj,arr) {
  obj = obj || window
  obj.fn = this

  var result;
  if(arr){
    let args = Array.prototype.slice.call(arguments,1)
    let _args = args.join()
   result = eval('obj.fn('+  _args + ')')
  }else{
    result = obj.fn
  }

  delete obj.fn

  return result
}

export default Function.prototype.myApply
