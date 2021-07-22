import React, { Component } from 'react';
import { View, StyleProp, ViewStyle, } from 'react-native';
import { ListEmptyHint, ErrorHint } from '../ListEmptyHint/ListEmptyHint'

export type LoadingLayoutProps = {
    /**
     * 内容是否加载完成
     */
    isLoaded: boolean
    /**
     * 内容是否加载失败
     */
    error: boolean
    /**
     * 重新加载回调
     */
    loadError?(): void

    style?: StyleProp<ViewStyle>

    EmptyComponent?: React.ReactElement
}

class LoadingLayout extends Component<LoadingLayoutProps> {

    render() {
        let { isLoaded, error, children, loadError, style, EmptyComponent } = this.props;
        return (
            <View style={[{ flex: 1 }, style]}>
                {isLoaded
                    ? error ? <ErrorHint onPress={loadError} />
                        : children
                    : EmptyComponent ? EmptyComponent : <ListEmptyHint />}
            </View>
        );
    }
}

export default LoadingLayout;
