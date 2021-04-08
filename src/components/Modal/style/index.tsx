import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export interface ModalStyle {
    container: ViewStyle;
    wrap: ViewStyle;
    popupContainer: ViewStyle;
    innerContainer: ViewStyle;
    popupSlideUp: ViewStyle;
    popupSlideDown: ViewStyle;
    footer: ViewStyle;
    header: TextStyle;
    body: ViewStyle;
    maskClosable: ViewStyle;
    closeWrap: ViewStyle;
    close: TextStyle;
    buttonGroupH: ViewStyle;
    buttonGroupV: ViewStyle;
    buttonWrapH: ViewStyle;
    buttonWrapV: ViewStyle;
    buttonText: TextStyle;
    operationContainer: ViewStyle;
    operationBody: ViewStyle;
    buttonTextOperation: TextStyle;
}

export default StyleSheet.create<ModalStyle>({
    container: {
        zIndex: 999,
    },
    wrap: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    popupContainer: {},
    popupSlideUp: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    popupSlideDown: {},
    innerContainer: {
        borderRadius: 5,
        width: 286,
        paddingTop: 21,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
    },
    footer: {},
    header: {
        fontSize: 18,
        color: '#000000',
        textAlign: 'center',
        paddingHorizontal: 15,
    },
    body: {
        paddingTop: 0,
        paddingBottom: 15,
        paddingHorizontal: 15,
    },
    maskClosable: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
    },
    closeWrap: {
        position: 'absolute',
        top: 21,
        left: 15,
    },
    close: {
        fontSize: 40,
        fontWeight: '200',
        color: '#bcbcbc',
        lineHeight: 30,
    },
    buttonGroupH: {
        flexGrow: 1,
        flexDirection: 'row',
    },
    buttonGroupV: {
        flexGrow: 1,
        flexDirection: 'column',
    },
    buttonWrapH: {
        height: 50,
        flexGrow: 1,
        justifyContent: 'center',
        borderColor: '#dddddd',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderRightWidth: StyleSheet.hairlineWidth,
        paddingVertical: 11,
    },
    buttonWrapV: {
        flexGrow: 1,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#dddddd',
        paddingVertical: 11,
    },
    buttonText: {
        textAlign: 'center',
        color: '#108ee9',
        fontSize: 18,
        backgroundColor: 'transparent',
    },
    operationContainer: {
        paddingTop: 0,
    },
    operationBody: {
        paddingBottom: 0,
        paddingHorizontal: 0,
    },
    buttonTextOperation: {
        color: '#000000',
        textAlign: 'left',
        paddingHorizontal: 15,
    },
});