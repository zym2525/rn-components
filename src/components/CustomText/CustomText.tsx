import React, { FC } from 'react'
import { Text as RNText, TextStyle, TextProps, StyleProp } from 'react-native'
import { withTheme } from 'react-native-paper'

const myStyle: TextStyle = {
    includeFontPadding: false,
    textAlignVertical: 'center',
}

type Props = React.ComponentProps<typeof RNText> & {
    style?: StyleProp<TextStyle>;
    /**
     * @optional
     */
    theme: ReactNativePaper.Theme;
};

const Text: FC<Props> = ({ style, theme, ...rest }) => {
    return <RNText
        style={[
            {
                ...theme.fonts.regular,
                color: theme.colors.text,
            },
            myStyle,
            style
        ]}
        allowFontScaling={false}
        {...rest} />
}

export default withTheme(Text);