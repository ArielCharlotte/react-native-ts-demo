//
//  NativeContactsView.m
//  ccbfffrndemo
//
//  Created by 熊文成 on 2018/9/3.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "NativeContactsView.h"
#import "NativeContactsViewController.h"

@interface NativeContactsView ()

@property (nonatomic, strong) NativeContactsViewController *viewController;

@end


@implementation NativeContactsView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/



-(instancetype)initWithFrame:(CGRect)frame
{
  self = [super initWithFrame:frame];
  if (self) {
    [self setupUI:frame];
    
  }
  return self;
}

- (void)setupUI:(CGRect) frame {
  self.viewController = [NativeContactsViewController new];
  UIView *view = self.viewController.view;
  view.frame = frame;
  [self addSubview:view];
}

- (void)setDatas:(NSArray *) datas{
  _datas = datas;
  self.viewController.datas = [NSMutableArray arrayWithArray:datas];
}

- (void)setIdentity:(NSString *)identity{
  _identity = identity;
  self.viewController.identity = identity;
}

- (void)setSectionName:(NSString *)sectionName
{
  _sectionName = sectionName;
  self.viewController.sectionName = _sectionName;

}

-( BOOL)changeBackgroundColor:(UIColor *)color{
  return [self.viewController changeBackgroundColor:color];
}


@end
