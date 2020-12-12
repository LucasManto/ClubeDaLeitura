import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-bottom: 16px;
  }

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
    }
  }
`

export const ParticipantCard = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ParticipantCardHeader = styled.div`
  flex: 1;
  margin-bottom: 16px;

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
`;
