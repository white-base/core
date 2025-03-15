/*! logic Core v1.0.5 Copyright (c) 2025 logic and contributors */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ES010 = "Other errors";
var ES011 = "Failed to get module ['$1']";
var ES012 = "Failed to get function ['$1'()";
var ES013 = "[$1] failed to process [$2]";
var ES021 = "[$1] can only be of type [$2]";
var ES022 = "[$1] is an unprocessable typo";
var ES023 = "[$1] is not type [$2]";
var ES031 = "[$1] is not an object";
var ES032 = "[$1] is not an instance of [$2]";
var ES033 = "The object in [$1] is different from [$2]";
var ES041 = "[$1] is duplicated with [$2]";
var ES042 = "[$2] exists in [$1] and cannot measure [$3]";
var ES043 = "[$1] cannot be added because [$1] exists in [$1] ";
var ES044 = "[$1] is a reserved word ";
var ES051 = "Required value [$1] not found";
var ES052 = "[$1] requires [$2]";
var ES053 = "[$2] does not exist in [$1]";
var ES054 = "[$1] cannot be blanked";
var ES061 = "Exceeded the range [$2] of [$1]";
var ES062 = "[$1] cannot be less than [$2]";
var ES063 = "[$1] and [$2] have different lengths";
var ES064 = "and(&) condition check failed. $1";
var ES065 = "Or(|) condition check failed. $1";
var ES066 = "[$1] ranges from [$2] to [$3]";
var EL01100 = "----- util-type.js match -----";
var EL01101 = "Type match: You must specify a detailed type of $1.$1: $2";
var EL01102 = "Type match : target is not type '$1. tarType : $2";
var EL01103 = "Type match: cannot handle type";
var EL01110 = "----- match array -----";
var EL01111 = "Array match: target is not array type. tarType: $1";
var EL01112 = "Array match : array(_ANY_) type must have at least one element of target array. target.length = $1";
var EL01113 = "Array match: target array is less than array(_SEQ_) type length. extType.length = $1, target.length = $2";
var EL01114 = "Array match: array(_SEQ_) [$1]th literal type is different from target value. extType[$1] = $2, target[$1] = $3";
var EL01115 = "Array match: array(_SEQ_) [$1]th type check failed. extType[$1] = $2";
var EL01116 = "Array match : array(_REQ_) type must have at least one element of target array. target.length = $1";
var EL01117 = "Array match : array($1) is the type of array that cannot be handled";
var EL01118 = "Array match: array element check failed. extType: $1, tarType: $2";
var EL01120 = "----- match choice -----";
var EL01121 = "Choice match: 'undefined' is not available for choice(_ANY_) type";
var EL01122 = "Choice match: 'undefined' only for choice(_NON_) type";
var EL01123 = "Choice match: Error instance only for choice(_ERR_) type";
var EL01124 = "Choice match: choice(_EUM_) type details can only be literal. extType[$1]: $2";
var EL01125 = "Choice match: the first subtype of choice(_DEF_) type is literal only. extType[0]: $1";
var EL01126 = "Choice match : choice($1) is a type of choice that cannot be handled";
var EL01127 = "Choice match: choice detailed type check failed. extType: $1, tarType: $2";
var EL01130 = "----- match class -----";
var EL01131 = "Class match: Inspection failed after creating class type as union type (opt = 1)";
var EL01132 = "Class match: target is not an instance of [$1]";
var EL01133 = "Class match: target is not class, object, or union type. tarType: $1";
var EL01140 = "----- match union -----";
var EL01141 = "Union match: target is not union type. tarType: $1";
var EL01142 = "Union match: target['$1'] key does not exist. extType['$1'] = $2";
var EL01143 = "Union match: '$1' type check failed";
var EL01150 = "----- match function -----";
var EL01151 = "Function match: target is not function type. tarType: $1";
var EL01152 = "Function match: declared extType.name = '$1' and target name do not match: function.name = '$2'";
var EL01153 = "Function match : declared extType.func, target.func is not function type";
var EL01154 = "Function match: extType.func and target.func are different (proto check)";
var EL01155 = "Function match: You must set the params or return object of the target. extType.param = $1, extType.return = $2";
var EL01156 = "Function match: params acceptance test denied. <array(_SEQ_) conversion>";
var EL01157 = "Function Match: Return Acceptance Test Denied";
var EL01200 = "----- allow -----";
var EL01201 = "Type allowed: You must specify a subtype of $1.$1: $2";
var EL01202 = "Type allowed: different from type 1 literal value. extType = $2, tarType = $3";
var EL01203 = "Type allowed: not type $1. tarType = $2";
var EL01204 = "Type allowed: type not processable";
var EL01210 = "----- allow array -----";
var EL01211 = "Array permit: Not array type. tarType: $1";
var EL01212 = "Type allowed: array(_ALL_, _OPT_) type is not allowed for array(_ANY_) type. tarType: $1";
var EL01213 = "Allow array: Only array(_SEQ_) type is allowed for array(_SEQ_) type. tarType: $1";
var EL01214 = "Array permit: tarType must be equal to or greater than the length of array(_SEQ_) type of extType.length = $1, target.length = $2";
var EL01215 = "Array Allowance: array(_SEQ_) [$1]th type check failed";
var EL01216 = "Allow array : Do not allow array(_ALL_, _ANY_, _OPT_) type for array(_REQ_). tarType: $2";
var EL01217 = "Allow array: Do not allow array(_ALL_, _ANY_) type for array(_OPT_). tarType: $2";
var EL01218 = "Allow array : array($1) is the type of array that cannot be handled";
var EL01219 = "Array element check failed. extType: $1, tarType: $2";
var EL01220 = "----- allow choice -----";
var EL01221 = "Choice allowed: do not allow choice(_ERR_) type for choice(_ALL_). tarType: $1";
var EL01222 = "Choice allowed: 'undefined' type is not allowed for choice(_ANY_) type";
var EL01223 = "Choice allowed: choice(_NON_, _ERR_) type is not allowed for choice(_ANY_) type. tarType: $1";
var EL01224 = "Choice allowed: only choice(_NON_) type and choice(_NON_) type. tarType: $1";
var EL01225 = "Choice allowed: choice(_ERR_) type and choice(_ERR_) type only. tarType: $1";
var EL01226 = "Choice allowed: do not allow choice(_ALL_, _ANY_, _OPT_, _NON_, _ERR_) type for choice(_REQ_). tarType: $1";
var EL01227 = "Choice allowed: do not allow choice(_ALL_, _ANY_, _NON_, _ERR_) type for choice(_OPT_). tarType: $1";
var EL01228 = "Choice allowed: choice(_EUM_) type and choice(_EUM_) type only";
var EL01229 = "Choice allowed: choice(_EUM_) subtype can only be literal. extType[$1]: $2";
var EL0122A = "Choice allowed: the subtype of tarType choice(_EUM_) can only be literal. tarType[$1]: $2";
var EL0122B = "Choice allowed: choice(_DEF_) type and choice(_DEF_) type only";
var EL0122C = "Choice allowed: the first subtype of extType choice(_DEF_) is literal only. extType[0]: $1";
var EL0122D = "Choice allowed: the first subtype of tarType choice(_DEF_) is literal only. tarType[0]: $1";
var EL0122E = "Choice allowed: choice($1) is a type of choice that cannot be handled";
var EL0122F = "Choice allowed: tarType[$1] = $3, no extType allowed. extType = $2";
var EL01230 = "----- allow class -----";
var EL01231 = "Class allowed: ExtType, tarType class failed after creating a union type. (opt = 1)";
var EL01232 = "Class allowed: class to class denied. (opt = $1)";
var EL01233 = "Class allowed: Inspection failed after creating tarType class type as union type (opt = 1)";
var EL01234 = "Class allowed: class to union denied. (opt = $1)";
var EL01235 = "Class allowed: tarType is not class, union type. tarType: $1";
var EL01240 = "----- allow union -----";
var EL01241 = "Union allowed: tarType is not a union type. tarType: $1";
var EL01242 = "Union allowed: tarType['$1'] key does not exist. extType['$1'] = $2";
var EL01243 = "Union allowed: Type '$1' check failed";
var EL01250 = "----- allow function -----";
var EL01251 = "Allow function : tarType is not function type. tarType : $1";
var EL01252 = "Function allowed: declared extType.name = '$1' and target name do not match: function.name = '$2'";
var EL01253 = "Function allowed: declared extType.func, target.func is not of function type";
var EL01254 = "Function allowed: extType.func and target.func are different (proto check)";
var EL01255 = "Function permit: params or return object of tarType must be set. extType.param = $1, extType.return = $2";
var EL01256 = "Function permit: params permit test denied. <array(_SEQ_) conversion>";
var EL01257 = "Function Permitted: Return Permitted Test Denied";
var EL01300 = "----- util-type.js -----";
var EL01301 = "Parcing check: function is not a rule: '$1'";
var EL01302 = "Parcing inspection: function has no argument, body content. '$1'";
var EL01303 = "Parcing inspection: function parsing failed $1";
var EL01304 = "Type check: [$1] is a special type to handle";
var EL01305 = "Type check: array($1) type is a specular type that cannot be handled";
var EL01306 = "Type check: choice($1) type is a special type that cannot be handled";
var EL01307 = "Type check: array($1) type is a type that cannot be handled";
var EL01308 = "Type check: choice($1) type is a type that cannot be handled";
var EL01309 = "REVIEW:";
var EL0130A = "Type allowed: allowType (extType, tarType) scan failed";
var EL0130B = "Type match: matchtype (extType, target) check failed";
var EL0130C = "ctor is not function type. type aperture = $1";
var EL01400 = "----- util.js -----";
var EL01401 = "implements(ctor, obj, args..); ctor is not of type <function> == '$1'";
var EL01402 = "implements(ctor, obj, args..); obj is not of type <object> type of obj == '$1'";
var EL01403 = "implements(ctor, obj, args..); args[$1] is not type <function>. type of args[$1] == '$2'";
var EL01404 = "[$1] must implement type [$2]. $1._KIND = '$3'";
var EL01405 = "isImplementOf(target); target is of type <function, string> only. type of target = '$1'";
var EL01500 = "----- etc -----";
var EL01501 = "$1.$events is obejct type. type of $events $2";
var EL01502 = "$1.isLog is boolean type. type isLog $2";
var EL01503 = "on(event, listener); event is not of type <string> type of event == '$1'";
var EL01504 = "on(event, listener); listener is not of type <function> type of listener == '$1'";
var EL01505 = "once(event, listener); event is not of string type. typeof event == '$1'";
var EL01506 = "once(event, listener); listener 는 <function> 타입이 아닙니다. typeof listener == '$1'";
var EL01507 = "off(event, listener); event is not of type <string> type of event == '$1'";
var EL01508 = "off(event, listener); listener 는 <function> 타입이 아닙니다. typeof listener == '$1'";
var EL01509 = "emit(event); event is not of type <string> type of event == '$1'";
var EL01510 = "";
var EL02100 = "----- Interface.* -----";
var EL02110 = "----- i-object.js -----";
var EL02111 = "getType(): array<function> is an abstract method. [$1] must be implemented";
var EL02112 = "instanceOf(any): boolean is an abstract method. [$1] must be implemented";
var EL02113 = "equal(any): boolena is an abstract method. [$1] must be implemented";
var EL02120 = "----- i-marshal.js -----";
var EL02121 = "getObject(opt?, origin?) : object is abstract method. [$1] must be implemented";
var EL02122 = "setObject(mObj) is an abstract method. [$1] must be implemented";
var EL02130 = "----- i-element.js -----";
var EL02131 = "clone(): object is an abstract method. [$1] must be implemented";
var EL02140 = "----- i-list.js -----";
var EL02150 = "----- i-control-list.js -----";
var EL02151 = "add(key) is an abstract method. [$1] must be implemented";
var EL02152 = "del(key) is an abstract method. [$1] must be implemented";
var EL02153 = "has(key): boolean is an abstract method. [$1] must be implemented";
var EL02154 = "find(any): any is an abstract method. [$1] must be implemented";
var EL02160 = "----- i-collection.js -----";
var EL02161 = "add(any): boolean is an abstract method. [$1] must be implemented";
var EL02162 = "remove(elem): boolean is an abstract method. [$1] must be implemented";
var EL02163 = "cantains(any): boolean is an abstract method. [$1] must be implemented";
var EL02164 = "indexOf(any): number is an abstract method. [$1] must be implemented";
var EL02170 = "----- i-collection-array.js -----";
var EL02171 = "insertAt(pos, val, ..): boolean is an abstract method. [$1] must be implemented";
var EL02180 = "----- i-collection-property.js -----";
var EL02181 = "indexToKey(idx): string is an abstract method. [$1] must be implemented";
var EL02190 = "----- i-serialize.js -----";
var EL02191 = "output(opt, ...): string is an abstract method. [$1] must be implemented";
var EL02192 = "load(any, ...) is an abstract method. [$1] must be implemented";
var EL02300 = "----- Meta.Entity.* -----";
var EL03100 = "----- Meta.* -----";
var EL03110 = "----- meta-object.js -----";
var EL03111 = "You cannot create abstract, interface, enum type. $1['_KIND'] = '$2'";
var EL03112 = "setObject(oGuid, origin); oGuid 는 'object' 타입입니다. typeof oGuid = '$1'";
var EL03113 = "setObject(oGuid, origin); different namespaces. this._type = $1, oGuid._type = $2";
var EL03114 = "setObject(oGuid, origin); origin 은 Guid 객체가 아닙니다. origin._type = '$1', origin._guid = '$2'";
var EL03120 = "----- meta-element.js -----";
var EL03121 = "$name;val is of type 'string'. type of valve = '$1'";
var EL03122 = "$name; val.length must be greater than 0";
var EL03200 = "----- meta-registry.js -----";
var EL03211 = "register(meta); the meta to register is not a Guide object. meta._type = '$1', meta._guid = '$2'";
var EL03212 = "register(meta); meta._guid to register is already registered. meta._guid = '$1'";
var EL03213 = "release(meta); the meta to release is string(guid) | object(guid) type only. type of meta = '$1'";
var EL03220 = "----- create -----";
var EL03221 = "createMetaObject(oGuid, origin); oGuid can only be of type 'object'. typeof oGuid = '$1'";
var EL03222 = "createMetaObject(oGuid, origin); oGuid._type 은 'string' 타입만 가능합니다.(length > 0) typeof oGuid._type = '$1'";
var EL0323 = "path(ns); failed to get the namespace path";
var EL03224 = "createMetaObject(oGuid, origin);[$1] Namespace is not of type 'function'. type of coClass = '$2'";
var EL03225 = "createReferObject(meta); meta can only be of type 'object'. type of meta = '$1'";
var EL03226 = "createReferObject(meta); meta._guid 은 'string' 타입만 가능합니다.(length > 0) typeof meta._guid = '$1'";
var EL03227 = "createNsReferObject(fun); fun is not type 'function'. type of fun = '$1'";
var EL03230 = "----- ns Class -----";
var EL03231 = "register Class(fun, ns, key); fun is not of type 'function'. type of fun = '$1'";
var EL03232 = "registerClass(fun, ns, key); ns is not of type 'string'. typeofns = '$1'";
var EL03233 = "register Class(fun, ns, key); key is not of type 'string'. type of key = '$1'";
var EL03234 = "releaseClass(fullName); fullName 은 'string' 타입만 가능합니다.(length > 0) typeof fullName = '$1'";
var EL03235 = "findClass(fun); fun is not type 'function'. type of fun = '$1'";
var EL03236 = "getClass(fullName); fullName can only be of type 'string' (length > 0) type of fullName = '$1'";
var EL03240 = "----- set, transform, load -----";
var EL03241 = "setMetaObject(oGuid, meta); oGuid can only be of type 'object'. typeof oGuid = '$1'";
var EL0324 = "setMetaObject(oGuid, meta); meta can only be of type 'object'. type of meta = '$1'";
var EL03243 = "setMetaObject(meta); meta._guid can only be of type 'string' (length > 0) type of meta._guid = '$1'";
var EL03244 = "transformRefer(oGuid); oGuid can only be of type 'object'. type oGuid = '$1'";
var EL03245 = "transformRefer(oGuid); $1['$2']['$ns'] is not of type 'function'";
var EL03246 = "loadMetaObject(str, path?); str is only of type 'string'. typeof str = '$1'";
var EL03247 = "loadMetaObject(str, path?); The object parsed str is not a Guide object. obj._type = '$1', obj._guid = '$2'";
var EL03250 = "----- has, valid, find -----";
var EL03251 = "validObject(oGuid); oGuid is only of type 'object'. typeof oGuid = '$1'";
var EL03252 = "hasGuidObject(oGuid, origin); guid can only be of type 'string' (length > 0) type of guid = '$1'";
var EL03253 = "hasGuidObject(oGuid, origin); origin[$1]는 'object' 타입이 아닙니다. typeof origin[$1] = '$2'";
var EL03254 = "hasRefer(oGuid); oGuid can only be of type 'object'. typeof oGuid = '$1'";
var EL03255 = "hasRefer(oGuid); oGuid is not a Guide object. oGuid._type = '$1', oGuid._guid = '$2'";
var EL03256 = "findSetObject(oGuid, origin); [ oGuid._guid | oGuid ]는 'string' 타입만 가능합니다.(length > 0) guid = '$1'";
var EL03257 = "findSetObject(oGuid, origin); origin can only be of type 'object'. typeof origin = '$1'";
var EL03300 = "----- namespace-manager.js -----";
var EL03310 = "----- private function, proterty -----";
var EL03311 = "NamespaceManager.allowOverlap 은  'boolean' 타입만 가능합니다. typeof allowOverlap = $1";
var EL03312 = "_getArray(ns); ns is not a valid namespace name rule. ns = $1";
var EL03313 = "_getArray(ns); ns type is 'string', 'array<string>' only typeofns = $1";
var EL03314 = "_getArray(ns); ns[$1] is not type 'string'. typeofns[$1] = $2";
var EL03315 = "_getArray(ns); ns[$1] is not a valid name rule. ns[$1] = $1";
var EL03320 = "----- addNamespace, delNamespace, path -----";
var EL0321 = "addNamespace(ns); addition of namespace failed";
var EL03322 = "delNamespace(ns); Namespace deletion failed";
var EL03330 = "----- add, del -----";
var EL03331 = "add(fullName,lem); [$1] is not a valid name rule";
var EL03332 = "add(fullName,lem);lem is already registered. Allow duplicate [this.allowOverlap = 'true']";
var EL03333 = "add(fullName,lem); failed to register elements in the namespace";
var EL03334 = "del(fullName); Failed to delete element in Namespace";
var EL03340 = "----- getPath, output, load -----";
var EL03341 = "getPath(elem); no element value. typeoflem = $1";
var EL03342 = "output (stringify, space); Namespace export failed. $1";
var EL03343 = "load(str, path); str is not type 'string'. typeofstr = $1";
var EL03344 = "load(str, path); Namespace loading failed. $1";
var EL04100 = "----- Collection.* -----";
var EL04110 = "----- base-collection.js -----";
var EL04111 = "_remove(idx): boolean is an abstract method. Must be implemented";
var EL04112 = "setObject(oGuid, origin); _owner connection of oGuid failed. guid = $1";
var EL04113 = "removeAt(idx); idx is not type 'number'. typeof idx = $1";
var EL04114 = "add(any): number is an abstract method. must be implemented";
var EL04115 = "clear() is an abstract method. must be implemented";
var EL04116 = "map(callback); callback is not function type. type of callback = $1";
var EL04117 = "filter(callback); callback is not function type. type of callback = $1";
var EL04118 = "reduce(callback); callback is not function type. type of callback = $1";
var EL04119 = "find(callback); callback is not function type. type of callback = $1";
var EL041110 = "forEach(callback); callback is not function type. type of callback = $1";
var EL041111 = "Some(callback); callback is not function type. type of callback = $1";
var EL041112 = "Every(callback); callback is not function type. type of callback = $1";
var EL041113 = "findIndex(callback); callback 이 function 타입이 아닙니다. typeof callback = $1";
var EL04200 = "";
var EL04210 = "----- collection-array.js -----";
var EL04211 = "_elements connection failed for setObject(oGuid, origin); oGuid['_elem'][$1]: guid = $2";
var EL04212 = "insertAt(pos, value, desc); pos is not type 'number'. typeof pos = $1";
var EL04213 = "insertAt(pos, value, desc); pos cannot be greater than this.count.pos = $1, count = $2";
var EL04214 = "insertAt(pos, value, desc); pos cannot be less than 0. pos = $1";
var EL04215 = "insertAt(pos, value, desc); registration failed. pos = $1, value = $2";
var EL04220 = "----- collection-property.js -----";
var EL04221 = "setObject(oGuid, origin); oGuid['_lem'].length = $1 length and oGuid['_key'].length = $2 length are different";
var EL04222 = "setObject(oGuid, origin); oGuid['_elem'].length = $1 length and oGuid['_desc'].length = $2 length are different";
var EL04223 = "setObject(oGuid, origin); oGuid._elem[$1] guid not found. guid = $2";
var EL04224 = "indexOf(obj, isKey); if the index value is found by key, obj must be of type 'string'. typeof obj = $1";
var EL04225 = "add(name, value, desc); name is not of type 'string'. type of name = $1";
var EL04226 = "add(name, value, desc); name = '$1' is not valid for name rule. Rule = '$2'";
var EL04227 = "add(name, value, desc); name = '$1' is the reserved word";
var EL04228 = "add(name, value, desc); name = '$1' is duplicated with existing name";
var EL04229 = "add(name, value, desc); addition failed. name = '$1', value = '$2'";
var EL0422A = "indexToKey(idx); idx is not of type 'number'. typeof idx = $1";
var EL0422B = "exists(key); key is not of type 'string' (length > 0) type of key = $1";
var EL04300 = "";
var EL04310 = "----- collection-transaction.js -----";
var EL04311 = "$1.autoChanges 는 'boolean' 타입입니다. typeof aucoChanges = '$2'";
var EL04320 = "----- trans-queue.js -----";
var EL04321 = "collection value is not an instance that inherited [MetaObject]";
var EL04322 = "collection is not an instance of [ArrayCollection]";
var EL04323 = "rollback(); '$1' is an unprocessable cmd";
var WS011 = "[$1] Destination [$2] cannot be deleted";
var EN = "END";
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

/**** message.js | Message ****/
const localesPath = './locales';    // 상대 경로

//==============================================================
// 2. module dependency check
//==============================================================
// 3. module implementation       
/**
 * @class Message
 * @description 메시지 코드 관리 클래스 (static)
 */
var Message = (function () {
    /**
     * @constructor
     */
    function Message() { 
    }
    Message._NS = 'Common';     // namespace

    // inner function
    function _isObject(obj) {
        return obj && typeof obj === 'object' && !Array.isArray(obj);
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

    async function loadJSON(filePath) {
        const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null && typeof navigator === 'undefined';
        let isESM = false;

        if (typeof require === 'undefined') isESM = true;


        if (isNode) {
            // ESM (import assertions 사용)
            // return (await import(filePath, { assert: { type: 'json' } })).default;


            if (isESM) {
                return (await import(filePath, { assert: { type: 'json' } })).default;
            } else {
                return require(filePath);
            }


            // } else {
            //     // CJS (require 사용)
            //     // const fs = require('fs');
            //     // return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            //     return require(filePath);
            // }
        } else {
            // 브라우저 환경 (fetch 사용)
            const response = await fetch(filePath);
            return await response.json();
        }
        
        // let isESM = true;
        
        // if (typeof module !== 'undefined' && module.exports) {
        //     isESM = false;
        // }

        // if (isNode) {
        //     if (isESM) {
        //         // ESM (import assertions 사용)
        //         try {
        //             return (await import(filePath, { with: { type: 'json' } })).default;
        //         } catch (error) {
        //             return require(filePath);
        //         }
        //     } else {
        //         // CJS (require 사용)
        //         // const fs = require('fs');
        //         // return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        //         return require(filePath);
        //     }
        // } else {
        //     // 브라우저 환경 (fetch 사용)
        //     const response = await fetch(filePath);
        //     return await response.json();
        // }
    }

    function _getLocale() {
        let locale = "";
    
        if (typeof window !== "undefined" && typeof navigator !== "undefined") {
            // 브라우저 환경
            const lang = navigator.languages?.[0] || navigator.language || Intl.DateTimeFormat().resolvedOptions().locale;
            locale = lang.split(/[_-]/)[0]; // "ko-KR" -> "ko"
        } else if (typeof process !== "undefined") {
            // Node.js 환경
            const rawLocale = process.env.LANG || process.env.LC_ALL || process.env.LANGUAGE;
            if (rawLocale) {
                locale = rawLocale.split(/[:_.]/)[0].replace("_", "-"); // "ko_KR.UTF-8" -> "ko"
            }
        }
        return locale || 'en';
    }

    // function _getLocale() {
    //     if (typeof window !== "undefined" && typeof navigator !== "undefined") {
    //         // 브라우저 환경
    //         return navigator.language || Intl.DateTimeFormat().resolvedOptions().locale;
    //     } else if (typeof process !== "undefined") {
    //         // Node.js 환경
    //         const rawLocale = process.env.LANG || process.env.LC_ALL || process.env.LANGUAGE;
    //         if (rawLocale) {
    //             return rawLocale.split(/[_.]/)[0].replace("_", "-");
    //         }
    //         return Intl.DateTimeFormat().resolvedOptions().locale || "en-US";
    //     }
    //     return "en-US"; // 기본값
    // }

    // async function _detectLanguage() {
    //     var lang = defaultLang;
    //     var locale = await osLocale();
    //     // var locale = 'ko_KR';

    //     if (autoDetect) {
    //         lang = locale.split('-')[0];
    //         Message.changeLanguage(lang);
    //     }
    //     return lang;
    // };

    // var define
    var $storage = { 
        lang: { default: {} },
        path: []
    };
    var autoDetect = true;
    var defaultLang = 'default';
    var currentLang = defaultLang;
    // var currentLang = _detectLanguage();

    // (async () => {
    //     currentLang = _detectLanguage();
    //     console.log("Detected Language:", currentLang);
    // })();

    // $storage.lang.en = $storage.lang.default;
    
    /**
     * 메시지 코드 스토리지
     * @member {string} Message#$storage
     */
    Object.defineProperty(Message, '$storage', {
        get: function() { 
            return $storage;
        },
        configurable: false,
        enumerable: true,
    });

    /**
     * 언어 자동 감지 여부
     * @member {string} Message#autoDetect
     */
    Object.defineProperty(Message, 'autoDetect', {
        get: function() { 
            return autoDetect;
        },
        configurable: false,
        enumerable: true,
    });

    /**
     * 기본 언어 
     * @member {string} Message#defaultLang
     */
    Object.defineProperty(Message, 'defaultLang', {
        get: function() { return defaultLang; },
        set: function(val) { defaultLang = val; },
        configurable: false,
        enumerable: true,
    });

    /**
     * 현재 언어 
     * @member {string} Message#currentLang
     */
    Object.defineProperty(Message, 'currentLang', {
        get: function() { return currentLang; },
        set: function(val) { currentLang = val; },
        configurable: false,
        enumerable: true,
    });

    
    // Message._defaultMessage = function(p_lang) {
    // };
    
    Message._replacePlaceholders = function(p_template, p_values) {
        let namedValues = {}, indexedValues = [];
        
        if (Array.isArray(p_values)) indexedValues = p_values;
        else if (typeof p_values === 'object') namedValues = p_values;

        // `${변수명}` 치환
        p_template = p_template.replace(/\$\{(\w+)\}/g, function(match, key) {
            return namedValues.hasOwnProperty(key) ? namedValues[key] : match;
        });
        // `$1, $2` 치환
        p_template = p_template.replace(/\$(\d+)/g, function(match, index) {
            var i = parseInt(index, 10) - 1;
            return indexedValues[i] !== undefined ? indexedValues[i] : match;
        });

        return p_template;
    };
    
    Message._getMessageByCode = function(p_code) {
        var value = $storage.lang[currentLang]?.[p_code] || $storage.lang[defaultLang]?.[p_code];
        return typeof value === 'number' ? String(value) : value;
    };
    
    Message.importMessage = function(p_msg, p_path) {
        if (_isObject(p_msg)) {
            deepMerge($storage.lang.default, p_msg);
            $storage.path.push(p_path);
        }
    };

    Message.changeLanguage = async function(p_lang) {
        for (var i = 0; i < $storage.path.length; i++) {
            var localPath = $storage.path[i];
            var msg = await loadJSON(`${localPath}/${p_lang}.json`);

            $storage.lang[p_lang] = $storage.lang[p_lang] || {};
            // if (typeof $storage.lang[p_lang] === 'undefined') $storage.lang[p_lang] = {};

            if (typeof msg === 'object') deepMerge($storage.lang[p_lang], msg);
            else console.warn(`Path '${localPath}/${p_lang}' does not have a file.`);
        }
        currentLang = p_lang;
    };

    Message.get = function(p_code, p_values) {
        var msg = Message._getMessageByCode(p_code);
        var result;

        if (typeof msg === 'undefined') {
            return `There is no message for code '${p_code}'.`
        }
        result = Message._replacePlaceholders(msg, p_values);
        return result;
    };

    Message.init = async function() {
        var locale;
        {
            locale = _getLocale();
            // lang = locale.split('-')[0];
            await Message.changeLanguage(locale);
            // Message.currentLang = locale;
        }
    };

    return Message;
}());

// Message.init();

Message.importMessage(defaultCode, localesPath);

exports.Message = Message;
exports.default = Message;
