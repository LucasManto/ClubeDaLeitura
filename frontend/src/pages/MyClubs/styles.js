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

  header + div {
    width: 100%;
    max-width: 1000px;
    padding: 0 24px;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
`

export const ClubsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 24px;
    font-weight: bold;
    color: var(--yellow);
    margin-top: 16px;
  }

  .my-clubs-list {
    margin-top: 16px;
    width: 100%;

    display: flex;
    flex-direction: column;

    a {
      text-decoration: none;

      & + a {
        margin-top: 8px;
      }
    }

    .my-club-card {
      background: var(--white);
      border-radius: 4px;
      padding: 8px;
      cursor: pointer;

      display: flex;
      flex-direction: column;
      justify-content: center;

      &:hover {
        opacity: 0.9;
      }

      img {
        object-fit: cover;
        height: 100px;
        width: 100%;
        border-radius: 4px;
        margin-bottom: 4px;
      }

      .info-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 4px;
        color: var(--yellow);
      }

      .info {
        font-size: 16px;
        font-weight: bold;
        color: var(--blue);
        margin-bottom: 4px;
      }
    }
  }
`
