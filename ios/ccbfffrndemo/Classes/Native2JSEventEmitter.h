//
//  Native2JSEventEmitter.h
//  ccbfffrndemo
//
//  Created by 熊文成 on 2018/9/4.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTEventEmitter.h>


// 1、js端注册监听原生端通知
// 2、原生端表格代理方法触发事件，调用RativeTOJSEventEmitter发出通知 
// 3、js端监听到通知，触发回调，处理数据，重新刷新视图


extern NSString *const TableDeleteRowEvent;
extern NSString *const TableRowClickedEvent;

@interface Native2JSEventEmitter : RCTEventEmitter<RCTBridgeModule>



+(void)emit:(NSString *)emitName identify:(NSString *)identity index:(NSInteger)index;

@end
