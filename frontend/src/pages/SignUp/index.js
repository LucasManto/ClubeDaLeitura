import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ReactLoading from 'react-loading'

import firebase from '../../services/Firebase'

import { Container, FormContainer } from './styles'

export default function SignUp() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      surname: '',
      school: '',
      birthday: `${new Date().getFullYear()}-01-01`,
      gender: 'male',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Por favor, digite um email válido')
        .required('Precisamos do email para permitir o cadastro'),
      password: Yup.string()
        .min(6, 'A quantidade mínima de caracteres para senha é 6')
        .required('Precisamos da senha para permitir o cadastro'),
      name: Yup.string().required('Gostaríamos de saber seu nome'),
      surname: Yup.string().required(
        'Gostaríamos de saber seu sobrenome também'
      ),
      school: Yup.string().required(
        'Gostaríamos de saber o nome da sua escola'
      ),
      birthday: Yup.date().required('Gostaríamos de saber quando você nasceu'),
      gender: Yup.string().oneOf(['male', 'female', 'other']),
    }),
    onSubmit: async ({
      email,
      password,
      name,
      surname,
      school,
      birthday: birthDate,
      gender,
    }) => {
      const createUser = firebase.functions().httpsCallable('createUser')

      try {
        await createUser({
          email,
          password,
          name,
          surname,
          school,
          birthDate,
          gender,
        })
        firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (error) {
        console.log(error)
        if (error.code === 'already-exists') {
          formik.errors.email = 'Esse email já está sendo utilizado'
        } else if (error.code === 'invalid-argument') {
          error.details.forEach(error => {
            formik.errors[error.path] = error.message
          })
          console.log(error.details)
        }
      }
    },
  })

  return (
    <Container>
      <header>
        <Link to="/">
          <img src="https://picsum.photos/id/1062/50" alt="Clube da Leitura" />
        </Link>
      </header>
      <h1>Bem vindo(a)</h1>

      <FormContainer>
        {formik.touched.email && formik.errors.email ? (
          <div className="error-message">{formik.errors.email}</div>
        ) : null}
        {formik.touched.password && formik.errors.password ? (
          <div className="error-message">{formik.errors.password}</div>
        ) : null}
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
        <form onSubmit={formik.handleSubmit}>
          <div className="input-group">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className={
                formik.touched.email && formik.errors.email ? 'error' : ''
              }
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <input
              name="password"
              type="password"
              placeholder="Senha"
              className={
                formik.touched.password && formik.errors.password ? 'error' : ''
              }
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <input
              name="name"
              type="text"
              placeholder="Nome"
              className={
                formik.touched.name && formik.errors.name ? 'error' : ''
              }
              value={formik.values.name}
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
              value={formik.values.surname}
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
              value={formik.values.school}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <input
              name="birthday"
              type="date"
              placeholder="Nascimento"
              className={
                formik.touched.birthday && formik.errors.birthday ? 'error' : ''
              }
              value={formik.values.birthday}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <select
              name="gender"
              placeholder="Gênero"
              className={
                formik.touched.gender && formik.errors.gender ? 'error' : ''
              }
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
              <option value="other">Outro</option>
            </select>
          </div>

          <button type="submit" disabled={!(formik.isValid && formik.dirty)}>
            Cadastrar
          </button>
        </form>
        {formik.isSubmitting ? (
          <ReactLoading type="bubbles" color="#f3d250" height={32} />
        ) : null}
      </FormContainer>

      <Link to="/signin">Já tenho conta</Link>
    </Container>
  )
}
