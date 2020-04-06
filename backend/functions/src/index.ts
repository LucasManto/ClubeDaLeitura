import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '../.env.test' : '../.env',
})

import * as Yup from 'yup'

const serviceAccount = require(functions.config().credentialsPath ||
  process.env.CREDENTIALS_PATH ||
  '../clube-da-leitura-firebase-adminsdk-xcevm-318feb14f3.json')

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: functions.config().databaseURL || process.env.DATABASE_URL,
  storageBucket: functions.config().storageBucket || process.env.STORAGE_BUCKET,
})
const firestore = app.firestore()

export const createUser = functions.https.onCall(async (data) => {
  const userSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    name: Yup.string().required(),
    surname: Yup.string().required(),
    birthDate: Yup.date().required(),
    school: Yup.string().required(),
    gender: Yup.string().oneOf(['male', 'female', 'other']).required(),
  })

  try {
    userSchema.validateSync(data)

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
        error.errors
      )
    } else throw new functions.https.HttpsError('already-exists', error.message)
  }
})
