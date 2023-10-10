

function ClassA (param) {
    this.aa = param
    
    this.fun1 = function(a, b) {
        console.log(this.aa);
    }

}


var a = new ClassA('AA');

a.fun1();
var fun1 = function(a) {

}


var fun2 = function(a,b) {

}
var fun3 = fun2;

fun3._TYPE = {
    param: [String, Number],
    return: String
};


// 열거형 일때
var enum1 = function(){
    return {
        aa: 1,
        bb: 2,
        cc: 3,
    }
}
enum1._KIND = 'enum';

var aa = enum1();
var bb = new enum1();



var enumA = function(acc){
    acc || 1;
    return {
        aa: acc++,
        bb: acc++,
        cc: acc++,
    }
}
var enumB = function(acc){
    acc || 1;
    return {
        aa: 1,
        bb: 2,
        cc: enumA(10),
    }
}

console.log(0);