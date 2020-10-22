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
`

export const ClubList = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 24px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  a {
    text-decoration: none;
  }
`

export const ClubCard = styled.div`
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
`;

export const ClubHeader = styled.div`
  flex: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ClubTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
  color: var(--yellow);
`;

export const AdminBadge = styled.div`
  background-color: var(--yellow);
  padding: 4px;
  font-weight: bold;
  border-radius: 4px;
  color: black;
`;

export const ClubDescription = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: var(--blue);
  margin-bottom: 4px;
`
