//
//  Native2JSEventEmitter.m
//  ccbfffrndemo
//
//  Created by 熊文成 on 2018/9/4.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "Native2JSEventEmitter.h"


NSString *const TableDeleteRowEvent = @"TableDeleteRowEvent";
NSString *const TableRowClickedEvent = @"TableRowClickedEvent";

#define EmitEventNames @[TableDeleteRowEvent, TableRowClickedEvent]


@implementation Native2JSEventEmitter

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

#pragma mark - 重写父类方法

- (NSArray<NSString *> *)supportedEvents
{
  //这个方法会告诉JS可以接受的消息类型
  return EmitEventNames;
}

-(void)startObserving{
  for (NSString *emit in EmitEventNames) {
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(emit:) name:emit object:nil];
  }
}


- (void)stopObserving{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

#pragma mark - 自定义方法

-(void)emit:(NSNotification *)notification
{
  NSString *emitName = notification.userInfo[@"emitName"];
  //将通知发送给JS
  [self sendEventWithName:emitName body:notification.userInfo];
}

+ (void)emit:(NSString *)emitName identify:(NSString *)identity index:(NSInteger)index
{
  NSString *errorMsg = [NSString stringWithFormat:@"不处理的事件类型:%@", emitName];
  NSAssert([EmitEventNames containsObject:emitName], errorMsg);
  NSDictionary *dict = @{
                         @"emitName": emitName,
                         @"identity": identity,
                         @"index": @(index)
                         };
  //1，实例方法里面的self，是对象的首地址。
  //2，类方法里面的self，是Class。
  [[NSNotificationCenter defaultCenter] postNotificationName:emitName object:self userInfo:dict];
}

@end
