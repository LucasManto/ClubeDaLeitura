import styled from 'styled-components'

export const Container = styled.div`
  padding-top: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-bottom: 16px;
  }

  header {
    width: 100%;
    margin: 16px;
    height: 50px;
    background-color: var(--yellow);

    display: flex;
    justify-content: center;

    ul {
      list-style: none;
      width: 100%;
      max-width: 700px;

      display: flex;
      justify-content: space-around;

      li {
        height: 50px;
        padding: 8px;
        transition: filter 0.2s;

        display: flex;
        align-items: center;

        &:hover {
          background-color: var(--yellow);
          filter: brightness(90%);
        }

        & + li {
          margin-left: 16px;
        }
      }

      a {
        text-decoration: none;
        color: initial;
      }
    }
  }

  main {
    width: 100%;
  }
`
