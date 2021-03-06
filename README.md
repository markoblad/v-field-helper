[![Build Status](https://travis-ci.org/markoblad/v-field-helper.svg?branch=master)](https://travis-ci.org/markoblad/v-field-helper)[![Coverage Status](https://coveralls.io/repos/github/markoblad/v-field-helper/badge.svg?branch=master)](https://coveralls.io/github/markoblad/v-field-helper?branch=master)

# v-field-helper
A Node.js module for interface and helpers for data inputs and json structures
## Installation 
```sh
npm install v-field-helper --save
yarn add v-field-helper
bower install v-field-helper --save
```
## Usage
### Javascript
```javascript
var vfh = require('v-field-helper');
VFieldHelper = vfh.VFieldHelper;
var result = VFieldHelper.buildBaseString('purchaser');
```
```sh
Output should be:
  {
    placeholder: 'Type value_',
    custom_input_size: '4',
    input_name: 'purchaser',
    label: 'Purchaser',
    display_name: 'Purchaser',
    terse_display_name: 'Purchaser',
    hint: 'Purchaser',
    required: false,
    editable: true,
    as: 'string',
    fill_approach: 'manual',
    display: true,
    default_visible: true,
  }
```
### TypeScript
```typescript
import { VFieldHelper } from 'v-field-helper';
console.log(VFieldHelper.buildBaseString('purchaser'))
```
```sh
Output should be:
  {
    placeholder: 'Type value_',
    custom_input_size: '4',
    input_name: 'purchaser',
    label: 'Purchaser',
    display_name: 'Purchaser',
    terse_display_name: 'Purchaser',
    hint: 'Purchaser',
    required: false,
    editable: true,
    as: 'string',
    fill_approach: 'manual',
    display: true,
    default_visible: true,
  }
```
### AMD
```javascript
define(function(require,exports,module){
  var vfh = require('v-field-helper');
});
```
## Test 
```sh
npm run test
```
