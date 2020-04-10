import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ReactLoader from 'react-loading'

import './styles.css'

import firebase from '../../services/Firebase'

export default function SignIn() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Por favor, digite um email válido')
        .required('Precisamos do email para permitir o login'),
      password: Yup.string()
        .min(6, 'A quantidade mínima de caracteres para senha é 6')
        .required('Precisamos da senha para permitir o login'),
    }),
    onSubmit: async ({ email, password }) => {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          formik.errors.email = 'Usuário não encontrado'
        } else if (error.code === 'auth/wrong-password') {
          formik.errors.password = 'Senha incorreta'
        }
      }
    },
  })

  return (
    <div className="signin-container">
      <header>
        <Link to="/">
          <img src="https://picsum.photos/id/1062/50" alt="Clube da Leitura" />
        </Link>
      </header>
      <h1>Bem vindo(a) de volta</h1>

      <div className="signin-form-container">
        {formik.touched.email && formik.errors.email ? (
          <div className="error-message">{formik.errors.email}</div>
        ) : null}
        {formik.touched.password && formik.errors.password ? (
          <div className="error-message">{formik.errors.password}</div>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={
                formik.touched.email && formik.errors.email ? 'error' : ''
              }
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              className={
                formik.touched.password && formik.errors.password ? 'error' : ''
              }
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <button type="submit" disabled={!(formik.isValid && formik.dirty)}>
            Entrar
          </button>

          {formik.isSubmitting ? (
            <ReactLoader type="bubbles" height={32} color="#f3d250" />
          ) : null}

          <Link to="/">Esqueci minha senha</Link>
        </form>
      </div>

      <Link to="/signup">Ainda não tenho conta</Link>
    </div>
  )
}
