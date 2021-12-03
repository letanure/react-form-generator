import * as S from './styles'

interface Props {
  /**
   * Main heading title
   */
  title?: string
  description?: string
}

const Main = ({ title = 'React Form Generator' }: Props) => (
  <S.Wrapper>
    <S.Logo src="/img/icon-512.png" alt="Atom image." />
    <S.Title>{title}</S.Title>
  </S.Wrapper>
)

export default Main
