//
//  NativeContactsViewController.m
//  ccbfffrndemo
//
//  Created by 熊文成 on 2018/9/3.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "NativeContactsViewController.h"
#import "Native2JSEventEmitter.h"

#define ContactsViewCellHeight 50
#define ContactsViewHeaderHeight 30

#define kCellTextTag 1000

#define FirstLevelCell @"FirstLevelCell"

#define UIColorFromRGB(rgbValue) [UIColor colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 green:((float)((rgbValue &0xFF00) >>8))/255.0 blue:((float)(rgbValue &0xFF))/255.0 alpha:1.0]

@interface NativeContactsViewController ()

@end

@implementation NativeContactsViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  self.tableView.separatorStyle = UITableViewCellSeparatorStyleSingleLine;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)setDatas:(NSMutableArray *)datas
{
  _datas = datas;
  [self.tableView reloadData];
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [_datas count];
}

-(CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section
{
  return ContactsViewHeaderHeight;
}

-(NSString *)tableView:(UITableView *)tableView titleForDeleteConfirmationButtonForRowAtIndexPath:(NSIndexPath *)indexPath
{
  return @"删除";
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
  NSString *name = [_datas objectAtIndex:indexPath.row];
  CGRect rect = CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width , ContactsViewCellHeight);
  UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:
                           FirstLevelCell];
  if (cell == nil) {
    cell = [[UITableViewCell alloc]
            initWithStyle:UITableViewCellStyleDefault
            reuseIdentifier: FirstLevelCell];
    cell.frame = rect;
  }
  //由于是复用的cell，因此需要给cell中子视图添加标签，复用时只需要取出来就可以了。
  UILabel *text = [cell viewWithTag:kCellTextTag];
  if (text == nil){
    text = [[UILabel alloc] initWithFrame:rect];
    text.textAlignment = NSTextAlignmentCenter;
    text.tag = kCellTextTag;
    [cell addSubview:text];
  }
  text.text = name;
  return cell;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
  return ContactsViewCellHeight;
}

- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section
{
  return _sectionName;
}

// Override to support conditional editing of the table view.
- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath {
    // Return NO if you do not want the specified item to be editable.
    return YES;
}



// Override to support editing the table view.
- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath {
  if (editingStyle == UITableViewCellEditingStyleDelete) {
        // Delete the row from the data source
    //[_datas removeObjectAtIndex:indexPath.row];
    //[tableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationFade];
    //原生事件触发时调用
    [Native2JSEventEmitter emit:TableDeleteRowEvent identify:self.identity index:indexPath.row];
  } else if (editingStyle == UITableViewCellEditingStyleInsert) {
    
  }
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
  [Native2JSEventEmitter emit:TableRowClickedEvent identify:self.identity index:indexPath.row];
}

#pragma mark - 自定义并且需要暴漏给JS的方法
- (BOOL)changeBackgroundColor:(UIColor *)color
{
  self.view.backgroundColor = color;//UIColorFromRGB(colorRGB);
  return true;
}


/*
// Override to support rearranging the table view.
- (void)tableView:(UITableView *)tableView moveRowAtIndexPath:(NSIndexPath *)fromIndexPath toIndexPath:(NSIndexPath *)toIndexPath {
}
*/

/*
// Override to support conditional rearranging of the table view.
- (BOOL)tableView:(UITableView *)tableView canMoveRowAtIndexPath:(NSIndexPath *)indexPath {
    // Return NO if you do not want the item to be re-orderable.
    return YES;
}
*/

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
