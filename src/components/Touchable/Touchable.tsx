import * as React from 'react';
import {
    View, StyleSheet, Text, Platform,
    TouchableWithoutFeedbackProps,
    TouchableNativeFeedbackProps,
    TouchableHighlightProps,
    TouchableOpacityProps,
    GestureResponderEvent
} from 'react-native';
import { TouchableNativeFeedback, TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler'
import { useDebounce } from '@zero-d/rn-components'

interface MyTouchableNativeFeedbackProps extends TouchableNativeFeedbackProps {
    TouchableComponent?: typeof TouchableNativeFeedback;
    children: React.ReactNode;
}

interface MyTouchableHighlightProps extends TouchableHighlightProps {
    TouchableComponent?: typeof TouchableHighlight;
    children: React.ReactNode;
}

interface MyTouchableWithoutFeedbackProps extends TouchableWithoutFeedbackProps {
    TouchableComponent?: typeof TouchableWithoutFeedback;
    children: React.ReactNode;
}

interface MyTouchableOpacityProps extends TouchableOpacityProps {
    TouchableComponent?: typeof TouchableOpacity;
    children: React.ReactNode;
}

export type TouchableProps = MyTouchableNativeFeedbackProps & MyTouchableHighlightProps & MyTouchableWithoutFeedbackProps & MyTouchableOpacityProps

const DefaultTouchable = Platform.select({
    android: TouchableNativeFeedback,
    ios: TouchableHighlight,
    default: TouchableWithoutFeedback,
});

/**
 * 
 * @returns a react-native-gesture-handler Touchable
 * @description 断言写的太烂了 根据实际情况写吧
 */
const Touchable = ({ TouchableComponent, onPress, ...rest }: TouchableProps) => {
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
        <TargetComponent {...defaultTouchableProps} {...rest} onPress={pressDebounced} />
    )
}



export default Touchable