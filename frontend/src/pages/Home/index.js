import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import firebase from '../../services/Firebase'

import Sidebar from '../../components/Sidebar'

import Profile from '../Profile'
import CreateClub from '../CreateClub'
import MyClubs from '../MyClubs'
import Club from '../Club'

import useAuth from '../../hooks/useAuth'

import { Container, Welcome } from './styles'

export default function Home() {
  const { user } = useAuth()
  const [userData, setUserData] = useState({})
  let match = useRouteMatch()

  useEffect(() => {
    async function getClubs() {
      const clubsIBelong = await firebase
        .firestore()
        .collection('clubs')
        .where('participants', 'array-contains', user.uid)
        .get()
      const clubsIManage = await firebase
        .firestore()
        .collection('clubs')
        .where('admins', 'array-contains', user.uid)
        .get()

      return {
        clubsIBelong: clubsIBelong.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })),
        clubsIManage: clubsIManage.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })),
      }
    }

    async function loadUserData() {
      if (user) {
        const response = await firebase
          .firestore()
          .doc(`/users/${user.uid}`)
          .get()
        const clubs = await getClubs()

        setUserData({
          ...response.data(),
          ...clubs,
        })
      }
    }

    loadUserData()
  }, [user])

  return (
    <Container>
      <Sidebar userData={userData} className="sidebar" />
      <main>
        <Switch>
          <Route path={`${match.path}/perfil`}>
            <Profile userData={userData} setUserData={setUserData} />
          </Route>
          <Route path={`${match.path}/criar-clube`}>
            <CreateClub userData={userData} setUserData={setUserData} />
          </Route>
          <Route path={`${match.path}/meus-clubes/:id`}>
            <Club userData={userData} />
          </Route>
          <Route path={`${match.path}/meus-clubes`}>
            <MyClubs userData={userData} />
          </Route>
          <Route path={`${match.path}`}>
            <Welcome>
              <h1>Olá, {userData.name}!</h1>
              <h2>Bem vindo(a) ao Clube da Leitura.</h2>
              <h3>Selecione um item do menu ao lado.</h3>
              <FaArrowLeft size={60} />
            </Welcome>
          </Route>
        </Switch>
      </main>
    </Container>
  )
}
