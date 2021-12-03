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

   ${() => css`
     html {
       font-size: 62.5%;
     }
     body {
       font-family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
       font-size: 1.6rem;
       background-color: #f5f5f5;
     }
   `}
`

export default GlobalStyles
