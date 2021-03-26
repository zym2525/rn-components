import React, { ReactNode } from 'react'
import { Text as RNText, TextStyle, TextProps } from 'react-native'

const myStyle: TextStyle = {
    fontFamily: 'normal',
    includeFontPadding: false,
    textAlignVertical: 'center',
}

type Props = TextProps & {
    children?: ReactNode
}

function Text({ style, children, ...rest }: Props) {
    return <RNText style={[myStyle, style]} {...rest}>{children}</RNText>
}

export default Text;