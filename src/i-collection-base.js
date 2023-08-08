/**
 * namespace _L.Interface.IBaseCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;

    //==============================================================
    // 1. namespace declaration
    _global._L               = _global._L || {};
    _global._L.Common        = _global._L.Common || {};    
    _global._L.Interface     = _global._L.Interface || {};    
    
    //==============================================================
    // 2. import module
    
    if (isNode) {     
    } else {
    }

    //==============================================================
    // 3. module dependency check


    //==============================================================
    // 4. module implementation
    var IBaseCollection  = (function () {
        /**
         * 컬렉션 최상위
         * @classdesc 컬렉션 최상위 컬렉션 인터페이스
         * @constructs _L.Interface.IBaseCollection
         * @interface
         * @implements {_L.Interface.IPartControl}
         * @implements {_L.Interface.ILookupControl}
         */
        function IBaseCollection() {
            /**
             * 컬렉션 갯수
             * @member
             */
            this.count = Number;

            /**
             * 컬렉션 배열 반환
             * @member
             */
            this.list = Array;

            /** implements IPartControl 인터페이스 구현 */
            /** implements ILookupControl 인터페이스 구현 */
            // this._implements(IPartControl, ILookupControl);            
            // Util.implements(this, IPartControl, ILookupControl);
        }
    
        return IBaseCollection;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IBaseCollection = IBaseCollection;
    } else {
        _global._L.IBaseCollection = IBaseCollection;
        _global._L.Interface.IBaseCollection = IBaseCollection;     // namespace
    }

}(typeof window !== 'undefined' ? window : global));