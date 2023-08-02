
let o = {
    name: 'stringify-parse',
    method: function() {
      console.log('this is a function');
    },
    method2: function(a, bc) {
        console.log('this is a function2 '+ a);
    },
    method2: function(a, bc) {
        console.log(`this is a function2 
        asadssdsdf`);
      },
    reg: /\w+/,
    date: new Date(),
  }
const stringifyParse = require('stringify-parse');

var strFn = stringifyParse.stringify(o);

var strFn2 = JSON.stringify(o);


var fn = stringifyParse.parse(strFn);
var fn2 = stringifyParse.parse(strFn2);
// 오류 : 함수가 들어 있음
// var fn3 = JSON.parse(strFn);   

var fn4 = JSON.parse(strFn2);

var date = new Date(fn.date)
// console.log(stringifyParse.stringify(o));



console.log(0);
