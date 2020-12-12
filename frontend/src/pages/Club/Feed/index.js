import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { isBefore } from 'date-fns'
import ReactLoader from 'react-loading'
import { FaArrowCircleRight, FaUserCircle } from 'react-icons/fa';

import FirstTime from './FirstTime'
import ChooseParticipant from './ChooseParticipant'

import useAuth from '../../../hooks/useAuth'

import firebase from '../../../services/Firebase'

import {
  Container,
  FeedContainer,
  InteractionsContainer,
  Interaction,
  ParticipantsContainer,
  ParticipantInfo,
  InteractionModalContainer,
  InteractionModal,
  Message,
  MessageHeader,
  InputContainer,
  VideoContainer
} from './styles'
import { FaArrowRight } from 'react-icons/fa'

function Feed({ clubId }) {
  const [clubData, setClubData] = useState();
  const [introductions, setIntroductions] = useState([]);
  const [choices, setChoices] = useState();
  const [abstracts, setAbstracts] = useState();
  const [responses, setResponses] = useState();

  const [participants, setParticipants] = useState();

  const [isLoadingData, setIsLoadingData] = useState(true);

  const [isParticipant, setIsParticipant] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [hasChosenParticipant, setHasChosenParticipant] = useState(false);

  const [introductionDate, setIntroductionDate] = useState();
  const [currentDate, setCurrentDate] = useState();

  const [allChoicesMade, setAllChoicesMade] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [interactionData, setInteractionData] = useState({});
  const [abstract, setAbstract] = useState('');

  const [uploadedVideoUrl, setUploadedVideoUrl] = useState('');
  const [uploadedVideoFile, setUploadedVideoFile] = useState();
  const [isSendingVideo, setIsSendingVideo] = useState(false);

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

    async function getAbstracts() {
      const abstractsDoc = await firebase.firestore().doc(`clubs/${clubId}/metadata/abstracts`).get();

      return abstractsDoc.data();
    }

    async function getResponses() {
      const responsesDoc = await firebase.firestore().doc(`clubs/${clubId}/metadata/responses`).get();

      return responsesDoc.data();
    }

    async function getData() {
      const [
        clubDataResult,
        introductionsResult,
        choicesResult,
        abstractsResult,
        responsesResult
      ] = await Promise.all([
        getClubData(),
        getIntroductions(),
        getChoices(),
        getAbstracts(),
        getResponses()
      ]);

      setClubData(clubDataResult);
      setIntroductions(introductionsResult);
      setChoices(choicesResult);
      setAbstracts(abstractsResult);
      setResponses(responsesResult);

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
    fetch("http://worldclockapi.com/api/json/utc/now")
      .then(response => response.json())
      .then(result => setCurrentDate(new Date(result.currentDateTime)))
  }, [])

  const isBeforeIntroductionLimit = useMemo(() => {
    if (currentDate === undefined) {
      return currentDate;
    }
    return isBefore(currentDate, introductionDate)
  }, [currentDate, introductionDate]);

  const interactionsData = useMemo(() => {
    if (!choices || !participants || !abstracts || !responses) {
      return [];
    }

    return Object.keys(choices).map(participantId => {
      const chosenParticipantId = choices[participantId];

      return {
        participant: participants[participantId],
        chosenParticipant: participants[chosenParticipantId],
        abstract: abstracts[participantId],
        response: responses[chosenParticipantId]
      };
    })
  }, [choices, participants, abstracts, responses]);

  const handleSeeInteractions = useCallback((interactionData) => {
    setInteractionData(interactionData);
    setIsModalVisible(true);
  }, []);

  const handleSendAbstract = useCallback(async () => {
    await firebase.firestore().doc(`clubs/${clubId}/metadata/abstracts`).update({
      [user.uid]: abstract
    });

    setInteractionData(currentInteractionData => {
      return {
        ...currentInteractionData,
        abstract
      };
    });

    const newAbstracts = {
      ...abstracts,
      [user.uid]: abstract
    };

    setAbstracts(newAbstracts);
  }, [abstracts, abstract, clubId, user]);

  const handleSendResponse = useCallback(async () => {
    setIsSendingVideo(true)
    const fileRef = firebase.storage().ref(`/clubs/${clubId}/responses/${user.uid}`);
    await fileRef.put(uploadedVideoFile);
    const url = await fileRef.getDownloadURL();

    await firebase.firestore().doc(`clubs/${clubId}/metadata/responses`).update({
      [user.uid]: url
    });

    setIsSendingVideo(false);

    setInteractionData(currentInteractionData => {
      return {
        ...currentInteractionData,
        response: url
      };
    });

    const newResponses = {
      ...responses,
      [user.uid]: url
    };

    setResponses(newResponses);
  }, [responses, clubId, user, uploadedVideoFile]);

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
              {isParticipant ?
                <h2>Aqui você poderá enviar seu resumo e ver os resumos já enviados!</h2> :
                <h2>Aqui você poderá ver os resumos já enviados!</h2>
              }
              <InteractionsContainer>
                {interactionsData.sort((interactionA, interactionB) => {
                  if (interactionA.participant.id === user.uid || interactionA.chosenParticipant.id === user.uid) {
                    return -1;
                  } else if (interactionB.participant.id === user.uid || interactionB.chosenParticipant.id === user.uid) {
                    return 1;
                  } else {
                    return 0;
                  }
                }).map((interactionData, i) => {
                  return (
                    <Interaction key={i}>
                      <ParticipantsContainer>
                        <ParticipantInfo>
                          {interactionData.participant.imgUrl ? (
                            <img src={interactionData.participant.imgUrl} alt={`${interactionData.participant.name} ${interactionData.participant.surname}`} />
                          ) : (
                              <FaUserCircle size={50} color="var(--white)" />
                            )
                          }
                          <span>{`${interactionData.participant.name} ${interactionData.participant.surname}`}</span>
                        </ParticipantInfo>
                        <FaArrowRight size={32} fontWeight="normal" />
                        <ParticipantInfo>
                          {interactionData.chosenParticipant.imgUrl ? (
                            <img src={interactionData.chosenParticipant.imgUrl} alt={`${interactionData.chosenParticipant.name} ${interactionData.chosenParticipant.surname}`} />
                          ) : (
                              <FaUserCircle size={50} color="var(--white)" />
                            )
                          }
                          <span>{`${interactionData.chosenParticipant.name} ${interactionData.chosenParticipant.surname}`}</span>
                        </ParticipantInfo>
                      </ParticipantsContainer>

                      <button onClick={() => handleSeeInteractions(interactionData)}>Ver</button>
                    </Interaction>
                  );
                })}
              </InteractionsContainer>
            </FeedContainer>
          ) :
          (
            <h2>
              Aguarde enquanto as demais pessoas escolhem... Assim que todas as escolhas forem feitas, você poderá compartilhar o seu resumo e ver os resumos já enviados!
            </h2>
          )
      }

      {isModalVisible && (
        <InteractionModalContainer onClick={() => setIsModalVisible(false)}>
          <InteractionModal onClick={(event) => event.stopPropagation()}>
            <button id="close-modal" onClick={() => setIsModalVisible(false)}>X</button>

            <Message>
              <MessageHeader>
                {interactionData.chosenParticipant.imgUrl ? (
                  <img src={interactionData.chosenParticipant.imgUrl} alt={`${interactionData.chosenParticipant.name} ${interactionData.chosenParticipant.surname}`} />
                ) : (
                    <FaUserCircle size={50} color="var(--white)" />
                  )
                }
                <span>Resumo de {interactionData.chosenParticipant.name}</span>
              </MessageHeader>
              <span>
                {interactionData.abstract || 'Aguardando envio...'}
              </span>
            </Message>

            <Message>
              <MessageHeader>
                {interactionData.participant.imgUrl ? (
                  <img src={interactionData.participant.imgUrl} alt={`${interactionData.participant.name} ${interactionData.participant.surname}`} />
                ) : (
                    <FaUserCircle size={50} color="var(--white)" />
                  )
                }
                <span>Vídeo-resposta de {interactionData.participant.name}</span>
              </MessageHeader>
              {
                interactionData.response ? (
                  <VideoContainer>
                    <video src={interactionData.response} controls></video>
                  </VideoContainer>
                ) : (
                    <span>Aguardando envio...</span>
                  )
              }
            </Message>

            {!interactionData.abstract &&
              interactionData.chosenParticipant.id === user.uid && (
                <InputContainer>
                  <textarea
                    placeholder="Escreva aqui seu resumo"
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                  ></textarea>
                  <button
                    onClick={handleSendAbstract}
                    disabled={abstract.length === 0}
                  >
                    <FaArrowCircleRight size={32} />
                  </button>
                </InputContainer>
              )
            }

            {interactionData.abstract && !interactionData.response &&
              interactionData.participant.id === user.uid && (
                <>
                  {uploadedVideoUrl && (
                    <VideoContainer>
                      <video src={uploadedVideoUrl} controls></video>
                    </VideoContainer>
                  )}
                  <InputContainer>
                    <label htmlFor="response-upload">
                      Selecione o vídeo-resposta
                    </label>
                    <input
                      id="response-upload"
                      type="file"
                      accept="video/*"
                      onChange={e => {
                        const file = e.target.files[0]
                        const reader = new FileReader()

                        reader.onload = function (event) {
                          setUploadedVideoUrl(event.target.result);
                          setUploadedVideoFile(file);
                        }

                        reader.readAsDataURL(e.target.files[0])
                      }}
                    ></input>
                    <button
                      onClick={handleSendResponse}
                      disabled={uploadedVideoUrl.length === 0}
                    >
                      <FaArrowCircleRight size={32} />
                    </button>
                  </InputContainer>
                  {isSendingVideo &&
                    <ReactLoader id="sending-image-loader" type="bubbles" width={64} color="#5da2d5" />
                  }
                </>
              )
            }
          </InteractionModal>
        </InteractionModalContainer>
      )}
    </Container>
  );
}

export default Feed;
