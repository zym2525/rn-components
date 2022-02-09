import type { ViewProps, ViewStyle, StyleProp, NativeSyntheticEvent } from 'react-native';
import type { ReactNode } from 'react'

export type BaseProps = ViewProps & {
    /**
     * @param 设置主题颜色
     * @example '#59b8fa'
     */
    primaryColor?: string,
    /**
     * @param 设置强调颜色
     */
    accentColor?: string,
}

export type BezierRadarHeaderProps = BaseProps;

export type ClassicsFooterProps = BaseProps & {
    /**
     * @param 设置移动样式
     */
    spinnerStyle?: number
}

export type ClassicsHeaderProps = BaseProps & {
    /**
     * @param 设置移动样式
     */
    spinnerStyle?: number
}

export type TwoLevelHeaderProps = {
    /**
             * @param 设置下拉 Header 的最大高度比值
             */
    maxRate?: number,
    /**
     * @param 是否禁止在二极状态是上滑关闭状态回到初态
     */
    enablePullToCloseTwoLevel?: Boolean,
    /**
     * @param 设置是否开启刷新功能
     */
    enableRefresh?: Boolean,
    /**
     * @param 设置触发二楼的白百分比
     */
    floorRate?: number,
    /**
     * @param 设置触发刷新的百分比
     */
    refreshRate?: number,
    /**
     * @param 设置是否开启二级刷新
     */
    enableTwoLevel?: Boolean,
    /**
     * @param 设置二楼展开动画持续的时间
     */
    floorDuration?: number,
    /**
     * @param 设置二路底部上划关闭所占高度比率
     */
    bottomPullUpToCloseRate?: number,

    onTwoLevel?: () => void,

    style?: StyleProp<ViewStyle>
}

export type SmartRefreshLayoutProps = {
    /**
   * @optional
   */
    theme: ReactNativePaper.Theme,
    /**
     * @param 主题颜色
     */
    primaryColor?: string,
    /**
     * @param 强调颜色
     */
    accentColor?: string,
    /**
     * @param 显示下拉高度/手指真实下拉高度=阻尼效果
     */
    dragRate?: number,
    /**
     * @param 回弹动画时长（毫秒）
     */
    reboundDuration?: number,
    /**
     * @param Header标准高度（显示下拉高度>=标准高度 触发刷新）
     */
    headerHeight?: number,
    /**
     * @param Footer标准高度（显示上拉高度>=标准高度 触发加载）
     */
    footerHeight?: number,
    /**
    * @param 设置 Header 起始位置偏移量
    */
    headerInsetStart?: number,
    /**
    * @param 设置 Footer 起始位置偏移量
    */
    footerInsetStart?: number,
    /**
     * @param 最大显示下拉高度/Header标准高度
     */
    headerMaxDragRate?: number,
    /**
     * @param 最大显示下拉高度/Footer标准高度
     */
    footerMaxDragRate?: number,
    /**
    * @param 触发刷新距离 与 HeaderHeight 的比率
    */
    headerTriggerRate?: number,
    /**
    * @param 触发加载距离 与 FooterHeight 的比率
    */
    footerTriggerRate?: number,
    /**
     * @param 是否启用下拉刷新功能
     */
    enableRefresh?: Boolean,
    /**
     * @param 是否启用上拉加载功能
     */
    enableLoadMore?: Boolean,
    /**
     * @param 是否启用列表惯性滑动到底部时自动加载更多
     * @description 如果是true 滑动到底部时会直接触发onLoadeMore 如果是false 需要手动下滑到释放加载更多
     */
    enableAutoLoadMore?: Boolean,
    /**
     * @param 是否启用纯滚动模式
     */
    enablePureScrollMode?: Boolean,
    /**
     * @param 是否启用嵌套滚动
     */
    enableNestedScroll?: Boolean,
    /**
     * @param 是否启用越界回弹
     */
    enableOverScrollBounce?: Boolean,
    /**
     * @param 是否在加载完成时滚动列表显示新的内容
     */
    enableScrollContentWhenLoaded?: Boolean,
    /**
     * @param 是否下拉Header的时候向下平移列表或者内容
     */
    enableHeaderTranslationContent?: Boolean,
    /**
     * @param 是否上拉Footer的时候向上平移列表或者内容
     */
    enableFooterTranslationContent?: Boolean,
    /**
     * @param 是否在列表不满一页时候开启上拉加载功能
     */
    enableLoadMoreWhenContentNotFull?: Boolean,
    /**
     * @param 是否在全部加载结束之后Footer跟随内容
     */
    enableFooterFollowWhenNoMoreData?: Boolean,
    /**
     * @param 是否在刷新的时候禁止列表的操作
     */
    disableContentWhenRefresh?: Boolean,
    /**
     * @param 是否在加载的时候禁止列表的操作
     */
    disableContentWhenLoading?: Boolean,
    /**
     * @param 是否启用越界拖动
     */
    enableOverScrollDrag?: Boolean,
    /**
     * @param 上拉刷新回调
     */
    onRefresh?: () => void,
    /**
     * @param 下拉加载回调
     */
    onLoadMore?: () => void,

    onStateChanged?: (e: SmartRefreshLayoutStateChangedEvent) => void,

    onFooterMoving?: (e: SmartRefreshLayoutOnFooterMovingEvent) => void,

    onHeaderMoving?: (e: SmartRefreshLayoutOnHeaderMovingEvent) => void,

    HeaderComponent?: () => ReactNode,

    FooterComponent?: () => ReactNode,

    style?: StyleProp<ViewStyle>;

}

export enum RefreshState {
    Null = 'null',
    None = 'None',
    PullDownToRefresh = 'PullDownToRefresh',
    PullDownCanceled = 'PullDownCanceled',
    ReleaseToRefresh = 'ReleaseToRefresh',
    ReleaseToTwoLevel = 'ReleaseToTwoLevel',
    RefreshReleased = 'RefreshReleased',
    Refreshing = 'Refreshing',
    RefreshFinish = 'RefreshFinish',
    PullUpToLoad = 'PullUpToLoad',
    PullUpCanceled = 'PullUpCanceled',
    ReleaseToLoad = 'ReleaseToLoad',
    TwoLevelReleased = 'TwoLevelReleased',
    LoadReleased = 'LoadReleased',
    Loading = 'Loading',
    LoadFinish = 'LoadFinish',
    TwoLevel = 'TwoLevel',
    TwoLevelFinish = 'TwoLevelFinish',
}

export interface SmartRefreshLayoutStateChangedEvent extends NativeSyntheticEvent<{
    newState: RefreshState,
    oldState: RefreshState,
}> { }

export interface SmartRefreshLayoutOnFooterMovingEvent extends NativeSyntheticEvent<{
    /**
     * @param isDragging true 手指正在拖动 false 回弹动画
     */
    isDragging: Boolean,
    /**
    * @param percent 下拉的百分比 值 = offset/footerHeight (0 - percent - (footerHeight+maxDragHeight) / footerHeight )
    */
    percent: number,
    /**
    * @param offset 下拉的像素偏移量  0 - offset - (footerHeight+maxDragHeight)
    */
    offset: number,
    /**
    * @param footerHeight 高度 HeaderHeight or FooterHeight
    */
    footerHeight: number,
    /**
    * @param maxDragHeight 最大拖动高度
    */
    maxDragHeight: number
}> { }

export interface SmartRefreshLayoutOnHeaderMovingEvent extends NativeSyntheticEvent<{
    /**
     * @param isDragging true 手指正在拖动 false 回弹动画
     */
    isDragging: Boolean,
    /**
    * @param percent
    */
    percent: number,
    /**
    * @param offset 
    */
    offset: number,
    /**
    * @param headerHeight 高度 HeaderHeight
    */
    headerHeight: number,
    /**
    * @param maxDragHeight 最大拖动高度
    */
    maxDragHeight: number
}> { }
