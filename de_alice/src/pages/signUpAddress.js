import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    TextInput,
    TouchableHighlight
} from 'react-native';

import api from '../services/api';
import { StackActions, NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

class signUpAddress extends Component {

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            dispatch: PropTypes.func,
            goBack: PropTypes.func,
        }).isRequired,
    };


    constructor(props) {
        super(props);
        this.state = {
            logradouro: '',
            complemento: '',
            bairro: '',
            estado: '',
            cidade: '',
            cep: '',
            error: '',
            success: ''
        };
    };

    handleLogradouroChange = (logradouro) => {
        this.setState({ logradouro });
    };

    handleComplementoChange = (complemento) => {
        this.setState({ complemento });
    };

    handleBairroChange = (bairro) => {
        this.setState({ bairro });
    };

    handleEstadoChange = (estado) => {
        this.setState({ estado });
    };

    handleCidadeChange = (cidade) => {
        this.setState({ cidade });
    };

    handleCepChange = (cep) => {
        this.setState({ cep });
    };

    handleBackToSignUpPress = () => {
        this.props.navigation.goBack();
    };


    handleDonePress = async () => {
        // let validacep = /^[0-9]{8}$$/;

        if (this.state.logradouro.length === 0 || this.state.complemento.length === 0 ||
            this.state.bairro.length === 0 || this.state.estado.length === 0 ||
            this.state.cidade.length === 0 || this.state.cep.length === 0) {
            this.setState({ error: 'Preencha todos os campos para continuar!' }, () => false);
        } else {
            try {
                await api.post('/address', {
                    logradouro: this.state.logradouro,
                    complemento: this.state.complemento,
                    bairro: this.state.bairro,
                    estado: this.state.estado,
                    cidade: this.state.cidade,
                    cep: this.state.cep,
                });

                this.setState({ success: 'Endereço cadastrado com sucesso! Redirecionando para o login', error: '' });

                setTimeout(this.goToLogin, 2500);
            } catch (e) {
                this.setState({ error: e.response.data.error });
            }
        }
    };

    handleSearchPress = async () => {
        let cep = this.state.cep.replace(/[^0-9]/g, "");
        
        const apiURL = `https://viacep.com.br/ws/${cep}/json`

        console.log(apiURL);
        try {
            const res = await fetch(apiURL);
            const json = await res.json();

            this.setState({ logradouro: json.logradouro, estado: json.uf, cidade: json.localidade, 
                            bairro: json.bairro });
        } catch(e) {
            console.log(e);
        }
        //alert(res);
        
    }

    handleSkipPress = () => {
        this.goToLogin();
    }

    goToLogin = () => {
        // const resetAction = StackActions.reset({
        //     index: 0,
        //     actions: [
        //         NavigationActions.navigate({ routeName: 'SignIn' }),
        //     ],
        // });
        // this.props.navigation.dispatch(resetAction);
        this.props.navigation.navigate('SignIn');
    }

    render() {

        return (
            <View style={styles.container}>
                <StatusBar hidden />

                <View style={styles.bg}>
                    <View style={styles.overlay}></View>
                    <Image style={styles.bgImg} source={require('../images/flor.png')} />
                </View>

                <Text style={styles.mainText}>De: Alice</Text>

                {this.state.success.length !== 0 && <Text style={styles.successMessage}>{this.state.success}</Text>}

                <View style={styles.mainBg}>
                    <TouchableHighlight style={styles.backButton} onPress={this.handleBackToSignUpPress(params.email)} underlayColor="rgba(0, 0,0,0)">


                        <Svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path fill-rule="evenodd" clip-rule="evenodd"
                                d="M4.61624 9.02963L9.99807 14.6748L8.5505 16.0549L1.55749 8.71965L0.899658 8.02963L1.55749 
                            7.33961L8.5505 0.00439453L9.99807 1.38444L4.61625 7.02963L12.2713 7.02963C19.4615 7.02963 25.2593 
                            13.1815 25.2593 20.6043L25.2593 23.748L23.2593 23.748L23.2593 20.6043C23.2593 14.1949 18.2679 9.02963 
                            12.2713 9.02963H4.61624Z" fill="#eee" fill-opacity="0.8" />
                        </Svg>



                    </TouchableHighlight>
                    <Text style={{
                        fontSize: 36,
                        color: '#eee', marginBottom: 15,
                        marginTop: 50, fontFamily: Platform.OS === 'ios' ? 'Roboto Medium' : 'Roboto-Medium',
                    }}>Endereço</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={[styles.input, { alignSelf: 'flex-start', width: '80%', marginRight: 15 }]}
                            placeholder="CEP"
                            placeholderTextColor='rgba(238, 238, 238, 0.5)'
                            value={this.state.cep}
                            onChangeText={this.handleCepChange}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                        />
                        <TouchableHighlight onPress={this.handleSearchPress} underlayColor="rgba(0, 0,0,0)">
                            <Icon name="search" size={20} color="#eee" style={{ marginRight: 15 }} />
                        </TouchableHighlight>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="ESTADO"
                        placeholderTextColor='rgba(238, 238, 238, 0.5)'
                        value={this.state.estado}
                        onChangeText={this.handleEstadoChange}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="CIDADE"
                        placeholderTextColor='rgba(238, 238, 238, 0.5)'
                        value={this.state.cidade}
                        onChangeText={this.handleCidadeChange}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="BAIRRO"
                        placeholderTextColor='rgba(238, 238, 238, 0.5)'
                        value={this.state.bairro}
                        onChangeText={this.handleBairroChange}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="RUA"
                        placeholderTextColor='rgba(238, 238, 238, 0.5)'
                        value={this.state.logradouro}
                        onChangeText={this.handleLogradouroChange}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="COMPLEMENTO"
                        placeholderTextColor='rgba(238, 238, 238, 0.5)'
                        value={this.state.complemento}
                        onChangeText={this.handleComplementoChange}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <TouchableHighlight style={[styles.button, { marginTop: 10 }]} onPress={this.handleDonePress}>
                        <Text style={styles.buttonText}>Criar Conta</Text>
                    </TouchableHighlight>
                </View>

                {this.state.error.length !== 0 && <Text style={styles.errorMessage}>{this.state.error}</Text>}



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'space-between',
        backgroundColor: '#FEE2B3',
    },
    bg: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundColor: 'rgb(254, 226, 179)',
        opacity: 0.4,
        zIndex: 2,
    },
    bgImg: {
        // position: 'absolute',
        zIndex: 1,
        height: '80%',
        marginTop: 100
    },
    mainText: {
        marginTop: 50,
        fontSize: 72,
        color: '#C62727',
        zIndex: 3,
        fontFamily: Platform.OS === 'ios' ? 'Dancing Script Regular' : 'DancingScript-Regular',
    },
    mainBg: {
        backgroundColor: 'rgba(232, 107, 107, 0.4)',
        zIndex: 3,
        alignItems: 'center',
        // justifyContent: 'space-between',
        height: '70%',
        width: '80%',
        borderRadius: 24,
        marginTop: 50,
    },
    input: {
        borderRadius: 5,
        borderBottomWidth: 2,
        // borderBottomColor: 'rgba(0, 0, 0, 0.28)',
        borderBottomColor: '#eee',
        alignSelf: 'stretch',
        marginBottom: 15,
        marginHorizontal: 20,
        fontSize: 18,
        // fontWeight: '900',
        fontFamily: Platform.OS === 'ios' ? 'Roboto Black' : 'Roboto-Black',
        color: '#eee'
    },
    errorMessage: {
        textAlign: 'center',
        color: '#ce2029',
        fontSize: 18,
        // marginBottom: 15,
        marginHorizontal: 20,
        zIndex: 3,
        fontFamily: Platform.OS === 'ios' ? 'Roboto Bold' : 'Roboto-Bold',
    },
    button: {
        padding: 10,
        borderRadius: 17,
        backgroundColor: '#C62727',
        alignSelf: 'stretch',
        margin: 15,
        marginTop: 0,
        marginBottom: 10,
        zIndex: 3,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    backButton: {
        position: 'absolute',
        left: 18,
        top: 15,
    },
    successMessage: {
        textAlign: 'center',
        color: '#08a092',
        fontSize: 16,
        marginBottom: 15,
        marginHorizontal: 20,
        zIndex: 3,
    },

})

export default signUpAddress;
