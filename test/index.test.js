//==============================================================
// gobal defined
import { jest} from '@jest/globals';

import { Message } from 'logic-core';
import { ExtendError } from 'logic-core';
import { Type } from 'logic-core';
import { Util } from 'logic-core';
import { EventEmitter } from 'logic-core';
import { IObject } from 'logic-core';
import { IMarshal } from 'logic-core';
import { ICollection } from 'logic-core';
import { IPropertyCollection } from 'logic-core';
import { IElement } from 'logic-core';
import { IList } from 'logic-core';
import { IListControl } from 'logic-core';
import { ISerialize } from 'logic-core';
import { IArrayCollection } from 'logic-core';
import { NamespaceManager } from 'logic-core';
import { MetaRegistry } from 'logic-core';
import { MetaObject } from 'logic-core';
import { MetaElement } from 'logic-core';
import { BaseCollection } from 'logic-core';
import { ArrayCollection } from 'logic-core';
import { PropertyCollection } from 'logic-core';

//==============================================================
// test
describe("[target: index.js]", () => {
    describe('EventEmitter, ExtendError, Util', () => {
        it('- _L.*  ', () => {
            expect(typeof Message).toBe('function');
            expect(typeof ExtendError).toBe('function');
            expect(typeof Type).toBe('object');
            expect(typeof Util).toBe('object');
            expect(typeof EventEmitter).toBe('function');
            expect(typeof IObject).toBe('function');
            expect(typeof IMarshal).toBe('function');
            expect(typeof ICollection).toBe('function');
            expect(typeof IPropertyCollection).toBe('function');
            expect(typeof IElement).toBe('function');
            expect(typeof IList).toBe('function');
            expect(typeof IListControl).toBe('function');
            expect(typeof ISerialize).toBe('function');
            expect(typeof IArrayCollection).toBe('function');
            expect(typeof NamespaceManager).toBe('function');
            expect(typeof MetaRegistry).toBe('function');
            expect(typeof MetaObject).toBe('function');
            expect(typeof MetaElement).toBe('function');
            expect(typeof BaseCollection).toBe('function');
            expect(typeof ArrayCollection).toBe('function');
            expect(typeof PropertyCollection).toBe('function');
        });
    });
});

