import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

import './styles.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try {
      const response = await api.post('ngos', data);

      alert(`Your access ID ${response.data.id}`);

      history.push('/');
    } catch (error) {
      alert('Error during registering, please try again.');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={ logo } alt="Logo"/>

          <h1>Register</h1>
          <p>Register, log into the platform and help people find your NGO's cases.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={ 16 } color="#e02041" />
            I already have account
          </Link>
        </section>

        <form onSubmit={ handleRegister }>
          <input 
            placeholder="NGO's name" 
            value={ name }
            onChange={ e => setName(e.target.value) } />
          <input 
            type="email" 
            placeholder="E-mail" 
            value={ email }
            onChange={ e => setEmail(e.target.value) } />
          <input 
            placeholder="Whatsapp" 
            value={ whatsapp }
            onChange={ e => setWhatsapp(e.target.value) } />

          <div className="input-group">
            <input 
              placeholder="City" 
              value={ city }
              onChange={ e => setCity(e.target.value) } />
            <input 
              placeholder="UF" 
              value={ uf } 
              style={ { width: 80 } }
              onChange={ e => setUf(e.target.value) } />
          </div>
          
          <button type="submit" className="button">Register</button>
        </form>
      </div>
    </div>
  );
}
