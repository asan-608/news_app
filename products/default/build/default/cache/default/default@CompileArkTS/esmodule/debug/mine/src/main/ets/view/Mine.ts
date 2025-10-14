if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Mine_Params {
    currentUser?: UserInfo | null;
    isLoggedIn?: boolean;
    userManager?: UserManager;
    onLogout?: () => void;
}
import { UserManager } from "@bundle:com.huawei.quickstart/default@login/Index";
import type { UserInfo } from "@bundle:com.huawei.quickstart/default@login/Index";
import promptAction from "@ohos:promptAction";
export default class Mine extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentUser = new ObservedPropertyObjectPU(null, this, "currentUser");
        this.__isLoggedIn = new ObservedPropertySimplePU(false, this, "isLoggedIn");
        this.userManager = UserManager.getInstance();
        this.onLogout = () => { };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Mine_Params) {
        if (params.currentUser !== undefined) {
            this.currentUser = params.currentUser;
        }
        if (params.isLoggedIn !== undefined) {
            this.isLoggedIn = params.isLoggedIn;
        }
        if (params.userManager !== undefined) {
            this.userManager = params.userManager;
        }
        if (params.onLogout !== undefined) {
            this.onLogout = params.onLogout;
        }
    }
    updateStateVars(params: Mine_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentUser.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoggedIn.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentUser.aboutToBeDeleted();
        this.__isLoggedIn.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentUser: ObservedPropertyObjectPU<UserInfo | null>;
    get currentUser() {
        return this.__currentUser.get();
    }
    set currentUser(newValue: UserInfo | null) {
        this.__currentUser.set(newValue);
    }
    private __isLoggedIn: ObservedPropertySimplePU<boolean>;
    get isLoggedIn() {
        return this.__isLoggedIn.get();
    }
    set isLoggedIn(newValue: boolean) {
        this.__isLoggedIn.set(newValue);
    }
    private userManager: UserManager;
    private onLogout: () => void;
    async aboutToAppear() {
        await this.loadUserInfo();
    }
    async loadUserInfo() {
        try {
            await this.userManager.initPreferences();
            const user = await this.userManager.getCurrentUser();
            this.currentUser = user;
            this.isLoggedIn = user !== null;
        }
        catch (err) {
            console.error('Failed to load user info:', err);
        }
    }
    async logout() {
        try {
            await this.userManager.logout();
            this.currentUser = null;
            this.isLoggedIn = false;
            promptAction.showToast({
                message: { "id": 16777297, "type": 10003, params: [], "bundleName": "com.huawei.quickstart", "moduleName": "default" }
            });
            // 退出登录后调用回调函数
            setTimeout(() => {
                this.onLogout();
            }, 1000); // 延迟1秒让用户看到退出成功的提示
        }
        catch (err) {
            console.error('Failed to logout:', err);
        }
    }
    buildFunctionItem(title: string, icon: string, hasBadge: boolean = false, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
            Column.width('100%');
            Column.height('60vp');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('32vp');
            Stack.height('32vp');
            Stack.margin({ bottom: '8vp' });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(icon);
            Text.fontSize('24fp');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (hasBadge) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('1');
                        Text.fontSize('10fp');
                        Text.fontColor(Color.White);
                        Text.backgroundColor('#FF4444');
                        Text.borderRadius('8vp');
                        Text.padding({ left: '4vp', right: '4vp', top: '2vp', bottom: '2vp' });
                        Text.position({ x: '16vp', y: '-4vp' });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize('12fp');
            Text.fontColor('#333333');
            Text.textAlign(TextAlign.Center);
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        Column.pop();
    }
    buildMoreFunctionItem(title: string, icon: string, color: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
            Column.width('100%');
            Column.height('70vp');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(icon);
            Text.fontSize('20fp');
            Text.width('32vp');
            Text.height('32vp');
            Text.backgroundColor(color);
            Text.borderRadius('16vp');
            Text.textAlign(TextAlign.Center);
            Text.margin({ bottom: '8vp' });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize('10fp');
            Text.fontColor('#333333');
            Text.textAlign(TextAlign.Center);
            Text.maxLines(2);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F5F5F5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isLoggedIn && this.currentUser) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 已登录状态 - 重新设计为类似图片的布局
                        Column.create();
                        // 已登录状态 - 重新设计为类似图片的布局
                        Column.width('100%');
                        // 已登录状态 - 重新设计为类似图片的布局
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 顶部安全区域占位
                        Blank.create();
                        // 顶部安全区域占位
                        Blank.height('40vp');
                    }, Blank);
                    // 顶部安全区域占位
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 用户头像和基本信息区域
                        Row.create();
                        // 用户头像和基本信息区域
                        Row.width('100%');
                        // 用户头像和基本信息区域
                        Row.padding({ top: '20vp', left: '16vp', right: '16vp' });
                        // 用户头像和基本信息区域
                        Row.margin({ bottom: '20vp' });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 右侧功能按钮
                        Row.create();
                        // 右侧功能按钮
                        Row.justifyContent(FlexAlign.End);
                        // 右侧功能按钮
                        Row.width('100%');
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithChild();
                        Button.backgroundColor(Color.Transparent);
                        Button.margin({ right: '12vp' });
                    }, Button);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('🗓');
                        Text.fontSize('20fp');
                    }, Text);
                    Text.pop();
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithChild();
                        Button.backgroundColor(Color.Transparent);
                    }, Button);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('📷');
                        Text.fontSize('20fp');
                    }, Text);
                    Text.pop();
                    Button.pop();
                    // 右侧功能按钮
                    Row.pop();
                    // 用户头像和基本信息区域
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 用户信息卡片
                        Row.create();
                        // 用户信息卡片
                        Row.width('100%');
                        // 用户信息卡片
                        Row.padding({ left: '16vp', right: '16vp' });
                        // 用户信息卡片
                        Row.margin({ bottom: '24vp' });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 用户头像
                        Image.create({ "id": 16777306, "type": 20000, params: [], "bundleName": "com.huawei.quickstart", "moduleName": "default" });
                        // 用户头像
                        Image.width('60vp');
                        // 用户头像
                        Image.height('60vp');
                        // 用户头像
                        Image.borderRadius('30vp');
                        // 用户头像
                        Image.margin({ right: '16vp' });
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 用户信息
                        Column.create();
                        // 用户信息
                        Column.layoutWeight(1);
                        // 用户信息
                        Column.alignItems(HorizontalAlign.Start);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.margin({ bottom: '8vp' });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.currentUser.username);
                        Text.fontSize('20fp');
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#000000');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('11');
                        Text.fontSize('16fp');
                        Text.fontColor('#FF6B35');
                        Text.margin({ right: '4vp' });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('💰');
                        Text.fontSize('16fp');
                    }, Text);
                    Text.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('0获赞');
                        Text.fontSize('14fp');
                        Text.fontColor('#666666');
                        Text.margin({ bottom: '12vp' });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('0发表');
                        Text.fontSize('14fp');
                        Text.fontColor('#666666');
                        Text.margin({ right: '20vp' });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('0关注');
                        Text.fontSize('14fp');
                        Text.fontColor('#666666');
                        Text.margin({ right: '20vp' });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('0粉丝');
                        Text.fontSize('14fp');
                        Text.fontColor('#666666');
                    }, Text);
                    Text.pop();
                    Row.pop();
                    // 用户信息
                    Column.pop();
                    // 用户信息卡片
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 会员和专栏卡片
                        Row.create();
                        // 会员和专栏卡片
                        Row.width('100%');
                        // 会员和专栏卡片
                        Row.padding({ left: '16vp', right: '16vp' });
                        // 会员和专栏卡片
                        Row.margin({ bottom: '24vp' });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 我的会员卡片
                        Column.create();
                        // 我的会员卡片
                        Column.layoutWeight(1);
                        // 我的会员卡片
                        Column.padding('16vp');
                        // 我的会员卡片
                        Column.backgroundColor('#FFF8E1');
                        // 我的会员卡片
                        Column.borderRadius('8vp');
                        // 我的会员卡片
                        Column.margin({ right: '8vp' });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.justifyContent(FlexAlign.Start);
                        Row.width('100%');
                        Row.margin({ bottom: '8vp' });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('👑');
                        Text.fontSize('20fp');
                        Text.margin({ right: '8vp' });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('我的会员');
                        Text.fontSize('16fp');
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor('#000000');
                    }, Text);
                    Text.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('首月特惠低至2折');
                        Text.fontSize('12fp');
                        Text.fontColor('#666666');
                        Text.alignSelf(ItemAlign.Start);
                    }, Text);
                    Text.pop();
                    // 我的会员卡片
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 我的专栏卡片
                        Column.create();
                        // 我的专栏卡片
                        Column.layoutWeight(1);
                        // 我的专栏卡片
                        Column.padding('16vp');
                        // 我的专栏卡片
                        Column.backgroundColor('#E3F2FD');
                        // 我的专栏卡片
                        Column.borderRadius('8vp');
                        // 我的专栏卡片
                        Column.margin({ left: '8vp' });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.justifyContent(FlexAlign.Start);
                        Row.width('100%');
                        Row.margin({ bottom: '8vp' });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('📰');
                        Text.fontSize('20fp');
                        Text.margin({ right: '8vp' });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('我的专栏');
                        Text.fontSize('16fp');
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor('#000000');
                    }, Text);
                    Text.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('领域专家,专业解读');
                        Text.fontSize('12fp');
                        Text.fontColor('#666666');
                        Text.alignSelf(ItemAlign.Start);
                    }, Text);
                    Text.pop();
                    // 我的专栏卡片
                    Column.pop();
                    // 会员和专栏卡片
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 常用功能网格
                        Column.create();
                        // 常用功能网格
                        Column.width('100%');
                        // 常用功能网格
                        Column.padding({ left: '16vp', right: '16vp' });
                        // 常用功能网格
                        Column.margin({ bottom: '24vp' });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('常用功能');
                        Text.fontSize('16fp');
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor('#000000');
                        Text.alignSelf(ItemAlign.Start);
                        Text.margin({ bottom: '16vp' });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Grid.create();
                        Grid.columnsTemplate('1fr 1fr 1fr 1fr 1fr');
                        Grid.rowsTemplate('1fr 1fr 1fr');
                        Grid.columnsGap('8vp');
                        Grid.rowsGap('12vp');
                        Grid.backgroundColor(Color.White);
                        Grid.borderRadius('16vp');
                        Grid.padding('16vp');
                        Grid.height('200vp');
                    }, Grid);
                    {
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            GridItem.create(() => { }, false);
                        };
                        const observedDeepRender = () => {
                            this.observeComponentCreation2(itemCreation2, GridItem);
                            this.buildFunctionItem.bind(this)('消息', '💬', true);
                            GridItem.pop();
                        };
                        observedDeepRender();
                    }
                    {
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            GridItem.create(() => { }, false);
                        };
                        const observedDeepRender = () => {
                            this.observeComponentCreation2(itemCreation2, GridItem);
                            this.buildFunctionItem.bind(this)('收藏', '⭐');
                            GridItem.pop();
                        };
                        observedDeepRender();
                    }
                    {
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            GridItem.create(() => { }, false);
                        };
                        const observedDeepRender = () => {
                            this.observeComponentCreation2(itemCreation2, GridItem);
                            this.buildFunctionItem.bind(this)('历史', '🕒');
                            GridItem.pop();
                        };
                        observedDeepRender();
                    }
                    {
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            GridItem.create(() => { }, false);
                        };
                        const observedDeepRender = () => {
                            this.observeComponentCreation2(itemCreation2, GridItem);
                            this.buildFunctionItem.bind(this)('已赞', '❤️');
                            GridItem.pop();
                        };
                        observedDeepRender();
                    }
                    {
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            GridItem.create(() => { }, false);
                        };
                        const observedDeepRender = () => {
                            this.observeComponentCreation2(itemCreation2, GridItem);
                            this.buildFunctionItem.bind(this)('稍后听', '⏰');
                            GridItem.pop();
                        };
                        observedDeepRender();
                    }
                    {
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            GridItem.create(() => { }, false);
                        };
                        const observedDeepRender = () => {
                            this.observeComponentCreation2(itemCreation2, GridItem);
                            this.buildFunctionItem.bind(this)('字体设置', 'Aa');
                            GridItem.pop();
                        };
                        observedDeepRender();
                    }
                    {
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            GridItem.create(() => { }, false);
                        };
                        const observedDeepRender = () => {
                            this.observeComponentCreation2(itemCreation2, GridItem);
                            this.buildFunctionItem.bind(this)('夜间模式', '🌙');
                            GridItem.pop();
                        };
                        observedDeepRender();
                    }
                    {
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            GridItem.create(() => { }, false);
                        };
                        const observedDeepRender = () => {
                            this.observeComponentCreation2(itemCreation2, GridItem);
                            this.buildFunctionItem.bind(this)('主编精选', '📝');
                            GridItem.pop();
                        };
                        observedDeepRender();
                    }
                    {
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            GridItem.create(() => { }, false);
                        };
                        const observedDeepRender = () => {
                            this.observeComponentCreation2(itemCreation2, GridItem);
                            this.buildFunctionItem.bind(this)('帮助反馈', '❓');
                            GridItem.pop();
                        };
                        observedDeepRender();
                    }
                    {
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            GridItem.create(() => { }, false);
                        };
                        const observedDeepRender = () => {
                            this.observeComponentCreation2(itemCreation2, GridItem);
                            this.buildFunctionItem.bind(this)('阅读周报', '📊');
                            GridItem.pop();
                        };
                        observedDeepRender();
                    }
                    {
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            GridItem.create(() => { }, false);
                        };
                        const observedDeepRender = () => {
                            this.observeComponentCreation2(itemCreation2, GridItem);
                            this.buildFunctionItem.bind(this)('我的下载', '⬇️');
                            GridItem.pop();
                        };
                        observedDeepRender();
                    }
                    {
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            GridItem.create(() => { }, false);
                        };
                        const observedDeepRender = () => {
                            this.observeComponentCreation2(itemCreation2, GridItem);
                            this.buildFunctionItem.bind(this)('安全中心', '🛡️');
                            GridItem.pop();
                        };
                        observedDeepRender();
                    }
                    {
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            GridItem.create(() => { }, false);
                        };
                        const observedDeepRender = () => {
                            this.observeComponentCreation2(itemCreation2, GridItem);
                            this.buildFunctionItem.bind(this)('更多设置', '⚙️');
                            GridItem.pop();
                        };
                        observedDeepRender();
                    }
                    Grid.pop();
                    // 常用功能网格
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 更多功能
                        Column.create();
                        // 更多功能
                        Column.width('100%');
                        // 更多功能
                        Column.padding({ left: '16vp', right: '16vp' });
                        // 更多功能
                        Column.margin({ bottom: '80vp' });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('更多功能');
                        Text.fontSize('16fp');
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor('#000000');
                        Text.alignSelf(ItemAlign.Start);
                        Text.margin({ bottom: '16vp' });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Grid.create();
                        Grid.columnsTemplate('1fr 1fr 1fr 1fr');
                        Grid.rowsTemplate('1fr 1fr');
                        Grid.columnsGap('8vp');
                        Grid.rowsGap('12vp');
                        Grid.backgroundColor(Color.White);
                        Grid.borderRadius('16vp');
                        Grid.padding('16vp');
                        Grid.height('160vp');
                    }, Grid);
                    {
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            GridItem.create(() => { }, false);
                        };
                        const observedDeepRender = () => {
                            this.observeComponentCreation2(itemCreation2, GridItem);
                            this.buildMoreFunctionItem.bind(this)('腾讯视频', '🎬', '#00C853');
                            GridItem.pop();
                        };
                        observedDeepRender();
                    }
                    {
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            GridItem.create(() => { }, false);
                        };
                        const observedDeepRender = () => {
                            this.observeComponentCreation2(itemCreation2, GridItem);
                            this.buildMoreFunctionItem.bind(this)('腾讯体育', '⚽', '#FF9800');
                            GridItem.pop();
                        };
                        observedDeepRender();
                    }
                    {
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            GridItem.create(() => { }, false);
                        };
                        const observedDeepRender = () => {
                            this.observeComponentCreation2(itemCreation2, GridItem);
                            this.buildMoreFunctionItem.bind(this)('我的资产', '💰', '#E91E63');
                            GridItem.pop();
                        };
                        observedDeepRender();
                    }
                    {
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            GridItem.create(() => { }, false);
                        };
                        const observedDeepRender = () => {
                            this.observeComponentCreation2(itemCreation2, GridItem);
                            this.buildMoreFunctionItem.bind(this)('BonBon游戏', '🎮', '#9C27B0');
                            GridItem.pop();
                        };
                        observedDeepRender();
                    }
                    {
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            GridItem.create(() => { }, false);
                        };
                        const observedDeepRender = () => {
                            this.observeComponentCreation2(itemCreation2, GridItem);
                            this.buildMoreFunctionItem.bind(this)('BonBon读书', '📚', '#2196F3');
                            GridItem.pop();
                        };
                        observedDeepRender();
                    }
                    {
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            GridItem.create(() => { }, false);
                        };
                        const observedDeepRender = () => {
                            this.observeComponentCreation2(itemCreation2, GridItem);
                            this.buildMoreFunctionItem.bind(this)('财富精选', '💎', '#FF9800');
                            GridItem.pop();
                        };
                        observedDeepRender();
                    }
                    {
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            GridItem.create(() => { }, false);
                        };
                        const observedDeepRender = () => {
                            this.observeComponentCreation2(itemCreation2, GridItem);
                            this.buildMoreFunctionItem.bind(this)('新闻妹', '👩', '#00BCD4');
                            GridItem.pop();
                        };
                        observedDeepRender();
                    }
                    {
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            GridItem.create(() => { }, false);
                        };
                        const observedDeepRender = () => {
                            this.observeComponentCreation2(itemCreation2, GridItem);
                            this.buildMoreFunctionItem.bind(this)('签到福利', '🎁', '#FFD700');
                            GridItem.pop();
                        };
                        observedDeepRender();
                    }
                    Grid.pop();
                    // 更多功能
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 功能按钮区域
                        Column.create({ space: 16 });
                        // 功能按钮区域
                        Column.width('100%');
                        // 功能按钮区域
                        Column.padding({ left: '16vp', right: '16vp' });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 个人信息按钮
                        Row.create();
                        // 个人信息按钮
                        Row.width('100%');
                        // 个人信息按钮
                        Row.height('48vp');
                        // 个人信息按钮
                        Row.padding({ left: '16vp', right: '16vp' });
                        // 个人信息按钮
                        Row.backgroundColor('#FFFFFF');
                        // 个人信息按钮
                        Row.borderRadius('8vp');
                        // 个人信息按钮
                        Row.onClick(() => {
                            // 可以添加编辑个人信息功能
                        });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777304, "type": 20000, params: [], "bundleName": "com.huawei.quickstart", "moduleName": "default" });
                        Image.width('24vp');
                        Image.height('24vp');
                        Image.margin({ right: '12vp' });
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777302, "type": 10003, params: [], "bundleName": "com.huawei.quickstart", "moduleName": "default" });
                        Text.fontSize('16fp');
                        Text.fontColor('#182431');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777308, "type": 20000, params: [], "bundleName": "com.huawei.quickstart", "moduleName": "default" });
                        Image.width('16vp');
                        Image.height('16vp');
                    }, Image);
                    // 个人信息按钮
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 退出登录按钮
                        Row.create();
                        // 退出登录按钮
                        Row.width('100%');
                        // 退出登录按钮
                        Row.height('48vp');
                        // 退出登录按钮
                        Row.padding({ left: '16vp', right: '16vp' });
                        // 退出登录按钮
                        Row.backgroundColor('#FFFFFF');
                        // 退出登录按钮
                        Row.borderRadius('8vp');
                        // 退出登录按钮
                        Row.onClick(() => {
                            this.logout();
                        });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777307, "type": 20000, params: [], "bundleName": "com.huawei.quickstart", "moduleName": "default" });
                        Image.width('24vp');
                        Image.height('24vp');
                        Image.margin({ right: '12vp' });
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777297, "type": 10003, params: [], "bundleName": "com.huawei.quickstart", "moduleName": "default" });
                        Text.fontSize('16fp');
                        Text.fontColor('#E60012');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    // 退出登录按钮
                    Row.pop();
                    // 功能按钮区域
                    Column.pop();
                    // 已登录状态 - 重新设计为类似图片的布局
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 未登录状态
                        Column.create();
                        // 未登录状态
                        Column.width('100%');
                        // 未登录状态
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777306, "type": 20000, params: [], "bundleName": "com.huawei.quickstart", "moduleName": "default" });
                        Image.width('80vp');
                        Image.height('80vp');
                        Image.margin({ top: '100vp', bottom: '20vp' });
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('请先登录');
                        Text.fontSize('18fp');
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor('#99182431');
                        Text.margin({ bottom: '40vp' });
                    }, Text);
                    Text.pop();
                    // 未登录状态
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
