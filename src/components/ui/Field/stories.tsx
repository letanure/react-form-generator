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
        'url'
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
    placeholder: {
      description: 'Field placeholder',
      type: { name: 'string', required: false }
    },
    onChange: {
      description: 'Emit the field state on every change'
    }
  }
} as ComponentMeta<typeof Field>

const Template: ComponentStory<typeof Field> = (args) => <Field {...args} />

console.log(process.env.NODE_ENV)

export const configurable = Template.bind({})
configurable.args = {
  onChange: (e: unknown) => console.log(e),
  label: 'Label',
  type: 'text',
  name: 'name',
  value: 'something',
  placeholder: 'Placeholder'
}
export const color = Template.bind({})
color.args = {
  onChange: (e: unknown) => console.log(e),
  label: 'Label',
  type: 'color',
  name: 'name',
  value: '#9b59b6'
}

export const datetimeLocal = Template.bind({})
datetimeLocal.args = {
  onChange: (e: unknown) => console.log(e),
  label: 'Label',
  type: 'datetime-local',
  name: 'name',
  value: '2020-01-01T12:00'
}

export const datetime = Template.bind({})
datetime.args = {
  onChange: (e: unknown) => console.log(e),
  label: 'Label',
  type: 'datetime',
  name: 'name',
  value: '2020-01-01'
}

export const email = Template.bind({})
email.args = {
  onChange: (e: unknown) => console.log(e),
  label: 'Label',
  type: 'email',
  name: 'name',
  value: 'aa@bb.com'
}

export const hidden = Template.bind({})
hidden.args = {
  onChange: (e: unknown) => console.log(e),
  label: '',
  type: 'hidden',
  name: 'name',
  value: 'hidden value'
}

export const month = Template.bind({})
month.args = {
  onChange: (e: unknown) => console.log(e),
  label: 'Month',
  type: 'month',
  name: 'name',
  value: '1981-01'
}

export const number = Template.bind({})
number.args = {
  onChange: (e: unknown) => console.log(e),
  label: 'Number',
  type: 'number',
  name: 'name',
  value: '123456'
}

export const password = Template.bind({})
password.args = {
  onChange: (e: unknown) => console.log(e),
  label: 'Password',
  type: 'password',
  name: 'name',
  value: '123456'
}

export const search = Template.bind({})
search.args = {
  onChange: (e: unknown) => console.log(e),
  label: 'Search',
  type: 'search',
  name: 'name',
  value: 'search value'
}

export const tel = Template.bind({})
tel.args = {
  onChange: (e: unknown) => console.log(e),
  label: 'Tel',
  type: 'tel',
  name: 'name',
  value: '111-111-1111'
}

export const text = Template.bind({})
text.args = {
  onChange: (e: unknown) => console.log(e),
  label: 'Label',
  type: 'text',
  name: 'name',
  value: 'Text'
}

export const time = Template.bind({})
time.args = {
  onChange: (e: unknown) => console.log(e),
  label: 'Time',
  type: 'time',
  name: 'name',
  value: '12:00'
}

export const url = Template.bind({})
url.args = {
  onChange: (e: unknown) => console.log(e),
  label: 'URL',
  type: 'url',
  name: 'name',
  value: 'https://www.google.com'
}
