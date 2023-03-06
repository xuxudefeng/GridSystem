//------------------------------------------------------------
// XFrame
// author：徐振升
//------------------------------------------------------------
// 版本号命名规则指南
// 主版本号.子版本号.修订版本号.日期_版本阶段 
// 1.0.1.20230224_demo
// 说明：
// 第一位（1）：主版本号。当功能模块有较大的变动，比如增加多个模块或者整体架构发生变化。
// 第二位（2）：子版本号。当功能有一定的增加或变化，比如增加了对权限控制、增加自定义视图等功能。
// 第三位（3）：修订版本号。一般是 Bug 修复或是一些小的变动，要经常发布修订版，时间间隔不限，修复一个严重的bug即可发布一个修订版。
// 日期版本号（20201228）：用于记录修改项目的当前日期，每天对项目的修改都需要更改日期版本号。
// 希腊字母版本号(rc)：此版本号用于标注当前版本的软件处于哪个开发阶段，当软件进入到另一个阶段时需要修改此版本号。alpha(内部测试版本)beta(外部测试版本)release(最终版本)demo(演示版本)




import { IVersionHelper } from "./IVersionHelper";


/**
 * 版本号类。
 */
export class Version {

    private static readonly VERSION: string = "0.1.0";
    private static versionHelper: IVersionHelper | null = null;

    /**
     * 获取游戏框架版本号。
     */
    public static get XFrameVersion(): string {
        return this.VERSION;
    }

    /**
     * 获取游戏版本号。
     */
    public static get GameVersion(): string {
        if (this.versionHelper == null) {
            return "";
        }
        return this.versionHelper.GameVersion;
    }

    /**
     * 设置版本号辅助器。
     * @param versionHelper 要设置的版本号辅助器。
     */
    public static SetVersionHelper(versionHelper: IVersionHelper): void {
        this.versionHelper = versionHelper;
        this.sayHello();
    }


    private static saidHello: boolean = false;
    /**
     * 显示版本号
     */
    static sayHello(): void {
        if (this.saidHello) {
            return;
        }

        if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
            const args = [
                `\n %c %c %c XFrameVersion: ${this.VERSION}  %c  %c  GameVersion: ${this.GameVersion}  %c %c \n\n`,
                'background: #ff66a5; padding:5px 0;',
                'background: #ff66a5; padding:5px 0;',
                'color: #ff66a5; background: #030307; padding:5px 0;',
                'background: #ff66a5; padding:5px 0;',
                'background: #ffc3dc; padding:5px 0;',
                'background: #ff66a5; padding:5px 0;',
                'background: #ff66a5; padding:5px 0;',
            ];

            self.console.log(...args);
        }
        else if (self.console) {
            self.console.log(`XFrameVersion: ${this.VERSION} - GameVersion: ${this.GameVersion} - http://www.xzsgame.com/`);
        }

        this.saidHello = true;
    }
}

