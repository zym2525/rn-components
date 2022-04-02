import React, { Component } from 'react';
import { requireNativeComponent, View, UIManager, findNodeHandle } from 'react-native';
import ClassicsFooter from './ClassicsFooter'
import ClassicsHeader from './ClassicsHeader'
import { SmartRefreshLayoutProps, SmartRefreshLayoutStateChangedEvent, RefreshState } from './types'
import { getViewManagerConfig } from '../../utils/nativeComponentUtils'
import BezierRadarHeader from './BezierRadarHeader';
import TwoLevelHeader from './TwoLevelHeader';
import { SpinnerStyle } from './enum'
import { withTheme, Colors } from 'react-native-paper'

const VIEW_MANAGER_NAME: string = 'RNSmartRefreshLayout';

// export enum RefreshEventType {
//     OnStateChanged = 1,
//     OnRefresh,
//     OnLoadMore,
//     OnFooterMoving,
//     OnHeaderMoving,
// }

type State = {
    refreshState: RefreshState
}
export class SmartRefreshLayout extends Component<SmartRefreshLayoutProps & { ref?: React.RefObject<SmartRefreshLayout> | React.MutableRefObject<SmartRefreshLayout | undefined> }, State> {

    static RefreshState = RefreshState;
    static ClassicsFooter = ClassicsFooter;
    static ClassicsHeader = ClassicsHeader;
    static BezierRadarHeader = BezierRadarHeader;
    static TwoLevelHeader = TwoLevelHeader;
    static SpinnerStyle = SpinnerStyle;

    static defaultProps = {
        dragRate: 0.5,
        reboundDuration: 300,
        headerHeight: 100,
        footerHeight: 100,
        headerInsetStart: 0,
        footerInsetStart: 0,
        headerMaxDragRate: 2,
        footerMaxDragRate: 2,
        headerTriggerRate: 1,
        footerTriggerRate: 1,
        enableRefresh: true,
        enableLoadMore: false,
        enableAutoLoadMore: true,
        enablePureScrollMode: false,
        enableNestedScroll: false,
        enableOverScrollBounce: true,
        enableScrollContentWhenLoaded: true,
        enableHeaderTranslationContent: true,
        enableFooterTranslationContent: true,
        enableLoadMoreWhenContentNotFull: true,
        enableFooterFollowWhenNoMoreData: false,
        disableContentWhenRefresh: true,
        disableContentWhenLoading: true,
        enableOverScrollDrag: true,
        // accentColor: '#999999',
        // primaryColor: '#ffffff'
    }

    constructor(props: SmartRefreshLayoutProps) {
        super(props);
        this.state = {
            refreshState: RefreshState.Null
        }
    }

    _handleOnRefresh() {
        let { onRefresh } = this.props;
        if (onRefresh) {
            onRefresh();
        } else {
            this.finishRefresh({ delayed: 2000 })
        }
    }

    _handleOnLoadMore() {
        let { onLoadMore } = this.props;
        if (onLoadMore) {
            onLoadMore();
        } else {
            this.finishLoadMore({ delayed: 2000 })
        }
    }

    /**
     * 
     * @param {object} data 
     * @example data:{percent: 0.019999999552965164, maxDragHeight: 400, footerHeight: 200, offset: 4, isDragging: false}
     */
    // _handeOnFooterMoving(data: SmartRefreshLayoutOnFooterMovingEvent) {
    //     let { onFooterMoving } = this.props;
    //     onFooterMoving && onFooterMoving(data);
    // }

    // _handeOnHeaderMoving(data: SmartRefreshLayoutOnHeaderMovingEvent) {
    //     let { onHeaderMoving } = this.props;
    //     onHeaderMoving && onHeaderMoving(data);
    // }

    onStateChanged(event: SmartRefreshLayoutStateChangedEvent) {
        // console.log('event: ', event);
        let { onStateChanged } = this.props;
        this.setState({
            refreshState: event.nativeEvent.newState
        })
        /**
         * @example {newState: 'ReleaseToRefresh', oldState: 'PullDownToRefresh'}
         */
        onStateChanged && onStateChanged(event);
    }

    getCurrentState(): RefreshState {
        return this.state.refreshState;
    }

    /**
     * @description 自动刷新
     * @param {number} delayed 延迟毫秒 
     */
    autoRefresh(delayed = 0) {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            getViewManagerConfig(VIEW_MANAGER_NAME).Commands.autoRefresh,
            [delayed],
        );
    }

    /**
     * @description 自动刷新，只显示动画不执行刷新
     */
    autoRefreshAnimationOnly() {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            getViewManagerConfig(VIEW_MANAGER_NAME).Commands.autoRefreshAnimationOnly,
            [],
        );
    }

    /**
     * @description 自动加载
     * @param {number} delayed 延迟毫秒 
     */
    autoLoadMore(delayed = 0) {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            getViewManagerConfig(VIEW_MANAGER_NAME).Commands.autoLoadMore,
            [delayed],
        );
    }

    /**
     * @description 自动加载，只显示动画不执行刷新
     */
    autoLoadMoreAnimationOnly() {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            getViewManagerConfig(VIEW_MANAGER_NAME).Commands.autoLoadMoreAnimationOnly,
            [],
        );
    }

    /**
     * @description 结束刷新
     * @param {number} delayed 延迟毫秒 
     * @param {boolean} success 刷新失败
     */
    finishRefresh({ delayed = 0, success = true } = {}) {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            getViewManagerConfig(VIEW_MANAGER_NAME).Commands.finishRefresh,
            [delayed, success],
        );
    }

    /**
     * @description 结束加载
     * @param {number} delayed 延迟毫秒 
     * @param {boolean} success 刷新失败
     */
    finishLoadMore({ delayed = 0, success = true } = {}) {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            getViewManagerConfig(VIEW_MANAGER_NAME).Commands.finishLoadMore,
            [delayed, success],
        );
    }

    /**
     * @description 完成加载并标记没有更多数据
     */
    finishLoadMoreWithNoMoreData() {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            getViewManagerConfig(VIEW_MANAGER_NAME).Commands.finishLoadMoreWithNoMoreData,
            [],
        );
    }

    /**
     * @description 关闭 Header 或者 Footer
     */
    closeHeaderOrFooter() {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            getViewManagerConfig(VIEW_MANAGER_NAME).Commands.closeHeaderOrFooter,
            [],
        );
    }

    /**
     * @description 设置更多数据状态
     * @param {boolean} delayed 延迟毫秒
     */
    setNoMoreData(hasMoreData = false) {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            getViewManagerConfig(VIEW_MANAGER_NAME).Commands.setNoMoreData,
            [hasMoreData],
        );
    }

    _renderHeader() {
        let { HeaderComponent, accentColor: customAccentColor, primaryColor: customPrimaryColor, theme } = this.props;
        if (HeaderComponent && typeof HeaderComponent == 'function') {
            let header = HeaderComponent();
            if (React.isValidElement(header)) {
                return header
            } else {
                return <View collapsable={false}></View>
            };
        } else {
            const accentColor = customAccentColor || Colors.white;
            const primaryColor = customPrimaryColor || theme.colors.primary;
            console.log('primaryColor: ', primaryColor);
            return <ClassicsHeader accentColor={accentColor} primaryColor={primaryColor} spinnerStyle={ClassicsHeader.SpinnerStyle.Translate} /> //<View collapsable={false}></View>
        }
    }

    _renderFooter() {
        let { FooterComponent, accentColor: customAccentColor, primaryColor: customPrimaryColor, theme } = this.props;
        if (FooterComponent && typeof FooterComponent == 'function') {
            let footer = FooterComponent();
            if (React.isValidElement(footer)) {
                return footer;
            } else {
                return <View collapsable={false}></View>
            };
        } else {
            const accentColor = customAccentColor || Colors.white;
            const primaryColor = customPrimaryColor || theme.colors.primary;
            return <ClassicsFooter accentColor={accentColor} primaryColor={primaryColor} spinnerStyle={ClassicsHeader.SpinnerStyle.Scale} /> // 
        }
    }

    render() {
        let { children, style, accentColor: customAccentColor, primaryColor: customPrimaryColor, theme, ref, ...rest } = this.props;
        const accentColor = customAccentColor || Colors.white;
        const primaryColor = customPrimaryColor || theme.colors.primary;
        return (
            <RNSmartRefreshLayout
                style={[{ zIndex: -1, }, style]}
                {...rest}
                accentColor={accentColor}
                primaryColor={primaryColor}
                onStateChanged={this.onStateChanged.bind(this)}
                onRefresh={this._handleOnRefresh.bind(this)}
                onLoadMore={this._handleOnLoadMore.bind(this)}
            >
                {this._renderHeader()}
                {React.Children.only(children)}
                {this._renderFooter()}
            </RNSmartRefreshLayout>
        );
    }
}



let RNSmartRefreshLayout = requireNativeComponent<Omit<SmartRefreshLayoutProps, 'theme'>>(VIEW_MANAGER_NAME);

export default withTheme(SmartRefreshLayout);