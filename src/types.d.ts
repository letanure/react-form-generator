import { ValidationSchema } from 'fastest-validator'

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

type FieldOption = {
  value: FieldData['value']
  label: string
}

type FieldOptions = FieldOption[]

type FieldConfig = {
  label: string
  name: string
  type?: FieldTypes
  value: FieldData['value']
  placeholder?: string
  validate?: ValidationSchema[]
  // textarea
  rows?: number
  options?: FieldOptions
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
