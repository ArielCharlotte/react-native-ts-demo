//
//  NativeContactsViewController.h
//  ccbfffrndemo
//
//  Created by 熊文成 on 2018/9/3.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface NativeContactsViewController : UITableViewController

@property (nonatomic, strong) NSMutableArray *datas;
@property (nonatomic, strong) NSString *sectionName;
@property (nonatomic, strong) NSString *identity;

- (BOOL)changeBackgroundColor:(UIColor *)color;

@end
