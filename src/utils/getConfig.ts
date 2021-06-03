import _ from 'lodash'

interface ConfigType {
    /**
     * 设计稿纵向宽度
     */
    portraitWidth?: number,
    /**
     * 设计稿横向宽度
     */
    landScapeWidth?: number,
    /**
     * 设计稿像素比dpr
     */
    defaultPixel?: number
}

let Config: Required<ConfigType> = {
    portraitWidth: 750,
    landScapeWidth: 1334,
    defaultPixel: 2
}

export function setConfig(userConfig: ConfigType = {}) {
    Config = _.merge(Config, userConfig)
}

export function getConfig() {
    return Config;
}