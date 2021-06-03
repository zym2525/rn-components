import React, { Component } from 'react';
import { requireNativeComponent } from 'react-native';
import { SpinnerStyle } from './enum'
import type { ClassicsHeaderProps } from './types'

class ClassicsHeader extends Component<ClassicsHeaderProps> {

    /**
     * @description 不支持：MatchLayout
     */
    static SpinnerStyle = SpinnerStyle

    constructor(props: ClassicsHeaderProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <RNClassicsHeader {...this.props} />
        );
    }
}

let RNClassicsHeader = requireNativeComponent<ClassicsHeaderProps>('RNClassicsHeader');

export default ClassicsHeader;
