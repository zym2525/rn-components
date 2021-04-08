import React from 'react';
import Portal from '../Portal';
import OperationContainer from './OperationContainer';
import type { CallbackOnBackHandler } from './types';

export default function a(actions: any[], onBackHandler?: CallbackOnBackHandler) {
    const key = Portal.add(
        <OperationContainer
            actions={actions.length > 0 ? actions : [{ text: '确定' }]}
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