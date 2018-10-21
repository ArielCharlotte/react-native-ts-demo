//
//  NativeContactsViewManager.h
//  ccbfffrndemo
//
//  Created by 熊文成 on 2018/9/3.
//  Copyright © 2018年 Facebook. All rights reserved.
//

//#import <React/RCTViewManager.h>
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
#import <React/RCTUIManager.h>


//要想将UIView视图暴露给RN，需要使用RCTViewManager的子类。
//RCTViewManager为框架提供的原生端视图管理类，已经实现了RCTBridgeModule接口，会自动将相应的UIView注册到桥接文件中。
//需要重写两个方法view 和 methodQueue


//其实也可以实现协议：NSObject<RCTBridgeModule>

@interface NativeContactsViewManager : RCTViewManager

//@interface NativeContactsViewManager : NSObject<RCTBridgeModule>

@end
