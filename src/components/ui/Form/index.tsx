import Fieldset from 'components/ui/Fieldset'
import React, { useEffect, useRef, useState } from 'react'

export type FormProps = FormConfig & {
  value?: FieldsValues | FieldsValues[]
  onChange: (values: FieldsValues | FieldsValues[], meta: FieldsetMeta) => void
  onSubmit: (values: FieldsValues | FieldsValues[], meta: FieldsetMeta) => void
}

const Form = ({
  title,
  submitText = 'Submit',
  description,
  layout,
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
    <form onSubmit={handleSubmit} aria-label="form" className="form">
      {title && <h3>{title}</h3>}
      {description && <p>{description}</p>}
      {!!fields && (
        <Fieldset
          fields={fields}
          onChange={handleOnChange}
          value={value}
          layout={layout}
        />
      )}
      <button type="submit">{submitText}</button>
    </form>
  )
}

export default Form
