type FieldTypes =
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
  | 'textarea'
  | 'select'
  | 'radioGroup'

type FieldOption = {
  value: FieldData['value']
  label: string
}

type FieldOptions = FieldOption[]

type RuleConfig = {
  [key: string]: string | number | boolean
}

type FieldConfig = {
  name: string
  value: FieldData['value']
  label?: string
  type?: FieldTypes
  placeholder?: string
  validate?: RuleConfig[]
  // textarea
  rows?: number
  options?: FieldOptions
  disabled?: boolean
  readonly?: boolean
}

type FormConfig = {
  fields: FieldConfig[]
  title?: string
  submitText?: string
  description?: string
}

type FieldData = {
  value: string | number | readonly string[] | undefined
  changed: boolean
  touched: boolean
  valid: boolean
}

type FieldsValues = {
  [key: string]: FieldData['value']
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
