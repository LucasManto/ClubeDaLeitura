import React, { useEffect, useState } from 'react'
import './styles.css'
import { FaArrowLeft } from 'react-icons/fa'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import firebase from '../../services/Firebase'

import Sidebar from '../../components/Sidebar'

import Profile from '../Profile'
import CreateClub from '../CreateClub'
import MyClubs from '../MyClubs'

import useAuth from '../../hooks/useAuth'

export default function Home() {
  const { user } = useAuth()
  const [userData, setUserData] = useState({})
  let match = useRouteMatch()

  useEffect(() => {
    async function loadUserData() {
      if (user) {
        const response = await firebase
          .firestore()
          .doc(`/users/${user.uid}`)
          .get()
        setUserData(response.data())
      }
    }

    loadUserData()
  }, [user])

  return (
    <div className="home">
      <Sidebar userData={userData} className="sidebar" />
      <main className="content">
        <Switch>
          <Route path={`${match.path}/perfil`}>
            <Profile userData={userData} setUserData={setUserData} />
          </Route>
          <Route path={`${match.path}/criar-clube`}>
            <CreateClub />
          </Route>
          <Route path={`${match.path}/meus-clubes`}>
            <MyClubs />
          </Route>
          <Route path={`${match.path}`}>
            <div className="welcome-container">
              <h1>Olá, {userData.name}!</h1>
              <h2>Bem vindo(a) ao Clube da Leitura.</h2>
              <h3>Selecione um item do menu ao lado.</h3>
              <FaArrowLeft size={60} />
            </div>
          </Route>
        </Switch>
      </main>
    </div>
  )
}
