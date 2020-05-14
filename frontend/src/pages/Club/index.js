import React, { useState, useEffect } from 'react'
import { useParams, Route, Switch, useRouteMatch, Link } from 'react-router-dom'

import Participants from './Participants'

import { Container, Banner } from './styles'

export default function Club({ userData }) {
  const { id } = useParams()
  const [clubData, setClubData] = useState({})

  const match = useRouteMatch()

  useEffect(() => {
    if (userData) {
      const club = userData.clubsIBelong?.find(club => club.id === id)
        ? userData.clubsIBelong?.filter(club => club.id === id)
        : userData.clubsIManage?.filter(club => club.id === id)

      if (club) setClubData(club[0])
    }
  }, [userData, id])

  return (
    <Container>
      <Banner>
        <img src={clubData.banner} alt="banner" />
        <h1>{clubData.name}</h1>
      </Banner>

      <header>
        <ul>
          <Link to={`${match.url}`}>
            <li>Compartilhamentos</li>
          </Link>
          <Link to={`${match.url}/sobre`}>
            <li>Sobre o clube</li>
          </Link>
          <Link to={`${match.url}/membros`}>
            <li>Membros</li>
          </Link>
          <Link to={`${match.url}/trocas`}>
            <li>Visualizar trocas</li>
          </Link>
        </ul>
      </header>

      <main>
        <Switch>
          <Route exact path={`${match.path}/`}>
            <h1>Compartilhamentos</h1>
          </Route>
          <Route path={`${match.path}/sobre`}>
            <h1>Sobre</h1>
          </Route>
          <Route path={`${match.path}/membros`}>
            <Participants clubId={id} />
          </Route>
          <Route path={`${match.path}/trocas`}>
            <h1>Trocas</h1>
          </Route>
        </Switch>
      </main>
    </Container>
  )
}
