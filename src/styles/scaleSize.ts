import { Dimensions, PixelRatio } from 'react-native';
import Orientation from '../utils/orientation';

const initial = Orientation.getInitialOrientation();

export const deviceWidth = Dimensions.get('window').width;

const fontScale = PixelRatio.getFontScale(); //返回字体大小缩放比例
export const pixelRatio = PixelRatio.get() //当前设备的像素密度

export type ScaleSizeProps = {
    /**
     * 
     * @param portraitWidth 设计稿竖直长度 纵向app是用
     */
    portraitWidth: number,
    /**
     * 
     * @param landScapeWidth 设计稿横线长度 水平app是用
     */
    landScapeWidth: number,
    /**
    * 
    * @param defaultPixel 设计稿像素密度 dpr
    */
    defaultPixel: number
}

export default class ScaleSize {

    public defaultWidth: number;
    public w2: number;
    public scale: number;
    public portraitWidth: number;
    public landScapeWidth: number;
    public defaultPixel: number;

    public constructor(options: ScaleSizeProps) {
        let { portraitWidth, landScapeWidth, defaultPixel } = options;
        this.portraitWidth = portraitWidth;
        this.landScapeWidth = landScapeWidth;
        this.defaultPixel = defaultPixel;
        this.defaultWidth = initial === 'PORTRAIT' ? portraitWidth : landScapeWidth;
        this.w2 = this.defaultWidth / defaultPixel;
        this.scale = deviceWidth / this.w2;
    }

    setSizeText(size: number): number {
        size = Math.round((size * this.scale + 0.49) / fontScale);
        return size / this.defaultPixel;
    }

    setSize(size: number): number {
        size = Math.round(size * this.scale + 0.49);
        return size / this.defaultPixel;
    }

    webViewSetSize(size: number): number {
        return size * 1.5 / this.defaultWidth * deviceWidth;
    }

    setScrollSize(value: number): number {
        return value * pixelRatio
    }

    getScrollSize(value: number): number {
        return value / pixelRatio
    }

    px2dp(value: number): number {
        return value / pixelRatio
    }
}