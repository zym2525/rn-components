import React, { FC } from 'react'
import { Text as RNText, TextStyle, TextProps } from 'react-native'

const myStyle: TextStyle = {
    fontFamily: 'normal',
    includeFontPadding: false,
    textAlignVertical: 'center',
}

const Text: FC<TextProps> = ({ style, children, ...rest }) => {
    return <RNText style={[myStyle, style]} allowFontScaling={false} {...rest}>{children}</RNText>
}

export default Text;