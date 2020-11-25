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

export const InteractionsContainer = styled.div`
  flex: 1;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Interaction = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 16px;
  background-color: var(--yellow);
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  & + & {
    margin-top: 8px;
  }
  
  button {
    background-color: var(--light-blue);
    min-width: 100px;
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

  svg {
    margin-right: 8px;
  }

  span {
    font-size: 16px;
    font-weight: bold;
  }
`;

export const InteractionModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #0005;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InteractionModal = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: var(--yellow);
  border-radius: 8px;
  padding: 24px;

  display: flex;
  flex-direction: column;

  #close-modal {
    background-color: #fff;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    margin-bottom: 8px;

    display: flex;
    justify-content: center;
    align-items: center;

    align-self: flex-end;
  }

  p {
    font-size: 24px;
  }

  #sending-image-loader {
    color: var(--blue);
    align-self: center;
  }
`;

export const Message = styled.div`
  width: 70%;
  min-height: 20%;
  background-color: var(--light-blue);
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 8px;
  line-height: 24px;
  font-size: 16px;

  position: relative;

  display: flex;
  flex-direction: column;

  &:nth-child(odd) {
    align-self: flex-end;
    background-color: var(--blue);
  }
`;

export const MessageHeader = styled.div`
  width: 100%;
  margin-bottom: 8px;
  
  display: flex;
  align-items: center;

  img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 8px;
  }

  svg {
    margin-right: 8px;
  }
`;

export const InputContainer = styled.div`
  margin: auto 0 0 0;
  height: 20%;

  display: flex;
  align-items: center;
  justify-content: space-around;

  textarea {
    flex: 1;
    resize: none;
    line-height: 24px;
    padding: 8px;
    border: 0;
    border-radius: 8px;
    overflow: scroll;
    margin-right: 16px;
  }

  button {
    color: var(--blue);
    background-color: transparent;
    width: unset;
    padding: 0;
  }

  label {
    width: 80%;
    border-radius: 8px;
    background-color: var(--light-blue);
    height: 32px;
    transition: filter 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
      filter: brightness(90%);
    }
  }

  #response-upload {
    display: none;
  }
`;

export const VideoContainer = styled.div`
  width: 100%;
  margin-bottom: 8px;

  video {
    max-width: 100%;
  }
`;
