import React, { useMemo, useState } from 'react'
import { useFormik, } from 'formik'
import * as Yup from 'yup'
import ReactLoader from 'react-loading'
import { useHistory } from 'react-router-dom'
import { format } from 'date-fns';

import firebase from '../../services/Firebase'
import useAuth from '../../hooks/useAuth'

import { Container } from './styles'

import bannerImg from '../../assets/default-club-banner.png'

export default function CreateClub({ userData, setUserData }) {
  const { user } = useAuth()
  const [availableParticipants, setAvailableParticipants] = useState([])
  const [availableUsers, setAvailableUsers] = useState([])

  const [isSearchingParticipant, setIsSearchingParticipant] = useState(false)
  const [isSearchingAdmin, setIsSearchingAdmin] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState(0)

  const currentDate = useMemo(() => new Date(), [])

  const history = useHistory()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      description: '',
      participants: [],
      admins: [{
        id: user?.uid || '',
        name: userData.name,
        surname: userData.surname,
        email: userData.email
      }],
      imgUrl: '',
      img: null,
      introductionLimit: format(currentDate, "yyyy-MM-dd'T'HH:mm")
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Gostaríamos de saber o nome do seu clube'),
      description: Yup.string().required(
        'Nos diga um pouco mais sobre o seu clube'
      ),
      participants: Yup.array()
        .min(2, 'O clube precisa de pelo menos dois participantes')
        .max(30, 'Um clube pode ter no máximo 30 participantes')
        .required(),
      admins: Yup.array()
        .min(1, 'O clube precisa de no mínimo 1 administrador(a).')
        .required(),
      introductionLimit: Yup.date()
        .min(currentDate, 'A data não pode ser anterior a data atual')
        .required()
    }),
    onSubmit: async ({ name, description, participants, admins, img, introductionLimit }) => {
      const club = {
        name,
        description,
        admins: admins.map(admin => admin.id),
        participants: participants.map(participant => participant.id),
      }
      const clubDocReference = await firebase
        .firestore()
        .collection('clubs')
        .add(club)

      if (img) {
        await firebase
          .storage()
          .ref(`/clubs/${clubDocReference.id}/banner`)
          .put(img)
        const url = await firebase
          .storage()
          .ref(`/clubs/${clubDocReference.id}/banner`)
          .getDownloadURL()

        club.url = url

        await clubDocReference.update({
          banner: url,
        })
      }

      await clubDocReference.collection('metadata').doc('introductions').set({});
      await clubDocReference.collection('metadata').doc('choices').set({});
      await clubDocReference.collection('metadata').doc('dates').set({
        introduction_limit: new Date(introductionLimit)
      });
      await clubDocReference.collection('metadata').doc('abstracts').set({});
      await clubDocReference.collection('metadata').doc('responses').set({});

      let clubsIBelong = [...userData.clubsIBelong]
      let clubsIManage = [...userData.clubsIManage]

      const isParticipant = participants.filter(
        participant => participant.id === user.uid
      )
      if (isParticipant) {
        clubsIBelong = [...clubsIBelong, { id: clubDocReference.id, ...club }]
      }
      const isAdmin = admins.filter(admin => admin.id === user.uid)
      if (isAdmin) {
        clubsIManage = [...clubsIManage, { id: clubDocReference.id, ...club }]
      }

      setUserData({
        ...userData,
        clubsIBelong,
        clubsIManage,
      })

      history.push('/home/meus-clubes')
    },
  })

  function handleAddParticipant(participant) {
    formik.setValues({
      ...formik.values,
      participants: [...formik.values.participants, participant],
    })
    setAvailableParticipants(
      availableParticipants.filter(
        availableParticipant => availableParticipant !== participant
      )
    )
  }

  function handleRemoveParticipant(availableParticipant) {
    formik.setValues({
      ...formik.values,
      participants: formik.values.participants.filter(
        participant => participant !== availableParticipant
      ),
    })
    setAvailableParticipants([...availableParticipants, availableParticipant])
  }

  function handleAddAdmin(user) {
    formik.setValues({
      ...formik.values,
      admins: [...formik.values.admins, user],
    })
    setAvailableUsers(
      availableUsers.filter(availableUser => availableUser !== user)
    )
  }

  function handleRemoveAdmin(availableUser) {
    formik.setValues({
      ...formik.values,
      admins: formik.values.admins.filter(user => user !== availableUser),
    })
    setAvailableUsers([...availableUsers, availableUser])
  }

  return (
    <Container>
      <header>
        <h1>Criar clube</h1>
      </header>

      <form onSubmit={formik.handleSubmit}>
        <div className="club-image">
          <img src={formik.values.imgUrl || bannerImg} alt="banner" />
          <label className="button" htmlFor="club-image-upload">
            Selecione uma imagem
          </label>
          <input
            id="club-image-upload"
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files[0]
              const reader = new FileReader()

              reader.onload = function (event) {
                formik.setValues({
                  ...formik.values,
                  imgUrl: event.target.result,
                  img: file,
                })
              }

              reader.readAsDataURL(e.target.files[0])
            }}
          ></input>
        </div>

        {formik.touched.name && formik.errors.name ? (
          <div className="error-message">{formik.errors.name}</div>
        ) : null}
        {formik.touched.description && formik.errors.description ? (
          <div className="error-message">{formik.errors.description}</div>
        ) : null}
        {formik.touched.participants && formik.errors.participants ? (
          <div className="error-message">{formik.errors.participants}</div>
        ) : null}
        {formik.touched.admins && formik.errors.admins ? (
          <div className="error-message">{formik.errors.admins}</div>
        ) : null}
        {formik.touched.introductionLimit && formik.errors.introductionLimit ? (
          <div className="error-message">{formik.errors.introductionLimit}</div>
        ) : null}
        <input
          name="name"
          type="text"
          placeholder="Nome"
          className={formik.touched.name && formik.errors.name ? 'error' : ''}
          value={formik.values.name || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <input
          name="description"
          type="text"
          placeholder="Descrição"
          className={
            formik.touched.description && formik.errors.description
              ? 'error'
              : ''
          }
          value={formik.values.description || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="introductionLimit">Data limite para introdução</label>
        <input
          name="introductionLimit"
          type="datetime-local"
          min={format(currentDate, "yyyy-MM-dd HH:mm")}
          className={
            formik.touched.introductionLimit && formik.errors.introductionLimit
              ? 'error'
              : ''
          }
          value={formik.values.introductionLimit || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <p className="form-title">Participantes</p>
        <input
          type="text"
          placeholder="Digite um email para buscarmos"
          onChange={e => {
            const queryTerm = e.target.value

            if (queryTerm === '') {
              return
            }

            if (typingTimeout) {
              clearTimeout(typingTimeout)
            }

            setTypingTimeout(
              setTimeout(async () => {
                setIsSearchingParticipant(true)
                const emailQuerySnapshot = await firebase
                  .firestore()
                  .collection('users')
                  .where('email', '>=', queryTerm)
                  .where('email', '<=', queryTerm + '\uf8ff')
                  .get()
                const nameQuerySnapshot = await firebase
                  .firestore()
                  .collection('users')
                  .where('name', '>=', queryTerm)
                  .where('name', '<=', queryTerm + '\uf8ff')
                  .get()
                const surnameQuerySnapshot = await firebase
                  .firestore()
                  .collection('users')
                  .where('surname', '>=', queryTerm)
                  .where('surname', '<=', queryTerm + '\uf8ff')
                  .get()

                const emailResults = emailQuerySnapshot.docs
                  .map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                  }))
                  .filter(
                    participant =>
                      !formik.values.participants.find(
                        p => participant.id === p.id
                      )
                  )
                const nameResults = nameQuerySnapshot.docs
                  .map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                  }))
                  .filter(
                    participant =>
                      !formik.values.participants.find(
                        p => participant.id === p.id
                      )
                  )
                const surnameResults = surnameQuerySnapshot.docs
                  .map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                  }))
                  .filter(
                    participant =>
                      !formik.values.participants.find(
                        p => participant.id === p.id
                      )
                  )

                const usersWithDuplicates = [...new Set([...emailResults, ...nameResults, ...surnameResults])]
                const usersIds = new Set();
                const users = usersWithDuplicates.filter(availableUser => {
                  if (usersIds.has(availableUser.id)) {
                    return false;
                  } else {
                    usersIds.add(availableUser.id);
                    return true;
                  }
                })

                setAvailableParticipants(users)
                setIsSearchingParticipant(false)
              }, 500)
            )
          }}
        />

        <div className="participants-container">
          <div className="available-participants">
            <h2>Participantes disponíveis</h2>
            {isSearchingParticipant ? (
              <ReactLoader type="bubbles" height={32} color="#f3d250" />
            ) : (
                availableParticipants.map(participant => (
                  <span
                    key={participant.id}
                    onClick={() => handleAddParticipant(participant)}
                    className="participant-name"
                  >
                    {`${participant.email} (${participant.name} ${participant.surname})`}
                  </span>
                ))
              )}
          </div>
          <div className="current-participants">
            <h2>Participantes do clube</h2>
            {formik.values.participants.map(participant => (
              <span
                key={participant.id}
                onClick={() => handleRemoveParticipant(participant)}
                className="participant-name"
              >
                {`${participant.email} (${participant.name} ${participant.surname})`}
              </span>
            ))}
          </div>
        </div>

        <p className="form-title">Administradores</p>
        <input
          type="text"
          placeholder="Digite um email para buscarmos"
          onChange={e => {
            const queryTerm = e.target.value

            if (queryTerm === '') {
              return
            }

            if (typingTimeout) {
              clearTimeout(typingTimeout)
            }

            setTypingTimeout(
              setTimeout(async () => {
                setIsSearchingAdmin(true)
                const emailQuerySnapshot = await firebase
                  .firestore()
                  .collection('users')
                  .where('email', '>=', queryTerm)
                  .where('email', '<=', queryTerm + '\uf8ff')
                  .get()
                const nameQuerySnapshot = await firebase
                  .firestore()
                  .collection('users')
                  .where('name', '>=', queryTerm)
                  .where('name', '<=', queryTerm + '\uf8ff')
                  .get()
                const surnameQuerySnapshot = await firebase
                  .firestore()
                  .collection('users')
                  .where('surname', '>=', queryTerm)
                  .where('surname', '<=', queryTerm + '\uf8ff')
                  .get()

                const emailResults = emailQuerySnapshot.docs
                  .map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                  }))
                  .filter(
                    participant =>
                      !formik.values.admins.find(
                        p => participant.id === p.id
                      )
                  )
                const nameResults = nameQuerySnapshot.docs
                  .map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                  }))
                  .filter(
                    participant =>
                      !formik.values.admins.find(
                        p => participant.id === p.id
                      )
                  )
                const surnameResults = surnameQuerySnapshot.docs
                  .map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                  }))
                  .filter(
                    participant =>
                      !formik.values.admins.find(
                        p => participant.id === p.id
                      )
                  )

                const usersWithDuplicates = [...new Set([...emailResults, ...nameResults, ...surnameResults])]
                const usersIds = new Set();
                const users = usersWithDuplicates.filter(availableUser => {
                  if (usersIds.has(availableUser.id)) {
                    return false;
                  } else {
                    usersIds.add(availableUser.id);
                    return true;
                  }
                })

                setAvailableUsers(users)
                setIsSearchingAdmin(false)
              }, 500)
            )
          }}
        />
        <div className="participants-container">
          <div className="available-participants">
            <h2>Usuários disponíveis</h2>
            {isSearchingAdmin ? (
              <ReactLoader type="bubbles" height={32} color="#f3d250" />
            ) : (
                availableUsers.map(participant => (
                  <span
                    key={participant.id}
                    onClick={() => handleAddAdmin(participant)}
                    className="participant-name"
                  >
                    {`${participant.email} (${participant.name} ${participant.surname})`}
                  </span>
                ))
              )}
          </div>
          <div className="current-participants">
            <h2>Administradores do clube</h2>
            {formik.values.admins.map(participant => (
              <span
                key={participant.id}
                onClick={() => handleRemoveAdmin(participant)}
                className="participant-name"
              >
                {`${participant.email} (${participant.name} ${participant.surname})`}
              </span>
            ))}
          </div>
        </div>

        <button className="button" type="submit">
          Criar
        </button>
      </form>

      {formik.isSubmitting ? (
        <ReactLoader type="bubbles" height={32} color="#f3d250" />
      ) : null}
    </Container>
  )
}
