import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  header {
    width: 100%;
    height: 50px;
    font-size: 16px;
    font-weight: bold;
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
    padding: 16px 32px;
  }
`

export const Banner = styled.div`
  height: 250px;
  width: 100%;

  img {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    position: relative;
    bottom: 32px;
    width: 100%;
    background: var(--yellow);
    opacity: 0.8;
    padding-left: 16px;
  }
`
