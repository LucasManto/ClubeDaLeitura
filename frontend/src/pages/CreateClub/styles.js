import styled from 'styled-components'

export const Container = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  header h1 {
    font-size: 32px;
    font-weight: bold;
    color: var(--blue);
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 900px;

    .club-image {
      margin: 16px 0;
      width: 100%;

      display: flex;
      flex-direction: column;
      align-items: center;
      /* justify-content: space-around; */
    }

    #club-image-upload {
      display: none;
    }

    .club-image img {
      width: 100%;
      height: 250px;
      border-radius: 8px;
      object-fit: cover;
      margin-bottom: 8px;
    }

    input {
      margin-top: 8px;
      min-width: 800px;
      max-width: 1200px;
    }

    .form-title {
      font-size: 24px;
      font-weight: bold;
      color: var(--yellow);
      margin-top: 16px;
    }

    .participants-container {
      width: 100%;
      color: var(--blue);

      display: flex;
      justify-content: space-around;
    }

    .available-participants,
    .current-participants {
      width: 100%;
      min-height: 50px;
      margin-top: 8px;
      border-radius: 8px;
      padding: 5px;

      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h2 {
      font-size: 20px;
      margin-bottom: 8px;
    }

    .participants-container span {
      font-size: 18px;
      cursor: pointer;
    }

    .participants-container span:hover {
      opacity: 0.8;
    }

    button {
      margin-bottom: 16px;
    }
  }
`
