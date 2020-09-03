import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Alert,
    FlatList
} from 'react-native';
;
import AsyncStorage from '@react-native-community/async-storage'

import { StackActions, NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import api from '../services/api';

class main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        };
    }

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            dispatch: PropTypes.func,
        }).isRequired,
    };

    UNSAFE_componentWillMount = async () => {

        try {
            const response = await api.get('/user');

            this.setState({ username: response.data.user.name });
        } catch (e){
            Alert.alert(e.response.data.error)
        }

    }

    handleSignOutPress = async () => {

        try {
            await AsyncStorage.removeItem('@DeAliceApp:token');
            // await AsyncStorage.removeItem('@DeAliceApp:user');

            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'SignedOut' }),
                ],
            });

            this.props.navigation.dispatch(resetAction);
        } catch (e) {
            Alert.alert(e);
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.button} onPress={this.handleSignOutPress}>
                    <Text style={styles.buttonText}>Sair</Text>
                </TouchableHighlight>
                <Text>{this.state.username}</Text>
               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5'
    },
    button: {
        padding: 20,
        borderRadius: 5,
        backgroundColor: '#FC6663',
        alignSelf: 'stretch',
        margin: 15,
        marginHorizontal: 20,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});
export default main;
