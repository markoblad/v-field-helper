'use strict';
var expect = require('chai').expect;
var VTools = require('v-tools').VTools;
var index = require('../dist/index.js');
var VFieldInterface = index.VFieldInterface;
var VFieldSubTypeHash = index.VFieldSubTypeHash;
var VFieldHelper = index.VFieldHelper;

describe('VFieldHelper functions test', () => {
  // it('should implement the VFieldInterface', () => {
  //   var result = typeof VFieldInterface;
  //   expect(result).to.equal('VFieldInterface');
  // });
  it('should get positiveDecimalMask', () => {
    var result = VFieldHelper.positiveDecimalMask();
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines([RegExp('\\d')])); // TODO: check this for decimals
  });
  it('should get positiveIntegerMask', () => {
    var result = VFieldHelper.positiveIntegerMask();
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines([RegExp('\\d')]));
  });

  it('should get positiveIntegerUnmask', () => {
    var result = VFieldHelper.positiveIntegerUnmask(' $ 1,234.99% ');
    expect(result).to.equal(1234);
  });
  it('should get positiveDecimalUnmask', () => {
    var result = VFieldHelper.positiveDecimalUnmask(' $ 1,234.99% ');
    expect(result).to.equal(1234.99);
  });
  it('should get V_FIELD_TYPES', () => {
    var result = VFieldHelper.V_FIELD_TYPES.basic_input;
    expect(VTools.hashes_to_lines([result])).to.equal(VTools.hashes_to_lines([{
      vInputType: 'vInput',
      label: 'Basic Input',
      hint: 'Basic Input',
      editable: true,
    }]));
  });
  it('should get V_FIELD_TYPES_COLLECTION', () => {
    var result = VFieldHelper.V_FIELD_TYPES_COLLECTION;
    expect(result[0].toString()).to.equal(['basic_input', 'Basic Input'].toString());
  });
  it('should get EDITABLE_V_FIELD_HELPER_ATTS', () => {
    var result = VFieldHelper.EDITABLE_V_FIELD_HELPER_ATTS;
    expect(result[0]).to.equal('label');
  });
  it('should get labelize', () => {
    var result = VFieldHelper.labelize('1 2 3_markPaulABC-def $100.00');
    expect(result).to.equal('1 2 3 Mark Paul Abc Def $ 100 . 00');
  });

  it('should get hintize', () => {
    var result = VFieldHelper.hintize('1 2 3_markPaulABC-def $100.00');
    expect(result).to.equal('1 2 3 mark paul abc def $ 100 . 00');
  });

  it('should return fieldToLabel for various', () => {
    var result = [
      VFieldHelper.fieldToLabel('purchaser'),
      VFieldHelper.fieldToLabel('purchaser_spouse', true),
      VFieldHelper.fieldToLabel('purchaser_spouse', false),
      VFieldHelper.fieldToLabel('purchase_hashes'),
      VFieldHelper.fieldToLabel('purchase_hashes_summed_shares'),
      VFieldHelper.fieldToLabel('purchase_hashed_shares'),
    ];
    var expectation = [
      'Purchaser',
      'Purchaser Spouse',
      'Purchaser spouse',
      'Purchases',
      'Sum Of Purchases Shares',
      'Shares',
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });
  it('should return addDataAttsToFieldHelp for various', () => {
    var result = [
      VFieldHelper.addDataAttsToFieldHelp({input_html: {data: {some_att: 'empty'}}}).input_html.data,
      VFieldHelper.addDataAttsToFieldHelp(undefined, {some_att: 'empty'}),
      VFieldHelper.addDataAttsToFieldHelp({input_html: {data: {some_att: 'empty'}}}, {some_att: 'not_empty'}).input_html.data,
      VFieldHelper.addDataAttsToFieldHelp({input_html: {data: {some_att: 'empty'}}}, {some_other_att: 'not_empty'}).input_html.data,
    ];
    var expectation = [
      {some_att: 'empty'},
      undefined,
      {some_att: 'not_empty'},
      {some_other_att: 'not_empty', some_att: 'empty'},
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildGeneratedNames for various', () => {
    var result = [
      VFieldHelper.buildGeneratedNames('purchaser'),
      VFieldHelper.buildGeneratedNames('purchaser_spouse', {label: 'Spouse of the Buyer'}),
      VFieldHelper.buildGeneratedNames('purchaser_spouse', {label: 'Spouse of the Buyer'}, {question: true}),
      VFieldHelper.buildGeneratedNames('purchaser_spouse', null, {question: true}),
      VFieldHelper.buildGeneratedNames('has_purchaser_spouse', null, {question: true}),
      VFieldHelper.buildGeneratedNames('is_purchaser_spouse', null, {question: true}),
    ];
    var expectation = [
      {
        input_name: 'purchaser',
        label: 'Purchaser',
        display_name: 'Purchaser',
        terse_display_name: 'Purchaser',
        hint: 'Purchaser',
        required: false
      },
      {
        label: 'Spouse of the Buyer',
        input_name: 'purchaser_spouse',
        display_name: 'Purchaser Spouse',
        terse_display_name: 'Purchaser Spouse',
        hint: 'Purchaser spouse',
        required: false
      },
      {
        label: 'Spouse of the Buyer',
        input_name: 'purchaser_spouse',
        display_name: 'Purchaser Spouse?',
        terse_display_name: 'Purchaser Spouse?',
        hint: 'Purchaser spouse?',
        required: false
      },
      {
        input_name: 'purchaser_spouse',
        label: 'Purchaser Spouse?',
        display_name: 'Purchaser Spouse?',
        terse_display_name: 'Purchaser Spouse?',
        hint: 'Purchaser spouse?',
        required: false
      },
      {
        input_name: 'has_purchaser_spouse',
        label: 'Purchaser Spouse?',
        display_name: 'Purchaser Spouse?',
        terse_display_name: 'Purchaser Spouse?',
        hint: 'Purchaser spouse?',
        required: false
      },
      {
        input_name: 'is_purchaser_spouse',
        label: 'Purchaser Spouse?',
        display_name: 'Purchaser Spouse?',
        terse_display_name: 'Purchaser Spouse?',
        hint: 'Purchaser spouse?',
        required: false
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildGeneratedPercentNames for various', () => {
    var result = [
      VFieldHelper.buildGeneratedPercentNames('purchaser_spouse_perc', null),
      VFieldHelper.buildGeneratedPercentNames('purchaser_spouse_perc_completed', null),
    ];
    var expectation = [
      {
        input_name: 'purchaser_spouse_perc',
        label: 'Purchaser Spouse Percentage',
        display_name: 'Purchaser Spouse Percentage',
        terse_display_name: 'Purchaser Spouse %',
        hint: 'Purchaser spouse percentage',
        required: false
      },
      {
        input_name: 'purchaser_spouse_perc_completed',
        label: 'Purchaser Spouse Percentage Completed',
        display_name: 'Purchaser Spouse Percentage Completed',
        terse_display_name: 'Purchaser Spouse % Completed',
        hint: 'Purchaser spouse percentage completed',
        required: false
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildBase for various', () => {
    var result = [
      VFieldHelper.buildBase('purchaser'),
    ];
    var expectation = [
      {
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
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildBaseString for various', () => {
    var result = [
      VFieldHelper.buildBaseString('purchaser'),
    ];
    var expectation = [
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
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildString for various', () => {
    var result = [
      VFieldHelper.buildString({input_name: 'purchaser'}),
    ];
    var expectation = [
      {
        input_name: 'purchaser',
        placeholder: 'Type value_',
        custom_input_size: '4',
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
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildGeneratedString for various', () => {
    var result = [
      VFieldHelper.buildGeneratedString('purchaser'),
    ];
    var expectation = [
      {
        hint: null,
        placeholder: 'Type value_',
        custom_input_size: '4',
        input_name: 'purchaser',
        label: 'Purchaser',
        display_name: 'Purchaser',
        terse_display_name: 'Purchaser',
        required: false,
        editable: true,
        as: 'string',
        fill_approach: 'manual',
        display: true,
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildBaseTextarea for various', () => {
    var result = [
      VFieldHelper.buildBaseTextarea('purchaser'),
    ];
    var expectation = [
      {
        field_type: 'textarea',
        placeholder: 'Type detail_',
        as: 'text',
        input_html: {rows: '5'},
        custom_input_size: '4',
        default_visible: false,

        input_name: 'purchaser',
        custom_input_size: '4',
        label: 'Purchaser',
        display_name: 'Purchaser',
        terse_display_name: 'Purchaser',
        hint: 'Purchaser',
        required: false,
        editable: true,
        fill_approach: 'manual',
        display: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });



});