//==============================================================
// gobal defined
// const index   = require('..');
import {EventEmitter} from 'logic-core';
import {ExtendError} from 'logic-core';
import {Util} from 'logic-core';
import {Type} from 'logic-core';
import {IObject} from 'logic-core';
import {IMarshal} from 'logic-core';
import {ICollection} from 'logic-core';
import {IPropertyCollection} from 'logic-core';
import {BaseCollection} from 'logic-core';
import {ArrayCollection} from 'logic-core';
import {PropertyCollection} from 'logic-core';
import {MetaObject} from 'logic-core';
import {MetaElement} from 'logic-core';
import {MetaRegistry} from 'logic-core';
import {NamespaceManager} from 'logic-core';
import {jest} from '@jest/globals';


//==============================================================
// test
describe("[target: index.js]", () => {
    describe('EventEmitter, ExtendError, Util', () => {
        it('- _L.*  ', () => {
            expect(typeof EventEmitter).toBe('function');
            expect(typeof ExtendError).toBe('function');
            expect(typeof Util.inherits).toBe('function');
            expect(typeof Util.getArrayDepth).toBe('function');
            expect(typeof Util.createGuid).toBe('function');
            expect(typeof Util.implements).toBe('function');
            expect(typeof Util.deepCopy).toBe('function');
            expect(typeof Type.isMatchType).toBe('function');
            expect(typeof Type.matchType).toBe('function');
            expect(typeof Type.getAllProperties).toBe('function');
            expect(typeof Type.deepEqual).toBe('function');
        });
    });
    describe(`IObject, IMarshal, 
    ICollection, IPropertyCollection,
    IAllControl, IGroupControl, ILookupControl, IPartControl,
    IExportControl, IImportControl`, () => {
        it('- _L.* ', () => {
            expect(typeof IObject).toBe('function');
            expect(typeof IMarshal).toBe('function');
            expect(typeof ICollection).toBe('function');
            expect(typeof IPropertyCollection).toBe('function');
            // expect(typeof index.IExportControl).toBe('function');
            // expect(typeof index.IGroupControl).toBe('function');
            // expect(typeof index.IImportControl).toBe('function');
        });
    });
    describe('BaseCollection, ArrayCollection, PropertyCollection', () => {
        it('- _L.* ', () => {
            expect(typeof BaseCollection).toBe('function');
            expect(typeof ArrayCollection).toBe('function');
            expect(typeof PropertyCollection).toBe('function');
        });
    });
    describe('MetaObject, MetaElement', () => {
        it('- _L.* ', () => {
            expect(typeof MetaObject).toBe('function');
            expect(typeof MetaElement).toBe('function');
            expect(typeof MetaRegistry).toBe('function');
            expect(typeof NamespaceManager).toBe('function');
        });
        
    });
});

