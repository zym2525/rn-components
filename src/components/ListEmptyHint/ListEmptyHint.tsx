import React, { FC } from 'react'
import { View, ActivityIndicator, Image, StyleSheet, StyleProp, ViewStyle, ImageSourcePropType, TextProps } from 'react-native'
import Text from '../CustomText/CustomText'

const icons = {
    noData: require('../../img/component/bg-noData.png')
}

type ListEmptyHintProps = {
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextProps>
}

export const ListEmptyHint: FC<ListEmptyHintProps> = ({ style, textStyle }) => (
    <View style={[{ flexDirection: 'row', marginTop: 40, justifyContent: 'center', }, style]}>
        <ActivityIndicator size="small" color="#888888" />
        <Text style={[{ textAlign: 'center', marginLeft: 10, }, textStyle]}>数据加载中......</Text>
    </View>
)

type ErrorHintProps = {
    style?: StyleProp<ViewStyle>
    onPress?: () => void
}

export const ErrorHint: FC<ErrorHintProps> = ({ onPress, style }) => (
    <Text onPress={onPress} style={[{ textAlign: 'center', marginLeft: 10, marginTop: 50 }, style]}>出错了，请点击重新加载</Text>
)

export type NoDataProps = {
    text?: string,
    style?: StyleProp<ViewStyle>,
    bgImg?: ImageSourcePropType
}

export const NoData = ({ text = '没有查找到你要的数据', style, bgImg = icons.noData }: NoDataProps) => (
    <View style={[styles.noData, style]}>
        <Image style={styles.noDataImg} source={bgImg} />
        <Text style={styles.noDataText}>{text}</Text>
    </View>
)

const styles = StyleSheet.create({
    noData: {
        alignItems: 'center',
        marginTop: 180
    },
    noDataImg: {
        width: 180,
        height: 120,
        marginBottom: 20,
    },
    noDataText: {
        fontSize: 16,
        color: '#999'
    }
})