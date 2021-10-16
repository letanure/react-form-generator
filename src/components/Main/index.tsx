import * as S from './styles'

interface Props {
  /**
   * Main heading title
   */
  title?: string
  description?: string
}

const Main = ({
  title = 'React Next Boilerplate',
  description = 'TypeScript, ReactJS, NextJS e Styled Components'
}: Props) => (
  <S.Wrapper>
    <S.Logo src="/img/icon-512.png" alt="Atom image." />
    <S.Title>{title}</S.Title>
    <S.Description>{description}</S.Description>
    <S.Illustration
      src="/img/hero-illustration.svg"
      alt="Developer with screen."
    />
  </S.Wrapper>
)

export default Main
