function CustomError(message, fileName, lineNumber) {
    var instance = new Error(message, fileName, lineNumber);
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }
  CustomError.prototype = Object.create(Error.prototype, {
    constructor: {
      value: Error,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (Object.setPrototypeOf){
      Object.setPrototypeOf(CustomError, Error);
  } else {
      CustomError.__proto__ = Error;
  }



  var e = new CustomError();

  console.log(0);