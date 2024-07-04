
var Util                       = require('../src/util');                                // strip:



function Super() {

}

Super.aaa = 10



function Sub () {

}
Util.inherits(Sub.prototype, Super);

Sub.bbb = 20;



console.log('s');


