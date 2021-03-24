import React, { Component } from 'react';
import { requireNativeComponent, View, UIManager, findNodeHandle } from 'react-native';
import ClassicsFooter from './ClassicsFooter'
import ClassicsHeader from './ClassicsHeader'
import { SmartRefreshLayoutProps, StateChangedEvent, SmartRefreshLayoutNativeEvent, RefreshState, onFooterMovingEvent, onHeaderMovingEvent } from './types'
import { getViewManagerConfig } from '../../utils/nativeComponentUtils'

const VIEW_MANAGER_NAME: string = 'RNSmartRefreshLayout';

export enum RefreshEventType {
    OnStateChanged = 1,
    OnRefresh,
    OnLoadMore,
    OnFooterMoving,
    OnHeaderMoving,
}


type State = {
    refreshState: RefreshState
}

class SmartRefreshLayout extends Component<SmartRefreshLayoutProps, State> {

    static RefreshState = RefreshState;

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
    }

    constructor(props: SmartRefreshLayoutProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            refreshState: RefreshState.Null
        }
    }

    onChange(event: SmartRefreshLayoutNativeEvent) {
        // console.log('event: ', event.nativeEvent);
        // if (event.nativeEvent.type == 8) {
        //     console.log('event222: ', event.nativeEvent);
        // }
        switch (event.nativeEvent.type) {
            case RefreshEventType.OnStateChanged:
                this.onStateChanged(event.nativeEvent.event);
                break;
            case RefreshEventType.OnRefresh:
                this._handleOnRefresh();
                break;
            case RefreshEventType.OnLoadMore:
                this._handleOnLoadMore();
                break;
            case RefreshEventType.OnFooterMoving:
                this._handeOnFooterMoving(event.nativeEvent.event);
                break;
            case RefreshEventType.OnHeaderMoving:
                this._handeOnHeaderMoving(event.nativeEvent.event);
                break;
            default:
                break;
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
    _handeOnFooterMoving(data: onFooterMovingEvent) {
        let { onFooterMoving } = this.props;
        onFooterMoving && onFooterMoving(data);
    }

    _handeOnHeaderMoving(data: onHeaderMovingEvent) {
        let { onHeaderMoving } = this.props;
        onHeaderMoving && onHeaderMoving(data);
    }

    onStateChanged(event: StateChangedEvent) {
        // console.log('event: ', event);
        let { onStateChanged } = this.props;
        this.setState({
            refreshState: event.newState
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
        let { HeaderComponent } = this.props;
        if (HeaderComponent && typeof HeaderComponent == 'function') {
            let header = HeaderComponent();
            if (React.isValidElement(header)) {
                return header
            } else {
                return <View collapsable={false}></View>
            };
        } else {
            return <ClassicsHeader accentColor='#ffffff' spinnerStyle={ClassicsHeader.SpinnerStyle.Translate} /> //<View collapsable={false}></View>
        }
    }

    _renderFooter() {
        let { FooterComponent } = this.props;
        if (FooterComponent && typeof FooterComponent == 'function') {
            let footer = FooterComponent();
            if (React.isValidElement(footer)) {
                return footer;
            } else {
                return <View collapsable={false}></View>
            };
        } else {
            return <ClassicsFooter accentColor='#ffffff' primaryColor='#59b8fa' spinnerStyle={ClassicsHeader.SpinnerStyle.Scale} /> //<View collapsable={false}></View>
        }
    }

    render() {
        let { children, style, ...rest } = this.props;
        return (
            <RNSmartRefreshLayout style={[{ zIndex: -1, }, style]} {...rest} onChange={this.onChange} >
                {this._renderHeader()}
                {React.Children.only(children)}
                {this._renderFooter()}
            </RNSmartRefreshLayout>
        );
    }
}

interface RNSmartRefreshLayoutProps extends SmartRefreshLayoutProps {
    onChange: (e: SmartRefreshLayoutNativeEvent) => void
}

let RNSmartRefreshLayout = requireNativeComponent<RNSmartRefreshLayoutProps>(VIEW_MANAGER_NAME);

export default SmartRefreshLayout;
