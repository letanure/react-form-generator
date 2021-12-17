import { ComponentStory, ComponentMeta } from '@storybook/react'

import Field from '.'

export default {
  title: 'UI/Form/Field',
  component: Field,
  argTypes: {
    label: {
      description: 'Label of input',
      type: { name: 'string', required: true }
    },
    type: {
      default: 'text',
      description: 'Type of input',
      type: { name: 'string', required: true },
      table: {
        defaultValue: { summary: 'text' }
      },
      options: [
        'color',
        'datetime-local',
        'datetime',
        'email',
        'hidden',
        'month',
        'number',
        'password',
        'search',
        'tel',
        'text',
        'time',
        'url',
        'textarea',
        'select',
        'radioGroup',
        'object',
        'array'
      ],
      control: {
        type: 'select'
      }
    },
    name: {
      description: 'Name of input / object property',
      type: { name: 'string', required: true }
    },
    value: {
      description: 'initial value',
      type: { name: 'string', required: false }
    },
    readonly: {
      description: 'readonly',
      type: { name: 'boolean', required: false },
      default: false,
      table: {
        defaultValue: { summary: 'text' }
      }
    },
    disabled: {
      description: 'Flag to disable input',
      type: { name: 'boolean', required: false },
      default: false,
      table: {
        defaultValue: { summary: 'text' }
      }
    },
    placeholder: {
      description: 'Field placeholder',
      type: { name: 'string', required: false }
    },
    onChange: {
      action: 'changed'
    }
  }
} as ComponentMeta<typeof Field>

const Template: ComponentStory<typeof Field> = (args) => <Field {...args} />

export const configurable = Template.bind({})
configurable.args = {
  label: 'Label',
  type: 'text',
  name: 'name',
  value: 'email@mail.com',
  placeholder: 'Placeholder',
  validate: [{ type: 'string', min: 3, max: 255 }, { type: 'email' }]
}
export const color = Template.bind({})
color.args = {
  label: 'Label',
  type: 'color',
  name: 'name',
  value: '#9b59b6'
}

export const datetimeLocal = Template.bind({})
datetimeLocal.args = {
  label: 'Label',
  type: 'datetime-local',
  name: 'name',
  value: '2020-01-01T12:00'
}

export const datetime = Template.bind({})
datetime.args = {
  label: 'Label',
  type: 'datetime',
  name: 'name',
  value: '2020-01-01'
}

export const email = Template.bind({})
email.args = {
  label: 'Label',
  type: 'email',
  name: 'name',
  value: 'aa@bb.com'
}

export const hidden = Template.bind({})
hidden.args = {
  label: '',
  type: 'hidden',
  name: 'name',
  value: 'hidden value'
}

export const month = Template.bind({})
month.args = {
  label: 'Month',
  type: 'month',
  name: 'name',
  value: '1981-01'
}

export const number = Template.bind({})
number.args = {
  label: 'Number',
  type: 'number',
  name: 'name',
  value: '123456'
}

export const password = Template.bind({})
password.args = {
  label: 'Password',
  type: 'password',
  name: 'name',
  value: '123456'
}

export const search = Template.bind({})
search.args = {
  label: 'Search',
  type: 'search',
  name: 'name',
  value: 'search value'
}

export const tel = Template.bind({})
tel.args = {
  label: 'Tel',
  type: 'tel',
  name: 'name',
  value: '111-111-1111'
}

export const text = Template.bind({})
text.args = {
  label: 'Label',
  type: 'text',
  name: 'name',
  value: 'Text'
}

export const time = Template.bind({})
time.args = {
  label: 'Time',
  type: 'time',
  name: 'name',
  value: '12:00'
}

export const url = Template.bind({})
url.args = {
  label: 'URL',
  type: 'url',
  name: 'name',
  value: 'https://www.google.com'
}

export const range = Template.bind({})
range.args = {
  label: 'Range',
  type: 'range',
  name: 'range',
  min: 20,
  max: 50,
  step: 5,
  options: [
    { value: '20', label: 'Option 1' },
    { value: '30', label: 'Option 2' },
    { value: '40', label: 'Option 3' }
  ]
}

export const textarea = Template.bind({})
textarea.args = {
  label: 'Textarea',
  type: 'textarea',
  name: 'name',
  rows: 5,
  value: `some text
  some more text
  some more text`
}

export const select = Template.bind({})
select.args = {
  label: 'Select',
  type: 'select',
  name: 'name',
  value: '2',
  options: [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ]
}

export const radioGroup = Template.bind({})
radioGroup.args = {
  label: 'Radio Group',
  type: 'radioGroup',
  name: 'radioGroup',
  value: '2',
  options: [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ]
}

export const object = Template.bind({})
object.args = {
  label: 'Object label',
  type: 'object',
  name: 'object-name',
  value: {},
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      value: ''
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      value: ''
    }
  ]
}

export const arrayEmptyValue = Template.bind({})
arrayEmptyValue.args = {
  label: 'Array label',
  type: 'array',
  name: 'array-name',
  value: [],
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      value: ''
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      value: ''
    }
  ]
}

export const arrayWithValue = Template.bind({})
arrayWithValue.args = {
  label: 'Array label',
  type: 'array',
  name: 'array-name',
  value: [{ name: 'aaa', email: 'bbb@ccc.com' }],
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      value: ''
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      value: ''
    }
  ]
}
