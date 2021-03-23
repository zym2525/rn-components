package com.rncomponents.utils;

import android.content.Context;
import android.os.Environment;

import java.io.File;

public class CacheUtils {

  /**
   * Context.getExternalFilesDir() --> SDCard/Android/data/你的应用的包名/files/ 目录，一般放一些长时间保存的数据
   * Context.getExternalCacheDir() --> SDCard/Android/data/你的应用包名/cache/目录，一般存放临时缓存数据
   */
  /**
   * 获取缓存值
   */
  public static String getTotalCacheSize(Context context) {

    long cacheSize = getFolderSize(context.getCacheDir());
    if (Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)) {
      cacheSize += getFolderSize(context.getExternalCacheDir());
    }
    return cacheSize+"";
  }

  /**
   * 清除所有缓存
   */
  public static void clearAllCache(Context context) {
    deleteDir(context.getCacheDir());
    if (Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)) {
      deleteDir(context.getExternalCacheDir());
      //TODO 有网页清理时注意排错，是否存在/data/data/应用package目录下找不到database文件夹的问题
      context.deleteDatabase("webview.db");
      context.deleteDatabase("webviewCache.db");
    }
  }

  /**
   * 删除某个文件
   */
  private static boolean deleteDir(File dir) {
    if (dir != null && dir.isDirectory()) {
      String[] children = dir.list();
      for (int i = 0; i < children.length; i++) {
        boolean success = deleteDir(new File(dir, children[i]));
        if (!success) {
          return false;
        }
      }
      return dir.delete();
    }
    if (dir != null) {
      return dir.delete();
    } else {
      return false;
    }
  }

  /**
   * 获取文件
   */
  public static long getFolderSize(File file) {
    long size = 0;
    if (file != null) {
      File[] fileList = file.listFiles();
      if (fileList != null && fileList.length > 0) {
        for (int i = 0; i < fileList.length; i++) {
          // 如果下面还有文件
          if (fileList[i].isDirectory()) {
            size = size + getFolderSize(fileList[i]);
          } else {
            size = size + fileList[i].length();
          }
        }
      }
    }
    return size;
  }

}
