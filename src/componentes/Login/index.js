import React, { Component } from 'react';
import { Form, Input, Button, Container } from "reactstrap";

export default class Login extends Component {

    logar = (evento) => {
        evento.preventDefault();

        const form = evento.target
        const input = form.children[0]

        this.props.history.push(`/home/${input.value}`)  //coloca na barra de navegação o caminho novo com o nome que o usuario digitar 
        //o history guarda a navegação em um historico, que é um array
    }

    render() {
        return (
            <Container className="h-100">
                <Form
                    className="h-100 d-flex flex-column align-items-center justify-content-center"
                    onSubmit={this.logar}
                >
                    <Input
                        className="text-center mt-2"
                        placeholder="Digite seu e-mail"
                    />
                    <Button className="w-100" color="dark">
                        Logar
        </Button>
                </Form>
            </Container>
        )
    }
}
