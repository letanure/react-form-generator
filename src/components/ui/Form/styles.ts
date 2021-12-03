import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${() => css`
    padding: 15px;
  `}
`

export const Title = styled.h2`
  ${() => css`
    font-size: 4rem;
    margin-bottom: 15px;
  `}
`

export const Description = styled.div`
  ${() => css`
    font-size: 2rem;
    margin-bottom: 15px;
  `}
`

export const Button = styled.button`
  ${() => css`
    font-family: inherit;
    padding: 12px 24px;
    margin-left: auto;
    font-size: 16px;
    font-weight: 500;
    color: rgb(255, 255, 255);
    cursor: pointer;
    background-color: #b336a0;
    background-size: 50px 50px;
    border: none;
    border-radius: 8px;

    &:hover {
      background-color: #b336a0cc;
    }
  `}
`
