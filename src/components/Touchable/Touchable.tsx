import * as React from 'react';
import type { ComponentProps, ComponentType } from 'react';
import {
    Platform,
    TouchableWithoutFeedbackProps,
    TouchableNativeFeedbackProps,
    TouchableHighlightProps,
    TouchableOpacityProps,
    GestureResponderEvent,
} from 'react-native';
import { TouchableNativeFeedback, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useDebounce } from '@zero-d/rn-components'

export type TouchableProps<T extends TouchableComponentType> = {
    TouchableComponent?: T;
    children?: Readonly<React.ReactNode>;
} & (ComponentProps<T>)

export type TouchableComponentType = ComponentType<TouchableOpacityProps | TouchableNativeFeedbackProps | TouchableHighlightProps | TouchableWithoutFeedbackProps>

const DefaultTouchable = Platform.select({
    //@ts-ignore
    android: TouchableNativeFeedback,
    ios: TouchableHighlight,
    default: TouchableWithoutFeedback,
});

/**
 * 
 * @returns a react-native-gesture-handler Touchable
 */
const Touchable = <T extends TouchableComponentType,>({ TouchableComponent, ...rest }: TouchableProps<T>) => {
    const { onPress } = rest as TouchableWithoutFeedbackProps;
    // let [count, setCount] = React.useState(0)
    const TargetComponent = TouchableComponent || DefaultTouchable;
    let defaultTouchableProps = {};
    if (!TouchableComponent && TargetComponent === TouchableHighlight) {
        defaultTouchableProps = { underlayColor: 'rgba(0, 0, 0, 0.1)' };
    }
    let pressDebounced: (e: GestureResponderEvent) => void = useDebounce<(e: GestureResponderEvent) => void>(debouncePress);

    function debouncePress(e: GestureResponderEvent) {
        onPress && onPress(e);
        // setCount(c => c + 1)
    }

    return (
        // @ts-ignore
        <TargetComponent {...defaultTouchableProps} {...rest} onPress={pressDebounced} />
    )
}



export default Touchable