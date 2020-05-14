import React, { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { differenceInYears, parseISO } from 'date-fns'

import firebase from '../../../services/Firebase'

import { Container } from './styles'

export default function Participants({ clubId }) {
  const [participants, setParticipants] = useState([])

  useEffect(() => {
    async function loadParticipants() {
      const querySnapshot = await firebase
        .firestore()
        .collection(`clubs/${clubId}/participants`)
        .get()
      const participantsDocs = querySnapshot.docs
      const participantsData = participantsDocs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))

      setParticipants(participantsData)
    }

    loadParticipants()
  }, [clubId])

  return (
    <Container>
      <h1>Membros</h1>

      <ul>
        {participants.map(participant => (
          <li key={participant.id}>
            <div>
              {participant.imgUrl ? (
                <img src={participant.imgUrl} alt={participant.name} />
              ) : (
                <FaUserCircle size={50} color={'#ffffff'} />
              )}
              <span>
                {`${participant.name}, ${differenceInYears(
                  Date.now(),
                  parseISO(participant.birthDate)
                )} anos`}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  )
}
