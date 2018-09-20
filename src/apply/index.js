import { deepCopy }  from '../index';


Function.prototype.myApply = function (obj) {
  obj = obj || window
  obj.fn = this

  let _arguments = deepCopy(arguments)
  let args = []
  args = args.concat(_arguments[1])
  let _args = args.join()
  const result = eval('obj.fn('+  _args + ')')

  delete obj.fn

  return result
}

export default Function.prototype.myApply
