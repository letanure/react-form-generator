import { render, screen } from '@testing-library/react'

import CodeBlock from '.'

const codeString = `
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
const Component = () => {
  const codeString = '(num) => num + 1';
  return (
    <SyntaxHighlighter language="javascript" style={dark}>
      {codeString}
    </SyntaxHighlighter>
  );
};
`

describe('<CodeBlock />', () => {
  it.skip('should render something', () => {
    const { container } = render(<CodeBlock codeString={codeString} />)

    expect(
      screen.getByRole('heading', { name: /CodeBlock/i })
    ).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
