/**
 * 내부적으로 지역으로 사용하는것은 
 */

function Private () {

    var inner;
    Object.defineProperty(this, '_private', 
    {
        get: function() { 
            return inner; 
        },
        set: function(newValue) { 
            console.log('..');
            
            inner = newValue;
        },
        configurable: true,
        enumerable: true
    });  
}
Private.prototype.testVar = function(p_fn, p_code) {
console.log('ss');

};

var p = new Private();

var pp  = p._private;

p._private = 3;


console.log('END');
