import { StyleSheet, TouchableWithoutFeedback, GestureResponderEvent, } from 'react-native'
import React from 'react'
import { TouchableRipple, withTheme, } from 'react-native-paper'
import color from 'color'
import type { $RemoveChildren } from '../../utils/types'
import Icon, { IconSource } from '../Icon/Icon'
import CrossFadeIcon from '../Icon/CrossFadeIcon'

type Props = $RemoveChildren<typeof TouchableRipple> & {
    /**
  * Icon to display.
  */
    icon: IconSource;
    color?: string;
    disabled?: boolean;
    onPress?: (e: GestureResponderEvent) => void;
    ref?: React.RefObject<TouchableWithoutFeedback>;
    /**
   * @optional
   */
    theme: ReactNativePaper.Theme;
    size?: number;
    animated?: boolean;
}

const IconButton = ({
    color: customColor,
    theme,
    onPress,
    disabled,
    style,
    icon,
    size = 0,
    animated = false,
}: Props) => {

    const iconColor =
        typeof customColor !== 'undefined' ? customColor : theme.colors.text;
    const rippleColor = color(iconColor).alpha(0.32).rgb().string();

    const IconComponent = animated ? CrossFadeIcon : Icon;

    return (
        <TouchableRipple
            borderless
            centered
            onPress={onPress}
            rippleColor={rippleColor}
            style={[
                styles.container,
                { width: size, height: size, borderRadius: size / 2 },
                disabled && styles.disabled,
                style,
            ]}
            // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
            accessibilityTraits={disabled ? ['button', 'disabled'] : 'button'}
            accessibilityComponentType="button"
            accessibilityRole="button"
            accessibilityState={{ disabled }}
            disabled={disabled}
            hitSlop={
                TouchableRipple.supported
                    ? { top: 10, left: 10, bottom: 10, right: 10 }
                    : { top: 6, left: 6, bottom: 6, right: 6 }
            }
        >
            <IconComponent color={iconColor} source={icon} size={size} />
        </TouchableRipple>
    )
}

export default withTheme(IconButton)

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        margin: 6,
    },
    disabled: {
        opacity: 0.32,
    },
})