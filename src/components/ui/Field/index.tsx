import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import Validator, { ValidationSchema, ValidationError } from 'fastest-validator'
import * as S from './styles'
import { FieldConfig, FieldData } from 'types'

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
    const hasFalseValue =
      validate &&
      validate
        .map((ruleConfig: ValidationSchema) => runValidation(ruleConfig, value))
        .some((result: boolean) => result === false)
    return !hasFalseValue
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = validate ? runValidations(e.target.value) : true
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
        <input
          className={fieldData.valid ? '' : 'hasError'}
          name={name}
          placeholder={placeholder}
          type={type}
          value={fieldData.value}
          onChange={handleOnChange}
          autoComplete="off"
        />
        {!fieldData.valid &&
          errorsMessages.map((errorMessage: string, index) => (
            <S.ErrorMessage key={index}>{errorMessage}</S.ErrorMessage>
          ))}
      </label>
    </S.Wrapper>
  )
}

export default Field
