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
  it('should return setAltDependencies for various', () => {
    var result = [
      VFieldHelper.setAltDependencies({input_html: {data: {some_att: 'empty'}}}).input_html.data.alt_dependencies,
      VFieldHelper.setAltDependencies({input_html: {data: {some_att: 'empty'}}}).input_html.data.alt_dependency_values,
      VFieldHelper.setAltDependencies({input_html: {data: {some_att: 'empty'}}}, ['some_field', 'some_other_field'], [true, 'value']).input_html.data.alt_dependencies,
      VFieldHelper.setAltDependencies({input_html: {data: {some_att: 'empty'}}}, ['some_field', 'some_other_field'], [true, 'value']).input_html.data.alt_dependency_values,
      VFieldHelper.setAltDependencies({input_html: {data: {some_att: 'empty'}}}).input_html['class'],
    ];
    var expectation = [
      null,
      null,
      ['some_field', 'some_other_field'],
      [true, 'value'],
      'isDependent',
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
  it('should return buildGeneratedPercentThresholdNames for various', () => {
    var result = [
      VFieldHelper.buildGeneratedPercentThresholdNames('purchaser_threshold_perc', null),
      VFieldHelper.buildGeneratedPercentThresholdNames('purchaser_threshold_perc_voting', null),
    ];
    var expectation = [
      {
        input_name: 'purchaser_threshold_perc',
        label: 'Purchaser Percent',
        display_name: 'Purchaser Percent',
        terse_display_name: 'Purchaser Percent',
        hint: 'Purchaser percent. 50 is interpreted as "a majority".',
        required: false
      },
      {
        input_name: 'purchaser_threshold_perc_voting',
        label: 'Purchaser Voting Percent',
        display_name: 'Purchaser Voting Percent',
        terse_display_name: 'Purchaser Voting Percent',
        hint: 'Purchaser voting percent. 50 is interpreted as "a majority".',
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
  it('should return buildTextarea', () => {
    var result = [
      VFieldHelper.buildTextarea(),
    ];
    var expectation = [
      {
        field_type: 'textarea',
        placeholder: 'Type detail_',
        as: 'text',
        input_html: {rows: '5'},
        custom_input_size: '4',
        default_visible: false,

        input_name: 'detail',
        custom_input_size: '4',
        label: 'Detail',
        display_name: 'Detail',
        terse_display_name: 'Detail',
        hint: 'Detail',
        required: false,
        editable: true,
        fill_approach: 'manual',
        display: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildGeneratedTextarea', () => {
    var result = [
      VFieldHelper.buildGeneratedTextarea('purchaser'),
    ];
    var expectation = [
      {
        hint: null,
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
        required: false,
        editable: true,
        fill_approach: 'manual',
        display: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildBasePositiveInteger', () => {
    var result = [
      VFieldHelper.buildBasePositiveInteger('purchaser'),
    ];
    var expectation = [
      {
        field_type: 'positive_integer',
        placeholder: 'E.g., 1,000',
        type_cast: 'integer',
        input_html: {class: 'add-on-integer inputmask-positive-integer'},
        custom_input_size: '3',
        sum_type: 'num',
        display_with: 'variable_integer',
        use_formatters: true,
        formatters: 'variable_integer',
        ng_filter: 'variableInteger',
        js_formatters: 'variableInteger',
        input_formatters: 'variable_integer',
        input_processors: ['string_to_integer'],
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

  it('should return buildPositiveInteger', () => {
    var result = [
      VFieldHelper.buildPositiveInteger(),
    ];
    var expectation = [
      {
        field_type: 'positive_integer',
        placeholder: 'E.g., 1,000',
        type_cast: 'integer',
        input_html: {class: 'add-on-integer inputmask-positive-integer'},
        custom_input_size: '3',
        sum_type: 'num',
        display_with: 'variable_integer',
        use_formatters: true,
        formatters: 'variable_integer',
        ng_filter: 'variableInteger',
        js_formatters: 'variableInteger',
        input_formatters: 'variable_integer',
        input_processors: ['string_to_integer'],
        input_name: 'number',
        label: 'Number',
        display_name: 'Number',
        terse_display_name: 'Number',
        hint: 'Number',
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
  it('should return buildGeneratedPositiveInteger', () => {
    var result = [
      VFieldHelper.buildGeneratedPositiveInteger('purchaser'),
    ];
    var expectation = [
      {
        hint: null,
        field_type: 'positive_integer',
        placeholder: 'E.g., 1,000',
        type_cast: 'integer',
        input_html: {class: 'add-on-integer inputmask-positive-integer'},
        custom_input_size: '3',
        sum_type: 'num',
        display_with: 'variable_integer',
        use_formatters: true,
        formatters: 'variable_integer',
        ng_filter: 'variableInteger',
        js_formatters: 'variableInteger',
        input_formatters: 'variable_integer',
        input_processors: ['string_to_integer'],
        input_name: 'purchaser',
        label: 'Purchaser',
        display_name: 'Purchaser',
        terse_display_name: 'Purchaser',
        required: false,
        editable: true,
        as: 'string',
        fill_approach: 'manual',
        display: true,
        default_visible: true,      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });

  it('should return buildBasePositiveVariableInteger', () => {
    var result = [
      VFieldHelper.buildBasePositiveVariableInteger('purchaser'),
    ];
    var expectation = [
      {
        type_cast: 'float',
        input_html: {class: 'add-on-decimal inputmask-positive-decimal'},
        input_processors: ['string_to_decimal'],
        field_type: 'positive_integer',
        placeholder: 'E.g., 1,000',
        custom_input_size: '3',
        sum_type: 'num',
        display_with: 'variable_integer',
        use_formatters: true,
        formatters: 'variable_integer',
        ng_filter: 'variableInteger',
        js_formatters: 'variableInteger',
        input_formatters: 'variable_integer',
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
  it('should return buildBasePositiveDecimal', () => {
    var result = [
      VFieldHelper.buildBasePositiveDecimal('purchaser'),
    ];
    var expectation = [
      {
        field_type: 'positive_decimal',
        placeholder: 'E.g., 0.00001',
        type_cast: 'float',
        input_html: {class: 'add-on-decimal inputmask-positive-decimal'},
        custom_input_size: '3',
        sum_type: 'dec',
        display_with: 'variable_decimal',
        ng_filter: 'variableDecimal',
        use_formatters: true,
        formatters: 'variable_decimal',
        input_formatters: 'variable_decimal',
        input_processors: ['string_to_decimal'],

        // js_formatters: '',
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

  it('should return buildPositiveDecimal', () => {
    var result = [
      VFieldHelper.buildPositiveDecimal(),
    ];
    var expectation = [
      {
        field_type: 'positive_decimal',
        placeholder: 'E.g., 0.00001',
        type_cast: 'float',
        input_html: {class: 'add-on-decimal inputmask-positive-decimal'},
        custom_input_size: '3',
        sum_type: 'dec',
        display_with: 'variable_decimal',
        ng_filter: 'variableDecimal',
        use_formatters: true,
        formatters: 'variable_decimal',
        input_formatters: 'variable_decimal',
        input_processors: ['string_to_decimal'],

        // js_formatters: '',
        input_name: 'precise_number',
        label: 'Precise Number',
        display_name: 'Precise Number',
        terse_display_name: 'Precise Number',
        hint: 'Precise number',
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
  it('should return buildGeneratedPositiveDecimal', () => {
    var result = [
      VFieldHelper.buildGeneratedPositiveDecimal('purchaser'),
    ];
    var expectation = [
      {
        hint: null,
        field_type: 'positive_decimal',
        placeholder: 'E.g., 0.00001',
        type_cast: 'float',
        input_html: {class: 'add-on-decimal inputmask-positive-decimal'},
        custom_input_size: '3',
        sum_type: 'dec',
        display_with: 'variable_decimal',
        ng_filter: 'variableDecimal',
        use_formatters: true,
        formatters: 'variable_decimal',
        input_formatters: 'variable_decimal',
        input_processors: ['string_to_decimal'],

        // js_formatters: '',
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
  it('should return buildBaseDollarInteger', () => {
    var result = [
      VFieldHelper.buildBaseDollarInteger('purchaser'),
    ];
    var expectation = [
      {
        field_type: 'dollar_integer',
        placeholder: 'E.g., 40,000',
        type_cast: 'integer',
        input_html: {class: 'add-on-dollar inputmask-positive-integer'},
        custom_input_size: '3',
        sum_type: 'dol',
        display_with: 'currency_integer',
        use_formatters: true,
        formatters: 'currency_integer',
        ng_filter: 'currency:$:0',
        input_formatters: 'variable_integer',
        input_processors: ['string_to_integer'],

        // js_formatters: '',
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
  it('should return buildDollarInteger', () => {
    var result = [
      VFieldHelper.buildDollarInteger(),
    ];
    var expectation = [
      {
        field_type: 'dollar_integer',
        placeholder: 'E.g., 40,000',
        type_cast: 'integer',
        input_html: {class: 'add-on-dollar inputmask-positive-integer'},
        custom_input_size: '3',
        sum_type: 'dol',
        display_with: 'currency_integer',
        use_formatters: true,
        formatters: 'currency_integer',
        ng_filter: 'currency:$:0',
        input_formatters: 'variable_integer',
        input_processors: ['string_to_integer'],

        // js_formatters: '',
        input_name: 'dollar_amount',
        label: 'Dollar Amount',
        display_name: 'Dollar Amount',
        terse_display_name: 'Dollar Amount',
        hint: 'Dollar amount',
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

  it('should return buildGeneratedDollarInteger', () => {
    var result = [
      VFieldHelper.buildGeneratedDollarInteger('purchaser'),
    ];
    var expectation = [
      {
        hint: null,
        field_type: 'dollar_integer',
        placeholder: 'E.g., 40,000',
        type_cast: 'integer',
        input_html: {class: 'add-on-dollar inputmask-positive-integer'},
        custom_input_size: '3',
        sum_type: 'dol',
        display_with: 'currency_integer',
        use_formatters: true,
        formatters: 'currency_integer',
        ng_filter: 'currency:$:0',
        input_formatters: 'variable_integer',
        input_processors: ['string_to_integer'],

        // js_formatters: '',
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
  it('should return buildBaseDollarDecimal', () => {
    var result = [
      VFieldHelper.buildBaseDollarDecimal('purchaser'),
    ];
    var expectation = [
      {
        field_type: 'dollar_precise_decimal',
        placeholder: 'E.g., 0.0001',
        type_cast: 'float',
        input_html: {class: 'add-on-dollar inputmask-positive-decimal'},
        custom_input_size: '3',
        sum_type: 'dol',
        display_with: 'variable_currency',
        use_formatters: true,
        formatters: 'variable_currency',
        ng_filter: 'currency',
        js_formatters: 'variableCurrency',
        input_formatters: ['string_to_decimal', 'variable_decimal'],
        input_processors: ['string_to_decimal'],

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
  it('should return buildBasePreciseDollarDecimal', () => {
    var result = [
      VFieldHelper.buildBasePreciseDollarDecimal('purchaser'),
    ];
    var expectation = [
      {
        ng_filter: 'variableCurrency',
        field_type: 'dollar_precise_decimal',
        placeholder: 'E.g., 0.0001',
        type_cast: 'float',
        input_html: {class: 'add-on-dollar inputmask-positive-decimal'},
        custom_input_size: '3',
        sum_type: 'dol',
        display_with: 'variable_currency',
        use_formatters: true,
        formatters: 'variable_currency',
        js_formatters: 'variableCurrency',
        input_formatters: ['string_to_decimal', 'variable_decimal'],
        input_processors: ['string_to_decimal'],

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
  it('should return buildDollarDecimal', () => {
    var result = [
      VFieldHelper.buildDollarDecimal(),
    ];
    var expectation = [
      {
        field_type: 'dollar_precise_decimal',
        placeholder: 'E.g., 0.0001',
        type_cast: 'float',
        input_html: {class: 'add-on-dollar inputmask-positive-decimal'},
        custom_input_size: '3',
        sum_type: 'dol',
        display_with: 'variable_currency',
        use_formatters: true,
        formatters: 'variable_currency',
        ng_filter: 'currency',
        js_formatters: 'variableCurrency',
        input_formatters: ['string_to_decimal', 'variable_decimal'],
        input_processors: ['string_to_decimal'],

        input_name: 'cents_dollar_amount',
        label: 'Cents Dollar Amount',
        display_name: 'Cents Dollar Amount',
        terse_display_name: 'Cents Dollar Amount',
        hint: 'Cents dollar amount',
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
  it('should return buildGeneratedDollarDecimal', () => {
    var result = [
      VFieldHelper.buildGeneratedDollarDecimal('purchaser'),
    ];
    var expectation = [
      {
        hint: null,
        field_type: 'dollar_precise_decimal',
        placeholder: 'E.g., 0.0001',
        type_cast: 'float',
        input_html: {class: 'add-on-dollar inputmask-positive-decimal'},
        custom_input_size: '3',
        sum_type: 'dol',
        display_with: 'variable_currency',
        use_formatters: true,
        formatters: 'variable_currency',
        ng_filter: 'currency',
        js_formatters: 'variableCurrency',
        input_formatters: ['string_to_decimal', 'variable_decimal'],
        input_processors: ['string_to_decimal'],

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
  it('should return buildBasePercent', () => {
    var result = [
      VFieldHelper.buildBasePercent('purchaser'),
    ];
    var expectation = [
      {
        field_type: 'percent',
        placeholder: 'E.g., 1.5',
        type_cast: 'float',
        input_html: {class: 'add-on-percent inputmask-positive-decimal'},
        custom_input_size: '2',
        sum_type: 'perc',
        display_with: 'perc_to_perc_str',
        use_formatters: true,
        formatters: 'perc_to_perc_str',
        input_formatters: 'decimal_to_str',
        ng_filter: 'percentage:3',
        input_processors: ['string_to_decimal'],

        // js_formatters: '',
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
  it('should return buildPercent', () => {
    var result = [
      VFieldHelper.buildPercent(),
    ];
    var expectation = [
      {
        field_type: 'percent',
        placeholder: 'E.g., 1.5',
        type_cast: 'float',
        input_html: {class: 'add-on-percent inputmask-positive-decimal'},
        custom_input_size: '2',
        sum_type: 'perc',
        display_with: 'perc_to_perc_str',
        use_formatters: true,
        formatters: 'perc_to_perc_str',
        input_formatters: 'decimal_to_str',
        ng_filter: 'percentage:3',
        input_processors: ['string_to_decimal'],

        // js_formatters: '',
        input_name: 'percent',
        label: 'Percent',
        display_name: 'Percent',
        terse_display_name: 'Percent',
        hint: 'Percent',
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
  it('should return buildGeneratedPercent', () => {
    var result = [
      VFieldHelper.buildGeneratedPercent('purchaser'),
    ];
    var expectation = [
      {
        hint: null,
        field_type: 'percent',
        placeholder: 'E.g., 1.5',
        type_cast: 'float',
        input_html: {class: 'add-on-percent inputmask-positive-decimal'},
        custom_input_size: '2',
        sum_type: 'perc',
        display_with: 'perc_to_perc_str',
        use_formatters: true,
        formatters: 'perc_to_perc_str',
        input_formatters: 'decimal_to_str',
        ng_filter: 'percentage:3',
        input_processors: ['string_to_decimal'],

        // js_formatters: '',
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

  it('should return buildBaseDecimalPercent', () => {
    var result = [
      VFieldHelper.buildBaseDecimalPercent('purchaser'),
    ];
    var expectation = [
      {
        field_type: 'percent_threshold',
        sum_type: 'perc',
        display_with: 'decimal_to_perc_str',
        formatters: 'decimal_to_perc_str',
        // input_formatters: 'decimal_to_perc_str',
        input_formatters: 'decimal_to_perc',
        input_processors: ['string_to_decimal', 'perc_to_decimal'],
        js_formatters: 'decimalToPercStr',
        jsInputProcessors: 'percToDecimal',
        ng_filter: 'decimalToPercStr',

        placeholder: 'E.g., 1.5',
        type_cast: 'float',
        input_html: {class: 'add-on-percent inputmask-positive-decimal'},
        custom_input_size: '2',
        use_formatters: true,

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
  it('should return buildDecimalPercent', () => {
    var result = [
      VFieldHelper.buildDecimalPercent(),
    ];
    var expectation = [
      {
        field_type: 'percent_threshold',
        sum_type: 'perc',
        display_with: 'decimal_to_perc_str',
        formatters: 'decimal_to_perc_str',
        // input_formatters: 'decimal_to_perc_str',
        input_formatters: 'decimal_to_perc',
        input_processors: ['string_to_decimal', 'perc_to_decimal'],
        js_formatters: 'decimalToPercStr',
        jsInputProcessors: 'percToDecimal',
        ng_filter: 'decimalToPercStr',

        placeholder: 'E.g., 1.5',
        type_cast: 'float',
        input_html: {class: 'add-on-percent inputmask-positive-decimal'},
        custom_input_size: '2',
        use_formatters: true,

        input_name: 'decimal_percent',
        label: 'Decimal Percent',
        display_name: 'Decimal Percent',
        terse_display_name: 'Decimal Percent',
        hint: 'Decimal percent',
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
  it('should return buildCalculatedDecimalPercent', () => {
    var result = [
      VFieldHelper.buildCalculatedDecimalPercent('purchaser'),
    ];
    var expectation = [
      {
        fill_approach: 'dynamic',
        editable: false,
        adjusted: true,
        input_name: 'purchaser',
        label: 'Purchaser',
        display_name: 'Purchaser',
        terse_display_name: 'Purchaser',
        hint: 'Purchaser',
        required: false,

        field_type: 'percent_threshold',
        sum_type: 'perc',
        display_with: 'decimal_to_perc_str',
        formatters: 'decimal_to_perc_str',
        // input_formatters: 'decimal_to_perc_str',
        input_formatters: 'decimal_to_perc',
        input_processors: ['string_to_decimal', 'perc_to_decimal'],
        js_formatters: 'decimalToPercStr',
        jsInputProcessors: 'percToDecimal',
        ng_filter: 'decimalToPercStr',

        placeholder: 'E.g., 1.5',
        type_cast: 'float',
        input_html: {class: 'add-on-percent inputmask-positive-decimal'},
        custom_input_size: '2',
        use_formatters: true,

        as: 'string',
        display: true,
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildBasePercentThreshold', () => {
    var result = [
      VFieldHelper.buildBasePercentThreshold('purchaser'),
    ];
    var expectation = [
      {
        hint: 'Threshold Percent.  50 is interpreted as "a majority".',
        field_type: 'percent_threshold',
        placeholder: 'E.g., 50',
        type_cast: 'float',
        input_html: {class: 'add-on-percent inputmask-positive-decimal'},
        custom_input_size: '2',
        manually_calculable: false,
        // sum_type: 'perc',
        sum_type: 'num',
        adjusted: false,
        display_with: 'variable_integer',
        use_formatters: true,
        formatters: 'percent_threshold',
        input_formatters: 'variable_integer',
        ng_filter: 'variableInteger',
        input_processors: ['string_to_decimal'],

        input_name: 'purchaser',
        label: 'Purchaser Percent',
        display_name: 'Purchaser Percent',
        terse_display_name: 'Purchaser Percent',
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
  it('should return buildBasePercentThreshold', () => {
    var result = [
      VFieldHelper.buildBasePercentThreshold('purchaser'),
    ];
    var expectation = [
      {
        hint: 'Threshold Percent.  50 is interpreted as "a majority".',
        field_type: 'percent_threshold',
        placeholder: 'E.g., 50',
        type_cast: 'float',
        input_html: {class: 'add-on-percent inputmask-positive-decimal'},
        custom_input_size: '2',
        manually_calculable: false,
        // sum_type: 'perc',
        sum_type: 'num',
        adjusted: false,
        display_with: 'variable_integer',
        use_formatters: true,
        formatters: 'percent_threshold',
        input_formatters: 'variable_integer',
        ng_filter: 'variableInteger',
        input_processors: ['string_to_decimal'],

        input_name: 'purchaser',
        label: 'Purchaser Percent',
        display_name: 'Purchaser Percent',
        terse_display_name: 'Purchaser Percent',
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
  it('should return buildBasePercThreshold', () => {
    var result = [
      VFieldHelper.buildBasePercThreshold('purchaser').hint,
    ];
    var expectation = [
      'Threshold Percent.  50 is interpreted as "a majority".',
    ];
    expect(result.toString()).to.equal(expectation.toString());
  });
  it('should return buildPercentThreshold', () => {
    var result = [
      VFieldHelper.buildPercentThreshold(),
    ];
    var expectation = [
      {
        hint: 'Threshold Percent.  50 is interpreted as "a majority".',
        field_type: 'percent_threshold',
        placeholder: 'E.g., 50',
        type_cast: 'float',
        input_html: {class: 'add-on-percent inputmask-positive-decimal'},
        custom_input_size: '2',
        manually_calculable: false,
        // sum_type: 'perc',
        sum_type: 'num',
        adjusted: false,
        display_with: 'variable_integer',
        use_formatters: true,
        formatters: 'percent_threshold',
        input_formatters: 'variable_integer',
        ng_filter: 'variableInteger',
        input_processors: ['string_to_decimal'],

        input_name: 'percent_threshold',
        label: 'Threshold Percent',
        display_name: 'Threshold Percent',
        terse_display_name: 'Threshold Percent',
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
  it('should return buildPercentThreshold', () => {
    var result = [
      VFieldHelper.buildPercentThreshold().hint,
    ];
    var expectation = [
      'Threshold Percent.  50 is interpreted as "a majority".',
    ];
    expect(result.toString()).to.equal(expectation.toString());
  });
  it('should return buildGeneratedPercentThreshold', () => {
    var result = [
      VFieldHelper.buildGeneratedPercentThreshold('purchaser'),
    ];
    var expectation = [
      {
        hint: 'Threshold Percent.  50 is interpreted as "a majority".',
        field_type: 'percent_threshold',
        placeholder: 'E.g., 50',
        type_cast: 'float',
        input_html: {class: 'add-on-percent inputmask-positive-decimal'},
        custom_input_size: '2',
        manually_calculable: false,
        // sum_type: 'perc',
        sum_type: 'num',
        adjusted: false,
        display_with: 'variable_integer',
        use_formatters: true,
        formatters: 'percent_threshold',
        input_formatters: 'variable_integer',
        ng_filter: 'variableInteger',
        input_processors: ['string_to_decimal'],

        input_name: 'purchaser',
        label: 'Purchaser Percent',
        display_name: 'Purchaser Percent',
        terse_display_name: 'Purchaser Percent',
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
  it('should return buildGeneratedPercThreshold', () => {
    var result = [
      VFieldHelper.buildGeneratedPercThreshold('purchaser').hint,
    ];
    var expectation = [
      'Threshold Percent.  50 is interpreted as "a majority".',
    ];
    expect(result.toString()).to.equal(expectation.toString());
  });
  it('should return buildBaseBoolean for various', () => {
    var result = [
      VFieldHelper.buildBaseBoolean('purchaser'),
    ];
    var expectation = [
      {
        type_cast: 'boolean',
        as: 'boolean_buttons',
        bip_as: 'checkbox',
        input_html: {data: {default_value: false}},
        display_with: 'bool',
        ng_filter: 'check',
        use_formatters: true,
        formatters: 'is_true',
        js_formatters: 'check',
        input_processors: ['is_true'],

        input_name: 'purchaser',
        label: 'Purchaser?',
        display_name: 'Purchaser?',
        terse_display_name: 'Purchaser?',
        hint: 'Purchaser?',
        required: false,
        editable: true,
        fill_approach: 'manual',
        display: true,
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildBaseApplicability for various', () => {
    var result = [
      VFieldHelper.buildBaseApplicability('purchaser'),
    ];
    var expectation = [
      {
        field_type: 'applicability',
        type_cast: 'boolean',
        as: 'boolean_buttons',
        bip_as: 'checkbox',
        input_html: {data: {default_value: false}},
        display_with: 'bool',
        ng_filter: 'check',
        use_formatters: true,
        formatters: 'is_true',
        js_formatters: 'check',
        input_processors: ['is_true'],

        input_name: 'purchaser',
        label: 'Purchaser?',
        display_name: 'Purchaser?',
        terse_display_name: 'Purchaser?',
        hint: 'Purchaser?',
        required: false,
        editable: true,
        fill_approach: 'manual',
        display: true,
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });  
  it('should return buildApplicability for various', () => {
    var result = [
      VFieldHelper.buildApplicability(),
    ];
    var expectation = [
      {
        field_type: 'applicability',
        type_cast: 'boolean',
        as: 'boolean_buttons',
        bip_as: 'checkbox',
        input_html: {data: {default_value: false}},
        display_with: 'bool',
        ng_filter: 'check',
        use_formatters: true,
        formatters: 'is_true',
        js_formatters: 'check',
        input_processors: ['is_true'],

        input_name: 'applicability',
        label: 'Applicability?',
        display_name: 'Applicability?',
        terse_display_name: 'Applicability?',
        hint: 'Applicability?',
        required: false,
        editable: true,
        fill_approach: 'manual',
        display: true,
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildGeneratedApplicability for various', () => {
    var result = [
      VFieldHelper.buildGeneratedApplicability('purchaser'),
    ];
    var expectation = [
      {
        hint: null,
        field_type: 'applicability',
        type_cast: 'boolean',
        as: 'boolean_buttons',
        bip_as: 'checkbox',
        input_html: {data: {default_value: false}},
        display_with: 'bool',
        ng_filter: 'check',
        use_formatters: true,
        formatters: 'is_true',
        js_formatters: 'check',
        input_processors: ['is_true'],

        input_name: 'purchaser',
        label: 'Purchaser?',
        display_name: 'Purchaser?',
        terse_display_name: 'Purchaser?',
        required: false,
        editable: true,
        fill_approach: 'manual',
        display: true,
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });

  it('should return buildGeneratedApplicability for various', () => {
    var result = [
      VFieldHelper.buildGeneratedApplicability('purchaser'),
    ];
    var expectation = [
      {
        hint: null,
        field_type: 'applicability',
        type_cast: 'boolean',
        as: 'boolean_buttons',
        bip_as: 'checkbox',
        input_html: {data: {default_value: false}},
        display_with: 'bool',
        ng_filter: 'check',
        use_formatters: true,
        formatters: 'is_true',
        js_formatters: 'check',
        input_processors: ['is_true'],

        input_name: 'purchaser',
        label: 'Purchaser?',
        display_name: 'Purchaser?',
        terse_display_name: 'Purchaser?',
        required: false,
        editable: true,
        fill_approach: 'manual',
        display: true,
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildFormCopy for various', () => {
    var result = [
      VFieldHelper.buildFormCopy(),
    ];
    var expectation = [
      {
        field_type: 'form_copy',
        input_name: 'form_copy',
        display_name: 'Form Copy?',
        hint: 'Is this a form template to be downloaded and filled out later?',
        label: 'Generate Form Only?',
        readonly_v_asset_types: ['PostIncorporation'],
        required: true,

        type_cast: 'boolean',
        as: 'boolean_buttons',
        bip_as: 'checkbox',
        input_html: {data: {default_value: false}},
        display_with: 'bool',
        ng_filter: 'check',
        use_formatters: true,
        formatters: 'is_true',
        js_formatters: 'check',
        input_processors: ['is_true'],

        terse_display_name: 'Applicability?',
        editable: true,
        fill_approach: 'manual',
        display: true,
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildAnnotatedCopy for various', () => {
    var result = [
      VFieldHelper.buildAnnotatedCopy(),
    ];
    var expectation = [
      {
        field_type: 'annotated_copy',
        input_name: 'annotated_copy',
        hint: 'Include annotations/comments in the generated document?',
        label: 'Annotated Version?',
        display_name: 'Annotated Version?',

        type_cast: 'boolean',
        as: 'boolean_buttons',
        bip_as: 'checkbox',
        input_html: {data: {default_value: false}},
        display_with: 'bool',
        ng_filter: 'check',
        use_formatters: true,
        formatters: 'is_true',
        js_formatters: 'check',
        input_processors: ['is_true'],

        terse_display_name: 'Applicability?',
        required: false,
        editable: true,
        fill_approach: 'manual',
        display: true,
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildBaseDatepicker for various', () => {
    var result = [
      VFieldHelper.buildBaseDatepicker('purchaser'),
    ];
    var expectation = [
      {
      field_type: 'date',
      placeholder: 'YYYY-MM-DD',
      type_cast: 'date',
      input_html: {
         class: 'col-sm-3 no-default-date inputmask-date',
         data: {behaviour: 'datepicker', date_format: 'yyyy-mm-dd'}
      },
      custom_input_size: '3',
      display_with: 'format_date',
      use_formatters: true,
      formatters: 'format_date',
      ng_filter: 'date:mediumDate',
      js_formatters: 'formatDate',

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
  it('should return buildGeneratedDate for various', () => {
    var result = [
      VFieldHelper.buildGeneratedDate('purchaser'),
    ];
    var expectation = [
      {
      hint: 'Select the date',
      field_type: 'date',
      placeholder: 'YYYY-MM-DD',
      type_cast: 'date',
      input_html: {
         class: 'col-sm-3 no-default-date inputmask-date',
         data: {behaviour: 'datepicker', date_format: 'yyyy-mm-dd'}
      },
      custom_input_size: '3',
      display_with: 'format_date',
      use_formatters: true,
      formatters: 'format_date',
      ng_filter: 'date:mediumDate',
      js_formatters: 'formatDate',
      
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
  it('should return buildBaseOrgState for various', () => {
    var result = [
      VFieldHelper.buildBaseOrgState('purchaser'),
    ];
    var expectation = [
      {
        field_type: 'organization_state',
        fill_approach: 'manual',
        input_html: {class: 'acOrgState'},
        custom_input_size: '2',
        display: false,
        display_with: 'state',
        use_formatters: true,
        formatters: 'state',

        input_name: 'purchaser',
        label: 'Purchaser',
        display_name: 'Purchaser',
        terse_display_name: 'Purchaser',
        hint: 'Purchaser',
        required: false,
        editable: true,
        as: 'string',
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildOrgState for various', () => {
    var result = [
      VFieldHelper.buildOrgState(),
    ];
    var expectation = [
      {
        fill_approach: 'dynamic',
        label: 'Company Incorporation / Organization State',
        hint: 'State where company incorporated / organized',
        placeholder: 'Select or Type State',

        field_type: 'organization_state',
        input_html: {class: 'acOrgState'},
        custom_input_size: '2',
        display: false,
        display_with: 'state',
        use_formatters: true,
        formatters: 'state',
        
        input_name: 'org_state',
        display_name: 'Org State',
        terse_display_name: 'Org State',
        required: false,
        editable: true,
        as: 'string',
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildGeneratedOrgState for various', () => {
    var result = [
      VFieldHelper.buildGeneratedOrgState('purchaser'),
    ];
    var expectation = [
      {
        field_type: 'organization_state',
        fill_approach: 'manual',
        input_html: {class: 'acOrgState'},
        custom_input_size: '2',
        display: false,
        display_with: 'state',
        use_formatters: true,
        formatters: 'state',

        input_name: 'purchaser',
        label: 'Purchaser',
        display_name: 'Purchaser',
        terse_display_name: 'Purchaser',
        hint: 'Purchaser',
        required: false,
        editable: true,
        as: 'string',
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildBaseAcState for various', () => {
    var result = [
      VFieldHelper.buildBaseAcState('purchaser'),
    ];
    var expectation = [
      {
        field_type: 'state_or_place',
        placeholder: 'Select or Type State or Place',
        input_html: {class: 'acAddressState'},
        custom_input_size: '3',
        display_with: 'state',
        ng_filter: 'state',
        use_formatters: true,
        formatters: 'state',

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
  it('should return buildAcState for various', () => {
    var result = [
      VFieldHelper.buildAcState(),
    ];
    var expectation = [
      {
        field_type: 'state_or_place',
        placeholder: 'Select or Type State or Place',
        input_html: {class: 'acAddressState'},
        custom_input_size: '3',
        display_with: 'state',
        ng_filter: 'state',
        use_formatters: true,
        formatters: 'state',
      
        input_name: 'state_or_place',
        label: 'State Or Place',
        display_name: 'State Or Place',
        terse_display_name: 'State Or Place',
        hint: 'State or place',
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
  it('should return buildGeneratedAcState for various', () => {
    var result = [
      VFieldHelper.buildGeneratedAcState('purchaser'),
    ];
    var expectation = [
      {
        field_type: 'state_or_place',
        placeholder: 'Select or Type State or Place',
        input_html: {class: 'acAddressState'},
        custom_input_size: '3',
        display_with: 'state',
        ng_filter: 'state',
        use_formatters: true,
        formatters: 'state',

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

  it('should return buildBaseAcOrgType for various', () => {
    var result = [
      VFieldHelper.buildBaseAcOrgType('purchaser'),
    ];
    var expectation = [
      {
        field_type: 'entity_type',
        placeholder: 'Select or Type Entity Type',
        input_html: {class: 'acOrgType'},
        custom_input_size: '3',
        display_with: 'entity_type',
        use_formatters: true,
        formatters: 'entity_type',

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

  it('should return buildAcOrgType for various', () => {
    var result = [
      VFieldHelper.buildAcOrgType(),
    ];
    var expectation = [
      {
        field_type: 'entity_type',
        placeholder: 'Select or Type Entity Type',
        input_html: {class: 'acOrgType'},
        custom_input_size: '3',
        display_with: 'entity_type',
        use_formatters: true,
        formatters: 'entity_type',

        input_name: 'entity_or_org_type',
        label: 'Entity Or Org Type',
        display_name: 'Entity Or Org Type',
        terse_display_name: 'Entity Or Org Type',
        hint: 'Entity or org type',
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

  it('should return buildGeneratedACOrgType for various', () => {
    var result = [
      VFieldHelper.buildGeneratedACOrgType('purchaser'),
    ];
    var expectation = [
      {
        hint: null,
        field_type: 'entity_type',
        placeholder: 'Select or Type Entity Type',
        input_html: {class: 'acOrgType'},
        custom_input_size: '3',
        display_with: 'entity_type',
        use_formatters: true,
        formatters: 'entity_type',

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
  it('should return buildGeneratedOrgType', () => {
    var result = [
      VFieldHelper.buildGeneratedOrgType('purchaser').placeholder,
    ];
    var expectation = [
      'Select or Type Entity Type',
    ];
    expect(result.toString()).to.equal(expectation.toString());
  });
  it('should return buildBaseAcSecurityName for various', () => {
    var result = [
      VFieldHelper.buildBaseAcSecurityName('purchaser'),
    ];
    var expectation = [
      {
      label: 'Security Name',
      display_name: 'Security Name',
      hint: 'Use the exact security name in the company\'s charter ' +
        '(e.g., Series A Preferred Stock).',
      placeholder: 'Start Typing Security Name',
      custom_input_size: '3',
      input_html: {class: 'acSecurityName'},

        input_name: 'purchaser',
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
  it('should return buildAcSecurityName for various', () => {
    var result = [
      VFieldHelper.buildAcSecurityName(),
    ];
    var expectation = [
      {
      label: 'Security Name',
      display_name: 'Security Name',
      hint: 'Use the exact security name in the company\'s charter ' +
        '(e.g., Series A Preferred Stock).',
      placeholder: 'Start Typing Security Name',
      custom_input_size: '3',
      input_html: {class: 'acSecurityName'},
      
        input_name: 'security_name',
        terse_display_name: 'Security Name',
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
  it('should return buildGeneratedAcSecurityName for various', () => {
    var result = [
      VFieldHelper.buildGeneratedAcSecurityName('purchaser'),
    ];
    var expectation = [
      {
      label: 'Security Name',
      display_name: 'Security Name',
      hint: 'Use the exact security name in the company\'s charter ' +
        '(e.g., Series A Preferred Stock).',
      placeholder: 'Start Typing Security Name',
      custom_input_size: '3',
      input_html: {class: 'acSecurityName'},

        input_name: 'purchaser',
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
  it('should return buildBasePeriodType for various', () => {
    var result = [
      VFieldHelper.buildBasePeriodType('purchaser'),
    ];
    var expectation = [
      {
        field_type: 'period_type',
        placeholder: 'Select Period Type',
        as: null,
        other_input_options: {
          collection: VTools.SINGULAR_PERIODS,
          include_blank: 'Select Period Type'
        },
        custom_input_size: '3',

        input_name: 'purchaser',
        label: 'Purchaser',
        display_name: 'Purchaser',
        terse_display_name: 'Purchaser',
        hint: 'Purchaser',
        required: false,
        editable: true,
        fill_approach: 'manual',
        display: true,
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildPeriodType for various', () => {
    var result = [
      VFieldHelper.buildPeriodType(),
    ];
    var expectation = [
      {
        field_type: 'period_type',
        placeholder: 'Select Period Type',
        as: null,
        other_input_options: {
          collection: VTools.SINGULAR_PERIODS,
          include_blank: 'Select Period Type'
        },
        custom_input_size: '3',

        input_name: 'period_type',
        label: 'Period Type',
        display_name: 'Period Type',
        terse_display_name: 'Period Type',
        hint: 'Period type',
        required: false,
        editable: true,
        fill_approach: 'manual',
        display: true,
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildGeneratedPeriodType for various', () => {
    var result = [
      VFieldHelper.buildGeneratedPeriodType('purchaser'),
    ];
    var expectation = [
      {
        hint: null,
        field_type: 'period_type',
        placeholder: 'Select Period Type',
        as: null,
        other_input_options: {
          collection: VTools.SINGULAR_PERIODS,
          include_blank: 'Select Period Type'
        },
        custom_input_size: '3',

        input_name: 'purchaser',
        label: 'Purchaser',
        display_name: 'Purchaser',
        terse_display_name: 'Purchaser',
        required: false,
        editable: true,
        fill_approach: 'manual',
        display: true,
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildGeneratedVSig for various', () => {
    var result = [
      VFieldHelper.buildGeneratedVSig('v_sig_purchaser'),
    ];
    var expectation = [
      {
        field_type: 'v_sig',
        fill_approach: 'dynamic',
        display: false,
        input_name: 'v_sig_purchaser',
        label: 'V Sig Purchaser',
        display_name: 'V Sig Purchaser',
        terse_display_name: 'V Sig Purchaser',
        hint: 'V sig purchaser',
        required: false,
        editable: true,
        as: 'string',
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildBaseObjectHashes for various', () => {
    var result = [
      VFieldHelper.buildBaseObjectHashes('purchaser'),
    ];
    var expectation = [
      {
        field_type: 'hashes',
        fill_approach: 'dynamic',
        display_with: 'join_array_of_hashes_values',
        use_formatters: true,
        formatters: 'smart_array_of_hash_values',

        input_name: 'purchaser',
        label: 'Purchaser',
        display_name: 'Purchaser',
        terse_display_name: 'Purchaser',
        hint: 'Purchaser',
        required: false,
        editable: true,
        as: 'string',
        display: true,
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildObjectHashes for various', () => {
    var result = [
      VFieldHelper.buildObjectHashes(),
    ];
    var expectation = [
      {
        field_type: 'hashes',
        fill_approach: 'dynamic',
        display_with: 'join_array_of_hashes_values',
        use_formatters: true,
        formatters: 'smart_array_of_hash_values',

        input_name: 'object_hashes',
        label: 'Objects',
        display_name: 'Objects',
        terse_display_name: 'Objects',
        hint: 'Objects',
        required: false,
        editable: true,
        as: 'string',
        display: true,
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildGeneratedObjectHashes for various', () => {
    var result = [
      VFieldHelper.buildGeneratedObjectHashes('purchaser'),
    ];
    var expectation = [
      {
        hint: null,
        field_type: 'hashes',
        fill_approach: 'dynamic',
        display_with: 'join_array_of_hashes_values',
        use_formatters: true,
        formatters: 'smart_array_of_hash_values',

        input_name: 'purchaser',
        label: 'Purchaser',
        display_name: 'Purchaser',
        terse_display_name: 'Purchaser',
        required: false,
        editable: true,
        as: 'string',
        display: true,
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildBaseVirtualModelHashes for various', () => {
    var result = [
      VFieldHelper.buildBaseVirtualModelHashes('purchaser'),
    ];
    var expectation = [
      {
        field_type: 'hashes',
        fill_approach: 'virtual_model',
        as: 'text',
        display_with: 'hashes_to_lines',
        use_formatters: true,

        input_name: 'purchaser',
        label: 'Purchaser',
        display_name: 'Purchaser',
        terse_display_name: 'Purchaser',
        hint: 'Purchaser',
        required: false,
        editable: true,
        display: true,
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildVirtualModelHashes for various', () => {
    var result = [
      VFieldHelper.buildVirtualModelHashes(),
    ];
    var expectation = [
      {
        label: 'Virtual Model',
        hint: 'Carefully complete the inputs to model this attribute.',
        field_type: 'hashes',
        fill_approach: 'virtual_model',
        as: 'text',
        display_with: 'hashes_to_lines',
        use_formatters: true,
      
        input_name: 'virtual_model_hashes',
        display_name: 'Virtual Models',
        terse_display_name: 'Virtual Models',
        required: false,
        editable: true,
        display: true,
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildGeneratedVirtualModelHashes for various', () => {
    var result = [
      VFieldHelper.buildGeneratedVirtualModelHashes('purchaser'),
    ];
    var expectation = [
      {
        fill_approach: 'generated_virtual_model',
        field_type: 'hashes',
        as: 'text',
        display_with: 'hashes_to_lines',
        use_formatters: true,
      
        input_name: 'purchaser',
        label: 'Purchaser',
        display_name: 'Purchaser',
        terse_display_name: 'Purchaser',
        hint: 'Purchaser',
        required: false,
        editable: true,
        display: true,
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });
  it('should return buildHashesSummedBase for various', () => {
    var result = [
      VFieldHelper.buildHashesSummedBase('purchaser'),
    ];
    var expectation = [
      {
        fill_approach: 'dynamic',
        editable: false,
        input_name: 'purchaser',
        label: 'Purchaser',
        display_name: 'Purchaser',
        terse_display_name: 'Purchaser',
        hint: 'Purchaser',
        required: false,
        as: 'string',
        display: true,
        default_visible: true,
      },
    ];
    expect(VTools.hashes_to_lines(result)).to.equal(VTools.hashes_to_lines(expectation));
  });

});