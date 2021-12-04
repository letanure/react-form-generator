import * as S from './styles'
import Form from 'components/ui/Form'
import { useState } from 'react'
import CodeBlock from 'components/ui/CodeBlock'
import { FieldsetMeta, FieldsValues, FormConfig } from 'types'

import data from './formConfig.json'
const formConfig: FormConfig = data as FormConfig

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
