/**** message-code.js | _L.messageCode.core ****/

//==============================================================
// 1. import module
//==============================================================
// 2. module dependency check
//==============================================================

/**
 * @type {Object} MessageCode
 * @property {Object} en
 * @property {Object} ko
 */
const messageCode = {
    en: {

        // Failed
        ES010: 'Other errors',
        ES011: 'Failed to get module ["$1"]',
        ES012: 'Failed to get function ["$1"()',
        ES013: '[$1] failed to process [$2]',
        // Type
        ES021: '[$1] is only for type [$2]',
        ES022: '[$1] is an unprocessable type,',
        ES023: '[$1] is not type [$2]',
        // Object
        ES031: '[$1] is not an object',
        ES032: '[$1] is not an instance of [$2]',
        ES033: 'The object in [$1] is different from [$2]',
        // Overlapping
        ES041: '[$1] is duplicated with [$2]',
        ES042: '[$2] exists in [$1] and cannot measure [$3], ',
        ES043: '[$1] cannot be added because [$1] exists in [$1], ',
        ES044: '[$1] is a reserved word,',
        // Required
        ES051: 'Required value [$1] not found',
        ES052: '[$1] requires [$2]',
        ES053: '[$1] does not have [$2]',
        ES054: '[$1] cannot be entered blank',
        // Scope
        ES061: 'Exceeded the range [$2] of [$1]',
        ES062: '[$1] cannot be less than [$2]',
        ES063: '[$1] and [$2] have different lengths,',
        ES064: 'and(&&) condition check failed. $1',
        ES065: 'Or(|) condition check failed. $1',
        ES066: '[$1] can range from [$2] to [$3],',
        // Common.*.
        // util-type : match
        EL01100: 'util-type.js match',
        EL01101: 'Type match: You must specify a detailed type of $1.$1: $2',
        EL01102: 'Type match: target is not of type \'$1\' tarType: $2',
        EL01103: 'Type match: cannot handle type',
        // match array
        EL01110: '',
        EL01111: 'Array match: target is not array type. tarType: $1',
        EL01112: 'Array match : array(_ANY_) type must have at least one element of target array. target.length = $1',
        EL01113: 'Array match: target array is less than array(_SEQ_) type length. extType.length = $1, target.length = $2',
        EL01114: 'Array match: array(_SEQ_) [$1]th literal type is different from target value. extType[$1] = $2, target[$1] = $3',
        EL01115: 'Array match: array(_SEQ_) [$1]th type check failed. extType[$1] = $2',
        EL01116: 'Array match : array(_REQ_) type must have at least one element of target array. target.length = $1',
        EL01117: 'Array match : array($1) is the type of array that cannot be handled',
        EL01118: 'Array match: array element check failed. extType: $1, tarType: $2',
        // match choice
        EL01120: '',
        EL01121: 'Choice match: You cannot use \'undefined\' for choice(_ANY_) type',
        EL01122: 'Choice match: only \'undefined\' for choice(_NON_) type',
        EL01123: 'Choice match: Error instance only for choice(_ERR_) type',
        EL01124: 'Choice match: choice(_EUM_) type details can only be literal. extType[$1]: $2',
        EL01125: 'Choice match: choice(_DEF_) type 1 detail type can only be literal. extType[0]: $1',
        EL01126: 'Choice match : choice($1) is a type of choice that cannot be handled',
        EL01127: 'Choice match: choice detailed type check failed. extType: $1, tarType: $2',
        // match class
        EL01130: '',
        EL01131: 'Class Match: Failed to inspect after creating class type as union type (opt = 1',
        EL01132: 'Class match: target is not an instance of [$1]',
        EL01133: 'Class match: target is not class, object, or union type. tarType: $1',
        // match union
        EL01140: '',
        EL01141: 'Union match: target is not union type. tarType: $1',
        EL01142: 'Union match: target[\'$1\'] key does not exist. extType[\'$1\'] = $2',
        EL01143: 'Union match : \'$1\' type check failed',
        // match function
        EL01150: '',
        EL01151: 'Function match: target is not function type. tarType: $1',
        EL01152: 'Function match: declared extType.name = \'$1\' and target name do not match: function.name = \'$2\'',
        EL01153: 'Function match : declared extType.func, target.func is not function type',
        EL01154: 'Function match: extType.func and target.func are different (proto check)',
        EL01155: 'Function match: You must set the params or return object of the target. extType.param = $1, extType.return = $2',
        EL01156: 'Function match: params acceptance test rejected. <array(_SEQ_) conversion>',
        EL01157: 'Function match: return tolerance test rejected',
        // allow
        EL01200: '',
        EL01201: 'Allow Type: $1 must be specified in detail. $1: $2',
        EL01202: 'Type allowed: different from type 1 literal value. extType = $2, tarType = $3',
        EL01203: 'Type allowed: not type $1. tarType = $2',
        EL01204: 'Type allowed: type not processable',
        // allow array
        EL01210: '',
        EL01211: 'Array allowed: not array type. tarType: $1',
        EL01212: 'Allow type : Do not allow type array(_ALL_, _OPT_) for type array(_ANY_). tarType : $1',
        EL01213: 'Array allowed: only array(_SEQ_) type is allowed for array(_SEQ_) type. tarType: $1',
        EL01214: 'Allow array: The tarType must be equal to or greater than the length of the array(_SEQ_) of the extType.length = $1, target.length = $2',
        EL01215: 'Array allowed: array(_SEQ_) [$1]th type check failed',
        EL01216: 'Array allowed: array(_ALL_, _ANY_, _OPT_) type not allowed for array(_REQ_). tarType: $2',
        EL01217: 'Allow array: Do not allow array(_ALL_, _ANY_) type for array(_OPT_), tarType: $2',
        EL01218: 'Array allowed: array($1) is of a type of array that cannot be handled',
        EL01219: 'Array element inspection failed. extType: $1, tarType: $2',
        // allow choice 
        EL01220: '',
        EL01221: 'Choice allowed: do not allow choice(_ERR_) type for choice(_ALL_). tarType: $1',
        EL01222: 'Choice allowed: type \'undefined\' cannot be used for choice(_ANY_) type',
        EL01223: 'Choice allowed: do not allow choice(_NON_, _ERR_), \'undefined\' for choice(_ANY_) type. tarType: $1',
        EL01224: 'Choice allowed: only choice(_NON_) type and choice(_NON_) type. tarType: $1',
        EL01225: 'Choice allowed: choice(_ERR_) type and choice(_ERR_) type only. tarType: $1',
        EL01226: 'Choice allowed: do not allow choice(_ALL_, _ANY_, _OPT_, _NON_, _ERR_) type for choice(_REQ_). tarType: $1',
        EL01227: 'Choice allowed: do not allow choice(_ALL_, _ANY_, _NON_, _ERR_) type for choice(_OPT_). tarType: $1',
        EL01228: 'Choice allowed: choice(_EUM_) type and choice(_EUM_) type only',
        EL01229: 'Choice allowed: choice(_EUM_) subtype can only be literal. extType[$1]: $2',
        EL0122A: 'Choice allowed: tarType choice (_EUM_) can only be literal. tarType[$1]: $2',
        EL0122B: 'Choice allowed: choice(_DEF_) type and choice(_DEF_) type only',
        EL0122C: 'Choice allowed: extType choice(_DEF_) first subtype can only be literal. extType[0]: $1',
        EL0122D: 'Choice allowed: the first subtype of tarType choice(_DEF_) is literal only. tarType[0]: $1',
        EL0122E: 'Choice allowed: choice($1) is a type of choice that cannot be handled',
        EL0122F: 'Choice allowed: tarType[$1] = $3, no extType allowed. extType = $2',
        // allow class
        EL01230: '',
        EL01231: 'Class allowed: ExtType, tarType class type failed after creating union type. (opt = 1)',
        EL01232: 'Class allowed: class to class denied. (opt = $1)',
        EL01233: 'Class allowed: failed inspection after creating tarType class type as union type (opt = 1',
        EL01234: 'Class allowed: class to union denied. (opt = $1)',
        EL01235: 'Allow class: tarType is not class, union type: tarType: $1',
        // allow union
        EL01240: '',
        EL01241: 'Union allowed: tarType is not a union type. tarType: $1',
        EL01242: 'Union allowed: tarType[\'$1\'] key does not exist. extType[\'$1\'] = $2',
        EL01243: 'Union allowed :\'$1\' type check failed',
        // allow function
        EL01250: '',
        EL01251: 'Allow function : tarType is not function type. tarType : $1',
        EL01252: 'Function allowed: declared extType.name = \'$1\' and target name do not match: function.name = \'$2\'',
        EL01253: 'Function allowed: declared extType.func, target.func is not of function type',
        EL01254: 'Function allowed: extType.func and target.func are different (proto check)',
        EL01255: 'Function permit: params or return object of tarType must be set. extType.param = $1, extType.return = $2',
        EL01256: 'Function permit: params permit test rejected. <array(_SEQ_) conversion>',
        EL01257: 'Function Allowance: Return Acceptance Test Denied',
        // etc
        // util-type.js
        EL01300: '',
        EL01301: 'Parcing check: function is not a rule. $1',
        EL01302: 'Parcing inspection: function has no argument, body content. $1',
        EL01303: 'Parcing inspection: function parsing failed $1',
        EL01304: 'Type check: [$1] is a special type to handle',
        EL01305: 'Type inspection: array($1) type is a specular type that cannot be handled',
        EL01306: 'Type check: choice($1) type is a special type that cannot be handled',
        EL01307: 'Type check: array($1) type is a type that cannot be handled',
        EL01308: 'Type check: choice($1) type is a type that cannot be handled',
        // EL01309: '',
        EL0130A: 'Allow Type: allowType (extType, tarType) scan failed',
        EL0130B: 'Type match: matchtype (extType, target) check failed',
        EL0130C: 'ctor is not function type. type aperture = $1',
        // util.js
        EL01400: '',
        EL01401: 'implements(ctor, obj, args..); ctor is not of type <function>. typeofctor == \'$1\'',
        EL01402: 'implements(ctor, obj, args..); obj is not of type <object> type of obj == \'$1\'',
        EL01403: 'implements(ctor, obj, args..); args[$1] is not type <function>: type of args[$1] == \'$2\'',
        EL01404: '[$1] must implement type [$2]. $1._KIND = \'$3\'',
        EL01405: 'isImplementOf(target); target is of type <function, string> only. type of target = \'$1\'',
        // etc
        EL01500: '',
        // observer.js
        // REVIEW: Full change
        // EL01511: 'new Observer(caller); caller is not of type \'object\. typeofcaller = $1',
        // EL01512: 'Observer.isLog is not of type \'boolean\. type isLog = $1',
        // EL01513: 'Observer.isSingleMode is not of type \'boolean\. typeofisSingleMode = $1',
        // EL01514: 'Observer._$subscribers value is not of type \'object\. typeof__$subscribers = $1',
        // EL01515: 'Observer.__$subscribers[\'any\'] object missing: {any: undefined}',
        // EL01516: 'subscription(fn, code); fn is not of type \'function\. typeoffn = $1',
        EL01501: '$1.$events is obejct. type of $events $2',
        EL01502: '$1.isLog is boolean type. type isLog $2',
        EL01503: 'on(event, listener); event is not of type <string> type of event == \'$1\'',
        EL01504: 'on(event, listener); listener is not of type <function> type of listener == \'$1\'',
        EL01505: 'once(event, listener); event is not of string type. typeof event == \'$1\'',
        EL01506: 'once(event, listener); listener 는 <function> 타입이 아닙니다. typeof listener == \'$1\'',
        EL01507: 'off(event, listener); event is not of type <string> type of event == \'$1\'',
        EL01508: 'off(event, listener); listener 는 <function> 타입이 아닙니다. typeof listener == \'$1\'',
        EL01509: 'emit(event); event is not of type <string> type of event == \'$1\'',
        EL01510: '',
        // Interface.*.
        // EL02
        EL02100: '',
        // i-object.js
        EL02110: '',
        EL02111: 'getType(): array<function> is an abstract method. [$1] must be implemented',
        EL02112: 'instanceOf(any): boolean is an abstract method. [$1] must be implemented',
        EL02113: 'equal(any): boulena is an abstract method. [$1] must be implemented,',
        // i-marshal.js
        EL02120: '',
        EL02121: 'getObject(opt?, origin?) : object is an abstract method. [$1] must be implemented',
        EL02122: 'setObject(mObj) is an abstract method. [$1] must be implemented',
        // i-element.js
        EL02130: '',
        EL02131: 'clone(): object is an abstract method. [$1] must be implemented',
        // i-list.js
        EL02140: '',
        // i-control-list.js
        EL02150: '',
        EL02151: 'add(key) is an abstract method. [$1] must be implemented',
        EL02152: 'del(key) is an abstract method. [$1] must be implemented,',
        EL02153: 'has(key): boolean is an abstract method. [$1] must be implemented,',
        EL02154: 'find(any): any is an abstract method. [$1] must be implemented,',
        // i-collection.js
        EL02160: '',
        EL02161: 'add(any): boolean is an abstract method. [$1] must be implemented',
        EL02162: 'remove(elem): boolean is an abstract method. [$1] must be implemented,',
        EL02163: 'cantains(any): boolean is an abstract method. [$1] must be implemented',
        EL02164: 'indexOf(any): number is an abstract method. [$1] must be implemented',
        // i-collection-array.js
        EL02170: '',
        EL02171: 'insertAt(pos, val, ..): boolean is an abstract method. [$1] must be implemented',
        // i-collection-property.js
        EL02180: '',
        EL02181: 'indexToKey(idx): string is an abstract method. [$1] must be implemented',
        // i-serialize.js
        EL02190: '',
        EL02191: 'output(opt, ...): string is an abstract method. [$1] must be implemented',
        EL02192: 'load(any, ...) is an abstract method. [$1] must be implemented,',
        // Meta.Entity.*.
        EL02300: '',
        // Meta.*.
        EL03100: '',
        // meta-object.js
        EL03110: '',
        EL03111: 'abstract, interface, enum type cannot be created. $1[\'_KIND\'] = \'$2\'',
        EL03112: 'setObject(oGuid, origin); oGuid 는 \'object\' It\'s types. typeof oGuid = \'$1\'',
        EL03113: 'setObject(oGuid, origin); different namespaces. this._type = $1, oGuid._type = $2',
        EL03114: 'setObject(oGuid, origin); origin is not a Guide object. origin._type = \'$1\', origin._guid = \'$2\'',
        // meta-element.js
        EL03120: '',
        EL03121: '$name; val is of type \'string\'. type of valve = \'$1\'',
        EL03122: '$name; val.length must be greater than 0',
        // meta-registry.js
        EL03200: '',
        // object
        EL03211: 'register(meta); the meta to register is not a Guide object. meta._type = \'$1\', meta._guid = \'$2\'',
        EL03212: 'register(meta); meta._guid to register is already registered. meta._guid = \'$1\'',
        EL03213: 'release(meta); the meta to release is string(guid) | object(Guid) type only. type of meta = \'$1\'',
        // create
        EL03220: '',
        EL03221: 'createMetaObject(oGuid, origin); oGuid is only of type \'object\', type oof oGuid = \'$1\'',
        EL03222: 'createMetaObject(oGuid, origin); oGuid._type 은 can only be of type \'string\'.(length > 0) typeof oGuid._type = \'$1\'',
        EL03223: 'createMetaObject(oGuid, origin); origin is only of type \'object\'. typeof origin = \'$1\'',
        EL03224: 'createMetaObject(oGuid, origin);[$1] Namespace is not of type \'function\', type of coClass = \'$2\'',
        EL03225: 'createReferObject(meta); meta is only of type \'object\', type of meta = \'$1\'',
        EL03226: 'createReferObject(meta); meta._guid 은 can only be of type \'string\'.(length > 0) typeof meta._guid = \'$1\'',
        EL03227: 'createNsReferObject(fun); fun is not of type \'function\', type of fun = \'$1\'',
        // ns Class
        EL03230: '',
        EL03231: 'register Class(fun, ns, key); fun is not of type \'function\'. type of fun = \'$1\'',
        EL03232: 'registerClass(fun, ns, key); ns is not of type \'string\'. typeofns = \'$1\'',
        EL03233: 'registerClass(fun, ns, key); key is not of type \'string\'. typeof key = \'$1\'',
        EL03234: 'releaseClass(fullName); fullName can only be of type \'string\'. (length > 0) typeof fullName = \'$1\'',
        EL03235: 'findClass(fun); fun is not of type \'function\', type of fun = \'$1\'',
        EL03236: 'getClass(fullName); fullName is only of type \'string\' (length > 0) typeof fullName = \'$1\'',
        // set, transform, load
        EL03240: '',
        EL03241: 'setMetaObject(oGuid, meta); oGuid is only of type \'object\', type oofoGuid = \'$1\'',
        EL03242: 'setMetaObject(oGuid, meta); meta is only of type \'object\', type of meta = \'$1\'',
        EL03243: 'setMetaObject(meta); meta._guid is only of type \'string\' (length > 0) type of meta._guid = \'$1\'',
        EL03244: 'transformRefer(oGuid); oGuid is only of type \'object\', type ooGuid = \'$1\'',
        EL03245: 'TransformRefer(oGuid); $1[\'$2\'][\'$ns\'] is not of type \'function\'',
        EL03246: 'loadMetaObject(str, path?); str is only of type \'string\'. typeof str = \'$1\'',
        EL03247: 'loadMetaObject(str, path?); The object parsed str is not a Guide object. obj._type = \'$1\', obj._guid = \'$2\'',
        // has, valid, find
        EL03250: '',
        EL03251: 'validObject(oGuid); oGuid is only of type \'object\'. typeof oGuid = \'$1\'',
        EL03252: 'hasGuidObject(oGuid, origin); guid can only be of type \'string\' (length > 0) type of guide = \'$1\'',
        EL03253: 'hasGuidObject(oGuid, origin); origin[$1] is not of type \'object\'. typeof origin[$1] = \'$2\'',
        EL03254: 'hasRefer(oGuid); oGuid is only of type \'object\', type oofoGuid = \'$1\'',
        EL03255: 'hasRefer(oGuid); oGuid is not a Guide object: oGuid._type = \'$1\', oGuid._guid = \'$2\'',
        EL03256: 'findSetObject(oGuid, origin); [oGuid._guid | oGuid] is only for type \'string\'. (length > 0) guid = \'$1\'',
        EL03257: 'findSetObject(oGuid, origin); origin is only of type \'object\'. typeof origin = \'$1\'',
        // namespace-manager.js
        EL03300: '',
        // private function, proterty
        EL03310: '',
        EL03311: 'NamespaceManager.isOverlap can only be of type \'boolean\. type is Overlap = $1',
        EL03312: '_getArray(ns); ns is not a valid Namespace Name Rule. ns = $1',
        EL03313: '_getArray(ns); ns type is \'string\', \'array<string>\' type. typeofns = $1',
        EL03314: '_getArray(ns); ns[$1] is not of type \'string\'. typeofns[$1] = $2',
        EL03315: '_getArray(ns); ns[$1] is not a valid name rule. ns[$1] = $1',
        // addNamespace, delNamespace, path
        EL03320: '',
        EL03321: 'addNamespace(ns); addition of namespace failed',
        EL03322: 'delNamespace(ns); Namespace deletion failed',
        EL03323: 'path(ns); failed to get the namespace path',
        // add, del 
        EL03330: '',
        EL03331: 'add(fullName,lem); [$1] is not a valid name rule',
        EL03332: 'add(fullName,lem);lem already registered. Allow duplication [this.isOverlap = \'true\'',
        EL03333: 'add(fullName, element); element registration failed in namespace',
        EL03334: 'del(fullName); Failed to delete element in Namespace',
        // getPath, output, load
        EL03340: '',
        EL03341: 'getPath(elem); no element value. typeoflem = $1',
        EL03342: 'output(stringify, space); Namespace export failed. $1',
        EL03343: 'load(str, path); str is not of type \'string\. typeofstr = $1',
        EL03344: 'load(str, path); Namespace loading failed. $1',
        // Collection.*.
        EL04100: '',
        // base-collection.js
        EL04110: '',
        EL04111: '_remove(idx): boolean is an abstract method. Must be implemented',
        EL04112: 'setObject(oGuid, origin); _owner connection of oGuid failed. guid = $1',
        EL04113: 'removeAt(idx); idx is not of type \'number\. typeof idx = $1',
        EL04114: 'add(any): number is an abstract method. must be implemented',
        EL04115: 'clear() is an abstract method. It must be implemented',
        EL04116: 'map(callback); callback is not function type. type of callback = $1',
        EL04117: 'filter(callback); callback is not function type. type of callback = $1',
        EL04118: 'reduce(callback); callback is not function type. type of callback = $1',
        EL04119: 'Find(callback); callback is not function type. type of callback = $1',
        EL041110: 'forEach(callback); callback is not function type. type of callback = $1',
        EL041111: 'Some(callback); callback is not function type. type of callback = $1',
        EL041112: 'Every(callback); callback is not function type. type of callback = $1',
        EL041113: 'findIndex(callback); callback 이 function 타입이 아닙니다. typeof callback = $1',
        //
        EL04200: '',
        // collection-array.js
        EL04210: '',
        EL04211: 'setObject(oGuid, origin); _elements connection failed for EL04211:  oGuid[\'_elem\'][$1]: guid = $2',
        EL04212: 'insertAt(pos, value, desc); pos is not of type \'number\'. typeof pos = $1',
        EL04213: 'insertAt(pos, value, desc); pos cannot be greater than this.count.pos = $1, count = $2',
        EL04214: 'insertAt(pos, value, desc); pos cannot be less than 0. pos = $1',
        EL04215: 'insertAt(pos, value, desc); registration failed. pos = $1, value = $2',
        // collection-property.js
        EL04220: '',
        EL04221: 'setObject(oGuid, origin); oGuid[\'_elem\'].length = $1 length and oGuid[\'_key\'].length = $2 length are different,',
        EL04222: 'setObject(oGuid, origin); oGuid[\'_elem\'].length = $1 length and oGuid[\'_desc\'].length = $2 length are different',
        EL04223: 'setObject(oGuid, origin); oGuid._elem[$1] guid not found: guid = $2',
        EL04224: 'indexOf(obj, isKey); if the index value is found by key, obj must be of type \'string\. typeof obj = $1',
        EL04225: 'add(name, value, desc); name is not of type \'string\'. type of name = $1',
        EL04226: 'add(name, value, desc); name = \'$1\' is not valid for the name rule. Rule = \'$2\'',
        EL04227: 'add(name, value, desc); name = \'$1\' is the reserved word,',
        EL04228: 'add(name, value, desc); name = \'$1\' is duplicated with an existing name',
        EL04229: 'add(name, value, desc); addition failed. name = \'$1\', value = \'$2\'',
        EL0422A: 'indexToKey(idx); idx is not of type \'number\. typeof idx = $1',
        EL0422B: 'exist(key); key is not of type \'string\' (length > 0) type of key = $1',
        //
        EL04300: '',
        // collection-transaction.js
        EL04310: '',
        EL04311: '$1.autoChanges 는 \'boolean\' 타입입니다. typeof aucoChanges = \'$2\'',
        // trans-queue.js
        EL04320: '',
        EL04321: 'collection value is not an instance that inherited [MetaObject]',
        EL04322: 'Collection is not an instance of [ArrayCollection]',
        EL04323: 'rollback(); \'$1\' is an unprocessable cmd',
        // Warn
        WS011: '[$1] Destination [$2] cannot be deleted,'
},
    ko: {
        // 실패
        ES010: '기타 오류',
        ES011: '["$1"] 모듈을 가져오는데 실패하였습니다.',
        ES012: '["$1"()] 함수를 가져오는데 실패하였습니다.',
        ES013: '[$1]는 [$2] 처리가 실패하였습니다.',
        // 타입
        ES021: '[$1]는 [$2] 타입만 가능합니다.',
        ES022: '[$1]는 처리할 수 없는 타입니다.', 
        ES023: '[$1]는 [$2]타입이 아닙니다.',
        // 객체
        ES031: '[$1]는 객체가 아닙니다.',
        ES032: '[$1]는 [$2]의 인스턴스가 아닙니다.',
        ES033: '[$1]의 객체가 [$2]와 다릅니다.',
        // 중복
        ES041: '[$1]는 [$2]와 중복이 발생했습니다.',
        ES042: '[$1]에 [$2]가 존재하여 [$3]를 재거 할 수 없습니다.',
        ES043: '[$1]에 [$1]가 존재하여 [$3]를 추가 할 수 없습니다.',
        ES044: '[$1]는 예약어 입니다.',
        // 필수
        ES051: '필수값 [$1]이 없습니다.',
        ES052: '[$1]에는 [$2]이 필요합니다.',
        ES053: '[$1]에 [$2]이 존재하지 않습니다.',
        ES054: '[$1]에 공백을 입력할 수 없습니다.',
        // 범위
        ES061: '[$1]의 [$2] 범위를 초과하였습니다.',
        ES062: '[$1]는 [$2]보다 작을 수가 없습니다.',
        ES063: '[$1]와 [$2]의 길이가 다릅니다.',
        ES064: 'and(&&) 조건 검사에 실패하였습니다. $1',
        ES065: 'or(||) 조건 검사에 실패하였습니다. $1',
        ES066: '[$1]의 범위는 [$2]에서 [$3]까지 입니다. ',
        // Common.*
        // util-type : match
        EL01100: 'util-type.js match',
        EL01101: '타입 매치 : $1 의 세부 타입을 지정해야 합니다. $1: $2',
        EL01102: '타입 매치 : target 은 \'$1\' 타입이 아닙니다. tarType: $2',
        EL01103: '타입 매치 : 처리할 수 없는 타입니다. ',
        // match array
        EL01110: '',
        EL01111: '배열 매치 : target 은 array 타입이 아닙니다. tarType: $1',
        EL01112: '배열 매치 : array(_ANY_) 타입은 target array 의 요소가 하나 이상 가지고 있어야 합니다. target.length = $1',
        EL01113: '배열 매치 : array(_SEQ_) 타입의 길이보다 target array 의 길이가 작습니다. extType.length = $1, target.length = $2',
        EL01114: '배열 매치 : array(_SEQ_) [$1]번째 리터럴 타입이 target 값과 다릅니다. extType[$1] = $2, target[$1] = $3',
        EL01115: '배열 매치 : array(_SEQ_) [$1]번째 타입 검사가 실패하였습니다. extType[$1] = $2',
        EL01116: '배열 매치 : array(_REQ_) 타입은 target array 의 요소가 하나 이상 가지고 있어야 합니다. target.length = $1',
        EL01117: '배열 매치 : array($1) 는 처리할 수 없는 array 타입 종류입니다.',
        EL01118: '배열 매치 : array 요소 검사가 실패하였습니다. extType: $1, tarType: $2',
        // match choice
        EL01120: '',
        EL01121: '초이스 매치 : choice(_ANY_) 타입에 \'undefined\' 은 사용할 수 없습니다.',
        EL01122: '초이스 매치 : choice(_NON_) 타입에 \'undefined\' 만 가능합니다.',
        EL01123: '초이스 매치 : choice(_ERR_) 타입에 Errror 인스턴스 만 가능합니다.',
        EL01124: '초이스 매치 : choice(_EUM_) 타입의 세부 타입은 리터럴만 가능합니다. extType[$1]: $2',
        EL01125: '초이스 매치 : choice(_DEF_) 타입의 첫번째 세부 타입은 리터럴만 가능합니다. extType[0]: $1',
        EL01126: '초이스 매치 : choice($1) 는 처리할 수 없는 choice 타입 종류입니다.',
        EL01127: '초이스 매치 : choice 세부 타입 검사가 실패하였습니다. extType: $1, tarType: $2',
        // match class
        EL01130: '',
        EL01131: '클래스 매치 : class 타입을 union 타입으로 생성 후 검사에 실패하였습니다. (opt = 1)',
        EL01132: '클래스 매치 : target은 [$1]의 인스턴스가 아닙니다.',
        EL01133: '클래스 매치 : target 이 class, object, union 타입이 아닙니다. tarType: $1',
        // match union
        EL01140: '',
        EL01141: '유니언 매치 : target 은 union 타입이 아닙니다. tarType: $1',
        EL01142: '유니언 매치 : target[\'$1\'] 키가 존재하지 않습니다. extType[\'$1\'] = $2',
        EL01143: '유니언 매치 : \'$1\' 타입 검사가 실패하였습니다.',
        // match function
        EL01150: '',
        EL01151: '함수 매치 : target 은 function 타입이 아닙니다. tarType: $1',
        EL01152: '함수 매치 : 선언한 extType.name = \'$1\' 과 target name 이 일치하지 않습니다. function.name = \'$2\'',
        EL01153: '함수 매치 : extType.func 을 선언하였는데 target.func 이 functon 타입이 아닙니다.',
        EL01154: '함수 매치 : extType.func 과 target.func 서로 다릅니다.(proto check)',
        EL01155: '함수 매치 : target의 params 또는 return 객체를 설정해야 합니다. extType.param = $1, extType.return = $2',
        EL01156: '함수 매치 : params 허용검사가 거부되었습니다. <array(_SEQ_) 변환>',
        EL01157: '함수 매치 : return 허용검사가 거부되었습니다.',
        // allow
        EL01200: '',
        EL01201: '타입 허용 : $1 의 세부 타입을 지정해야 합니다. $1: $2',
        EL01202: '타입 허용 : $1 타입의 리터럴 값과 다릅니다. extType = $2, tarType = $3',
        EL01203: '타입 허용 : $1 타입이 아닙니다. tarType = $2',
        EL01204: '타입 허용 : 처리할 수 없는 타입입니다.',
        // allow array
        EL01210: '',
        EL01211: '배열 허용 : array 타입이 아닙니다. tarType: $1',
        EL01212: '타입 허용 : array(_ANY_) 타입에 array(_ALL_, _OPT_) 타입을 허용하지 않습니다. tarType: $1',
        EL01213: '배열 허용 : array(_SEQ_) 타입에 array(_SEQ_) 타입만 허용합니다. tarType: $1',
        EL01214: '배열 허용 :extType 의 array(_SEQ_) 타입의 길이보다 tarType 은 같거나 커야합니다. extType.length = $1, target.length = $2',
        EL01215: '배열 허용 : array(_SEQ_) [$1]번째 타입 검사가 실패하였습니다.',
        EL01216: '배열 허용 : array(_REQ_) 타입에 array(_ALL_, _ANY_, _OPT_) 타입을 허용하지 않습니다. tarType: $2',
        EL01217: '배열 허용 : array(_OPT_) 타입에 array(_ALL_, _ANY_) 타입을 허용하지 않습니다. tarType: $2',
        EL01218: '배열 허용 : array($1) 는 처리할 수 없는 array 타입 종류입니다.',
        EL01219: '배열 허용 : array 요소 검사가 실패하였습니다. extType: $1, tarType: $2',
        // allow choice 
        EL01220: '',
        EL01221: '초이스 허용 : choice(_ALL_) 타입에 choice(_ERR_) 타입을 허용하지 않습니다. tarType: $1',
        EL01222: '초이스 허용 : choice(_ANY_) 타입에 \'undefined\' 타입은 사용할 수 없습니다.',
        EL01223: '초이스 허용 : choice(_ANY_) 타입에 choice(_NON_, _ERR_), \'undefined\' 타입을 허용하지 않습니다. tarType: $1',
        EL01224: '초이스 허용 : choice(_NON_) 타입에 choice(_NON_) 타입만 허용합니다. tarType: $1',
        EL01225: '초이스 허용 : choice(_ERR_) 타입에 choice(_ERR_) 타입만 가능합니다. tarType: $1',
        EL01226: '초이스 허용 : choice(_REQ_) 타입에 choice(_ALL_, _ANY_, _OPT_, _NON_, _ERR_) 타입을 허용하지 않습니다. tarType: $1',
        EL01227: '초이스 허용 : choice(_OPT_) 타입에 choice(_ALL_, _ANY_, _NON_, _ERR_) 타입을 허용하지 않습니다. tarType: $1',
        EL01228: '초이스 허용 : choice(_EUM_) 타입에 choice(_EUM_) 타입만 가능합니다.',
        EL01229: '초이스 허용 : choice(_EUM_) 의 세부 타입은 리터럴만 가능합니다. extType[$1]: $2',
        EL0122A: '초이스 허용 : tarType choice(_EUM_) 의 세부 타입은 리터럴만 가능합니다. tarType[$1]: $2',
        EL0122B: '초이스 허용 : choice(_DEF_) 타입에 choice(_DEF_) 타입만 가능합니다.',
        EL0122C: '초이스 허용 : extType choice(_DEF_) 의 첫번째 세부 타입은 리터럴만 가능합니다. extType[0]: $1',
        EL0122D: '초이스 허용 : tarType choice(_DEF_) 의 첫번째 세부 타입은 리터럴만 가능합니다. tarType[0]: $1',
        EL0122E: '초이스 허용 : choice($1) 는 처리할 수 없는 choice 타입 종류입니다.',
        EL0122F: '초이스 허용 : tarType[$1] = $3 타입에 허용하는 extType 이 없습니다. extType = $2',
        // allow class
        EL01230: '',
        EL01231: '클래스 허용 : extType, tarType class 타입을 union 타입으로 생성 후 검사에 실패하였습니다. (opt = 1)',
        EL01232: '클래스 허용 : class to class 허용이 거부 되었습니다. (opt = $1)',
        EL01233: '클래스 허용 : tarType class 타입을 union 타입으로 생성 후 검사에 실패하였습니다. (opt = 1)',
        EL01234: '클래스 허용 : class to union 허용이 거부 되었습니다. (opt = $1)',
        EL01235: '클래스 허용 : tarType 이 class, union 타입이 아닙니다. tarType: $1',
        // allow union
        EL01240: '',
        EL01241: '유니언 허용 : tarType 은 union 타입이 아닙니다. tarType: $1',
        EL01242: '유니언 허용 : tarType[\'$1\'] 키가 존재하지 않습니다. extType[\'$1\'] = $2',
        EL01243: '유니언 허용 : \'$1\' 타입 검사가 실패하였습니다.',
        // allow function
        EL01250: '',
        EL01251: '함수 허용 : tarType 은 function 타입이 아닙니다. tarType: $1',
        EL01252: '함수 허용 : 선언한 extType.name = \'$1\' 과 target name 이 일치하지 않습니다. function.name = \'$2\'',
        EL01253: '함수 허용 : extType.func 을 선언하였는데 target.func 이 functon 타입이 아닙니다.',
        EL01254: '함수 허용 : extType.func 과 target.func 서로 다릅니다.(proto check)',
        EL01255: '함수 허용 : tarType의 params 또는 return 객체를 설정해야 합니다. extType.param = $1, extType.return = $2',
        EL01256: '함수 허용 : params 허용검사가 거부되었습니다. <array(_SEQ_) 변환>',
        EL01257: '함수 허용 : return 허용검사가 거부되었습니다.',
        // etc
        // util-type.js
        EL01300: '',
        EL01301: '파싱 검사 : function 규칙이 아닙니다. "$1"',
        EL01302: '파싱 검사 : function 에 argument, body 내용이 없습니다. "$1"',
        EL01303: '파싱 검사 : function 파싱 실패 $1',
        EL01304: '타입 검사 : [$1]는 처리할 수 스페셜타입 입니다.',
        EL01305: '타입 검사 : array($1) 타입은 처리할 수 없는 스페설타입 입니다.',
        EL01306: '타입 검사 : choice($1) 타입은 처리할 수 없는 스페셜타입 입니다.',
        EL01307: '타입 검사 : array($1) 타입은 처리할 수 없는 타입 입니다.',
        EL01308: '타입 검사 : choice($1) 타입은 처리할 수 없는 타입 입니다.',
        // EL01309: '',
        EL0130A: '타입 허용 : allowType(extType, tarType) 검사가 실패하였습니다.',
        EL0130B: '타입 매치 : matchType(extType, target) 검사가 실패하였습니다.',
        EL0130C: 'ctor 이 function 타입이 아닙니다. typeof ctor = $1',
        // util.js
        EL01400: '',
        EL01401: 'implements(ctor, obj, args..); ctor 이 <function> 타입이 아닙니다. typeof ctor == \'$1\'',
        EL01402: 'implements(ctor, obj, args..); obj 이 <object> 타입이 아닙니다. typeof obj == \'$1\'',
        EL01403: 'implements(ctor, obj, args..); args[$1] 이 <function> 타입이 아닙니다. typeof args[$1] == \'$2\'',
        EL01404: '[$1] 는 [$2] 타입을 구현해야 합니다. $1._KIND = \'$3\'',
        EL01405: 'isImplementOf(target); target 은 <function, string> 타입만 가능합니다. typeof target = \'$1\'',
        // etc
        EL01500: '',
        // observer.js
        // REVIEW: 전체 변겯
        // EL01511: 'new Observer(caller); caller 는 \'object\' 타입이 아닙니다. typeof caller = $1',
        // EL01512: 'Observer.isLog 는 \'boolean\' 타입이 아닙니다. typeof isLog = $1',
        // EL01513: 'Observer.isSingleMode 는 \'boolean\' 타입이 아닙니다. typeof isSingleMode = $1',
        // EL01514: 'Observer.__$subscribers 값은  \'object\' 타입이 아닙니다. typeof __$subscribers = $1',
        // EL01515: 'Observer.__$subscribers[\'any\'] 객체가 없습니다. { any: undefined }',
        // EL01516: 'subscribe(fn, code); fn 는 \'function\' 타입이 아닙니다. typeof fn = $1',
        EL01501: '$1.$events 는 obejct 타입입니다. typeof $events $2',
        EL01502: '$1.isLog 는 boolean 타입입니다. typeof isLog $2',
        EL01503: 'on(event, listener); event 는 <string> 타입이 아닙니다. typeof event == \'$1\'',
        EL01504: 'on(event, listener); listener 는 <function> 타입이 아닙니다. typeof listener == \'$1\'',
        EL01505: 'once(event, listener); event 는 string 타입이 아닙니다. typeof event == \'$1\'',
        EL01506: 'once(event, listener); listener 는 <function> 타입이 아닙니다. typeof listener == \'$1\'',
        EL01507: 'off(event, listener); event 는 <string> 타입이 아닙니다. typeof event == \'$1\'',
        EL01508: 'off(event, listener); listener 는 <function> 타입이 아닙니다. typeof listener == \'$1\'',
        EL01509: 'emit(event); event 는 <string> 타입이 아닙니다. typeof event == \'$1\'',
        EL01510: '',
        // Interface.*
        // EL02
        EL02100: '',
        // i-object.js
        EL02110: '',
        EL02111: 'getTypes(): array<function> 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
        EL02112: 'instanceOf(any): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
        EL02113: 'equal(any): boolena 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
        // i-marshal.js
        EL02120: '',
        EL02121: 'getObject(opt?, origin?): object 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
        EL02122: 'setObject(mObj) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
        // i-element.js
        EL02130: '',
        EL02131: 'clone(): object 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
        // i-list.js
        EL02140: '',
        // i-control-list.js
        EL02150: '',
        EL02151: 'add(key) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
        EL02152: 'del(key) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
        EL02153: 'has(key): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
        EL02154: 'find(any): any 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
        // i-collection.js
        EL02160: '',
        EL02161: 'add(any): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
        EL02162: 'remove(elem): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
        EL02163: 'cantains(any): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
        EL02164: 'indexOf(any): number 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
        // i-collection-array.js
        EL02170: '',
        EL02171: 'insertAt(pos, val, ..): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
        // i-collection-property.js
        EL02180: '',
        EL02181: 'indexToKey(idx): string 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
        // i-serialize.js
        EL02190: '',
        EL02191: 'output(opt, ...): string 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
        EL02192: 'load(any, ...) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
        // Meta.Entity.*
        EL02300: '',
        // Meta.*
        EL03100: '',
        // meta-object.js
        EL03110: '',
        EL03111: 'abstract, interface, enum 타입은 생성할 수 없습니다. $1[\'_KIND\'] = \'$2\'',
        EL03112: 'setObject(oGuid, origin); oGuid 는 \'object\' 타입입니다. typeof oGuid = \'$1\'',
        EL03113: 'setObject(oGuid, origin); 네임스페이스가 서로 다릅니다. this._type = $1, oGuid._type = $2',
        EL03114: 'setObject(oGuid, origin); origin 은 Guid 객체가 아닙니다. origin._type = \'$1\', origin._guid = \'$2\'',
        // meta-element.js
        EL03120: '',
        EL03121: '$name; val 은 \'string\' 타입입니다. typeof val = \'$1\'',
        EL03122: '$name; val.length 은 0 보다 커야 합니다.',
        // meta-registry.js
        EL03200: '',
        // object
        EL03211: 'register(meta); 등록할 meta 가 Guid 객체가 아닙니다. meta._type = \'$1\', meta._guid = \'$2\'',
        EL03212: 'register(meta); 등록할 meta._guid 가 이미 등록되어 있습니다. meta._guid = \'$1\'',
        EL03213: 'release(meta); 해제할 meta 는 string(guid) | object(Guid) 타입만 가능합니다. typeof meta = \'$1\'',
        // create
        EL03220: '',
        EL03221: 'createMetaObject(oGuid, origin); oGuid 는 \'object\' 타입만 가능합니다. typeof oGuid = \'$1\'',
        EL03222: 'createMetaObject(oGuid, origin); oGuid._type 은 \'string\' 타입만 가능합니다.(length > 0) typeof oGuid._type = \'$1\'',
        EL03223: 'createMetaObject(oGuid, origin); origin 는 \'object\' 타입만 가능합니다. typeof origin = \'$1\'',
        EL03224: 'createMetaObject(oGuid, origin); [$1] 네임스페이스가 \'function\' 타입이 아닙니다. typeof coClass = \'$2\'',
        EL03225: 'createReferObject(meta); meta 는 \'object\' 타입만 가능합니다. typeof meta = \'$1\'',
        EL03226: 'createReferObject(meta); meta._guid 은 \'string\' 타입만 가능합니다.(length > 0) typeof meta._guid = \'$1\'',
        EL03227: 'createNsReferObject(fun); fun 는 \'function\' 타입이 아닙니다. typeof fun = \'$1\'',
        // ns Class
        EL03230: '',
        EL03231: 'registerClass(fun, ns, key); fun 이 \'function\' 타입이 아닙니다. typeof fun = \'$1\'',
        EL03232: 'registerClass(fun, ns, key); ns 가 \'string\' 타입이 아닙니다. typeof ns = \'$1\'',
        EL03233: 'registerClass(fun, ns, key); key 가 \'string\' 타입이 아닙니다. typeof key = \'$1\'',
        EL03234: 'releaseClass(fullName); fullName 은 \'string\' 타입만 가능합니다.(length > 0) typeof fullName = \'$1\'',
        EL03235: 'findClass(fun); fun 는 \'function\' 타입이 아닙니다. typeof fun = \'$1\'',
        EL03236: 'getClass(fullName); fullName 은 \'string\' 타입만 가능합니다.(length > 0) typeof fullName = \'$1\'',
        // set, transform, load
        EL03240: '',
        EL03241: 'setMetaObject(oGuid, meta); oGuid 는 \'object\' 타입만 가능합니다. typeof oGuid = \'$1\'',
        EL03242: 'setMetaObject(oGuid, meta); meta 는 \'object\' 타입만 가능합니다. typeof meta = \'$1\'',
        EL03243: 'setMetaObject(meta); meta._guid 은 \'string\' 타입만 가능합니다.(length > 0) typeof meta._guid = \'$1\'',
        EL03244: 'transformRefer(oGuid); oGuid 는 \'object\' 타입만 가능합니다. typeof oGuid = \'$1\'',
        EL03245: 'transformRefer(oGuid); $1[\'$2\'][\'$ns\'] 는 \'function\' 타입이 아닙니다.',
        EL03246: 'loadMetaObject(str, parse?); str 은 \'string\' 타입만 가능합니다. typeof str = \'$1\'',
        EL03247: 'loadMetaObject(str, parse?); str 을 파싱한 객체가 Guid 객체가 아닙니다. obj._type = \'$1\', obj._guid = \'$2\'',
        // has, valid, find
        EL03250: '',
        EL03251: 'validObject(oGuid); oGuid 는 \'object\' 타입만 가능합니다. typeof oGuid = \'$1\'',
        EL03252: 'hasGuidObject(oGuid, origin); guid 는 \'string\' 타입만 가능합니다.(length > 0) typeof guid = \'$1\'',
        EL03253: 'hasGuidObject(oGuid, origin); origin[$1]는 \'object\' 타입이 아닙니다. typeof origin[$1] = \'$2\'',
        EL03254: 'hasRefer(oGuid); oGuid 는 \'object\' 타입만 가능합니다. typeof oGuid = \'$1\'',
        EL03255: 'hasRefer(oGuid); oGuid 가 Guid 객체가 아닙니다. oGuid._type = \'$1\', oGuid._guid = \'$2\'',
        EL03256: 'findSetObject(oGuid, origin); [ oGuid._guid | oGuid ]는 \'string\' 타입만 가능합니다.(length > 0) guid = \'$1\'',
        EL03257: 'findSetObject(oGuid, origin); origin 는 \'object\' 타입만 가능합니다. typeof origin = \'$1\'',
        // namespace-manager.js
        EL03300: '',
        // private function, proterty
        EL03310: '',
        EL03311: 'NamespaceManager.isOverlap 은  \'boolean\' 타입만 가능합니다. typeof isOverlap = $1',
        EL03312: '_getArray(ns); ns 는 유효한 네임스페이스 이름 규칙이 아닙니다. ns = $1',
        EL03313: '_getArray(ns); ns 타입은 \'string\', \'array<string>\' 타입만 가능합니다. typeof ns = $1',
        EL03314: '_getArray(ns); ns[$1] 는 \'string\' 타입이 아닙니다. typeof ns[$1] = $2',
        EL03315: '_getArray(ns); ns[$1] 는 유효한 이름 규칙이 아닙니다. ns[$1] = $1',
        // addNamespace, delNamespace, path
        EL03320: '',
        EL03321: 'addNamespace(ns); 네임스페이스 추가가 실패하였습니다.',
        EL03322: 'delNamespace(ns); 네임스페이스 삭제가 실패하였습니다.',
        EL03323: 'path(ns); 네임스페이스 경로 얻기에 실패하였습니다.',
        // add, del 
        EL03330: '',
        EL03331: 'add(fullName, elem); [$1] 는 유효한 이름 규칙이 아닙니다.',
        EL03332: 'add(fullName, elem); elem 이 이미 등록되었습니다. 중복허용 [this.isOverlap = \'true\']',
        EL03333: 'add(fullName, elem); 네임스페이스에 요소 등록이 실패하였습니다.',
        EL03334: 'del(fullName); 네임스페이스에 요소 삭제가 실패하였습니다.',
        // getPath, output, load
        EL03340: '',
        EL03341: 'getPath(elem); elem 값이 없습니다. typeof elem = $1',
        EL03342: 'output(stringify, space); 네임스페이스 내보내기가 실패하였습니다. $1',
        EL03343: 'load(str, parse); str 는 \'string\' 타입이 아닙니다. typeof str = $1',
        EL03344: 'load(str, parse); 네임스페이스 로딩이 실패하였습니다. $1',
        // Collection.*
        EL04100: '',
        // base-collection.js
        EL04110: '',
        EL04111: '_remove(idx): boolean 는 추상메소드 입니다. 구현해야 합니다.',
        EL04112: 'setObject(oGuid, origin); oGuid 의 _owner 연결이 실패하였습니다. guid = $1',
        EL04113: 'removeAt(idx); idx 는 \'number\' 타입이 아닙니다. typeof idx = $1',
        EL04114: 'add(any): number 는 추상메소드 입니다. 구현해야 합니다.',
        EL04115: 'clear() 는 추상메소드 입니다. 구현해야 합니다.',
        EL04116: 'map(callback); callback 이 function 타입이 아닙니다. typeof callback = $1',
        EL04117: 'filter(callback); callback 이 function 타입이 아닙니다. typeof callback = $1',
        EL04118: 'reduce(callback); callback 이 function 타입이 아닙니다. typeof callback = $1',
        EL04119: 'find(callback); callback 이 function 타입이 아닙니다. typeof callback = $1',
        EL041110: 'forEach(callback); callback 이 function 타입이 아닙니다. typeof callback = $1',
        EL041111: 'some(callback); callback 이 function 타입이 아닙니다. typeof callback = $1',
        EL041112: 'every(callback); callback 이 function 타입이 아닙니다. typeof callback = $1',
        EL041113: 'findIndex(callback); callback 이 function 타입이 아닙니다. typeof callback = $1',
        //
        EL04200: '',
        // collection-array.js
        EL04210: '',
        EL04211: 'setObject(oGuid, origin); oGuid[\'_elem\'][$1] 의 _elements 연결이 실패하였습니다. guid = $2',
        EL04212: 'insertAt(pos, value, desc); pos 는 \'number\' 타입이 아닙니다. typeof pos = $1',
        EL04213: 'insertAt(pos, value, desc); pos 는 this.count 보다 클 수 없습니다. pos = $1, count = $2',
        EL04214: 'insertAt(pos, value, desc);  pos 는 0 보다 작을 수 없습니다. pos = $1',
        EL04215: 'insertAt(pos, value, desc); 등록이 실패하였습니다. pos = $1, value = $2',
        // collection-property.js
        EL04220: '',
        EL04221: 'setObject(oGuid, origin); oGuid[\'_elem\'].length = $1 길이와 oGuid[\'_key\'].length = $2 길이가 서로 다릅니다.',
        EL04222: 'setObject(oGuid, origin); oGuid[\'_elem\'].length = $1 길이와 oGuid[\'_desc\'].length = $2 길이가 서로 다릅니다.',
        EL04223: 'setObject(oGuid, origin); oGuid._elem[$1] guid 를 찾을 수 없습니다. guid = $2' ,
        EL04224: 'indexOf(obj, isKey); key로 인덱스값을 찾을 경우 obj 는 \'string\' 타입이어야 합니다. typeof obj = $1',
        EL04225: 'add(name, value, desc); name 이 \'string\' 타입이 아닙니다. typeof name = $1',
        EL04226: 'add(name, value, desc); name = \'$1\' 이 이름규칙에 맞지 않습니다. 규칙 = \'$2\'',
        EL04227: 'add(name, value, desc); name = \'$1\' 이 예약어 입니다.',
        EL04228: 'add(name, value, desc); name = \'$1\' 이 기존 이름과 중복이 발생했습니다.',
        EL04229: 'add(name, value, desc); 추가가 실패하였습니다. name = \'$1\', value = \'$2\'',
        EL0422A: 'indexToKey(idx); idx 이 \'number\' 타입이 아닙니다. typeof idx = $1',
        EL0422B: 'exist(key); key 이 \'string\' 타입이 아닙니다.(length > 0) typeof key = $1',
        //
        EL04300: '',
        // collection-transaction.js
        EL04310: '',
        EL04311: '$1.autoChanges 는 \'boolean\' 타입입니다. typeof aucoChanges = \'$2\'',
        // trans-queue.js
        EL04320: '',
        EL04321: 'collection 값이 [MetaObject] 을 상속한 인스턴스가 아닙니다.',
        EL04322: 'collection 이 [ArrayCollection] 의 인스턴스가 아닙니다.',
        EL04323: 'rollback(); \'$1\' 는 처리할 수 없는 cmd 입니다.',
        // Warn
        WS011: '[$1] 대상 [$2]는 삭제 할 수 없습니다.',
    }
};

//==============================================================
// 4. module export
export default messageCode;
export { messageCode };

