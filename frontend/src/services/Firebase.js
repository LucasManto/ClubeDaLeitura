import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/functions'
import 'firebase/firestore'
import 'firebase/storage'

import firebaseConfig from '../config/firebaseConfig'

firebase.initializeApp(firebaseConfig)

if (process.env.NODE_ENV === 'development') {
  firebase.functions().useFunctionsEmulator('http://localhost:5000')
}

export default firebase
