/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import { map } from '../utils/mapper';
import { parse } from '../utils/parser';
import fs from 'fs';
import { resolve } from 'path';

test('basic error; 0 context', async () => {
  expect.assertions(1);
  const error = 'TypeError: document.body.missing is not a function\n    at App.componentDidMount (https://young-mountain-65748.herokuapp.com/static/js/bundle.js:26122:21)\n    at https://young-mountain-65748.herokuapp.com/static/js/bundle.js:30091:25\n    at measureLifeCyclePerf (https://young-mountain-65748.herokuapp.com/static/js/bundle.js:29901:12)\n    at https://young-mountain-65748.herokuapp.com/static/js/bundle.js:30090:11\n    at CallbackQueue.notifyAll (https://young-mountain-65748.herokuapp.com/static/js/bundle.js:13256:22)\n    at ReactReconcileTransaction.close (https://young-mountain-65748.herokuapp.com/static/js/bundle.js:35124:26)\n    at ReactReconcileTransaction.closeAll (https://young-mountain-65748.herokuapp.com/static/js/bundle.js:7390:25)\n    at ReactReconcileTransaction.perform (https://young-mountain-65748.herokuapp.com/static/js/bundle.js:7337:16)\n    at batchedMountComponentIntoNode (https://young-mountain-65748.herokuapp.com/static/js/bundle.js:14204:15)\n    at ReactDefaultBatchingStrategyTransaction.perform (https://young-mountain-65748.herokuapp.com/static/js/bundle.js:7324:20)\n    at Object.batchedUpdates (https://young-mountain-65748.herokuapp.com/static/js/bundle.js:33900:26)\n    at Object.batchedUpdates (https://young-mountain-65748.herokuapp.com/static/js/bundle.js:2181:27)\n    at Object._renderNewRootComponent (https://young-mountain-65748.herokuapp.com/static/js/bundle.js:14398:18)\n    at Object._renderSubtreeIntoContainer (https://young-mountain-65748.herokuapp.com/static/js/bundle.js:14479:32)\n    at Object.render (https://young-mountain-65748.herokuapp.com/static/js/bundle.js:14500:23)\n    at Object.friendlySyntaxErrorLabel (https://young-mountain-65748.herokuapp.com/static/js/bundle.js:17287:20)\n    at __webpack_require__ (https://young-mountain-65748.herokuapp.com/static/js/bundle.js:660:30)\n    at fn (https://young-mountain-65748.herokuapp.com/static/js/bundle.js:84:20)\n    at Object.<anonymous> (https://young-mountain-65748.herokuapp.com/static/js/bundle.js:41219:18)\n    at __webpack_require__ (https://young-mountain-65748.herokuapp.com/static/js/bundle.js:660:30)\n    at validateFormat (https://young-mountain-65748.herokuapp.com/static/js/bundle.js:709:39)\n    at https://young-mountain-65748.herokuapp.com/static/js/bundle.js:712:10';

  fetch.mockResponseOnce(
    fs
      .readFileSync(resolve(__dirname, '../../fixtures/bundle.mjs'))
      .toString('utf8')
  );
  fetch.mockResponseOnce(
    fs
      .readFileSync(resolve(__dirname, '../../fixtures/bundle.mjs.map'))
      .toString('utf8')
  );
  const frames = await map(parse(error), 0);
  expect(frames).toEqual(
    JSON.parse(
      fs
        .readFileSync(resolve(__dirname, '../../fixtures/bundle.json'))
        .toString('utf8')
    )
  );
});

test('default context (3)', async () => {
  expect.assertions(1);
  const error = 'TypeError: document.body.missing is not a function\n    at App.componentDidMount (https://young-mountain-65748.herokuapp.com/static/js/bundle.js:26122:21)';

  fetch.mockResponseOnce(
    fs
      .readFileSync(resolve(__dirname, '../../fixtures/bundle.mjs'))
      .toString('utf8')
  );
  fetch.mockResponseOnce(
    fs
      .readFileSync(resolve(__dirname, '../../fixtures/bundle.mjs.map'))
      .toString('utf8')
  );
  const frames = await map(parse(error));
  expect(frames).toEqual(
    JSON.parse(
      fs
        .readFileSync(resolve(__dirname, '../../fixtures/bundle-default.json'))
        .toString('utf8')
    )
  );
});

test('bad comes back same', async () => {
  expect.assertions(2);
  const error = 'TypeError: document.body.missing is not a function\n    at App.componentDidMount (A:1:2)';
  const orig = parse(error);
  expect(orig).toEqual([
    {
      _originalColumnNumber: null,
      _originalFileName: null,
      _originalFunctionName: null,
      _originalLineNumber: null,
      _originalScriptCode: null,
      _scriptCode: null,
      columnNumber: 2,
      fileName: 'A',
      functionName: 'App.componentDidMount',
      lineNumber: 1,
    },
  ]);
  const frames = await map(orig);
  expect(frames).toEqual(orig);
});
