/**
 * @jest-environment jsdom
 */
//==============================================================
// gobal defined
'use strict';

//==============================================================
// test
describe("[L.*]", () => {
    describe("[Common.*]", () => {
        describe("load: extend-error.js <ExtendError>", () => {
            beforeEach(() => {
                jest.resetModules();
                global._L = null;
            });
            it("- 예외 : 전체 로딩이 인된경우", () => {
                expect(() => require('../src/extend-error')).toThrow(/Cannot read properties/);
            });
            it("- 성공 ", () => {
                require('../src/message-code');
                require('../src/message');
                delete global._L.Common
                require('../src/extend-error');
                
                expect(global._L.ExtendError).toBeDefined();
                expect(global._L.Common.ExtendError).toBeDefined();
            });
        });
        describe.skip("load: observer.js <Observer>", () => {
            beforeEach(() => {
                jest.resetModules();
                global._L = null;
             });
            it("- 예외 : 전체 로딩이 인된경우", () => {
                expect(() => require('../src/temp/observer')).toThrow(/Cannot read properties/);
            });
            it("- 예외 : ExtendError 로딩이 안 된 경우", () => {
                require('../src/message-code');
                require('../src/message');
                expect(() => require('../src/temp/observer')).toThrow(/ExtendError/);
            });
            it("- 예외 : Util 로딩이 안 된 경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
        
                expect(() => require('../src/temp/observer')).toThrow(/Util/);
            });
            it("- namespace : observer.js ", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
                delete global._L.Common
                require('../src/temp/observer');
                
                expect(global._L.Observer).toBeDefined();
                expect(global._L.Common.Observer).toBeDefined();
            });
        });
        describe("load: event-emitter.js <EventEmitter>", () => {
            beforeEach(() => {
                jest.resetModules();
                global._L = null;
             });
            it("- 예외 : 전체 로딩이 인된경우", () => {
                expect(() => require('../src/event-emitter')).toThrow(/Cannot read properties/);
            });
            it("- 예외 : ExtendError 로딩이 안 된 경우", () => {
                require('../src/message-code');
                require('../src/message');
                expect(() => require('../src/event-emitter')).toThrow(/ExtendError/);
            });
            it("- 예외 : Util 로딩이 안 된 경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
        
                expect(() => require('../src/event-emitter')).toThrow(/Util/);
            });
            it("- namespace : observer.js ", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
                delete global._L.Common
                require('../src/event-emitter');
                
                expect(global._L.EventEmitter).toBeDefined();
                expect(global._L.Common.EventEmitter).toBeDefined();
            });
        });
        describe("load: type.js <Util.type >", () => {
            beforeEach(() => {
                jest.resetModules();
                global._L = null;
            
            });
            it("- 예외 : 전체 로딩이 인된경우", () => {
                expect(() => require('../src/type')).toThrow(/Cannot read properties/);
            });
             it("- 예외 : ExtendError 로딩이 안 된 경우", () => {
                require('../src/message-code');
                require('../src/message');
                expect(() => require('../src/type')).toThrow(/ExtendError/);
            });
            it("- namespace : util-type.js ", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                delete global._L.Common
                require('../src/type');
                
                expect(global._L.Common.Type.getAllProperties).toBeDefined();
                expect(global._L.Common.Type.deepEqual).toBeDefined();
                expect(global._L.Common.Type.isMatchType).toBeDefined();
                expect(global._L.Common.Type.isAllowType).toBeDefined();
                expect(global._L.Common.Type.matchType).toBeDefined();
                expect(global._L.Common.Type.allowType).toBeDefined();
                expect(global._L.Common.Type.getTypes).toBeDefined();
                expect(global._L.Common.Type.extendType).toBeDefined();
                expect(global._L.Common.Type.typeObject).toBeDefined();
                expect(global._L.Common.Type.typeOf).toBeDefined();
                expect(global._L.Common.Type.isProtoChain).toBeDefined();
            });
        });    
        describe("load: util.js <Util>", () => {
            beforeEach(() => {
                jest.resetModules();
                global._L = null;
             });
             it("- 예외 : extend-error.js", () => {
                require('../src/message-code');
                require('../src/message');
                expect(() => require('../src/util')).toThrow(/ExtendError/);
            });
            it("- 예외 : type.js 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                expect(() => require('../src/util')).toThrow(/Type/);
            });
            // it("- 예외 : util-type.js : ExtendError 제거", () => {
            //     require('../src/message');
            //     require('../src/extend-error');
            //     require('../src/type');
            //     delete global._L.Common.ExtendError; 
            //     expect(() => require('../src/util')).toThrow(/ExtendError/);
            // });
            // it("- 예외 : util-type.js : getAllProperties 제거", () => {
            //     require('../src/message');
            //     require('../src/extend-error');
            //     require('../src/type');
            //     delete global._L.Common.Type.getAllProperties;
            //     expect(() => require('../src/util')).toThrow(/getAllProperties/);
            // });
            // it("- 예외 : util-type.js : extendType 제거", () => {
            //     require('../src/message');
            //     require('../src/extend-error');
            //     require('../src/type');
            //     delete global._L.Type.extendType; 
            //     expect(() => require('../src/util')).toThrow(/extendType/);
            // });
            // it("- 예외 : util-type.js : allowType 제거", () => {
            //     require('../src/message');
            //     require('../src/extend-error');
            //     require('../src/type');
            //     delete global._L.Common.Type.allowType;
            //     expect(() => require('../src/util')).toThrow(/allowType/);
            // });
            // it("- 예외 : util-type.js : getType 제거", () => {
            //     require('../src/message');
            //     require('../src/extend-error');
            //     require('../src/type');
            //     delete global._L.Common.Type.getTypes;
            //     expect(() => require('../src/util')).toThrow(/getTypes/);
            // });
    
            // it("- 예외 : util-type.js : isMatchType 제거", () => {
            //     require('../src/message');
            //     require('../src/extend-error');
            //     require('../src/type');
            //     delete global._L.Common.Type.isMatchType;
            //     expect(() => require('../src/util')).toThrow(/isMatchType/);
            // });
            // it("- 예외 : util-type.js : isAllowType 제거", () => {
            //     require('../src/message');
            //     require('../src/extend-error');
            //     require('../src/type');
            //     delete global._L.Common.Type.isAllowType;
            //     expect(() => require('../src/util')).toThrow(/isAllowType/);
            // });
            // // it("- 예외 : util-type.js : checkUnionType 제거", () => {
            // //     require('../src/message');
            // //     require('../src/type');
            // //     delete global._L.Common.Util.checkUnionType;
            // //     expect(() => require('../src/util')).toThrow(/checkUnionType/);
            // // });
            // it("- 예외 : util-type.js : matchType 제거", () => {
            //     require('../src/message');
            //     require('../src/extend-error');
            //     require('../src/type');
            //     delete global._L.Common.Type.matchType;
            //     expect(() => require('../src/util')).toThrow(/matchType/);
            // });
            // it("- 예외 : util-type.js : deepEqual 제거", () => {
            //     require('../src/message');
            //     require('../src/extend-error');
            //     require('../src/type');
            //     delete global._L.Common.Type.deepEqual;
            //     expect(() => require('../src/util')).toThrow(/deepEqual/);
            // });
            // it("- 예외 : util-type.js : isProtoChain 제거", () => {
            //     require('../src/message');
            //     require('../src/extend-error');
            //     require('../src/type');
            //     delete global._L.Common.Type.isProtoChain;
            //     expect(() => require('../src/util')).toThrow(/isProtoChain/);
            // });
            // it("- 예외 : util-type.js : hasType 제거", () => {
            //     require('../src/message');
            //     require('../src/extend-error');
            //     require('../src/type');
            //     delete global._L.Common.Type.hasType;
            //     expect(() => require('../src/util')).toThrow(/hasType/);
            // });
            // it("- 예외 : util-type.js : typeObject 제거", () => {
            //     require('../src/message');
            //     require('../src/extend-error');
            //     require('../src/type');
            //     delete global._L.Common.Type.typeObject;
            //     expect(() => require('../src/util')).toThrow(/typeObject/);
            // });
            // it("- 예외 : util-type.js : typeOf 제거", () => {
            //     require('../src/message');
            //     require('../src/extend-error');
            //     require('../src/type');
            //     delete global._L.Common.Type.typeOf;
            //     expect(() => require('../src/util')).toThrow(/typeOf/);
            // });
            it("- namespace : util.js ", () => {
                require('../src/message-code');
                require('../src/message'); 
                require('../src/extend-error');
                require('../src/type');
                delete global._L.Common
                require('../src/util');
                
                // expect(global._L.Common.Type.getAllProperties).toBeDefined();
                // expect(global._L.Common.Type.deepEqual).toBeDefined();
                // expect(global._L.Common.Type.isMatchType).toBeDefined();
                // expect(global._L.Common.Type.isAllowType).toBeDefined();
                // expect(global._L.Common.Type.matchType).toBeDefined();
                // expect(global._L.Common.Type.allowType).toBeDefined();
                // expect(global._L.Common.Type.getTypes).toBeDefined();
                // expect(global._L.Common.Type.extendType).toBeDefined();
                // expect(global._L.Common.Type.typeObject).toBeDefined();
                // expect(global._L.Common.Type.typeOf).toBeDefined();
                // expect(global._L.Common.Type.isProtoChain).toBeDefined();
                /// util.js
                expect(global._L.Common.Util.inherits).toBeDefined();
                expect(global._L.Common.Util.getArrayDepth).toBeDefined();
                expect(global._L.Common.Util.createGuid).toBeDefined();
                expect(global._L.Common.Util.implements).toBeDefined(); 
            });
            // it("- 예외 : util-type.js : validUnionType 제거", () => {
            //     require('../src/message');
            //     require('../src/type');
            //     delete global._L.Common.Util.validUnionType;
            //     expect(() => require('../src/util')).toThrow(/validUnionType/);
            // });
            
        });
        
    });
    describe("[Collection.*]", () => {
        describe("base-collection.js <BaseCollection>", () => {
            beforeEach(() => {
                jest.resetModules();
                global._L = null;
            });
            it("- 예외 : 전체 로딩이 인된경우", () => {
                expect(() => require('../src/base-collection')).toThrow(/Cannot read properties/);
            });
            it("- 예외 : ExtendError 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                expect(() => require('../src/base-collection')).toThrow(/ExtendError/);
            });
            it("- 예외 : Type 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error'); 
                // require('../src/util'); 
                expect(() => require('../src/base-collection')).toThrow(/Type/);
            });
            it("- 예외 : Util 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error'); 
                require('../src/type'); 
                expect(() => require('../src/base-collection')).toThrow(/Util/);
            });
            it("- 예외 : Observer 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
                
                require('../src/i-collection');
                require('../src/i-list');
                require('../src/i-control-list');
                require('../src/i-serialize');
                require('../src/i-object');
                require('../src/i-marshal');
                
                // require('../src/observer');
                // require('../src/namespace-manager');
    
                expect(() => require('../src/base-collection')).toThrow(/EventEmitter/);
            });
            it("- 예외 : ICollection 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
                require('../src/event-emitter');
                
                // require('../src/i-collection');
                require('../src/i-list');
                require('../src/i-control-list');
                require('../src/i-object');
                require('../src/i-marshal');
    
                expect(() => require('../src/base-collection')).toThrow(/ICollection/);
            });
            it("- 예외 : IList 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
                require('../src/event-emitter');
                
                require('../src/i-collection');
                // require('../src/i-list');
                require('../src/i-control-list');
                require('../src/i-serialize');
                require('../src/i-object');
                require('../src/i-marshal');
    
                expect(() => require('../src/base-collection')).toThrow(/IList/);
            });
            
            
            it("- 예외 : MetaRegistry 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
                
                require('../src/i-collection');
                require('../src/i-list');
                require('../src/i-control-list');
                require('../src/i-serialize');
                require('../src/i-object');
                require('../src/i-marshal');                
                require('../src/event-emitter');

                // require('../src/namespace-manager');
                // require('../src/meta-registry');  
                
                expect(() => require('../src/base-collection')).toThrow(/MetaRegistry/);
            });
            it("- 예외 : MetaObject 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
                
                require('../src/i-collection');
                require('../src/i-list');
                require('../src/i-control-list');
                require('../src/i-serialize');
                require('../src/i-object');
                require('../src/i-marshal');
                
                require('../src/event-emitter');
                require('../src/namespace-manager');
                require('../src/meta-registry');  
                // require('../src/meta-object');  
                
                expect(() => require('../src/base-collection')).toThrow(/MetaObject/);
            });
            // it("- 로딩 성공 : 커버리지 ", () => {
            //     require('../src/message-code');
            //     require('../src/message');
            //     require('../src/extend-error');
            //     require('../src/type');
            //     require('../src/util');
                
            //     require('../src/i-collection');
            //     require('../src/i-list');
            //     require('../src/i-control-list');
            //     require('../src/i-serialize');
            //     require('../src/i-object');
            //     require('../src/i-marshal');
                
            //     require('../src/observer');
            //     require('../src/namespace-manager');
            //     require('../src/meta-registry');  
            //     require('../src/meta-object');  
            //     global._L = null;
            //     require('../src/base-collection');
        
            //     expect(global._L.BaseCollection).toBeDefined();
            //     expect(global._L.Collection.BaseCollection).toBeDefined();
            // });
            it("- 로딩 성공 ", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
                
                require('../src/i-collection');
                require('../src/i-list');
                require('../src/i-control-list');
                require('../src/i-serialize');
                require('../src/i-object');
                require('../src/i-marshal');
                
                require('../src/event-emitter');
                require('../src/namespace-manager');
                require('../src/meta-registry');  
                require('../src/meta-object');  
                delete global._L.Collection
                require('../src/base-collection');
        
                expect(global._L.BaseCollection).toBeDefined();
                expect(global._L.Collection.BaseCollection).toBeDefined();
            });
            
        });
        describe("collection-array.js <ArrayCollection>", () => {
            beforeEach(() => {
                jest.resetModules();
                global._L = null;
            });
            it("- 예외 : 전체 로딩이 인된경우", () => {
                expect(() => require('../src/collection-array')).toThrow(/Cannot read properties/);
            });
            it("- 예외 : ExtendError 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                expect(() => require('../src/collection-array')).toThrow(/ExtendError/);
            });
            it("- 예외 : Type 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error'); 
                
                expect(() => require('../src/collection-array')).toThrow(/Type/);
            });
            it("- 예외 : Util 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type'); 

                expect(() => require('../src/collection-array')).toThrow(/Util/);
            });
            it("- 예외 : IArrayCollection 로딩이 인된 경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');            // ref
                require('../src/util');
    
                expect(() => require('../src/collection-array')).toThrow(/IArrayCollection/);
            });
            it("- 예외 : MetaRegistry 로딩이 인된 경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
                
                require('../src/i-collection');
                require('../src/i-list');
                require('../src/i-control-list');
                require('../src/i-serialize');
                require('../src/i-object');
                require('../src/i-marshal');
                require('../src/i-collection-array');
                
                require('../src/temp/observer');
                require('../src/namespace-manager');
                // require('../src/meta-registry');  
    
                expect(() => require('../src/collection-array')).toThrow(/MetaRegistry/);
            });
            it("- 예외 : MetaObject 로딩이 인된 경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
                
                require('../src/i-collection');
                require('../src/i-list');
                require('../src/i-control-list');
                require('../src/i-serialize');
                require('../src/i-object');
                require('../src/i-marshal');
                require('../src/i-collection-array');
                
                require('../src/temp/observer');
                require('../src/namespace-manager');
                require('../src/meta-registry');  
                // require('../src/meta-object');  
    
                expect(() => require('../src/collection-array')).toThrow(/MetaObject/);
            });
            it("- 예외 : BaseCollection 로딩이 인된 경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
                
                require('../src/i-collection');
                require('../src/i-list');
                require('../src/i-control-list');
                require('../src/i-serialize');
                require('../src/i-object');
                require('../src/i-marshal');
                require('../src/i-collection-array');
                
                require('../src/temp/observer');
                require('../src/namespace-manager');
                require('../src/meta-registry');  
                require('../src/meta-object');  
                // require('../src/base-collection');
                
                expect(() => require('../src/collection-array')).toThrow(/BaseCollection/);
            });
            it("- 로딩 성공 ", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
                
                require('../src/i-collection');
                require('../src/i-list');
                require('../src/i-control-list');
                require('../src/i-serialize');
                require('../src/i-object');
                require('../src/i-marshal');
                require('../src/i-collection-array');
                
                require('../src/event-emitter');
                require('../src/namespace-manager');
                require('../src/meta-registry');  
                require('../src/meta-object');  
                require('../src/base-collection');
                delete global._L.Collection
                require('../src/collection-array');
        
                expect(global._L.ArrayCollection).toBeDefined();
                expect(global._L.Collection.ArrayCollection).toBeDefined();
            });
            
        });
        describe("collection-property.js <PropertyCollection>", () => {
            beforeEach(() => {
                jest.resetModules();
                global._L = null;
            });
            it("- 예외 : 전체 로딩이 인된경우", () => {
                expect(() => require('../src/collection-property')).toThrow(/Cannot read properties/);
            });
            it("- 예외 : ExtendError 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                expect(() => require('../src/collection-property')).toThrow(/ExtendError/);
            });
            it("- 예외 : Type 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error'); 
                
                expect(() => require('../src/collection-property')).toThrow(/Type/);
            });
            it("- 예외 : Util 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type'); 
                
                expect(() => require('../src/collection-property')).toThrow(/Util/);
            });
            it("- 예외 : IPropertyCollection 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');            // ref
                require('../src/util');
    
                expect(() => require('../src/collection-property')).toThrow(/IPropertyCollection/);
            });
            it("- 예외 : MetaRegistry 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
                
                require('../src/i-collection');
                require('../src/i-list');
                require('../src/i-control-list');
                require('../src/i-serialize');
                require('../src/i-marshal');
                require('../src/i-collection-property');
                
                require('../src/temp/observer');
                require('../src/namespace-manager');
                // require('../src/meta-registry');  
        
                expect(() => require('../src/collection-property')).toThrow(/MetaRegistry/);
            });
            it("- 예외 : MetaObject 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
                
                require('../src/i-collection');
                require('../src/i-list');
                require('../src/i-control-list');
                require('../src/i-serialize');
                require('../src/i-object');
                require('../src/i-marshal');
                require('../src/i-collection-property');
                
                require('../src/temp/observer');
                require('../src/namespace-manager');
                require('../src/meta-registry');  
                // require('../src/meta-object');  
        
                expect(() => require('../src/collection-property')).toThrow(/MetaObject/);
            });
            it("- 예외 : BaseCollection 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
                
                require('../src/i-collection');
                require('../src/i-list');
                require('../src/i-control-list');
                require('../src/i-serialize');
                require('../src/i-object');
                require('../src/i-marshal');
                require('../src/i-collection-property');
                
                require('../src/temp/observer');
                require('../src/namespace-manager');
                require('../src/meta-registry');  
                require('../src/meta-object');  
                // require('../src/base-collection');
        
                expect(() => require('../src/collection-property')).toThrow(/BaseCollection/);
            });
    
            it("- 로딩 성공 ", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
                
                require('../src/i-collection');
                require('../src/i-list');
                require('../src/i-control-list');
                require('../src/i-serialize');
                require('../src/i-object');
                require('../src/i-marshal');
                require('../src/i-collection-property');
                
                require('../src/event-emitter');
                require('../src/namespace-manager');
                require('../src/meta-registry');  
                require('../src/meta-object');  
                require('../src/base-collection');
                delete global._L.Collection
                require('../src/collection-property');
        
                expect(global._L.PropertyCollection).toBeDefined();
                expect(global._L.Collection.PropertyCollection).toBeDefined();
            });
            
        });
        // describe("trans-queue.js <TransactionQueue>", () => {
        //     beforeEach(() => {
        //         jest.resetModules();
        //         global._L = null;
        //     });
        //     it("- 예외 : 전체 로딩이 인된경우", () => {
        //         expect(() => require('../src/trans-queue')).toThrow(/Cannot read properties/);
        //     });
        //     it("- 예외 : ExtendError 로딩이 인된경우", () => {
        //         require('../src/message');
        //         expect(() => require('../src/trans-queue')).toThrow(/ExtendError/);
        //     });
        //     it("- 예외 : Util 로딩이 인된경우", () => {
        //         require('../src/message');
        //         require('../src/extend-error');
                
        //         expect(() => require('../src/trans-queue')).toThrow(/Util/);
        //     });
        //     it("- 예외 : IArrayCollection 로딩이 인된경우", () => {
        //         require('../src/message');
        //         require('../src/extend-error');
        //         require('../src/type');
        //         require('../src/util');
                
        //         require('../src/i-collection');
        //         require('../src/i-list');
        //         require('../src/i-control-list');
        //         require('../src/i-serialize');
        //         require('../src/i-object');
        //         require('../src/i-marshal');
        //         // require('../src/i-collection-array');
                
        //         require('../src/observer');
        //         require('../src/namespace-manager');
        //         require('../src/meta-registry');  
        //         // require('../src/meta-object');  
        
        //         expect(() => require('../src/trans-queue')).toThrow(/IArrayCollection/);
        //     });
        //     it("- 예외 : MetaObject 로딩이 인된경우", () => {
        //         require('../src/message');
        //         require('../src/extend-error');
        //         require('../src/type');
        //         require('../src/util');
                
        //         require('../src/i-collection');
        //         require('../src/i-list');
        //         require('../src/i-control-list');
        //         require('../src/i-serialize');
        //         // require('../src/i-object');
        //         // require('../src/i-marshal');
        //         require('../src/i-collection-array');
                
        //         require('../src/observer');
        //         require('../src/namespace-manager');
        //         require('../src/meta-registry');  
        //         // require('../src/meta-object');  
        
        //         expect(() => require('../src/trans-queue')).toThrow(/MetaObject/);
        //     });
    
        //     it("- 로딩 성공 ", () => {
        //         require('../src/message');
        //         require('../src/extend-error');
        //         require('../src/type');
        //         require('../src/util');
                
        //         require('../src/i-collection');
        //         require('../src/i-list');
        //         require('../src/i-control-list');
        //         require('../src/i-serialize');
        //         require('../src/i-object');
        //         require('../src/i-marshal');
        //         require('../src/i-collection-array');
                
        //         require('../src/observer');
        //         require('../src/namespace-manager');
        //         require('../src/meta-registry');  
        //         require('../src/meta-object');  
        //         require('../src/trans-queue');
        
        //         expect(global._L.TransactionQueue).toBeDefined();
        //         expect(global._L.Collection.TransactionQueue).toBeDefined();
        //     });
            
        // });
        // describe("collection-transaction.js <TransactionCollection>", () => {
        //     beforeEach(() => {
        //         jest.resetModules();
        //         global._L = null;
        //     });
        //     it("- 예외 : 전체 로딩이 인된경우", () => {
        //         expect(() => require('../src/collection-transaction')).toThrow(/Cannot read properties/);
        //     });
        //     it("- 예외 : ExtendError 로딩이 인된경우", () => {
        //         require('../src/message');
        //         expect(() => require('../src/collection-transaction')).toThrow(/ExtendError/);
        //     });
        //     it("- 예외 : Type 로딩이 인된경우", () => {
        //         require('../src/message');
        //         require('../src/extend-error'); 
                
        //         expect(() => require('../src/collection-transaction')).toThrow(/Type/);
        //     });
        //     it("- 예외 : Util 로딩이 인된경우", () => {
        //         require('../src/message');
        //         require('../src/extend-error');
        //         require('../src/type'); 
    
        //         expect(() => require('../src/collection-transaction')).toThrow(/Util/);
        //     });
        //     it("- 예외 : ArrayCollection 로딩이 인된 경우", () => {
        //         require('../src/message');
        //         require('../src/extend-error');
        //         require('../src/type');
        //         require('../src/util');
    
        //         expect(() => require('../src/collection-transaction')).toThrow(/ArrayCollection/);
        //     });
        //     it("- 예외 : TransactionQueue 로딩이 인된 경우", () => {
        //         require('../src/message');
        //         require('../src/extend-error');
        //         require('../src/type');
        //         require('../src/util');
                
        //         require('../src/i-collection');
        //         require('../src/i-list');
        //         require('../src/i-control-list');
        //         require('../src/i-serialize');
        //         require('../src/i-object');
        //         require('../src/i-marshal');
        //         require('../src/i-collection-array');
                
        //         require('../src/observer');
        //         require('../src/namespace-manager');
        //         require('../src/meta-registry');  
        //         require('../src/meta-object');  
        //         require('../src/base-collection');
        //         require('../src/collection-array');
                
        //         expect(() => require('../src/collection-transaction')).toThrow(/TransactionQueue/);
        //     });
        //     it("- 로딩 성공 ", () => {
        //         require('../src/message');
        //         require('../src/extend-error');
        //         require('../src/type');
        //         require('../src/util');
                
        //         require('../src/i-collection');
        //         require('../src/i-list');
        //         require('../src/i-control-list');
        //         require('../src/i-serialize');
        //         require('../src/i-object');
        //         require('../src/i-marshal');
        //         require('../src/i-collection-array');
                
        //         require('../src/observer');
        //         require('../src/namespace-manager');
        //         require('../src/meta-registry');  
        //         require('../src/meta-object');  
        //         require('../src/base-collection');
        //         require('../src/collection-array');
        //         require('../src/trans-queue');
        //         require('../src/collection-transaction');
        
        //         expect(global._L.TransactionCollection).toBeDefined();
        //         expect(global._L.Collection.TransactionCollection).toBeDefined();
        //     });
            
        // });
    });
    describe("[Inteface.*]", () => {
        describe("load: i-object.js <IObject >", () => {
            beforeEach(() => {
                jest.resetModules();
                global._L = null;
            });
            it("- 예외 : 전체 로딩이 인된경우", () => {
                expect(() => require('../src/i-object')).toThrow(/Cannot read properties/);
            });
            it("- 예외 : ExtendError 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                expect(() => require('../src/i-object')).toThrow(/ExtendError/);
            });
            it("- 자신만 로딩", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/i-object');
            });
            it("- namespace : IObject ", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                delete global._L.Interface
                require('../src/i-object');
                
                expect(global._L.IObject).toBeDefined();
                expect(global._L.Interface.IObject).toBeDefined();
            });
        });
        describe("load: i-marshal.js <IMarshal>", () => {
            beforeEach(() => {
                jest.resetModules();
                global._L = null;
            });
            it("- 예외 : 전체 로딩이 인된경우", () => {
                expect(() => require('../src/i-marshal')).toThrow(/Cannot read properties/);
            });
            it("- 예외 : ExtendError 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                expect(() => require('../src/i-marshal')).toThrow(/ExtendError/);
            });
            it("- namespace : IMarshal ", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                delete global._L.Interface
                require('../src/i-marshal');
                
                expect(global._L.IMarshal).toBeDefined();
                expect(global._L.Interface.IMarshal).toBeDefined();
            });
        });
        describe("load: i-serialize.js <ISerialize>", () => {
            beforeEach(() => {
                jest.resetModules();
                global._L = null;
            });
            it("- 예외 : 전체 로딩이 인된경우", () => {
                expect(() => require('../src/i-serialize')).toThrow(/Cannot read properties/);
            });
            it("- 예외 : ExtendError 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                expect(() => require('../src/i-serialize')).toThrow(/ExtendError/);
            });
            it("- namespace : IMarshal ", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                delete global._L.Interface
                require('../src/i-serialize');
                
                expect(global._L.ISerialize).toBeDefined();
                expect(global._L.Interface.ISerialize).toBeDefined();
            });
        });
        // describe("load: i-transaction.js <ITransaction>", () => {
        //     beforeEach(() => {
        //         jest.resetModules();
        //         global._L = null;
        //     });
        //     it("- 예외 : 전체 로딩이 인된경우", () => {
        //         expect(() => require('../src/i-transaction')).toThrow(/Cannot read properties/);
        //     });
        //     it("- 예외 : ExtendError 로딩이 인된경우", () => {
        //         require('../src/message');
        //         expect(() => require('../src/i-transaction')).toThrow(/ExtendError/);
        //     });
        //     it("- namespace : ITransaction ", () => {
        //         require('../src/extend-error');
        
        //         require('../src/i-transaction');
                
        //         expect(global._L.ITransaction).toBeDefined();
        //         expect(global._L.Interface.ITransaction).toBeDefined();
        //     });
        // });
        // describe("load: i-control-import.js <IImportControl>", () => {
        //     beforeEach(() => {
        //         jest.resetModules();
        //         global._L = null;
        //     });
        //     it("- 예외 : 전체 로딩이 인된경우", () => {
        //         expect(() => require('../src/i-control-import')).toThrow(/Cannot read properties/);
        //     });
        //     it("- 예외 : ExtendError 로딩이 인된경우", () => {
        //         require('../src/message');
        //         expect(() => require('../src/i-control-import')).toThrow(/ExtendError/);
        //     });
        //     it("- 예외 : 자신만 로딩", () => {
        //         require('../src/extend-error');
        //         require('../src/i-control-import');
        //     });
        //     it("- namespace : IImportControl ", () => {
        //         require('../src/message');
        //         require('../src/extend-error');
                
        //         require('../src/i-control-import');
                
        //         expect(global._L.IImportControl).toBeDefined();
        //         expect(global._L.Interface.IImportControl).toBeDefined();
        //     });
        // });
        // describe("load: i-control-group.js <IGroupControl>", () => {
        //     beforeEach(() => {
        //         jest.resetModules();
        //         global._L = null;
        //     });
        //     it("- 예외 : 전체 로딩이 인된경우", () => {
        //         expect(() => require('../src/i-control-group')).toThrow(/Cannot read properties/);
        //     });
        //     it("- 예외 : ExtendError 로딩이 인된경우", () => {
        //         require('../src/message');
        //         expect(() => require('../src/i-control-group')).toThrow(/ExtendError/);
        //     });
        //     it("- 자신만 로딩", () => {
        //         require('../src/extend-error');
        //         require('../src/i-control-group');
        //     });
        //     it("- namespace : IGroupControl ", () => {
        //         require('../src/message');
        //         require('../src/extend-error');
        
        //         require('../src/i-control-group');
                
        //         expect(global._L.IGroupControl).toBeDefined();
        //         expect(global._L.Interface.IGroupControl).toBeDefined();
        //     });
        // });
        // describe("load: i-control-export.js <IExportControl>", () => {
        //     beforeEach(() => {
        //         jest.resetModules();
        //         global._L = null;
        //     });
        //     it("- 예외 : 전체 로딩이 인된경우", () => {
        //         expect(() => require('../src/i-control-export')).toThrow(/Cannot read properties/);
        //     });
        //     it("- 예외 : ExtendError 로딩이 인된경우", () => {
        //         require('../src/message');
        //         expect(() => require('../src/i-control-export')).toThrow(/ExtendError/);
        //     });
        //     it("- 예외 : 자신만 로딩", () => {
        //         require('../src/extend-error');
        //         require('../src/i-control-export');
        //     });
        //     it("- namespace : IExportControl ", () => {
        //         require('../src/message');
        //         require('../src/extend-error');
                
        //         require('../src/i-control-export');
                
        //         expect(global._L.IExportControl).toBeDefined();
        //         expect(global._L.Interface.IExportControl).toBeDefined();
        //     });
        // });
        describe("load: i-list.js <IList>", () => {
            beforeEach(() => {
                jest.resetModules();
                global._L = null;
            });
            it("- 예외 : 전체 로딩이 인된경우", () => {
                expect(() => require('../src/i-list')).toThrow(/Cannot read properties/);
            });
            it("- 예외 : ExtendError 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                expect(() => require('../src/i-list')).toThrow(/ExtendError/);
            });
            it("- 예외 : 자신만 로딩", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/i-list');
            });
            it("- namespace : IList ", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                delete global._L.Interface
                require('../src/i-list');
                
                expect(global._L.IList).toBeDefined();
                expect(global._L.Interface.IList).toBeDefined();
            });
        });
        describe("load: i-element.js <IElement>", () => {
            beforeEach(() => {
                jest.resetModules();
                global._L = null;
            });
            it("- 예외 : 전체 로딩이 인된경우", () => {
                expect(() => require('../src/i-element')).toThrow(/Cannot read properties/);
            });
            it("- 예외 : ExtendError 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                expect(() => require('../src/i-element')).toThrow(/ExtendError/);
            });
            it("- 예외 : 자신만 로딩", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/i-element');
            });
            it("- namespace : IList ", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                delete global._L.Interface
                require('../src/i-element');
                
                expect(global._L.IElement).toBeDefined();
                expect(global._L.Interface.IElement).toBeDefined();
            });
        });
        // describe("load: i-control-schema.js <ISchemaControl>", () => {
        //     beforeEach(() => {
        //         jest.resetModules();
        //         global._L = null;
        //     });
        //     it("- 예외 : 전체 로딩이 인된경우", () => {
        //         expect(() => require('../src/i-control-schema')).toThrow(/Cannot read properties/);
        //     });
        //     it("- 예외 : ExtendError 로딩이 인된경우", () => {
        //         require('../src/message');
        //         expect(() => require('../src/i-control-schema')).toThrow(/ExtendError/);
        //     });
        //     it("- 예외 : 자신만 로딩", () => {
        //         require('../src/extend-error');
        //         require('../src/i-control-schema');
        //     });
        //     it("- namespace : IList ", () => {
        //         require('../src/message');
        //         require('../src/extend-error');
                
        //         require('../src/i-control-schema');
                
        //         expect(global._L.ISchemaControl).toBeDefined();
        //         expect(global._L.Interface.ISchemaControl).toBeDefined();
        //     });
        // });        
        describe("load: i-control-list.js <IListControl>", () => {
            beforeEach(() => {
                jest.resetModules();
                global._L = null;
            });
            it("- 예외 : 전체 로딩이 인된경우", () => {
                expect(() => require('../src/i-control-list')).toThrow(/Cannot read properties/);
            });
            it("- 예외 : ExtendError 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                expect(() => require('../src/i-control-list')).toThrow(/ExtendError/);
            });
            it("- 예외 : 자신만 로딩", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/i-control-list');
            });
            it("- namespace : IListControl ", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                delete global._L.Interface
                require('../src/i-control-list');
                
                expect(global._L.IListControl).toBeDefined();
                expect(global._L.Interface.IListControl).toBeDefined();
            });
        });
        describe("load: i-collection-array.js <IArrayCollection>", () => {
            beforeEach(() => {
                jest.resetModules();
                global._L = null;
            });
            it("- 예외 : 전체 로딩이 인된경우", () => {
                expect(() => require('../src/i-collection-array')).toThrow(/Cannot read properties/);
            });
            it("- 예외 : ExtendError 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                expect(() => require('../src/i-collection-array')).toThrow(/ExtendError/);
            });
            // it("- 예외 : 전체 로딩 안할 때", () => {
            //     require('../src/message');
            //     require('../src/extend-error');
            //     expect(() => require('../src/i-collection-array')).toThrow(/Cannot read properties/);
            // });
            it("- 예외 : 전체 로딩 안할 때", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
        
                expect(() => require('../src/i-collection-array')).toThrow(/ES011/);
            });
            it("- 예외 : Util 로딩이 안 된 경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                // require('../src/type');
                // require('../src/util');
                
                expect(() => require('../src/i-collection-array')).toThrow(/Util/);
            });
            it("- 예외 : ICollection 로딩이 안 된 경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
                
                expect(() => require('../src/i-collection-array')).toThrow(/ICollection/);
            });
            it("- namespace : IArrayCollection ", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
        
                require('../src/i-collection');
                delete global._L.Interface;
                require('../src/i-collection-array');
                
                expect(global._L.IArrayCollection).toBeDefined();
                expect(global._L.Interface.IArrayCollection).toBeDefined();
            });
        });
        describe("load: i-collection.js <ICollection>", () => {
            beforeEach(() => {
                jest.resetModules();
                global._L = null;
            });
            it("- 예외 : 전체 로딩이 인된경우", () => {
                expect(() => require('../src/i-collection')).toThrow(/Cannot read properties/);
            });
            it("- 예외 : ExtendError 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                expect(() => require('../src/i-collection')).toThrow(/ExtendError/);
            });
            // it("- 예외 : 자신만 로딩", () => {
            //     require('../src/message');
            //     require('../src/extend-error');
            //     expect(() => require('../src/i-collection')).toThrow(/Cannot read properties/);
            // });
            it("- 예외 : 모두 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                // require('../src/extend-error');
         
                expect(() => require('../src/i-collection')).toThrow(/ES011/);
            });
            // it("- 예외 : Util 로딩이 인된경우", () => {
            //     require('../src/message');
            //     require('../src/extend-error');
                
            //     expect(() => require('../src/i-collection')).toThrow(/Util/);
            // });
            it("- namespace : ICollection ", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
                delete global._L.Interface
                require('../src/i-collection');
        
                expect(global._L.ICollection).toBeDefined();
                expect(global._L.Interface.ICollection).toBeDefined();
            });
        });
        describe("load: i-collection-property.js <IPropertyCollection>", () => {

            beforeEach(() => {
                jest.resetModules();
                global._L = null;
            });
            it("- 예외 : 전체 로딩이 인된경우", () => {
                expect(() => require('../src/i-collection-property')).toThrow(/Cannot read properties/);
            });
            it("- 예외 : ExtendError 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                expect(() => require('../src/i-collection-property')).toThrow(/ExtendError/);
            });
            it("- 예외 : 자신만 로딩", () => {
                expect(() => require('../src/i-collection-property')).toThrow(/Cannot read properties/);
            });
            it("- 예외 : 모두 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
        
                expect(() => require('../src/i-collection-property')).toThrow(/ES011/);
            });
            it("- 예외 : ICollection 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
         
                 expect(() => require('../src/i-collection-property')).toThrow(/ICollection/);
            });
            it("- namespace : IPropertyCollection ", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
                
                require('../src/i-collection');
                delete global._L.Interface;
                require('../src/i-collection-property');
        
                expect(global._L.IPropertyCollection).toBeDefined();
                expect(global._L.Interface.IPropertyCollection).toBeDefined();
            });
        
        });
    });
    describe("[Meta.*]", () => {
        describe("load: load-namespace.js <loadNamespace()>", () => {
            beforeEach(() => {
                jest.resetModules();
                global._L = null;
            });
            // it("- 예외 : 전체 로딩 안할 때", () => {
            //     expect(() => require('../src/custom-error')).toThrow(/Cannot read properties/);
            // });
            it("- 로딩 성공 ", () => {
                // delete global._L.Common;
                require('../src/load-namespace');
                
                expect(global._L.loadNamespace).toBeDefined();
                expect(global._L.Common.loadNamespace).toBeDefined();
            });
        });
        describe("load: meta-object.js <MetaObject>", () => {
            beforeEach(() => {
                jest.resetModules();
                global._L = null;
             });
            it("- 예외 : 전체 로딩 안할 때", () => {
                expect(() => require('../src/meta-object')).toThrow(/Cannot read properties/);
            });
            it("- 예외 : ExtendError 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                expect(() => require('../src/meta-object')).toThrow(/ExtendError/);
            });
            it("- 예외 : Type 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error'); 
                
                expect(() => require('../src/meta-object')).toThrow(/Type/);
            });
            it("- 예외 : Util 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type'); 
                
                expect(() => require('../src/meta-object')).toThrow(/Util/);
            });
            it("- 예외 : MetaRegistry 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
        
                require('../src/i-object');
                require('../src/i-marshal');
                // require('../src/i-list');
                // require('../src/i-control-list');
                // require('../src/i-serialize');
        
                // require('../src/namespace-manager');
                // require('../src/meta-registry');
        
                expect(() => require('../src/meta-object')).toThrow(/MetaRegistry/);
            });
            it("- 예외 : IObject 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
        
                // require('../src/i-object');
                // require('../src/i-marshal');
                require('../src/i-list');
                require('../src/i-control-list');
                require('../src/i-serialize');
        
                require('../src/namespace-manager');
                require('../src/meta-registry');
        
                expect(() => require('../src/meta-object')).toThrow(/IObject/);
            });
            it("- 예외 : IMarshal 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
        
                require('../src/i-object');
                // require('../src/i-marshal');
                require('../src/i-list');
                require('../src/i-control-list');
                require('../src/i-serialize');
        
                require('../src/namespace-manager');
                require('../src/meta-registry');
        
                expect(() => require('../src/meta-object')).toThrow(/IMarshal/);
            });
            
            it("- 로딩 성공 ", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
        
                require('../src/i-object');
                require('../src/i-marshal');
                require('../src/i-list');
                require('../src/i-control-list');
                require('../src/i-serialize');
        
                require('../src/namespace-manager');
                require('../src/meta-registry');
                delete global._L.Meta
                require('../src/meta-object');
        
                expect(global._L.MetaObject).toBeDefined();
                expect(global._L.Meta.MetaObject).toBeDefined();
            });
            
        });
        describe("load: meta-element.js <MetaElement>", () => {
            beforeEach(() => {
                jest.resetModules();
                global._L = null;
             });
            it("- 예외 : 전체 로딩 안할 때", () => {
                expect(() => require('../src/meta-element')).toThrow(/Cannot read properties/);
            });
            it("- 예외 : ExtendError 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                expect(() => require('../src/meta-element')).toThrow(/ExtendError/);
            });
            it("- 예외 : Util 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
        
                expect(() => require('../src/meta-element')).toThrow(/Util/);
            });
            it("- 예외 : IElement 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
        
                require('../src/i-object');
                require('../src/i-marshal');
        
                expect(() => require('../src/meta-element')).toThrow(/IElement/);
            });
            it("- 예외 : MetaObject 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
        
                require('../src/i-object');
                require('../src/i-marshal');
                require('../src/i-element');
        
                require('../src/i-list');
                require('../src/i-control-list');
                require('../src/i-serialize');
    
                require('../src/namespace-manager');
                require('../src/meta-registry');
        
                expect(() => require('../src/meta-element')).toThrow(/MetaObject/);
            });
            it("- 로딩 성공 ", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
        
                require('../src/i-object');
                require('../src/i-marshal');
                require('../src/i-element');
        
                require('../src/i-list');
                require('../src/i-control-list');
                require('../src/i-serialize');
    
                require('../src/namespace-manager');
                require('../src/meta-registry');
                
                require('../src/meta-object');
                delete global._L.Meta
                require('../src/meta-element');
        
                expect(global._L.MetaElement).toBeDefined();
                expect(global._L.Meta.MetaElement).toBeDefined();
            });
            
        });
        describe("load: meta-registry.js <MetaRegistry>", () => {
            beforeEach(() => {
                jest.resetModules();
                global._L = null;
             });
            it("- 예외 : 전체 로딩 안할 때", () => {
                expect(() => require('../src/meta-registry')).toThrow(/Cannot read properties/);
            });
            it("- 예외 : ExtendError 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                expect(() => require('../src/meta-registry')).toThrow(/ExtendError/);
            });
            it("- 예외 : Util 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
        
                expect(() => require('../src/meta-registry')).toThrow(/Util/);
            });
            it("- 예외 : NamespaceManager 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
        
                require('../src/i-list');
                require('../src/i-control-list');
                // require('../src/namespace-manager');
        
                expect(() => require('../src/meta-registry')).toThrow(/NamespaceManager/);
            });
            it("- 로딩 성공 ", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
        
                require('../src/i-list');
                require('../src/i-control-list');
                require('../src/i-serialize');
                
                require('../src/namespace-manager');
                delete global._L.Meta
                require('../src/meta-registry');
        
                expect(global._L.MetaRegistry).toBeDefined();
                expect(global._L.Meta.MetaRegistry).toBeDefined();
            });
            
        });
        describe("load: namespace-manager.js <NamespaceManager>", () => {
            beforeEach(() => {
                jest.resetModules();
                global._L = null;
             });
            it("- 예외 : 전체 로딩 안할 때", () => {
                expect(() => require('../src/namespace-manager')).toThrow(/Cannot read properties/);
            });
            it("- 예외 : ExtendError 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                expect(() => require('../src/namespace-manager')).toThrow(/ExtendError/);
            });
            it("- 예외 : Type 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error'); 
                
                expect(() => require('../src/namespace-manager')).toThrow(/Type/);
            });
            it("- 예외 : Util 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type'); 
        
                expect(() => require('../src/namespace-manager')).toThrow(/Util/);
            });
            it("- 예외 : IList 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
        
                // require('../src/i-list');
                // require('../src/i-control-list');
                // require('../src/namespace-manager');
        
                expect(() => require('../src/namespace-manager')).toThrow(/IList/);
            });
            it("- 예외 : IListControl 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
        
                require('../src/i-list');
                // require('../src/i-control-list');
                // require('../src/namespace-manager');
        
                expect(() => require('../src/namespace-manager')).toThrow(/IListControl/);
            });
            it("- 예외 : ISerialize 로딩이 인된경우", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
        
                require('../src/i-list');
                require('../src/i-control-list');
                // require('../src/namespace-manager');
        
                expect(() => require('../src/namespace-manager')).toThrow(/ISerialize/);
            });
            it("- 로딩 성공 ", () => {
                require('../src/message-code');
                require('../src/message');
                require('../src/extend-error');
                require('../src/type');
                require('../src/util');
        
                require('../src/i-list');
                require('../src/i-control-list');
                require('../src/i-serialize');
                delete global._L.Meta
                require('../src/namespace-manager');
        
                expect(global._L.NamespaceManager).toBeDefined();
                expect(global._L.Meta.NamespaceManager).toBeDefined();
            });
            
        });
    });
    // describe("[Meta.Entity.*]", () => {
    //     describe("load: collection-column.js <BaseColumnCollection, MetaTableColumnCollection, MetaViewColumnCollection>", () => {
    //         beforeEach(() => {
    //             jest.resetModules();
    //             global._L = null;
    //             });
    //         it("- 예외 : 전체 로딩 안할 때", () => {
    //             expect(() => require('../src/collection-column')).toThrow(/Cannot read properties/);
    //         });
    //         it("- 예외 : ExtendError 로딩이 인된경우", () => {
    //             require('../src/message');
    //             expect(() => require('../src/collection-column')).toThrow(/ExtendError/);
    //         });
    //         it("- 예외 : Type 로딩이 인된경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error'); 
                
    //             expect(() => require('../src/collection-column')).toThrow(/Type/);
    //         });
    //         it("- 예외 : Util 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type'); 
                
    //             expect(() => require('../src/collection-column')).toThrow(/Util/);
    //         });
    //         it("- 예외 : MetaRegistry 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             expect(() => require('../src/collection-column')).toThrow(/MetaRegistry/); 
    //         });
    //         it("- 예외 : MetaElement 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
    //             require('../src/i-element');
    //             require('../src/i-collection');
    //             // require('../src/i-collection-property');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             // require('../src/collection-property');
    //             // require('../src/meta-element');
    //             // require('../src/base-column');
        
    //             expect(() => require('../src/collection-column')).toThrow(/MetaElement/);
    //         });
    //         it("- 예외 : BaseColumn 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
    //             require('../src/i-element');
    //             require('../src/i-collection');
    //             // require('../src/i-collection-property');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             // require('../src/collection-property');
    //             require('../src/meta-element');
    //             // require('../src/base-column');
        
    //             expect(() => require('../src/collection-column')).toThrow(/BaseColumn/);
    //         });
    //         it("- 예외 : PropertyCollection 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
    //             require('../src/i-element');
    //             require('../src/i-collection');
    //             // require('../src/i-collection-property');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             // require('../src/collection-property');
    //             require('../src/meta-element');
    //             require('../src/base-column');
        
    //             expect(() => require('../src/collection-column')).toThrow(/PropertyCollection/);
    //         });
    //         it("- 예외 : MetaColumn 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
    //             require('../src/i-element');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             // require('../src/collection-property');
    //             require('../src/meta-element');
    //             require('../src/base-column');
    //             require('../src/collection-property');
        
    //             expect(() => require('../src/collection-column')).toThrow(/MetaColumn/);
    //         });

    //         it("- 로딩 성공 ", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
    //             require('../src/i-element');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             // require('../src/collection-property');
    //             require('../src/meta-element');
    //             require('../src/base-column');
    //             require('../src/collection-property');
    //             require('../src/meta-column');
                
    //             require('../src/collection-column');
        
    //             expect(global._L.MetaColumn).toBeDefined();  
    //             expect(global._L.Meta.Entity.MetaColumn).toBeDefined();
    //         });
    //     });
    //     describe("load: base-entity.js <BaseEntity>", () => {
    //         beforeEach(() => {
    //             jest.resetModules();
    //             global._L = null;
    //             });
    //         it("- 예외 : 전체 로딩 안할 때", () => {
    //             expect(() => require('../src/base-entity')).toThrow(/Cannot read properties/);
    //         });
    //         it("- 예외 : ExtendError 로딩이 인된경우", () => {
    //             require('../src/message');
    //             expect(() => require('../src/base-entity')).toThrow(/ExtendError/);
    //         });
    //         it("- 예외 : Util 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             expect(() => require('../src/base-entity')).toThrow(/ExtendError/);
    //         });
    //         it("- 예외 : Util 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
        
    //             expect(() => require('../src/base-entity')).toThrow(/Util/);
    //         });
            
    //         it("- 예외 : IGroupControl 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
    //             require('../src/i-element');
    //             // require('../src/i-control-group');
    //             // require('../src/i-control-schema');
    //             // require('../src/i-control-export');
    //             // require('../src/i-control-import');
    //             // require('../src/i-serialize');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/observer');
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');  
        
    //             expect(() => require('../src/base-entity')).toThrow(/IGroupControl/);
    //         });
            
    //         it("- 예외 : ISchemaControl 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
        
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             // require('../src/i-control-schema');
    //             // require('../src/i-control-export');
    //             // require('../src/i-control-import');
    //             // require('../src/i-serialize');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/observer');
    //             // require('../src/namespace-manager');
    //             // require('../src/meta-registry');  
        
    //             expect(() => require('../src/base-entity')).toThrow(/ISchemaControl/);
    //         });
    //         it("- 예외 : IImportControl 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
        
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             // require('../src/i-control-export');
    //             // require('../src/i-control-import');
    //             // require('../src/i-serialize');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/observer');
    //             // require('../src/namespace-manager');
    //             // require('../src/meta-registry');  
        
    //             expect(() => require('../src/base-entity')).toThrow(/IImportControl/);
    //         });
    //         it("- 예외 : IExportControl 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
        
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             // require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             // require('../src/i-serialize');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/observer');
    //             // require('../src/namespace-manager');
    //             // require('../src/meta-registry');  
        
    //             expect(() => require('../src/base-entity')).toThrow(/IExportControl/);
    //         });
    //         it("- 예외 : ISerialize 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             // require('../src/i-serialize');
        
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             // require('../src/i-serialize');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/observer');
    //             // require('../src/namespace-manager');
    //             // require('../src/meta-registry');  
    //             // require('../src/meta-object');
        
    //             expect(() => require('../src/base-entity')).toThrow(/ISerialize/);
    //         });
    //         it("- 예외 : MetaRegistry 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
        
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/observer');
    //             // require('../src/namespace-manager');
    //             // require('../src/meta-registry');    
        
    //             expect(() => require('../src/base-entity')).toThrow(/MetaRegistry/);
    //         });
    //         it("- 예외 : MetaObject 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
        
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/observer');
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             // require('../src/meta-object');
    //             // require('../src/base-collection');
    //             // require('../src/collection-array');
    //             // require('../src/trans-queue');
    //             // require('../src/collection-transaction');
    //             // require('../src/collection-property');
        
    //             expect(() => require('../src/base-entity')).toThrow(/MetaObject/);
    //         });
    //         it("- 예외 : MetaElement 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type'); 
    //             require('../src/util');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
        
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/observer');
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             require('../src/collection-array');
    //             require('../src/trans-queue');
    //             require('../src/collection-transaction');
    //             require('../src/collection-property');
    //             // require('../src/meta-element'); 
        
    //             expect(() => require('../src/base-entity')).toThrow(/MetaElement/);
    //         });
    //         it("- 예외 : MetaRowCollection 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
        
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/observer');
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             require('../src/collection-array');
    //             require('../src/trans-queue');
    //             require('../src/collection-transaction');
    //             require('../src/collection-property');
    //             require('../src/meta-element');
    //             // require('../src/meta-row');
        
    //             // global._L.MetaRow = undefined;
    //             // global._L.Meta.Entity.MetaRow = undefined;
                
    //             expect(() => require('../src/base-entity')).toThrow(/MetaRowCollection/);
    //         });
    //         it("- 예외 : MetaRow 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
        
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/observer');
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             require('../src/collection-array');
    //             require('../src/trans-queue');
    //             require('../src/collection-transaction');
    //             require('../src/collection-property');
    //             require('../src/meta-element');
    //             require('../src/meta-row');
        
    //             global._L.MetaRow = undefined;
    //             // global._L.Meta.Entity.MetaRow = undefined;
        
    //             expect(() => require('../src/base-entity')).toThrow(/MetaRow/);
    //         });
    //         it("- 예외 : BaseColumnCollection 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
        
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/observer');
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             require('../src/collection-array');
    //             require('../src/trans-queue');
    //             require('../src/collection-transaction');
    //             require('../src/collection-property');
    //             require('../src/meta-element');
    //             require('../src/meta-row');
    //             // require('../src/meta-column');
        
    //             // global._L.MetaRow = undefined;
    //             // global._L.Meta.Entity.MetaRow = undefined;
        
    //             expect(() => require('../src/base-entity')).toThrow(/BaseColumnCollection/);
    //         });
            
    //         it("- 로딩 성공 ", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
        
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/observer');
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             require('../src/collection-array');
    //             require('../src/trans-queue');
    //             require('../src/collection-transaction');
    //             require('../src/collection-property');
    //             require('../src/meta-element');
    //             require('../src/meta-row');
    //             require('../src/base-column');
    //             require('../src/meta-column');
    //             require('../src/collection-column');
        
    //             require('../src/base-entity');
        
    //             expect(global._L.BaseEntity).toBeDefined();
    //             expect(global._L.Meta.Entity.BaseEntity).toBeDefined();
    //         });
            
    //     });
    //     describe("load: meta-table.js <MetaTable, MetaTableCollection>", () => {
    //         beforeEach(() => {
    //             jest.resetModules();
    //             global._L = null;
    //             });
    //         it("- 예외 : 전체 로딩 안할 때", () => {
    //             expect(() => require('../src/meta-table')).toThrow(/Cannot read properties/);
    //         });
    //         it("- 예외 : ExtendError 로딩이 인된경우", () => {
    //             require('../src/message');
    //             expect(() => require('../src/meta-table')).toThrow(/ExtendError/);
    //         });
    //         it("- 예외 : Type 로딩이 인된경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error'); 
                
    //             expect(() => require('../src/meta-table')).toThrow(/Type/);
    //         });
    //         it("- 예외 : Util 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type'); 
                
    //             expect(() => require('../src/meta-table')).toThrow(/Util/);
    //         });
    //         it("- 예외 : ITransaction 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
        
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             // require('../src/i-transaction');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             // require('../src/namespace-manager');
    //             // require('../src/meta-registry');        
    //             // require('../src/meta-object');
    //             // require('../src/base-collection');
    //             // require('../src/collection-array');
    //             // require('../src/trans-queue');
    //             // require('../src/collection-transaction');
    //             // require('../src/collection-property');
    //             // require('../src/meta-element');
    //             // require('../src/meta-row');
    //             // require('../src/meta-column');
        
    //             expect(() => require('../src/meta-table')).toThrow(/ITransaction/);
    //         });
    //         it("- 예외 : MetaRegistry 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
        
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-transaction');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/namespace-manager');
    //             // require('../src/meta-registry');        
    //             // require('../src/meta-object');
    //             // require('../src/base-collection');
    //             // require('../src/collection-array');
    //             // require('../src/trans-queue');
    //             // require('../src/collection-transaction');
    //             // // require('../src/collection-property');
    //             // require('../src/meta-element');
    //             // require('../src/meta-row');
    //             // require('../src/meta-column');
    //             expect(() => require('../src/meta-table')).toThrow(/MetaRegistry/);
    //         });
    //         it("- 예외 : PropertyCollection 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
        
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-transaction');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             require('../src/collection-array');
    //             require('../src/trans-queue');
    //             require('../src/collection-transaction');
    //             // require('../src/collection-property');
    //             // require('../src/meta-element');
    //             // require('../src/meta-row');
    //             // require('../src/meta-column');
        
    //             expect(() => require('../src/meta-table')).toThrow(/PropertyCollection/);
    //         });
    //         it("- 예외 : BaseEntity 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
        
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-transaction');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             require('../src/collection-array');
    //             require('../src/trans-queue');
    //             require('../src/collection-transaction');
    //             require('../src/collection-property');
    //             require('../src/meta-element');
    //             require('../src/meta-row');
    //             require('../src/base-column');
    //             require('../src/meta-column');
    //             // require('../src/base-entity');
        
    //             expect(() => require('../src/meta-table')).toThrow(/BaseEntity/);
    //         });
    //         it("- 예외 : MetaTableColumnCollection 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
        
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-transaction');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             require('../src/collection-array');
    //             require('../src/trans-queue');
    //             require('../src/collection-transaction');
    //             require('../src/collection-property');
    //             require('../src/meta-element');
    //             require('../src/meta-row');
    //             require('../src/base-column');
    //             require('../src/meta-column');
    //             require('../src/collection-column');
    //             require('../src/base-entity');

    //             // require('../src/meta-table');
    //             global._L.MetaTableColumnCollection = undefined;
    //             global._L.Meta.Entity.MetaTableColumnCollection = undefined;
        
    //             expect(() => require('../src/meta-table')).toThrow(/MetaTableColumnCollection/);
    //         });
    //         it("- 로딩 성공 ", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
        
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-transaction');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             require('../src/collection-array');
    //             require('../src/trans-queue');
    //             require('../src/collection-transaction');
    //             require('../src/collection-property');
    //             require('../src/meta-element');
    //             require('../src/meta-row');
    //             require('../src/base-column');
    //             require('../src/meta-column');
    //             require('../src/collection-column');
    //             require('../src/base-entity');
    //             require('../src/meta-table');
        
    //             expect(global._L.MetaTable).toBeDefined();
    //             expect(global._L.Meta.Entity.MetaTable).toBeDefined();
    //         });
    //     });
    //     describe("load: meta-view.js <MetaView, MetaViewCollection>", () => {
    //         beforeEach(() => {
    //             jest.resetModules();
    //             global._L = null;
    //             });
    //         it("- 예외 : 전체 로딩 안할 때", () => {
    //             expect(() => require('../src/meta-view')).toThrow(/Cannot read properties/);
    //         });
    //         it("- 예외 : ExtendError 로딩이 인된경우", () => {
    //             require('../src/message');
    //             expect(() => require('../src/meta-view')).toThrow(/ExtendError/);
    //         });
    //         it("- 예외 : Type 로딩이 인된경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error'); 
                
    //             expect(() => require('../src/meta-view')).toThrow(/Type/);
    //         });
    //         it("- 예외 : Util 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type'); 
        
    //             expect(() => require('../src/meta-view')).toThrow(/Util/);
    //         });
    //         it("- 예외 : MetaRegistry 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             // require('../src/i-object');
    //             // require('../src/i-marshal');
    //             // require('../src/i-list');
    //             // require('../src/i-control-list');
        
    //             // require('../src/i-element');
    //             // require('../src/i-control-group');
    //             // require('../src/i-control-schema');
    //             // require('../src/i-control-export');
    //             // require('../src/i-control-import');
    //             // require('../src/i-serialize');
    //             // require('../src/i-collection');
    //             // require('../src/i-collection-property');
    //             // require('../src/i-collection-array');
        
    //             // require('../src/namespace-manager');
    //             // require('../src/meta-registry');    
        
    //             expect(() => require('../src/meta-view')).toThrow(/MetaRegistry/);
    //         });
    //         it("- 예외 : MetaObject 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
        
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             // require('../src/meta-object');
    //             // require('../src/base-collection');
    //             // require('../src/collection-array');
    //             // require('../src/trans-queue');
    //             // require('../src/collection-transaction');
        
    //             expect(() => require('../src/meta-view')).toThrow(/MetaObject/);
    //         });
    //         it("- 예외 : PropertyCollection 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
        
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             require('../src/collection-array');
    //             require('../src/trans-queue');
    //             require('../src/collection-transaction');
    //             // require('../src/collection-property');
    //             require('../src/meta-element');
    //             require('../src/meta-row');
    //             // require('../src/meta-column');
        
    //             expect(() => require('../src/meta-view')).toThrow(/PropertyCollection/);
    //         });
            
    //         it("- 예외 : BaseEntity 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
        
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             require('../src/collection-array');
    //             require('../src/trans-queue');
    //             require('../src/collection-transaction');
    //             require('../src/collection-property');
    //             require('../src/meta-element');
    //             require('../src/meta-row');
    //             require('../src/base-column');
    //             require('../src/meta-column');
    //             // require('../src/base-entity');
        
    //             expect(() => require('../src/meta-view')).toThrow(/BaseEntity/);
    //         });
    //         it("- 예외 : MetaViewColumnCollection 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
        
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             require('../src/collection-array');
    //             require('../src/trans-queue');
    //             require('../src/collection-transaction');
    //             require('../src/collection-property');
    //             require('../src/meta-element');
    //             require('../src/meta-row');
    //             require('../src/base-column');
    //             require('../src/meta-column');
    //             require('../src/collection-column');
    //             require('../src/base-entity');
    //             // require('../src/meta-view');
        
    //             global._L.MetaViewColumnCollection = undefined;
    //             global._L.Meta.Entity.MetaViewColumnCollection = undefined;
        
    //             expect(() => require('../src/meta-view')).toThrow(/MetaViewColumnCollection/);
    //         });
    //         it("- 로딩 성공 ", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             require('../src/collection-array');
    //             require('../src/trans-queue');
    //             require('../src/collection-transaction');
    //             require('../src/collection-property');
    //             require('../src/meta-element');
    //             require('../src/meta-row');
    //             require('../src/base-column');
    //             require('../src/meta-column');
    //             require('../src/collection-column');
    //             require('../src/base-entity');
    //             require('../src/meta-view');
        
    //             expect(global._L.MetaView).toBeDefined();
    //             expect(global._L.Meta.Entity.MetaView).toBeDefined();
    //         });
    //     });
    //     describe("load: meta-set.js <MetaSet>", () => {
    //         beforeEach(() => {
    //             jest.resetModules();
    //             global._L = null;
    //             });
    //         it("- 예외 : 전체 로딩 안할 때", () => {
    //             expect(() => require('../src/meta-set')).toThrow(/Cannot read properties/);
    //         });
    //         it("- 예외 : ExtendError 로딩이 인된경우", () => {
    //             require('../src/message');
    //             expect(() => require('../src/meta-set')).toThrow(/ExtendError/);
    //         });
    //         it("- 예외 : Util 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
                
    //             expect(() => require('../src/meta-set')).toThrow(/Util/);
    //         });
            
    //         it("- 예외 : ISchemaControl 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             // require('../src/i-control-schema');
    //             // require('../src/i-control-export');
    //             // require('../src/i-control-import');
    //             // require('../src/i-serialize');
    //             // require('../src/i-transaction');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             // require('../src/namespace-manager');
    //             // require('../src/meta-registry'); 
        
    //             expect(() => require('../src/meta-set')).toThrow(/ISchemaControl/);
    //         });
    //         it("- 예외 : IImportControl 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             // require('../src/i-control-export');
    //             // require('../src/i-control-import');
    //             // require('../src/i-serialize');
    //             // require('../src/i-transaction');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             // require('../src/namespace-manager');
    //             // require('../src/meta-registry'); 
        
    //             expect(() => require('../src/meta-set')).toThrow(/IImportControl/);
    //         });
    //         it("- 예외 : IExportControl 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             // require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             // require('../src/i-serialize');
    //             // require('../src/i-transaction');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             // require('../src/namespace-manager');
    //             // require('../src/meta-registry');  
        
    //             expect(() => require('../src/meta-set')).toThrow(/IExportControl/);
    //         });
    //         it("- 예외 : ISerialize 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             // require('../src/i-serialize');
    //             // require('../src/i-transaction');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             // require('../src/namespace-manager');
    //             // require('../src/meta-registry');        
        
    //             expect(() => require('../src/meta-set')).toThrow(/ISerialize/);
    //         });
    //         it("- 예외 : ITransaction 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             // require('../src/i-transaction');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             // require('../src/namespace-manager');
    //             // require('../src/meta-registry');        
        
    //             expect(() => require('../src/meta-set')).toThrow(/ITransaction/);
    //         });
    //         it("- 예외 : MetaRegistry 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-transaction');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             // require('../src/namespace-manager');
    //             // require('../src/meta-registry');        
    //             // require('../src/meta-object');
    //             // require('../src/base-collection');
    //             // require('../src/collection-array');
    //             // require('../src/trans-queue');
    //             // require('../src/collection-transaction');
    //             // require('../src/collection-property');
        
    //             expect(() => require('../src/meta-set')).toThrow(/MetaRegistry/);
    //         });
    //         it("- 예외 : MetaElement 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-transaction');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             require('../src/collection-array');
    //             require('../src/trans-queue');
    //             require('../src/collection-transaction');
    //             require('../src/collection-property');
    //             // require('../src/meta-element');
    //             // require('../src/meta-row');
    //             // require('../src/meta-column');
        
    //             expect(() => require('../src/meta-set')).toThrow(/MetaElement/);
    //         });
    //         it("- 예외 : BaseEntity 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-transaction');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             require('../src/collection-array');
    //             require('../src/trans-queue');
    //             require('../src/collection-transaction');
    //             require('../src/collection-property');
    //             require('../src/meta-element');
    //             require('../src/meta-row');
    //             require('../src/base-column');
    //             require('../src/meta-column');
    //             // require('../src/base-entity');
        
    //             expect(() => require('../src/meta-set')).toThrow(/BaseEntity/);
    //         });
    //         it("- 예외 : MetaTableCollection 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-transaction');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             require('../src/collection-array');
    //             require('../src/trans-queue');
    //             require('../src/collection-transaction');
    //             require('../src/collection-property');
    //             require('../src/meta-element');
    //             require('../src/meta-row');
    //             require('../src/base-column');
    //             require('../src/meta-column');
    //             require('../src/collection-column');
    //             require('../src/base-entity');
    //             // require('../src/meta-table');
    //             // require('../src/meta-view');
        
    //             expect(() => require('../src/meta-set')).toThrow(/MetaTableCollection/);
    //         });
    //         it("- 예외 : MetaViewCollection 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-transaction');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             require('../src/collection-array');
    //             require('../src/trans-queue');
    //             require('../src/collection-transaction');
    //             require('../src/collection-property');
    //             require('../src/meta-element');
    //             require('../src/meta-row');
    //             require('../src/base-column');
    //             require('../src/meta-column');
    //             require('../src/collection-column');
    //             require('../src/base-entity');
    //             require('../src/meta-table');
    //             // require('../src/meta-view');
        
    //             expect(() => require('../src/meta-set')).toThrow(/MetaViewCollection/);
    //         });
    //         it("- 로딩 성공 ", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-element');
    //             require('../src/i-control-group');
    //             require('../src/i-control-schema');
    //             require('../src/i-control-export');
    //             require('../src/i-control-import');
    //             require('../src/i-serialize');
    //             require('../src/i-transaction');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
    //             require('../src/i-collection-array');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             require('../src/collection-array');
    //             require('../src/trans-queue');
    //             require('../src/collection-transaction');
    //             require('../src/collection-property');
    //             require('../src/meta-element');
    //             require('../src/meta-row');
    //             require('../src/base-column');
    //             require('../src/meta-column');
    //             require('../src/collection-column');
    //             require('../src/base-entity');
    //             require('../src/meta-table');
    //             require('../src/meta-view');
    //             require('../src/meta-set');
        
    //             expect(global._L.MetaSet).toBeDefined();  
    //             expect(global._L.Meta.Entity.MetaSet).toBeDefined();
    //         });
    //     });
    //     describe("load: base-column.js <BaseColumn>", () => {
    //         beforeEach(() => {
    //             jest.resetModules();
    //             global._L = null;
    //             });
    //         it("- 예외 : 전체 로딩 안할 때", () => {
    //             expect(() => require('../src/base-column')).toThrow(/Cannot read properties/);
    //         });
    //         it("- 예외 : ExtendError 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             expect(() => require('../src/base-column')).toThrow(/ExtendError/);
    //         });
    //         it("- 예외 : Type 로딩이 인된경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error'); 
                
    //             expect(() => require('../src/base-column')).toThrow(/Type/);
    //         });
    //         it("- 예외 : Util 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type'); 
                
    //             expect(() => require('../src/base-column')).toThrow(/Util/);
    //         });
    //         it("- 예외 : MetaRegistry 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             expect(() => require('../src/base-column')).toThrow(/MetaRegistry/);
    //         });
    
    //         it("- 예외 : MetaElement 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
    //             require('../src/i-element');
    //             // require('../src/i-collection');
    //             // require('../src/i-collection-property');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             // require('../src/base-collection');
    //             // require('../src/collection-property');
    //             // require('../src/meta-element');
    //             // require('../src/base-column');
        
    //             expect(() => require('../src/base-column')).toThrow(/MetaElement/);
    //         });
            
    //         it("- 로딩 성공 ", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
    //             require('../src/i-element');
    //             // require('../src/i-collection');
    //             // require('../src/i-collection-property');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             // require('../src/base-collection');
    //             // require('../src/collection-property');
    //             require('../src/meta-element');
    //             require('../src/base-column');
    //             // require('../src/meta-column');
        
    //             expect(global._L.BaseColumn).toBeDefined();  
    //             expect(global._L.Meta.Entity.BaseColumn).toBeDefined();
    //         });
    //     });
    //     describe("load: meta-column.js <MetaColumn>", () => {
    //         beforeEach(() => {
    //             jest.resetModules();
    //             global._L = null;
    //             });
    //         it("- 예외 : 전체 로딩 안할 때", () => {
    //             expect(() => require('../src/meta-column')).toThrow(/Cannot read properties/);
    //         });
    //         it("- 예외 : ExtendError 로딩이 인된경우", () => {
    //             require('../src/message');
    //             expect(() => require('../src/meta-column')).toThrow(/ExtendError/);
    //         });
    //         it("- 예외 : Type 로딩이 인된경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error'); 
                
    //             expect(() => require('../src/meta-column')).toThrow(/Type/);
    //         });
    //         it("- 예외 : Util 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type'); 
                
    //             expect(() => require('../src/meta-column')).toThrow(/Util/);
    //         });
    //         it("- 예외 : Observer 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             // require('../src/observer');
        
    //             expect(() => require('../src/meta-column')).toThrow(/Observer/);
    //         });
    //         it("- 예외 : MetaRegistry 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             expect(() => require('../src/meta-column')).toThrow(/BaseColumn/); 
    //         });
    //         it("- 예외 : BaseColumn 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
    //             require('../src/i-element');
    //             require('../src/i-collection');
    //             // require('../src/i-collection-property');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             // require('../src/collection-property');
    //             require('../src/meta-element');
    //             // require('../src/base-column');
        
    //             expect(() => require('../src/meta-column')).toThrow(/BaseColumn/);
    //         });
            
    //         it("- 로딩 성공 ", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
    //             require('../src/i-element');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             require('../src/collection-property');
    //             require('../src/meta-element');
    //             require('../src/base-column');
    //             require('../src/meta-column');
        
    //             expect(global._L.MetaColumn).toBeDefined();  
    //             expect(global._L.Meta.Entity.MetaColumn).toBeDefined();
    //         });
    //     });
    //     describe("load: object-column.js <ObjectColumn>", () => {
    //         beforeEach(() => {
    //             jest.resetModules();
    //             global._L = null;
    //             });
    //         it("- 예외 : 전체 로딩 안할 때", () => {
    //             expect(() => require('../src/object-column')).toThrow(/Cannot read properties/);
    //         });
    //         it("- 예외 : ExtendError 로딩이 인된경우", () => {
    //             require('../src/message');
    //             expect(() => require('../src/object-column')).toThrow(/ExtendError/);
    //         });
    //         it("- 예외 : Util 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
                
    //             expect(() => require('../src/object-column')).toThrow(/Util/);
    //         });
    //         it("- 예외 : Observer 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             // require('../src/observer');
        
    //             expect(() => require('../src/object-column')).toThrow(/Observer/);
    //         });
    //         it("- 예외 : MetaRegistry 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             expect(() => require('../src/object-column')).toThrow(/MetaRegistry/);
    //         });
    
    //         it("- 예외 : MetaElement 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
    //             // require('../src/i-element');
    //             // require('../src/i-collection');
    //             // require('../src/i-collection-property');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             // require('../src/meta-object');
    //             // require('../src/base-collection');
    //             // require('../src/collection-property');
    //             // require('../src/meta-element');
        
    //             expect(() => require('../src/object-column')).toThrow(/MetaObject/);
    //         });
    
    //         it("- 예외 : MetaElement 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
    //             // require('../src/i-element');
    //             // require('../src/i-collection');
    //             // require('../src/i-collection-property');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             // require('../src/base-collection');
    //             // require('../src/collection-property');
    //             // require('../src/meta-element');
        
    //             expect(() => require('../src/object-column')).toThrow(/MetaElement/);
    //         });
    //         it("- 예외 : PropertyCollection 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
    //             require('../src/i-element');
    //             require('../src/i-collection');
    //             // require('../src/i-collection-property');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             // require('../src/collection-property');
    //             require('../src/meta-element');
    //             require('../src/base-column');
        
    //             expect(() => require('../src/object-column')).toThrow(/PropertyCollection/);
    //         });
    //         it("- 예외 : BaseColumn 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
    //             require('../src/i-element');
    //             require('../src/i-collection');
    //             // require('../src/i-collection-property');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             // require('../src/collection-property');
    //             require('../src/meta-element');
    //             // require('../src/base-column');
        
    //             expect(() => require('../src/object-column')).toThrow(/BaseColumn/);
    //         });
            
    //         it("- 로딩 성공 ", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
    //             require('../src/i-element');
    //             require('../src/i-collection');
    //             require('../src/i-collection-property');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             require('../src/collection-property');
    //             require('../src/meta-element');
    //             require('../src/base-column');
    //             require('../src/object-column');
        
    //             expect(global._L.ObjectColumn).toBeDefined();  
    //             expect(global._L.Meta.Entity.ObjectColumn).toBeDefined();
    //         });
    //     });
    //     describe("load: meta-row.js <MetaRow>", () => {
    //         beforeEach(() => {
    //             jest.resetModules();
    //             global._L = null;
    //             });
    //         it("- 예외 : 전체 로딩 안할 때", () => {
    //             expect(() => require('../src/meta-row')).toThrow(/Cannot read properties/);
    //         });
    //         it("- 예외 : ExtendError 로딩이 인된경우", () => {
    //             require('../src/message');
    //             expect(() => require('../src/meta-row')).toThrow(/ExtendError/);
    //         });
    //         it("- 예외 : Type 로딩이 인된경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error'); 
                
    //             expect(() => require('../src/meta-row')).toThrow(/Type/);
    //         });
    //         it("- 예외 : Util 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type'); 
                
    //             expect(() => require('../src/meta-row')).toThrow(/Util/);
    //         });
    //         it("- 예외 : Observer 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             // require('../src/observer');
        
    //             expect(() => require('../src/meta-row')).toThrow(/Observer/);
    //         });
            
    //         it("- 예외 : IList 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             // require('../src/i-list');
    //             require('../src/i-control-list');
        
    //             expect(() => require('../src/meta-row')).toThrow(/IList/);
    //         });
    //         it("- 예외 : MetaRegistry 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
        
    //             require('../src/namespace-manager');
    //             // require('../src/meta-registry');  
        
    //             expect(() => require('../src/meta-row')).toThrow(/MetaRegistry/);
    //         });
    
    //         it("- 예외 : MetaObject 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             // require('../src/meta-object');
        
    //             expect(() => require('../src/meta-row')).toThrow(/MetaObject/);
    //         });
    //         it("- 예외 : TransactionCollection 로딩이 안 된 경우", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
    //             // require('../src/i-element');
    //             // require('../src/i-collection');
    //             // require('../src/i-collection-array');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             // require('../src/base-collection');
    //             // require('../src/collection-array');
    //             // require('../src/trans-queue');
    //             // require('../src/collection-transaction');
        
    //             expect(() => require('../src/meta-row')).toThrow(/TransactionCollection/);
    //         });
            
    //         it("- 로딩 성공 ", () => {
    //             require('../src/message');
    //             require('../src/extend-error');
    //             require('../src/type');
    //             require('../src/util');
    //             require('../src/observer');
        
    //             require('../src/i-object');
    //             require('../src/i-marshal');
    //             require('../src/i-list');
    //             require('../src/i-control-list');
    //             require('../src/i-serialize');
    //             // require('../src/i-element');
    //             require('../src/i-collection');
    //             require('../src/i-collection-array');
        
    //             require('../src/namespace-manager');
    //             require('../src/meta-registry');        
    //             require('../src/meta-object');
    //             require('../src/base-collection');
    //             require('../src/collection-array');
    //             require('../src/trans-queue');
    //             require('../src/collection-transaction');
    //             // require('../src/meta-element');
    //             require('../src/meta-row');
        
    //             expect(global._L.MetaRow).toBeDefined();  
    //             expect(global._L.Meta.Entity.MetaRow).toBeDefined();
    //         });
    //     });
        
    // });
});

