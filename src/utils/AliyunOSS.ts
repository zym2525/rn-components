import {
  NativeEventEmitter,
  NativeAppEventEmitter,
  NativeModules,
  Platform
} from "react-native";
// import Config from '../../../baseConfig'

type Configuration = {
  timeoutIntervalForRequest: number
  maxRetryCount: number,
  timeoutIntervalForResource?: number,
}

type AsyncUploadRes = 'UploadSuccess' | "UploadFail";

type RNAliyunOSSType = {
  initWithPlainTextAccessKey(accessKeyId: string, accessKeySecret: string, endPoint: string, configuration: Configuration): void
  initWithImplementedSigner(signature: string, accessKey: string, endPoint: string, configuration: Configuration): void
  initWithSecurityToken(securityToken: string, accessKey: string, secretKey: string, endPoint: string, configuration: Configuration): void
  asyncUpload(bucketName: string, ossFile: string, sourceFile: string): Promise<AsyncUploadRes>
  asyncDownload(bucketName: string, ossFile: string, updateDate: string): Promise<string>
}

type ConfigType = {
  oss: {
    accessKey: {
      AccessKey: string
      SecretKey: string
    },
    endPoint: string
    bucketName: string
  }
}

type DefaultConfigType = {
  configuration: Configuration
  accessKey: {
    AccessKey: string
    SecretKey: string
  },
  endPoint: string
  bucketName: string
}

type ConfigInput = {
  configuration?: Configuration
  accessKey?: {
    AccessKey?: string
    SecretKey?: string
  },
  endPoint?: string
  bucketName?: string
}

type AsyncUploadInput = {
  bucketName: string
  objectKey: string
  filepath: string
}

type AsyncDownloadInput = {
  bucketName: string
  objectKey: string
  filepath: string
}



const Config: ConfigType = {
  oss: {
    accessKey: {
      AccessKey: '',
      SecretKey: '',
    },
    endPoint: '',
    bucketName: ''
  }
}
const RNAliyunOSS = NativeModules.RNAliyunOSS as RNAliyunOSSType;
const UPLOAD_EVENT = 'uploadProgress';
const DOWNLOAD_EVENT = 'downloadProgress';
const _subscriptions = new Map();

type Events = {
  [UPLOAD_EVENT]: {
    status?: 'success'
    exception?: string
  }
  [DOWNLOAD_EVENT]: {
    currentSize: string
    totalSize: string
  }
}

// let subscription;

//default configuration for OSS Client
const defaultConfig: DefaultConfigType = {
  configuration: {
    maxRetryCount: 3,
    timeoutIntervalForRequest: 30,
    timeoutIntervalForResource: 24 * 60 * 60
  },
  accessKey: {
    ...Config.oss.accessKey
  },
  endPoint: Config.oss.endPoint,
  bucketName: Config.oss.bucketName
};

export default {

  //Enable dev mode
  // enableDevMode() {
  //     RNAliyunOSS.enableDevMode();
  // },

  /**
   * Initialize the OSS Client
   * Mode: PlainTextAKSK
   */
  initWithPlainTextAccessKey(configInput: ConfigInput = {}) {
    let config = { ...defaultConfig, ...configInput } as DefaultConfigType;
    RNAliyunOSS.initWithPlainTextAccessKey(config.accessKey.AccessKey, config.accessKey.SecretKey, config.endPoint, config.configuration);
  },

  /**
   * Initialize the OSS Client
   * Mode: ImplementedSigner
   */
  initWithImplementedSigner(signature: string, accessKey = defaultConfig.accessKey.AccessKey, endPoint = defaultConfig.endPoint, configuration = defaultConfig.configuration) {
    RNAliyunOSS.initWithImplementedSigner(signature, accessKey, endPoint, configuration);
  },

  /**
   * Initialize the OSS Client
   * Mode: SecurityToken (STS)
   */
  initWithSecurityToken(securityToken: string, accessKey = defaultConfig.accessKey.AccessKey, secretKey = defaultConfig.accessKey.SecretKey, endPoint = defaultConfig.endPoint, configuration = defaultConfig.configuration) {
    RNAliyunOSS.initWithSecurityToken(securityToken, accessKey, secretKey, endPoint, configuration);
  },

  /**
   * Asynchronously uploading
   */
  asyncUpload(params: AsyncUploadInput = { bucketName: defaultConfig.bucketName, objectKey: '', filepath: '' }) {
    return RNAliyunOSS.asyncUpload(params.bucketName, params.objectKey, params.filepath);
  },

  /**
   * Asynchronously downloading
   */
  asyncDownload(params: AsyncDownloadInput = { bucketName: defaultConfig.bucketName, objectKey: 'aadd.png', filepath: '' }) {
    return RNAliyunOSS.asyncDownload(params.bucketName, params.objectKey, params.filepath);
  },

  /**
   * event listener for native upload/download event
   * @param event one of 'uploadProgress' or 'downloadProgress'
   * @param callback a callback function accepts one params: event
   */
  addEventListener<K extends keyof Events>(type: K, handler: (event: Events[K]) => void): boolean | void {
    var listener;
    if (Platform.OS === 'ios') {
      const Emitter = new NativeEventEmitter(RNAliyunOSS as any);
      if (type === UPLOAD_EVENT) {
        listener = Emitter.addListener(
          'uploadProgress',
          (uploadData: Events[K]) => {
            handler(uploadData);
          }
        );
      } else if (type === DOWNLOAD_EVENT) {
        listener = Emitter.addListener(
          'downloadProgress',
          (downloadData: Events[K]) => {
            handler(downloadData);
          }
        );
      } else {
        return false;
      }
    }
    else {
      if (type === UPLOAD_EVENT) {
        listener = NativeAppEventEmitter.addListener(
          'uploadProgress',
          (uploadData: Events[K]) => {
            handler(uploadData);
          }
        );
      } else if (type === DOWNLOAD_EVENT) {
        listener = NativeAppEventEmitter.addListener(
          'downloadProgress',
          (downloadData: Events[K]) => {
            handler(downloadData);
          }
        );
      } else {
        return false;
      }
    }
    _subscriptions.set(handler, listener);
  },
  // addEventListener(event, callback) {
  //     const RNAliyunEmitter = Platform.OS === 'ios' ? new NativeEventEmitter(RNAliyunOSS) : new DeviceEventEmitter(RNAliyunOSS);
  //     switch (event) {
  //         case 'uploadProgress':
  //             subscription = RNAliyunEmitter.addListener(
  //                 'uploadProgress',
  //                 e => callback(e)
  //             );
  //             break;
  //         case 'downloadProgress':
  //             subscription = RNAliyunEmitter.addListener(
  //                 'downloadProgress',
  //                 e => callback(e)
  //             );
  //             break;
  //         default:
  //             break;
  //     }
  // },

  /**
   * remove event listener for native upload/download event
   * @param event one of 'uploadProgress' or 'downloadProgress'
   */
  // removeEventListener(event) {
  //     switch (event) {
  //         case 'uploadProgress':
  //           _subscriptions.remove();
  //             break;
  //         case 'downloadProgress':
  //           _subscriptions.remove();
  //             break;
  //         default:
  //             break;
  //     }
  // }

  removeEventListener<K extends keyof Events>(handler: (event: Events[K]) => void) {
    var listener = _subscriptions.get(handler);
    if (!listener) {
      return;
    }
    listener.remove();
    _subscriptions.delete(handler);
  }
};