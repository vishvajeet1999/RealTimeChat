import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './components/Home';
import Account from './components/Account';
import Cards from './components/Cards';
import Signup from './components/Signup';
import Signin from './components/Signin'
import Count from './components/Count';
import RevisedProtectedRoute from './protection/RevisedProtectedRoute';
import SigninRedirect from './protection/SigninRedirect';
import SignupRedirect from './protection/SignupRedirect';

function App() {
  const [auth, setAuth] = useState(true)
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RevisedProtectedRoute>
                <Home />
              </RevisedProtectedRoute>
            }
          />
          <Route
            path="/cards"
            element={
              <RevisedProtectedRoute>
                <Cards />
              </RevisedProtectedRoute>
            }
          />
          <Route path='/signin' element={<SigninRedirect>
            <Signin />
          </SigninRedirect>} />
          <Route path='/signup' element={<SignupRedirect>
            <Signup />
          </SignupRedirect>} />
          <React.Fragment>

            <Route
              path="/account"
              element={
                <RevisedProtectedRoute>
                  <Account />
                </RevisedProtectedRoute>
              }
            />
          </React.Fragment>



        </Routes>
      </Router>
    </div>
  );
}

export default App;
