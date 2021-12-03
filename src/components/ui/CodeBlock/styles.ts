import styled, { css } from 'styled-components'

import { CodeBlockProps } from '.'

export const Wrapper = styled.div<CodeBlockProps>`
  ${() => css`
    font-size: 11px;
    border: 1px solid #999;
    padding: 10px;
    line-height: 1.2em;
  `}
`
