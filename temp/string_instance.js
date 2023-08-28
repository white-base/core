let a = new String("aa")

let b = "AA"

let s  = Symbol

let Fun = function Fun() {};

let f = new Fun();

// a = 1 + ee
// if (a === ee) console.log('w');


function _isBuiltFunction(obj) {
    // if (obj === BigInt2) console.log('w');

    if (typeof obj === 'function' && (false 
        // || obj === BigInt2
        || obj === Number || obj === String || obj === Boolean
        || obj === Object || obj === Array
        || obj === RegExp || obj === Date 
        || obj === Symbol || obj === BigInt
    )) return true;
    return false;
}

_isBuiltFunction(a)

console.log('');
