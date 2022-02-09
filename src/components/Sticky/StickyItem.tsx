import React, { useState, ReactNode } from 'react'
import type { StyleProp, ViewStyle, LayoutChangeEvent } from 'react-native'
import Animated from 'react-native-reanimated';

export type StickyItemProps = {
    /**
         * 外层ScrollView滚动高度
         */
    stickyScrollY: Animated.Value<number>,
    /**
     * 吸顶组件前面滚动多少高度后固定
     */
    stickyHeaderY?: number

    children?: ReactNode
    style?: StyleProp<ViewStyle>
}

/**
 * 
 * @description scrollView定义stickyHeaderIndices也有类似效果 SectionList的stickySectionHeadersEnabled
 */
const StickyItem = (props: StickyItemProps) => {

    const [stickyLayoutY, setStickyLayoutY] = useState(0);

    const _onLayout = (event: LayoutChangeEvent) => {
        setStickyLayoutY(
            event.nativeEvent.layout.y,
        );
    }

    const { stickyHeaderY = -1, stickyScrollY = new Animated.Value(0), children, style } = props;

    const y = stickyHeaderY != -1 ? stickyHeaderY : stickyLayoutY;

    const translateY = stickyScrollY.interpolate({
        inputRange: [-1, 0, y, y + 1],
        outputRange: [0, 0, 0, 1],
    });
    return (
        <Animated.View
            onLayout={_onLayout}
            style={
                [
                    style,
                    { zIndex: 9999, transform: [{ translateY }] }
                ] as any}
        >
            {children}

        </Animated.View>
    )
}

export default StickyItem