package com.ccbfffrndemo.contacts;

import android.support.annotation.Nullable;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.ArrayList;
import java.util.Map;

public class NativeContactsView extends SimpleViewManager<ListView> implements AdapterView.OnItemClickListener {

    private ThemedReactContext mContext;
    private static final String TableDeleteRowEvent = "TableDeleteRowEvent";
    private static final String TableRowClickedEvent = "TableRowClickedEvent";

    private static final String NATIVE_CONTACTS_VIEW = "NativeContactsView";


    //RN层向Android原生层层传递数据
    private static final String HANDLE_METHOD_NAME = "handleTask"; // 交互方法名
    private static final int HANDLE_METHOD_ID = 1; // 交互命令ID

    private NativeContactsViewAdapter adapter;
    private ArrayList<String> dataSource;

    @Override
    public String getName() {
        return NATIVE_CONTACTS_VIEW;
    }

    /**
     * 此处创建View实例，并返回
     * @param reactContext
     * @return
     */
    @Override
    protected ListView createViewInstance(ThemedReactContext reactContext) {
        this.mContext = reactContext;
        ListView listView = new ListView(reactContext);
        listView.setOnItemClickListener(this);
        return listView;
    }

    /**
     * 如果需要对外提供方法给JavaScript进行调用，那么需要使用@ReactProp(或者@ReactPropGroup)进行注解。
     * 它注解的方法的第一个参数为需要修改设置属性的具体事例，第二个参数为需要设置的属性值。被注解的方法的返回值必须为void,
     * 而且方法的访问权限必须为public。其中在JavaScript前端获取属性的类型由被注解的方法的第二个参数的类型来进行决定。
     * 支持的类型为:boolean,int,float,String,Boolean,Integer,ReadableArray,ReadableMap。
     * 使用@ReactProp注解，注解中必须包含一个字符串类型的属性name，该参数的值指定了在JavaScript端进行调用的属性名称。
     * 除了name属性之后，@ReactProp注解还能接收其他一些属性例如:defaultBoolean,defaultInt,defaultFloat。
     * 这些参数必须对应基础的数据类型(boolean,int,float),但是当对应的默认属性值被删除或者不设置，会使用null作为默认值。
     * ReadableNativeArray和ReadableNativeMap是负责接收ReactNative传递过来的参数
     * WriteableNativeArray是负责向reactNative写数据的
     * @param listView
     * @param datas
     */
    @ReactProp(name = "datas")
    public void setDataSource(final ListView listView, ReadableArray datas) {

        dataSource = new ArrayList<>();
        for(int i = 0; i < datas.size(); i++)
        {
            dataSource.add(datas.getString(i));
        }
        adapter = new NativeContactsViewAdapter(mContext, dataSource);
        listView.setAdapter(adapter);
    }

    @ReactProp(name = "identity")
    public void setIdentity(final ListView listView, String identity) {

        listView.setTag(identity);
        Log.i("========", identity);
    }



    /**
     * 接收交互通知
     * @return
     */
    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of(HANDLE_METHOD_NAME, HANDLE_METHOD_ID);
    }


    /**
     * 根据命令ID，处理对应任务
     * @param listView
     * @param commandId
     * @param args
     */
    @Override
    public void receiveCommand(ListView listView, int commandId, @Nullable ReadableArray args) {
        switch (commandId){
            case HANDLE_METHOD_ID:
                if(args != null) {
                    int color = args.getInt(0);//获取第一个位置的数据
                    Toast.makeText(mContext, "收到RN层的任务通知，开始在原生层处理任务...", Toast.LENGTH_SHORT).show();
                    listView.setBackgroundColor(color);
                }
                break;
            default:
                break;
        }
    }

//    /**
//     * 自定义事件
//     * @return
//     */
//    @Nullable
//    @Override
//    public Map getExportedCustomDirectEventTypeConstants() {
//        //该调用表示将原生模块中的EVENT_NAME_ONCLICK方法映射为 JS模块的EVENT_NAME_ONCLICK属性。
//        return MapBuilder.of(EVENT_NAME_ONCLICK,MapBuilder.of("registrationName", EVENT_NAME_ONCLICK));
//    }

//    .then(success => {
//        success ? console.log('改变原生View背景颜色成功') : console.log('颜色改变失败');


    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        WritableMap map = Arguments.createMap();
        map.putInt("index", position);
        //点击的是cell，而不是listview，因为parent才是listview，怪不得获取不到值
        //用getTag和getId应都可，但是为了跟iOS的再rn代码上统一，还是用gettag
        //只不过用id的话，就不需要设置tag的值
        String tag = String.valueOf(parent.getTag());
        map.putString("identity", tag);

//        mContext.getJSModule(RCTEventEmitter.class)
//                .receiveEvent(
//                    view.getId(),           // RN层原生层根据id绑定在一起
//                    TableRowClickedEvent,   // 事件名称
//                    map);                   // 传递的数据

        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(TableRowClickedEvent, map);

        //以下两种写法都会收到消息
        //JS端代码
        //监听事件名为EventName的事件
        //需要将DeviceEventEmitter从 'react-native'导入
//        DeviceEventEmitter.addListener(TableRowClickedEvent, (map) => {
//            alert("收到消息");
//        });

        //需要将NativeEventEmitter 'react-native'导入
        //并且要初始化
//        const NativeEvents = new NativeEventEmitter(NativeModules.Native2JSEventEmitter);
//        this.clickedSubscription = NativeEvents.addListener('TableRowClickedEvent', (userInfo) => {
//            alert('JS收到点击：' + datas[index]);
//        });


    }

}
