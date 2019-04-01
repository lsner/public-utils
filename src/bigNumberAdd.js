/* 两个数字长度相同 */
function bigAdd(str1,str2) {
    var arr1 = str1.split("")
    var arr2 = str2.split("")
    var temp = 0, result, sum =[]

    for(var i = arr1.length - 1 ; i >= 0; i--){
        result = Number(arr1[i]) + Number(arr2[i]) + temp + ''
        if(result >= 10 && i !== 0){
            temp = 1
            result = result.slice(1)
        }else{
            temp = 0
        }
        sum.push(result)
    }
    return sum.reverse().join("")
}

console.log(bigAdd("555","455"))




function saySomeThing(){
    this.name =  "小明"


    return {
        detail: ""
    }
}
saySomeThing.prototype.sayName = function(){
    
}



