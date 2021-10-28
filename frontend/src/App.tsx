import React, {useState} from 'react';
import './App.css';
import Login from './pages/Login';
import Nav from './components/Nav';
import Home from './pages/Home';
import {BrowserRouter, Route} from "react-router-dom";
import RequestRegister from './components/RequestReg';
import RequestFollow from './components/RequestFollow';

function App() {
  const [redirect, setRedirect] = useState(false)

  return (
    <div className="App">
      <BrowserRouter>
        <Nav redirect={redirect} setRedirect={setRedirect} />

        <main className="form-signin">
            <Route exact path="/" component={() => <Home />} />
            <Route path="/login" component={() => <Login setRedirect={setRedirect} />} />
            <Route path="/create" component={() => <RequestRegister />} />
            <Route path="/follow" component={() => <RequestFollow />} />
        </main>

      </BrowserRouter>
    </div>
  );
}

export default App;
