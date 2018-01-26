import { VTools } from 'v-tools';
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
    security_types?: number[] | string | string[] | null;
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
    input_formatters?: string | string[] | null;
    js_formatters?: string | string[] | null;
    input_processor?: string | string[] | null;
    input_processors?: string | string[] | null;
    dependency?: string | null;
    dependency_value?: string | null;
    dependencies?: string | string[] | null;
    dependency_values?: any | any[] | null;
    alt_dependencies?: string | string[] | null;
    alt_dependency_values?: any | any[] | null;
    source_path?: any;
    general_search_ac_name_att?: string | null;
    template_package?: string | null;
    insert_id?: boolean | null;
    readonlyDefault?: boolean | null;
    optional_input?: boolean | null;
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
export declare class VFieldHelper {
    static labelize: typeof VTools.labelize;
    static hintize: typeof VTools.hintize;
    static titleize: typeof VTools.titleize;
    static buildGeneratedOrgType: typeof VFieldHelper.buildGeneratedACOrgType;
    static buildBasePercThreshold: typeof VFieldHelper.buildBasePercentThreshold;
    static buildPercThreshold: typeof VFieldHelper.buildPercentThreshold;
    static buildGeneratedPercThreshold: typeof VFieldHelper.buildGeneratedPercentThreshold;
    static readonly positiveDecimalMask: any;
    static readonly positiveIntegerMask: any;
    static positiveIntegerUnmask(value?: string | number | null): number;
    static positiveDecimalUnmask(value?: string | number | null): number;
    static readonly V_FIELD_TYPES: any;
    static readonly V_FIELD_TYPES_COLLECTION: any;
    static readonly V_FIELD_HELPER_MAP: any;
    static readonly EDITABLE_V_FIELD_HELPER_ATTS: string[];
    static readonly COUNTRY_CODES: {};
    static countryCollection(): any[];
    static fieldToLabel(str: string, label?: boolean): string;
    static addDataAttsToFieldHelp(fieldHelp: VFieldInterface, dataAttsHash: {
        v_field_type?: string;
    }, options?: {}): VFieldInterface;
    static setAltDependencies(fieldHelp: VFieldInterface, altDependencies: any, altDependencyValues: any): VFieldInterface;
    static buildGeneratedNames(input: string | number, changes?: VFieldInterface, options?: {
        question?: boolean;
        percent?: boolean;
        percent_threshold?: boolean;
        organization_state?: boolean;
        v_sig?: boolean;
        db_key?: boolean;
        db_timestamp?: boolean;
        event_type?: string;
    }): VFieldInterface;
    static buildGeneratedPercentNames(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildGeneratedPercentThresholdNames(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildBase(input?: string | number, changes?: VFieldInterface, options?: {}): VFieldInterface;
    static buildBaseString(input: string, changes?: VFieldInterface): VFieldInterface;
    static buildString(changes?: VFieldInterface): VFieldInterface;
    static buildGeneratedString(input: string, changes?: VFieldInterface): VFieldInterface;
    static buildBaseTextarea(input: string, changes?: VFieldInterface): VFieldInterface;
    static buildTextarea(changes?: VFieldInterface): VFieldInterface;
    static buildGeneratedTextarea(input: string, changes?: {}): VFieldInterface;
    static buildBasePositiveInteger(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildPositiveInteger(changes?: VFieldInterface): VFieldInterface;
    static buildGeneratedPositiveInteger(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildBasePositiveVariableInteger(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildBasePositiveDecimal(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildPositiveDecimal(changes?: VFieldInterface): VFieldInterface;
    static buildGeneratedPositiveDecimal(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildBaseDollarInteger(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildDollarInteger(changes?: VFieldInterface): VFieldInterface;
    static buildGeneratedDollarInteger(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildBaseDollarDecimal(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildBasePreciseDollarDecimal(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildDollarDecimal(changes?: VFieldInterface): VFieldInterface;
    static buildGeneratedDollarDecimal(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildBasePercent(input: string | number, changes?: VFieldInterface): VFieldInterface & {
        field_type: string;
        placeholder: string;
        type_cast: string;
        input_html: {
            class: string;
        };
        custom_input_size: string;
        sum_type: string;
        display_with: string;
        use_formatters: boolean;
        formatters: string;
        input_formatters: string;
        ng_filter: string;
        input_processors: string[];
    };
    static buildPercent(changes?: {}): VFieldInterface & {
        field_type: string;
        placeholder: string;
        type_cast: string;
        input_html: {
            class: string;
        };
        custom_input_size: string;
        sum_type: string;
        display_with: string;
        use_formatters: boolean;
        formatters: string;
        input_formatters: string;
        ng_filter: string;
        input_processors: string[];
    };
    static buildGeneratedPercent(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildBaseDecimalPercent(input: string | number, changes?: VFieldInterface): VFieldInterface & {
        field_type: string;
        placeholder: string;
        type_cast: string;
        input_html: {
            class: string;
        };
        custom_input_size: string;
        sum_type: string;
        display_with: string;
        use_formatters: boolean;
        formatters: string;
        input_formatters: string;
        ng_filter: string;
        input_processors: string[];
    } & {
        field_type: string;
        sum_type: string;
        display_with: string;
        formatters: string;
        input_formatters: string;
        input_processors: string[];
        js_formatters: string;
        jsInputProcessors: string;
        ng_filter: string;
    };
    static buildDecimalPercent(changes?: VFieldInterface): VFieldInterface & {
        field_type: string;
        placeholder: string;
        type_cast: string;
        input_html: {
            class: string;
        };
        custom_input_size: string;
        sum_type: string;
        display_with: string;
        use_formatters: boolean;
        formatters: string;
        input_formatters: string;
        ng_filter: string;
        input_processors: string[];
    } & {
        field_type: string;
        sum_type: string;
        display_with: string;
        formatters: string;
        input_formatters: string;
        input_processors: string[];
        js_formatters: string;
        jsInputProcessors: string;
        ng_filter: string;
    };
    static buildCalculatedDecimalPercent(input: string | number, changes?: VFieldInterface): VFieldInterface & {
        field_type: string;
        placeholder: string;
        type_cast: string;
        input_html: {
            class: string;
        };
        custom_input_size: string;
        sum_type: string;
        display_with: string;
        use_formatters: boolean;
        formatters: string;
        input_formatters: string;
        ng_filter: string;
        input_processors: string[];
    } & {
        field_type: string;
        sum_type: string;
        display_with: string;
        formatters: string;
        input_formatters: string;
        input_processors: string[];
        js_formatters: string;
        jsInputProcessors: string;
        ng_filter: string;
    } & {
        fill_approach: string;
        editable: boolean;
        adjusted: boolean;
    };
    static buildBasePercentThreshold(input: string | number, changes?: VFieldInterface): VFieldInterface & {
        hint: string;
        field_type: string;
        placeholder: string;
        type_cast: string;
        input_html: {
            class: string;
        };
        custom_input_size: string;
        manually_calculable: boolean;
        sum_type: string;
        adjusted: boolean;
        display_with: string;
        use_formatters: boolean;
        formatters: string;
        input_formatters: string;
        ng_filter: string;
        input_processors: string[];
    };
    static buildPercentThreshold(changes?: {}): VFieldInterface & {
        hint: string;
        field_type: string;
        placeholder: string;
        type_cast: string;
        input_html: {
            class: string;
        };
        custom_input_size: string;
        manually_calculable: boolean;
        sum_type: string;
        adjusted: boolean;
        display_with: string;
        use_formatters: boolean;
        formatters: string;
        input_formatters: string;
        ng_filter: string;
        input_processors: string[];
    };
    static buildGeneratedPercentThreshold(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildBaseBoolean(input: string | number, changes?: VFieldInterface, options?: {}): VFieldInterface;
    static buildBaseApplicability(input: string | number, changes?: VFieldInterface, options?: {}): VFieldInterface;
    static buildApplicability(changes?: VFieldInterface): VFieldInterface;
    static buildYesCheckbox(changes?: VFieldInterface): VFieldInterface;
    static buildBooleanFetchedInput(input: string | number, dependency?: string | number | null, changes?: VFieldInterface): VFieldInterface;
    static buildGeneratedApplicability(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildGeneratedElseApplicability(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildFormCopy(changes?: VFieldInterface): VFieldInterface;
    static buildAnnotatedCopy(changes?: VFieldInterface): VFieldInterface;
    static buildBaseDatepicker(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildDatepicker(changes?: VFieldInterface): VFieldInterface;
    static buildBaseDatetimepicker(input: string, changes?: VFieldInterface): VFieldInterface;
    static buildDatetimepicker(changes?: VFieldInterface): VFieldInterface;
    static buildGeneratedDate(input: string, changes?: VFieldInterface): VFieldInterface;
    static buildBaseOrgState(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildOrgState(changes?: VFieldInterface): VFieldInterface;
    static buildGeneratedOrgState(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildBaseAcState(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildAcState(changes?: VFieldInterface): VFieldInterface;
    static buildGeneratedAcState(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildBaseAcOrgType(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildAcOrgType(changes?: VFieldInterface): VFieldInterface;
    static buildGeneratedACOrgType(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildBaseAcSecurityName(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildAcSecurityName(changes?: VFieldInterface): VFieldInterface;
    static buildGeneratedAcSecurityName(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildBasePeriodType(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildPeriodType(changes?: VFieldInterface): VFieldInterface;
    static buildGeneratedPeriodType(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildGeneratedVSig(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildBaseObjectHashes(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildObjectHashes(changes?: VFieldInterface): VFieldInterface;
    static buildGeneratedObjectHashes(input: string, changes?: VFieldInterface): VFieldInterface;
    static buildBaseVirtualModelHashes(input: string | number, changes?: VFieldInterface): VFieldInterface;
    static buildVirtualModelHashes(changes?: VFieldInterface): VFieldInterface;
    static buildGeneratedVirtualModelHashes(input: string, changes?: VFieldInterface): VFieldInterface;
    static buildHashesSummedBase(input: string, changes?: VFieldInterface): VFieldInterface;
    static buildBaseDbKey(input: string, changes?: VFieldInterface): VFieldInterface;
    static buildDbKey(changes?: VFieldInterface): VFieldInterface;
    static buildBaseDbTimestamp(input: string, changes?: VFieldInterface): VFieldInterface;
    static buildDbTimestamp(changes?: VFieldInterface): VFieldInterface;
    static buildBaseSelect(input: string, changes?: VFieldInterface): VFieldInterface;
}
