import Field from 'components/ui/Field'
import { useEffect, useRef, useState } from 'react'
import { FormConfig, FieldsValues, FieldsetMeta, FieldData } from 'types'
import * as S from './styles'

export type FieldsetProps = {
  fields: FormConfig['fields']
  onChange: (values: FieldsValues, meta: FieldsetMeta) => void
}
/**
 * Loops over an array of Field configs, and renders a Field component for each
 * Assembles a FieldsValues and FieldsetMeta object to pass to the onChange callback
 */
const Fieldset = ({ fields = [], onChange }: FieldsetProps) => {
  const [fieldsValues, setFieldsValues] = useState<FieldsValues>()
  const [fieldsetMeta, setFieldsetMeta] = useState<FieldsetMeta>()

  /**
   * Using prop onChange as subscription dont have side effects
   * but adding  the onchange to deps of useEffect will
   */
  const onChangeRef = useRef(
    (fieldsValues: FieldsValues, fieldsetMeta: FieldsetMeta) => {
      onChange(fieldsValues, fieldsetMeta)
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
        valid: Object.values(newValues).some((item) => item.valid),
        fields: newValues
      }
    })
  }
  return (
    <S.Wrapper>
      {!!fields &&
        fields.map((fieldProps, indexInput) => (
          <Field
            key={indexInput}
            {...fieldProps}
            onChange={(fieldData) => handleOnChange(fieldProps.name, fieldData)}
          />
        ))}
    </S.Wrapper>
  )
}

export default Fieldset