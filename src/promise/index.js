function myPromise() {
    return {
        fulfill: function (value) {
            if (fulfillCallback && typeof fulfillCallback === 'function') {
                fulfillCallback(value)
            }
        },
        reject: function (err) {
            if (rejectCallback && typeof rejectCallback === 'function') {
                rejectCallback(err)
            }
        },
        then: function (_fulfillCallback, _rejectCallback) {
            fulfillCallback = _fulfillCallback
            rejectCallback = _rejectCallback
        }
    }
}


/*
我们要满足状态只能三种状态：PENDING,FULFILLED,REJECTED三种状态，且状态只能由PENDING=>FULFILLED,或者PENDING=>REJECTED
*/
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
/*
value状态为执行成功事件的入参，deferreds保存着状态改变之后的需要处理的函数以及promise子节点，构造函数里面应该包含这三个属性的初始化
 */
function Promise(callback) {
    this.status = PENDING;
    this.value = null;
    this.defferd = [];
    setTimeout(callback.bind(this, this.resolve.bind(this), this.reject.bind(this)), 0);
}

Promise.prototype = {
    constructor: Promise,
    //触发改变promise状态到FULFILLED
    resolve: function (result) {
        this.status = FULFILLED;
        this.value = result;
        this.done();
    },
    //触发改变promise状态到REJECTED
    reject: function (error) {
        this.status = REJECTED;
        this.value = error;
    },
    //处理defferd
    handle: function (fn) {
        if (!fn) {
            return;
        }
        var value = this.value;
        var t = this.status;
        var p;
        if (t == PENDING) {
            this.defferd.push(fn);
        } else {
            if (t == FULFILLED && typeof fn.onfulfiled == 'function') {
                p = fn.onfulfiled(value);
            }
            if (t == REJECTED && typeof fn.onrejected == 'function') {
                p = fn.onrejected(value);
            }
            var promise = fn.promise;
            if (promise) {
                if (p && p.constructor == Promise) {
                    p.defferd = promise.defferd;
                } else {
                    p = this;
                    p.defferd = promise.defferd;
                    this.done();
                }
            }
        }
    },
    //触发promise defferd里面需要执行的函数
    done: function () {
        var status = this.status;
        if (status == PENDING) {
            return;
        }
        var defferd = this.defferd;
        for (var i = 0; i < defferd.length; i++) {
            this.handle(defferd[i]);
        }
    },
    /*储存then函数里面的事件
    返回promise对象
    defferd函数当前promise对象里面
    */
    then: function (success, fail) {
        var o = {
            onfulfiled: success,
            onrejected: fail
        };
        var status = this.status;
        o.promise = new this.constructor(function () {

        });
        if (status == PENDING) {
            this.defferd.push(o);
        } else if (status == FULFILLED || status == REJECTED) {
            this.handle(o);
        }
        return o.promise;
    }
};


function sum(a) {
    let s = a
    return function temp(b) {
        console.log("hehhe",[].slice.call(arguments),arguments)
        if([].slice.call(arguments).length === 0){
            return s
        }else{
            s = s + b
            return temp
        }
    }
}
let result = sum(1)(2)(3)(4)() //10
console.log("rrrrr",result)




/* 实现红绿灯的不间断交替闪烁  */
function red (){
    console.log("红灯")
}
function yellow (){
    console.log("黄灯")
}
function green (){
    console.log("绿灯")
}

function p() {
   return new Promise(function(resolve){
        resolve()
   })
}

function run () {
        p().then(function () {
            setTimeout(() => red(),1000)
        }).then(function(){
            setTimeout(() => yellow(),2000)
        }).then(function(){
            setTimeout(() => green(),3000)
        }).then(function () {
            setTimeout(function(){run()},3000)
        });
}
// run()

/*实现绿灯停留5s 黄灯停留3s 红灯停留2s*/

//添加延迟函数
function wait_2000() {
    return new Promise(function (resolve) {
        setTimeout(() => resolve(),2000)
    })
}
function wait_3000() {
    return new Promise(function (resolve) {
        setTimeout(() => resolve(),3000)
    })
}
function wait_5000() {
    return new Promise(function (resolve) {
        setTimeout(() => resolve(),5000)
    })
}

function run2 () {
    p()
      .then(function () {green()})
      .then(wait_5000)
      .then(function(){yellow()})
      .then(wait_3000)
      .then(function(){red()})
      .then(wait_2000)
      .then(function () {run2()})
}
// run2()