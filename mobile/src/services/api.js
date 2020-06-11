import axios from 'axios';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

const api = axios.create({
    baseURL: 'http://10.0.2.2:3000',
    // baseURL: 'http://189.34.184.241:3000',
});

api.interceptors.request.use(async (config) => {
    try {
        const token = await AsyncStorage.getItem('@DeAliceApp:token');

        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    } catch (e) {
        alert(e);
    }
})

export default api;