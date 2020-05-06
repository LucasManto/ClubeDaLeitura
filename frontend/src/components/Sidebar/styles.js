import styled from 'styled-components'

export const Container = styled.aside`
  display: flex;
  flex-direction: column;
  background: var(--light-blue);
  box-shadow: 1px 0px 8px 0px rgba(0, 0, 0, 0.75);
  z-index: 100;
  min-width: 220px;

  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px 0;

    img,
    svg {
      border-radius: 50%;
      margin-bottom: 8px;
      width: 200px;
      height: 200px;
      object-fit: cover;
    }

    span {
      font-size: 24px;
      font-weight: bold;
      color: var(--gray);
    }
  }

  ul {
    list-style: none;
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;

    li {
      border-bottom: 2px solid var(--light-blue);
      padding: 8px;
      background: var(--blue);

      a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--gray);
        text-decoration: none;
        transition: opacity 0.4s;

        &:hover {
          opacity: 0.6;
        }
      }
    }
  }

  button.button {
    margin: 16px;
  }
`
