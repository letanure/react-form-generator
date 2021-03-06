import React from 'react'
import { useEffect, useState } from 'react'

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
    layout = 'vertical',
    onChange
  } = props
  const fields = 'fields' in props && props.fields
  const options = 'options' in props && props.options
  const rows = 'rows' in props && props.rows
  const min = 'min' in props && props.min
  const max = 'max' in props && props.max
  const step = 'step' in props && props.step

  const [hasFocus, setFocus] = useState(false)
  const [hasHover, setHover] = useState(false)
  const [errorsMessages, setEerrorsMessages] = useState<string[]>([])
  const [fieldData, setFieldData] = useState<FieldData>({
    value: value,
    changed: false,
    touched: false,
    valid: true
  })

  useEffect(() => {
    validateAndSetData(validate, value, label)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validate, value, label])

  useEffect(() => {
    onChange(fieldData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldData])

  const validateAndSetData = (
    validate: FieldProps['validate'],
    newValue: FieldProps['value'],
    label: FieldProps['label'],
    touched = false
  ) => {
    const errors = runValidations(validate || [], newValue, label)
    setEerrorsMessages(errors)
    const newFiledData = {
      value: newValue,
      changed: newValue !== value,
      touched,
      valid: errors.length === 0
    }
    if (JSON.stringify(newFiledData) !== JSON.stringify(fieldData)) {
      setFieldData(newFiledData)
    }
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

  const TagWrapper = ['object', 'radioGroup'].includes(type)
    ? 'fieldset'
    : 'label'
  const TagLabel = ['object', 'radioGroup'].includes(type) ? 'legend' : 'div'
  return (
    <TagWrapper
      className={`field field-${type} layout-${layout}`}
      data-valid={fieldData.valid}
      data-touched={fieldData.touched}
      data-changed={fieldData.changed}
      data-focus={hasFocus}
      data-hover={hasHover}
    >
      {!!label && label !== '' && (
        <TagLabel className="field-label">{label}</TagLabel>
      )}
      <div className="field-control">
        {type === 'textarea' && (
          <textarea
            className={`field-input-${type}`}
            disabled={disabled}
            name={name}
            onChange={(e) => handleOnChange(e.target.value)}
            placeholder={placeholder}
            readOnly={readonly}
            rows={rows as number}
            value={fieldData.value as string}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          />
        )}

        {type === 'radioGroup' && (
          <div className={`field-wrapper`}>
            {options &&
              options.map((option: FieldOption, index) => (
                <label key={index} className="field-option">
                  <input
                    checked={fieldData.value === option.value}
                    disabled={disabled}
                    name={name}
                    onChange={(e) => handleOnChange(e.target.value)}
                    readOnly={readonly}
                    type="radio"
                    value={option.value as string}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                  />
                  <span className="field-option-label">{option.label}</span>
                </label>
              ))}
          </div>
        )}

        {type === 'select' && (
          <div className="field-wrapper">
            <select
              className={`field-input-${type}`}
              disabled={disabled}
              name={name}
              onChange={(e) => handleOnChange(e.target.value)}
              placeholder={placeholder}
              value={fieldData.value as string}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {placeholder && <option value="">{placeholder}</option>}
              {options &&
                options.map((option: FieldOption, index) => (
                  <option key={index} value={option.value as string}>
                    {option.label}
                  </option>
                ))}
            </select>
          </div>
        )}

        {![
          'range',
          'textarea',
          'select',
          'radioGroup',
          'object',
          'array'
        ].includes(type) && (
          <input
            className={`field-input-${type}`}
            disabled={disabled}
            name={name}
            onChange={(e) => handleOnChange(e.target.value)}
            placeholder={placeholder}
            readOnly={readonly}
            type={type}
            value={fieldData.value as string}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          />
        )}

        {type === 'range' && (
          <>
            <input
              className={`field-input-${type}`}
              disabled={disabled}
              name={name}
              onChange={(e) => handleOnChange(e.target.value)}
              readOnly={readonly}
              type={type}
              min={min as number}
              max={max as number}
              step={step as number}
              value={fieldData.value as string}
              list={`tickmarks-${name}`}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            />
            {options && (
              <datalist id={`tickmarks-${name}`}>
                {options.map((option: FieldOption, index) => (
                  <option
                    key={index}
                    value={option.value as string}
                    label={option.label}
                  />
                ))}
              </datalist>
            )}
          </>
        )}

        {type === 'object' && !!fields && (
          <Fieldset
            fields={fields}
            onChange={handleOnChangeObject}
            layout={layout}
          />
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
                      layout={layout}
                    />
                    <button
                      className="field-remove"
                      onClick={() => removeItemArray(index)}
                    >
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
              layout={layout}
            />
          </>
        )}
      </div>

      {!fieldData.valid && (
        <div className="field-errors">
          {errorsMessages
            .slice(0, maxErrors)
            .map((errorMessage: string, index) => (
              <div className="field-error" key={index}>
                {errorMessage}
              </div>
            ))}
        </div>
      )}
    </TagWrapper>
  )
}

export default Field
