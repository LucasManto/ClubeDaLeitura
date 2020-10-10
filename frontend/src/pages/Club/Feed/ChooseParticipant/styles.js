import styled from 'styled-components';

export const AvailableParticipantsContainer = styled.div`
  width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
  font-size: initial;
  
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(auto-fit, minmax(300px, .5fr));
  justify-content: center;
  list-style: none;
`;

export const ParticipantCard = styled.div`
  min-width: 300px;
  margin: 0;
  padding: 8px;
  box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  background: var(--yellow);
  cursor: pointer;

  display: flex;
  flex-direction: column;

  &:hover, &.selected {
    box-shadow: 0 0 0 2px var(--blue);
  }
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
    /* object-fit: cover; */
    border-radius: 50%;
  }

  span {
    margin-left: 8px;
    font-weight: bold;
  }
`;
