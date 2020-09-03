import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiEdit } from 'react-icons/fi'

import './styles.css';

import logoImg from '../../assets/logoAlice.svg';

import tecidoBicho from '../../assets/bichopreguica.jpg';
import tecidoBatman from '../../assets/batman.jpeg';
import tecidoSuperman from '../../assets/superman.jpg';
import tecidoAzul from '../../assets/lisoazul.png';
import rosto from '../../assets/rosto.png';


export default function Pedidos() {

    const [isEditing, setEditing] = useState(false);
    const [status, setStatus] = useState('Em Aberto');

    function handleEditingChange() {
        setEditing(!isEditing);
    }

    function handleStatusChange(e) {
        setStatus(e.target.value);
    }

    return (
        <div className="pedidos-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Pedido - Thamyres Sobral Siqueira </span>

                <Link to="/profile">
                    <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                </Link>
            </header>

            {/* <h1>STATUS: EM ABERTO</h1> */}
            <div className="status">
                <h1>STATUS:</h1>
                {isEditing ? 
                    <select value={status} onChange={handleStatusChange}>
                        <option value="Em Aberto">Em Aberto</option>
                        <option value="Em Andamento">Em Andamento</option>
                        <option value="Concluído">Concluído</option>
                    </select>
                 :  
                    <h1>{status}</h1>
                }
                <button type="button" onClick={handleEditingChange}>
                    <FiEdit size={20} color="#a8a8b3" />
                </button>
            </div>

            <h1 style={{ marginTop: 0 }}>VALOR: R$ 300,00</h1>
            <h1 style={{ marginTop: 10, fontWeight: 400, fontSize: 18 }}>PARA ENTREGAR</h1>
            <h1 style={{ marginTop: 10, fontWeight: 400, fontSize: 18 }}>CARTÃO</h1>
            <h1 style={{ marginTop: 10, fontWeight: 400, fontSize: 18 }}>18/07/2020</h1>

            <div className="endereco">
                <h2>Av. Conselheiro Rodrigues Alves, 470</h2>
                <h2>Macuco - Santos, SP</h2>
            </div>

            <div className="content">
                <div>
                    <h2>Máscara Tradicional</h2>
                    <img src={tecidoBicho} alt="" />
                    <h4>Quantidade: 2</h4>
                    <h4>Adaptador Nasal: Sim</h4>
                    <h4>Tamanho: P</h4>
                    <img src={rosto} alt="Tam. Rosto" className="rosto" />
                </div>
                <div>
                    <h2>Máscara 3D</h2>
                    <img src={tecidoBatman} alt="" />
                    <h4>Quantidade: 1</h4>
                    <h4>Tamanho: G</h4>
                    <img src={rosto} alt="Tam. Rosto" className="rosto" />
                </div>
                <div>
                    <h2>Naninha</h2>
                    <img src={tecidoAzul} alt="" />
                    <h3>Corpo</h3>
                    <img src={tecidoAzul} alt="" />
                    <h3>Braços e Pernas</h3>
                    <img src={tecidoSuperman} alt="" />
                    <h3>Orelhas</h3>
                    <img src={tecidoSuperman} alt="" />
                    <h3>Roupa</h3>
                    <h4>Quantidade: 1</h4>
                    <h4>Rosto: Sorrindo</h4>
                    <h4>Aroma: Camomila</h4>
                </div>

            </div>
        </div>
    );
}