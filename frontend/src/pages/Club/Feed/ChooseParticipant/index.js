import React, { useState, useEffect, useCallback } from 'react';
import { parseISO, differenceInYears } from 'date-fns';
import { FaUserCircle } from 'react-icons/fa';

import useAuth from '../../../../hooks/useAuth';

import firebase from '../../../../services/Firebase';

import {
  AvailableParticipantsContainer,
  ParticipantCard,
  ParticipantCardHeader
} from './styles';

function ChooseParticipant({
  clubId,
  isParticipant,
  isFirstTime,
  isBeforeIntroductionDate,
  hasChosenParticipant,
  setHasChosenParticipant
}) {
  const [availableParticipants, setAvailableParticipants] = useState([]);
  const [selectedParticipantID, setSelectedParticipantID] = useState('');

  const { user } = useAuth();
  
  const handleSelectParticipant = useCallback((participantID) => {
    setSelectedParticipantID(participantID);
  }, []);

  const handleChooseParticipant = useCallback(async () => {
    await firebase.firestore().doc(`clubs/${clubId}/metadata/choices`).update({
      [user?.uid]: selectedParticipantID,
    });
    setHasChosenParticipant(true);
  }, [clubId, selectedParticipantID, user, setHasChosenParticipant]);

  useEffect(() => {
    async function getAvailableParticipants() {
      const clubDocReference = firebase.firestore().doc(`clubs/${clubId}`);
      const clubDoc = await clubDocReference.get()
      const participants = clubDoc.get('participants')

      const choicesDoc = await firebase.firestore().doc(`clubs/${clubId}/metadata/choices`).get();
      const choices = choicesDoc.data();

      const chosenParticipants = Object.values(choices);

      const filteredAvailableParticipants = participants.filter(participant => {
        const isCurrentParticipant = participant === user?.uid;
        const isAlreadyChosen = chosenParticipants.includes(participant);
        const choseCurrentParticipant = choices[participant] === user?.uid;

        if (isCurrentParticipant || isAlreadyChosen || choseCurrentParticipant) {
          return false;
        } else {
          return true;
        }
      });

      const participantsDocs = filteredAvailableParticipants.map(availableParticipant => {
        return firebase.firestore().collection('users').doc(availableParticipant).get()
      });

      const availableParticipantsData = await Promise.all(participantsDocs)
      const participantsIntroductions = await clubDocReference.collection('metadata').doc('introductions').get()

      setSelectedParticipantID(availableParticipantsData[0]?.id);
      setAvailableParticipants(availableParticipantsData.map(participantData => ({
        id: participantData.id,
        ...participantData.data(),
        headerInformation: `${participantData.get('name')}, ${differenceInYears(Date.now(), parseISO(participantData.get('birthDate')))} anos`,
        introduction: participantsIntroductions.get(participantData.id)
      })));
    }

    if (!isFirstTime && !hasChosenParticipant) {
      getAvailableParticipants();
    }
  }, [clubId, user, isFirstTime, hasChosenParticipant]);

  if (!isParticipant || (isFirstTime && isBeforeIntroductionDate) || hasChosenParticipant) {
    return null
  }

  return (
    <>
      <h1>Agora escolha uma pessoa para receber seu resumo</h1>
      <AvailableParticipantsContainer>
        {availableParticipants.map(participant => (
          <ParticipantCard
            key={participant.id}
            className={participant.id === selectedParticipantID ? 'selected' : ''}
            onClick={() => handleSelectParticipant(participant.id)}
          >
            <ParticipantCardHeader>
              {participant.imgUrl ? (
                <img src={participant.imgUrl} alt={participant.name} />
              ) : (
                  <FaUserCircle size={50} color={'#ffffff'} />
                )}
              <span>
                {participant.headerInformation}
              </span>
            </ParticipantCardHeader>
            <span>
              {participant.introduction || 'Essa pessoa ainda não se apresentou...'}
            </span>
          </ParticipantCard>
        ))}
      </AvailableParticipantsContainer>

      <button onClick={handleChooseParticipant}>Continuar</button>
    </>
  );
}

export default ChooseParticipant;