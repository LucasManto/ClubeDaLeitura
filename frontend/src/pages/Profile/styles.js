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
  }

  .profile-image {
    width: 100%;
    max-width: 600px;
    margin: 16px 0;

    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  #profile-image-upload {
    display: none;
  }

  .profile-image img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
  }

  form input,
  form select {
    margin-bottom: 8px;
    min-width: 600px;
    max-width: 1000px;
  }

  .success-message {
    width: 600px;
    border-radius: 8px;
    background: var(--yellow);
    font-size: 24px;
    padding: 16px;
    margin-top: 16px;
    text-align: center;
  }
`
