package com.bighero.modules.camera;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import camera.module.main.NativeCamera;

import java.util.Map;
import java.util.HashMap;

private class Image {
  File img;
  Image(NativeCamera camera) {
    img = camera.dispatchTakePictureIntent();
  }
}
public class CameraModule extends ReactContextBaseJavaModule {
  CameraModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  public String getName() {
    return "ReactCamera"
  }

  public void takeImage(Promise promise) {
    NativeCamera cam = new NativeCamera();
    try {
      Image img = new Image(cam);
      promise.resolve(img)
    } catch (Exception e) {
      //TODO: handle exception
      promise.reject(e)
    }
  }
}
