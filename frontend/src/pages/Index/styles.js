import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  header {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 8px 16px;
    background-color: var(--blue);
    color: var(--white);

    display: flex;
    justify-content: space-between;
    align-items: center;

    nav {
      ul {
        list-style: none;

        display: flex;

        li {
          margin: 0 16px;
          cursor: pointer;
          font-weight: bold;
          font-size: 16px;
          transition: box-shadow 0.2s;

          &:hover {
            box-shadow: 0px 3px 0px 0px rgba(255, 255, 255, 0.75);
          }

          a {
            text-decoration: none;
            color: var(--white);
          }
        }
      }
    }

    div {
      a + a {
        margin-left: 16px;
      }
    }
  }

  main {
    section {
      height: 600px;
      padding: 8px 32px;
      color: var(--dark-gray);

      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 32px;

      h1 {
        grid-column: 1 / span 2;
        font-size: 40px;

        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    #banner {
      padding: 0;
      display: flex;

      img {
        position: absolute;
        opacity: 0.4;
        z-index: -1;
        width: 100%;
      }
    }

    #about {
      padding: 0;
      display: flex;

      img {
        width: 100%;
      }
    }

    #how-it-works {
      background: var(--yellow);
      color: initial;
    }

    #get-in-touch {
      background: var(--light-blue);
    }
  }
`
