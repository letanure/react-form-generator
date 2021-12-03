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
