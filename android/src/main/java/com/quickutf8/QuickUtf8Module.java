package com.quickutf8;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = QuickUtf8Module.NAME)
public class QuickUtf8Module extends ReactContextBaseJavaModule {
  public static final String NAME = "QuickUtf8";

  public QuickUtf8Module(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  static {
    System.loadLibrary("react-native-quick-utf8");
  }

  private static native void installModule();

  @ReactMethod
  public boolean install() {
    return true;
  }
}
