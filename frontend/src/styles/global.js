import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  :root {
    --yellow: #f3d250;
    --light-blue: #90ccf4;
    --blue: #5da2d5;
    --gray: #ececec;
    --dark-gray: #666666;
    --white: #ffffff;
    --red: #d40000;
    --font-family: Lato, sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font: 400 14px var(--font-family), sans-serif;
    background: var(--gray);
    -webkit-font-smoothing: antialiased;
  }

  input,
  button,
  textarea,
  select {
    font: 400 14px var(--font-family), sans-serif;
  }

  form input,
  form select {
    width: 100%;
    height: 60px;
    color: #333;
    border: 1px solid #dcdce6;
    border-radius: 8px;
    padding: 0 24px;
    font-size: 0.9rem;
    background: var(--white);
  }

  button,
  .button {
    padding: 12px;
    border-radius: 8px;
    text-decoration: none;
    cursor: pointer;
    font-weight: bold;
    transition: filter 0.2s;
    border: 0;
    color: initial;
    background: var(--yellow);
  }

  button:hover,
  .button:hover {
    filter: brightness(90%);
  }

  button:disabled,
  .button:disabled {
    filter: brightness(90%);
    cursor: not-allowed;
  }

  .outline {
    padding: 10px;
    border: 2px solid var(--yellow);
    color: var(--yellow);
    background: transparent;
    transition: background-color 0.5s;
  }

  .outline:hover {
    background: var(--yellow);
    color: initial;
    filter: none;
  }

  .error-message {
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    background: var(--red);
    color: var(--white);
    padding: 8px;
    margin-bottom: 8px;
    border-radius: 4px;
  }

  form {
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .error {
      border-color: var(--red);

      &::placeholder {
        color: var(--red);
      }
    }

    .input-group {
      width: 100%;

      input {
        margin-bottom: 16px;
      }
    }

    button {
      width: 100%;
      height: 60px;
      margin-top: 16px;
    }
  }
`
