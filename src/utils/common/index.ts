import ScaleSize from './scaleSize';

const instance = new ScaleSize({
    portraitWidth: 750,
    landScapeWidth: 1334,
    defaultPixel: 2
})

export function setSizeText(size: number): number {
    return instance.setSizeText(size);
}

export function setSize(size: number): number {
    return instance.setSize(size);
}

export function webViewSetSize(size: number): number {
    return instance.webViewSetSize(size);
}

export function setScrollSize(value: number): number {
    return instance.setScrollSize(value);
}

export function getScrollSize(value: number): number {
    return instance.getScrollSize(value);
}

export function px2dp(value: number): number {
    return instance.getScrollSize(value);
}