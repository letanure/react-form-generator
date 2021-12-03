import { ComponentStory, ComponentMeta } from '@storybook/react'

import RenderInputs from '.'

export default {
  title: 'UI/Form/Fieldset',
  component: RenderInputs
} as ComponentMeta<typeof RenderInputs>

const Template: ComponentStory<typeof RenderInputs> = (args) => (
  <RenderInputs {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
  onChange: (e: unknown) => console.log(e),
  fields: [
    {
      label: 'Label 1',
      type: 'text',
      name: 'name1',
      value: '111'
    },
    {
      label: 'Label 2',
      type: 'text',
      name: 'name2',
      value: '222'
    }
  ]
}
