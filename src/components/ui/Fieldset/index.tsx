import Field from 'components/ui/Field'
import React, { useEffect, useRef, useState } from 'react'

export type FieldsetProps = {
  fields: FormConfig['fields']
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any
  hasSubmit?: boolean
  submitText?: string
  onSubmit?: (values: FieldsValues | FieldsValues[], meta: FieldsetMeta) => void
  onChange?: (values: FieldsValues | FieldsValues[], meta: FieldsetMeta) => void
}
/**
 * Loops over an array of Field configs, and renders a Field component for each
 * Assembles a FieldsValues and FieldsetMeta object to pass to the onChange callback
 */
const Fieldset = ({
  fields = [],
  value = {},
  hasSubmit = false,
  submitText = 'Submit',
  onSubmit,
  onChange
}: FieldsetProps) => {
  const [fieldsValues, setFieldsValues] = useState<
    FieldsValues | FieldsValues[]
  >()
  const [fieldsetMeta, setFieldsetMeta] = useState<FieldsetMeta>()

  /**
   * Using prop onChange as subscription dont have side effects
   * but adding  the onchange to deps of useEffect will
   */
  const onChangeRef = useRef(
    (
      fieldsValues: FieldsValues | FieldsValues[],
      fieldsetMeta: FieldsetMeta
    ) => {
      onChange && onChange(fieldsValues, fieldsetMeta)
    }
  )

  useEffect(() => {
    fieldsValues &&
      fieldsetMeta &&
      onChangeRef.current(fieldsValues, fieldsetMeta)
  }, [fieldsValues, fieldsetMeta])

  const handleOnChange = (name: string, fieldData: FieldData) => {
    setFieldsValues((prevState) => ({
      ...prevState,
      [name]: fieldData.value
    }))
    setFieldsetMeta((prevState) => {
      const newValues = {
        ...prevState?.fields,
        [name]: fieldData
      }
      return {
        changed: Object.values(newValues).some((item) => item.changed),
        touched: Object.values(newValues).some((item) => item.touched),
        valid: !Object.values(newValues).some((item) => !item.valid),
        fields: newValues
      }
    })
  }

  const handleOnSubmit = () => {
    onSubmit &&
      fieldsValues &&
      fieldsetMeta &&
      fieldsetMeta.valid &&
      onSubmit(fieldsValues, fieldsetMeta)
  }

  return (
    <div className="fieldset">
      {!!fields &&
        fields.map((fieldProps, indexInput) => (
          <Field
            key={indexInput}
            {...fieldProps}
            value={value[fieldProps.name] || fieldProps.value}
            onChange={(fieldData) => handleOnChange(fieldProps.name, fieldData)}
          />
        ))}
      {hasSubmit && <button onClick={handleOnSubmit}>{submitText}</button>}
    </div>
  )
}

export default Fieldset
