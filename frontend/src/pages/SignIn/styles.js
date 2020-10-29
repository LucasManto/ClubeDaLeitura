import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  padding-bottom: 24px;
  background: var(--gray);

  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: var(--dark-gray);
  }

  header {
    width: 100%;
    height: 50px;
    padding: 4px 64px;
  }

  a {
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
    color: var(--blue);
    margin-bottom: 16px;
  }

  a:hover {
    text-decoration: underline;
  }
`

export const FormContainer = styled.div`
  width: 100%;
  max-width: 450px;
  max-height: 500px;
  background: var(--blue);
  border-radius: 8px;
  margin-top: 16px;
  margin-bottom: 16px;
  padding: 32px;
  flex: 1;

  display: flex;
  flex-direction: column;

  a {
    color: var(--yellow);
  }
`
