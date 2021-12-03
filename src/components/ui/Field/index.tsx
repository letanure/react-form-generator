import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import * as S from './styles'

export type FieldProps = FieldConfig & {
  onChange: (data: FieldData) => void // something
}

const Field = ({
  name,
  label,
  type = 'text',
  value,
  placeholder,
  onChange
}: FieldProps) => {
  const [fieldData, setFieldData] = useState<FieldData>({
    value: value,
    changed: false,
    touched: false,
    valid: false
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

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldData({
      value: e.target.value,
      changed: e.target.value !== value,
      touched: true,
      valid: false
    })
  }
  return (
    <S.Wrapper className={`field-${type}`}>
      <label>
        <div className="label">{label}</div>
        <input
          name={name}
          placeholder={placeholder}
          type={type}
          value={fieldData.value}
          onChange={handleOnChange}
        />
      </label>
    </S.Wrapper>
  )
}

export default Field
