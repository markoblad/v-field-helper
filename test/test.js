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

});