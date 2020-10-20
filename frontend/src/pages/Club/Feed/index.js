import React, { useState, useEffect, useMemo } from 'react'
import { isBefore } from 'date-fns'
import ReactLoader from 'react-loading'

import FirstTime from './FirstTime'
import ChooseParticipant from './ChooseParticipant'

import useAuth from '../../../hooks/useAuth'

import firebase from '../../../services/Firebase'

import {
  Abstract,
  AbstractsContainer,
  Container,
  FeedContainer,
  ParticipantInfo,
  ParticipantsContainer
} from './styles'
import { FaArrowRight } from 'react-icons/fa'

function Feed({ clubId }) {
  const [clubData, setClubData] = useState();
  const [introductions, setIntroductions] = useState([]);
  const [choices, setChoices] = useState();
  const [participants, setParticipants] = useState();

  const [isLoadingData, setIsLoadingData] = useState(true);

  const [isParticipant, setIsParticipant] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [hasChosenParticipant, setHasChosenParticipant] = useState(false);

  const [introductionDate, setIntroductionDate] = useState();
  const [currentDate, setCurrentDate] = useState();

  const [allChoicesMade, setAllChoicesMade] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    async function getClubData() {
      const clubDoc = await firebase.firestore().doc(`clubs/${clubId}`).get();

      return clubDoc.data();
    }

    async function getIntroductions() {
      const introductionDoc = await firebase.firestore().doc(`clubs/${clubId}/metadata/introductions`).get();

      return introductionDoc.data();
    }

    async function getChoices() {
      const choicesDoc = await firebase.firestore().doc(`clubs/${clubId}/metadata/choices`).get();

      return choicesDoc.data();
    }

    async function getData() {
      const [clubDataResult, introductionsResult, choicesResult] = await Promise.all([
        getClubData(),
        getIntroductions(),
        getChoices()
      ]);

      setClubData(clubDataResult);
      setIntroductions(introductionsResult);
      setChoices(choicesResult);

      setIsLoadingData(false);
    }

    getData();
  }, [clubId]);

  useEffect(() => {
    if (!clubData) {
      return;
    }

    async function getParticipants() {
      const participantsIds = clubData.participants;

      const participantsDocs = await Promise.all(participantsIds.map(participantId => {
        return firebase.firestore().doc(`users/${participantId}`).get();
      }));

      const participantsData = {};
      participantsDocs.forEach(participant => {
        participantsData[participant.id] = {
          id: participant.id,
          ...participant.data()
        };
      });

      setParticipants(participantsData);
    }

    getParticipants();
  }, [clubData]);

  useEffect(() => {
    function checkIsParticipant() {
      if (!clubData || !user) {
        return;
      }

      const clubParticipants = clubData.participants;

      setIsParticipant(clubParticipants.includes(user.uid));
    }

    function checkIsFirstTime() {
      if (!introductions || !user) {
        return;
      }

      setIsFirstTime(!introductions[user.uid]);
    }

    function checkHasChosenParticipant() {
      if (!choices || !user) {
        return;
      }

      setHasChosenParticipant(!!choices[user.uid]);
    }

    function checkAllChoicesAreMade() {
      if (!clubData || !choices || !user) {
        return;
      }

      const participants = clubData.participants;

      setAllChoicesMade(participants.length === Object.keys(choices).length)
    }

    checkIsParticipant();
    checkIsFirstTime();
    checkHasChosenParticipant();
    checkAllChoicesAreMade();
  }, [user, clubData, choices, introductions])

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

  const abstractsData = useMemo(() => {
    if (!choices || !participants) {
      return [];
    }

    return Object.keys(choices).map(participantId => {
      const chosenParticipantId = choices[participantId];

      return {
        participant: participants[participantId],
        chosenParticipant: participants[chosenParticipantId]
      };
    })
  }, [choices, participants]);

  if (isLoadingData) {
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

      {isParticipant && (isFirstTime || !hasChosenParticipant) ? null :
        !isParticipant || allChoicesMade ?
          (
            <FeedContainer>
              <h2>Aqui você poderá enviar seu resumo e ver os resumos já enviados!</h2>
              <AbstractsContainer>
                {abstractsData.map((abstractData, i) => {
                  return (
                    <Abstract key={i}>
                      <ParticipantsContainer>
                        <ParticipantInfo>
                          <img src={abstractData.participant.imgUrl} alt={`${abstractData.participant.name} ${abstractData.participant.surname}`} />
                          <span>{`${abstractData.participant.name} ${abstractData.participant.surname}`}</span>
                        </ParticipantInfo>
                        <FaArrowRight size={32} fontWeight="normal" />
                        <ParticipantInfo>
                          <img src={abstractData.chosenParticipant.imgUrl} alt={`${abstractData.chosenParticipant.name} ${abstractData.chosenParticipant.surname}`} />
                          <span>{`${abstractData.chosenParticipant.name} ${abstractData.chosenParticipant.surname}`}</span>
                        </ParticipantInfo>
                      </ParticipantsContainer>

                      <button>Ver resumo</button>
                    </Abstract>
                  );
                })}
              </AbstractsContainer>
            </FeedContainer>
          ) :
          (
            <h2>
              Aguarde enquanto as demais pessoas escolhem... Assim que todas as escolhas forem feitas, você poderá compartilhar o seu resumo e ver os resumos já enviados!
            </h2>
          )
      }
    </Container>
  );
}

export default Feed;
