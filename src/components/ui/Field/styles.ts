import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${() => css`
    padding-bottom: 15px;
    &.field-hidden {
      display: none;
    }
    [disabled] {
      opacity: 0.5;
    }
    [readonly] {
      opacity: 0.8;
    }
    ol,
    li {
      padding: 0 0 0 15px;
    }
    fieldset {
      border: none;
    }
    .label {
      visibility: inherit;
      margin: 6px 0px;
      font-size: 12px;
      font-weight: 600;
      color: #0c072c;
      display: block;
    }
    .radioLabel {
      display: flex;
      padding: 12px;
      font-size: 14px;
      border-radius: 8px;
      input {
        display: inline-block;
        width: 20px;
        transform: translate(-3px, 2px);
        &:focus,
        &:focus-visible {
          outline: none;
        }
      }
    }
    select {
      font-family: inherit;
      color: #0c072c;
      background: #fff;
      width: 100%;
      padding: 12px;
      font-size: 14px;
      border: 1px solid #0c072c33;
      border-radius: 8px;
      display: block;
      background-image: linear-gradient(45deg, transparent 50%, gray 50%),
        linear-gradient(135deg, gray 50%, transparent 50%),
        linear-gradient(to right, #ccc, #ccc);
      background-position: calc(100% - 20px) calc(1em + 2px),
        calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
      background-size: 5px 5px, 5px 5px, 1px 1.5em;
      background-repeat: no-repeat;
      margin: 0;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-appearance: none;
      -moz-appearance: none;

      &:focus {
        background-image: linear-gradient(45deg, green 50%, transparent 50%),
          linear-gradient(135deg, transparent 50%, green 50%),
          linear-gradient(to right, #ccc, #ccc);
        background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
          calc(100% - 2.5em) 0.5em;
        background-size: 5px 5px, 5px 5px, 1px 1.5em;
        background-repeat: no-repeat;
        border-color: green;
        outline: 0;
      }
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
