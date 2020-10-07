import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { parseISO, differenceInYears } from 'date-fns'
import { FaUserCircle } from 'react-icons/fa'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { isBefore, format } from 'date-fns'
import ReactLoader from 'react-loading'

import useAuth from '../../../hooks/useAuth'

import firebase from '../../../services/Firebase'

import { Container, Welcome, AvailableParticipantsContainer, ParticipantCard, ParticipantCardHeader } from './styles'

function Feed({ clubId }) {
  const [isCheckingConditions, setIsCheckingConditions] = useState(true);

  const [isParticipant, setIsParticipant] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [hasChosenParticipant, setHasChosenParticipant] = useState(false);

  const [introductionDate, setIntroductionDate] = useState();
  const [currentDate, setCurrentDate] = useState();

  const [availableParticipants, setAvailableParticipants] = useState([]);
  const [selectedParticipantID, setSelectedParticipantID] = useState('');

  const [allChoicesMade, setAllChoicesMade] = useState(false)

  const { user } = useAuth();

  const formattedIntroductionDate = useMemo(() => {
    if (introductionDate) {
      return format(introductionDate, 'dd/MM/yyyy HH:mm')
    }
  }, [introductionDate])

  const formik = useFormik({
    initialValues: {
      introduction: '',
    },
    validationSchema: Yup.object({
      introduction: Yup.string()
        .required('Não continue sem se apresentar... Queremos saber mais sobre você!'),
    }),
    onSubmit: async ({ introduction }) => {
      try {
        await firebase.firestore().doc(`clubs/${clubId}/metadata/introductions`).update({
          [user?.uid]: introduction,
        });
        setIsFirstTime(false);
      } catch (error) {
      }
    },
  })

  const handleSelectParticipant = useCallback((participantID) => {
    setSelectedParticipantID(participantID);
  }, []);

  const handleChooseParticipant = useCallback(async () => {
    await firebase.firestore().doc(`clubs/${clubId}/metadata/choices`).update({
      [user?.uid]: selectedParticipantID,
    });
    setHasChosenParticipant(true);
  }, [clubId, selectedParticipantID, user]);

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

  if (isCheckingConditions) {
    return (
      <Container>
        <ReactLoader type="bubbles" width={128} color="#f3d250" />
      </Container>
    )
  }

  return (
    <Container>
      {isParticipant && (
        (isFirstTime && isBefore(currentDate, introductionDate)) ? (
          <Welcome>
            <h1>Vimos que é a sua primeira vez aqui!</h1>
            Antes de mostrarmos todos os resumos já compartilhados, apresente-se para o clube.

            <p>Você pode se apresentar até {formattedIntroductionDate}</p>

            <form onSubmit={formik.handleSubmit}>
              <textarea
                type="text"
                name="introduction"
                placeholder="Digite aqui um texto se apresentando."
                value={formik.values.introduction}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <button type="submit" disabled={!(formik.isValid && formik.dirty)}>
                Continuar
              </button>
            </form>

          </Welcome>
        ) : (
            !hasChosenParticipant ? (
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
            ) : (
                <>
                  <h2>
                    {allChoicesMade ?
                      'Feed' :
                      'Aguarde enquanto as demais pessoas escolhem... Assim que todas as escolhas forem feitas, você poderá compartilhar o seu resumo'
                    }
                  </h2>
                </>
              )
          )
      )}
    </Container>
  );
}

export default Feed;
