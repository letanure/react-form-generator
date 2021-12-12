import Form from 'components/ui/Form'

export type FormAutomaticProps = {
  value: FieldsValues
  onChange: (values: FieldsValues | FieldsValues[], meta: FieldsetMeta) => void
  onSubmit: (values: FieldsValues | FieldsValues[], meta: FieldsetMeta) => void
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function camelCaseToSpace(str: string) {
  return capitalize(str.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase())
}

const FormAutomatic = ({ value, onChange, onSubmit }: FormAutomaticProps) => {
  const formFields: FormConfig['fields'] = Object.keys(value).map(
    (key: string) => ({
      label: camelCaseToSpace(key),
      name: key,
      value: value[key]
    })
  )

  return <Form fields={formFields} onChange={onChange} onSubmit={onSubmit} />
}

export default FormAutomatic
