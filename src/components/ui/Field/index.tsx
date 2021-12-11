import React, { useRef } from 'react'
import { useEffect, useState } from 'react'

import * as S from './styles'
import Fieldset from 'components/ui/Fieldset'
import { runValidations } from './validation'

export type FieldProps = FieldConfig & {
  maxErrors?: number
  onChange: (data: FieldData) => void
}

const Field = (props: FieldProps): JSX.Element => {
  const {
    disabled = false,
    label = '',
    maxErrors = 1,
    name,
    placeholder,
    readonly = false,
    type = 'text',
    validate,
    value,
    onChange
  } = props
  const fields = 'fields' in props && props.fields
  const options = 'options' in props && props.options
  const rows = 'rows' in props && props.rows

  const [errorsMessages, setEerrorsMessages] = useState<string[]>([])
  const [fieldData, setFieldData] = useState<FieldData>({
    value: value,
    changed: false,
    touched: false,
    valid: false
  })

  const onChangeRef = useRef((fieldData: FieldData) => {
    onChange(fieldData)
  })

  useEffect(() => {
    validateAndSetData(validate, value, label)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validate, value, label])

  useEffect(() => {
    onChangeRef.current(fieldData)
  }, [fieldData])

  const validateAndSetData = (
    validate: FieldProps['validate'],
    newValue: FieldProps['value'],
    label: FieldProps['label'],
    touched = false
  ) => {
    const errors = runValidations(validate || [], newValue, label)
    setEerrorsMessages(errors)
    setFieldData({
      value: newValue,
      changed: newValue !== value,
      touched,
      valid: errors.length === 0
    })
  }

  const handleOnChange = (newValue: string) => {
    validateAndSetData(validate, newValue, label, true)
  }

  const handleOnChangeObject = (valuesub: FieldsValues, meta: FieldsetMeta) => {
    setFieldData({
      value: valuesub,
      changed: meta.changed,
      touched: meta.touched,
      valid: meta.valid
    })
  }

  const TagWrapper = type === 'object' ? 'fieldset' : 'label'
  const TagLabel = type === 'object' ? 'legend' : 'div'
  return (
    <S.Wrapper className={`field-${type}`}>
      <TagWrapper>
        {!!label && label !== '' && (
          <TagLabel className="label">{label}</TagLabel>
        )}

        {type === 'textarea' && (
          <textarea
            className={fieldData.valid ? '' : 'hasError'}
            name={name}
            placeholder={placeholder}
            value={fieldData.value as string}
            onChange={(e) => handleOnChange(e.target.value)}
            rows={rows as number}
            disabled={disabled}
            readOnly={readonly}
          />
        )}
        {type === 'radioGroup' && (
          <div className={fieldData.valid ? '' : 'hasError'}>
            {options &&
              options.map((option: FieldOption, index) => (
                <label key={index} className="radioLabel">
                  <input
                    type="radio"
                    value={option.value as string}
                    name={name}
                    checked={fieldData.value === option.value}
                    onChange={(e) => handleOnChange(e.target.value)}
                    disabled={disabled}
                    readOnly={readonly}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
          </div>
        )}
        {type === 'select' && (
          <select
            className={fieldData.valid ? '' : 'hasError'}
            name={name}
            placeholder={placeholder}
            value={fieldData.value as string}
            onChange={(e) => handleOnChange(e.target.value)}
            disabled={disabled}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options &&
              options.map((option: FieldOption, index) => (
                <option key={index} value={option.value as string}>
                  {option.label}
                </option>
              ))}
          </select>
        )}
        {!['textarea', 'select', 'radioGroup', 'object'].includes(type) && (
          <input
            className={fieldData.valid ? undefined : 'hasError'}
            name={name}
            placeholder={placeholder}
            type={type}
            value={fieldData.value as string}
            onChange={(e) => handleOnChange(e.target.value)}
            disabled={disabled}
            readOnly={readonly}
          />
        )}
        {type === 'object' && !!fields && (
          <Fieldset fields={fields} onChange={handleOnChangeObject} />
        )}
        {!fieldData.valid &&
          errorsMessages
            .slice(0, maxErrors)
            .map((errorMessage: string, index) => (
              <S.ErrorMessage key={index}>{errorMessage}</S.ErrorMessage>
            ))}
      </TagWrapper>
    </S.Wrapper>
  )
}

export default Field
