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

  const handleOnChangeObject = (
    valuesub: FieldsValues | FieldsValues[],
    meta: FieldsetMeta
  ) => {
    setFieldData({
      value: valuesub,
      changed: meta.changed,
      touched: meta.touched,
      valid: meta.valid
    })
  }

  const handleOnSubmitArray = (
    newValue: FieldsValues | FieldsValues[],
    newMeta: FieldsetMeta
  ) => {
    const valueArray = fieldData?.value as FieldsValues[]
    setFieldData({
      value: valueArray.concat(newValue),
      changed: newMeta.changed,
      touched: newMeta.touched,
      valid: newMeta.valid
    })
  }

  const removeItemArray = (index: number) => {
    const valueArray = fieldData?.value as FieldsValues[]
    setFieldData({
      value: valueArray.filter((_, i) => i !== index),
      changed: true,
      touched: true,
      valid: fieldData.valid
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
            disabled={disabled}
            name={name}
            onChange={(e) => handleOnChange(e.target.value)}
            placeholder={placeholder}
            readOnly={readonly}
            rows={rows as number}
            value={fieldData.value as string}
          />
        )}

        {type === 'radioGroup' && (
          <div className={fieldData.valid ? '' : 'hasError'}>
            {options &&
              options.map((option: FieldOption, index) => (
                <label key={index} className="radioLabel">
                  <input
                    checked={fieldData.value === option.value}
                    disabled={disabled}
                    name={name}
                    onChange={(e) => handleOnChange(e.target.value)}
                    readOnly={readonly}
                    type="radio"
                    value={option.value as string}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
          </div>
        )}

        {type === 'select' && (
          <select
            className={fieldData.valid ? '' : 'hasError'}
            disabled={disabled}
            name={name}
            onChange={(e) => handleOnChange(e.target.value)}
            placeholder={placeholder}
            value={fieldData.value as string}
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

        {!['textarea', 'select', 'radioGroup', 'object', 'array'].includes(
          type
        ) && (
          <input
            className={fieldData.valid ? undefined : 'hasError'}
            disabled={disabled}
            name={name}
            onChange={(e) => handleOnChange(e.target.value)}
            placeholder={placeholder}
            readOnly={readonly}
            type={type}
            value={fieldData.value as string}
          />
        )}

        {type === 'object' && !!fields && (
          <Fieldset fields={fields} onChange={handleOnChangeObject} />
        )}

        {type === 'array' && !!fields && (
          <>
            {Array.isArray(fieldData.value) && (
              <ol>
                {fieldData.value.map((item: FieldsValues, index: number) => (
                  <li key={index}>
                    <Fieldset
                      value={item}
                      fields={fields}
                      hasSubmit={false}
                      submitText="Add"
                    />
                    <button onClick={() => removeItemArray(index)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ol>
            )}
            <Fieldset
              fields={fields}
              onSubmit={handleOnSubmitArray}
              hasSubmit={true}
              submitText="Add"
            />
          </>
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
