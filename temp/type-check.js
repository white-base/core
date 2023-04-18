function isEmptyObj(obj)  {
    if(typeof obj === 'object'  && Object.keys(obj).length === 0) {
      return true;
    }
    return false;
}
function isFillObj(obj)  {
    if(typeof obj === 'object'  && Object.keys(obj).length > 0) {
      return true;
    }
    return false;
}

var _getTypeMap = function(type) {
    var obj =  {name: '', default: null};

    if (type === null) {
        obj.name = 'any';
        return obj;
    }
    if (type === Number) {
        obj.name = 'number';
        return obj;
    }
    if (type === String) {
        obj.name = 'string';
        return obj;
    }
    if (type === Boolean) {
        obj.name = 'boolean';
        return obj;
    }
    if (type === Array) {
        obj.name = 'array';
        return obj;
    }
    if (type instanceof Array) {
        if (type.length > 0) obj.name = 'or';
        else obj.name = 'array'
        return obj;
    }
    if (type === Function) {
        obj.name = 'function';
        return obj;
    }
    if (type === Object) {
        obj.name = 'object';
        return obj;
    }
    if (isEmptyObj(type)) {
        obj.name = 'object'
        return obj;
    }
    if (isFillObj(type)) {
        obj.name = 'and'
        return obj;
    }
    if (typeof type === 'number') {
        obj.name = 'number';
        obj.default = type;
        return obj;
    }
    if (typeof type === 'string') {
        obj.name = 'string';
        obj.default = type;
        return obj;
    }
    if (typeof type === 'boolean') {
        obj.name = 'boolean';
        obj.default = type;
        return obj;
    }
    if (typeof type === 'function') {
        obj.name = 'class';
        return obj;
    }
    if (typeof type === 'object') {
        obj.name = 'object';
        return obj;
    }
    throw new Error('타입이 존재하지 않습니다.');
}

function User() {};
function Corp() {this.nm = 1};

console.log('[String] :'+ _getTypeMap([String]).name );
console.log('[] :'+ _getTypeMap([] ).name);
console.log('Array :'+ _getTypeMap(Array ).name);
console.log('Object :'+ _getTypeMap(Object ).name);
console.log('{} :'+ _getTypeMap({} ).name);
console.log('{..} :'+ _getTypeMap({aa:0} ).name);
console.log('Function :'+ _getTypeMap(Function ).name);
console.log('User :'+ _getTypeMap(User ).name);
console.log('new User :'+ _getTypeMap(new User ).name);
console.log('new Corp :'+ _getTypeMap(new Corp ).name);
