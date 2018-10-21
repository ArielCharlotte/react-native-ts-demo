//
//  NativeContactsView.h
//  ccbfffrndemo
//
//  Created by 熊文成 on 2018/9/3.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>


//框架没有提供暴露Controller给RN的接口
//是提供了暴露UIView给RN端的接口，所以需要制作一个中转UIView视图
//既然是中转，那么该UIView的.h文件跟控制器的完全一致


//视图初始化的时候创建控制器，并将控制器的view添加为子视图
//显示的时候就是控制器的视图了
//setDatas和changeBackgroundColor方法仅仅只是个链接作用
//实际是调用的控制器的方法

@interface NativeContactsView : UIView

@property (nonatomic, strong) NSArray *datas;
@property (nonatomic, strong) NSString *sectionName;
@property (nonatomic, strong) NSString *identity;

- (BOOL)changeBackgroundColor:(UIColor *)color;

@end
