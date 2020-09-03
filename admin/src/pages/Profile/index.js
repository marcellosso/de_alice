import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiEdit } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logoAlice.svg';

export default function Profile() {

    

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem Vinda, Alice & Ale </span>

                <Link className="button firstButton" to="/categorias">Editar categorias</Link>
                <Link className="button" to="/tecidos">Editar tecidos</Link>

                <button type="button">
                    <FiPower size={18} color="#fcb8cf" />
                </button>
            </header>

            <div className="valorDiv">
                <h2 className="valortotal">Valor total: R$ 20.000</h2>
            </div>

            {/* <h1>Casos cadastrados</h1> */}

            <div className="pedidos">
                <div className="pedidoAberto">
                    <h1>Pedidos Abertos</h1>
                    <Link to="/pedidos">
                        <ul>
                            <li>
                                <strong>CLIENTE:</strong>
                                <p>Thamyres Sobral Siqueira</p>

                                <strong>PEDIDO:</strong>
                                <p>Modelo(s): Nanão</p>
                                <p>Quantidade: 2</p>
                                <p>Tecido(s): Poá vermelha, Batman</p>

                                <strong>VALOR: </strong>
                                <p>R$ 100.00</p>

                                <strong>STATUS: </strong>
                                <p>Em Aberto</p>

                                <strong>OBSERVAÇÃO: </strong>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, delectus.</p>

                                <button type="button">
                                    <FiEdit size={20} color="#a8a8b3" />
                                </button>
                            </li>
                        </ul>
                    </Link>
                </div>
                <div className="pedidoAndamento">
                    <h1>Pedidos Andamento</h1>
                    <Link to="/pedidos">
                        <ul>
                            <li>
                                <strong>CLIENTE:</strong>
                                <p>Marcel Losso Forte</p>

                                <strong>PEDIDO:</strong>
                                <p>Modelo(s): Máscara Tradicional</p>
                                <p>Quantidade: 1</p>
                                <p>Tecido(s): Minecraft</p>

                                <strong>VALOR: </strong>
                                <p>R$ 8,00 </p>

                                <strong>STATUS: </strong>
                                <p>Em Andamento</p>

                                <strong>OBSERVAÇÃO: </strong>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, delectus.</p>

                                <button type="button">
                                    <FiEdit size={20} color="#a8a8b3" />
                                </button>
                            </li>
                        </ul>
                    </Link>
                </div>
                <div className="pedidoConcluido">
                    <h1>Pedidos Concluídos</h1>
                    <Link to="/pedidos">
                        <ul>
                            <li>
                                <strong>CLIENTE:</strong>
                                <p>Thata</p>

                                <strong>PEDIDO:</strong>
                                <p>Modelo(s): Máscara 3D</p>
                                <p>Quantidade: 10</p>
                                <p>Tecido(s): Batman, Superman, Xadrez Branco, Liso Preto, Africana 1, Frutos do mar, Bailarina Rosa, Sereia Azul, Olho Grego, Minecraft</p>

                                <strong>VALOR: </strong>
                                <p>R$ 130,00 </p>

                                <strong>STATUS: </strong>
                                <p>Concluído</p>

                                <strong>OBSERVAÇÃO: </strong>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, delectus.</p>

                                <button type="button">
                                    <FiEdit size={20} color="#a8a8b3" />
                                </button>
                            </li>
                        </ul>
                    </Link>
                </div>
            </div>
        </div>
    );
}