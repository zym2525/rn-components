export interface BaseNativeEventInner {
    type: number | string,
    event?: any
}

export interface BaseNativeEvent {
    nativeEvent: BaseNativeEventInner
}