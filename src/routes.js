import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './componentes/Home'
import Login from './componentes/Login'

export default class Routes extends Component {
  render() {
    return (

        /* Passar rotas para mudar de página pela barra */
        <BrowserRouter>
            <Switch> {/* Switch para fazer troca */}
                <Route path="/" exact component={Login}/>
                <Route path="/home/:usuario" component={Home} /> {/* usa : para colocar algo dentro da rota */}
            </Switch>
        </BrowserRouter>
    );
  }
}
