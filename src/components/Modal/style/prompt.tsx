import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export interface PromptStyle {
    message: TextStyle;
    inputGroup: ViewStyle;
    inputWrapper: ViewStyle;
    input: TextStyle;
    inputFirst: ViewStyle;
    inputLast: ViewStyle;
}

export default StyleSheet.create<PromptStyle>({
    message: {
        marginTop: 15,
        color: '#888888',
        fontSize: 14,
        textAlign: 'center',
    },
    inputGroup: {
        marginTop: 9,
        flexDirection: 'column',
    },
    inputWrapper: {
        borderWidth: StyleSheet.hairlineWidth,
        borderTopWidth: 0,
        borderColor: '#dddddd',
    },
    input: {
        height: 36,
        fontSize: 14,
        paddingHorizontal: 5,
        paddingVertical: 0,
    },
    inputFirst: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    inputLast: {
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
    },
});