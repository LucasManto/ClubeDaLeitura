import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';

import useAuth from '../../../../hooks/useAuth'

import firebase from '../../../../services/Firebase'

import { Welcome } from './styles';

function FirstTime({
  clubId,
  isParticipant,
  isFirstTime,
  setIsFirstTime,
  introductionDate,
  isBeforeIntroductionDate
}) {
  const { user } = useAuth();

  const formattedIntroductionDate = useMemo(() => {
    if (introductionDate) {
      return format(introductionDate, 'dd/MM/yyyy HH:mm')
    }
  }, [introductionDate]);

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

  if (!isParticipant || !isFirstTime || !isBeforeIntroductionDate) {
    return null;
  }

  return (
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
  );
}

export default FirstTime;