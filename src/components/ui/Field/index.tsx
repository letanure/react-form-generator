import React, { useRef } from 'react'
import { useEffect, useState } from 'react'

import * as S from './styles'
import { runValidations } from './validation'

export type FieldProps = FieldConfig & {
  onChange: (data: FieldData) => void // something
}

const Field = ({
  name,
  value,
  label = '',
  type = 'text',
  placeholder,
  readonly = false,
  disabled = false,
  options,
  rows,
  validate,
  onChange
}: FieldProps) => {
  const [errorsMessages, setEerrorsMessages] = useState<string[]>([])
  const [fieldData, setFieldData] = useState<FieldData>({
    value: value,
    changed: false,
    touched: false,
    valid: true
  })

  const onChangeRef = useRef((fieldData: FieldData) => {
    onChange(fieldData)
  })

  useEffect(() => {
    onChangeRef.current(fieldData)
  }, [fieldData])

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const [isValid, errors]: [boolean, string[]] = runValidations(
      validate || [],
      e.target.value,
      label
    )
    console.log('aaa', isValid, errors)
    setEerrorsMessages(errors)
    setFieldData({
      value: e.target.value,
      changed: e.target.value !== value,
      touched: true,
      valid: isValid
    })
  }
  return (
    <S.Wrapper className={`field-${type}`}>
      <label>
        {!!label && label !== '' && <div className="label">{label}</div>}

        {type === 'textarea' && (
          <textarea
            className={fieldData.valid ? '' : 'hasError'}
            name={name}
            placeholder={placeholder}
            value={fieldData.value}
            onChange={handleOnChange}
            rows={rows}
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
                    value={option.value}
                    name={name}
                    checked={fieldData.value === option.value}
                    onChange={handleOnChange}
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
            value={fieldData.value}
            onChange={handleOnChange}
            disabled={disabled}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options &&
              options.map((option: FieldOption, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        )}
        {!['textarea', 'select', 'radioGroup'].includes(type) && (
          <input
            className={fieldData.valid ? undefined : 'hasError'}
            name={name}
            placeholder={placeholder}
            type={type}
            value={fieldData.value}
            onChange={handleOnChange}
            disabled={disabled}
            readOnly={readonly}
          />
        )}
        {!fieldData.valid &&
          errorsMessages.map((errorMessage: string, index) => (
            <S.ErrorMessage key={index}>{errorMessage}</S.ErrorMessage>
          ))}
      </label>
    </S.Wrapper>
  )
}

export default Field
