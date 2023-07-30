/**
 * namespace _L.Interface.IPartControl
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;

    //==============================================================
    // 1. namespace declaration
    _global._L               = _global._L || {};
    _global._L.Interface     = _global._L.Interface || {};    
    
    //==============================================================
    // 2. import module

    //==============================================================
    // 3. module dependency check

    //==============================================================
    // 4. 모듈 구현    
    var IPartControl  = (function () {
        /**
         * @constructs _L.Interface.IPartControl
         * @interface
         */
        function IPartControl() {
        }
    
        /**
         * 단일 등록
         * @abstract
         */
        IPartControl.prototype.add  = function() {
            throw new Error('[ add(any) : boolean ] Abstract method definition, fail...');
        };

        /**
         * 단일 삭제
         * @abstract
         */
        IPartControl.prototype.remove  = function() {
            throw new Error('[ remove(any) : boolean ] Abstract method definition, fail...');
        };
    
        return IPartControl;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IPartControl = IPartControl;
    } else {
        _global._L.IPartControl = IPartControl;
        _global._L.Interface.IPartControl = IPartControl;       // namespace
    }

}(typeof window !== 'undefined' ? window : global));