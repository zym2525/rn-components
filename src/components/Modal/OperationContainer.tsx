import React from 'react';
import type { TextStyle, StyleProp, ViewStyle } from 'react-native';
import Modal from './Modal';
import type { Action, CallbackOnBackHandler } from './types';
import modalStyle from './style/index';

export interface OperationContainerProps {
    actions: Action<TextStyle>[];
    onAnimationEnd?: (visible: boolean) => void;
    onBackHandler?: CallbackOnBackHandler;
    operationContainerStyle?: StyleProp<ViewStyle>
    operationBodyStyle?: StyleProp<ViewStyle>
}

export default class OperationContainer extends React.Component<
    OperationContainerProps,
    any
> {
    constructor(props: OperationContainerProps) {
        super(props);
        this.state = {
            visible: true,
        };
    }

    onBackAndroid = () => {
        const { onBackHandler } = this.props;
        if (typeof onBackHandler === 'function') {
            const flag = onBackHandler();
            if (flag) {
                this.onClose();
            }
            return true;
        } else if (this.state.visible) {
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

    render() {
        const { actions, onAnimationEnd, operationContainerStyle, operationBodyStyle } = this.props;
        const footer = actions.map(button => {
            // tslint:disable-next-line:only-arrow-functions
            const orginPress = button.onPress || function () { };
            button.onPress = () => {
                const res = orginPress();
                if (res && (res as any).then) {
                    (res as any).then(() => {
                        this.onClose();
                    });
                } else {
                    this.onClose();
                }
            };
            return button;
        });
        return (
            <Modal
                operation
                transparent
                maskClosable
                visible={this.state.visible}
                onClose={this.onClose}
                onAnimationEnd={onAnimationEnd}
                onRequestClose={this.onBackAndroid}
                style={[modalStyle.operationContainer, operationContainerStyle]}
                bodyStyle={[modalStyle.operationBody, operationBodyStyle]}
                footer={footer}
            />
        );
    }
}