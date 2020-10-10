import styled from 'styled-components';

export const Welcome = styled.div`
  flex: 1;
  font-size: 24px;
  text-align: justify;
  
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-bottom: 16px;
  }

  textarea {
    margin-top: 16px;
    min-width: 600px;
    min-height: 150px;
    padding: 8px;

    resize: none;
    overflow: scroll;
  }
`;
