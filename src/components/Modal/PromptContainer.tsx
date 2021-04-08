import React from 'react';
import { Text, TextInput, TextStyle, View } from 'react-native';
import Modal from './Modal';
import type { CallbackOnBackHandler, CallbackOrActions } from './types';
import promptStyles, { PromptStyle } from './style/prompt';

export interface PropmptContainerProps {
    title: React.ReactNode;
    message?: React.ReactNode;
    type?: 'default' | 'login-password' | 'secure-text';
    defaultValue?: string;
    actions: CallbackOrActions<TextStyle>;
    onAnimationEnd?: (visible: boolean) => void;
    placeholders?: string[];
    onBackHandler?: CallbackOnBackHandler;
    styles?: Partial<PromptStyle>
}

export default class PropmptContainer extends React.Component<
    PropmptContainerProps,
    any
> {
    static defaultProps = {
        type: 'default',
        defaultValue: '',
    };

    constructor(props: PropmptContainerProps) {
        super(props);
        this.state = {
            visible: true,
            text: props.defaultValue,
            password: props.type === 'secure-text' ? props.defaultValue : '',
        };
    }

    onBackAndroid = () => {
        const { onBackHandler } = this.props;
        if (typeof onBackHandler === 'function') {
            const flag = onBackHandler();
            if (flag) {
                this.onClose();
            }
            return flag;
        }
        if (this.state.visible) {
            this.onClose();
            return true;
        }
        return false;
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onChangeText(type: string, value: string) {
        this.setState({
            [type]: value,
        });
    }

    render() {
        const {
            title,
            onAnimationEnd,
            message,
            type,
            actions,
            placeholders,
        } = this.props;
        const { text, password } = this.state;
        const getArgs = function (func: (...args: any[]) => void) {
            if (type === 'login-password') {
                //@ts-ignore
                return func.apply(this, [text, password]);
            } else if (type === 'secure-text') {
                //@ts-ignore
                return func.apply(this, [password]);
            }
            //@ts-ignore
            return func.apply(this, [text]);
        };

        let callbacks;
        if (typeof actions === 'function') {
            callbacks = [
                { text: '取消', style: 'cancel', onPress: () => { } },
                { text: '确定', onPress: () => getArgs(actions) },
            ];
        } else {
            callbacks = actions.map(item => {
                return {
                    text: item.text,
                    onPress: () => {
                        if (item.onPress) {
                            return getArgs(item.onPress);
                        }
                    },
                    style: item.style || {},
                };
            });
        }

        const footer = (callbacks as any).map((button: any) => {
            // tslint:disable-next-line:only-arrow-functions
            const orginPress = button.onPress || function () { };
            button.onPress = () => {
                const res = orginPress();
                if (res && res.then) {
                    res.then(() => {
                        this.onClose();
                    });
                } else {
                    this.onClose();
                }
            };
            return button;
        });
        // const styles = StyleSheet.flatten(this.props.styles, promptStyles)
        const styles = this.props.styles;
        const firstStyle = [promptStyles.inputWrapper, styles?.inputWrapper];
        const lastStyle = [promptStyles.inputWrapper, styles?.inputWrapper];

        if (type === 'login-password') {
            firstStyle.push(promptStyles.inputFirst, styles?.inputFirst);
            lastStyle.push(promptStyles.inputLast, styles?.inputLast);
        } else if (type === 'secure-text') {
            lastStyle.push(promptStyles.inputFirst, styles?.inputFirst);
            lastStyle.push(promptStyles.inputLast, styles?.inputLast);
        } else {
            firstStyle.push(promptStyles.inputFirst, styles?.inputFirst);
            firstStyle.push(promptStyles.inputLast, styles?.inputLast);
        }
        return (
            <Modal
                transparent
                title={title}
                visible={this.state.visible}
                footer={footer}
                onAnimationEnd={onAnimationEnd}
                onRequestClose={this.onBackAndroid}
            >
                {message ? <Text style={[promptStyles.message, styles?.message]}>{message}</Text> : null}
                <View style={[promptStyles.inputGroup, styles?.inputGroup]}>
                    {type !== 'secure-text' && (
                        <View style={firstStyle}>
                            <TextInput
                                autoFocus
                                onChangeText={value => {
                                    this.onChangeText('text', value);
                                }}
                                value={this.state.text}
                                style={[promptStyles.input, styles?.input]}
                                underlineColorAndroid="transparent"
                                placeholder={placeholders![0]}
                            />
                        </View>
                    )}
                    {(type === 'secure-text' || type === 'login-password') && (
                        <View style={lastStyle}>
                            <TextInput
                                autoFocus
                                secureTextEntry
                                onChangeText={value => {
                                    this.onChangeText('password', value);
                                }}
                                value={this.state.password}
                                style={[promptStyles.input, styles?.input]}
                                underlineColorAndroid="transparent"
                                placeholder={placeholders![1]}
                            />
                        </View>
                    )}
                </View>
            </Modal>
        );
    }
}