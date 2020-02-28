import React, { Component } from 'react';
import {
    Navbar, Input, Button, InputGroup, InputGroupAddon, Container, Col, Row, Spinner, Form
}
    from 'reactstrap'
import { MdSearch, MdStar } from 'react-icons/md';
import axios from 'axios';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';

import { Link } from 'react-router-dom';


class Home extends Component {
    state = {
        carregando: false,
        meteoro: []
    } //esse é o estado inicial

    buscarMeteoros = async (evento) => {
        evento.preventDefault()  //para não carregar a pagina

        this.setState({ carregando: true })

        //usa target para pegar o formulario
        const form = evento.target
        const inputGroup = form.children[0]
        const input = inputGroup.children[0]

        // const seguidores = await axios(`https://api.github.com/users/${input.value}/followers`)
        const meteoro = await axios(`https://api.nasa.gov/planetary/apod?date=${input.value}&api_key=1g4VNGCls0bLaxg73q6n9jJ2lhjNxSO8hxYtSq6X`)


        //também é possíivel desestruturar o cod para pegar só a informação que queremos-> const {data: seguidores} = await ...

        this.setState({ meteoro: [meteoro.data, ...this.state.meteoro], carregando: false }) //mudar o meteoro.data para um array, se não ele sobrescreve o state e transforma o array em objeto, com objeto o map não funciona
    }

    render() {
        return (
            <>
                {/* Nav com nome que o usuário digita no login */}
                <Navbar color="dark">
                    <Container className="d-flex justify-content-center">

                        <img
                            className=" rounded-circle border border-white mr-3"
                            width="50"
                            src='https://www.thispersondoesnotexist.com/image' alt="foto do usuário"
                        />

                        <span className="text-white">
                            Logado como
                            <Link className="text-white font-weight-bold" to="/"> {/* o to="" fala para onde esse link levará */} 
                            {this.props.match.params.usuario} {/* params.usuario - mostra qual parametro será buscado */}
                            </Link>
                        </span>

                    </Container>
                </Navbar>

                {/* Campo de menu para usuario inserir data */}
                <Navbar color="dark" fixed="bottom">
                    <Container className="d-flex justify-content-center">
                        <Col xs="12" md="6">
                            <Form onSubmit={this.buscarMeteoros}>
                                <InputGroup>
                                    <Input type="date" />
                                    <InputGroupAddon addonType="append">
                                        <Button color="danger">
                                            {this.state.carregando ? (<Spinner color="light" />) : (<MdSearch size="20" />)}
                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Form>
                        </Col>
                    </Container>
                </Navbar>

                {/* Fazer spinner carregando na tela quando está carregando os outros cards */}

                {/* { this.state.carregando && (<Container className="h-100 d-flex flex-column justify-content-center align-items-center"> 
                <Spinner color="dark" size="lg"/>
                    <span>Carregando...</span>
                </Container>) } */}


                {this.state.carregando ? (
                    <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
                        <Spinner color="dark" size="lg" />
                        <span>Carregando...</span>
                    </Container>
                ) : (
                        /* //fazer o card para imprimir na tela */
                        <Container className="mt-3 mb-5">
                            <Row>
                                {this.state.meteoro.map((meteoro) => (
                                    <Col md='4' xs='12' className='d-flex'>
                                        <Card className='text-white' color='dark'>
                                            <CardImg top width="100%" height="30%" src={meteoro.url} alt={meteoro.tittle} />
                                            <CardBody>
                                                <CardTitle className='h2 text center'>{meteoro.title}</CardTitle>
                                                <CardSubtitle className='text-muted text-center'>{meteoro.date.split('-').reverse().join('/')}</CardSubtitle>
                                                <CardText className='text-justify'>{meteoro.explanation}</CardText>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    )}

                {/* Para colocar uma mensagem na tela caso usuario ainda não tenha colocado uma data */}
                {this.state.meteoro.length === 0 && (<Container className="h-100 d-flex flex-column justify-content-center align-items-center">
                    {/*  <MdStar color="#000" size="150"/> */}
                    <span> Digite uma data e descubra o meteoro do dia </span>
                </Container>
                )}
            </>
        )
    }
}

export default Home;