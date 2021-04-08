import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export interface ToastStyle {
    container: ViewStyle;
    innerContainer: ViewStyle;
    innerWrap: ViewStyle;
    iconToast: ViewStyle;
    textToast: ViewStyle;
    content: TextStyle;
    image: TextStyle;
    centering: ViewStyle;
}

export default StyleSheet.create<ToastStyle>({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1999,
    },
    innerContainer: {
        backgroundColor: 'transparent',
    },
    innerWrap: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, .8)',
        minWidth: 100,
    },
    iconToast: {
        borderRadius: 7,
        padding: 15,
    },
    textToast: {
        borderRadius: 3,
        paddingVertical: 9,
        paddingHorizontal: 15,
    },
    content: {
        color: '#ffffff',
        fontSize: 15,
    },
    image: {
        marginBottom: 3,
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 9,
    },
});