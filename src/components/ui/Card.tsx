import { Pressable, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { Image } from 'react-native'
import { Fonts } from '@/src/constants/Font'
import Text from './Text'
import { wp } from '@/src/utils/responsive'

interface PropsCard {
    title: string,
    icon: any,
    texColor: string,
    backgroundColor?: string
    iconColor?: string
    onPressItem?: () => void


}
const Card: React.FC<PropsCard> = ({
    title,
    icon,
    texColor,
    backgroundColor,
    iconColor,
    onPressItem

}) => {
    return (
        <Pressable style={[styles.container, { backgroundColor: backgroundColor }]} onPress={onPressItem}>
            <Image source={icon} style={[styles.icon, { tintColor: iconColor }]} />
            <Text style={[styles.text, { color: texColor }]}>{title}</Text>
        </Pressable>
    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 8,
        // elevation: 2,
        shadowRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        backgroundColor: "blue",
        gap: 12

    },
    text: {
        fontSize:wp(4.5),
        textAlign: 'center',
        // marginTop: 12,
        // fontWeight: '600',
        fontFamily:Fonts.thin
    },
    icon: {
        height: "23%",
        width: "23%",
        resizeMode: "contain"
    }
})