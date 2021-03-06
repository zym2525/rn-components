import React from 'react';
import type { TextStyle } from 'react-native';
import Portal from '../Portal';
import PromptContainer from './PromptContainer';
import type { CallbackOnBackHandler, CallbackOrActions } from './types';

export default function prompt(
    title: React.ReactNode,
    message: React.ReactNode,
    callbackOrActions: CallbackOrActions<TextStyle>,
    type = 'default',
    defaultValue = '',
    placeholders = ['', ''],
    onBackHandler?: CallbackOnBackHandler,
) {
    if (!callbackOrActions) {
        // tslint:disable-next-line:no-console
        console.error('Must specify callbackOrActions');
        return;
    }

    const key = Portal.add(
        <PromptContainer
            title={title}
            message={message}
            actions={callbackOrActions}
            type={type as any}
            defaultValue={defaultValue}
            onAnimationEnd={(visible: boolean) => {
                if (!visible) {
                    Portal.remove(key);
                }
            }}
            placeholders={placeholders}
            onBackHandler={onBackHandler}
        />,
    );
    return key;
}