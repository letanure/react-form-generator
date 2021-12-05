import { ComponentStory, ComponentMeta } from '@storybook/react'

import FormAutomatic from '.'

export default {
  title: 'UI/Form/FormAutomatic',
  component: FormAutomatic
} as ComponentMeta<typeof FormAutomatic>

const Template: ComponentStory<typeof FormAutomatic> = (args) => (
  <FormAutomatic {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
  value: {
    name: 'some name',
    email: 'some@email.com',
    someData: 'some data'
  },
  onChange: (e: unknown) => console.log(e),
  onSubmit: (e: unknown) => console.log(e)
}
