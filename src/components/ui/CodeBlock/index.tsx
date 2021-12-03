import * as S from './styles'

export type CodeBlockProps = {
  codeString: unknown
}

const CodeBlock = ({ codeString = 'default' }: CodeBlockProps) => (
  <S.Wrapper>
    <code>
      <pre>{JSON.stringify(codeString, null, 2)}</pre>
    </code>
  </S.Wrapper>
)

export default CodeBlock
