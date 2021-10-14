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
  isBeforeIntroductionLimit,
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

      const groups = [];
      Object.keys(choices).forEach(participant => {
        let groupsWithParticipants = groups.filter(group => group.has(participant) || group.has(choices[participant]));

        if (groupsWithParticipants.length === 0) {
          groups.push(new Set([participant, choices[participant]]));
        } else if (groupsWithParticipants.length === 1) {
          groupsWithParticipants[0].add(participant);
          groupsWithParticipants[0].add(choices[participant]);
        } else {
          groupsWithParticipants[0] = new Set([...groupsWithParticipants[0], ...groupsWithParticipants[1]]);
          groupsWithParticipants.splice(1, 1);
        }
      });

      const currentParticipant = user?.uid;
      const filteredAvailableParticipants = participants.filter(participant => {
        const isCurrentParticipant = participant === currentParticipant;
        const isAlreadyChosen = chosenParticipants.includes(participant);
        const choseCurrentParticipant = choices[participant] === currentParticipant;
        const belongsToSameSet = chosenParticipants.length < (participants.length - 1) && groups.some(set => set.has(currentParticipant) && set.has(participant));

        if (isCurrentParticipant || isAlreadyChosen || choseCurrentParticipant || belongsToSameSet) {
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

  if (!isParticipant || isBeforeIntroductionLimit === undefined || (isFirstTime && isBeforeIntroductionLimit) || hasChosenParticipant) {
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

      <button disabled={!selectedParticipantID} onClick={handleChooseParticipant}>Continuar</button>
    </>
  );
}

export default ChooseParticipant;