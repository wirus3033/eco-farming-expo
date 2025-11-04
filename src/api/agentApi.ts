import DeviceInfo from 'react-native-device-info';
import { BASE_URL, DB_NAME, FORGOT_PASSWORD_V3, LOGIN_END_POINT_V3 } from '../service/endPoint';
import axios from '../service/axios';
import { getData, storeData } from '../helpers/AsyncStorage';
import { BDD_Local } from '../constants/BaseLocal';

export interface AxiosRequestResponse {
    data: any
    messages: string
    status_code: number
}

const connexionWithOffline = async (email: string, password: string, imei: string) => {
    const currentUser = await getData('currentUser');
    if (currentUser) {
        const userData = JSON.parse(currentUser);
        console.log(userData);

        if (userData.email === email && userData.password === password && userData.imei === imei) {
            // return true;
            return { data: [], messages: 'Connection OK', status_code: 200 };
        } else {
            return {
                data: [],
                messages: 'Incorrect login or password',
                status_code: 902,
            };
        }
    } else {
        const infoCurrentUser = {
            email: 'contact@devsoft-pro.com',
            password: 'devsoft',
            imei: imei,
        };
        await storeData('currentUser', JSON.stringify(infoCurrentUser));
        return { data: [], messages: 'Connection OK', status_code: 200 };
    }
};
const connexionWithOnline = async (email: string, password: string, imei: string) => {
    try {
        const url = BASE_URL + LOGIN_END_POINT_V3;
        console.log('database url : ', url);
        console.log('databaese name ......................................... : ', DB_NAME);
        console.log('email .....................................................: ', email);
        console.log('password .................................................: ', password);

        const response = await axios.post(url, {
            email: email,
            password: password,
            dbname: DB_NAME,
            // imei: imei,
            imei: '8431e5fee0efd94e',
            // imei: '843303435750674',
            // imei: '436058779089931',
            // imei: 'fbf559e225e75fef',

        });

        console.log('respondeData .................................................: ', response);
        const respondeData = response.data as AxiosRequestResponse;

        if (respondeData.status_code === 200) {
            const token = respondeData.data.token as string;
            console.log('Imei =================================================>>>>>>>>>>>>>>>>>>>>>>>>> : ', imei);
            await storeData(BDD_Local.token, token);
        }

        return response;
    } catch (error) {
        return { data: [], messages: 'Aucun connexion', status_code: 905 };
    }
};
export const login = async (email: string, password: string, isConnexion: boolean) => {
    // const imei = await fetchRandomNumberString('imei');
    const imei = await DeviceInfo.getUniqueId();
    console.log('Imei dans api =============================', imei);

    if (isConnexion) {
        try {
            const { data: response } = await connexionWithOnline(email, password, imei);
            const test = await connexionWithOnline(email, password, imei);
            console.log('test==================', test);
            console.log('Is connected============', response, imei);
            if (response && response.status_code === 200) {
                const infoCurrentUser = {
                    email: email,
                    password: password,
                    imei: imei,
                    // imei: "8431e5fee0efd94e"
                    // imei: '843303435750674',
                    // imei: '436058779089931',
                    // imei:'fbf559e225e75fef'
                };
                await storeData('currentUser', JSON.stringify(infoCurrentUser));
                // await storeData('token', response.data.token);
                return response;
            } else {
                console.log('response else==================', response);
                return response;

            }
        } catch (error) {
            return await connexionWithOffline(email, password, imei);
        }
    } else {
        return await connexionWithOffline(email, password, imei);
    }
};


export const forgotPassword = async (email: string) => {
    const url = BASE_URL + FORGOT_PASSWORD_V3;
    const response = await axios.post(url, { email: email });

    if (response) {
        console.log(response.data);
        return response.data;
    }
    return null;
};