import * as React from 'react';
import {
    Image,
    I18nManager,
    Platform,
    ImageSourcePropType,
    StyleProp,
    ImageStyle
} from 'react-native';
import MaterialCommunityIcons from './MaterialCommunityIcon';
import { withTheme } from 'react-native-paper';

type IconSourceBase = string | ImageSourcePropType;

export type IconSource =
    | IconSourceBase
    | Readonly<{ source: IconSourceBase; direction: 'rtl' | 'ltr' | 'auto' }>
    | ((props: IconProps & { color: string }) => React.ReactNode);

type IconProps = {
    size?: number;
    allowFontScaling?: boolean;
};

type Props = IconProps & {
    color?: string;
    source: any;
    /**
     * @optional
     */
    theme: ReactNativePaper.Theme;
    style?: StyleProp<ImageStyle>
};

const isImageSource = (source: any) =>
    // source is an object with uri
    (typeof source === 'object' &&
        source !== null &&
        Object.prototype.hasOwnProperty.call(source, 'uri') &&
        typeof source.uri === 'string') ||
    // source is a module, e.g. - require('image')
    typeof source === 'number' ||
    // image url on web
    (Platform.OS === 'web' &&
        typeof source === 'string' &&
        (source.startsWith('data:image') ||
            /\.(bmp|jpg|jpeg|png|gif|svg)$/.test(source)));

const getIconId = (source: any) => {
    if (
        typeof source === 'object' &&
        source !== null &&
        Object.prototype.hasOwnProperty.call(source, 'uri') &&
        typeof source.uri === 'string'
    ) {
        return source.uri;
    }

    return source;
};

export const isValidIcon = (source: any) =>
    typeof source === 'string' ||
    typeof source === 'function' ||
    isImageSource(source);

export const isEqualIcon = (a: any, b: any) =>
    a === b || getIconId(a) === getIconId(b);

const Icon = ({ source, color, size = 0, theme, style, ...rest }: Props) => {
    const direction =
        typeof source === 'object' && source.direction && source.source
            ? source.direction === 'auto'
                ? I18nManager.isRTL
                    ? 'rtl'
                    : 'ltr'
                : source.direction
            : null;
    const s =
        typeof source === 'object' && source.direction && source.source
            ? source.source
            : source;
    const iconColor = color || theme.colors.text;

    if (isImageSource(s)) {
        return (
            <Image
                {...rest}
                source={s}
                style={[
                    {
                        transform: [{ scaleX: direction === 'rtl' ? -1 : 1 }],
                    },
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                        width: size,
                        height: size,
                        resizeMode: 'contain',
                    },
                    style
                ]}
            />
        );
    } else if (typeof s === 'string') {
        return (
            <MaterialCommunityIcons
                name={s}
                color={iconColor}
                size={size}
                direction={direction}
                style={style}
            />
        );
    } else if (typeof s === 'function') {
        return s({ color: iconColor, size, direction });
    }

    return null;
};

export default withTheme(Icon);
