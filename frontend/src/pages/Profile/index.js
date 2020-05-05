import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ReactLoader from 'react-loading'

import firebase from '../../services/Firebase'
import useAuth from '../../hooks/useAuth'

import { Container } from './styles'

export default function Profile({ userData, setUserData }) {
  const { user } = useAuth()
  const [fineshedSubmit, setFinishedSubmit] = useState(false)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userData.name,
      surname: userData.surname,
      school: userData.school,
      birthDate: userData.birthDate,
      gender: userData.gender,
      imgUrl: userData.imgUrl,
      imgFile: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Não nos deixe sem saber seu nome'),
      surname: Yup.string().required('Não nos deixe sem saber seu sobrenome'),
      school: Yup.string().required('Não nos deixe sem saber sua escola'),
      birthDate: Yup.date().required('Não nos deixe sem saber seu aniversário'),
      gender: Yup.string()
        .oneOf(['male', 'female', 'other'])
        .required('Não nos deixe sem saber seu genero'),
    }),
    onSubmit: async ({
      name,
      surname,
      school,
      birthDate,
      gender,
      imgUrl,
      imgFile,
    }) => {
      setFinishedSubmit(false)

      let url = imgUrl
      if (imgFile) {
        await firebase.storage().ref(`/users/${user.uid}`).put(imgFile)
        url = await firebase
          .storage()
          .ref(`/users/${user.uid}`)
          .getDownloadURL()
      }

      await firebase.firestore().doc(`/users/${user.uid}`).update({
        name,
        surname,
        school,
        birthDate,
        gender,
        imgUrl: url,
      })

      setUserData(formik.values)
      setFinishedSubmit(true)
    },
  })

  return (
    <Container>
      <header>
        <h1>Perfil</h1>
      </header>

      <form onSubmit={formik.handleSubmit}>
        <div className="profile-image">
          {formik.values.imgUrl ? (
            <img src={formik.values.imgUrl} alt={userData.name} />
          ) : (
            <FaUserCircle size={200} color="var(--white)" />
          )}
          <label className="button" htmlFor="profile-image-upload">
            Selecione uma foto
          </label>
          <input
            id="profile-image-upload"
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files[0]
              const reader = new FileReader()

              reader.onload = function (event) {
                formik.setValues({
                  ...formik.values,
                  imgUrl: event.target.result,
                  imgFile: file,
                })
              }

              reader.readAsDataURL(e.target.files[0])
            }}
          ></input>
        </div>

        {formik.touched.name && formik.errors.name ? (
          <div className="error-message">{formik.errors.name}</div>
        ) : null}
        {formik.touched.surname && formik.errors.surname ? (
          <div className="error-message">{formik.errors.surname}</div>
        ) : null}
        {formik.touched.school && formik.errors.school ? (
          <div className="error-message">{formik.errors.school}</div>
        ) : null}
        {formik.touched.birthday && formik.errors.birthday ? (
          <div className="error-message">{formik.errors.birthday}</div>
        ) : null}
        {formik.touched.gender && formik.errors.gender ? (
          <div className="error-message">{formik.errors.gender}</div>
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
          name="surname"
          type="text"
          placeholder="Sobrenome"
          className={
            formik.touched.surname && formik.errors.surname ? 'error' : ''
          }
          value={formik.values.surname || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <input
          name="school"
          type="text"
          placeholder="Escola"
          className={
            formik.touched.school && formik.errors.school ? 'error' : ''
          }
          value={formik.values.school || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <input
          name="birthDate"
          type="date"
          placeholder="Idade"
          className={
            formik.touched.birthDate && formik.errors.birthDate ? 'error' : ''
          }
          value={formik.values.birthDate || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <select
          name="gender"
          type="text"
          placeholder="Genero"
          className={
            formik.touched.gender && formik.errors.gender ? 'error' : ''
          }
          value={formik.values.gender || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="male">Masculino</option>
          <option value="female">Feminino</option>
          <option value="other">Outro</option>
        </select>

        <button className="button" type="submit" disabled={!formik.isValid}>
          Salvar
        </button>
      </form>

      {formik.isSubmitting ? (
        <ReactLoader type="bubbles" height={32} color="#f3d250" />
      ) : null}

      {fineshedSubmit ? (
        <div className="success-message">Dados atualizados com sucesso</div>
      ) : null}
    </Container>
  )
}
