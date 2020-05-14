import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100;
  padding: 0 16px;

  display: flex;
  flex-direction: column;
  align-items: center;

  ul {
    width: 100%;

    display: grid;
    grid-gap: 8px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    list-style: none;

    li {
      min-width: 300px;
      min-height: 150px;
      margin: 0;
      padding: 8px;
      box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.25);
      border-radius: 4px;
      background: var(--yellow);

      div {
        display: flex;
        align-items: center;

        img,
        svg {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 50%;
        }

        span {
          margin-left: 8px;
          font-weight: bold;
        }
      }
    }
  }
`
