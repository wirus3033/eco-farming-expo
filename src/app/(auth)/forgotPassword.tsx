import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import { hp, wp } from '@/src/utils/responsive';
import { useTranslation } from 'react-i18next';
import ErrorLogin from '@/src/components/ui/modal/ErrorLogin';
import MessageError from '@/src/components/ui/modal/MessageError';
import CustomButton from '@/src/components/ui/CustomButton';
import CustomTextInput from '@/src/components/ui/CustomTextInput';
import { Icons, Images } from '@/src/constants/Images';
import { GREEN, TEXT_COLOR } from '@/src/constants/Colors';
import { Image } from 'react-native';
import { testConnexion } from '@/src/utils/testConnexion';
import { useRouter } from 'expo-router';
import Loading from '@/src/components/ui/login/Loading';
import { Fonts } from '@/src/constants/Font';


interface NavagationProps {
    navigation: any;
}
const ForgotPassword: FC<NavagationProps> = ({ navigation }) => {
    const heightScreen = wp(1);
    const router = useRouter();
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState('');
    const [isForgotValid, setIsForgotValid] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [errorMesage, setErrorMesage] = useState('');

    const clearText = () => {
        setEmail('');
    };

    const resetPassword = async () => {
        if (!email) {
            setError(t('LOGING:EMAIL_REQUIRED'));
            setIsVisible(true);
            return;
        }

        setIsLoading(true);
        const isConnexion: boolean | null = await testConnexion();
        if (isConnexion) {
            const response = await forgotPassword(email);
            console.log(response);
            setIsLoading(false);
            if (response && response.status_code === 200) {
                setIsForgotValid(true);
                setErrorMesage(response.messages);
                return;
            }
            setIsForgotValid(true);
            setErrorMesage(response.messages);
            return;
        }
        setIsLoading(false);
        setIsVisible(true);
        setError(t('PACKAGING:SCAN_BAC.CHECK_INTERNET_CONNECTION'));
    };

    return (
        <>
            {isLoading ? (
                <Loading toastVisible={false} isConnectedInternet={true} title="Mot de passe oublié" />
            ) : (
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={[styles.container, { height: heightScreen > 3.5 ? hp(80) : hp(100) }]}>
                    {!isForgotValid ? (
                        <View style={[styles.borderShadow, { height: hp(91) }]}>
                            <View
                                style={{
                                    gap: heightScreen > 3.5 ? hp(10) : hp(8),
                                }}>
                                <View
                                    style={{
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
                                        gap: -500,
                                    }}>
                                    <Image
                                        source={Images.logo_2}
                                        resizeMode="contain"
                                        style={{
                                            width: wp(24),
                                            marginTop: heightScreen > 3.5 ? -hp(10) : -hp(13),
                                        }}
                                    />
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: heightScreen > 3.5 ? -hp(3.5) : -hp(8),
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
                                    <Text style={styles.titleText}>{t('LOGING:FORGOT_PASSWORD')}</Text>
                                </View>

                                <View style={{ gap: wp(5), paddingHorizontal: wp(4) }}>
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            fontSize: 16,
                                            color: 'gray',
                                            marginTop: 10,
                                        }}>
                                        {t('FORGOT_PASSWORD:TEXT_CONFIRM')}
                                    </Text>

                                    <CustomTextInput
                                        icon={Icons.email}
                                        placeholder="Email"
                                        value={email}
                                        setValue={setEmail}
                                        clearText={clearText}
                                    />
                                </View>

                                <View
                                    style={{
                                        paddingHorizontal: wp(4),
                                    }}>
                                    <CustomButton onPress={resetPassword} text={t('FORGOT_PASSWORD:TEXT_SEND')} />
                                    <CustomButton
                                        type="SECONDARY"
                                        onPress={() => router.navigate('/(auth)')}
                                        text={t('LOGING:CONNECT')}
                                    />
                                </View>
                            </View>

                            <MessageError
                                isModalVisible={isVisible}
                                errorMessage={error || ''}
                                closeModal={() => setIsVisible(false)}
                            />
                        </View>
                    ) : (
                        <ErrorLogin
                            isLoading={isLoading}
                            isConnetected={true}
                            returnLogin={() => setIsForgotValid(false)}
                            login={() => navigation.navigate('forgotPassword')}
                            title={t('LOGING:FORGOT_PASSWORD')}
                            message={errorMesage}
                            type="forgotPassword"
                        />
                    )}
                </ScrollView>
            )}
        </>
    )
}

export default ForgotPassword

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
})