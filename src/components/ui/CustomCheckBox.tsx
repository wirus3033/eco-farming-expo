import { Colors } from "@/src/constants/Colors";
import { GREEN, TEXT_COLOR } from '@/src/constants/Colors';
import { Fonts } from "@/src/constants/Font";
import Checkbox from "expo-checkbox";
import React, { FC } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import Text from "./Text";
import { hp, wp } from "@/src/utils/responsive";


type Props = {
    label: string;
    value: boolean;
    style?: ViewStyle;
    onValueChange: (value: boolean) => void;
};

const CustomCheckbox: FC<Props> = (props) => {
    return (
        <View style={[{ flexDirection: "row" }, props.style]}>
            <Pressable onPress={() => props.onValueChange(!props.value)}>
                <View style={[styles.checkboxContainer, props.style]}>
                    <Checkbox
                        value={props.value}
                        onValueChange={props.onValueChange}
                        style={styles.checkbox}
                        color={props.value ? GREEN : undefined}
                    />
                    <Text style={styles.checkboxLabel}>
                        {props.label}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        borderRadius: 2,
        borderWidth: 1,
        // width: wp(5),
        // aspectRatio:1
        // height: hp(3.5),
    },
    checkboxLabel: {
        marginLeft: 8,
        color: TEXT_COLOR,
        fontSize: wp(4),
        fontFamily:Fonts.thin,
    },
});

export default CustomCheckbox;
