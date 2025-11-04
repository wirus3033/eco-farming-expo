import { Dimensions, Image, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { GRAY, GREEN, TEXT_COLOR } from '@/src/constants/Colors'
import { hp, wp } from '@/src/utils/responsive'
import { Icons } from '@/src/constants/Images';
import CustomLogo from '../CustomLogo';
import { useTranslation } from 'react-i18next';
import CustomButton from '../CustomButton';
import { Fonts } from '@/src/constants/Font';
import Text from '../Text';


interface Props {
    isLoading: boolean;
    isConnetected: boolean;
    returnLogin: () => void;
    login: () => void;
    title: string;
    message: string;
    type: string;
    btnVisible?: boolean;
}

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
const isSmallScreen = windowWidth < 375;
const cardHeight = windowHeight * (isSmallScreen ? 0.21 : 0.24);
const fontSizeLabel = windowHeight * (isSmallScreen ? 0.022 : 0.025);
const heightScreen = wp(1);
const ErrorLogin: FC<Props> = ({ isLoading, isConnetected, returnLogin, login, title, message, type, btnVisible }) => {
    const { t } = useTranslation();
    return (
        <View style={[styles.borderShadow, { height: heightScreen > 3.5 ? hp(91) : hp(91) }]}>
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
                        height: heightScreen > 3.5 ? hp(13) : hp(13),
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                    }}>
                    <View
                        style={{
                            width: wp(18),
                            height: wp(18),
                            backgroundColor: GREEN,
                            padding: 20,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: heightScreen > 3.5 ? -hp(3) : -hp(6),
                        }}>
                        <Image
                            source={Icons.attention}
                            resizeMode="contain"
                            style={{
                                width: wp(10),
                                // height: wp(15),
                                marginBottom: wp(2),
                                // justifyContent: 'center',
                                // alignItems: 'center',
                            }}
                        />
                    </View>
                    <View
                        style={{
                            marginTop: heightScreen > 3.5 ? 40 : wp(10),
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: -hp(5),
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
                </View>

                <View style={{ paddingHorizontal: wp(4), gap: hp(2) }}>
                    <Text
                        style={{
                            color: TEXT_COLOR,
                            fontSize: wp(6),
                            textAlign: 'center',
                            fontFamily: Fonts.thin,
                        }}>
                        {title}
                    </Text>
                    <View style={{ borderBottomWidth: wp(0.2), borderBottomColor: GRAY }} />
                </View>
                <View style={{ paddingHorizontal: wp(4) }}>
                    <Text
                        style={[
                            {
                                color: GRAY,
                                fontSize: wp(4.5),
                                textAlign: 'center',
                                fontFamily: Fonts.thin,
                                marginTop: 8,
                            },
                            !btnVisible && { marginTop: 42 },
                        ]}>
                        {message}
                    </Text>
                </View>
            </View>
            <View
                style={[
                    {
                        paddingHorizontal: wp(4),
                        position: 'absolute',
                        bottom: wp(15),
                        left: 0,
                        right: 0,
                    },
                    !btnVisible && { marginTop: 30 },
                ]}>
                <CustomButton onPress={returnLogin} text="OK" />
                {btnVisible && <CustomButton type="SECONDARY" onPress={login} text={t('SCREEN_ERROR:TEXT_BTN')} />}
            </View>
        </View>
    )
}

export default ErrorLogin

const styles = StyleSheet.create({
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
})