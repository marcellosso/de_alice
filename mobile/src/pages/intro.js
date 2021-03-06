
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


class intro extends Component {

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

    componentDidMount() {
        Animated.parallel([this.spinAnim(), this.positionAnim(), this.opacityAnim()]).start();
        // this.opacityAnim();
    }

    opacityAnim = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 700,
            delay: 10,
            useNativeDriver: true
        }).start()
    }

    positionAnim = () => {
        Animated.timing(this.state.position, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start()
    }

    spinAnim = () => {
        Animated.timing(this.state.rotate, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true
        }).start()
    }

    changeScreen = () => {
        this.props.navigation.navigate('Menu');
    }

    render() {
        const { opacity } = this.state;

        const btTranslate = this.state.position.interpolate({
            inputRange: [0, 1],
            outputRange: [200, 0]
        })

        const spin = this.state.rotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['90deg', '360deg']
        })

        return (
            <View style={styles.container}>
                <StatusBar hidden />


                <Animated.View style={[styles.bg, { opacity }]}>

                    <Image style={styles.bgImg} source={require('../images/flor.png')} />
                </Animated.View>

                <Animated.View style={{ opacity }}>
                    <Text style={styles.mainText}>De: Alice</Text>
                </Animated.View>

                <Animated.View style={{ transform: [{ translateY: btTranslate, rotate: spin }] }}>
                    <TouchableHighlight style={[styles.button, { marginTop: 50, zIndex: 3 }]} onPress={this.changeScreen}>
                        {/* <Text style={styles.buttonText}>></Text> */}
                        <Svg width="18" height="34" viewBox="0 0 18 34" fill="none" >
                            <Path d="M1 33L17 17L1 1" stroke="#F0EEEA" />
                        </Svg>

                    </TouchableHighlight>
                </Animated.View>

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
    mainText: {
        marginTop: 50,
        fontSize: 72,
        color: '#C62727',
        fontFamily: Platform.OS === 'ios' ? 'Dancing Script Regular' : 'DancingScript-Regular',
    },
    bgImg: {
        // position: 'absolute',
        zIndex: 1,
        height: '70%',
        marginTop: 50
    },
    button: {
        backgroundColor: 'rgba(198, 39, 39, 0.47)',
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginBottom: 50,
    },
    buttonText: {
        color: '#fff',
        fontSize: 24
    }
});

export default intro;