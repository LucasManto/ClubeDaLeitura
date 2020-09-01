import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  header {
    position: fixed;
    z-index: 100;
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

            &.active {
              box-shadow: 0px 3px 0px 0px rgba(255, 255, 255, 0.75);
            }
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
      position: relative;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      iframe {
        position: absolute;
      }
    }

    #banner {
      img {
        z-index: -10;
        opacity: 0.4;
      }
    }
  }
`
