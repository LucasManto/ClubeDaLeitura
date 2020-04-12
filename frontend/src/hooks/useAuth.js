import { useState, useEffect } from 'react'
import firebase from '../services/Firebase'

export default function useAuth() {
  const [authState, setAuthState] = useState({
    isSignedIn: false,
    pending: true,
    user: null,
  })

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user =>
        setAuthState({ user, pending: false, isSignedIn: !!user })
      )

    return () => unregisterAuthObserver()
  }, [])

  return { auth: firebase.auth, ...authState }
}
