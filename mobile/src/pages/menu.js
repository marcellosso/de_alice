
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
    Animated,
    Easing
} from 'react-native';

import Svg, { Path } from 'react-native-svg'
import PropTypes from 'prop-types';
import { isSignedIn } from '../services/auth';


class menu extends Component {

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
        }).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            opacity: new Animated.Value(0),
            position: new Animated.Value(0),
            rotate: new Animated.Value(0)
        };
    }

    // componentDidMount() {
    //     Animated.parallel([this.spinAnim(), this.positionAnim(), this.opacityAnim()]).start();
    //     // this.opacityAnim();
    // }

    // opacityAnim = () => {
    //     Animated.timing(this.state.opacity, {
    //         toValue: 1,
    //         duration: 700,
    //         delay: 10,
    //         useNativeDriver: true
    //     }).start()
    // }

    // positionAnim = () => {
    //     Animated.timing(this.state.position, {
    //         toValue: 1,
    //         duration: 1000,
    //         easing: Easing.linear,
    //         useNativeDriver: true
    //     }).start()
    // }

    // spinAnim = () => {
    //     Animated.timing(this.state.rotate, {
    //         toValue: 1,
    //         duration: 1500,
    //         easing: Easing.linear,
    //         useNativeDriver: true
    //     }).start()
    // }

    changeScreenSignIn = () => {
        this.props.navigation.navigate('SignIn');
    }

    changeScreenSignUp = () => {
        this.props.navigation.navigate('SignUp');
    }

    render() {
        // const { opacity } = this.state;

        // const btTranslate = this.state.position.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [200, 0]
        // })

        // const spin = this.state.rotate.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: ['90deg', '360deg']
        // })

        return (
            <View style={styles.container}>
                <StatusBar hidden />


                <View style={styles.bg}>
                    <View style={styles.overlay}></View>
                    <Image style={styles.bgImg} source={require('../images/flor.png')} />
                </View>

                <Text style={styles.mainText}>De: Alice</Text>

                <View style={{ flexDirection: 'row', width: '80%', marginBottom: 100 }}>
                    <View style={{ width: '50%', alignItems: 'center' }}>
                        <TouchableHighlight style={styles.button} onPress={this.changeScreenSignUp}>
                            <Text style={styles.buttonText}>Cadastrar-se</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{ width: '50%', alignItems: 'center'  }}>
                        <TouchableHighlight style={styles.button} onPress={this.changeScreenSignIn}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableHighlight>
                    </View>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
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
    mainText: {
        marginTop: 50,
        fontSize: 72,
        color: '#C62727',
        fontFamily: Platform.OS === 'ios' ? 'Dancing Script Regular' : 'DancingScript-Regular',
        zIndex: 3
    },
    bgImg: {
        // position: 'absolute',
        zIndex: 1,
        height: '70%',
        marginTop: 50
    },
    button: {
        paddingVertical: 17,
        paddingHorizontal: 0,
        width: '85%',
        borderRadius: 50,
        backgroundColor: '#C62727',
        // margin: 15,
        // marginHorizontal: 20,
        zIndex: 3,
        elevation: 12,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default menu;