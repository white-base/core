/**
 * namespace _L.Meta.MetaRegistry
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    // var Util;

    //==============================================================
    // 1. namespace declaration
    _global._L              = _global._L || {};
    _global._L.Meta         = _global._L.Meta || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        // Util                        = require('./util');
    } else {
        // Util                        = _global._L.Meta.Util;
    }

    //==============================================================Á
    // 3. 의존성 검사
    // if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    
    var MetaRegistry = (function () {
        /**
         * 메타 등록소
         */
        function MetaRegistry() { 
        }

        // var define
        var list = [];
        
        /**
         * 메타 이름
         * @member {string} _L.Meta.MetaElement#metaName
         */
        Object.defineProperty(MetaRegistry, "list", {
            get: function() { return list; },
            enumerable: false,
            configurable: false
        });

        /**
         * 메타 이름
         * @member {string} _L.Meta.MetaElement#metaName
         */
        Object.defineProperty(MetaRegistry, "count", {
            get: function() { return list.length; },
            enumerable: false,
            configurable: false
        });

        // private method
        function findGuid(guid, arr) {
            for(var i = 0; i < arr.length; i++) {
                if (arr[i]['_guid'] === guid) return arr[i];
            }
        }

        function extractListObject(mobj, arr) {
            arr = arr || [];

            if (mobj['_guid'] && typeof mobj['_guid'] === 'string') arr.push(mobj);
            for(let prop in mobj) {
                if (typeof mobj[prop] === 'object') extractListObject(mobj[prop], arr);
                else if (Array.isArray(mobj[prop])){
                for(var i = 0; i < mobj[prop].length; i++) {
                    if (typeof mobj[prop][i] === 'object') extractListObject(mobj[prop][i], arr);
                }  
                }
            }
            return arr;
        }

        // static method
        MetaRegistry.init = function() {
            list.length = 0;
        };

        MetaRegistry.hasMetaObject = function(meta) {
            for(let i = 0; i < list.length; i++) {
                if (list[i]._guid === meta._guid) return true;
            }
            return false;
        };
        
        MetaRegistry.hasReferObject = function(obj) {
            if (typeof obj !== 'object') throw new Error('object 타입이 아닙니다.');

            return hasRefer(obj);

            // inner function
            function hasRefer(obj) {
                for(let prop in obj) {
                    if (typeof obj[prop] === 'object') {
                        if (obj[prop]['$ref'] && typeof obj[prop]['$ref'] === 'string') {
                            return true;
                        } else {
                            if (hasRefer(obj[prop]) === true) return true;
                        }
                    } else if (Array.isArray(obj[prop])){
                      for(var i = 0; i < obj[prop].length; i++) {
                        if (typeof obj[prop][i] === 'object') {
                            if (hasRefer(obj[prop]) === true) return true;
                        }
                      }  
                    }
                }
                return false;
            }
        };        

        MetaRegistry.register = function(meta) {
            if (this.hasMetaObject(meta)) throw new Error('중복 메타 등록 _guid:' + meta._guid); 
            list.push(meta);
        };

        MetaRegistry.release = function(meta) {
            if (!(meta && meta._guid && meta._guid.length > 0)) return;
            for(let i = 0; i < list.length; i++) {
                if (list[i]._guid === meta._guid) {
                    list.splice(i, 1);
                    return;
                }
            }
        };
        
        MetaRegistry.createReferObject = function(obj) {
            if (obj && obj._guid && obj._guid.length > 0 ) return { $ref: obj._guid };
        };

        MetaRegistry.find = function(guid) {
            if (typeof guid !== 'string') return;
            for(let i = 0; i < list.length; i++) {
                if (list[i]._guid === guid) return list[i];
            }
        };
        
        MetaRegistry.validMetaObject = function(rObj) {
            var arrObj = extractListObject(rObj);

            if (validReference(rObj, arrObj) === false) return false;
            if (validCollection(rObj, arrObj) === false) return false;
            return true;

            // inner function
            function validReference(mobj, arr) {
                for(let prop in mobj) {
                    if (typeof mobj[prop] === 'object') {
                        if (mobj[prop]['$ref']) {
                            if (typeof findGuid(mobj[prop]['$ref'], arr) !== 'object') return false;
                        } else {
                            if (validReference(mobj[prop], arr) === false) return false;
                        }
                    } else if (Array.isArray(mobj[prop])){
                      for(var i = 0; i < mobj[prop].length; i++) {
                        if (typeof mobj[prop][i] === 'object') {
                            if (validReference(mobj[prop][i], arr) === false) return false;
                        }
                      }  
                    }
                }
                return true;
            }
            function validCollection(mobj, arr) {
                for(let prop in mobj) {
                    if (typeof mobj[prop] === 'object') {
                        if (Array.isArray(mobj[prop]['_elem']) && Array.isArray(mobj[prop]['_key'])) {
                            if (mobj[prop]['_elem'].length !== mobj[prop]['_key'].length) return false;
                        } else {
                            if (validCollection(mobj[prop], arr) === false) return false;
                        }
                    } else if (Array.isArray(mobj[prop])){
                      for(var i = 0; i < mobj[prop].length; i++) {
                        if (typeof mobj[prop][i] === 'object') {
                            if (validCollection(mobj[prop][i], arr) === false) return false;
                        }
                      }  
                    }
                }
                return true;
            }
        };

        MetaRegistry.transformRefer = function(rObj) {
            var arrObj = extractListObject(rObj);
            // REVIEW: 객체를 복사해야 하는게 맞지 않을까?
            // var clone = JSON.parse(JSON.stringify(rObj));
            // linkReference(clone, arrObj);
            // return clone;
            linkReference(rObj, arrObj);
            return rObj;
            

            // inner function
            function linkReference(obj, arr) {
                // inner function
                for(let prop in obj) {
                    if (typeof obj[prop] === 'object') {
                        if (obj[prop]['$ref']) {
                            obj[prop] = findGuid(obj[prop]['$ref'], arr);
                            if (typeof obj[prop] !== 'object') throw new Error('참조 연결 실패 $ref:' + obj['$ref']);
                        } else linkReference(obj[prop], arr);
                    } else if (Array.isArray(obj[prop])){
                    for(var i = 0; i < obj[prop].length; i++) {
                        if (typeof obj[prop][i] === 'object') linkReference(obj[prop][i], arr);
                    }  
                    } 
                }
            }
        };

        return MetaRegistry;
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.MetaRegistry = MetaRegistry;
    } else {
        _global._L.MetaRegistry = MetaRegistry;
        _global._L.Meta.MetaRegistry = MetaRegistry;    // namespace
    }

}(typeof window !== 'undefined' ? window : global));