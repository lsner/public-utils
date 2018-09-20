import { deepCopy }  from '../index';

Function.prototype.myCall = function (obj) {
  obj = obj || window

  obj.fn = this

  let _arguments = deepCopy(arguments)
  delete _arguments[0]
  let args = []
  for (let key in _arguments) {
    args.push(_arguments[key])
  }
  let  args_str= args.join()
  // obj.fn(args_str) 这种做法显然不行 相当于只传进了一个字符串

  const result = eval('obj.fn(' + args_str +')');

  delete obj.fn

  return result
}

export default Function.prototype.myCall
