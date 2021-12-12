import { ComponentStory, ComponentMeta } from '@storybook/react'

import RenderInputs from '.'

export default {
  title: 'UI/Form/Fieldset',
  component: RenderInputs,
  argTypes: {
    onChange: {
      action: 'changed'
    },
    onSubmit: {
      action: 'submited'
    }
  }
} as ComponentMeta<typeof RenderInputs>

const Template: ComponentStory<typeof RenderInputs> = (args) => (
  <RenderInputs {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
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

export const withSubmit = Template.bind({})
withSubmit.args = {
  hasSubmit: true,
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
