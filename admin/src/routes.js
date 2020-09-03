import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Profile from './pages/Profile';
import Tecidos from './pages/Tecidos';
import Pedidos from './pages/Pedidos';
import Categorias from './pages/Categorias';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/profile" component={Profile} />
                <Route path="/tecidos" component={Tecidos} />
                <Route path="/categorias" component={Categorias} />
                <Route path="/pedidos" component={Pedidos} />
            </Switch>
        </BrowserRouter>
    );
}