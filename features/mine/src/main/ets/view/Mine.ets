// ets/view/Mine.ets

import { UserManager, UserInfo } from 'login';
import { promptAction } from '@kit.ArkUI';

@Component
export default struct Mine {
  @State currentUser: UserInfo | null = null;
  @State isLoggedIn: boolean = false;
  private userManager: UserManager = UserManager.getInstance();
  onLogout: () => void = () => {};

  async aboutToAppear() {
    await this.loadUserInfo();
  }

  async loadUserInfo() {
    try {
      await this.userManager.initPreferences();
      const user = await this.userManager.getCurrentUser();
      this.currentUser = user;
      this.isLoggedIn = user !== null;
    } catch (err) {
      console.error('Failed to load user info:', err);
    }
  }

  async logout() {
    try {
      await this.userManager.logout();
      this.currentUser = null;
      this.isLoggedIn = false;
      promptAction.showToast({
        message: $r('app.string.logout')
      });
      
      // 退出登录后调用回调函数
      setTimeout(() => {
        this.onLogout();
      }, 1000); // 延迟1秒让用户看到退出成功的提示
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  }

  @Builder
  buildFunctionItem(title: string, icon: string, hasBadge: boolean = false) {
    Column() {
      Stack() {
        Text(icon)
          .fontSize('24fp')
        
        if (hasBadge) {
          Text('1')
            .fontSize('10fp')
            .fontColor(Color.White)
            .backgroundColor('#FF4444')
            .borderRadius('8vp')
            .padding({ left: '4vp', right: '4vp', top: '2vp', bottom: '2vp' })
            .position({ x: '16vp', y: '-4vp' })
        }
      }
      .width('32vp')
      .height('32vp')
      .margin({ bottom: '8vp' })
      
      Text(title)
        .fontSize('12fp')
        .fontColor('#333333')
        .textAlign(TextAlign.Center)
        .maxLines(1)
        .textOverflow({ overflow: TextOverflow.Ellipsis })
    }
    .alignItems(HorizontalAlign.Center)
    .width('100%')
    .height('60vp')
  }

  @Builder
  buildMoreFunctionItem(title: string, icon: string, color: string) {
    Column() {
      Text(icon)
        .fontSize('20fp')
        .width('32vp')
        .height('32vp')
        .backgroundColor(color)
        .borderRadius('16vp')
        .textAlign(TextAlign.Center)
        .margin({ bottom: '8vp' })
      
      Text(title)
        .fontSize('10fp')
        .fontColor('#333333')
        .textAlign(TextAlign.Center)
        .maxLines(2)
        .textOverflow({ overflow: TextOverflow.Ellipsis })
    }
    .alignItems(HorizontalAlign.Center)
    .width('100%')
    .height('70vp')
  }

  build() {
    Column() {
      if (this.isLoggedIn && this.currentUser) {
        // 已登录状态 - 重新设计为类似图片的布局
        Column() {
          // 顶部安全区域占位
          Blank()
            .height('40vp')
          // 用户头像和基本信息区域
          Row() {
            // 右侧功能按钮
            Row() {
              Button() {
                Text('🗓')
                  .fontSize('20fp')
              }
              .backgroundColor(Color.Transparent)
              .margin({ right: '12vp' })
              
              Button() {
                Text('📷')
                  .fontSize('20fp')
              }
              .backgroundColor(Color.Transparent)
            }
            .justifyContent(FlexAlign.End)
            .width('100%')
          }
          .width('100%')
          .padding({ top: '20vp', left: '16vp', right: '16vp' })
          .margin({ bottom: '20vp' })

          // 用户信息卡片
          Row() {
            // 用户头像
            Image($r('app.media.person_shield'))
              .width('60vp')
              .height('60vp')
              .borderRadius('30vp')
              .margin({ right: '16vp' })
            
            // 用户信息
            Column() {
              Row() {
                Text(this.currentUser.username)
                  .fontSize('20fp')
                  .fontWeight(FontWeight.Bold)
                  .fontColor('#000000')
                
                Blank()
                
                Text('11')
                  .fontSize('16fp')
                  .fontColor('#FF6B35')
                  .margin({ right: '4vp' })
                
                Text('💰')
                  .fontSize('16fp')
              }
              .width('100%')
              .margin({ bottom: '8vp' })
              
              Text('0获赞')
                .fontSize('14fp')
                .fontColor('#666666')
                .margin({ bottom: '12vp' })
              
              Row() {
                Text('0发表')
                  .fontSize('14fp')
                  .fontColor('#666666')
                  .margin({ right: '20vp' })
                
                Text('0关注')
                  .fontSize('14fp')
                  .fontColor('#666666')
                  .margin({ right: '20vp' })
                
                Text('0粉丝')
                  .fontSize('14fp')
                  .fontColor('#666666')
              }
              .width('100%')
            }
            .layoutWeight(1)
            .alignItems(HorizontalAlign.Start)
          }
          .width('100%')
          .padding({ left: '16vp', right: '16vp' })
          .margin({ bottom: '24vp' })

          // 会员和专栏卡片
          Row() {
            // 我的会员卡片
            Column() {
              Row() {
                Text('👑')
                  .fontSize('20fp')
                  .margin({ right: '8vp' })
                
                Text('我的会员')
                  .fontSize('16fp')
                  .fontWeight(FontWeight.Medium)
                  .fontColor('#000000')
              }
              .justifyContent(FlexAlign.Start)
              .width('100%')
              .margin({ bottom: '8vp' })
              
              Text('首月特惠低至2折')
                .fontSize('12fp')
                .fontColor('#666666')
                .alignSelf(ItemAlign.Start)
            }
            .layoutWeight(1)
            .padding('16vp')
            .backgroundColor('#FFF8E1')
            .borderRadius('8vp')
            .margin({ right: '8vp' })
            
            // 我的专栏卡片
            Column() {
              Row() {
                Text('📰')
                  .fontSize('20fp')
                  .margin({ right: '8vp' })
                
                Text('我的专栏')
                  .fontSize('16fp')
                  .fontWeight(FontWeight.Medium)
                  .fontColor('#000000')
              }
              .justifyContent(FlexAlign.Start)
              .width('100%')
              .margin({ bottom: '8vp' })
              
              Text('领域专家,专业解读')
                .fontSize('12fp')
                .fontColor('#666666')
                .alignSelf(ItemAlign.Start)
            }
            .layoutWeight(1)
            .padding('16vp')
            .backgroundColor('#E3F2FD')
            .borderRadius('8vp')
            .margin({ left: '8vp' })
          }
          .width('100%')
          .padding({ left: '16vp', right: '16vp' })
          .margin({ bottom: '24vp' })

          // 常用功能网格
          Column() {
            Text('常用功能')
              .fontSize('16fp')
              .fontWeight(FontWeight.Medium)
              .fontColor('#000000')
              .alignSelf(ItemAlign.Start)
              .margin({ bottom: '16vp' })
            
            Grid() {
              GridItem() {
                this.buildFunctionItem('消息', '💬', true)
              }
              GridItem() {
                this.buildFunctionItem('收藏', '⭐')
              }
              GridItem() {
                this.buildFunctionItem('历史', '🕒')
              }
              GridItem() {
                this.buildFunctionItem('已赞', '❤️')
              }
              GridItem() {
                this.buildFunctionItem('稍后听', '⏰')
              }
              GridItem() {
                this.buildFunctionItem('字体设置', 'Aa')
              }
              GridItem() {
                this.buildFunctionItem('夜间模式', '🌙')
              }
              GridItem() {
                this.buildFunctionItem('主编精选', '📝')
              }
              GridItem() {
                this.buildFunctionItem('帮助反馈', '❓')
              }
              GridItem() {
                this.buildFunctionItem('阅读周报', '📊')
              }
              GridItem() {
                this.buildFunctionItem('我的下载', '⬇️')
              }
              GridItem() {
                this.buildFunctionItem('安全中心', '🛡️')
              }
              GridItem() {
                this.buildFunctionItem('更多设置', '⚙️')
              }
            }
            .columnsTemplate('1fr 1fr 1fr 1fr 1fr')
            .rowsTemplate('1fr 1fr 1fr')
            .columnsGap('8vp')
            .rowsGap('12vp')
            .backgroundColor(Color.White)
            .borderRadius('16vp')
            .padding('16vp')
            .height('200vp')
          }
          .width('100%')
          .padding({ left: '16vp', right: '16vp' })
          .margin({ bottom: '24vp' })

          // 更多功能
          Column() {
            Text('更多功能')
              .fontSize('16fp')
              .fontWeight(FontWeight.Medium)
              .fontColor('#000000')
              .alignSelf(ItemAlign.Start)
              .margin({ bottom: '16vp' })
            
            Grid() {
              GridItem() {
                this.buildMoreFunctionItem('腾讯视频', '🎬', '#00C853')
              }
              GridItem() {
                this.buildMoreFunctionItem('腾讯体育', '⚽', '#FF9800')
              }
              GridItem() {
                this.buildMoreFunctionItem('我的资产', '💰', '#E91E63')
              }
              GridItem() {
                this.buildMoreFunctionItem('BonBon游戏', '🎮', '#9C27B0')
              }
              GridItem() {
                this.buildMoreFunctionItem('BonBon读书', '📚', '#2196F3')
              }
              GridItem() {
                this.buildMoreFunctionItem('财富精选', '💎', '#FF9800')
              }
              GridItem() {
                this.buildMoreFunctionItem('新闻妹', '👩', '#00BCD4')
              }
              GridItem() {
                this.buildMoreFunctionItem('签到福利', '🎁', '#FFD700')
              }
            }
            .columnsTemplate('1fr 1fr 1fr 1fr')
            .rowsTemplate('1fr 1fr')
            .columnsGap('8vp')
            .rowsGap('12vp')
            .backgroundColor(Color.White)
            .borderRadius('16vp')
            .padding('16vp')
            .height('160vp')
          }
          .width('100%')
          .padding({ left: '16vp', right: '16vp' })
          .margin({ bottom: '80vp' }) // 为底部导航留空间

          // 功能按钮区域
          Column({ space: 16 }) {
            // 个人信息按钮
            Row() {
              Image($r('app.media.account'))
                .width('24vp')
                .height('24vp')
                .margin({ right: '12vp' })
              Text($r('app.string.user_info'))
                .fontSize('16fp')
                .fontColor('#182431')
              Blank()
              Image($r('app.media.right_grey'))
                .width('16vp')
                .height('16vp')
            }
            .width('100%')
            .height('48vp')
            .padding({ left: '16vp', right: '16vp' })
            .backgroundColor('#FFFFFF')
            .borderRadius('8vp')
            .onClick(() => {
              // 可以添加编辑个人信息功能
            })

            // 退出登录按钮
            Row() {
              Image($r('app.media.reset'))
                .width('24vp')
                .height('24vp')
                .margin({ right: '12vp' })
              Text($r('app.string.logout'))
                .fontSize('16fp')
                .fontColor('#E60012')
              Blank()
            }
            .width('100%')
            .height('48vp')
            .padding({ left: '16vp', right: '16vp' })
            .backgroundColor('#FFFFFF')
            .borderRadius('8vp')
            .onClick(() => {
              this.logout();
            })
          }
          .width('100%')
          .padding({ left: '16vp', right: '16vp' })
        }
        .width('100%')
        .alignItems(HorizontalAlign.Center)
      } else {
        // 未登录状态
        Column() {
          Image($r('app.media.person_shield'))
            .width('80vp')
            .height('80vp')
            .margin({ top: '100vp', bottom: '20vp' })
          
          Text('请先登录')
            .fontSize('18fp')
            .fontWeight(FontWeight.Medium)
            .fontColor('#99182431')
            .margin({ bottom: '40vp' })
        }
        .width('100%')
        .alignItems(HorizontalAlign.Center)
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }
}