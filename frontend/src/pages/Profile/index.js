import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

import './styles.css';

export default function Profile() {
  const history = useHistory();

  const [incidents, setIncidents] = useState([]);
  const ngoId = localStorage.getItem('ngoId');
  const ngoName = localStorage.getItem('ngoName');

  useEffect(() => {
    api.get('/profile', {
      headers: {
        Authorization: ngoId
      }
    }).then(response => {
      setIncidents(response.data);
    });
  }, [ngoId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ngoId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert('Error occurred during incident deletion');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="incident-list-container">
      <header>
        <img src={ logo } alt="Logo"/>
        <span>Welcome, { ngoName }</span>
      
        <Link className="button" to="/incidents/new">Register new incident</Link>
        <button type="button" onClick={ handleLogout }>
          <FiPower size={ 18 } color="#e02041" />
        </button>
      </header>

      <h1>Registered incidents</h1>

      <ul>
        { incidents.map(incident => (
          <li key={ incident.id }>
            <strong>Incident:</strong>
            <p>{ incident.title }</p>

            <strong>Description</strong>
            <p>{ incident.description }</p>

            <strong>Cost</strong>
            <p>{ Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(incident.value) }</p>

            <button type="button" onClick={ () => handleDeleteIncident(incident.id) }>
              <FiTrash2 size={ 20 } color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
