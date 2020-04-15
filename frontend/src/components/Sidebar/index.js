import React from 'react'
import './styles.css'
import { FaUserCircle, FaUser, FaPlus, FaBook } from 'react-icons/fa'
import { Link, useRouteMatch } from 'react-router-dom'

import firebase from '../../services/Firebase'

export default function Sidebar({ userData }) {
  let match = useRouteMatch()

  function handleLogout() {
    firebase.auth().signOut()
  }

  return (
    <aside className="sidebar-container">
      <header>
        {userData.imgUrl ? (
          <img src={userData.imgUrl} alt={userData.name} />
        ) : (
            <FaUserCircle size={200} color="var(--white)" />
          )}
        <span>{userData.name}</span>
      </header>

      <ul>
        <li>
          <Link to={`${match.url}/perfil`}>
            Perfil
            <FaUser size={24} color="var(--gray)" />
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/criar-clube`}>
            Criar clube
            <FaPlus size={24} color="var(--gray)" />
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/meus-clubes`}>
            Meus clubes
            <FaBook size={24} color="var(--gray)" />
          </Link>
        </li>
      </ul>

      <button onClick={handleLogout} className="button">
        Sair
      </button>
    </aside>
  )
}
