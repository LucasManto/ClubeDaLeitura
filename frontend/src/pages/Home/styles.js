import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
  background-color: var(--gray);

  aside {
    width: 20%;
  }

  main {
    flex-grow: 1;
  }
`

export const Welcome = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 46px;
    margin-bottom: 16px;
  }

  h2 {
    font-size: 32px;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 24px;
    margin-bottom: 16px;
  }
`
