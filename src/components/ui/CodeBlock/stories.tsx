import { ComponentStory, ComponentMeta } from '@storybook/react'

import CodeBlock from '.'

export default {
  title: 'UI/CodeBlock',
  component: CodeBlock,
  argTypes: {}
} as ComponentMeta<typeof CodeBlock>

const codeString = `
const formConfig: FormConfig = {
  title: 'My form',
  fields: [
    {
      label: 'Placeholder text',
      placeholder: 'Placeholder test',
      name: 'namePlaceholder',
      type: 'text',
      value: ''
    },
    {
      label: 'Color',
      name: 'nameColor',
      type: 'color',
      value: '#ff0000'
    }
  ]
}
`

const Template: ComponentStory<typeof CodeBlock> = (args) => (
  <CodeBlock {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
  codeString: codeString
}
