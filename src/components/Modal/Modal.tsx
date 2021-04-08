import React from 'react';
import { StyleProp, Text, TextStyle, TouchableNativeFeedback, TouchableHighlight, TouchableWithoutFeedback, View, ViewStyle, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import type alert from './alert';
import RCModal from './ModalView';
import type operation from './operation';
import type prompt from './prompt';
import type { CallbackOnBackHandler, ModalPropsType } from './types';
import modalStyles, { ModalStyle } from './style/index';

export interface ModalProps extends ModalPropsType<TextStyle> {
    style?: StyleProp<ViewStyle>;
    bodyStyle?: StyleProp<ViewStyle>;
    onRequestClose?: CallbackOnBackHandler;
    styles?: Partial<ModalStyle>
}

class AntmModal extends React.Component<ModalProps, any> {
    static defaultProps = {
        visible: false,
        closable: false,
        maskClosable: false,
        style: {},
        bodyStyle: {},
        animationType: 'fade',
        onClose() { },
        footer: [],
        transparent: false,
        popup: false,
        animateAppear: true,
        operation: false,
    };
    static alert: typeof alert;
    static operation: typeof operation;
    static prompt: typeof prompt;

    render() {
        const {
            title,
            closable,
            footer,
            children,
            style,
            animateAppear,
            maskClosable,
            popup,
            transparent,
            visible,
            onClose,
            bodyStyle,
            onAnimationEnd,
            onRequestClose,
            styles
        } = this.props;

        let btnGroupStyle = getStyle(modalStyles.buttonGroupV, styles?.buttonGroupV);
        let horizontalFlex = {};
        if (footer && footer.length === 2 && !this.props.operation) {
            btnGroupStyle = getStyle(modalStyles.buttonGroupH, styles?.buttonGroupH);
            horizontalFlex = { flex: 1 };
        }
        const buttonWrapStyle =
            footer && footer.length === 2
                ? getStyle(modalStyles.buttonWrapH, styles?.buttonWrapH)
                : getStyle(modalStyles.buttonWrapV, styles?.buttonWrapV);
        let footerDom;
        if (footer && footer.length) {
            const footerButtons = footer.map((button, i) => {
                let buttonStyle = {};
                if (this.props.operation) {
                    buttonStyle = getStyle(modalStyles.buttonTextOperation, styles?.buttonTextOperation);
                }
                if (button.style) {
                    buttonStyle = button.style;
                    if (typeof buttonStyle === 'string') {
                        const styleMap: {
                            [key: string]: object;
                        } = {
                            cancel: {},
                            default: {},
                            destructive: { color: 'red' },
                        };
                        buttonStyle = styleMap[buttonStyle] || {};
                    }
                }
                const noneBorder =
                    footer && footer.length === 2 && i === 1
                        ? { borderRightWidth: 0 }
                        : {};
                const onPressFn = () => {
                    if (button.onPress) {
                        button.onPress();
                    }
                    if (onClose) {
                        onClose();
                    }
                };
                return (
                    <TouchableHighlight
                        key={i}
                        style={horizontalFlex}
                        underlayColor="#ddd"
                        onPress={onPressFn}
                    >
                        <View style={[buttonWrapStyle, noneBorder]}>
                            <Text style={[getStyle(modalStyles.buttonText, styles?.buttonText), buttonStyle]}>
                                {button.text || `按钮${i}`}
                            </Text>
                        </View>
                    </TouchableHighlight>
                );
            });
            footerDom = (
                <View
                    style={[btnGroupStyle, getStyle(modalStyles.footer, styles?.footer)]}
                >
                    {footerButtons}
                </View>
            );
        }

        let animType = this.props.animationType;
        if (transparent) {
            if (animType === 'slide') {
                animType = 'slide-up';
            }
            const closableDom = closable ? (
                <View style={[getStyle(modalStyles.closeWrap, styles?.closeWrap)]}>
                    <TouchableWithoutFeedback onPress={onClose}>
                        <View>
                            <Text style={[getStyle(modalStyles.close, styles?.close)]}>×</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            ) : null;
            return (
                <View style={getStyle(modalStyles.container, styles?.container)}>
                    <RCModal
                        onClose={onClose}
                        animationType={animType}
                        wrapStyle={transparent ? getStyle(modalStyles.wrap, styles?.wrap) : undefined}
                        style={getStyle(modalStyles.wrap, styles?.wrap)}
                        visible={visible}
                        onAnimationEnd={onAnimationEnd}
                        onRequestClose={onRequestClose}
                        animateAppear={animateAppear}
                        maskClosable={maskClosable}
                    >
                        <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === "ios"}>
                            <View style={[getStyle(modalStyles.innerContainer, styles?.innerContainer), style]}>
                                {title ? (
                                    <Text style={[getStyle(modalStyles.header, styles?.header)]}>{title}</Text>
                                ) : null}
                                <View style={[getStyle(modalStyles.body, styles?.body), bodyStyle]}>{children}</View>
                                {footerDom}
                                {closableDom}
                            </View>
                        </KeyboardAvoidingView>
                    </RCModal>
                </View>
            );
        }
        if (popup) {
            let aType = 'SlideDown';
            if (animType === 'slide-up') {
                animType = 'slide-up';
                aType = 'SlideUp';
            } else {
                animType = 'slide-down';
            }
            return (
                <View style={getStyle(modalStyles.container, styles?.container)}>
                    <RCModal
                        onClose={onClose}
                        animationType={animType}
                        // tslint:disable-next-line:jsx-no-multiline-js
                        style={[
                            getStyle(modalStyles.popupContainer, styles?.popupContainer),
                            (styles as any)[`popup${aType}`],
                            style,
                        ]}
                        visible={visible}
                        onAnimationEnd={onAnimationEnd}
                        onRequestClose={onRequestClose}
                        animateAppear={animateAppear}
                        maskClosable={maskClosable}
                    >
                        <View style={bodyStyle}>
                            {children}
                        </View>
                    </RCModal>
                </View>
            );
        }
        if (animType === 'slide') {
            animType = undefined;
        }
        return (
            <View style={getStyle(modalStyles.container, styles?.container)}>
                <RCModal
                    visible={visible}
                    animationType={animType}
                    onRequestClose={onRequestClose}
                    onClose={onClose}
                >
                    <View style={style}>{children}</View>
                </RCModal>
            </View>
        );
    }
}

function getStyle<T>(defaultStyle: StyleProp<T>, customStyle: StyleProp<T>) {
    return StyleSheet.flatten<T>([defaultStyle, customStyle])
}

export default AntmModal;