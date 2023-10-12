

var aa = "1";
var bb = "[1, 2]";


var cc = "[String, Number]";

var par = JSON.parse(aa);
var par = JSON.parse(bb);
// var par = JSON.parse(cc);
var par = eval(cc);
var par = (new Function('return '+ cc))();

console.log(0);