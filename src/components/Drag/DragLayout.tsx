import React, { ReactNode, FC } from 'react'
import { GestureDetector, Gesture, GestureStateChangeEvent, PanGestureHandlerEventPayload } from 'react-native-gesture-handler'
import Animated, { useSharedValue, useAnimatedStyle, } from 'react-native-reanimated'
import type { ViewStyle, StyleProp } from 'react-native'

export type DragLayoutProps = {
    style?: StyleProp<Animated.AnimateStyle<ViewStyle>>,
    /**
     * 初始X偏移量
     */
    initialOffsetX?: number
    /**
     * 初始Y偏移量
     */
    initialOffsetY?: number
    /**
     * 最小X偏移量
     */
    minOffsetX?: number
    /**
    * 最大X偏移量
    */
    maxOffsetX?: number
    /**
    * 最小Y偏移量
    */
    minOffsetY?: number
    /**
     * 最大Y偏移量
     */
    maxOffsetY?: number

    onBegin?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void
    onFinalize?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>, success: boolean) => void
}

const DragLayout: FC<DragLayoutProps> = ({ children, initialOffsetX = 0, initialOffsetY = 0, minOffsetX, maxOffsetX, minOffsetY, maxOffsetY, style, onBegin, onFinalize }) => {

    const offset = useSharedValue({ x: initialOffsetX, y: initialOffsetY });
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: offset.value.x },
                { translateY: offset.value.y },
            ],
        };
    });
    const start = useSharedValue({ x: 0, y: 0 });
    const dragGesture = Gesture.Pan()
        .onBegin((event) => {
            onBegin?.(event)
        })
        .onUpdate((e) => {
            offset.value = {
                x: e.translationX + start.value.x,
                y: e.translationY + start.value.y,
            };
        })
        .onEnd(() => {
            start.value = {
                x: offset.value.x,
                y: offset.value.y,
            };
        })
        .onFinalize((event, success) => {
            onFinalize?.(event, success)
        });

    return (
        <GestureDetector gesture={dragGesture}>
            <Animated.View style={[animatedStyles, style]} >{children}</Animated.View>
        </GestureDetector>
    )
}

export default DragLayout


