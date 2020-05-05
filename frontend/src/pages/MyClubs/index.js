import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import { Container } from './styles'

export default function MyClubs({ userData }) {
  const match = useRouteMatch()

  return (
    <Container>
      <header>
        <h1>Meus clubes</h1>
      </header>

      <h2>Clubes que administro</h2>
      <div className="my-clubs-list">
        {userData.clubsIManage?.map(club => (
          <Link key={club.id} to={`${match.url}/${club.id}`}>
            <div className="my-club-card">
              <span className="info-title">Nome</span>
              <span className="info">{club.name}</span>
              <span className="info-title">Descrição</span>
              <span className="info">{club.description}</span>
            </div>
          </Link>
        ))}
      </div>

      <h2>Clubes que faço parte</h2>
      <div className="my-clubs-list">
        {userData.clubsIBelong?.map(club => (
          <Link key={club.id} to={`${match.url}/${club.id}`}>
            <div className="my-club-card">
              <span className="info-title">Nome</span>
              <span className="info">{club.name}</span>
              <span className="info-title">Descrição</span>
              <span className="info">{club.description}</span>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  )
}
