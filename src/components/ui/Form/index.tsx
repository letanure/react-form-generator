import Fieldset from 'components/ui/Fieldset'
import React, { useEffect, useRef, useState } from 'react'
import * as S from './styles'

export type FormProps = FormConfig & {
  value?: FieldsValues | FieldsValues[]
  onChange: (values: FieldsValues | FieldsValues[], meta: FieldsetMeta) => void
  onSubmit: (values: FieldsValues | FieldsValues[], meta: FieldsetMeta) => void
}

const Form = ({
  title,
  submitText = 'Submit',
  description,
  fields = [],
  value,
  onChange,
  onSubmit
}: FormProps) => {
  const [formValues, setFormValues] = useState<FieldsValues | FieldsValues[]>()
  const [formMeta, setFormMeta] = useState<FieldsetMeta>()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    formValues && formMeta && onSubmit(formValues, formMeta)
  }

  /**
   * Using prop onChange as subscription dont have side effects
   * but adding  the onchange to deps of useEffect will
   */
  const onChangeRef = useRef(
    (
      fieldsValues: FieldsValues | FieldsValues[],
      fieldsetMeta: FieldsetMeta
    ) => {
      onChange(fieldsValues, fieldsetMeta)
    }
  )

  useEffect(() => {
    formValues && formMeta && onChangeRef.current(formValues, formMeta)
  }, [formValues, formMeta])

  const handleOnChange = (
    fieldsetValues: FieldsValues | FieldsValues[],
    meta: FieldsetMeta
  ) => {
    setFormValues(fieldsetValues)
    setFormMeta(meta)
  }
  return (
    <S.Wrapper>
      <form onSubmit={handleSubmit} aria-label="form">
        {title && <S.Title>{title}</S.Title>}
        {description && <S.Description>{description}</S.Description>}
        {!!fields && (
          <Fieldset fields={fields} onChange={handleOnChange} value={value} />
        )}
        <S.Button type="submit">{submitText}</S.Button>
      </form>
    </S.Wrapper>
  )
}

export default Form
