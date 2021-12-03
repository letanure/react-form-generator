import * as S from './styles'
import Form from 'components/ui/Form'
import { useState } from 'react'
import CodeBlock from 'components/ui/CodeBlock'

const formConfig: FormConfig = {
  title: 'My form',
  fields: [
    {
      label: 'Placeholder text',
      placeholder: 'Placeholder test',
      name: 'placeholder',
      type: 'text',
      value: ''
    },
    {
      label: 'Color',
      name: 'color',
      type: 'color',
      value: '#ff0000'
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      value: 'aa@bb.cc',
      validate: [{ type: 'string', min: 3, max: 255 }, { type: 'email' }]
    },
    {
      label: 'Number',
      name: 'number',
      type: 'number',
      value: '1'
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      value: '123456'
    },
    {
      label: 'tel',
      name: 'tel',
      type: 'tel',
      value: '111222333'
    },
    {
      label: 'Text',
      name: 'text',
      type: 'text',
      value: 'my text'
    },
    {
      label: 'Time',
      name: 'time',
      type: 'time',
      value: '12:00'
    },
    {
      label: 'URL',
      name: 'url',
      type: 'url',
      value: 'https://www.google.com'
    },
    {
      label: 'Datetime',
      name: 'datetime',
      type: 'datetime-local',
      value: '2020-01-01T12:00'
    },
    {
      label: 'Hidden',
      name: 'hidden',
      type: 'hidden',
      value: '9'
    },
    {
      label: 'Month',
      name: 'month',
      type: 'month',
      value: '2020-01'
    },
    {
      label: 'Search',
      name: 'search',
      type: 'search',
      value: 'my search'
    }
  ]
}

const Main = () => {
  const [formData, setFormData] = useState<FieldsValues>()
  const [formMeta, setFormMeta] = useState<FieldsetMeta>()

  const handleOnChange = (formValues: FieldsValues, formMeta: FieldsetMeta) => {
    setFormData(formValues)
    setFormMeta(formMeta)
  }

  const handleSubmit = (formValues: FieldsValues, formMeta: FieldsetMeta) => {
    console.log('handleSubmit', formValues, formMeta)
  }
  return (
    <S.Wrapper>
      {!!formConfig.fields && (
        <>
          <S.FormArea>
            <Form
              {...formConfig}
              onChange={handleOnChange}
              onSubmit={handleSubmit}
            />
          </S.FormArea>

          <S.CodeArea>
            <h3>Data</h3>
            <CodeBlock codeString={formData} />
            <h3>Meta</h3>
            <CodeBlock codeString={formMeta} />
          </S.CodeArea>
        </>
      )}
    </S.Wrapper>
  )
}

export default Main
