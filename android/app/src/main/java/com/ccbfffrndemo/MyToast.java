package com.ccbfffrndemo;

import android.content.Intent;
import android.net.Uri;
import android.support.annotation.Nullable;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

public class MyToast extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    private static final String EVENT_NAME = "EVENT_NAME";

    private ReactApplicationContext mContext;

    public  MyToast(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
    }

    /**
     * 一个可选的方法getContants返回了需要导出给JavaScript使用的常量。
     * 它并不一定需要实现，但在定义一些可以被JavaScript同步访问到的预定义的值时非常有用。
     */
    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap();
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);

        return constants;
    }

    /**
     * 要导出一个方法给JavaScript使用，Java方法需要使用注解@ReactMethod。
     * 方法的返回类型必须为void。React Native的跨语言访问是异步进行的，
     * 所以想要给JavaScript返回一个值的唯一办法是使用回调函数或者发送事件
     * @param message
     * @param duration
     */
    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

    
    /**
     * 模块名前的RCT前缀会被自动移除。
     * 所以如果返回的字符串为"RCTmytoast"，在JavaScript端依然可以通过React.NativeModules.mytoast访问到这个模块。
     * @return
     */
    @Override
    public String getName() {
        return "mytoast";
    }

    /**
     * RN调用Native的方法
     * @param phone
     */
    @ReactMethod
    public void rnCallNative(String phone) {

        // 跳转到打电话界面
        Intent intent = new Intent();
        intent.setAction(Intent.ACTION_CALL);
        intent.setData(Uri.parse("tel:" + phone));
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK); // 跳转需要添加flag, 否则报错
        mContext.startActivity(intent);
    }


    /**
     * Native调用RN
     * @param msg
     */
    public void nativeCallRn(String msg) {
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(EVENT_NAME,msg);
    }
}
