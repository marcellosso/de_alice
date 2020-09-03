import React from 'react';

import './styles.css';

import aliceImg from '../../assets/main.svg';
import logoImg from '../../assets/logoAlice.svg';

export default function Logon() {
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="De: Alice - feita com muito amor"/>

                <form>
                    <h1>Faça seu login</h1>

                    <input placeholder="Sua ID" />
                    <button className="button" type="submit">Entrar</button>
                </form>
            </section>

            <img src={aliceImg} alt="Alice" />
        </div>
    );
}