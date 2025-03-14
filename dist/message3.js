/*! logic Core v1.0.5 Copyright (c) 2025 logic and contributors */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: false
  }), e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: true,
      configurable: true,
      writable: true
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: true
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(true);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = false, next;
            return next.value = t, next.done = true, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: true
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: true
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = false, next;
      }
      return next.done = true, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = false, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = true;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, true);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, true);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

const ES010 = "Other errors";
const ES011 = "Failed to get module ['$1']";
const ES012 = "Failed to get function ['$1'()";
const ES013 = "[$1] failed to process [$2]";
const ES021 = "[$1] can only be of type [$2]";
const ES022 = "[$1] is an unprocessable typo";
const ES023 = "[$1] is not type [$2]";
const ES031 = "[$1] is not an object";
const ES032 = "[$1] is not an instance of [$2]";
const ES033 = "The object in [$1] is different from [$2]";
const ES041 = "[$1] is duplicated with [$2]";
const ES042 = "[$2] exists in [$1] and cannot measure [$3]";
const ES043 = "[$1] cannot be added because [$1] exists in [$1] ";
const ES044 = "[$1] is a reserved word ";
const ES051 = "Required value [$1] not found";
const ES052 = "[$1] requires [$2]";
const ES053 = "[$2] does not exist in [$1]";
const ES054 = "[$1] cannot be blanked";
const ES061 = "Exceeded the range [$2] of [$1]";
const ES062 = "[$1] cannot be less than [$2]";
const ES063 = "[$1] and [$2] have different lengths";
const ES064 = "and(&) condition check failed. $1";
const ES065 = "Or(|) condition check failed. $1";
const ES066 = "[$1] ranges from [$2] to [$3]";
const EL01100 = "----- util-type.js match -----";
const EL01101 = "Type match: You must specify a detailed type of $1.$1: $2";
const EL01102 = "Type match : target is not type '$1. tarType : $2";
const EL01103 = "Type match: cannot handle type";
const EL01110 = "----- match array -----";
const EL01111 = "Array match: target is not array type. tarType: $1";
const EL01112 = "Array match : array(_ANY_) type must have at least one element of target array. target.length = $1";
const EL01113 = "Array match: target array is less than array(_SEQ_) type length. extType.length = $1, target.length = $2";
const EL01114 = "Array match: array(_SEQ_) [$1]th literal type is different from target value. extType[$1] = $2, target[$1] = $3";
const EL01115 = "Array match: array(_SEQ_) [$1]th type check failed. extType[$1] = $2";
const EL01116 = "Array match : array(_REQ_) type must have at least one element of target array. target.length = $1";
const EL01117 = "Array match : array($1) is the type of array that cannot be handled";
const EL01118 = "Array match: array element check failed. extType: $1, tarType: $2";
const EL01120 = "----- match choice -----";
const EL01121 = "Choice match: 'undefined' is not available for choice(_ANY_) type";
const EL01122 = "Choice match: 'undefined' only for choice(_NON_) type";
const EL01123 = "Choice match: Error instance only for choice(_ERR_) type";
const EL01124 = "Choice match: choice(_EUM_) type details can only be literal. extType[$1]: $2";
const EL01125 = "Choice match: the first subtype of choice(_DEF_) type is literal only. extType[0]: $1";
const EL01126 = "Choice match : choice($1) is a type of choice that cannot be handled";
const EL01127 = "Choice match: choice detailed type check failed. extType: $1, tarType: $2";
const EL01130 = "----- match class -----";
const EL01131 = "Class match: Inspection failed after creating class type as union type (opt = 1)";
const EL01132 = "Class match: target is not an instance of [$1]";
const EL01133 = "Class match: target is not class, object, or union type. tarType: $1";
const EL01140 = "----- match union -----";
const EL01141 = "Union match: target is not union type. tarType: $1";
const EL01142 = "Union match: target['$1'] key does not exist. extType['$1'] = $2";
const EL01143 = "Union match: '$1' type check failed";
const EL01150 = "----- match function -----";
const EL01151 = "Function match: target is not function type. tarType: $1";
const EL01152 = "Function match: declared extType.name = '$1' and target name do not match: function.name = '$2'";
const EL01153 = "Function match : declared extType.func, target.func is not function type";
const EL01154 = "Function match: extType.func and target.func are different (proto check)";
const EL01155 = "Function match: You must set the params or return object of the target. extType.param = $1, extType.return = $2";
const EL01156 = "Function match: params acceptance test denied. <array(_SEQ_) conversion>";
const EL01157 = "Function Match: Return Acceptance Test Denied";
const EL01200 = "----- allow -----";
const EL01201 = "Type allowed: You must specify a subtype of $1.$1: $2";
const EL01202 = "Type allowed: different from type 1 literal value. extType = $2, tarType = $3";
const EL01203 = "Type allowed: not type $1. tarType = $2";
const EL01204 = "Type allowed: type not processable";
const EL01210 = "----- allow array -----";
const EL01211 = "Array permit: Not array type. tarType: $1";
const EL01212 = "Type allowed: array(_ALL_, _OPT_) type is not allowed for array(_ANY_) type. tarType: $1";
const EL01213 = "Allow array: Only array(_SEQ_) type is allowed for array(_SEQ_) type. tarType: $1";
const EL01214 = "Array permit: tarType must be equal to or greater than the length of array(_SEQ_) type of extType.length = $1, target.length = $2";
const EL01215 = "Array Allowance: array(_SEQ_) [$1]th type check failed";
const EL01216 = "Allow array : Do not allow array(_ALL_, _ANY_, _OPT_) type for array(_REQ_). tarType: $2";
const EL01217 = "Allow array: Do not allow array(_ALL_, _ANY_) type for array(_OPT_). tarType: $2";
const EL01218 = "Allow array : array($1) is the type of array that cannot be handled";
const EL01219 = "Array element check failed. extType: $1, tarType: $2";
const EL01220 = "----- allow choice -----";
const EL01221 = "Choice allowed: do not allow choice(_ERR_) type for choice(_ALL_). tarType: $1";
const EL01222 = "Choice allowed: 'undefined' type is not allowed for choice(_ANY_) type";
const EL01223 = "Choice allowed: choice(_NON_, _ERR_) type is not allowed for choice(_ANY_) type. tarType: $1";
const EL01224 = "Choice allowed: only choice(_NON_) type and choice(_NON_) type. tarType: $1";
const EL01225 = "Choice allowed: choice(_ERR_) type and choice(_ERR_) type only. tarType: $1";
const EL01226 = "Choice allowed: do not allow choice(_ALL_, _ANY_, _OPT_, _NON_, _ERR_) type for choice(_REQ_). tarType: $1";
const EL01227 = "Choice allowed: do not allow choice(_ALL_, _ANY_, _NON_, _ERR_) type for choice(_OPT_). tarType: $1";
const EL01228 = "Choice allowed: choice(_EUM_) type and choice(_EUM_) type only";
const EL01229 = "Choice allowed: choice(_EUM_) subtype can only be literal. extType[$1]: $2";
const EL0122A = "Choice allowed: the subtype of tarType choice(_EUM_) can only be literal. tarType[$1]: $2";
const EL0122B = "Choice allowed: choice(_DEF_) type and choice(_DEF_) type only";
const EL0122C = "Choice allowed: the first subtype of extType choice(_DEF_) is literal only. extType[0]: $1";
const EL0122D = "Choice allowed: the first subtype of tarType choice(_DEF_) is literal only. tarType[0]: $1";
const EL0122E = "Choice allowed: choice($1) is a type of choice that cannot be handled";
const EL0122F = "Choice allowed: tarType[$1] = $3, no extType allowed. extType = $2";
const EL01230 = "----- allow class -----";
const EL01231 = "Class allowed: ExtType, tarType class failed after creating a union type. (opt = 1)";
const EL01232 = "Class allowed: class to class denied. (opt = $1)";
const EL01233 = "Class allowed: Inspection failed after creating tarType class type as union type (opt = 1)";
const EL01234 = "Class allowed: class to union denied. (opt = $1)";
const EL01235 = "Class allowed: tarType is not class, union type. tarType: $1";
const EL01240 = "----- allow union -----";
const EL01241 = "Union allowed: tarType is not a union type. tarType: $1";
const EL01242 = "Union allowed: tarType['$1'] key does not exist. extType['$1'] = $2";
const EL01243 = "Union allowed: Type '$1' check failed";
const EL01250 = "----- allow function -----";
const EL01251 = "Allow function : tarType is not function type. tarType : $1";
const EL01252 = "Function allowed: declared extType.name = '$1' and target name do not match: function.name = '$2'";
const EL01253 = "Function allowed: declared extType.func, target.func is not of function type";
const EL01254 = "Function allowed: extType.func and target.func are different (proto check)";
const EL01255 = "Function permit: params or return object of tarType must be set. extType.param = $1, extType.return = $2";
const EL01256 = "Function permit: params permit test denied. <array(_SEQ_) conversion>";
const EL01257 = "Function Permitted: Return Permitted Test Denied";
const EL01300 = "----- util-type.js -----";
const EL01301 = "Parcing check: function is not a rule: '$1'";
const EL01302 = "Parcing inspection: function has no argument, body content. '$1'";
const EL01303 = "Parcing inspection: function parsing failed $1";
const EL01304 = "Type check: [$1] is a special type to handle";
const EL01305 = "Type check: array($1) type is a specular type that cannot be handled";
const EL01306 = "Type check: choice($1) type is a special type that cannot be handled";
const EL01307 = "Type check: array($1) type is a type that cannot be handled";
const EL01308 = "Type check: choice($1) type is a type that cannot be handled";
const EL01309 = "REVIEW:";
const EL0130A = "Type allowed: allowType (extType, tarType) scan failed";
const EL0130B = "Type match: matchtype (extType, target) check failed";
const EL0130C = "ctor is not function type. type aperture = $1";
const EL01400 = "----- util.js -----";
const EL01401 = "implements(ctor, obj, args..); ctor is not of type <function> == '$1'";
const EL01402 = "implements(ctor, obj, args..); obj is not of type <object> type of obj == '$1'";
const EL01403 = "implements(ctor, obj, args..); args[$1] is not type <function>. type of args[$1] == '$2'";
const EL01404 = "[$1] must implement type [$2]. $1._KIND = '$3'";
const EL01405 = "isImplementOf(target); target is of type <function, string> only. type of target = '$1'";
const EL01500 = "----- etc -----";
const EL01501 = "$1.$events is obejct type. type of $events $2";
const EL01502 = "$1.isLog is boolean type. type isLog $2";
const EL01503 = "on(event, listener); event is not of type <string> type of event == '$1'";
const EL01504 = "on(event, listener); listener is not of type <function> type of listener == '$1'";
const EL01505 = "once(event, listener); event is not of string type. typeof event == '$1'";
const EL01506 = "once(event, listener); listener 는 <function> 타입이 아닙니다. typeof listener == '$1'";
const EL01507 = "off(event, listener); event is not of type <string> type of event == '$1'";
const EL01508 = "off(event, listener); listener 는 <function> 타입이 아닙니다. typeof listener == '$1'";
const EL01509 = "emit(event); event is not of type <string> type of event == '$1'";
const EL01510 = "";
const EL02100 = "----- Interface.* -----";
const EL02110 = "----- i-object.js -----";
const EL02111 = "getType(): array<function> is an abstract method. [$1] must be implemented";
const EL02112 = "instanceOf(any): boolean is an abstract method. [$1] must be implemented";
const EL02113 = "equal(any): boolena is an abstract method. [$1] must be implemented";
const EL02120 = "----- i-marshal.js -----";
const EL02121 = "getObject(opt?, origin?) : object is abstract method. [$1] must be implemented";
const EL02122 = "setObject(mObj) is an abstract method. [$1] must be implemented";
const EL02130 = "----- i-element.js -----";
const EL02131 = "clone(): object is an abstract method. [$1] must be implemented";
const EL02140 = "----- i-list.js -----";
const EL02150 = "----- i-control-list.js -----";
const EL02151 = "add(key) is an abstract method. [$1] must be implemented";
const EL02152 = "del(key) is an abstract method. [$1] must be implemented";
const EL02153 = "has(key): boolean is an abstract method. [$1] must be implemented";
const EL02154 = "find(any): any is an abstract method. [$1] must be implemented";
const EL02160 = "----- i-collection.js -----";
const EL02161 = "add(any): boolean is an abstract method. [$1] must be implemented";
const EL02162 = "remove(elem): boolean is an abstract method. [$1] must be implemented";
const EL02163 = "cantains(any): boolean is an abstract method. [$1] must be implemented";
const EL02164 = "indexOf(any): number is an abstract method. [$1] must be implemented";
const EL02170 = "----- i-collection-array.js -----";
const EL02171 = "insertAt(pos, val, ..): boolean is an abstract method. [$1] must be implemented";
const EL02180 = "----- i-collection-property.js -----";
const EL02181 = "indexToKey(idx): string is an abstract method. [$1] must be implemented";
const EL02190 = "----- i-serialize.js -----";
const EL02191 = "output(opt, ...): string is an abstract method. [$1] must be implemented";
const EL02192 = "load(any, ...) is an abstract method. [$1] must be implemented";
const EL02300 = "----- Meta.Entity.* -----";
const EL03100 = "----- Meta.* -----";
const EL03110 = "----- meta-object.js -----";
const EL03111 = "You cannot create abstract, interface, enum type. $1['_KIND'] = '$2'";
const EL03112 = "setObject(oGuid, origin); oGuid 는 'object' 타입입니다. typeof oGuid = '$1'";
const EL03113 = "setObject(oGuid, origin); different namespaces. this._type = $1, oGuid._type = $2";
const EL03114 = "setObject(oGuid, origin); origin 은 Guid 객체가 아닙니다. origin._type = '$1', origin._guid = '$2'";
const EL03120 = "----- meta-element.js -----";
const EL03121 = "$name;val is of type 'string'. type of valve = '$1'";
const EL03122 = "$name; val.length must be greater than 0";
const EL03200 = "----- meta-registry.js -----";
const EL03211 = "register(meta); the meta to register is not a Guide object. meta._type = '$1', meta._guid = '$2'";
const EL03212 = "register(meta); meta._guid to register is already registered. meta._guid = '$1'";
const EL03213 = "release(meta); the meta to release is string(guid) | object(guid) type only. type of meta = '$1'";
const EL03220 = "----- create -----";
const EL03221 = "createMetaObject(oGuid, origin); oGuid can only be of type 'object'. typeof oGuid = '$1'";
const EL03222 = "createMetaObject(oGuid, origin); oGuid._type 은 'string' 타입만 가능합니다.(length > 0) typeof oGuid._type = '$1'";
const EL0323 = "path(ns); failed to get the namespace path";
const EL03224 = "createMetaObject(oGuid, origin);[$1] Namespace is not of type 'function'. type of coClass = '$2'";
const EL03225 = "createReferObject(meta); meta can only be of type 'object'. type of meta = '$1'";
const EL03226 = "createReferObject(meta); meta._guid 은 'string' 타입만 가능합니다.(length > 0) typeof meta._guid = '$1'";
const EL03227 = "createNsReferObject(fun); fun is not type 'function'. type of fun = '$1'";
const EL03230 = "----- ns Class -----";
const EL03231 = "register Class(fun, ns, key); fun is not of type 'function'. type of fun = '$1'";
const EL03232 = "registerClass(fun, ns, key); ns is not of type 'string'. typeofns = '$1'";
const EL03233 = "register Class(fun, ns, key); key is not of type 'string'. type of key = '$1'";
const EL03234 = "releaseClass(fullName); fullName 은 'string' 타입만 가능합니다.(length > 0) typeof fullName = '$1'";
const EL03235 = "findClass(fun); fun is not type 'function'. type of fun = '$1'";
const EL03236 = "getClass(fullName); fullName can only be of type 'string' (length > 0) type of fullName = '$1'";
const EL03240 = "----- set, transform, load -----";
const EL03241 = "setMetaObject(oGuid, meta); oGuid can only be of type 'object'. typeof oGuid = '$1'";
const EL0324 = "setMetaObject(oGuid, meta); meta can only be of type 'object'. type of meta = '$1'";
const EL03243 = "setMetaObject(meta); meta._guid can only be of type 'string' (length > 0) type of meta._guid = '$1'";
const EL03244 = "transformRefer(oGuid); oGuid can only be of type 'object'. type oGuid = '$1'";
const EL03245 = "transformRefer(oGuid); $1['$2']['$ns'] is not of type 'function'";
const EL03246 = "loadMetaObject(str, path?); str is only of type 'string'. typeof str = '$1'";
const EL03247 = "loadMetaObject(str, path?); The object parsed str is not a Guide object. obj._type = '$1', obj._guid = '$2'";
const EL03250 = "----- has, valid, find -----";
const EL03251 = "validObject(oGuid); oGuid is only of type 'object'. typeof oGuid = '$1'";
const EL03252 = "hasGuidObject(oGuid, origin); guid can only be of type 'string' (length > 0) type of guid = '$1'";
const EL03253 = "hasGuidObject(oGuid, origin); origin[$1]는 'object' 타입이 아닙니다. typeof origin[$1] = '$2'";
const EL03254 = "hasRefer(oGuid); oGuid can only be of type 'object'. typeof oGuid = '$1'";
const EL03255 = "hasRefer(oGuid); oGuid is not a Guide object. oGuid._type = '$1', oGuid._guid = '$2'";
const EL03256 = "findSetObject(oGuid, origin); [ oGuid._guid | oGuid ]는 'string' 타입만 가능합니다.(length > 0) guid = '$1'";
const EL03257 = "findSetObject(oGuid, origin); origin can only be of type 'object'. typeof origin = '$1'";
const EL03300 = "----- namespace-manager.js -----";
const EL03310 = "----- private function, proterty -----";
const EL03311 = "NamespaceManager.allowOverlap 은  'boolean' 타입만 가능합니다. typeof allowOverlap = $1";
const EL03312 = "_getArray(ns); ns is not a valid namespace name rule. ns = $1";
const EL03313 = "_getArray(ns); ns type is 'string', 'array<string>' only typeofns = $1";
const EL03314 = "_getArray(ns); ns[$1] is not type 'string'. typeofns[$1] = $2";
const EL03315 = "_getArray(ns); ns[$1] is not a valid name rule. ns[$1] = $1";
const EL03320 = "----- addNamespace, delNamespace, path -----";
const EL0321 = "addNamespace(ns); addition of namespace failed";
const EL03322 = "delNamespace(ns); Namespace deletion failed";
const EL03330 = "----- add, del -----";
const EL03331 = "add(fullName,lem); [$1] is not a valid name rule";
const EL03332 = "add(fullName,lem);lem is already registered. Allow duplicate [this.allowOverlap = 'true']";
const EL03333 = "add(fullName,lem); failed to register elements in the namespace";
const EL03334 = "del(fullName); Failed to delete element in Namespace";
const EL03340 = "----- getPath, output, load -----";
const EL03341 = "getPath(elem); no element value. typeoflem = $1";
const EL03342 = "output (stringify, space); Namespace export failed. $1";
const EL03343 = "load(str, path); str is not type 'string'. typeofstr = $1";
const EL03344 = "load(str, path); Namespace loading failed. $1";
const EL04100 = "----- Collection.* -----";
const EL04110 = "----- base-collection.js -----";
const EL04111 = "_remove(idx): boolean is an abstract method. Must be implemented";
const EL04112 = "setObject(oGuid, origin); _owner connection of oGuid failed. guid = $1";
const EL04113 = "removeAt(idx); idx is not type 'number'. typeof idx = $1";
const EL04114 = "add(any): number is an abstract method. must be implemented";
const EL04115 = "clear() is an abstract method. must be implemented";
const EL04116 = "map(callback); callback is not function type. type of callback = $1";
const EL04117 = "filter(callback); callback is not function type. type of callback = $1";
const EL04118 = "reduce(callback); callback is not function type. type of callback = $1";
const EL04119 = "find(callback); callback is not function type. type of callback = $1";
const EL041110 = "forEach(callback); callback is not function type. type of callback = $1";
const EL041111 = "Some(callback); callback is not function type. type of callback = $1";
const EL041112 = "Every(callback); callback is not function type. type of callback = $1";
const EL041113 = "findIndex(callback); callback 이 function 타입이 아닙니다. typeof callback = $1";
const EL04200 = "";
const EL04210 = "----- collection-array.js -----";
const EL04211 = "_elements connection failed for setObject(oGuid, origin); oGuid['_elem'][$1]: guid = $2";
const EL04212 = "insertAt(pos, value, desc); pos is not type 'number'. typeof pos = $1";
const EL04213 = "insertAt(pos, value, desc); pos cannot be greater than this.count.pos = $1, count = $2";
const EL04214 = "insertAt(pos, value, desc); pos cannot be less than 0. pos = $1";
const EL04215 = "insertAt(pos, value, desc); registration failed. pos = $1, value = $2";
const EL04220 = "----- collection-property.js -----";
const EL04221 = "setObject(oGuid, origin); oGuid['_lem'].length = $1 length and oGuid['_key'].length = $2 length are different";
const EL04222 = "setObject(oGuid, origin); oGuid['_elem'].length = $1 length and oGuid['_desc'].length = $2 length are different";
const EL04223 = "setObject(oGuid, origin); oGuid._elem[$1] guid not found. guid = $2";
const EL04224 = "indexOf(obj, isKey); if the index value is found by key, obj must be of type 'string'. typeof obj = $1";
const EL04225 = "add(name, value, desc); name is not of type 'string'. type of name = $1";
const EL04226 = "add(name, value, desc); name = '$1' is not valid for name rule. Rule = '$2'";
const EL04227 = "add(name, value, desc); name = '$1' is the reserved word";
const EL04228 = "add(name, value, desc); name = '$1' is duplicated with existing name";
const EL04229 = "add(name, value, desc); addition failed. name = '$1', value = '$2'";
const EL0422A = "indexToKey(idx); idx is not of type 'number'. typeof idx = $1";
const EL0422B = "exists(key); key is not of type 'string' (length > 0) type of key = $1";
const EL04300 = "";
const EL04310 = "----- collection-transaction.js -----";
const EL04311 = "$1.autoChanges 는 'boolean' 타입입니다. typeof aucoChanges = '$2'";
const EL04320 = "----- trans-queue.js -----";
const EL04321 = "collection value is not an instance that inherited [MetaObject]";
const EL04322 = "collection is not an instance of [ArrayCollection]";
const EL04323 = "rollback(); '$1' is an unprocessable cmd";
const WS011 = "[$1] Destination [$2] cannot be deleted";
const EN = "END";
var defaultCode = {
	ES010: ES010,
	ES011: ES011,
	ES012: ES012,
	ES013: ES013,
	ES021: ES021,
	ES022: ES022,
	ES023: ES023,
	ES031: ES031,
	ES032: ES032,
	ES033: ES033,
	ES041: ES041,
	ES042: ES042,
	ES043: ES043,
	ES044: ES044,
	ES051: ES051,
	ES052: ES052,
	ES053: ES053,
	ES054: ES054,
	ES061: ES061,
	ES062: ES062,
	ES063: ES063,
	ES064: ES064,
	ES065: ES065,
	ES066: ES066,
	EL01100: EL01100,
	EL01101: EL01101,
	EL01102: EL01102,
	EL01103: EL01103,
	EL01110: EL01110,
	EL01111: EL01111,
	EL01112: EL01112,
	EL01113: EL01113,
	EL01114: EL01114,
	EL01115: EL01115,
	EL01116: EL01116,
	EL01117: EL01117,
	EL01118: EL01118,
	EL01120: EL01120,
	EL01121: EL01121,
	EL01122: EL01122,
	EL01123: EL01123,
	EL01124: EL01124,
	EL01125: EL01125,
	EL01126: EL01126,
	EL01127: EL01127,
	EL01130: EL01130,
	EL01131: EL01131,
	EL01132: EL01132,
	EL01133: EL01133,
	EL01140: EL01140,
	EL01141: EL01141,
	EL01142: EL01142,
	EL01143: EL01143,
	EL01150: EL01150,
	EL01151: EL01151,
	EL01152: EL01152,
	EL01153: EL01153,
	EL01154: EL01154,
	EL01155: EL01155,
	EL01156: EL01156,
	EL01157: EL01157,
	EL01200: EL01200,
	EL01201: EL01201,
	EL01202: EL01202,
	EL01203: EL01203,
	EL01204: EL01204,
	EL01210: EL01210,
	EL01211: EL01211,
	EL01212: EL01212,
	EL01213: EL01213,
	EL01214: EL01214,
	EL01215: EL01215,
	EL01216: EL01216,
	EL01217: EL01217,
	EL01218: EL01218,
	EL01219: EL01219,
	EL01220: EL01220,
	EL01221: EL01221,
	EL01222: EL01222,
	EL01223: EL01223,
	EL01224: EL01224,
	EL01225: EL01225,
	EL01226: EL01226,
	EL01227: EL01227,
	EL01228: EL01228,
	EL01229: EL01229,
	EL0122A: EL0122A,
	EL0122B: EL0122B,
	EL0122C: EL0122C,
	EL0122D: EL0122D,
	EL0122E: EL0122E,
	EL0122F: EL0122F,
	EL01230: EL01230,
	EL01231: EL01231,
	EL01232: EL01232,
	EL01233: EL01233,
	EL01234: EL01234,
	EL01235: EL01235,
	EL01240: EL01240,
	EL01241: EL01241,
	EL01242: EL01242,
	EL01243: EL01243,
	EL01250: EL01250,
	EL01251: EL01251,
	EL01252: EL01252,
	EL01253: EL01253,
	EL01254: EL01254,
	EL01255: EL01255,
	EL01256: EL01256,
	EL01257: EL01257,
	EL01300: EL01300,
	EL01301: EL01301,
	EL01302: EL01302,
	EL01303: EL01303,
	EL01304: EL01304,
	EL01305: EL01305,
	EL01306: EL01306,
	EL01307: EL01307,
	EL01308: EL01308,
	EL01309: EL01309,
	EL0130A: EL0130A,
	EL0130B: EL0130B,
	EL0130C: EL0130C,
	EL01400: EL01400,
	EL01401: EL01401,
	EL01402: EL01402,
	EL01403: EL01403,
	EL01404: EL01404,
	EL01405: EL01405,
	EL01500: EL01500,
	EL01501: EL01501,
	EL01502: EL01502,
	EL01503: EL01503,
	EL01504: EL01504,
	EL01505: EL01505,
	EL01506: EL01506,
	EL01507: EL01507,
	EL01508: EL01508,
	EL01509: EL01509,
	EL01510: EL01510,
	EL02100: EL02100,
	EL02110: EL02110,
	EL02111: EL02111,
	EL02112: EL02112,
	EL02113: EL02113,
	EL02120: EL02120,
	EL02121: EL02121,
	EL02122: EL02122,
	EL02130: EL02130,
	EL02131: EL02131,
	EL02140: EL02140,
	EL02150: EL02150,
	EL02151: EL02151,
	EL02152: EL02152,
	EL02153: EL02153,
	EL02154: EL02154,
	EL02160: EL02160,
	EL02161: EL02161,
	EL02162: EL02162,
	EL02163: EL02163,
	EL02164: EL02164,
	EL02170: EL02170,
	EL02171: EL02171,
	EL02180: EL02180,
	EL02181: EL02181,
	EL02190: EL02190,
	EL02191: EL02191,
	EL02192: EL02192,
	EL02300: EL02300,
	EL03100: EL03100,
	EL03110: EL03110,
	EL03111: EL03111,
	EL03112: EL03112,
	EL03113: EL03113,
	EL03114: EL03114,
	EL03120: EL03120,
	EL03121: EL03121,
	EL03122: EL03122,
	EL03200: EL03200,
	EL03211: EL03211,
	EL03212: EL03212,
	EL03213: EL03213,
	EL03220: EL03220,
	EL03221: EL03221,
	EL03222: EL03222,
	EL0323: EL0323,
	EL03224: EL03224,
	EL03225: EL03225,
	EL03226: EL03226,
	EL03227: EL03227,
	EL03230: EL03230,
	EL03231: EL03231,
	EL03232: EL03232,
	EL03233: EL03233,
	EL03234: EL03234,
	EL03235: EL03235,
	EL03236: EL03236,
	EL03240: EL03240,
	EL03241: EL03241,
	EL0324: EL0324,
	EL03243: EL03243,
	EL03244: EL03244,
	EL03245: EL03245,
	EL03246: EL03246,
	EL03247: EL03247,
	EL03250: EL03250,
	EL03251: EL03251,
	EL03252: EL03252,
	EL03253: EL03253,
	EL03254: EL03254,
	EL03255: EL03255,
	EL03256: EL03256,
	EL03257: EL03257,
	EL03300: EL03300,
	EL03310: EL03310,
	EL03311: EL03311,
	EL03312: EL03312,
	EL03313: EL03313,
	EL03314: EL03314,
	EL03315: EL03315,
	EL03320: EL03320,
	EL0321: EL0321,
	EL03322: EL03322,
	EL03330: EL03330,
	EL03331: EL03331,
	EL03332: EL03332,
	EL03333: EL03333,
	EL03334: EL03334,
	EL03340: EL03340,
	EL03341: EL03341,
	EL03342: EL03342,
	EL03343: EL03343,
	EL03344: EL03344,
	EL04100: EL04100,
	EL04110: EL04110,
	EL04111: EL04111,
	EL04112: EL04112,
	EL04113: EL04113,
	EL04114: EL04114,
	EL04115: EL04115,
	EL04116: EL04116,
	EL04117: EL04117,
	EL04118: EL04118,
	EL04119: EL04119,
	EL041110: EL041110,
	EL041111: EL041111,
	EL041112: EL041112,
	EL041113: EL041113,
	EL04200: EL04200,
	EL04210: EL04210,
	EL04211: EL04211,
	EL04212: EL04212,
	EL04213: EL04213,
	EL04214: EL04214,
	EL04215: EL04215,
	EL04220: EL04220,
	EL04221: EL04221,
	EL04222: EL04222,
	EL04223: EL04223,
	EL04224: EL04224,
	EL04225: EL04225,
	EL04226: EL04226,
	EL04227: EL04227,
	EL04228: EL04228,
	EL04229: EL04229,
	EL0422A: EL0422A,
	EL0422B: EL0422B,
	EL04300: EL04300,
	EL04310: EL04310,
	EL04311: EL04311,
	EL04320: EL04320,
	EL04321: EL04321,
	EL04322: EL04322,
	EL04323: EL04323,
	WS011: WS011,
	EN: EN
};

var localesPath = './locales'; // 상대 경로

//==============================================================
// 2. module dependency check
//==============================================================
// 3. module implementation       
/**
 * @class Message
 * @description 메시지 코드 관리 클래스 (static)
 */
// inner function
function _isObject(obj) {
  return obj && _typeof(obj) === 'object' && !Array.isArray(obj);
}
function deepMerge(target, source) {
  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      var targetValue = target[key];
      var sourceValue = source[key];
      if (_isObject(sourceValue)) {
        if (!_isObject(targetValue)) {
          target[key] = {};
        }
        target[key] = deepMerge(target[key], sourceValue);
      } else {
        target[key] = sourceValue;
      }
    }
  }
  return target;
}
function loadJSON(_x) {
  return _loadJSON.apply(this, arguments);
}
function _loadJSON() {
  _loadJSON = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(filePath) {
    var isNode, isESM, response;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null && typeof navigator === 'undefined';
          isESM = false;
          if (typeof require === 'undefined') {
            isESM = true; // require가 없으면 ESM으로 판단
          }

          // try {
          //     isESM = typeof import.meta !== 'undefined';
          // } catch (error) {
          //     isESM = false;
          // }
          if (!isNode) {
            _context3.next = 13;
            break;
          }
          if (!isESM) {
            _context3.next = 10;
            break;
          }
          _context3.next = 7;
          return import(filePath, { assert: { type: 'json' } });
        case 7:
          return _context3.abrupt("return", _context3.sent.default);
        case 10:
          return _context3.abrupt("return", require(filePath));
        case 11:
          _context3.next = 19;
          break;
        case 13:
          _context3.next = 15;
          return fetch(filePath);
        case 15:
          response = _context3.sent;
          _context3.next = 18;
          return response.json();
        case 18:
          return _context3.abrupt("return", _context3.sent);
        case 19:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _loadJSON.apply(this, arguments);
}
function _getLocale() {
  var locale = "";
  if (typeof window !== "undefined" && typeof navigator !== "undefined") {
    var _navigator$languages;
    // 브라우저 환경
    var lang = ((_navigator$languages = navigator.languages) === null || _navigator$languages === void 0 ? void 0 : _navigator$languages[0]) || navigator.language || Intl.DateTimeFormat().resolvedOptions().locale;
    locale = lang.split(/[_-]/)[0]; // "ko-KR" -> "ko"
  } else if (typeof process !== "undefined") {
    // Node.js 환경
    var rawLocale = process.env.LANG || process.env.LC_ALL || process.env.LANGUAGE;
    if (rawLocale) {
      locale = rawLocale.split(/[:_.]/)[0].replace("_", "-"); // "ko_KR.UTF-8" -> "ko"
    }
  }
  return locale || 'en';
}
var Message = /*#__PURE__*/function () {
  function Message() {
    _classCallCheck(this, Message);
  }
  return _createClass(Message, null, [{
    key: "_replacePlaceholders",
    value: function _replacePlaceholders(p_template, p_values) {
      var namedValues = {},
        indexedValues = [];
      if (Array.isArray(p_values)) indexedValues = p_values;else if (_typeof(p_values) === 'object') namedValues = p_values;

      // `${변수명}` 치환
      p_template = p_template.replace(/\$\{(\w+)\}/g, function (match, key) {
        return namedValues.hasOwnProperty(key) ? namedValues[key] : match;
      });
      // `$1, $2` 치환
      p_template = p_template.replace(/\$(\d+)/g, function (match, index) {
        var i = parseInt(index, 10) - 1;
        return indexedValues[i] !== undefined ? indexedValues[i] : match;
      });
      return p_template;
    }
  }, {
    key: "_getMessageByCode",
    value: function _getMessageByCode(p_msg, p_path) {
      if (_isObject(p_msg)) {
        deepMerge($storage.lang.default, p_msg);
        $storage.path.push(p_path);
      }
    }
  }, {
    key: "changeLanguage",
    value: function () {
      var _changeLanguage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(p_lang) {
        var i, localPath, msg;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              i = 0;
            case 1:
              if (!(i < $storage.path.length)) {
                _context.next = 11;
                break;
              }
              localPath = $storage.path[i];
              _context.next = 5;
              return loadJSON("".concat(localPath, "/").concat(p_lang, ".json"));
            case 5:
              msg = _context.sent;
              $storage.lang[p_lang] = $storage.lang[p_lang] || {};
              // if (typeof $storage.lang[p_lang] === 'undefined') $storage.lang[p_lang] = {};

              if (_typeof(msg) === 'object') deepMerge($storage.lang[p_lang], msg);else console.warn("Path '".concat(localPath, "/").concat(p_lang, "' does not have a file."));
            case 8:
              i++;
              _context.next = 1;
              break;
            case 11:
              currentLang = p_lang;
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function changeLanguage(_x2) {
        return _changeLanguage.apply(this, arguments);
      }
      return changeLanguage;
    }()
  }, {
    key: "get",
    value: function get(p_code, p_values) {
      var msg = Message._getMessageByCode(p_code);
      var result;
      if (typeof msg === 'undefined') {
        return "There is no message for code '".concat(p_code, "'.");
      }
      result = Message._replacePlaceholders(msg, p_values);
      return result;
    }
  }, {
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var locale;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!autoDetect) {
                _context2.next = 4;
                break;
              }
              locale = _getLocale();
              // lang = locale.split('-')[0];
              _context2.next = 4;
              return Message.changeLanguage(locale);
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function init() {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }]);
}();
_defineProperty(Message, "_NS", 'Common');
_defineProperty(Message, "$storage", {
  lang: {
    default: {}
  },
  path: []
});
_defineProperty(Message, "autoDetect", true);
_defineProperty(Message, "defaultLang", 'default');
_defineProperty(Message, "autoDetect", defaultLang);
Message.importMessage(defaultCode, localesPath);

exports.Message = Message;
exports.default = Message;
