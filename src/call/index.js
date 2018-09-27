Function.prototype.myCall = function (obj) {
  obj = obj || window

  obj.fn = this

  let args = Array.prototype.slice.call(arguments,1)
  let  args_str= args.join()
  // obj.fn(args_str) 这种做法显然不行 相当于只传进了一个字符串

  const result = eval('obj.fn(' + args_str +')');

  delete obj.fn

  return result
}

export default Function.prototype.myCall
