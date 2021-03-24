package com.rncomponents;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.rncomponents.reactlibrary.CacheModule;
import com.rncomponents.reactlibrary.OrientationModule;
import com.rncomponents.reactlibrary.RNAliyunOssModule;
import com.rncomponents.smartrefreshlayout.manager.RNClassicsFooter;
import com.rncomponents.smartrefreshlayout.manager.RNClassicsHeader;
import com.rncomponents.smartrefreshlayout.manager.RNRadarHeaderManager;
import com.rncomponents.smartrefreshlayout.manager.RNTwoLevelHeaderManager;
import com.rncomponents.smartrefreshlayout.manager.SmartRefreshLayoutManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class RnComponentsPackage implements ReactPackage {

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    return Arrays.asList(new NativeModule[]{
      // Modules from third-party
      new CacheModule(reactContext),
      new OrientationModule(reactContext),
      new RNAliyunOssModule(reactContext),
    });
  }

  public List<Class<? extends JavaScriptModule>> createJSModules() {
    return Collections.emptyList();
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Arrays.<ViewManager>asList(
      new SmartRefreshLayoutManager(),
      new RNRadarHeaderManager(),
      new RNClassicsHeader(),
      new RNTwoLevelHeaderManager(),
      new RNClassicsFooter()
    );
  }
}
