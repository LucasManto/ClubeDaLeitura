import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const FeedContainer = styled.div`
  flex: 1;
  width: 100;

  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-bottom: 16px;
  }
`;

export const AbstractsContainer = styled.div`
  flex: 1;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Abstract = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 16px;
  background-color: var(--yellow);
  border-radius: 8px;

  display: flex;
  justify-content: space-between;

  & + & {
    margin-top: 8px;
  }
  
  button {
    background-color: var(--light-blue);
  }
`;

export const ParticipantsContainer = styled.div`
  max-width: 80%;
  overflow: hidden;

  display: flex;
  align-items: center;

  svg {
    margin: 4px;
  }
`;

export const ParticipantInfo = styled.div`
  padding: 8px;
  overflow: hidden;

  display: flex;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 8px;
  }

  span {
    font-size: 16px;
    font-weight: bold;
  }
`;
