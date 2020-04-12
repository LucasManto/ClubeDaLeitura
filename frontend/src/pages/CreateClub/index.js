import React, { useState } from 'react'

import './styles.css'

export default function CreateClub() {
  const [club, setClub] = useState({
    name: 'Primeiro clube',
    description: 'Primeiro clube da leitura criado como teste',
    participants: [
      { name: 'Marlene', id: 'asd9898jd9e98e' },
      { name: 'Felipe', id: '8sn89w3jsijd8' },
      { name: 'Marina', id: 'asaui3iu328923892' },
    ],
    admins: [
      { name: 'Aline', id: 'as8923ie89' },
      { name: 'Giulia', id: '892hj9dwe98' },
    ],
  })
  const [availableParticipants, setAvailableParticipants] = useState([
    { name: 'Lucas', id: 'dsf98lkwmfe' },
    { name: 'Valdecir', id: 'lg834j3o3f4' },
    { name: 'Jose', id: '34843j9frjksd' },
  ])
  const [availableUsers, setAvailableUsers] = useState([
    { name: 'Valdecir', id: 'lg834j3o3f4' },
    { name: 'Jose', id: '34843j9frjksd' },
  ])

  function handleAddParticipant(participant) {
    setClub({
      ...club,
      participants: [...club.participants, participant],
    })
    setAvailableParticipants(
      availableParticipants.filter(
        availableParticipant => availableParticipant !== participant
      )
    )
  }

  function handleRemoveParticipant(availableParticipant) {
    setClub({
      ...club,
      participants: club.participants.filter(
        participant => participant !== availableParticipant
      ),
    })
    setAvailableParticipants([...availableParticipants, availableParticipant])
  }

  function handleAddAdmin(user) {
    setClub({
      ...club,
      admins: [...club.admins, user],
    })
    setAvailableUsers(
      availableUsers.filter(availableUser => availableUser !== user)
    )
  }

  function handleRemoveAdmin(availableUser) {
    setClub({
      ...club,
      admins: club.admins.filter(user => user !== availableUser),
    })
    setAvailableUsers([...availableUsers, availableUser])
  }

  return (
    <div className="create-club-container">
      <header>
        <h1>Criar clube</h1>
      </header>

      <form>
        <input type="text" placeholder="Nome do clube" />
        <input type="text" placeholder="Descrição" />

        <p className="form-title">Participantes</p>
        <input type="text" placeholder="Nome do participante" />

        <div className="participants-container">
          <div className="available-participants">
            <h2>Participantes disponíveis</h2>
            {availableParticipants.map(participant => (
              <span
                key={participant.id}
                onClick={() => handleAddParticipant(participant)}
                className="participant-name"
              >
                {participant.name}
              </span>
            ))}
          </div>
          <div className="current-participants">
            <h2>Participantes do clube</h2>
            {club.participants.map(participant => (
              <span
                key={participant.id}
                onClick={() => handleRemoveParticipant(participant)}
                className="participant-name"
              >
                {participant.name}
              </span>
            ))}
          </div>
        </div>

        <p className="form-title">Administradores</p>
        <input type="text" placeholder="Nome do usuário" />
        <div className="participants-container">
          <div className="available-participants">
            <h2>Usuários disponíveis</h2>
            {availableUsers.map(participant => (
              <span
                key={participant.id}
                onClick={() => handleAddAdmin(participant)}
                className="participant-name"
              >
                {participant.name}
              </span>
            ))}
          </div>
          <div className="current-participants">
            <h2>Administradores do clube</h2>
            {club.admins.map(participant => (
              <span
                key={participant.id}
                onClick={() => handleRemoveAdmin(participant)}
                className="participant-name"
              >
                {participant.name}
              </span>
            ))}
          </div>
        </div>

        <button className="button" type="submit">
          Criar
        </button>
      </form>
    </div>
  )
}
