import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Register } from '../pages/Register';
import { Login } from '../pages/Login';
import { Bye } from '../pages/Bye';
import { Header } from '../components/Header';
import { PrivateRoute } from './PrivateRoute';

export function RoutesComp () {

  return (
    <Router>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Header />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/bye" Component={
          () => <PrivateRoute>
            <Bye />
          </PrivateRoute>
        } />
      </Routes>
      </div>
    </Router>
  )
}


