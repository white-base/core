


function _isFillObj(obj)  {
    // if(typeof obj === 'object' && getAllProperties(obj).length > 0 && !(obj instanceof RegExp)) {
    if(_isObject(obj) && getAllProperties(obj).length > 0) {   // REVIEW: RegExp 빠져야 할듯!!
      return true;
    }
    return false;
}



var bb;

var aa = undefined;

const sum = new Function('a', 'b', 'return a + b');
var fun  = Function('a', 'b', 'return a + b');

var fun2  = function(a,b) {};
var fun3  = function(String, Number) {};

var b = function(String, Number){Object}
var fun = (String, Number)=>{Object}
var fun = (String, Number)=> Object;
var fun = (String, Number)=>{return Object};


var arr = [11, 22]

var f = new function(){}

var s1 = Symbol('a');
var s2 = Symbol('b');

console.log(bb);
console.log(aa);
console.log(0);