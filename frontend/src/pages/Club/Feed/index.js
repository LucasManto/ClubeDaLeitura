import React, { useState, useEffect, useMemo } from 'react'
import { isBefore } from 'date-fns'
import ReactLoader from 'react-loading'

import FirstTime from './FirstTime'
import ChooseParticipant from './ChooseParticipant'

import useAuth from '../../../hooks/useAuth'

import firebase from '../../../services/Firebase'

import { Container } from './styles'

function Feed({ clubId }) {
  const [isCheckingConditions, setIsCheckingConditions] = useState(true);

  const [isParticipant, setIsParticipant] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [hasChosenParticipant, setHasChosenParticipant] = useState(false);

  const [introductionDate, setIntroductionDate] = useState();
  const [currentDate, setCurrentDate] = useState();

  const [allChoicesMade, setAllChoicesMade] = useState(false)

  const { user } = useAuth();

  useEffect(() => {
    async function checkIsParticipant() {
      const clubDoc = await firebase.firestore().doc(`clubs/${clubId}`).get();
      const clubParticipants = clubDoc.get('participants');

      setIsParticipant(clubParticipants.includes(user?.uid));
    }

    async function checkIsFirstTime() {
      const introductionDoc = await firebase.firestore().doc(`clubs/${clubId}/metadata/introductions`).get();

      setIsFirstTime(!introductionDoc.data()[user?.uid])
    }

    async function checkHasChosenParticipant() {
      const choicesDoc = await firebase.firestore().doc(`clubs/${clubId}/metadata/choices`).get();

      setHasChosenParticipant(!!choicesDoc.data()[user?.uid])
    }

    async function checkAllChoicesAreMade() {
      const choicesDoc = await firebase.firestore().doc(`clubs/${clubId}/metadata/choices`).get();
      const choices = choicesDoc.data()

      const clubDoc = await firebase.firestore().doc(`clubs/${clubId}`).get();
      const participants = clubDoc.get('participants')

      setAllChoicesMade(participants.length === Object.keys(choices).length)
    }

    async function checkConditions() {
      await Promise.all([
        checkIsParticipant(),
        checkIsFirstTime(),
        checkHasChosenParticipant(),
        checkAllChoicesAreMade(),
      ]);

      setIsCheckingConditions(false);
    }

    checkConditions();
  }, [user, clubId])

  useEffect(() => {
    async function getLimitDates() {
      const datesDocSnapshot = await firebase.firestore().doc(`clubs/${clubId}/metadata/dates`).get();
      const {
        introduction_limit,
      } = datesDocSnapshot.data();

      setIntroductionDate(introduction_limit.toDate())
    }

    getLimitDates();
  }, [clubId])

  useEffect(() => {
    fetch("https://worldtimeapi.org/api/ip")
      .then(response => response.json())
      .then(result => setCurrentDate(new Date(result.datetime)))
  }, [])

  const isBeforeIntroductionLimit = useMemo(() => {
    if (currentDate === undefined) {
      return currentDate;
    }
    return isBefore(currentDate, introductionDate)
  }, [currentDate, introductionDate]);
  
  if (isCheckingConditions) {
    return (
      <Container>
        <ReactLoader type="bubbles" width={128} color="#f3d250" />
      </Container>
    )
  }

  return (
    <Container>
      <FirstTime
        clubId={clubId}
        isParticipant={isParticipant}
        isFirstTime={isFirstTime}
        setIsFirstTime={setIsFirstTime}
        introductionDate={introductionDate}
        isBeforeIntroductionLimit={isBeforeIntroductionLimit}
      />
      <ChooseParticipant
        clubId={clubId}
        isParticipant={isParticipant}
        isFirstTime={isFirstTime}
        isBeforeIntroductionLimit={isBeforeIntroductionLimit}
        hasChosenParticipant={hasChosenParticipant}
        setHasChosenParticipant={setHasChosenParticipant}
        />

      <h2>
        {allChoicesMade ?
          'Feed' :
          'Aguarde enquanto as demais pessoas escolhem... Assim que todas as escolhas forem feitas, você poderá compartilhar o seu resumo'
        }
      </h2>
    </Container>
  );
}

export default Feed;
