import React, { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import firebase from './services/Firebase'

import Index from './pages/Index'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

import Home from './pages/Home'

export default function App() {
  const [user, setUser] = useState(null)

  firebase.auth().onAuthStateChanged(currentUser => {
    setUser(currentUser)
  })

  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Home setUser={setUser} />
        </Route>
        <Route path="/signin">
          {user ? <Redirect to="/home" /> : <SignIn />}
        </Route>
        <Route path="/signup">
          {user ? <Redirect to="/home" /> : <SignUp />}
        </Route>
        <Route path="/">{user ? <Redirect to="/home" /> : <Index />}</Route>
      </Switch>
    </Router>
  )
}
