import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

export const isSignedIn = async () => {
    const token = await AsyncStorage.getItem('@DeAliceApp:token');
    

    return (token !== null) ? true : false;
}