import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  padding-bottom: 24px;
  background: var(--gray);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin-bottom: 24px;
  }

  form {
    width: 70%;
    flex: unset;
    margin-bottom: 16px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    button {
      margin-top: 0;
      margin-left: 16px;
      max-width: 200px;
    }
  }

  p {
    font-size: 16px;
  }
`