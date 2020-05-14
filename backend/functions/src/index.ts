import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as Yup from 'yup'

const app = admin.initializeApp()
const firestore = app.firestore()

export const createUser = functions.https.onCall(async data => {
  const userSchema = Yup.object({
    email: Yup.string()
      .email('Por favor, digite um email válido')
      .required('Precisamos do email para permitir o cadastro'),
    password: Yup.string()
      .min(6, 'A quantidade mínima de caracteres para senha é 6')
      .required('Precisamos da senha para permitir o cadastro'),
    name: Yup.string().required('Gostaríamos de saber seu nome'),
    surname: Yup.string().required('Gostaríamos de saber seu sobrenome também'),
    school: Yup.string().required('Gostaríamos de saber o nome da sua escola'),
    birthDate: Yup.date().required('Gostaríamos de saber quando você nasceu'),
    gender: Yup.string()
      .oneOf(['male', 'female', 'other'])
      .required('Qual é seu gênero'),
  })

  try {
    userSchema.validateSync(data, {
      abortEarly: false,
    })

    const { email, password, name, surname, birthDate, school, gender } = data
    const user = await admin.auth().createUser({ email, password })

    await firestore.doc(`users/${user.uid}`).create({
      name,
      surname,
      birthDate,
      school,
      gender,
    })

    return {
      uid: user.uid,
    }
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'There were invalid arguments. See details for more information',
        error.inner
      )
    } else throw new functions.https.HttpsError('already-exists', error.message)
  }
})
