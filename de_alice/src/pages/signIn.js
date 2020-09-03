
import React, { Component } from 'react';
import {
    View,
    Image,
    TextInput,
    Text,
    TouchableHighlight,
    StyleSheet,
    StatusBar,
    Platform,
} from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Svg, { Path } from 'react-native-svg'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import PropTypes from 'prop-types';
import api from '../services/api';
// import axios from 'axios';


class signIn extends Component {

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            dispatch: PropTypes.func,
        }).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
        };
    }

    handleEmailChange = (email) => {
        this.setState({ email });
    };

    handlePasswordChange = (password) => {
        this.setState({ password });
    };

    handleBackPress = () => {
        this.props.navigation.navigate('Menu');
    };

    handleSignInPress = async () => {
        if (this.state.email.length === 0 || this.state.password.length === 0) {
            this.setState({ error: 'Preencha usuário e senha para continuar!' })
        } else {

            try {
                const response = await api.post('/authenticate', {
                    email: this.state.email,
                    password: this.state.password,
                });

                await AsyncStorage.setItem('@DeAliceApp:token', response.data.token);
                // await AsyncStorage.setItem('@DeAliceApp:user', response.data.user._id);
                await AsyncStorage.setItem('@DeAliceApp:onboard', JSON.stringify({ hasOnboarded: true }));

                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'SignedIn' }),
                    ],
                });

                this.props.navigation.dispatch(resetAction);
            } catch (e) {
                this.setState({ error: e.response.data.error });
            }

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden />

                <View style={styles.bg}>
                    <View style={styles.overlay}></View>
                    <Image style={styles.bgImg} source={require('../images/flor.png')} />
                    {/* <Image style={styles.bgImg} source={require('../images/logo.png')} /> */}
                </View>
                <Text style={styles.mainText}>De: Alice</Text>
                {this.state.error.length !== 0 && <Text style={styles.errorMessage}>{this.state.error}</Text>}
                <View style={styles.mainBg}>
                    <TouchableHighlight style={styles.backButton} onPress={this.handleBackPress}>


                        <Svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path fill-rule="evenodd" clip-rule="evenodd" 
                            d="M4.61624 9.02963L9.99807 14.6748L8.5505 16.0549L1.55749 8.71965L0.899658 8.02963L1.55749 
                            7.33961L8.5505 0.00439453L9.99807 1.38444L4.61625 7.02963L12.2713 7.02963C19.4615 7.02963 25.2593 
                            13.1815 25.2593 20.6043L25.2593 23.748L23.2593 23.748L23.2593 20.6043C23.2593 14.1949 18.2679 9.02963 
                            12.2713 9.02963H4.61624Z" fill="#eee" fill-opacity="0.8" />
                        </Svg>



                    </TouchableHighlight>
                    <Text style={{
                        // fontSize: 48,
                        fontSize: wp('11%'),
                        color: '#eee', 
                        // marginBottom: 50,
                        marginBottom: hp('6.3%'),
                        marginTop: hp('6.3%'), 
                        fontFamily: Platform.OS === 'ios' ? 'Roboto Medium' : 'Roboto-Medium',
                    }}>Login</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E-MAIL"
                        placeholderTextColor='#eee'
                        value={this.state.email}
                        onChangeText={this.handleEmailChange}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="SENHA"
                        placeholderTextColor='#eee'
                        value={this.state.password}
                        onChangeText={this.handlePasswordChange}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry
                    />
                    <TouchableHighlight style={[styles.button, { marginTop: hp('6.3%') }]} onPress={this.handleSignInPress}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableHighlight>
                </View>

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
        // marginTop: 100
        marginTop: hp('12.4%')
    },
    mainText: {
        // marginTop: 50,
        marginTop: hp('6.3%'),
        // fontSize: 72,
        fontSize: wp('16.6%'),
        color: '#C62727',
        zIndex: 3,
        fontFamily: Platform.OS === 'ios' ? 'Dancing Script Regular' : 'DancingScript-Regular',
    },
    mainBg: {
        backgroundColor: 'rgba(232, 107, 107, 0.4)',
        zIndex: 3,
        alignItems: 'center',
        // justifyContent: 'space-between',
        height: '53%',
        width: '80%',
        borderRadius: 24,
        // marginTop: 70,
        marginTop: hp('8.4%'),
    },
    input: {
        borderRadius: 5,
        borderBottomWidth: 2,
        // borderBottomColor: 'rgba(0, 0, 0, 0.28)',
        borderBottomColor: '#eee',
        alignSelf: 'stretch',
        marginBottom: 15,
        marginHorizontal: 20,
        fontSize: 20,
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
        fontFamily: Platform.OS === 'ios' ? 'Roboto Bold' : 'Roboto-Bold',
        zIndex: 3,
    },
    button: {
        padding: 17,
        borderRadius: 17,
        backgroundColor: '#C62727',
        alignSelf: 'stretch',
        margin: 15,
        marginHorizontal: 20,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
    },
    backButton: {
        position: 'absolute',
        left: 18,
        top: 15,
    }
});

export default signIn;