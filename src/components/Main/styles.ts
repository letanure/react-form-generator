import styled from 'styled-components'

export const Wrapper = styled.main`
  background-color: #ffffff;
  width: 96vw;
  max-width: 1200px;
  margin: 2vw auto;
  box-shadow: 0 1px 8px rgb(0 0 0 / 8%);
  height: 100%;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

export const FormArea = styled.div`
  width: 33.33%;
  padding-right: 30px;
`
export const CodeArea = styled.div`
  width: 66.66%;
  position: sticky;
  top: 30px;
  display: flex;
  & > div {
    width: 50%;
    padding: 15px;
    overflow: hidden;
    pre {
      overflow: hidden;
    }
  }
`

export const Description = styled.h2`
  font-size: 2rem;
  font-weight: 400;
`
