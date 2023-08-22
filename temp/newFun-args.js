


var AClass = function() {
    this.aa = 1
}

var a = new AClass();


var BClass = function(a, b) {
    this.a = a;
    this.b = b;

    this.aa = 1
    var arg = [1, 2]
    // arguments
    // return function() {
    // }
    var f = function() {};

    return f.apply(this, arg);
}


// var b = new BClass(1, 2);

var s = new (Function.prototype.bind.apply(BClass, [null, 1, 2, 3]));


// 배열 > 인자 : apply ?
// 인자 >> 배열 : arguments 로 처리
console.log(0);