import * as React from 'react';
import { requireNativeComponent } from 'react-native';
import type { BezierRadarHeaderProps } from './types';

class BezierRadarHeader extends React.Component<BezierRadarHeaderProps> {

    constructor(props: BezierRadarHeaderProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <BezierRadarHeaderManager {...this.props} />
        )
    }
}

const BezierRadarHeaderManager = requireNativeComponent<BezierRadarHeaderProps>(
    'RNBezierRadarHeader'
);

export default BezierRadarHeader;
