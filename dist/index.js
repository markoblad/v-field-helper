"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var s = require("underscore.string");
var pluralize = require("pluralize");
var v_tools_1 = require("v-tools");
var createNumberMask_1 = require("text-mask-addons/dist/createNumberMask");
var VFieldHelper = /** @class */ (function () {
    function VFieldHelper() {
    }
    Object.defineProperty(VFieldHelper, "positiveDecimalMask", {
        get: function () {
            return createNumberMask_1.default({
                prefix: '',
                // suffix: emptyString,
                // includeThousandsSeparator: true,
                // thousandsSeparatorSymbol: comma,
                allowDecimal: true,
                // decimalSymbol: period,
                decimalLimit: 15,
            });
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(VFieldHelper, "positiveIntegerMask", {
        get: function () {
            return createNumberMask_1.default({
                prefix: '',
                // suffix: emptyString,
                // includeThousandsSeparator: true,
                // thousandsSeparatorSymbol: comma,
                allowDecimal: false,
            });
        },
        enumerable: true,
        configurable: true
    });
    ;
    VFieldHelper.positiveIntegerUnmask = function (value) {
        return parseInt((value || 0).toString().trim().replace(/\..*/g, '').replace(/[^\d]/g, ''));
    };
    ;
    VFieldHelper.positiveDecimalUnmask = function (value) {
        return parseFloat((value || 0).toString().trim().replace(/[^\d\.]/g, ''));
    };
    ;
    Object.defineProperty(VFieldHelper, "V_FIELD_TYPES", {
        get: function () {
            return {
                basic_input: {
                    vInputType: 'vInput',
                    label: 'Basic Input',
                    hint: 'Basic Input',
                    editable: true,
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
                    textMask: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VFieldHelper, "V_FIELD_TYPES_COLLECTION", {
        get: function () {
            return _.reduce(VFieldHelper.V_FIELD_TYPES, function (memo, obj, k) {
                if (obj.editable) {
                    memo.push([k, obj.label || obj.display_name]);
                }
                return memo;
            }, []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VFieldHelper, "V_FIELD_HELPER_MAP", {
        get: function () {
            return {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VFieldHelper, "EDITABLE_V_FIELD_HELPER_ATTS", {
        get: function () {
            return [
                'label',
                'hint',
                'more_info',
                'placeholder',
            ];
        },
        enumerable: true,
        configurable: true
    });
    ;
    VFieldHelper.labelize = function (string) {
        return s.titleize(VFieldHelper.hintize(string));
    };
    VFieldHelper.hintize = function (string) {
        return s.capitalize(s.underscored((string || '').toString()).split(/\_|(\W)/).join(' ').replace(/\s+/g, ' '));
    };
    VFieldHelper.fieldToLabel = function (str, label) {
        if (label === void 0) { label = true; }
        str = (str || '').toString().toLowerCase();
        if ((/\_hashed\_/g).test(str)) {
            str = str.split(/\_hashed\_/g).slice(1).join('_hashed_');
        }
        ;
        if ((/\_hashes$/g).test(str)) {
            str = pluralize(str.replace(/\_hashes$/g, ''));
        }
        ;
        if ((/\_hashes\_summed\_/g).test(str)) {
            str = 'sum_of_' + pluralize(str.split(/\_hashes\_/)[0]) +
                '_' + str.split(/\_hashes\_summed\_/).slice(1).join('_hashes_');
        }
        return label ? VFieldHelper.labelize(str) : VFieldHelper.hintize(str);
    };
    VFieldHelper.addDataAttsToFieldHelp = function (fieldHelp, dataAttsHash, options) {
        options = _.defaults(options || {}, {});
        if (v_tools_1.VTools.isObject(dataAttsHash) && v_tools_1.VTools.isObject(fieldHelp)) {
            var inputHTML = fieldHelp.input_html || {};
            var inputHTMLData = _.defaults(dataAttsHash, inputHTML.data || {});
            inputHTML.data = inputHTMLData;
            fieldHelp.input_html = inputHTML;
        }
        return fieldHelp;
    };
    VFieldHelper.setAltDependencies = function (fieldHelp, altDependencies, altDependencyValues) {
        fieldHelp = fieldHelp || {};
        var inputHtml = fieldHelp.input_html || {};
        var inputHtmlClass = ((inputHtml.class || '') + ' isDependent').trim();
        inputHtml.class = inputHtmlClass;
        var inputHTMLData = inputHtml.data || {};
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
    };
    VFieldHelper.buildGeneratedNames = function (input, changes, options) {
        options = _.defaults(options || {}, {});
        changes = _.defaults(changes || {}, {});
        var name, label;
        var terse_display_name, verbose_display_name = '', hint;
        name = v_tools_1.VTools.makeString(changes.input_name || input);
        if (options.question) {
            name = name.replace(/^(?:ha|i)s\_/g, '')
                .replace(/\_else\_applicability/ig, '')
                .replace(/\_applicability/ig, '');
        }
        if (options.percent) {
            name = name.replace(/(\b|_)perc(?:ent)?(?:age)?(\b|_)/ig, '_percentage_');
        }
        if (options.percent_threshold) {
            name = name.replace(/\_threshold\_perc(?:ent)?/ig, '').replace(/\_percent/ig, '')
                .replace(/percent\_/ig, '').replace(/\_perc/ig, '') + '_percent';
        }
        if (options.organization_state) {
            name = name.replace(/\_?org(?:anization|anisation)\_state/ig, '_organization_state');
        }
        if (options.v_sig) {
            name += ' Signature';
        }
        name = name.replace(/(?:^_+)|(?:_+$)/g, '').replace(/_+/, '_');
        label = VFieldHelper.fieldToLabel(name, true);
        hint = VFieldHelper.fieldToLabel(name, false);
        if (options.question) {
            label += '?';
            hint += '?';
        }
        if (options.percent_threshold) {
            hint += '. 50 is interpreted as "a majority".';
        }
        if (options.db_key) {
            hint += ' (DB record key)';
        }
        if (options.db_timestamp) {
            hint += ' (DB timestamp)';
            verbose_display_name = 'Entry ' + (input === 'updated_at' ? 'Last ' : '') + label;
        }
        terse_display_name = label;
        if (options.percent) {
            terse_display_name = terse_display_name.replace(/percentage/ig, '%');
        }
        var generatedNames = {
            input_name: input.toString(),
            label: label,
            display_name: label,
            terse_display_name: terse_display_name,
            hint: hint,
            required: false,
        };
        if (verbose_display_name) {
            generatedNames.verbose_display_name = verbose_display_name;
        }
        return _.defaults(changes, generatedNames);
    };
    VFieldHelper.buildGeneratedPercentNames = function (input, changes) {
        return VFieldHelper.buildGeneratedNames(input, changes, { percent: true });
    };
    VFieldHelper.buildGeneratedPercentThresholdNames = function (input, changes) {
        return VFieldHelper.buildGeneratedNames(input, changes, { percent_threshold: true });
    };
    VFieldHelper.buildBase = function (input, changes, options) {
        options = _.defaults(options || {}, {});
        changes = _.defaults(changes || {}, {});
        return _.defaults(changes, _.defaults((input ? VFieldHelper.buildGeneratedNames(input, {}, options) : {}), {
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
        }));
    };
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
    VFieldHelper.buildBaseString = function (input, changes) {
        return _.chain(changes || {}).defaults({
            placeholder: 'Type value_',
            custom_input_size: '4',
        }).defaults(VFieldHelper.buildBase(input)).value();
    };
    VFieldHelper.buildString = function (changes) {
        return _.defaults(changes || {}, VFieldHelper.buildBaseString((changes || { input_name: null }).input_name || 'value'));
    };
    VFieldHelper.buildGeneratedString = function (input, changes) {
        return _.defaults(changes || {}, VFieldHelper.buildBaseString(input, { hint: null }));
    };
    VFieldHelper.buildBaseTextarea = function (input, changes) {
        return _.chain(changes || {}).defaults({
            field_type: 'textarea',
            placeholder: 'Type detail_',
            as: 'text',
            input_html: { rows: '5' },
            custom_input_size: '4',
            default_visible: false,
        }).defaults(VFieldHelper.buildBase(input)).value();
    };
    VFieldHelper.buildTextarea = function (changes) {
        return _.defaults(changes || {}, VFieldHelper.buildBaseTextarea('detail'));
    };
    VFieldHelper.buildGeneratedTextarea = function (input, changes) {
        if (changes === void 0) { changes = {}; }
        return _.defaults(changes || {}, VFieldHelper.buildBaseTextarea(input, { hint: null }));
    };
    VFieldHelper.buildBasePositiveInteger = function (input, changes) {
        return _.chain(changes || {}).defaults({
            field_type: 'positive_integer',
            placeholder: 'E.g., 1,000',
            type_cast: 'integer',
            input_html: { class: 'add-on-integer inputmask-positive-integer' },
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
    };
    VFieldHelper.buildPositiveInteger = function (changes) {
        return _.defaults(changes || {}, VFieldHelper.buildBasePositiveInteger('number'));
    };
    VFieldHelper.buildGeneratedPositiveInteger = function (input, changes) {
        if (changes === void 0) { changes = {}; }
        return _.chain(changes || {}).defaults({}).defaults(VFieldHelper.buildBasePositiveInteger(input, { hint: null })).value();
    };
    VFieldHelper.buildBasePositiveVariableInteger = function (input, changes) {
        return _.chain(changes || {}).defaults({
            type_cast: 'float',
            input_html: { class: 'add-on-decimal inputmask-positive-decimal' },
            input_processors: ['string_to_decimal'],
        }).defaults(VFieldHelper.buildBasePositiveInteger(input)).value();
    };
    VFieldHelper.buildBasePositiveDecimal = function (input, changes) {
        return _.chain(changes || {}).defaults({
            field_type: 'positive_decimal',
            placeholder: 'E.g., 0.00001',
            type_cast: 'float',
            input_html: { class: 'add-on-decimal inputmask-positive-decimal' },
            custom_input_size: '3',
            sum_type: 'dec',
            display_with: 'variable_decimal',
            ng_filter: 'variableDecimal',
            use_formatters: true,
            formatters: 'variable_decimal',
            input_formatters: 'variable_decimal',
            input_processors: ['string_to_decimal'],
        }).defaults(VFieldHelper.buildBase(input)).value();
    };
    VFieldHelper.buildPositiveDecimal = function (changes) {
        return _.defaults(changes || {}, VFieldHelper.buildBasePositiveDecimal('precise_number'));
    };
    VFieldHelper.buildGeneratedPositiveDecimal = function (input, changes) {
        if (changes === void 0) { changes = {}; }
        return _.chain(changes || {}).defaults({}).defaults(VFieldHelper.buildBasePositiveDecimal(input, { hint: null })).value();
    };
    VFieldHelper.buildBaseDollarInteger = function (input, changes) {
        return _.chain(changes || {}).defaults({
            field_type: 'dollar_integer',
            placeholder: 'E.g., 40,000',
            type_cast: 'integer',
            input_html: { class: 'add-on-dollar inputmask-positive-integer' },
            custom_input_size: '3',
            sum_type: 'dol',
            display_with: 'currency_integer',
            use_formatters: true,
            formatters: 'currency_integer',
            ng_filter: 'currency:$:0',
            input_formatters: 'variable_integer',
            input_processors: ['string_to_integer'],
        }).defaults(VFieldHelper.buildBase(input)).value();
    };
    VFieldHelper.buildDollarInteger = function (changes) {
        return _.defaults(changes || {}, VFieldHelper.buildBaseDollarInteger('dollar_amount'));
    };
    VFieldHelper.buildGeneratedDollarInteger = function (input, changes) {
        if (changes === void 0) { changes = {}; }
        return _.chain(changes || {}).defaults({}).defaults(VFieldHelper.buildBaseDollarInteger(input, { hint: null })).value();
    };
    VFieldHelper.buildBaseDollarDecimal = function (input, changes) {
        return _.chain(changes || {}).defaults({
            field_type: 'dollar_precise_decimal',
            placeholder: 'E.g., 0.0001',
            type_cast: 'float',
            input_html: { class: 'add-on-dollar inputmask-positive-decimal' },
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
    };
    // return _.chain(changes || {}).defaults({
    // }).defaults(VFieldHelper.buildBase(input)).value();
    VFieldHelper.buildBasePreciseDollarDecimal = function (input, changes) {
        return _.chain(changes || {}).defaults({
            ng_filter: 'variableCurrency',
        }).defaults(VFieldHelper.buildBaseDollarDecimal(input)).value();
    };
    VFieldHelper.buildDollarDecimal = function (changes) {
        return _.defaults(changes || {}, VFieldHelper.buildBaseDollarDecimal('cents_dollar_amount'));
    };
    VFieldHelper.buildGeneratedDollarDecimal = function (input, changes) {
        if (changes === void 0) { changes = {}; }
        return _.chain(changes || {}).defaults({}).defaults(VFieldHelper.buildBaseDollarDecimal(input, { hint: null })).value();
    };
    VFieldHelper.buildBasePercent = function (input, changes) {
        return _.chain(changes || {}).defaults({
            field_type: 'percent',
            placeholder: 'E.g., 1.5',
            type_cast: 'float',
            input_html: { class: 'add-on-percent inputmask-positive-decimal' },
            custom_input_size: '2',
            sum_type: 'perc',
            display_with: 'perc_to_perc_str',
            use_formatters: true,
            formatters: 'perc_to_perc_str',
            input_formatters: 'decimal_to_str',
            ng_filter: 'percentage:3',
            input_processors: ['string_to_decimal'],
        }).defaults(VFieldHelper.buildBase(input)).value();
    };
    VFieldHelper.buildPercent = function (changes) {
        if (changes === void 0) { changes = {}; }
        return VFieldHelper.buildBasePercent('percent', changes);
    };
    VFieldHelper.buildGeneratedPercent = function (input, changes) {
        if (changes === void 0) { changes = {}; }
        return _.chain(changes || {}).defaults({}).defaults(VFieldHelper.buildBasePercent(input, { hint: null })).value();
    };
    VFieldHelper.buildBaseDecimalPercent = function (input, changes) {
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
    };
    VFieldHelper.buildDecimalPercent = function (changes) {
        return VFieldHelper.buildBaseDecimalPercent('decimal_percent', changes);
    };
    VFieldHelper.buildCalculatedDecimalPercent = function (input, changes) {
        return _.chain(changes || {}).defaults({
            fill_approach: 'dynamic',
            editable: false,
            adjusted: true,
        }).defaults(VFieldHelper.buildGeneratedPercentNames(input))
            .defaults(VFieldHelper.buildBaseDecimalPercent(input)).value();
    };
    VFieldHelper.buildBasePercentThreshold = function (input, changes) {
        return _.chain(changes || {}).defaults({
            hint: 'Threshold Percent.  50 is interpreted as "a majority".',
            field_type: 'percent_threshold',
            placeholder: 'E.g., 50',
            type_cast: 'float',
            input_html: { class: 'add-on-percent inputmask-positive-decimal' },
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
    };
    VFieldHelper.buildPercentThreshold = function (changes) {
        if (changes === void 0) { changes = {}; }
        return VFieldHelper.buildBasePercentThreshold('percent_threshold', changes);
    };
    VFieldHelper.buildGeneratedPercentThreshold = function (input, changes) {
        if (changes === void 0) { changes = {}; }
        return _.chain(changes || {}).defaults({}).defaults(VFieldHelper.buildBasePercentThreshold(input, {})).value();
    };
    VFieldHelper.buildBaseBoolean = function (input, changes, options) {
        options = _.defaults(options || {}, {
            question: true
        });
        return _.defaults(changes, _.defaults({
            type_cast: 'boolean',
            as: 'boolean_buttons',
            bip_as: 'checkbox',
            input_html: { data: { default_value: false } },
            display_with: 'bool',
            ng_filter: 'check',
            use_formatters: true,
            formatters: 'is_true',
            js_formatters: 'check',
            input_processors: ['is_true'],
        }, VFieldHelper.buildBase(input, {}, options)));
    };
    VFieldHelper.buildBaseApplicability = function (input, changes, options) {
        return _.chain(changes).defaults({ field_type: 'applicability' })
            .defaults(VFieldHelper.buildBaseBoolean(input)).value();
    };
    VFieldHelper.buildApplicability = function (changes) {
        return _.chain(changes)
            .defaults(VFieldHelper.buildBaseApplicability('applicability')).value();
    };
    VFieldHelper.buildGeneratedApplicability = function (input, changes) {
        if (changes === void 0) { changes = {}; }
        return _.chain(changes || {}).defaults({}).defaults(VFieldHelper.buildBaseApplicability(input, { hint: null })).value();
    };
    VFieldHelper.buildGeneratedElseApplicability = function (input, changes) {
        if (changes === void 0) { changes = {}; }
        return _.chain(changes || {}).defaults({}).defaults(VFieldHelper.buildBaseApplicability(input, { hint: null })).value();
    };
    VFieldHelper.buildFormCopy = function (changes) {
        if (changes === void 0) { changes = {}; }
        return _.chain(changes || {}).defaults({
            field_type: 'form_copy',
            input_name: 'form_copy',
            display_name: 'Form Copy?',
            hint: 'Is this a form template to be downloaded and filled out later?',
            label: 'Generate Form Only?',
            readonly_v_asset_types: ['PostIncorporation'],
            required: true,
        }).defaults(VFieldHelper.buildApplicability()).value();
    };
    VFieldHelper.buildAnnotatedCopy = function (changes) {
        if (changes === void 0) { changes = {}; }
        return _.chain(changes || {}).defaults({
            field_type: 'annotated_copy',
            input_name: 'annotated_copy',
            hint: 'Include annotations/comments in the generated document?',
            label: 'Annotated Version?',
            display_name: 'Annotated Version?',
        }).defaults(VFieldHelper.buildApplicability()).value();
    };
    VFieldHelper.buildBaseDatepicker = function (input, changes) {
        return _.defaults(changes, _.defaults({
            field_type: 'date',
            // placeholder: 'E.g., ' + moment().format('YYYY-MM-DD'),
            placeholder: 'YYYY-MM-DD',
            type_cast: 'date',
            input_html: {
                class: 'col-sm-3 no-default-date inputmask-date',
                data: { behaviour: 'datepicker', date_format: 'yyyy-mm-dd' }
            },
            custom_input_size: '3',
            display_with: 'format_date',
            use_formatters: true,
            formatters: 'format_date',
            ng_filter: 'date:mediumDate',
            js_formatters: 'formatDate',
        }, VFieldHelper.buildBase(input)));
    };
    VFieldHelper.buildGeneratedDate = function (input, changes) {
        var name = ((changes || {}).input_name || input).toString().replace(/\_date/ig, '');
        return _.defaults(changes, VFieldHelper.buildBaseDatepicker(input.toString(), {
            // label: name === 'date' ? 'Date' : (VFieldHelper.fieldToLabel(name) + ' Date'),
            hint: 'Select the date',
        }));
    };
    VFieldHelper.buildBaseOrgState = function (input, changes) {
        return _.chain(changes || {}).defaults({
            field_type: 'organization_state',
            fill_approach: 'manual',
            input_html: { class: 'acOrgState' },
            custom_input_size: '2',
            display: false,
            display_with: 'state',
            use_formatters: true,
            formatters: 'state',
        }).defaults(VFieldHelper.buildBase(input)).value();
    };
    VFieldHelper.buildOrgState = function (changes) {
        return _.chain(changes)
            .defaults(VFieldHelper.buildBaseOrgState('org_state', {
            fill_approach: 'dynamic',
            label: 'Company Incorporation / Organization State',
            hint: 'State where company incorporated / organized',
            placeholder: 'Select or Type State',
        })).value();
    };
    VFieldHelper.buildGeneratedOrgState = function (input, changes) {
        if (changes === void 0) { changes = {}; }
        return _.chain(changes || {}).defaults({}).defaults(VFieldHelper.buildBaseOrgState(input, {})).value();
    };
    VFieldHelper.buildBaseAcState = function (input, changes) {
        return _.chain(changes || {}).defaults({
            field_type: 'state_or_place',
            placeholder: 'Select or Type State or Place',
            input_html: { class: 'acAddressState' },
            custom_input_size: '3',
            display_with: 'state',
            ng_filter: 'state',
            use_formatters: true,
            formatters: 'state',
        }).defaults(VFieldHelper.buildBase(input)).value();
    };
    VFieldHelper.buildAcState = function (changes) {
        return VFieldHelper.buildBaseAcState('state_or_place', changes);
    };
    VFieldHelper.buildGeneratedAcState = function (input, changes) {
        if (changes === void 0) { changes = {}; }
        return _.chain(changes || {}).defaults({}).defaults(VFieldHelper.buildBaseAcState(input, {})).value();
    };
    VFieldHelper.buildBaseAcOrgType = function (input, changes) {
        return _.chain(changes || {}).defaults({
            field_type: 'entity_type',
            placeholder: 'Select or Type Entity Type',
            input_html: { class: 'acOrgType' },
            custom_input_size: '3',
            display_with: 'entity_type',
            use_formatters: true,
            formatters: 'entity_type',
        }).defaults(VFieldHelper.buildBase(input)).value();
    };
    VFieldHelper.buildAcOrgType = function (changes) {
        return VFieldHelper.buildBaseAcOrgType('entity_or_org_type', changes);
    };
    VFieldHelper.buildGeneratedACOrgType = function (input, changes) {
        if (changes === void 0) { changes = {}; }
        return _.chain(changes || {}).defaults({}).defaults(VFieldHelper.buildBaseAcOrgType(input, { hint: null })).value();
    };
    VFieldHelper.buildBaseAcSecurityName = function (input, changes) {
        return _.chain(changes || {}).defaults({
            // field_type: 'security_name',
            label: 'Security Name',
            display_name: 'Security Name',
            hint: 'Use the exact security name in the company\'s charter ' +
                '(e.g., Series A Preferred Stock).',
            placeholder: 'Start Typing Security Name',
            custom_input_size: '3',
            input_html: { class: 'acSecurityName' },
        }).defaults(VFieldHelper.buildBase(input)).value();
    };
    VFieldHelper.buildAcSecurityName = function (changes) {
        return VFieldHelper.buildBaseAcSecurityName('security_name', changes);
    };
    VFieldHelper.buildGeneratedAcSecurityName = function (input, changes) {
        if (changes === void 0) { changes = {}; }
        return _.chain(changes || {}).defaults({}).defaults(VFieldHelper.buildBaseAcSecurityName(input, {})).value();
    };
    VFieldHelper.buildBasePeriodType = function (input, changes) {
        return _.chain(changes || {}).defaults({
            field_type: 'period_type',
            placeholder: 'Select Period Type',
            as: null,
            other_input_options: {
                collection: v_tools_1.VTools.SINGULAR_PERIODS,
                include_blank: 'Select Period Type'
            },
            custom_input_size: '3',
        }).defaults(VFieldHelper.buildBase(input)).value();
    };
    VFieldHelper.buildPeriodType = function (changes) {
        return VFieldHelper.buildBasePeriodType('period_type', changes);
    };
    VFieldHelper.buildGeneratedPeriodType = function (input, changes) {
        if (changes === void 0) { changes = {}; }
        return _.chain(changes || {}).defaults({}).defaults(VFieldHelper.buildBasePeriodType(input, { hint: null })).value();
    };
    VFieldHelper.buildGeneratedVSig = function (input, changes) {
        return _.chain(changes || {}).defaults({
            field_type: 'v_sig',
            fill_approach: 'dynamic',
            display: false,
        }).defaults(VFieldHelper.buildBase(input)).value();
    };
    VFieldHelper.buildBaseObjectHashes = function (input, changes) {
        return _.chain(changes || {}).defaults({
            field_type: 'hashes',
            fill_approach: 'dynamic',
            display_with: 'join_array_of_hashes_values',
            use_formatters: true,
            formatters: 'smart_array_of_hash_values',
        }).defaults(VFieldHelper.buildBase(input)).value();
    };
    VFieldHelper.buildObjectHashes = function (changes) {
        return VFieldHelper.buildBaseObjectHashes('object_hashes', changes);
    };
    VFieldHelper.buildGeneratedObjectHashes = function (input, changes) {
        return _.defaults(changes || {}, VFieldHelper.buildBaseObjectHashes(input, { hint: null }));
    };
    VFieldHelper.buildBaseVirtualModelHashes = function (input, changes) {
        return _.chain(changes || {}).defaults({
            field_type: 'hashes',
            fill_approach: 'virtual_model',
            as: 'text',
            display_with: 'hashes_to_lines',
            use_formatters: true,
        }).defaults(VFieldHelper.buildBase(input)).value();
    };
    VFieldHelper.buildVirtualModelHashes = function (changes) {
        return VFieldHelper.buildBaseVirtualModelHashes('virtual_model_hashes', {
            label: 'Virtual Model',
            hint: 'Carefully complete the inputs to model this attribute.',
        });
    };
    VFieldHelper.buildGeneratedVirtualModelHashes = function (input, changes) {
        return _.chain(changes || {}).defaults({
            fill_approach: 'generated_virtual_model'
        })
            .defaults(VFieldHelper.buildBaseVirtualModelHashes(input, changes)).value();
    };
    VFieldHelper.buildHashesSummedBase = function (input, changes) {
        return _.chain(changes).defaults({
            fill_approach: 'dynamic',
            editable: false,
        }).defaults(VFieldHelper.buildBase(input)).value();
    };
    VFieldHelper.buildBaseDbKey = function (input, changes) {
        return _.chain(changes || {}).defaults({
            placeholder: 'E.g., 123',
            fill_approach: 'dynamic',
            other_input_options: { readonly: true },
            default_visible: false,
            editable: false,
            display: false,
        }).defaults(VFieldHelper.buildBase(input, {}, { db_key: true })).value();
    };
    VFieldHelper.buildDbKey = function (changes) {
        return _.defaults(changes || {}, VFieldHelper.buildBaseDbKey((changes || { input_name: null }).input_name || 'db_key'));
    };
    VFieldHelper.buildBaseDbTimestamp = function (input, changes) {
        return _.chain(changes || {}).defaults({
            fill_approach: 'dynamic',
            other_input_options: { readonly: true },
            default_visible: false,
            editable: false,
            display: false,
        }).defaults(VFieldHelper.buildBase(input, {}, { db_timestamp: true })).value();
    };
    VFieldHelper.buildDbTimestamp = function (changes) {
        return _.defaults(changes || {}, VFieldHelper.buildBaseDbTimestamp((changes || { input_name: null }).input_name || 'db_timestamp'));
    };
    VFieldHelper.buildBasePercThreshold = VFieldHelper.buildBasePercentThreshold;
    VFieldHelper.buildPercThreshold = VFieldHelper.buildPercentThreshold;
    VFieldHelper.buildGeneratedPercThreshold = VFieldHelper.buildGeneratedPercentThreshold;
    VFieldHelper.buildGeneratedOrgType = VFieldHelper.buildGeneratedACOrgType;
    return VFieldHelper;
}());
exports.VFieldHelper = VFieldHelper;
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
