import { ScrollView, StatusBar, StyleSheet, Text, View, Image } from 'react-native'
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

    return (
        <>
            <StatusBar hidden={true} />
            {isLoading ? (
                <Loading
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
                        <View style={[styles.borderShadow, { height: heightScreen > 3.5 ? hp(91) : hp(91) }]}>
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
                                            width: wp(24),
                                            marginTop: heightScreen > 3.5 ? -hp(8) : -hp(13),
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
                                                fontSize: 21,
                                                fontFamily: Fonts.thin,
                                            }}>
                                            eco
                                        </Text>
                                        <Text
                                            style={{
                                                color: TEXT_COLOR,
                                                fontSize: 21,
                                                fontFamily: Fonts.thin,
                                            }}>
                                            farming
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ paddingHorizontal: wp(4) }}>
                                    <Text style={styles.titleText}>{t('LOGING:LOGIN')}</Text>
                                </View>

                                <View style={{ gap: wp(5), paddingHorizontal: wp(4) }}>
                                    <CustomTextInput
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
                                                            if (await testConnexion()) {
                                                                setRememberMe(!rememberMe)
                                                            } else {
                                                                console.log('checkbox sans connection-----------------------------------');
                                                                setRememberMe(true)
                                                            }
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
                                    <CustomButton onPress={() => router.navigate("/(tabs)")} text={t('LOGING:CONNECT')} />
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
        fontSize: wp(8),
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