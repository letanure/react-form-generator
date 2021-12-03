import Fieldset from 'components/ui/Fieldset'
import React, { useEffect, useRef, useState } from 'react'
import { FormConfig, FieldsValues, FieldsetMeta } from 'types'
import * as S from './styles'

export type FormProps = FormConfig & {
  onChange: (values: FieldsValues, meta: FieldsetMeta) => void
  onSubmit: (values: FieldsValues, meta: FieldsetMeta) => void
}

const Form = ({
  title,
  submitText = 'Submit',
  description,
  fields = [],
  onChange,
  onSubmit
}: FormProps) => {
  const [formValues, setFormValues] = useState<FieldsValues>()
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
    (fieldsValues: FieldsValues, fieldsetMeta: FieldsetMeta) => {
      onChange(fieldsValues, fieldsetMeta)
    }
  )

  useEffect(() => {
    formValues && formMeta && onChangeRef.current(formValues, formMeta)
  }, [formValues, formMeta])

  const handleOnChange = (fieldsetValues: FieldsValues, meta: FieldsetMeta) => {
    setFormValues(fieldsetValues)
    setFormMeta(meta)
  }
  return (
    <S.Wrapper>
      <form onSubmit={handleSubmit}>
        {title && <S.Title>{title}</S.Title>}
        {description && <S.Description>{description}</S.Description>}
        {!!fields && <Fieldset fields={fields} onChange={handleOnChange} />}
        <S.Button type="submit">{submitText}</S.Button>
      </form>
    </S.Wrapper>
  )
}

export default Form
