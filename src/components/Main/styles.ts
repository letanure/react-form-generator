import styled from 'styled-components'

export const Wrapper = styled.main`
  background-color: #ffffff;
  max-width: 800px;
  margin: 15px auto;
  box-shadow: 0 1px 8px rgb(0 0 0 / 8%);
  height: 100%;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 70%;
`

export const FormArea = styled.div`
  min-width: 400px;
  padding-right: 30px;
`
export const CodeArea = styled.div`
  position: sticky;
  top: 30px;
  border: 2px solid red;
`

export const Description = styled.h2`
  font-size: 2rem;
  font-weight: 400;
`
