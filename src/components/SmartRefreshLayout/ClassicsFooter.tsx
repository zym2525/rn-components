import React, { Component } from 'react';
import { requireNativeComponent } from 'react-native';
import { SpinnerStyle } from '../../constants/enum'
import type { ClassicsFooterProps } from './types';

class ClassicsFooter extends Component<ClassicsFooterProps> {

    /**
     * @description 不支持：MatchLayout
     */
    static SpinnerStyle = SpinnerStyle;

    constructor(props: ClassicsFooterProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <RNClassicsFooter {...this.props} />
        );
    }
}

let RNClassicsFooter = requireNativeComponent<ClassicsFooterProps>('RNClassicsFooter');

export default ClassicsFooter;
