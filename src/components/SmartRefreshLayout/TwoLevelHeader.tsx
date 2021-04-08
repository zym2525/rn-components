import React, { Component } from 'react';
import { requireNativeComponent, UIManager, findNodeHandle } from 'react-native';
import type { TwoLevelHeaderProps } from './types'
import { getViewManagerConfig } from '../../utils/nativeComponentUtils'
import type { BaseNativeEvent } from '../../constants/interface'

const VIEW_MANAGER_NAME: string = 'RNTwoLevelHeaderManager';

// export enum TwoLevelHeaderEventType {
//     OnTwoLevel = 8
// }

export interface TwoLevelHeaderNativeEvent extends BaseNativeEvent { }

class TwoLevelHeader extends Component<TwoLevelHeaderProps> {

    static defaultProps = {
        maxRate: 2.5,
        enablePullToCloseTwoLevel: true,
        enableRefresh: true,
        floorRate: 1.9,
        refreshRate: 1,
        enableTwoLevel: true,
        floorDuration: 1000,
        bottomPullUpToCloseRate: 1 / 6,
    }

    constructor(props: TwoLevelHeaderProps) {
        super(props);
        this.state = {
        };
        this.onChange = this.onChange.bind(this);
    }

    /**
     * @description 结束二级刷新
     */
    finishTwoLevel() {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            getViewManagerConfig(VIEW_MANAGER_NAME).Commands.finishTwoLevel,
            [],
        );
    }

    /**
     * @description 主动打开二楼
     * @param {boolean} withOnTwoLevelListener 是否触发 OnTwoLevelListener 监听器
     */
    openTwoLevel(withOnTwoLevelListener = true) {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            getViewManagerConfig(VIEW_MANAGER_NAME).Commands.openTwoLevel,
            [withOnTwoLevelListener],
        );
    }

    //@ts-ignore
    onChange(event: TwoLevelHeaderNativeEvent) {
        // console.log('event: ', event.nativeEvent);
        // switch (event.nativeEvent.type) {
        //     case TwoLevelHeaderEventType.OnTwoLevel:
        //         this.onTwoLevel();
        //         break;
        //     default:
        //         break;
        // }
    }

    // onTwoLevel() {
    //     let { onTwoLevel } = this.props;
    //     onTwoLevel && onTwoLevel();
    // }

    render() {
        return (
            <RNTwoLevelHeaderManager {...this.props} onChange={this.onChange} />
        );
    }
}

type TwoLevelHeaderManagerProps = TwoLevelHeaderProps & {
    onChange(event: TwoLevelHeaderNativeEvent): void
}

let RNTwoLevelHeaderManager = requireNativeComponent<TwoLevelHeaderManagerProps>(VIEW_MANAGER_NAME);

export default TwoLevelHeader;
