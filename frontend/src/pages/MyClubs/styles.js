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

  h2 {
    font-size: 24px;
    font-weight: bold;
    color: var(--yellow);
    margin-top: 16px;
  }

  .my-clubs-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    margin-top: 16px;
  }

  .my-clubs-list a {
    text-decoration: none;
  }

  .my-clubs-list .my-club-card {
    width: 100%;
    min-width: 400px;
    background: var(--white);
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .my-clubs-list .my-club-card:hover {
    opacity: 0.9;
  }

  .my-clubs-list .my-club-card .info-title {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 8px;
    color: var(--yellow);
  }

  .my-clubs-list .my-club-card .info {
    font-size: 14px;
    font-weight: bold;
    color: var(--blue);
    margin-bottom: 4px;
  }
`
