import { ScrollView, StatusBar, StyleSheet, View, Image } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import Loading from '@/src/components/ui/login/Loading'
import { useTranslation } from 'react-i18next';
import { hp, wp } from '@/src/utils/responsive';
import CustomTextInput from '@/src/components/ui/CustomTextInput';
import { GREEN, TEXT_COLOR } from '@/src/constants/Colors';
import { TouchableOpacity } from 'react-native';
import { testConnexion } from '@/src/utils/testConnexion';
import CustomButton from '@/src/components/ui/CustomButton';
import MessageError from '@/src/components/ui/modal/MessageError';
import { Icons, Images } from '@/src/constants/Images';
import ErrorLogin from '@/src/components/ui/modal/ErrorLogin';
import { useRouter } from 'expo-router';
import CustomCheckbox from '@/src/components/ui/CustomCheckBox';
import { Fonts } from '@/src/constants/Font';
import Text from '@/src/components/ui/Text';
import LoadingToast from '@/src/components/ui/login/LoadingToast';
import { validateEmail, validatePassword } from '@/src/helpers/validate.helpers';
import { getData, removeData, storeData } from '@/src/helpers/AsyncStorage';
import { AxiosRequestResponse, login } from '@/src/api/agentApi';
import { CurrentUserInfo } from '@/src/Interface/global/database.interface';
import { BDD_Local } from '@/src/constants/BaseLocal';
import { initializeData } from '@/src/service/initializeData';

type Errors = {
    email?: string;
    password?: string;
    internet?: string;
};

interface NavagationProps {
    navigation?: any;
}

const Index: FC<NavagationProps> = ({ navigation }) => {
    const { t } = useTranslation('LOGING');
    const heightScreen = wp(1);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isConnectedInternet, setIsContectedInternet] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [isLoginValid, setIsLoginValid] = useState(true);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<Errors>({});
    const [eyePassword, setEyePassword] = useState(true);
    const emailRef = useRef<any>(null);
    const passwordRef = useRef<any>(null);
    const [messageError, setMessageError] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [btnVisible, setBtnVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const closeModal = () => {
        setIsVisible(false);
    };
    const clearText = () => {
        setEmail('');
    };

    const validateForm = () => {
        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) {
            setErrors(errors => ({ ...errors, email: emailValidation.error }));
            setIsVisible(true);
            emailRef.current?.focus();
            return false;
        }

        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            setErrors(errors => ({ ...errors, password: passwordValidation.error }));
            setIsVisible(true);
            passwordRef.current?.focus();
            return false;
        }

        return true;
    };


    const loginHandlePress = async (type: boolean) => {
        if (validateForm()) {
            setIsLoading(true);
            const currentUser = await getData('currentUser');
            const isConnexion: boolean | null = await testConnexion();
            if (isConnexion) {
                const response = (await login(email, password, isConnexion)) as AxiosRequestResponse;
                console.log("response", response);
                switch (response.status_code) {
                    case 200:
                        if (rememberMe) {
                            await storeData('rememberedEmail', email);
                            await storeData('rememberedPassword', password);
                        } else {
                            await removeData('rememberedEmail');
                            await removeData('rememberedPassword');
                        }
                        //  initializeData()
                        router.replace('/appDrawer/(tabs)');
                        setIsLoading(false);
                        setIsLoginValid(false);
                        return;


                    //     .then(async value => {
                    //         console.log('reponde tunnellle oooooooooooooooooooooooooooo');


                    //         storeData('isConnected', JSON.stringify(true));
                    //         const currentUser = response.data as CurrentUserInfo;
                    //         storeData(BDD_Local.currentUserInfo, await JSON.stringify(currentUser));
                    //         storeData(BDD_Local.currentUser, await JSON.stringify(currentUser));

                    //         setIsLoading(false);
                    //         navigation.replace('main');
                    //         setPassword('');
                    //     })
                    //     .catch(error => {
                    //         setIsLoading(false);
                    //         setIsVisible(true);
                    //         setErrorMessage(t('LOGING:CONNECTION_ERROR'));
                    //     });
                    // break;
                    // case 902:
                    //     setIsLoginValid(false);
                    //     setIsLoading(false);
                    //     setMessageError(response.messages);
                    //     break;
                    case 902:
                        setIsLoginValid(false);
                        setIsLoading(false);
                        setMessageError(response.messages);
                        break;
                    case 905:
                        setIsLoginValid(false);
                        setIsLoading(false);
                        setBtnVisible(true);
                        setMessageError(response.messages);
                        break;
                    default:
                        setIsLoginValid(false);
                        setIsLoading(false);
                        setBtnVisible(true);
                        setMessageError(response.messages);
                        break;
                }
                setIsLoading(false);
                return;
            }
            setIsLoading(false);
            setIsContectedInternet(true);
            setToastVisible(true);
        }
    };



    return (
        <>
            <StatusBar hidden={true} />
            {isLoading ? (
                <LoadingToast
                    toastVisible={toastVisible}
                    isConnectedInternet={isConnectedInternet}
                    title={t('LOGING:CONNECTION_IN_PROGRESS')}

                />
            ) : (
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={[styles.container, { height: heightScreen > 3.5 ? hp(80) : hp(100) }]}>
                    {isLoginValid ? (
                        <View style={[styles.borderShadow,
                        {
                            height: heightScreen > 3.5 ? hp(91) : hp(91)
                        }]}>
                            <View
                                style={{
                                    gap: heightScreen > 3.5 ? hp(9) : hp(6),
                                }}>
                                <View
                                    style={{
                                        //flexDirection: "column",
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'white',
                                        shadowColor: GREEN,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.8,
                                        shadowRadius: 5,
                                        elevation: 6,
                                        height: hp(13),
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                        //marginBottom: -26,
                                        gap: -500,
                                    }}>
                                    <Image
                                        source={Images.logo_2}
                                        resizeMode="contain"
                                        style={{
                                            width: wp(18),
                                            marginTop: heightScreen > 3.5 ? -hp(12) : -hp(15),
                                        }}
                                    />
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: heightScreen > 3.5 ? -hp(3) : -hp(8),
                                            // marginBottom: -hp(6),
                                        }}>
                                        <Text
                                            style={{
                                                color: GREEN,
                                                fontSize: wp(6),
                                                fontFamily: Fonts.thin,
                                            }}>
                                            eco
                                        </Text>
                                        <Text
                                            style={{
                                                color: TEXT_COLOR,
                                                fontSize: wp(6),
                                                fontFamily: Fonts.thin,
                                            }}>
                                            farming
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ paddingHorizontal: wp(4) }}>
                                    <Text style={styles.titleText}>{t('LOGING:LOGIN')}</Text>
                                    {/* <Text style={styles.titleText}>LOGIN</Text> */}
                                </View>

                                <View style={{ gap: wp(5), paddingHorizontal: wp(4) }}>
                                    <CustomTextInput
                                        ref={emailRef}
                                        icon={Icons.email}
                                        placeholder="Email"
                                        value={email}
                                        setValue={setEmail}
                                        clearText={clearText}
                                        returnKeyType="next"
                                        onSubmitEditing={() => passwordRef.current?.focus()}
                                    />

                                    <CustomTextInput
                                        ref={passwordRef}
                                        icon={Icons.password}
                                        placeholder={t('LOGING:PASSWORD')}
                                        value={password}
                                        setValue={setPassword}
                                        secureTextEntry={eyePassword}
                                        showEyeIcon={true}
                                        eye={eyePassword}
                                        onPressOne={() => setEyePassword(false)}
                                        onPressOff={() => setEyePassword(true)}
                                    />

                                    <View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity onPress={async () => {
                                                if (await testConnexion()) {
                                                    setRememberMe(!rememberMe)
                                                } else {
                                                    console.log('checkbox sans connection-----------------------------------');
                                                    setRememberMe(true)
                                                }
                                            }}>
                                                <View style={styles.rememberMeContainer}>
                                                    <CustomCheckbox
                                                        label={t('LOGING:REMEMBER_ME')}
                                                        value={rememberMe}
                                                        onValueChange={async () => {
                                                            setRememberMe(!rememberMe)
                                                            // if (await testConnexion()) {
                                                            //     setRememberMe(!rememberMe)
                                                            // } else {
                                                            //     console.log('checkbox sans connection-----------------------------------');
                                                            //     setRememberMe(true)
                                                            // }
                                                        }}
                                                    />
                                                    {/* <CheckBox
                                                        value={rememberMe}
                                                        onValueChange={async () => {
                                                            if (await testConnexion()) {
                                                                setRememberMe(!rememberMe)
                                                            } else {
                                                                console.log('checkbox sans connection-----------------------------------');
                                                                setRememberMe(true)
                                                            }
                                                        }}
                                                        tintColors={{ true: '#5e911ce8', false: 'gray' }}
                                                    /> */}
                                                    {/* <Text style={{ color: TEXT_COLOR }}>{t('LOGING:REMEMBER_ME')}</Text> */}
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        paddingHorizontal: wp(4),
                                    }}>
                                    <CustomButton onPress={() => loginHandlePress(true)} text={t('LOGING:CONNECT')} />
                                    <CustomButton
                                        type="SECONDARY"
                                        onPress={() => router.navigate("/(auth)/forgotPassword")}
                                        text={t('LOGING:FORGOT_PASSWORD')}
                                    />
                                </View>
                            </View>

                            <MessageError
                                isModalVisible={isVisible}
                                errorMessage={errors.email || errors.password || errors.internet || errorMessage || ''}
                                closeModal={closeModal}
                            />
                        </View>
                    ) : (
                        <ErrorLogin
                            isLoading={isLoading}
                            btnVisible={btnVisible}
                            isConnetected={isConnectedInternet}
                            returnLogin={() => setIsLoginValid(true)}
                            login={() => { }}
                            title={t('LOGING:AUTHENTICATION')}
                            message={messageError}
                            type="login"
                        />
                    )}
                </ScrollView>
            )}
        </>
    )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    borderShadow: {
        backgroundColor: 'white',
        shadowColor: GREEN,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 6,
        borderRadius: 10,
        marginTop: hp(7),
    },
    titleText: {
        fontSize: wp(6),
        color: TEXT_COLOR,
        textAlign: 'center',
        marginBottom: -hp(1),
        fontWeight: '600',
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        //marginBottom: 10,
    },
})