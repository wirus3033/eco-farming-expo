import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Image } from 'react-native'
import { Fonts } from '@/src/constants/Font'

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

    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 12,
        // fontWeight: '600',
        fontFamily:Fonts.thin
    },
    icon: {
        height: "25%",
        width: "25%",
        resizeMode: "contain"
    }
})