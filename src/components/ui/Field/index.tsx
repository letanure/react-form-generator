import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import Validator, { ValidationSchema, ValidationError } from 'fastest-validator'
import * as S from './styles'
import { FieldConfig, FieldData, FieldOption } from 'types'

const validator = new Validator()

export type FieldProps = FieldConfig & {
  onChange: (data: FieldData) => void // something
}

const Field = ({
  name,
  label,
  placeholder,
  type = 'text',
  validate,
  value,
  rows,
  options,
  disabled = false,
  readonly = true,
  onChange
}: FieldProps) => {
  const [errorsMessages, setEerrorsMessages] = useState<string[]>([])
  const [fieldData, setFieldData] = useState<FieldData>({
    value: value,
    changed: false,
    touched: false,
    valid: true
  })

  /**
   * Using prop onChange as subscription dont have side effects
   * but adding  the onchange to deps of useEffect will
   */
  const onChangeRef = useRef((fieldData: FieldData) => {
    onChange(fieldData)
  })

  useEffect(() => {
    onChangeRef.current(fieldData)
  }, [fieldData])

  type RuleConfig = {
    [key: string]: string | number | boolean
  }

  const runValidation = (ruleConfig: RuleConfig, value: unknown): boolean => {
    const schema: ValidationSchema = {
      $$root: true,
      ...ruleConfig
    }
    const check = validator.compile(schema)
    // the lib can return ValidationError[] | true
    // need to check how to handle this
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = check(value)
    if (result !== true) {
      result.map((item: ValidationError) => {
        const errorMessage =
          item && item.message && item.message.replace("''", label)
        setEerrorsMessages([errorMessage as string])
      })
    }
    return result === true
  }

  const runValidations = (value: unknown) => {
    let hasFalseValue
    if (validate) {
      hasFalseValue = validate
        .map((ruleConfig: ValidationSchema) => runValidation(ruleConfig, value))
        .some((result: boolean) => result === false)
    }
    return !hasFalseValue
  }

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const isValid = runValidations(e.target.value)
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
        <div className="label">{label}</div>
        {type === 'textarea' && (
          <textarea
            className={fieldData.valid ? '' : 'hasError'}
            name={name}
            placeholder={placeholder}
            value={fieldData.value}
            onChange={handleOnChange}
            autoComplete="off"
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
            autoComplete="off"
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
            className={fieldData.valid ? '' : 'hasError'}
            name={name}
            placeholder={placeholder}
            type={type}
            value={fieldData.value}
            onChange={handleOnChange}
            autoComplete="off"
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
