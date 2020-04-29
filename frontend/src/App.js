import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import GlobalStyle from './styles/global'

import useAuth from './hooks/useAuth'

import Index from './pages/Index'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

import Home from './pages/Home'

export default function App() {
  const { user, pending } = useAuth()

  return (
    <>
      <Router>
        <Switch>
          <Route path="/home">
            {!pending && !user ? <Redirect to="/" /> : <Home />}
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

      <GlobalStyle />
    </>
  )
}
