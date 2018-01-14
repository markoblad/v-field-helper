import * as _ from 'lodash';
import * as s from 'underscore.string';
import * as pluralize from 'pluralize';
import * as moment from 'moment';
import { VTools } from 'v-tools';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export interface VFieldInterface {
  field_type?: string | null;
  display_name?: string | null;
  verbose_display_name?: string | null;
  terse_display_name?: string | null;
  label?: string | null;
  input_name?: string | null;
  hint?: string | null;
  more_info?: string | string[] | null;
  placeholder?: string | null;
  security_types?: string | string[] | null;
  default_visible?: string | boolean | null;
  fill_approach?: string | null;
  dynamic_fill_approach_v_asset_types?: string[] | null;
  api_maps?: string | string[] | null;
  manually_calculable?: string | boolean | null;
  step?: string | null;
  step_field_order?: string | null;
  as?: string | null;
  required?: string | boolean | null;
  input_html?: any | null;
  other_input_options?: any | null;
  custom_input_size?: string | number | null;
  sum_type?: string | null;
  readonly_v_asset_types?: string[] | null;
  adjusted?: string | boolean | null;
  editable?: string | boolean | null;
  display?: string | boolean | null;
  display_with?: string | string[] | null;
  ng_filter?: string | string[] | null;
  use_formatters?: string | boolean | null;
  formatters?: string | string[] | null;
  input_formatters?: string | string [] | null;
  js_formatters?: string | string[] | null;
  input_processor?: string | string[] | null;
  dependency?: string | null;
  dependency_value?: string | null;
  dependencies?: string | string[] | null;
  dependency_values?: any | any[] | null;
  alt_dependencies?: string | string[] | null;
  alt_dependency_values?: any | any[] | null;
}

export interface VFieldSubTypeHash {
  vInputType: string;
  beforeAddon?: string | number;
  afterAddon?: string | number;
  label?: string | number;
  hint?: string | number;
  editable?: boolean;
  textMask?: any;
  textUnmask?: any;
}

export class VFieldHelper {
  public static get positiveDecimalMask(): any {
    return createNumberMask({
      prefix: '',
      // suffix: emptyString,
      // includeThousandsSeparator: true,
      // thousandsSeparatorSymbol: comma,
      allowDecimal: true,
      // decimalSymbol: period,
      decimalLimit: 15,
      // requireDecimal: false,
      // allowNegative: false,
    });
  };

  public static get positiveIntegerMask(): any {
    return createNumberMask({
      prefix: '',
      // suffix: emptyString,
      // includeThousandsSeparator: true,
      // thousandsSeparatorSymbol: comma,
      allowDecimal: false,
      // decimalSymbol: period,
      // decimalLimit: 15,
      // requireDecimal: false,
      // allowNegative: false,
    });
  };

  public static positiveIntegerUnmask(value?: string | number | null): number {
    return parseInt((value || 0).toString().trim().replace(/\..*/g, '').replace(/[^\d]/g, ''));
  };

  public static positiveDecimalUnmask(value?: string | number | null): number {
    return parseFloat((value || 0).toString().trim().replace(/[^\d\.]/g, ''));
  };


  public static get V_FIELD_TYPES(): any {return {
      basic_input: {
        vInputType: 'vInput',
        label: 'Basic Input',
        hint: 'Basic Input',
        editable: true,
        // textMask: function(value) {
        //   return value.split('').map((i) => { return /./; });
        // },
      },
      applicability: {
        vInputType: 'vSwitch',
        label: 'Applicability Switch',
        hint: 'Applicability Switch',
        editable: false,
      },
      date: {
        vInputType: 'vDatepicker',
        label: 'Date',
        hint: 'Date',
        editable: true,
        textMask: function() {
          return [/\d/, /\d/, /\d/, /\d/, '-', /[01]/, /\d/, '-', /[0123]/, /\d/];
        }
      },
      dollar_integer: {
        beforeAddon: '$',
        afterAddon: '.00',
        vInputType: 'vInput',
        label: 'Dollar (round)',
        hint: 'Dollar (round)',
        editable: true,
        textMask: VFieldHelper.positiveIntegerMask,
        // textMask: VFieldHelper.preciseDollarDecimalMask,
        // textMask: function(value) {
        //   return value.split('').map((i) => { return /\d/; });
        // },
        textUnmask: VFieldHelper.positiveIntegerUnmask,
      },
      dollar_precise_decimal: {
        beforeAddon: '$',
        vInputType: 'vInput',
        label: 'Dollar (precise)',
        hint: 'Dollar (precise)',
        editable: true,
        textMask: VFieldHelper.positiveDecimalMask,
        // textMask: (value): any[] => {
        //   // return value.split('').map((i) => /\d/);
        //   return VFieldHelper.preciseDollarDecimalMask(value);
        // },
        // textMask: createNumberMask({}),
        // public get autoCorrectedDatePipe(): any { return createAutoCorrectedDatePipe('mm/dd/yyyy'); }
        textUnmask: VFieldHelper.positiveDecimalUnmask,
      },
      positive_integer: {
        afterAddon: '.0',
        vInputType: 'vInput',
        label: 'Positive Number (round)',
        hint: 'Positive Number (round)',
        editable: true,
        textMask: VFieldHelper.positiveIntegerMask,
        // textMask: function(value) {
        //   return value.split('').map((i) => { return /\d/; });
        // },
        textUnmask: VFieldHelper.positiveIntegerUnmask,
      },
      positive_decimal: {
        vInputType: 'vInput',
        label: 'Positive Number (precise)',
        hint: 'Positive Number (precise)',
        editable: true,
        textMask: VFieldHelper.positiveDecimalMask,
        textUnmask: VFieldHelper.positiveDecimalUnmask,
      },
      percent: {
        afterAddon: '%',
        vInputType: 'vInput',
        label: 'Percentage',
        hint: 'Percentage',
        editable: true,
        textMask: VFieldHelper.positiveDecimalMask,
      },
      percent_threshold: {
        afterAddon: '%',
        vInputType: 'vInput',
        label: 'Voting/Percent Threshold',
        hint: 'Voting/Percent Threshold',
        editable: true,
        textMask: VFieldHelper.positiveDecimalMask,
      },
      textarea: {
        vInputType: 'vInput',
        label: 'Text Area',
        hint: 'Text Area',
        editable: true,
      },
      organization_state: {
        vInputType: 'vInput',
        label: 'Organization State',
        hint: 'Organization State',
        editable: true,
      },
      state_or_place: {
        vInputType: 'vInput',
        label: 'State or Place',
        hint: 'State or Place',
        editable: true,
      },
      entity_type: {
        vInputType: 'vInput',
        label: 'Entity Type',
        hint: 'Entity Type',
        editable: true,
      },
      period_type: {
        vInputType: 'vInput',
        label: 'Period Type',
        hint: 'Period Type',
        editable: true,
      },
      hashes: {
        vInputType: 'vHashes',
        label: 'List/Hashes',
        hint: 'List/Hashes',
        editable: false,
      },
      v_sig: {
        // vInputType: 'vInput',
        label: 'V Sig',
        hint: 'V Sig',
        editable: false,
      },
      form_copy: {
        vInputType: 'vSwitch',
        label: 'Form Copy',
        hint: 'Form Copy',
        editable: false,
      },
      annotated_copy: {
        vInputType: 'vSwitch',
        label: 'Annotated Copy',
        hint: 'Annotated Copy',
        editable: false,
      },
    };
  }

  public static get V_FIELD_TYPES_COLLECTION(): any {
    return _.reduce(VFieldHelper.V_FIELD_TYPES, (memo: any[],
    obj: {editable?: boolean, label?: string, display_name?: string}, k: string) => {
      if (obj.editable) {
        memo.push([k, obj.label || obj.display_name]);
      }
      return memo;
    }, []);
  }

  public static get V_FIELD_HELPER_MAP(): any {return {
      display_name: {},
      verbose_display_name: {},
      terse_display_name: {},
      label: {
        label: 'Label',
        hint: 'Label for input',
        placeholder: 'E.g., Name of the Purchaser',
        as: 'string',
      },
      hint: {
        label: 'Hint',
        hint: 'Additional information to be shown about this input',
        placeholder: 'E.g., Name of the Purchaser',
        as: 'string',
      },
      more_info: {
        label: 'More Info',
        hint: 'Optional - More information that is not shown by default ' +
          'but can be seen if the user clicks to get more information',
        placeholder: 'E.g., Detailed information about this input and/or its context.',
        as: 'text',
        rows: 5,
      },
      placeholder: {
        label: 'Placeholder',
        hint: 'Optional - Text that appears in the input when it is blank',
        placeholder: 'E.g., grayed placeholder text',
        as: 'string',
      },
      field_type: {
        label: 'Field Type',
        hint: 'Optional - To change the type of field, select the desired field type',
        placeholder: 'To Override Field Type ...',
         // as: 'string',
        other_input_options: {
          collection: VFieldHelper.V_FIELD_TYPES_COLLECTION,
          value_method: 'first',
          label_method: 'last',
          include_blank: 'To Override Field Type ...'
        },
      },
      security_types: {},
      default_visible: {},
      fill_approach: {},
      dynamic_fill_approach_v_asset_types: [],
      api_maps: {
        label: 'API Map',
        hint: 'Optional - API map',
        placeholder: 'E.g., drag API map handle',
        as: 'hidden',
      },
      manually_calculable: {},
      step: {},
      step_field_order: {},
      as: {},
      required: {},
      input_html: {},
      other_input_options: {},
      custom_input_size: {},
      sum_type: {},
      adjusted: {},
      editable: {},
      display: {},
      display_with: {},
      ng_filter: {},
      use_formatters: {},
      formatters: {},
      input_formatters: {},
      js_formatters: {},
      input_processor: {},
      dependency: {},
      dependency_value: {},
    };
  }

  public static get EDITABLE_V_FIELD_HELPER_ATTS(): string[] {return [
    'label',
    'hint',
    'more_info',
    'placeholder',
  ]; };

  public static labelize(string?: any) {
    return s.titleize(VFieldHelper.hintize(string));
  }

  public static hintize(string?: any) {
    return s.capitalize(s.underscored((string || '').toString()).split(/\_|(\W)/).join(' ').replace(/\s+/g, ' '));
  }

  public static fieldToLabel(str: string, label: boolean = true): string {
    str = (str || '').toString().toLowerCase();
    if ((/\_hashed\_/g).test(str)) { str = str.split(/\_hashed\_/g).slice(1).join('_hashed_'); };
    if ((/\_hashes$/g).test(str)) { str = pluralize(str.replace(/\_hashes$/g, '')); };
    if ((/\_hashes\_summed\_/g).test(str)) {
      str = 'sum_of_' + pluralize(str.split(/\_hashes\_/)[0]) +
      '_' + str.split(/\_hashes\_summed\_/).slice(1).join('_hashes_');
    }
    return label ? VFieldHelper.labelize(str) : VFieldHelper.hintize(str);
  }

  public static addDataAttsToFieldHelp(
    fieldHelp: VFieldInterface,
    dataAttsHash: {v_field_type?: string},
    options?: {}
  ): VFieldInterface {
    options = _.defaults(options || {}, {});
    if (VTools.isObject(dataAttsHash) && VTools.isObject(fieldHelp)) {
      let inputHTML: {data?: {}} = fieldHelp.input_html || {};
      let inputHTMLData = _.defaults(dataAttsHash, inputHTML.data || {});
      inputHTML.data = inputHTMLData;
      fieldHelp.input_html = inputHTML;
    }
    return fieldHelp;
  }

  public static buildGeneratedNames(
    input: string | number,
    changes?: VFieldInterface,
    options?: {question?: boolean, percent?: boolean, percent_threshold?: boolean}
  ): VFieldInterface {
    options = _.defaults(options || {}, {});
    changes = _.defaults(changes || {}, {});
    let name: string, label: string, terseLabel: string, hint: string;
    name = VTools.makeString(changes.input_name || input);
    if (options.question) {
      name = name.replace(/^(?:ha|i)s\_/g, '');
    }
    if (options.percent) {
      name = name.replace(/(\b|_)perc(?:ent)?(?:age)?(\b|_)/ig, '_percentage_').replace(/(?:^_+)|(?:_+$)/g, '').replace(/_+/, '_');
    }
    if (options.percent_threshold) {
      name = name.replace(/\_threshold\_perc(?:ent)?/ig, '').replace(/\_percent/ig, '').replace(/percent\_/ig, '').replace(/\_perc/ig, '')
      .replace(/(?:^_+)|(?:_+$)/g, '').replace(/_+/, '_') + '_percent';
    }
    label = VFieldHelper.fieldToLabel(name, true);
    hint = VFieldHelper.fieldToLabel(name, false);
    if (options.question) {
      label += '?';
      hint += '?';
    }
    if (options.percent_threshold) {
      hint += '. 50 is interpreted as "a majority".';
    }
    terseLabel = label;
    if (options.percent) {
      terseLabel = terseLabel.replace(/percentage/ig, '%');
    }

    return _.defaults(changes, {
      input_name: input.toString(),
      label: label,
      display_name: label,
      terse_display_name: terseLabel,
      hint: hint,
      required: false,
    });
  }

  public static buildGeneratedPercentNames(input: string | number, changes?: VFieldInterface): VFieldInterface {
    return VFieldHelper.buildGeneratedNames(input, changes, {percent: true});
  }

  public static buildGeneratedPercentThresholdNames(input: string | number, changes?: VFieldInterface): VFieldInterface {
    return VFieldHelper.buildGeneratedNames(input, changes, {percent_threshold: true});
  }

  public static buildBase(
    input?: string | number,
    changes?: VFieldInterface,
    options?: {}
  ): VFieldInterface {
    options = _.defaults(options || {}, {});
    changes = _.defaults(changes || {}, {});
    return _.defaults(
      changes,
      _.defaults((input ? VFieldHelper.buildGeneratedNames(input, {}, options) : {}), {
        // step: nil,
        // step_field_order: nil,

        // type_cast: nil,
        // manually_calculable: false,
        // adjusted: false,
        editable: true,
        // sum_type: nil,

        // placeholder: nil,
        required: false,
        as: 'string',
        // input_html: {},
        // other_input_options: {},
        // custom_input_size: '3',

        fill_approach: 'manual',
        display: true,
        default_visible: true,
        // display_with: nil,

        // optional_input: false,
        // readOnlyDefault: false,

        // ng_filter: nil,
        // js_formatters: nil,
        // jsInputProcessors: nil,
        // use_formatters: nil,
        // formatters: nil,
        // input_formatters: nil,
        // input_processors: nil,

        // dependency: nil,
        // dependency_value: nil
      })
    );
  }

  // string
  // textarea
  // pos int
  // pos dec
  // dec perc
  // currency int
  // currency float
  // currency precise float
  // bool
  // datepicker
  // datetimepicker
  // vm
  // float
  // ratio
  // select
  // ac
  // relation

  public static buildBaseString(input: string, changes?: VFieldInterface): VFieldInterface {
    return _.chain(changes || {}).defaults({
      placeholder: 'Type value_',
      custom_input_size: '4',
    }).defaults(VFieldHelper.buildBase(input)).value();
  }

  public static buildString(changes?: VFieldInterface): VFieldInterface {
    return _.defaults(changes || {}, VFieldHelper.buildBaseString((changes || {input_name: null}).input_name || 'value'));
  }

  public static buildGeneratedString(
    input: string,
    changes?: VFieldInterface
  ): VFieldInterface {
    return _.defaults(changes || {}, VFieldHelper.buildBaseString(input, {hint: null}));
  }

  public static buildBaseTextarea(input: string, changes?: VFieldInterface): VFieldInterface {
    return _.chain(changes || {}).defaults({
      field_type: 'textarea',
      placeholder: 'Type detail_',
      as: 'text',
      input_html: {rows: '5'},
      custom_input_size: '4',
      default_visible: false,
    }).defaults(VFieldHelper.buildBase(input)).value();
  }

  public static buildTextarea(changes?: VFieldInterface): VFieldInterface {
    return _.defaults(changes || {}, VFieldHelper.buildBaseTextarea('detail'));
  }

  public static buildGeneratedTextarea(input: string, changes = {}) {
    return _.defaults(changes || {}, VFieldHelper.buildBaseTextarea(input, {hint: null}));
  }

  public static buildBasePositiveInteger(
    input: string | number,
    changes?: VFieldInterface
  ): VFieldInterface {
    return _.chain(changes || {}).defaults({
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
    }).defaults(VFieldHelper.buildBase(input)).value();
  }

  public static buildPositiveInteger(changes?: VFieldInterface): VFieldInterface {
    return _.defaults(changes || {}, VFieldHelper.buildBasePositiveInteger('number'));
  }

  public static buildGeneratedPositiveInteger(
    input: string | number,
    changes: VFieldInterface = {}
  ): VFieldInterface {
    return _.chain(changes || {}).defaults({
    }).defaults(VFieldHelper.buildBasePositiveInteger(input, {hint: null})).value();
  }


  public static buildBasePositiveVariableInteger(
    input: string | number,
    changes?: VFieldInterface
  ): VFieldInterface {
    return _.chain(changes || {}).defaults({
      type_cast: 'float',
      input_html: {class: 'add-on-decimal inputmask-positive-decimal'},
      input_processors: ['string_to_decimal'],
    }).defaults(VFieldHelper.buildBasePositiveInteger(input)).value();
  }

  public static buildBasePositiveDecimal(
    input: string | number,
    changes?: VFieldInterface
  ): VFieldInterface {
    return _.chain(changes || {}).defaults({
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
    }).defaults(VFieldHelper.buildBase(input)).value();
  }

  public static buildPositiveDecimal(changes?: VFieldInterface): VFieldInterface {
    return _.defaults(changes || {}, VFieldHelper.buildBasePositiveDecimal('precise_number'));
  }

  public static buildGeneratedPositiveDecimal(
    input: string | number,
    changes: VFieldInterface = {}
  ): VFieldInterface {
    return _.chain(changes || {}).defaults({
    }).defaults(VFieldHelper.buildBasePositiveDecimal(input, {hint: null})).value();
  }

  public static buildBaseDollarInteger(input: string | number, changes?: VFieldInterface): VFieldInterface {
    return _.chain(changes || {}).defaults({
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
    }).defaults(VFieldHelper.buildBase(input)).value();
  }

  public static buildDollarInteger(changes?: VFieldInterface): VFieldInterface {
    return _.defaults(changes || {}, VFieldHelper.buildBaseDollarInteger('dollar_amount'));
  }

  public static buildGeneratedDollarInteger(input: string | number, changes: VFieldInterface = {}): VFieldInterface {
    return _.chain(changes || {}).defaults({
    }).defaults(VFieldHelper.buildBaseDollarInteger(input, {hint: null})).value();
  }

  public static buildBaseDollarDecimal(input: string | number, changes?: VFieldInterface): VFieldInterface {
    return _.chain(changes || {}).defaults({
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
    }).defaults(VFieldHelper.buildBase(input)).value();
  }
    // return _.chain(changes || {}).defaults({
    // }).defaults(VFieldHelper.buildBase(input)).value();
  public static buildBasePreciseDollarDecimal(
    input: string | number,
    changes?: VFieldInterface
  ): VFieldInterface {
    return _.chain(changes || {}).defaults({
      ng_filter: 'variableCurrency',
    }).defaults(VFieldHelper.buildBaseDollarDecimal(input)).value();
  }

  public static buildDollarDecimal(changes?: VFieldInterface): VFieldInterface {
    return _.defaults(changes || {}, VFieldHelper.buildBaseDollarDecimal('cents_dollar_amount'));
  }

  public static buildGeneratedDollarDecimal(input: string | number, changes: VFieldInterface = {}): VFieldInterface {
    return _.chain(changes || {}).defaults({
    }).defaults(VFieldHelper.buildBaseDollarDecimal(input, {hint: null})).value();
  }

  public static buildBasePercent(input: string | number, changes?: VFieldInterface) {
    return _.chain(changes || {}).defaults({
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
    }).defaults(VFieldHelper.buildBase(input)).value();
  }

  public static buildPercent(changes = {}) {
    return VFieldHelper.buildBasePercent('percent', changes);
  }

  public static buildGeneratedPercent(input: string | number, changes: VFieldInterface = {}): VFieldInterface {
    return _.chain(changes || {}).defaults({
    }).defaults(VFieldHelper.buildBasePercent(input, {hint: null})).value();
  }

  public static buildBaseDecimalPercent(input: string | number, changes?: VFieldInterface) {
    return _.chain(changes || {}).defaults({
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
    }).defaults(VFieldHelper.buildBasePercent(input)).value();
  }

  public static buildDecimalPercent(changes?: VFieldInterface) {
    return VFieldHelper.buildBaseDecimalPercent('decimal_percent', changes);
  }

  public static buildCalculatedDecimalPercent(input: string | number, changes?: VFieldInterface) {
    return _.chain(changes || {}).defaults({
      fill_approach: 'dynamic',
      editable: false,
      adjusted: true,
    }).defaults(VFieldHelper.buildGeneratedPercentNames(input))
    .defaults(VFieldHelper.buildBaseDecimalPercent(input)).value();
  }

  public static buildBasePercentThreshold(input: string | number, changes?: VFieldInterface) {
    return _.chain(changes || {}).defaults({
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
    }).defaults(VFieldHelper.buildGeneratedPercentThresholdNames(input))
    .defaults(VFieldHelper.buildBase(input)).value();
  }
  public static buildBasePercThreshold = VFieldHelper.buildBasePercentThreshold;

  public static buildPercentThreshold(changes = {}) {
    return VFieldHelper.buildBasePercentThreshold('percent_threshold', changes);
  }
  public static buildPercThreshold = VFieldHelper.buildPercentThreshold;

  public static buildGeneratedPercentThreshold(input: string | number, changes: VFieldInterface = {}): VFieldInterface {
    return _.chain(changes || {}).defaults({
    }).defaults(VFieldHelper.buildBasePercentThreshold(input, {})).value();
  }
  public static buildGeneratedPercThreshold = VFieldHelper.buildGeneratedPercentThreshold;

  public static buildBaseBoolean(
    input: string | number,
    changes?: VFieldInterface, options?: {}
  ): VFieldInterface {
    options = _.defaults(options || {}, {
      question: true
    });
    return _.defaults(changes, _.defaults({
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
    }, VFieldHelper.buildBase(input, {}, options)));
  }

  public static buildApplicability(changes?: VFieldInterface): VFieldInterface {
    return _.chain(changes).defaults({field_type: 'applicability'})
    .defaults(VFieldHelper.buildBaseBoolean('applicability')).value();
  }

  public static buildGeneratedApplicability(
    input: string,
    changes?: VFieldInterface
  ): VFieldInterface {
    changes = changes || {};
    let name: string = (changes.input_name || input).toString().replace(/\_applicability/ig, '');
    return _.defaults(changes, VFieldHelper.buildApplicability({
      label: `${VFieldHelper.fieldToLabel(name)}?`,
      // hint: `Is ${VFieldHelper.fieldToLabel(name, false).toLowerCase()} applicable?`,
      hint: null,
      input_name: input.toString(),
    }));
  }

  public static buildGeneratedElseApplicability(
    input: string,
    changes?: VFieldInterface
  ): VFieldInterface {
    changes = changes || {};
    let name: string = (changes.input_name || input).toString()
    .replace(/\_else\_applicability/ig, '');
    return _.chain(changes || {}).defaults({
      label: `${VFieldHelper.fieldToLabel(name)}?`,
      // hint: 'Is #{VFieldHelper.fieldToLabel(name, false).downcase} applicable?',
      hint: null,
      input_name: input.toString(),
    }).defaults(VFieldHelper.buildApplicability()).value();
  }

  public static buildFormCopy(changes: VFieldInterface = {}): VFieldInterface {
    return _.chain(changes || {}).defaults({
      field_type: 'form_copy',
      input_name: 'form_copy',
      display_name: 'Form Copy?',
      hint: 'Is this a form template to be downloaded and filled out later?',
      label: 'Generate Form Only?',
      readonly_v_asset_types: ['PostIncorporation'],
      required: true,
    }).defaults(VFieldHelper.buildApplicability()).value();
  }

  public static buildAnnotatedCopy(changes: VFieldInterface = {}): VFieldInterface {
    return _.chain(changes || {}).defaults({
      field_type: 'annotated_copy',
      input_name: 'annotated_copy',
      hint: 'Include annotations/comments in the generated document?',
      label: 'Annotated Version?',
      display_name: 'Annotated Version?',
      // readonly_v_asset_types: ['PostIncorporation'],
    }).defaults(VFieldHelper.buildApplicability()).value();
  }

  public static buildBaseDatepicker(input: string | number, changes?: VFieldInterface): VFieldInterface {
    return _.defaults(changes, _.defaults({
      field_type: 'date',
      hint: 'Select the date',
      placeholder: 'E.g., ' + moment().format('YYYY-MM-DD'),
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
    }, VFieldHelper.buildBase(input)));
  }

  public static buildGeneratedDate(input: string, changes?: VFieldInterface): VFieldInterface {
    let name = ((changes || {}).input_name || input).toString().replace(/\_date/ig, '');
    return _.defaults(changes, VFieldHelper.buildBaseDatepicker(input.toString(), {
      label: name === 'date' ? 'Date' : (VFieldHelper.fieldToLabel(name) + ' Date'),
      hint: null,
    }));
  }

  public static buildOrgState(changes?: VFieldInterface): VFieldInterface {
    return _.defaults(changes || {}, {
      field_type: 'organization_state',
      hint: 'State where company incorporated / organized',
      label: 'Company Incorporation / Organization State',
      fill_approach: 'dynamic',
      input_name: 'org_state',
      required: false,
      as: 'string',
      input_html: {class: 'acOrgState'},
      placeholder: 'Select or Type State',
      custom_input_size: '2',
      display: false,
      display_with: 'state',
      use_formatters: true,
      formatters: 'state',
    });
  }

  public static buildGeneratedOrgState(input: string, changes?: VFieldInterface): VFieldInterface {
    changes = changes || {};
    let name = (changes.input_name || input || '').toString().replace(/\_org\_state/ig, '');
    return _.defaults(changes, VFieldHelper.buildOrgState({
      label: (name === 'org_state' ? 'Company' : VFieldHelper.fieldToLabel(name)) +
        ' Incorporation / Organization State',
      hint: 'State where ' +
        (name === 'org_state' ? 'Company' : VFieldHelper.fieldToLabel(name, false)) +
        ' incorporated / organized',
      input_name: input.toString(),
      fill_approach: 'manual',
    }));
  }

  public static buildBaseAcState(input: string | number, changes?: VFieldInterface): VFieldInterface {
    return _.chain(changes || {}).defaults({
      field_type: 'state_or_place',
      placeholder: 'Select or Type State or Place',
      input_html: {class: 'acAddressState'},
      custom_input_size: '3',
      display_with: 'state',
      ng_filter: 'state',
      use_formatters: true,
      formatters: 'state',
    }).defaults(VFieldHelper.buildBase(input)).value();
  }

  public static buildAcState(changes?: VFieldInterface): VFieldInterface {
    return VFieldHelper.buildBaseAcState('state_or_place', changes);
  }

  public static buildBaseAcOrgType(input: string | number, changes = {}) {
    return _.chain(changes || {}).defaults({
      field_type: 'entity_type',
      placeholder: 'Select or Type Entity Type',
      input_html: {class: 'acOrgType'},
      custom_input_size: '3',
      display_with: 'entity_type',
      use_formatters: true,
      formatters: 'entity_type',
    }).defaults(VFieldHelper.buildBase(input)).value();
  }

  public static buildAcOrgType(changes?: VFieldInterface): VFieldInterface {
    return VFieldHelper.buildBaseAcOrgType('entity_or_org_type', changes);
  }

  public static buildBaseAcSecurityName(input: string | number, changes?: VFieldInterface): VFieldInterface {
    return _.chain(changes || {}).defaults({
      // field_type: 'security_name',
      label: 'Security Name',
      display_name: 'Security Name',
      hint: 'Use the exact security name in the company\'s charter ' +
        '(e.g., Series A Preferred Stock).',
      placeholder: 'Start Typing Security Name',
      custom_input_size: '3',
      input_html: {class: 'acSecurityName'},
    }).defaults(VFieldHelper.buildBase(input)).value();
  }

  public static buildAcSecurityName(changes?: VFieldInterface): VFieldInterface {
    return VFieldHelper.buildBaseAcSecurityName('security_name', changes);
  }

  public static buildBasePeriodType(input: string | number, changes?: VFieldInterface): VFieldInterface {
    return _.chain(changes || {}).defaults({
      field_type: 'period_type',
      placeholder: 'Select Period Type',
      as: null,
      other_input_options: {
        collection: VTools.SINGULAR_PERIODS,
        include_blank: 'Select Period Type'
      },
      custom_input_size: '3',
    }).defaults(VFieldHelper.buildBase(input)).value();
  }

  public static buildPeriodType(changes?: VFieldInterface): VFieldInterface {
    return VFieldHelper.buildBasePeriodType('period_type', changes);
  }

  public static buildGeneratedAcState(input: string, changes?: VFieldInterface): VFieldInterface {
    return _.defaults(
      changes || {},
      VFieldHelper.buildAcState(VFieldHelper.buildGeneratedNames(input, {hint: null}))
    );
  }

  public static buildGeneratedOrgType(input: string, changes?: VFieldInterface): VFieldInterface {
    return _.defaults(
      changes || {},
      VFieldHelper.buildAcOrgType(VFieldHelper.buildGeneratedNames(input, {hint: null}))
    );
  }

  public static buildGeneratedPeriodType(
    input: string,
    changes?: VFieldInterface
  ): VFieldInterface {
    changes = changes || {};
    let name = (changes.input_name || input || '').toString().replace(/\_org\_state/ig, '');
    return _.defaults(changes, VFieldHelper.buildPeriodType({
      label: VFieldHelper.fieldToLabel(name),
      // hint: VFieldHelper.fieldToLabel(name, false),
      hint: null,
      input_name: input.toString(),
    }));
  }

  public static buildGeneratedVSig(input: string, changes?: VFieldInterface): VFieldInterface {
    changes = changes || {};
    let name = (changes.input_name || input || '').toString();
    return _.defaults(changes, VFieldHelper.buildString({
      field_type: 'v_sig',
      label: `${VFieldHelper.fieldToLabel(name)} Signature`,
      // hint: `Signature for ${VFieldHelper.fieldToLabel(name, false)}`,
      hint: null,
      input_name: input.toString(),
      fill_approach: 'dynamic',
      display: false,
    }));
  }

  public static buildBaseObjectHashes(input: string | number, changes?: VFieldInterface): VFieldInterface {
    return _.chain(changes || {}).defaults({
      field_type: 'hashes',
      fill_approach: 'dynamic',
      display_with: 'join_array_of_hashes_values',
      use_formatters: true,
      formatters: 'smart_array_of_hash_values',
    }).defaults(VFieldHelper.buildBase(input)).value();
  }

  public static buildObjectHashes(changes?: VFieldInterface): VFieldInterface {
    return VFieldHelper.buildBaseObjectHashes('object_hashes', changes);
  }

  public static buildGeneratedObjectHashes(
    input: string,
    changes?: VFieldInterface
  ): VFieldInterface {
    return _.defaults(changes || {}, VFieldHelper.buildBaseObjectHashes(input, {hint: null}));
  }

  public static buildVirtualModelHashes(changes: VFieldInterface = {}): VFieldInterface {
   return  _.defaults(changes || {}, {
      field_type: 'hashes',
      hint: 'Carefully complete the inputs to model this attribute.',
      label: 'Virtual Model',
      fill_approach: 'virtual_model',
      input_name: 'virtual_model_hashes',
      required: false,
      as: 'text',
      display: true,
      display_with: 'hashes_to_lines',
      use_formatters: true,
    });
  }

  public static buildGeneratedVirtualModelHashes(
    input: string,
    changes?: VFieldInterface
  ): VFieldInterface {
    return _.chain(changes || {}).defaults({
      fill_approach: 'generated_virtual_model'
    }).defaults(VFieldHelper.buildGeneratedNames(input))
    .defaults(VFieldHelper.buildVirtualModelHashes()).value();
  }

  public static buildHashesSummedBase(input: string, changes?: VFieldInterface): VFieldInterface {
    return _.chain(changes).defaults({
      fill_approach: 'dynamic',
      display: true
    }).defaults(VFieldHelper.buildGeneratedNames(input, {})).value();
  }

  public static setAltDependencies(
    fieldHelp: VFieldInterface,
    altDependencies: any, altDependencyValues: any
  ): VFieldInterface {
    fieldHelp = fieldHelp || {};
    let inputHtml = fieldHelp.input_html || {};
    let inputHtmlClass = ((inputHtml.class || '') +  ' isDependent').trim();
    inputHtml.class = inputHtmlClass;
    let inputHTMLData = inputHtml.data || {};
    inputHTMLData = _.defaults({
      alt_dependencies: altDependencies,
      alt_dependency_values: altDependencyValues
    }, inputHTMLData);
    inputHtml.data = inputHTMLData;
    // TODO handle ruby alt-dependencies
    fieldHelp = _.defaults({
      input_html: inputHtml,
      alt_dependencies: altDependencies,
      alt_dependency_values: altDependencyValues
    }, fieldHelp);
    return fieldHelp;
  }

  constructor() {
  }

}

// public static get_default_country_collection(opts={})
//   ([['United States', 'US']] +
// (ISO3166::Country.codes.map {|country_code|
  // [ISO3166::Country[country_code].name, country_code] } -
// [['United States', 'US']]))
// end

//   public static buildBase_select(input, changes = {})
//     buildBase(input).merge(
//       placeholder: nil,
//       as: nil,
//     ).merge(changes)
//   end

//   public static build_yes_checkbox(changes = {})
//     buildBase_boolean(:yes_checkbox, {
//       label: 'Yes?',
//       display_name: 'Yes?',
//       hint: 'Yes?',
//       formatters: 'yes_checkbox',
//       js_formatters: 'isTrue',
//     }).merge(changes)
//   end

//   public static build_boolean_fetched_input(input, dependency, changes = {})
//     dependency = ((dependency.blank? || input.to_s == dependency.to_s) ? nil : dependency)
//     names_hash = build_generated_rights_names(input)
//     fieldHelp = buildBase_boolean(input, names_hash.merge(
//       fill_approach: 'dynamic',
//       editable: false,
//       dependency: dependency,
//       dependency_value: !!dependency,
//     )).merge(changes)
//     fieldHelp = setAltDependencies(fieldHelp, [[dependency]], [[true]]) if dependency
//     fieldHelp
//   end

//   public static build_datepicker(changes = {})
//     buildBase_datepicker(:datepicker, changes)
//   end

//   public static buildBase_datetimepicker(input, changes = {})
//     buildBase(input).merge(
//       hint: 'Select the date',
//       placeholder: 'E.g., ' + DateTime.now.utc.to_datetime.strftime('%Y-%m-%d'),
//       type_cast: 'datetime',
//       input_html: {
//   class: 'no-default-date',
//   data: {behaviour: 'datetimepicker', date_format: 'yyyy-mm-dd'}
// },
//       custom_input_size: '3',
//       display_with: 'format_datetime',
//       ng_filter: 'date:\'MMM d, y h:mm:ss a Z\':\'UTC\'',
//       use_formatters: true,
//       formatters: 'format_datetime',
//       # js_formatters: 'formatDate',
//       input_processors: ['coerce_to_datetime'],
//     ).merge(changes)
//   end

//   public static build_datetimepicker(changes = {})
//     buildBase_datetimepicker(:datetimepicker, changes)
//   end

//   public static build_timestamp(changes = {})
//     buildBase_datetimepicker(:timestamp, {
//       fill_approach: 'dynamic',
//     }).merge(changes)
//   end

//   public static build_db_timestamp(input, changes = {})
//     build_timestamp(build_generated_db_timestamp_names(input, {
//       editable: false,
//       display: false,
//     })).merge(changes)
//   end

//   public static buildBase_db_key(input, changes = {})
//     buildBase(input).merge(
//       placeholder: 'E.g., 123',
//       fill_approach: 'dynamic',
//       other_input_options: {readonly: true},
//       default_visible: false,
//       editable: false,
//       display: false,
//     ).merge(changes)
//   end

//   public static build_db_key(input, changes = {})
//     buildBase_db_key(input, build_generated_db_key_names(input, {})).merge(changes)
//   end


//   public static buildBase_compounding(input, changes = {})
//     buildBase_select(input).merge(
//       custom_input_size: '4',
//       other_input_options:  {
//   collection: CapSpecs::COMPOUNDING_FORMULAS,
//   value_method: :first,
//   label_method: :last,
//   include_blank: 'Select Compounding'
// },
//       ng_filter: 'compounding',
//       js_formatters: 'compounding',
//     ).merge(changes)
//   end

//   public static buildBase_provision_type(input, changes = {})
//     buildBase_select(input).merge(
//       custom_input_size: '4',
//       other_input_options: {
  // collection: CapSpecs.standard_provisions_collection,
  // value_method: :first,
  // label_method: :last,
  // include_blank: 'Select Provision/Right Type'
// },
//       ng_filter: 'provisions',
//       js_formatters: 'provisions',
//     ).merge(changes)
//   end
