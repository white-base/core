


function _isFillObj(obj)  {
    // if(typeof obj === 'object' && getAllProperties(obj).length > 0 && !(obj instanceof RegExp)) {
    if(_isObject(obj) && getAllProperties(obj).length > 0) {   // REVIEW: RegExp 빠져야 할듯!!
      return true;
    }
    return false;
}


console.log(0);