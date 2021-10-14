import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import firebase from '../../services/Firebase';

import { Container } from './styles';

function ForgotPassword() {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: async ({ email }) => {
      try {
        await firebase.auth().sendPasswordResetEmail(email, {
          url: 'https://clube-da-leitura.web.app'
        });

        setIsEmailSent(true);
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Por favor, digite um email válido')
        .required('Precisamos de um email.')
    })
  });

  return (
    <Container>
      <h1>Recuperação de senha</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Digite seu e-mail"
          value={formik.values.email}
          className={
            formik.touched.email && formik.errors.email ? 'error' : ''
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <button type="submit">Enviar</button>
      </form>

      {isEmailSent && (
        <>
          <p>Caso o email esteja cadastrado, enviaremos um email para redefinir a senha!</p>
          <p>Você já pode fechar esta página</p>
        </>
      )}
    </Container>
  );
}

export default ForgotPassword;