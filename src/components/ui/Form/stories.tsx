import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form from '.'

export default {
  title: 'UI/Form/Form',
  component: Form
} as ComponentMeta<typeof Form>

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />

export const Basic = Template.bind({})
Basic.args = {
  title: 'Form Generated',
  description: 'Form Generated using config',
  onChange: (e: unknown) => console.log(e),
  onSubmit: (e: unknown) => console.log(e),
  fields: [
    {
      label: 'Name',
      type: 'text',
      name: 'name1',
      value: '111'
    },
    {
      label: 'Birthday',
      type: 'date',
      name: 'name2',
      value: '2002-01-02'
    },
    {
      label: 'Email',
      type: 'email',
      name: 'name3',
      value: 'aa@bb.com'
    }
  ]
}

export const withInitialValue = Template.bind({})
withInitialValue.args = {
  title: 'Form with initial value',
  description: 'Form Generated using config',
  onChange: (e: unknown) => console.log(e),
  onSubmit: (e: unknown) => console.log(e),
  value: {
    name1: 'Name changed',
    name2: '2001-02-03',
    name3: 'email@email.com',
    sub: {
      sub1: 'sub1-changed'
    }
  },
  fields: [
    {
      label: 'Name',
      type: 'text',
      name: 'name1',
      value: 'Name default'
    },
    {
      label: 'Birthday',
      type: 'date',
      name: 'name2',
      value: '2000-01-02'
    },
    {
      label: 'Email',
      type: 'email',
      name: 'name3',
      value: 'email@default.com'
    },
    {
      label: 'sub',
      type: 'object',
      name: 'sub',
      value: {
        sub1: 'sub1'
      },
      fields: [
        {
          label: 'sub1',
          type: 'text',
          name: 'sub1',
          value: 'sub1-default'
        }
      ]
    }
  ]
}
