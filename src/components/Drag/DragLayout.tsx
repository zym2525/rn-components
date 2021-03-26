import React, { ReactNode } from 'react'
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const {
    set,
    cond,
    eq,
    add,
    Value,
    event,
    defined,
    and,
    lessThan,
    greaterThan } = Animated;

export type DragLayoutProps = {
    children?: ReactNode
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
}

const DragLayout = ({ children, initialOffsetX = 0, initialOffsetY = 0, minOffsetX, maxOffsetX, minOffsetY, maxOffsetY }: DragLayoutProps) => {

    const dragX = new Value(0);
    const dragY = new Value(0);
    const state = new Value(-1);
    const dragVX = new Value(0);

    const _onGestureEvent = event([
        {
            nativeEvent: { translationX: dragX, translationY: dragY, velocityY: dragVX, state: state },
        },
    ]);

    const offsetX = new Value(initialOffsetX);

    const _transX = cond(
        eq(state, State.ACTIVE),
        withEnhancedLimit(add(offsetX, dragX), minOffsetX, maxOffsetX),
        set(offsetX, withEnhancedLimit(add(offsetX, dragX), minOffsetX, maxOffsetX))
    );

    const offsetY = new Value(initialOffsetY);

    const _transY = cond(
        eq(state, State.ACTIVE),
        withEnhancedLimit(add(offsetY, dragY), minOffsetY, maxOffsetY),
        set(offsetY, withEnhancedLimit(add(offsetY, dragY), minOffsetY, maxOffsetY))
    );

    function withEnhancedLimit(disV: Animated.Node<number>, minV: any, maxV: any) {
        return cond(
            and(defined(minV), lessThan(disV, minV)),
            minV,
            cond(
                and(defined(maxV), greaterThan(disV, maxV)),
                maxV,
                disV
            )
        )
    }

    return (
        <PanGestureHandler
            maxPointers={1}
            minDist={10}
            onGestureEvent={_onGestureEvent}
            onHandlerStateChange={_onGestureEvent}
        >
            <Animated.View
                style={[
                    {
                        transform: [
                            { translateX: _transX }, { translateY: _transY },
                        ] as any,
                    },
                ]}
            >
                {children}
            </Animated.View>
        </PanGestureHandler>

    )
}

export default DragLayout


