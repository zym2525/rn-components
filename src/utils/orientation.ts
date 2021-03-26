import { NativeModules, DeviceEventEmitter, EmitterSubscription } from 'react-native'

interface GetOrientationCallbackType {
    (error: null | number, orientation: null | number): void,
    // (error: null, orientation: number): void,
    // (error: number, orientation: null): void,
}

type OrientationType = {
    /**
     * 获取设备方向
     * @param cb 
     */
    getOrientation(cb: GetOrientationCallbackType): void,
    getSpecificOrientation(cb: GetOrientationCallbackType): void,
    /**
     * 垂直锁定
     */
    lockToPortrait(): void
    /**
     * 水平锁定
     */
    lockToLandscape(): void
    lockToLandscapeRight(): void
    lockToLandscapeLeft(): void
    /**
     * 解除锁定
     */
    unlockAllOrientations(): void
    /**
     * null表示初始化获取未成功
     */
    initialOrientation: OrientationValue | null
}

enum OrientationValue {
    PORTRAIT = 'PORTRAIT',
    LANDSCAPE = 'LANDSCAPE',
    UNKNOWN = 'UNKNOWN',
    null = 'null',
}

interface Listeners {
    [propName: string]: EmitterSubscription;
}

const Orientation = NativeModules.Orientation as OrientationType;


var listeners: Listeners = {};
var orientationDidChangeEvent = 'orientationDidChange';
var specificOrientationDidChangeEvent = 'specificOrientationDidChange';

var id = 0;
const META = '__listener_id';

interface OrientationListener {
    (e: OrientationValue): void,
    [META]: string
}

function getKey(listener: OrientationListener) {
    if (!listener.hasOwnProperty(META)) {
        if (!Object.isExtensible(listener)) {
            return 'F';
        }

        Object.defineProperty(listener, META, {
            value: 'L' + ++id,
        });
    }

    return listener[META];
};

export default {
    getOrientation(cb: GetOrientationCallbackType) {
        Orientation.getOrientation((error, orientation) => {
            cb(error, orientation);
        });
    },

    getSpecificOrientation(cb: GetOrientationCallbackType) {
        Orientation.getSpecificOrientation((error, orientation) => {
            cb(error, orientation);
        });
    },

    lockToPortrait() {
        Orientation.lockToPortrait();
    },

    lockToLandscape() {
        Orientation.lockToLandscape();
    },

    lockToLandscapeRight() {
        Orientation.lockToLandscapeRight();
    },

    lockToLandscapeLeft() {
        Orientation.lockToLandscapeLeft();
    },

    unlockAllOrientations() {
        Orientation.unlockAllOrientations();
    },

    addOrientationListener(cb: OrientationListener) {
        var key = getKey(cb);
        listeners[key] = DeviceEventEmitter.addListener(orientationDidChangeEvent,
            (body: { orientation: OrientationValue }) => {
                cb(body.orientation);
            });
    },

    removeOrientationListener(cb: OrientationListener) {
        var key = getKey(cb);

        if (!listeners[key]) {
            return;
        }

        listeners[key].remove();
        (listeners[key] as any) = null;
    },

    addSpecificOrientationListener(cb: OrientationListener) {
        var key = getKey(cb);

        listeners[key] = DeviceEventEmitter.addListener(specificOrientationDidChangeEvent,
            (body: { specificOrientation: OrientationValue }) => {
                cb(body.specificOrientation);
            });
    },

    removeSpecificOrientationListener(cb: OrientationListener) {
        var key = getKey(cb);

        if (!listeners[key]) {
            return;
        }

        listeners[key].remove();
        (listeners[key] as any) = null;
    },

    getInitialOrientation() {
        return Orientation.initialOrientation;
    }
}
