import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${() => css`
    padding-bottom: 15px;
    &.field-hidden {
      display: none;
    }
    .label {
      visibility: inherit;
      margin: 6px 0px;
      font-size: 12px;
      font-weight: 600;
      color: #0c072c;
      display: block;
    }
    textarea {
      font-family: inherit;
      color: #0c072c;
      background: #fff;
      width: 100%;
      padding: 8px;
      font-size: 14px;
      border: 1px solid #0c072c33;
      border-radius: 8px;
      min-height: 70px;
      display: block;

      &:focus,
      &:focus-visible {
        outline: 1px solid #b336a0;
        border-color: #b336a0;
      }

      &.hasError {
        border: 1px solid rgb(233, 75, 75);
      }
    }
    input {
      font-family: inherit;
      color: #0c072c;
      background: #fff;
      width: 100%;
      padding: 12px;
      font-size: 14px;
      border: 1px solid #0c072c33;
      border-radius: 8px;

      &:focus,
      &:focus-visible {
        outline: 1px solid #b336a0;
        border-color: #b336a0;
      }

      &.hasError {
        border: 1px solid rgb(233, 75, 75);
      }

      &[type='color'] {
        width: 50px;
        padding: 4px;
        height: 43px;
      }
    }
  `}
`

export const ErrorMessage = styled.div`
  padding-top: 4px;
  font-size: 14px;
  color: rgb(233, 75, 75);
`
