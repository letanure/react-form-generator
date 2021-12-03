import { createGlobalStyle, css } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    &::before,
    &::after {
      box-sizing: inherit;
    }
  }

   ${({ theme }) => css`
     html {
       font-size: 62.5%;
     }
     body {
       font-family: ${theme.font.family};
       font-size: ${theme.font.sizes.medium};
       background-color: ${theme.background.light};
     }
   `}
`

export default GlobalStyles
