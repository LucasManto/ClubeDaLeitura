import React from 'react'
// import React, { useState } from 'react'

import './styles.css'

export default function MyClubs() {
  // const [clubs, setClub] = useState([
  //   {
  //     name: 'Primeiro clube',
  //     description: 'Primeiro clube da leitura criado como teste',
  //   },
  //   {
  //     name: 'Primeiro clube',
  //     description: 'Primeiro clube da leitura criado como teste',
  //   },
  // ])

  return (
    <div className="my-clubs-container">
      <header>
        <h1>Meus clubes</h1>
      </header>

      <div className="my-clubs-list">
        <div className="my-club-card">
          <span className="info-title">Nome</span>
          <span className="info">Primeiro clube</span>
          <span className="info-title">Descrição</span>
          <span className="info">Primeiro clube criado para teste</span>
        </div>
        <div className="my-club-card">
          <span className="info-title">Nome</span>
          <span className="info">Primeiro clube</span>
          <span className="info-title">Descrição</span>
          <span className="info">Primeiro clube criado para teste</span>
        </div>
        <div className="my-club-card">
          <span className="info-title">Nome</span>
          <span className="info">Primeiro clube</span>
          <span className="info-title">Descrição</span>
          <span className="info">Primeiro clube criado para teste</span>
        </div>
        <div className="my-club-card">
          <span className="info-title">Nome</span>
          <span className="info">Primeiro clube</span>
          <span className="info-title">Descrição</span>
          <span className="info">Primeiro clube criado para teste</span>
        </div>
        <div className="my-club-card">
          <span className="info-title">Nome</span>
          <span className="info">Primeiro clube</span>
          <span className="info-title">Descrição</span>
          <span className="info">Primeiro clube criado para teste</span>
        </div>
      </div>
    </div>
  )
}
