import React, { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { differenceInYears, parseISO } from 'date-fns'

import firebase from '../../../services/Firebase'

import { Container, ParticipantCard, ParticipantCardHeader } from './styles'

export default function Participants({ clubId }) {
  const [participants, setParticipants] = useState([])

  useEffect(() => {
    async function loadParticipantsData() {
      const clubReference = firebase.firestore().doc(`clubs/${clubId}`)
      const usersCollectionRef = firebase.firestore().collection('users')

      const clubData = await clubReference.get()
      const participantsId = clubData.get('participants')

      const participantsDocs = participantsId.map(participant => {
        return usersCollectionRef.doc(participant).get()
      });

      const participantsData = await Promise.all(participantsDocs)
      const participantsIntroductions = await clubReference.collection('metadata').doc('introductions').get()

      setParticipants(participantsData.map((participantData, index) => ({
        id: participantData.id,
        ...participantData.data(),
        introduction: participantsIntroductions.get(participantData.id),
      })))
    }

    loadParticipantsData()
  }, [clubId])

  return (
    <Container>
      <h1>Membros</h1>

      <ul>
        {participants.map(participant => (
          <li key={participant.id}>
            <ParticipantCard>
              <ParticipantCardHeader>
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
              </ParticipantCardHeader>
              <span>
                {participant.introduction || 'Essa pessoa ainda não se apresentou...'}
              </span>
            </ParticipantCard>
          </li>
        ))}
      </ul>
    </Container>
  )
}
