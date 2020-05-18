import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import { Container, ClubsContainer } from './styles'

import bannerImg from '../../assets/default-club-banner.png'

export default function MyClubs({ userData }) {
  const match = useRouteMatch()

  return (
    <Container>
      <header>
        <h1>Meus clubes</h1>
      </header>

      <div>
        <ClubsContainer>
          <h2>Clubes que administro</h2>

          <div className="my-clubs-list">
            {userData.clubsIManage?.map(club => (
              <Link key={club.id} to={`${match.url}/${club.id}`}>
                <div className="my-club-card">
                  <img src={club.banner || bannerImg} alt="" />
                  <span className="info-title">{club.name}</span>
                  <span className="info">{club.description}</span>
                </div>
              </Link>
            ))}
          </div>
        </ClubsContainer>

        <ClubsContainer>
          <h2>Clubes que faço parte</h2>

          <div className="my-clubs-list">
            {userData.clubsIBelong?.map(club => (
              <Link key={club.id} to={`${match.url}/${club.id}`}>
                <div className="my-club-card">
                  <img src={club.banner || bannerImg} alt="" />
                  <span className="info-title">{club.name}</span>
                  <span className="info">{club.description}</span>
                </div>
              </Link>
            ))}
          </div>
        </ClubsContainer>
      </div>
    </Container>
  )
}
