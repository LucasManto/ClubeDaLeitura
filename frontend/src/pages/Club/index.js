import React, { useState, useEffect } from 'react'
import { useParams, Route, Switch, useRouteMatch, Link } from 'react-router-dom'

import Participants from './Participants'
import Feed from './Feed'

import { Container, Banner } from './styles'

import bannerImg from '../../assets/default-club-banner.png'

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
        <img src={clubData.banner || bannerImg} alt="banner" />
        <h1>{clubData.name}</h1>
      </Banner>

      <header>
        <ul>
          <Link to={`${match.url}`}>
            <li>Compartilhamentos</li>
          </Link>
          <Link to={`${match.url}/membros`}>
            <li>Membros</li>
          </Link>
        </ul>
      </header>

      <main>
        <Switch>
          <Route exact path={`${match.path}/`}>
            <Feed clubId={id} />
          </Route>
          <Route path={`${match.path}/membros`}>
            <Participants clubId={id} />
          </Route>
        </Switch>
      </main>
    </Container>
  )
}
