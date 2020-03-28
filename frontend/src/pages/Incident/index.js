import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

import './styles.css';

export default function Incident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const ngoId = localStorage.getItem('ngoId');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ngoId
        }
      });

      history.push('/incidents');
    } catch (error) {
      alert('Error during creation of new incident. Please try again');
    }
  }

  return (
    <div className="incident-container">
      <div className="content">
        <section>
          <img src={ logo } alt="Logo"/>

          <h1>Register new case</h1>
          <p>Provide detailed description of the incident in order to find a hero.</p>

          <Link className="back-link" to="/incidents">
            <FiArrowLeft size={ 16 } color="#e02041" />
            Go back
          </Link>
        </section>

        <form onSubmit={ handleNewIncident }>
          <input 
            placeholder="Incident's title"
            value={ title }
            onChange={ e => setTitle(e.target.value) }
          />
          <textarea 
            placeholder="Description"
            value={ description }
            onChange={ e => setDescription(e.target.value) }
          />
          <input 
            placeholder="Total cost $"
            value={ value }
            onChange={ e => setValue(e.target.value) }
          />

          <button type="submit" className="button">Register</button>
        </form>
      </div>
    </div>
  );
}
