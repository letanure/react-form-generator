import { ComponentStory, ComponentMeta } from '@storybook/react'

import Main from '.'

export default {
  title: 'Layout/Main',
  component: Main,
  // decorators: [withKnobs],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' }
  }
} as ComponentMeta<typeof Main>

const Template: ComponentStory<typeof Main> = (args) => <Main {...args} />

export const Basic = Template.bind({})
Basic.args = {
  // primary: true,
  title: 'Main title',
  description: 'description'
}
