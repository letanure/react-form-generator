type RuleConfig = {
  [key: string]: string | number | boolean
}

interface FieldConfigBasic {
  disabled?: boolean
  label?: string
  name: string
  placeholder?: string
  readonly?: boolean
  layout?: 'horizontal' | 'vertical' | 'horizontal-bordered'
  type?:
    | 'color'
    | 'datetime-local'
    | 'datetime'
    | 'date'
    | 'email'
    | 'hidden'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | undefined
  validate?: RuleConfig[]
  value: string | FieldsValues | FieldsValues[]
}

type FieldOption = {
  value: string | boolean | number
  label: string
}

type FieldOptions = FieldOption[]

interface FieldSelectConfig extends Omit<FieldConfigBasic, 'type'> {
  type: 'select'
  options: FieldOptions
}

interface FieldRadioGroupConfig
  extends Omit<FieldConfigBasic, 'type | placeholder'> {
  type: 'radioGroup'
  options: FieldOptions
}

interface FieldConfigInputRange extends Omit<FieldConfigBasic, 'type'> {
  type: 'range'
  max?: number
  min?: number
  step?: number
  options?: FieldOptions
}

interface FieldConfigTextarea extends Omit<FieldConfigBasic, 'type'> {
  type: 'textarea'
  rows?: number
}

interface FieldConfigObject extends Omit<FieldConfigBasic, 'type'> {
  type: 'object'
  fields: FieldConfig[]
}

interface FieldConfigArray extends Omit<FieldConfigBasic, 'type'> {
  type: 'array'
  fields: FieldConfig[]
}

type FieldConfig =
  | FieldConfigBasic
  | FieldSelectConfig
  | FieldRadioGroupConfig
  | FieldConfigInputRange
  | FieldConfigTextarea
  | FieldConfigObject
  | FieldConfigArray

type FormConfig = {
  fields: FieldConfig[]
  layout?: 'horizontal' | 'vertical' | 'horizontal-bordered'
  title?: string
  submitText?: string
  description?: string
}

type FieldData = {
  value: string | undefined | FieldsValues | FieldsValues[]
  changed: boolean
  touched: boolean
  valid: boolean
}

type FieldsValues = {
  [key: string]: string | FieldsValues | FieldsValues[]
}

type ClassesObject = {
  [key: string]: boolean
}

/** Information about the state of the form and complete data from each field */
type FieldsetMeta = {
  changed: boolean
  touched: boolean
  valid: boolean
  fields: {
    [key: string]: FieldData
  }
}

type FormFieldData = {
  meta: FieldsetMeta
  values: FieldsValues
}
