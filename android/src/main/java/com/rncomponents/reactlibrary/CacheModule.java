package com.rncomponents.reactlibrary;

import com.facebook.cache.disk.DiskStorageCache;
import com.facebook.cache.disk.FileCache;
import com.facebook.imagepipeline.core.ImagePipelineFactory;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.rncomponents.utils.CacheUtils;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import okhttp3.Cache;

/**
 * Created by tdzl2_000 on 2015-10-10.
 */
public class CacheModule extends ReactContextBaseJavaModule {
    public CacheModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "RCTHttpCache";
    }



    @ReactMethod
    public void clearCache(){
      CacheUtils.clearAllCache(getReactApplicationContext());
    }

    @ReactMethod
    public void geCacheSize(){
      CacheUtils.getTotalCacheSize(getReactApplicationContext());
    }
}
