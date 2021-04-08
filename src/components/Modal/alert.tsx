import React from 'react';
import Portal from '../Portal';
import AlertContainer from './AlertContainer';
import type { Action, CallbackOnBackHandler } from './types';

export default function a(
    title: React.ReactNode,
    content: React.ReactNode,
    actions: Action[] = [{ text: '确定' }],
    onBackHandler?: CallbackOnBackHandler,
) {
    const key = Portal.add(
        <AlertContainer
            title={title}
            content={content}
            actions={actions}
            onAnimationEnd={(visible: boolean) => {
                if (!visible) {
                    Portal.remove(key);
                }
            }}
            onBackHandler={onBackHandler}
        />,
    );
    return key;
}