/*! logic Core v1.0.5 Copyright (c) 2025 logic and contributors */
'use strict';

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
var EL01102 = "Type match : target is not type '$1'. tarType : $2";
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
var EL03223 = "createMetaObject(oGuid, origin); origin can only be of type 'object'. typeof origin = '$1'";
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
var EL0323 = "path(ns); failed to get the namespace path";
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
var EN = "OK";
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
	EL03223: EL03223,
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
	EL0323: EL0323,
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

// inner function
function _isObject$2(obj) {
    return obj && typeof obj === 'object' && !Array.isArray(obj);
}
function _isString(obj) {    // 공백아닌 문자 여부
    if (typeof obj === 'string' && obj.length > 0) return true;
    return false;
}
function _deepMerge(target, source) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            var targetValue = target[key];
            var sourceValue = source[key];
            if (_isObject$2(sourceValue)) {
                if (!_isObject$2(targetValue)) {
                    target[key] = {};
                }
                target[key] = _deepMerge(target[key], sourceValue);
            } else {
                target[key] = sourceValue;
            }
        }
    }
    return target;
}

async function _loadJSON(filePath) {
    const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null && typeof navigator === 'undefined';
    const isESM = isNode && (typeof require === 'undefined' || globalThis.isESM === true);   // REVIEW: test hack
    
    try {
        if (isESM) {
            return (await import(filePath, { assert: { type: 'json' } })).default;
        } else if (isNode) {
            return require(filePath);
        } else {
            const response = await fetch(filePath);
            return await response.json();
        }
    } catch (error) {
        return;
    }
}

function _getLocale() {
    let locale = '';

    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
        // 브라우저 환경
        const lang = navigator.languages?.[0] || navigator.language || Intl.DateTimeFormat().resolvedOptions().locale;
        locale = lang.split(/[_-]/)[0]; // "ko-KR" -> "ko"
    } else if (typeof process !== 'undefined') {
        // Node.js 환경
        const rawLocale = process.env.LANG || process.env.LC_ALL || process.env.LANGUAGE;
        if (rawLocale) {
            locale = rawLocale.split(/[:_.]/)[0].replace('_', '-'); // "ko_KR.UTF-8" -> "ko"
        }
    }
    return locale || 'en';
}

function _replacePlaceholders (p_template, p_values) {
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
}
/**
 * 'Message' is a class that manages messages and codes.  
 */
class Message {

    /**
     * Namespace path. ('Common')
     */
    static _NS = 'Common';
    
    /**
     * Internal repository that stores message code.  
     */
    static $storage = {
        lang: { default: {} },
        path: []
    };
    
    /**
     * Sets whether automatic language detection is enabled. Default is true.  
     */
    // static autoDetect = true;
    
    /**
     * Set the default language. Default is 'default'.  
     */
    static defaultLang = 'default';
    
    /**
     * Sets the current language. Default is 'default'.  
     */
    static currentLang = this.defaultLang;

    
    /**
     * Returns a message that corresponds to the message code.  
     * 
     * @param {string} p_code Message code
     * @returns {string} Message String
     */
    static getMessageByCode (p_code) {
        var value = this.$storage.lang[this.currentLang]?.[p_code] || this.$storage.lang[this.defaultLang]?.[p_code];
        return typeof value === 'number' ? String(value) : value;
    };

    /**
     * Add the message code to the storage.  
     * 
     * @param {object} p_msg Message Object
     * @param {string} p_path Message file path
     */
    static async importMessage (p_msg, p_path) {
        let locale;

        if (_isObject$2(p_msg)) {
            _deepMerge(this.$storage.lang.default, p_msg);
            if (_isString(p_path)) this.$storage.path.push(p_path);
        }

        locale = _getLocale();
        if (locale === 'en') locale = 'default';
        await Message.changeLanguage(locale);
    };

    /**
     * Change the language.  
     * 
     * @param {string} p_lang language code
     */
    static async changeLanguage (p_lang) {
        this.currentLang = p_lang;
        for (var i = 0; i < this.$storage.path.length; i++) {
            var localPath = this.$storage.path[i];
            var msg = await _loadJSON(`${localPath}/${p_lang}.json`);

            this.$storage.lang[p_lang] = this.$storage.lang[p_lang] || {};
            // if (typeof $storage.lang[p_lang] === 'undefined') $storage.lang[p_lang] = {};

            if (typeof msg === 'object') _deepMerge(this.$storage.lang[p_lang], msg);
            else console.warn(`Path '${localPath}/${p_lang}' does not have a file.`);
        }
    }

    /**
     * Returns a string corresponding to the given message code.  
     * 
     * @param {string} p_code Message code
     * @param {object | string[]} p_values Value to replace in message
     * @returns {string} 메시지
     */
    static get (p_code, p_values) {
        var msg = Message.getMessageByCode(p_code);
        var result;

        if (typeof msg === 'undefined') {
            return `There is no message for code. '${p_code}'`
        }
        result = _replacePlaceholders(msg, p_values);
        return $intro(p_code) + result;

        // inner funciton
        function $intro(code) {
            var intro = '';
            var firstChar = code.substring(0, 1);
            
            if (firstChar === 'E') intro = 'Error';
            else if (firstChar === 'W') intro = 'Warn';
            return intro + ' ['+ code +'] ';
        }
    };

    /**
     * Initialize the language.  
     */
    static async resetLang () {
        // let locale;
        this.currentLang = this.defaultLang;
        // if (this.autoDetect) {
        //     locale = _getLocale();
        //     if (locale === 'en') locale = 'default';
        //     await Message.changeLanguage(locale);
        // }
    }
}

(async () => {
    await Message.importMessage(defaultCode, localesPath);
})();

/**** extend-error.js | ExtendError ****/


//==============================================================Á
// 2. module dependency check
//==============================================================
// 3. module implementation   

// inner function 
function _buildMessageProp(obj) {
    var msg = '';
    for (var prop in obj) {
        if (typeof obj[prop] === 'string') msg += prop + ' : '+ obj[prop] + '\n';
        else continue;
    }
    return msg;
}
function _buildMsgQueue(queue) {
    var msg = '';
    var queue_cnt = queue.length;
    for (var i = queue_cnt; i > 0; i--) {
        var mark = '';
        for (var j = i; j <= queue_cnt; j++) { mark += '#'; }
        msg += '' + mark + ' '+ queue[i - 1] + '\n';
    }
    return msg;
}

class ExtendError extends Error {

    static _NS = 'Common';      // namespace

    /**
     * Save previously generated messages.  
     * 
     * @member {string[]} ExtendError#queue
     */
    queue = [];

    /**
     * Error message related to property type.  
     * 
     * @member {object} ExtendError#prop
     */
    prop = {};

    /**
     * Use user messages to create an ExtendError instance.  
     *
     * @param {string} msg Error message string
     * @param {ExtendError | object | null} causeOrProp Error message by existing ExtendError, Error object or property
     *
     * @example
     * throw new ExtendError("Custom error message");
     * throw new ExtendError("Custom error message", error);
     * throw new ExtendError("Custom error message", { style: "required" });
     */

    /**
     * Create an instance of 'ExtendError' using the message code and substitution value.  
     *
     * @param {RegExp} msgPattern Code value of regular expression type
     * @param {ExtendError | object | null} causeOrProp Error message by existing ExtendError, Error object or property
     * @param {string[]} placeholders Array of strings containing substitution values such as '$1' and '$2' in the
     *
     * @example
     * // For messages that do not have a substitution value
     * throw new ExtendError(/EL01504/);
     * throw new ExtendError(/EL01504/, error);
     * throw new ExtendError(/EL01504/, { style: "required" });
     * // For messages with substitution values
     * throw new ExtendError(/EL01504/, undefined, ['value1', 'value2']);
     * throw new ExtendError(/EL01504/, error, ['value1', 'value2']););
     * throw new ExtendError(/EL01504/, { style: "required" }, ['value1', 'value2']);
     */
    constructor(p_msg, p_prop, p_codeVal) {
        super();
        
        var _build = '';
        var _prop;
        var _queue = [];    
        var _msg;

        if (p_prop instanceof ExtendError) {
            _queue = p_prop.queue;
            _prop = p_prop.prop;
        } else if (p_prop instanceof Error) {
            _queue.push(p_prop.message);
        } else if (typeof p_prop  === 'object' && p_prop !== null) {
            _prop = p_prop;
        }
        
        if (typeof p_msg === 'string') {
            _msg = p_msg;
        } else if (p_msg instanceof RegExp) {
            _msg = Message.get(p_msg.source, p_codeVal);
        } else _msg = '';
        
        _build = _msg + '\n';
        
        if (_prop) _build += _buildMessageProp(_prop);
        if (_queue.length > 0) _build += _buildMsgQueue(_queue);

        this.message = _build;
        this.queue = _queue;
        this.queue.push(_msg);
    }

    /**
     * Converts error messages into strings.  
     * 
     * @return error message string
     */
    toString() {
        return 'ExtendError : ' + this.message;
    }
}

/**** util-type.js Type ****/
//==============================================================
// 1. import module

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

//==============================================================
// 3. module implementation 
var _global$1 = globalThis;
var OLD_ENV$1 = _global$1.OLD_ENV ? _global$1.OLD_ENV : false;    // 커버리지 테스트 역활

/**
 * This is a type module.
 */
var Type = {};

/**
 * object 와 new 생성한 사용자 함수를 제외한 객쳐 여부
 * @param {*} obj 
 * @returns {boolean}
 */
function _isPrimitiveObj(obj) { // REVIEW: 정리 필요, 의미적으로 명료하게..
    if(typeof obj === 'object' && obj !== null 
        && (obj instanceof RegExp || obj instanceof Date )) {
        return true;
    }
    return false;
}

/**
 * 최상위 object 이거나 사용자 함수에서 생성한 객체 여부
 * @param {*} obj 
 * @returns {boolean}
 */
function _isObject$1(obj)  {  // REVIEW: 정리 필요, 의미적으로 명료하게
    if(typeof obj === 'object' && obj !== null && !_isPrimitiveObj(obj)) {
        return true;
    }
    return false;
}

/**
 * 공백객체 인지 확인
 * @param {*} obj 검사대상
 * @returns {boolean}
 */
function _isEmptyObj(obj)  {
    if(_isObject$1(obj) && Object.keys(obj).length === 0 && getAllProperties(obj).length === 0) return true;
    return false;
}

/**
 * 공백이 아닌 객체 (prototype 및 속성 있는것)
 * @param {*} obj 대상 
 * @returns {boolean}
 */
function _isFillObj(obj)  {
    if(_isObject$1(obj) && getAllProperties(obj).length > 0) return true;
    return false;
}

/**
 * 내장함수 유무
 * @param {*} obj 
 * @returns {boolean}
 */
function _isBuiltFunction(obj) {
    if (typeof obj === 'function' && (obj === Number || obj === String || obj === Boolean
        || obj === Object || obj === Array || obj === Function
        || obj === RegExp || obj === Date 
        || obj === Symbol || obj === BigInt
    )) return true;
    return false;
}

/**
 * 첫문자 대문자 여부
 * @param {string} strValue 
 * @returns {boolean}
 */
function _isUpper(strValue) {
    var firstStr = strValue.charAt(0);
    if (firstStr === '') return false;
    if(firstStr === firstStr.toUpperCase()) return true;
}

/**
 * 리터럴 여부  
 * number, string, boolean, bigint, RexExp instance
 * @param {*} obj 
 * @returns {boolean}
 */
function _isLiteral(obj) {
    if (typeof obj  === 'number') return true;
    if (typeof obj  === 'string') return true;
    if (typeof obj  === 'boolean') return true;
    if (typeof obj  === 'bigint') return true;
    if (obj instanceof RegExp) return true;
}

/**
 * 리터럴값 비교  
 * number, string, boolean, bigint, RexExp instance
 * @param {*} obj1 
 * @param {*} obj2 
 * @returns {boolean}
 */
function _equalLiternal(obj1, obj2) {
    if (obj1 === obj2) return true;
    if (obj1 instanceof RegExp && obj2 instanceof RegExp && obj1.source === obj2.source) return true;
    return false;
}

/**
 * function 생성하는 생성자
 * @param {*} type 
 * @returns {object}
 */
var _creator = function(type) {
    return new type;
};

/**
 * 타임명 얻기
 * @param {*} obj 
 * @returns {string}
 */
function _typeName(obj) {
    return obj['name'];
}

/**
 * kind 코드, 대문자로 얻기 '_any_'...
 * @param {*} val 
 * @returns {string}
 */
function _getKeyCode(val) {
    var reg = /^_[a-zA-Z]+_/;
    var result;

    if (typeof val !== 'string') return;
    result = reg.exec(val);
    if (result !== null) return result[0].toUpperCase();
}

// 배열 구조 분해 할당을 해제 
function restoreArrowFunction(transformedCode) {
    // 1. 화살표 함수의 매개변수와 본문 전체를 추출
    const regex = /\((.*?)\)\s*=>\s*\{([\s\S]*)\}/;
    const match = transformedCode.match(regex);
  
    // 특별히 `_ref => { ... }` 형태도 대응할 수 있도록 추가 처리
    //  -> _ref => { let [String] = _ref; return Number; }
    //  -> 실제로는 ( _ref ) => { ... } 형태로 통일
    if (!match) {
      // 혹시 _ref => { ... } 형태라면, 강제로 괄호를 넣어 재시도
      const altRegex = /^(.*?)\s*=>\s*\{([\s\S]*)\}/;
      const altMatch = transformedCode.match(altRegex);
      if (!altMatch) {
        throw new Error('Invalid arrow function format.');
      }
      // altMatch[1] = "_ref"
      // altMatch[2] = "let [String] = _ref; return Number;"
      let altParams = altMatch[1].trim();
      let altBody = altMatch[2].trim();
  
      // 화살표 함수 형태 통일:  ( _ref ) => { ... }
      return restoreArrowFunction(`(${altParams}) => {${altBody}}`);
    }
  
    // 2. 매개변수와 함수 본문 부분 분리
    let params = match[1].trim();  // 함수의 매개변수 부분
    let body = match[2].trim();    // 함수 본문
  
    // 3. 구조 분해 할당 패턴 (객체/배열 모두 대응) - 여러 줄(줄바꿈)도 허용
    //    예: let { aa: String } = _ref5;  또는 let [[{ bb: Number }]] = _ref6;
    const paramAssignments = body.match(/let\s+(\{[\s\S]*?\}|\[[\s\S]*?\])\s*=\s*(\w+);/g) || [];
  
    // 4. 찾아낸 구조 분해 할당들을 순회하며 매개변수( _ref5, _ref6 등 )를 원래 형태로 치환
    paramAssignments.forEach(assign => {
      // - parts[1]: { aa: String } 또는 [String] 등 (줄바꿈 포함 가능)
      // - parts[2]: _ref5, _ref6 등
      const parts = assign.match(/let\s+(\{[\s\S]*?\}|\[[\s\S]*?\])\s*=\s*(\w+);/);
      if (parts) {
        const extractedParam = parts[1].trim(); // 원래 구조
        const originalParam = parts[2].trim();  // 변환된 변수명 (_ref5 등)
  
        // 매개변수 목록에 있던 _ref5 등을 { aa: String } 등으로 치환
        const re = new RegExp(`\\b${originalParam}\\b`, 'g');
        params = params.replace(re, extractedParam);
      }
    });
  
    // 5. return 문이 있다면 반환값을 추출
    //    예: return Number; -> "Number"
    const returnStatementMatch = body.match(/return\s+(.*?);/);
    let returnType = returnStatementMatch ? returnStatementMatch[1].trim() : '';
  
    // 6. 최종 복원 – return 문이 있다면 { return ... } 형태로, 없으면 { } 로
    if (returnType) {
      // 불필요한 공백 없애기 위해 파라메터 부분도 스페이스 정리
      params = params.replace(/\s+/g, '');
      return `(${params})=>{return ${returnType}}`;
    } else {
      params = params.replace(/\s+/g, '');
      return `(${params})=>{}`;
    }
}

/**
 * 함수 규칙   
 * - (params 내부에는 '()' 입력 금지)  
 * - 참조형 타입 금지 : new Function() 시점에 자동 해석됨  
 * @param {*} funBody 
 * @returns {object}
 */
function _parseFunc(funBody) {
    var syntax1 = /\([,_\[\]{:}\w\s]*\)\s*(?:=>)?\s*{\s*.*\s*.*\s*}/;    // 제한 규칙
    var syntax2 = /(\(.*\)|\w+)\s*(?:=>).*/;
    var regFunc1 = /(?:function\s)?\(([\[\]{:}\s\w,]*)\)\s*(?:=>)?\s*{(?:\s*return\s+|\s*)?([\[\]{:}\s\w,]*);?\s*}/;
    var regFunc2 = /\(?([\[\]{:}\s\w,]*)\)?\s*(?:=>)\s*{?(?:\s*return\s+|\s*)?([\[\]\s\w,]*);?\s*}?/;
    
    var arrFunc;
    var result = { params: [], return: undefined };
    var arrParam = [];
    var arrRetrun;
    
    // 배열 구조 분해 할당을 해제 
    if (/\blet\b/.test(funBody)) funBody = restoreArrowFunction(funBody);
    
    funBody = $skipComment(funBody);

    try {
        if (syntax1.test(funBody)) arrFunc = regFunc1.exec(funBody);
        else if (syntax2.test(funBody)) arrFunc = regFunc2.exec(funBody);
        else throw new ExtendError(/EL01301/, null, [funBody]);
        
        if (arrFunc === null) throw new ExtendError(/EL01302/, null, [funBody]);

        arrParam = (new Function('return ['+ arrFunc[1] +']'))();
        result['params'] = arrParam;
        
        if (arrFunc[2] !== '') arrRetrun = (new Function('return '+ arrFunc[2]))();
        result['return'] = arrRetrun;

    } catch (error) {
        throw new ExtendError(/EL01303/, error, ['']);
    }

    return result;

    // inner function
    function $skipComment(body) {    // 주석 제거 comment
        var rBody = body;
        var bloackComment = /\/\*[^](.*?)\*\//g;
        var lineComment = /\/\/[^](.*?)(\n|$)/g;

        rBody = rBody.replace(bloackComment, '');
        rBody = rBody.replace(lineComment, '');
        return rBody;
    }
}

/**
 * 타입 여부
 * @param {string} name 
 * @returns {boolean}
 */
function _hasType(name) {
    var arr = [];
    
    if (typeof name !== 'string') return false;

    arr = arr.concat(['null', 'undefined', 'number', 'string', 'boolean']);
    arr = arr.concat(['array', 'function', 'object']);
    arr = arr.concat(['choice', 'union', 'class']);
    arr = arr.concat(['symbol', 'bigint', 'regexp']);
    arr = arr.concat(['etc']);  // 예외 오류 코드 검출 

    return arr.indexOf(name) > -1;
}

/**
 * 타입 여부
 * @param {string} name 
 * @returns {boolean}
 */
function _isLeafType(name) {
    var arr = [];
    
    arr = arr.concat(['null', 'undefined', 'number', 'string', 'boolean']);
    arr = arr.concat(['symbol', 'bigint', 'regexp', 'object']);

    return arr.indexOf(name) > -1;
}

/**
 * choice type kind 여부
 * @param {string} name 
 * @returns {boolean}
 */
function _hasKindChoice(name) {
    var arr = [];
    
    if (typeof name !== 'string') return false;
    
    arr = arr.concat(['_ALL_', '_ANY_', '_NON_', '_ERR_']);
    arr = arr.concat(['_REQ_', '_OPT_', '_DEF_', '_EUM_']);
    arr = arr.concat(['_ETC_']);  // 예외 오류 코드 검출 

    return arr.indexOf(name) > -1;
}

/**
 * choice type kind 여부
 * @param {string} name 
 * @returns {boolean}
 */
function _hasKindArray(name) {
    var arr = [];
    
    if (typeof name !== 'string') return false;

    arr = arr.concat(['_ALL_', '_ANY_']);
    arr = arr.concat(['_REQ_', '_OPT_', '_SEQ_']);
    arr = arr.concat(['_ETC_']);  // 예외 오류 코드 검출 

    return arr.indexOf(name) > -1;
}

/**
 * Query all properties of the object.
 * 
 * @param {object} obj  Object to look up properties (except Object)
 * @param {boolean?} hasObj Whether to include properties of 'Object'
 * @returns {array<string>} Property Name Arrangement
 */
function getAllProperties(obj, hasObj) {
    var allProps = [], cur = obj;
    var is = hasObj || false;
    do {
        var props = Object.getOwnPropertyNames(cur);
        for (var i = 0; i < props.length; i++) {
            var prop = props[i];
            if (allProps.indexOf(prop) === -1 && (is || !Object.prototype.hasOwnProperty(prop))) allProps.push(prop);
        }
    } while (cur = Object.getPrototypeOf(cur))
    return allProps;
}Type.getAllProperties = getAllProperties;

/**
 * Compare the two objects to see if they are the same (except Prototype)  
 * 
 * @param {any} obj1 Source object
 * @param {any} obj2 Object to compare
 * @returns {boolean} Whether the two objects are the same ('true' or 'false')
 */
function deepEqual(obj1, obj2) {
    // 두 객체가 동일한 참조를 가지면 true를 반환
    if (obj1 === obj2) return true;

    // 두 객체 중 하나가 null이거나 타입이 다르면 false를 반환
    if (obj1 === null || obj2 === null || typeof obj1 !== typeof obj2) return false;

    // 함수 비교
    if (typeof obj1 === 'function' && typeof obj2 === 'function') {
        return obj1.toString() === obj2.toString();
    }

    // 원시 값 비교
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;

    // 배열 비교
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) return false;
        for (var i = 0; i < obj1.length; i++) {
            if (!deepEqual(obj1[i], obj2[i])) return false;
        }
        return true;
    }

    // 객체 비교
    // var keys1 = Object.keys(obj1);
    // var keys2 = Object.keys(obj2);
    var keys1 = Object.getOwnPropertyNames(obj1);
    var keys2 = Object.getOwnPropertyNames(obj2);

    if (keys1.length !== keys2.length) return false;

    for (var j = 0; j < keys1.length; j++) {
        var key = keys1[j];
        if (keys2.indexOf(key) === -1 || !deepEqual(obj1[key], obj2[key])) return false;
    }

    return true;
}
Type.deepEqual = deepEqual;

// function deepEqual(obj1, obj2) {
//     if (obj1 === obj2) return true;
//     if (typeof obj1 !== typeof obj2) return false;
//     if ($_isPrimitiveType(obj1) && !(obj1 === obj2)) return false;
//     if (typeof obj1 === 'function' && !$equalFunction(obj1, obj2)) return false;

//     if (Array.isArray(obj1)) {
//         if (obj1.length !== obj2.length) return false;
//         for (var i = 0; i < obj1.length; i++) {
//             var val1 = obj1[i];
//             var val2 = obj2[i];
//             if (!deepEqual(val1, val2)) return false;
//         }
//     } else {
//         if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
//         for (var key in obj1) {
//             if (Object.prototype.hasOwnProperty.call(obj1, key)) {
//                 var val1 = obj1[key];
//                 var val2 = obj2[key];
//                 if (!deepEqual(val1, val2)) return false;
//             }
//         }
//     }
//     return true;
//     // inner function
//     function $equalFunction(fun1, fun2) {
//         // if (typeof fun1 !== 'function') return false;
//         // if (typeof fun2 !== 'function') return false;
//         if (fun1 === fun2 || fun1.toString() === fun2.toString()) return true;
//         return false;
//     }
//     function $_isPrimitiveType(obj) {
//         if (typeof obj === 'string' || typeof obj === 'number' 
//             || typeof obj === 'boolean' || typeof obj === 'undefined' || typeof obj === 'bigint') return true;
//         return false;
//     }
// }


/**
 * Gets the type of the given function (generator). (Can include '_UNION')  
 * The returned arrays are included in order from the specified function.  
 * 
 * @param {function} ctor Generator function or class
 * @param {boolean} [hasUnion= true] whether '_UNION' is included (default: 'true')
 * @returns {array<function>} Array function type
 */
function getTypes(ctor, hasUnion) {
    var arr = [];
    var tempArr = [];
    var union;
    var proto;

    hasUnion = hasUnion === false ? false : true;
    
    if (typeof ctor !== 'function') throw new ExtendError(/EL0130C/, null, [typeof ctor]);

    arr.push(ctor);
    proto = $getPrototype(ctor);        
    
    if (proto !== Function.prototype) {
        arr = arr.concat(getTypes(proto, hasUnion));
    }
    if (hasUnion) {
        union = ctor['_UNION'] || [];
        for (var i = 0; i < union.length; i++) {
            arr = arr.concat(getTypes(union[i], hasUnion));
        }
    }

    for (var j = 0; j < arr.length; j++) {
        var idx = tempArr.indexOf(arr[j]);
        if (idx < 0) tempArr.push(arr[j]);
    }
    return tempArr;

    // innner function
    function $getPrototype(ctor) {
        // if (ctor.hasOwnProperty('super')) return ctor.super;
        if (Object.prototype.hasOwnProperty.call(ctor, 'super')) return ctor.super;
        return !OLD_ENV$1 && typeof Object.getPrototypeOf === 'function' ? Object.getPrototypeOf(ctor) : ctor.__proto__;
    }
}
Type.getTypes = getTypes;

/**
 * Verify that the prototype (inheritance) chain of the function type contains the specified target.  
 * 
 * @param {function} ctor Generator function or class
 * @param {function | string} target To be examined (generator function or class name)
 * @returns {boolean} whether to be included in the prototype chain ('true' or 'false')
 */
function isProtoChain(ctor, target) {
    var arr;
    if (typeof ctor !== 'function') return false;
    if (!(typeof target === 'function' || typeof target === 'string')) return false;

    arr = getTypes(ctor, false);
    for (var i = 0; i < arr.length; i++) {
        if (typeof target === 'string') {
            if (target === arr[i].name) return true;
        } else {
            if (target === arr[i]) return true;
        }
    }
    return false;
}
Type.isProtoChain = isProtoChain;

/**
 * Verify that the given function type is included in the prototype (inheritance) chain or is of type '_UNION'.  
 * 
 * @param {function} ctor Generator function or class
 * @param {function | string} target To be examined (generator function or class name)
 * @returns {boolean} Prototype chain or type '_UNION' ('true' or 'false')
 */
function hasType(ctor, target) {
    var arr;
    if (typeof ctor !== 'function') return false;
    if (!(typeof target === 'function' || typeof target === 'string')) return false;

    arr = getTypes(ctor);
    for (var i = 0; i < arr.length; i++) {
        if (typeof target === 'string') {
            if (target === arr[i].name) return true;
        } else {
            if (target === arr[i]) return true;
        }
    }
    return false;
}
Type.hasType = hasType;

/**
 * Returns extension information of the target type in JSON format.  
 * Analyze the internal properties of the object to transform all properties into the format 'typeObject()'.  
 * 
 * @param {*} target Target type
 * @returns {object} converted extension type object
 * @example
 * var obj = {
 *      $ype: '',
 *      default: null,                  // string, number, boolean, regexp
 *      kind: '',                       // array, choice
 *      creator: null, _instance: {},   // class
 *      _prop: {},                      // union
 *      params: [], return: null,       // function
 *      name: name, func: null,
 * }
 */
function typeObject(target) {
    var obj = {};
    var typeObj = _isObject$1(target) && target['$type'] ? target : extendType(target);
    var leafType = ['null', 'undefined', 'number', 'string', 'boolean', 'symbol', 'bigi¡nt', 'object', 'regexp'];

    obj['$type'] = typeObj['$type'];
    
    if (typeObj['default'] !== null && typeof typeObj['default'] !== 'undefined') obj['default'] = typeObj['default'];
    if (typeObj['kind'] !== null && typeof typeObj['kind'] !== 'undefined') obj['kind'] = typeObj['kind'];
    if (typeObj['params']) obj['params'] = typeObj['params'];
    if (typeObj['return']) obj['return'] = typeObj['return'];
    if (typeObj['creator']) obj['creator'] = typeObj['creator'];
    if (typeObj['_instance']) obj['_instance'] = typeObj['_instance'];

    if (leafType.indexOf(obj['$type']) > -1) {
        if (typeObj['default']) obj['default'] = typeObj['default'];
        return obj;
    }
    if (obj['$type'] === 'array' ||  obj['$type'] === 'choice') {
        obj['list'] = [];
        for(var i = 0; i < typeObj['list'].length; i++) {
            obj['list'][i] = typeObject(typeObj['list'][i]);
        }
    }
    if (obj['$type'] === 'function') {
        for(var j = 0; j < obj['params'].length; j++) {
            obj['params'][j] = typeObject(typeObj['params'][j]);
        }
        if (typeObj['return']) obj['return'] = typeObject(typeObj['return']);
    }
    if (obj['$type'] === 'class') {
        if (typeof typeObj['ref'] === 'function') {
            obj['creator'] = typeObj['ref'].name; 
            var temp = _creator(typeObj['ref']);
            obj['_instance'] = typeObject(temp);
        }
    }
    if (obj['$type'] === 'union') {
        obj['_prop'] = {};
        var temp2 = typeObj['ref'] || typeObj['_prop'];
        var list = getAllProperties(temp2);
        for (var k = 0; k < list.length; k++) {
            var key = list[k];
            if ('_interface' === key || 'isImplementOf' === key ) continue;             // 예약어
            obj['_prop'][key] = typeObject(temp2[key]);
        }
    }
    return obj;
}Type.typeObject = typeObject;

/**
 * Returns the extension type name of the target object.  
 * 
 * @param {*} target Target object
 * @returns {string} extended type name
 */
function typeOf(target) {
    return extendType(target)['$type'];
}Type.typeOf = typeOf;

/**
 * Returns the extension type of the target object.  
 * 
 * @param {any} target Target object
 * @returns {object} extended type object
 * @example
 * var singleType = ['undefined', 'null', 'number', 'string', 'boolean', 'regexp', 'object', 'symbol'];
 * var unionType = ['array', 'choice', 'function', 'class', 'union'];
 */
function extendType(target) {
    var obj =  { $type: '', ref: undefined };

    obj.toString = function(){
        var temp = '';
        var arr = [];
        if (this['$type'] === 'array' || this['$type'] === 'choice') {
            for (var i = 0; i < this['list'].length; i++) {
                var _type = extendType(this['list'][i]);
                if (_type['default'] && _type['default'] !== null) {
                    var def;
                    if (_type['$type'] === 'string') def = '\''+ _type['default'] +'\'';
                    else def = _type['default'];
                    arr.push(_type['$type'] + '('+ def +')');
                } else arr.push(_type['$type']);
            }
            if (this['kind'] === '_OPT_' || this['kind'] === '_REQ_' || this['kind'] === '_SEQ_' || this['kind'] === '_EUM_' || this['kind'] === '_DEF_') {
                temp = this['$type'] +'('+ this['kind'] +')['+ arr.join(', ')+ ']';
            } else temp = this['$type'] +'('+ this['kind'] +')';
            
        } else {
            temp = this['$type'];
            if (this['default'] && this['default'] !== null) {
                if (this['$type'] === 'string') temp += '(\''+ this['default'] +'\')';
                else temp += '('+this['default']+')';
            }
        }
        return temp;
    };
    // special type
    if (typeof target === 'object'  && target !== null && target['$type']) {
        obj['$type'] = target['$type'];
        if (target['default']) obj['default'] = target['default'];
        if (target['kind']) obj['kind'] = target['kind'];
        if (target['ref']) obj['ref'] = target['ref'];
        if (target['list']) obj['list'] = target['list'];
        if (target['name']) obj['name'] = target['name'];
        if (target['func']) obj['func'] = target['func'];
        if (target['params']) obj['params'] = target['params'];
        if (target['return']) obj['return'] = target['return'];
        if (!_hasType(obj['$type'])) throw new ExtendError(/EL01304/, null, [obj['$type']]);
        if (obj['$type'] === 'array') {
            obj['kind'] = obj['kind'] || '_ALL_';
            if (!_hasKindArray(obj['kind'])) throw new ExtendError(/EL01305/, null, [obj['kind']]);
        }
        if (obj['$type'] === 'choice') {
            if (!_hasKindChoice(obj['kind'])) throw new ExtendError(/EL01306/, null, [obj['kind']]);
        }
        return obj;
    } else {
        obj['ref'] = target;
    }

    // step : operation
    if (target === null) {
        obj['$type'] = 'null';
    } else if (target === Number) {
        obj['$type'] = 'number';
        obj['default'] = null;            
    } else if (target === String) {
        obj['$type'] = 'string';
        obj['default'] = null;
    } else if (target === Boolean) {
        obj['$type'] = 'boolean';
        obj['default'] = null;
    } else if (target === Array) {
        obj['$type'] = 'array';
        obj['kind'] = '_ALL_';
        obj['list'] = [];
    } else if (target === Function) {
        obj['$type'] = 'function';
        obj['params'] = [];
    } else if (target === Object) {
        obj['$type'] = 'object';
    } else if (target === RegExp) {
        obj['$type'] = 'regexp';
        obj['default'] = null;
    } else if (target === Symbol) {      // ES6+
        obj['$type'] = 'symbol';
    } else if (target === BigInt) {      // ES6+
        obj['$type'] = 'bigint';
        obj['default'] = null;
    } else if (target instanceof RegExp) {
        obj['$type'] = 'regexp';
        obj['default'] = target;
    // step : typeof
    } else if (typeof target === 'undefined') {
        obj['$type'] = 'undefined';
    } else if (typeof target === 'number') {
        obj['$type'] = 'number';
        obj['default'] = target;
    } else if (typeof target === 'string') {
        obj['$type'] = 'string';
        obj['default'] = target;
    } else if (typeof target === 'boolean') {
        obj['$type'] = 'boolean';
        obj['default'] = target;
    } else if (typeof target === 'bigint') { // ES6+
        obj['$type'] = 'bigint';
        obj['default'] = target;
    } else if (typeof target === 'symbol') { // ES6+
        obj['$type'] = 'symbol';
    // step : function
    } else if (typeof target === 'function') {
        var kind = target['_KIND'];
        if (kind) {
            kind = kind.toLowerCase();
            if (kind === 'function') obj['$type'] = 'function';
            else obj['$type'] = 'class';    // class, interface, abstract
        } else obj['$type'] = _isUpper(target.name) ? 'class' : 'function';
            
        if (obj['$type'] === 'function') {
            try {
                var funcType  = target['_TYPE'] ? target['_TYPE'] : _parseFunc(target.toString());
                obj['params'] = funcType['params'];
                obj['return'] = funcType['return'];
            } catch (_err) {
                obj['params'] = [];
            }
        }
    // step : array
    } else if (Array.isArray(target)) {
        if (target.length ===  1 && Array.isArray(target[0])) {
            obj['$type'] = 'choice';
            if (target[0].length === 0) obj['kind'] = '_ANY_';
            else obj['kind'] = _getKeyCode(target[0][0]);
            obj['list'] = obj['kind'] ? target[0].slice(1) : target[0];
        } else {
            obj['$type'] = 'array';
            if (target.length === 0) obj['kind'] = '_ANY_';
            else obj['kind'] = _getKeyCode(target[0]);
            obj['list'] = obj['kind'] ? target.slice(1) : target;
        }
        if (!obj['kind']) obj['kind'] = '_OPT_';
        // kind 검사
        if (obj['$type'] === 'array' && !_hasKindArray(obj['kind'])) throw new ExtendError(/EL01307/, null, [obj['kind']]);
        if (obj['$type'] === 'choice' && !_hasKindChoice(obj['kind'])) throw new ExtendError(/EL01308/, null, [obj['kind']]);

    // step : object
    } else if (_isFillObj(target) || _isEmptyObj(target)) {
        obj['$type'] = 'union';
    
    // REVIEW:  기타 모든 함수는 object 로 처리한다. 더 좋은 방법이 있으면 대체 한다.
    } else {
    // } else if(_isPrimitiveObj(type)) {
        obj['$type'] = 'object';
    }
    // } else throw new ExtendError(/EL01309/, null, []);    // REVIEW: 커버리지 확인시 주석 처리
    return obj;
}
Type.extendType = extendType;

/**
 * 원본타입에 대상타입이 덮어쓰기가 허용 가능한지 검사합니다.  
 * 원본타입에 대상타입으로 캐스팅이 가능하지 확인합니다.
 * @param {any} extType 원본 타입
 * @param {any} tarType 대상 타입
 * @param {number} opt 허용옵션 : 0 = 기본, 1 = 타입생성 비교 
 * @param {string?} pathName '' 공백시 성공
 * @returns {throw?}
 */
function _execAllow(extType, tarType, opt, pathName) {
    var eType = extendType(extType);
    var tType = extendType(tarType);
    var prop = {};
    var sExt = eType.toString(), sTar = tType.toString();
    
    pathName = pathName ? pathName : 'extType';
    if (pathName !== 'extType' || !pathName) prop['error path'] = pathName;
    opt = opt || 0;

    // if (_isObject(eType['ref']) && _isObject(tType['ref']) && deepEqual(eType, tType)) return; // REVIEW: 필요없어  보이지만 잠시 남겨둠
    // origin seq, opt 필수 검사
    if (eType['kind']) {
        if ((eType['kind'] === '_SEQ_' || eType['kind'] === '_OPT_' || eType['kind'] === '_REQ_' || eType['kind'] === '_EUM_'|| eType['kind'] === '_DEF_') 
        && eType['list'].length === 0) {
            throw new ExtendError(/EL01201/, prop, ['extType', sExt]);
        }
    }
    // tarType seq, opt 필수 검사
    if (tType['kind']) {
        if ((tType['kind'] === '_SEQ_' || tType['kind'] === '_OPT_' || tType['kind'] === '_REQ_'  || tType['kind'] === '_EUM_'|| tType['kind'] === '_DEF_') 
        && tType['list'].length === 0) {
            throw new ExtendError(/EL01201/, prop, ['tarType', sTar]);
        }
    }
    //  원본은 초이스가 아니고, tarType choice 의 인 경우
    if (eType['$type'] !== 'choice' && tType['$type'] === 'choice' ) {
        var choType = { $type: 'choice', kind: '_REQ_', list: [extType] };
        _execAllow(choType, tarType, opt, pathName);
        return;
    }
    // check allow type
    if (_isLeafType(eType['$type'])) {
        if(typeof eType['default'] !== 'undefined' && eType['default'] !== null && !_equalLiternal(eType['default'], tType['default'])) {
            throw new ExtendError(/EL01202/, prop, [eType['$type'], eType, tType]);
        }
        if (eType['$type'] !== tType['$type']) throw new ExtendError(/EL01203/, prop, [eType['$type'], tType['$type']]);
    
    } else if (eType['$type'] === 'array')  $arrayAllow();
    else if (eType['$type'] === 'choice') $choiceAllow();
    else if (eType['$type'] === 'class') $classAllow();
    else if (eType['$type'] === 'union') $unionAllow();
    else if (eType['$type'] === 'function') $functionAllow();
    else throw new ExtendError(/EL01204/, prop, []);

    // inner function
    function $arrayAllow() {
        if (tType['$type'] !== 'array' || !Array.isArray(tType['list'])) throw new ExtendError(/EL01211/, prop, [tType['$type']]);
        
        // _ALL_ (all)
        if (eType['kind'] === '_ALL_') {
            return;

        // _ANY_ (any)
        } else if (eType['kind'] === '_ANY_') {
            if (tType['kind'] === '_ANY_') return;
            if (tType['kind'] === '_ALL_' || tType['kind'] === '_OPT_') {
                throw new ExtendError(/EL01212/, prop, [sTar]);
            }
            return;

        // _SEQ_ (sequence)
        } else if (eType['kind'] === '_SEQ_') {
            if (eType['kind'] !== tType['kind'])  throw new ExtendError(/EL01213/, prop, [tType]);
            if (eType['list'].length > tType['list'].length) {
                throw new ExtendError(/EL01214/, prop, [eType.list.length, tType.list.length]);
            }

            // element check
            for (var i = 0; i < eType['list'].length; i++) {
                try {
                    _execAllow(eType['list'][i], tType['list'][i], opt, pathName);
                } catch (error) {
                    throw new ExtendError(/EL01215/, error, [i]);
                }
            }
            return;
        
        // _REQ_ (require)
        } else if (eType['kind'] == '_REQ_') {
            if (tType['kind'] === '_ALL_' || tType['kind'] === '_ANY_' || tType['kind'] === '_OPT_') {
                throw new ExtendError(/EL01216/, prop, [eType['$type'], sTar]);
            }

        // _OPT_ (option)
        } else if (eType['kind'] === '_OPT_') {
            if (tType['kind'] === '_ALL_' || tType['kind'] === '_ANY_' ) {
                throw new ExtendError(/EL01217/, prop, [eType['$type'], sTar]);
            }
        
        // _ETC_
        } else {
            throw new ExtendError(/EL01218/, prop, [eType['kind']]);
        }

        // element check
        for (var k = 0; k < tType['list'].length; k++) {
            var success = false;
            for (var j = 0; j < eType['list'].length; j++) {
                try {
                    if (success) break;
                    if (extendType(tType['list'][k])['$type'] === 'choice' && extendType(eType['list'][j])['$type'] !== 'choice' ) {
                        var oriChoice = { $type: 'choice', kind: '_OPT_', list: eType['list'] };
                        _execAllow(oriChoice, tType['list'][k], opt, pathName);
                    } else {
                        _execAllow(eType['list'][j], tType['list'][k], opt, pathName);
                    }
                    success = true;
                } catch (error) {
                    continue;
                }
            }
            if (!success) throw new ExtendError(/EL01219/, prop, [eType, tType]);
        }
    }

    function $choiceAllow() {
        // _ALL_ (all)
        if (eType['kind'] === '_ALL_') {
            if (tType['$type'] === tType['$type'] && tType['kind'] === '_ERR_') {
                throw new ExtendError(/EL01221/, prop, [eType['$type'], sTar]);
            }
            return;

        // _ANY_ (any)
        } else if (eType['kind'] === '_ANY_') {
            if (tType['$type'] === 'undefined') throw new ExtendError(/EL01222/, prop, ['_ANY_', 'undefined']);
            if (eType['$type'] === tType['$type'] && (tType['kind'] === '_ALL_' || tType['kind'] === '_OPT_' || tType['kind'] === '_ERR_' || tType['kind'] === '_NON_')) {
                throw new ExtendError(/EL01223/, prop, [sTar]);
            }
            return;
        
        // _NON_ 
        } else if  (eType['kind'] === '_NON_') {
            if (eType['$type'] !== tType['$type'] || eType['kind'] !== tType['kind']) {
                // 4
                throw new ExtendError(/EL01224/, prop, [sTar]);
            }
            return;

        // _ERR_ (error)
        } else if (eType['kind'] === '_ERR_') {
            if (eType['$type'] !== tType['$type'] || eType['kind'] !== tType['kind']) {
                // 5
                throw new ExtendError(/EL01225/, prop, [sTar]);
            }
            return;

        // _REQ_ (require)
        } else if (eType['kind'] === '_REQ_') {
            if (eType['$type'] === tType['$type'] && (tType['kind'] === '_ALL_' || tType['kind'] === '_ANY_' 
            || tType['kind'] === '_OPT_' || tType['kind'] === '_NON_' || tType['kind'] === '_ERR_')) {
                // 6
                throw new ExtendError(/EL01226/, prop, [sTar]);
            }

        // _OPT_ (option)
        } else if (eType['kind'] === '_OPT_') {
            if (tType['$type'] === 'undefined') return;
            if (eType['$type'] === tType['$type'] && (tType['kind'] === '_ALL_' || tType['kind'] === '_ANY_' 
            || tType['kind'] === '_NON_' || tType['kind'] === '_ERR_')) {
                // 7
                throw new ExtendError(/EL01227/, prop, [sTar]);
            }
        
            // _EUN_ (enumeration)
        } else if (eType['kind'] === '_EUM_') {
            if (eType['$type'] !== tType['$type'] || eType['kind'] !== tType['kind']) {
                throw new ExtendError(/EL01228/, prop, []);
            }
            for (var i = 0; i < eType['list'].length; i++) {
                if (!_isLiteral(eType['list'][i])) throw new ExtendError(/EL01229/, prop, [i, extendType(eType['list'][i])]);
            }
            for (var j = 0; j < tType['list'].length; j++) {
                if (!_isLiteral(tType['list'][j])) throw new ExtendError(/EL0122A/, prop, [j, extendType(tType['list'][j])]);
            }

        // _DEF_ (default)
        } else if (eType['kind'] === '_DEF_') {
            if (eType['$type'] !== tType['$type'] || eType['kind'] !== tType['kind']) {
                throw new ExtendError(/EL0122B/, prop, []);
            }
            if (!_isLiteral(eType['list'][0])) throw new ExtendError(/EL0122C/, prop, [extendType(eType['list'][0])]);
            if (!_isLiteral(tType['list'][0])) throw new ExtendError(/EL0122D/, prop,  [extendType(tType['list'][0])]);

        // _ETC_
        } else {
            throw new ExtendError(/EL0122E/, prop, [eType['kind']]);
        }

        // element check
        var arrTarget = (tType['kind']) ? tType['list'] : [tarType];
        for (var m = 0; m < arrTarget.length; m++) {
            var success = false;
            for (var n = 0; n < eType['list'].length; n++) {
                try {
                    if (success) continue;
                    _execAllow(eType['list'][n], arrTarget[m], opt, pathName);
                    success = true;
                } catch (error) {
                    continue;
                }
            }
            if (!success) throw new ExtendError(/EL0122F/, prop, [m, eType, extendType(arrTarget[m])['$type']]);
        }
    }
    
    function $classAllow() {
        var oriObj;
        var tarObj;
        if (tType['$type'] === 'class') {         // # class to class
            if (isProtoChain(tType['ref'], eType['ref'])) return;   // 1.proto check
            if (opt === 1) {
                try {
                    // 생성비교
                    oriObj = new eType['ref']();
                    tarObj = new tType['ref']();
                    return _execAllow(oriObj, tarObj, opt, pathName);
                } catch (error) {
                    throw new ExtendError(/EL01231/, error, []);
                }                    
            }
            throw new ExtendError(/EL01232/, prop, [opt]);

        } else if (tType['$type'] === 'union') {  // # class to union
            if (opt === 1) {
                try {
                    // 생성비교
                    oriObj = new eType['ref']();
                    return _execAllow(oriObj, tType['ref'], opt, pathName);
                } catch (error) {
                    throw new ExtendError(/EL01233/, error, []);
                }                    
            }
            throw new ExtendError(/EL01234/, prop, [opt]);

        }
        throw new ExtendError(/EL01235/, prop, [tType]);
    }

    function $unionAllow() {
        var list;

        if (tType['$type'] !== 'union') throw new ExtendError(/EL01241/, prop, [tType]);
        list = getAllProperties(eType['ref']);

        for (var i = 0; i < list.length; i++) {
            var key = list[i];
            if (!(key in tType['ref'])) throw new ExtendError(/EL01242/, prop, [key, typeOf(extType[key])]);      
            try {
                _execAllow(eType['ref'][key], tType['ref'][key], opt, pathName);
            } catch (error) {
                throw new ExtendError(/EL01243/, error, [key]);
            }
        }
    }

    function $functionAllow() {
        if (tType['$type'] !== 'function')  throw new ExtendError(/EL01251/, prop, [tType]);
        if (eType['ref'] === Function) return;
        // special type check
        if (eType['name']) {
            if (eType['name'] === tarType.name  
            || eType['name'] === tType['name'] 
            || (tType['func'] && eType['name'] === tType['func'].name)) return;
            throw new ExtendError(/EL01252/, prop, [eType['name'], tType.name]);
        }
        if (eType['func']) {
            if (typeof tType['func'] !== 'function') throw new ExtendError(/EL01253/, prop, []);
            if (isProtoChain(tType['func'], eType['func'])) return;
            throw new ExtendError(/EL01254/, prop, []);
        }

        if (!eType['return'] && (!eType['params'] || eType['params'].length === 0)) return;
        if (typeof tType['params'] === 'undefined' && typeof tType['return'] === 'undefined') { 
            throw new ExtendError(/EL01255/, prop, [extendType(eType.params), typeOf(eType.return)]);
        }
        if (Array.isArray(eType['params']) && eType['params'].length > 0) {  
            try {   // params check
                _execAllow(['_SEQ_'].concat(eType['params']), ['_SEQ_'].concat(tType['params']), opt, pathName);
            } catch (error) {
                throw new ExtendError(/EL01256/, error, []);
            }
        }
        if (eType['return']) {            
            try {   // return check
                _execAllow(eType['return'], tType['return'], opt, pathName);
            } catch (error) {
                throw new ExtendError(/EL01257/, error, []);
            }
        }
    }
}
/**
 * 타입을 검사하여 메세지를 리턴
 * @param {any} extType 검사할 타입 , extType 
 * @param {any} target 검사대상
 * @param {number} [opt] 허용옵션 : 0 = 기본, 1 = 타입생성 비교 
 * @param {string} [pathName] '' 공백시 성공
 * @throws {ExtendError}
 */
function _execMatch(extType, target, opt, pathName) {
    var eType = extendType(extType);
    var tType = extendType(target);
    var prop = {};
    var sExt = eType.toString(), sTar = tType.toString();
    
    pathName = pathName ? pathName : 'extType';
    if (pathName !== 'extType') prop['error path'] = pathName;    // TODO: 'target' 명칭의 중복 수정필요
    opt = opt || 0;

    // seq, opt 필수 검사
    if (eType['kind']) {
        if ((eType['kind'] === '_SEQ_' || eType['kind'] === '_OPT_' || eType['kind'] === '_REQ_' || eType['kind'] === '_EUM_'|| eType['kind'] === '_DEF_') 
        && (typeof eType['ref'] === 'undefined' || eType['list'].length === 0)) {
            throw new ExtendError(/EL01101/, prop, ['extType', sExt]);
        }
    }

    // check match type
    if (eType['$type'] === 'null') {
        if (target !== null) throw new ExtendError(/EL01102/, prop, ['null', sTar]);
    
    } else if (eType['$type'] === 'undefined') {
        if (typeof target !== 'undefined') throw new ExtendError(/EL01102/, prop, ['undefined', sTar]);
    
    } else if (eType['$type'] === 'string') {
        if (typeof eType['default'] === 'string' && typeof target === 'undefined') target = eType['default'];
        if (typeof target !== 'string') throw new ExtendError(/EL01102/, prop, ['string', sTar]);
    
    } else if (eType['$type'] === 'number') {
        if (typeof eType['default'] === 'number' && typeof target === 'undefined') target = eType['default']; 
        if (typeof target !== 'number') throw new ExtendError(/EL01102/, prop, ['number', sTar]);
    
    } else if (eType['$type'] === 'boolean') {
        if (typeof eType['default'] === 'boolean' && typeof target === 'undefined') target = eType['default'];
        if (typeof target !== 'boolean') throw new ExtendError(/EL01102/, prop, ['boolean', sTar]);
    
    } else if (eType['$type'] === 'bigint') {    // ES6+
        if (typeof eType['default'] === 'bigint' && typeof target === 'undefined') target = eType['default'];
        if (typeof target !== 'bigint') throw new ExtendError(/EL01102/, prop, ['bigint', sTar]);
    
    } else if(eType['$type'] === 'symbol') {    // ES6+
        if (typeof target !== 'symbol') throw new ExtendError(/EL01102/, prop, ['symbol', sTar]);
    
    } else if (eType['$type'] === 'regexp') {
        if (eType['default'] && eType['default'] !== null && typeof target === 'undefined') target = eType['default'];
        if (!(target instanceof RegExp)) throw new ExtendError(/EL01102/, prop, ['regexp', sTar]);
    
    } else if (eType['$type'] === 'object') {
        if (tType['$type'] !== 'object') throw new ExtendError(/EL01102/, prop, ['object', sTar]);

    } else if (eType['$type'] === 'array') $arrayMatch();
    else if (eType['$type'] === 'choice') $choiceMatch();
    else if (eType['$type'] === 'class') $classMatch();
    else if (eType['$type'] === 'union') $unionMatch();
    else if (eType['$type'] === 'function') $functionMatch();        
    else throw new ExtendError(/EL01103/, prop, []);

    // inner function
    function $arrayMatch() {
        if (!Array.isArray(target)) throw new ExtendError(/EL01111/, prop, [sTar]);
        
        // _ALL_ (all)
        if (eType['kind'] === '_ALL_') {      
            return;

        // _ANY_ (any)
        } else if (eType['kind'] === '_ANY_') {
            if (target.length === 0) throw new ExtendError(/EL01112/, prop, [target.length]);
            return;

        // _SEQ_ (sequence)
        } else if (eType['kind'] === '_SEQ_') {
            if (eType['list'].length > target.length) throw new ExtendError(/EL01113/, prop, [eType['list'].length, tType['list'].length]);    // REVIEW: 세부정보 표현
            for(var i = 0; i < eType['list'].length; i++) {
                var _elem   = eType['list'][i];
                var _tar    = tType['list'][i];
                if (_isLiteral(_elem)) {
                    if (!_equalLiternal(_elem, _tar)) throw new ExtendError(/EL01114/, prop, [i, _elem, _tar]);
                } else {
                    try {
                        _execMatch(_elem, _tar, opt, pathName);
                    } catch (error) {
                        throw new ExtendError(/EL01115/, error, [i, typeOf(_elem)]);
                    }
                }
            }
            return;

        // _REQ_ (require)
        } else if (eType['kind'] === '_REQ_') {
            if (target.length === 0) throw new ExtendError(/EL01116/,  prop, [target.length]);

        // _OPT_ (option)
        } else if (eType['kind'] === '_OPT_') {
            if (Array.isArray(target) && target.length === 0) return;

        // _ETC_
        } else {
            throw new ExtendError(/EL01117/,  prop, [eType['kind']]);
        }
        

        // element check
        for (var k = 0; k < target.length; k++) {
            var tar = target[k];
            var success = false;
            for (var j = 0; j < eType['list'].length; j++) {
                try {
                    var elem = eType['list'][j];
                    if (_isLiteral(elem)) {
                        if (_equalLiternal(elem, tar)) {
                            success = true;
                            break;
                        }
                    } else {
                        _execMatch(elem, tar, opt, pathName);    // REVIEW: pathName + '['+i+']'  이렇게 들어가야 함
                        success = true;
                        break;
                    }
                } catch (error) {
                    continue;
                }
            }
            if (!success) {
                throw new ExtendError(/EL01118/, prop, [eType.toString(), tType.toString()]);
            }
        }
    }

    function $choiceMatch() {
        // _ALL_ (all)
        if (eType['kind'] === '_ALL_') {
            return;

        // _ANY_ (any)
        } else if (eType['kind'] === '_ANY_') {
            if (typeof target !== 'undefined') return;
            throw new ExtendError(/EL01121/, prop, []);

        // _NON_ (none)
        } else if (eType['kind'] === '_NON_') {
            if (typeof target === 'undefined') return;
            throw new ExtendError(/EL01122/, []);
            
        // _ERR_ (error)
        } else if (eType['kind'] === '_ERR_') {
            if (target instanceof Error) return;
            throw new ExtendError(/EL01123/, []);

        // _REQ_ (require)
        } else if (eType['kind'] === '_REQ_') ; else if (eType['kind'] === '_OPT_') {
            if (typeof target === 'undefined') return;

        // _EUN_ (enumeration)
        } else if (eType['kind'] === '_EUM_') {
            for (var i = 0; i < eType['list'].length; i++) {
                if (!_isLiteral(eType['list'][i])) throw new ExtendError(/EL01124/, prop, [i, typeOf(eType['list'][i])]);
            }

        // _DEF_ (default)
        } else if (eType['kind'] === '_DEF_') {
            if (!_isLiteral(eType['list'][0])) throw new ExtendError(/EL01125/, prop, [typeOf(eType['list'][0])]);
            if (typeof target === 'undefined') {
                target = eType['list'][0];
                return;
            }
        
        // _IDX_ (index)
        // } else if (eType['kind'] === '_IDX_') {
            /**
             * POINT:
             * - 검사
             *  + target object 검사
             *  -\+ 파라메터 2개 검사
             * 
             * - 인덱스 타입 목록 추출
             * 
             * - 초이스로 변환
             *  + 허용타입들 + 
             * 
             * this.command = [['_AND_',  { aa: 1 }, ClassA ]]
             * [['_IDX_', String]]
             * [['_KEY_', Number, String, '리터럴']]
             * 
             * this.command = [['_AND_', [['_IDX_', String]], [['_KEY_', Number, String, '리터럴']] ]]
             * 
             * 마지막에 리턴 및 실패 처리
             */

            /**
             * - 검사
             *  + 타겟의 object 여부 검사
             *  + 파라메터 1개 이상 검사
             * - 조건문 처리
             *  + 둘다 성공해야 성공
             */
            // POINT: 개발 해야함
            // if (eType['list'].length === 0) throw new ExtendError('TODO: IDX 는 검사 타입이 없습니다. 하나이상 있어야 합니다.', prop, []);
            // if (tType['$type'] !== 'union') throw new ExtendError('TODO: IDX 는 검사 대상이 object(union) 타입만 가능합니다.', prop, ['object', sTar]);

            // for(var i = 0; i < eType['list'].length; i++) {
            //     var _elem   = eType['list'][i];
                
            //     // var _tar    = tType['list'][i];
            //     try {
            //         _execMatch(_elem, target);
            //     } catch (error) {
            //         throw new ExtendError('TODO: ', error, []);
            //     }
                
            // }
        
        // _ETC_
        } else {
            throw new ExtendError(/EL01126/,  prop, [eType['kind']]);
        }

        // element check
        for (var j = 0; j < eType['list'].length; j++) {
            try {
                var elem = eType['list'][j];
                if (_isLiteral(elem)) {
                    if (_equalLiternal(elem, target)) return;
                } else {
                    return _execMatch(elem, target, opt, pathName);
                }
            } catch (error) {
                continue;
            }
        }
        throw new ExtendError(/EL01127/, prop,[eType, tType]);
    }

    function $classMatch() {
        if (tType['$type'] === 'class') {         // # class to class
            if (typeof eType['ref'] === 'undefined') return;  // 전역 클래스 타입
            if (isProtoChain(tType['ref'], eType['ref'])) return;
        } else if (typeof target === 'object') {    // # class to typeof 'object'
            if (target instanceof extType) return;     
            if (!_isBuiltFunction(extType) && target !== null && opt === 1) {
                try {
                    var subPath = pathName === 'extType' ? '<instance>' : pathName + '<instance>';
                    return _execMatch(_creator(extType), target, opt, subPath);
                } catch (error) {
                    throw new ExtendError(/EL01131/, error);
                }
            }
            throw new ExtendError(/EL01132/, prop, [_typeName(extType)]);
        }
        throw new ExtendError(/EL01133/, prop, [tType]);                
    }

    function $unionMatch() {
        var list;
        
        if (tType['$type'] !== 'union') throw new ExtendError(/EL01141/, prop, [tType]);
        list = getAllProperties(eType.ref);

        for (var i = 0; i < list.length; i++) {
            var key = list[i];
            var listDefType = extendType(extType[key]);
            // REVIEW: for 위쪽으로 이동 검토!
            if ('_interface' === key || 'isImplementOf' === key ) continue;             // 예약어
            // REVIEW: 재귀로 구현 체크
            if (typeof listDefType['default'] !== 'undefined' && listDefType['default'] !== null && typeof target[key] === 'undefined')      // default 설정
            target[key] = listDefType['default'];
            // POINT:
            // if (target !== null && !(key in target)) throw new ExtendError(/EL01142/, prop, [key, typeOf(extType[key])]);    
            try {
                var subPath = pathName +'[\''+ key+'\']';
                _execMatch(extType[key], target[key], opt, subPath);
            } catch (error) {
                throw new ExtendError(/EL01143/, error, [key]);
            }
        }
    }

    function $functionMatch() {
        if (tType['$type'] !== 'function') throw new ExtendError(/EL01151/, prop, [tType]);
        if (eType['ref'] === Function) return;
        // special type check
        if (eType['name']) {
            if (eType['name'] === target.name 
            || eType['name'] === tType['name'] 
            || (tType['func'] && eType['name'] === tType['func'].name)) return;
            throw new ExtendError(/EL01152/, prop, [eType['name'], target.name]);
        }
        if (eType['func']) {
            if (typeof tType['func'] !== 'function') throw new ExtendError(/EL01153/, prop, []);
            if (isProtoChain(tType['func'], eType['func'])) return;
            throw new ExtendError(/EL01154/, prop, []);
        }

        if (!eType['return'] && (!eType['params'] || eType['params'].length === 0)) return;
        if (typeof tType['params'] === 'undefined' && typeof tType['return'] === 'undefined') { 
            throw new ExtendError(/EL01155/, prop, [extendType(eType.params), typeOf(eType.return)]);
        }
        // params check
        if (Array.isArray(eType['params']) && eType['params'].length > 0) {  
            try {
                _execAllow(['_SEQ_'].concat(eType['params']), ['_SEQ_'].concat(tType['params']), opt, pathName);
            } catch (error) {
                throw new ExtendError(/EL01156/, error, []);
            }
        }
        // return check
        if (eType['return']) {            
            try {
                _execAllow(eType['return'], tType['return'], opt, pathName);
            } catch (error) {
                throw new ExtendError(/EL01157/, prop, []);
            }
        }
    }
}
/**
 * Verify that the extension type allows the target type.  
 * 
 * @param {any} extType Extension Type
 * @param {any} tarType What type to check
 * @param {number} [opt=0] Allow option (0 = Keep existing, 1 = Create class type)
 * @returns {throw?} Exception occurs if extension type does not allow target type
 */
function allowType(extType, tarType, opt) {
    try {
        _execAllow(extType, tarType, opt);
    } catch (error) {
        throw new ExtendError(/EL0130A/, error);
    }
}Type.allowType = allowType;

/**
 * Verify that the extension type matches the target.  
 * 
 * @param {any} extType Extension Type
 * @param {any} target For inspection
 * @param {number} [opt=0] Allow option (0 = Keep existing, 1 = Create class type)
 * @returns {throw?} Exception occurs when failing
 */
function matchType(extType, target, opt) {
    try {
        _execMatch(extType, target, opt);
    } catch (error) {
        throw new ExtendError(/EL0130B/, error);
    }
}Type.matchType = matchType;

/**
 * Determine whether the extension type allows the target type.  
 * 
 * @param {any} extType Extension Type
 * @param {any} target Type to be examined
 * @param {number} opt Allow option (0 = Keep existing, 1 = Create class type)
 * @returns {boolean} whether to allow ('true' or 'false')
 */
function isAllowType(extType, target, opt) {
    try {
        _execAllow(extType, target, opt);
    } catch (error) {
        return false;
    }
    return true;
}Type.isAllowType = isAllowType;

/**
 * Verify that the extension type matches the target.  
 * 
 * @param {any} extType Extension Type
 * @param {any} target Type to be examined
 * @param {number} [opt] Allow option (0 = Keep existing, 1 = Create class type)
 * @returns {boolean} Match or not ('true' or 'false')
 */
function isMatchType(extType, target, opt) {
    try {
        _execMatch(extType, target, opt);
        return true;
    } catch (error) {
        return false;
    }
}Type.isMatchType = isMatchType;

/**** util.js | Util ****/
//==============================================================
// 1. import module

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
if (!Type) throw new Error(Message.get('ES011', ['Type', 'type']));

//==============================================================
// 3. module implementation   
var _global = globalThis;

var OLD_ENV = _global.OLD_ENV ? _global.OLD_ENV : false;    // 커버리지 테스트 역활

/**
 * This is a utility module.
 */
var Util = {};


// local function
function _isObject(obj) {
    return obj != null && typeof obj === 'object';
}

// polyfill
if (!Array.isArray || OLD_ENV) {
    Array.isArray = function(p_obj) {
        return Object.prototype.toString.call(p_obj) === '[object Array]';
    };
}
// REVIEW: 제거해둠, 대부분은 keys 는 기본으로 정의되어 있음
// if (!Object.keys) {
//     Object.keys = (function () {
//         var hasOwnProperty = Object.prototype.hasOwnProperty;
//         var hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString');
//         var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
//         var dontEnumsLength = dontEnums.length;
//         return function (obj) {
//             if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new Error('Object.keys called on non-object');
//             var result = [];
//             for (var prop in obj) if (hasOwnProperty.call(obj, prop)) result.push(prop);
//             if (hasDontEnumBug) {
//               for (var i=0; i < dontEnumsLength; i++) {
//                 if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
//               }
//             }
//             return result;
//         }
//     })()
// };

/**
 * Returns the nested depth of the array.  
 * REVIEW: 필요성 검토 필요!
 * 
 * @param {array} p_elem Array elements
 * @param {number} p_depts Current depth (default: 0)
 * @returns {number} Maximum nested depth of array
 */
Util.getArrayDepth = function getArrayDepth(p_elem, p_depts) {
    var MAX     = 10;
    var level   = 0;
    
    p_depts = p_depts || 0;
    if (p_elem instanceof Array && MAX > p_depts) {
        level++;
        p_depts++;
        level = level + getArrayDepth(p_elem[0], p_depts);
    }
    return level;
};

/**
 * Creates a 36-digit GUID.  
 * 
 * @returns {string} GUID string generated
 */
Util.createGuid = function createGuid() {
    function _p8(s) {  
        var p = (Math.random().toString(16)+'000000000').substring(2,10);  
        return s ? '-' + p.substring(0, 4) + '-' + p.substring(4, 8) : p ;  
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
};

/**
 * Deep copy of the object (except prototype)  
 * 
 * @param {object} p_target Destination object to copy
 * @returns {object} copied object
 */
Util.deepCopy = function deepCopy(p_target) {
    var nobj;

    if (!_isObject(p_target)) {
        return p_target;
    }
    if (p_target instanceof RegExp) return p_target;

    // 객체인지 배열인지 판단
    nobj = Array.isArray(p_target) ? [] : {};
    
    if (Array.isArray(p_target)) {
        for (var i = 0; i < p_target.length; i++) {
            nobj[i] = deepCopy(p_target[i]);
        }
    } else {
        for (var key in p_target) {
            if (Object.prototype.hasOwnProperty.call(p_target, key)) {
                nobj[key] = deepCopy(p_target[key]);
            }
        }
    }
    return nobj;
};    

/**
 * Sets the specified creator to inherit the parent creator.   
 * 
 * @function
 * @param {function | object} ctor generator function or object
 * @param {function | object} superCtor Parent generator function or object
 */
Util.inherits = (function () {
    if (typeof Object.create === 'function' && !OLD_ENV) {
        // implementation from standard node.js 'Util' module
        return function(ctor, superCtor) {
            if (superCtor) {
                ctor.super = superCtor;
                ctor.prototype = Object.create(superCtor.prototype, {
                    constructor: {
                        value: ctor,
                        writable: true,
                        configurable: true,
                        enumerable: false,
                    }
                });
            }
        };
    } else {
        // old school shim for old browsers
        return function (ctor, superCtor) {
            if (superCtor) {
                ctor.super = superCtor;
                var TempCtor = function () {};
                TempCtor.prototype = superCtor.prototype;
                ctor.prototype = new TempCtor();
                ctor.prototype.constructor = ctor;
            }
        }
    }
}());

/**
 * Verify that the object implements the specified interface.  
 * Verify that the 'obj' object created with 'ctor' implements the interface provided by 'interfaces'.  
 * If 'ctor._KIND' is 'Interface', use 'allowType()' to confirm.  
 * Otherwise, use 'matchType()' to confirm.  
 * 
 * @name implements
 * @function
 * @param {function} p_ctor Generator to be examined
 * @param {object} p_obj object to be examined
 * @param {function?} args List of interfaces to check
 */
Util.implements = function(p_ctor, p_obj) {
    var _interface = [];
    var addCnt = 0;

    if (typeof p_ctor !== 'function') throw new ExtendError(/EL01401/, null, [typeof p_ctor]);
    if (!_isObject(p_obj)) throw new ExtendError(/EL01402/, null, [typeof p_obj]);

    if (typeof p_obj._interface === 'undefined') {
        Object.defineProperty(p_obj, '_interface', {
            get: function() { 
                return _interface;
            },
            configurable: false,
            enumerable: false,
        });
    }    

    if (!p_ctor['_UNION']) p_ctor['_UNION'] = [];
    
    for(var i = 2; i < arguments.length; i++) {
        if (typeof arguments[i] === 'function') {
            if (p_obj._interface.indexOf(arguments[i]) < 0) { // 중복 검사 
                p_obj._interface.push(arguments[i]);
                addCnt++;
            }
        } else throw new ExtendError(/EL01403/, null, [i - 2, typeof arguments[i]]);
    } 

    for (var j = 0; j < p_ctor['_UNION'].length; j++) {
        if (p_obj._interface.indexOf(p_ctor['_UNION'][j]) < 0) {    // 인터페이스 중복 검사 후 등록
            p_obj._interface.push(p_ctor['_UNION'][j]);
            addCnt++;
        }
    }

    try {
        var beginIdx = p_obj._interface.length - addCnt;
        for (var k = beginIdx; k < p_obj._interface.length; k++) {
            if (p_ctor['_KIND'] === 'interface') {  // 인터페이스 타입과 분리
                Type.allowType(p_obj._interface[k], p_obj, 1);
            } else Type.matchType(p_obj._interface[k], p_obj, 1);
        }
    } catch (error) { 
        throw new ExtendError(/EL01404/, error, [$typeName(p_obj), $typeName(p_obj._interface[i]), p_ctor['_KIND'] || 'class']);
    }

    if (typeof p_obj.isImplementOf === 'undefined') {   // 내부 메소드 설정
        Object.defineProperty(p_obj, 'isImplementOf',
        {
            value: $isImplementOf,
            configurable: false,
            enumerable: false
        });
    }

    // inner function
    function $isImplementOf(target) {
        if (typeof target === 'function') {
            for (var i = 0; i < this._interface.length; i++) {
                if (this._interface[i] === target) return true;  
            }
        } else if (typeof target === 'string') {
            for (var j = 0; j < this._interface.length; j++) {
                if (this._interface[j].name === target) return true;  
            }
        } else throw new ExtendError(/EL01405/, null, [typeof target]);
        return false;
    }
    function $typeName(obj) {
        var proto;
        var constructor;
        if (typeof obj === 'function') {
            return obj.name;
        } else if (typeof obj === 'object') {
            proto = !OLD_ENV && Object.getPrototypeOf ? Object.getPrototypeOf(obj) : obj.__proto__ ;
            constructor = proto.constructor;
            return  constructor.name;
        } else return 'unknown name';
    }
};

/**** trans-queue.js | EventEmitter ****/
//==============================================================
// 1. import module

//==============================================================Á
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));

//==============================================================
// 3. module implementation  
var EventEmitter = (function () {
    /**
     * Creates an instance of the class 'EventEmitter'.
     * @constructs EventEmitter
     */
    function EventEmitter() {
        
        var $storage = {};
        var isLog = false;

        /**
         * Internal object that stores registered events.  
         * 
         * @private
         * @member {object}  EventEmitter#$subscribers  
         */
        Object.defineProperty(this, '$storage',
        {
            get: function() { return $storage; },
            set: function(nVal) { 
                if (!_isObject(nVal)) throw new ExtendError(/EL01501/, null, [this.constructor.name, nVal]);
                $storage = nVal;
            },
            configurable: false,
            enumerable: false
        });

        /**
         * Array that stores registered event names.  
         * 
         * @protected
         * @member {object}  EventEmitter#_list  
         */
        Object.defineProperty(this, '_list',
            {
                get: function() { 
                    return Object.keys(this.$storage);
                },
                configurable: false,
                enumerable: false
            });

        /**
         * Array that stores registered event names.
         * 
         * @member {boolean}  EventEmitter#isLog  
         */
        Object.defineProperty(this, 'isLog', 
        {
            get: function() { return isLog; },
            set: function(nVal) {
                if (typeof nVal !== 'boolean') throw new ExtendError(/EL01502/, null, [this.constructor.name, nVal]);
                isLog = nVal;
            }
        });
    }
    EventEmitter._NS = 'Common';    // namespace

    // local function
    function _isString(obj) {    // 공백 아닌 문자 여부
        if (typeof obj === 'string' && obj.length > 0) return true;
        return false;
    }
    function _isObject(obj) {    // 객체 여부
        if (typeof obj === 'object' && obj !== null) return true;
        return false;
    }

    /**
     * Adds a listener (function) for the event.  
     * 
     * @param {string} p_event Event Name
     * @param {function} p_listener Listener function
     */
    EventEmitter.prototype.on = function(p_event, p_listener) {
        if (!_isString(p_event)) throw new ExtendError(/EL01503/, null, [typeof p_event]);
        if (typeof p_listener !== 'function') throw new ExtendError(/EL01504/, null, [typeof p_listener]);
        
        if (typeof this.$storage[p_event] !== 'object') {
            this.$storage[p_event] = [];
        }
        if (this.$storage[p_event].indexOf(p_listener) === -1) {
            this.$storage[p_event].push(p_listener);
        }
        // this.$storage[p_event].push(p_listener);

    };
    /** Alias for method 'on(). */
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;
    
    /**
     * Adds a one-time function for the event.  
     * 
     * @param {string} p_event Event Name
     * @param {function} p_listener Listener function
     */
    EventEmitter.prototype.once = function(p_event, p_listener) {
        var self = this;

        if (!_isString(p_event)) throw new ExtendError(/EL01505/, null, [typeof p_event]);
        if (typeof p_listener !== 'function') throw new ExtendError(/EL01506/, null, [typeof p_listener]);

        function onceListener() {
            self.off(p_event, onceListener);
            p_listener.apply(self, arguments);
        }
        this.on(p_event, onceListener);
    };

    /**
     * Removes the listener (function) of the specified event.  
     * 
     * @param {string} p_event Event Name
     * @param {function} p_listener Listener function
     */
    EventEmitter.prototype.off = function(p_event, p_listener) {
        if (!_isString(p_event)) throw new ExtendError(/EL01507/, null, [typeof p_event]);
        if (typeof p_listener !== 'function') throw new ExtendError(/EL01508/, null, [typeof p_listener]);
        
        if (typeof this.$storage[p_event] === 'object') {
            var idx = this.$storage[p_event].indexOf(p_listener);
            if (idx > -1) {
                this.$storage[p_event].splice(idx, 1);
            }
        }
    };
    /** Alias of method 'off()'. */
    EventEmitter.prototype.removeListener = EventEmitter.prototype.off; // 별칭

    /**
     * Remove all events or all listeners registered for a particular event.  
     * @param {string} [p_event] Name of the event to be removed (Remove all events if omitted)
     */
    EventEmitter.prototype.removeAllListeners = function(p_event) {
        if (!p_event) {
            this.$storage = {};  // 초기화
        }
        if (typeof this.$storage[p_event] === 'object') {
            delete this.$storage[p_event];
        }
    };

    /**
     * Runs the listener (function) of the registered event.  
     * 
     * @param {string} p_event Event Name
     * @returns {boolean | undefined}  'true' listener execution successful, 'false' execution failed, 'undefined' listener no
     */
    EventEmitter.prototype.emit = function(p_event) {
        var args = [].slice.call(arguments, 1);
        var listeners = [];
        // var isListener = false;
        var isReturn;

        if (!_isString(p_event)) throw new ExtendError(/EL01509/, null, [typeof p_event]);

        if (typeof this.$storage[p_event] === 'object') {
            listeners = this.$storage[p_event].slice();
            for (var i = 0; i < listeners.length; i++) {
                isReturn = listeners[i].apply(this, args);
                if (isReturn === false) return false;
            }
        }
        if (this.isLog) console.log('['+p_event+'] 이벤트가 밸생하였습니다.');

        return listeners.length > 0 ? true : undefined;
    };

    return EventEmitter;
    
}());

/**** i-object.js | IObject ****/
//==============================================================
// 1. import module    

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

//==============================================================
// 3. module implementation   
var IObject  = (function () {
    /**
     * Object interface.  
     * 
     * @constructs IObject 
     * @interface
     */
    function IObject() {
    }
    
    IObject._NS = 'Interface';    // namespace
    IObject._KIND = 'interface';

    /**
     * Returns a list of types of objects.  
     * 
     * @returns {Function[]} Arrangement of types of objects
     * @abstract
     */
    IObject.prototype.getTypes  = function() {
        throw new ExtendError(/EL02111/, null, ['IObject']);
    };
    
    /**
     * Verify that the object is an instance of a particular class or interface.  
     * 
     * @returns {boolean} Instance or 'true' if it's an instance or 'false' if it's not
     * @abstract
     */
    IObject.prototype.instanceOf  = function() {
        throw new ExtendError(/EL02112/, null, ['IObject']);
    };

    /**
     * Compare that the object is the same as the given object.  
     * 
     * @returns {boolean} If two objects are the same, 'true', or 'false'
     * @abstract
     */
    IObject.prototype.equal  = function() {
        throw new ExtendError(/EL02113/, null, ['IObject']);
    };
    
    return IObject;
    
}());

/**** i-marshal.js | IMarshal ****/
//==============================================================
// 1. import module

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

//==============================================================
// 3. module implementation   
var IMarshal  = (function () {
    /**
     * Object control interface.  
     * 
     * @interface
     */
    function IMarshal() {

        /**
         * Internal property that stores the unique identifier of the object.  
         * 
         * @member {string} IMarshal#_guid
         */
        this._guid = String;

        /**
         * Internal property that stores the creator type of the object.  
         * 
         * @member {string} IMarshal#_type REVIEW:
         */
        this._type = [['_req_', Function, {$type: 'class'} ]];
    }

    IMarshal._NS = 'Interface';    // namespace
    IMarshal._KIND = 'interface';
    
    /**
     * Returns the object literal.  
     * 
     * @abstract
     */
    IMarshal.prototype.getObject = function() {
        throw new ExtendError(/EL02121/, null, ['IMarshal']);
    };

    /**
     * Set the object literal by converting it to an instance.  
     * 
     * @abstract
     */
    IMarshal.prototype.setObject  = function() {
        throw new ExtendError(/EL02122/, null, ['IMarshal']);
    };

    return IMarshal;
    
}());

/**** i-collection.js | ICollection ****/
//==============================================================
// 1. import module

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
// if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));

//==============================================================
// 3. module implementation
var ICollection  = (function () {
    /**
     * This is the collection interface.
     * @constructs ICollection
     * @interface
     */
    function ICollection() {
    }

    ICollection._KIND = 'interface';
    ICollection._NS = 'Interface';    // namespace

    /**
     * Add an element to the collection.  
     * 
     * @abstract
     */
    ICollection.prototype.add  = function() {
        throw new ExtendError(/EL02161/, null, ['ICollection']);
    };

    /**
     * Remove an element from the collection.  
     * 
     * @abstract
     */
    ICollection.prototype.remove  = function() {
        throw new ExtendError(/EL02162/, null, ['ICollection']);
    };

    /**
     * Verify that an element exists in the collection.  
     * 
     * @returns {boolean} If the element exists, it is 'true', otherwise it is 'false'
     * @abstract
     */
    ICollection.prototype.contains  = function() {
        throw new ExtendError(/EL02163/, null, ['ICollection']);
    };

    /**
     * Returns the index of an element in the collection.  
     * 
     * @returns {number}  index of element, '-1' without element
     * @abstract
     */
    ICollection.prototype.indexOf  = function() {
        throw new ExtendError(/EL02164/, null, ['ICollection']);
    };

    return ICollection;
    
}());

/**** i-collection-property.js | IPropertyCollection ****/
//==============================================================
// 1. import module

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
if (!ICollection) throw new Error(Message.get('ES011', ['ICollection', 'i-collection']));

//==============================================================
// 3. module implementation   
var IPropertyCollection  = (function (_super) {
    /**
     * This is the property collection interface.  
     * 
     * @constructs IPropertyCollection
     * @interface
     * @extends  ICollection
     */
    function IPropertyCollection() {
        _super.call(this);
    }
    Util.inherits(IPropertyCollection, _super);

    IPropertyCollection._KIND = 'interface';
    IPropertyCollection._NS = 'Interface';    // namespace

    /**
     * Returns the property key for the specified index.  
     * 
     * @returns {boolean} Property key for that index
     * @abstract
     */
    IPropertyCollection.prototype.indexToKey  = function() {
        throw new ExtendError(/EL02181/, null, ['IPropertyCollection']);
    };

    return IPropertyCollection;
    
}(ICollection));

/**** i-element.js | IElement ****/
//==============================================================
// 1. import module

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

//==============================================================
// 3. module implementation   
var IElement  = (function () {
    /**
     * Element (independent) interface.  
     * @constructs IElement
     * @interface
     */
    function IElement() {
        /**
         * Internal property that stores the name of the element.  
         * 
         * @member {string} IElement#_name
         */
        this._name = String;
    }

    IElement._NS = 'Interface';    // namespace
    IElement._KIND = 'interface';

    /**
     * Creates a copy of the current element.  
     * 
     * @returns {object} Replicated Elements
     * @abstract
     */
    IElement.prototype.clone  = function() {
        throw new ExtendError(/EL02131/, null, ['IElement']);
    };

    return IElement;
    
}());

/**** i-list.js | IList ****/
//==============================================================
// 1. import module

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

//==============================================================
// 3. module implementation   
var IList  = (function () {
    /**
     * List interface.  
     * 
     * @constructs IList
     * @interface
     */
    function IList() {

        /**
         * An internal array that stores the data in the list.  
         * 
         * @member {array} IList#_list
         */
        this._list = Array;
        
        /**
         * Returns the number of lists.  
         * 
         * @member {number} IList#count
         */
        this.count = Number;
    }

    IList._NS = 'Interface';    // namespace
    IList._KIND = 'interface';

    return IList;
    
}());

/**** i-control-list.js | IListControl ****/
//==============================================================
// 1. import module

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

//==============================================================
// 3. module implementation   
var IListControl  = (function () {
    /**
     * List control interface.  
     * 
     * @constructs IListControl
     * @interface
     */
    function IListControl() {
    }

    IListControl._NS = 'Interface';    // namespace
    IListControl._KIND = 'interface';
    
    /**
     * Add an element to the list.  
     * 
     * @abstract
     */
    IListControl.prototype.add = function() {
        throw new ExtendError(/EL02151/, null, ['IListControl']);
    };

    /**
     * Remove an element from the list.  
     * 
     * @abstract
     */
    IListControl.prototype.del  = function() {
        throw new ExtendError(/EL02152/, null, ['IListControl']);
    };

    /**
     * Verify that an element exists in the list.  
     * 
     * @returns {boolean} If the element exists, it is 'true', otherwise it is 'false'
     * @abstract
     */
    IListControl.prototype.has  = function() {
        throw new ExtendError(/EL02153/, null, ['IListControl']);
    };

    /**
     * Search for elements in the list.  
     * 
     * @abstract
     */
    IListControl.prototype.find  = function() {
        throw new ExtendError(/EL02154/, null, ['IListControl']);
    };

    return IListControl;
    
}());

/**** i-serialize.js | ISerialize ****/
//==============================================================
// 1. import module

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

//==============================================================
// 3. module implementation   
var ISerialize  = (function () {
    /**
     * Interface for serialization and deserialization.  
     * @constructs ISerialize
     * @interface
     */
    function ISerialize() {
    }

    ISerialize._NS = 'Interface';    // namespace
    ISerialize._KIND = 'interface';

    /**
     * Serialize objects, convert them into strings (such as JSON), and export them.  
     * 
     * @returns {string} Serialized String
     * @abstract
     */
    ISerialize.prototype.output  = function() {
        throw new ExtendError(/EL02191/, null, ['ISerialize']);
    };

    /**
     * Restore objects by loading serialized data.  
     * 
     * @abstract
     */
    ISerialize.prototype.load  = function() {
        throw new ExtendError(/EL02192/, null, ['ISerialize']);
    };

    return ISerialize;
    
}());

/**** i-collection-array.js | IArrayCollection ****/
//==============================================================
// 1. import module

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
if (!ICollection) throw new Error(Message.get('ES011', ['ICollection', 'i-collection']));

//==============================================================
// 3. module implementation   
var IArrayCollection  = (function (_super) {
    /**
     * Array collection interface.  
     * 
     * @extends ICollection
     */
    function IArrayCollection() {
        _super.call(this);
    }
    Util.inherits(IArrayCollection, _super);
    
    IArrayCollection._KIND = 'interface';
    IArrayCollection._NS = 'Interface';    // namespace

    /**
     * Adds an element to the specified location.  
     * 
     * @abstract
     */
    IArrayCollection.prototype.insertAt  = function() {
        throw new ExtendError(/EL02171/, null, ['IArrayCollection']);
    };

    return IArrayCollection;
    
}(ICollection));

/**** namespace-manager.js | NamespaceManager ****/
//==============================================================
// 1. import module

//==============================================================Á
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
if (!Type) throw new Error(Message.get('ES011', ['Type', 'type']));
if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
if (!IList) throw new Error(Message.get('ES011', ['IList', 'i-list']));
if (!IListControl) throw new Error(Message.get('ES011', ['IListControl', 'i-control-list']));
if (!ISerialize) throw new Error(Message.get('ES011', ['ISerialize', 'i-serialize']));

//==============================================================
// 3. module implementation   
var NamespaceManager = (function () {
    /**
     * Create a Namespace Manager.  
     * 
     * @constructs NamespaceManager
     */
    function NamespaceManager() {

        var $storage = this.$createNsRefer();
        var _elemTypes  = []; 
        var allowOverlap = false;
        
        
        /**
         * Namespace repository  
         * 
         * @member {string} NamespaceManager#$storage
         * @readonly
         * @private
         */
        Object.defineProperty(this, '$storage',
        {
            get: function() { return $storage; },
            set: function(nVal) { $storage = nVal; },
            configurable: false,
            enumerable: false,
        });

        /** 
         * Namespace element type list.  
         * Allow all types if empty.  
         * 
         * @member {array<any>}  NamespaceManager#_elemTypes  
         * @protected
         */
        Object.defineProperty(this, '_elemTypes', 
        {
            get: function() {
                return _elemTypes;
            },
            set: function(val) {
                var arrType = Array.isArray(val) ? val : Array.prototype.slice.call(arguments, 0);
                _elemTypes = arrType;
            },
            configurable: false,
            enumerable: true,
        });

        /**
         * Namespace element list.  
         * 
         * @member {array<string>}  NamespaceManager#_list
         * @readonly
         */
        Object.defineProperty(this, '_list', 
        {
            get: function() {
                var storage = this.$storage;
                var arr = [];
                var stack = [];
                findElement(storage);
                return arr;

                // inner function
                function findElement(target) { 
                    for (var prop in target) {
                        if (prop === '_type') continue;
                        var ns = target[prop];
                        stack.push(prop);
                        if (!ns['_type']) {
                            arr.push(stack.join('.'));
                        } else findElement(ns);
                        stack.pop();
                    }
                }
            },
            configurable: false,
            enumerable: true,
        });

        /**
         * Total number of Namespace elements.  
         * 
         * @member {number} NamespaceManager#count 
         * @readonly
         */
        Object.defineProperty(this, 'count', 
        {
            get: function() {
                return this._list.length;
            },
            configurable: false,
            enumerable: true,
        });

        /**
         * Set whether to allow duplicate element registration.  
         * Default is 'false' and does not allow duplication.  
         * 
         * @member {boolean} NamespaceManager#allowOverlap
         */
        Object.defineProperty(this, 'allowOverlap',
        {
            get: function() { return allowOverlap; },
            set: function(val) { 
                if (typeof val !== 'boolean') throw new ExtendError(/EL03311/, null, [typeof val]);
                allowOverlap = val;
            },
            configurable: false,
            enumerable: true
        });

        // inner variable access
        // this.__SET$storage = function(val, call) {
        //     if (call instanceof NamespaceManager) $storage = val;
        // }

        this._$KEYWORD = ['namespace', 'ns', 'NS', '_type'];    // 금지단어

        Util.implements(NamespaceManager, this);        // strip:
    }
    NamespaceManager._UNION = [IList, IListControl];
    NamespaceManager._NS = 'Meta';
    
    // local function
    function _isString(obj) {    // 공백아닌 문자 여부
        if (typeof obj === 'string' && obj.length > 0) return true;
        return false;
    }

    function _validNamespace(nsName) {  // 네임스페이스 이름 검사
        var regex = /^[_a-zA-Z]([.]?[_0-9a-zA-Z])*$/;
        return regex.test(nsName)
    }

    function _validName(sName) {   // 이름 검사
        var regex = /^[_a-zA-Z]([_0-9a-zA-Z])*$/;
        return regex.test(sName)
    }

    function _getArray(ns) {  // 네임스페이스 문자열 배열로 얻기
        var sections = [];
        if (ns === '') return sections;
        if (typeof ns === 'string') {
            if (!_validNamespace(ns)) throw new ExtendError(/EL03312/, null, [ns]);
            sections = ns.split('.');
        } else if (Array.isArray(ns)) {
            sections = ns;
        } else throw new ExtendError(/EL03313/, null, [typeof ns]);

        for (var i = 0; i < sections.length; i++) {
            var sName =sections[i];
            if (!_isString(sName)) throw new ExtendError(/EL03314/, null, [i, typeof sName]);
            if (!_validName(sName)) throw new ExtendError(/EL03315/, null, [i, sName]);
        }
        return sections;
    }
    
    /**
     * Creates a storage initialization object.  
     * 
     * @returns {object} initialized namespace type object { _type: 'ns'}
     * @private
     */
    NamespaceManager.prototype.$createNsRefer = function() {
        return { _type: 'ns' };
    };

    /**
     * Returns the Namespace path object.  
     * 
     * @param {string | object} p_elem Factors to obtain the path
     * @returns {object} Namespace path object {ns: '...', key: '...'}
     * @protected
     */
    NamespaceManager.prototype._getPathObject = function(p_elem) {
        var fullName;
        var arr;
        var key;
        var nsPath;
        var obj = {};

        if (_isString(p_elem)) fullName = p_elem;
        else fullName = this.getPath(p_elem);
        
        if (typeof fullName !== 'string') return;

        arr = fullName.split('.');
        key = arr.pop();
        nsPath = arr.join('.');
        obj['ns'] = nsPath;
        obj['key'] = key;
        return obj;
    };
    
    /**
     * Initialize the namespace.  
     */
    NamespaceManager.prototype.init = function() {
        this.$storage = this.$createNsRefer();
    };

    /**
     * Add a path to the Namespace.  
     * 
     * @param {string | array<string>} p_ns Namespace name, path in the form of a string or array separated by a dot ('.')
     */
    NamespaceManager.prototype.addNamespace = function(p_ns) {
        var parent = this.$storage;
        var sections;
    
        try {
            sections = _getArray(p_ns);

            if (this._$KEYWORD.indexOf(sections[0]) > -1) sections = sections.slice(1); // 최상위 에약어 제거
        
            for (var i = 0; i < sections.length; i+=1) {
                // var sName = sections[i];
                if (typeof parent[sections[i]] === 'undefined') {
                    parent[sections[i]] = this.$createNsRefer();
                }
                parent = parent[sections[i]];
            }

        } catch (error) {
            throw new ExtendError(/EL03321/, error, []);
        }
    };

    /**
     * Delete the path in the Namespace.  
     * 
     * @param {string | array<string>} p_ns Namespace name, path in the form of a string or array separated by a dot ('.')
     */
    NamespaceManager.prototype.delNamespace = function(p_ns) {
        var parent = this.$storage;
        var sections;
    
        try {
            sections = _getArray(p_ns);

            for (var i = 0; i < sections.length; i+=1) {
                var sName = sections[i];
                if (parent[sName] && parent[sName]['_type'] === 'ns') {
                    if (i === sections.length - 1) delete parent[sName];
                    else parent = parent[sName];
                } else return;
            }
        } catch (error) {
            throw new ExtendError(/EL03322/, error, []);
        }
    };

    /**
     * Returns the path object of the namespace.  
     * 
     * @param {string | sting[]} p_ns Namespace name, path in the form of a string or array separated by a dot ('.')
     * @returns {object} path object
     */
    NamespaceManager.prototype.path = function(p_ns) {
        var parent = this.$storage;
        var sections;

        if (!p_ns) return parent;
        
        try {
            sections = _getArray(p_ns);

            for (var i = 0; i < sections.length; i+=1) {
                var sName = sections[i];
                if (parent[sName] && parent[sName]['_type'] === 'ns') {
                    if (i === sections.length - 1) return parent[sName];    
                    parent = parent[sName];
                } else return;
            }
            
        } catch (error) {
            throw new ExtendError(/EL03323/, error, []);
        }
    };

    /**
     * Adds an element to the specified namespace path.  
     * 
     * @param {string} p_fullName Full path to the Namespace
     * @param {any} p_elem Functions, classes, or objects to be added
     */
    NamespaceManager.prototype.add = function(p_fullName, p_elem) {
        var parent = this.$storage;
        var sections;
        var oPath;
        var key;
        var ns;

        try {
            oPath = this._getPathObject(p_fullName);
            key = oPath['key'];
            ns = oPath['ns'];
            sections = _getArray(ns);

            if (this._elemTypes.length > 0) Type.matchType([this._elemTypes], p_elem);  // []로 감싸서 choice 타입으로 변환됨
            if (!_validName(key)) throw new ExtendError(/EL03331/, null, [key]);
            if (!this.allowOverlap && this.getPath(p_elem)) {
                throw new ExtendError(/EL03332/, null, []);
            }
            
            if (sections.length === 0) {    // 최상위 등록
                parent[key] = p_elem;
                return;
            } else this.addNamespace(ns);

            for (var i = 0; i < sections.length; i+=1) {
                var sName = sections[i];
                if (i === sections.length - 1) { 
                    parent[sName][key] = p_elem;
                } else parent = parent[sName];
            }
            
        } catch (error) {
            throw new ExtendError(/EL03333/, error, []);
        }
    };

    /**
     * Deletes an element from the specified namespace path.  
     * 
     * @param {string} p_fullname Full path to the Namespace
     * @returns {boolean} Successful deletion ('true' or 'false')
     */
    NamespaceManager.prototype.del = function(p_fullName) {
        var parent = this.$storage;
        var sections;

        try {
            sections = _getArray(p_fullName);

            for (var i = 0; i < sections.length; i+=1) {
                var sName = sections[i];
                if (parent[sName]) {
                    if (i === sections.length - 1) {
                        delete parent[sName];
                        return true;
                    } else parent = parent[sName];
                } else return false;
            }
            
        } catch (error) {
            throw new ExtendError(/EL03334/, error, []);
        }

    };

    /**
     * Verify that the specified element exists in the Namespace.  
     * 
     * @param {string | any} p_elem Function, class, or object to check
     * @returns {boolean} Existence ('true' or 'false')
     */
    NamespaceManager.prototype.has = function(p_elem) {
        if (_isString(p_elem) && this.find(p_elem)) return true;
        else if (typeof this.getPath(p_elem) === 'string') return true;
        return false;
    };

    /**
     * Retrieves elements from the specified namespace path.  
     * 
     * @param {string | array<string>} p_fullName Full path to the Namespace
     * @returns {(object | function)?} Found elements
     */
    NamespaceManager.prototype.find = function(p_fullName) {
        var parent = this.$storage;
        var sections;

        try {
            sections = _getArray(p_fullName);   // try undefined
            for (var i = 0; i < sections.length; i+=1) {
                var sName = sections[i];
                if (parent[sName]) {
                    if (i === sections.length - 1) return parent[sName];
                    else parent = parent[sName];
                } else return;
            }
            
        } catch (error) {
            return;              
        }
    };
    
    /**
     * Returns the path of the specified element in the Namespace.  
     * (Route of the first element in case of redundancy)  
     * @param {any} p_elem Elements to find (function or object)
     * @returns {string?} The path of the element, 'undefined' if not found
     */
    NamespaceManager.prototype.getPath = function(p_elem) {
        var namespace = this.$storage;
        var stack = [];

        if (!p_elem) throw new ExtendError(/EL03341/, null, [typeof p_elem]);

        if ($findElement(namespace)) {
            return stack.join('.');
        } else return;

        // inner function
        function $findElement(target) { 
            for(var prop in target) {
                var obj = target[prop];
                if (obj === 'ns') continue;
                if (obj && obj['_type'] === 'ns') {
                    stack.push(prop);
                    if($findElement(obj)) return true;
                } else {
                    if (obj === p_elem) {
                        stack.push(prop);
                        return true;
                    }
                }
            }
            stack.pop();
            return false;
        }
    };

    /**
     * Serialize the namespace repository and convert it into a string.  
     * To convert the function to JSON, you must specify a separate 'stringify' function.  
     * 
     * @param {function?} p_stringify JSON Stringify function (optional)
     * @param {string?} p_space Setting the blank to apply at the output
     * @returns {string} serialized string
     */
    NamespaceManager.prototype.output = function(p_stringify, p_space) {
        var arr = [];
        var obj;
        var str;
        var temp = {list: arr};

        try {
            for (var i = 0; i < this._list.length; i++) {
                var fullName    = this._list[i];
                var fun         = this.find(fullName);
                var nObj        = this._getPathObject(fullName);
                obj = { 
                    ns: nObj.ns, 
                    key: nObj.key, 
                    full: fullName, 
                    elem: fun
                };
                arr.push(obj);
            }

            if (typeof p_stringify === 'function') str = p_stringify(temp, {space: p_space} );
            else str = JSON.stringify(temp, null, p_space);
            return str;
            
        } catch (error) {
            throw new ExtendError(/EL03342/, error, [error]);
        }
        
    };

    /**
     * Parsing serialized strings and fetching them to the Namespace repository.  
     * @param {string} p_str serialized string
     * @param {function?} p_parse  JSON parser function
     */
    NamespaceManager.prototype.load = function(p_str, p_parse) {
        var arr = [];
        
        if (!_isString(p_str)) throw new ExtendError(/EL03343/, null, [typeof p_str]);
        
        try {
            if (typeof p_parse === 'function') arr = p_parse(p_str);
            else arr = JSON.parse(p_str, null);
            
            this.init();
            for (var i = 0; i < arr['list'].length; i++) {
                var o = arr['list'][i];
                var fun = o['elem'];
                this.add(o['full'], fun);
            }

        } catch (error) {
            throw new ExtendError(/EL03344/, error, [error.message]);
        }
    };

    return NamespaceManager;
}());

/**** meta-registry.js | MetaRegistry ****/
//==============================================================
// 1. import module

//==============================================================Á
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
if (!NamespaceManager) throw new Error(Message.get('ES011', ['NamespaceManager', 'namespace-manager']));

//==============================================================
// 3. module implementation       
var MetaRegistry = (function () {
    /**
     * 'MetaRegistry' is a class responsible for registering and managing meta objects.  
     * 
     * @constructs MetaRegistry
     * @static
     */
    function MetaRegistry() { 
    }

    MetaRegistry._NS = 'Meta';    // namespace

    // var define
    var _list = [];
    var namespace = new NamespaceManager();

    /**
     * List of meta objects.  
     * 
     * @member {any[]} MetaRegistry#_list
     * @readonly
     */
    Object.defineProperty(MetaRegistry, '_list', 
    {
        get: function() { 
            var arr = [];
            for (var i = 0; i < _list.length; i++) arr.push(_list[i]);
            return arr;
        },
        configurable: false,
        enumerable: true,
    });

    /**
     * Total number of currently registered meta objects.  
     * 
     * @member {number} MetaRegistry#count
     * @readonly
     */
    Object.defineProperty(MetaRegistry, 'count', 
    {
        get: function() { return _list.length; },
        configurable: false,
        enumerable: true,
    });        

    /**
     * Namespace manager for meta objects.  
     * 
     * @member {NamespaceManager} MetaRegistry#namespace
     * @readonly
     */
    Object.defineProperty(MetaRegistry, 'namespace', 
    {
        get: function() { return namespace; },
        configurable: false,
        enumerable: true,
    });

    // local function
    function _isBuiltFunction(obj) {    // 내장함수 여부
        if (typeof obj === 'function' && (obj === Number || obj === String 
            || obj === Boolean || obj === Function
            || obj === Object || obj === Array
            || obj === RegExp || obj === Date 
            || obj === Symbol || obj === BigInt
        )) return true;
        return false;
    }

    function _isObject(obj) {    // 객체 여부
        if (typeof obj === 'object' && obj !== null) return true;
        return false;
    }

    function _isString(obj) {    // 공백아닌 문자 여부
        if (typeof obj === 'string' && obj.length > 0) return true;
        return false;
    }
    
    function _getGuidList(oGuid, arr) {  //객체 배열 리턴
        arr = arr || [];
        if (MetaRegistry.isGuidObject(oGuid)) arr.push(oGuid);
        if (Array.isArray(oGuid)){
            for(var i = 0; i < oGuid.length; i++) {
                if (_isObject(oGuid[i])) _getGuidList(oGuid[i], arr);
            }
        } else if (_isObject(oGuid)) {
            for(var prop in oGuid) {
                if (_isObject(oGuid[prop])) _getGuidList(oGuid[prop], arr);
            }
        }
        return arr;
    }
    /**
     * Initializes registered meta objects and namespaces.  
     */
    MetaRegistry.init = function() {
        _list.length = 0;
        this.namespace.init();
    };

    /**
     * Register the meta object and register the creator in the namespace.  
     * An exception occurs if an object is already registered.   
     * Register if there is no creator in the Namespace.  
     * 
     * @param {MetaObject} p_meta Meta object to register
     */
    MetaRegistry.register = function(p_meta) {
        var _ns;
        var key;
        var type;
        // var fullName;

        if (!this.isMetaObject(p_meta)) throw new ExtendError(/EL03211/, null, [p_meta._type, p_meta._guid]);
        if (this.has(p_meta)) throw new ExtendError(/EL03212/, null, [p_meta._guid]);

        _ns         = p_meta['_ns'] || '';
        type        = p_meta['_type'];
        key         = type.name;
        // fullName    = p_meta['_ns'] && p_meta['_ns'].length > 0 ?  _ns +'.'+key : key;

        _list.push(p_meta);  // 객체 등록
        this.registerClass(type, _ns, key); // 클래스 등록
    };

    /**
     * Undoes the meta object in the registry.  
     * 
     * @param {MetaObject | string} p_meta Meta object or GUID string
     * @returns {boolean} successful removal ('true' or 'false')
     */
    MetaRegistry.release = function(p_meta) {
        var guid;

        if (typeof p_meta !== 'object' && typeof p_meta !== 'string') {
            throw new ExtendError(/EL03213/, null, [typeof p_meta]);
        }

        guid = typeof p_meta === 'string' ? p_meta : p_meta['_guid'];
        if (!_isString(guid)) return false;

        for(var i = 0; i < _list.length; i++) {
            if (_list[i]['_guid'] === guid) {
                _list.splice(i, 1);
                return true;
            }
        }
        return false;
    };

    /**
     * Check if the registry has a meta object.  
     * 
     * @param {object | string} p_oGuid  Object of type GUID or GUID string
     * @returns {boolean} Existence ('true' or 'false')
     */
    MetaRegistry.has = function(p_oGuid) {
        var guid = _isObject(p_oGuid) ? p_oGuid['_guid'] : p_oGuid;

        if (!_isString(guid)) return false;

        for(var i = 0; i < _list.length; i++) {
            if (_list[i]['_guid'] === guid) return true;
        }
        return false;
    };
    
    /**
     * Locate the meta object in the registry.  
     * 
     * @param {object | string} p_oGuid Object of type GUID or GUID string
     * @returns {MetaObject?} meta object found, 'undefined' if not found
     */
    MetaRegistry.find = function(p_oGuid) {
        var guid = _isObject(p_oGuid) ? p_oGuid['_guid'] : p_oGuid;
        
        if (!_isString(guid)) return;
        
        for(var i = 0; i < _list.length; i++) {
            if (_list[i]['_guid'] === guid) return _list[i];
        }
    };

    /**
     * Checks for meta objects.  
     * 
     * @param {object} p_target Target object
     * @returns {boolean} Whether it is a meta object ('true' or 'false')
     */
    MetaRegistry.isMetaObject = function(p_target) {
        if (!_isObject(p_target)) return false;
        if (_isString(p_target['_guid']) && typeof p_target['_type'] === 'function') return true;
        return false;
    };
    
    /**
     * Creates a meta object of a GUID object.  
     * 
     * @param {object} p_oGuid GUID type object
     * @param {object} [p_origin=p_oGuid] Initial GUID literal object
     * @returns {MetaObject} created meta object
     */
    MetaRegistry.createMetaObject = function(p_oGuid, p_origin) {
        var origin = p_origin ? p_origin : p_oGuid;
        var args = [null];
        var type;
        var ns;
        var fullName;
        var coClass;
        var params;
        
        if (!_isObject(p_oGuid)) throw new ExtendError(/EL03221/, null, [typeof p_oGuid]);
        if (!_isString(p_oGuid['_type'])) throw new ExtendError(/EL03222/, null, [typeof p_oGuid['_type']]);
        if (!_isObject(origin)) throw new ExtendError(/EL03223/, null, [typeof origin]);
        
        type        = p_oGuid['_type'];
        ns          = p_oGuid['_ns'] || '';
        fullName    =  ns !== '' ? [ns, type].join('.') : type;
        coClass     = this.getClass(fullName);
        
        if (typeof coClass !== 'function') throw new ExtendError(/EL03224/, null, [fullName, typeof coClass]);
        
        // params = coClass.hasOwnProperty('_PARAMS') ? coClass['_PARAMS'] : []; // arr
        params = Object.prototype.hasOwnProperty.call(coClass, '_PARAMS') ? coClass['_PARAMS'] : []; // arr
        for (var i = 0; i < params.length; i++) {
            var argName = params[i];
            var prop = p_oGuid[argName];
            var obj;
            obj = _isObject(prop) && prop['$ref'] ? this.findSetObject(prop['$ref'], origin) : prop;
            if (p_oGuid[argName]) args.push(obj);
        }
        return new (Function.prototype.bind.apply(coClass, args));
    };
    
    /**
     * Creates a reference object for a GUID object.  
     * 
     * @param {MetaObject} p_meta Meta object
     * @returns {object} created reference object ('{$ref: 'guid value'}')
     * @example
     * var meta = new MetaElement('m1');
     * obj.onwer = MetaRegistry.createReferObject(meta);
     * console.log(obj.onwer);          // { $ref : '5337877c-49d6-9add-f35a-7bd31d510d4f' }
     */
    MetaRegistry.createReferObject = function(p_meta) {
        if (!_isObject(p_meta)) throw new ExtendError(/EL03225/, null, [typeof p_meta]);
        if (!_isString(p_meta['_guid'])) throw new ExtendError(/EL03226/, null, [typeof p_meta['_guid']]);
        return { $ref: p_meta['_guid'] };
    };

    /**
     * Register the function in the Namespace and create a reference object.  
     * 
     * @param {function} p_target Function or constructor
     * @returns {object} created namespace reference object ('{$ns: 'Meta.MetaElement'}')
     * @example
     * var meta = new MetaElement('m1');
     * obj.onwer = MetaRegistry.createReferObject(meta);
     * console.log(obj);                // {onwer: {$ns: 'Meta.MetaElement'}}
     */
    MetaRegistry.createNsReferObject = function(p_target) {
        var fullName;
        var ns, key;

        if (typeof p_target !== 'function') throw new ExtendError(/EL03227/, null, [typeof p_target]);
        
        if (!this.findClass(p_target)) {
            ns  = p_target['_NS'] || '';
            key = p_target.name;
            this.registerClass(p_target, ns, key);
        }
        fullName = this.findClass(p_target);
        return { $ns: fullName };
    };

    /**
     * Set the GUID of the meta object in the GUID object.  
     * - oGuid.$set = meta._guid  
     * 
     * @param {object} p_oGuid GUID type object
     * @param {MetaObject} p_meta Meta object
     * @returns {object} set object
     * @example
     * var meta = new MetaElement('m1');    // meta.guid = '5337877c-49d6-9add-f35a-7bd31d510d4f'
     * var obj = { name: 'm2' };
     * MetaRegistry.setMetaObject(obj, meta);
     * console.log(obj);                    // {name: 'm2, $set: '5337877c-49d6-9add-f35a-7bd31d510d4f'}
     */
    MetaRegistry.setMetaObject = function(p_oGuid, p_meta) {
        if (!_isObject(p_oGuid)) throw new ExtendError(/EL03241/, null, [typeof p_oGuid]);
        if (!_isObject(p_meta)) throw new ExtendError(/EL03242/, null, [typeof p_meta]);
        if (!_isString(p_meta['_guid'])) throw new ExtendError(/EL03243/, null,[typeof p_meta['_guid']]);
        
        p_oGuid['$set'] = p_meta['_guid'];
        return p_oGuid;
    };
        
    /**
     * Validates the GUID object.  
     * 1. Check if the object has duplicate GUID values  
     * 2. Determine if an object has a '$ref' value  
     * 3. Determine if an object has a '$ns' value  
     * 4. Check the number of '_key' and '_elem' of objects   
     * 
     * @param {object} p_oGuid GUID object to be inspected
     * @returns {boolean} Inspection result ('true' or 'false')
     */
    MetaRegistry.validObject = function(p_oGuid) {
        var _this = this;
        var arrObj;

        if (!_isObject(p_oGuid)) throw new ExtendError(/EL03251/, null, [typeof p_oGuid]);
        
        arrObj = _getGuidList(p_oGuid);
        if (!$validUniqueGuid() || !$validReference(p_oGuid) || !$validCollection(p_oGuid)) return false;
        return true;

        // inner function
        function $findGuid(guid, arr) { // guid 조회
            for(var i = 0; i < arr.length; i++) {
                if (arr[i]['_guid'] === guid) return arr[i];
            }
        }
        function $validReference(oGuid) { // 참조 검사
            if (oGuid['$ref'] && !$findGuid(oGuid['$ref'], arrObj)) return false;
            if (oGuid['$set'] && !$findGuid(oGuid['$set'], arrObj)) return false;
            if (oGuid['$ns'] && !_this.getClass(oGuid['$ns'])) return false;
    
            if (Array.isArray(oGuid)){
                for(var i = 0; i < oGuid.length; i++) {
                    if (_isObject(oGuid[i]) && !$validReference(oGuid[i])) return false
                }
            } else {
                for(var prop in oGuid) {
                    if (_isObject(oGuid[prop]) && !$validReference(oGuid[prop])) return false;
                }
            }
            return true;
        }
        function $validCollection(oGuid) { // 컬렉션 검사
            if (Array.isArray(oGuid['_elem']) && Array.isArray(oGuid['_key'])) {
                if (oGuid['_elem'].length !== oGuid['_key'].length) return false;
            }
            if (Array.isArray(oGuid)){
                for(var i = 0; i < oGuid.length; i++) {
                    if (_isObject(oGuid[i]) && !$validCollection(oGuid[i])) return false;
                }
            } else {
                for(var prop in p_oGuid) {
                    if (_isObject(oGuid[prop]) && !$validCollection(oGuid[prop])) return false;
                }
            }
            return true;
        }
        function $validUniqueGuid() {    // guid 유일한 값인지 검사
            for (var i = 0; i < arrObj.length; i++) {
                for (var j = 0; j < arrObj.length; j++) {
                    if (arrObj[i]['_guid'] === arrObj[j]['_guid'] && i !== j) return false; // 중복
                }
            }
            return true;
        }
    };

    /**
     * Verify that the target object is a GUID object.  
     * @param {object} p_target Object to be checked
     * @returns {boolean} Guid object(`true` or `false`)
     */
    MetaRegistry.isGuidObject = function(p_target) {
        if (!_isObject(p_target)) return false;
        if (_isString(p_target['_guid']) && _isString(p_target['_type'])) return true;
        return false;
    };

    /**
     * Verify that the source object contains a GUID object.  
     * 
     * @param {string| object} p_oGuid GUID object or GUID string to check
     * @param {object | array<object>} p_origin  GUID literal object of query
     * @returns {boolean} whether to include ('true' or 'false')
     */
    MetaRegistry.hasGuidObject = function(p_oGuid, p_origin) {
        var guid = _isObject(p_oGuid) ? p_oGuid['_guid'] : p_oGuid;
        var arrOrigin = [];

        if (!_isString(guid)) throw new ExtendError(/EL03252/, null, [typeof guid]);

        if (Array.isArray(p_origin)) arrOrigin = p_origin;
        else arrOrigin.push(p_origin);

        for (var i = 0; i < arrOrigin.length; i++) {
            var origin = arrOrigin[i];
            var arrObj = _getGuidList(origin);
            if (!_isObject(origin)) throw new ExtendError(/EL03253/, null, [i, typeof guid]);
            for (var j = 0; j < arrObj.length; j++) {
                if (arrObj[j]._guid === guid) return true;
            }
        }
        return false;
    };

    /**
     * Verify that the GUID object contains a reference type element.  
     * Reference types are '$ref' and '$ns'.  
     * 
     * @param {object} p_oGuid GUID object to check
     * @returns {boolean} whether to include ('true' or 'false')
     */
    MetaRegistry.hasRefer = function(p_oGuid) {
        if (!_isObject(p_oGuid)) throw new ExtendError(/EL03254/, null, [typeof p_oGuid]);
        if (!this.isGuidObject(p_oGuid)) throw new ExtendError(/EL03255/, null, [p_oGuid['_type'], p_oGuid['_guid']]);

        return $hasRefer(p_oGuid);

        // inner function
        function $hasRefer(oGuid) {  // 참조 포함 여부
            if (Array.isArray(oGuid)){
                for(var i = 0; i < oGuid.length; i++) {
                    if (typeof oGuid[i] === 'object' && $hasRefer(oGuid[i])) return true;
                }
            } else {
                if (oGuid['$ref'] && _isString(oGuid['$ref'])) return true;
                if (oGuid['$ns'] && _isString(oGuid['$ns'])) return true;
                for(var prop in oGuid) {
                    if (_isObject(oGuid[prop]) && $hasRefer(oGuid[prop])) return true
                }
            }
            return false;
        }
    };     

    /**
     * Retrieves the set GUID object from the repository.  
     * 
     * @param {string | object} p_oGuid GUID object or GUID string to look up
     * @param {object} p_origin GUID literal object with query target
     * @returns {MetaObject} meta-objects viewed
     */
    MetaRegistry.findSetObject = function(p_oGuid, p_origin) {
        var guid = _isObject(p_oGuid) ? p_oGuid['_guid'] : p_oGuid;
        var origin = p_origin;

        if (!_isString(guid)) throw new ExtendError(/EL03256/, null, [guid]);
        if (!_isObject(origin)) throw new ExtendError(/EL03257/, null, [typeof origin]);

        return $findObject(origin);
        
        // inner finction
        function $findObject(oGuid) { // 객체 조회
            var result;
            if (Array.isArray(oGuid)){
                for(var i = 0; i < oGuid.length; i++) {
                    if (typeof oGuid[i] === 'object') {
                        result = $findObject(oGuid[i]);
                        if(result) return result;
                    }
                }
            } else {
                if (oGuid['_guid'] && oGuid['_guid'] === guid) {
                    result = oGuid['$set'] ? MetaRegistry.find(oGuid['$set']) : undefined;
                    return result;
                }
                for(var prop in oGuid) {
                    if (typeof oGuid[prop] === 'object') {
                        result = $findObject(oGuid[prop]);
                        if(result) return result;
                    } 
                }
            }
            return result;
        }
    };

        

    /**
     * Converts the reference element value of a GUID object to a real object reference.  
     * To be converted: '$ns' is converted to '[Object Object]'.  
     * @param {object} p_oGuid GUID object to convert
     * @returns {object} converted meta object
     */
    MetaRegistry.transformRefer = function(p_oGuid) {
        var _this = this;
        var arrObj;
        var clone;

        if (!_isObject(p_oGuid)) throw new ExtendError(/EL03244/, null, [typeof p_oGuid]);
        
        arrObj = _getGuidList(p_oGuid);
        clone = Util.deepCopy(p_oGuid);
        $linkReference(clone, arrObj);
        return clone;

        // inner function
        function $linkReference(oGuid, arr, parentName) {    // 참조 연결
            parentName = parentName || '';
            if (Array.isArray(oGuid)){
                for(var i = 0; i < oGuid.length; i++) {
                    if (typeof oGuid[i] === 'object') $linkReference(oGuid[i], arr);
                }
            } else {
                for(var prop in oGuid) {
                    if (_isObject(oGuid[prop])) {
                        if (oGuid[prop]['$ns']) {
                            var ns = _this.getClass(oGuid[prop]['$ns']);
                            if (typeof ns !== 'function') throw new ExtendError(/EL03245/, null, [parentName, prop]);
                            oGuid[prop] = ns; // function 타입 연결
                        } else $linkReference(oGuid[prop], arr, parentName ? parentName +'.'+ prop : prop);
                    }
                }
            }
        }
    };
    
    /**
     * Register the creator or object in the specified namespace.  
     * It registers after performing duplicate checks, and does not store built-in functions (Array, String, Number, etc.).  
     * 
     * @param {function | object} p_target To be registered (class creator or object)
     * @param {string} p_ns Namespace name (separated by a dot '.')
     * @param {string} p_key Destination name (class name or function name), otherwise the last name of the namespace applies.
     */
    MetaRegistry.registerClass = function(p_target, p_ns, p_key) {
        var fullName;
        
        if (!(_isObject(p_target) || typeof p_target === 'function')) throw new ExtendError(/EL03231/, null, [typeof p_target]);
        if (p_ns && typeof p_ns !== 'string') throw new ExtendError(/EL03232/, null, [typeof p_ns]);
        if (p_key && !_isString(p_key)) throw new ExtendError(/EL03233/, null, [typeof p_key]);

        if (p_key) fullName = p_ns.length > 0 ? p_ns +'.'+ p_key : p_key;
        else fullName = p_ns;
        
        if (_isBuiltFunction(p_target)) return;    // 내장함수 제외
        if (typeof globalThis[fullName] === 'function') return;
        
        if (!this.namespace.find(fullName)) this.namespace.add(fullName, p_target);  // 중복 검사 후 등록
    };
    
    /**
     * Undoes the registered item in the Namespace.  
     * 
     * @param {string} p_fullName full path to the namespace ('string')
     * @returns {boolean} Successful deletion ('true' or 'false')
     */
    MetaRegistry.releaseClass = function(p_fullName) {
        if (!_isString(p_fullName)) throw new ExtendError(/EL03234/, null, [typeof p_fullName]);
        
        if (typeof globalThis[p_fullName] === 'function') return true; // 내장함수 & 전역 함수
        return this.namespace.del(p_fullName);
    };
    
    /**
     * Finds the specified constructor or object in the Namespace and returns the entire path.  
     * 
     * @param {function} p_target Creator or object
     * @returns {string?} Namespace Full path, 'undefined' if not found
     */
    MetaRegistry.findClass = function(p_target) {
        var fullName;

        if (typeof p_target !== 'function') throw new ExtendError(/EL03235/, null, [typeof p_target]);
        
        fullName = p_target.name;
        if (typeof globalThis[fullName] === 'function') return fullName;   // 내장함수 & 전역 함수
        return this.namespace.getPath(p_target);
    };
    
    /**
     * Returns a generator or object corresponding to the entire path specified in the Namespace.  
     * 
     * @param {string} p_fullName Full path to the Namespace
     * @returns {(object | function)?} corresponding object or creator, 'undefined' if not found
     */
    MetaRegistry.getClass = function(p_fullName) {
        if (!_isString(p_fullName)) throw new ExtendError(/EL03236/, null, [typeof p_fullName]);
        
        if (typeof globalThis[p_fullName] === 'function') return globalThis[p_fullName];  // 내장함수 & 전역 함수
        return this.namespace.find(p_fullName);
    };

    /**
     * Pars the serialized JSON string to convert it to 'MetaObject'.  
     * REVIEW: 필요성 재검토 필요  
     * @param {string} p_str serialized JSON string
     * @param {function?} p_parse JSON parser function (default is 'JSON.parse')
     * @returns {MetaObject} converted meta object
     */
    MetaRegistry.loadMetaObject = function(p_str, p_parse) {
        var obj = p_str;
        var oGuid;
        var meta;

        if (typeof p_str !== 'string') throw new ExtendError(/EL03246/, null, [typeof str]);

        obj = (typeof p_parse === 'function') ? p_parse(obj) : JSON.parse(obj, null);
        if (this.has(obj)) return this.find(obj['_guid']);  // 객체가 존재할 경우
        if (!this.isGuidObject(obj)) throw new ExtendError(/EL03247/, null, [obj['_type'], obj['_guid']]);

        oGuid = this.transformRefer(obj);
        meta = this.createMetaObject(oGuid);
        meta.setObject(oGuid);
        return meta;
    };
    return MetaRegistry;
}());

/**** meta-object.js | MetaObject ****/
//==============================================================
// 1. import module

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
if (!Type) throw new Error(Message.get('ES011', ['Type', 'type']));
if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
if (!IObject) throw new Error(Message.get('ES011', ['IObject', 'i-object']));
if (!IMarshal) throw new Error(Message.get('ES011', ['IMarshal', 'i-marshal']));
if (!MetaRegistry) throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));

//==============================================================
// 3. module implementation   
var MetaObject  = (function () {
    /**
     * Creates an instance of the MetaObject class.  
     * 
     * @constructs MetaObject
     * @implements {IObject}
     * @implements {IMarshal}
     */
    function MetaObject() {

        var _guid;
        var _ns;
        
        /**
         * Internal property that stores the unique identifier of the object.  
         * 
         * @readonly
         * @member {string} MetaObject#_guid 
         * @example
         * var obj = MetaObject();
         * console.log(obj._guid);      // '5337877c-49d6-9add-f35a-7bd31d510d4f' unique key code
         */
        Object.defineProperty(this, '_guid', 
        {
            get: function() { 
                if (!_guid) _guid = Util.createGuid();
                return _guid;
            },
            set: function(nVal) { _guid = nVal; },
            configurable: false,
            enumerable: false
        });

        /**
         * Internal property that refers to the generator function of the object.  
         * 
         * @readonly
         * @member {function} MetaObject#_type 
         * @example
         * var obj = new MetaObject();
         * obj._type === MetaObject;        // true
         * console.log(typeof obj._type);   // 'function'
         */
        Object.defineProperty(this, '_type', 
        {
            get: function() { 
                var proto = this.__proto__ || Object.getPrototypeOf(this);
                return proto.constructor;
            },
            configurable: false,
            enumerable: false
        });

        /**
         * Indicates the object name space.  
         * If '_type.NS' is not statically defined, use the parent's namespace as the default.  
         */
        Object.defineProperty(this, '_ns', 
        {
            get: function() { 
                return _ns;
            },
            set: function(nVal) { 
                _ns = nVal;
            },
            configurable: false,
            enumerable: false
        });
        
        // 추상클래스 검사
        if (Object.prototype.hasOwnProperty.call(this._type, '_KIND')) {
        // if (this._type.hasOwnProperty('_KIND')) {
            var kind = this._type['_KIND'].toLowerCase();
            if (['abstract', 'interface', 'enum', 'function'].indexOf(kind) > -1) {
                throw new ExtendError(/EL03111/, null, [this._type.name, kind]);
            }
        }

        // _NS 선언이 없으면 부모의 것을 기본으로 사용!
        if (this._type && this._type._NS) this._ns = this._type._NS;
        MetaRegistry.register(this);

        Util.implements(MetaObject, this);          // strip:
    }
    MetaObject._UNION = [IObject, IMarshal];
    MetaObject._NS = 'Meta';
    MetaObject._PARAMS = [];

    // local function
    function _isObject(obj) {    // 객체 여부
        if (typeof obj === 'object' && obj !== null) return true;
        return false;
    }

    function _compare(p_obj1, p_obj2) { // 객체 비교
        if (p_obj1 === p_obj2) return true;
        else if (p_obj1 instanceof MetaObject && p_obj2 instanceof MetaObject) {
            var obj1 = p_obj1.getObject(2);    // _guid, $ref 제외 객체
            var obj2 = p_obj2.getObject(2);
            return Type.deepEqual(obj1, obj2);
        } else if (_isObject(p_obj1) && _isObject(p_obj2)) {
            return Type.deepEqual(p_obj1, p_obj2);
        } else return false;
    }

    /**
     * Compare the current object with the specified object.  
     * However, the '_guid' property is excluded from the comparison.  
     * 
     * @param {object} p_target To compare
     * @returns {boolean} If two objects are the same, 'true', or 'false'
     * @example
     * var meta1 = new MetaObject();
     * var meta2 = new MetaObject();
     * meta1.equal(meta2);      // true
     * meta2.equal(meat1);      // true
     * meta1 === meta2;         // false
     * 
     * var obj1 = {a: 1};
     * var obj2 = {a: 1};
     * this.equal(obj1, obj2);  // true
     */
    MetaObject.prototype.equal = function(p_target) {
        return _compare(this, p_target);
    };
    Object.defineProperty(MetaObject.prototype, 'equal', {
        enumerable: false
    });

    /**
     * Returns the creators of the current object and all the creators of the prototype chain to the array.  
     * 
     * @returns {array<function>} Array of generator functions (includes first defined constructors sequentially)
     * @example
     * var obj = new MetaObject();
     * var arr = obj.getTypes();
     * arr[0] === MetaObject;   // true
     * arr[1] === Object;       // true
     * console.log(arr.length); // 2
     * 
     * var elem = new MetaElement('e1');   // Inherited MetaObject 
     * var arr = elem.getTypes();
     * arr[0] === MetaElement;  // true
     * arr[1] === MetaObject;   // true
     * arr[2] === Object;       // true
     * console.log(arr.length); // 3
     */
    MetaObject.prototype.getTypes = function() {
        return parentFunction(this);

        // inner function
        function parentFunction(obj) {
            var list = [];
            var proto = obj.__proto__ || Object.getPrototypeOf(obj);
            if (proto) {
                list.push(proto.constructor);
                list = list.concat(parentFunction(proto));
            }
            return list;
        }
    };
    Object.defineProperty(MetaObject.prototype, 'getTypes', {
        enumerable: false
    });

    /**
     * Verify that the object is an instance of a particular class.  
     * You can also examine the defined interface type (including '_UNION').  
     * 
     * @param {Function | string} p_target Class constructor function or class name (string)
     * @returns {boolean} Whether there is an instance of the specified class ('true' or 'false')
     * @example
     * var obj = new MetaObject();
     * obj.instanceOf('MetaObject');    // true
     * obj.instanceOf('Object');        // true
     * obj.instanceOf(MetaObject);      // true
     * obj.instanceOf(Object);          // true
     * obj.instanceOf(String);          // false
     * 
     * var elem = new MetaElement('e1');// Inherited MetaObject 
     * obj.instanceOf('MetaElement');   // true
     * obj.instanceOf('MetaObject');    // true
     * obj.instanceOf('Object');        // true
     * obj.instanceOf(MetaElement);     // true
     * obj.instanceOf(MetaObject);      // true
     * obj.instanceOf(Object);          // true
     * obj.instanceOf(String);          // false
     */
    MetaObject.prototype.instanceOf = function(p_target) {
        var _this = this;
        var unionTypes = this._interface || this._type._UNION;
        // var unionTypes = this._type['_UNION'] || [];
        // var unionTypes = this._interface || [];
        // var thisTypes = this.getTypes();

        if (typeof p_target === 'string') return $$findFunctionName(p_target);
        if (typeof p_target === 'function') return $findFunction(p_target);
        return false;

        // inner function
        function $findFunction(fun) {
            var types = _this.getTypes();
            for (var i = 0; i < types.length; i++) {
                if (fun === types[i]) return true;
            }
            
            for (var k = 0; k < unionTypes.length; k++) {
                if (fun ===  unionTypes[k]) return true;
            }
            return false;
        }
        function $$findFunctionName(funName) {
            var types = _this.getTypes();
            for (var i = 0; i < types.length; i++) {
                if (funName === types[i].name) return true;
            }
            for (var k = 0; k < unionTypes.length; k++) {
                if (funName === unionTypes[k].name) return true;
            }
            return false;
        }
    };
    Object.defineProperty(MetaObject.prototype, 'instanceOf', {
        enumerable: false
    });

    /**
     * Returns the object as an object literal of type GUID.  
     * 
     * @param {number} [p_vOpt=0] Import mode  
     * mode=0 : reference structure (_guid:Yes, $ref:Yes)  
     * mode=1: Redundant structure (_guid:Yes, $ref:Yes)  
     * mode=2 : non-coordinated structure (_guid: No, $ref: No)  
     * @param {object | array<object>} [p_owned={}] Parent object that contains (owns) the current object
     * @returns {object} Guid type object literal
     * @example
     * a.getObject(2) == b.getObject(2)   
     */
    MetaObject.prototype.getObject = function(p_vOpt) {
        var vOpt = p_vOpt || 0;
        var obj = {};
        // var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

        if (vOpt < 2 && vOpt > -1) obj['_guid'] = this._guid;
        obj['_type'] = this._type._NS ? this._type._NS +'.'+ this._type.name : this._type.name;
        return obj;                        
    };
    Object.defineProperty(MetaObject.prototype, 'getObject', {
        enumerable: false
    });

    /**
     * Set up a GUID type object literal by converting it to an instance object.  
     * 
     * @param {object} p_oGuid object literal of type of GUID to set
     * @param {object} [p_origin=p_oGuid] Initial GUID literal object referenced during conversion
     */
    MetaObject.prototype.setObject  = function(p_oGuid, p_origin) {
        var origin = p_origin ? p_origin : p_oGuid;
        var fullName = this._type._NS ? this._type._NS +'.'+ this._type.name : this._type.name;

        if (!_isObject(p_oGuid)) throw new ExtendError(/EL03112/, null, [typeof p_oGuid]);
        if (p_oGuid['_type'] !== fullName) throw new ExtendError(/EL03113/, null, [p_oGuid['_type'], fullName]);
        
        if (MetaRegistry.isGuidObject(origin)) {
            if (!origin['__TRANSFORM_REFER']) {
                origin = MetaRegistry.transformRefer(origin);
                origin['__TRANSFORM_REFER'] = true;
            }
        } else throw new ExtendError(/EL03114/, null, [p_origin._type, p_origin._guid]);
        
        MetaRegistry.setMetaObject(p_oGuid, this); // $set attach
    };
    Object.defineProperty(MetaObject.prototype, 'setObject', {
        enumerable: false
    });

    return MetaObject;

}());

/**** meta-element.js | MetaElement ****/
//==============================================================
// 1. import module

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
if (!IElement) throw new Error(Message.get('ES011', ['IElement', 'i-element']));
if (!MetaObject) throw new Error(Message.get('ES011', ['MetaObject', 'meta-object']));

//==============================================================
// 3. module implementation   
var MetaElement  = (function (_super) {

    /**
     * Creates an instance of the MetaElement class.  
     * 
     * @constructs MetaElement
     * @extends MetaObject
     * @implements {IElement}
     * @param {string} p_name Name of the element
     */
    function MetaElement(p_name) {
        _super.call(this);
        
        var _name;

        /**
         * Internal property that stores the name of the element.  
         * 
         * @readonly
         * @member {string} MetaElement#_name
         */
        Object.defineProperty(this, '_name',
        {
            get: function() { return _name; },
            set: function(nVal) {
                if (typeof nVal !== 'string') throw new ExtendError(/EL03121/, null, [typeof val]);
                if (nVal.length === 0) throw new ExtendError(/EL03122/, null, []);
                _name = nVal;
            },
            configurable: false,
            enumerable: false
        });

        this._name = p_name;

        Util.implements(MetaElement, this);     // strip:
    }
    Util.inherits(MetaElement, _super);
    
    MetaElement._UNION = [IElement];
    MetaElement._NS = 'Meta';           // namespace
    MetaElement._PARAMS = ['name'];     // creator parameter
    
    /**
     * Returns the object as an object literal of type GUID.  
     * 
     * @param {number} [p_vOpt=0] Import mode  
     * mode=0 : reference structure (_guid:Yes, $ref:Yes)  
     * mode=1: Redundant structure (_guid:Yes, $ref:Yes)  
     * mode=2 : non-coordinated structure (_guid: No, $ref: No)  
     * @param {object | array<object>} [p_owned={}] Parent object that contains (owns) the current object  
     * @returns {object}  Guid type object literal
     * @example
     * a.getObject(2) == b.getObject(2)   
     */
    MetaElement.prototype.getObject = function(p_vOpt, p_owned) {
        var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
        // var vOpt = p_vOpt || 0;
        // var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

        obj['name'] = this._name;
        return obj;
    };
    Object.defineProperty(MetaElement.prototype, 'getObject', {
        enumerable: false
    });

    /**
     * Set up a GUID type object literal by converting it to an instance object.  
     * 
     * @param {object} p_oGuid object literal of the type of GUID to be set
     * @param {object} [p_origin=p_oGuid] Initial GUID literal object referenced during conversion
     */
    MetaElement.prototype.setObject  = function(p_oGuid, p_origin) {
        _super.prototype.setObject.call(this, p_oGuid, p_origin);
        // var origin = p_origin ? p_origin : p_oGuid;
        this._name = p_oGuid['name'];
        // this.__SET$_name(p_oGuid['name'], this);
    };
    Object.defineProperty(MetaElement.prototype, 'setObject', {
        enumerable: false
    });

    /**
     * Creates a replica of the current object.  
     * 
     * @returns {MetaElement} Replicated Objects
     */
    MetaElement.prototype.clone  = function() {
        var clone = new MetaElement(this._name);
        return clone;
    };
    Object.defineProperty(MetaElement.prototype, 'clone', {
        enumerable: false
    });

    return MetaElement;

}(MetaObject));

/**** base-collection.js | BaseCollection ****/
//==============================================================
// 1. import module

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
if (!Type) throw new Error(Message.get('ES011', ['Type', 'type']));
if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
if (!EventEmitter) throw new Error(Message.get('ES011', ['EventEmitter', 'event-emitter']));
if (!ICollection) throw new Error(Message.get('ES011', ['ICollection', 'i-collection']));
if (!IList) throw new Error(Message.get('ES011', ['IList', 'i-list']));
if (!MetaRegistry) throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));
if (!MetaObject) throw new Error(Message.get('ES011', ['MetaObject', 'meta-object']));

//==============================================================
// 3. module implementation
var BaseCollection  = (function (_super) {
    /**
    * The creator that creates the collection.  
    * This is an abstract class, and you must create an instance through inheritance.  
    * 
    * @abstract
    * @extends MetaObject
    * @constructs BaseCollection
    * @implements {ICollection}
    * @implements {IList}
    * @param {object} [p_owner] Objects that own this collection
    */
    function BaseCollection(p_owner) { 
        _super.call(this);
        
        // private variable
        var $KEYWORD = [];
        var $event = new EventEmitter();
        var $elements = [];
        var $descriptors = [];
        
        // protected variable
        var _owner ;
        var _elemTypes  = [];

        /** 
         * List of strings used as reserved words in the collection.  
         * 
         * @private
         * @member {array<string>}  BaseCollection#$KEYWORD
         */
        Object.defineProperty(this, '$KEYWORD', 
        {
            get: function() { return $KEYWORD; },
            set: function(newVal) { $KEYWORD = $KEYWORD.concat(newVal); },  // REVIEW: 예약어 중복
            configurable: false,
            enumerable: false,
        });

        /** 
         * Object that handles events. Used to register and generate various events in the collection.
         * 
         * @private
         * @member {EventEmitter} BaseCollection#$event  
         */
        Object.defineProperty(this, '$event', 
        {
            get: function() { return $event; },
            configurable: false,
            enumerable: false,
        });

        /**
         * An arrangement that stores elements of a collection.
         * 
         * @private
         * @member {string} BaseCollection#$elements
         */
        Object.defineProperty(this, '$elements',
        {
            get: function() { return $elements; },
            set: function(nVal) { $elements = nVal; },
            configurable: false,
            enumerable: false,
        });

        /**
         * A descriptor array that defines the getter and setter methods for each collection element.  
         * 
         * @private
         * @member {string} BaseCollection#$descriptors
         */
        Object.defineProperty(this, '$descriptors',
        {
            get: function() { return $descriptors; },
            set: function(nVal) { $descriptors = nVal; },
            configurable: false,
            enumerable: false,
        });



        /** 
         * Owned object of the collection.  
         * 
         * @protected 
         * @member {object} BaseCollection#_owner  
         */
        Object.defineProperty(this, '_owner', 
        {   
            get: function() { return _owner; },
            set: function(val) { _owner = val; },
            configurable: false,
            enumerable: false,
        });

        /** 
         * Defines the type constraints for the collection element.  
         * 
         * @protected 
         * @member {array<any>}  BaseCollection#_elemTypes  
         */
        Object.defineProperty(this, '_elemTypes', 
        {
            get: function() { return _elemTypes; },
            set: function(val) {
                var arrType = Array.isArray(val) ? val : Array.prototype.slice.call(arguments, 0);
                var reg = /^_[a-zA-Z]+_/;
                var arr1 = arrType.length > 0 && typeof arrType[0] === 'string' ? arrType[0] : '';
                
                // var result;
                if (arrType.length > 0  && reg.exec(arr1) === null) arrType = ['_req_'].concat(arrType);
                    
                // result = reg.exec(val);
                // if (result !== null) return result[0].toUpperCase();
                _elemTypes = arrType;
            },
            configurable: false,
            enumerable: false,
        });

        /**
         * An array that stores a list of elements in a collection.  
         * 
         * @protected 
         * @readonly
         * @member {Array}  BaseCollection#_list  
         */
        Object.defineProperty(this, '_list', 
        {
            get: function() {
                var arr = [];
                for (var i = 0; i < $elements.length; i++) arr.push(this.$elements[i]);
                return arr;
            },
            configurable: false,
            enumerable: false,
        });

        /**
         * Returns the number of elements in the collection.  
         * 
         * @readonly
         * @member {number} BaseCollection#count 
         */
        Object.defineProperty(this, 'count', 
        {
            get: function() { return this.$elements.length; },
            enumerable: false,
            configurable: false
        });

        /**
         * Returns the number of elements in the collection.  
         * @readonly
         * @member {number} BaseCollection#length 
         */
        Object.defineProperty(this, 'length', 
        {
            get: function() { return this.$elements.length; },
            enumerable: false,
            configurable: false
        });


        /**
         * Event handler called before adding an element to a collection.  
         * 
         * @event BaseCollection#onAdd
         * @param {function}    p_callback
         * @param {any}         p_callback.p_elem Elements to add
         * @param {number}      p_callback.p_idx Index of the element to be added
         * @param {this}        p_callback.p_this Current collection objects
         */
        Object.defineProperty(this, 'onAdd', 
        {
            set: function(fun) { this.$event.on('add', fun); },
            configurable: false,
            enumerable: false,
        });

        /** 
         * Event handler that is called after an element is added.  
         * 
         * @event BaseCollection#onAdded
         * @param {function}    p_callback
         * @param {any}         p_callback.p_elem Added elements
         * @param {number}      p_callback.p_idx Index of added element
         * @param {this}        p_callback.p_this Current collection objects
         */
        Object.defineProperty(this, 'onAdded', 
        {
            set: function(fun) { this.$event.on('added', fun); },
            configurable: false,
            enumerable: false,
        });

        /** 
         * Event handler called before removing an element.  
         * 
         * @event BaseCollection#onRemove
         * @param {function}    p_callback
         * @param {any}         p_callback.p_elem Elements to be removed
         * @param {number}      p_callback.p_idx Index of the element to be removed
         * @param {this}        p_callback.p_this Current collection objects
         */
        Object.defineProperty(this, 'onRemove', 
        {
            set: function(fun) { this.$event.on('remove', fun); },
            configurable: false,
            enumerable: false,
        });

        /** 
         * Event handler that is called after the element is removed.  
         * 
         * @event BaseCollection#onRemoved
         * @param {function}    p_callback
         * @param {any}         p_callback.p_elem Removed elements
         * @param {number}      p_callback.p_idx Index of removed element
         * @param {this}        p_callback.p_this Current collection objects
         */
        Object.defineProperty(this, 'onRemoved', 
        {
            set: function(fun) { this.$event.on('removed', fun); },
            configurable: false,
            enumerable: false,
        });

        /** 
        * Event handler called before deleting all elements.  
        * 
        * @event BaseCollection#onClear
        * @param {function}    p_callback
        * @param {this}        p_callback.p_this Current collection objects
        */
        Object.defineProperty(this, 'onClear', 
        {
            set: function(fun) { this.$event.on('clear', fun); },
            configurable: false,
            enumerable: false,
        });

        /** 
         * Event handler that is called after all elements are deleted.  
         * 
         * @event BaseCollection#onCleared
         * @param {function}    p_callback
         * @param {this}        p_callback.p_this Current collection objects
         */
        Object.defineProperty(this, 'onCleared', 
        {
            set: function(fun) { this.$event.on('cleared', fun); },
            configurable: false,
            enumerable: false,
        });

        /** 
         * Event handler called before the element changes.  
         * 
         * @event BaseCollection#onChanging 
         * @param {function}    p_callback
         * @param {number}      p_callback.p_nextValue New value to be changed
         * @param {any}         p_callback.prevValue Existing value
         * @param {any}         p_callback.index Index of the element to be changed
         * @param {this}        p_callback.p_this Current collection objects
         */
        Object.defineProperty(this, 'onChanging', 
        {
            set: function(fun) { this.$event.on('changing', fun); },
            configurable: false,
            enumerable: false,
        });

        /** 
         * Event handler that is called after an element changes.  
         * 
         * @event BaseCollection#onChanged 
         * @param {function}    p_callback
         * @param {any}         p_callback.p_nextValue New value changed
         * @param {any}         p_callback.p_prevValue Existing value
         * @param {number}      p_callback.p_index Index of changed element
         * @param {this}        p_callback.p_this Current collection objects
         */
        Object.defineProperty(this, 'onChanged', 
        {
            set: function(fun) { this.$event.on('changed', fun); },
            configurable: false,
            enumerable: false,
        });

        // object settging
        this._owner = p_owner || null;

        // 예약어 등록
        this.$KEYWORD = ['$event', '_owner', '$elements', '$descriptors', '_elemTypes', '_list', 'count', 'length', '$KEYWORD'];
        this.$KEYWORD = ['onAdd', 'onAdded', 'onRemove', 'onRemoved', 'onClear', 'onCleared', 'onChanging', 'onChanged'];
        this.$KEYWORD = ['_onAdd', '_onAdded', '_onRemove', '_onRemoved', '_onClear', '_onCleared', '_onChanging', '_onChanged'];
        this.$KEYWORD = ['_getPropDescriptor', 'getObject', 'setObject', '_guid', '_type'];
        this.$KEYWORD = ['_remove', 'remove', 'removeAt', 'contains', 'indexOf', 'add', 'clear'];

        Util.implements(BaseCollection, this);          // strip:
    }
    Util.inherits(BaseCollection, _super);
    
    BaseCollection._UNION = [ICollection, IList];
    BaseCollection._NS = 'Collection';
    BaseCollection._PARAMS = ['_owner'];
    BaseCollection._KIND = 'abstract';
    
    /**
     * Internal method that runs before adding an element.  
     * 
     * @param {any} p_elem .Elements to be added
     * @param {number} p_idx Where the element will be added
     * @listens BaseCollection#onAdd
     */
    BaseCollection.prototype._onAdd = function(p_elem, p_idx) {
        return this.$event.emit('add', p_elem, p_idx, this); 
    };
    Object.defineProperty(BaseCollection.prototype, '_onAdd', {
        enumerable: false
    });

    /**
     * Internal method that runs after an element is added.  
     * @param {any} p_elem Added elements
     * @param {number} p_idx Location where the element was added
     * @listens BaseCollection#onAdded
     */
    BaseCollection.prototype._onAdded = function(p_elem, p_idx) {
        return this.$event.emit('added', p_elem, p_idx, this); 
    };
    Object.defineProperty(BaseCollection.prototype, '_onAdded', {
        enumerable: false
    });

    /**
     * Internal method that runs before removing an element.  
     * 
     * @param {any} p_elem Elements to be removed
     * @param {number} p_idx Where the element will be removed
     * @listens BaseCollection#onRemove
     */
    BaseCollection.prototype._onRemove = function(p_elem, p_idx) {
        return this.$event.emit('remove', p_elem, p_idx, this);
    };
    Object.defineProperty(BaseCollection.prototype, '_onRemove', {
        enumerable: false
    });

    /**
     * Internal method that runs after the element is removed.  
     * 
     * @param {any} p_elem Removed elements
     * @param {number} p_idx Where the element was removed
     * @listens BaseCollection#onRemoved
     */
    BaseCollection.prototype._onRemoved = function(p_elem, p_idx) {
        return this.$event.emit('removed', p_elem, p_idx, this);
    };
    Object.defineProperty(BaseCollection.prototype, '_onRemoved', {
        enumerable: false
    });

    /** 
     * Internal method that runs before deleting all elements.
     * 
     * @listens BaseCollection#onClear
     */
    BaseCollection.prototype._onClear = function() {
        return this.$event.emit('clear', this); 
    };
    Object.defineProperty(BaseCollection.prototype, '_onClear', {
        enumerable: false
    });

    /** 
     * Internal method that runs after all elements are deleted.  
     * 
     * @listens BaseCollection#onCleared
     */
    BaseCollection.prototype._onCleared = function() {
        return this.$event.emit('cleared', this); 
    };
    Object.defineProperty(BaseCollection.prototype, '_onCleared', {
        enumerable: false
    });

    /** 
     * Internal method that runs before the element changes.
     * 
     * @param {any} p_nVal New value to be changed
     * @param {any} p_oVal Existing value
     * @param {number} p_idx Location of the element to be changed
     * @listens BaseCollection#onChanging
     */
    BaseCollection.prototype._onChanging = function(p_nVal, p_oVal, p_idx) {
        return this.$event.emit('changing', p_nVal, p_oVal, p_idx, this);
    };
    Object.defineProperty(BaseCollection.prototype, '_onChanging', {
        enumerable: false
    });

    /** 
     * Internal method that runs after the element changes.  
     * 
     * @param {any} p_nVal New value changed
     * @param {any} p_oVal Existing value
     * @param {number} p_idx Location of changed element
     * @listens BaseCollection#onChanged
     */        
    BaseCollection.prototype._onChanged = function(p_nVal, p_oVal, p_idx) {
        return this.$event.emit('changed', p_nVal, p_oVal, p_idx, this);
    };
    Object.defineProperty(BaseCollection.prototype, '_onChanged', {
        enumerable: false
    });

    /**
     * Internal method to set the attribute descriptor for a particular index.  
     * 
     * @protected
     * @param {number} p_idx Where to specify properties
     * @param {boolean} p_enum whether the property is enumerable
     */
    BaseCollection.prototype._getPropDescriptor = function(p_idx, p_enum) {
        if (typeof p_enum !== 'boolean') p_enum = true;
        return {
            get: function() { return this.$elements[p_idx]; },
            set: function(nVal) {
                var oVal = this.$elements[p_idx];
                if (this._elemTypes.length > 0) Type.matchType([this._elemTypes], nVal);
                this._onChanging(nVal, oVal, p_idx);  // before event
                this.$elements[p_idx] = nVal;
                this._onChanged(nVal, oVal, p_idx);   // after event
            },
            configurable: true,
            enumerable: p_enum,
        };
    };
    Object.defineProperty(BaseCollection.prototype, '_getPropDescriptor', {
        enumerable: false
    });

    /** 
     * Internal method to remove elements from the collection.  
     * 
     * @abstract 
     */
    BaseCollection.prototype._remove  = function() {
        throw new ExtendError(/EL04111/, null, []);
    };
    Object.defineProperty(BaseCollection.prototype, '_remove', {
        enumerable: false
    });

    /**
     * Returns the object as an object literal of type GUID.  
     * 
     * @param {number} [p_vOpt=0] Import mode  
     * mode=0 : reference structure(_guid:Yes, $ref:Yes)  
     * mode=1 : Redundant structure(_guid:Yes, $ref:Yes)  
     * mode=2 : non-coordinated structure(_guid:No,  $ref:No)   
     * @param {object | array<object>} [p_owned={}] Parent object that contains (owns) the current object
     * @returns {object}  Guid type object literal
     * @example
     * a.getObject(2) == b.getObject(2)   
     */
    BaseCollection.prototype.getObject = function(p_vOpt, p_owned) {
        var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
        var vOpt = p_vOpt || 0;
        // var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);
        var _elems = [];
        
        if (!Type.deepEqual(this.$event['$storage'], {})) {
            obj['$storage'] = this.$event.$storage;
        }
        if (vOpt < 2 && vOpt > -1 && this._owner) {
            obj['_owner'] = MetaRegistry.createReferObject(this._owner);
        }
        for (var i = 0; i < this._elemTypes.length; i++) {
            var elem = this._elemTypes[i];
            if (typeof elem === 'function') _elems.push(MetaRegistry.createNsReferObject(elem));
            else _elems.push(elem);
        }
        obj['_elemTypes'] = _elems;
        return obj;                        
    };
    Object.defineProperty(BaseCollection.prototype, 'getObject', {
        enumerable: false
    });

    /**
     * Set up a GUID type object literal by converting it to an instance object.
     * 
     * @param {object} p_oGuid Object literal of type of GUID to set
     * @param {object} [p_origin=p_oGuid] Initial GUID literal object referenced during conversion
     */
    BaseCollection.prototype.setObject = function(p_oGuid, p_origin) {
        _super.prototype.setObject.call(this, p_oGuid, p_origin);
        
        var owner;
        var origin = p_origin ? p_origin : p_oGuid;
        
        this.clear();
        if (p_oGuid['$storage']) {
            this.$event.$storage = p_oGuid['$storage'];
        }
        if (p_oGuid['_owner']) {
            owner = MetaRegistry.findSetObject(p_oGuid['_owner']['$ref'], origin);
            if (!owner) throw new ExtendError(/EL04112/, null, [p_oGuid['_owner']['$ref']]);    // Branch:
            this._owner = owner;            
        }
        if (Array.isArray(p_oGuid['_elemTypes']) && p_oGuid['_elemTypes'].length > 0){
            this._elemTypes = p_oGuid['_elemTypes'];
        }
    };
    Object.defineProperty(BaseCollection.prototype, 'setObject', {
        enumerable: false
    });

    /**
     * Remove the element from the collection.  
     * 
     * @param {any} p_elem Elements to be removed
     * @returns {number} Index of removed element. If element does not exist, return -1
     */
    BaseCollection.prototype.remove = function(p_elem) {
        var idx = this.$elements.indexOf(p_elem);

        if (idx >= 0 && this.removeAt(idx)) return idx;
        return -1;
    };
    Object.defineProperty(BaseCollection.prototype, 'remove', {
        enumerable: false
    });
    
    /**
     * Remove the element in the specified location.
     * 
     * @param {number} p_pos Where to remove
     * @returns {boolean} Element Removal Successful
     */
    BaseCollection.prototype.removeAt = function(p_pos) {
        var elem;
        
        if (typeof p_pos !== 'number') throw new ExtendError(/EL04113/, null, [typeof p_pos]);
        if (p_pos < 0 ) return false;
        
        elem = this.$elements[p_pos];
        if (this.$elements.length > p_pos) {
            // this._onRemove(p_pos, elem);
            if (this._onRemove(elem, p_pos) === false) return false;

            if (!this._remove(p_pos)) return false;
            this._onRemoved(elem, p_pos);
            return true;
        }
        return false;
    };
    Object.defineProperty(BaseCollection.prototype, 'removeAt', {
        enumerable: false
    });

    /**
     * Verify that a particular element exists in the collection.  
     * 
     * @param {any} p_elem Factors to check
     * @returns {boolean} Element Existence
     */
    BaseCollection.prototype.contains = function(p_elem) {
        return this.$elements.indexOf(p_elem) > -1;
    };
    Object.defineProperty(BaseCollection.prototype, 'contains', {
        enumerable: false
    });

    /**
     * Returns the index of an element.  
     * 
     * @param {any} p_elem Elements to search for
     * @returns {number} Index of element, return -1 if element is missing
     */
    BaseCollection.prototype.indexOf = function(p_elem) {
        return this.$elements.indexOf(p_elem);
    };
    Object.defineProperty(BaseCollection.prototype, 'indexOf', {
        enumerable: false
    });

    /** 
     * Adds an element to the collection.
     * 
     * @abstract 
     */
    BaseCollection.prototype.add  = function() {
        throw new ExtendError(/EL04114/, null, []);
    };
    Object.defineProperty(BaseCollection.prototype, 'add', {
        enumerable: false
    });
    
    /**
     * Initialize the collection.  
     * 
     * @abstract 
     */
    BaseCollection.prototype.clear  = function() {
        throw new ExtendError(/EL04115/, null, []);
    };
    Object.defineProperty(BaseCollection.prototype, 'clear', {
        enumerable: false
    });

    return BaseCollection;
    
}(MetaObject));

/**** collection-array.js | ArrayCollection ****/
//==============================================================
// 1. import module

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
if (!Type) throw new Error(Message.get('ES011', ['Type', 'type']));
if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
if (!IArrayCollection) throw new Error(Message.get('ES011', ['IArrayCollection', 'i-collection-array']));
if (!MetaRegistry) throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));
if (!MetaObject) throw new Error(Message.get('ES011', ['MetaObject', 'meta-object']));
if (!BaseCollection) throw new Error(Message.get('ES011', ['BaseCollection', 'base-collection']));

//==============================================================
// 3. module implementation
var ArrayCollection  = (function (_super) {
    /**
     * Creates an instance of an ArrayCollection class.  
     * 
     * @constructs ArrayCollection
     * @implements {IArrayCollection}
     * @extends BaseCollection
     * @param {object} [p_owner] Objects that own this collection
     */
    function ArrayCollection(p_owner) {
        _super.call(this, p_owner);

        this.$KEYWORD = ['insertAt'];

        Util.implements(ArrayCollection, this);     // strip:
    }
    Util.inherits(ArrayCollection, _super);
    
    ArrayCollection._UNION = [IArrayCollection];
    ArrayCollection._NS = 'Collection';     // namespace
    ArrayCollection._PARAMS = ['_owner'];   // creator parameter

    // local function
    function _isObject(obj) {    // 객체 여부
        if (typeof obj === 'object' && obj !== null) return true;
        return false;
    }
    
    /**
     * Internal method to remove the specified element from the collection.  
     * 
     * @protected
     * @param {number} p_pos Index of the element to be removed
     * @returns {boolean} Success or failure
     */
    ArrayCollection.prototype._remove = function(p_pos) {
        var count = this.count - 1;   // [idx] 포인트 이동
        
        this.$elements.splice(p_pos, 1);
        this.$descriptors.splice(p_pos, 1);
        
        if (p_pos < count) {
            for (var i = p_pos; i < count; i++) {   // 참조 변경(이동)
                var desc = this.$descriptors[i] ? this.$descriptors[i] : this._getPropDescriptor(i);
                Object.defineProperty(this, [i], desc);
            }
            delete this[count];     // 마지막 idx 삭제
        } else {
            delete this[p_pos];     // idx 삭제 (끝일 경우)
        }
        return true;
    };
    Object.defineProperty(ArrayCollection.prototype, '_remove', {
        enumerable: false
    });

    /**
     * Returns the object as an object literal of type GUID.  
     * 
     * @param {number} [p_vOpt=0] Import mode  
     * mode=0 : reference structure (_guid:Yes, $ref:Yes)  
     * mode=1: Redundant structure (_guid:Yes, $ref:Yes)  
     * mode=2 : non-coordinated structure (_guid: No, $ref: No)  
     * @param {object | array<object>} [p_owned={}] Parent object that contains (owns) the current object
     * @returns {object}  Guid type object literal 
     * @example
     * a.getObject(2) == b.getObject(2)   
     */
    ArrayCollection.prototype.getObject = function(p_vOpt, p_owned) {
        var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
        var vOpt = p_vOpt || 0;
        var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

        if (this.$descriptors.length > 0) {
            obj['_desc'] = [];
            for (var i = 0; i < this.$descriptors.length; i++) {
                obj['_desc'].push(this.$descriptors[i]);
            }
        }
        obj['_elem'] = [];
        for (var j = 0; j < this.$elements.length; j++) {
            var elem = this.$elements[j];
            if (elem instanceof MetaObject) {
                if (MetaRegistry.hasGuidObject(elem, owned)) {
                    obj['_elem'].push(MetaRegistry.createReferObject(elem));
                } else obj['_elem'].push(elem.getObject(vOpt, owned));
            } else obj['_elem'].push(elem);
        }
        return obj;                        
    };
    Object.defineProperty(ArrayCollection.prototype, 'getObject', {
        enumerable: false
    });

    /**
     * Set up a GUID type object literal by converting it to an instance object.   
     * 
     * @param {object} p_oGuid object literal of the type of GUID to be set
     * @param {object} [p_origin=p_oGuid] Initial GUID literal object referenced during conversion
     */
    ArrayCollection.prototype.setObject  = function(p_oGuid, p_origin) {
        _super.prototype.setObject.call(this, p_oGuid, p_origin);
        var origin = p_origin ? p_origin : p_oGuid;

        if (Array.isArray(p_oGuid['_desc']) && p_oGuid['_desc'].length > 0) {
            for (var i = 0; i < p_oGuid['_desc'].length; i++) {
                this.$descriptors.push(p_oGuid['_desc'][i]);
            }
        }
        for(var j = 0; j < p_oGuid['_elem'].length; j++) {
            Object.defineProperty(this, [j], this._getPropDescriptor(j));
        }

        for(var k = 0; k < p_oGuid['_elem'].length; k++) {
            var elem = p_oGuid['_elem'][k];
            if (MetaRegistry.isGuidObject(elem)) {
                var obj = MetaRegistry.createMetaObject(elem, origin);
                obj.setObject(elem, origin);
                this.$elements.push(obj);
                
            } else if (elem['$ref']) {
                var meta = MetaRegistry.findSetObject(elem['$ref'], origin);
                if (!meta) throw new ExtendError(/EL04211/, null, [k, elem['$ref']]);
                this.$elements.push(meta);  
            
            } else this.$elements.push(elem);
        }
    };        
    Object.defineProperty(ArrayCollection.prototype, 'setObject', {
        enumerable: false
    });

    /**
     * Adds an element to the collection.  
     * 
     * @param {any} p_elem Elements to add
     * @param {object} [p_desc] Property descriptor object for element
     * @returns {number} Location of the added element
     */
    ArrayCollection.prototype.add = function(p_elem, p_desc) {
        var pos = this.count;
        this.insertAt(pos, p_elem, p_desc);
        return pos;
    };
    Object.defineProperty(ArrayCollection.prototype, 'add', {
        enumerable: false
    });

    /**
     * Initialize the collection.  
     * Empty the $elements and $descriptors arrays upon initialization.  
     */
    ArrayCollection.prototype.clear = function() {
        // this._onClear();    // event
        if (this._onClear() === false) return -1;

        for (var i = 0; i < this.count; i++) delete this[i];
        this.$elements = [];
        this.$descriptors = [];
        
        this._onCleared();    // event
    };
    Object.defineProperty(ArrayCollection.prototype, 'clear', {
        enumerable: false
    });

    /**
     * Adds an element to the specified location.  
     * 
     * @param {number} p_pos Where to add
     * @param {any} p_elem Elements to add
     * @param {object} [p_desc] Property descriptor object for element
     * @returns {boolean} Additional success
     */
    ArrayCollection.prototype.insertAt = function(p_pos, p_elem, p_desc) {
        try {
            var index   = this.count;

            if (typeof p_pos !== 'number') throw new ExtendError(/EL04212/, null, [typeof p_pos]);
            if (index < p_pos) throw new ExtendError(/EL04213/, null, [p_pos, index]);
            if (p_pos < 0) throw new ExtendError(/EL04214/, null, [p_pos]);
            if (this._elemTypes.length > 0) Type.matchType([this._elemTypes], p_elem);
            if (_isObject(p_desc) && p_desc.configurable === false) {
                console.warn(Message.get('WS011', ['configurable = false', 'element']));
                // Message.warn('WS011', ['configurable = false', 'element']); 
            }
            if (_isObject(p_desc) && p_desc.writable === false ) {
                console.warn(Message.get('WS011', ['writable = false', 'element']));
                // Message.warn('WS011', ['writable = false', 'element']);
            }

            if (this._onAdd(p_elem, p_pos) === false) return false;

            // data process
            this.$elements.splice(p_pos, 0, p_elem);            
            this.$descriptors.splice(p_pos, 0, p_desc);
            // property define
            if (_isObject(p_desc)) {
                Object.defineProperty(this, [p_pos], p_desc);
            } else {
                Object.defineProperty(this, [p_pos], this._getPropDescriptor(p_pos));
            }
            // reindexing
            for (var i = p_pos + 1; i < this.count; i++) {
                var desc = this.$descriptors[i] ? this.$descriptors[i] : this._getPropDescriptor(i);
                Object.defineProperty(this, [i], desc);
            }
            this._onAdded(p_elem, p_pos);
            
            return true;

        } catch (error) {
            throw new ExtendError(/EL04215/, error, [p_pos, p_elem]);
        }
    };
    Object.defineProperty(ArrayCollection.prototype, 'insertAt', {
        enumerable: false
    });

    /**
     * Returns the result of executing the function provided to all elements to the new array.  
     * 
     * @param {Function} callback callback function to convert, (elem: T, index: number, list: T[]) => U
     * @param {any} thisArg Object to use as this inside the callback function
     * @returns  {Array} Array of converted elements
     */
    ArrayCollection.prototype.map  = function(callback, thisArg) {
        var newArr = [];

        if (typeof callback != 'function') throw new ExtendError(/EL04116/, null, [typeof callback]);
    
        for (var i = 0; i < this.length; i++) {
            newArr[i] = callback.call(thisArg || this, this[i], i, this._list);
        }
        return newArr;
    };
    Object.defineProperty(ArrayCollection.prototype, 'map', {
        enumerable: false
    });

    /**
     * Returns a new array containing only elements that satisfy the conditions of the provided function.  
     * 
     * @param {Function} callback callback function to filter, (elem: T, index: number, list: T[]) => boolean
     * @param {any} thisArg Object to use as this inside the callback function
     * @returns  {Array} Array of filtered elements
     */
    ArrayCollection.prototype.filter = function (callback, thisArg) {
        let newArr = [];

        if (typeof callback != 'function') throw new ExtendError(/EL04117/, null, [typeof callback]);

        for (let i = 0; i < this.length; i++) {
            if (callback.call(thisArg || this, this[i], i, this._list)) {
                newArr.push(this[i]);
            }
        }
        return newArr;
    };
    Object.defineProperty(ArrayCollection.prototype, 'filter', {
        enumerable: false
    });

    /**
     * Returns the accumulated results by executing the reducer function provided to all elements.  
     * 
     * @param {Function} callback callback function to be reduced, (acc: U, element: T, index: number, list: T[]) => U
     * @param {any} initialValue Initial value
     * @returns  {any} Accumulated final result value
     */
    ArrayCollection.prototype.reduce = function(callback, initialValue) {
        var acc = initialValue;

        if (typeof callback != 'function') throw new ExtendError(/EL04118/, null, [typeof callback]);

        for(let i=0; i < this.length; i++) {
            acc = acc ? callback(acc, this[i], i, this._list) : this[i];
        }
        return acc;
    };
    Object.defineProperty(ArrayCollection.prototype, 'reduce', {
        enumerable: false
    });

    /**
     * Returns the first element that matches the conditions of the provided function.  
     * 
     * @param {Function} callback Callback function to be searched, (elem: T, index: number, list: T[]) => boolean
     * @param {any} thisArg Object to use as this inside the callback function
     * @returns  {any} The first element that satisfies the condition, 'undefined' if not found
     */
    ArrayCollection.prototype.find = function(callback, thisArg) {
        if (typeof callback != 'function') throw new ExtendError(/EL04119/, null, [typeof callback]);
        
        for (var i = 0; i < this.length; i++) {
            if ( callback.call(thisArg || this, this[i], i, this._list) ) {
            return this[i];
            }
        }
    };
    Object.defineProperty(ArrayCollection.prototype, 'find', {
        enumerable: false
    });

    /**
     * Run the function provided for all elements.  
     * 
     * @param {Function} callback Callback function to run, (elem: T, index: number, list: T[]) => void
     * @param {any} thisArg Object to use as this inside the callback function
     */
    ArrayCollection.prototype.forEach = function(callback, thisArg) {
        if (typeof callback != 'function') throw new ExtendError(/EL041110/, null, [typeof callback]);
        
        for (var i = 0; i <this.length; i++) {
            callback.call(thisArg || this, this[i], i, this._list);
        }
    };
    Object.defineProperty(ArrayCollection.prototype, 'forEach', {
        enumerable: false
    });

    /**
     * Verify that at least one element matches the conditions of the provided function.  
     * 
     * @param {Function} callback Callback function to be examined, (elem: T, index: number, list: T[]) => boolean
     * @param {any} thisArg Object to use as this inside the callback function
     * @returns  {boolean} 'true' if more than one element satisfies the condition, or 'false' if not
     */
    ArrayCollection.prototype.some = function(callback, thisArg) {
        if (typeof callback != 'function') throw new ExtendError(/EL041111/, null, [typeof callback]);
        
        for(var i=0; i < this.length; i++){
            if (callback.call(thisArg || this, this[i], i, this._list)) return true;
        }
        return false;
    };
    Object.defineProperty(ArrayCollection.prototype, 'some', {
        enumerable: false
    });

    /**
     * Verify that all elements satisfy the conditions of the provided function.  
     * 
     * @param {Function} callback Callback function to be examined, (elem: T, index: number, list: T[]) => boolean
     * @param {any} thisArg Object to use as this inside the callback function
     * @returns  {boolean}  'true' if all elements meet the conditions, 'false' otherwise
     */
    ArrayCollection.prototype.every = function(callback, thisArg) {
        if (typeof callback != 'function') throw new ExtendError(/EL041112/, null, [typeof callback]);
        
        for(var i=0; i < this.length; i++){
            if (!callback.call(thisArg || this, this[i], i, this._list)) return false;
            }
            return true;
    };
    Object.defineProperty(ArrayCollection.prototype, 'every', {
        enumerable: false
    });

    /**
     * Returns the index of the first element that matches the conditions of the provided function.  
     * 
     * @param {Function} callback Callback function to be examined, (elem: T, index: number, list: T[]) => boolean
     * @param {any} thisArg Object to use as this inside the callback function
     * @returns  {any} Index of the first element that satisfies the condition, if not found '-1'
     */
    ArrayCollection.prototype.findIndex = function(callback, thisArg) {
        if (typeof callback != 'function') throw new ExtendError(/EL041113/, null, [typeof callback]);
        
        for (var i = 0; i < this.length; i++) {
            if ( callback.call(thisArg || this, this[i], i, this._list) ) {
            return i;
            }
        }
        return -1;
    };
    Object.defineProperty(ArrayCollection.prototype, 'findIndex', {
        enumerable: false
    });


    return ArrayCollection;

}(BaseCollection));

/**** collection-property.js | PropertyCollection ****/
//==============================================================
// 1. import module

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
if (!Type) throw new Error(Message.get('ES011', ['Type', 'type']));
if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
if (!IPropertyCollection) throw new Error(Message.get('ES011', ['IPropertyCollection', 'i-collection-property']));
if (!MetaRegistry) throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));
if (!MetaObject) throw new Error(Message.get('ES011', ['MetaObject', 'meta-object']));
if (!BaseCollection) throw new Error(Message.get('ES011', ['BaseCollection', 'base-collection']));

//==============================================================
// 3. module implementation   
var PropertyCollection  = (function (_super) {
    /**
     * Creates an instance of the class 'PropertyCollection'.  
     * 
     * @constructs PropertyCollection
     * @implements {IPropertyCollection}
     * @extends BaseCollection
     * @param {object} p_owner Objects that own this collection
     */
    function PropertyCollection(p_owner) {
        _super.call(this, p_owner); 

        var $keys = [];

        /**
         * Returns all key values in the collection to an array.
         * 
         * @member {string} PropertyCollection#$keys
         * @readonly
         * @private
         */
        Object.defineProperty(this, '$keys',
        {
            get: function() { return $keys; },
            set: function(nVal) { $keys = nVal; },
            configurable: false,
            enumerable: false,
        });

        // /** 
        //  * 컬렉션 요소의 키값들
        //  * @readonly
        //  * @member {array<string>} PropertyCollection#_keys 
        //  */
        // Object.defineProperty(this, '_keys',
        // {
        //     get: function() {
        //         var arr = [];
        //         for (var i = 0; i < _keys.length; i++) arr.push(_keys[i]);
        //         return arr;
        //     },
        //     configurable: false,
        //     enumerable: false
        // });

        // 예약어 등록 
        this.$KEYWORD = ['$keys', 'indexOf', 'exists', 'indexToKey'];

        Util.implements(PropertyCollection, this);      // strip:
    }
    Util.inherits(PropertyCollection, _super);
    
    PropertyCollection._UNION = [IPropertyCollection];
    PropertyCollection._NS = 'Collection';      // namespace
    PropertyCollection._PARAMS = ['_owner'];    // creator parameter

    // local function
    function _isObject(obj) {    // 객체 여부
        if (typeof obj === 'object' && obj !== null) return true;
        return false;
    }

    function _isString(obj) {    // 공백아닌 문자 여부
        if (typeof obj === 'string' && obj.length > 0) return true;
        return false;
    }

    /**
     * Internal method to remove the specified element from the collection.  
     * 
     * @protected
     * @param {number} p_pos Location of the element to be removed
     * @returns {boolean} Removal successful
     */
    PropertyCollection.prototype._remove = function(p_pos) {
        var count = this.count - 1;
        var propName = this.indexToKey(p_pos);   // number 검사함
        
        delete this[propName];      // 프로퍼티 삭제

        this.$elements.splice(p_pos, 1);
        this.$keys.splice(p_pos, 1);
        this.$descriptors.splice(p_pos, 1);
        
        if (p_pos < count) {        // 참조 자료 변경
            for (var i = p_pos; i < count; i++) {
                // var desc = this.$descriptors[i] ? this.$descriptors[i] : this._getPropDescriptor(i);
                propName = this.indexToKey(i);
                Object.defineProperty(this, [i], this.$descriptors[i] ? this.$descriptors[i] : this._getPropDescriptor(i, false));
                Object.defineProperty(this, propName, this.$descriptors[i] ? this.$descriptors[i] : this._getPropDescriptor(i));
            }
            delete this[count];     // 마지막 idx 삭제
        } else {
            delete this[p_pos];     // idx 삭제 (끝일 경우)
        }
        return true;
    };
    Object.defineProperty(PropertyCollection.prototype, '_remove', {
        enumerable: false
    });

    /**
     * Returns the object as an object literal of type GUID.  
     * 
     * @param {number} [p_vOpt=0] Import mode
     * mode=0 : reference structure (_guid:Yes, $ref:Yes)  
     * mode=1: Redundant structure (_guid:Yes, $ref:Yes)  
     * mode=2 : non-coordinated structure (_guid: No, $ref: No)  
     * @param {object | array<object>} [p_owned={}] Parent object that contains (owns) the current object
     * @returns {object}  Guid type object literal
     * @example
     * a.getObject(2) == b.getObject(2)   
     */
    PropertyCollection.prototype.getObject = function(p_vOpt, p_owned) {
        var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
        var vOpt = p_vOpt || 0;
        var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

        if (this.$descriptors.length > 0) {
            obj['_desc'] = [];
            for (var i = 0; i < this.$descriptors.length; i++) {
                obj['_desc'].push(this.$descriptors[i]);
            }
        }
        obj['_elem'] = [];
        for (var j = 0; j < this.count; j++) {
            var elem = this.$elements[j];
            if (elem instanceof MetaObject) {
                if (MetaRegistry.hasGuidObject(elem, owned)) {
                    obj['_elem'].push(MetaRegistry.createReferObject(elem));
                } else obj['_elem'].push(elem.getObject(vOpt, owned));
            } else obj['_elem'].push(elem);
        }
        obj['_key'] = [];
        for (var k = 0; k < this.$keys.length; k++) {
            var key = this.$keys[k];
            obj['_key'].push(key);
        }
        return obj;                        
    };
    Object.defineProperty(PropertyCollection.prototype, 'getObject', {
        enumerable: false
    });

    /**
     * Set up a GUID type object literal by converting it to an instance object.  
     * 
     * @param {object} p_oGuid Object literal of the type of GUID to be set
     * @param {object} [p_origin=p_oGuid] Initial GUID literal object referenced during conversion
     */
    PropertyCollection.prototype.setObject  = function(p_oGuid, p_origin) {
        _super.prototype.setObject.call(this, p_oGuid, p_origin);
        var origin = p_origin ? p_origin : p_oGuid;

        if (p_oGuid['_elem'].length !== p_oGuid['_key'].length) throw new ExtendError(/EL04221/, null, [p_oGuid['_elem'].length, p_oGuid['_key'].length]);
        
        if (Array.isArray(p_oGuid['_desc']) && p_oGuid['_desc'].length > 0) {
            if (p_oGuid['_elem'].length !== p_oGuid['_desc'].length) throw new ExtendError(/EL04222/, null, [p_oGuid['_elem'].length, p_oGuid['_desc'].length]);
            for (var i = 0; i < p_oGuid['_desc'].length; i++) {
                this.$descriptors.push(p_oGuid['_desc'][i]);
            }
        }

        this.$keys = [];
        for(var j = 0; j < p_oGuid['_key'].length; j++) {
            var key = p_oGuid['_key'][j];
            this.$keys.push(key);
            Object.defineProperty(this, [j], this._getPropDescriptor(j, false));
            Object.defineProperty(this, key, this._getPropDescriptor(j));
        }

        for(var k = 0; k < p_oGuid['_elem'].length; k++) {
            var elem = p_oGuid['_elem'][k];
            if (MetaRegistry.isGuidObject(elem)) {
                var obj = MetaRegistry.createMetaObject(elem, origin);
                obj.setObject(elem, origin);
                this.$elements.push(obj);
            
            } else if (elem['$ref']) {
                var meta = MetaRegistry.findSetObject(elem['$ref'], origin);
                if (!meta) throw new ExtendError(/EL04223/, null, [k, elem['$ref']]);
                this.$elements.push(meta);
                
            } else this.$elements.push(elem);
        }
    };
    Object.defineProperty(PropertyCollection.prototype, 'setObject', {
        enumerable: false
    });

    // /**
    //  * 프로퍼티 컬렉션의 인덱스 값을 조회합니다.
    //  * @param {string | any} p_target 키 또는 요소
    //  * @param {boolean} [p_isKey=false] 키로 조회 여부
    //  * @returns {number} 없을시 -1
    //  */
    // PropertyCollection.prototype.indexOf = function(p_target, p_isKey) {
    //     var isKey = p_isKey || false;
        
    //     if (!isKey) return this.$elements.indexOf(p_target);
    //     else {
    //         if (!_isString(p_target))  throw new ExtendError(/EL04224/, null, [typeof p_target]);
    //         return this.$keys.indexOf(p_target);
    //     }
    // };
    
    /**
     * Adds an element to the collection.  
     * 
     * @param {string} p_key Key of the element
     * @param {any} [p_elem] Elements to add
     * @param {object} [p_desc] Property descriptor object for element
     * @returns {number} Location of the added element
     */
    PropertyCollection.prototype.add = function(p_key, p_elem, p_desc) {
        try {
            var index   = this.count;
            var regex = /^[a-zA-Z_][a-zA-Z0-9_]*/;
            // var types = ['_req_'];

            // types = [types.concat(this._elemTypes)];
            
            if (!_isString(p_key)) throw new ExtendError(/EL04225/, null, [p_key]);
            if(!regex.test(p_key)) throw new ExtendError(/EL04226/, null, [p_key, regex.source]);
            if (this.$KEYWORD.indexOf(p_key) > -1) throw new ExtendError(/EL04227/, null, [p_key]);
            if (this.exists(p_key)) throw new ExtendError(/EL04228/, null, [p_key]);
            if (this._elemTypes.length > 0) Type.matchType([this._elemTypes], p_elem);
            // if (this._elemTypes.length > 0) Util.matchType(types, p_elem);
            if (_isObject(p_desc) && p_desc.configurable === false) {
                console.warn(Message.get('WS011', ['configurable = true', 'element']));
                // Message.warn('WS011', ['configurable = true', 'element']);
            }
            if (_isObject(p_desc) && p_desc.writable === false ) {
                console.warn(Message.get('WS011', ['writable = true', 'element']));
                // Message.warn('WS011', ['writable = true', 'element']);
            }

            // this._onAdd(index, p_elem);
            if (this._onAdd(p_elem, index) === false) return -1;

            // data process
            this.$elements.push(p_elem);
            this.$keys.push(p_key);
            this.$descriptors.push(p_desc);
            // property define
            if (_isObject(p_desc)) {
                Object.defineProperty(this, [index], p_desc);
                Object.defineProperty(this, p_key, p_desc);
            } else {
                Object.defineProperty(this, [index], this._getPropDescriptor(index, false));
                Object.defineProperty(this, p_key, this._getPropDescriptor(index));
            }
            this._onAdded(p_elem, index);

            return index;

        } catch (error) {
            throw new ExtendError(/EL04229/, error, [p_key, p_elem]);
        }
    };
    Object.defineProperty(PropertyCollection.prototype, 'add', {
        enumerable: false
    });

    /**
     * Initialize the collection.  
     * Empty $elements, $descripts, and $keys at initialization.  
     */
    PropertyCollection.prototype.clear = function() {
        // this._onClear();
        if (this._onClear() === false) return -1;
        
        for (var i = 0; i < this.count; i++) {
            var propName = this.indexToKey(i);
            delete this[i];
            delete this[propName];
        }
        this.$elements = [];
        this.$descriptors = [];
        this.$keys = [];
        
        this._onCleared();
    };
    Object.defineProperty(PropertyCollection.prototype, 'clear', {
        enumerable: false
    });

    /**
     * Query the index based on the key.  
     * 
     * @param {string} p_key Key to view
     * @returns {number} Index corresponding to key, return '-1' if not present
     */
    PropertyCollection.prototype.keyToIndex = function(p_key) {
        if (!_isString(p_key))  throw new ExtendError(/EL04224/, null, [typeof p_key]);
        return this.$keys.indexOf(p_key);
    };
    Object.defineProperty(PropertyCollection.prototype, 'keyToIndex', {
        enumerable: false
    });

    /**
     * Query the key based on the index value.  
     * 
     * @param {number} p_idx Index to view
     * @returns {string} Key values for that index
     */
    PropertyCollection.prototype.indexToKey = function(p_idx) {
        if (typeof p_idx !== 'number') throw new ExtendError(/EL0422A/, null, [typeof p_idx]);
        return this.$keys[p_idx];
    };
    Object.defineProperty(PropertyCollection.prototype, 'indexToKey', {
        enumerable: false
    });

    /**
     * Verify that the specified key exists in the collection.  
     * 
     * @param {string} p_key Key value to check
     * @returns {boolean} If the key exists, it is 'true', otherwise it is 'false'
     */
    PropertyCollection.prototype.exists = function(p_key) {
        if (!_isString(p_key)) throw new ExtendError(/EL0422B/, null, [typeof p_key]);
        return Object.prototype.hasOwnProperty.call(this, p_key);
    };
    Object.defineProperty(PropertyCollection.prototype, 'exists', {
        enumerable: false
    });


    /**
     * Returns the result of executing the function provided to all elements to the new array.  
     * 
     * @param {Function} callback Callback function to convert, (elem: T, index: number, key: string, list: T[]) => U
     * @param {any} thisArg Objects to use as this inside the callback function
     * @returns  {Array} New arrangement of transformed elements
     */
    PropertyCollection.prototype.map  = function(callback, thisArg) {
        var newArr = [];

        if (typeof callback != 'function') throw new ExtendError(/EL04116/, null, [typeof callback]);
    
        for (var i = 0; i < this.length; i++) {
            var key = this.indexToKey(i);
            newArr[i] = callback.call(thisArg || this, this[i], i, key, this._list);
        }
        return newArr;
    };
    Object.defineProperty(PropertyCollection.prototype, 'map', {
        enumerable: false
    });

    /**
     * Returns a new array containing only elements that satisfy the conditions of the provided function.  
     * 
     * @param {Function} callback Callback function to filter, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param {any} thisArg Objects to use as this inside the callback function
     * @returns  {Array} Array of filtered elements
     */
    PropertyCollection.prototype.filter = function (callback, thisArg) {
        let newArr = [];

        if (typeof callback != 'function') throw new ExtendError(/EL04117/, null, [typeof callback]);

        for (let i = 0; i < this.length; i++) {
            var key = this.indexToKey(i);
            if (callback.call(thisArg || this, this[i], i, key, this._list)) {
                newArr.push(this[i]);
            }
        }
        return newArr;
    };
    Object.defineProperty(PropertyCollection.prototype, 'filter', {
        enumerable: false
    });

    /**
     * Returns the accumulated results by executing the reducer function provided to all elements.  
     * 
     * @param {Function} callback callback function to be reduced, (acc: U, element: T, index: number, key: string, list: T[]) => U
     * @param {any} initialValue Initial value
     * @returns  {any} Array of filtered elements
     */
    PropertyCollection.prototype.reduce = function(callback, initialValue) {
        var acc = initialValue;

        if (typeof callback != 'function') throw new ExtendError(/EL04118/, null, [typeof callback]);

        for(let i=0; i < this.length; i++) {
            var key = this.indexToKey(i);
            acc = acc ? callback(acc, this[i], i, key, this._list) : this[i];
        }
        return acc;
    };
    Object.defineProperty(PropertyCollection.prototype, 'reduce', {
        enumerable: false
    });

    /**
     * Returns the first element that matches the conditions of the provided function.
     * 
     * @param {Function} callback Callback function to be searched, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param {any} thisArg Object to use as this inside the callback function
     * @returns  {any} The first element that satisfies the condition, 'undefined' if not found
     */
    PropertyCollection.prototype.find = function(callback, thisArg) {
        if (typeof callback != 'function') throw new ExtendError(/EL04119/, null, [typeof callback]);
        
        for (var i = 0; i < this.length; i++) {
            var key = this.indexToKey(i);
            if ( callback.call(thisArg || this, this[i], i, key, this._list) ) {
            return this[i];
            }
        }
    };
    Object.defineProperty(PropertyCollection.prototype, 'find', {
        enumerable: false
    });

    /**
     * Run the function provided for all elements.  
     * 
     * @param {Function} callback callback function to be executed, (elem: T, index: number, key: string, list: T[]) => void
     * @param {any} thisArg Object to use as this inside the callback function
     */
    PropertyCollection.prototype.forEach = function(callback, thisArg) {
        if (typeof callback != 'function') throw new ExtendError(/EL041110/, null, [typeof callback]);
        
        for (var i = 0; i <this.length; i++) {
            var key = this.indexToKey(i);
            callback.call(thisArg || this, this[i], i, key, this._list);
        }
    };
    Object.defineProperty(PropertyCollection.prototype, 'forEach', {
        enumerable: false
    });

    /**
     * Verify that at least one element matches the conditions of the provided function.  
     * 
     * @param {Function} callback Callback function to be examined, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param {any} thisArg Object to use as this inside the callback function
     * @returns  {boolean}  'true' if more than one element satisfies the condition, or 'false' if not
     */
    PropertyCollection.prototype.some = function(callback, thisArg) {
        if (typeof callback != 'function') throw new ExtendError(/EL041111/, null, [typeof callback]);
        
        for(var i=0; i < this.length; i++){
            var key = this.indexToKey(i);
            if (callback.call(thisArg || this, this[i], i, key, this._list)) return true;
        }
        return false;
    };
    Object.defineProperty(PropertyCollection.prototype, 'some', {
        enumerable: false
    });

    /**
     * Verify that all elements satisfy the conditions of the provided function.  
     * 
     * @param {Function} callback Callback function to be examined, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param {any} thisArg Object to use as this inside the callback function
     * @returns  {boolean} 'true' if all elements meet the conditions, 'false' otherwise
     */
    PropertyCollection.prototype.every = function(callback, thisArg) {
        if (typeof callback != 'function') throw new ExtendError(/EL041112/, null, [typeof callback]);
        
        for(var i=0; i < this.length; i++){
            var key = this.indexToKey(i);
            if (!callback.call(thisArg || this, this[i], i, key, this._list)) return false;
            }
            return true;
    };
    Object.defineProperty(PropertyCollection.prototype, 'every', {
        enumerable: false
    });

    /**
     * Returns the index of the first element that matches the conditions of the provided function.  
     * 
     * @param {Function} callback Callback function to be examined, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param {any} thisArg Object to use as this inside the callback function
     * @returns  {any} Index of the first element that satisfies the condition, if not found '-1'
     */
    PropertyCollection.prototype.findIndex = function(callback, thisArg) {
        if (typeof callback != 'function') throw new ExtendError(/EL041113/, null, [typeof callback]);
        
        for (var i = 0; i < this.length; i++) {
            var key = this.indexToKey(i);
            if ( callback.call(thisArg || this, this[i], i, key, this._list) ) {
            return i;
            }
        }
        return -1;
    };
    Object.defineProperty(PropertyCollection.prototype, 'findIndex', {
        enumerable: false
    });        

    return PropertyCollection;

}(BaseCollection));

exports.ArrayCollection = ArrayCollection;
exports.BaseCollection = BaseCollection;
exports.EventEmitter = EventEmitter;
exports.ExtendError = ExtendError;
exports.IArrayCollection = IArrayCollection;
exports.ICollection = ICollection;
exports.IElement = IElement;
exports.IList = IList;
exports.IListControl = IListControl;
exports.IMarshal = IMarshal;
exports.IObject = IObject;
exports.IPropertyCollection = IPropertyCollection;
exports.ISerialize = ISerialize;
exports.Message = Message;
exports.MetaElement = MetaElement;
exports.MetaObject = MetaObject;
exports.MetaRegistry = MetaRegistry;
exports.NamespaceManager = NamespaceManager;
exports.PropertyCollection = PropertyCollection;
exports.Type = Type;
exports.Util = Util;
