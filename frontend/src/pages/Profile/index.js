import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        });
    }, [ongId])

    async function handleDeleteIncident(id) {
        try {
            await (await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            }));
            setIncidents(incidents.filter(incident => incident.id !== id));

        } catch (error) {
            alert('erro ao deletar caso, tente novamente. ' + error)
        }
    }

    function handleLogOut() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the hero" />
                <span>Bem vindo, {ongName}</span>

                <Link to="/incidents/new" className="button"> Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogOut}>
                    <FiPower size={18} color="#e02141" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong> Descrição: </strong>
                        <p>{incident.description}</p>

                        <strong>Valor: </strong>
                        <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}
                        </p>
                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash color="#a8a8b3" size={18} />
                        </button>
                    </li>
                ))}

            </ul>
        </div>
    );
}