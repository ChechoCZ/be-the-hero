import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import logo from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import './styles.css';

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogon(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem('ngoId', id);
      localStorage.setItem('ngoName', response.data.name);

      history.push('/incidents');
    } catch (error) {
      alert('Login failed! Please, try again');
    }    
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={ logo } alt="Heroes"/>

        <form onSubmit={ handleLogon }>
          <h1>Login</h1>

          <input 
            placeholder="Your ID"
            value={ id }
            onChange={ e => setId(e.target.value) } />

          <button className="button" type="submit">Log in</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={ 16 } color="#e02041" />
            I don't have account
          </Link>
        </form>

      </section>

      <img src={ heroesImg } alt="Heroes"/>
    </div>
  );
}
