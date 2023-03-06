//------------------------------------------------------------
// XFrame
// author：徐振升
//------------------------------------------------------------

import { TypeNamePair } from "../ClassUtils";
import { LinkedList } from "../List/LinkedList";
import { Module } from "./Module";

    /**
     * 游戏框架入口。
     */
    export abstract class GameEntry {

        private static modules: LinkedList<Module> = new LinkedList<Module>();

        /**
         * 构造函数
         */
        constructor() {

        }

        /**
         * 所有游戏框架模块轮询。
         * @param elapseSeconds 逻辑流逝时间，以秒为单位。
         * @param realElapseSeconds 真实流逝时间，以秒为单位。
         */
        public static Update(elapseSeconds: number, realElapseSeconds: number): void {
            this.modules.forEach(module => {
                module.Update(elapseSeconds, realElapseSeconds);
            });
        }

        /**
         * 关闭并清理所有游戏框架模块。
         */
        public static Shutdown(): void {
            this.modules.forEach(module => {
                module.Shutdown();
            });
            this.modules.clear();
        }

        
        /**
         * 获取游戏框架模块。
         * 如果要获取的游戏框架模块不存在，则自动创建该游戏框架模块。
         * @param type 要获取的游戏框架模块类型。
         * @returns 要获取的游戏框架模块。
         */
        public static GetModule<T extends Module>(type: new () => T): T {      
            for (var i = 0; i < this.modules.length; i++) {
                const module = this.modules.get(i);
                if (module instanceof type) {
                    console.log("获取模块："+TypeNamePair.toString(type));
                    return module;
                }
            }
            return GameEntry.CreateModule<T>(type);
        }

        /**
         * 创建游戏框架模块。
         * @param typeofT 要创建的游戏框架模块类型。
         * @returns 要创建的游戏框架模块。
         */
        private static CreateModule<T extends Module>(type: new () => T): T {
            console.log("创建模块："+TypeNamePair.toString(type));
            var module = new type();
            let current = this.modules.first;
            while (current != null) {
                if (module.Priority > current.value.Priority) {
                    break;
                }

                current = current.next;
            }

            if (current != null) {
                this.modules.insertBefore(current, module);
            }
            else {
                this.modules.push(module);
            }
            return module;
        }
    }

