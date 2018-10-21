//
//  NativeContactsViewManager.m
//  ccbfffrndemo
//
//  Created by 熊文成 on 2018/9/3.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "NativeContactsViewManager.h"
#import "NativeContactsView.h"

@implementation NativeContactsViewManager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

// 暴露该管理类管理的视图的属性给js，js设置该属性时会调用其setter方法
// 宏RCT_EXPORT_VIEW_PROPERTY是将该管理类管理的那个视图，也就是方法-(UIView *)view返回的那个视图的属性暴露出去
// js端设置该属性的时候会触发属性的setter方法，也就是NativeTableView中实现的- (void)setDatas:(NSArray *)datas
// 进而触发控制器的setDatas方法，刷新表格

RCT_EXPORT_VIEW_PROPERTY(datas, NSArray);
RCT_EXPORT_VIEW_PROPERTY(sectionName, NSString);
RCT_EXPORT_VIEW_PROPERTY(identity, NSString);


//a、js端事件驱动，举例：js端调用原生表格控制器的changeBackgroundColor方法
//b、原生端事件驱动，举例：原生cell左滑，点击删除按钮，触发js端数据源数据改变，进而刷新页面

//a事件方案：RCT_EXPORT_METHOD宏可以将原生端方法暴露给js端，js直接调用就可以了。
//那么在这个方法里面要如何才能拿到目标视图NativeContactsView，然后调用它的changeBackgroundColor方法呢？
//很显然的看到了我们重写的父类方法- (UIView *)view，这里可以得到NativeContactsView，但是每次调用都是返回一个新的视图
//那么可以将这个视图缓冲起来，然后每次都返回同一个？理想很丰满，现实很骨感，看官方的文档,显然这里不允许换成该视图。至于原因我也不太清楚
//看源码发现每个注册的视图其实都是有编号tag的，只要知道原生端视图注册时生成的tag，就能从视图管理类RCTUIManager中找到它，下面是最终实现代码

RCT_EXPORT_METHOD(changeBackgroundColor:(UIColor *)color
                  viewTag: (NSInteger)tag
                  resovle:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
  NativeContactsView *view = (NativeContactsView *)[self.bridge.uiManager viewForReactTag:@(tag)];
  BOOL success = NO;
  if ([view isKindOfClass:[NativeContactsView class]]) {
    success = [view changeBackgroundColor:color];
  }
  success ? resolve(@(YES)) : reject(@"ERROR_CODE", @"ERROE_MESSAGE", nil);
}

-(UIView *)view{
  return [[NativeContactsView alloc] initWithFrame:[UIScreen mainScreen].bounds];
}

-(dispatch_queue_t)methodQueue{
  return dispatch_get_main_queue();
}
@end
