import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form from '.'

export default {
  title: 'UI/Form/Form',
  component: Form,
  argTypes: {
    onChange: {
      action: 'changed'
    },
    onSubmit: {
      action: 'submited'
    },
    layout: {
      default: 'vertical',
      description: 'Layout of input',
      type: { name: 'string', false: true },
      table: {
        defaultValue: { summary: 'vertical' }
      },
      options: ['horizontal', 'vertical'],
      control: {
        type: 'select'
      }
    }
  }
} as ComponentMeta<typeof Form>

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />

export const Basic = Template.bind({})
Basic.args = {
  title: 'Form Generated',
  description: 'Form Generated using config',
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
